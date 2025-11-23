import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, DollarSign, AlertCircle, Clock } from 'lucide-react';

const data = [
  { name: 'Mon', tasks: 4, active: 2 },
  { name: 'Tue', tasks: 3, active: 5 },
  { name: 'Wed', tasks: 2, active: 8 },
  { name: 'Thu', tasks: 6, active: 4 },
  { name: 'Fri', tasks: 8, active: 6 },
  { name: 'Sat', tasks: 2, active: 1 },
  { name: 'Sun', tasks: 1, active: 1 },
];

const pieData = [
  { name: 'Completed', value: 400 },
  { name: 'In Progress', value: 300 },
  { name: 'Delayed', value: 100 },
];

const COLORS = ['#4f46e5', '#94a3b8', '#ef4444'];

export const StatsCard: React.FC<{ title: string; value: string; trend: string; icon: React.ElementType, trendUp?: boolean }> = ({ title, value, trend, icon: Icon, trendUp = true }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${trendUp ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'}`}>
        <Icon size={24} />
      </div>
      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {trend}
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
  </div>
);

export const PerformanceChart = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-80 w-full">
    <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800">Productivity Trends</h3>
        <select className="text-xs border-none bg-slate-50 text-slate-500 rounded-lg p-2 cursor-pointer outline-none">
            <option>This Week</option>
            <option>Last Week</option>
        </select>
    </div>
    <ResponsiveContainer width="100%" height="80%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
        <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
        />
        <Area type="monotone" dataKey="tasks" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorTasks)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const ProjectDistribution = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-80 flex flex-col">
    <h3 className="font-bold text-slate-800 mb-2">Project Status</h3>
    <div className="flex-1 min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie
            data={pieData}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            >
            {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
        </PieChart>
        </ResponsiveContainer>
        {/* Centered text trick */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-slate-800">18</span>
            <span className="text-xs text-slate-400">Total</span>
        </div>
    </div>
    <div className="flex justify-center gap-4 text-xs text-slate-500 mt-2">
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-600"></div> Done</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-400"></div> Active</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Late</div>
    </div>
  </div>
);

export const OnboardingChecklist = () => {
    const steps = [
        { label: 'Prospect Identified', done: true },
        { label: 'Contract Sent', done: true },
        { label: 'Contract Signed', done: true },
        { label: 'Kickoff Meeting', done: false },
        { label: 'Account Active', done: false },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Client Onboarding</h3>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">60%</span>
            </div>
            <div className="space-y-4 relative">
                <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-100 -z-10"></div>
                {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-0 transition-all duration-300 ${step.done ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-300 group-hover:border-indigo-300'}`}>
                            {step.done ? <CheckIcon /> : <span className="text-xs font-bold">{idx + 1}</span>}
                        </div>
                        <span className={`text-sm font-medium transition-colors ${step.done ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-600'}`}>{step.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CheckIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);