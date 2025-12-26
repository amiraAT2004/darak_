// هذا الكود يتحكم في الصور المصغرة والصورة الكبيرة للمعرض
document.addEventListener("DOMContentLoaded", () => {
  // نجيب الصورة الكبيرة الرئيسية حسب الـ id
  const main = document.getElementById("mainImage");
  // نجيب كل الصور المصغرة داخل أي عنصر عنده كلاس "thumbnail"
  const thumbs = document.querySelectorAll(".thumbnail img");
  // لو ما فيش الصورة الكبيرة أو ما فيش صور مصغرة → نوقف الكود
  if (!main || !thumbs.length) return;
  // دالة لتحديد الصورة المصغرة النشطة
  const setActive = (img) => {
    // إزالة كلاس "active" من جميع الصور المصغرة
    thumbs.forEach((t) => t.parentElement.classList.remove("active"));
    // إضافة كلاس "active" للصورة اللي ضغطنا عليها
    img.parentElement.classList.add("active");
  };
  // نضيف لكل صورة مصغرة الوظائف اللازمة
  thumbs.forEach((img) => {
    // تغيير شكل المؤشر عند المرور على الصورة → يد اليد
    img.style.cursor = "pointer";
    // عند الضغط على الصورة المصغرة
    img.onclick = () => {
      // إذا فيه نسخة كبيرة مخزنة في data-full، نستخدمها
      // إذا لا، نستخدم الصورة نفسها
      const src = img.dataset.full || img.src;

      // تغيير الصورة الكبيرة للصورة المحددة
      main.src = src;

      // جعل الصورة المصغرة نشطة بصرياً
      setActive(img);
    };
  });
  // بعد تحميل الصفحة، نجعل أول صورة مصغرة نشطة تلقائياً
  setActive(thumbs[0]);
});
