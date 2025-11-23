
import React from 'react';
import { User, UserRole } from '../types';
import { Bell, Lock, User as UserIcon, Globe, Moon, Smartphone, Mail } from 'lucide-react';

export const SettingsView: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
            <p className="text-slate-500 text-sm">Manage your account preferences and application settings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-medium text-sm">
                    <UserIcon size={18} /> Profile Settings
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-colors">
                    <Bell size={18} /> Notifications
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-colors">
                    <Lock size={18} /> Security & Login
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-colors">
                    <Globe size={18} /> Language & Region
                </button>
            </div>

            {/* Content */}
            <div className="md:col-span-2 space-y-6">
                {/* Profile Section */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Public Profile</h3>
                    
                    <div className="flex items-center gap-6 mb-8">
                        <img src={user.avatar} className="w-20 h-20 rounded-full border-4 border-slate-50" alt="" />
                        <div>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
                                Change Avatar
                            </button>
                            <p className="text-xs text-slate-400 mt-2">JPG, GIF or PNG. Max size 800K</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Full Name</label>
                            <input type="text" defaultValue={user.name} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Email</label>
                            <input type="email" defaultValue={user.email} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                         <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Role</label>
                            <input type="text" defaultValue={user.role} disabled className="w-full p-3 rounded-xl border border-slate-200 bg-slate-100 text-sm font-medium text-slate-400 cursor-not-allowed" />
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Preferences</h3>
                    <div className="space-y-4">
                         <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Moon size={18} /></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-700">Dark Mode</p>
                                    <p className="text-xs text-slate-500">Switch to dark theme interface</p>
                                </div>
                            </div>
                            <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                         </div>
                         <div className="flex items-center justify-between py-2 border-t border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Mail size={18} /></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-700">Email Notifications</p>
                                    <p className="text-xs text-slate-500">Receive updates on project activity</p>
                                </div>
                            </div>
                            <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
