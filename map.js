(function(){
const liveCities={
  sandiego:{city:'San Diego',state:'California',rides:'24',mem:'312',lat:32.72,lon:-117.16,chips:['Road','Gravel','MTB'],labelBelow:true},
  chicago: {city:'Chicago',  state:'Illinois',  rides:'52',mem:'634',lat:41.88,lon:-87.63, chips:['Road','Gravel','MTB'],labelBelow:true},
  milwaukee:{city:'Milwaukee',state:'Wisconsin', rides:'19',mem:'228',lat:43.04,lon:-87.91, chips:['Road','Gravel'],     labelRight:true},
  madison:  {city:'Madison',  state:'Wisconsin', rides:'22',mem:'261',lat:43.07,lon:-89.40, chips:['Road','Gravel'],     labelLeft:true},
  desmoines:{city:'Des Moines',state:'Iowa',     rides:'16',mem:'194',lat:41.59,lon:-93.62, chips:['Road','Gravel'],     labelBelow:true}
};
const liveCityNames=new Set(Object.values(liveCities).map(c=>c.city));
const chipCls={Road:'nrn-chip nrn-cr',Gravel:'nrn-chip nrn-cg',MTB:'nrn-chip nrn-cm'};
const requests={};
const usCities={'Alabama':['Birmingham','Huntsville','Mobile','Montgomery','Tuscaloosa'],'Alaska':['Anchorage','Fairbanks','Juneau'],'Arizona':['Flagstaff','Mesa','Phoenix','Scottsdale','Tempe','Tucson'],'Arkansas':['Fayetteville','Fort Smith','Little Rock'],'California':['Berkeley','Fresno','Long Beach','Los Angeles','Oakland','Pasadena','Sacramento','San Francisco','Santa Barbara','Santa Cruz'],'Colorado':['Aurora','Boulder','Colorado Springs','Denver','Fort Collins'],'Connecticut':['Bridgeport','Hartford','New Haven','Stamford'],'Delaware':['Dover','Wilmington'],'Florida':['Fort Lauderdale','Gainesville','Jacksonville','Miami','Naples','Orlando','Tallahassee','Tampa'],'Georgia':['Athens','Atlanta','Augusta','Macon','Savannah'],'Hawaii':['Honolulu','Kona','Maui'],'Idaho':["Boise","Coeur d'Alene",'Idaho Falls'],'Illinois':['Naperville','Peoria','Rockford','Springfield'],'Indiana':['Bloomington','Fort Wayne','Indianapolis','South Bend'],'Iowa':['Ames','Cedar Rapids','Davenport','Iowa City'],'Kansas':['Lawrence','Topeka','Wichita'],'Kentucky':['Bowling Green','Lexington','Louisville'],'Louisiana':['Baton Rouge','Lafayette','New Orleans','Shreveport'],'Maine':['Bangor','Bar Harbor','Portland'],'Maryland':['Annapolis','Baltimore','Bethesda','Frederick'],'Massachusetts':['Boston','Cambridge','Somerville','Springfield','Worcester'],'Michigan':['Ann Arbor','Detroit','Grand Rapids','Lansing','Traverse City'],'Minnesota':['Duluth','Minneapolis','Rochester','Saint Paul'],'Mississippi':['Biloxi','Jackson','Oxford'],'Missouri':['Columbia','Kansas City','Springfield','St. Louis'],'Montana':['Billings','Bozeman','Helena','Missoula'],'Nebraska':['Grand Island','Lincoln','Omaha'],'Nevada':['Henderson','Las Vegas','Reno'],'New Hampshire':['Concord','Manchester','Portsmouth'],'New Jersey':['Hoboken','Jersey City','Montclair','Newark','Princeton'],'New Mexico':['Albuquerque','Las Cruces','Santa Fe'],'New York':['Albany','Brooklyn','Buffalo','New York City','Rochester','Syracuse'],'North Carolina':['Asheville','Chapel Hill','Charlotte','Durham','Raleigh','Wilmington'],'North Dakota':['Bismarck','Fargo','Grand Forks'],'Ohio':['Akron','Cincinnati','Cleveland','Columbus','Dayton'],'Oklahoma':['Norman','Oklahoma City','Tulsa'],'Oregon':['Ashland','Bend','Eugene','Portland','Salem'],'Pennsylvania':['Allentown','Harrisburg','Philadelphia','Pittsburgh','State College'],'Rhode Island':['Newport','Providence'],'South Carolina':['Charleston','Columbia','Greenville','Myrtle Beach'],'South Dakota':['Rapid City','Sioux Falls'],'Tennessee':['Chattanooga','Knoxville','Memphis','Nashville'],'Texas':['Amarillo','Dallas','El Paso','Fort Worth','Houston','Lubbock','San Antonio','Waco'],'Utah':['Moab','Park City','Provo','Salt Lake City','St. George'],'Vermont':['Burlington','Montpelier','Stowe'],'Virginia':['Alexandria','Arlington','Charlottesville','Richmond','Roanoke','Virginia Beach'],'Washington':['Bellingham','Olympia','Seattle','Spokane','Tacoma'],'West Virginia':['Charleston','Huntington','Morgantown'],'Wisconsin':['Eau Claire','Green Bay','La Crosse','Oshkosh'],'Wyoming':['Casper','Cheyenne','Jackson']};

const wrap=document.getElementById('nrn-map-wrap');
const svgEl=document.getElementById('nrn-map-svg');
const reqPanel=document.getElementById('nrn-req-panel');
const cityTip=document.getElementById('nrn-city-tip');
const xbtnReq=document.getElementById('nrn-xbtn-req');
const xbtnCity=document.getElementById('nrn-xbtn-city');
const cityInput=document.getElementById('nrn-city-input');
const ddEl=document.getElementById('nrn-dropdown');
const voteBtn=document.getElementById('nrn-vote-btn');
const backBtn=document.getElementById('nrn-back-btn');

const BASE_PROJ=d3.geoAlbersUsa().scale(1280).translate([480,300]);
const BASE_PATH=d3.geoPath().projection(BASE_PROJ);
let zoomG,zoomBehavior,pinGroup;
let activeStateName=null,activeStateEl=null,activeCityId=null,selectedCity=null,notifyOn=false;
let blockStateClick=false,dragMoved=false;
let panelDragging=false,panelDragOX=0,panelDragOY=0,panelManualPos=false;
let mapScrollActive=false;

function showSheet(p){p.style.display='block';}
function hideSheet(p){p.style.display='none';}
function showX(btn,panel){const pr=panel.getBoundingClientRect(),wr=wrap.getBoundingClientRect();btn.style.left=(pr.right-wr.left-13)+'px';btn.style.top=(pr.top-wr.top-13)+'px';btn.style.display='flex';}
function hideX(btn){btn.style.display='none';}

function svgPt(vx,vy){const t=d3.zoomTransform(svgEl);return[t.applyX(vx),t.applyY(vy)];}

function posPanel(el,px,py){
  const wr=wrap.getBoundingClientRect(),pw=el.offsetWidth||240,ph=el.offsetHeight||180;
  let l=px+14,t=py-14;
  if(l+pw>wr.width-8)l=px-pw-14;
  if(t+ph>wr.height-8)t=wr.height-ph-8;
  if(t<8)t=8;
  el.style.left=l+'px';el.style.top=t+'px';
}

function smartPosPanel(panel,stateBounds){
  panelManualPos=false;
  const t=d3.zoomTransform(svgEl);
  const svgRect=svgEl.getBoundingClientRect();
  const wr=wrap.getBoundingClientRect();
  const scaleX=svgRect.width/960, scaleY=svgRect.height/600;
  const toWrapX=vx=>svgRect.left-wr.left+t.applyX(vx)*scaleX;
  const toWrapY=vy=>svgRect.top-wr.top+t.applyY(vy)*scaleY;
  const sx0=toWrapX(stateBounds[0][0]),sy0=toWrapY(stateBounds[0][1]);
  const sx1=toWrapX(stateBounds[1][0]),sy1=toWrapY(stateBounds[1][1]);
  const stCx=(sx0+sx1)/2,stCy=(sy0+sy1)/2;
  const pw=panel.offsetWidth||240,ph=panel.offsetHeight||320;
  const GAP=16,wW=wr.width,wH=wr.height;
  let l=sx1+GAP,top=stCy-ph/2;
  if(!(l+pw<wW-8&&sx1+GAP>0)){
    if(sx0-GAP-pw>8){l=sx0-GAP-pw;top=stCy-ph/2;}
    else if(sy0-GAP-ph>8){l=stCx-pw/2;top=sy0-GAP-ph;}
    else{l=stCx-pw/2;top=sy1+GAP;}
  }
  l=Math.max(8,Math.min(wW-pw-8,l));
  top=Math.max(8,Math.min(wH-ph-8,top));
  panel.style.left=l+'px';panel.style.top=top+'px';
}

function repositionPanels(){
  if(reqPanel.style.display!=='none'&&activeStateEl&&activeStateEl.__data__){
    const c=BASE_PATH.centroid(activeStateEl.__data__);
    if(c&&c[0]){posPanel(reqPanel,...svgPt(c[0],c[1]));showX(xbtnReq,reqPanel);}
  }
  if(cityTip.style.display!=='none'&&activeCityId){
    const d=liveCities[activeCityId],p=BASE_PROJ([d.lon,d.lat]);
    if(p){posPanel(cityTip,...svgPt(p[0],p[1]));showX(xbtnCity,cityTip);}
  }
}

function closeReq(){hideSheet(reqPanel);hideX(xbtnReq);if(activeStateEl){activeStateEl.classList.remove('nrn-active-state');activeStateEl=null;}activeStateName=null;selectedCity=null;panelManualPos=false;}
function closeCityTip(){hideSheet(cityTip);hideX(xbtnCity);activeCityId=null;}
function closeAll(){closeReq();closeCityTip();}

function zoomToFeature(feature,pad,dur,cb){
  const[[x0,y0],[x1,y1]]=BASE_PATH.bounds(feature);
  const bw=x1-x0,bh=y1-y0,cx=(x0+x1)/2,cy=(y0+y1)/2;
  const r=svgEl.getBoundingClientRect();
  const k=Math.max(1,Math.min(2.5,Math.min((r.width-pad*2)/bw,(r.height-pad*2)/bh)));
  const tx=r.width/2-cx*k,ty=r.height/2-cy*k;
  d3.select(svgEl).transition().duration(dur).ease(d3.easeCubicInOut)
    .call(zoomBehavior.transform,d3.zoomIdentity.translate(tx,ty).scale(k))
    .on('end',()=>{repositionPanels();if(cb)cb();});
  backBtn.classList.toggle('nrn-show',k>1.05);
}

function zoomToPoint(vx,vy,k,dur,cb){
  const r=svgEl.getBoundingClientRect();
  const ck=Math.max(1,Math.min(8,k));
  const tx=r.width/2-vx*ck,ty=r.height/2-vy*ck;
  d3.select(svgEl).transition().duration(dur).ease(d3.easeCubicInOut)
    .call(zoomBehavior.transform,d3.zoomIdentity.translate(tx,ty).scale(ck))
    .on('end',()=>{repositionPanels();if(cb)cb();});
  backBtn.classList.toggle('nrn-show',ck>1.05);
}

function resetZoom(dur){
  d3.select(svgEl).transition().duration(dur||420).ease(d3.easeCubicInOut)
    .call(zoomBehavior.transform,d3.zoomIdentity)
    .on('end',()=>repositionPanels());
  backBtn.classList.remove('nrn-show');
}

function showScreen(id){
  ['nrn-s1','nrn-s2','nrn-s3'].forEach(s=>{document.getElementById(s).classList.toggle('nrn-out',s!==id);});
  setTimeout(()=>showX(xbtnReq,reqPanel),20);
}

function openReqPanel(stateName,vx,vy,stateEl){
  if(blockStateClick)return;
  if(activeStateName===stateName){closeReq();return;}
  closeCityTip();closeReq();
  activeStateName=stateName;activeStateEl=stateEl;stateEl.classList.add('nrn-active-state');
  document.getElementById('nrn-panel-sname').textContent=stateName;
  cityInput.value='';selectedCity=null;voteBtn.classList.remove('nrn-ready');
  document.getElementById('nrn-vote-count').textContent='';
  ddEl.classList.remove('nrn-open');ddEl.innerHTML='';
  showScreen('nrn-s1');
  showSheet(reqPanel);
  posPanel(reqPanel,...svgPt(vx,vy));
  setTimeout(()=>{showX(xbtnReq,reqPanel);cityInput.focus();},60);
}

function updateDd(q){
  const list=(usCities[activeStateName]||[]).filter(c=>!liveCityNames.has(c));
  const matches=q?list.filter(c=>c.toLowerCase().includes(q.toLowerCase())):list;
  ddEl.innerHTML='';
  if(!matches.length){ddEl.innerHTML='<div class="nrn-drop-empty">No cities found</div>';ddEl.classList.add('nrn-open');return;}
  matches.forEach(c=>{const d=document.createElement('div');d.className='nrn-drop-item'+(c===selectedCity?' nrn-sel':'');d.textContent=c;d.addEventListener('mousedown',e=>{e.preventDefault();pickCity(c);});ddEl.appendChild(d);});
  ddEl.classList.add('nrn-open');
}

function pickCity(name){
  selectedCity=name;cityInput.value=name;ddEl.classList.remove('nrn-open');
  voteBtn.classList.add('nrn-ready');
  const k=activeStateName+'_'+name,n=requests[k]||0;
  document.getElementById('nrn-vote-count').textContent=n>0?`${n} rider${n>1?'s':''} voted for ${name}`:'';
}

cityInput.addEventListener('input',()=>{selectedCity=null;voteBtn.classList.remove('nrn-ready');updateDd(cityInput.value);});
cityInput.addEventListener('focus',()=>{if(activeStateName)updateDd(cityInput.value);});
cityInput.addEventListener('blur',()=>setTimeout(()=>ddEl.classList.remove('nrn-open'),160));

voteBtn.addEventListener('click',e=>{
  e.stopPropagation();if(!selectedCity)return;
  const k=activeStateName+'_'+selectedCity;requests[k]=(requests[k]||0)+1;
  document.getElementById('nrn-s2-badge').textContent=selectedCity+', '+activeStateName;
  notifyOn=false;document.getElementById('nrn-nt-box').classList.remove('nrn-on');
  document.getElementById('nrn-notify-fields').classList.remove('nrn-open');
  document.getElementById('nrn-nf-email').value='';document.getElementById('nrn-nf-phone').value='';
  showScreen('nrn-s2');
});

document.getElementById('nrn-notify-row').addEventListener('click',e=>{
  e.preventDefault();notifyOn=!notifyOn;
  document.getElementById('nrn-nt-box').classList.toggle('nrn-on',notifyOn);
  document.getElementById('nrn-notify-fields').classList.toggle('nrn-open',notifyOn);
});

function finish(wc){
  const em=document.getElementById('nrn-nf-email').value.trim();
  const ph=document.getElementById('nrn-nf-phone').value.trim();
  document.getElementById('nrn-done-sub').textContent=(wc&&(em||ph))
    ?`We'll reach out at ${em||ph} when NRN lands in ${selectedCity}.`
    :`${selectedCity} is on our radar. We'll announce when it goes live.`;
  showScreen('nrn-s3');
}
document.getElementById('nrn-s2-done').addEventListener('click',e=>{e.stopPropagation();finish(true);});
document.getElementById('nrn-s2-skip').addEventListener('click',e=>{e.stopPropagation();finish(false);});

xbtnReq.addEventListener('mousedown',e=>{e.stopPropagation();e.preventDefault();});
xbtnReq.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();closeAll();blockStateClick=true;setTimeout(()=>blockStateClick=false,300);});
xbtnCity.addEventListener('mousedown',e=>{e.stopPropagation();e.preventDefault();});
xbtnCity.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();closeAll();blockStateClick=true;setTimeout(()=>blockStateClick=false,300);});
reqPanel.addEventListener('mousedown',e=>e.stopPropagation());
reqPanel.addEventListener('click',e=>e.stopPropagation());
cityTip.addEventListener('mousedown',e=>e.stopPropagation());
cityTip.addEventListener('click',e=>e.stopPropagation());

