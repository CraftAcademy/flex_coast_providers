import React from 'react'
import './styles/globals.css'
import './styles/styles.css'
import Sidebar from './components/Sidebar'
import BrokerDashboard from './views/BrokerDashboard'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PhoneSidebar from './components/PhoneSidebar'

const App = () => {
  const isSmall = useMediaQuery('(max-width:820px)')
  return (
    <>
      {isSmall ? <PhoneSidebar /> : <Sidebar />}
      <BrokerDashboard />
    </>
  )
}

export default App
