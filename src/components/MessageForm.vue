<script setup lang="ts">
import { ref } from 'vue'
import { useNotifications } from '../composables/useNotifications'
import type { NotificationType } from '../types'

const { notify } = useNotifications()

const text = ref('')
const type = ref<NotificationType>('info')
const emptyError = ref(false)

function send() {
  if (!text.value.trim()) {
    emptyError.value = true
    return
  }

  emptyError.value = false
  notify(type.value, text.value.trim())
  text.value = ''
}
</script>

<template>
  <div class="box">
    <h3>Надіслати сповіщення</h3>
    <form @submit.prevent="send">
      <div class="controls">
        <input
          v-model="text"
          type="text"
          placeholder="Текст повідомлення"
          @input="emptyError = false"
        />
        <select v-model="type">
          <option value="info">Info</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
        <button type="submit">Надіслати</button>
      </div>
      <p v-if="emptyError" class="error">Введіть текст повідомлення</p>
    </form>
  </div>
</template>

<style scoped>
.box {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 14px;
}

h3 {
  margin: 0 0 10px;
}

.controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

input {
  flex: 1;
  min-width: 180px;
  padding: 6px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
}

select,
button {
  padding: 6px 12px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
}

.error {
  margin: 6px 0 0;
  color: #dc2626;
  font-size: 13px;
}
</style>
