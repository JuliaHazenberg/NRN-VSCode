// ── City Maps ──
const cityMapData = {
  sandiego: {
    center: [32.90, -117.17], zoom: 9,
    pins: [

      // -- Rides --
      { lat:32.740, lng:-117.198, type:'ride',  name:'Oceanside Pier',       note:'Sat 7am ride start' },
      { lat:32.721, lng:-117.155, type:'ride',  name:'Mission Valley',        note:'Sun 6:30am ride start' },
      { lat:32.894, lng:-117.141, type:'ride',  name:'Miramar',               note:'Sat 8am MTB start' },

      // -- Bike Shops --
      { lat:33.0524, lng:-117.296, type:'shop',  name:'Cadence Cyclery Encinitas',    note:'' },
      { lat:32.7984, lng:-117.2519, type:'shop',  name:'San Diego Cyclery',       note:'' },
      { lat:32.7441, lng:-117.1895, type:'shop',  name:'Moment Cycles (Old Town)',       note:'' },
      { lat:32.9698, lng:-117.0423, type:'shop',  name:'Poway Bicycle',       note:'' },
      { lat:32.9069, lng:-117.1197, type:'shop',  name:'Black Mountain Bicycles Diego Cyclery',       note:'' },
      { lat:33.1232, lng:-117.0781, type:'shop',  name:'Bike Blink (Escondido)',       note:'' },

      // -- Restaurants --
      { lat:32.732, lng:-117.130, type:'food',  name:'Puesto',                note:'10% Off · Post-ride tacos' },
      { lat:32.732, lng:-117.131, type:'food',  name:"Carnitas' Snack Shack", note:'Partner · Recovery meals' },

      // -- Cafes --
      { lat:32.833, lng:-117.273, type:'cafe',  name:'Bird Rock Coffee',      note:'Free Drip · Post-ride' },
      { lat:32.732, lng:-117.130, type:'cafe',  name:'Communal Coffee',       note:'Partner · Breakfast' },

      // -- Hotels --
      { lat:32.713, lng:-117.157, type:'hotel', name:'Hilton Gaslamp',        note:'15% Off · Bike storage' },
      { lat:32.681, lng:-117.177, type:'hotel', name:'Hotel del Coronado',    note:'Partner · Beach access' },
    ]
  },
  chicago: {
    center: [41.910, -87.640], zoom: 12,
    pins: [


      // -- Rides --

      // -- Bike Shops --

      // -- Restaurants --

      // -- Cafes --

      // -- Hotels --
      { lat:41.892, lng:-87.612, type:'ride',  name:'Lakefront Path',        note:'Sat 6:30am ride start' },
      { lat:41.882, lng:-87.623, type:'ride',  name:'Millennium Park',        note:'Sun 7am ride start' },
      { lat:41.876, lng:-87.619, type:'ride',  name:'Grant Park',             note:'Tue 6pm ride start' },
      { lat:41.876, lng:-87.634, type:'shop',  name:"Kozy's Cyclery",         note:'10% Off · Bike shop' },
      { lat:41.921, lng:-87.641, type:'shop',  name:'Performance Bicycle LP', note:'Partner · Rentals' },
      { lat:41.943, lng:-87.654, type:'cafe',  name:'Intelligentsia Coffee',  note:'Free Drip · Classic stop' },
      { lat:41.921, lng:-87.698, type:'cafe',  name:'Bow Truss Coffee',       note:'Partner · Pre-ride fuel' },
      { lat:41.883, lng:-87.632, type:'hotel', name:'Kimpton Gray Hotel',     note:'15% Off · Bike storage' },
      { lat:41.884, lng:-87.650, type:'hotel', name:'Ace Hotel Chicago',      note:'Partner · Fulton Market' },
      { lat:41.882, lng:-87.647, type:'food',  name:'Au Cheval',              note:'10% Off · Recovery burgers' },
      { lat:41.883, lng:-87.629, type:'food',  name:"Lou Malnati's",          note:'Partner · Deep dish' },
    ]
  },
  madison: {
    center: [43.060, -89.450], zoom: 11,
    pins: [
      // -- Rides --
      { lat:43.075, lng:-89.384, type:'ride',  name:'State Capitol',          note:'Sat 7am ride start' },
      { lat:43.014, lng:-89.533, type:'ride',  name:'Verona Trailhead',       note:'Sun 7:30am ride start' },

      // -- Bike Shops --
      { lat:43.043416, lng:-89.405671, type:'shop',  name:'Neff Cycle Service',  note:'Partner · Bike shop' },
      { lat:43.096, lng:-89.4959, type:'shop',  name:'Wheel & Sprocket',       note:'Partner · Full service' },
      { lat:43.069, lng:-89.393, type:'shop',  name:'Machinery Row Bicycles', note:'20% Off · Rentals' },

      // -- Restaurants --
      { lat:43.0725, lng:-89.4526, type:'food',  name:'Hollander Hilldale',      note:'' },
      { lat:43.077, lng:-89.3798, type:'food',  name:'Prost!',      note:'' },

      // -- Cafes --
      { lat:43.0809, lng:-89.3758, type:'cafe',  name:'Cargo Coffee',           note:'Free Drip · Bike-friendly' },

      // -- Hotels --
      // { lat:43.076, lng:-89.397, type:'hotel', name:'Graduate Madison',        note:'15% Off · Bike storage' },
    ]
  },
  milwaukee: {
    center: [43.078, -87.900], zoom: 11,
    pins: [

      // -- Rides --
      { lat:43.063, lng:-87.876, type:'ride',  name:'Bradford Beach',         note:'Sat 7am ride start' },
      { lat:43.093, lng:-87.900, type:'ride',  name:'Estabrook Park',         note:'Sun 8am ride start' },
      // -- Bike Shops --
      { lat:43.135, lng:-87.898, type:'shop',  name:'Wheel & Sprocket MKE',   note:'10% Off · Bike shop' },
      { lat:43.135, lng:-87.898, type:'shop',  name:'Bublr Bikes',            note:'20% Off · E-bike rentals' },

      // -- Restaurants --
      { lat:43.048, lng:-87.897, type:'food',  name:'Lakefront Brewery',      note:'10% Off · Post-ride pints' },

      // -- Cafes --
      { lat:43.029, lng:-87.910, type:'cafe',  name:'Anodyne Coffee',         note:"Free Drip · Walker's Point" },

      // -- Hotels --
      // { lat:43.022, lng:-87.919, type:'hotel', name:'Iron Horse Hotel',        note:'15% Off · Bike culture' },
    ]
  }
};

