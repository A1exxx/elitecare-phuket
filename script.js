(function () {
  "use strict";

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
        // Stagger by position within the section, not by observer callback order,
        // so a row of cards always cascades left-to-right.
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

      var lines = [
        "Hi Phuket Elite Care! I'd like a quote.",
        "Service: " + v("service"),
        "Property: " + v("property-type") +
          (v("bedrooms") ? ", " + v("bedrooms") + " bed" : "") +
          (v("bathrooms") ? " / " + v("bathrooms") + " bath" : "") +
          (v("size") ? ", ~" + v("size") + " m²" : ""),
      ];
      if (v("location")) lines.push("Location: " + v("location"));
      if (v("visit-time")) lines.push("Preferred visit time: " + v("visit-time"));
      lines.push("Name: " + v("name"));
      lines.push("Phone: " + v("phone"));
      if (v("message")) lines.push("Message: " + v("message"));

      var text = encodeURIComponent(lines.join("\n"));
      window.open("https://wa.me/66660748105?text=" + text, "_blank", "noopener");
    });
  }
})();
