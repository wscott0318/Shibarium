import React from 'react';
import { Dropdown, Navbar, Container, Nav, ProgressBar } from 'react-bootstrap';
import { useRouter } from "next/router";

const Rewards = () => {
    return (
        <div className='wrapper'>
            {/* banner section start */}
            <header className='main-header lightbg'>
                <div className="container">
                    <nav className='nav justify-content-between align-items-center'>
                        <div className='left-widget'>
                            <a href='javascrip:void(0)' className="navbar-brand">
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
            <header className='bottom-header'>
                <Navbar expand="md" className="py-0">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-toggle" />
                        <Navbar.Collapse id="basic-navbar-nav header-row">
                            <ul className="me-auto navbar-nav header-row">
                                <li className="nav-item">
                                    <Nav.Link className="active" href="javascript:void(0)">Overview</Nav.Link>
                                </li>
                                <li className="nav-item">
                                    <Nav.Link href="javascript:void(0)">All Validators</Nav.Link>
                                </li>
                            </ul>
                            <ul className="ms-auto navbar-nav header-row">
                                <li className="nav-item">
                                    <Nav.Link href="javascript:void(0)">Reward Calculator</Nav.Link>
                                </li>
                                <li className="nav-item">
                                    <Nav.Link href="javascript:void(0)">Shiba Explorer</Nav.Link>
                                </li>
                                <li className="nav-item">
                                    <Nav.Link href="javascript:void(0)">FAQ</Nav.Link>
                                </li>
                            </ul>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <section className="banner-section  bg-grad py-4 py-md-5">
                <div className="container">
                    <h1 className="text-white trs-6 fw-500">Become a validator</h1>
                </div>
            </section>
            {/* banner section end */}

            <section className="rewards-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 validator-steps">
                            <ul className='step-vertical'>
                                <li className='step-list active completed'>
                                    <p className='black-color fw-700'>
                                        Setup Node
                                    </p>
                                    <div className='step-blk step-float'>
                                        <span className='fw-700 step-num'>1</span>
                                        <img className='img-fluid tick-img' src="../../assets/images/green-tick.png" alt="" width={20} />
                                    </div>
                                </li>
                                <li className='step-list active'>
                                    <p className='black-color fw-700'>
                                        Add Node Detail
                                    </p>
                                    <div className='step-blk step-float'>
                                        <span className='fw-700 step-num'>2</span>
                                        <img className='img-fluid tick-img' src="../../assets/images/green-tick.png" alt="" width={20} />
                                    </div>
                                </li>
                                <li className='step-list'>
                                    <p className='black-color fw-700'>
                                        Add Your Stake
                                    </p>
                                    <div className='step-blk step-float'>
                                        <span className='fw-700 step-num'>3</span>  
                                        <img className='img-fluid tick-img' src="../../assets/images/green-tick.png" alt="" width={20} />
                                    </div>
                                </li>
                                <li className='step-list'>
                                    <p className='black-color fw-700'>
                                        Completed
                                    </p>
                                    <div className='step-blk step-float'>
                                        <span className='fw-700 step-num'>4</span>
                                        <img className='img-fluid tick-img' src="../../assets/images/green-tick.png" alt="" width={20} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-8">
                            <div className="progress-tab d-none">
                                <h5 className='fw-800 mb-2'>Setup a node</h5>
                                <p className='fw-700 mb-0'>You can setup your node using any of the options from below</p>
                                <div className='box-alert top-space-lg'>
                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <div className='circle-box lt-warning me-3'><img className='img-fluid' width="26" height="30" src="../../assets/images/ansible.png" alt="" /></div>
                                        </div>
                                        <div className='trs-3'>
                                            <h6 className='fw-600'>Ansible</h6>
                                            <p className='ft-16 opacity fw-600'>Your Ansible playbooks for setting up Shiba Validator node</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='box-alert box-active mt-4'>
                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <div className='circle-box lt-white me-3'><img className='img-fluid' width="26" height="30" src="../../assets/images/binaries.png" alt="" /></div>
                                        </div>
                                        <div className='trs-3'>
                                            <h6 className='fw-600'>Ansible</h6>
                                            <p className='ft-16 opacity fw-600'>Your Ansible playbooks for setting up Shiba Validator node</p>
                                        </div>
                                    </div>
                                </div>
                                <p className='ft-16 fw-700 top-btm-spacelg'>
                                    Queries? If you face any trouble during installation or syncing, do share your queries in this <a href="javascript:void(0);" className='fw-700 link-color' title="" >forum</a> or on our <a href="javascript:void(0);" className='fw-700 link-color' title="">Validator Discord channcel.</a>
                                </p>
                            </div>
                            <div className="progress-tab">
                                <div className="mb-4 mb-xl-5">
                                    <h5 className='fwb'>Add node details</h5>
                                    <p>Please provide your node details for better recognizability</p>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 form-grid">
                                        <div className='form-group'>
                                            <label htmlFor="" className="form-label">Validator logo</label>
                                            <div className="file-wrap">
                                                <div className="file-icons">
                                                    <img src="../../assets/images/file-icon.png" alt="" className="img-fluid" width={22} />
                                                </div>
                                                <div className="file-input">
                                                    <input type="file" className="input-file" />
                                                    <a href="javascript:void(0)" className="form-control">Upload</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 form-grid">
                                        <div className='form-group'>
                                            <label htmlFor="" className="form-label">Validator name</label>
                                            <input type="text" className="form-control" placeholder='i.e Dark Knight Ventures' />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 form-grid">
                                        <div className='form-group'>
                                            <label htmlFor="" className="form-label">Website</label>
                                            <input type="text" className="form-control" placeholder='https://knightventures.com' />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 form-grid">
                                        <div className='form-group'>
                                            <label htmlFor="" className="form-label">Signer’s address</label>
                                            <input type="text" className="form-control" placeholder='01rwetk5y9d6a3d59w2m5l9u4x256xx' />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 form-grid">
                                        <div className='form-group'>
                                            <label htmlFor="" className="form-label">Signer’s Public key</label>
                                            <input type="text" className="form-control" placeholder='01rwetk5y9d6a3d59w2m5l9u4x256xx' />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 form-grid">
                                        <div className='form-group'>
                                            <label htmlFor="" className="form-label">Comission in %</label>
                                            <input type="text" className="form-control" placeholder='10' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='btn-wrap col-sm-3'>
                                <button type="button" class="btn warning-btn w-100"><span>save</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Rewards;
