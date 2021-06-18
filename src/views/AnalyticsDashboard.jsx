import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import WizardChart from '../components/analytics/WizardChart'
import StatCard from '../components/analytics/StatCard'
import Inquiries from '../modules/Inquiries'
import VisibilityIcon from '@material-ui/icons/Visibility'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback'

const AnalyticsDashboard = () => {
  const { analytics } = useSelector((state) => state)

  useEffect(() => {
    Inquiries.getAnalytics()
  }, [])

  return (
    <div className='analytics-container'>
      {analytics.visits ? (
        <>
          <div className='stat-container-1'>
            <StatCard
              value={analytics.visits?.total}
              title='Total site visits'
              icon={<VisibilityIcon />}
            />
            <StatCard
              value={analytics.events?.answers[9].value}
              title='Total amount of inquiries'
              icon={<QuestionAnswerIcon />}
            />
            <StatCard
              value={analytics.events?.calls}
              title='Total phone button clicks'
              icon={<PhoneCallbackIcon />}
            />
          </div>
          <div className='wizard-chart-container' data-cy='wizard-chart'>
            <h1>Questionnaire Flow (amount of hits)</h1>
            <WizardChart data={analytics.events?.answers} />
          </div>
        </>
      ) : (
        <h1 data-cy='analytics-error-message'>
          There were no analytics to be found. Let's hope we can dig them up
          later!
        </h1>
      )}
    </div>
  )
}

export default AnalyticsDashboard
