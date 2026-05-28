function addClassName(el:HTMLElement) {
    el.classList.add("framework")
}


export function bootstrap() {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
    addClassName(link)
    addClassName(script)
    return {
        "link": link,
        "script": script,
    }
}

export function tailwind() {
    const script = document.createElement("script")
    script.src = "https://cdn.tailwindcss.com"
    addClassName(script)
    return {script,}
}