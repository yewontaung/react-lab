import { EditorSpace } from "../components/editors";
import { PreviewSpace } from "../components/previews";
import { useMobile } from "../hooks/use-mobile";
import { CodeProvider } from "../providers/code-provider";

export default function HomePage() {
    const isMobile = useMobile()
    return (
        <div className="flex justify-center">
            <div className="sm:w-[80%] sm:grid-cols-1 md:w-[80%] md:p-5 grid md:grid-cols-2 gap-2">
                <CodeProvider>
                    {!isMobile && <><EditorSpace /><PreviewSpace /></>}
                    {isMobile && <><PreviewSpace /><EditorSpace /></>}
                </CodeProvider>
            </div>
        </div>
    )
}