import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import WizardChart from '../components/analytics/WizardChart'
import Inquiries from '../modules/Inquiries'

const AnalyticsDashboard = () => {
const {analytics} = useSelector(state => state)

  useEffect(() => {
    Inquiries.getAnalytics()
  }, [])

  return (
    <div className='analytics-container'>
      <WizardChart data={analytics.events?.answers} />
    </div>
  )
}

export default AnalyticsDashboard
