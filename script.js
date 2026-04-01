/* ================================================================
   DR. USMAN ALI LIAQAT — Website Script
   GSAP 3 + ScrollTrigger + Lenis (optional graceful fallback)
================================================================ */

/* ── GSAP PLUGINS ────────────────────────────────────────────── */
window.addEventListener('error', function(e) { console.error('[script.js error]', e.message, 'at', e.filename, e.lineno); });
gsap.registerPlugin(ScrollTrigger);

/* ── LOADER — runs FIRST before anything else ────────────────── */
(function initLoader() {
  const loader   = document.getElementById('loader');
  if (!loader) return;
  const logo     = loader.querySelector('.loader-logo');
  const progress = loader.querySelector('.loader-progress');
  const name     = loader.querySelector('.loader-name');

  const tl = gsap.timeline();

  tl.to(logo,     { opacity: 1, duration: 0.55, ease: 'power2.out' })
    .to(progress, { width: '100%', duration: 1.1, ease: 'power2.inOut' }, '-=0.2')
    .to(name,     { opacity: 1, duration: 0.38 }, '-=0.5')
    .to(loader,   {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
      delay: 0.2,
      onComplete() {
        loader.style.display = 'none';
        initHero();
      }
    });
})();

/* ── LENIS SMOOTH SCROLL (optional — graceful fallback) ──────── */
let lenis = null;
try {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);
  }
} catch (e) {
  console.warn('Lenis unavailable — using native scroll.', e);
}

/* ── CUSTOM CURSOR ───────────────────────────────────────────── */
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    gsap.to(dot, { x: mx, y: my, duration: 0.08, ease: 'none' });
  });

  (function trackRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    gsap.set(ring, { x: rx, y: ry });
    requestAnimationFrame(trackRing);
  })();

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button'))
      gsap.to(ring, { scale: 1.5, borderColor: '#C9A96E', opacity: 0.9, duration: 0.3 });
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button') && !e.relatedTarget?.closest('a, button'))
      gsap.to(ring, { scale: 1, borderColor: 'rgba(201,169,110,0.45)', opacity: 1, duration: 0.3 });
  });
})();

/* ── HERO ANIMATIONS ─────────────────────────────────────────── */
function initHero() {
  /* Wrap each word in inner span for clip reveal */
  document.querySelectorAll('.hero-word').forEach((word) => {
    const text = word.textContent.trim();
    word.innerHTML = `<span class="hero-word-inner" style="display:block;transform:translateY(110%)">${text}</span>`;
  });

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.to('.hero-tag',   { opacity: 1, y: 0, duration: 0.7 })
    .to('.hero-word .hero-word-inner', { y: 0, duration: 1.05, stagger: 0.11 }, '-=0.35')
    .to('.hero-sub',   { opacity: 1, duration: 0.75 }, '-=0.5')
    .to('.hero-actions', { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
    .to('.hero-badges',  { opacity: 1, y: 0, duration: 0.55 }, '-=0.4')
    .to('.hero-photo',   { opacity: 1, duration: 1.1, ease: 'power2.out' }, '-=1.1')
    .to(['.corner-tl', '.corner-br'], { opacity: 1, duration: 0.6, stagger: 0.15 }, '-=0.5')
    .to('.scroll-hint',  { opacity: 1, duration: 0.6 }, '-=0.3');

  /* Parallax */
  gsap.to('.hero-photo', {
    y: 70, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.8 }
  });
  gsap.to('.hero-bg-word', {
    y: 130, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2.5 }
  });

  /* Stat counters */
  document.querySelectorAll('.count').forEach((el) => {
    const target = parseInt(el.dataset.target, 10);
    ScrollTrigger.create({
      trigger: '.hero-stats',
      start: 'top 90%',
      once: true,
      onEnter() {
        gsap.to(el, {
          innerHTML: target,
          duration: 2.2,
          ease: 'power2.out',
          snap: { innerHTML: 1 },
          roundProps: 'innerHTML',
        });
      }
    });
  });
}

