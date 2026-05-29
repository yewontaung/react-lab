import convert from "node-html-to-jsx";
import type { ReactForm } from "../models/forms";

function toJSX(html:string) {
    return convert(html)
}

export function generateTemplate(form: ReactForm, codes: string) {
    const template = form.reactArrowFunction ? arrowFunctionTemplate(form, toJSX(codes)) : functionTemplate(form, toJSX(codes))
    return template
}

function arrowFunctionTemplate(form: ReactForm, codes: string) {
    const template = `
    export const ${form.name} = (${params(form)}) => {
        return (
            ${codes}
        )
    }
    `
    return template
}

function functionTemplate(form: ReactForm, codes: string) {
    const template = `
    export ${form.defaultExport ? "default" : ""} function ${form.name}(${params(form)}) {
        return (
            ${codes}
        )
    }
    `
    return template
}

function params(form: ReactForm) {
    const props: string[] = []
    const types: string[] = []

    if (form.acceptClassName) {
        props.push("className")
        types.push("className?: string")
    }

    if (form.acceptChildren) {
        props.push("children")
        types.push("children: React.ReactNode")
    }

    if (props.length === 0) {
        return ""
    }

    return `{ ${props.join(", ")} }: { ${types.join("; ")} }`
}