import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const SidebarIcon = ({ children, text, onClick, dataCy }) => {
  return (
    <ListItem button key='Dashboard' onClick={onClick} data-cy={dataCy}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

export default SidebarIcon
