<script setup lang="ts">
import { useNotifications } from '../composables/useNotifications'

const { notify } = useNotifications()
</script>

<template>
  <div class="box">
    <h3>Швидкі дії</h3>
    <div class="btns">
      <button type="button" @click="notify('success', 'Файл успішно збережено')">
        Зберегти файл
      </button>
      <button type="button" @click="notify('error', 'Помилка мережі')">
        Втрата зв'язку
      </button>
      <button type="button" @click="notify('warning', 'Мало вільної пам\'яті')">
        Мало пам'яті
      </button>
      <button type="button" @click="notify('info', 'Доступне нове оновлення')">
        Нове оновлення
      </button>
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

h3 {
  margin: 0 0 10px;
}

.btns {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

button {
  padding: 6px 12px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
}

button:hover {
  background: #eaeaea;
}
</style>
