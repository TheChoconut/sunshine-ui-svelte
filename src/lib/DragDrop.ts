import { spring } from 'svelte/motion'

function draggable(node: HTMLElement, params: { initialLoc: number[]; }): SvelteActionReturnType {
  let lastX
  let lastY
  let startRect: DOMRect;
  let offsetX = params.initialLoc ? params.initialLoc[0] : 0;
  let offsetY = params.initialLoc ? params.initialLoc[1] : 0;
  const offset = spring(
    { x: offsetX, y: offsetY },
    {
      stiffness: 0.1,
      damping: 0.25
    }
  )

  offset.subscribe(offset => {
    node.style.left = offset.x + 'px'
    node.style.top = offset.y + 'px'
  })

  node.addEventListener('mousedown', handleMousedown)

  function handleMousedown(event) {
    lastX = event.clientX
    lastY = event.clientY

    startRect = node.getBoundingClientRect()
    if (lastY > startRect.top + 20) return true;
    event.preventDefault();
    node.classList.add('dragged')

    node.dispatchEvent(
      new CustomEvent('dragstart', {
        detail: { lastX, lastY }
      })
    )

    window.addEventListener('mousemove', handleMousemove)
    window.addEventListener('mouseup', handleMouseup)
  }

  function handleMousemove(event) {
    const dx = event.clientX - lastX
    const dy = event.clientY - lastY
    offsetX += dx
    offsetY += dy
    lastX = event.clientX
    lastY = event.clientY

    offset.set({ x: offsetX + dx, y: offsetY })

    node.dispatchEvent(
      new CustomEvent('drag', {
        detail: { lastX, lastY, dx, dy }
      })
    )
  }

  function handleMouseup(event) {
    node.classList.remove('dragged')
    lastX = event.clientX
    lastY = event.clientY

    offset.set({ x: offsetX, y: offsetY })

    node.dispatchEvent(
      new CustomEvent('dragend', {
        detail: { lastX, lastY }
      })
    )
    window.removeEventListener('mousemove', handleMousemove)
    window.removeEventListener('mouseup', handleMouseup)
  }

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMousedown)
    }
  }
}

export { draggable }
