import React from 'react'

import './location-block.css'
import DateBlock from './date-block/date-block'
import TimeBlock from './time-block/time-block'

export default class LocationBlock extends React.Component {
  render() {

    const {city, country, language, timezone} = this.props

    return (
      <div className='location-block'>
        <h1 className='city'>{city}</h1>
        <p className='country'>{country}</p>
        <DateBlock language={language} />
        <TimeBlock timezone={timezone} />
      </div>
    )
  }
}

  