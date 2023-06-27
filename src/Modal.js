import React from 'react'

import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundImage: 'url("https://images.unsplash.com/photo-1498522271744-cdd435c13f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2QlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  overflow: 'auto' 
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgb(0,0,0, .7)',
  zIndex: 1000
}

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div className='bg-light' style={MODAL_STYLES}>
        <button className='btn text-danger fs-4' style={{ marginLeft: "93%" }} onClick={onClose}>Close</button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}
