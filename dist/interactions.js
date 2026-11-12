document.getElementById('year').textContent = new Date().getFullYear();
const groups = [...document.querySelectorAll('.nav-group')];
function closePanels(except) { groups.forEach(group => { if(group !== except) group.open = false; }); }
groups.forEach(group => {
  group.addEventListener('toggle', () => { if(group.open) closePanels(group); });
  group.addEventListener('focusout', event => { if(event.relatedTarget && !group.contains(event.relatedTarget)) group.open = false; });
  group.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closePanels()));
});
document.addEventListener('click', event => { if(!event.target.closest('.nav-group')) closePanels(); });
document.addEventListener('keydown', event => {
  if(event.key !== 'Escape') return;
  const open = groups.find(group => group.open);
  if(open) { open.open = false; open.querySelector('summary').focus(); event.preventDefault(); }
});
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  const targets = [...document.querySelectorAll('section h2, section > .eyebrow, .section-head p, .approach p, .office p, .service-list article, .process-grid article, .start-options > a, .references-heading > p, .portfolio-card, .faq-list details, .contact-grid > div')];
  const observer = new IntersectionObserver(entries => entries.forEach(({target,isIntersecting,boundingClientRect}) => {
    if(isIntersecting) target.classList.remove('reveal-pending');
    else if(boundingClientRect.top > innerHeight && !reducedMotion.matches) target.classList.add('reveal-pending');
  }), {threshold:0.12,rootMargin:'0px 0px -35px 0px'});
  targets.forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--reveal-delay',(i%3)*70+'ms');if(!reducedMotion.matches && el.getBoundingClientRect().top>innerHeight)el.classList.add('reveal-pending');observer.observe(el);});
  reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)targets.forEach(e=>e.classList.remove('reveal-pending'));});
  document.addEventListener('focusin',e=>e.target.closest('.reveal-pending')?.classList.remove('reveal-pending'));
}

document.querySelectorAll('[data-project]').forEach(link=>link.addEventListener('click',()=>{document.getElementById('brief-type').value=link.dataset.project;}));
document.getElementById('project-brief').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);const text=['Merhaba ARCIS Mimarlık,','Projem hakkında görüşmek istiyorum.','',...['type','place','area','timing','message'].map((key,i)=>['Proje türü','Konum','Yaklaşık alan','Başlangıç','Proje notu'][i]+': '+(String(data.get(key)||'').trim()||'Görüşmede belirleyelim'))].join('\n');document.getElementById('brief-summary').textContent=text;document.getElementById('brief-email').href='mailto:arcis.mimarlik@gmail.com?subject='+encodeURIComponent('Yeni proje görüşmesi')+'&body='+encodeURIComponent(text);document.getElementById('brief-result').hidden=false;});
document.getElementById('brief-copy')?.addEventListener('click',async()=>{const status=document.getElementById('brief-copy-status');try{await navigator.clipboard.writeText(document.getElementById('brief-summary').textContent);status.textContent='Proje özeti kopyalandı.';}catch{status.textContent='Otomatik kopyalama yapılamadı. Aşağıdaki metni seçip kopyalayabilirsiniz.';}});

document.querySelectorAll('.reference-track').forEach(track=>{const first=track.firstElementChild;const content=first.innerHTML;first.insertAdjacentHTML('beforeend',content.replaceAll('<li>','<li aria-hidden="true" inert>'));track.lastElementChild.innerHTML=first.innerHTML;});
// Two 30px/s lanes, with scroll velocity smoothed by a damped spring.
(()=>{const lanes=[...document.querySelectorAll('.reference-track')];let last=performance.now(),scroll=window.scrollY,factor=0,spring=0,direction=1;const offsets=[0,0],media=matchMedia('(prefers-reduced-motion: reduce)');function frame(now){const dt=Math.min((now-last)/1000,.04);last=now;const next=window.scrollY,velocity=(next-scroll)/Math.max(dt,.001);scroll=next;spring+=(400*(velocity*.005-factor)-50*spring)*dt;factor+=spring*dt;if(Math.abs(factor)>.001)direction=factor<0?-1:1;lanes.forEach((lane,i)=>{if(media.matches){lane.style.transform='';return;}if(document.hidden||lane.closest('.reference-motion').matches(':has(li:hover),:focus-within'))return;const width=lane.scrollWidth/2;let step=direction*(i?-30:30)*dt;step+=direction*step*factor;offsets[i]+=step;if(width)lane.style.transform='translateX('+(((offsets[i]%width)+width)%width-width)+'px)';});requestAnimationFrame(frame);}requestAnimationFrame(frame);})();

