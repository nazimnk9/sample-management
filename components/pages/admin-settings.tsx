"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "Garment Sample Management",
    adminEmail: "admin@techstyle.com",
    timezone: "UTC",
    sampleRetention: "90",
    autoBackup: true,
    notifications: true,
    twoFactorAuth: true,
  })

  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleReset = () => {
    setSettings({
      companyName: "Garment Sample Management",
      adminEmail: "admin@techstyle.com",
      timezone: "UTC",
      sampleRetention: "90",
      autoBackup: true,
      notifications: true,
      twoFactorAuth: true,
    })
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Admin Settings</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Manage system-wide configuration and preferences
        </p>
      </div>

      <div className="max-w-3xl space-y-4 sm:space-y-6">
        {/* General Settings */}
        <Card className="border-border">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Admin Email</label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>UTC</option>
                <option>EST</option>
                <option>CST</option>
                <option>PST</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-border">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Sample Data Retention (days)</label>
              <input
                type="number"
                value={settings.sampleRetention}
                onChange={(e) => setSettings({ ...settings, sampleRetention: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-border">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground mt-1">Require 2FA for all admin accounts</p>
              </div>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Enable Notifications</p>
                <p className="text-xs text-muted-foreground mt-1">Receive system notifications</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between p-3 sm:p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Auto Backup</p>
                <p className="text-xs text-muted-foreground mt-1">Automatically backup data daily</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2 bg-transparent text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {isSaved && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700 font-medium">✓ Settings saved successfully</p>
          </div>
        )}
      </div>
    </div>
  )
}
