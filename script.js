console.log("SCRIPT LOADED ✅", window.location.href);

document.addEventListener("DOMContentLoaded", () => {
  // --- hard checks (if these fail on Netlify, everything breaks) ---
  if (!window.gsap) {
    console.error("GSAP NOT LOADED ❌");
    return;
  }
  if (!window.ScrollTrigger) {
    console.error("ScrollTrigger NOT LOADED ❌");
    // We still continue without ScrollTrigger so roadmap clicks + videos work
  } else {
    gsap.registerPlugin(ScrollTrigger);
    console.log("GSAP + ScrollTrigger OK ✅");
  }

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Divider animation
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function playDividerAnimation() {
    if (prefersReduced) return;

    const tl = gsap.timeline();
    gsap.set(".top-divider", { scaleX: 0 });
    gsap.set(".left-divider", { scaleY: 0 });

    tl.to(".left-divider", { scaleY: 1, duration: 1.2, ease: "power3.inOut", delay: 0.5 });
    tl.to(".top-divider", { scaleX: 1, duration: 1, ease: "power3.inOut" }, "-=0.8");
    return tl;
  }
  playDividerAnimation();

  // Mobile menu
  const toggle = document.getElementById("navToggle");
  const overlay = document.getElementById("navOverlay");
  const logo = document.getElementById("logo");

  function closeMenu() {
    overlay?.classList.remove("active");
    document.body.style.overflow = "";
    if (toggle) toggle.innerHTML = '<i class="fas fa-bars"></i>';
    toggle?.setAttribute("aria-label", "Open menu");
  }

  function openMenu() {
    overlay?.classList.add("active");
    document.body.style.overflow = "hidden";
    if (toggle) toggle.innerHTML = '<i class="fas fa-times"></i>';
    toggle?.setAttribute("aria-label", "Close menu");
  }

  toggle?.addEventListener("click", () => {
    overlay?.classList.contains("active") ? closeMenu() : openMenu();
  });

  overlay?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay?.classList.contains("active")) closeMenu();
  });

  logo?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // --- Roadmap click scroll (use robust math, not offsetTop) ---
  const NAV_OFFSET = 80;

  function scrollToWithOffset(el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  const roadmapItems = document.querySelectorAll(".roadmap-item");
  roadmapItems.forEach(item => {
    item.addEventListener("click", () => {
      console.log("roadmap clicked:", item.dataset.target);
      const target = document.getElementById(item.dataset.target);
      if (!target) return;
      scrollToWithOffset(target);
    });
  });

  // Roadmap highlighting (only if ScrollTrigger exists)
  const sections = document.querySelectorAll("section");

  function updateRoadmap(sectionId) {
    let foundCurrent = false;
    roadmapItems.forEach(item => item.classList.remove("active", "completed"));
    roadmapItems.forEach(item => {
      if (item.dataset.target === sectionId) {
        item.classList.add("active");
        foundCurrent = true;
      } else if (!foundCurrent) {
        item.classList.add("completed");
      }
    });
  }

  if (window.ScrollTrigger) {
    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => updateRoadmap(section.id),
        onEnterBack: () => updateRoadmap(section.id),
      });
    });

    const footer = document.querySelector("footer");
    if (footer) {
      ScrollTrigger.create({
        trigger: footer,
        start: "top bottom",
        end: "bottom bottom",
        onEnter: () => footer.classList.add("active"),
        onLeaveBack: () => footer.classList.remove("active"),
      });
    }
  }

  updateRoadmap("home");

  // Replay divider animation on resize (debounced)
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => playDividerAnimation(), 250);
  });

  // Contact mailto
  const sendBtn = document.getElementById("sendBtn");
  sendBtn?.addEventListener("click", () => {
    const name = document.getElementById("contactName")?.value.trim() || "";
    const email = document.getElementById("contactEmail")?.value.trim() || "";
    const message = document.getElementById("contactMessage")?.value.trim() || "";

    if (!name || !email || !message) {
      alert("Please fill in name, email and message.");
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      alert("Please enter a valid email.");
      return;
    }

    const to = "cebanmarius15@gmail.com";
    const subject = `Portfolio message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  // MP4 sources + hover play/pause (desktop)
  document.querySelectorAll(".project").forEach((p) => {
    const src = p.getAttribute("data-video");
    const vid = p.querySelector(".project-video");
    if (!src || !vid) return;

    vid.muted = true;
    vid.playsInline = true;
    vid.preload = "metadata";
    vid.src = src;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (!isTouch) {
      p.addEventListener("mouseenter", async () => {
        try {
          vid.currentTime = 0;
          await vid.play();
        } catch (e) {
          console.warn("Video play blocked:", src, e);
        }
      });

      p.addEventListener("mouseleave", () => {
        vid.pause();
        vid.currentTime = 0;
      });
    }
  });

  console.log("INIT DONE ✅");
});
