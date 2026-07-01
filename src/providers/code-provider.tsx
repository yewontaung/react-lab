import { useState } from "react"
import { CodeContext } from "../hooks/use-codes"
import * as Monaco from "monaco-editor"

export function CodeProvider({children}:{children:React.ReactNode}) {
    const [codes, setCodes] = useState("")
    const [framework, setFramework] = useState<"bootstrap" | "tailwind">("tailwind")
    const [editor, setEditor] = useState<Monaco.editor.IStandaloneCodeEditor|undefined>()
    return (
        <CodeContext.Provider value={{codes, setCodes, framework, setFramework, editor, setEditor}}>
            {children}
        </CodeContext.Provider>
    )
}