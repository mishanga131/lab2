import { ref, watch } from 'vue'
import type { AppNotification, NotificationType } from '../types'

const STORAGE_KEY = 'notifications-history'

// історію беремо з sessionStorage, якщо вона там вже є
function loadHistory(): AppNotification[] {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    const data = saved ? JSON.parse(saved) : []
    // якщо там не масив — значить дані зіпсовані
    return Array.isArray(data) ? data : []
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
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      // сховище недоступне — просто не зберігаємо
    }
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

  // якщо сповіщень забагато — прибираємо найстаріше
  if (toasts.value.length > 5) {
    remove(toasts.value[0].id)
  }

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
