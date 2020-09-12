import React from 'react'

import './error.css'

export default class Error extends React.Component {


  render() {
    return(
      <div className='error-block'>
        <h1 className='error-title'>Ошибка</h1>
        <p className='error-description'>Ведден не корректный запрос</p>
      </div>
    )
  }
}