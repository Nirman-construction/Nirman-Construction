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

    // Jharkhand hierarchical location selector: District -> City/Block -> Area/Village/Mohalla
    const district=document.getElementById('district'), cityBlock=document.getElementById('cityBlock'), locality=document.getElementById('locality'), locationHidden=document.getElementById('location'), locStatus=document.getElementById('location-status');
    const jharkhandData={"Bokaro":["Bermo","Chandankiyari","Chas","Chandrapura","Gomia","Jaridih","Kasmar","Nawadih","Petarwar"],"Chatra":["Chatra","Hunterganj","Itkhori","Kanhachatti","Kunda","Lawalong","Mayurhand","Pathalgada","Pratappur","Simaria","Tandwa"],"Deoghar":["Deoghar","Devipur","Karon","Madhupur","Mohanpur","Palojori","Sarath","Sarwan","Sonaraithari"],"Dhanbad":["Baghmara","Baliapur","Dhanbad","Egarkund","Govindpur","Jharia","Kaliyasol","Nirsa","Topchanchi"],"Dumka":["Dumka","Gopikandar","Jama","Jarmundi","Kathikund","Masalia","Ramgarh","Raneshwar","Shikaripara","Saraiyahat"],"East Singhbhum":["Baharagora","Chakulia","Dhalbhumgarh","Dumaria","Ghatshila","Golmuri-cum-Jugsalai","Gurabandha","Musabani","Patamda","Potka"],"Garhwa":["Bhandaria","Bhawnathpur","Bishunpura","Chinia","Danda","Dandai","DhuraKi","Garhwa","Kandi","Kharaundhi","Majhiaon","Meral","Nagar Untari","Ramkanda","Ramna","Ranka","Rohiniya","Sagma"],"Giridih":["Bagodar","Bengabad","Birni","Deori","Dhanwar","Dumri","Gandey","Gawan","Giridih","Jamua","Pirtand","Sariya","Tisri"],"Godda":["Basantrai","Boarijore","Godda","Mahagama","Meharma","Pathargama","Poreyahat","Sundarpahari","Thakurgangti"],"Gumla":["Albert Ekka","Basia","Bharno","Bishunpur","Chainpur","Dumri","Gumla","Ghaghra","Kamdara","Palkot","Raidih","Sisai"],"Hazaribagh":["Barkagaon","Barkatha","Bishnugarh","Chalkusha","Chouparan","Churchu","Dadi","Daru","Hazaribagh","Ichak","Katkamsandi","Katkamdag","Keredari","Padma","Tati Jhariya"],"Jamtara":["Fatehpur","Jamtara","Karmatanr","Kundhit","Nala","Narayanpur"],"Khunti":["Arki","Khunti","Karra","Murhu","Rania","Torpa"],"Koderma":["Chandwara","Domchanch","Jainagar","Koderma","Markacho","Satgawan"],"Latehar":["Barwadih","Balumath","Chandwa","Garu","Herhanj","Latehar","Mahuadanr","Manika"],"Lohardaga":["Bhandra","Kairo","Kisko","Kuru","Lohardaga","Peshrar","Senha"],"Pakur":["Amrapara","Hiranpur","Littipara","Maheshpur","Pakur","Pakuria"],"Palamu":["Bishrampur","Chainpur","Chhatarpur","Daltonganj","Haidernagar","Hussainabad","Manatu","Medininagar","Mohammadganj","Nawa Bazar","Nawadiha Bazar","Panki","Patan","Pipra","Ramgarh","Satbarwa","Tarhasi","Untari Road"],"Ramgarh":["Chitarpur","Dulmi","Gola","Mandu","Patratu","Ramgarh"],"Ranchi":["Angara","Bero","Burmu","Chanho","Itki","Kanke","Khunti Road / Namkum","Khelari","Lapung","Mandar","Nagri","Namkum","Ormanjhi","Rahe","Ratu","Silli","Sonahatu","Tamar"],"Sahibganj":["Barhait","Borio","Mandal","Pathna","Rajmahal","Sahibganj","Taljhari","Udhwa"],"Seraikela-Kharsawan":["Adityapur-Gamharia","Chandil","Gamharia","Ichagarh","Kharsawan","Kuchai","Nimdih","Rajnagar","Seraikela"],"Simdega":["Bano","Bolba","Jaldega","Kersai","Kolebira","Kurdeg","Pakartanr","Simdega","Thethaitangar"],"West Singhbhum":["Anandpur","Bandgaon","Chaibasa","Chakradharpur","Goilkera","Gudri","Hatgamharia","Jagannathpur","Jhinkpani","Khuntpani","Kumardungi","Majhgaon","Manoharpur","Noamundi","Sonua","Tonto"]};
    const citySeed={"Ranchi":["Ranchi","Bundu","Khunti?"],"Bokaro":["Bokaro Steel City","Chas","Phusro"],"Dhanbad":["Dhanbad","Jharia","Sindri","Katras"],"East Singhbhum":["Jamshedpur","Ghatshila","Mango","Jugsalai"],"Hazaribagh":["Hazaribagh","Barhi"],"Deoghar":["Deoghar","Madhupur"],"Giridih":["Giridih","Dumri"],"Palamu":["Medininagar","Daltonganj","Hussainabad"],"Ramgarh":["Ramgarh","Patratu"],"Seraikela-Kharsawan":["Adityapur","Seraikela","Chandil"],"Sahibganj":["Sahibganj","Rajmahal"],"West Singhbhum":["Chaibasa","Chakradharpur","Noamundi"],"Lohardaga":["Lohardaga"],"Gumla":["Gumla"],"Simdega":["Simdega"],"Khunti":["Khunti"],"Latehar":["Latehar"],"Koderma":["Koderma"],"Jamtara":["Jamtara"],"Dumka":["Dumka"],"Godda":["Godda"],"Pakur":["Pakur"],"Garhwa":["Garhwa"],"Chatra":["Chatra"]};
    const commonAreas=['Main Road','Station Road','Bus Stand Area','Market Area','College Road','Hospital Area','Residential Colony','Industrial Area','Village Area','Mohalla / Local Area'];
    const fill=(el,items,placeholder,disabled=false)=>{el.innerHTML='<option value="">'+placeholder+'</option>'+items.map(v=>'<option>'+v+'</option>').join('');el.disabled=disabled;};
    if(district){
      fill(district,Object.keys(jharkhandData).sort(),'Select District',false);
      district.addEventListener('change',()=>{
        const d=district.value;
        const blocks=jharkhandData[d]||[];
        const cities=(citySeed[d]||[]).filter(x=>!x.includes('?'));
        fill(cityBlock,[...cities,...blocks].filter((x,i,a)=>a.indexOf(x)===i),'Select City / Block',!d);
        fill(locality,[], 'Select Village / Block / Mohalla / Area', true);
        locationHidden.value=''; if(locStatus)locStatus.textContent=d?'Now select City / Block.':'Select District → City / Block → Area.';
      });
      cityBlock.addEventListener('change',()=>{
        const d=district.value, cb=cityBlock.value;
        const blocks=jharkhandData[d]||[];
        const options=[...commonAreas];
        if(blocks.includes(cb)) options.unshift(cb+' Block Area');
        if((citySeed[d]||[]).includes(cb)) options.unshift(cb+' Main City');
        options.push('Other Village / Locality');
        fill(locality,[...new Set(options)],'Select Village / Block / Mohalla / Area',!cb);
        locationHidden.value=''; if(locStatus)locStatus.textContent=cb?'Now select the final village / locality / mohalla.':'Select City / Block.';
      });
      locality.addEventListener('change',()=>{
        locationHidden.value=[district.value,cityBlock.value,locality.value].filter(Boolean).join(' → ');
        if(locStatus)locStatus.textContent=locationHidden.value?'Location selected: '+locationHidden.value:'Select your full project location.';
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


  /* NIRMAN AI — single local-file-safe assistant */
  (function(){
    function initNirmanAI(){
      const toggle=document.querySelector('.ai-toggle');
      const panel=document.querySelector('.ai-panel');
      const close=document.querySelector('.ai-close');
      const input=document.getElementById('ai-input');
      const send=document.getElementById('ai-send');
      const messages=document.getElementById('ai-messages');
      if(!toggle||!panel||!input||!send||!messages) return;
      if(toggle.dataset.nirmanAiReady==='1') return;
      toggle.dataset.nirmanAiReady='1';

      const add=(text,who)=>{
        const el=document.createElement('div');
        el.className='ai-msg '+who;
        el.textContent=text;
        messages.appendChild(el);
        messages.scrollTop=messages.scrollHeight;
      };

      const reply=(raw)=>{
        const x=(raw||'').trim().toLowerCase();
        if(!x) return 'Bilkul. Apna sawaal likhiye — main construction, interior, renovation, designing, estimate aur Nirman Construction ke baare mein help karunga.';
        if(/^(hi|hello|hey|hii|helo|namaste|namaskar|salaam|salam|assalamualaikum|sat sri akal|sastrayakal|pranam|good morning|good afternoon|good evening)[!,. ]*$/i.test(x))
          return 'Namaste! 👋 Welcome to Nirman Construction. Main AI hoon. Aap Hindi, Hinglish ya English mein baat kar sakte hain. Construction, interior, renovation, design ya estimate — jo chahiye poochiye.';
        if(/founder|owner|malik|who.*founder|founder.*who|site engineer/.test(x))
          return 'Nirman Construction ke founder aur site engineer Mr. Syed Shadab hain. Company Ranchi, Jharkhand se residential, commercial, civil, turnkey aur interior work handle karti hai.';
        if(/about nirman|nirman construction kya|company ke bare|company about|aapki company|who are you/.test(x))
          return 'Nirman Construction ek construction company hai jo residential, commercial, civil & RCC, brickwork, plaster, electrical, plumbing, tiles, putty, paint, renovation, turnkey aur interior solutions provide karti hai. Tagline: Where Dreams Take Shape.';
        if(/service|services|kaam|work|kya kya karte|provide/.test(x))
          return 'Hum residential, commercial, civil & RCC, brickwork, plaster, electrical, plumbing, tiles & flooring, putty & paint, renovation/repair, interior design & execution aur turnkey projects karte hain.';
        if(/interior|kitchen|bedroom|wardrobe|false ceiling|tv unit|living room|modular/.test(x))
          return 'Interior mein modular kitchen, wardrobe/storage, TV unit, false ceiling, lighting, bedroom, living/dining, bathroom finishes aur complete interior execution available hai.';
        if(/new project|naya ghar|ghar banana|construction start|new house/.test(x))
          return 'New Project ke liye property type, floors, approximate built-up area, district aur expected start date useful rahenge. Get a Quote form se enquiry bhej sakte hain.';
        if(/existing project|ongoing|chal raha|already started/.test(x))
          return 'Existing Project ke liye current stage aur required work batayein — RCC, brickwork, plaster, electrical, plumbing, tiles, paint ya remaining complete work.';
        if(/renovation|repair|marammat|extension|alteration/.test(x))
          return 'Renovation/Repair mein house/commercial renovation, extension, waterproofing, structural repair/strengthening aur interior renovation options hain.';
        if(/design|designing|plan|floor plan|elevation|3d|drawing/.test(x))
          return 'Designing mein house/floor plan, elevation, 3D exterior, interior design aur working/execution drawings ke options hain.';
        if(/turnkey|complete work|full construction/.test(x))
          return 'Turnkey project mein planning, civil/structure, masonry, electrical, plumbing, finishing aur coordinated execution ko integrated scope mein manage kiya ja sakta hai.';
        if(/estimate|quotation|quote|rate|cost|price|budget|kitna lagega/.test(x))
          return 'Estimate project type, built-up area, floors, district, specification aur scope par depend karta hai. Get a Quote form mein details select karke enquiry bhej sakte hain.';
        if(/cement|sand|steel|saria|brick|concrete|material/.test(x))
          return 'Main cement, sand, steel, brick, concrete aur basic construction quantity concepts par general guidance de sakta hoon. Exact quantity drawing, dimensions aur site conditions par depend karti hai.';
        if(/jharkhand|district|location|kahan|kahaan|service area|kaam kahan/.test(x))
          return 'Nirman Construction poore Jharkhand mein projects ke liye available hai. Get a Quote mein Jharkhand ka district select karke location de sakte hain.';
        if(/contact|phone|mobile|number|call|whatsapp|email|mail/.test(x))
          return 'Nirman Construction: +91 8810424102 | info@nirmanconstruction.net.in | Bariyatu, Ranchi, Jharkhand. WhatsApp par bhi directly contact kar sakte hain.';
        if(/thank|thanks|dhany|shukriya/.test(x))
          return 'Aapka welcome! 😊 Jab bhi construction ya interior se related help chahiye, pooch sakte hain.';
        return 'Samajh gaya. Aap thoda detail mein batayein — project New hai, Existing, Renovation, Interior ya Designing? Main uske hisaab se next step suggest karunga.';
      };

      const sendMessage=()=>{
        const value=input.value.trim();
        if(!value) return;
        add(value,'user');
        input.value='';
        setTimeout(()=>add(reply(value),'bot'),180);
      };

      toggle.addEventListener('click',()=>panel.classList.toggle('open'));
      if(close) close.addEventListener('click',()=>panel.classList.remove('open'));
      send.addEventListener('click',sendMessage);
      input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();sendMessage();}});
      document.querySelectorAll('.ai-quick button').forEach(btn=>{
        btn.addEventListener('click',()=>{
          const q=({
            services:'What services do you provide?',
            turnkey:'What is turnkey construction?',
            interior:'What interior work do you provide?',
            quote:'I want a quotation'
          })[btn.dataset.ai] || btn.textContent;
          add(q,'user');
          setTimeout(()=>add(reply(q),'bot'),180);
        });
      });
    }
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initNirmanAI);
    else initNirmanAI();
  })();

})();
