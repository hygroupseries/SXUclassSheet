// 日期工具函数

// 获取当前周次（2025年9月1日正式开学）
export const getCurrentWeek = () => {
  const startDate = new Date(2025, 8, 1); // 2025年9月1日（月份从0开始）
  const currentDate = new Date();
  const diffTime = currentDate - startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const week = Math.ceil(diffDays / 7);
  return Math.max(1, Math.min(16, week));
};

// 获取指定周的日期范围（从周一开始）
export const getWeekDates = (weekNumber) => {
  const startDate = new Date(2025, 8, 1); // 2025年9月1日
  
  // 找到第一个周一
  const firstMonday = new Date(startDate);
  const dayOfWeek = startDate.getDay(); // 0=周日, 1=周一, ...
  const daysToMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek) % 7;
  if (daysToMonday > 0) {
    firstMonday.setDate(startDate.getDate() + daysToMonday);
  }
  
  // 计算指定周的周一
  const weekStart = new Date(firstMonday);
  weekStart.setDate(firstMonday.getDate() + (weekNumber - 1) * 7);
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    dates.push(date);
  }
  return dates;
};

// 格式化日期为 "9月1日" 格式
export const formatDate = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
};

// 课程时间表配置
export const timeSlots = [
  { period: 1, time: '8:00~8:50' },
  { period: 2, time: '9:00~9:50' },
  { period: 3, time: '10:10~11:00' },
  { period: 4, time: '11:10~12:00' },
  { period: 5, time: '14:30~15:20' },
  { period: 6, time: '15:30~16:20' },
  { period: 7, time: '16:40~17:30' },
  { period: 8, time: '17:40~18:30' },
  { period: 9, time: '19:30~20:20' },
  { period: 10, time: '20:30~21:20' }
];

// 课程分组配置（哪些节次合并为大课）
export const courseGroups = [
  { periods: [1, 2], label: '1-2节' }, // 上午第一大节
  { periods: [3, 4], label: '3-4节' }, // 上午第二大节
  { periods: [5, 6], label: '5-6节' }, // 下午第一大节
  { periods: [7, 8], label: '7-8节' }, // 下午第二大节
  { periods: [9, 10], label: '9-10节' } // 晚上
];

// 特殊的周六课程分组
export const saturdayGroups = [
  { periods: [1, 2], label: '1-2节' },
  { periods: [3, 4], label: '3-4节' },
  { periods: [5, 6], label: '5-6节' },
  { periods: [6, 7], label: '6-7节' }, // 周六特殊：6-7节为大课
  { periods: [8], label: '8节' },
  { periods: [9, 10], label: '9-10节' }
];

// 获取学期总周数
export const getTotalWeeks = () => 16;
