import { FaReact } from "react-icons/fa6"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
      <nav className="flex py-2 justify-center">
        <div className="w-[85%] p-3 shadow bg-white">
          <h3 className="text-lg font-bold"><FaReact className="text-blue-500 inline me-4" size={30} /> React Lab</h3>
        </div>
      </nav>
      <section>
        <Outlet />
      </section>
    </>
  )
}

export default App
