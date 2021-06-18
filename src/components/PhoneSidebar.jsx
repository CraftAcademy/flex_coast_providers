import React, { useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MailIcon from '@material-ui/icons/Mail'
import SidebarIcon from './SidebarIcon'
import MenuIcon from '@material-ui/icons/Menu'
import logo from '../assets/logo_4.svg'
import AssessmentIcon from '@material-ui/icons/Assessment'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Authentication from '../modules/Authentication'

const PhoneSidebar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton className='menu-button' onClick={() => setOpen(!open)}>
        <MenuIcon fontSize='large' />
      </IconButton>
      <Drawer
        className='drawer'
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}>
        <img src={logo} alt='logo' />
        <List>
          <SidebarIcon text='Dashboard' to='/'>
            <MailIcon />
          </SidebarIcon>
          <SidebarIcon text='Analytics' to='/analytics'>
            <AssessmentIcon />
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
    </>
  )
}

export default PhoneSidebar
