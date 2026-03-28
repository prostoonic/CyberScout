import { useEffect, useRef } from 'react'

/** Locks body scroll while a modal is mounted and restores it on unmount */
export function useBodyScrollLock() {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const prev = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    }

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = prev.overflow
      document.body.style.paddingRight = prev.paddingRight
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
      if (focusable.length === 0) { e.preventDefault(); return }

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

