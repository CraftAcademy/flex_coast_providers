import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PhoneSidebar from './PhoneSidebar'

const Header = () => {
  const isSmall = useMediaQuery('(max-width:820px)')

  return (
    <div className='header'>
      {isSmall && <PhoneSidebar />}
      <h4>Flex Coast</h4>
    </div>
  )
}

export default Header
