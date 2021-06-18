import React, { useEffect } from 'react'
import WizardChart from '../components/analytics/WizardChart'
import Inquiries from '../modules/Inquiries'

const AnalyticsDashboard = () => {
  useEffect(() => {
    Inquiries.getAnalytics()
  }, [])

  return (
    <div className='analytics-container'>
      <WizardChart />
    </div>
  )
}

export default AnalyticsDashboard
