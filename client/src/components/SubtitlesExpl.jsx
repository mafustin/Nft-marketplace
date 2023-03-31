import React from 'react'

const SubtitlesExpl = ({subtitle, explanation}) => {
  return (
    <div>
        <h2 className='font-medium text-xl px-1.5 py-0.5'>{subtitle}</h2>
        <h3 className='font-extralight px-1.5 py-1.5'>{explanation}</h3>
    </div>
    
  )
}

export default SubtitlesExpl