import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
      <nav className="px-20 py-4">
        <h3>React Lab</h3>
      </nav>
      <section>
        <Outlet />
      </section>
    </>
  )
}

export default App
