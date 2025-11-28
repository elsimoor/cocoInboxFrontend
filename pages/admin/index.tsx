import { useState, useMemo, SVGProps } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminStats } from "@/hooks/useAdminStats";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowUp,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Activity,
  Inbox,
  FileText,
  FileArchive,
  RefreshCcw,
} from "lucide-react";

// --- 1. DATA & TYPES ---

// Chart Data Types
type ServiceUsageDataPoint = {
  id: string;
  label: string;
  mails: number;
  numbers: number;
  files: number;
};

type UserGrowthDataPoint = {
  month: string;
  newUsers: number;
  activeResources: number;
};

// --- 2. DATA GENERATION HOOKS ---
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const useServiceUsageData = (): ServiceUsageDataPoint[] => {
  return useMemo(() => {
    const baseDate = new Date('2025-11-10T00:00:00Z');
    return Array.from({ length: 30 }, (_, index) => {
      const day = new Date(baseDate);
      day.setDate(baseDate.getDate() - (29 - index));
      return {
        id: day.toISOString().slice(0, 10),
        label: day.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: 'UTC' }),
        mails: Math.round(180 + 40 * Math.sin(index / 2.5) + seededRandom(index) * 20),
        numbers: Math.round(95 + 25 * Math.cos(index / 3.2) + seededRandom(index + 100) * 15),
        files: Math.round(140 + 30 * Math.sin(index / 4.1 + 1.2) + seededRandom(index + 200) * 25),
      };
    });
  }, []);
};

const useUserGrowthData = (): UserGrowthDataPoint[] => {
  return useMemo(() => {
    const baseDate = new Date('2025-11-10T00:00:00Z');
    const formatter = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: 'UTC' });
    return Array.from({ length: 12 }, (_, index) => {
      const monthDate = new Date(Date.UTC(baseDate.getFullYear(), baseDate.getMonth() - (11 - index), 1));
      return {
        month: formatter.format(monthDate),
        newUsers: 420 + index * 38 + (index % 4 === 0 ? 60 : 0) + seededRandom(index + 300) * 50,
        activeResources: 2100 + index * 190 + (index % 3 === 0 ? 260 : 0) + seededRandom(index + 400) * 200,
      };
    });
  }, []);
};


