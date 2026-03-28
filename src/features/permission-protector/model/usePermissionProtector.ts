import { useState } from 'react'
import { APP_SCENARIOS, ALL_PERMISSIONS, type PermissionId, type AppScenario } from './apps'

export interface ErrorDetail {
  app: AppScenario
  /** Permissions user gave that were wrong (given but not required) */
  extraPermissions: PermissionId[]
  /** Permissions user didn't give but should have */
  missingPermissions: PermissionId[]
}

export function usePermissionProtector() {
  const [appIndex, setAppIndex] = useState(0)
  const [enabled, setEnabled] = useState<Record<PermissionId, boolean>>({
    camera: false,
    contacts: false,
    location: false,
    microphone: false,
    gallery: false,
  })
  const [showError, setShowError] = useState(false)
  const [errorDetail, setErrorDetail] = useState<ErrorDetail | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const currentApp = APP_SCENARIOS[appIndex]
  const totalApps = APP_SCENARIOS.length

  function togglePermission(id: PermissionId) {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function saveSettings() {
    const given = ALL_PERMISSIONS.filter((p) => enabled[p.id]).map((p) => p.id)
    const required = currentApp.requiredPermissions

    const extra = given.filter((id) => !required.includes(id))
    const missing = required.filter((id) => !given.includes(id))

    const isCorrect = extra.length === 0 && missing.length === 0

    if (isCorrect) {
      if (appIndex + 1 >= totalApps) {
        setShowSuccess(true)
      } else {
        setAppIndex((i) => i + 1)
        resetToggles()
      }
    } else {
      setErrorDetail({ app: currentApp, extraPermissions: extra, missingPermissions: missing })
      setShowError(true)
    }
  }

  function resetToggles() {
    setEnabled({ camera: false, contacts: false, location: false, microphone: false, gallery: false })
  }

  function dismissError() {
    setShowError(false)
  }

  return {
    currentApp,
    appIndex,
    totalApps,
    enabled,
    togglePermission,
    saveSettings,
    showError,
    errorDetail,
    dismissError,
    showSuccess,
    setShowSuccess,
  }
}
