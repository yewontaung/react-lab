import { useEffect, useRef } from "react"
import { useCodes } from "../hooks/use-codes"

export function PreviewSpace() {
    return (
        <div>
            <Preview />
        </div>
    )
}


function Preview() {

    const { codes, framework } = useCodes()
    const ref = useRef<HTMLIFrameElement>(null)


    useEffect(() => {
        const load = () => {
            const iframe = ref?.current
            const srcDoc = `
                <html>
                    <head>
                        ${framework === "tailwind" ? `<script src="https://cdn.tailwindcss.com"></script>` : ""}
                        ${framework === "bootstrap" ? `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">` : ""}
                    </head>
                    <body>
                        <div id="preview">
                        </div>
                    </body>
                </html>
            `
            if (iframe) iframe.srcdoc = srcDoc
        }
        load()

    }, [ref, framework])

    useEffect(() => {
        const refresh = () => {
            const doc = ref?.current?.contentDocument
            if (!doc) return

            const div = doc.querySelector("#preview")
            if (div) div.innerHTML = codes
        }
        if (codes) refresh()
    }, [codes, ref])

    // useEffect(() => {

    //     const load = () => {
    //         const doc = ref?.current?.contentDocument
    //         if (!doc) return

    //         const head = doc.head
    //         head.innerHTML = ""

    //         if (framework === "tailwind") {
    //             const script = document.createElement("script")
    //             script.src = "https://cdn.tailwindcss.com"
    //             // script.onload = refresh
    //             head.appendChild(script)
    //             console.log("Tailwind loaded")
    //         } else if (framework === "bootstrap") {
    //             const link = document.createElement("link")
    //             link.rel = "stylesheet"
    //             link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    //             head.appendChild(link)
    //             console.log("Bootstrap loaded")
    //         }
    //     }
    //     load()
    // }, [framework, ref])

    return (
        <div className="border canvas h-full relative">
            <iframe ref={ref} className="h-screen w-full" sandbox="allow-scripts allow-same-origin" />
        </div>
    )
}