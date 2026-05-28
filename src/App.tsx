import { FaReact } from "react-icons/fa6"
import { Outlet } from "react-router-dom"
import ThemeButton from "./components/themes"

function App() {
  return (
    <>
      <nav className="flex py-2 justify-center">
        <div className="w-[85%] py-3 px-10 shadow bg-white/10 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold"><FaReact className="text-blue-500 inline me-4" size={30} /> React Lab</h3>
          </div>
          <div>
            <ThemeButton />
          </div>
        </div>
      </nav>
      <section>
        <Outlet />
      </section>
    </>
  )
}

export default App
