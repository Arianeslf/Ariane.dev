const { animate, text, stagger } = anime;

const professionOne = document.querySelector(".home__profession-1");
const professionTwo = document.querySelector(".home__profession-2");

if (professionOne && professionTwo) {
  const { chars: chars1 } = text.split(professionOne, { chars: true });
  const { chars: chars2 } = text.split(professionTwo, { chars: true });

  [chars1, chars2].forEach((chars) => {
    animate(chars, {
      y: [
        { to: ["100%", "0%"] },
        { to: "-100%", delay: 4500, ease: "in(3)" },
      ],
      duration: 1050,
      ease: "out(3)",
      delay: stagger(90),
      loop: true,
    });
  });
}

const projectsSwiper = document.querySelector(".projects__swiper");

if (projectsSwiper) {
  new Swiper(projectsSwiper, {
    loop: true,
    spaceBetween: 24,
    slidesPerView: "auto",
    grabCursor: true,
    speed: 600,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
}

const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetContent = document.querySelector(tab.dataset.target);

    if (!targetContent) return;

    tabContents.forEach((content) => content.classList.remove("work-active"));
    tabs.forEach((item) => item.classList.remove("work-active"));
    tab.classList.add("work-active");
    targetContent.classList.add("work-active");
  });
});

const serviceButtons = document.querySelectorAll(".services__button");

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const cards = document.querySelectorAll(".services__card");
    const card = button.closest(".services__card");
    const info = card?.querySelector(".services__info");

    if (!card || !info) return;

    const isOpen = card.classList.contains("services__open");

    cards.forEach((item) => {
      item.classList.remove("services__open");
      item.classList.add("services__close");

      const itemInfo = item.querySelector(".services__info");
      if (itemInfo) itemInfo.style.height = "0px";
    });

    if (!isOpen) {
      card.classList.remove("services__close");
      card.classList.add("services__open");
      info.style.height = `${info.scrollHeight}px`;
    }
  });
});

document.querySelectorAll(".testimonials__content").forEach((track) => {
  if (track.dataset.duplicated === "true") return;

  [...track.children].forEach((card) => {
    track.appendChild(card.cloneNode(true));
  });

  track.dataset.duplicated = "true";
});

const copyButton = document.getElementById("contact-btn");
const contactEmail = document.getElementById("contact-email");

if (copyButton && contactEmail) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(contactEmail.textContent.trim());
      copyButton.innerHTML = 'Email copiado <i class="ri-check-line"></i>';

      setTimeout(() => {
        copyButton.innerHTML = 'Copiar email <i class="ri-file-copy-line"></i>';
      }, 2000);
    } catch {
      copyButton.textContent = "Não foi possível copiar";
    }
  });
}

const footerYear = document.getElementById("footer-year");
if (footerYear) footerYear.textContent = new Date().getFullYear();

const pageSections = document.querySelectorAll("section[id]");

const updateActiveLink = () => {
  const scrollPosition = window.scrollY;

  pageSections.forEach((section) => {
    const top = section.offsetTop - 50;
    const bottom = top + section.offsetHeight;
    const link = document.querySelector(`.nav__menu a[href*="${section.id}"]`);

    if (link) {
      link.classList.toggle(
        "active-link",
        scrollPosition > top && scrollPosition <= bottom,
      );
    }
  });
};

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

const customCursor = document.querySelector(".cursor");

if (customCursor) {
  let cursorX = 0;
  let cursorY = 0;

  const moveCursor = () => {
    customCursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(moveCursor);
  };

  document.addEventListener("mousemove", (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
  });

  document.querySelectorAll("a, button").forEach((item) => {
    item.addEventListener("mouseenter", () => customCursor.classList.add("hide-cursor"));
    item.addEventListener("mouseleave", () => customCursor.classList.remove("hide-cursor"));
  });

  moveCursor();
}

if (typeof ScrollReveal !== "undefined") {
  const reveal = ScrollReveal({
    origin: "top",
    distance: "35px",
    duration: 1300,
    delay: 150,
    reset: false,
  });

  reveal.reveal(
    ".home__image, .projects__container, .work__container, .testimonials__container, .contact__container",
  );
  reveal.reveal(".home__data", { delay: 900, origin: "bottom" });
  reveal.reveal(".home__info", { delay: 1200, origin: "bottom" });
  reveal.reveal(".home__social, .home__cv", { delay: 1200 });
  reveal.reveal(".about__data", { origin: "left" });
  reveal.reveal(".about__image", { origin: "right" });
  reveal.reveal(".services__card", { interval: 100 });
}

const sphere = document.getElementById("esferaTecnologias");

if (sphere) {
  const technologies = [...sphere.querySelectorAll(".tecnologia")];
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  let rotationX = 0;
  let rotationY = 0;
  let velocityX = 0.0015;
  let velocityY = 0.002;
  let targetVelocityX = velocityX;
  let targetVelocityY = velocityY;
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;

  technologies.forEach((technology, index) => {
    const y = 1 - (index / Math.max(technologies.length - 1, 1)) * 2;
    const horizontalRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = goldenAngle * index;

    points.push({
      x: Math.cos(angle) * horizontalRadius,
      y,
      z: Math.sin(angle) * horizontalRadius,
      element: technology,
    });
  });

  const getRadius = () => (window.innerWidth <= 700 ? 145 : 270);

  sphere.addEventListener("pointermove", (event) => {
    const bounds = sphere.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

    if (isDragging) {
      const movementX = event.clientX - lastX;
      const movementY = event.clientY - lastY;
      rotationY += movementX * 0.008;
      rotationX -= movementY * 0.008;
      lastX = event.clientX;
      lastY = event.clientY;
    } else {
      targetVelocityY = pointerX * 0.015;
      targetVelocityX = pointerY * 0.015;
    }
  });

  sphere.addEventListener("pointerdown", (event) => {
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    sphere.setPointerCapture(event.pointerId);
  });

  const stopDragging = (event) => {
    isDragging = false;
    if (event && sphere.hasPointerCapture(event.pointerId)) {
      sphere.releasePointerCapture(event.pointerId);
    }
  };

  sphere.addEventListener("pointerup", stopDragging);
  sphere.addEventListener("pointercancel", stopDragging);
  sphere.addEventListener("pointerleave", () => {
    isDragging = false;
    targetVelocityX = 0.0015;
    targetVelocityY = 0.002;
  });

  const animateSphere = () => {
    velocityX += (targetVelocityX - velocityX) * 0.04;
    velocityY += (targetVelocityY - velocityY) * 0.04;
    rotationX += velocityX;
    rotationY += velocityY;

    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    const radius = getRadius();

    points.forEach((point) => {
      const rotatedX = point.x * cosY - point.z * sinY;
      const rotatedZ = point.x * sinY + point.z * cosY;
      const finalY = point.y * cosX - rotatedZ * sinX;
      const finalZ = point.y * sinX + rotatedZ * cosX;
      const depth = (finalZ + 1) / 2;
      const scale = 0.5 + depth * 0.8;
      const opacity = 0.2 + depth * 0.8;
      const blur = (1 - depth) * 1.3;

      point.element.style.transform = `translate(-50%, -50%) translate3d(${rotatedX * radius}px, ${finalY * radius}px, 0) scale(${scale})`;
      point.element.style.opacity = opacity;
      point.element.style.filter = `blur(${blur}px)`;
      point.element.style.zIndex = Math.round(depth * 100);
    });

    requestAnimationFrame(animateSphere);
  };

  animateSphere();
}