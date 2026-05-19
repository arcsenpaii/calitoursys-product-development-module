<script setup>
import { computed, onMounted, ref } from 'vue'

import ModuleStats from '@/modules/product/components/ModuleStats.vue'
import ProductCard from '@/modules/product/components/ProductCard.vue'
import { getProductModuleStatus, getProductReportSummary } from '@/modules/product/services/productApi'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const moduleStatus = ref(null)
const reportSummary = ref(null)
const statusError = ref('')
const reportError = ref('')

const moduleCards = [
  {
    title: 'Project setup',
    status: 'Ready',
    description: 'Frontend, backend, API base, and module folders are prepared.',
  },
  {
    title: 'Login and roles',
    status: 'Ready',
    description: 'Demo users represent Tourism Staff, Tourism Officer, LGU Official, and Admin.',
  },
  {
    title: 'Dashboard layout',
    status: 'Ready',
    description: 'Product module dashboard is ready for continued feature work.',
  },
  {
    title: 'Tourism assets',
    status: 'Active',
    description: 'Asset management provides the records used by product development plans.',
  },
  {
    title: 'Development plans',
    status: 'Active',
    description: 'Planning records can now be linked to non-archived tourism assets.',
  },
  {
    title: 'Improvement monitoring',
    status: 'Active',
    description: 'Progress records can now track plan status, percentage, and update dates.',
  },
  {
    title: 'Tourism activities',
    status: 'Active',
    description: 'Activity records can now be connected to active assets and plans.',
  },
  {
    title: 'Packages',
    status: 'Active',
    description: 'Package records can now combine active assets and tourism activities.',
  },
  {
    title: 'Readiness review',
    status: 'Active',
    description: 'Tourism Officers can approve complete packages for promotion handoff.',
  },
  {
    title: 'Reports and handoff',
    status: 'Active',
    description: 'Dashboard summaries and ready package records support future consolidation.',
  },
]

const reportCards = computed(() => {
  const reports = reportSummary.value

  if (!reports) {
    return []
  }

  return [
    { label: 'Tourism assets', value: reports.assets.total },
    { label: 'Active assets', value: reports.assets.active },
    { label: 'Ready packages', value: reports.packages.readyForPromotion },
    { label: 'Delayed improvements', value: reports.improvements.delayed },
  ]
})

const packageStatusSummary = computed(() => reportSummary.value?.packages.byStatus || [])
const planStatusSummary = computed(() => reportSummary.value?.developmentPlans.byStatus || [])

onMounted(async () => {
  try {
    const [statusResponse, reportResponse] = await Promise.all([
      getProductModuleStatus(),
      getProductReportSummary(),
    ])

    moduleStatus.value = statusResponse
    reportSummary.value = reportResponse.data
  } catch (error) {
    statusError.value = error.message
    reportError.value = error.message
  }
})
</script>

<template>
  <section class="page-section">
    <div class="section-heading">
      <p class="eyebrow">Product Module</p>
      <h1>Tourism Product Development Program</h1>
      <p>
        Manage tourism assets, development plans, improvement updates, activity records, and package
        records through readiness review, reporting, and promotion handoff preparation.
      </p>
    </div>

    <div class="role-notice" :class="{ readonly: auth.isViewOnly }">
      <strong>{{ auth.user?.role }}</strong>
      <span v-if="auth.isViewOnly">
        LGU Officials have view-only access for reports, summaries, and development status.
      </span>
      <span v-else>
        Your role can work with assets, development plans, improvements, activities, and packages
        according to the assigned permissions.
      </span>
    </div>

    <ModuleStats v-if="reportCards.length" :items="reportCards" />
    <p v-else-if="reportError" class="form-error">{{ reportError }}</p>

    <div class="product-grid">
      <ProductCard
        v-for="card in moduleCards"
        :key="card.title"
        :description="card.description"
        :status="card.status"
        :title="card.title"
      />
    </div>

    <section v-if="reportSummary" class="module-contract report-panel">
      <div>
        <h2>Module report summary</h2>
        <p>
          Current records are organized for package readiness review, status monitoring, and future
          handoff to the Promotion and Marketing module.
        </p>
      </div>

      <div class="report-groups">
        <section>
          <h3>Packages by status</h3>
          <span v-for="item in packageStatusSummary" :key="item.status">
            {{ item.status }}: {{ item.count }}
          </span>
        </section>
        <section>
          <h3>Plans by status</h3>
          <span v-for="item in planStatusSummary" :key="item.status">
            {{ item.status }}: {{ item.count }}
          </span>
        </section>
      </div>
    </section>

    <section class="module-contract">
      <div>
        <h2>Future consolidation contract</h2>
        <p>
          This module will stay standalone for now, but it prepares shared role names, status
          values, and API group naming for eventual integration with the group system.
        </p>
      </div>

      <div v-if="moduleStatus" class="contract-list">
        <h3>Planned API groups</h3>
        <span v-for="apiGroup in moduleStatus.plannedApiGroups" :key="apiGroup">
          {{ apiGroup }}
        </span>
      </div>

      <p v-else-if="statusError" class="form-error">{{ statusError }}</p>
    </section>
  </section>
</template>

<style scoped>
.report-panel {
  align-items: flex-start;
}

.report-groups {
  display: grid;
  gap: 16px;
  min-width: min(100%, 420px);
}

.report-groups section {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.report-groups h3 {
  width: 100%;
  margin-bottom: 0;
}

.report-groups span {
  border-radius: 999px;
  padding: 8px 10px;
  background: #edf4f8;
  color: #245a8d;
  font-size: 12px;
  font-weight: 800;
}
</style>
