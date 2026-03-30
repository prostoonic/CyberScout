import { useEffect, useRef } from 'react'

let scrollLockCount = 0
let savedScrollY = 0

const html = () => document.documentElement
const body = () => document.body

function applyScrollLock() {
  if (scrollLockCount === 0) {
    savedScrollY = window.scrollY
    const h = html()
    const b = body()
    const scrollbarWidth = window.innerWidth - h.clientWidth

    h.style.overflow = 'hidden'
    h.style.overscrollBehavior = 'none'
    b.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      b.style.paddingRight = `${scrollbarWidth}px`
    }
    // iOS / touch: overflow:hidden на body часто не блокирует «резиновый» скролл фона
    b.style.position = 'fixed'
    b.style.top = `-${savedScrollY}px`
    b.style.left = '0'
    b.style.right = '0'
    b.style.width = '100%'
  }
  scrollLockCount += 1
}

function releaseScrollLock() {
  scrollLockCount = Math.max(0, scrollLockCount - 1)
  if (scrollLockCount > 0) return

  const h = html()
  const b = body()
  h.style.overflow = ''
  h.style.overscrollBehavior = ''
  b.style.overflow = ''
  b.style.paddingRight = ''
  b.style.position = ''
  b.style.top = ''
  b.style.left = ''
  b.style.right = ''
  b.style.width = ''
  window.scrollTo(0, savedScrollY)
}

/** Locks page scroll while a modal is mounted; supports nested modals via ref-counting */
export function useBodyScrollLock() {
  useEffect(() => {
    applyScrollLock()
    return () => {
      releaseScrollLock()
    }
  }, [])
}

/**
 * Traps keyboard focus inside a modal container.
 * Returns a ref to attach to the modal root element.
 */
export function useFocusTrap<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not(:disabled), textarea, input:not(:disabled), select, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    first?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      if (focusable.length === 0) {
        e.preventDefault()
        return
      }

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return ref
}
