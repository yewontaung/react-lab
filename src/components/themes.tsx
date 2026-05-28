import { Moon, Sun } from "lucide-react"
import { useTheme } from "../hooks/use-themes"

export default function ThemeButton({className}:{className?: string}) {
    const {theme, toggle} = useTheme()
    return (
        <button className={`hover:bg-slate-300/30 p-2 ${className}`} onClick={toggle}>
            {theme === "dark" && <Sun size={20} className="text-yellow-400"/>}
            {theme === "light" && <Moon className="text-blue-600" size={20} />}
        </button>
    )
}