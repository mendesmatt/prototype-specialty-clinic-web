function go(tab){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('s-'+tab).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b=>{
    b.classList.toggle('active-tab', b.dataset.tab===tab);
  });

  const sc = document.querySelector('#s-'+tab+' .scroll');
  if(sc) sc.scrollTop = 0;

  if(tab==='inicio'){
    document.querySelectorAll('#s-inicio .anim').forEach(el=>{
      el.style.animation='none'; el.offsetHeight; el.style.animation='';
    });
  }
}

let toastTimer;
function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2200);
}

const especialidades = [
  {n:'Cardiologia', i:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z'},
  {n:'Dermatologia', i:'M12 2a10 10 0 1 0 10 10c0-1.5-2-2-3-1s-2 0-2-1 1-2 0-3-2 0-3 1-1 0-1-1 1-2 0-3-2 0-3 1'},
  {n:'Ortopedia', i:'M8 3v4a4 4 0 0 0 8 0V3M6 21v-4a4 4 0 0 1 8 0v4'},
  {n:'Pediatria', i:'M9 12h.01M15 12h.01M10 16a3 3 0 0 0 4 0M12 2a9 9 0 1 0 9 9'},
  {n:'Ginecologia', i:'M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM12 13v8M9 18h6'},
  {n:'Oftalmologia', i:'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z'},
];
const espColors = ['bg-corallite text-coral','bg-petrollite text-petrol','bg-petrollite text-petrol','bg-corallite text-coral','bg-corallite text-coral','bg-petrollite text-petrol'];
document.getElementById('esp-grid').innerHTML = especialidades.map((e,idx)=>`
  <button onclick="go('agendar')" class="qa bg-white border border-line rounded-2xl p-4 shadow-sm text-left flex items-center gap-3">
    <span class="w-11 h-11 rounded-xl ${espColors[idx]} grid place-content-center shrink-0">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${e.i}"/></svg>
    </span>
    <span class="text-[13px] font-bold text-ink leading-tight">${e.n}</span>
  </button>`).join('');

const medicos = [
  {n:'Dr. Ricardo Campos', e:'Cardiologia', r:'4.9', s:'Hoje às 14:30', ini:'RC'},
  {n:'Dra. Helena Vasconcelos', e:'Dermatologia', r:'4.8', s:'Amanhã às 09:00', ini:'HV'},
  {n:'Dr. Paulo Ferreira', e:'Ortopedia', r:'4.7', s:'Sex às 16:00', ini:'PF'},
];
document.getElementById('med-list').innerHTML = medicos.map(m=>`
  <div class="bg-white border border-line rounded-2xl p-4 shadow-sm flex items-center gap-3">
    <div class="w-12 h-12 rounded-full bg-petrol text-white grid place-content-center font-bold shrink-0">${m.ini}</div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-bold text-ink leading-tight">${m.n}</p>
      <p class="text-xs text-muted">${m.e}</p>
      <div class="flex items-center gap-3 mt-1 text-[11px]">
        <span class="inline-flex items-center gap-1 text-coral font-bold"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/></svg>${m.r}</span>
        <span class="text-petrol font-semibold">${m.s}</span>
      </div>
    </div>
    <button onclick="go('agendar')" class="bg-petrollite text-petrol text-xs font-bold px-3 py-2 rounded-xl shrink-0">Agendar</button>
  </div>`).join('');

const dias = [
  {d:'Seg',n:'10'},{d:'Ter',n:'11'},{d:'Qua',n:'12'},{d:'Qui',n:'13'},{d:'Sex',n:'14'},{d:'Sáb',n:'15'}
];
document.getElementById('date-row').innerHTML = dias.map((x,i)=>`
  <button onclick="selDate(this)" class="slot shrink-0 w-16 py-3 rounded-2xl border ${i===2?'sel':'bg-white border-line'} text-center">
    <span class="block text-[11px] ${i===2?'text-white/80':'text-muted'} font-medium">${x.d}</span>
    <span class="block text-lg font-bold ${i===2?'':'text-ink'}">${x.n}</span>
  </button>`).join('');
function selDate(el){
  document.querySelectorAll('#date-row .slot').forEach(s=>{s.classList.remove('sel');s.classList.add('bg-white','border-line');
    s.querySelector('span:first-child').classList.replace('text-white/80','text-muted');
    s.querySelector('span:last-child').classList.add('text-ink');});
  el.classList.add('sel');el.classList.remove('bg-white','border-line');
  el.querySelector('span:first-child').classList.replace('text-muted','text-white/80');
  el.querySelector('span:last-child').classList.remove('text-ink');
}

const horarios = ['08:00','08:30','09:00','10:30','11:00','14:00','14:30','15:30','16:00'];
document.getElementById('slot-grid').innerHTML = horarios.map((h,i)=>`
  <button onclick="selSlot(this)" class="slot py-3 rounded-xl border text-sm font-semibold ${i===6?'sel':'bg-white border-line text-ink'}">${h}</button>`).join('');
function selSlot(el){
  document.querySelectorAll('#slot-grid .slot').forEach(s=>{s.classList.remove('sel');s.classList.add('bg-white','border-line','text-ink');});
  el.classList.add('sel');el.classList.remove('bg-white','border-line','text-ink');
}
function confirmar(){ toast('✓ Consulta confirmada para Qua, 12 jul às 14:30'); setTimeout(()=>go('inicio'),1400); }

const exames = [
  {n:'Hemograma completo', d:'08 jul 2025', st:'Disponível', ok:true},
  {n:'Eletrocardiograma', d:'02 jul 2025', st:'Disponível', ok:true},
  {n:'Colesterol total e frações', d:'28 jun 2025', st:'Disponível', ok:true},
  {n:'Ultrassom abdominal', d:'Coletado 09 jul', st:'Aguardando', ok:false},
];
document.getElementById('exam-list').innerHTML = exames.map(x=>`
  <div class="bg-white border border-line rounded-2xl p-4 shadow-sm flex items-center gap-3">
    <span class="w-11 h-11 rounded-xl ${x.ok?'bg-petrollite text-petrol':'bg-corallite text-coral'} grid place-content-center shrink-0">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>
    </span>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-bold text-ink leading-tight truncate">${x.n}</p>
      <p class="text-xs text-muted">${x.d}</p>
    </div>
    ${x.ok
      ? `<button onclick="toast('Abrindo laudo em PDF')" class="bg-petrol text-white text-xs font-bold px-3 py-2 rounded-xl shrink-0">Ver laudo</button>`
      : `<span class="text-[11px] font-bold text-coral bg-corallite px-3 py-2 rounded-xl shrink-0">Aguardando</span>`}
  </div>`).join('');

const menu = [
  {n:'Dados pessoais', i:'M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 22c0-4 4-6 8-6s8 2 8 6'},
  {n:'Minha carteirinha', i:'M2 7h20v10H2zM2 11h20'},
  {n:'Histórico de consultas', i:'M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'},
  {n:'Notificações', i:'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0'},
  {n:'Ajuda e suporte', i:'M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'},
];
document.getElementById('profile-menu').innerHTML = menu.map(m=>`
  <button onclick="toast('${m.n}')" class="w-full flex items-center gap-3 p-4 text-left">
    <span class="w-9 h-9 rounded-lg bg-petrollite text-petrol grid place-content-center shrink-0">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${m.i}"/></svg>
    </span>
    <span class="text-sm font-semibold text-ink flex-1">${m.n}</span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B7C0BE" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  </button>`).join('');
