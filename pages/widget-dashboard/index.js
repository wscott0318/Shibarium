import React from 'react'

export default function widgetDashboard() {
    return (
        <>
            <div className="wrapper">
                <header className='main-header lightbg'>
                    <div className="container">
                        <nav className='nav justify-content-between align-items-center'>
                            <div className='left-widget'>
                                <a href='./home' className="navbar-brand">
                                    <img className='img-fluid' src="../../assets/images/logo.png" alt="" />
                                    <img className='img-fluid d-none' src="../../assets/images/logo-white.png" alt="" />
                                </a>
                            </div>
                            <div className="right-widget">
                                <form action="" className='inline-form'>
                                    <a href="javascript:void(0)" className='btn warning-btn'>
                                        <span>Connect To A Wallet</span>
                                    </a>
                                </form>
                            </div>
                        </nav>
                    </div>
                </header>
                <div className="content-wrap">
                    <div className="dash-card">
                        <div className="row">
                            <div className="col-md-6 mb-4 mb-md-0">
                                <h6 className='fwb mb-4'>Your Widget</h6>
                                <a href="javascript:void(0)" className='file-control w-100 text-center'>
                                    <img src="../../assets/images/plus-btn.png" alt="add-img" className="img-fluid" width={13}/>
                                    <span>New</span>
                                </a>
                            </div>
                            <div className='col-md-6 mb-4 mb-md-0'>
                                <ul className='card-list'>
                                    <li className='card-list-item card-primary'>    
                                        <div className='card-icon'>
                                            <img className='img-fluid' src="../../assets/images/shiba-bg.png" alt=""  width={55}/>
                                        </div>
                                        <div className='card-content'>
                                            <span className='fw-600'>Get started</span>
                                            <p className='mb-0'>Connect your dapp with shiba widget</p>
                                        </div>
                                    </li>
                                    <li className='card-list-item card-blue'>    
                                        <div className='card-icon'>
                                            <img className='img-fluid' src="../../assets/images/play-btn.png" alt=""  width={55}/>
                                        </div>
                                        <div className='card-content'>
                                            <span className='fw-600'>Tutorial</span>
                                            <p className='mb-0'>How to create widgets?</p>
                                            <p className='mb-0'>Play Now <img className='img-fluid' src="../../assets/images/play-icon.png" alt="" width={10} /></p>
                                        </div>
                                    </li>
                                    <li className='card-list-item card-green'>    
                                        <div className='card-icon'>
                                            <img className='img-fluid' src="../../assets/images/help.png" alt="icon-img"  width={55}/>
                                        </div>
                                        <div className='card-content'>
                                            <span className='fw-600'>Get started</span>
                                            <p className='mb-0'>Connect your dapp with shiba widget</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
