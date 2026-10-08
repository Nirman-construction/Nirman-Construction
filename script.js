(function(){
  const slides=[...document.querySelectorAll('.hero-slide, .page-hero-slide')], dots=[...document.querySelectorAll('.hero-dot')];
  let current=0,timer;
  function showSlide(i){if(!slides.length)return;current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===current));dots.forEach((d,n)=>d.classList.toggle('active',n===current));}
  function start(){if(slides.length>1){clearInterval(timer);timer=setInterval(()=>showSlide(current+1),5500);}}
  dots.forEach(d=>d.addEventListener('click',()=>{showSlide(Number(d.dataset.slide));start();}));start();

  window.sendWhatsApp=function(event){
    if(event)event.preventDefault();
    const val=id=>document.getElementById(id)?.value.trim()||'';
    const name=val('name'),phone=val('phone'),location=val('location')||'Not provided';
    const type=document.querySelector('input[name="projectType"]:checked')?.value||'Not specified';
    let services=[...document.querySelectorAll('input[name="services"]:checked')].map(x=>x.value);
    const message=val('message')||'No extra description';

    if(!name||!phone){alert('Please enter your name and phone number.');return false}
    if(!/^[0-9+\s-]{10,15}$/.test(phone)){alert('Please enter a valid phone number.');return false}
    if(!services.length && type==='Consultation / Estimate') services=['General Consultation / Estimate'];
    if(!services.length){alert('Please select at least one service.');return false}

    const details=[`Name: ${name}`,`Phone / WhatsApp: ${phone}`,`Project Location: ${location}`,`Project Type: ${type}`];
    if(type==='New Project'){
      details.push(`Property Type: ${val('propertyType')}`,`Construction Scope: ${val('newScope')}`,`Plot / Site Size: ${val('plotSize')}`,`Floors / Level: ${val('floor')}`,`Approx. Built-up Area: ${val('builtArea')||'Not provided'}`,`Expected Start: ${val('timeline')}`);
    }else if(type==='Existing Project' || type==='Renovation / Repair'){
      details.push(`Current Work Stage: ${val('existingStage')}`,`Required Work: ${val('existingWork')}`,`Building / Project Age: ${val('buildingAge')}`,`Approx. Area: ${val('existingArea')||'Not provided'}`,`Issue / Required Work: ${val('existingIssue')||'Not provided'}`);
    }else{
      details.push(`Requirement: ${val('consultationType')}`,`Preferred Contact: ${val('preferredContact')}`);
    }
    details.push(`Services: ${services.join(', ')}`,'',`Additional Requirements: ${message}`);
    const text=['Hello Nirman Construction,','',...details].join('\n');

    // On a phone this opens the WhatsApp app when available; otherwise the normal WhatsApp web flow is used.
    window.location.href='https://wa.me/918810424102?text='+encodeURIComponent(text);
    return false;
  };

  const ai=document.getElementById('ai-assistant');
  if(ai){
    const toggle=ai.querySelector('.ai-toggle'),close=ai.querySelector('.ai-close'),input=ai.querySelector('#ai-input'),send=ai.querySelector('#ai-send'),messages=ai.querySelector('#ai-messages');
    const add=(text,who='bot')=>{const d=document.createElement('div');d.className='ai-msg '+who;d.textContent=text;messages.appendChild(d);messages.scrollTop=messages.scrollHeight;};
    const norm=s=>s.toLowerCase().replace(/[?.,!]/g,' ').replace(/\s+/g,' ').trim();
    const has=(x,arr)=>arr.some(k=>x.includes(k));
    const reply=(raw)=>{
      const x=norm(raw);
      if(!x)return 'Aap apna question bhejiye — English ya Hinglish dono chalega.';
      if(has(x,['hello','hi','hey','namaste','salam'])) return 'Hello! Main Nirman AI Assistant hoon. Aap ghar construction, RCC, brickwork, electrical, plumbing, tiles, paint, interior, planning, estimate ya turnkey ke baare mein pooch sakte hain.';
      if(has(x,['turnkey','complete construction','end to end','poora ghar'])) return 'Turnkey construction ka matlab hai project ke multiple stages ko ek coordinated scope mein handle karna — planning/coordination, civil & RCC, masonry, electrical, plumbing, flooring, interiors, painting aur finishing tak. Exact scope project discussion ke baad decide hota hai.';
      if(has(x,['service','services','kya kya kaam','kaun kaun'])) return 'Nirman Construction residential, commercial, RCC & structural work, planning/estimation, brickwork & plaster, electrical, plumbing, tiles/flooring, putty & paint, residential interiors, renovation, waterproofing aur turnkey construction services provide karta hai.';
      if(has(x,['process','procedure','kaise kaam','construction kaise'])) return 'Typical process: 1) requirement samajhna 2) site/plot discussion 3) scope & drawings review 4) quantity/estimate discussion 5) work planning 6) stage-wise execution 7) electrical/plumbing coordination 8) finishing 9) inspection & handover. Project ke hisaab se stages change ho sakte hain.';
      if(has(x,['foundation','footing','neeव','neev'])) return 'Foundation/footing ka design soil condition, building load, column layout aur structural design par depend karta hai. Site par footing size ya steel guess se decide nahi karna chahiye; approved structural drawing aur site conditions ke according execute karna safer hai.';
      if(has(x,['column','pillar'])) return 'Column planning mein grid/centre line, size, reinforcement, lap/detailing, cover, shuttering aur vertical alignment important hote hain. Existing building mein crack ya strengthening ho to structural assessment zaroori hota hai.';
      if(has(x,['beam','lintel'])) return 'Beam/lintel details span, load, wall layout aur structural design par depend karte hain. Beam depth, reinforcement ya steel quantity bina drawing ke final nahi karni chahiye.';
      if(has(x,['slab','chhat','roof','rcc slab'])) return 'RCC slab planning mein span, thickness, beam layout, reinforcement, cover, openings, electrical/plumbing sleeves, shuttering aur concrete grade coordinate kiye jaate hain. Final reinforcement structural drawing ke according hona chahiye.';
      if(has(x,['brick','brickwork','eent','masonry','blockwork'])) return 'Brickwork mein line, level, plumb, joint thickness, openings aur curing important hain. Wall thickness aur material project drawing/specification ke according select karna chahiye. Brickwork ke baad plaster ke liye surface preparation bhi important hai.';
      if(has(x,['plaster','masala','cement plaster'])) return 'Plaster work mein surface preparation, thickness, line-level, corner alignment, curing aur crack-control details important hote hain. Internal/external plaster ka scope alag ho sakta hai.';
      if(has(x,['electrical','wiring','switch','socket','light','fan','mcb','db'])) return 'Electrical planning room-wise honi chahiye: lights, fans, sockets, AC/geyser, kitchen appliances, internet/TV, DB/MCB aur earthing points pehle decide karna useful hai. Conduit routes ko civil work ke saath coordinate karna chahiye.';
      if(has(x,['plumbing','pipe','water line','drainage','toilet','bathroom','sanitary'])) return 'Plumbing planning mein water supply, hot/cold lines where required, soil/waste pipes, floor traps, vents, tank/pump connections aur kitchen/toilet points coordinate kiye jaate hain. Drainage slope aur access points bhi important hain.';
      if(has(x,['tile','tiles','flooring','marble','granite'])) return 'Tiles/flooring mein room layout, tile size, slope, level, joint alignment, skirting, wastage aur material selection pehle plan kiye jaate hain. Bathroom/kitchen areas mein required slope aur anti-skid selection important hai.';
      if(has(x,['paint','putty','primer','colour','color'])) return 'Painting sequence usually surface preparation → putty where required → sanding → primer → finish coats hota hai. Dampness/leakage ko paint se pehle address karna important hai.';
      if(has(x,['interior','kitchen','bedroom','living room','wardrobe','false ceiling','tv unit','modular kitchen','interior design'])) return 'Nirman Construction interior work mein concept/design, modular kitchen, wardrobe & storage, TV unit/feature wall, false ceiling, lighting coordination, bedroom, living/dining, bathroom finishes aur complete interior execution shamil ho sakta hai. Aap style, area aur required rooms bata den to scope ko better define kiya ja sakta hai.';
      if(has(x,['estimate','estimation','boq','quantity','cost','rate','budget','kitna lagega','kitne ka'])) return 'Estimate banane ke liye plot/built-up area, floors, structure scope, wall material, finish level, electrical/plumbing/interior scope, location aur material specifications chahiye. Aap area + floors + new/existing project + required services bata den, main estimate ke liye required inputs list kar dunga. Exact rate site/scope ke bina assume nahi karna chahiye.';
      if(has(x,['1000 sqft','1000 sq ft','1200 sqft','1500 sqft','2000 sqft'])) return 'Area mil gaya. Ab floors (G+1/G+2 etc.), new ya existing project, structure se finishing tak scope, aur desired finish level batao. Uske basis par quantity/estimate discussion ko better structure kiya ja sakta hai.';
      if(has(x,['renovation','repair','old house','purana ghar','existing'])) return 'Existing project mein pehle current condition samajhna important hai. Repair, alteration, extension, waterproofing, electrical/plumbing replacement aur finishing ko stage-wise plan kiya ja sakta hai. Structural cracks/major changes ke liye qualified engineer ki assessment useful hoti hai.';
      if(has(x,['planning','plan','map','naksha','drawing','2d','3d','elevation'])) return 'Planning mein plot dimensions, road direction, setbacks/local requirements, family needs, room sizes, staircase, parking, ventilation aur future floors consider kiye jaate hain. Structural, electrical aur plumbing drawings ko architectural plan ke saath coordinate karna best practice hai.';
      if(has(x,['ranchi','bariyatu','location','area'])) return 'Nirman Construction Bariyatu, Ranchi – 834009, Jharkhand se operate karta hai aur Ranchi aur aas-paas construction projects ke liye enquiries leta hai.';
      if(has(x,['quote','quotation','contact','start project','enquiry'])) return 'Project enquiry ke liye “Get a Quote” form open karke project type, plot size, work stage, floors aur multiple services select kar sakte hain. Description mein apni requirement likh sakte hain; enquiry WhatsApp par bheji ja sakti hai.';
      if(has(x,['thank','thanks','shukriya'])) return 'You’re welcome! Agar project related koi bhi question ho, pooch sakte hain.';
      return 'Main construction-focused guidance de sakta hoon. Aap question English ya Hinglish mein pooch sakte hain — jaise “1000 sqft G+1 mein kya kya kaam hoga?”, “RCC slab planning kya hai?”, “kitchen interior mein kya hota hai?”, “brickwork ka process kya hai?” ya “turnkey construction kya hota hai?”.';
    };
    const ask=q=>{q=q.trim();if(!q)return;add(q,'user');setTimeout(()=>add(reply(q)),180);};
    toggle?.addEventListener('click',()=>ai.classList.toggle('open'));close?.addEventListener('click',()=>ai.classList.remove('open'));send?.addEventListener('click',()=>{ask(input.value);input.value='';});input?.addEventListener('keydown',e=>{if(e.key==='Enter'){ask(input.value);input.value='';}});
    ai.querySelectorAll('[data-ai]').forEach(b=>b.addEventListener('click',()=>{const q={services:'Aapki services kya kya hain?',turnkey:'Turnkey construction kya hota hai?',process:'Construction process kya hai?',estimate:'Estimate banane ke liye kya details chahiye?',interior:'Kitchen aur bedroom interior mein kya kya hota hai?'}[b.dataset.ai];ask(q);}));
  }
  const projectForm=document.getElementById('project-form');
  if(projectForm){
    const syncProjectFields=()=>{
      const type=document.querySelector('input[name="projectType"]:checked')?.value||'New Project';
      const newFields=document.getElementById('new-project-fields');
      const existingFields=document.getElementById('existing-project-fields');
      const consultationFields=document.getElementById('consultation-fields');
      const interiorFields=document.getElementById('interior-fields');
      if(newFields)newFields.hidden=type!=='New Project';
      if(existingFields)existingFields.hidden=!(type==='Existing Project'||type==='Renovation / Repair');
      if(consultationFields)consultationFields.hidden=type!=='Consultation / Estimate';
      if(interiorFields)interiorFields.hidden=type!=='Interior';
    };
    projectForm.querySelectorAll('input[name="projectType"]').forEach(r=>r.addEventListener('change',syncProjectFields));
    syncProjectFields();
  }

  const params=new URLSearchParams(location.search),preset=params.get('service'),quoteType=params.get('type');
  if(quoteType && document.querySelector('#project-form')){
    const radio=[...document.querySelectorAll('input[name="projectType"]')].find(x=>x.value.toLowerCase()===decodeURIComponent(quoteType).toLowerCase());
    if(radio){radio.checked=true;radio.dispatchEvent(new Event('change'))}
  }
  if(preset&&document.querySelector('#project-form')){const cb=[...document.querySelectorAll('input[name="services"]')].find(x=>x.value.toLowerCase()===preset.toLowerCase());if(cb)cb.checked=true;}
  const turnkey=document.getElementById('turnkey');if(turnkey)turnkey.addEventListener('change',()=>{if(turnkey.checked)document.querySelectorAll('input[name="services"]').forEach(x=>x.checked=true);});
})();