import{g as v,f as I,c as M}from"./supabase.Cw6fBJ3s.js";let m=[],E=[],l=new Date().toISOString().substring(0,10);const u=document.getElementById("attendance-table-tbody"),$=document.getElementById("filtered-records-count"),C=document.getElementById("attendance-search-input"),f=document.getElementById("attendance-date-picker"),S=document.getElementById("clear-date-filter-btn"),p=document.getElementById("manual-checkin-modal"),D=document.getElementById("open-manual-checkin-btn"),w=document.getElementById("close-manual-modal-btn"),T=document.getElementById("cancel-manual-modal-btn"),F=document.getElementById("manual-checkin-form"),h=document.getElementById("manual-member-select"),_=document.getElementById("manual-date-input"),x=document.getElementById("manual-time-input");async function q(){const t=v(),{data:a,error:e}=await t.from("attendance").select("*, profiles(*)").order("check_in_date",{ascending:!1}).order("check_in_time",{ascending:!1});if(e){console.error("Error fetching attendance:",e),u&&(u.innerHTML=`
          <tr>
            <td colspan="7" class="py-12 text-center text-[#E53E3E]">
              Failed to load attendance records. ${e.message}
            </td>
          </tr>
        `);return}m=a||[];const{data:o}=await t.from("profiles").select("*").order("full_name",{ascending:!0});E=(o||[]).filter(n=>n.role==="member"),H(),k(),f&&(f.value=l),g()}function k(){const t=new Date().toISOString().substring(0,10),a=t.substring(0,7);let e=0,o=0;m.forEach(c=>{c.check_in_date===t&&e++,c.check_in_date&&c.check_in_date.startsWith(a)&&o++});const n=document.getElementById("stat-today"),r=document.getElementById("stat-month"),d=document.getElementById("stat-total");n&&(n.textContent=String(e)),r&&(r.textContent=String(o)),d&&(d.textContent=String(m.length))}function H(){if(h){if(E.length===0){h.innerHTML='<option value="">No members registered yet</option>';return}h.innerHTML=`
      <option value="">Select Member</option>
      ${E.map(t=>`
        <option value="${t.id}">${t.full_name||"Member"} (${t.phone||"No phone"})</option>
      `).join("")}
    `}}function g(){if(!u)return;const t=(C?.value||"").trim().toLowerCase(),a=m.filter(e=>{if(l&&e.check_in_date!==l)return!1;if(t){const o=(e.profiles?.full_name||"").toLowerCase(),n=(e.profiles?.phone||"").toLowerCase(),r=(e.member_id||"").toLowerCase();if(!o.includes(t)&&!n.includes(t)&&!r.includes(t))return!1}return!0});if($&&($.textContent=`${a.length} entries`),a.length===0){u.innerHTML=`
        <tr>
          <td colspan="7" class="py-12 text-center text-[#7A756D]">
            No attendance records found ${l?`for ${I(l)}`:""}.
          </td>
        </tr>
      `;return}u.innerHTML=a.map((e,o)=>{const n=e.profiles?.full_name||"Member",r=e.profiles?.phone||"—",d=I(e.check_in_date),c=M(e.check_in_time),i=e.check_in_method,s=i==="qr",b=i==="manual",A=s?"QR Scanned":b?"Front Desk Manual":"Verified Entry",B=s?"bg-[#38A169]/15 text-[#38A169] border-[#38A169]/30":b?"bg-[#C9B27C]/15 text-[#C9B27C] border-[#C9B27C]/30":"bg-[#4A5568]/20 text-[#A0AEC0] border-[#4A5568]/40",L=s?"bg-[#38A169]":b?"bg-[#C9B27C]":"bg-[#A0AEC0]";return`
          <tr class="hover:bg-[#1A1A1A] transition-colors" data-id="${e.id}">
            <td class="py-3.5 px-4 font-mono text-[#7A756D]">${o+1}</td>
            <td class="py-3.5 px-4 font-semibold text-[#F5F2EA]">${n}</td>
            <td class="py-3.5 px-4 text-[#A7A29A] font-mono">${r}</td>
            <td class="py-3.5 px-4 text-[#C9B27C] font-semibold">${d}</td>
            <td class="py-3.5 px-4 font-mono text-[#F5F2EA] font-semibold">${c}</td>
            <td class="py-3.5 px-4">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${B}">
                <span class="w-1.5 h-1.5 rounded-full ${L}"></span>
                ${A}
              </span>
            </td>
            <td class="py-3.5 px-4 text-right">
              <button
                type="button"
                data-delete-id="${e.id}"
                data-delete-name="${n}"
                data-delete-date="${d}"
                class="px-2.5 py-1 rounded-lg bg-[#241515] hover:bg-[#3D1E1E] text-[#E53E3E] text-xs font-['Oswald'] uppercase font-semibold transition-colors cursor-pointer"
                title="Delete erroneous record"
              >
                Delete
              </button>
            </td>
          </tr>
        `}).join(""),u.querySelectorAll("[data-delete-id]").forEach(e=>{e.addEventListener("click",async o=>{const n=o.currentTarget,r=n.getAttribute("data-delete-id"),d=n.getAttribute("data-delete-name"),c=n.getAttribute("data-delete-date");if(r&&confirm(`Are you sure you want to delete check-in record for ${d} on ${c}?`)){const i=v(),{error:s}=await i.from("attendance").delete().eq("id",r);s?alert(`Failed to delete record: ${s.message}`):(m=m.filter(b=>b.id!==r),k(),g())}})})}C?.addEventListener("input",g);f?.addEventListener("change",()=>{l=f.value,g()});S?.addEventListener("click",()=>{l="",f&&(f.value=""),g()});function P(){p?.classList.remove("hidden"),p?.classList.add("flex"),document.body.style.overflow="hidden";const t=new Date;if(_&&(_.value=t.toISOString().substring(0,10)),x){const a=String(t.getHours()).padStart(2,"0"),e=String(t.getMinutes()).padStart(2,"0");x.value=`${a}:${e}`}}function y(){p?.classList.add("hidden"),p?.classList.remove("flex"),document.body.style.overflow=""}D?.addEventListener("click",P);w?.addEventListener("click",y);T?.addEventListener("click",y);p?.addEventListener("click",t=>{t.target===p&&y()});F?.addEventListener("submit",async t=>{t.preventDefault();const a=h?.value,e=_?.value,o=x?.value;if(!a||!e||!o){alert("Please fill out all required fields.");return}const n=v(),{data:r}=await n.from("attendance").select("id").eq("member_id",a).eq("check_in_date",e).maybeSingle();if(r){alert(`DUPLICATE BLOCKED: This member has already checked in on ${e}. Duplicate attendance is not permitted.`);return}const{data:d}=await n.from("memberships").select("id, start_date, end_date, status").eq("member_id",a).eq("status","active").lte("start_date",e).gte("end_date",e).maybeSingle();if(!d){alert(`MEMBERSHIP INACTIVE: Member does not have an active membership covering ${e}. Please assign or renew their membership plan first.`);return}const c=`${e}T${o}:00+05:30`,{data:i,error:s}=await n.from("attendance").insert({member_id:a,check_in_date:e,check_in_time:c,check_in_method:"manual"}).select("*, profiles(*)").single();if(s){s.code==="23505"||s.message?.includes("attendance_one_checkin_per_member_per_day")?alert(`DUPLICATE BLOCKED: This member has already checked in on ${e}.`):alert(`Error recording attendance: ${s.message}`);return}i&&(m.unshift(i),k(),y(),g(),alert("Manual check-in recorded successfully."))});q();
