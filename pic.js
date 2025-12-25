document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("mainImage");
  const thumbs = document.querySelectorAll(".thumbnail img");
  if (!main || !thumbs.length) return;

  const setActive = (img) => {
    thumbs.forEach(t => t.parentElement.classList.remove("active"));
    img.parentElement.classList.add("active");
  };

  thumbs.forEach(img => {
    img.style.cursor = "pointer";
    img.onclick = () => {
      const src = img.dataset.full || img.src;
      main.src = src;
      setActive(img);
    };
  });

  setActive(thumbs[0]);
});
