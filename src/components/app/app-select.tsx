import { ChevronDown } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"

type AppOptionProps = {
    value:string, 
    label:string, 
    selected?:boolean
}

type AppSelectProps<T extends AppOptionProps> = {
    id?:string,
    name?:string,
    className?:string,
    options:T [],
    render: (option:T) => React.ReactNode,
    onChange?:(value:string) => void,
}

export function AppSelect<T extends AppOptionProps>({className, options, render, onChange}:AppSelectProps<T>) {
    const [selected, setSelected] = useState<T>(options[0])
    const [hidden, setHidden] = useState(true)
    if(options.filter(i => i.selected).length === 1) {
        setSelected(options.filter(i => i.selected)[0])
    }
    const select = (option:T) => {
        setSelected(option)
        if(onChange) {
            onChange(option.value)
        }
    }

    useEffect(() => {
        document.addEventListener("click", () => setHidden(true))
        return document.removeEventListener("click", () => setHidden(true))
    }, [setHidden])

    const toggle = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setHidden(prev => !prev)
    }
    return (
        <button onClick={toggle} className={`relative flex justify-center items-center gap-x-2 border p-1 ${className}`}>
            {render(selected)} {<ChevronDown size={20} />}
            <div className="absolute bg-white/20 backdrop-blur min-w-[101%] shadow z-50">
                {options.map(i => <div className={`flex items-center hover:bg-slate-400/40 p-2 gap-x-2 ${hidden ? "hidden" : ""}`} onClick={() => select(i)} key={i.value}>{render(i)}</div>)}
            </div>
        </button>
    )
}