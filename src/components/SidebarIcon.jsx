import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const SidebarIcon = ({ children }) => {
  return (
    <ListItem button key='Dashboard'>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItem>
  )
}

export default SidebarIcon
