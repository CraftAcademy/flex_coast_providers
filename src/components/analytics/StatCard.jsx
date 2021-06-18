import React from 'react'

const StatCard = ({ value, title, icon }) => {
  return (
    <div className='stat-card' data-cy='stat-card'>
      {icon}
      <div>
        <p>{title}</p>
        <h1>{value}</h1>
      </div>
    </div>
  )
}

export default StatCard
