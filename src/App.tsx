import React, { useState } from 'react';
import moment from 'moment';
import CalendarPicker from './components/CalendarPicker';
import InputDate from './components/InputDate';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [datePickerValue, setDatePickerValue] = useState<string>('')

  const handleDateSelect = (date: moment.Moment) => {
    setSelectedDate(date);
  };

  const handleDatePickerOnChange = (date: string) => {
    setDatePickerValue(date)
  }

  return (
    <div className="App bg-gray-50">
      <div className='max-w-4xl mx-auto md:px-6 px-4 md:py-8 py-4 bg-white min-h-screen'>
        <div className='w-full border-b mb-8 py-2'>
          <h1 className='md:text-4xl text-3xl font-bold'>Calendar Components</h1>
        </div>
        <div>
          <h2 className='md:text-3xl text-2xl font-semibold mb-3'>Calendar </h2>
          <CalendarPicker selectedDate={selectedDate} onDateSelect={handleDateSelect} />
          <div className='text-sm py-2'>Date Result: {selectedDate.format('YYYY-MM-DD')}</div>
          <h3 className='mt-5 mb-3 text-xl font-semibold'>Props:</h3>
          <div className='border-b pb-2 mb-4'>
            <div className='text-red-500 border bg-red-50 w-fit px-3 py-1 rounded-md font-medium mb-1'>selectedDate</div>
            <p>Initial selected date</p>
          </div>
          <div className='border-b pb-2 mb-4'>
            <div className='text-red-500 border bg-red-50 w-fit px-3 py-1 rounded-md font-medium mb-1'>onDateSelect</div>
            <p>Callback fired when picked new date.</p>
          </div>
        </div>

        <div className='mt-10'>
          <h2 className='md:text-3xl text-2xl font-semibold mb-3'>Date Picker </h2>
          <InputDate onChange={handleDatePickerOnChange} />
          {
            datePickerValue !== '' && <div className='text-sm py-2'>Date Result: {datePickerValue}</div>
          }
          <h3 className='mt-5 mb-3 text-xl font-semibold'>Props:</h3>
          <div className='border-b pb-2 mb-4'>
            <div className='text-red-500 border bg-red-50 w-fit px-3 py-1 rounded-md font-medium mb-1'>onChange</div>
            <p>Callback fired when input date changed.</p>
          </div>
        </div>

        {/* <InputDate /> */}
      </div>
    </div>
  );
};

export default App;