(()=>{
 const all=[...document.querySelectorAll('.portfolio-card')],dialog=document.querySelector('.gallery-dialog'),img=dialog.querySelector('.gallery-image'),title=dialog.querySelector('h2'),count=dialog.querySelector('.gallery-count'),prev=dialog.querySelector('.gallery-prev'),next=dialog.querySelector('.gallery-next');
 let list=[],index=0,origin,name='';
 function show(i){index=(i+list.length)%list.length;img.src=list[index];img.alt=name+' — görsel '+(index+1);count.textContent=list.length>1?(index+1)+' / '+list.length:'';if(list.length>1){new Image().src=list[(index+1)%list.length];}}
 all.forEach(card=>card.addEventListener('click',e=>{if(card.hasAttribute('data-page'))return;e.preventDefault();origin=card;list=(card.dataset.gallery||card.getAttribute('href')).split('|');name=card.querySelector('h3').childNodes[0].textContent.trim();title.textContent=name;prev.style.visibility=next.style.visibility=list.length>1?'visible':'hidden';show(0);dialog.showModal();document.body.classList.add('gallery-open');}));
 dialog.querySelector('.gallery-close').addEventListener('click',()=>dialog.close());
 prev.addEventListener('click',()=>show(index-1));
 next.addEventListener('click',()=>show(index+1));
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(index-1);}if(e.key==='ArrowRight'){e.preventDefault();show(index+1);}});
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>{document.body.classList.remove('gallery-open');origin?.focus({preventScroll:true});});
})();

/* ---- Ana sayfa v1: sabit menü gölgesi + hero görsel geçişi ---- */
(()=>{
 const nav=document.querySelector('header.nav');
 if(nav){const heroEl=document.querySelector('.hero-v2');const onScroll=()=>{nav.classList.toggle('is-scrolled',window.scrollY>24);document.body.classList.toggle('past-hero',!!heroEl&&window.scrollY>heroEl.offsetHeight-120);};onScroll();addEventListener('scroll',onScroll,{passive:true});}
 const hero=document.querySelector('.hero-v2');
 if(!hero)return;
 const imgs=[...hero.querySelectorAll('.hero-media img')],dots=[...hero.querySelectorAll('.hero-dots button')],cap=document.getElementById('hero-caption');
 const calm=matchMedia('(prefers-reduced-motion: reduce)');
 let i=0,timer;
 function go(n){
  i=(n+imgs.length)%imgs.length;
  imgs.forEach((im,k)=>im.classList.toggle('is-active',k===i));
  dots.forEach((d,k)=>d.setAttribute('aria-current',k===i?'true':'false'));
  if(cap)cap.textContent=imgs[i].dataset.caption||'';
 }
 function start(){stop();if(calm.matches||imgs.length<2)return;timer=setInterval(()=>{if(!document.hidden)go(i+1);},6500);}
 function stop(){clearInterval(timer);}
 dots.forEach((d,k)=>d.addEventListener('click',()=>{go(k);start();}));
 calm.addEventListener('change',start);
 start();
})();

/* ---- Portfolyo kategori filtresi ---- */
(()=>{
 const btns=[...document.querySelectorAll('.portfolio-filters button')],cards=[...document.querySelectorAll('.portfolio-card')];
 if(!btns.length)return;
 function apply(f){
  let n=0;
  cards.forEach(c=>{const ok=f==='all'||c.dataset.cat.split(' ').includes(f);c.hidden=!ok;c.classList.remove('stagger','reveal-pending');if(ok){if(n%2)c.classList.add('stagger');n++;}});
  btns.forEach(b=>b.setAttribute('aria-pressed',b.dataset.filter===f?'true':'false'));
 }
 btns.forEach(b=>b.addEventListener('click',()=>apply(b.dataset.filter)));
 apply('all');
})();
