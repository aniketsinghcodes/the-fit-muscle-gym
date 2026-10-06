import{g as $,h as D,c as L,e as l,f as F}from"./supabase.Cw6fBJ3s.js";async function T(){const n=$(),{data:_}=await n.from("profiles").select("*"),I=(_||[]).filter(t=>t.role==="member"),r=document.getElementById("kpi-total");r&&(r.textContent=String(I.length));const{data:B}=await n.from("memberships").select("*, profiles(*)"),k=B||[];let c=0,d=0,m=0;k.forEach(t=>{const e=D(t.end_date);e<0||t.status==="expired"?m++:e<=5?d++:c++});const p=document.getElementById("kpi-active"),f=document.getElementById("kpi-expiring"),x=document.getElementById("kpi-expired");p&&(p.textContent=String(c)),f&&(f.textContent=String(d)),x&&(x.textContent=String(m));const S=new Date().toISOString().substring(0,10),{data:w}=await n.from("attendance").select("*, profiles(*)").eq("check_in_date",S).order("check_in_time",{ascending:!1}),s=w||[],u=document.getElementById("kpi-today-att");u&&(u.textContent=String(s.length));const o=document.getElementById("today-att-feed");o&&(s.length===0?o.innerHTML='<p class="text-xs text-[#7A756D] italic py-4 text-center">No check-ins recorded yet today.</p>':o.innerHTML=s.slice(0,6).map(t=>`
          <div class="flex items-center justify-between p-3 rounded-xl bg-[#0C0C0C] border border-[#1E1E1E] text-xs">
            <div>
              <span class="font-semibold text-[#F5F2EA] block">${t.profiles?.full_name||"Member"}</span>
              <span class="text-[10px] text-[#7A756D]">${t.profiles?.phone||""}</span>
            </div>
            <span class="font-mono text-xs text-[#C9B27C] font-semibold">${L(t.check_in_time)}</span>
          </div>
        `).join(""));const{data:A}=await n.from("payments").select("*, profiles(*)").order("payment_date",{ascending:!1}),a=A||[];let y=0,g=0,E=0,b=0;const M=new Date().toISOString().substring(0,7);a.forEach(t=>{const e=Number(t.amount)||0;y+=e,t.payment_date?.startsWith(M)&&(g+=e),t.payment_method==="upi"?b++:E++});const h=document.getElementById("rev-total"),C=document.getElementById("rev-month"),v=document.getElementById("rev-methods");h&&(h.textContent=l(y)),C&&(C.textContent=l(g)),v&&(v.textContent=`UPI: ${b} payments &bull; Cash: ${E} payments`);const i=document.getElementById("recent-payments-feed");i&&(a.length===0?i.innerHTML='<p class="text-xs text-[#7A756D] italic py-4 text-center">No payment records found yet.</p>':i.innerHTML=a.slice(0,6).map(t=>`
          <div class="flex items-center justify-between p-3 rounded-xl bg-[#0C0C0C] border border-[#1E1E1E] text-xs">
            <div>
              <span class="font-semibold text-[#F5F2EA] block">${t.profiles?.full_name||"Member"}</span>
              <span class="text-[10px] text-[#7A756D]">${F(t.payment_date)} &bull; ${(t.payment_method||"cash").toUpperCase()}</span>
            </div>
            <span class="font-bold text-[#C9B27C] text-sm">${l(t.amount)}</span>
          </div>
        `).join(""))}T();
