import React from 'react'
import './styles/globals.css'
import './styles/styles.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import BrokerDashboard from './views/BrokerDashboard'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const App = () => {
  const isSmall = useMediaQuery('(max-width:820px)')
  return (
    <>
      <Header />
      {!isSmall && <Sidebar />}
      <BrokerDashboard />
    </>
  )
}

export default App
