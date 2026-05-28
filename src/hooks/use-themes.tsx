import { createContext, useContext } from "react"

type ThemeContextType = {
    theme: "light" | "dark"
    toggle:() => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export const useTheme = () => {
    const ctx = useContext(ThemeContext)
    if(!ctx) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return ctx
}