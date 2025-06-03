'use client';

import type React from 'react';
import { useState } from 'react';
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
import { Calendar, Target, Tag, ChevronDown, Search, MoreHorizontal, User, Clock, Briefcase, Star, Hash, FileText, X, Edit2, Check, Plus } from 'lucide-react';
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
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [editingFields, setEditingFields] = useState<{[key: string]: boolean}>({});
  const [editValues, setEditValues] = useState<{[key: string]: any}>({});
  const [selectedPersonnel, setSelectedPersonnel] = useState<string[]>(['张三', '李四']);
  const [selectedTags, setSelectedTags] = useState<string[]>(['前端', '重要']);
  const [personnelInput, setPersonnelInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');

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
    setIsCreatingTask(false);
    setSelectedTask(null);
  };

  const handleCreateNewTask = () => {
    setIsCreatingTask(true);
    setIsFullPageView(true);
    setSelectedTask(null);
  };

  const handleSubmitNewTask = () => {
    // 这里可以添加实际的任务创建逻辑
    console.log('创建新任务');
    // 创建成功后关闭模态框
    handleCloseFullPage();
  };

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

  const addPersonnel = (person: string) => {
    if (person.trim() && !selectedPersonnel.includes(person.trim())) {
      setSelectedPersonnel([...selectedPersonnel, person.trim()]);
      setPersonnelInput('');
    }
  };

  const removePersonnel = (person: string) => {
    setSelectedPersonnel(selectedPersonnel.filter(p => p !== person));
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !selectedTags.includes(tag.trim())) {
      setSelectedTags([...selectedTags, tag.trim()]);
      setTagsInput('');
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handlePersonnelKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPersonnel(personnelInput);
    }
  };

  const handleTagsKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(tagsInput);
    }
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">📋 任务</h1>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleCreateNewTask}
            >
              新建
            </Button>
          </div>

          {/* Task Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 border-b border-gray-200">
                  <TableHead className="w-20 text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      #
                      <span className="text-gray-400">Task ID</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg">📄</span>
                      任务名称
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg">⚡</span>
                      任务状态
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg">👥</span>
                      人员
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg">📅</span>
                      时间
                    </div>
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
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
                    <TableCell className="font-medium text-gray-700 py-3 px-4 text-center">
                      {task.id}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <img
                          src="https://ext.same-assets.com/283119795/2509754794.svg"
                          alt="Document"
                          className="w-4 h-4 opacity-60"
                        />
                        <span className="text-gray-900 text-sm">{task.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-center">
                      <div className="flex justify-center">
                        {getStatusBadge(task.status)}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
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
                    <TableCell className="text-sm text-gray-600 py-3 px-4 text-center">
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
                    <TableCell className="py-3 px-4 text-center">
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

      {/* Full Page Task Detail or Create */}
      {isFullPageView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full h-full max-w-[95vw] max-h-[95vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-6 rounded-t-xl sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="https://ext.same-assets.com/283119795/2509754794.svg"
                    alt="Document"
                    className="w-10 h-10 opacity-60"
                  />
                  {isCreatingTask ? (
                    <h1 className="text-3xl font-bold text-gray-900">新建任务</h1>
                  ) : selectedTask && editingFields.taskName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editValues.taskName || selectedTask.name}
                        onChange={(e) => setEditValues({...editValues, taskName: e.target.value})}
                        className="text-3xl font-bold text-gray-900 border border-gray-300 rounded px-2 py-1"
                      />
                      <Button size="sm" onClick={() => saveField('taskName')}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => cancelEdit('taskName')}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : selectedTask && (
                    <div className="flex items-center gap-2 group">
                      <h1 className="text-3xl font-bold text-gray-900">{selectedTask.name}</h1>
                      <button
                        onClick={() => startEditing('taskName', selectedTask.name)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                      >
                        <Edit2 className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {isCreatingTask ? (
                    <>
                      <Button variant="outline" onClick={handleCloseFullPage}>
                        取消
                      </Button>
                      <Button onClick={handleSubmitNewTask}>
                        创建任务
                      </Button>
                    </>
                  ) : (
                    <button
                      onClick={handleCloseFullPage}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {isCreatingTask ? (
                /* Create Task Form */
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* Task Name - Full Width */}
                  <div className="space-y-3">
                    <label className="block text-lg font-semibold text-gray-900">任务名称</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base bg-white shadow-sm"
                      placeholder="输入任务名称..."
                    />
                  </div>

                  {/* Overview - Full Width */}
                  <div className="space-y-3">
                    <label className="block text-lg font-semibold text-gray-900">任务描述</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base bg-white shadow-sm resize-none"
                      placeholder="描述这个任务的详细信息..."
                    />
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Personnel */}
                      <div className="space-y-3">
                        <label className="block text-base font-semibold text-gray-900 flex items-center gap-2">
                          <User className="w-5 h-5 text-gray-600" />
                          分配人员
                        </label>
                        <div className="space-y-3">
                          {selectedPersonnel.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {selectedPersonnel.map((person) => (
                                <Badge key={person} className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-full">
                                  <Avatar className="w-5 h-5">
                                    <AvatarFallback className="text-xs bg-blue-200 text-blue-800">
                                      {getUserInitials(person)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {person}
                                  <X
                                    className="w-4 h-4 cursor-pointer hover:text-red-600 transition-colors"
                                    onClick={() => removePersonnel(person)}
                                  />
                                </Badge>
                              ))}
                            </div>
                          )}
                          <input
                            type="text"
                            list="personnel"
                            value={personnelInput}
                            onChange={(e) => setPersonnelInput(e.target.value)}
                            onKeyPress={handlePersonnelKeyPress}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base bg-white shadow-sm"
                            placeholder="输入人员姓名..."
                          />
                          <datalist id="personnel">
                            <option value="张三" />
                            <option value="李四" />
                            <option value="王五" />
                            <option value="赵六" />
                            <option value="陈小明" />
                            <option value="刘小红" />
                            <option value="孙小华" />
                            <option value="周小丽" />
                            <option value="吴小军" />
                            <option value="郑小燕" />
                          </datalist>
                        </div>
                      </div>

                      {/* Project */}
                      <div className="space-y-3">
                        <label className="block text-base font-semibold text-gray-900 flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-gray-600" />
                          所属项目
                        </label>
                        <input
                          type="text"
                          list="projects"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base bg-white shadow-sm"
                          placeholder="输入或选择项目..."
                        />
                        <datalist id="projects">
                          <option value="项目A" />
                          <option value="项目B" />
                          <option value="项目C" />
                          <option value="任务管理系统" />
                          <option value="网站重构" />
                          <option value="移动应用开发" />
                        </datalist>
                      </div>

                      {/* Time */}
                      <div className="space-y-3">
                        <label className="block text-base font-semibold text-gray-900 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-gray-600" />
                          时间安排
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">开始日期</label>
                            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">结束日期</label>
                            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Tags */}
                      <div className="space-y-3">
                        <label className="block text-base font-semibold text-gray-900 flex items-center gap-2">
                          <Tag className="w-5 h-5 text-gray-600" />
                          标签
                        </label>
                        <div className="space-y-3">
                          {selectedTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {selectedTags.map((tag) => (
                                <Badge
                                  key={tag}
                                  className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                                    tag === '前端' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                    tag === '重要' ? 'bg-green-100 text-green-800 border border-green-200' :
                                    tag === '紧急' ? 'bg-red-100 text-red-800 border border-red-200' :
                                    tag === '设计' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                                    'bg-gray-100 text-gray-800 border border-gray-200'
                                  }`}
                                >
                                  {tag}
                                  <X
                                    className="w-4 h-4 cursor-pointer hover:text-red-600 transition-colors"
                                    onClick={() => removeTag(tag)}
                                  />
                                </Badge>
                              ))}
                            </div>
                          )}
                          <input
                            type="text"
                            list="tags"
                            value={tagsInput}
                            onChange={(e) => setTagsInput(e.target.value)}
                            onKeyPress={handleTagsKeyPress}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base bg-white shadow-sm"
                            placeholder="输入标签..."
                          />
                          <datalist id="tags">
                            <option value="前端" />
                            <option value="后端" />
                            <option value="设计" />
                            <option value="测试" />
                            <option value="紧急" />
                            <option value="重要" />
                            <option value="UI/UX" />
                            <option value="API" />
                            <option value="数据库" />
                            <option value="文档" />
                          </datalist>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="space-y-3">
                        <label className="block text-base font-semibold text-gray-900 flex items-center gap-2">
                          <span className="text-xl">⚡</span>
                          任务状态
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base bg-white shadow-sm">
                          <option value="not-started">未启动</option>
                          <option value="in-progress">进行中</option>
                          <option value="completed">已完成</option>
                        </select>
                      </div>

                      {/* Priority */}
                      <div className="space-y-3">
                        <label className="block text-base font-semibold text-gray-900 flex items-center gap-2">
                          <Star className="w-5 h-5 text-gray-600" />
                          优先级
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base bg-white shadow-sm">
                          <option value="">选择优先级</option>
                          <option value="high">🔴 高</option>
                          <option value="medium">🟡 中</option>
                          <option value="low">🟢 低</option>
                        </select>
                      </div>
                    </div>
                  </div>


                </div>
              ) : selectedTask && (
                /* Existing Task Detail View */
                <div className="space-y-8">
                  {/* Properties Grid */}
                  <div className="grid grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Personnel */}
                      <div className="flex items-center justify-between py-4 border-b border-gray-100 group">
                        <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                          <User className="w-5 h-5 text-gray-500" />
                          <span>人员</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {editingFields.assignees ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={editValues.assignees || ''}
                                onChange={(e) => setEditValues({...editValues, assignees: e.target.value})}
                                placeholder="添加人员..."
                                className="w-48 text-sm border border-gray-300 rounded px-3 py-2"
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => saveField('assignees')}>
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => cancelEdit('assignees')}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
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
                                <span className="text-gray-400">空白</span>
                              )}
                              <button
                                onClick={() => startEditing('assignees', '')}
                                className="ml-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                              >
                                <Plus className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center justify-between py-4 border-b border-gray-100 group">
                        <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                          <span className="text-xl">⚡</span>
                          <span>任务状态</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {editingFields.status ? (
                            <div className="space-y-2">
                              <select
                                value={editValues.status || selectedTask.status}
                                onChange={(e) => setEditValues({...editValues, status: e.target.value})}
                                className="text-sm border border-gray-300 rounded px-3 py-2"
                              >
                                <option value="not-started">未启动</option>
                                <option value="in-progress">进行中</option>
                                <option value="completed">已完成</option>
                              </select>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => saveField('status')}>
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => cancelEdit('status')}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              {getStatusBadge(selectedTask.status)}
                              <button
                                onClick={() => startEditing('status', selectedTask.status)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                              >
                                <Edit2 className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Overview */}
                      <div className="flex items-start justify-between py-4 border-b border-gray-100 group">
                        <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                          <FileText className="w-5 h-5 text-gray-500" />
                          <span>概述</span>
                        </div>
                        <div className="text-base text-gray-900 text-right max-w-80">
                          {editingFields.overview ? (
                            <div className="space-y-2 w-full">
                              <textarea
                                value={editValues.overview || selectedTask.overview || ''}
                                onChange={(e) => setEditValues({...editValues, overview: e.target.value})}
                                placeholder="添加概述..."
                                rows={4}
                                className="w-full text-sm border border-gray-300 rounded px-3 py-2"
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => saveField('overview')}>
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => cancelEdit('overview')}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span>{selectedTask.overview || '空白'}</span>
                              <button
                                onClick={() => startEditing('overview', selectedTask.overview || '')}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                              >
                                <Edit2 className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Time */}
                      <div className="flex items-center justify-between py-4 border-b border-gray-100 group">
                        <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                          <Clock className="w-5 h-5 text-gray-500" />
                          <span>时间</span>
                        </div>
                        <div className="text-base text-gray-900">
                          {editingFields.time ? (
                            <div className="space-y-2">
                              <div className="flex gap-2 text-sm">
                                <input
                                  type="date"
                                  value={editValues.startDate || selectedTask.startDate || ''}
                                  onChange={(e) => setEditValues({...editValues, startDate: e.target.value})}
                                  className="border border-gray-300 rounded px-2 py-1"
                                />
                                <span className="self-center">→</span>
                                <input
                                  type="date"
                                  value={editValues.endDate || selectedTask.endDate || ''}
                                  onChange={(e) => setEditValues({...editValues, endDate: e.target.value})}
                                  className="border border-gray-300 rounded px-2 py-1"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => saveField('time')}>
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => cancelEdit('time')}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              {selectedTask.startDate ? (
                                <span>
                                  {selectedTask.startDate}
                                  {selectedTask.endDate && ` → ${selectedTask.endDate}`}
                                </span>
                              ) : (
                                <span className="text-gray-400">空白</span>
                              )}
                              <button
                                onClick={() => startEditing('time', {startDate: selectedTask.startDate, endDate: selectedTask.endDate})}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                              >
                                <Edit2 className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Project */}
                      <div className="flex items-center justify-between py-4 border-b border-gray-100 group">
                        <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                          <Briefcase className="w-5 h-5 text-gray-500" />
                          <span>所属项目</span>
                        </div>
                        <div className="text-base">
                          {editingFields.project ? (
                            <div className="space-y-2">
                              <select
                                value={editValues.project || selectedTask.project || ''}
                                onChange={(e) => setEditValues({...editValues, project: e.target.value})}
                                className="text-sm border border-gray-300 rounded px-3 py-2"
                              >
                                <option value="">选择项目</option>
                                <option value="项目A">项目A</option>
                                <option value="项目B">项目B</option>
                                <option value="项目C">项目C</option>
                              </select>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => saveField('project')}>
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => cancelEdit('project')}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              {selectedTask.project ? (
                                <span className="text-blue-600 cursor-pointer hover:underline">{selectedTask.project}</span>
                              ) : (
                                <span className="text-gray-400">空白</span>
                              )}
                              <button
                                onClick={() => startEditing('project', selectedTask.project || '')}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                              >
                                <Edit2 className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Priority */}
                      <div className="flex items-center justify-between py-4 border-b border-gray-100 group">
                        <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                          <Star className="w-5 h-5 text-gray-500" />
                          <span>优先级</span>
                        </div>
                        <div className="text-base">
                          {editingFields.priority ? (
                            <div className="space-y-2">
                              <select
                                value={editValues.priority || selectedTask.priority || ''}
                                onChange={(e) => setEditValues({...editValues, priority: e.target.value})}
                                className="text-sm border border-gray-300 rounded px-3 py-2"
                              >
                                <option value="">选择优先级</option>
                                <option value="high">高</option>
                                <option value="medium">中</option>
                                <option value="low">低</option>
                              </select>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => saveField('priority')}>
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => cancelEdit('priority')}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">空白</span>
                              <button
                                onClick={() => startEditing('priority', '')}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                              >
                                <Plus className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex items-center justify-between py-4 border-b border-gray-100 group">
                        <div className="flex items-center gap-3 text-base font-medium text-gray-700">
                          <Tag className="w-5 h-5 text-gray-500" />
                          <span>标签</span>
                        </div>
                        <div className="text-base">
                          {editingFields.tags ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={editValues.tags || ''}
                                onChange={(e) => setEditValues({...editValues, tags: e.target.value})}
                                placeholder="添加标签，用逗号分隔"
                                className="w-48 text-sm border border-gray-300 rounded px-3 py-2"
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => saveField('tags')}>
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => cancelEdit('tags')}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">空白</span>
                              <button
                                onClick={() => startEditing('tags', '')}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                              >
                                <Plus className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          )}
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
