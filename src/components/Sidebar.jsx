import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import MailIcon from '@material-ui/icons/Mail'
import SidebarIcon from './SidebarIcon'
import {ReactComponent as ReactLogo} from '../assets/logo_4.svg'

const Sidebar = () => {
  return (
    <Drawer className='drawer' variant='permanent'>
      <ReactLogo />
      {/* <img src={logo} alt='logo'/> */}
      <List>
        <SidebarIcon>
          <MailIcon />
        </SidebarIcon>
      </List>
      <Divider />
    </Drawer>
  )
}

export default Sidebar
