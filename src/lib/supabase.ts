import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Profile } from '../types/database';

const SUPABASE_URL = 
  import.meta.env.PUBLIC_SUPABASE_URL || 'https://aiizbytowafifnhtqjlo.supabase.co';

const SUPABASE_KEY = 
  import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 
  'sb_publishable_k_uVvs907cGGfI_CCdlj3Q_zPfPdsYU';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return supabaseInstance;
}

export const supabase = getSupabase();

/**
 * Format Indian 10-digit phone to E.164 (+91...)
 */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  if (raw.startsWith('+')) {
    return raw.replace(/\s+/g, '');
  }
  return `+91${digits.slice(-10)}`;
}

/**
 * Send Phone OTP via Supabase Auth
 */
export async function sendPhoneOtp(phoneE164: string) {
  const sb = getSupabase();
  const { data, error } = await sb.auth.signInWithOtp({
    phone: phoneE164,
  });
  return { data, error };
}

/**
 * Verify 6-digit SMS OTP
 */
export async function verifyPhoneOtp(phoneE164: string, otp: string) {
  const sb = getSupabase();
  const { data, error } = await sb.auth.verifyOtp({
    phone: phoneE164,
    token: otp.trim(),
    type: 'sms',
  });
  return { data, error };
}

/**
 * Get current authenticated user session
 */
export async function getCurrentSession() {
  const sb = getSupabase();
  const { data: { session }, error } = await sb.auth.getSession();
  return { session, error };
}

/**
 * Get current authenticated user profile
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  const sb = getSupabase();
  const { data: { session } } = await sb.auth.getSession();
  if (!session?.user) return null;

  const { data: profile, error } = await sb
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .maybeSingle();

  if (error || !profile) {
    // If profile row doesn't exist yet, return minimal fallback
    return {
      id: session.user.id,
      phone: session.user.phone || null,
      full_name: (session.user.user_metadata?.full_name as string) || null,
      role: 'member',
    };
  }

  return profile as Profile;
}

/**
 * Sign out of session
 */
export async function signOut() {
  const sb = getSupabase();
  await sb.auth.signOut();
}

/**
 * Utility: Calculate days remaining until end date (inclusive)
 */
export function getDaysRemaining(endDateStr: string): number {
  if (!endDateStr) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDateStr);
  end.setHours(0, 0, 0, 0);
  const diffTime = end.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Utility: Determine membership status badge
 */
export function getMembershipDisplayStatus(endDateStr: string, dbStatus?: string): {
  label: string;
  colorClass: string;
  badgeClass: string;
  daysRemaining: number;
} {
  if (dbStatus === 'cancelled') {
    return {
      label: 'Cancelled',
      colorClass: 'text-[#E53E3E]',
      badgeClass: 'bg-[#E53E3E]/10 text-[#E53E3E] border-[#E53E3E]/30',
      daysRemaining: 0,
    };
  }

  const days = getDaysRemaining(endDateStr);

  if (days < 0) {
    return {
      label: 'Expired',
      colorClass: 'text-[#E53E3E]',
      badgeClass: 'bg-[#E53E3E]/10 text-[#E53E3E] border-[#E53E3E]/30',
      daysRemaining: days,
    };
  }

  if (days <= 5) {
    return {
      label: 'Expiring Soon',
      colorClass: 'text-[#D69E2E]',
      badgeClass: 'bg-[#D69E2E]/10 text-[#D69E2E] border-[#D69E2E]/30',
      daysRemaining: days,
    };
  }

  return {
    label: 'Active',
    colorClass: 'text-[#38A169]',
    badgeClass: 'bg-[#38A169]/10 text-[#38A169] border-[#38A169]/30',
    daysRemaining: days,
  };
}

/**
 * Format date nicely (e.g. 15 Oct 2026)
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Format time nicely (e.g. 06:15 AM)
 */
export function formatTime(timeOrIsoStr: string): string {
  if (!timeOrIsoStr) return '—';
  try {
    // If it's already HH:MM or HH:MM:SS
    if (timeOrIsoStr.length <= 8 && timeOrIsoStr.includes(':')) {
      const parts = timeOrIsoStr.split(':');
      const h = parseInt(parts[0], 10);
      const m = parts[1];
      const ampm = h >= 12 ? 'PM' : 'AM';
      const formattedH = h % 12 || 12;
      return `${formattedH}:${m} ${ampm}`;
    }
    const d = new Date(timeOrIsoStr);
    return d.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return timeOrIsoStr;
  }
}

/**
 * Format currency in Indian Rupees (₹)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
