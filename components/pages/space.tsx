"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2, FolderOpen } from "lucide-react"

const initialSpaces = [
  { id: 1, name: "Ground Floor - A", capacity: 500, used: 345, status: "Active" },
  { id: 2, name: "Ground Floor - B", capacity: 500, used: 412, status: "Active" },
  { id: 3, name: "First Floor - A", capacity: 400, used: 256, status: "Active" },
  { id: 4, name: "First Floor - B", capacity: 400, used: 180, status: "Available" },
]

export default function SpacePage() {
  const [spaces, setSpaces] = useState(initialSpaces)
  const [newSpaceName, setNewSpaceName] = useState("")
  const [newSpaceCapacity, setNewSpaceCapacity] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState("")
  const [editCapacity, setEditCapacity] = useState("")

  const addSpace = () => {
    if (newSpaceName && newSpaceCapacity) {
      const newSpace = {
        id: Math.max(...spaces.map((s) => s.id), 0) + 1,
        name: newSpaceName,
        capacity: Number.parseInt(newSpaceCapacity),
        used: 0,
        status: "Available",
      }
      setSpaces([...spaces, newSpace])
      setNewSpaceName("")
      setNewSpaceCapacity("")
    }
  }

  const deleteSpace = (id: number) => {
    setSpaces(spaces.filter((s) => s.id !== id))
  }

  const updateSpace = (id: number) => {
    setSpaces(spaces.map((s) => (s.id === id ? { ...s, name: editName, capacity: Number.parseInt(editCapacity) } : s)))
    setEditingId(null)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Sample Storage Spaces</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage and organize your sample storage areas</p>
      </div>

      <Card className="border-border mb-6 sm:mb-8">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg">Add New Storage Space</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Space Name (e.g., Ground Floor - A)"
              value={newSpaceName}
              onChange={(e) => setNewSpaceName(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="number"
              placeholder="Capacity"
              value={newSpaceCapacity}
              onChange={(e) => setNewSpaceCapacity(e.target.value)}
              className="sm:w-32 px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              onClick={addSpace}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Space
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {spaces.map((space) => {
          const usagePercent = (space.used / space.capacity) * 100
          return (
            <Card key={space.id} className="border-border hover:shadow-lg transition-all">
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FolderOpen className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
                    <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded flex-shrink-0 whitespace-nowrap ${
                      space.status === "Active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {space.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted-foreground">Capacity Usage</p>
                      <p className="text-sm font-semibold text-foreground">{usagePercent.toFixed(0)}%</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                        style={{ width: `${usagePercent}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Total Capacity</p>
                      <p className="text-base sm:text-lg font-semibold text-foreground">{space.capacity}</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Used</p>
                      <p className="text-base sm:text-lg font-semibold text-foreground">{space.used}</p>
                    </div>
                  </div>
                </div>

                {editingId === space.id ? (
                  <div className="space-y-2 sm:space-y-3 pt-4 border-t border-border">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="number"
                      value={editCapacity}
                      onChange={(e) => setEditCapacity(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateSpace(space.id)}
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
                        setEditingId(space.id)
                        setEditName(space.name)
                        setEditCapacity(space.capacity.toString())
                      }}
                    >
                      <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-destructive hover:bg-red-50 bg-transparent text-xs"
                      onClick={() => deleteSpace(space.id)}
                    >
                      <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
                      Delete
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
