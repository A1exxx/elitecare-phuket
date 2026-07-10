(function () {
  "use strict";

  var I18N = window.EC_I18N;
  var STORE_KEY = "ec_lang";
  var WA = "https://wa.me/66660748105";

  /* ---------- language ---------- */
  function supported(code) {
    return I18N.langs.some(function (l) { return l.code === code; });
  }

  function detectLang() {
    var q = new URLSearchParams(window.location.search).get("lang");
    if (q && supported(q)) return q;
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved && supported(saved)) return saved;
    } catch (e) { /* private mode */ }
    var nav = (navigator.language || "en").toLowerCase();
    if (nav.indexOf("ru") === 0) return "ru";
    if (nav.indexOf("th") === 0) return "th";
    if (nav.indexOf("zh") === 0) return "zh";
    return "en";
  }

  var lang = detectLang();
  function t(key) {
    var d = I18N.dict[lang] || I18N.dict.en;
    return d[key] || I18N.dict.en[key] || key;
  }

  function applyLang(code) {
    lang = code;
    var htmlLang = code === "zh" ? "zh-CN" : code;
    document.documentElement.lang = htmlLang;
    document.documentElement.setAttribute("data-lang", code);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });

    // data-i18n-attr="attrName:key" (supports several, comma separated)
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var bits = pair.split(":");
        if (bits.length === 2) el.setAttribute(bits[0].trim(), t(bits[1].trim()));
      });
    });

    var current = document.getElementById("lang-current");
    var meta = I18N.langs.filter(function (l) { return l.code === code; })[0];
    if (current && meta) current.textContent = meta.short;

    document.querySelectorAll("#lang-menu [role=option]").forEach(function (opt) {
      opt.setAttribute("aria-selected", String(opt.dataset.code === code));
    });

    // Deep-link CTAs carry a message in the visitor's language.
    var pkgCta = document.getElementById("pkg-cta");
    if (pkgCta) pkgCta.href = WA + "?text=" + encodeURIComponent(t("wa.package"));
    var renoCta = document.getElementById("reno-cta");
    if (renoCta) renoCta.href = WA + "?text=" + encodeURIComponent(t("wa.portfolio"));

    try { localStorage.setItem(STORE_KEY, code); } catch (e) { /* ignore */ }
  }

  /* build the language menu */
  var langBtn = document.getElementById("lang-btn");
  var langMenu = document.getElementById("lang-menu");
  if (langBtn && langMenu) {
    I18N.langs.forEach(function (l) {
      var li = document.createElement("li");
      li.textContent = l.label;
      li.setAttribute("role", "option");
      li.setAttribute("tabindex", "0");
      li.dataset.code = l.code;
      li.addEventListener("click", function () {
        applyLang(l.code);
        closeLangMenu();
        langBtn.focus();
      });
      li.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); li.click(); }
      });
      langMenu.appendChild(li);
    });

    var openLangMenu = function () {
      langMenu.hidden = false;
      langBtn.setAttribute("aria-expanded", "true");
    };
    var closeLangMenu = function () {
      langMenu.hidden = true;
      langBtn.setAttribute("aria-expanded", "false");
    };

    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (langMenu.hidden) openLangMenu(); else closeLangMenu();
    });
    document.addEventListener("click", function (e) {
      if (!langMenu.hidden && !langMenu.contains(e.target)) closeLangMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !langMenu.hidden) { closeLangMenu(); langBtn.focus(); }
    });
  }

  applyLang(lang);

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileNav.classList.toggle("is-open", !open);
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        // Stagger by position on the page, not by observer callback order,
        // so a row of cards always cascades in reading order.
        entries
          .filter(function (entry) { return entry.isIntersecting; })
          .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; })
          .forEach(function (entry, i) {
            var el = entry.target;
            el.style.transitionDelay = Math.min(i, 5) * 60 + "ms";
            el.classList.add("is-visible");
            io.unobserve(el);
          });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var lifted = null;
    var onScroll = function () {
      var next = window.scrollY > 8;
      if (next === lifted) return; // only touch the DOM when the state actually flips
      lifted = next;
      header.classList.toggle("is-lifted", next);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- lead form -> prefilled WhatsApp message ---------- */
  var form = document.getElementById("lead-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var v = function (id) {
        var el = document.getElementById(id);
        return el && el.value ? el.value.trim() : "";
      };

      var property = v("property-type");
      if (v("bedrooms")) property += ", " + v("bedrooms") + " " + t("wa.bed");
      if (v("bathrooms")) property += " / " + v("bathrooms") + " " + t("wa.bath");
      if (v("size")) property += ", ~" + v("size") + " m²";

      var lines = [
        t("wa.greeting"),
        t("wa.service") + ": " + v("service"),
        t("wa.property") + ": " + property,
      ];
      if (v("location")) lines.push(t("wa.location") + ": " + v("location"));
      if (v("visit-time")) lines.push(t("wa.visit") + ": " + v("visit-time"));
      lines.push(t("wa.name") + ": " + v("name"));
      lines.push(t("wa.phone") + ": " + v("phone"));
      if (v("message")) lines.push(t("wa.message") + ": " + v("message"));

      window.open(WA + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
    });
  }
})();
