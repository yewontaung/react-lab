import { createContext, useContext } from "react"

type CodeContextType = {
    codes:string,
    setCodes:(codes:string) => void,
    framework:"bootstrap" | "tailwind"
    setFramework: (framework:"bootstrap" | "tailwind") => void
}

export const CodeContext = createContext<CodeContextType | null>(null)

export const useCodes = () => {
    const ctx = useContext(CodeContext)
    if (ctx == null) {
        throw Error("useCodes must be inside CodeProvider.")
    }
    return ctx
}
