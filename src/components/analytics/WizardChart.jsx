import React from 'react'
import { FunnelChart, Tooltip, Funnel, LabelList } from 'recharts'

const WizardChart = () => {
  return (
    <FunnelChart width={730} height={250}>
      <Tooltip />
      {/* <Funnel dataKey='value' data={data} isAnimationActive>
        <LabelList position='right' fill='#000' stroke='none' dataKey='name' />
      </Funnel> */}
    </FunnelChart>
  )
}

export default WizardChart
