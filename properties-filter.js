// ننتظر تحميل الصفحة بالكامل قبل تشغيل الجافاسكربت
document.addEventListener("DOMContentLoaded", () => {

  // نموذج البحث المتقدم
  const form = document.getElementById("advancedSearchForm");

  // عناصر الفلترة (نوع العقار – الموقع – السعر – عدد الغرف)
  const typeSelect = document.getElementById("property-type");
  const locationSelect = document.getElementById("location");
  const priceSelect = document.getElementById("price-range");
  const bedroomsSelect = document.getElementById("bedrooms");

  // جميع كروت العقارات
  const cards = Array.from(document.querySelectorAll(".property-card"));

  // عناصر عرض عدد النتائج
  const shownCountEl = document.getElementById("shownCount");
  const totalCountEl = document.getElementById("totalCount");

  // عرض إجمالي عدد العقارات
  if (totalCountEl) totalCountEl.textContent = String(cards.length);

  // دالة لتحليل نطاق السعر المختار
  function parsePriceRange(val) {
    // لو ما فيش قيمة → بدون فلترة
    if (!val) return { min: null, max: null };

    // مثال: "5000+" → حد أدنى فقط
    if (val.endsWith("+")) {
      const min = Number(val.replace("+", ""));
      return { min, max: null };
    }

    // مثال: "1000-3000"
    const [minStr, maxStr] = val.split("-");
    return { min: Number(minStr), max: Number(maxStr) };
  }

  // دالة لمطابقة عدد غرف النوم
  function bedroomsMatch(cardBedrooms, selected) {
    // لو ما فيش اختيار → الكل مقبول
    if (!selected) return true;

    // خيار "5+" → خمسة أو أكثر
    if (selected === "5+") return cardBedrooms >= 5;

    // مطابقة رقم محدد
    const needed = Number(selected);
    return cardBedrooms === needed;
  }

  // دالة تطبيق الفلترة
  function applyFilter() {
    // القيم المختارة من النموذج
    const selectedType = (typeSelect?.value || "").trim();
    const selectedLocation = (locationSelect?.value || "").trim();
    const selectedPrice = (priceSelect?.value || "").trim();
    const selectedBedrooms = (bedroomsSelect?.value || "").trim();

    // تحليل نطاق السعر
    const { min, max } = parsePriceRange(selectedPrice);

    let shown = 0; // عدد الكروت الظاهرة

    // المرور على كل كرت عقار
    cards.forEach((card) => {

      // القيم المخزنة في data-attributes
      const cardType = (card.dataset.type || "").trim();
      const cardLocation = (card.dataset.location || "").trim();
      const cardPrice = Number(card.dataset.price || 0);
      const cardBedrooms = Number(card.dataset.bedrooms || 0);

      // التحقق من تطابق كل فلتر
      const matchType = !selectedType || cardType === selectedType;
      const matchLocation = !selectedLocation || cardLocation === selectedLocation;

      const matchPrice =
        (min === null || cardPrice >= min) &&
        (max === null || cardPrice <= max);

      const matchBeds = bedroomsMatch(cardBedrooms, selectedBedrooms);

      // النتيجة النهائية
      const isMatch = matchType && matchLocation && matchPrice && matchBeds;

      // إظهار أو إخفاء الكرت مباشرة
      card.style.display = isMatch ? "" : "none";

      // زيادة العداد إذا الكرت ظاهر
      if (isMatch) shown++;
    });

    // تحديث عدد النتائج المعروضة
    if (shownCountEl) shownCountEl.textContent = String(shown);
  }

  // عند إرسال النموذج (بحث)
  form?.addEventListener("submit", (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    applyFilter();
  });

  // عند الضغط على Reset
  form?.addEventListener("reset", () => {
    // ننتظر reset يكمّل ثم نطبّق الفلترة
    setTimeout(() => applyFilter(), 0);
  });

  // فلترة مباشرة عند تغيير أي select (اختياري)
  [typeSelect, locationSelect, priceSelect, bedroomsSelect].forEach((el) => {
    el?.addEventListener("change", applyFilter);
  });

  // تشغيل الفلترة أول مرة عند تحميل الصفحة
  applyFilter();
});
