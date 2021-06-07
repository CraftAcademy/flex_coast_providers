import React, { useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MailIcon from '@material-ui/icons/Mail'
import SidebarIcon from './SidebarIcon'
import MenuIcon from '@material-ui/icons/Menu'

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
        <SidebarIcon>
          <MailIcon />
        </SidebarIcon>
      </Drawer>
    </>
  )
}

export default PhoneSidebar
