import { Editor, type OnMount } from "@monaco-editor/react"
import { AppSelect } from "./app/app-select"
import { ClipboardCheck, Code, Copy, Settings } from "lucide-react"
import { useState } from "react"
import { useModalControl } from "../hooks/use-controls"
import { AppModal } from "./app/app-modal"
import { useCodes } from "../hooks/use-codes"
import * as Monaco from "monaco-editor"
import { emmetHTML } from "emmet-monaco-es"
import AppInput from "./app/app-input"
import AppCheck from "./app/app-check"
import { FaReact } from "react-icons/fa6"

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
    const {codes} = useCodes()
    return (
        <AppModal isOpen={isOpen} open={open} close={close}>
            <AppModal.Dialog>
                <AppModal.Content className="bg-white shadow">
                    <AppModal.Header canClose>Copy as React Component</AppModal.Header>
                    <AppModal.Body className="mt-3">
                        <form className="text-sm">
                            <div className="flex items-center gap-x-3">
                                <FaReact size={15} className="text-blue-500" /><h5>Component Name</h5> <hr className="grow text-slate-300" />
                            </div>
                            <AppInput className="px-3" placeholder="Enter Component Name" />
                            <div className="mt-5">
                                <div className="flex items-center gap-x-3">
                                    <Settings size={15} className="text-blue-500" /><h5>Component Settings</h5> <hr className="grow text-slate-300" /> <AppCheck label="Select All" id="sa" name="" />
                                </div>
                                <div className="mt-3 px-3 flex gap-x-4">
                                    <ul className="flex flex-col gap-y-3">
                                        <li>
                                            <AppCheck id="acn" name="" label="Accept className" />
                                        </li>
                                        <li>
                                            <AppCheck id="ac" name="" label="Accept children" />
                                        </li>
                                    </ul>
                                    <ul className="flex flex-col gap-y-3">
                                        <li>
                                            <AppCheck id="de" name="" label="Default export" />
                                        </li>
                                        <li>
                                            <AppCheck id="raf" name="" label="React arrow function" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center gap-x-3">
                                    <Code size={15} className="text-blue-500" /><h5>Code Review</h5> <hr className="grow text-slate-300" />
                                </div>
                                <div className="border border-slate-400 p-3 mt-3">{codes}</div>
                            </div>
                        </form>
                    </AppModal.Body>
                    <AppModal.Footer className="mt-3">
                        <div className="flex justify-end">
                            <ReactCopy copy={() => {}} />
                        </div>
                    </AppModal.Footer>
                </AppModal.Content>
            </AppModal.Dialog>
        </AppModal>
    )
}

const ReactCopy = ({ copy }: { copy: () => void }) => {
    const [isCopying, setIsCopying] = useState(false)
    const onClick = () => {
        if (isCopying) return
        setIsCopying(true)
        copy()
        setTimeout(() => setIsCopying(false), 1500)
    }
    return (
        <button onClick={onClick} className={`border p-2 flex items-center justify-center gap-3`}>
            {isCopying || <><Copy size={15} /> Copy Component</>}
            {isCopying && <><ClipboardCheck size={15} /> Copying ...</>}
        </button>
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