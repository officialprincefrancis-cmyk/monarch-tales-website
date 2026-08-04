window.MONARCH_FOUNDING_PRICING = {
  US: { label: "United States", currency: "USD", amount: 149, display: "US$149" },
  AU: { label: "Australia", currency: "AUD", amount: 225, display: "A$225" },
  CA: { label: "Canada", currency: "CAD", amount: 215, display: "C$215" },
  GB: { label: "United Kingdom", currency: "GBP", amount: 119, display: "£119" }
};

(function () {
  const selectors = document.querySelectorAll("[data-founding-country]");
  if (!selectors.length) return;

  function formatPrice(country) {
    const item = window.MONARCH_FOUNDING_PRICING[country];
    return item.display;
  }

  function update(country) {
    if (!window.MONARCH_FOUNDING_PRICING[country]) country = "AU";
    localStorage.setItem("monarchFoundingCountry", country);
    selectors.forEach(function (selector) { selector.value = country; });
    document.querySelectorAll("[data-founding-price]").forEach(function (output) {
      output.textContent = formatPrice(country);
    });
    document.querySelectorAll("[data-country-name]").forEach(function (output) {
      output.textContent = window.MONARCH_FOUNDING_PRICING[country].label;
    });
  }

  selectors.forEach(function (selector) {
    selector.addEventListener("change", function () { update(selector.value); });
  });

  update(localStorage.getItem("monarchFoundingCountry") || "AU");
})();
