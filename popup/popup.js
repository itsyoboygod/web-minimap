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

// New function to handle clicks on the minimap
function jumpToClick(event) {
    let minimapRect = minimap.getBoundingClientRect();
    let clickY = event.clientY - minimapRect.top;  // Y-coordinate of the click within the minimap
    let minimapHeight = minimap.clientHeight;

    // Calculate the percentage of the minimap that was clicked
    let clickRatio = clickY / minimapHeight;

    // Get the corresponding scroll position for the main window
    let scrollToY = clickRatio * document.body.scrollHeight;

    // Scroll the main window to that position
    window.scrollTo({
        top: scrollToY,
        behavior: 'smooth'  // Smooth scrolling for better UX
    });
}

minimap.addEventListener('click', jumpToClick);
