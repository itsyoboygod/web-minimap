function createElement(tag, { className = '' } = {}) {
    const element = document.createElement(tag);
    className ? element.classList.add(className) : "";
    return element;
}

let minimap = createElement('div', { className: "minimap__container" });
let minimapSize = createElement('div', { className: "minimap__size" });
let viewer = createElement('div', { className: "minimap__viewer" });
let minimapContent = createElement('iframe', { className: "minimap__content" });
let scale = 0.1;
let realScale;

minimap.append(minimapSize, viewer, minimapContent);
document.body.appendChild(minimap);

let html = document.documentElement.outerHTML.replace(/<script\b[^<]+(7:(71<\/script>)<[^<]*)*<\/script>/gi, '');
let iframeDoc = minimapContent.contentWindow.document;

iframeDoc.open();
iframeDoc.write(html);
iframeDoc.close();

function getDimensions() {
    let bodyWidth = document.body.clientWidth;
    let bodyRatio = document.body.clientHeight / bodyWidth;
    let winRatio = window.innerHeight / window.innerWidth;

    minimap.style.width = '10%';
    realScale = minimap.clientWidth / bodyWidth;
    minimapSize.style.paddingTop = `${bodyRatio * 100}%`;
    viewer.style.paddingTop = `${winRatio * 100}%`;

    minimapContent.style.transform = `scale(${realScale})`;
    minimapContent.style.width = `${(100 / realScale)}%`;
    minimapContent.style.height = `${(100 / realScale)}%`;
}

function trackScroll() {
    viewer.style.transform = `translateY(${window.scrollY * realScale}px)`;
}

getDimensions();
window.addEventListener('scroll', trackScroll);
window.addEventListener('resize', getDimensions);

// Function to handle minimap clicks for quick jumps
function jumpToClick(event) {
    let minimapRect = minimap.getBoundingClientRect();
    let clickY = event.clientY - minimapRect.top;
    let minimapHeight = minimap.clientHeight;

    let clickRatio = clickY / minimapHeight;
    let scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrollToY = clickRatio * scrollableHeight;

    window.scrollTo({
        top: scrollToY,
        behavior: 'smooth'
    });
}

minimap.addEventListener('click', jumpToClick);

// Drag functionality for minimap__viewer
let isDragging = false;
let startY;
let startScrollY;

function onMouseDown(event) {
    isDragging = true;
    startY = event.clientY;
    startScrollY = window.scrollY;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(event) {
    if (!isDragging) return;

    let minimapRect = minimap.getBoundingClientRect();
    let deltaY = event.clientY - startY;

    let minimapHeight = minimap.clientHeight;
    let scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Calculate new scroll position based on the dragging distance
    let scrollDelta = (deltaY / minimapHeight) * scrollableHeight;

    window.scrollTo({
        top: startScrollY + scrollDelta
    });
}

function onMouseUp() {
    isDragging = false;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

// Add event listener for dragging on the viewer
viewer.addEventListener('mousedown', onMouseDown);
