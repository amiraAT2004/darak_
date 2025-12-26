// نجيب عنصر الهيدر الرئيسي
const header = document.querySelector(".main-header");

// نجيب زر فتح/إغلاق القائمة (الهامبرغر)
const btn = document.querySelector(".nav-toggle");

// عند الضغط على الزر
btn.addEventListener("click", () => {

  // نبدّل كلاس is-open لفتح أو إغلاق القائمة
  header.classList.toggle("is-open");

  // نتحقق هل القائمة مفتوحة حالياً
  const opened = header.classList.contains("is-open");

  // تحديث خاصية aria-expanded لأغراض الوصول (Accessibility)
  btn.setAttribute("aria-expanded", opened ? "true" : "false");

  // تغيير الأيقونة حسب حالة القائمة
  // مفتوحة → X
  // مغلقة → ☰
  btn.innerHTML = opened
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});
