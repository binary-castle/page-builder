export function useLoadCSS() {
    const loadedCSSLinks = new Map<string, HTMLLinkElement>();

    const loadCSS = (url: string) => {
        if (!url || loadedCSSLinks.has(url)) return;

        const linkTag = document.createElement("link");
        linkTag.rel = "stylesheet";
        linkTag.href = url;
        linkTag.onload = () => console.log(`CSS loaded: ${url}`);
        document.head.appendChild(linkTag);

        // Save reference to the link tag
        loadedCSSLinks.set(url, linkTag);
    };

    const removeCSS = (url: string) => {
        const linkTag = loadedCSSLinks.get(url);

        if (linkTag) {
            linkTag.parentNode?.removeChild(linkTag);
            loadedCSSLinks.delete(url);
            console.log(`CSS removed: ${url}`);
        } else {
            console.warn(`CSS not found or already removed: ${url}`);
        }
    };

    return {
        loadCSS,
        removeCSS,
    };
}
