import React from 'react'

export const ObjectValuesView = ({ values }) => {
  return (
    <div>
      {values &&
        Object.entries(values).map((entry) => {
          return (
            <div key={entry[0]}>
              <span style={{ fontWeight: 'bold' }}>
                {String(entry[0])}
                {': '}
              </span>

              <span>{String(entry[1])}</span>
            </div>
          )
        })}
    </div>
  )
}
