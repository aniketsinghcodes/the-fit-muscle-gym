import{g as w,f as k,e as b}from"./supabase.Cw6fBJ3s.js";let m=[],A=[],_="all";const y=document.getElementById("payments-table-tbody"),S=document.getElementById("filtered-payments-count"),F=document.getElementById("payment-search-input"),M=document.querySelectorAll(".method-btn"),f=document.getElementById("payment-modal"),B=document.getElementById("payment-modal-title"),q=document.getElementById("open-record-payment-btn"),N=document.getElementById("close-payment-modal-btn"),O=document.getElementById("cancel-payment-modal-btn"),L=document.getElementById("payment-form"),E=document.getElementById("edit-payment-id"),p=document.getElementById("payment-member-select"),h=document.getElementById("payment-date-input"),$=document.getElementById("payment-amount-input"),x=document.getElementById("payment-method-select"),v=document.getElementById("payment-status-select"),D=document.getElementById("payment-notes-input");async function P(){const e=w(),{data:d,error:t}=await e.from("payments").select("*, profiles(*)").order("payment_date",{ascending:!1}).order("created_at",{ascending:!1});if(t){console.error("Error fetching payments:",t),y&&(y.innerHTML=`
          <tr>
            <td colspan="7" class="py-12 text-center text-[#E53E3E]">
              Failed to load payments. ${t.message}
            </td>
          </tr>
        `);return}m=d||[];const{data:a}=await e.from("profiles").select("*").order("full_name",{ascending:!0});A=(a||[]).filter(n=>n.role==="member"),H(),I(),g()}function I(){let e=0,d=0,t=0,a=0;const n=new Date().toISOString().substring(0,7);m.forEach(s=>{if(s.payment_status==="paid"){const c=Number(s.amount)||0;e+=c,s.payment_date&&s.payment_date.startsWith(n)&&(d+=c),s.payment_method==="cash"&&(t+=c),s.payment_method==="upi"&&(a+=c)}});const o=document.getElementById("stat-total-rev"),l=document.getElementById("stat-month-rev"),u=document.getElementById("stat-cash-sum"),i=document.getElementById("stat-upi-sum"),r=document.getElementById("stat-trans-count");o&&(o.textContent=b(e)),l&&(l.textContent=b(d)),u&&(u.textContent=b(t)),i&&(i.textContent=b(a)),r&&(r.textContent=String(m.length))}function H(){if(p){if(A.length===0){p.innerHTML='<option value="">No members registered yet</option>';return}p.innerHTML=`
      <option value="">Choose Member</option>
      ${A.map(e=>`
        <option value="${e.id}">${e.full_name||"Member"} (${e.phone||"No phone"})</option>
      `).join("")}
    `}}function g(){if(!y)return;const e=(F?.value||"").trim().toLowerCase(),d=m.filter(t=>{if(_!=="all"&&t.payment_method!==_)return!1;if(e){const a=(t.profiles?.full_name||"").toLowerCase(),n=(t.profiles?.phone||"").toLowerCase(),o=(t.notes||"").toLowerCase();if(!a.includes(e)&&!n.includes(e)&&!o.includes(e))return!1}return!0});if(S&&(S.textContent=`${d.length} receipts`),d.length===0){y.innerHTML=`
        <tr>
          <td colspan="7" class="py-12 text-center text-[#7A756D]">
            No payment receipts found matching criteria.
          </td>
        </tr>
      `;return}y.innerHTML=d.map(t=>{const a=t.profiles?.full_name||"Member",n=t.profiles?.phone||"—",o=k(t.payment_date),l=b(t.amount),u=(t.payment_method||"other").toUpperCase(),i=t.payment_status||"paid",r=t.notes||"—",s=i==="paid"?"bg-[#38A169]/15 text-[#38A169] border-[#38A169]/30":i==="pending"?"bg-[#D69E2E]/15 text-[#D69E2E] border-[#D69E2E]/30":"bg-[#E53E3E]/15 text-[#E53E3E] border-[#E53E3E]/30",c=t.payment_method==="cash"?"bg-[#2E382E] text-[#86EFAC]":t.payment_method==="upi"?"bg-[#1E293B] text-[#93C5FD]":"bg-[#2D2D2D] text-[#D1D5DB]";return`
          <tr class="hover:bg-[#1A1A1A] transition-colors" data-id="${t.id}">
            <td class="py-3.5 px-4 text-[#C9B27C] font-semibold">${o}</td>
            <td class="py-3.5 px-4">
              <span class="font-semibold text-[#F5F2EA] block">${a}</span>
              <span class="text-[10px] text-[#7A756D] font-mono">${n}</span>
            </td>
            <td class="py-3.5 px-4 font-mono font-bold text-[#F5F2EA] text-sm">${l}</td>
            <td class="py-3.5 px-4">
              <span class="inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${c}">
                ${u}
              </span>
            </td>
            <td class="py-3.5 px-4">
              <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${s}">
                ${i}
              </span>
            </td>
            <td class="py-3.5 px-4 text-[#A7A29A] text-xs max-w-[200px] truncate" title="${r}">
              ${r}
            </td>
            <td class="py-3.5 px-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button
                  type="button"
                  data-edit-id="${t.id}"
                  class="px-2.5 py-1 rounded-lg bg-[#1E1E1E] hover:bg-[#2A2A2A] text-[#C9B27C] text-xs font-['Oswald'] uppercase font-semibold transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  data-delete-id="${t.id}"
                  data-delete-amt="${l}"
                  data-delete-name="${a}"
                  class="px-2.5 py-1 rounded-lg bg-[#241515] hover:bg-[#3D1E1E] text-[#E53E3E] text-xs font-['Oswald'] uppercase font-semibold transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        `}).join(""),y.querySelectorAll("[data-edit-id]").forEach(t=>{t.addEventListener("click",a=>{const n=a.currentTarget.getAttribute("data-edit-id"),o=m.find(l=>l.id===n);o&&j(o)})}),y.querySelectorAll("[data-delete-id]").forEach(t=>{t.addEventListener("click",async a=>{const n=a.currentTarget,o=n.getAttribute("data-delete-id"),l=n.getAttribute("data-delete-amt"),u=n.getAttribute("data-delete-name");if(o&&confirm(`Delete payment of ${l} for ${u}?`)){const i=w(),{error:r}=await i.from("payments").delete().eq("id",o);r?alert(`Failed to delete payment: ${r.message}`):(m=m.filter(s=>s.id!==o),I(),g())}})})}M.forEach(e=>{e.addEventListener("click",d=>{const t=d.currentTarget;_=t.getAttribute("data-method-filter")||"all",M.forEach(n=>{n.classList.remove("bg-[#C9B27C]","text-[#080808]"),n.classList.add("bg-[#1C1C1C]","text-[#A7A29A]")}),t.classList.remove("bg-[#1C1C1C]","text-[#A7A29A]"),t.classList.add("bg-[#C9B27C]","text-[#080808]"),g()})});F?.addEventListener("input",g);function R(){B&&(B.textContent="Record Offline Payment"),E&&(E.value=""),L&&L.reset(),p&&(p.disabled=!1),h&&(h.value=new Date().toISOString().substring(0,10)),v&&(v.value="paid"),x&&(x.value="cash"),f?.classList.remove("hidden"),f?.classList.add("flex"),document.body.style.overflow="hidden"}function j(e){B&&(B.textContent="Edit Payment Record"),E&&(E.value=e.id),p&&(p.value=e.member_id,p.disabled=!0),h&&(h.value=e.payment_date),$&&($.value=String(e.amount)),x&&(x.value=e.payment_method),v&&(v.value=e.payment_status),D&&(D.value=e.notes||""),f?.classList.remove("hidden"),f?.classList.add("flex"),document.body.style.overflow="hidden"}function C(){f?.classList.add("hidden"),f?.classList.remove("flex"),document.body.style.overflow=""}q?.addEventListener("click",R);N?.addEventListener("click",C);O?.addEventListener("click",C);f?.addEventListener("click",e=>{e.target===f&&C()});L?.addEventListener("submit",async e=>{e.preventDefault();const d=E?.value,t=p?.value,a=h?.value,n=Number($?.value),o=x?.value,l=v?.value,u=D?.value?.trim()||null;if(!t||!a||isNaN(n)||!o||!l){alert("Please fill out all required fields.");return}const i=w();if(d){const{data:r,error:s}=await i.from("payments").update({payment_date:a,amount:n,payment_method:o,payment_status:l,notes:u}).eq("id",d).select("*, profiles(*)").single();if(s){alert(`Failed to update payment: ${s.message}`);return}if(r){const c=m.findIndex(T=>T.id===d);c!==-1&&(m[c]=r),I(),C(),g(),alert("Payment record updated successfully.")}}else{const{data:r}=await i.from("memberships").select("id").eq("member_id",t).order("created_at",{ascending:!1}).limit(1).maybeSingle(),{data:s,error:c}=await i.from("payments").insert({member_id:t,membership_id:r?.id||null,payment_date:a,amount:n,payment_method:o,payment_status:l,notes:u}).select("*, profiles(*)").single();if(c){alert(`Failed to record payment: ${c.message}`);return}s&&(m.unshift(s),I(),C(),g(),alert("Offline payment recorded successfully."))}});P();
