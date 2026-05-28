import { useEffect, useRef, useState } from "react"
import { useCodes } from "../hooks/use-codes"
import { bootstrap, tailwind } from "../utils/frameworks"
import { useTheme } from "../hooks/use-themes"

export function PreviewSpace() {
    return (
        <div>
            <Preview />
        </div>
    )
}


function Preview() {

    const { codes, framework } = useCodes()
    const [needRefresh, setNeedRefresh] = useState(false)
    const {theme} = useTheme()

    const ref = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        const refreshEvent = () => setNeedRefresh(true)
        const load = () => {
            const iframe = ref?.current
            const srcDoc = `
                <html>
                    <head>
                        ${framework === "bootstrap" ? bootstrap().link.outerHTML : ""}
                        ${framework === "bootstrap" ? bootstrap().script.outerHTML : ""}
                        ${framework === "tailwind" ? tailwind().script.outerHTML : ""}

                        <script src="/script.js"></script>
                    </head>
                    <body style="background: transparent; color: ${theme === "light" ? "black" : "white"};">
                        <div style="position: relative; height: 100vh; width: 100%;">
                            <div id="preview" style="position: absolute; padding:10px; width: fit-content;"></div>
                        </div>
                    </body>
                </html>
            `
            if (iframe) {
                iframe.addEventListener("load", refreshEvent)
                iframe.srcdoc = srcDoc
            }
        }
        load()
        // return ref?.current?.removeEventListener("load", refreshEvent)
    }, [ref, framework, theme])

    // useEffect(() => {
    //         const doc = ref.current?.contentDocument
    //         if(!doc) return
    //         Array.from(doc.querySelectorAll(".framework")).forEach(i => i.remove())
    //         Array.from(doc.getElementsByTagName("style")).forEach(i => {console.log(i);i.innerHTML = "";})
    //         if(framework === "bootstrap") {
    //             const {link, script} = bootstrap()
    //             doc.head.appendChild(link)
    //             doc.head.appendChild(script)
    //         } else if(framework == "tailwind") {
    //             const {script} = tailwind()
    //             doc.head.appendChild(script)
    //         }
    //         setNeedRefresh(true)
    // }, [framework])

    useEffect(() => {
        const refresh = () => {
            const doc = ref?.current?.contentDocument
            if (!doc) return

            const div = doc.querySelector("#preview")
            if (div) div.innerHTML = codes
            setNeedRefresh(false)
        }
        if(codes) refresh()
        else if (needRefresh) refresh()
    }, [codes, needRefresh, ref])

    return (
        <div className="border canvas h-full relative">
            <iframe ref={ref} className="h-full w-full" sandbox="allow-scripts allow-same-origin" />
        </div>
    )
}