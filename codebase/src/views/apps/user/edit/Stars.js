import React from 'react'
import { Star } from 'react-feather'
const Stars = ({ value, ChangeValue }) => {
  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((item, index) => {
        return (
          <Star
            key={`star${index}`}
            onClick={() => {
              ChangeValue(item)
            }}
            style={{ fill: index + 1 <= value ? '#7367f0' : '' }}
            color={index < value ? '#7367f0' : 'gray'}
          />
        )
      })}
    </div>
  )
}

export default Stars
