import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import { useSelector } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import MailIcon from '@material-ui/icons/Mail'
import SidebarIcon from './SidebarIcon'
import { ReactComponent as ReactLogo } from '../assets/logo_4.svg'

const Sidebar = () => {
  const { name } = useSelector((state) => state)

  return (
    <Drawer className='drawer' variant='permanent'>
      <ReactLogo />
      {/* <img src={logo} alt='logo'/> */}
      <p>Welcome back</p>
      <p data-cy='broker-name'>{name}</p>
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
