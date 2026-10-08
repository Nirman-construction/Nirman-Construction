(function(){
  const slides=[...document.querySelectorAll('.hero-slide')], dots=[...document.querySelectorAll('.hero-dot')];
  let current=0, timer;
  function showSlide(i){ if(!slides.length)return; current=(i+slides.length)%slides.length; slides.forEach((s,n)=>s.classList.toggle('active',n===current)); dots.forEach((d,n)=>d.classList.toggle('active',n===current)); }
  function start(){ if(slides.length>1){ clearInterval(timer); timer=setInterval(()=>showSlide(current+1),5500); } }
  dots.forEach(d=>d.addEventListener('click',()=>{showSlide(Number(d.dataset.slide));start();})); start();

  window.sendWhatsApp=function(event){
    if(event) event.preventDefault();
    const name=document.getElementById('name')?.value.trim()||'';
    const phone=document.getElementById('phone')?.value.trim()||'';
    const location=document.getElementById('location')?.value.trim()||'Not provided';
    const plot=document.getElementById('plotSize')?.value||'Not provided';
    const stage=document.getElementById('workStage')?.value||'Not provided';
    const floor=document.getElementById('floor')?.value||'Not provided';
    const timeline=document.getElementById('timeline')?.value||'Not provided';
    const type=document.querySelector('input[name="projectType"]:checked')?.value||'Not specified';
    const services=[...document.querySelectorAll('input[name="services"]:checked')].map(x=>x.value);
    const message=document.getElementById('message')?.value.trim()||'No extra description';
    if(!name||!phone){ alert('Please enter your name and phone number.'); return false; }
    if(!services.length){ alert('Please select at least one service.'); return false; }
    const text=[
      'Hello Nirman Construction,','',`Name: ${name}`,`Phone: ${phone}`,`Project Location: ${location}`,`Project Type: ${type}`,`Plot / Site Size: ${plot}`,`Work Stage: ${stage}`,`Floor / Level: ${floor}`,`Expected Start: ${timeline}`,`Services: ${services.join(', ')}`,'',`Project Description: ${message}`
    ].join('\n');
    window.open('https://wa.me/9188104241402?text='+encodeURIComponent(text),'_blank');
    return false;
  };

  const ai=document.getElementById('ai-assistant');
  if(ai){
    const toggle=ai.querySelector('.ai-toggle'), close=ai.querySelector('.ai-close'), input=ai.querySelector('#ai-input'), send=ai.querySelector('#ai-send'), messages=ai.querySelector('#ai-messages');
    const add=(text,who='bot')=>{const d=document.createElement('div');d.className='ai-msg '+who;d.textContent=text;messages.appendChild(d);messages.scrollTop=messages.scrollHeight;};
    const reply=(q)=>{
      const x=q.toLowerCase();
      if(x.includes('turnkey')||x.includes('complete')) return 'Turnkey means you can combine multiple services under one coordinated project enquiry — from civil/RCC work through finishing. Select “Turnkey Construction” in the enquiry form.';
      if(x.includes('service')||x.includes('what do')) return 'We handle residential, commercial, RCC & structural work, brickwork & plaster, renovation & repair, electrical/plumbing coordination, waterproofing and turnkey projects.';
      if(x.includes('process')||x.includes('how')) return 'A simple process: understand your requirement → site/project discussion → scope & estimate → work planning → execution → progress coordination → finishing/handover.';
      if(x.includes('price')||x.includes('cost')||x.includes('rate')) return 'Project cost depends on scope, area, structure, specifications and finishing. Use the enquiry form with your plot size, floor and services so the team can understand the requirement.';
      if(x.includes('quote')||x.includes('contact')||x.includes('start')) return 'Great. Open the project enquiry form and select your project type, plot size, floor and services. You can send the complete enquiry to Nirman Construction on WhatsApp.';
      if(x.includes('ranchi')||x.includes('area')||x.includes('location')) return 'Nirman Construction is based in Bariyatu, Ranchi – 834009, Jharkhand and handles projects in Ranchi and surrounding areas.';
      return 'I can help with services, turnkey projects, the construction process, project requirements or getting a quote. Try asking “What services do you provide?”';
    };
    const ask=(q)=>{q=q.trim();if(!q)return;add(q,'user');setTimeout(()=>add(reply(q)),220);};
    toggle?.addEventListener('click',()=>ai.classList.toggle('open')); close?.addEventListener('click',()=>ai.classList.remove('open')); send?.addEventListener('click',()=>{ask(input.value);input.value='';}); input?.addEventListener('keydown',e=>{if(e.key==='Enter'){ask(input.value);input.value='';}});
    ai.querySelectorAll('[data-ai]').forEach(b=>b.addEventListener('click',()=>{const q={services:'What services do you provide?',turnkey:'What is turnkey construction?',process:'What is your construction process?',quote:'I want a quote'}[b.dataset.ai];ask(q);}));
  }
  const params=new URLSearchParams(location.search), preset=params.get('service');
  if(preset && document.querySelector('#project-form')){ const cb=[...document.querySelectorAll('input[name="services"]')].find(x=>x.value.toLowerCase()===preset.toLowerCase()); if(cb) cb.checked=true; }
  const turnkey=document.getElementById('turnkey'); if(turnkey) turnkey.addEventListener('change',()=>{if(turnkey.checked){document.querySelectorAll('input[name="services"]').forEach(x=>x.checked=true);}});
})();
