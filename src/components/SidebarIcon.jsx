import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'

const SidebarIcon = ({ children, text, onClick, dataCy, to = '' }) => {
  return (
    <Link to={to} className='menu-link'>
      <ListItem button key='Dashboard' onClick={onClick} data-cy={dataCy}>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  )
}

export default SidebarIcon
