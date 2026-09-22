/* Raja Beauty by Anam — Interaktion
   Alles hier ist Ausstattung, keine Voraussetzung: ohne JavaScript bleibt
   die Seite vollständig lesbar und bedienbar. */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Design: hell / dunkel ---------- */
  var SUN = 'M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M6.1 6.1L4.6 4.6M19.4 19.4l-1.5-1.5M17.9 6.1l1.5-1.5M4.6 19.4l1.5-1.5';
  var toggle = document.getElementById('theme-toggle');

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* Privatmodus o. Ä. */ }
  }
  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function paintToggle(theme) {
    if (!toggle) return;
    var dark = theme === 'dark';
    toggle.innerHTML = dark
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.6 8.6 0 019.8 3.5a8.6 8.6 0 1010.7 10.7z"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="' + SUN + '"/></svg>';
    toggle.setAttribute('aria-label', dark ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln');
  }

  // Hell ist der Standard - unabhaengig von der Systemeinstellung. Nur eine
  // zuvor getroffene Wahl der Besucherin schaltet auf dunkel um.
  var saved = read('rb-theme');
  if (saved === 'dark' || saved === 'light') {
    root.setAttribute('data-theme', saved);
    paintToggle(saved);
  } else {
    paintToggle('light');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('rb-theme', next);
      paintToggle(next);
    });
  }

  /* ---------- Navigation auf kleinen Bildschirmen ---------- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('nav-toggle');

  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    // Hintergrund nicht mitscrollen lassen, solange das Menü offen ist
    document.body.style.overflow = open ? 'hidden' : '';
  }
  function closeNav() { setNav(false); }

  if (nav && navToggle) {
    navToggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- Kopfzeile beim Scrollen absetzen ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Abschnitte einblenden ----------
     Die Inhalte sind ohne .is-in bereits sichtbar; die Klasse startet nur
     die Bewegung. Fällt JavaScript aus, steht trotzdem alles da. */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reveals.length && 'IntersectionObserver' in window) {
    root.classList.add('js-reveal');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });

    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Terminanfrage (Vorschau) ---------- */
  var form = document.getElementById('termin-form');
  var note = document.getElementById('form-note');
  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.querySelector('#f-name') || {}).value || '';
      name = name.trim();
      note.textContent = name
        ? 'Danke, ' + name + ' – in der Vorschau wird noch nichts versendet. Auf der fertigen Seite landet diese Anfrage direkt im Postfach des Studios.'
        : 'In der Vorschau wird noch nichts versendet. Auf der fertigen Seite landet diese Anfrage direkt im Postfach des Studios.';
      note.style.color = 'var(--gold-deep)';
    });
  }

  /* ---------- Logo fuehrt zum Seitenanfang ----------
     Ohne JavaScript erledigt das der Anker #top. Hier kommt nur weiches
     Scrollen dazu und das Aufraeumen der Adresszeile, damit kein #top
     stehen bleibt. */
  var brand = document.querySelector('.brand');
  if (brand) {
    brand.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      closeNav();
      var sanft = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: sanft ? 'smooth' : 'auto' });
      if (window.history && history.replaceState) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    });
  }

  /* ---------- Jahreszahl ---------- */
  var jahr = document.getElementById('jahr');
  if (jahr) jahr.textContent = String(new Date().getFullYear());
})();
