'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { tasks } from '@/data/tasks';
import type { Task } from '@/types/task';
import { Calendar, Target, Tag, ChevronDown, Search, Share, MoreHorizontal } from 'lucide-react';
import TaskDetailSidebar from '@/components/TaskDetailSidebar';

function getStatusBadge(status: Task['status']) {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">已完成</Badge>;
    case 'in-progress':
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">进行中</Badge>;
    case 'not-started':
      return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200">未启动</Badge>;
    default:
      return null;
  }
}

function getUserInitials(name: string): string {
  return name.charAt(0).toUpperCase();
}

export default function HomePage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedTask(null), 300); // Delay to allow animation to complete
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Ready to explore more? Sign up or login to start building in Notion.
            </span>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                Sign up or login
              </Button>
              <Share className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div
        className="h-48 bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(https://ext.same-assets.com/283119795/995791078.jpeg)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      {/* Main Content */}
      <div className="max-w-full mx-auto px-12 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">📋 任务</h1>

          {/* View Controls */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
              <Target className="w-4 h-4" />
              <span>By Project</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 cursor-pointer">
              <Calendar className="w-4 h-4" />
              <span>All tasks</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
              <Tag className="w-4 h-4" />
              <span>Timeline</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" />
              <Search className="w-4 h-4 text-gray-400 cursor-pointer" />
              <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>

          {/* Task Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 border-b border-gray-200">
                  <TableHead className="w-20 text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    <div className="flex items-center gap-1">
                      #
                      <span className="text-gray-400">Task ID</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📄</span>
                      任务名称
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚡</span>
                      任务状态
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">👥</span>
                      人员
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📅</span>
                      时间
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⭐</span>
                      优先级
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow
                    key={task.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleTaskClick(task)}
                  >
                    <TableCell className="font-medium text-gray-700 py-3 px-4">
                      {task.id}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://ext.same-assets.com/283119795/2509754794.svg"
                          alt="Document"
                          className="w-4 h-4 opacity-60"
                        />
                        <span className="text-gray-900 text-sm">{task.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {getStatusBadge(task.status)}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {task.assignees.map((assignee) => (
                          <Avatar key={assignee} className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-blue-100 text-blue-800 font-medium">
                              {getUserInitials(assignee)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {task.assignees.length === 0 && (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 py-3 px-4">
                      {task.startDate && (
                        <span>
                          {task.startDate}
                          {task.endDate && ` → ${task.endDate}`}
                        </span>
                      )}
                      {!task.startDate && (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-gray-400 text-xs">-</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
            <span>Count {tasks.length}</span>
            <span>Timeline</span>
          </div>
        </div>
      </div>

      {/* Task Detail Sidebar */}
      <TaskDetailSidebar
        task={selectedTask}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </div>
  );
}
