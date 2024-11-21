export function useLoadCSS() {

    const loadCSS = (url: string) => {
        if (!url) return;
        const linkTag = document.createElement("link");
        linkTag.rel = "stylesheet";
        linkTag.href = url;
        linkTag.onload = () => console.log(`CSS loaded: ${url}`);
        document.head.appendChild(linkTag);
    };

    return {
        loadCSS
    }

}