const pinColors = {
  ride:  { bg:'#f5a623', emoji:'🚴' },
  shop:  { bg:'#00c9a7', emoji:'🔧' },
  cafe:  { bg:'#1a78e8', emoji:'☕' },
  hotel: { bg:'#c084fc', emoji:'🏨' },
  food:  { bg:'#ff6b5b', emoji:'🍽️' },
};

const cityMaps = {};

function initCityMap(cityId) {
  const el = document.getElementById('city-map-' + cityId);
  if(!el || cityMaps[cityId]) return;
  const data = cityMapData[cityId];
  if(!data) return;

  const map = L.map(el, {
    center: data.center,
    zoom: data.zoom,
    scrollWheelZoom: false,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap © CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  data.pins.forEach(pin => {
    const color = pinColors[pin.type] || pinColors.ride;
    const icon = L.divIcon({
      className: '',
      html: `<div class="nrn-pin" style="background:${color.bg}">${color.emoji}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18],
    });
    L.marker([pin.lat, pin.lng], { icon })
      .addTo(map)
      .bindPopup(`<strong>${pin.name}</strong><span>${pin.note}</span>`);
  });

  cityMaps[cityId] = map;
  setTimeout(() => map.invalidateSize(), 100);
}


function switchTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('tab-active'));
  document.querySelectorAll('.ctab-nav').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('tab-' + id);
  if(panel) panel.classList.add('tab-active');

  if(btn) {
    btn.classList.add('active');
  } else {
    document.querySelectorAll('.ctab-nav').forEach(b => {
      if(b.dataset.tab === id) b.classList.add('active');
    });
  }
  if(id !== 'home') window.scrollTo({top:0, behavior:'smooth'});
  const url = id === 'home' ? window.location.pathname : window.location.pathname + '?tab=' + id;
  history.pushState({tab: id}, '', url);

  // Fire a virtual pageview to Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: id.charAt(0).toUpperCase() + id.slice(1),
      page_path: '/?tab=' + id
    });
  }
}

// Handle browser back/forward
window.addEventListener('popstate', function(e) {
  const id = e.state?.tab || 'home';
  switchTab(id, null);
});

// On page load, read ?tab= param (set by 404.html redirect) and open the right tab
(function() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  if (tab && document.getElementById('tab-' + tab)) {
    switchTab(tab, null);
  }
})();

// ── City hub switcher ──
function switchToCity(id){
  switchTab('home', document.querySelector('[data-tab="home"]'));
  setTimeout(()=>{
    const el = document.querySelector('.ctab[onclick*="' + id + '"]');
    if(el) switchCity(id, el);
    document.getElementById('cities')?.scrollIntoView({behavior:'smooth'});
  }, 100);
}

function switchCity(id, el){
  document.querySelectorAll('.ctab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.cpanel').forEach(p => p.classList.remove('active'));
  const p = document.getElementById('panel-' + id);
  if(p) p.classList.add('active');
  // Init map for this city (no-op if already done)
  setTimeout(() => {
    initCityMap(id);
    if(cityMaps[id]) cityMaps[id].invalidateSize();
  }, 50);
}

// ── City Filter ──
function initCityFilter(tabId) {
  const container = document.getElementById(tabId);
  if (!container) return;
  const btns = container.querySelectorAll('.filter-btn');
  const sections = container.querySelectorAll('.city-section');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      sections.forEach(section => {
        const match = filter === 'all' || section.dataset.city === filter;
        // Hide content but keep layout space with visibility
        section.style.visibility = match ? '' : 'hidden';
        section.style.height = match ? '' : '0';
        section.style.overflow = match ? '' : 'hidden';
        section.style.marginBottom = match ? '' : '0';
      });
    });
  });
}

// ── City hub collapsibles — show max 2 items, collapse rest ──
function initCollapsibles() {
  document.querySelectorAll('.cpb').forEach(block => {
    const items = Array.from(block.querySelectorAll('.pi'));
    if (items.length <= 2) return;
    const extra = document.createElement('div');
    extra.className = 'cpb-extra';
    extra.style.cssText = 'max-height:0;overflow:hidden;transition:max-height .35s ease,opacity .3s ease;opacity:0;pointer-events:none';
    items.slice(2).forEach(item => extra.appendChild(item));
    block.appendChild(extra);
    const count = items.length - 2;
    const btn = document.createElement('button');
    btn.className = 'cpb-more-btn';
    btn.textContent = '+ ' + count + ' more';
    btn.onclick = function() {
      const isOpen = extra.style.maxHeight !== '0px' && extra.style.maxHeight !== '';
      if (isOpen) {
        extra.style.maxHeight = '0';
        extra.style.opacity = '0';
        extra.style.pointerEvents = 'none';
        btn.textContent = '+ ' + count + ' more';
      } else {
        extra.style.maxHeight = extra.scrollHeight + 200 + 'px';
        extra.style.opacity = '1';
        extra.style.pointerEvents = 'auto';
        btn.textContent = '− show less';
      }
    };
    block.appendChild(btn);
  });
}

// Init San Diego map on page load
window.addEventListener('load', () => {
  setTimeout(() => initCityMap('sandiego'), 400);
  initCollapsibles();
  initCityFilter('tab-rides');   
  initCityFilter('tab-routes');  
  initCityFilter('tab-races'); 
});

// ── Rides RSVP ──
function rsvpRide(btn) {
  if(btn.classList.contains('rsvpd')) return;
  btn.textContent = '✓ You\'re In!';
  btn.classList.add('rsvpd');
  setTimeout(() => { btn.textContent = '✓ RSVP\'d'; }, 1500);
}

// ── Routes Save ──
function saveRoute(btn) {
  if(btn.classList.contains('saved')) { btn.textContent='Save Route'; btn.classList.remove('saved'); return; }
  btn.textContent = '✓ Saved';
  btn.classList.add('saved');
}

// ── Race Register ──
function registerRace(btn) {
  if(btn.classList.contains('registered')) return;
  btn.textContent = '⏳ Processing…';
  setTimeout(() => { btn.textContent = '✓ Registered'; btn.classList.add('registered'); }, 900);
}

// ── Partner portal button ──
function portalClick(btn, brand){
  const orig = btn.innerHTML;
  btn.innerHTML = '<span>⏳</span> Authenticating...';
  btn.style.background = 'rgba(0,0,0,.3)';
  btn.style.color = 'var(--teal)';
  setTimeout(()=>{
    btn.innerHTML = '<span>↗</span> Opening ' + brand + ' — Discount Applied';
    btn.style.background = 'var(--teal)';
    btn.style.color = '#0d1b2a';
    setTimeout(()=>{ btn.innerHTML=orig; btn.style.background=''; btn.style.color=''; }, 3000);
  }, 900);
}

// ── Add to cart (jerseys) ──
document.querySelectorAll('.jbtn').forEach(b => b.addEventListener('click', () => {
  const o = b.textContent;
  b.textContent = '✓ Added';
  b.style.background = '#00c9a7';
  setTimeout(() => { b.textContent = o; b.style.background = ''; }, 2000);
}));

// ── Hide unused scroll buttons ──
const hsL = document.getElementById('hsL');
const hsR = document.getElementById('hsR');
if(hsL) hsL.style.display = 'none';
if(hsR) hsR.style.display = 'none';

// ── Scroll reveal ──
const obs = new IntersectionObserver(es => {
  es.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, {threshold: .07});
document.querySelectorAll('.rev').forEach(el => obs.observe(el));

// ── 3D Jersey viewer ──
document.querySelectorAll('.jersey-3d-wrap').forEach(wrap => {
  const canvas = wrap.querySelector('canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const colA = canvas.dataset.cola || '#0a2840';
  const colB = canvas.dataset.colb || '#ff6b5b';
  const label = canvas.dataset.label || 'JERSEY';
  let angle = 0, dragging = false, lastX = 0, velX = 0;

  function jerseyPath(twist){
    const W=canvas.width, H=canvas.height;
    const cx=W/2, sh=H*0.08, sw=W*0.38, ww=W*0.28, hh=H*0.82, neck=W*0.10;
    const wL=twist*W*0.13, wR=-twist*W*0.13;
    ctx.beginPath();
    ctx.moveTo(cx-neck,sh*0.5);
    ctx.lineTo(cx-sw+wL,sh); ctx.lineTo(cx-sw*0.72+wL,sh*2.8);
    ctx.lineTo(cx-ww*0.85+wL*0.5,sh*3.2); ctx.lineTo(cx-ww+wL*0.3,hh);
    ctx.lineTo(cx+ww+wR*0.3,hh); ctx.lineTo(cx+ww*0.85+wR*0.5,sh*3.2);
    ctx.lineTo(cx+sw*0.72+wR,sh*2.8); ctx.lineTo(cx+sw+wR,sh);
    ctx.lineTo(cx+neck,sh*0.5);
    ctx.closePath();
  }

  function drawJersey(a){
    const W=canvas.width, H=canvas.height;
    ctx.clearRect(0,0,W,H);
    const twist=Math.sin(a)*0.38;
    // Shadow
    ctx.save();ctx.shadowColor='rgba(0,0,0,0.35)';ctx.shadowBlur=18;ctx.shadowOffsetY=8;
    jerseyPath(twist);ctx.fillStyle=colA;ctx.fill();ctx.restore();
    // Body
    jerseyPath(twist);
    const grad=ctx.createLinearGradient(W*0.15,0,W*0.85,0);
    grad.addColorStop(0,twist>0?'rgba(0,0,0,0.25)':'rgba(255,255,255,0.08)');
    grad.addColorStop(0.5,'rgba(255,255,255,0)');
    grad.addColorStop(1,twist<0?'rgba(0,0,0,0.25)':'rgba(255,255,255,0.08)');
    ctx.fillStyle=colA;ctx.fill();
    ctx.save();jerseyPath(twist);ctx.clip();ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
    // Stripe
    const sY1=H*0.32,sY2=H*0.48,sWL=W*0.5+twist*W*0.22,sWR=W*0.5-twist*W*0.22;
    ctx.beginPath();ctx.moveTo(W*0.5-sWL/2,sY1);ctx.lineTo(W*0.5+sWR/2,sY1);
    ctx.lineTo(W*0.5+sWR/2,sY2);ctx.lineTo(W*0.5-sWL/2,sY2);ctx.closePath();
    ctx.fillStyle=colB;ctx.globalAlpha=0.85;ctx.fill();ctx.globalAlpha=1;
    // Sheen
    const sheen=ctx.createLinearGradient(W*0.2,H*0.1,W*0.5,H*0.6);
    sheen.addColorStop(0,'rgba(255,255,255,0.13)');sheen.addColorStop(0.5,'rgba(255,255,255,0.04)');sheen.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=sheen;ctx.fill();
    // Collar
    const cx2=W/2+twist*W*0.06;
    ctx.beginPath();ctx.arc(cx2,H*0.14,W*0.07,0,Math.PI*2);
    ctx.fillStyle=colA;ctx.fill();ctx.strokeStyle=colB;ctx.lineWidth=2;ctx.stroke();
    ctx.restore();
    // Label
    ctx.save();jerseyPath(twist);ctx.clip();
    ctx.font='bold '+(W*0.065)+'px "Bebas Neue",sans-serif';
    ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,0.82)';
    const lx=W/2+twist*W*0.04;
    ctx.fillText(label,lx,H*0.65);
    ctx.font=(W*0.034)+'px "Barlow Condensed",sans-serif';
    ctx.fillStyle='rgba(255,255,255,0.38)';
    ctx.fillText('NRN 2026',lx,H*0.73);
    ctx.restore();
  }

  function tick(){
    if(!dragging){ velX*=0.94; angle+=velX*0.006; }
    drawJersey(angle);
    requestAnimationFrame(tick);
  }

  canvas.addEventListener('mousedown',e=>{dragging=true;lastX=e.clientX;velX=0;e.preventDefault();});
  canvas.addEventListener('touchstart',e=>{dragging=true;lastX=e.touches[0].clientX;velX=0;},{passive:true});
  window.addEventListener('mousemove',e=>{if(!dragging)return;const dx=e.clientX-lastX;velX=dx;angle+=dx*0.012;lastX=e.clientX;});
  window.addEventListener('touchmove',e=>{if(!dragging)return;const dx=e.touches[0].clientX-lastX;velX=dx;angle+=dx*0.012;lastX=e.touches[0].clientX;},{passive:true});
  ['mouseup','mouseleave','touchend'].forEach(ev=>window.addEventListener(ev,()=>dragging=false));
  velX=0.4;
  tick();
});

// ── Sync / OAuth Connect ──
const syncApps = {
  strava:       { name:'Strava',        icon:'🔥', logoClass:'l1', color:'#fc4c02',
    perms:[{ic:'🚴',name:'Read your activities',desc:'Sync all rides logged on Strava to NRN automatically'},{ic:'📍',name:'Access your routes',desc:'Import saved routes for group ride planning'},{ic:'🏅',name:'View segments & PRs',desc:'Display your best efforts on NRN leaderboards'}],
    steps:['Redirecting to Strava…','Verifying credentials…','Importing activity history…','Syncing segments…','Finalising connection…'],
    stats:[{n:'247',l:'Rides found'},{n:'18',l:'Routes'},{n:'94',l:'Segments'}]},
  garmin:       { name:'Garmin Connect', icon:'⌚', logoClass:'l2', color:'#007dc5',
    perms:[{ic:'⌚',name:'Read device data',desc:'Sync workouts from your Garmin device automatically'},{ic:'❤️',name:'Heart rate & metrics',desc:'Import HRV, power, and training load data'},{ic:'📡',name:'Live tracking',desc:'Share live location during NRN group rides'}],
    steps:['Redirecting to Garmin…','Authenticating device…','Reading activity files…','Syncing health metrics…','Connection established…'],
    stats:[{n:'312',l:'Activities'},{n:'4',l:'Devices'},{n:'89',l:'Days data'}]},
  trainingpeaks:{ name:'TrainingPeaks',  icon:'📊', logoClass:'l3', color:'#e1251b',
    perms:[{ic:'📊',name:'Training load & TSS',desc:'Pull structured workout data and training stress score'},{ic:'📅',name:'Training plan',desc:'See upcoming planned workouts alongside NRN rides'},{ic:'📈',name:'Performance data',desc:'Sync FTP, fitness and fatigue metrics to NRN'}],
    steps:['Redirecting to TrainingPeaks…','Authenticating account…','Pulling training plan…','Importing TSS history…','Sync complete…'],
    stats:[{n:'CTL',l:'Fitness tracked'},{n:'ATL',l:'Fatigue synced'},{n:'TSB',l:'Form imported'}]},
  wahoo:        { name:'Wahoo',          icon:'⚡', logoClass:'l4', color:'#00a8e0',
    perms:[{ic:'⚡',name:'ELEMNT head unit',desc:'Sync ride files directly from your ELEMNT GPS'},{ic:'🚲',name:'KICKR smart trainer',desc:'Import indoor structured workout data'},{ic:'🗺️',name:'Routes to device',desc:'Push NRN group ride routes to your ELEMNT'}],
    steps:['Redirecting to Wahoo…','Pairing account…','Reading ELEMNT data…','Importing KICKR sessions…','Beta sync active…'],
    stats:[{n:'Beta',l:'Status'},{n:'ELEMNT',l:'Device'},{n:'KICKR',l:'Trainer'}]},
  ridewithgps:  { name:'RideWithGPS',    icon:'🗺️', logoClass:'l5', color:'#2d7ae0',
    perms:[{ic:'🗺️',name:'Access your routes',desc:'Import and share saved routes with NRN ride groups'},{ic:'📍',name:'GPS track files',desc:'Sync .gpx files from completed rides automatically'},{ic:'👥',name:'Group route sharing',desc:'NRN can push group ride routes to your account'}],
    steps:['Redirecting to RideWithGPS…','Logging in…','Fetching route library…','Importing tracks…','Routes synced…'],
    stats:[{n:'58',l:'Routes'},{n:'124',l:'Tracks'},{n:'6',l:'Collections'}]},
  komoot:       { name:'Komoot',         icon:'🌍', logoClass:'l6', color:'#6ab04c',
    perms:[{ic:'🌍',name:'Access your tours',desc:'Import completed adventure rides into NRN'},{ic:'⛰️',name:'Route highlights',desc:'Sync Komoot highlights and waypoints to group rides'},{ic:'🔗',name:'Share collections',desc:'NRN can link curated Komoot collections to city hubs'}],
    steps:['Redirecting to Komoot…','Authenticating…','Reading tour history…','Importing collections…','Beta sync active…'],
    stats:[{n:'Beta',l:'Status'},{n:'31',l:'Tours'},{n:'8',l:'Collections'}]},
};

const connectedApps = new Set();
let currentApp = null, currentCard = null;

function syncConnect(card, appId){
  syncModalOpen(card, appId, connectedApps.has(appId));
}

function syncModalOpen(card, appId, isConnected){
  currentApp=appId; currentCard=card;
  const app=syncApps[appId]; if(!app)return;
  document.getElementById('sm-logo').textContent=app.icon;
  document.getElementById('sm-logo').className='sm-logo '+app.logoClass;
  document.getElementById('sm-app').textContent=app.name;
  document.getElementById('sm-auth-btn').style.background=app.color;
  document.getElementById('sm-perms-list').innerHTML=app.perms.map(p=>`<div class="sm-perm"><div class="sm-perm-ic">${p.ic}</div><div><div class="sm-perm-name">${p.name}</div><div class="sm-perm-desc">${p.desc}</div></div></div>`).join('');
  document.getElementById('sm-conn-stats').innerHTML=app.stats.map(s=>`<div class="sm-stat"><div class="sm-stat-n">${s.n}</div><div class="sm-stat-l">${s.l}</div></div>`).join('');
  document.getElementById('sm-conn-title').textContent=app.name+' Connected';
  document.getElementById('sm-conn-sub').textContent=`Your ${app.name} account is linked. NRN will automatically sync your rides going forward.`;
  smShow(isConnected?'sm-s3':'sm-s1');
  document.getElementById('sync-modal').classList.add('open');
  document.body.style.overflow='hidden';
}

function syncModalClose(){
  document.getElementById('sync-modal').classList.remove('open');
  document.body.style.overflow='';
  currentApp=null; currentCard=null;
}

function smShow(id){
  ['sm-s1','sm-s2','sm-s3'].forEach(s=>document.getElementById(s).classList.toggle('sm-active',s===id));
}

function syncAuthorize(){
  if(!currentApp)return;
  const app=syncApps[currentApp];
  smShow('sm-s2');
  const stepEl=document.getElementById('sm-steps');
  stepEl.innerHTML=app.steps.map((s,i)=>`<li class="sm-step" id="sm-step-${i}"><div class="sm-step-ic">◦</div><span>${s}</span></li>`).join('');
  let i=0;
  function nextStep(){
    if(i>0){const prev=document.getElementById(`sm-step-${i-1}`);if(prev){prev.classList.remove('active');prev.classList.add('done');prev.querySelector('.sm-step-ic').textContent='✓';}}
    if(i<app.steps.length){const cur=document.getElementById(`sm-step-${i}`);if(cur)cur.classList.add('active');i++;setTimeout(nextStep,520+Math.random()*280);}
    else{setTimeout(()=>{connectedApps.add(currentApp);if(currentCard){currentCard.classList.add('sc-connected');currentCard.querySelector('.sconn-btn').textContent='✓ Connected';}smShow('sm-s3');},400);}
  }
  setTimeout(nextStep,300);
}

function syncDisconnect(){
  if(!currentApp)return;
  connectedApps.delete(currentApp);
  if(currentCard){currentCard.classList.remove('sc-connected');currentCard.querySelector('.sconn-btn').textContent='Connect';}
  syncModalClose();
}
// ── Nav + chain bar height tracking ──────────────────────────────────────────
function smoothScrollTo(id, offset) {
  const el = document.getElementById(id);
  if (!el) return;
  const target = el.getBoundingClientRect().top + window.scrollY - offset;
  const start = window.scrollY;
  const distance = target - start;
  const duration = 700;
  let startTime = null;
  function ease(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function setHeights() {
  const navEl = document.querySelector('nav');
  const chainEl = document.querySelector('.chain-bar');
  if (!navEl || !chainEl) return;
  const navH = navEl.offsetHeight;
  const chainH = chainEl.offsetHeight;
  document.documentElement.style.setProperty('--nav-h', navH + 'px');
  document.documentElement.style.setProperty('--chain-h', chainH + 'px');
  document.documentElement.style.setProperty('--bar-total', (navH + chainH + 10) + 'px');
}
setHeights();
window.addEventListener('resize', setHeights);
/* VALUE CARD EXPAND */
function toggleValueCard(btn){
  const isOpen = btn.classList.toggle('open');
  const card = btn.closest('.value-card');
  const detail = card.querySelector('.value-detail');
  if(detail) detail.classList.toggle('open', isOpen);
}
/* ═══════════════════════════════════════════════════════
   ROUTES — Leaflet card thumbnails + Detail Panel
   ═══════════════════════════════════════════════════════ */

// Real GPX coords for the Afternoon Ride (sampled ~300pts)
const AFTERNOON_RIDE_COORDS = [[43.077488,-89.382637],[43.07676,-89.38299],[43.076184,-89.381964],[43.077117,-89.379931],[43.076021,-89.37854],[43.075502,-89.377197],[43.075998,-89.375467],[43.07462,-89.376701],[43.073074,-89.377989],[43.072076,-89.3791],[43.073491,-89.377775],[43.074881,-89.376366],[43.075689,-89.374966],[43.075367,-89.375806],[43.073864,-89.377519],[43.072283,-89.378911],[43.070954,-89.38049],[43.069643,-89.382698],[43.068106,-89.384536],[43.066817,-89.386487],[43.065639,-89.388652],[43.0641,-89.390201],[43.063513,-89.392353],[43.064389,-89.395114],[43.063519,-89.397544],[43.062749,-89.399688],[43.060965,-89.399942],[43.060993,-89.401229],[43.060992,-89.403694],[43.059604,-89.404116],[43.057391,-89.404098],[43.056167,-89.405548],[43.056153,-89.408538],[43.053899,-89.409437],[43.051455,-89.410161],[43.049655,-89.41175],[43.049727,-89.415288],[43.049153,-89.417941],[43.048665,-89.421053],[43.046539,-89.421201],[43.045596,-89.423296],[43.045733,-89.42584],[43.04543,-89.427649],[43.044138,-89.43051],[43.042417,-89.432671],[43.04075,-89.432677],[43.038872,-89.432897],[43.038238,-89.435018],[43.038381,-89.437298],[43.039067,-89.438872],[43.039428,-89.441199],[43.039463,-89.443488],[43.03866,-89.443336],[43.03773,-89.443364],[43.036729,-89.44368],[43.035242,-89.443726],[43.032605,-89.444638],[43.029956,-89.446209],[43.027793,-89.447449],[43.025391,-89.448384],[43.023215,-89.449263],[43.021606,-89.450381],[43.020558,-89.452223],[43.019466,-89.454137],[43.017952,-89.455355],[43.016111,-89.455385],[43.014097,-89.45586],[43.012391,-89.456295],[43.010573,-89.456803],[43.008718,-89.457259],[43.006744,-89.457823],[43.005526,-89.459253],[43.004691,-89.460661],[43.002655,-89.460523],[43.000758,-89.460394],[42.998762,-89.460279],[42.996821,-89.460165],[42.995105,-89.460146],[42.993157,-89.460383],[42.991105,-89.46072],[42.989034,-89.461054],[42.986992,-89.461392],[42.984987,-89.46173],[42.984189,-89.463026],[42.984311,-89.464847],[42.983898,-89.466184],[42.982146,-89.467952],[42.980439,-89.469676],[42.978971,-89.471003],[42.977028,-89.472488],[42.975288,-89.473801],[42.973685,-89.474977],[42.972662,-89.475726],[42.971051,-89.476162],[42.968805,-89.476273],[42.966666,-89.476358],[42.964748,-89.476427],[42.962985,-89.476486],[42.961293,-89.476527],[42.959552,-89.476605],[42.960254,-89.478698],[42.961113,-89.480742],[42.959505,-89.481704],[42.957843,-89.482367],[42.956138,-89.4826],[42.954501,-89.483186],[42.953091,-89.484298],[42.95128,-89.48542],[42.949231,-89.485462],[42.947836,-89.485537],[42.945913,-89.485573],[42.944022,-89.48555],[42.943383,-89.483872],[42.942715,-89.481975],[42.941585,-89.483652],[42.940604,-89.485324],[42.939363,-89.487483],[42.937935,-89.490535],[42.936469,-89.493596],[42.934681,-89.494534],[42.933325,-89.495656],[42.931774,-89.498085],[42.930953,-89.499345],[42.929042,-89.500603],[42.92863,-89.504033],[42.928784,-89.506112],[42.929014,-89.50909],[42.929143,-89.512562],[42.92922,-89.515635],[42.929338,-89.519822],[42.929407,-89.522578],[42.929446,-89.525456],[42.930927,-89.526235],[42.933119,-89.526202],[42.935359,-89.526314],[42.937555,-89.526235],[42.939532,-89.526748],[42.941295,-89.52735],[42.943124,-89.5279],[42.944335,-89.527953],[42.946139,-89.526761],[42.947842,-89.526207],[42.950001,-89.526531],[42.951565,-89.525997],[42.953595,-89.524292],[42.955758,-89.524113],[42.957344,-89.523939],[42.958312,-89.524139],[42.959358,-89.524084],[42.962201,-89.523719],[42.963233,-89.523229],[42.964796,-89.523138],[42.967445,-89.523226],[42.970129,-89.523478],[42.97235,-89.522897],[42.97347,-89.524914],[42.975767,-89.526647],[42.977288,-89.526459],[42.978114,-89.524042],[42.978729,-89.521483],[42.979478,-89.518405],[42.980894,-89.516685],[42.982984,-89.516716],[42.985268,-89.516296],[42.987209,-89.516317],[42.988001,-89.513852],[42.990234,-89.51384],[42.99228,-89.51329],[42.993453,-89.511001],[42.992862,-89.508377],[42.993635,-89.50572],[42.994891,-89.50333],[42.99617,-89.500849],[42.997435,-89.498417],[42.998694,-89.495985],[42.999948,-89.493565],[43.001165,-89.491212],[43.002348,-89.488921],[43.003565,-89.486592],[43.004779,-89.484231],[43.006053,-89.481752],[43.007292,-89.479366],[43.008527,-89.476997],[43.010139,-89.475034],[43.012002,-89.473392],[43.013757,-89.471652],[43.01529,-89.470341],[43.01718,-89.468674],[43.019313,-89.46668],[43.02146,-89.464768],[43.023262,-89.462707],[43.024032,-89.459596],[43.024422,-89.456133],[43.0248,-89.452868],[43.025151,-89.449771],[43.025983,-89.447991],[43.027981,-89.447188],[43.030002,-89.446059],[43.031863,-89.444967],[43.033356,-89.444045],[43.034905,-89.44355],[43.037228,-89.443529],[43.039531,-89.443176],[43.0394,-89.440112],[43.038298,-89.437153],[43.038536,-89.433273],[43.040771,-89.432661],[43.042718,-89.432374],[43.044267,-89.430128],[43.045119,-89.428101],[43.045621,-89.424892],[43.045809,-89.42125],[43.048099,-89.421535],[43.048815,-89.41916],[43.049527,-89.41597],[43.049624,-89.412768],[43.050727,-89.41058],[43.052688,-89.409305],[43.054917,-89.40939],[43.056201,-89.407455],[43.056214,-89.404562],[43.057366,-89.4024],[43.058817,-89.399366],[43.057458,-89.398059],[43.057048,-89.395489],[43.056891,-89.392508],[43.056805,-89.389616],[43.056037,-89.388164],[43.055993,-89.385357],[43.055957,-89.381488],[43.054539,-89.380005],[43.052856,-89.378201],[43.05112,-89.377553],[43.049373,-89.376741],[43.047706,-89.375299],[43.046121,-89.372874],[43.044785,-89.370711],[43.044091,-89.368102],[43.044742,-89.365684],[43.046037,-89.363874],[43.04691,-89.361547],[43.046656,-89.358679],[43.047695,-89.355864],[43.049156,-89.354634],[43.0494,-89.351184],[43.049959,-89.348299],[43.049809,-89.345169],[43.05021,-89.342561],[43.050948,-89.339728],[43.050309,-89.337737],[43.050258,-89.33621],[43.052537,-89.336876],[43.054676,-89.336744],[43.056612,-89.336949],[43.058812,-89.338088],[43.058724,-89.340818],[43.05885,-89.343024],[43.060229,-89.346015],[43.05862,-89.347793],[43.057062,-89.349528],[43.058228,-89.350465],[43.059755,-89.350581],[43.061787,-89.34965],[43.064014,-89.348195],[43.065666,-89.346082],[43.066716,-89.34378],[43.066919,-89.341911],[43.068301,-89.340063],[43.069591,-89.338343],[43.070984,-89.336538],[43.071325,-89.333361],[43.07222,-89.330875],[43.073731,-89.329064],[43.072886,-89.327754],[43.072861,-89.32497],[43.072904,-89.322152],[43.073389,-89.320004],[43.074862,-89.318196],[43.076016,-89.316462],[43.077561,-89.317119],[43.079146,-89.316968],[43.081254,-89.316328],[43.083545,-89.316364],[43.085782,-89.316444],[43.087016,-89.318171],[43.08824,-89.320981],[43.089603,-89.324045],[43.090453,-89.326528],[43.091735,-89.329424],[43.09301,-89.332341],[43.094228,-89.33512],[43.095404,-89.337807],[43.096642,-89.340629],[43.09655,-89.34316],[43.095439,-89.345239],[43.09428,-89.347435],[43.0932,-89.349709],[43.092507,-89.352767],[43.091991,-89.355617],[43.091004,-89.357575],[43.09163,-89.36041],[43.089898,-89.362831],[43.08822,-89.365216],[43.086571,-89.367571],[43.085004,-89.369814],[43.083415,-89.372029],[43.081807,-89.374314],[43.080254,-89.376589],[43.078647,-89.378852]];

const AFTERNOON_ELEVATION_FT = [866.1,875.3,830.7,823.5,826.8,839.9,836,839.9,837.9,837.3,841.2,857.6,853.7,852.4,854.3,875.3,900.9,910.1,903.5,937.7,953.4,1000.7,1004.6,960.6,970.5,1000.7,1027.6,1039.4,1032.8,1029.5,1027.6,1028.2,1028.2,1059.1,1047.2,1027.6,1044,1021,1002.6,998.7,1023.6,1024.3,1023.6,1028.9,1017.7,1009.2,984.9,984.3,1006.6,952.1,938.3,894.4,888.5,893,910.1,931.8,954.1,942.3,1011.2,1004.6,991.5,986.9,981.6,976.4,963.9,927.8,919.9,921.9,924.5,930.4,934.4,941.6,948.2,957.3,946.2,916.7,892.4,899.6,912.1,949.5,880.6,830.1,841.2,811,822.2,799.2,803.1,811.7,805.8,809.7,815,813,820.2,815,836,830.7,825.5,832,827.4,824.1,833.3,837.9,829.4,873.4,833.3,838.6,849.7,843.2,878.6,879.9,871.4,862.2,858.3,853.7,849.1,857.6,868.1,855,857,844.5,845.8,847.8];

// Route data registry
const ROUTES = {
  'afternoon-ride': {
    title: 'Afternoon Ride 💨',
    location: 'Madison, Wisconsin',
    chips: ['Road','Rolling'],
    distance: '43.5 mi',
    elevation: '2,233 ft',
    time: '2h 36m',
    difficulty: 'Moderate',
    center: [43.013, -89.422],
    zoom: 10,
    coords: AFTERNOON_RIDE_COORDS,
    elevationFt: AFTERNOON_ELEVATION_FT,
    eleMin: 799, eleMax: 1059,
    gpxFile: 'Afternoon_Ride_.gpx',
    rwgps: 'https://ridewithgps.com/routes/new?lat=43.013&lng=-89.422',
    komoot: 'https://www.komoot.com/plan/@43.013,-89.422,10z',
  },
  'military-ridge': {
    title: 'Military Ridge Trail',
    location: 'Madison → Verona, Wisconsin',
    chips: ['Gravel','Trail'],
    distance: '52 mi',
    elevation: '1,400 ft',
    time: '3h 20m',
    difficulty: 'Moderate',
    center: [42.99, -89.52],
    zoom: 11,
    coords: null,
    elevationFt: null,
    eleMin: 820, eleMax: 1060,
  },
  'pch': {
    title: 'Pacific Coast Highway',
    location: 'San Diego, California',
    chips: ['Road','Coastal'],
    distance: '62 mi',
    elevation: '2,100 ft',
    time: '3h 30m',
    difficulty: 'Moderate',
    center: [32.72, -117.16],
    zoom: 10,
    coords: null,
    elevationFt: null,
  },
  'laguna': {
    title: 'Laguna Mountains Gravel',
    location: 'San Diego, California',
    chips: ['Gravel','Mountains'],
    distance: '55 mi',
    elevation: '6,800 ft',
    time: '4h 45m',
    difficulty: 'Epic',
    center: [32.85, -116.5],
    zoom: 10,
    coords: null,
    elevationFt: null,
  },
  'lakefront': {
    title: 'Lakefront Path North',
    location: 'Chicago, Illinois',
    chips: ['Road','Flat'],
    distance: '28 mi',
    elevation: '320 ft',
    time: '1h 30m',
    difficulty: 'Easy',
    center: [41.88, -87.63],
    zoom: 12,
    coords: null,
    elevationFt: null,
  },
  'oak-leaf': {
    title: 'Oak Leaf Trail Circuit',
    location: 'Milwaukee, Wisconsin',
    chips: ['Mixed','Loop'],
    distance: '36 mi',
    elevation: '820 ft',
    time: '2h 10m',
    difficulty: 'Easy',
    center: [43.04, -87.91],
    zoom: 11,
    coords: null,
    elevationFt: null,
  },
};

// Tile URL — free OpenStreetMap (works without API key)
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// Detail panel state
let rdpMap = null;

function openRouteDetail(routeId) {
  const r = ROUTES[routeId];
  if (!r) return;

  // Populate text
  document.getElementById('rdp-title').textContent = r.title;
  document.getElementById('rdp-location').textContent = r.location;
  document.getElementById('rdp-dist').textContent = r.distance;
  document.getElementById('rdp-elev').textContent = r.elevation;
  document.getElementById('rdp-time').textContent = r.time;
  document.getElementById('rdp-diff').textContent = r.difficulty;

  // Chips
  const chipsEl = document.getElementById('rdp-chips');
  chipsEl.innerHTML = r.chips.map(c => `<span class="rdp-chip">${c}</span>`).join('');

  // GPX download & device links
  const gpxBtn = document.getElementById('rdp-gpx-btn');
  const gpxDl  = document.getElementById('rdp-gpx-dl');
  const gpxFile = r.gpxFile || null;
  if (gpxFile) {
    gpxBtn.href = gpxFile; gpxBtn.download = gpxFile; gpxBtn.style.opacity='1'; gpxBtn.style.pointerEvents='';
    gpxDl.href  = gpxFile; gpxDl.download  = gpxFile; gpxDl.style.opacity='1';
  } else {
    gpxBtn.removeAttribute('href'); gpxBtn.style.opacity='.4'; gpxBtn.style.pointerEvents='none';
    gpxDl.removeAttribute('href');  gpxDl.style.opacity='.4';
  }
  document.getElementById('rdp-rwgps-btn').href   = r.rwgps   || `https://ridewithgps.com/routes/new?lat=${r.center[0]}&lng=${r.center[1]}`;
  document.getElementById('rdp-komoot-btn').href  = r.komoot  || `https://www.komoot.com/plan/@${r.center[0]},${r.center[1]},${r.zoom}z`;

  // Elevation profile
  const eleSection = document.getElementById('rdp-elev-section');
  if (r.elevationFt && r.elevationFt.length) {
    eleSection.style.display = '';
    drawElevationChart(r.elevationFt, r.eleMin, r.eleMax);
  } else {
    eleSection.style.display = 'none';
  }

  // Show panel — double-rAF ensures display:block is painted before transition fires
  document.getElementById('route-detail-overlay').style.display = 'block';
  const panel = document.getElementById('route-detail-panel');
  panel.style.display = 'block';
  requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('rdp-open')));
  document.body.style.overflow = 'hidden';

  // Init or update map
  setTimeout(() => {
    if (!rdpMap) {
      rdpMap = L.map('rdp-map', {
        center: r.center, zoom: r.zoom,
        zoomControl: false, attributionControl: false,
      });
      L.tileLayer(TILE_URL, {maxZoom:18}).addTo(rdpMap);
    } else {
      rdpMap.setView(r.center, r.zoom);
      rdpMap.eachLayer(l => { if (l instanceof L.Polyline || l instanceof L.CircleMarker) rdpMap.removeLayer(l); });
    }

    if (r.coords && r.coords.length) {
      const poly = L.polyline(r.coords, {color:'#f5a623', weight:3.5, opacity:.95}).addTo(rdpMap);
      // Start/end markers
      const iconStart = L.circleMarker(r.coords[0],      {radius:6,color:'#f5a623',fillColor:'#0a1626',fillOpacity:1,weight:2.5}).addTo(rdpMap);
      const iconEnd   = L.circleMarker(r.coords[r.coords.length-1], {radius:6,color:'#f5a623',fillColor:'#f5a623',fillOpacity:1,weight:2}).addTo(rdpMap);
      rdpMap.fitBounds(poly.getBounds(), {padding:[24,24]});
    }
    rdpMap.invalidateSize();
  }, 80);
}

function closeRouteDetail() {
  const panel = document.getElementById('route-detail-panel');
  panel.classList.remove('rdp-open');
  document.getElementById('route-detail-overlay').style.display = 'none';
  document.body.style.overflow = '';
  setTimeout(() => { panel.style.display = 'none'; }, 350);
}

function drawElevationChart(data, eleMin, eleMax) {
  const canvas = document.getElementById('rdp-elev-canvas');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.offsetWidth || 580;
  const h = canvas.offsetHeight || 90;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const pad = {t:6, b:6, l:4, r:4};
  const cw = w - pad.l - pad.r;
  const ch = h - pad.t - pad.b;
  const min = eleMin - 20;
  const max = eleMax + 30;

  ctx.clearRect(0, 0, w, h);

  // Build path
  const pts = data.map((v, i) => [
    pad.l + (i / (data.length - 1)) * cw,
    pad.t + ch - ((v - min) / (max - min)) * ch,
  ]);

  // Fill gradient
  const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + ch);
  grad.addColorStop(0, 'rgba(245,166,35,.35)');
  grad.addColorStop(1, 'rgba(245,166,35,.03)');
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pad.t + ch);
  pts.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.lineTo(pts[pts.length-1][0], pad.t + ch);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Stroke
  ctx.beginPath();
  pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
  ctx.strokeStyle = '#f5a623';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Labels
  document.getElementById('rdp-ele-min').textContent = eleMin + ' ft';
  document.getElementById('rdp-ele-max').textContent = eleMax + ' ft';
}

// Close panel on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeRouteDetail();
});

// Init the single real-route card thumbnail (Afternoon Ride)
let cardMapInited = false;
function initAfternoonRideCard() {
  if (cardMapInited) return;
  const el = document.getElementById('rmap-afternoon');
  if (!el) return;
  cardMapInited = true;
  const m = L.map(el, {
    zoomControl: false, attributionControl: false,
    dragging: false, scrollWheelZoom: false,
    doubleClickZoom: false, touchZoom: false, keyboard: false,
  });
  L.tileLayer(TILE_URL, { maxZoom: 18 }).addTo(m);
  const cardPoly = L.polyline(AFTERNOON_RIDE_COORDS, { color: '#1a78e8', weight: 2.5, opacity: .9 }).addTo(m);
  m.fitBounds(cardPoly.getBounds(), { padding: [12, 12] });
}

// Hook into switchTab (already defined above) via a post-load wrapper
const _switchTabOrig = window.switchTab;
window.switchTab = function(id, btn) {
  _switchTabOrig(id, btn);
  if (id === 'routes') setTimeout(initAfternoonRideCard, 120);
};
// Also fire if routes tab is somehow active on load
if (document.getElementById('tab-routes')?.classList.contains('tab-active')) {
  setTimeout(initAfternoonRideCard, 200);
}