
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { User, UserRole, Task, TaskStatus, TaskPriority, Project, Invoice, EODReport } from './types';
import { KanbanBoard } from './components/KanbanBoard';
import { StatsCard, PerformanceChart, ProjectDistribution, OnboardingChecklist } from './components/Widgets';
import { EODForm } from './components/EODForm';
import { EODHistory } from './components/EODHistory';
import { UserManagement } from './components/UserManagement';
import { ProjectList } from './components/ProjectList';
import { FinanceView } from './components/FinanceView';
import { SettingsView } from './components/SettingsView';
import { Logo } from './components/Logo';
import {
    TrendingUp,
    Users,
    IndianRupee,
    AlertCircle,
    ShieldCheck,
    Briefcase,
    ArrowLeft,
    Lock,
    Mail,
    Loader2,
    Eye,
    EyeOff,
    CheckCircle2
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_USERS: User[] = [
    { id: '1', name: 'Arjun Admin', email: 'admin@nexus.in', role: UserRole.ADMIN, avatar: 'https://picsum.photos/200/200?random=1' },
    { id: '2', name: 'Priya PM', email: 'priya@nexus.in', role: UserRole.PM, avatar: 'https://picsum.photos/200/200?random=2' },
    { id: '3', name: 'Rahul Dev', email: 'rahul@nexus.in', role: UserRole.TEAM, avatar: 'https://picsum.photos/200/200?random=3' },
    { id: '4', name: 'Client Co.', email: 'contact@client.com', role: UserRole.CLIENT, avatar: 'https://picsum.photos/200/200?random=4' },
];

const INITIAL_TASKS: Task[] = [
    { id: 't1', title: 'Design Login Page', description: 'Create high-fidelity mockups for the new login flow.', status: TaskStatus.DONE, priority: TaskPriority.HIGH, assigneeId: '3', projectId: 'p1', dueDate: 'Oct 24' },
    { id: 't2', title: 'API Integration', description: 'Connect frontend with the Gemini API endpoints.', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.CRITICAL, assigneeId: '3', projectId: 'p1', dueDate: 'Oct 26' },
    { id: 't3', title: 'User Testing', description: 'Conduct session with 5 beta users.', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM, assigneeId: '2', projectId: 'p1', dueDate: 'Oct 30' },
    { id: 't4', title: 'Fix Mobile Nav', description: 'Sidebar is not collapsing correctly on iOS Safari.', status: TaskStatus.TODO, priority: TaskPriority.LOW, assigneeId: '3', projectId: 'p1', dueDate: 'Nov 01' },
];

const INITIAL_PROJECTS: Project[] = [
    { id: 'p1', name: 'Nexus CRM Revamp', clientName: 'Client Co.', status: 'ACTIVE', progress: 65, dueDate: 'Nov 15, 2024' },
    { id: 'p2', name: 'Alpha Mobile App', clientName: 'Tech Corp', status: 'DELAYED', progress: 30, dueDate: 'Dec 01, 2024' },
    { id: 'p3', name: 'Website Migration', clientName: 'Retail Inc.', status: 'COMPLETED', progress: 100, dueDate: 'Oct 10, 2024' },
    { id: 'p4', name: 'Internal HR Tool', clientName: 'Nexus Internal', status: 'ON_HOLD', progress: 15, dueDate: 'Jan 20, 2025' },
];

const INITIAL_INVOICES: Invoice[] = [
    { id: 'INV-2024-001', clientName: 'Client Co.', amount: 150000, status: 'PAID', dueDate: 'Oct 01, 2024' },
    { id: 'INV-2024-002', clientName: 'Tech Corp', amount: 245000, status: 'PENDING', dueDate: 'Oct 25, 2024' },
    { id: 'INV-2024-003', clientName: 'Client Co.', amount: 75000, status: 'OVERDUE', dueDate: 'Oct 15, 2024' },
    { id: 'INV-2024-004', clientName: 'Retail Inc.', amount: 50000, status: 'PENDING', dueDate: 'Nov 05, 2024' },
];

const INITIAL_EOD_REPORTS: EODReport[] = [
    {
        id: 'r1',
        userId: '3', // Rahul Dev
        date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        content: 'Worked on the login animation and fixed responsive issues on the dashboard.',
        summary: '• Completed login animation\n• Resolved responsive dashboard bugs'
    },
    {
        id: 'r2',
        userId: '3', // Rahul Dev
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        content: 'Integrated the new chart library and updated the dependencies.',
        summary: '• Integrated Recharts library\n• Updated package.json dependencies'
    }
];

const LoginScreen = ({ onLogin, users }: { onLogin: (user: User) => void, users: User[] }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
        setPassword('');
        setError('');
    };

    const handleBack = () => {
        setSelectedUser(null);
        setPassword('');
        setError('');
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) {
            setError('Password is required');
            return;
        }

        setIsLoading(true);
        setError('');

        // Simulate API call and validation
        setTimeout(() => {
            if (password === '123456') {
                onLogin(selectedUser!);
            } else {
                setError('Invalid credentials. Try "123456"');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans">
            {/* Left Side - Visuals */}
            <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black opacity-90 z-0"></div>
                <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px]"></div>

                {/* Content Overlay */}
                <div className="relative z-10 text-white max-w-lg">
                    <div className="mb-8">
                        <Logo size={80} className="shadow-2xl shadow-indigo-500/20" />
                    </div>
                    <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">Manage your business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">confidence.</span></h1>
                    <p className="text-lg text-slate-300 leading-relaxed mb-8">
                        Nexus CRM provides a unified platform to streamline your workflow, manage teams, and track performance in real-time.
                    </p>

                    <div className="flex gap-4 items-center text-sm text-slate-400">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <img src={`https://picsum.photos/100/100?random=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <p>Trusted by 500+ companies</p>
                    </div>
                </div>

                {/* Glass Card Decoration */}
                <div className="absolute bottom-12 right-12 p-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 w-64 transform rotate-[-5deg] hover:rotate-0 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                            <IndianRupee size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400">Revenue</p>
                            <p className="text-sm font-bold text-white">+12.5% Growth</p>
                        </div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[75%]"></div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
                <div className="w-full max-w-md">
                    {!selectedUser ? (
                        // View 1: Role Selection
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-10 text-center">
                                <div className="md:hidden mb-6 flex justify-center">
                                    <Logo size={60} />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
                                <p className="text-slate-500">Select your account to continue to the dashboard.</p>
                            </div>

                            <div className="space-y-4">
                                {users.map((user, idx) => (
                                    <button
                                        key={user.id}
                                        onClick={() => handleUserClick(user)}
                                        className="w-full group p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex items-center gap-4 text-left relative overflow-hidden"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        <div className="relative">
                                            <img src={user.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 group-hover:border-indigo-500 transition-colors shadow-sm" alt="" />
                                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                                                {user.role === UserRole.ADMIN && <ShieldCheck size={12} className="text-indigo-600" />}
                                                {user.role === UserRole.PM && <Briefcase size={12} className="text-blue-600" />}
                                                {user.role === UserRole.TEAM && <Users size={12} className="text-green-600" />}
                                                {user.role === UserRole.CLIENT && <Briefcase size={12} className="text-orange-600" />}
                                            </div>
                                        </div>

                                        <div className="flex-1 relative z-10">
                                            <h3 className="font-bold text-slate-800 group-hover:text-indigo-700 transition-colors text-lg">{user.name}</h3>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{user.role}</p>
                                        </div>

                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                                            <ArrowLeft className="w-5 h-5 rotate-180" />
                                        </div>
                                    </button>
                                ))}
                            </div>


                        </div>
                    ) : (
                        // View 2: Password Entry
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <button
                                onClick={handleBack}
                                className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 text-sm font-medium transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                                    <ArrowLeft size={16} />
                                </div>
                                <span>Switch Account</span>
                            </button>

                            <div className="text-center mb-10">
                                <div className="relative inline-block mb-4">
                                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur-lg opacity-20"></div>
                                    <img src={selectedUser.avatar} className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl mx-auto" alt="" />
                                    <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Hello, {selectedUser.name.split(' ')[0]}!</h2>
                                <p className="text-slate-500">Enter your password to access the dashboard.</p>
                            </div>

                            <form onSubmit={handleLoginSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                            <Lock size={20} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-100 focus:border-indigo-500 focus:ring-indigo-200'} bg-slate-50 focus:bg-white focus:ring-4 outline-none transition-all text-slate-800 font-medium placeholder:text-slate-400`}
                                            placeholder="Enter password (123456)"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoFocus
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    {error && (
                                        <div className="flex items-center gap-2 text-red-500 text-sm font-medium animate-in slide-in-from-top-1">
                                            <AlertCircle size={16} />
                                            <span>{error}</span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? <Loader2 size={24} className="animate-spin" /> : 'Sign In'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
};

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [allUsers, setAllUsers] = useState<User[]>(INITIAL_USERS);
    const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
    const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
    const [eodReports, setEodReports] = useState<EODReport[]>(INITIAL_EOD_REPORTS);
    const [currentView, setCurrentView] = useState('dashboard');

    const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setCurrentView('dashboard');
    };

    // User CRUD Operations
    const handleAddUser = (newUser: Omit<User, 'id' | 'avatar'>) => {
        const user: User = {
            ...newUser,
            id: Math.random().toString(36).substr(2, 9),
            avatar: `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`
        };
        setAllUsers([...allUsers, user]);
    };

    const handleUpdateUser = (id: string, data: Partial<User>) => {
        setAllUsers(allUsers.map(user => user.id === id ? { ...user, ...data } : user));
    };

    const handleDeleteUser = (id: string) => {
        setAllUsers(allUsers.filter(user => user.id !== id));
    };

    const handleEODSubmit = (content: string, summary: string) => {
        if (!currentUser) return;
        const newReport: EODReport = {
            id: `eod-${Date.now()}`,
            userId: currentUser.id,
            date: new Date().toISOString(),
            content,
            summary
        };
        setEodReports([newReport, ...eodReports]);
    };

    if (!currentUser) {
        return <LoginScreen onLogin={setCurrentUser} users={allUsers} />;
    }

    return (
        <Layout currentUser={currentUser} onLogout={handleLogout} currentView={currentView} onNavigate={setCurrentView}>
            <div className="space-y-6 pb-20 md:pb-0">

                {/* ==================== ADMIN ROLE ==================== */}
                {currentUser.role === UserRole.ADMIN && (
                    <>
                        {currentView === 'dashboard' && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <StatsCard title="Total Revenue (YTD)" value="₹ 1,24,50,000" trend="+12%" icon={IndianRupee} />
                                    <StatsCard title="Active Projects" value={projects.filter(p => p.status === 'ACTIVE').length.toString()} trend="+2" icon={Briefcase} />
                                    <StatsCard title="Total Employees" value={allUsers.length.toString()} trend="+4" icon={Users} />
                                    <StatsCard title="Pending Invoices" value={invoices.filter(i => i.status === 'PENDING').length.toString()} trend="Overdue" icon={AlertCircle} trendUp={false} />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2">
                                        <PerformanceChart />
                                    </div>
                                    <div className="space-y-6">
                                        <ProjectDistribution />
                                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="font-bold text-slate-800">Quick Actions</h3>
                                            </div>
                                            <div className="space-y-2">
                                                <button onClick={() => setCurrentView('projects')} className="w-full text-left px-4 py-3 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-sm font-medium transition-colors">
                                                    + Create New Project
                                                </button>
                                                <button onClick={() => setCurrentView('employees')} className="w-full text-left px-4 py-3 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-sm font-medium transition-colors">
                                                    + Add Employee
                                                </button>
                                                <button onClick={() => setCurrentView('finance')} className="w-full text-left px-4 py-3 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-sm font-medium transition-colors">
                                                    + Generate Invoice
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {currentView === 'projects' && <ProjectList projects={projects} />}

                        {currentView === 'employees' && (
                            <UserManagement
                                users={allUsers}
                                onAddUser={handleAddUser}
                                onUpdateUser={handleUpdateUser}
                                onDeleteUser={handleDeleteUser}
                            />
                        )}

                        {currentView === 'finance' && <FinanceView invoices={invoices} role={currentUser.role} />}

                        {currentView === 'settings' && <SettingsView user={currentUser} />}
                    </>
                )}

                {/* ==================== PROJECT MANAGER ROLE ==================== */}
                {currentUser.role === UserRole.PM && (
                    <>
                        {currentView === 'dashboard' && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <StatsCard title="Project Health" value="94%" trend="Good" icon={ShieldCheck} />
                                    <StatsCard title="Team Capacity" value="85%" trend="High Load" icon={Users} trendUp={false} />
                                    <StatsCard title="Upcoming Deadlines" value="2" trend="This Week" icon={AlertCircle} trendUp={false} />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2 h-[600px]">
                                        <KanbanBoard tasks={tasks} onTaskMove={handleTaskMove} />
                                    </div>
                                    <div className="space-y-6">
                                        <PerformanceChart />
                                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                            <h3 className="font-bold text-slate-800 mb-4">Team Status</h3>
                                            <div className="space-y-4">
                                                {allUsers.filter(u => u.role === UserRole.TEAM).map(u => (
                                                    <div key={u.id} className="flex items-center gap-3 pb-3 border-b border-slate-50 last:border-0">
                                                        <img src={u.avatar} className="w-10 h-10 rounded-full" alt="" />
                                                        <div className="flex-1">
                                                            <p className="text-sm font-bold text-slate-800">{u.name}</p>
                                                            <p className="text-xs text-slate-500">Active</p>
                                                        </div>
                                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {currentView === 'projects' && <ProjectList projects={projects} />}

                        {currentView === 'tasks' && (
                            <div className="h-[calc(100vh-140px)]">
                                <KanbanBoard tasks={tasks} onTaskMove={handleTaskMove} />
                            </div>
                        )}

                        {currentView === 'team' && (
                            <UserManagement
                                users={allUsers.filter(u => u.role !== UserRole.CLIENT)}
                                onAddUser={() => { }}
                                onUpdateUser={() => { }}
                                onDeleteUser={() => { }}
                                readOnly={true}
                            />
                        )}
                    </>
                )}

                {/* ==================== TEAM MEMBER ROLE ==================== */}
                {currentUser.role === UserRole.TEAM && (
                    <>
                        {currentView === 'dashboard' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
                                <div className="h-full overflow-hidden flex flex-col">
                                    <KanbanBoard tasks={tasks.filter(t => t.assigneeId === currentUser.id || t.status === TaskStatus.TODO)} onTaskMove={handleTaskMove} />
                                </div>
                                <div className="h-full">
                                    <EODForm onSubmit={handleEODSubmit} />
                                </div>
                            </div>
                        )}
                        {currentView === 'tasks' && (
                            <div className="h-[calc(100vh-140px)]">
                                <KanbanBoard tasks={tasks.filter(t => t.assigneeId === currentUser.id)} onTaskMove={handleTaskMove} />
                            </div>
                        )}
                        {currentView === 'eod' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
                                <div className="h-full">
                                    <EODForm onSubmit={handleEODSubmit} />
                                </div>
                                <div className="h-full overflow-hidden">
                                    <EODHistory reports={eodReports.filter(r => r.userId === currentUser.id)} />
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* ==================== CLIENT ROLE ==================== */}
                {currentUser.role === UserRole.CLIENT && (
                    <>
                        {currentView === 'dashboard' && (
                            <div className="max-w-4xl mx-auto space-y-6">
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
                                    <h2 className="text-2xl font-bold mb-2">Welcome back, {currentUser.name}</h2>
                                    <p className="opacity-90">Here is the latest status of your project.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <OnboardingChecklist />
                                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                        <h3 className="font-bold text-slate-800 mb-4">Recent Updates</h3>
                                        <div className="space-y-4">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                                                    <Briefcase size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">Milestone Completed</p>
                                                    <p className="text-xs text-slate-500">Phase 1 Design has been finalized and approved.</p>
                                                    <p className="text-[10px] text-slate-400 mt-1">2 hours ago</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                                                    <IndianRupee size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">Invoice Generated</p>
                                                    <p className="text-xs text-slate-500">Invoice #INV-2024-001 is now available for payment.</p>
                                                    <p className="text-[10px] text-slate-400 mt-1">Yesterday</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                    <h3 className="font-bold text-slate-800 mb-4">Project Timeline</h3>
                                    <div className="h-64">
                                        <PerformanceChart />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentView === 'project' && <ProjectList projects={projects.filter(p => p.clientName === currentUser.name)} />}
                        {currentView === 'invoices' && <FinanceView invoices={invoices.filter(i => i.clientName === currentUser.name)} role={currentUser.role} />}
                    </>
                )}
            </div>
        </Layout>
    );
};

export default App;
