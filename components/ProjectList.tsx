
import React from 'react';
import { Project } from '../types';
import { Calendar, MoreHorizontal, Clock, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'COMPLETED': return 'bg-green-50 text-green-700 border-green-100';
      case 'DELAYED': return 'bg-red-50 text-red-700 border-red-100';
      case 'ON_HOLD': return 'bg-orange-50 text-orange-700 border-orange-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Projects</h2>
            <p className="text-slate-500 text-sm">Manage and track ongoing project status.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors font-medium shadow-lg shadow-indigo-200 active:scale-95 flex items-center gap-2">
            <ArrowUpRight size={18} /> Create Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(project.status)}`}>
                {project.status}
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{project.name}</h3>
            <p className="text-sm text-slate-500 mb-6">{project.clientName}</p>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/32/32?random=${i + parseInt(project.id)}`} className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                 ))}
                 <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                    +4
                 </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                <Clock size={14} />
                {project.dueDate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
