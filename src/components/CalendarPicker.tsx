import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Views from '../enum/view';
import { ChevronBtn } from './ChevronBtn';

interface CalendarPickerProps {
  selectedDate: moment.Moment;
  onDateSelect: (date: moment.Moment) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState<moment.Moment>(moment());
  const [currentYear, setCurrentYear] = useState(moment().year());
  const [view, setView] = useState<Views>(Views.Day);
  const [yearRange, setYearRange] = useState({ start: currentYear - 9, end: currentYear + 2 })

  const startOfMonth = currentMonth.clone().startOf('month');
  const endOfMonth = currentMonth.clone().endOf('month');
  const startDate = startOfMonth.clone().startOf('week');
  const endDate = endOfMonth.clone().endOf('week');

  const calendarDays: moment.Moment[] = [];
  const currentDay = startDate.clone();

  while (currentDay.isBefore(endDate)) {
    calendarDays.push(currentDay.clone());
    currentDay.add(1, 'day');
  }

  const isSelected = (date: moment.Moment) => {
    return date.isSame(selectedDate, 'day');
  };

  const nextMonth = () => {
    setCurrentMonth((currentMnt) => currentMnt.clone().add(1, 'month'));
  };

  const prevMonth = () => {
    setCurrentMonth((currentMnt) => currentMnt.clone().subtract(1, 'month'));
  };

  const nextYear = () => {
    setCurrentYear((currentYr) => currentYr + 1);
  };

  const prevYear = () => {
    setCurrentYear((currentYr) => currentYr - 1);
  };

  const arrayYear = (): number[] => {
    const step = 1;
    return Array.from(
      { length: (yearRange.end - yearRange.start) / step + 1 },
      (_value, index) => yearRange.start + index * step
    );
  }

  const nextArrayYear = () => {
    console.log(yearRange)
    setYearRange((currentYearRange) => ({ start: currentYearRange.end, end: currentYearRange.end + 11 }));
  };

  const prevArrayYear = () => {
    setYearRange((currentYearRange) => ({ start: currentYearRange.start - 11, end: currentYearRange.start }));
  };

  const handleChangeDate = (date: moment.Moment) => {
    onDateSelect(date)
  };

  const handleChangeView = () => {
    switch (view) {
      case Views.Day:
        setView(Views.Month);
        break;
      case Views.Month:
        setView(Views.Year);
        break;
      case Views.Year:
        setView(Views.Day);
        break;
    }
  }

  const handleChangeMonth = (month: number) => {
    setCurrentMonth(moment([currentYear, month - 1]));
    setView(Views.Day);
  }

  const handleChangeYear = (year: number) => {
    setCurrentYear(year)
    setView(Views.Month);
  }

  useEffect(() => {
    setCurrentMonth(selectedDate);
  }, [selectedDate]);

  return (
    <div className="calendar bg-white shadow rounded p-4">
      {
        Views.Day === view &&
        <>
          <div className="flex justify-between items-center mb-4">
            <ChevronBtn handleOnClick={prevMonth} right={false} />
            <h2 className="text-xl font-semibold hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer" onClick={handleChangeView}>
              {currentMonth.format('MMMM YYYY')}
            </h2>
            <ChevronBtn handleOnClick={nextMonth} />
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((date) => (
              <div key={date.toString()} className='p-2 flex justify-center'>
                <div
                  className={`
                              w-7 h-7 flex items-center justify-center rounded-full cursor-pointer hover:bg-red-100 hover:text-black
                              ${isSelected(date) ? 'bg-red-500 text-white' : (date.isSame(moment(), 'day') ? 'text-red-500' : null)} 
                              ${date.month() !== currentMonth.month() ? 'text-gray-400' : null}
                            `}
                  onClick={() => handleChangeDate(date)}
                >
                  {date.format('D')}
                </div>
              </div>

            ))}
          </div>
        </>
      }
      {
        Views.Month === view && <>
          <div className="flex justify-between items-center mb-4">
            <ChevronBtn handleOnClick={prevYear} right={false} />
            <h2 className="text-xl font-semibold hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer" onClick={handleChangeView}>
              {currentYear}
            </h2>
            <ChevronBtn handleOnClick={nextYear} />
          </div>
          <div className="grid grid-cols-4 gap-0">
            {moment.months().map((month) => (
              <div
                key={month}
                className={`md:px-4 px-2 py-5 text-center flex items-center justify-center`}
                onClick={() => { handleChangeMonth(Number(moment().month(month).format('M'))) }}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-100 hover:text-black
                ${(currentMonth.month() + 1 === Number(moment().month(month).format('M')) && currentYear === currentMonth.year()) ? 'bg-red-500 text-white' : null}`}
                >
                  {moment().month(month).format('MMM')}
                </div>
              </div>
            ))}
          </div>
        </>
      }
      {
        Views.Year === view && <>
          <div className="flex justify-between items-center mb-4">
            <ChevronBtn handleOnClick={prevArrayYear} right={false} />
            <h2 className="text-xl font-semibold hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer" onClick={handleChangeView}>
              {`${yearRange.start}-${yearRange.end}`}
            </h2>
            <ChevronBtn handleOnClick={nextArrayYear} />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {arrayYear().map((year) => (
              <div
                key={year}
                className={`md:px-4 px-2 py-4 text-center flex items-center justify-center`}
                onClick={() => { handleChangeYear(year) }}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-100 hover:text-black
              ${currentMonth.year() === year ? 'bg-red-500 text-white' : null}`}
                >
                  {year}
                </div>
              </div>
            ))}
          </div>
        </>
      }
    </div >
  );
};

export default CalendarPicker;
