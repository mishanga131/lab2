import { ref, watch } from 'vue'
import type { AppNotification, NotificationType } from '../types'

const STORAGE_KEY = 'notifications-history'

// історію беремо з sessionStorage, якщо вона там вже є
function loadHistory(): AppNotification[] {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const toasts = ref<AppNotification[]>([])
const history = ref<AppNotification[]>(loadHistory())

// щоб id не повторювались після перезавантаження сторінки
let nextId = history.value.length > 0 ? history.value[history.value.length - 1].id + 1 : 1

// при кожній зміні історії зберігаємо її
watch(
  history,
  (value) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true },
)
const timers: Record<number, ReturnType<typeof setTimeout>> = {}

function getTime(): string {
  const d = new Date()
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  return `${h}:${m}:${s}`
}

function notify(type: NotificationType, text: string) {
  const id = nextId++
  const item: AppNotification = {
    id,
    type,
    text,
    time: getTime(),
  }

  toasts.value.push(item)
  history.value.push(item)

  timers[id] = setTimeout(() => {
    remove(id)
  }, 3500)
}

function remove(id: number) {
  if (timers[id]) {
    clearTimeout(timers[id])
    delete timers[id]
  }
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