document.getElementById('nrn-zc-in').addEventListener('click',e=>{e.stopPropagation();const r=svgEl.getBoundingClientRect();d3.select(svgEl).transition().duration(320).ease(d3.easeCubicOut).call(zoomBehavior.scaleBy,1.5,[r.width/2,r.height/2]);});
document.getElementById('nrn-zc-out').addEventListener('click',e=>{e.stopPropagation();const t=d3.zoomTransform(svgEl);if(t.k<=1.1){resetZoom(350);return;}const r=svgEl.getBoundingClientRect();d3.select(svgEl).transition().duration(320).ease(d3.easeCubicOut).call(zoomBehavior.scaleBy,0.67,[r.width/2,r.height/2]);});
document.getElementById('nrn-zc-reset').addEventListener('click',e=>{e.stopPropagation();resetZoom(380);});
backBtn.addEventListener('click',e=>{e.stopPropagation();resetZoom(420);closeAll();});

function makePanelDraggable(panel){
  const handle=panel.querySelector('.nrn-panel-head');
  handle.style.cursor='grab';
  handle.addEventListener('mousedown',function(e){
    if(e.button!==0)return;
    e.stopPropagation();e.preventDefault();
    panelDragging=true;panelManualPos=true;handle.style.cursor='grabbing';
    const wr=wrap.getBoundingClientRect();
    panelDragOX=e.clientX-(panel.getBoundingClientRect().left-wr.left);
    panelDragOY=e.clientY-(panel.getBoundingClientRect().top-wr.top);
    function onMove(e){
      if(!panelDragging)return;
      const wr2=wrap.getBoundingClientRect();
      let l=Math.max(0,Math.min(wr2.width-panel.offsetWidth,e.clientX-wr2.left-panelDragOX));
      let t=Math.max(0,Math.min(wr2.height-panel.offsetHeight,e.clientY-wr2.top-panelDragOY));
      panel.style.left=l+'px';panel.style.top=t+'px';
      showX(xbtnReq,panel);
    }
    function onUp(){panelDragging=false;handle.style.cursor='grab';document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);}
    document.addEventListener('mousemove',onMove);
    document.addEventListener('mouseup',onUp);
  });
}

