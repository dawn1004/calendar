import { FC } from 'react'

interface IProps {
  handleOnClick: () => void;
  right?: boolean;
}

export const ChevronBtn: FC<IProps> = ({ handleOnClick, right = true }) => {
  return (
    <button
      onClick={handleOnClick}
      className="hover:bg-gray-100 text-gray-700 font-bold py-2 md:px-4 px-2 rounded transition-all"
    >
      {
        right ?
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg> :
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
      }
    </button>
  )
}
