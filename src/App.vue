<script setup lang="ts">
import ToastContainer from './components/ToastContainer.vue'
import MessageForm from './components/MessageForm.vue'
import QuickActions from './components/QuickActions.vue'
import ActivityLog from './components/ActivityLog.vue'
</script>

<template>
  <main class="page">
    <h2>Notification Hub</h2>
    <div class="layout">
      <MessageForm />
      <QuickActions />
      <ActivityLog />
    </div>
    <ToastContainer />
  </main>
</template>

<style scoped>
.page {
  max-width: 760px;
  margin: 24px auto;
  padding: 0 12px;
}

h2 {
  margin: 0 0 14px;
}

.layout {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
