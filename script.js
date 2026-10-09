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

    window.sendWhatsApp=function(event){
      event.preventDefault();
      const get=id=>document.getElementById(id)?.value?.trim()||'';
      const name=get('name'), phone=get('phone'), location=get('location'), type=get('projectType'), extra=get('message');
      if(!name||!phone||!location||!type){alert('Please complete your name, mobile number, location and requirement.');return false;}
      if(!/^[0-9+\s-]{10,15}$/.test(phone)){alert('Please enter a valid mobile number.');return false;}
      const labels=[...dynamicContent.querySelectorAll('input,select')].map(el=>{
        const lab=el.closest('label')?.firstChild?.textContent?.trim()||el.id;
        return el.value?`${lab}: ${el.value}`:'';
      }).filter(Boolean);
      const lines=['Hello Nirman Construction,','',`Name: ${name}`,`Mobile: ${phone}`,`Location: ${location}`,`Requirement: ${type}`,...labels,'',`Additional Requirement: ${extra||'None'}`];
      const url='https://wa.me/918810424102?text='+encodeURIComponent(lines.join('\\n'));
      window.open(url,'_blank');
      return false;
    };
  }


  /* NIRMAN AI — connected to secure server-side API */
  (function(){
    async function initNirmanAI(){
      const toggle=document.querySelector('.ai-toggle');
      const panel=document.querySelector('.ai-panel');
      const widget=document.querySelector('.ai-widget');
      const close=document.querySelector('.ai-close');
      const input=document.getElementById('ai-input');
      const send=document.getElementById('ai-send');
      const messages=document.getElementById('ai-messages');
      if(!toggle||!panel||!input||!send||!messages) return;
      if(toggle.dataset.nirmanAiReady==='1') return;
      toggle.dataset.nirmanAiReady='1';
      const history=[];
      const add=(text,who)=>{
        const el=document.createElement('div');
        el.className='ai-msg '+who;
        el.textContent=text;
        messages.appendChild(el);
        messages.scrollTop=messages.scrollHeight;
        return el;
      };
      const systemFallback='Maaf kijiye, abhi AI se connection nahi ho pa raha. Aap +91 8810424102 par call ya WhatsApp kar sakte hain.';
      async function askAI(text){
        const payload=[...history,{role:'user',content:text}].slice(-12);
        const response=await fetch('/api/chat',{
          method:'POST',headers:{'Content-Type':'application/json'},
          body:JSON.stringify({messages:payload})
        });
        const data=await response.json().catch(()=>({}));
        if(!response.ok) throw new Error(data.error||'AI connection failed');
        if(!data.reply) throw new Error('Empty AI response');
        history.push({role:'user',content:text},{role:'assistant',content:data.reply});
        while(history.length>12) history.shift();
        return data.reply;
      }
      async function sendMessage(prefilled){
        const value=(typeof prefilled==='string'?prefilled:input.value).trim();
        if(!value||send.disabled) return;
        add(value,'user'); input.value=''; send.disabled=true;
        const waiting=add('Soch raha hoon…','bot');
        try{ waiting.textContent=await askAI(value); }
        catch(err){
          console.error('Nirman AI:',err);
          const detail = (err && typeof err.message === 'string') ? err.message.trim() : '';
          waiting.textContent = detail && detail !== 'AI connection failed'
            ? detail.slice(0, 260)
            : systemFallback;
        } finally {send.disabled=false; input.focus(); messages.scrollTop=messages.scrollHeight;}
      }
      toggle.addEventListener('click',()=>widget.classList.toggle('open'));
      if(close) close.addEventListener('click',()=>widget.classList.remove('open'));
      send.addEventListener('click',()=>sendMessage());
      input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();sendMessage();}});
      document.querySelectorAll('.ai-quick button').forEach(btn=>{
        btn.addEventListener('click',()=>{
          const q=({services:'Aap kaun-kaun si construction services provide karte hain?',turnkey:'Turnkey construction kya hota hai?',interior:'Aap kaun-kaun se interior work karte hain?',quote:'Mujhe apne project ka quotation chahiye. Kaun si details deni hongi?'})[btn.dataset.ai]||btn.textContent;
          sendMessage(q);
        });
      });
    }
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initNirmanAI);
    else initNirmanAI();
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
