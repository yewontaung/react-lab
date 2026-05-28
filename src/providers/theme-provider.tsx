import { useEffect, useState } from "react";
import { ThemeContext } from "../hooks/use-themes";

export default function ThemeProvider({children}:{children: React.ReactNode}) {
    const [theme, setTheme] = useState<"light" | "dark">("dark")
    useEffect(() => {
        document.documentElement.classList.remove(theme === "light" ? "dark" : "light")
        document.documentElement.classList.add(theme)
    }, [theme])
    const toggle = () => {
        setTheme(prev => prev === "light" ? "dark" : "light")
    }
    return (
        <ThemeContext.Provider value={{
            theme, toggle
        }}>
            {children}
        </ThemeContext.Provider>
    )
}