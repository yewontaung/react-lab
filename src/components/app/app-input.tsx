import type { InputHTMLAttributes } from "react";

type AppInputProps = {
    label?:string,
    node?:React.ReactNode,
} & InputHTMLAttributes<HTMLInputElement>

export default function AppInput({label, className, node, ...props}: AppInputProps) {
    return (
        <div className={` ${className}`}>
            {label && <label>{label}</label>}
            <div className="border mt-3 flex items-center gap-x-3 p-2">
                {node && node}
                <input {...props} className="grow focus:outline-none w-full bg-transparent" />
            </div>
        </div>
    )
}