var hamburger = document.querySelector(".hamburger");
var menuContainer = document.querySelector(".menu-container");
var fixedMenu = document.querySelector(".fixed-menu");
var hasRunHamburgerEntry = false;

const hellos = [
  "Hello",
  "নমস্কার",
  "नमस्ते",
  "హలో",
  "வணக்கம்",
  "नमस्कार",
  "હેલો",
  "ਹੈਲੋ",
];

let count = 0;
let loded = false;
const loader = document.getElementsByClassName("loader-p")[0];
const loaderDiv = document.getElementById("loader");
const updateLoader = () => {
  loader.textContent = hellos[count];
  count = (count + 1) % hellos.length;
};
const runLoader = () => {
  const interval = setInterval(() => {
    updateLoader();
    if (count === 0 && loded) {
      clearInterval(interval);
      gsap.to("#loader", {
        duration: 1,
        top: -1000,
      });
      gsap.to(".loader1", {
        duration: 2.25,
        top: -1000,
      });
    }
  }, 250);
};
runLoader();
window.addEventListener("load", () => {
  loded = true;
});

function hamburgerClick() {
  gsap.from(".hamburger", {
    duration: 1,
    scale: 1.25,
    ease: "power5.out",
    // yoyo: true,
  });
}
var hamburgerEntry = () => {
  gsap.from(".sm-menu", {
    scale: 0,
    duration: 1,
    ease: "elastic.out(1,0.3)",
    yoyo: true,
  });
};

window.addEventListener("scroll", () => {
  var header = document.querySelector(".nav-wrap");
  var menuBody = document.querySelector(".menu-body");
  var smMenu = document.querySelector(".sm-menu");
  if (window.scrollY > window.innerHeight * 1) {
    header.classList.add("nav-cng");
    menuBody.classList.add("hide");
    smMenu.classList.remove("hide");
    if (!hasRunHamburgerEntry) {
      hamburgerEntry();
      hasRunHamburgerEntry = true;
    }
  } else {
    header.classList.remove("nav-cng");
    menuBody.classList.remove("hide");
    smMenu.classList.add("hide");
    menuContainer.classList.remove("show-menu");
    fixedMenu.classList.add("hide-radius-animation");
    hasRunHamburgerEntry = false;
    !hasRunHamburgerEntry && hamburger.classList.remove("open");
    // hamburger.classList.remove("open");
  }
});

var btns = document.querySelectorAll(".box");

btns.forEach((btn) => {
  var navBtn = btn.querySelector(".target");

  btn.addEventListener("mousemove", (e) => {
    var pos = btn.getBoundingClientRect();
    var x = e.clientX - pos.left - pos.width / 2;
    var y = e.clientY - pos.top - pos.height / 2;

    gsap.to(navBtn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 1,
      ease: "power3.out",
    });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(navBtn, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1,0.3)",
    });
  });
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  if (menuContainer.classList.contains("show-menu")) {
    menuContainer.classList.remove("show-menu");
    fixedMenu.classList.remove("show-radius-animation");
    fixedMenu.classList.add("hide-radius-animation");
  } else {
    menuContainer.classList.add("show-menu");
    fixedMenu.classList.remove("hide-radius-animation");
    fixedMenu.classList.add("show-radius-animation");
  }
  hamburgerClick();
});

let currentScroll = 0;
let isScrollingDown = true;
let lines = document.querySelectorAll(".line");

let tween = gsap
  .to(".marquee-part", {
    xPercent: -100,
    repeat: -1,
    duration: 20,
    ease: "linear",
  })
  .totalProgress(0.1);

gsap.set(".marquee-inner", { xPercent: -50 });

window.addEventListener("scroll", () => {
  if (window.pageYOffset > currentScroll) {
    isScrollingDown = true;
  } else {
    isScrollingDown = false;
  }

  gsap.to(tween, {
    timeScale: isScrollingDown ? 1 : -1,
  });

  lines.forEach((line) => {
    if (isScrollingDown) {
      line.classList.remove("active");
    } else {
      line.classList.add("active");
    }

    currentScroll = window.pageYOffset;
  });
});
