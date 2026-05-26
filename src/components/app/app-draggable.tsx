import { useRef } from "react"

export function AppDraggable({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLElement | null>(null)

  const pos = useRef({ x: 0, y: 0 })
  const start = useRef({ x: 0, y: 0 })
  const dragging = useRef(false)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return

    parentRef.current = ref.current.parentElement

    dragging.current = true

    start.current = {
      x: e.clientX - pos.current.x,
      y: e.clientY - pos.current.y,
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    ref.current.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging.current || !ref.current || !parentRef.current) return

    const parent = parentRef.current
    const rect = parent.getBoundingClientRect()
    const el = ref.current.getBoundingClientRect()

    let x = e.clientX - start.current.x
    let y = e.clientY - start.current.y

    const minX = 0
    const minY = 0
    const maxX = rect.width - el.width
    const maxY = rect.height - el.height

    x = Math.max(minX, Math.min(x, maxX))
    y = Math.max(minY, Math.min(y, maxY))

    pos.current = { x, y }

    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }

  const onPointerUp = () => {
    dragging.current = false
    window.removeEventListener("pointermove", onPointerMove)
    window.removeEventListener("pointerup", onPointerUp)
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      style={{
        position: "absolute",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {children}
    </div>
  )
}