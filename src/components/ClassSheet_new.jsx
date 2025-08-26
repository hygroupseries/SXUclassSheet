import { useState } from 'react';
import { getCurrentWeek, getWeekDates, formatDate, timeSlots, courseGroups } from '../utils/dateUtils';

const ClassSheet = () => {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const weekDates = getWeekDates(currentWeek);
  const dayNames = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

  // 周次选择器
  const WeekSelector = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
          disabled={currentWeek <= 1}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
        >
          上一周
        </button>
        <span className="text-xl font-semibold">第 {currentWeek} 周</span>
        <button
          onClick={() => setCurrentWeek(Math.min(16, currentWeek + 1))}
          disabled={currentWeek >= 16}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
        >
          下一周
        </button>
      </div>
    </div>
  );

  // 课程格子组件
  const CourseCell = ({ course, periods }) => {
    if (!course) {
      // 没有课程时，显示两个小方框
      return (
        <div className="flex flex-col gap-1 h-24">
          {periods.map(period => (
            <div
              key={period}
              className="flex-1 border border-gray-200 bg-gray-50 rounded flex items-center justify-center text-xs text-gray-400"
            >
              空闲
            </div>
          ))}
        </div>
      );
    }

    // 有课程时，显示一个大方框
    return (
      <div className="h-24 bg-blue-100 border-2 border-blue-300 rounded-lg p-2 flex flex-col justify-center items-center text-sm">
        <div className="font-semibold text-blue-800 text-center mb-1">
          {course.name}
        </div>
        <div className="text-blue-600 text-xs text-center">
          {course.location}
        </div>
      </div>
    );
  };

  // 模拟课程数据（等待用户提供真实数据）
  const mockCourses = {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <WeekSelector />
        
        {/* 课程表主体 */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* 表头：星期和日期 */}
            <div className="grid grid-cols-8 gap-2 mb-4">
              <div className="p-3 bg-gray-100 rounded text-center font-semibold">
                时间
              </div>
              {dayNames.map((day, index) => (
                <div key={day} className="p-3 bg-blue-50 rounded text-center">
                  <div className="font-semibold text-blue-800">{day}</div>
                  <div className="text-sm text-blue-600">{formatDate(weekDates[index])}</div>
                </div>
              ))}
            </div>

            {/* 课程表内容 */}
            <div className="space-y-2">
              {/* 遍历课程分组 */}
              {courseGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="grid grid-cols-8 gap-2">
                  {/* 时间列 */}
                  <div className="bg-gray-50 border rounded p-2 flex flex-col justify-center h-24">
                    <div className="text-sm font-medium text-center">
                      {group.label}
                    </div>
                    <div className="text-xs text-gray-600 text-center mt-1">
                      {group.periods.map(period => timeSlots[period - 1]?.time).join(' ~ ')}
                    </div>
                  </div>

                  {/* 每天的课程 */}
                  {dayNames.map((day, dayIndex) => {
                    // 周六特殊处理：6-7节为大课
                    if (dayIndex === 5 && group.label === '7-8节') {
                      // 周六没有7-8节，显示空白
                      return (
                        <div key={dayIndex} className="h-24 border border-gray-200 bg-gray-100 rounded opacity-50">
                        </div>
                      );
                    }

                    const courseKey = `${dayIndex}-${group.periods.join('-')}`;
                    const course = mockCourses[courseKey];

                    return (
                      <div key={dayIndex}>
                        <CourseCell 
                          course={course} 
                          periods={group.periods}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* 特殊处理周六的6-7节 */}
              <div className="grid grid-cols-8 gap-2">
                <div className="bg-gray-50 border rounded p-2 flex flex-col justify-center h-24">
                  <div className="text-sm font-medium text-center">
                    6-7节
                  </div>
                  <div className="text-xs text-gray-600 text-center mt-1">
                    15:30~17:30
                  </div>
                </div>

                {/* 前5天空白 */}
                {[0, 1, 2, 3, 4].map(index => (
                  <div key={index} className="h-24 border border-gray-200 bg-gray-100 rounded opacity-50">
                  </div>
                ))}

                {/* 周六的6-7节 */}
                <div>
                  <CourseCell 
                    course={mockCourses['5-6-7']} 
                    periods={[6, 7]}
                  />
                </div>

                {/* 周日空白 */}
                <div className="h-24 border border-gray-200 bg-gray-100 rounded opacity-50">
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 说明文字 */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>课程数据待添加 - 当前显示第 {currentWeek} 周课程安排</p>
        </div>
      </div>
    </div>
  );
};

export default ClassSheet;
