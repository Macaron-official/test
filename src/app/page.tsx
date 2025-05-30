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
import { Calendar, Target, Tag, ChevronDown, Search, MoreHorizontal, Plus, User, Clock, Briefcase, Star, Hash, FileText, X } from 'lucide-react';
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
  const [isFullPageView, setIsFullPageView] = useState(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsSidebarOpen(true);
    setIsFullPageView(false);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedTask(null), 300);
  };

  const handleExpandToFullPage = () => {
    setIsSidebarOpen(false);
    setIsFullPageView(true);
  };

  const handleCloseFullPage = () => {
    setIsFullPageView(false);
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Plus className="w-4 h-4" />
                新建
              </Button>
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
        onExpand={handleExpandToFullPage}
      />

      {/* Full Page Task Detail */}
      {isFullPageView && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="https://ext.same-assets.com/283119795/2509754794.svg"
                    alt="Document"
                    className="w-10 h-10 opacity-60"
                  />
                  <h1 className="text-3xl font-bold text-gray-900">{selectedTask.name}</h1>
                </div>
                <button
                  onClick={handleCloseFullPage}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Properties Grid */}
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Personnel */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                      <User className="w-5 h-5 text-gray-500" />
                      <span>人员</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedTask.assignees.length > 0 ? (
                        selectedTask.assignees.map((assignee) => (
                          <Avatar key={assignee} className="w-8 h-8">
                            <AvatarFallback className="text-sm bg-blue-100 text-blue-800 font-medium">
                              {getUserInitials(assignee)}
                            </AvatarFallback>
                          </Avatar>
                        ))
                      ) : (
                        <span className="text-blue-600 cursor-pointer hover:underline">注册</span>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                      <span className="text-xl">⚡</span>
                      <span>任务状态</span>
                    </div>
                    <div>
                      {getStatusBadge(selectedTask.status)}
                    </div>
                  </div>

                  {/* Overview */}
                  <div className="flex items-start justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <span>概述</span>
                    </div>
                    <div className="text-base text-gray-900 text-right max-w-80">
                      {selectedTask.overview || <span className="text-gray-400">空白</span>}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span>时间</span>
                    </div>
                    <div className="text-base text-gray-900">
                      {selectedTask.startDate ? (
                        <span>
                          {selectedTask.startDate}
                          {selectedTask.endDate && ` → ${selectedTask.endDate}`}
                        </span>
                      ) : (
                        <span className="text-gray-400">空白</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Project */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                      <Briefcase className="w-5 h-5 text-gray-500" />
                      <span>所属项目</span>
                    </div>
                    <div className="text-base">
                      {selectedTask.project ? (
                        <span className="text-blue-600 cursor-pointer hover:underline">{selectedTask.project}</span>
                      ) : (
                        <span className="text-gray-400">空白</span>
                      )}
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                      <Star className="w-5 h-5 text-gray-500" />
                      <span>优先级</span>
                    </div>
                    <div className="text-base text-gray-400">
                      空白
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                      <Tag className="w-5 h-5 text-gray-500" />
                      <span>标签</span>
                    </div>
                    <div className="text-base text-gray-400">
                      空白
                    </div>
                  </div>

                  {/* Task ID */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                      <Hash className="w-5 h-5 text-gray-500" />
                      <span>Task ID</span>
                    </div>
                    <div className="text-base font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {selectedTask.id}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">评论</h3>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center gap-3 text-base text-gray-600">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-sm bg-gray-200 text-gray-600">主</AvatarFallback>
                    </Avatar>
                    <span className="text-gray-500">添加评论...</span>
                  </div>
                </div>
              </div>

              {/* Expandable Section */}
              <div className="pt-6 border-t border-gray-200">
                <button className="flex items-center gap-3 text-base text-gray-500 hover:text-gray-700 transition-colors">
                  <ChevronDown className="w-5 h-5" />
                  <span>其他 4 个属性</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
