<script setup lang="ts">
import ToastItem from './ToastItem.vue'
import { useNotifications } from '../composables/useNotifications'

const { toasts, remove } = useNotifications()
</script>

<template>
  <div class="stack-wrap">
    <TransitionGroup name="toast" tag="div" class="stack">
      <ToastItem
        v-for="t in toasts"
        :key="t.id"
        :item="t"
        @close="remove"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.stack-wrap {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 999;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* щоб інші сповіщення плавно зсувались */
.toast-move {
  transition: transform 0.2s ease;
}

.toast-leave-active {
  position: absolute;
}
</style>
