"use client"

import { Clock } from "lucide-react"

interface Notification {
  id: number
  message: string
  time: string
  read: boolean
}

export default function NotificationPanel({
  notifications,
  setNotifications,
}: { notifications: Notification[]; setNotifications: any }) {
  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-lg shadow-xl z-50">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Notifications</h3>
        <button onClick={clearAll} className="text-xs text-primary hover:text-primary/80">
          Clear All
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-border hover:bg-muted/30 transition-colors cursor-pointer ${
                !notification.read ? "bg-accent/10" : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <p className="text-sm text-foreground">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
