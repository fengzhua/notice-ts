export function getStyle(element:HTMLElement) {
    if (typeof getComputedStyle !== "undefined") {
        return getComputedStyle(element);
    }else {
        return element.style
    }
}
