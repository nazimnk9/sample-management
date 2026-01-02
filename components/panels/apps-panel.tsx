import Link from "next/link"

export default function AppsPanel() {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-lg shadow-xl p-6 z-50">
      <h3 className="font-semibold text-foreground mb-4">Apps</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Space */}
        <Link href="/space" className="p-4 border border-border rounded-lg bg-sidebar transition-colors cursor-pointer block">
          <h4 className="font-medium text-white mb-2">Space</h4>
          <p className="text-xs text-white/90">Organize and manage sample storage spaces efficiently</p>
        </Link>

        {/* Drawer */}
        {/* <Link href="/drawers" className="p-4 border border-border rounded-lg bg-sidebar transition-colors cursor-pointer block">
          <h4 className="font-medium text-white mb-2">Drawer</h4>
          <p className="text-xs text-white/90">Track and organize sample drawers and compartments</p>
        </Link> */}
      </div>
    </div>
  )
}
