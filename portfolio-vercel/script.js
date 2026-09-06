const TOTAL_SLIDES = 10;
const slideImage = document.querySelector("#slideImage");
const pageNumber = document.querySelector("#pageNumber");
const progressValue = document.querySelector("#progressValue");
const previousButton = document.querySelector("#previousButton");
const nextButton = document.querySelector("#nextButton");
const fullscreenButton = document.querySelector("#fullscreenButton");
const viewer = document.querySelector("#viewer");
const caseLink = document.querySelector("#caseLink");
const bugLink = document.querySelector("#bugLink");
const projectsButton = document.querySelector("#projectsButton");
const skillsButton = document.querySelector("#skillsButton");

let currentSlide = 1;
let touchStartX = null;

function slidePath(number) {
  return `./slides/slide-${String(number).padStart(2, "0")}.webp`;
}

function preload(number) {
  if (number < 1 || number > TOTAL_SLIDES) return;
  const image = new Image();
  image.src = slidePath(number);
}

function render() {
  slideImage.src = slidePath(currentSlide);
  slideImage.alt = `Game QA 포트폴리오 ${currentSlide}페이지`;
  pageNumber.textContent = `${String(currentSlide).padStart(2, "0")} / ${TOTAL_SLIDES}`;
  progressValue.style.width = `${(currentSlide / TOTAL_SLIDES) * 100}%`;
  previousButton.disabled = currentSlide === 1;
  nextButton.disabled = currentSlide === TOTAL_SLIDES;
  projectsButton.classList.toggle("is-active", currentSlide === 1);
  skillsButton.classList.toggle("is-active", currentSlide === 1);
  caseLink.classList.toggle("is-active", currentSlide === 7);
  bugLink.classList.toggle("is-active", currentSlide === 9);
  preload(currentSlide - 1);
  preload(currentSlide + 1);
}

function goTo(number) {
  const nextSlide = Math.min(TOTAL_SLIDES, Math.max(1, number));
  if (nextSlide === currentSlide) return;
  currentSlide = nextSlide;
  render();
}

previousButton.addEventListener("click", () => goTo(currentSlide - 1));
nextButton.addEventListener("click", () => goTo(currentSlide + 1));
projectsButton.addEventListener("click", () => goTo(7));
skillsButton.addEventListener("click", () => goTo(4));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "PageUp") goTo(currentSlide - 1);
  if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
    event.preventDefault();
    goTo(currentSlide + 1);
  }
  if (event.key === "Home") goTo(1);
  if (event.key === "End") goTo(TOTAL_SLIDES);
});

viewer.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].clientX;
  },
  { passive: true },
);

viewer.addEventListener(
  "touchend",
  (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) < 45) return;
    goTo(currentSlide + (distance < 0 ? 1 : -1));
  },
  { passive: true },
);

fullscreenButton.addEventListener("click", async () => {
  if (!document.fullscreenElement) {
    await viewer.requestFullscreen?.();
  } else {
    await document.exitFullscreen?.();
  }
});

render();
