// swipe.js
export function enableSwipe(content, onDelete) {
  if (!("ontouchstart" in window)) return;

  let startX = 0;
  let currentX = 0;

  content.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    content.style.transition = "none";
  }, { passive: true });

  content.addEventListener("touchmove", e => {
    currentX = e.touches[0].clientX - startX;
    if (currentX < 0) {
      content.style.transform = `translateX(${currentX}px)`;
    }
  }, { passive: true });

  content.addEventListener("touchend", () => {
    content.style.transition = "transform 0.2s ease";

    if (currentX < -80) {
      content.style.transform = "translateX(-100%)";
      setTimeout(onDelete, 200);
    } else {
      content.style.transform = "translateX(0)";
    }

    currentX = 0;
  });
}
