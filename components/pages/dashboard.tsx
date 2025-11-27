"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const dashboardData = [
  { month: "Jan", samples: 400, approved: 300, rejected: 100 },
  { month: "Feb", samples: 500, approved: 380, rejected: 120 },
  { month: "Mar", samples: 450, approved: 350, rejected: 100 },
  { month: "Apr", samples: 600, approved: 480, rejected: 120 },
  { month: "May", samples: 700, approved: 560, rejected: 140 },
  { month: "Jun", samples: 550, approved: 440, rejected: 110 },
]

const categoryData = [
  { name: "Tops", value: 35 },
  { name: "Bottoms", value: 25 },
  { name: "Dresses", value: 20 },
  { name: "Accessories", value: 20 },
]

const COLORS = ["#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"]

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background w-full overflow-y-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Welcome back! Here's your sample management overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <Card className="border-border hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Samples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-primary">3,250</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-secondary">2,680</div>
            <p className="text-xs text-muted-foreground mt-1">82.5% approval rate</p>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-accent">456</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Active Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-foreground">42</div>
            <p className="text-xs text-muted-foreground mt-1">Across all regions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Line Chart */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Sample Trends</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Monthly sample statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0F4FF" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="samples"
                  stroke="#0077B6"
                  name="Total Samples"
                  isAnimationActive={false}
                />
                <Line type="monotone" dataKey="approved" stroke="#00B4D8" name="Approved" isAnimationActive={false} />
                <Line type="monotone" dataKey="rejected" stroke="#ef4444" name="Rejected" isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="border-border">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Category Distribution</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Sample types breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 sm:mt-8">
        <Card className="border-border">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Company Name</p>
                <p className="text-sm sm:text-base font-semibold text-foreground">TechStyle Co.</p>
              </div>
              <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Your Role</p>
                <p className="text-sm sm:text-base font-semibold text-foreground">Administrator</p>
              </div>
              <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Region</p>
                <p className="text-sm sm:text-base font-semibold text-foreground">North America</p>
              </div>
              <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Established</p>
                <p className="text-sm sm:text-base font-semibold text-foreground">2020</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
