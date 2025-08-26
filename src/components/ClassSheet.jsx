import { useState } from 'react';
import { getCurrentWeek, getWeekDates, formatDate, timeSlots } from '../utils/dateUtils';
import { getCourseForWeek, getSpecialCourses } from '../data/courseData';

const ClassSheet = () => {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const weekDates = getWeekDates(currentWeek);
  const dayNames = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

  // 课程颜色映射
  const courseColors = {
    '高等数学': 'from-red-500 to-red-600',
    '线性代数': 'from-orange-500 to-orange-600', 
    '大学物理': 'from-yellow-500 to-yellow-600',
    '物理实验': 'from-yellow-600 to-yellow-700',
    'C语言程序设计': 'from-green-500 to-green-600',
    'C语言实验': 'from-green-600 to-green-700',
    '大学英语': 'from-blue-500 to-blue-600',
    '思想道德与法治': 'from-indigo-500 to-indigo-600',
    '中国近现代史纲要': 'from-purple-500 to-purple-600',
    '马克思主义基本原理': 'from-pink-500 to-pink-600',
    '毛泽东思想概论': 'from-rose-500 to-rose-600',
    '习近平新时代中国特色社会主义思想概论': 'from-red-600 to-rose-700',
    '体育': 'from-cyan-500 to-cyan-600',
    '军事理论': 'from-slate-500 to-slate-600',
    '心理健康教育': 'from-emerald-500 to-emerald-600',
    '形势与政策': 'from-teal-500 to-teal-600',
    '大学生职业规划': 'from-amber-500 to-amber-600',
    '创新创业基础': 'from-lime-500 to-lime-600',
    '计算机基础': 'from-sky-500 to-sky-600',
    '软件工程导论': 'from-violet-500 to-violet-600',
    '数据结构': 'from-fuchsia-500 to-fuchsia-600',
    'Web前端界面设计': 'from-blue-600 to-cyan-700',
    'linux/unix系统基础': 'from-slate-600 to-gray-700',
    '面向对象程序设计Ⅱ': 'from-purple-600 to-indigo-700',
    'Python程序设计': 'from-green-600 to-emerald-700',
    '工程案例与分析': 'from-orange-600 to-yellow-700',
    '软件需求分析': 'from-teal-600 to-cyan-700',
    '网络及其计算': 'from-indigo-600 to-blue-700',
    'Java语言程序设计': 'from-amber-600 to-orange-700',
    '心理健康与安全教育': 'from-pink-600 to-rose-700',
    '大学生创新创业与就业指导': 'from-lime-600 to-green-700',
    '网络及其计算实验': 'from-sky-600 to-blue-700',
    '面向对象程序设计Ⅱ实验': 'from-violet-600 to-purple-700',
    '安全教育（心理健康）': 'from-rose-600 to-pink-700',
    '默认': 'from-gray-500 to-gray-600'
  };

  // 获取课程颜色
  const getCourseColor = (courseName) => {
    return courseColors[courseName] || courseColors['默认'];
  };

  // 周次选择器
  const WeekSelector = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 shadow-lg">
        <button
          onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
          disabled={currentWeek <= 1}
          className="px-4 py-2 bg-white/20 text-white disabled:bg-gray-400/20 disabled:text-gray-300 hover:bg-white/30 transition-all text-sm font-medium"
        >
          ← 上一周
        </button>
        <span className="text-xl font-bold text-white px-4">第 {currentWeek} 周</span>
        <button
          onClick={() => setCurrentWeek(Math.min(16, currentWeek + 1))}
          disabled={currentWeek >= 16}
          className="px-4 py-2 bg-white/20 text-white disabled:bg-gray-400/20 disabled:text-gray-300 hover:bg-white/30 transition-all text-sm font-medium"
        >
          下一周 →
        </button>
      </div>
    </div>
  );

  // 检查是否应该合并为大课
  const getCourseInfo = (dayIndex, period) => {
    // 获取课程数据
    let course = getCourseForWeek(dayIndex, period, currentWeek);
    
    // 如果没有常规课程，检查特殊课程
    if (!course) {
      course = getSpecialCourses(dayIndex, period, currentWeek);
    }
    
    let shouldMerge = false;
    let isMainCell = false;
    let mergeHeight = 'h-12';
    
    // 周六特殊：6-7节为大课
    if (dayIndex === 5 && period === 6) {
      const course7 = getCourseForWeek(dayIndex, 7, currentWeek) || getSpecialCourses(dayIndex, 7, currentWeek);
      if (course && course7 && course.name === course7.name) {
        shouldMerge = true;
        isMainCell = true;
        mergeHeight = 'h-24';
      }
    } else if (dayIndex === 5 && period === 7) {
      const course6 = getCourseForWeek(dayIndex, 6, currentWeek) || getSpecialCourses(dayIndex, 6, currentWeek);
      if (course && course6 && course.name === course6.name) {
        shouldMerge = true;
        isMainCell = false;
      }
    }
    // 其他大课组合
    else if ([1, 3, 5, 7, 9].includes(period)) {
      const nextCourse = getCourseForWeek(dayIndex, period + 1, currentWeek) || getSpecialCourses(dayIndex, period + 1, currentWeek);
      if (course && nextCourse && course.name === nextCourse.name) {
        shouldMerge = true;
        isMainCell = true;
        mergeHeight = 'h-24';
      }
    } else if ([2, 4, 8, 10].includes(period)) {
      const prevCourse = getCourseForWeek(dayIndex, period - 1, currentWeek) || getSpecialCourses(dayIndex, period - 1, currentWeek);
      if (course && prevCourse && course.name === prevCourse.name) {
        shouldMerge = true;
        isMainCell = false;
      }
    } else if (period === 6 && dayIndex !== 5) {
      const prevCourse = getCourseForWeek(dayIndex, 5, currentWeek) || getSpecialCourses(dayIndex, 5, currentWeek);
      if (course && prevCourse && course.name === prevCourse.name) {
        shouldMerge = true;
        isMainCell = false;
      }
    }
    
    return {
      course,
      shouldMerge,
      isMainCell,
      mergeHeight
    };
  };

  // 课程格子组件
  const CourseCell = ({ courseInfo }) => {
    const { course, shouldMerge, isMainCell } = courseInfo;
    
    if (shouldMerge && !isMainCell) {
      return null;
    }
    
    if (!course) {
      return (
        <div className="course-cell w-full bg-slate-50 text-xs text-slate-400 transition-colors hover:bg-slate-100">
          <span className="hidden sm:inline">空闲</span>
        </div>
      );
    }

    // 获取课程颜色
    const colorClass = getCourseColor(course.name);

    // 对于大课
    if (shouldMerge && isMainCell) {
      return (
        <div className="relative course-cell w-full">
          <div className={`absolute inset-0 course-cell-large w-full bg-gradient-to-br ${colorClass} text-white overflow-hidden group transition-all hover:brightness-110 cursor-pointer z-10 flex flex-col justify-center items-center`}>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 text-center p-1 sm:p-2 w-full">
              <div className="font-bold text-xs sm:text-sm leading-tight mb-1 break-words">
                {course.name}
              </div>
              <div className="text-white/90 text-xs leading-tight break-words">
                {course.location}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 单节课
    return (
      <div className={`course-cell w-full bg-gradient-to-br ${colorClass} text-white relative overflow-hidden group transition-all hover:brightness-110 cursor-pointer`}>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative z-10 text-center p-1 sm:p-2 w-full">
          <div className="font-bold text-xs sm:text-sm leading-tight mb-1 break-words">
            {course.name}
          </div>
          <div className="text-white/90 text-xs leading-tight break-words">
            {course.location}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/20">
          <div className="p-4 sm:p-6">
            <WeekSelector />
            
            {/* 课程表主体 */}
            <div className="course-table overflow-x-auto scrollbar-hide">
              <div className="min-w-[700px] sm:min-w-[800px]">
                {/* 表头：星期和日期 */}
                <div className="grid grid-cols-8 bg-gradient-to-r from-slate-100 to-blue-100 overflow-hidden">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-slate-600 to-blue-700 text-white text-center font-bold text-xs sm:text-sm">
                    时间
                  </div>
                  {dayNames.map((day, index) => (
                    <div key={day} className="p-2 sm:p-3 text-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      <div className="font-bold text-xs sm:text-sm">{day}</div>
                      <div className="text-xs text-white/90 mt-1 hidden sm:block">{formatDate(weekDates[index])}</div>
                      <div className="text-xs text-white/90 mt-1 sm:hidden">{formatDate(weekDates[index]).replace('月', '/').replace('日', '')}</div>
                    </div>
                  ))}
                </div>

                {/* 课程表内容 */}
                <div className="bg-white overflow-hidden">
                  {timeSlots.map((slot, slotIndex) => {
                    const period = slot.period;
                    const isLastRow = slotIndex === timeSlots.length - 1;
                    
                    return (
                      <div key={period} className={`grid grid-cols-8 ${!isLastRow ? 'border-b border-slate-100' : ''}`}>
                        {/* 时间列 */}
                        <div className="course-cell bg-gradient-to-r from-slate-50 to-blue-50 border-r border-slate-100 text-center text-xs font-semibold text-slate-600">
                          <div className="mb-1">第{period}节</div>
                          <div className="text-slate-500 leading-tight">
                            <div className="hidden sm:block">{slot.time}</div>
                          </div>
                        </div>

                        {/* 每天的课程 */}
                        {dayNames.map((day, dayIndex) => {
                          const courseInfo = getCourseInfo(dayIndex, period);
                          const isLastCol = dayIndex === dayNames.length - 1;
                          
                          return (
                            <div 
                              key={dayIndex} 
                              className={`course-cell ${!isLastCol ? 'border-r border-slate-100' : ''}`}
                            >
                              <CourseCell courseInfo={courseInfo} />
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 说明文字 */}
            <div className="mt-6 sm:mt-8 text-center text-slate-400 text-xs sm:text-sm">
              <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                当前显示第 {currentWeek} 周课程安排 - 软件工程2317/2318班
              </p>
              <p className="mt-2 text-xs opacity-75 hidden sm:block">
                大课自动合并显示 | 数据实时更新 | 支持周次切换
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSheet;
