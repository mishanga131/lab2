<script setup lang="ts">
import type { AppNotification, NotificationType } from '../types'

const props = defineProps<{
  item: AppNotification
}>()

const emit = defineEmits<{
  close: [id: number]
}>()

const icons: Record<NotificationType, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '!',
}

function closeToast() {
  emit('close', props.item.id)
}
</script>

<template>
  <div class="toast" :class="`toast-${item.type}`">
    <span class="icon">{{ icons[item.type] }}</span>
    <div class="main">
      <div class="top">
        <strong class="type">{{ item.type }}</strong>
        <span>{{ item.time }}</span>
      </div>
      <p class="text">{{ item.text }}</p>
    </div>
    <button type="button" class="close-btn" @click="closeToast">×</button>
  </div>
</template>

<style scoped>
.toast {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 300px;
  padding: 10px 12px;
  background: #fff;
  border: 1px solid #ddd;
  border-left: 4px solid #2563eb;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.toast-info {
  border-left-color: #2563eb;
  background: #dbeafe;
}

.toast-success {
  border-left-color: #16a34a;
  background: #dcfce7;
}

.toast-warning {
  border-left-color: #d97706;
  background: #fef3c7;
}

.toast-error {
  border-left-color: #dc2626;
  background: #fee2e2;
}

.icon {
  font-weight: bold;
}

.toast-info .icon {
  color: #2563eb;
}

.toast-success .icon {
  color: #16a34a;
}

.toast-warning .icon {
  color: #d97706;
}

.toast-error .icon {
  color: #dc2626;
}

.main {
  flex: 1;
}

.top {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.type {
  text-transform: capitalize;
}

.text {
  margin: 0;
  font-size: 14px;
}

.close-btn {
  border: none;
  background: none;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  color: #666;
}
</style>
