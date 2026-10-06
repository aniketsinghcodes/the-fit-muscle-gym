import{g as B,a as I,f,c as u}from"./supabase.Cw6fBJ3s.js";async function S(){const h=B(),{session:a}=await I();if(!a?.user)return;const x=a.user.id,{data:b,error:$}=await h.from("attendance").select("*").eq("member_id",x).order("check_in_date",{ascending:!1}),t=b||[],d=document.getElementById("stat-total"),r=document.getElementById("stat-month"),l=document.getElementById("stat-last"),n=document.getElementById("stat-today"),i=document.getElementById("records-count-badge"),o=document.getElementById("attendance-full-tbody");d&&(d.textContent=String(t.length)),i&&(i.textContent=`${t.length} check-in${t.length===1?"":"s"}`);const C=new Date().toISOString().substring(0,7),y=t.filter(e=>e.check_in_date?.startsWith(C)).length;r&&(r.textContent=String(y)),l&&t.length>0&&(l.textContent=f(t[0].check_in_date));const p=new Date().toISOString().substring(0,10),m=t.find(e=>e.check_in_date===p);if(n&&(m?(n.textContent=`✓ Checked In (${u(m.check_in_time)})`,n.className="font-['Oswald'] text-sm font-bold text-[#38A169] block mt-1"):(n.textContent="Not Checked In",n.className="font-['Oswald'] text-sm font-bold text-[#A7A29A] block mt-1")),o){if(t.length===0){o.innerHTML=`
          <tr>
            <td colspan="4" class="py-8 text-center text-[#7A756D] italic">
              No attendance records found yet. Scan the gym QR when you enter!
            </td>
          </tr>
        `;return}o.innerHTML=t.map((e,A)=>{const g=e.check_in_method,s=g==="qr",c=g==="manual",_=s?"QR Verified":c?"Front Desk":"Verified Entry",k=s?"bg-[#38A169]/15 text-[#38A169] border-[#38A169]/30":c?"bg-[#C9B27C]/15 text-[#C9B27C] border-[#C9B27C]/30":"bg-[#4A5568]/20 text-[#A0AEC0] border-[#4A5568]/40",E=s?"bg-[#38A169]":c?"bg-[#C9B27C]":"bg-[#A0AEC0]";return`
          <tr class="hover:bg-[#1A1A1A]/50 transition-colors">
            <td class="py-3.5 px-2 text-[#7A756D] font-mono text-xs">${t.length-A}</td>
            <td class="py-3.5 px-2 font-medium text-[#F5F2EA]">${f(e.check_in_date)}</td>
            <td class="py-3.5 px-2 font-mono text-xs text-[#C9B27C]">${u(e.check_in_time)}</td>
            <td class="py-3.5 px-2">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${k}">
                <span class="w-1.5 h-1.5 rounded-full ${E}"></span>
                ${_}
              </span>
            </td>
          </tr>
        `}).join("")}}S();
