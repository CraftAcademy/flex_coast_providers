import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import { useSelector } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import MailIcon from '@material-ui/icons/Mail'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Authentication from '../modules/Authentication'
import SidebarIcon from './SidebarIcon'
import { ReactComponent as ReactLogo } from '../assets/logo_4.svg'

const Sidebar = () => {
  const { name } = useSelector((state) => state)

  return (
    <Drawer className='drawer' variant='permanent'>
      <ReactLogo />
      <p>Welcome back</p>
      <p data-cy='broker-name'>{name}</p>
      <List>
        <SidebarIcon text='Dashboard'>
          <MailIcon />
        </SidebarIcon>
      </List>
      <Divider />
      <List>
        <SidebarIcon
          dataCy='logout-button'
          text='Log out'
          onClick={() => Authentication.signOut()}>
          <ExitToAppIcon />
        </SidebarIcon>
      </List>
    </Drawer>
  )
}

export default Sidebar
