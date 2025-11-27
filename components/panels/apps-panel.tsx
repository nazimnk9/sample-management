export default function AppsPanel() {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-lg shadow-xl p-6 z-50">
      <h3 className="font-semibold text-foreground mb-4">Applications</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Space */}
        <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
          <h4 className="font-medium text-foreground mb-2">Space</h4>
          <p className="text-xs text-muted-foreground">Organize and manage sample storage spaces efficiently</p>
        </div>

        {/* Drawer */}
        <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
          <h4 className="font-medium text-foreground mb-2">Drawer</h4>
          <p className="text-xs text-muted-foreground">Track and organize sample drawers and compartments</p>
        </div>
      </div>
    </div>
  )
}
