import React from 'react'
import ReactDOM from 'react-dom'
import Title from './Title'

test('Title components test', () => {
  ReactDOM.render(<Title title="Pets Love" />, document.getElementById('root'))
})
