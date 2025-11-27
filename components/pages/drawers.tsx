"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2, Grid as Grid2 } from "lucide-react"

const initialDrawers = [
  { id: 1, name: "Drawer A1", space: "Ground Floor - A", items: 24, status: "Full" },
  { id: 2, name: "Drawer A2", space: "Ground Floor - A", items: 18, status: "Available" },
  { id: 3, name: "Drawer B1", space: "Ground Floor - B", items: 30, status: "Full" },
  { id: 4, name: "Drawer B2", space: "Ground Floor - B", items: 12, status: "Available" },
  { id: 5, name: "Drawer C1", space: "First Floor - A", items: 15, status: "Available" },
]

export default function DrawersPage() {
  const [drawers, setDrawers] = useState(initialDrawers)
  const [newDrawerName, setNewDrawerName] = useState("")
  const [newDrawerSpace, setNewDrawerSpace] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState("")
  const [editSpace, setEditSpace] = useState("")

  const spaces = ["Ground Floor - A", "Ground Floor - B", "First Floor - A", "First Floor - B"]

  const addDrawer = () => {
    if (newDrawerName && newDrawerSpace) {
      const newDrawer = {
        id: Math.max(...drawers.map((d) => d.id), 0) + 1,
        name: newDrawerName,
        space: newDrawerSpace,
        items: 0,
        status: "Available",
      }
      setDrawers([...drawers, newDrawer])
      setNewDrawerName("")
      setNewDrawerSpace("")
    }
  }

  const deleteDrawer = (id: number) => {
    setDrawers(drawers.filter((d) => d.id !== id))
  }

  const updateDrawer = (id: number) => {
    setDrawers(drawers.map((d) => (d.id === id ? { ...d, name: editName, space: editSpace } : d)))
    setEditingId(null)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Sample Drawers</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Organize and manage all sample storage drawers
        </p>
      </div>

      <Card className="border-border mb-6 sm:mb-8">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg">Add New Drawer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Drawer Name (e.g., Drawer A1)"
              value={newDrawerName}
              onChange={(e) => setNewDrawerName(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              value={newDrawerSpace}
              onChange={(e) => setNewDrawerSpace(e.target.value)}
              className="px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Space</option>
              {spaces.map((space) => (
                <option key={space} value={space}>
                  {space}
                </option>
              ))}
            </select>
            <Button
              onClick={addDrawer}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Drawer
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {drawers.map((drawer) => (
          <Card key={drawer.id} className="border-border hover:shadow-lg transition-all">
            <CardHeader className="pb-2 sm:pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Grid2 className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
                  <CardTitle className="text-base sm:text-lg line-clamp-1">{drawer.name}</CardTitle>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded flex-shrink-0 whitespace-nowrap ${
                    drawer.status === "Full" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                  }`}
                >
                  {drawer.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Space Location</p>
                  <p className="text-sm font-semibold text-foreground">{drawer.space}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Items Stored</p>
                  <p className="text-lg font-semibold text-foreground">{drawer.items}</p>
                </div>
              </div>

              {editingId === drawer.id ? (
                <div className="space-y-2 sm:space-y-3 pt-4 border-t border-border">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <select
                    value={editSpace}
                    onChange={(e) => setEditSpace(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {spaces.map((space) => (
                      <option key={space} value={space}>
                        {space}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateDrawer(drawer.id)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white text-xs"
                    >
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="flex-1 text-xs">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-transparent text-xs"
                    onClick={() => {
                      setEditingId(drawer.id)
                      setEditName(drawer.name)
                      setEditSpace(drawer.space)
                    }}
                  >
                    <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-destructive hover:bg-red-50 bg-transparent text-xs"
                    onClick={() => deleteDrawer(drawer.id)}
                  >
                    <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
                    Delete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