function updatePinScales(k){
  if(!pinGroup)return;
  pinGroup.selectAll('.nrn-pin-group').each(function(){
    const g=d3.select(this);
    const x=+g.attr('data-x'),y=+g.attr('data-y');
    const dotScale=Math.max(0.45,Math.pow(1/k,0.55));
    const labelScale=Math.max(0.55,Math.pow(1/k,0.35));
    g.selectAll('circle').attr('transform',`translate(${x},${y}) scale(${dotScale}) translate(${-x},${-y})`);
    g.selectAll('text').each(function(){
      const t=d3.select(this);
      const tx=+t.attr('x')||x,ty=+t.attr('y')||y;
      t.attr('transform',`translate(${tx},${ty}) scale(${labelScale}) translate(${-tx},${-ty})`);
    });
  });
}

function buildPins(){
  if(pinGroup)pinGroup.remove();
  pinGroup=zoomG.append('g');
  Object.entries(liveCities).forEach(([id,d])=>{
    const pt=BASE_PROJ([d.lon,d.lat]);if(!pt)return;
    const[x,y]=pt;
    const g=pinGroup.append('g').attr('class','nrn-pin-group').attr('data-x',x).attr('data-y',y).style('cursor','pointer');
    g.append('rect').attr('x',x-32).attr('y',y-28).attr('width',64).attr('height',52).attr('fill','transparent').attr('stroke','none').style('pointer-events','all');
    g.append('circle').attr('class','nrn-pulse').attr('cx',x).attr('cy',y).attr('r',13).attr('fill','none').attr('stroke','#f5a623').attr('stroke-width','1.8').attr('opacity','.55');
    g.append('circle').attr('class','nrn-pulse2').attr('cx',x).attr('cy',y).attr('r',13).attr('fill','none').attr('stroke','#f5a623').attr('stroke-width','1.2').attr('opacity','.4');
    g.append('circle').attr('cx',x).attr('cy',y).attr('r',10).attr('fill','#0d1b2a').attr('stroke','#f5a623').attr('stroke-width','2.5').attr('class','nrn-pin-outer');
    g.append('circle').attr('cx',x).attr('cy',y).attr('r',5).attr('fill','#f5a623').attr('class','nrn-pin-dot');
    let lx=x,ly=y-20,anchor='middle';
    if(d.labelBelow)ly=y+26;
    if(d.labelRight){lx=x+17;ly=y+5;anchor='start';}
    if(d.labelLeft){lx=x-17;ly=y-13;anchor='end';}
    g.append('text').attr('x',lx).attr('y',ly).attr('text-anchor',anchor)
      .attr('font-family','Barlow Condensed,sans-serif').attr('font-size',14).attr('font-weight','700')
      .attr('letter-spacing','1.6').attr('fill','#f5a623').attr('paint-order','stroke')
      .attr('stroke','#0d1b2a').attr('stroke-width','3').attr('stroke-linejoin','round')
      .text(d.city.toUpperCase());
    g.on('mouseover',function(){d3.select(this).select('.nrn-pin-dot').attr('fill','#ffc04d');d3.select(this).select('.nrn-pin-outer').attr('stroke','#ffc04d');});
    g.on('mouseout',function(){d3.select(this).select('.nrn-pin-dot').attr('fill','#f5a623');d3.select(this).select('.nrn-pin-outer').attr('stroke','#f5a623');});
    g.on('click',function(event){
      event.stopPropagation();if(dragMoved||blockStateClick)return;
      if(activeCityId===id){closeCityTip();return;}
      closeAll();activeCityId=id;
      document.getElementById('nrn-t-city').textContent=d.city;
      document.getElementById('nrn-t-state').textContent=d.state;
      document.getElementById('nrn-t-rides').textContent=d.rides;
      const cc=document.getElementById('nrn-t-chips');cc.innerHTML='';
      d.chips.forEach(c=>{const s=document.createElement('span');s.className=chipCls[c]||'nrn-chip';s.textContent=c;cc.appendChild(s);});
      document.getElementById('nrn-hub-btn').onclick=()=>{
        const cityEl=document.querySelector(`.ctab[onclick*="${id}"]`);
        if(cityEl) switchCity(id, cityEl);
        document.getElementById('cities')?.scrollIntoView({behavior:'smooth'});
      };
      const toK=Math.max(d3.zoomTransform(svgEl).k,3);
      zoomToPoint(x,y,toK,460,()=>{
        showSheet(cityTip);
        posPanel(cityTip,...svgPt(x,y));
        setTimeout(()=>showX(xbtnCity,cityTip),60);
      });
    });
  });
  updatePinScales(d3.zoomTransform(svgEl).k||1);
}

fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
  .then(r=>r.json())
  .then(us=>{
    const svg=d3.select(svgEl);
    zoomBehavior=d3.zoom().scaleExtent([0.8,8])
      .on('start',()=>{dragMoved=false;svgEl.classList.add('nrn-dragging');})
      .on('zoom',event=>{
        if(event.sourceEvent&&event.sourceEvent.type==='mousemove')dragMoved=true;
        zoomG.attr('transform',event.transform);
        updatePinScales(event.transform.k);
        if(!panelManualPos)repositionPanels();
        else showX(xbtnReq,reqPanel);
        backBtn.classList.toggle('nrn-show',event.transform.k>1.05);
      })
      .on('end',()=>{svgEl.classList.remove('nrn-dragging');if(!panelManualPos)repositionPanels();});

    mapScrollActive=true;
    svg.call(zoomBehavior.filter(event=>{
      if(event.type==='wheel')return mapScrollActive;
      return !event.ctrlKey&&!event.button;
    }));
    svg.on('dblclick.zoom',null);

    zoomG=svg.append('g');
    const features=topojson.feature(us,us.objects.states).features;
    zoomG.selectAll('.nrn-state').data(features).enter().append('path')
      .attr('class','nrn-state').attr('d',BASE_PATH)
      .on('click',function(event,d){
        event.stopPropagation();if(dragMoved||blockStateClick)return;
        this.__data__=d;
        const centroid=BASE_PATH.centroid(d);
        const bounds=BASE_PATH.bounds(d);
        zoomToFeature(d,80,500,()=>{
          openReqPanel(d.properties.name,centroid[0],centroid[1],this);
          setTimeout(()=>{smartPosPanel(reqPanel,bounds);showX(xbtnReq,reqPanel);},80);
        });
      });
    zoomG.append('path').attr('class','nrn-smesh')
      .datum(topojson.mesh(us,us.objects.states,(a,b)=>a!==b))
      .attr('fill','none').attr('stroke','#0d1b2a').attr('stroke-width','0.8').attr('d',BASE_PATH);
    buildPins();
    makePanelDraggable(reqPanel);
    svg.on('click.bg',()=>{if(!dragMoved&&!blockStateClick)closeAll();});
  });
})();