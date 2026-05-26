document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.body // or a real #canvas if you have one
  const preview = document.getElementById("preview")

  preview.style.position = "absolute"
  preview.style.touchAction = "none"

  let x = 0
  let y = 0

  let startX = 0
  let startY = 0

  let isDragging = false

  const render = () => {
    preview.style.transform = `translate(${x}px, ${y}px)`
  }

  render()

  preview.addEventListener("pointerdown", (e) => {
    isDragging = true

    startX = e.clientX - x
    startY = e.clientY - y

    preview.setPointerCapture(e.pointerId)
  })

  preview.addEventListener("pointermove", (e) => {
    if (!isDragging) return

    const canvasRect = canvas.getBoundingClientRect()

    const previewRect = preview.getBoundingClientRect()

    let nextX = e.clientX - startX
    let nextY = e.clientY - startY

    // clamp inside canvas
    const minX = 0
    const minY = 0
    const maxX = canvasRect.width - previewRect.width
    const maxY = canvasRect.height - previewRect.height

    x = Math.max(minX, Math.min(nextX, maxX))
    y = Math.max(minY, Math.min(nextY, maxY))

    render()
  })

  const stop = () => {
    isDragging = false
  }

  preview.addEventListener("pointerup", stop)
  preview.addEventListener("pointercancel", stop)
})