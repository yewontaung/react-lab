import { useState } from "react"
import { CodeContext } from "../hooks/use-codes"

export function CodeProvider({children}:{children:React.ReactNode}) {
    const [codes, setCodes] = useState("")
    const [framework, setFramework] = useState<"bootstrap" | "tailwind">("tailwind")
    return (
        <CodeContext.Provider value={{codes, setCodes, framework, setFramework}}>
            {children}
        </CodeContext.Provider>
    )
}