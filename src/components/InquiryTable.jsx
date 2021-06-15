import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Inquiries from '../modules/Inquiries'
import InquiryRows from './InquiryRows'
import { dataQuery } from '../modules/TableServices'
import StatusFilter from './StatusFilter'

const InquiryTable = () => {
  const { inquiries } = useSelector((state) => state)
  const [sortDate, setSortDate] = useState(true)
  const [statusFilter, setStatusFilter] = useState({
    pending: true,
    started: true,
    done: false,
  })
  const isSmall = useMediaQuery('(max-width:600px)')

  useEffect(() => {
    Inquiries.index()
  }, [])

  const inquiryRows = dataQuery(
    inquiries,
    'inquiry_status',
    statusFilter,
    sortDate
  ).map((item) => {
    return <InquiryRows key={item.id} item={item} />
  })
  return (
    <TableContainer className='table' component={Paper} elevation={3}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Broker</TableCell>
            <TableCell>
              Inquiry date{' '}
              <IconButton onClick={() => setSortDate(!sortDate)}>
                {sortDate ? (
                  <ArrowDownwardIcon className='date-switch' />
                ) : (
                  <ArrowUpwardIcon className='date-switch' />
                )}
              </IconButton>
            </TableCell>
            {!isSmall && (
              <>
                <TableCell>Email</TableCell>
                <TableCell>
                  Status{' '}
                  <StatusFilter
                    status={statusFilter}
                    setStatus={setStatusFilter}
                  />
                </TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>{inquiryRows}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default InquiryTable
