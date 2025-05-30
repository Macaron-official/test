import type { Task } from '@/types/task';

export const tasks: Task[] = [
  {
    id: 24,
    name: '涉区专业模型及算法总结',
    status: 'completed',
    assignees: [],
    startDate: 'October 1, 2024',
    endDate: 'October 8, 2024',
    overview: '涉区专业模型及算法总结',
    project: '技术研发',
    priority: 'high',
    tags: [],
    attachments: [
      {
        id: '1',
        name: '涉区专题模型及算法总结_(wl).pdf',
        type: 'pdf',
        size: '684.0KB',
        lastModified: '2025.03.07更新'
      },
      {
        id: '2',
        name: '涉区数字孪生平台模型库_wl.pptx',
        type: 'pptx',
        size: '8125.4KB',
        lastModified: '2025.03.07更新'
      }
    ]
  },
  {
    id: 3,
    name: '山区河道稳定计算改进',
    status: 'in-progress',
    assignees: ['WWenjie'],
    startDate: 'September 24, 2024',
    endDate: 'September 30, 2024',
    overview: '针对山区河道特点进行稳定性计算方法的改进和优化',
    project: '技术改进',
    priority: 'medium'
  },
  {
    id: 2,
    name: '水文-水动力参数标定',
    status: 'in-progress',
    assignees: ['WWenjie'],
    startDate: 'September 18, 2024',
    endDate: 'September 20, 2024',
    overview: '进行水文和水动力学参数的精确标定工作',
    project: '参数优化',
    priority: 'high'
  },
  {
    id: 18,
    name: '县域学生-干支流模型异步耦合',
    status: 'not-started',
    assignees: ['WWenjie'],
    startDate: 'November 22, 2024',
    endDate: 'November 26, 2024',
    overview: '实现县域范围内学生干支流模型的异步耦合计算',
    project: '模型耦合',
    priority: 'medium'
  },
  {
    id: 17,
    name: 'LLM基础',
    status: 'in-progress',
    assignees: [],
    startDate: 'September 13, 2024',
    endDate: 'December 31, 2024',
    overview: '大语言模型基础理论学习和应用研究',
    project: 'AI研究',
    priority: 'low'
  },
  {
    id: 27,
    name: '点击某个位置没法生成',
    status: 'completed',
    assignees: ['Yyangji'],
    startDate: 'September 11, 2024',
    endDate: 'September 12, 2024',
    overview: '修复界面点击位置无法生成内容的bug',
    project: 'Bug修复'
  },
  {
    id: 19,
    name: '河道断面问题',
    status: 'completed',
    assignees: ['Yyangji'],
    startDate: 'August 18, 2024',
    endDate: 'August 23, 2024',
    overview: '解决河道断面数据处理中的相关问题',
    project: '数据处理'
  },
  {
    id: 22,
    name: '二维内边界（圆闸）处理优化',
    status: 'completed',
    assignees: ['WWenjie'],
    startDate: 'August 21, 2024',
    endDate: 'September 2, 2024',
    overview: '优化二维模型中圆闸内边界的处理算法',
    project: '算法优化'
  },
  {
    id: 23,
    name: '二维在线应用操作说明及视频',
    status: 'in-progress',
    assignees: ['Yyangji', 'WWenjie'],
    startDate: 'August 12, 2024',
    endDate: 'August 30, 2024',
    overview: '制作二维在线应用的操作指南和演示视频',
    project: '用户文档'
  },
  {
    id: 21,
    name: '二维在线应用测试',
    status: 'in-progress',
    assignees: ['WWenjie', 'Yyangji'],
    startDate: 'August 12, 2024',
    overview: '对二维在线应用进行全面的功能测试',
    project: '质量保证'
  },
  {
    id: 15,
    name: '大堤坡度效果验证',
    status: 'not-started',
    assignees: ['Yyangji', 'WWenjie'],
    startDate: 'January 5, 2025',
    endDate: 'March 15, 2025',
    overview: '验证大堤坡度对整体效果的影响',
    project: '效果验证'
  },
  {
    id: 25,
    name: 'AI教学案例制作',
    status: 'not-started',
    assignees: ['Yyangji', 'WWenjie'],
    startDate: 'January 2, 2025',
    endDate: 'January 6, 2025',
    overview: '制作人工智能相关的教学案例和材料',
    project: 'AI教育'
  },
  {
    id: 28,
    name: '@关键词自动提取',
    status: 'not-started',
    assignees: ['WWenjie'],
    startDate: 'November 20, 2024',
    endDate: 'December 30, 2024',
    overview: '开发关键词自动提取功能',
    project: 'NLP功能'
  },
  {
    id: 26,
    name: '河海大学一维干支流汇流计算问题解决',
    status: 'not-started',
    assignees: ['WWenjie', 'Yyangji'],
    startDate: 'November 17, 2024',
    endDate: 'November 24, 2024',
    overview: '解决河海大学项目中一维干支流汇流计算的相关问题',
    project: '问题解决'
  },
  {
    id: 1,
    name: '河海大学一维干支流汇流计算',
    status: 'completed',
    assignees: [],
    startDate: 'August 2, 2024',
    endDate: 'October 30, 2024',
    overview: '完成河海大学一维干支流汇流的计算工作',
    project: '计算任务'
  },
  {
    id: 20,
    name: '一维河网计算节点连通性',
    status: 'completed',
    assignees: [],
    startDate: 'July 15, 2024',
    endDate: 'July 31, 2024',
    overview: '验证和优化一维河网计算中节点的连通性',
    project: '网络优化'
  },
  {
    id: 16,
    name: '大堤溃决计算',
    status: 'completed',
    assignees: ['WWenjie'],
    startDate: 'November 1, 2024',
    endDate: 'November 16, 2024',
    overview: '进行大堤溃决情况的数值计算分析',
    project: '风险评估'
  },
  {
    id: 4,
    name: '河海大学一维模型调试',
    status: 'completed',
    assignees: ['WWenjie', 'Yyangji'],
    startDate: 'October 8, 2024',
    endDate: 'October 15, 2024',
    overview: '对河海大学项目的一维模型进行调试和优化',
    project: '模型调试'
  },
  {
    id: 11,
    name: '大堤溃决现象模拟',
    status: 'completed',
    assignees: [],
    startDate: '',
    endDate: '',
    overview: '模拟大堤溃决现象的发生过程',
    project: '现象模拟'
  },
  {
    id: 9,
    name: '河海大学论文撰写',
    status: 'in-progress',
    assignees: ['WWenjie'],
    startDate: 'March 6, 2025',
    endDate: 'May 31, 2025',
    overview: '撰写河海大学相关项目的学术论文',
    project: '学术写作'
  },
  {
    id: 10,
    name: '河海大学论文修改',
    status: 'completed',
    assignees: ['WWenjie'],
    startDate: 'March 11, 2025',
    overview: '修改和完善河海大学论文内容',
    project: '论文修改'
  }
];
