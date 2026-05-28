import convert from "node-html-to-jsx";
import type { ReactForm } from "../models/forms";

export function generateTemplate(form: ReactForm, codes: string) {
    const template = form.reactArrowFunction ? arrowFunctionTemplate(form, convert(codes)) : functionTemplate(form, convert(codes))
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

    if (form.acceptClassNames) {
        props.push("classNames")
        types.push("classNames?: string")
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