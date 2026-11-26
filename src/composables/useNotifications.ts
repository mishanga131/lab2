import { ref, watch } from 'vue'
import type { AppNotification, NotificationType } from '../types'

// беремо збережену історію з sessionStorage
function loadHistory(): AppNotification[] {
  const saved = sessionStorage.getItem('history')
  if (!saved) {
    return []
  }
  try {
    return JSON.parse(saved)
  } catch {
    return []
  }
}

const toasts = ref<AppNotification[]>([])
const history = ref<AppNotification[]>(loadHistory())

// зберігаємо історію щоразу, коли вона змінюється
watch(
  history,
  () => {
    sessionStorage.setItem('history', JSON.stringify(history.value))
  },
  { deep: true },
)

function getTime(): string {
  const d = new Date()
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  return `${h}:${m}:${s}`
}

function notify(type: NotificationType, text: string) {
  const item: AppNotification = {
    id: Date.now(),
    type,
    text,
    time: getTime(),
  }

  toasts.value.push(item)
  history.value.push(item)

  // через 3.5 секунди сповіщення зникає само
  setTimeout(() => {
    remove(item.id)
  }, 3500)
}

function remove(id: number) {
  toasts.value = toasts.value.filter((item) => item.id !== id)
}

function clearHistory() {
  history.value = []
}

export function useNotifications() {
  return {
    toasts,
    history,
    notify,
    remove,
    clearHistory,
  }
}
