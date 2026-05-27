import { X } from "lucide-react"
import { createContext, useContext } from "react"

type AppModalContextType = {
    open:() => void,
    close:() => void,
}

const AppModalContext = createContext<AppModalContextType | null>(null)
const useAppModal = () => {
    const ctx = useContext(AppModalContext)
    if (ctx == null) {
        throw Error("useModal must be used inside AppModalContext")
    }
    return ctx
}

export type AppModalProps = AppModalContextType & {isOpen:boolean, children: React.ReactNode}

export function AppModal({isOpen, open, close, children}: AppModalProps) {
    return (
        <AppModalContext.Provider value={{open, close}}>
            <div onClick={close} className={isOpen ? "backdrop-blur fixed inset-0 z-50 flex p-4 justify-center items-start" : "hidden"}>{children}</div>
        </AppModalContext.Provider>
    )
}

AppModal.Header = function ({children, underline=false, canClose=false}: {underline?:boolean, children:React.ReactNode, canClose?:boolean}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {close} = useAppModal()
    return (
        <>
            <div className="flex justify-between items-center">
                {children} {canClose && <button className="hover:bg-slate-500/20 p-1" onClick={close}><X /></button>}
            </div>
            {underline && <hr className="my-3 text-slate-500" />}
            
        </>
    )
}

AppModal.Footer = function ({children, upperline=false, className}: {upperline?:boolean, children:React.ReactNode, className?:string}) {
    return (
        <>
            {upperline && <hr className="text-slate-500 my-3" />}
            <div className={className}>
                {children}
            </div>
        </>
    )
}

AppModal.Dialog = function ({size = "medium", children}: {size?:"small" | "medium" | "large" , children:React.ReactNode}) {
    return (
        <div onClick={e => e.stopPropagation()} className={`${
            size === "medium" ? "w-[50%]"
            : size === "small" ? "w-[25%]"
            : "w-[80%]"
        }`}>{children}</div>
    )
}

AppModal.Content = function ({children, className}: {children:React.ReactNode, className?:string}) {
    return (
        <div className={`w-full p-3 ${className}`}>{children}</div>
    )
}

AppModal.Body = function ({className, children}: {className?:string, children:React.ReactNode}) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}