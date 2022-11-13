import React from 'react'
import Row from './row'

export const ModalHistoryView = (props: any) => {
  console.log('props', props)
  const { handleLoad, ...obj } = props
  return (
    <>
      <div className='modal-body grid grid-cols-12 gap-4 gap-y-3'>
        <Row {...obj} />
      </div>
      <div className='modal-footer text-right'>
        <button onClick={() => handleLoad()} type='button' className='btn btn-primary w-32'>
          Load
        </button>
      </div>
    </>
  )
}

export default ModalHistoryView