/* ── NAV SCROLL STATE ────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

/* ── HAMBURGER / OVERLAY MENU ────────────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');

hamburger.addEventListener('click', () => {
  const open = menuOverlay.classList.toggle('active');
  hamburger.classList.toggle('active', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.menu-link').forEach((link) => {
  link.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

/* ── ABOUT SECTION ───────────────────────────────────────────── */
gsap.from('.about-photo-wrap', {
  x: -65, opacity: 0, duration: 1.25, ease: 'power3.out',
  scrollTrigger: { trigger: '.about', start: 'top 72%' }
});
gsap.from('.about-right > *', {
  y: 38, opacity: 0, duration: 0.85, stagger: 0.14, ease: 'power3.out',
  scrollTrigger: { trigger: '.about-right', start: 'top 75%' }
});
gsap.from('.cred-item', {
  x: 28, opacity: 0, duration: 0.6, stagger: 0.13, ease: 'power2.out',
  scrollTrigger: { trigger: '.cred-list', start: 'top 82%' }
});
gsap.to('.about-photo', {
  y: 50, ease: 'none',
  scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 2 }
});

/* ── PROCEDURES ACCORDION ──────────────────────────────────── */
(function initProcAccordion() {
  const items = document.querySelectorAll('.pac-item');
  if (!items.length) return;

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      items.forEach(it => it.classList.remove('active'));
      item.classList.add('active');
    });
    // Mobile tap
    item.addEventListener('click', () => {
      if (!item.classList.contains('active')) {
        items.forEach(it => it.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });
})();

gsap.from('.proc-header', {
  y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
  scrollTrigger: { trigger: '.procedures', start: 'top 75%' }
});
gsap.from('.pac-item', {
  y: 60, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
  scrollTrigger: { trigger: '.proc-accordion', start: 'top 80%' }
});

/* ── TESTIMONIALS — DUPLICATE COLUMNS FOR INFINITE LOOP ─────── */
document.querySelectorAll('.testi-col').forEach(col => {
  col.innerHTML += col.innerHTML;
});

/* ── GENERIC SECTION FADES ───────────────────────────────────── */
gsap.utils.toArray('.section-tag, .section-title, .about-bio, .stars-global').forEach((el) => {
  gsap.from(el, {
    y: 28, opacity: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%' }
  });
});

/* ── CTA BAND ────────────────────────────────────────────────── */
gsap.from('.cta-left h2', {
  x: -42, opacity: 0, duration: 1.0, ease: 'power3.out',
  scrollTrigger: { trigger: '.cta-band', start: 'top 78%' }
});
gsap.from('.cta-right', {
  x: 42, opacity: 0, duration: 1.0, ease: 'power3.out',
  scrollTrigger: { trigger: '.cta-band', start: 'top 78%' }
});

/* ── CONTACT ─────────────────────────────────────────────────── */
gsap.from('.contact-left > *', {
  y: 35, opacity: 0, duration: 0.8, stagger: 0.13, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact', start: 'top 72%' }
});
gsap.from('.appt-cal', {
  y: 30, opacity: 0, duration: 0.75, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact-right', start: 'top 80%' }
});
gsap.from('.contact-form', {
  y: 35, opacity: 0, duration: 0.85, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact-right', start: 'top 75%' }
});

/* ── FOOTER ──────────────────────────────────────────────────── */
gsap.from('.footer-inner > *', {
  y: 26, opacity: 0, duration: 0.75, stagger: 0.1, ease: 'power2.out',
  scrollTrigger: { trigger: '.footer', start: 'top 88%' }
});

/* ── WHATSAPP FLOAT ──────────────────────────────────────────── */
const waFloat = document.getElementById('waFloat');
window.addEventListener('scroll', () => {
  waFloat.classList.toggle('visible', window.scrollY > 250);
}, { passive: true });

