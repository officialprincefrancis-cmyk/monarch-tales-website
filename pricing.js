const MONARCH_PRICING = {
  US: {
    countryName: "United States",
    currency: "USD",
    seed: { total: 49, book: 49, shipping: 0, stripe: "https://buy.stripe.com/7sYcN421K6Hi9OMa1i0gw00" },
    becoming: { total: 119, book: 99, shipping: 20, stripe: "https://buy.stripe.com/bJe5kCbCk7Lm1iggpG0gw0i" },
    legacy: { total: 169, book: 149, shipping: 20, stripe: "https://buy.stripe.com/7sY00i8q87Lm1ig6P60gw0j" }
  },

  AU: {
    countryName: "Australia",
    currency: "AUD",
    seed: { total: 70, book: 70, shipping: 0, stripe: "https://buy.stripe.com/28E6oGcGo4za3qo3CU0gw09" },
    becoming: { total: 185, book: 145, shipping: 40, stripe: "https://buy.stripe.com/dRm8wOeOw3v66CAflC0gw0a" },
    legacy: { total: 255, book: 215, shipping: 40, stripe: "https://buy.stripe.com/6oU8wOdKs4zae52ddu0gw0k" }
  },

  CA: {
    countryName: "Canada",
    currency: "CAD",
    seed: { total: 69, book: 69, shipping: 0, stripe: "https://buy.stripe.com/9B68wO9uc5De7GEddu0gw0c" },
    becoming: { total: 175, book: 140, shipping: 35, stripe: "https://buy.stripe.com/3cI5kCaygd5Ge520qI0gw0d" },
    legacy: { total: 245, book: 210, shipping: 35, stripe: "https://buy.stripe.com/28EaEW7m42r26CA0qI0gw0e" }
  },

  GB: {
    countryName: "United Kingdom",
    currency: "GBP",
    seed: { total: 39, book: 39, shipping: 0, stripe: "https://buy.stripe.com/dRm9AS49S9TuaSQflC0gw0f" },
    becoming: { total: 89, book: 74, shipping: 15, stripe: "https://buy.stripe.com/4gMdR86i09Tugda5L20gw0g" },
    legacy: { total: 129, book: 114, shipping: 15, stripe: "https://buy.stripe.com/6oU6oG49Sc1Cd0Y6P60gw0h" }
  }
};

function money(country, amount) {
  const currency = MONARCH_PRICING[country].currency;

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

function applyPricing(country) {
  const pricing = MONARCH_PRICING[country];

  document.querySelectorAll("[data-price]").forEach((el) => {
    const packageName = el.dataset.price;
    el.textContent = money(country, pricing[packageName].total);
  });

  document.querySelectorAll("[data-book-price]").forEach((el) => {
    const packageName = el.dataset.bookPrice;
    el.textContent = money(country, pricing[packageName].book);
  });

  document.querySelectorAll("[data-shipping-price]").forEach((el) => {
    const packageName = el.dataset.shippingPrice;
    el.textContent = money(country, pricing[packageName].shipping);
  });

  document.querySelectorAll("[data-total-price]").forEach((el) => {
    const packageName = el.dataset.totalPrice;
    el.textContent = money(country, pricing[packageName].total);
  });

  document.querySelectorAll("[data-stripe]").forEach((el) => {
    const packageName = el.dataset.stripe;
    el.href = pricing[packageName].stripe;
  });
}

function setCountry(country) {
  localStorage.setItem("monarchCountry", country);
  applyPricing(country);
}

async function detectCountry() {
  const savedCountry = localStorage.getItem("monarchCountry");

  if (savedCountry && MONARCH_PRICING[savedCountry]) {
    applyPricing(savedCountry);
    return;
  }

  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    let country = data.country_code || "US";

    if (!MONARCH_PRICING[country]) {
      country = "US";
    }

    localStorage.setItem("monarchCountry", country);
    applyPricing(country);
  } catch (error) {
    applyPricing("US");
  }
}

document.addEventListener("DOMContentLoaded", detectCountry);