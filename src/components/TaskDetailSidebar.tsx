// Instructions: 修改侧边栏组件，为各个字段添加编辑功能，包括人员、所属项目、任务状态、优先级、概述、标签、时间

'use client';

import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, FileText, Download, Maximize2, Edit2, Check, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
  const [editingFields, setEditingFields] = useState<{[key: string]: boolean}>({});
  const [editValues, setEditValues] = useState<{[key: string]: any}>({});

  if (!task) return null;

  const startEditing = (field: string, currentValue: any) => {
    setEditingFields({ ...editingFields, [field]: true });
    setEditValues({ ...editValues, [field]: currentValue });
  };

  const saveField = (field: string) => {
    // 这里可以添加保存逻辑
    console.log(`保存字段 ${field}:`, editValues[field]);
    setEditingFields({ ...editingFields, [field]: false });
  };

  const cancelEdit = (field: string) => {
    setEditingFields({ ...editingFields, [field]: false });
    const newEditValues = { ...editValues };
    delete newEditValues[field];
    setEditValues(newEditValues);
  };

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
            {editingFields.name ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editValues.name || task.name}
                  onChange={(e) => setEditValues({...editValues, name: e.target.value})}
                  className="w-full text-2xl font-bold text-gray-900 border border-gray-300 rounded px-2 py-1"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveField('name')}>
                    <Check className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => cancelEdit('name')}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 group">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {task.name}
                </h1>
                <button
                  onClick={() => startEditing('name', task.name)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                >
                  <Edit2 className="w-3 h-3 text-gray-500" />
                </button>
              </div>
            )}
          </div>

          {/* Properties */}
          <div className="space-y-4">
            {/* Personnel */}
            <div className="flex items-center justify-between py-2 group">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">👥</span>
                <span>人员</span>
              </div>
              <div className="flex items-center gap-1">
                {editingFields.assignees ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editValues.assignees || ''}
                      onChange={(e) => setEditValues({...editValues, assignees: e.target.value})}
                      placeholder="添加人员..."
                      className="w-32 text-sm border border-gray-300 rounded px-2 py-1"
                    />
                    <div className="flex gap-1">
                      <Button size="sm" onClick={() => saveField('assignees')}>
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => cancelEdit('assignees')}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
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
                    <button
                      onClick={() => startEditing('assignees', '')}
                      className="ml-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                    >
                      <Plus className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between py-2 group">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">⚡</span>
                <span>任务状态</span>
              </div>
              <div className="flex items-center gap-1">
                {editingFields.status ? (
                  <div className="space-y-2">
                    <select
                      value={editValues.status || task.status}
                      onChange={(e) => setEditValues({...editValues, status: e.target.value})}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="not-started">未启动</option>
                      <option value="in-progress">进行中</option>
                      <option value="completed">已完成</option>
                    </select>
                    <div className="flex gap-1">
                      <Button size="sm" onClick={() => saveField('status')}>
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => cancelEdit('status')}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    {getStatusBadge(task.status)}
                    <button
                      onClick={() => startEditing('status', task.status)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                    >
                      <Edit2 className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Overview */}
            <div className="flex items-start justify-between py-2 group">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">📝</span>
                <span>概述</span>
              </div>
              <div className="text-sm text-gray-900 text-right max-w-48">
                {editingFields.overview ? (
                  <div className="space-y-2">
                    <textarea
                      value={editValues.overview || task.overview || ''}
                      onChange={(e) => setEditValues({...editValues, overview: e.target.value})}
                      placeholder="添加概述..."
                      rows={3}
                      className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                    />
                    <div className="flex gap-1">
                      <Button size="sm" onClick={() => saveField('overview')}>
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => cancelEdit('overview')}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span>{task.overview || '无描述'}</span>
                    <button
                      onClick={() => startEditing('overview', task.overview || '')}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                    >
                      <Edit2 className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center justify-between py-2 group">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">📅</span>
                <span>时间</span>
              </div>
              <div className="text-sm text-gray-900 text-right">
                {editingFields.time ? (
                  <div className="space-y-2">
                    <div className="flex gap-1 text-xs">
                      <input
                        type="date"
                        value={editValues.startDate || task.startDate || ''}
                        onChange={(e) => setEditValues({...editValues, startDate: e.target.value})}
                        className="border border-gray-300 rounded px-1 py-1"
                      />
                      <span className="self-center">→</span>
                      <input
                        type="date"
                        value={editValues.endDate || task.endDate || ''}
                        onChange={(e) => setEditValues({...editValues, endDate: e.target.value})}
                        className="border border-gray-300 rounded px-1 py-1"
                      />
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" onClick={() => saveField('time')}>
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => cancelEdit('time')}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    {task.startDate && (
                      <span>
                        {task.startDate}
                        {task.endDate && ` → ${task.endDate}`}
                      </span>
                    )}
                    {!task.startDate && (
                      <span className="text-gray-400">Empty</span>
                    )}
                    <button
                      onClick={() => startEditing('time', {startDate: task.startDate, endDate: task.endDate})}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                    >
                      <Edit2 className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Project */}
            <div className="flex items-center justify-between py-2 group">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">🎯</span>
                <span>所属项目</span>
              </div>
              <div className="text-sm text-gray-900">
                {editingFields.project ? (
                  <div className="space-y-2">
                    <select
                      value={editValues.project || task.project || ''}
                      onChange={(e) => setEditValues({...editValues, project: e.target.value})}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="">选择项目</option>
                      <option value="项目A">项目A</option>
                      <option value="项目B">项目B</option>
                      <option value="项目C">项目C</option>
                    </select>
                    <div className="flex gap-1">
                      <Button size="sm" onClick={() => saveField('project')}>
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => cancelEdit('project')}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    {task.project || <span className="text-gray-400">Empty</span>}
                    <button
                      onClick={() => startEditing('project', task.project || '')}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                    >
                      <Edit2 className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Priority */}
            <div className="flex items-center justify-between py-2 group">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">⭐</span>
                <span>优先级</span>
              </div>
              <div>
                {editingFields.priority ? (
                  <div className="space-y-2">
                    <select
                      value={editValues.priority || task.priority || ''}
                      onChange={(e) => setEditValues({...editValues, priority: e.target.value})}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="">选择优先级</option>
                      <option value="high">高</option>
                      <option value="medium">中</option>
                      <option value="low">低</option>
                    </select>
                    <div className="flex gap-1">
                      <Button size="sm" onClick={() => saveField('priority')}>
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => cancelEdit('priority')}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    {getPriorityBadge(task.priority)}
                    <button
                      onClick={() => startEditing('priority', task.priority || '')}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                    >
                      <Edit2 className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center justify-between py-2 group">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-lg">🏷️</span>
                <span>标签</span>
              </div>
              <div>
                {editingFields.tags ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editValues.tags || ''}
                      onChange={(e) => setEditValues({...editValues, tags: e.target.value})}
                      placeholder="添加标签，用逗号分隔"
                      className="w-32 text-sm border border-gray-300 rounded px-2 py-1"
                    />
                    <div className="flex gap-1">
                      <Button size="sm" onClick={() => saveField('tags')}>
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => cancelEdit('tags')}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400 text-sm">Empty</span>
                    <button
                      onClick={() => startEditing('tags', '')}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                    >
                      <Plus className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                )}
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
