(function () {
  var nav = document.getElementById('nav');
  addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 10); }, { passive: true });
  var burger = document.getElementById('burger');
  burger.addEventListener('click', function () {
    var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o);
  });
  nav.querySelectorAll('.nav__links a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); }); });
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }
  var db = document.getElementById('demobar'), dc = document.getElementById('demoClose');
  if (db && dc) dc.addEventListener('click', function () { db.classList.add('hide'); });
})();