// --- 3. REUSABLE CHART COMPONENTS ---
const ServiceUsageChart = ({ data }: { data: ServiceUsageDataPoint[] }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const chartHeight = 300;
  const chartWidth = 800; // Use a larger viewBox for better scaling
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };

  const { bars, yAxisLabels, maxTotal } = useMemo(() => {
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;
    const barWidth = innerWidth / data.length;
    const maxTotal = Math.max(...data.map(d => d.mails + d.numbers + d.files));

    const bars = data.map((d, i) => {
      const total = d.mails + d.numbers + d.files;
      const x = padding.left + i * barWidth;
      let yOffset = chartHeight - padding.bottom;
      
      const segments = (['mails', 'numbers', 'files'] as const).map(key => {
        const height = (d[key] / maxTotal) * innerHeight;
        yOffset -= height;
        return { key, x, y: yOffset, width: barWidth, height, value: d[key] };
      });
      return { id: d.id, label: d.label, x, barWidth, segments, total };
    });

    const yAxisLabels = Array.from({ length: 5 }, (_, i) => {
      const value = (maxTotal / 4) * i;
      return {
        value: value > 1000 ? `${(value / 1000).toFixed(1)}k` : Math.round(value),
        y: chartHeight - padding.bottom - (i / 4) * innerHeight,
      };
    });

    return { bars, yAxisLabels, maxTotal };
  }, [data, chartHeight, chartWidth, padding]);

  const hoveredData = hoveredId ? data.find(d => d.id === hoveredId) : null;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto" role="img">
        {/* Grid Lines & Y-Axis */}
        <g className="text-xs text-muted-foreground">
          {yAxisLabels.map(({ value, y }) => (
            <g key={y}>
              <line x1={padding.left} x2={chartWidth - padding.right} y1={y} y2={y} stroke="currentColor" strokeDasharray="2,3" opacity={0.3} />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" fill="currentColor">{value}</text>
            </g>
          ))}
        </g>

        {/* Bars */}
        {bars.map((bar, i) => (
          <g key={bar.id} onMouseEnter={() => setHoveredId(bar.id)} onMouseLeave={() => setHoveredId(null)}>
            <rect x={bar.x} y={padding.top} width={bar.barWidth} height={chartHeight - padding.top - padding.bottom} fill="transparent" />
            {bar.segments.map(seg => (
              <rect
                key={seg.key}
                x={seg.x + bar.barWidth * 0.15}
                y={seg.y}
                width={bar.barWidth * 0.7}
                height={seg.height}
                className={`fill-current transition-opacity duration-200 ${
                  { mails: 'text-blue-500', numbers: 'text-emerald-500', files: 'text-orange-500' }[seg.key]
                }`}
                opacity={hoveredId === null || hoveredId === bar.id ? 1 : 0.3}
                rx={2}
              />
            ))}
             {/* X-Axis Labels */}
            {i % 4 === 0 && (
              <text x={bar.x + bar.barWidth / 2} y={chartHeight - padding.bottom + 20} textAnchor="middle" className="text-xs fill-current text-muted-foreground">
                {bar.label}
              </text>
            )}
          </g>
        ))}
      </svg>
      {/* Tooltip */}
      {hoveredData && (
        <div className="absolute top-0 left-0 p-3 bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg pointer-events-none">
          <p className="font-semibold mb-2">{hoveredData.label}</p>
          <div className="space-y-1 text-xs">
            <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" />Mails: {hoveredData.mails}</p>
            <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500" />Numbers: {hoveredData.numbers}</p>
            <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500" />Files: {hoveredData.files}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const UserGrowthChart = ({ data }: { data: UserGrowthDataPoint[] }) => {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const chartHeight = 300;
  const chartWidth = 800;
  const padding = { top: 20, right: 60, bottom: 40, left: 60 };

  const { bars, linePath, areaPath, yAxisLabels, maxNewUsers } = useMemo(() => {
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;
    const barWidth = innerWidth / data.length;
    const maxNewUsers = Math.max(...data.map(d => d.newUsers));
    const maxActiveResources = Math.max(...data.map(d => d.activeResources));

    const bars = data.map((d, i) => {
      const x = padding.left + i * barWidth;
      const barHeight = (d.newUsers / maxNewUsers) * innerHeight;
      const lineY = chartHeight - padding.bottom - (d.activeResources / maxActiveResources) * innerHeight;
      return { ...d, x, y: chartHeight - padding.bottom - barHeight, barWidth, barHeight, lineY };
    });

    const linePoints = bars.map(b => ({ x: b.x + b.barWidth / 2, y: b.lineY }));
    const linePath = linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const areaPath = `${linePath} V ${chartHeight - padding.bottom} H ${padding.left + barWidth / 2} Z`;

    const yAxisLabels = Array.from({ length: 5 }, (_, i) => ({
      value: Math.round((maxNewUsers / 4) * i),
      y: chartHeight - padding.bottom - (i / 4) * innerHeight,
    }));

    return { bars, linePath, areaPath, yAxisLabels, maxNewUsers };
  }, [data, chartHeight, chartWidth, padding]);

  const hoveredData = hoveredMonth ? data.find(d => d.month === hoveredMonth) : null;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto" role="img">
        <defs>
          <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
          </linearGradient>
        </defs>
        
        {/* Grid Lines & Y-Axis */}
        <g className="text-xs text-muted-foreground">
          {yAxisLabels.map(({ value, y }) => (
            <g key={y}>
              <line x1={padding.left} x2={chartWidth - padding.right} y1={y} y2={y} stroke="currentColor" strokeDasharray="2,3" opacity={0.3} />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" fill="currentColor">{value.toLocaleString()}</text>
            </g>
          ))}
        </g>

        {/* Area Path */}
        <path d={areaPath} fill="url(#areaGradient)" />

        {/* Bars & Line */}
        {bars.map(bar => (
          <g key={bar.month} onMouseEnter={() => setHoveredMonth(bar.month)} onMouseLeave={() => setHoveredMonth(null)}>
            <rect x={bar.x} y={padding.top} width={bar.barWidth} height={chartHeight - padding.top - padding.bottom} fill="transparent" />
            <rect
              x={bar.x + bar.barWidth * 0.2}
              y={bar.y}
              width={bar.barWidth * 0.6}
              height={bar.barHeight}
              className="fill-current text-foreground transition-opacity duration-200"
              opacity={hoveredMonth === null || hoveredMonth === bar.month ? 0.8 : 0.2}
              rx={2}
            />
            {/* X-Axis Labels */}
            <text x={bar.x + bar.barWidth / 2} y={chartHeight - padding.bottom + 20} textAnchor="middle" className="text-xs fill-current text-muted-foreground">
              {bar.month}
            </text>
          </g>
        ))}
        
        <path d={linePath} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
        {bars.map(bar => (
          <circle
            key={bar.month}
            cx={bar.x + bar.barWidth / 2}
            cy={bar.lineY}
            r={hoveredMonth === bar.month ? 6 : 4}
            fill="#38bdf8"
            stroke="hsl(var(--background))"
            strokeWidth={2}
            className="transition-all duration-200"
          />
        ))}
      </svg>
      {/* Tooltip */}
      {hoveredData && (
        <div className="absolute top-0 left-0 p-3 bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg pointer-events-none">
          <p className="font-semibold mb-2">{hoveredData.month}</p>
          <div className="space-y-1 text-xs">
            <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-foreground" />New Users: {hoveredData.newUsers.toLocaleString()}</p>
            <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-400" />Active Resources: {hoveredData.activeResources.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};


// --- 4. MAIN PAGE COMPONENT ---

export default function AdminOverviewPage() {
  const { stats, loading: statsLoading, error, refetch } = useAdminStats();
  const serviceUsageData = useServiceUsageData();
  const userGrowthData = useUserGrowthData();

  const userKpis = useMemo(
    () => [
      {
        label: "Total Users",
        description: "All registered accounts",
        value: stats?.users.total ?? 0,
        icon: Users,
        color: "blue",
      },
      {
        label: "Pro Subscribers",
        description: "Active premium accounts",
        value: stats?.users.pro ?? 0,
        icon: TrendingUp,
        color: "emerald",
      },
      {
        label: "Administrators",
        description: "Workspace owners & admins",
        value: stats?.users.admin ?? 0,
        icon: Shield,
        color: "purple",
      },
      {
        label: "Free Users",
        description: "Active free accounts",
        value: stats?.users.free ?? 0,
        icon: Activity,
        color: "pink",
      },
    ],
    [stats]
  );

  const contentKpis = useMemo(
    () => [
      {
        label: "Ephemeral Emails",
        description: "Total generated mailboxes",
        value: stats?.content.emails ?? 0,
        icon: Inbox,
        color: "cyan",
      },
      {
        label: "Active Emails",
        description: "Currently live addresses",
        value: stats?.content.activeEmails ?? 0,
        icon: ArrowUp,
        color: "emerald",
      },
      {
        label: "Secure Notes",
        description: "Encrypted note entries",
        value: stats?.content.notes ?? 0,
        icon: FileText,
        color: "amber",
      },
      {
        label: "Secure Files",
        description: "Protected file uploads",
        value: stats?.content.files ?? 0,
        icon: FileArchive,
        color: "purple",
      },
    ],
    [stats]
  );

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-50 to-blue-100/50 text-blue-600 ring-blue-200/50",
      emerald: "from-emerald-50 to-emerald-100/50 text-emerald-600 ring-emerald-200/50",
      purple: "from-purple-50 to-purple-100/50 text-purple-600 ring-purple-200/50",
      amber: "from-amber-50 to-amber-100/50 text-amber-600 ring-amber-200/50",
      cyan: "from-cyan-50 to-cyan-100/50 text-cyan-600 ring-cyan-200/50",
      pink: "from-pink-50 to-pink-100/50 text-pink-600 ring-pink-200/50",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const recentUsers = stats?.recentUsers ?? [];

  return (
    <AdminLayout
      title="Global Statistics"
      description="A high-level overview of platform engagement, growth, and operational metrics."
    >
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">
            Last updated {stats ? formatDistanceToNow(new Date(), { addSuffix: true }) : "just now"}
          </p>
        )}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-2 text-xs text-neutral-700"
            onClick={() => refetch()}
            disabled={statsLoading}
          >
            <RefreshCcw className={`h-3.5 w-3.5 ${statsLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {userKpis.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <Card 
              key={kpi.label}
              className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-neutral-300/80 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_16px_rgba(0,0,0,0.06)]"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${getColorClasses(kpi.color)} ring-1 transition-transform group-hover:scale-110`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
                          {kpi.label}
                        </p>
                        <p className="text-[12px] text-neutral-400">{kpi.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-end justify-between">
                      <p className="text-3xl font-bold tracking-tight text-neutral-900 tabular-nums">
                        {statsLoading ? "…" : kpi.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

  <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {contentKpis.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <Card 
              key={kpi.label}
              className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-neutral-300/80 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_16px_rgba(0,0,0,0.06)]"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${getColorClasses(kpi.color)} ring-1 transition-transform group-hover:scale-110`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
                          {kpi.label}
                        </p>
                        <p className="text-[12px] text-neutral-400">{kpi.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-3xl font-bold tracking-tight text-neutral-900 tabular-nums">
                        {statsLoading ? "…" : kpi.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Charts Section */}
      <section className="mt-8 grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Service Usage (Last 30 Days)</CardTitle>
            <CardDescription>Daily volume of temporary mails, numbers, and secured files.</CardDescription>
          </CardHeader>
          <CardContent>
            <ServiceUsageChart data={serviceUsageData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth vs. Resource Use</CardTitle>
            <CardDescription>Monthly new users (bars) versus total active resources (line).</CardDescription>
          </CardHeader>
          <CardContent>
            <UserGrowthChart data={userGrowthData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
            <CardDescription>Latest users joining Cocoinbox Studio.</CardDescription>
          </CardHeader>
          <CardContent>
            {statsLoading && !stats ? (
              <p className="text-sm text-neutral-500">Loading recent users…</p>
            ) : recentUsers.length === 0 ? (
              <p className="text-sm text-neutral-500">No recent users.</p>
            ) : (
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-lg border border-neutral-200/60 bg-white px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{user.name || "—"}</p>
                      <p className="text-xs text-neutral-500">{user.email}</p>
                    </div>
                    <div className="text-xs text-neutral-400">
                      Joined {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
}
