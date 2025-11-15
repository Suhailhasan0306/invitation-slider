var swiper = new Swiper(".mySwiper", {
    loop: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});


let box = document.querySelector(".draggable-text");
let dragging = false, startX, startY, initialX, initialY;

const container = document.querySelector(".mySwiper"); // boundary box

box.addEventListener("mousedown", startDrag);
box.addEventListener("touchstart", startDrag, { passive: false });

function startDrag(e) {
    dragging = true;

    let rect = box.getBoundingClientRect();

    if (e.type === "mousedown") {
        startX = e.clientX;
        startY = e.clientY;
    } else {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }

    initialX = rect.left;
    initialY = rect.top;

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);

    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", stopDrag);
}

function drag(e) {
    if (!dragging) return;

    e.preventDefault();

    let clientX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    let clientY = e.type.includes("mouse") ? e.clientY : e.touches[0].clientY;

    let dx = clientX - startX;
    let dy = clientY - startY;

    let newX = initialX + dx;
    let newY = initialY + dy;

    // ------ BOUNDARY LIMITS ------
    let containerRect = container.getBoundingClientRect();
    let boxRect = box.getBoundingClientRect();

    let minX = containerRect.left;
    let maxX = containerRect.right - boxRect.width;

    let minY = containerRect.top;
    let maxY = containerRect.bottom - boxRect.height;

    // Clamp values
    if (newX < minX) newX = minX;
    if (newX > maxX) newX = maxX;

    if (newY < minY) newY = minY;
    if (newY > maxY) newY = maxY;

    box.style.left = newX + "px";
    box.style.top = newY + "px";
    box.style.transform = "none";
}

function stopDrag() {
    dragging = false;

    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);

    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", stopDrag);
}
