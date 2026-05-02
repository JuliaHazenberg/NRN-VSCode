// ── City Maps ──
const cityMapData = {
  sandiego: {
    center: [32.74, -117.17], zoom: 9.4,
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
      { lat:43.075, lng:-89.384, type:'ride',  name:'State Capitol',          note:'Sat 7am ride start' },
      { lat:43.014, lng:-89.533, type:'ride',  name:'Verona Trailhead',       note:'Sun 7:30am ride start' },
      { lat:43.043416, lng:-89.405671, type:'shop',  name:'Neff Cycle Service',  note:'Partner · Bike shop' },
      { lat:43.096, lng:-89.4959, type:'shop',  name:'Wheel & Sprocket',       note:'Partner · Full service' },
      { lat:43.0809, lng:-89.3758, type:'cafe',  name:'Cargo Coffee',           note:'Free Drip · Bike-friendly' },
      { lat:43.076, lng:-89.397, type:'hotel', name:'Graduate Madison',        note:'15% Off · Bike storage' },
      { lat:43.068, lng:-89.393, type:'food',  name:'The Old Fashioned',      note:'10% Off · Wisconsin comfort' },
      { lat:43.069, lng:-89.393, type:'shop',  name:'Machinery Row Bicycles', note:'20% Off · Rentals' },
    ]
  },
  milwaukee: {
    center: [43.078, -87.900], zoom: 11,
    pins: [
      { lat:43.063, lng:-87.876, type:'ride',  name:'Bradford Beach',         note:'Sat 7am ride start' },
      { lat:43.093, lng:-87.900, type:'ride',  name:'Estabrook Park',         note:'Sun 8am ride start' },
      { lat:43.135, lng:-87.898, type:'shop',  name:'Wheel & Sprocket MKE',   note:'10% Off · Bike shop' },
      { lat:43.029, lng:-87.910, type:'cafe',  name:'Anodyne Coffee',         note:"Free Drip · Walker's Point" },
      { lat:43.022, lng:-87.919, type:'hotel', name:'Iron Horse Hotel',        note:'15% Off · Bike culture' },
      { lat:43.048, lng:-87.897, type:'food',  name:'Lakefront Brewery',      note:'10% Off · Post-ride pints' },
      { lat:43.135, lng:-87.898, type:'shop',  name:'Bublr Bikes',            note:'20% Off · E-bike rentals' },
    ]
  }
};

const pinColors = {
  ride:  { bg:'#f5a623', emoji:'🚴' },
  shop:  { bg:'#00c9a7', emoji:'🔧' },
  cafe:  { bg:'#4db8ff', emoji:'☕' },
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