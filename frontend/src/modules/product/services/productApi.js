import { request } from '@/services/http'

export function getProductModuleStatus() {
  return request('/product/status')
}

export function getProductReportSummary() {
  return request('/reports')
}

export function getTourismAssets(filters = {}) {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value)
    }
  })

  const query = params.toString()

  return request(`/assets${query ? `?${query}` : ''}`)
}

export function createTourismAsset(asset) {
  return request('/assets', {
    method: 'POST',
    body: asset,
  })
}

export function updateTourismAsset(assetId, asset) {
  return request(`/assets/${assetId}`, {
    method: 'PUT',
    body: asset,
  })
}

export function archiveTourismAsset(assetId) {
  return request(`/assets/${assetId}/archive`, {
    method: 'PATCH',
  })
}

export function getDevelopmentPlans(filters = {}) {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value)
    }
  })

  const query = params.toString()

  return request(`/development-plans${query ? `?${query}` : ''}`)
}

export function createDevelopmentPlan(plan) {
  return request('/development-plans', {
    method: 'POST',
    body: plan,
  })
}

export function updateDevelopmentPlan(planId, plan) {
  return request(`/development-plans/${planId}`, {
    method: 'PUT',
    body: plan,
  })
}

export function archiveDevelopmentPlan(planId) {
  return request(`/development-plans/${planId}/archive`, {
    method: 'PATCH',
  })
}

export function getImprovementRecords(filters = {}) {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value)
    }
  })

  const query = params.toString()

  return request(`/improvements${query ? `?${query}` : ''}`)
}

export function createImprovementRecord(improvement) {
  return request('/improvements', {
    method: 'POST',
    body: improvement,
  })
}

export function updateImprovementRecord(improvementId, improvement) {
  return request(`/improvements/${improvementId}`, {
    method: 'PUT',
    body: improvement,
  })
}

export function archiveImprovementRecord(improvementId) {
  return request(`/improvements/${improvementId}/archive`, {
    method: 'PATCH',
  })
}

export function getTourismActivities(filters = {}) {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value)
    }
  })

  const query = params.toString()

  return request(`/activities${query ? `?${query}` : ''}`)
}

export function createTourismActivity(activity) {
  return request('/activities', {
    method: 'POST',
    body: activity,
  })
}

export function updateTourismActivity(activityId, activity) {
  return request(`/activities/${activityId}`, {
    method: 'PUT',
    body: activity,
  })
}

export function archiveTourismActivity(activityId) {
  return request(`/activities/${activityId}/archive`, {
    method: 'PATCH',
  })
}

export function getTourismPackages(filters = {}) {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value)
    }
  })

  const query = params.toString()

  return request(`/packages${query ? `?${query}` : ''}`)
}

export function getTourismPackage(packageId) {
  return request(`/packages/${packageId}`)
}

export function getReadyForPromotionPackages() {
  return request('/packages/ready-for-promotion')
}

export function createTourismPackage(tourismPackage) {
  return request('/packages', {
    method: 'POST',
    body: tourismPackage,
  })
}

export function updateTourismPackage(packageId, tourismPackage) {
  return request(`/packages/${packageId}`, {
    method: 'PUT',
    body: tourismPackage,
  })
}

export function archiveTourismPackage(packageId) {
  return request(`/packages/${packageId}/archive`, {
    method: 'PATCH',
  })
}

export function markTourismPackageReady(packageId, remarks) {
  return request(`/packages/${packageId}/ready-for-promotion`, {
    method: 'PATCH',
    body: { remarks },
  })
}
