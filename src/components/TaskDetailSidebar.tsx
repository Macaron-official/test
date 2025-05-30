'use client';

import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, FileText, Download, Maximize2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Task, TaskAttachment } from '@/types/task';

interface TaskDetailSidebarProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onExpand: () => void;
}

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

function getPriorityBadge(priority?: Task['priority']) {
  if (!priority) return <span className="text-gray-400 text-sm">Empty</span>;

  const colors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  const labels = {
    high: '高',
    medium: '中',
    low: '低'
  };

  return <Badge className={colors[priority]}>{labels[priority]}</Badge>;
}

function getUserInitials(name: string): string {
  return name.charAt(0).toUpperCase();
}

function getFileIcon(type: TaskAttachment['type']) {
  switch (type) {
    case 'pdf':
      return '📄';
    case 'pptx':
      return '📊';
    case 'docx':
      return '📝';
    case 'image':
      return '🖼️';
    default:
      return '📎';
  }
}

export default function TaskDetailSidebar({ task, isOpen, onClose, onExpand }: TaskDetailSidebarProps) {
  const [showMoreProperties, setShowMoreProperties] = useState(false);

  if (!task) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white border-l border-gray-200 shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img
              src="https://ext.same-assets.com/283119795/2509754794.svg"
              alt="Document"
              className="w-5 h-5 opacity-60"
            />
            <span className="font-medium text-gray-900">任务详情</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onExpand}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="展开为完整页面"
            >
              <Maximize2 className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto h-full pb-20">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {task.name}
            </h1>
          </div>

          {/* Properties */}
          <div className="space-y-4">
            {/* Personnel */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">👥</span>
                <span>人员</span>
              </div>
              <div className="flex items-center gap-1">
                {task.assignees.length > 0 ? (
                  task.assignees.map((assignee) => (
                    <Avatar key={assignee} className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-800 font-medium">
                        {getUserInitials(assignee)}
                      </AvatarFallback>
                    </Avatar>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">Empty</span>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">⚡</span>
                <span>任务状态</span>
              </div>
              <div>
                {getStatusBadge(task.status)}
              </div>
            </div>

            {/* Overview */}
            <div className="flex items-start justify-between py-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">📝</span>
                <span>概述</span>
              </div>
              <div className="text-sm text-gray-900 text-right max-w-48">
                {task.overview || '无描述'}
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">📅</span>
                <span>时间</span>
              </div>
              <div className="text-sm text-gray-900 text-right">
                {task.startDate && (
                  <span>
                    {task.startDate}
                    {task.endDate && ` → ${task.endDate}`}
                  </span>
                )}
                {!task.startDate && (
                  <span className="text-gray-400">Empty</span>
                )}
              </div>
            </div>

            {/* Project */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">🎯</span>
                <span>所属项目</span>
              </div>
              <div className="text-sm text-gray-900">
                {task.project || <span className="text-gray-400">Empty</span>}
              </div>
            </div>

            {/* Priority */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">⭐</span>
                <span>优先级</span>
              </div>
              <div>
                {getPriorityBadge(task.priority)}
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">🏷️</span>
                <span>标签</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Empty</span>
              </div>
            </div>

            {/* Task ID */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">#️⃣</span>
                <span>Task ID</span>
              </div>
              <div className="text-sm text-gray-900">
                {task.id}
              </div>
            </div>
          </div>

          {/* More Properties */}
          <div>
            <button
              onClick={() => setShowMoreProperties(!showMoreProperties)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showMoreProperties ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span>4 more properties</span>
            </button>

            {showMoreProperties && (
              <div className="mt-4 pl-6 space-y-2">
                <div className="text-sm text-gray-600">创建时间: 2024年8月</div>
                <div className="text-sm text-gray-600">最后修改: 2024年12月</div>
                <div className="text-sm text-gray-600">创建者: 系统</div>
                <div className="text-sm text-gray-600">状态更新: 自动</div>
              </div>
            )}
          </div>

          {/* Attachments */}
          {task.attachments && task.attachments.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">附件</h3>
              {task.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="text-2xl">
                    {getFileIcon(attachment.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {attachment.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {attachment.size}
                      {attachment.lastModified && ` • ${attachment.lastModified}`}
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
