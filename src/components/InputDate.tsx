import React, { FC, useEffect, useState } from 'react'
import '../InputDate.css'
import CalendarPicker from './CalendarPicker';
import moment from 'moment';
import { useIsMount } from '../hooks/UseIsMount';

interface IProps {
  onChange: (date: string) => void;
}

const InputDate: FC<IProps> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [inputValue, setInuputValue] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const isMount = useIsMount();

  useEffect(() => {
    if (!isMount) {
      setInuputValue(selectedDate.format('YYYY-MM-DD'))
      onChange(selectedDate.format('YYYY-MM-DD'))
      setVisible(false)
    }
  }, [selectedDate])

  const handleDateSelect = (date: moment.Moment) => {
    setSelectedDate(date);
  };
  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInuputValue(e.target.value)
    setSelectedDate(moment(e.target.value))
    onChange(e.target.value)
  }
  return (
    <>
      <div className='flex border w-fit p-1 px-3'>
        <input type="date" className='outline-0' value={inputValue} onChange={handleInputOnChange} onFocus={() => { setVisible(false) }} />
        <div className='p-1 hover:bg-gray-100 rounded-md cursor-pointer' onClick={() => { setVisible(true) }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
          </svg>
        </div>
      </div>
      {
        visible && <div className='max-w-md'>
          <CalendarPicker selectedDate={selectedDate} onDateSelect={handleDateSelect} />
        </div>
      }
    </>
  )
}

export default InputDate