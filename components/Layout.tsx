import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  CreditCard,
  Bell
} from 'lucide-react';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentUser: User;
  onLogout: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentUser, onLogout, currentView, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const getNavItems = (role: UserRole) => {
    const common = [
      { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    ];

    if (role === UserRole.ADMIN) {
      return [
        ...common,
        { icon: Briefcase, label: 'Projects', id: 'projects' },
        { icon: Users, label: 'Employees', id: 'employees' },
        { icon: CreditCard, label: 'Finance', id: 'finance' },
        { icon: Settings, label: 'Settings', id: 'settings' },
      ];
    }
    if (role === UserRole.PM) {
      return [
        ...common,
        { icon: Briefcase, label: 'Active Projects', id: 'projects' },
        { icon: CheckSquare, label: 'Task Board', id: 'tasks' },
        { icon: Users, label: 'Team', id: 'team' },
      ];
    }
    if (role === UserRole.TEAM) {
      return [
        ...common,
        { icon: CheckSquare, label: 'My Tasks', id: 'tasks' },
        { icon: FileText, label: 'EOD Reports', id: 'eod' },
      ];
    }
    if (role === UserRole.CLIENT) {
      return [
        ...common,
        { icon: Briefcase, label: 'My Project', id: 'project' },
        { icon: FileText, label: 'Invoices', id: 'invoices' },
      ];
    }
    return common;
  };

  const navItems = getNavItems(currentUser.role);

  const handleNavigation = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">N</div>
            <span className="font-bold text-lg text-slate-900">Nexus</span>
        </div>
        <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-slate-700">
                <Bell size={20} />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-700">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex flex-col h-full">
          <div className="hidden md:flex items-center gap-3 mb-10">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">N</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Nexus CRM</span>
          </div>

          {isMobileMenuOpen && (
             <div className="md:hidden flex items-center justify-between mb-8">
                <span className="font-bold text-xl text-slate-900">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-600">
                    <X size={20} />
                </button>
             </div>
          )}

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                      : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  <item.icon 
                    size={20} 
                    className={`transition-transform ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600 group-hover:scale-110'
                    }`} 
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 mb-6 px-2">
              <img src={currentUser.avatar} alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                <p className="text-xs text-slate-500 truncate capitalize">{currentUser.role.toLowerCase()}</p>
              </div>
            </div>
            <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-semibold"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-65px)] md:h-screen bg-slate-50">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center hidden md:flex">
            <div>
                <h1 className="text-xl font-bold text-slate-800 capitalize">{currentView}</h1>
                <p className="text-xs text-slate-500">Welcome back, {currentUser.name}</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="pl-4 pr-4 py-2 rounded-full bg-slate-100 border-none text-sm focus:ring-2 focus:ring-indigo-500 w-64"
                    />
                </div>
                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative bg-slate-50 rounded-full">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>
            </div>
        </header>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};