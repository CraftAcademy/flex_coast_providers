import React, { useState } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Collapse from '@material-ui/core/Collapse'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Inquiries from '../modules/Inquiries'
import { ReactComponent as HubSpotLogo } from '../assets/hubspot-1.svg'

const InquiryRows = ({ item, notes }) => {
  const [open, setOpen] = useState(false)
  const [noteInput, setNoteInput] = useState('')
  const isSmall = useMediaQuery('(max-width:600px)')
  const [inquiryStatus, setInquiryStatus] = useState(item.inquiry_status)

  const createNoteHandler = () => {
    Inquiries.createNote(item.id, noteInput, setNoteInput)
  }
  const statusHandler = (value) => {
    Inquiries.update(item.id, value, inquiryStatus, setInquiryStatus)
  }

  const exportHandler = () => {
    Inquiries.export(item.id)
  }

  return (
    <>
      <TableRow onClick={() => setOpen(!open)} hover data-cy='inquiry'>
        {item.broker ? (
          <TableCell data-cy='broker-header'>{item.broker.name}</TableCell>
        ) : (
          <TableCell>Not assigned</TableCell>
        )}
        <TableCell data-cy='inquiry-date'>{item.inquiry_date}</TableCell>
        {!isSmall && (
          <>
            <TableCell data-cy='email'>{item.email}</TableCell>
            <TableCell data-cy='inquiry status'>
              {item.inquiry_status}
            </TableCell>
          </>
        )}
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={5}
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
                  Office type:{' '}
                  <span>
                    {item.office_type === 'open_space'
                      ? 'Open space'
                      : item.office_type}
                  </span>
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
                  Locations:
                  {Array.isArray(item.locations) &&
                    item.locations.map((location, index) => (
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
                <p>
                  Status:
                  <span data-cy='inquiry-status'>{item.inquiry_status}</span>
                </p>
                {item.broker && (
                  <p>
                    Active broker:
                    <span data-cy='broker'>{item.broker.name}</span>
                  </p>
                )}
                <div className='status-buttons-container'>
                  <FormControl component='fieldset'>
                    <RadioGroup
                      name='status-action'
                      value={inquiryStatus}
                      onChange={(event) => statusHandler(event.target.value)}>
                      <FormControlLabel
                        data-cy='status-btn-1'
                        disabled={item.inquiry_status === 'done'}
                        checked={item.inquiry_status === 'pending'}
                        value='set_to_pending'
                        control={<Radio />}
                        label='Pending'
                      />
                      <FormControlLabel
                        data-cy='status-btn-2'
                        checked={item.inquiry_status === 'started'}
                        value='start'
                        control={<Radio />}
                        label='Started'
                      />
                      <FormControlLabel
                        data-cy='status-btn-3'
                        disabled={item.inquiry_status === 'pending'}
                        checked={item.inquiry_status === 'done'}
                        value='finish'
                        control={<Radio />}
                        label='Done'
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className='note-info-container'>
                <div className='notes-container'>
                  {notes.map((note) => {
                    return (
                      <div key={note.id}>
                        <p data-cy='note-meta' className='notes-meta'>
                          {note.date}, by:{' '}
                          {note.creator.name ? note.creator.name : note.creator}
                        </p>
                        <p data-cy='note' className='notes-text' key={note.id}>
                          {note.body}
                        </p>
                      </div>
                    )
                  })}
                </div>
                <textarea
                  className='notes-input'
                  value={noteInput}
                  type='text'
                  name='notes'
                  placeholder='Write a note'
                  data-cy='note-input'
                  onChange={(event) => setNoteInput(event.target.value)}
                />
                <div className='button-group'>
                  <button
                    className='notes-button'
                    data-cy='note-submit-btn'
                    onClick={() => createNoteHandler()}>
                    Create
                  </button>
                  <button
                    className='notes-button'
                    data-cy='export-button'
                    onClick={() => exportHandler()}>
                    <HubSpotLogo />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default InquiryRows
