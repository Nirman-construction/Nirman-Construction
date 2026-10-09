(function(){
  const slides=[...document.querySelectorAll('.hero-slide, .page-hero-slide')], dots=[...document.querySelectorAll('.hero-dot')];
  let current=0,timer;
  function showSlide(i){if(!slides.length)return;current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===current));dots.forEach((d,n)=>d.classList.toggle('active',n===current));}
  function start(){if(slides.length>1){clearInterval(timer);timer=setInterval(()=>showSlide(current+1),5500);}}
  dots.forEach(d=>d.addEventListener('click',()=>{showSlide(Number(d.dataset.slide));start();}));start();


  /* Smart connected enquiry form */
  const projectForm=document.getElementById('project-form');
  if(projectForm){
    const typeSelect=document.getElementById('projectType');
    const dynamic=document.getElementById('dynamic-fields');
    const dynamicTitle=document.getElementById('dynamic-title');
    const dynamicContent=document.getElementById('dynamic-content');

    const field=(label,id,html)=>`<label>${label}${html.replace('<input',`<input id="${id}"`).replace('<select',`<select id="${id}"`)}</label>`;
    const select=(id,options,placeholder='Choose an option')=>`<select id="${id}" required><option value="">${placeholder}</option>${options.map(x=>`<option>${x}</option>`).join('')}</select>`;
    const input=(id,placeholder)=>`<input id="${id}" placeholder="${placeholder}">`;

    const templates={
      'New Project':{
        title:'NEW PROJECT — TELL US ABOUT THE BUILD',
        html:`<div class="form-grid">
          ${field('Property Type','propertyType',select('propertyType',['Residential','Commercial','Residential + Commercial']))}
          ${field('Construction Scope','newScope',select('newScope',['Complete Construction','RCC / Structure Only','Brickwork & Plaster','Finishing Work','Turnkey Construction']))}
          ${field('Floors / Level','floors',select('floors',['Ground / Single Floor','G+1','G+2','G+3','G+4 or more','Not sure']))}
          ${field('Approx. Built-up Area','builtArea',input('builtArea','e.g. 2,000 sq.ft'))}
          ${field('Expected Start','timeline',select('timeline',['As soon as possible','Within 1 month','1–3 months','3–6 months','6+ months','Just planning']))}
          ${field('Budget Range','budget',select('budget',['Not decided yet','Below ₹25 lakh','₹25–50 lakh','₹50 lakh–₹1 crore','Above ₹1 crore']))}
        </div>`
      },
      'Existing Project':{
        title:'EXISTING PROJECT — WHERE ARE YOU NOW?',
        html:`<div class="form-grid">
          ${field('Current Work Stage','stage',select('stage',['Work not started / existing building','Foundation','RCC / Structure','Brickwork / Masonry','Plaster','Electrical / Plumbing','Finishing']))}
          ${field('Required Work','requiredWork',select('requiredWork',['Complete remaining work','RCC / Structural Work','Brickwork & Plaster','Electrical & Plumbing','Tiles / Flooring','Putty / Paint','Repair / Strengthening']))}
          ${field('Approx. Area','existingArea',input('existingArea','e.g. 1,500 sq.ft'))}
          ${field('Project Age','projectAge',select('projectAge',['New / Under Construction','Less than 5 years','5–10 years','10–20 years','20+ years','Not sure']))}
        </div>`
      },
      'Interior':{
        title:'INTERIOR — CHOOSE WHAT YOU WANT',
        html:`<div class="form-grid">
          ${field('Area','interiorArea',select('interiorArea',['Whole Home','Living Room','Bedroom','Kitchen','Bathroom','Office / Commercial','Multiple Areas']))}
          ${field('Interior Style','interiorStyle',select('interiorStyle',['Modern','Modern Classic','Minimalist','Luxury','Contemporary','Not sure — need advice']))}
          ${field('Work Required','interiorWork',select('interiorWork',['Design + Execution','Execution Only','Modular Kitchen','Wardrobe / Storage','False Ceiling & Lighting','Complete Interior']))}
          ${field('Approx. Area','interiorSqft',input('interiorSqft','e.g. 1,200 sq.ft'))}
        </div>`
      },
      'Renovation / Repair':{
        title:'RENOVATION / REPAIR — WHAT NEEDS ATTENTION?',
        html:`<div class="form-grid">
          ${field('Work Type','renovationWork',select('renovationWork',['House Renovation','Commercial Renovation','Repair Work','Extension / Additional Floor','Waterproofing','Structural Repair / Strengthening','Interior Renovation']))}
          ${field('Current Condition','condition',select('condition',['Good — updating required','Moderate repairs','Major repairs required','Not sure — need site assessment']))}
          ${field('Approx. Area','renovationArea',input('renovationArea','e.g. 1,000 sq.ft'))}
          ${field('Preferred Start','renovationStart',select('renovationStart',['As soon as possible','Within 1 month','1–3 months','3+ months']))}
        </div>`
      },
      'Designing':{
        title:'DESIGNING — WHAT SHOULD WE DESIGN?',
        html:`<div class="form-grid">
          ${field('Design Requirement','designType',select('designType',['House Plan / Floor Plan','Elevation Design','3D Exterior','Interior Design','Working / Execution Drawings','Complete Design Package']))}
          ${field('Property Type','designProperty',select('designProperty',['Residential','Commercial','Renovation / Existing Building']))}
          ${field('Approx. Area','designArea',input('designArea','e.g. 2,000 sq.ft'))}
          ${field('Design Stage','designStage',select('designStage',['Just Planning','Have a Plot','Construction Started','Existing Building']))}
        </div>`
      },
      'Consultation / Estimate':{
        title:'CONSULTATION — HOW CAN WE HELP?',
        html:`<div class="form-grid">
          ${field('Requirement','consultationType',select('consultationType',['Construction Estimate','Site / Work Consultation','BOQ / Quantity Discussion','Rate / Quotation Discussion','Civil / Structural Discussion','Interior Consultation','Other']))}
          ${field('Preferred Contact','preferredContact',select('preferredContact',['WhatsApp','Phone Call','Email']))}
        </div>`
      }
    };

    function renderType(){
      const type=typeSelect.value;
      if(!type){dynamic.hidden=true;dynamicContent.innerHTML='';return;}
      const t=templates[type]; dynamicTitle.textContent=t.title;dynamicContent.innerHTML=t.html;dynamic.hidden=false;
    }
    typeSelect.addEventListener('change',renderType);

    // Project location: Jharkhand district only
    const locationSelect=document.getElementById('location'), locStatus=document.getElementById('location-status');
    if(locationSelect){
      locationSelect.addEventListener('change',()=>{
        if(locStatus) locStatus.textContent=locationSelect.value ? 'Selected: '+locationSelect.value+', Jharkhand' : 'Nirman Construction serves projects across Jharkhand.';
      });
    }

    window.sendWhatsApp=async function(event){
      event.preventDefault();
      const get=id=>document.getElementById(id)?.value?.trim()||'';
      const name=get('name'), phone=get('phone'), location=get('location'), type=get('projectType'), extra=get('message');
      if(!name||!phone||!location||!type){alert('Please complete your name, mobile number, location and requirement.');return false;}
      if(!/^[0-9+\s-]{10,15}$/.test(phone)){alert('Please enter a valid mobile number.');return false;}
      const labels=[...dynamicContent.querySelectorAll('input,select')].map(el=>{
        const lab=el.closest('label')?.firstChild?.textContent?.trim()||el.id;
        return el.value?`${lab}: ${el.value}`:'';
      }).filter(Boolean);
      const payload={kind:'enquiry',name,phone,location,type,details:labels.join(' | '),message:extra, page:locationPath(), submittedAt:new Date().toISOString()};
      const status=document.getElementById('enquiry-status');
      const endpoint=window.NIRMAN_SHEETS_ENDPOINT||'';
      if(!endpoint){alert('Enquiry system abhi setup nahi hua hai. Please call/WhatsApp +91 8810424102.');return false;}
      const submit=projectForm.querySelector('[type="submit"]'); if(submit){submit.disabled=true;submit.textContent='Submitting…';}
      try{
        await fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:new URLSearchParams(payload).toString()});
        if(status){status.hidden=false;status.textContent='Thank you! Aapki enquiry submit ho gayi hai. Nirman Construction aapse contact karega.';}
        projectForm.reset();dynamic.hidden=true;dynamicContent.innerHTML='';
      }catch(err){alert('Enquiry save nahi ho payi. Please call/WhatsApp +91 8810424102.');}
      finally{if(submit){submit.disabled=false;submit.textContent='Submit Enquiry ✓';}}
      return false;
    };
    function locationPath(){return window.location.pathname.split('/').pop()||'index.html';}
  }


  /* FREE Google Sheets visitor counter and visit logging */
  (function(){
    const endpoint=window.NIRMAN_SHEETS_ENDPOINT||'';
    const footer=document.querySelector('.copyright');
    if(footer){const counter=document.createElement('span');counter.id='visitor-counter';counter.style.cssText='display:block;margin-top:8px;font-size:12px;opacity:.8';counter.textContent='Website visits: counting setup pending';footer.appendChild(counter);}
    if(!endpoint)return;
    try{
      if(!sessionStorage.getItem('nirman_visit_logged')){
        fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:new URLSearchParams({kind:'visit',page:location.pathname,referrer:document.referrer||'',visitedAt:new Date().toISOString()}).toString()});
        sessionStorage.setItem('nirman_visit_logged','1');
      }
      const cb='nirmanVisitorCount_'+Date.now();
      window[cb]=function(data){const el=document.getElementById('visitor-counter');if(el&&data&&typeof data.visits==='number')el.textContent='Total website visits: '+data.visits;try{delete window[cb]}catch(e){};script.remove();};
      const script=document.createElement('script');script.src=endpoint+'?action=stats&callback='+cb;script.onerror=()=>{const el=document.getElementById('visitor-counter');if(el)el.textContent='Website visitor counter temporarily unavailable';};document.head.appendChild(script);
    }catch(e){}
  })();

  /* NIRMAN FREE CHAT ASSISTANT — no paid API required */
  (function(){
    function initNirmanAI(){
      const toggle=document.querySelector('.ai-toggle');
      const panel=document.querySelector('.ai-panel');
      const widget=document.querySelector('.ai-widget');
      const close=document.querySelector('.ai-close');
      const input=document.getElementById('ai-input');
      const send=document.getElementById('ai-send');
      const messages=document.getElementById('ai-messages');
      if(!toggle||!panel||!input||!send||!messages||toggle.dataset.nirmanAiReady==='1') return;
      toggle.dataset.nirmanAiReady='1';
      const add=(text,who)=>{const el=document.createElement('div');el.className='ai-msg '+who;el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el;};
      const answers=[
        {keys:['service','services','kaam','kya kya','kya karte','construction work'],answer:'Nirman Construction Ranchi aur aas-paas residential aur commercial construction, RCC/structure, brickwork, plaster, electrical, plumbing, tiles, putty, paint, renovation/repair aur finishing work mein madad karta hai. Apni requirement batane ke liye Get Quote form bharein.'},
        {keys:['turnkey','complete construction','poora ghar','pura ghar'],answer:'Turnkey construction mein project ko agreed scope ke mutabik planning se lekar civil work aur finishing tak coordinate kiya ja sakta hai. Exact scope, material aur rate site details dekhkar confirm honge.'},
        {keys:['interior','modular kitchen','wardrobe','false ceiling'],answer:'Interior work ke liye modular kitchen, wardrobe/storage, false ceiling, lighting aur selected interior execution discuss kar sakte hain. Area aur requirement ke saath enquiry bhejein.'},
        {keys:['quote','quotation','estimate','rate','price','cost','budget','kharcha','kitna paisa'],answer:'Quotation ke liye project location, work type, approximate area/floors, material included hai ya nahi, aur start date batayein. Get Quote form bharein; details WhatsApp par Nirman Construction ko bhejne ke liye ready ho jayengi.'},
        {keys:['contact','phone','call','number','whatsapp','baat'],answer:'Aap Nirman Construction ko +91 8810424102 par call ya WhatsApp kar sakte hain. Email: info@nirmanconstruction.net.in. Location: Bariyatu, Ranchi, Jharkhand.'},
        {keys:['location','ranchi','jharkhand','area','kahan'],answer:'Nirman Construction Bariyatu, Ranchi se residential, commercial aur civil construction enquiries leta hai. Jharkhand ke project ki location enquiry form mein select karein; service availability confirm ki jayegi.'},
        {keys:['site visit','visit','ghar dekh','plot'],answer:'Site visit ke liye apna naam, mobile number, project location aur kaam ki details Get Quote form se bhejein. Team aapse follow-up kar sakegi.'},
        {keys:['start','kab','time','timeline','shuru'],answer:'Project timeline kaam ke scope, area, design, material aur site conditions par depend karta hai. Enquiry mein expected start date batayein, phir schedule discuss kiya ja sakta hai.'},
        {keys:['material','cement','steel','sand','brick','eent'],answer:'Material supply aur labour/material-included scope project ke hisaab se confirm hota hai. Enquiry mein batayein ki aapko labour only chahiye ya material ke saath work.'},
        {keys:['hello','hi','namaste','hey'],answer:'Namaste! 👋 Nirman Construction mein aapka swagat hai. Aapko new construction, renovation, civil work, interior ya quotation mein kis cheez ki help chahiye?'},
        {keys:['quote form','get quote','enquiry','inquiry','details'],answer:'Enquiry bhejne ke liye website ke Contact page par “Get a Quote” form bharein. Submit karne par WhatsApp mein aapki details ka message khulega—use Send zaroor karein, tabhi humein enquiry milegi.'}
      ];
      function answerFor(text){const q=text.toLowerCase();for(const item of answers){if(item.keys.some(k=>q.includes(k)))return item.answer;}return 'Main Nirman Construction ka free website assistant hoon. Main services, quotation, interior, renovation aur contact ke common questions mein help kar sakta hoon. Aap apna question thoda aur specific likhein, ya Contact page par Get a Quote form bharein. Enquiry bhejne ke liye WhatsApp message mein Send dabana zaroori hai.';}
      function sendMessage(prefilled){const value=(typeof prefilled==='string'?prefilled:input.value).trim();if(!value)return;add(value,'user');input.value='';send.disabled=true;window.setTimeout(()=>{add(answerFor(value),'bot');send.disabled=false;input.focus();messages.scrollTop=messages.scrollHeight;},180);}
      toggle.addEventListener('click',()=>widget.classList.toggle('open'));
      if(close)close.addEventListener('click',()=>widget.classList.remove('open'));
      send.addEventListener('click',()=>sendMessage());
      input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();sendMessage();}});
      document.querySelectorAll('.ai-quick button').forEach(btn=>btn.addEventListener('click',()=>{const q=({services:'Aap kaun-kaun si construction services provide karte hain?',turnkey:'Turnkey construction kya hota hai?',interior:'Aap kaun-kaun se interior work karte hain?',quote:'Mujhe apne project ka quotation chahiye. Kaun si details deni hongi?'})[btn.dataset.ai]||btn.textContent;sendMessage(q);}));
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initNirmanAI);else initNirmanAI();
  })();
})();

// Accessible mobile site navigation
(() => {
  const button = document.querySelector('.mobile-nav-toggle');
  const nav = document.getElementById('site-navigation');
  if (!button || !nav) return;

  const setOpen = (open) => {
    button.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('mobile-open', open);
    button.querySelector('.menu-icon').textContent = open ? '×' : '☰';
    button.querySelector('.menu-icon').setAttribute('aria-hidden', 'true');
    button.querySelector('span:last-child').textContent = open ? 'Close' : 'Menu';
  };

  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      button.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) setOpen(false);
  });
})();
