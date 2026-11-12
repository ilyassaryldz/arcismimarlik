/* ARCIS motion layer: scroll progress, self-drawing sketch, gallery reveal, page transitions. */
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 // Scroll progress hairline
 const bar=document.querySelector('.scroll-progress');
 if(bar&&!reduce){let ticking=false;const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.setProperty('--p',max>0?Math.min(1,scrollY/max).toFixed(4):0);ticking=false;};addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});update();}
 // Self-drawing sketch
 const sketch=document.querySelector('.sketch');
 if(sketch){if(reduce||!('IntersectionObserver' in window))sketch.classList.add('is-drawn');else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){sketch.classList.add('is-drawn');io.disconnect();}}),{threshold:.35});io.observe(sketch);}}
 // Gallery items reveal with a soft clip
 const items=[...document.querySelectorAll('.pg-item')];
 if(items.length&&!reduce&&'IntersectionObserver' in window){items.forEach(el=>{if(el.getBoundingClientRect().top>innerHeight*.9)el.classList.add('is-waiting');});const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('is-waiting');io.unobserve(e.target);}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});items.forEach(el=>io.observe(el));}
 // Page transition for internal page links
 if(!reduce)document.addEventListener('click',e=>{const a=e.target.closest('a[data-page],a.back-link,a.pager-link');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.button!==0)return;const url=new URL(a.href,location.href);if(url.origin!==location.origin)return;e.preventDefault();document.body.classList.add('is-leaving');setTimeout(()=>{location.href=url.href;},210);});
 addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('is-leaving');});
})();
