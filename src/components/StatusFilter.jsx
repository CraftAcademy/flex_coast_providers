import React, { useState, useRef } from 'react'
import FilterListIcon from '@material-ui/icons/FilterList'
import Popover from '@material-ui/core/Popover'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'

const StatusFilter = ({ status, setStatus }) => {
  const [open, setOpen] = useState(false)
  const buttonEl = useRef(null)

  const handleStatusChange = (event) => {
    setStatus({ ...status, [event.target.name]: event.target.checked })
  }

  return (
    <>
      <IconButton ref={buttonEl} onClick={() => setOpen(true)}>
        <FilterListIcon />
      </IconButton>
      <Popover
        anchorEl={buttonEl.current}
        open={open}
        onClose={() => setOpen(false)}>
        <FormGroup className='status-popover'>
          <FormControlLabel
            control={
              <Checkbox
                checked={status.pending}
                onChange={handleStatusChange}
                name='pending'
              />
            }
            label='Pending'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={status.started}
                onChange={handleStatusChange}
                name='started'
              />
            }
            label='Started'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={status.done}
                onChange={handleStatusChange}
                name='done'
              />
            }
            label='Done'
          />
        </FormGroup>
      </Popover>
    </>
  )
}

export default StatusFilter
