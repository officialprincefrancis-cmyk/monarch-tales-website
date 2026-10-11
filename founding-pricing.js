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
    try { localStorage.setItem("monarchFoundingCountry", country); } catch (_) {}
    selectors.forEach(function (selector) { selector.value = country; });
    document.querySelectorAll("[data-founding-price]").forEach(function (output) {
      output.textContent = formatPrice(country);
    });
    document.querySelectorAll("[data-founding-half]").forEach(function (output) {
      const item = window.MONARCH_FOUNDING_PRICING[country];
      const prefix = { AU: "A$", US: "US$", CA: "C$", GB: "£" }[country];
      output.textContent = prefix + (item.amount / 2).toFixed(2);
    });
    document.querySelectorAll("[data-country-name]").forEach(function (output) {
      output.textContent = window.MONARCH_FOUNDING_PRICING[country].label;
    });
  }

  selectors.forEach(function (selector) {
    selector.addEventListener("change", function () { update(selector.value); });
  });

  // Explicit campaign links can select a supported country without geolocation.
  const requestedCountry = new URLSearchParams(window.location.search).get("country");
  let savedCountry;
  try { savedCountry = localStorage.getItem("monarchFoundingCountry"); } catch (_) {}
  // A privacy-preserving estimate, not GPS/IP geolocation. Visitors can override it.
  function estimateCountry() {
    let zone = "";
    try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (_) {}
    if (zone.startsWith("Australia/")) return "AU";
    if (["Europe/London", "Europe/Belfast", "GB", "GB-Eire"].includes(zone)) return "GB";
    if (["America/Toronto", "America/Vancouver", "America/Edmonton", "America/Winnipeg", "America/Halifax", "America/St_Johns", "America/Regina", "America/Moncton", "America/Glace_Bay", "America/Goose_Bay", "America/Thunder_Bay", "America/Iqaluit", "America/Whitehorse", "America/Dawson", "America/Dawson_Creek", "America/Fort_Nelson", "America/Creston", "America/Rankin_Inlet", "America/Resolute", "America/Inuvik", "America/Yellowknife", "America/Rainy_River", "America/Atikokan"].includes(zone)) return "CA";
    if (["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Phoenix", "America/Detroit", "America/Anchorage", "America/Juneau", "America/Sitka", "America/Nome", "America/Adak", "America/Metlakatla", "America/Yakutat", "Pacific/Honolulu"].includes(zone) || zone.startsWith("America/Indiana/") || zone.startsWith("America/Kentucky/") || zone.startsWith("America/North_Dakota/")) return "US";
    return "AU";
  }
  const prices = window.MONARCH_FOUNDING_PRICING;
  update(prices[requestedCountry] ? requestedCountry : prices[savedCountry] ? savedCountry : estimateCountry());
})();
