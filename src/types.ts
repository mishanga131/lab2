export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface AppNotification {
  id: number
  type: NotificationType
  text: string
  time: string
}
