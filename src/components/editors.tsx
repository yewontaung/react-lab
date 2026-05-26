import { Editor, type OnMount } from "@monaco-editor/react"
import { AppSelect } from "./app/app-select"
import { ClipboardCheck, Copy } from "lucide-react"
import { useState } from "react"
import { useModalControl } from "../hooks/use-controls"
import { AppModal } from "./app/app-modal"
import { useCodes } from "../hooks/use-codes"
import * as Monaco from "monaco-editor"
import { emmetHTML } from "emmet-monaco-es"

export function EditorSpace() {
    return (
        <div>
            <EditorNav />
            <CodeEditor />
        </div>
    )
}

function CodeEditor() {
    const { setCodes } = useCodes()
    const save = (value?: string) => {
        if (!value) return
        setCodes(value)
    }

    const onMount: OnMount = (editor, monaco: typeof Monaco) => {
        editor.focus()
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            save(editor.getValue())
        })

        emmetHTML(monaco, ["html"])
    }
    return (
        <div className="">
            <Editor height="420px"
                language="html"
                theme="vs-dark"
                onMount={onMount}
                options={
                    {
                        fontSize: 16,
                        fontWeight: "bold",
                        fontFamily: "JetBrains Mono",
                        minimap: { enabled: false },
                        padding: { top: 16, bottom: 16 }
                    }
                } />
        </div>
    )
}

function EditorNav() {
    const { codes, setFramework } = useCodes()
    const copy = async () => {
        if (!codes) return
        await navigator.clipboard.writeText(codes)
    }
    return (
        <div className="border flex items-center justify-between mb-3 p-2">
            <AppSelect
                id="framework"
                name="framework"
                options={[
                    { value: "tailwind", label: "Tailwind" },
                    { value: "bootstrap", label: "Bootstrap" }
                ]}
                onChange={(v) => v && setFramework(v as "tailwind" | "bootstrap")}
            />

            <div className="flex items-center gap-4">
                <CopyButton copy={copy} />
                <ReactButton />
            </div>
        </div>
    )
}

const ReactButton = () => {
    const { isOpen, open, close } = useModalControl()
    return (
        <>
            <button onClick={open} className="bg-blue-500 text-white py-1 px-3">React</button>
            <ReactModal {...{ isOpen, open, close }} />
        </>
    )
}

const ReactModal = ({ isOpen, open, close }: { isOpen: boolean, open: () => void, close: () => void }) => {
    return (
        <AppModal isOpen={isOpen} open={open} close={close}>
            <AppModal.Dialog>
                <AppModal.Content>
                    <AppModal.Header canClose>Copy as React Component</AppModal.Header>
                    <AppModal.Body>
                        hello
                    </AppModal.Body>
                </AppModal.Content>
            </AppModal.Dialog>
        </AppModal>
    )
}

const CopyButton = ({ copy }: { copy: () => void }) => {
    const [isCopying, setIsCopying] = useState(false)
    const onClick = () => {
        if (isCopying) return
        setIsCopying(true)
        copy()
        setTimeout(() => setIsCopying(false), 2000)
    }
    return (
        <button onClick={onClick} className="hover:bg-slate-400/30 p-2">
            {isCopying || <Copy size={15} />}
            {isCopying && <ClipboardCheck size={15} />}
        </button>
    )
}