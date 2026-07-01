import { Editor, type OnMount } from "@monaco-editor/react"
import { AppSelect } from "./app/app-select"
import { ClipboardCheck, Code, Copy, PlayCircle, Settings } from "lucide-react"
import { useEffect, useState } from "react"
import { useModalControl } from "../hooks/use-controls"
import { AppModal } from "./app/app-modal"
import { useCodes } from "../hooks/use-codes"
import * as Monaco from "monaco-editor"
import { emmetHTML } from "emmet-monaco-es"
import AppInput from "./app/app-input"
import AppCheck from "./app/app-check"
import { FaReact } from "react-icons/fa6"
import { SiBootstrap, SiTailwindcss } from "react-icons/si"
import { Prism } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"
import useForms from "../hooks/use-forms"
import type { ReactForm } from "../models/forms"
import * as prettier from "prettier/standalone"
import parserBable from "prettier/plugins/babel"
import * as esTree from "prettier/plugins/estree"
import { generateTemplate } from "../utils/templates"

export function EditorSpace() {
    return (
        <div>
            <EditorNav />
            <CodeEditor />
        </div>
    )
}

function CodeEditor() {
    const { setCodes, setEditor } = useCodes()
    const save = (value?: string) => {
        if (!value) return
        setCodes(value)
    }

    const onMount: OnMount = (editor, monaco: typeof Monaco) => {
        editor.focus()
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            save(editor.getValue())
        })
        setEditor(editor)
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
    const { codes, setCodes, editor, setFramework } = useCodes()
    const copy = async () => {
        if (!codes) return
        await navigator.clipboard.writeText(codes)
    }

    const run = () => {
        if (!editor || !editor.getValue()) return
       setCodes(editor.getValue())
    }    

    return (
        <div className="border flex items-center justify-between mb-3 p-2">
                <AppSelect options={[
                    {
                        label: "Tailwind", value: "tailwind", icon: <SiTailwindcss className="text-blue-500 dark:text-blue-400" />,
                    },
                    {
                        label: "Bootstrap", value: "bootstrap", icon: <SiBootstrap className="text-purple-700 dark:text-purple-450" />,
                    },
                ]} render={option => <>{option.icon} {option.label}</>} onChange={(v) => setFramework(v as "tailwind" | "bootstrap")} />

            <div className="flex items-center gap-4">
                <CopyButton copy={copy} />
                <RunButton run={run} />
                <ReactButton />
            </div>
        </div>
    )
}

const RunButton = ({run}:{run:() => void}) => {
    return (
        <button onClick={run} className="hover:bg-slate-400/40 rounded-full p-1"><PlayCircle size={20} /></button>
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
    const {form, onChange, controls, setForm} = useForms<ReactForm>(
        {
            name: "Demo",
            acceptClassName: false,
            acceptChildren: false,
            defaultExport: false,
            reactArrowFunction: false,
        }
    )

    const isSelectAll = () => form.acceptChildren && form.acceptClassName && form.defaultExport && form.reactArrowFunction

    const selectAll = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.target
        if(checked) {
            setForm(prev => ({...prev, acceptChildren: true, acceptClassName: true, defaultExport: true, reactArrowFunction: true}))
        } else {
            setForm(prev => ({...prev, acceptChildren: false, acceptClassName: false, defaultExport: false, reactArrowFunction: false}))
        }
    }

    const [review, setReview] = useState("")

    useEffect(() => {
        if(!codes) return
        const template = generateTemplate(form, codes)
        prettier.format(template, { parser: "babel-ts", plugins: [parserBable, esTree] }).then(setReview)
    }, [codes, form])

    const copy = async () => {
        const template = generateTemplate(form, codes)
        await navigator.clipboard.writeText(template)
    }

    return (
        <AppModal isOpen={isOpen} open={open} close={close}>
            <AppModal.Dialog>
                <AppModal.Content className="bg-white dark:bg-zinc-800/80 shadow">
                        <AppModal.Header canClose>Copy as React Component</AppModal.Header>
                        <AppModal.Body className="mt-3">
                            <form className="text-sm">
                                <div className="flex items-center gap-x-3">
                                    <FaReact size={15} className="text-blue-500" /><h5>Component Name</h5> <hr className="grow text-slate-300" />
                                </div>
                                <AppInput value={form.name} onChange={onChange} name={controls.name} className="px-3" placeholder="Enter Component Name" />
                                <div className="mt-5">
                                    <div className="flex items-center gap-x-3">
                                        <Settings size={15} className="text-blue-500" /><h5>Component Settings</h5> <hr className="grow text-slate-300" /> <AppCheck checked={isSelectAll()} onChange={selectAll} label={`${isSelectAll() ? "Deselect All" : "Select All"}`} id="sa" name="" />
                                    </div>
                                    <div className="mt-3 px-3 flex gap-x-4">
                                        <ul className="flex flex-col gap-y-3">
                                            <li>
                                                <AppCheck name={controls.acceptClassName} checked={form.acceptClassName} onChange={onChange} id="acn" label="Accept className" />
                                            </li>
                                            <li>
                                                <AppCheck name={controls.acceptChildren} checked={form.acceptChildren} onChange={onChange} id="ac" label="Accept children" />
                                            </li>
                                        </ul>
                                        <ul className="flex flex-col gap-y-3">
                                            <li>
                                                <AppCheck name={controls.defaultExport} checked={form.defaultExport} onChange={onChange} id="de" label="Default export" />
                                            </li>
                                            <li>
                                                <AppCheck name={controls.reactArrowFunction} checked={form.reactArrowFunction} onChange={onChange} id="raf" label="React arrow function" />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center gap-x-3">
                                        <Code size={15} className="text-blue-500" /><h5>Code Review</h5> <hr className="grow text-slate-300" />
                                    </div>
                                    <div className="mt-3">
                                        {/* <div>{JSON.stringify(form)}</div> */}
                                        <Prism language="jsx" style={dracula} customStyle={{
                                            borderRadius: 0,
                                            height: 250,
                                        }}>{review}</Prism>
                                    </div>
                                </div>
                            </form>
                        </AppModal.Body>
                        <AppModal.Footer className="mt-3">
                            <div className="flex justify-end">
                                <ReactCopy copy={copy} />
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
        <button onClick={onClick} className={`border p-2 flex items-center justify-center gap-3 hover:bg-slate-500/30`}>
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
            {isCopying && <ClipboardCheck className="dark:text-green-500" size={15} />}
        </button>
    )
}