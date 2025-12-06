"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SampleDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  sample: any
}

export default function SampleDetailsModal({ isOpen, onClose, sample }: SampleDetailsModalProps) {
  if (!isOpen || !sample) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex items-center justify-between border-b border-border pb-3">
          <CardTitle className="text-lg sm:text-xl">{sample.name}</CardTitle>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Style No.</p>
                <p className="text-sm font-medium text-foreground">{sample.style_no}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">SKU No.</p>
                <p className="text-sm font-medium text-foreground">{sample.sku_no}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Item</p>
                <p className="text-sm font-medium text-foreground">{sample.item}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Color</p>
                <p className="text-sm font-medium text-foreground">{sample.color}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Size</p>
                <p className="text-sm font-medium text-foreground">{sample.size}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Type</p>
                <p className="text-sm font-medium text-foreground">{sample.types}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Weight</p>
                <p className="text-sm font-medium text-foreground">
                  {sample.weight} {sample.weight_type}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Arrival Date</p>
                <p className="text-sm font-medium text-foreground">
                  {sample.arrival_date ? new Date(sample.arrival_date).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>

            {/* Description */}
            {sample.description && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Description</p>
                <p className="text-sm text-foreground">{sample.description}</p>
              </div>
            )}

            {/* Fabrication */}
            {sample.fabrication && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Fabrication</p>
                <p className="text-sm text-foreground">{sample.fabrication}</p>
              </div>
            )}

            {/* Comments */}
            {sample.comments && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Comments</p>
                <p className="text-sm text-foreground">{sample.comments}</p>
              </div>
            )}

            {/* Images */}
            {sample.images && sample.images.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-3">Images</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {sample.images.map((img: any) => (
                    <img
                      key={img.uid}
                      src={img.file || "/placeholder.svg"}
                      alt={img.file_name}
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Buyers */}
            {sample.buyers && sample.buyers.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Buyers</p>
                <div className="flex flex-wrap gap-2">
                  {sample.buyers.map((buyer: any) => (
                    <span key={buyer.uid} className="px-3 py-1 bg-muted text-foreground text-xs rounded-full">
                      {buyer.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {sample.projects && sample.projects.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Projects</p>
                <div className="flex flex-wrap gap-2">
                  {sample.projects.map((project: any) => (
                    <span key={project.uid} className="px-3 py-1 bg-muted text-foreground text-xs rounded-full">
                      {project.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {sample.notes && sample.notes.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Notes</p>
                <div className="flex flex-wrap gap-2">
                  {sample.notes.map((note: any) => (
                    <span key={note.uid} className="px-3 py-1 bg-muted text-foreground text-xs rounded-full">
                      {note.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Close Button */}
            <div className="pt-4 border-t border-border">
              <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 text-white">
                Close
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