/* ── CONTACT FORM → WHATSAPP ─────────────────────────────────── */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name      = document.getElementById('fname').value.trim();
  const phone     = document.getElementById('fphone').value.trim();
  const email     = document.getElementById('femail').value.trim();
  const procedure = document.getElementById('fprocedure').value;
  const message   = document.getElementById('fmessage').value.trim();

  const datetime  = (document.getElementById('fdatetime') || {}).value || '';
  const lines = [
    `Hello Dr. Usman,`,
    ``,
    `Name: ${name}`,
    phone     ? `Phone: ${phone}`             : null,
    email     ? `Email: ${email}`             : null,
    datetime  ? `Appointment: ${datetime}`    : null,
    procedure ? `Procedure: ${procedure}`     : null,
    message   ? `\nMessage: ${message}`       : null,
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/966504109169?text=${encodeURIComponent(lines)}`, '_blank');
});

/* ── ACTIVE NAV LINK ─────────────────────────────────────────── */
(function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach((s) => observer.observe(s));
})();

/* ── BOOKING CALENDAR ─────────────────────────────────────── */
(function initBookingCalendar() {
  const calDays      = document.getElementById('calDays');
  const calMonthLbl  = document.getElementById('calMonthLabel');
  const calTimesGrid = document.getElementById('calTimesGrid');
  const calApptInfo  = document.getElementById('calApptInfo');
  const calApptDate  = document.getElementById('calApptDate');
  const calApptClear = document.getElementById('calApptClear');
  const calPrev      = document.getElementById('calPrev');
  const calNext      = document.getElementById('calNext');
  const calTabW      = document.getElementById('calTabWeekly');
  const calTabM      = document.getElementById('calTabMonthly');
  if (!calDays) return;

  let MONTHS    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let DAYS_SH   = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  let DAYS_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let CAL_CLOSED   = 'Closed — no appointments';
  let CAL_PICKDATE = 'Select a date above';
  let CAL_PICKTIME = '— pick a time';

  let view = 'weekly', anchor = new Date(), selectedDate = null, selectedTime = null;

  const mn       = d  => { const t = new Date(d); t.setHours(0,0,0,0); return t; };
  const todayMn  = () => mn(new Date());
  const isToday  = d  => mn(d).getTime() === todayMn().getTime();
  const isPast   = d  => mn(d) < todayMn();
  const isClosed = d  => d.getDay() === 5; // Friday
  const isSameDay= (a, b) => a && b && mn(a).getTime() === mn(b).getTime();

  function fmt12(h, m) {
    return `${h % 12 || 12}:${m === 0 ? '00' : '30'} ${h >= 12 ? 'PM' : 'AM'}`;
  }

  function getSlots(date) {
    if (!date || isClosed(date) || isPast(date)) return [];
    const sat = date.getDay() === 6;
    const out = [];
    for (let h = sat ? 10 : 9; h <= (sat ? 15 : 19); h++) {
      out.push(fmt12(h, 0)); out.push(fmt12(h, 30));
    }
    return out;
  }

  function getWeekDays() {
    const d = new Date(anchor), sun = new Date(d);
    sun.setDate(d.getDate() - d.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const x = new Date(sun); x.setDate(sun.getDate() + i); return x;
    });
  }

  function getMonthDays() {
    const y = anchor.getFullYear(), mo = anchor.getMonth();
    return Array.from({ length: new Date(y, mo + 1, 0).getDate() }, (_, i) => new Date(y, mo, i + 1));
  }

  function renderDays() {
    const days = view === 'weekly' ? getWeekDays() : getMonthDays();
    calMonthLbl.textContent = `${MONTHS[anchor.getMonth()].slice(0, 3)} ${anchor.getFullYear()}`;
    calDays.innerHTML = '';
    days.forEach(date => {
      const col = document.createElement('div'); col.className = 'cal-day';
      const nm  = document.createElement('span'); nm.className = 'cal-day-name';
      nm.textContent = DAYS_SH[date.getDay()];
      const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'cal-day-btn';
      btn.textContent = date.getDate();
      if (isToday(date))               btn.classList.add('cal-day-today');
      if (isSameDay(date, selectedDate)) btn.classList.add('cal-day-selected');
      if (isClosed(date))              { btn.classList.add('cal-day-closed'); btn.disabled = true; }
      else if (isPast(date))           { btn.classList.add('cal-day-past');   btn.disabled = true; }
      else btn.addEventListener('click', () => onDateClick(date));
      col.append(nm, btn); calDays.appendChild(col);
    });
    requestAnimationFrame(() => {
      const a = calDays.querySelector('.cal-day-selected') || calDays.querySelector('.cal-day-today');
      if (a) a.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });
  }

  function renderTimes() {
    const slots = getSlots(selectedDate);
    calTimesGrid.innerHTML = '';
    if (!slots.length) {
      calTimesGrid.innerHTML = `<span style="font-size:10px;color:var(--white-30);letter-spacing:.06em">${selectedDate ? CAL_CLOSED : CAL_PICKDATE}</span>`;
      return;
    }
    slots.forEach(s => {
      const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'cal-time-btn';
      btn.textContent = s;
      if (s === selectedTime) btn.classList.add('cal-time-selected');
      btn.addEventListener('click', () => onTimeClick(s));
      calTimesGrid.appendChild(btn);
    });
  }

  function onDateClick(date) {
    selectedDate = date; selectedTime = null;
    renderDays(); renderTimes(); updateInfo(); syncField();
  }
  function onTimeClick(t) {
    selectedTime = t; renderTimes(); updateInfo(); syncField();
  }

  function updateInfo() {
    if (selectedDate) {
      calApptDate.textContent = selectedTime
        ? `${DAYS_FULL[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()} · ${selectedTime}`
        : `${DAYS_FULL[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()} ${CAL_PICKTIME}`;
      calApptInfo.classList.add('visible');
    } else {
      calApptInfo.classList.remove('visible');
    }
  }

  function syncField() {
    const f = document.getElementById('fdatetime');
    if (!f) return;
    f.value = (selectedDate && selectedTime)
      ? `${DAYS_FULL[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()} at ${selectedTime}`
      : '';
  }

  calPrev.addEventListener('click', () => {
    if (view === 'weekly') anchor.setDate(anchor.getDate() - 7);
    else anchor = new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1);
    renderDays();
  });
  calNext.addEventListener('click', () => {
    if (view === 'weekly') anchor.setDate(anchor.getDate() + 7);
    else anchor = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1);
    renderDays();
  });
  calTabW.addEventListener('click', () => {
    view = 'weekly'; anchor = new Date();
    calTabW.classList.add('active'); calTabM.classList.remove('active'); renderDays();
  });
  calTabM.addEventListener('click', () => {
    view = 'monthly'; anchor = new Date();
    calTabM.classList.add('active'); calTabW.classList.remove('active'); renderDays();
  });
  calApptClear.addEventListener('click', () => {
    selectedDate = selectedTime = null;
    renderDays(); renderTimes(); updateInfo(); syncField();
  });

  try { renderDays(); } catch(e) { console.warn('cal renderDays:', e); }
  try { renderTimes(); } catch(e) { console.warn('cal renderTimes:', e); }

  /* expose locale refresh for language toggle */
  window.calLocaleRefresh = function (procLocale) {
    MONTHS    = procLocale.calMonths;
    DAYS_SH   = procLocale.calDaysSh;
    DAYS_FULL = procLocale.calDaysFull;
    CAL_CLOSED   = procLocale.calClosed;
    CAL_PICKDATE = procLocale.calPickDate;
    CAL_PICKTIME = procLocale.calPickTime;
    renderDays(); renderTimes(); updateInfo();
  };
})();

/* ============================================================
   THEME TOGGLE
============================================================ */
(function () {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('dr-usman-theme', t);
    btn.querySelectorAll('.tt-opt').forEach(function (opt) {
      opt.classList.toggle('tt-active', opt.dataset.val === t);
    });
  }

  // Sync indicator to current theme on load
  var current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current);

  btn.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
  });
})();

/* ============================================================
   LANGUAGE TOGGLE
============================================================ */
(function () {
  var btn = document.getElementById('langToggle');
  if (!btn) return;

  /* ── helpers ── */
  function get(obj, path) {
    return path.split('.').reduce(function (o, k) { return o && o[k]; }, obj);
  }

  function applyLang(lang) {
    var i18n = window.DR_USMAN_I18N;
    if (!i18n) { console.warn('DR_USMAN_I18N not loaded'); return; }
    var t = i18n[lang];
    if (!t) return;

    /* ── html dir + lang attributes ── */
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
    localStorage.setItem('dr-usman-lang', lang);

    /* ── toggle indicator ── */
    btn.querySelectorAll('.lt-opt').forEach(function (opt) {
      opt.classList.toggle('lt-active', opt.dataset.val === lang);
    });

    /* ── walk data-i18n (textContent) ── */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = get(t, el.dataset.i18n);
      if (val === undefined) return;
      /* hero words have a GSAP inner span — update that instead */
      var inner = el.querySelector('.hero-word-inner');
      if (inner) { inner.textContent = val; } else { el.textContent = val; }
    });

    /* ── walk data-i18n-html (innerHTML) ── */
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var val = get(t, el.dataset.i18nHtml);
      if (val !== undefined) el.innerHTML = val;
    });

    /* ── walk data-i18n-placeholder (input/textarea) ── */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var val = get(t, el.dataset.i18nPlaceholder);
      if (val !== undefined) el.placeholder = val;
    });

    /* ── procedure accordion items ── */
    document.querySelectorAll('[data-proc-idx]').forEach(function (item) {
      var idx = parseInt(item.dataset.procIdx, 10);
      var p = t.proc.items[idx];
      if (!p) return;
      var cat = item.querySelector('.pac-cat');
      var title = item.querySelector('.pac-title');
      var desc = item.querySelector('.pac-desc');
      if (cat)   cat.textContent   = p.cat;
      if (title) title.textContent = p.title;
      if (desc)  desc.textContent  = p.desc;
    });

    /* ── form select options ── */
    var sel = document.getElementById('fprocedure');
    if (sel && t.contact.opts) {
      var curr = sel.value;
      sel.innerHTML = '<option value="" disabled selected>' + t.contact.phProc + '</option>';
      t.contact.opts.forEach(function (opt) {
        var o = document.createElement('option');
        o.textContent = opt; o.value = opt;
        sel.appendChild(o);
      });
      sel.value = curr || '';
    }

    /* ── calendar locale refresh ── */
    if (typeof window.calLocaleRefresh === 'function') {
      window.calLocaleRefresh(t.proc);
    }
  }

  /* ── expose globally so click handler always has access ── */
  window.applyLang = applyLang;

  /* ── click to toggle ── */
  btn.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-lang') === 'ar' ? 'en' : 'ar';
    window.applyLang(next);
  });

  /* ── init on load (deferred so calLocaleRefresh is ready) ── */
  var current = document.documentElement.getAttribute('data-lang') || 'en';
  try { applyLang(current); } catch(e) { console.warn('i18n init:', e); }
})();

/* ================================================================
   PROCEDURE BOOK NOW BUTTONS
================================================================ */
(function initProcBookBtns() {
  var selectMap = {
    0: '4D Liposculpture (Hi-Def)',
    1: 'Brazilian Butt Lift (BBL)',
    2: 'Tummy Tuck (Abdominoplasty)',
    3: 'Breast Augmentation',
    4: 'Breast Lift',
    5: 'Nose Correction',
    6: 'Facelift',
    7: 'Eyelid Surgery',
    8: 'Botox & Fillers',
    9: 'Face Contouring'
  };

  document.querySelectorAll('.pac-item').forEach(function(item) {
    var idx = parseInt(item.dataset.procIdx, 10);
    var procName = selectMap[idx];
    if (!procName) return;

    var btn = document.createElement('button');
    btn.className = 'pac-book-btn';
    btn.setAttribute('type', 'button');
    btn.innerHTML =
      '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' +
      '<span>Book Now</span>';

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      /* Pre-fill the procedure select */
      var sel = document.getElementById('fprocedure');
      if (sel) {
        for (var i = 0; i < sel.options.length; i++) {
          if (sel.options[i].text.trim() === procName) {
            sel.selectedIndex = i;
            break;
          }
        }
      }
      /* Smooth scroll to contact/booking section */
      var contact = document.getElementById('contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    var content = item.querySelector('.pac-content');
    if (content) content.appendChild(btn);
  });
})();

/* ============================================================
   BEFORE & AFTER CATEGORY FILTER (GSAP Flip)
============================================================ */
(function initBnaFilter() {
  if (typeof Flip === 'undefined' || typeof gsap === 'undefined') return;
  gsap.registerPlugin(Flip);

  var filters = document.querySelectorAll('.bna-filter');
  var cards   = document.querySelectorAll('.bna-card');

  filters.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = btn.dataset.filter;

      /* Update active tab */
      filters.forEach(function(f) { f.classList.remove('active'); });
      btn.classList.add('active');

      /* Capture layout state before DOM change */
      var state = Flip.getState(cards);

      /* Show / hide cards */
      cards.forEach(function(card) {
        var match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('bna-hidden', !match);
      });

      /* Animate from captured state to new layout */
      Flip.from(state, {
        duration: 0.55,
        scale: true,
        ease: 'power2.inOut',
        stagger: 0.04,
        absolute: true,
        onEnter: function(els) {
          return gsap.fromTo(els,
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.3)' }
          );
        },
        onLeave: function(els) {
          return gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.3 });
        }
      });
    });
  });
})();

/* ============================================================
   BEFORE & AFTER SLIDERS
============================================================ */
(function initBnaSliders() {
  document.querySelectorAll('.bna-card').forEach(function(card) {
    var stage   = card.querySelector('.bna-stage');
    var after   = card.querySelector('.bna-after');
    var line    = card.querySelector('.bna-line');
    var handle  = card.querySelector('.bna-handle');
    var dragging = false;

    function setPos(pct) {
      pct = Math.max(2, Math.min(98, pct));
      after.style.clipPath  = 'inset(0 0 0 ' + pct + '%)';
      line.style.left       = pct + '%';
      handle.style.left     = pct + '%';
    }

    function posFromClient(clientX) {
      var rect = stage.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    /* Mouse */
    stage.addEventListener('mousedown', function(e) {
      dragging = true;
      card.classList.add('dragging');
      setPos(posFromClient(e.clientX));
    });
    window.addEventListener('mousemove', function(e) {
      if (!dragging) return;
      setPos(posFromClient(e.clientX));
    });
    window.addEventListener('mouseup', function() {
      dragging = false;
      card.classList.remove('dragging');
    });

    /* Touch */
    stage.addEventListener('touchstart', function(e) {
      dragging = true;
      setPos(posFromClient(e.touches[0].clientX));
    }, { passive: true });
    stage.addEventListener('touchmove', function(e) {
      if (!dragging) return;
      setPos(posFromClient(e.touches[0].clientX));
    }, { passive: true });
    stage.addEventListener('touchend', function() { dragging = false; });

    /* Init at 50% */
    setPos(50);
  });
})();

/* ============================================================
   PERSONAL GALLERY — CURSOR TRAIL
============================================================ */
(function initGallery() {
  var stage = document.getElementById('pgallery-stage');
  if (!stage) return;
  var imgs = Array.from(stage.querySelectorAll('.pgallery-img'));
  if (!imgs.length) return;

  var globalIndex = 0;
  var maxVisible = 7;
  var zCounter = 1;
  var last = { x: 0, y: 0 };
  var rots = [-6, -3, 0, 3, 6, -5, -2, 1, 4, -4];

  function dist(x, y) { return Math.hypot(x - last.x, y - last.y); }

  function activate(img, x, y) {
    var rect = stage.getBoundingClientRect();
    img.style.left = (x - rect.left) + 'px';
    img.style.top  = (y - rect.top)  + 'px';
    if (zCounter > 40) zCounter = 1;
    img.style.zIndex = zCounter++;
    img.style.setProperty('--rot', (rots[globalIndex % rots.length]) + 'deg');
    img.dataset.status = 'active';
    last = { x: x, y: y };
    clearTimeout(img._t);
    img._t = setTimeout(function() { img.dataset.status = 'inactive'; }, 1500);
  }

  function deactivate(img) {
    clearTimeout(img._t);
    img.dataset.status = 'inactive';
  }

  stage.addEventListener('mousemove', function(e) {
    var threshold = Math.max(window.innerWidth / 30, 40);
    if (dist(e.clientX, e.clientY) < threshold) return;
    var lead = imgs[globalIndex % imgs.length];
    var tailIdx = ((globalIndex - maxVisible) % imgs.length + imgs.length) % imgs.length;
    activate(lead, e.clientX, e.clientY);
    deactivate(imgs[tailIdx]);
    globalIndex++;
  });

  stage.addEventListener('mouseleave', function() {
    imgs.forEach(function(img) { deactivate(img); });
  });
})();
