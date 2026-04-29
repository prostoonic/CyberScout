/** Baseline width where default particle counts look good. */
const BASE_WIDTH = 1200

export type ConfettiViewportScale = {
  particleMultiplier: number
  scalarMultiplier: number
  spreadExtra: number
}

/**
 * canvas-confetti uses fixed burst sizes; on very wide viewports the same
 * particle count looks sparse and pieces feel tiny. Scale density and size
 * with window width (capped for performance).
 */
export function getConfettiViewportScale(): ConfettiViewportScale {
  if (typeof window === 'undefined') {
    return { particleMultiplier: 1, scalarMultiplier: 1, spreadExtra: 0 }
  }
  const w = window.innerWidth
  const particleMultiplier = Math.min(2.6, Math.max(1, w / BASE_WIDTH))
  const scalarMultiplier = Math.min(
    1.45,
    1 + Math.max(0, w - 1400) / 3500
  )
  const spreadExtra = Math.min(28, Math.max(0, (w - 1600) / 55))
  return { particleMultiplier, scalarMultiplier, spreadExtra }
}
