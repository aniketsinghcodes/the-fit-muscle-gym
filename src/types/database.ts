// ============================================================
// THE FIT MUSCLE GYM — Database TypeScript Definitions
// Matches existing Supabase database schema
// ============================================================

export type UserRole = 'member' | 'admin';
export type MembershipStatus = 'active' | 'expired' | 'pending' | 'cancelled';
export type PaymentMethod = 'cash' | 'upi' | 'other';
export type PaymentStatus = 'paid' | 'pending' | 'refunded';
export type CheckInMethod = 'qr' | 'manual';

export interface Profile {
  id: string; // Foreign key references auth.users(id)
  phone: string | null;
  full_name: string | null;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  duration: string;
  price: number;
  features?: string[] | null;
  created_at?: string;
}

export interface Membership {
  id: string;
  member_id: string;  // Foreign key references profiles.id
  plan_id: string;
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  status: MembershipStatus;
  created_at?: string;
  updated_at?: string;
  // Joined fields
  membership_plans?: MembershipPlan;
  profiles?: Profile;
}

export interface Payment {
  id: string;
  member_id: string;  // Foreign key references profiles.id
  membership_id: string | null;
  payment_date: string; // YYYY-MM-DD (actual date money received)
  amount: number;
  payment_method: PaymentMethod; // 'cash' | 'upi' | 'other'
  payment_status: PaymentStatus; // 'paid' | 'pending' | 'refunded'
  notes: string | null;
  created_at?: string;
  // Joined fields
  profiles?: Profile;
  memberships?: Membership;
}

export interface Attendance {
  id: string;
  member_id: string;     // Foreign key references profiles.id
  check_in_date: string; // YYYY-MM-DD
  check_in_time: string; // timestamptz
  check_in_method?: CheckInMethod | null; // 'qr' | 'manual' | null for historical
  created_at?: string;
  // Joined fields
  profiles?: Profile;
}

export interface GymCheckinToken {
  id: string;
  token: string;
  is_active: boolean;
  created_at?: string;
  expires_at?: string | null;
}
