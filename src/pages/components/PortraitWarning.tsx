import React from 'react'

function PortraitWarning() {
  return (
    <div className='text-center'>
        <div style={{display:'flex', justifyContent:'center', marginTop: 80}} >
            <img src="../../images/portrait.png" alt="" style={{height:250}} />
        </div>
        <h5>Rotate your device</h5>
        <p>Shibarium dose not support landscape view on mobile devices.</p>
    </div>
  )
}

export default PortraitWarning