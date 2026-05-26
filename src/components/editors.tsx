import { Editor } from "@monaco-editor/react"
import { AppSelect } from "./app/app-select"
import { ClipboardCheck, Copy } from "lucide-react"
import { useState } from "react"
import { useModalControl } from "../hooks/use-controls"
import { AppModal } from "./app/app-modal"
import { useCodes } from "../hooks/use-codes"

export function EditorSpace() {
    return (
        <div>
            <EditorNav />
            <CodeEditor />
        </div>
    )
}

function CodeEditor() {
    const {setCodes} = useCodes()
    return (
        <div className="">
            <Editor height="420px"
                language="html"
                theme="vs-dark"
                onChange={(v) => setCodes(v || "")}
                options={
                    {
                        fontSize: 16,
                        fontWeight: "bold",
                        fontFamily: "JetBrains Mono",
                        minimap: { enabled: false },
                        padding: {top: 16, bottom: 16}
                    }
                } />
        </div>
    )
}

function EditorNav() {
    const {setFramework} = useCodes()
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
                <CopyButton />
                <ReactButton />
            </div>
        </div>
    )
}

const ReactButton = () => {
    const {isOpen, open, close} = useModalControl()
    return (
        <>
            <button onClick={open} className="bg-blue-500 text-white py-1 px-3">React</button>
            <ReactModal {...{isOpen, open, close}} />
        </>
    )    
}

const ReactModal = ({isOpen, open, close}: {isOpen:boolean, open:() => void, close:() => void}) => {
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

const CopyButton = () => {
    const [isCopying, setIsCopying] = useState(false)
    const onClick = () => {
        if(isCopying) return
        setIsCopying(true)
        setTimeout(() => setIsCopying(false), 2000)
    }
    return (
        <button onClick={onClick} className="hover:bg-slate-400/30 p-2">
            {isCopying || <Copy size={15} />}
            {isCopying && <ClipboardCheck size={15} />}
        </button>
    )
}