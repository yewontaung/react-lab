import type { ChangeEvent } from "react"

type AppCheckProps = {
    label?:string,
    id:string,
    name:string,
    className?:string,
    checked?:boolean,
    onChange?:(e:ChangeEvent<HTMLInputElement>) => void
}

export default function AppCheck({id, label, className, ...props}: AppCheckProps) {
    return (
        <div className={`text-sm ${className}`}>
            <input id={id} type="checkbox" className="me-2" {...props}/>
            {label && <label htmlFor={id}>{label}</label>}
        </div>
    )
}