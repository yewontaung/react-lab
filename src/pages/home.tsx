import { EditorSpace } from "../components/editors";
import { PreviewSpace } from "../components/previews";
import { CodeProvider } from "../providers/code-provider";

export default function HomePage() {
    return (
        <div className="flex justify-center">
            <div className="w-[80%] p-5 grid grid-cols-2 gap-2">
                <CodeProvider>
                    <EditorSpace />
                    <PreviewSpace />
                </CodeProvider>
            </div>
        </div>
    )
}