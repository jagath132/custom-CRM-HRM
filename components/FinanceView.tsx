
import React from 'react';
import { Invoice, UserRole } from '../types';
import { IndianRupee, Download, CheckCircle, Clock, AlertTriangle, TrendingUp, FileText } from 'lucide-react';

interface FinanceViewProps {
  invoices: Invoice[];
  role: UserRole;
}

export const FinanceView: React.FC<FinanceViewProps> = ({ invoices, role }) => {
  
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(i => i.status !== 'PAID').reduce((sum, inv) => sum + inv.amount, 0);

  const getStatusStyle = (status: string) => {
    switch (status) {
        case 'PAID': return 'bg-green-50 text-green-700 border-green-100';
        case 'PENDING': return 'bg-orange-50 text-orange-700 border-orange-100';
        case 'OVERDUE': return 'bg-red-50 text-red-700 border-red-100';
        default: return 'bg-slate-50 text-slate-700';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Summary Cards - Admin Only */}
      {role === UserRole.ADMIN && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">Total Invoiced</p>
                    <h3 className="text-2xl font-bold text-slate-900">₹ {totalRevenue.toLocaleString('en-IN')}</h3>
                </div>
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                    <IndianRupee size={24} />
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">Pending Payment</p>
                    <h3 className="text-2xl font-bold text-slate-900">₹ {pendingAmount.toLocaleString('en-IN')}</h3>
                </div>
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                    <Clock size={24} />
                </div>
            </div>
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">Revenue Growth</p>
                    <h3 className="text-2xl font-bold text-green-600 flex items-center gap-1">
                        +12.5% <TrendingUp size={20} />
                    </h3>
                </div>
            </div>
          </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Invoices</h2>
                <p className="text-slate-500 text-sm">{role === UserRole.CLIENT ? 'View and manage your payments' : 'Track client payments and invoices'}</p>
            </div>
            {role === UserRole.ADMIN && (
                <button className="bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors font-medium shadow-lg active:scale-95 flex items-center gap-2">
                    <FileText size={18} /> Create Invoice
                </button>
            )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4">Invoice ID</th>
                            {role !== UserRole.CLIENT && <th className="px-6 py-4">Client</th>}
                            <th className="px-6 py-4">Due Date</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {invoices.map(inv => (
                            <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-indigo-600">#{inv.id}</td>
                                {role !== UserRole.CLIENT && <td className="px-6 py-4 font-semibold text-slate-800">{inv.clientName}</td>}
                                <td className="px-6 py-4 text-slate-500">{inv.dueDate}</td>
                                <td className="px-6 py-4 font-bold text-slate-900">₹ {inv.amount.toLocaleString('en-IN')}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(inv.status)}`}>
                                        {inv.status === 'PAID' && <CheckCircle size={12} />}
                                        {inv.status === 'PENDING' && <Clock size={12} />}
                                        {inv.status === 'OVERDUE' && <AlertTriangle size={12} />}
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 rounded-lg transition-colors">
                                            <Download size={16} />
                                        </button>
                                        {role === UserRole.CLIENT && inv.status !== 'PAID' && (
                                            <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm">
                                                Pay Now
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};
