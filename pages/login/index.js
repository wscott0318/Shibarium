import React from 'react'

export default function login() {
  return (
    <>
      <header className='main-header'>
        <div className="container">
          <nav className='nav justify-content-between align-items-center'>
            <div className='left-widget'>
              <a href='javascrip:void(0)' className="navbar-brand">
                <img className='img-fluid d-none' src="../../assets/images/logo.png" alt="" />
                <img className='img-fluid' src="../../assets/images/logo-white.png" alt="" />
              </a>
            </div>
          </nav>
        </div>
      </header>
      <main className="wrapper pt-0">
        <div className='login-wrap'>
          <div className='float-shib'>
            <img className='img-fluid' src="../../assets/images/shi-left.png" alt="" />
          </div>
          <div className='main-content'>
              <div className="login-data w-100">
                <h1 className='hdr-before mb-4'>Login</h1>
                <div className='row login-row'>
                  <div className="col-sm-6 login-col">
                      <a className='card-100 card-link text-center' href="javascript:void(0)">
                        <div className='arrow-icon'>
                          <img className='img-fluid' src="../../assets/images/arrow-right.png" alt="arrow-icons" />
                        </div>
                        <div className='image-wrap mb-3'>
                          <img className='img-fluid' src="../../assets/images/metamask.png" alt="meta-mask" />
                        </div>
                        <h5 className='fwb'>Metamask</h5>
                        <p className='mb-0'>
                          Connect using browser wallet
                        </p>
                      </a>
                  </div>
                  {/* <div className="col-sm-6 login-col">
                      <a className='card-100 card-link text-center' href="javascript:void(0)">
                        <div className='arrow-icon'>
                          <img className='img-fluid' src="../../assets/images/arrow-right.png" alt="arrow-icons" />
                        </div>
                        <div className='image-wrap mb-3'>
                          <img className='img-fluid' src="../../assets/images/coin-base.png" alt="meta-mask" />
                        </div>
                        <h5 className='fwb'>Coinbase Wallet</h5>
                        <p className='mb-0'>
                          Connect using Coinbase wallet
                        </p>
                      </a>
                  </div>
                  <div className="col-sm-6 login-col">
                      <a className='card-100 card-link text-center' href="javascript:void(0)">
                        <div className='arrow-icon'>
                          <img className='img-fluid' src="../../assets/images/arrow-right.png" alt="arrow-icons" />
                        </div>
                        <div className='image-wrap mb-3'>
                          <img className='img-fluid' src="../../assets/images/bitski.png" alt="meta-mask" />
                        </div>
                        <h5 className='fwb'>Bitski Wallet</h5>
                        <p className='mb-0'>
                          Connect using Bitski wallet
                        </p>
                      </a>
                  </div>
                  <div className="col-sm-6 login-col">
                      <a className='card-100 card-link text-center' href="javascript:void(0)">
                        <div className='arrow-icon'>
                          <img className='img-fluid' src="../../assets/images/arrow-right.png" alt="arrow-icons" />
                        </div>
                        <div className='image-wrap mb-3'>
                          <img className='img-fluid' src="../../assets/images/venly.png" alt="meta-mask" />
                        </div>
                        <h5 className='fwb'>Venly</h5>
                        <p className='mb-0'>
                          Connect using Venly wallet
                        </p>
                      </a>
                  </div>
                  <div className="col-sm-6 login-col">
                      <a className='card-100 card-link text-center' href="javascript:void(0)">
                        <div className='arrow-icon'>
                          <img className='img-fluid' src="../../assets/images/arrow-right.png" alt="arrow-icons" />
                        </div>
                        <div className='image-wrap mb-3'>
                          <img className='img-fluid' src="../../assets/images/wallet-connect.png" alt="meta-mask" />
                        </div>
                        <h5 className='fwb'>WalletConnect</h5>
                        <p className='mb-0'>
                          WalletConnect
                        </p>
                      </a>
                  </div> */}
                  <div className="col-sm-6 login-col dwnld_optn">
                      <a className='card-100 card-link text-center d-flex justify-content-center align-items-center' href="javascript:void(0)">
                        <div className='arrow-icon'>
                          <img className='img-fluid' src="../../assets/images/arrow-right-white.png" alt="arrow-icons" />
                        </div>
                        <div>
                        <h5 className='fwb'>Don't have wallet?</h5>
                        <p className='mb-0'>
                          Download here.
                        </p>
                        </div>
                      </a>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </main>
    </>
  )
}
