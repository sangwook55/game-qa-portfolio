const projectsButton = document.querySelector("#projectsButton");
const skillsButton = document.querySelector("#skillsButton");

function scrollToSlide(number) {
  document.querySelector(`#slide-${number}`)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

projectsButton.addEventListener("click", () => scrollToSlide(7));
skillsButton.addEventListener("click", () => scrollToSlide(4));

