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
            <div onClick={close} className={isOpen ? "backdrop-blur-xl fixed inset-0 z-50 flex p-4 justify-center items-start" : "hidden"}>{children}</div>
        </AppModalContext.Provider>
    )
}

AppModal.Header = function ({children, canClose=false}: {children:React.ReactNode, canClose?:boolean}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {close} = useAppModal()
    return (
        <div className="flex justify-between">
            {children} {canClose && <button onClick={close}><X /></button>}
        </div>
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

AppModal.Content = function ({children}: {children:React.ReactNode}) {
    return (
        <div className="w-full p-3">{children}</div>
    )
}

AppModal.Body = function ({children}: {children:React.ReactNode}) {
    return (
        <>{children}</>
    )
}