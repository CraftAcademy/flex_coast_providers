import React, { useState } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Collapse from '@material-ui/core/Collapse'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Divider } from '@material-ui/core'

const InquiryRows = ({ item }) => {
  const [open, setOpen] = useState(false)
  const isSmall = useMediaQuery('(max-width:600px)')

  return (
    <>
      <TableRow onClick={() => setOpen(!open)} hover data-cy='inquiry'>
        <TableCell data-cy='company'>{item.company}</TableCell>
        <TableCell data-cy='inquiry-date'>{item.inquiry_date}</TableCell>
        {!isSmall && (
          <>
            <TableCell data-cy='email'>{item.email}</TableCell>
            <TableCell data-cy='start-date'>{item.start_date}</TableCell>
          </>
        )}
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={4}
          className='collapsible-cell'
          data-cy='inquiry-collapsible-cell'>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <h4>Overview of {item.company}</h4>
            <div className='wrapper'>
              <div className='info-container'>
                <p data-cy='size'>
                  Amount of employees: <span>{item.size}</span>
                </p>
                <p data-cy='office-type'>
                  Office type: <span>{item.office_type}</span>
                </p>
                <p data-cy='peers'>
                  Would like to sit with peers:
                  <span>{item.peers ? 'yes' : 'no'}</span>
                </p>
                <p data-cy='flexible'>
                  Flexible or fulltime:
                  <span>{item.flexible ? 'flexible' : 'full time'}</span>
                </p>
                <p data-cy='locations'>
                  Locations:{' '}
                  {item.locations.map((location, index) => (
                    <div key={index}>
                      <span>{location}</span>
                      <br />
                    </div>
                  ))}
                </p>
                <p data-cy='phone'>
                  Phone number: <span>{item.phone}</span>
                </p>
                {isSmall && (
                  <>
                    <p data-cy='email'>
                      Email: <span>{item.email}</span>
                    </p>
                    <p data-cy='start-date'>
                      Start date: <span>{item.start_date}</span>
                    </p>
                  </>
                )}
              </div>
              <div className='notes-container'>Notes placeholder</div>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default InquiryRows
