<script setup lang="ts">
import { ref } from 'vue'
import { useNotifications } from '../composables/useNotifications'

const { history, clearHistory } = useNotifications()
const isOpen = ref(true)
</script>

<template>
  <div class="box">
    <div class="head">
      <h3>Журнал подій</h3>
      <div class="head-btns">
        <button type="button" @click="isOpen = !isOpen">
          {{ isOpen ? 'Згорнути' : 'Розгорнути' }}
        </button>
        <button type="button" :disabled="history.length === 0" @click="clearHistory">
          Очистити історію
        </button>
      </div>
    </div>

    <div v-show="isOpen" class="body">
      <p v-if="history.length === 0" class="empty">Історія порожня</p>
      <ul v-else>
        <li v-for="item in history" :key="item.id">
          {{ item.time }} — [<span class="type">{{ item.type }}</span>] {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.box {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 14px;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

h3 {
  margin: 0;
}

.head-btns {
  display: flex;
  gap: 8px;
}

button {
  padding: 5px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

.body {
  margin-top: 10px;
}

.empty {
  margin: 0;
  color: #666;
}

ul {
  margin: 0;
  padding-left: 18px;
}

li {
  margin-bottom: 4px;
}

.type {
  text-transform: capitalize;
}
</style>
