
  const header = document.querySelector(".main-header");
  const btn = document.querySelector(".nav-toggle");

  btn.addEventListener("click", () => {
    header.classList.toggle("is-open");
    const opened = header.classList.contains("is-open");
    btn.setAttribute("aria-expanded", opened ? "true" : "false");
    btn.innerHTML = opened
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
