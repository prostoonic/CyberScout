import { useState, useEffect, useCallback, useRef } from 'react'
import { SITUATIONS, type Situation } from './situations'

const TOTAL_TIME = 30
const TARGET_SCORE = 10

type GamePhase = 'idle' | 'playing' | 'timeout' | 'won'

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export interface SkillCheckState {
  phase: GamePhase
  score: number
  timeLeft: number
  current: Situation | null
  lastVerdict: 'correct' | 'wrong' | null
  start: () => void
  answer: (verdict: 'safe' | 'danger') => void
  restart: () => void
}

export function useSkillCheck(): SkillCheckState {
  const [phase, setPhase] = useState<GamePhase>('idle')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [queue, setQueue] = useState<Situation[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastVerdict, setLastVerdict] = useState<'correct' | 'wrong' | null>(
    null
  )

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const verdictTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (verdictTimerRef.current) clearTimeout(verdictTimerRef.current)
  }, [])

  const buildQueue = useCallback(() => {
    // Two full shuffled cycles to ensure enough situations to score 10
    return [...shuffle(SITUATIONS), ...shuffle(SITUATIONS)]
  }, [])

  const start = useCallback(() => {
    clearTimers()
    const newQueue = buildQueue()
    setQueue(newQueue)
    setCurrentIndex(0)
    setScore(0)
    setTimeLeft(TOTAL_TIME)
    setLastVerdict(null)
    setPhase('playing')
  }, [clearTimers, buildQueue])

  const restart = useCallback(() => {
    clearTimers()
    setPhase('idle')
    setScore(0)
    setTimeLeft(TOTAL_TIME)
    setLastVerdict(null)
  }, [clearTimers])

  // Countdown timer
  useEffect(() => {
    if (phase !== 'playing') return

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          setPhase('timeout')
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [phase])

  const answer = useCallback(
    (verdict: 'safe' | 'danger') => {
      if (phase !== 'playing') return
      const situation = queue[currentIndex]
      if (!situation) return

      const isCorrect = verdict === situation.verdict

      if (isCorrect) {
        const newScore = score + 1
        setScore(newScore)
        setLastVerdict('correct')
        if (newScore >= TARGET_SCORE) {
          clearTimers()
          setPhase('won')
          return
        }
      } else {
        setLastVerdict('wrong')
      }

      verdictTimerRef.current = setTimeout(() => {
        setLastVerdict(null)
        setCurrentIndex(i => i + 1)
      }, 600)
    },
    [phase, queue, currentIndex, score, clearTimers]
  )

  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])

  const current =
    phase === 'playing' && queue.length > 0
      ? (queue[currentIndex] ?? null)
      : null

  return {
    phase,
    score,
    timeLeft,
    current,
    lastVerdict,
    start,
    answer,
    restart,
  }
}
