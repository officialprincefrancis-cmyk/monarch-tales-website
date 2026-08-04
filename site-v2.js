(function () {
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
