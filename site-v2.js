(function () {
  // Advertising tracking is opt-in and never reads application fields.
  const funnelPage = /\/(?:index|founding-families|apply|application-received)(?:\.html)?\/?$/.test(location.pathname) || location.pathname === "/";
  let advertisingConsent = false;
  try { advertisingConsent = localStorage.getItem("monarchAdvertisingConsent") === "yes"; } catch (_) {}
  function startMetaTracking() {
    if (!funnelPage || !advertisingConsent || navigator.globalPrivacyControl || navigator.doNotTrack === "1") return;
    if (!window.fbq) {
      const queue = window.fbq = function () { queue.callMethod ? queue.callMethod.apply(queue, arguments) : queue.queue.push(arguments); };
      queue.push = queue; queue.loaded = true; queue.version = "2.0"; queue.queue = [];
      window._fbq = queue;
      const script = document.createElement("script");
      script.async = true; script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
      queue("set", "autoConfig", false, "1622387146097094");
      queue("init", "1622387146097094");
      queue("track", "PageView");
    }
  }
  function metaLead() {
    try {
      if (advertisingConsent && typeof window.fbq === "function") window.fbq("track", "Lead");
    } catch (_) { /* Optional measurement must never block an application. */ }
  }
  if (funnelPage && !navigator.globalPrivacyControl && navigator.doNotTrack !== "1") {
    startMetaTracking();
    let savedChoice = null;
    try { savedChoice = localStorage.getItem("monarchAdvertisingConsent"); } catch (_) {}
    if (!savedChoice) {
      const choice = document.createElement("section");
      choice.setAttribute("aria-label", "Optional advertising cookies");
      choice.style.cssText = "position:fixed;bottom:16px;left:16px;right:16px;max-width:560px;margin:auto;padding:18px;background:#fff;color:#172b24;border:1px solid #bbb;border-radius:12px;box-shadow:0 4px 24px #0002;z-index:10000;font:14px/1.5 sans-serif";
      choice.innerHTML = '<p style="margin:0 0 12px">May we use optional Meta advertising cookies to measure page visits and completed applications? We do not send your form answers. You can apply without accepting. <a href="policies.html">Privacy information</a></p><button type="button" data-meta-accept>Accept advertising cookies</button> <button type="button" data-meta-decline>No thanks</button>';
      function choose(value) {
        try { localStorage.setItem("monarchAdvertisingConsent", value); } catch (_) {}
        advertisingConsent = value === "yes";
        choice.remove();
        if (advertisingConsent) startMetaTracking();
      }
      choice.querySelector("[data-meta-accept]").addEventListener("click", function () { choose("yes"); });
      choice.querySelector("[data-meta-decline]").addEventListener("click", function () { choose("no"); });
      document.body.appendChild(choice);
    }
  }
  if (/\/policies(?:\.html)?\/?$/.test(location.pathname)) {
    const main = document.querySelector("main");
    if (main) {
      const privacy = document.createElement("section");
      privacy.className = "narrow";
      privacy.innerHTML = '<h2>Optional Meta advertising measurement</h2><p>With your permission, Meta Pixel measures visits to our public application funnel and successful applications. Meta receives event names, page URLs and standard browser/network information, such as IP address and cookie identifiers. Application answers, children\'s details, photographs and story information are not included. Automatic advanced matching and automatic event detection are not enabled. Declining does not affect your application.</p><p><a href="https://www.facebook.com/privacy/policy/">Meta privacy policy</a></p><button type="button" data-reset-meta>Withdraw advertising cookie consent</button><p data-meta-status role="status"></p>';
      privacy.querySelector("[data-reset-meta]").addEventListener("click", function () {
        try { localStorage.setItem("monarchAdvertisingConsent", "no"); } catch (_) {}
        privacy.querySelector("[data-meta-status]").textContent = "Advertising consent withdrawn. Future visits will not load Meta tracking.";
      });
      main.appendChild(privacy);
    }
  }
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll("[data-reveal]");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) { item.classList.add("revealed"); });
  } else {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  }

  function track(name, parameters) {
    if (typeof window.gtag === "function") window.gtag("event", name, parameters || {});
  }

  document.querySelectorAll("[data-track]").forEach(function (element) {
    element.addEventListener("click", function () {
      track(element.dataset.track, { link_text: element.textContent.trim(), link_url: element.href || "" });
    });
  });

  const applicationForm = document.getElementById("foundingApplication");
  if (applicationForm) {
    let started = false;
    applicationForm.addEventListener("focusin", function () {
      if (!started) {
        started = true;
        track("application_start");
      }
    });

    applicationForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const submitButton = applicationForm.querySelector("button[type='submit']");
      const status = applicationForm.querySelector("[data-form-status]");
      submitButton.disabled = true;
      submitButton.textContent = "Sending your application…";
      status.textContent = "";

      try {
        const response = await fetch(applicationForm.action, {
          method: "POST",
          body: new FormData(applicationForm),
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error("Submission failed");
        metaLead();
        sessionStorage.setItem("monarchApplicationComplete", "true");
        window.location.href = "application-received.html";
      } catch (error) {
        status.textContent = "We couldn't send your application. Please check your connection and try again, or contact us directly.";
        submitButton.disabled = false;
        submitButton.textContent = "Submit My Application";
      }
    });
  }
})();
