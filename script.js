(() => {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.nav');
  menu?.setAttribute('aria-expanded','false');
  menu?.addEventListener('click', () => { const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open)); });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const slider = document.querySelector('.photo-slider');
  if (slider) {
    const slides=[...slider.querySelectorAll('.slide')], dots=slider.querySelector('.slide-dots');
    let index=0, timer;
    slides.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`写真 ${i+1} を表示`);b.addEventListener('click',()=>show(i));dots.appendChild(b)});
    const buttons=[...dots.querySelectorAll('button')];
    function show(i){index=(i+slides.length)%slides.length;slides.forEach((s,j)=>s.classList.toggle('active',j===index));buttons.forEach((b,j)=>b.setAttribute('aria-current',String(j===index)));}
    function stop(){clearInterval(timer)}
    function start(){stop();if(!reduced.matches)timer=setInterval(()=>show(index+1),4500)}
    slider.querySelector('.slide-prev').addEventListener('click',()=>{show(index-1);start()});
    slider.querySelector('.slide-next').addEventListener('click',()=>{show(index+1);start()});
    slider.addEventListener('mouseenter',stop);slider.addEventListener('mouseleave',start);
    slider.addEventListener('focusin',stop);slider.addEventListener('focusout',e=>{if(!slider.contains(e.relatedTarget))start()});
    document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
    reduced.addEventListener?.('change',start);
    show(0);start();
  }
  if ('IntersectionObserver' in window && !reduced.matches) {
    const els=document.querySelectorAll('.section-head,.section-title,.reason-grid article,.course-card,.panel,.gallery-grid img,.contact-grid a');
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px 40px 0px'});
    els.forEach(el=>{el.classList.add('reveal-ready');observer.observe(el)});
  }
})();
