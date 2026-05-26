import { useEffect, useRef, useState } from "react"
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
    const [needRefresh, setNeedRefresh] = useState(false)

    useEffect(() => {
        const load = () => {
            const iframe = ref?.current
            const srcDoc = `
                <html>
                    <head>
                        ${framework === "tailwind" ? `<script src="https://cdn.tailwindcss.com"></script>` : ""}
                        ${framework === "bootstrap" ? `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">` : ""}
                        <script src="/script.js"></script>
                    </head>
                    <body>
                        <div style="position: relative; height: 100vh;">
                            <div id="preview" style="position: absolute;"></div>
                        </div>
                    </body>
                </html>
            `
            if (iframe) {
                iframe.addEventListener("load", () => setNeedRefresh(true))
                iframe.srcdoc = srcDoc
            }
        }
        load()
        return ref.current?.removeEventListener("load", () => setNeedRefresh(false))
    }, [ref, framework, setNeedRefresh])

    useEffect(() => {
        const refresh = () => {
            const doc = ref?.current?.contentDocument
            if (!doc) return

            const div = doc.querySelector("#preview")
            if (div) div.innerHTML = codes
            setNeedRefresh(false)
        }
        if (codes || needRefresh) refresh()
    }, [codes, ref, needRefresh])

    return (
        <div className="border canvas h-full relative">
            <iframe ref={ref} className="h-full w-full" sandbox="allow-scripts allow-same-origin" />
        </div>
    )
}