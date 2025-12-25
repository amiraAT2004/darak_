document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("advancedSearchForm");

  const typeSelect = document.getElementById("property-type");
  const locationSelect = document.getElementById("location");
  const priceSelect = document.getElementById("price-range");
  const bedroomsSelect = document.getElementById("bedrooms");

  const cards = Array.from(document.querySelectorAll(".property-card"));

  const shownCountEl = document.getElementById("shownCount");
  const totalCountEl = document.getElementById("totalCount");

  // إجمالي العقارات
  if (totalCountEl) totalCountEl.textContent = String(cards.length);

  function parsePriceRange(val) {
    // "" => no filter
    if (!val) return { min: null, max: null };

    if (val.endsWith("+")) {
      const min = Number(val.replace("+", ""));
      return { min, max: null };
    }

    const [minStr, maxStr] = val.split("-");
    return { min: Number(minStr), max: Number(maxStr) };
  }

  function bedroomsMatch(cardBedrooms, selected) {
    if (!selected) return true;

    if (selected === "5+") return cardBedrooms >= 5;

    const needed = Number(selected);
    return cardBedrooms === needed;
  }

  function applyFilter() {
    const selectedType = (typeSelect?.value || "").trim();
    const selectedLocation = (locationSelect?.value || "").trim();
    const selectedPrice = (priceSelect?.value || "").trim();
    const selectedBedrooms = (bedroomsSelect?.value || "").trim();

    const { min, max } = parsePriceRange(selectedPrice);

    let shown = 0;

    cards.forEach((card) => {
      const cardType = (card.dataset.type || "").trim();
      const cardLocation = (card.dataset.location || "").trim();
      const cardPrice = Number(card.dataset.price || 0);
      const cardBedrooms = Number(card.dataset.bedrooms || 0);

      const matchType = !selectedType || cardType === selectedType;
      const matchLocation = !selectedLocation || cardLocation === selectedLocation;

      const matchPrice =
        (min === null || cardPrice >= min) &&
        (max === null || cardPrice <= max);

      const matchBeds = bedroomsMatch(cardBedrooms, selectedBedrooms);

      const isMatch = matchType && matchLocation && matchPrice && matchBeds;

      // ✅ بدون closed: نخفي/نظهر مباشرة
      card.style.display = isMatch ? "" : "none";

      if (isMatch) shown++;
    });

    if (shownCountEl) shownCountEl.textContent = String(shown);
  }

  // Submit: فلترة
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    applyFilter();
  });

  // Reset: يرجّع الكل
  form?.addEventListener("reset", () => {
    // نخلي reset يكمّل وبعدها نطبّق
    setTimeout(() => applyFilter(), 0);
  });

  // (اختياري) فلترة مباشرة عند تغيير أي select
  [typeSelect, locationSelect, priceSelect, bedroomsSelect].forEach((el) => {
    el?.addEventListener("change", applyFilter);
  });

  // أول تشغيل
  applyFilter();
});
