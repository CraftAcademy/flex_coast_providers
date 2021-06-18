import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './styles/globals.css'
import Sidebar from './components/Sidebar'
import BrokerDashboard from './views/BrokerDashboard'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PhoneSidebar from './components/PhoneSidebar'
import LoginLandingPage from './components/LoginLandingPage'
import ErrorSnackbar from './components/ErrorSnackbar'
import Authentication from './modules/Authentication'
import SuccessSnackbar from './components/SuccessSnackbar'

const App = () => {
  const { authenticated } = useSelector((state) => state)
  const isSmall = useMediaQuery('(max-width:1280px)')

  useEffect(() => {
    Authentication.validateToken()
  }, [authenticated])

  return (
    <>
      <SuccessSnackbar />
      <ErrorSnackbar />
      {authenticated ? (
        <>
          {isSmall ? <PhoneSidebar /> : <Sidebar />}
          <BrokerDashboard />
        </>
      ) : (
        <LoginLandingPage />
      )}
    </>
  )
}

export default App
