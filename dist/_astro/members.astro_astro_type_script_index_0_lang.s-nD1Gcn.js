import{g as E,f as $,d as S,e as D}from"./supabase.Cw6fBJ3s.js";let f=[],B=[],c="all";async function v(){const t=E(),{data:n}=await t.from("membership_plans").select("*");B=n||[],_(B);const{data:a,error:s}=await t.from("profiles").select("*").eq("role","member").order("created_at",{ascending:!1}),{data:e}=await t.from("memberships").select("*, membership_plans(*)").order("end_date",{ascending:!1}),o=e||[];f=(a||[]).map(d=>{const l=o.find(M=>M.member_id===d.id),w=l?S(l.end_date,l.status):null;return{...d,activeMembership:l||null,statusInfo:w}}),y()}function _(t){const n=document.getElementById("modal-plan-select");n&&(n.innerHTML='<option value="">Choose Membership Plan</option>'+t.map(a=>`
      <option value="${a.id}" data-duration="${a.duration}">${a.name} — ${D(a.price)} (${a.duration})</option>
    `).join(""))}function y(){const t=document.getElementById("members-table-tbody"),n=document.getElementById("total-members-badge"),a=document.getElementById("member-search-input")?.value.toLowerCase()||"";n&&(n.textContent=`${f.length} Members`);const s=f.filter(e=>(e.full_name||"").toLowerCase().includes(a)||(e.phone||"").toLowerCase().includes(a)||e.id.toLowerCase().includes(a)?c==="active"?e.statusInfo?.label==="Active":c==="expiring"?e.statusInfo?.label==="Expiring Soon":c==="expired"?!e.statusInfo||e.statusInfo?.label==="Expired":!0:!1);if(t){if(s.length===0){t.innerHTML=`
        <tr>
          <td colspan="6" class="py-12 text-center text-[#7A756D] italic">
            No matching members found.
          </td>
        </tr>
      `;return}t.innerHTML=s.map(e=>{const o=e.activeMembership?.membership_plans?.name||'<span class="text-[#7A756D]">No Plan</span>',d=e.activeMembership?$(e.activeMembership.end_date):"—",l=e.statusInfo?`<span class="px-2.5 py-0.5 rounded-full border text-[11px] font-['Oswald'] uppercase font-bold tracking-wider ${e.statusInfo.badgeClass}">${e.statusInfo.label}</span>`:`<span class="px-2.5 py-0.5 rounded-full border text-[11px] font-['Oswald'] uppercase font-bold tracking-wider bg-[#E53E3E]/10 text-[#E53E3E] border-[#E53E3E]/30">No Active Plan</span>`;return`
        <tr class="hover:bg-[#1A1A1A]/50 transition-colors">
          <td class="py-3.5 px-4 font-semibold text-[#F5F2EA]">
            ${e.full_name||"Member"}
            <div class="text-[10px] text-[#7A756D] font-mono">${e.id.substring(0,8)}</div>
          </td>
          <td class="py-3.5 px-4 font-mono text-xs text-[#A7A29A]">${e.phone||"—"}</td>
          <td class="py-3.5 px-4 text-xs">${o}</td>
          <td class="py-3.5 px-4 text-xs font-medium text-[#F5F2EA]">${d}</td>
          <td class="py-3.5 px-4">${l}</td>
          <td class="py-3.5 px-4 text-right">
            <div class="flex items-center justify-end gap-2">
              <button
                type="button"
                data-assign-plan="${e.id}"
                data-name="${e.full_name||e.phone||"Member"}"
                class="px-2.5 py-1.5 rounded-lg bg-[#1F1F1F] hover:bg-[#C9B27C] hover:text-[#080808] text-xs font-semibold text-[#C9B27C] transition-colors cursor-pointer"
              >
                Assign / Renew
              </button>
              <button
                type="button"
                data-edit-profile="${e.id}"
                data-name="${e.full_name||""}"
                data-phone="${e.phone||""}"
                class="p-1.5 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] text-xs text-[#A7A29A] hover:text-[#F5F2EA] transition-colors cursor-pointer"
                title="Edit member details"
              >
                ✎
              </button>
            </div>
          </td>
        </tr>
      `}).join(""),C()}}function C(){document.querySelectorAll("[data-assign-plan]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-assign-plan")||"",a=t.getAttribute("data-name")||"";O(n,a)})}),document.querySelectorAll("[data-edit-profile]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-edit-profile")||"",a=t.getAttribute("data-name")||"",s=t.getAttribute("data-phone")||"";j(n,a,s)})})}document.querySelectorAll(".filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".filter-btn").forEach(n=>{n.className="filter-btn px-3 py-1.5 rounded-lg text-xs font-['Oswald'] uppercase tracking-wider font-semibold bg-[#1C1C1C] text-[#A7A29A] hover:text-[#F5F2EA]"}),t.className="filter-btn px-3 py-1.5 rounded-lg text-xs font-['Oswald'] uppercase tracking-wider font-semibold bg-[#C9B27C] text-[#080808]",c=t.getAttribute("data-filter")||"all",y()})});document.getElementById("member-search-input")?.addEventListener("input",y);const m=document.getElementById("membership-modal"),F=document.getElementById("close-plan-modal-btn"),k=document.getElementById("cancel-plan-modal-btn"),P=document.getElementById("membership-form"),b=document.getElementById("modal-member-user-id"),L=document.getElementById("modal-member-name"),u=document.getElementById("modal-plan-select"),r=document.getElementById("modal-start-date"),i=document.getElementById("modal-end-date");function O(t,n){b&&(b.value=t),L&&(L.value=n);const a=new Date().toISOString().substring(0,10);r&&(r.value=a);const s=new Date;s.setMonth(s.getMonth()+1),i&&(i.value=s.toISOString().substring(0,10)),m?.classList.remove("hidden"),m?.classList.add("flex")}function I(){m?.classList.add("hidden"),m?.classList.remove("flex")}F?.addEventListener("click",I);k?.addEventListener("click",I);u?.addEventListener("change",()=>{const n=u.options[u.selectedIndex].getAttribute("data-duration")||"1 month",a=r?.value?new Date(r.value):new Date;let s=1;n.includes("3")?s=3:n.includes("6")?s=6:n.includes("12")&&(s=12);const e=new Date(a);e.setMonth(e.getMonth()+s),i&&(i.value=e.toISOString().substring(0,10))});P?.addEventListener("submit",async t=>{t.preventDefault();const n=b?.value,a=u?.value,s=r?.value,e=i?.value;if(!n||!a||!s||!e){alert("Please complete all plan fields.");return}const o=E(),d=document.getElementById("save-plan-btn");d&&(d.disabled=!0);const{error:l}=await o.from("memberships").insert({member_id:n,plan_id:a,start_date:s,end_date:e,status:"active"});if(d&&(d.disabled=!1),l){alert(`Error assigning plan: ${l.message}`);return}I(),await v()});const p=document.getElementById("edit-profile-modal"),N=document.getElementById("close-edit-modal-btn"),q=document.getElementById("cancel-edit-btn"),T=document.getElementById("edit-profile-form"),g=document.getElementById("edit-user-id"),h=document.getElementById("edit-full-name"),x=document.getElementById("edit-phone");function j(t,n,a){g&&(g.value=t),h&&(h.value=n),x&&(x.value=a),p?.classList.remove("hidden"),p?.classList.add("flex")}function A(){p?.classList.add("hidden"),p?.classList.remove("flex")}N?.addEventListener("click",A);q?.addEventListener("click",A);T?.addEventListener("submit",async t=>{t.preventDefault();const n=g?.value,a=h?.value.trim(),s=x?.value.trim();if(!n||!a||!s)return;const e=E(),{error:o}=await e.from("profiles").update({full_name:a,phone:s,updated_at:new Date().toISOString()}).eq("id",n);if(o){alert(`Error updating profile: ${o.message}`);return}A(),await v()});v();
