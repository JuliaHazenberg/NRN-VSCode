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

const wrap=document.getElementById('nrn-map-wrap');
const svgEl=document.getElementById('nrn-map-svg');
const cityTip=document.getElementById('nrn-city-tip');
const xbtnCity=document.getElementById('nrn-xbtn-city');
const backBtn=document.getElementById('nrn-back-btn');

const BASE_PROJ=d3.geoAlbersUsa().scale(1280).translate([480,300]);
const BASE_PATH=d3.geoPath().projection(BASE_PROJ);
let zoomG,zoomBehavior,pinGroup;
let activeCityId=null;
let blockStateClick=false,dragMoved=false;
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

function repositionPanels(){
  if(cityTip.style.display!=='none'&&activeCityId){
    const d=liveCities[activeCityId],p=BASE_PROJ([d.lon,d.lat]);
    if(p){posPanel(cityTip,...svgPt(p[0],p[1]));showX(xbtnCity,cityTip);}
  }
}

function closeCityTip(){hideSheet(cityTip);hideX(xbtnCity);activeCityId=null;}
function closeAll(){closeCityTip();}

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


xbtnCity.addEventListener('mousedown',e=>{e.stopPropagation();e.preventDefault();});
xbtnCity.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();closeAll();blockStateClick=true;setTimeout(()=>blockStateClick=false,300);});
document.getElementById('nrn-zc-in').addEventListener('click',e=>{e.stopPropagation();const r=svgEl.getBoundingClientRect();d3.select(svgEl).transition().duration(320).ease(d3.easeCubicOut).call(zoomBehavior.scaleBy,1.5,[r.width/2,r.height/2]);});
document.getElementById('nrn-zc-out').addEventListener('click',e=>{e.stopPropagation();const t=d3.zoomTransform(svgEl);if(t.k<=1.1){resetZoom(350);return;}const r=svgEl.getBoundingClientRect();d3.select(svgEl).transition().duration(320).ease(d3.easeCubicOut).call(zoomBehavior.scaleBy,0.67,[r.width/2,r.height/2]);});
document.getElementById('nrn-zc-reset').addEventListener('click',e=>{e.stopPropagation();resetZoom(380);});
backBtn.addEventListener('click',e=>{e.stopPropagation();resetZoom(420);closeAll();});

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
    // Label first, pointer-events:none so it never blocks pin clicks
    let lx=x,ly=y-20,anchor='middle';
    if(d.labelBelow)ly=y+26;
    if(d.labelRight){lx=x+17;ly=y+5;anchor='start';}
    if(d.labelLeft){lx=x-17;ly=y-13;anchor='end';}
    g.append('text').attr('x',lx).attr('y',ly).attr('text-anchor',anchor)
      .attr('font-family','Barlow Condensed,sans-serif').attr('font-size',14).attr('font-weight','700')
      .attr('letter-spacing','1.6').attr('fill','#f5a623').attr('paint-order','stroke')
      .attr('stroke','#0d1b2a').attr('stroke-width','3').attr('stroke-linejoin','round')
      .style('pointer-events','none')
      .text(d.city.toUpperCase());
    // Pin visuals — no pointer events (hit area handles it)
    g.append('circle').attr('class','nrn-pulse').attr('cx',x).attr('cy',y).attr('r',13).attr('fill','none').attr('stroke','#f5a623').attr('stroke-width','1.8').attr('opacity','.55').style('pointer-events','none');
    g.append('circle').attr('class','nrn-pulse2').attr('cx',x).attr('cy',y).attr('r',13).attr('fill','none').attr('stroke','#f5a623').attr('stroke-width','1.2').attr('opacity','.4').style('pointer-events','none');
    g.append('circle').attr('cx',x).attr('cy',y).attr('r',10).attr('fill','#0d1b2a').attr('stroke','#f5a623').attr('stroke-width','2.5').attr('class','nrn-pin-outer').style('pointer-events','none');
    g.append('circle').attr('cx',x).attr('cy',y).attr('r',5).attr('fill','#f5a623').attr('class','nrn-pin-dot').style('pointer-events','none');
    // Large transparent hit circle centered on pin
    g.append('circle').attr('cx',x).attr('cy',y).attr('r',20).attr('fill','transparent').attr('stroke','none').style('pointer-events','all');
    g.on('mouseover',function(){
      d3.select(this).select('.nrn-pin-dot').attr('fill','#ffc04d');
      d3.select(this).select('.nrn-pin-outer').attr('stroke','#ffc04d');
    });
    g.on('mouseout',function(){
      d3.select(this).select('.nrn-pin-dot').attr('fill','#f5a623');
      d3.select(this).select('.nrn-pin-outer').attr('stroke','#f5a623');
    });
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
      showSheet(cityTip);
      posPanel(cityTip,...svgPt(x,y));
      setTimeout(()=>showX(xbtnCity,cityTip),40);
      const curK=d3.zoomTransform(svgEl).k;
      if(curK<2.5) zoomToPoint(x,y,3,450,()=>repositionPanels());
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
        repositionPanels();
        backBtn.classList.toggle('nrn-show',event.transform.k>1.05);
      })
      .on('end',()=>{svgEl.classList.remove('nrn-dragging');repositionPanels();});

    svg.call(zoomBehavior.filter(event=>{
      if(event.type==='wheel')return false;
      return !event.ctrlKey&&!event.button;
    }));
    svg.on('dblclick.zoom',null);

    zoomG=svg.append('g');
    const features=topojson.feature(us,us.objects.states).features;
    zoomG.selectAll('.nrn-state').data(features).enter().append('path')
      .attr('class','nrn-state').attr('d',BASE_PATH);
    zoomG.append('path').attr('class','nrn-smesh')
      .datum(topojson.mesh(us,us.objects.states,(a,b)=>a!==b))
      .attr('fill','none').attr('stroke','#0d1b2a').attr('stroke-width','0.8').attr('d',BASE_PATH);
    buildPins();
    svg.on('click.bg',()=>{if(!dragMoved&&!blockStateClick)closeAll();});
  });
})();