import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types';
import { Plus, MoreHorizontal, Calendar, Paperclip } from 'lucide-react';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks: initialTasks, onTaskMove }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const getPriorityColor = (p: TaskPriority) => {
    switch (p) {
      case TaskPriority.CRITICAL: return 'bg-red-100 text-red-700 border-red-200';
      case TaskPriority.HIGH: return 'bg-orange-100 text-orange-700 border-orange-200';
      case TaskPriority.MEDIUM: return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const columns = [
    { id: TaskStatus.TODO, label: 'To Do', color: 'bg-slate-50' },
    { id: TaskStatus.IN_PROGRESS, label: 'In Progress', color: 'bg-blue-50/50' },
    { id: TaskStatus.REVIEW, label: 'Review', color: 'bg-purple-50/50' },
    { id: TaskStatus.DONE, label: 'Done', color: 'bg-green-50/50' },
  ];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, status } : t);
    setTasks(updatedTasks);
    onTaskMove(taskId, status);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-lg font-bold text-slate-800">Task Board</h2>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm shadow-indigo-200">
            <Plus size={16} /> <span className="hidden sm:inline">New Task</span>
        </button>
      </div>
      
      {/* Responsive Height Container */}
      <div className="flex gap-6 overflow-x-auto pb-4 h-[calc(100vh-180px)] md:h-full hide-scrollbar snap-x snap-mandatory">
        {columns.map(col => (
          <div 
            key={col.id} 
            className={`flex-shrink-0 w-[85vw] md:w-80 rounded-xl flex flex-col ${col.color} border border-slate-100 snap-center`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="p-4 flex justify-between items-center border-b border-black/5">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-700">{col.label}</h3>
                <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-slate-500 shadow-sm">
                    {tasks.filter(t => t.status === col.id).length}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
            </div>

            <div className="p-3 flex-1 overflow-y-auto space-y-3">
              {tasks.filter(t => t.status === col.id).map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-move hover:shadow-md hover:border-indigo-200 transition-all group active:cursor-grabbing"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <h4 className="font-medium text-slate-800 mb-1 text-sm leading-tight">{task.title}</h4>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2">{task.description}</p>
                  
                  <div className="flex items-center justify-between text-slate-400 mt-auto pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs">
                            <Paperclip size={12} /> <span>2</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                            <Calendar size={12} /> <span>{task.dueDate}</span>
                        </div>
                    </div>
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600 ring-2 ring-white">
                        JD
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};