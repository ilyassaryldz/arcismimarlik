(()=>{
 const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
 const nav=document.querySelector('header.nav');
 if(nav){const f=()=>nav.classList.toggle('is-scrolled',scrollY>24);f();addEventListener('scroll',f,{passive:true});}
 const items=[...document.querySelectorAll('.pg-item')],dialog=document.querySelector('.gallery-dialog');
 if(!items.length||!dialog)return;
 const img=dialog.querySelector('.gallery-image'),title=dialog.querySelector('h2'),count=dialog.querySelector('.gallery-count'),prev=dialog.querySelector('.gallery-prev'),next=dialog.querySelector('.gallery-next');
 const name=document.querySelector('h1').textContent.trim();let i=0,origin;
 function show(n){i=(n+items.length)%items.length;img.src=items[i].href;img.alt=name+' — görsel '+(i+1);count.textContent=items.length>1?(i+1)+' / '+items.length:'';if(items.length>1)new Image().src=items[(i+1)%items.length].href;}
 title.textContent=name;prev.style.visibility=next.style.visibility=items.length>1?'visible':'hidden';
 items.forEach((it,k)=>it.addEventListener('click',e=>{e.preventDefault();origin=it;show(k);dialog.showModal();document.body.classList.add('gallery-open');}));
 dialog.querySelector('.gallery-close').addEventListener('click',()=>dialog.close());
 prev.addEventListener('click',()=>show(i-1));next.addEventListener('click',()=>show(i+1));
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(i-1);}if(e.key==='ArrowRight'){e.preventDefault();show(i+1);}});
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>{document.body.classList.remove('gallery-open');origin?.focus({preventScroll:true});});
})();
