(function () {
  var ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('nav'), prog = document.getElementById('progress');
  var bild = document.querySelector('.komp-bild img');
  function scroll() {
    nav.classList.toggle('solid', scrollY > 40);
    var h = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
    if (bild && !ruhig) {
      var r = bild.parentNode.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) bild.style.transform = 'translateY(' + ((r.top + r.height / 2 - innerHeight / 2) * -0.12) + 'px)';
    }
  }
  addEventListener('scroll', scroll, { passive: true }); scroll();
  var burger = document.getElementById('burger');
  burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; });
  nav.querySelectorAll('.nav__links a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); document.body.style.overflow = ''; }); });
  // Einblenden und Zahlen hochzählen
  function zaehle(el) {
    var ziel = +el.dataset.zahl, t0 = null;
    function f(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1600), e = 1 - Math.pow(1 - p, 4); el.firstChild.nodeValue = Math.round(ziel * e); if (p < 1) requestAnimationFrame(f); }
    requestAnimationFrame(f);
  }
  var els = document.querySelectorAll('.rv,.rv-m,.komp li,[data-zahl]');
  if ('IntersectionObserver' in window && !ruhig) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); if (e.target.dataset.zahl) zaehle(e.target); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -10% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }
  // Branchenband: läuft von selbst, lässt sich mit Maus oder Finger ziehen
  var band = document.querySelector('.band'), spur = document.querySelector('.band__spur');
  if (band && spur) {
    var x = 0, tempo = ruhig ? 0 : 0.6, zieht = false, lx = 0, halb = spur.scrollWidth / 2;
    function lauf() { if (!zieht) x -= tempo; if (x <= -halb) x += halb; if (x > 0) x -= halb; spur.style.transform = 'translateX(' + x + 'px)'; requestAnimationFrame(lauf); }
    requestAnimationFrame(lauf);
    band.addEventListener('pointerdown', function (e) { zieht = true; lx = e.clientX; band.classList.add('zieht'); band.setPointerCapture(e.pointerId); });
    band.addEventListener('pointermove', function (e) { if (!zieht) return; x += e.clientX - lx; lx = e.clientX; });
    ['pointerup', 'pointercancel'].forEach(function (n) { band.addEventListener(n, function () { zieht = false; band.classList.remove('zieht'); }); });
    addEventListener('resize', function () { halb = spur.scrollWidth / 2; });
  }
  // Menü markiert den Abschnitt, der gerade im Bild ist
  var links = {};
  nav.querySelectorAll('.nav__links a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { Object.keys(links).forEach(function (k) { links[k].classList.toggle('aktiv', k === e.target.id); }); } });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (k) { var s = document.getElementById(k); if (s) spy.observe(s); });
  }
  // Stimmen: Pfeile
  var sl = document.getElementById('slider');
  document.querySelectorAll('[data-schritt]').forEach(function (b) { b.addEventListener('click', function () { sl.scrollBy({ left: +b.dataset.schritt * sl.clientWidth * 0.8, behavior: 'smooth' }); }); });
  var db = document.getElementById('demobar'), dc = document.getElementById('demoClose');
  if (db && dc) dc.addEventListener('click', function () { db.classList.add('hide'); });
})();
