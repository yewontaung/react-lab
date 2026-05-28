import { useState } from "react";

export default function useForms<T extends Record<string, unknown>>(t: T) {
    const [form, setForm] = useState<T>(t)
    const controls = {} as {[K in keyof T]: K}
    (Object.keys(form) as (keyof T)[]).forEach(i => controls[i] = i)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    }
    return { form, onChange, controls, setForm }
}