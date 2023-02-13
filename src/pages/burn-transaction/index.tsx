import Link from "next/link";
import React from "react";

export default function BurnTransactions() {

    return (
        <>
            <main className="main-content">
                <div className="sidebar-toggle">
                    <span className="menu-btn navbar-brand">
                        <img className="img-fluid" src="../../assets/images/menu.png" alt="" />
                    </span>
                    <div className="sidebar-logo">
                        <a className="sidelogo-link" href="/home">
                            <img className="img-fluid" src="../../assets/images/logo.png" alt="" />
                        </a>
                    </div>
                </div>
                <div className="sidebar">
                    <div className="sidbar-top-menu">
                        <div className="sidebar-logo">
                            <span className="close-icon" >
                                <img className="img-fluid" src="../../assets/images/close-icon.png" alt="close-icon" />
                            </span>
                            <a className="sidelogo-link" href="/home">
                                <img className="img-fluid" src="../../assets/images/logo.png" alt="" />
                            </a>
                        </div>
                        <ul className="side-menu">
                            <li className="side-menu-item">
                                <button className="side-link btn w-100">
                                    <span>
                                        <span className="side-ico">
                                            <img className="img-fluid" src="../../assets/images/sidebar/transaction.png" alt="side-icon" />
                                        </span>
                                        <span>Staking</span>
                                    </span>
                                </button>
                            </li>
                            <li className="side-menu-item">
                                <button className="side-link btn primary-btn w-100">
                                    <span>
                                        <span className="side-ico">
                                            <img className="img-fluid" src="../../assets/images/sidebar/wallet.png" alt="side-icon" />
                                        </span>
                                        <span>Wallet</span>
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebar-bottom-menu">
                        <ul className="side-menu">
                            <li className="side-menu-item">
                                <button className="side-link btn w-100">
                                    <span>
                                        <span className="side-ico">
                                            <img className="img-fluid" src="../../assets/images/sidebar/faq.png" alt="side-icon" />
                                        </span>
                                        <span>FAQs</span>
                                    </span>
                                </button>
                            </li>
                            <li className="side-menu-item">
                                <button className="side-link btn w-100">
                                    <span>
                                        <span className="side-ico">
                                            <img className="img-fluid" src="../../assets/images/sidebar/tools.png" alt="side-icon" />
                                        </span>
                                        <span>Faucet</span>
                                    </span>
                                </button>
                            </li>
                            <li className="side-menu-item">
                                <button className="side-link btn w-100">
                                    <span>
                                        <span className="side-ico">
                                            <img className="img-fluid" src="../../assets/images/sidebar/wallet.png" alt="side-icon" />
                                        </span>
                                        <span>Support</span>
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="cmn_dashbord_main_outr">
                    <header className="inner-header">
                        <nav className="py-0 navbar navbar-expand navbar-dark">
                            <div className="container">
                                <div className="left-widget"></div>
                                <button aria-controls="basic-navbar-nav" type="button" aria-label="Toggle navigation" className="navbar-toggler collapsed">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="navbar-collapse collapse" id="basic-navbar-nav">
                                    <div className="ms-auto align-items-center navbar-nav">
                                        <div className="shib-dropdown d-flex justify-content-center align-items-center">
                                            <div className="nav-item d-flex align-items-center cus-dd app-drop dropdown">
                                                <div className="dot-icon" id="basic-nav-dropdown">
                                                    <img src="../../assets/images/menu-icon.png" alt="" />
                                                </div>
                                                <div className="light-text dd-ico nav-item dropdown">
                                                    <a id="" aria-expanded="false" role="button" className="dropdown-toggle nav-link" href="#">Staking</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center cus_dropdown nav-item">
                                            <button>
                                                <a className="d-md-none swap-btn">
                                                    <img className="img-fluid" src="../../assets/images/switch-icon.png" alt="" width="30" />
                                                </a>
                                            </button>
                                            <div>
                                                <div className="form-select hd-sel hd-sel-over nav-item dropdown">
                                                    <a id="" aria-expanded="false" role="button" className="dropdown-toggle nav-link" href="#">Goerli Testnet</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-status nav-item">
                                            <div id="web3-status-connected" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-dark-1000 text-primary">
                                                <div className="flex items-center gap-2">
                                                    <div className="btn-fonts">0x993E...1D93</div>
                                                    <span>
                                                        <span>
                                                            <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20
																									xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2722%27%20height=%2722%27/%3e"  />
                                                        </span>
                                                        <img alt="shiba" src="https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,c_limit,w_48,q_auto/https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,c_limit,w_48,q_auto/https://www.shibatoken.com/images/shib-logo.svg" decoding="async" data-nimg="intrinsic" />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="nav-item d-flex align-items-center cus-dd mob-drop drop-cus dropdown">
                                                <div className="dot-icon" id="basic-nav-dropdown"></div>
                                                <div className="me-3 inner-header-dropwdown nav-item dropdown">
                                                    <a id="account-dropdown" aria-expanded="false" role="button" className="dropdown-toggle nav-link" href="#"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </header>

                    {/* burn content start */}
                    <div className="burn-wrap">
                        <div className="mb-3 mb-sm-4 mb-xxxl-5">
                            <h3>Transactions</h3>
                            <p className="lite-color">
                                Only Bridge (Deposit, Withdraw) transaction are included in transaction History
                            </p>
                        </div>
                        <ul className="nav cus-nav-pills nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-transaction-tab" data-bs-toggle="pill" data-bs-target="#pills-transaction" type="button" role="tab" aria-controls="pills-transaction" aria-selected="true">All Transaction</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-pending-tab" data-bs-toggle="pill" data-bs-target="#pills-pending" type="button" role="tab" aria-controls="pills-pending" aria-selected="false">Pending</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">

                            {/* all transaction tab start */}
                            <div className="tab-pane fade show active" id="pills-transaction" role="tabpanel" aria-labelledby="pills-transaction-tab" >
                                <div className="accordion cus-accordian" id="accordionExample">
                                    <div className="accordian-col">
                                        <h2>January 2020</h2>
                                        <div className="accordion-item">
                                            <div className="accordion-header" id="headingOne">
                                                <div className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
                                                    <div className="row">
                                                        <div className="col-sm-6 col-md-4">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordian-col">
                                        <h2>January 2020</h2>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Accordion Item #2
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordian-col">
                                        <h2>January 2020</h2>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Accordion Item #3
                                                </button>
                                            </h2>
                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* all transaction end */}

                            {/* Pending tab start */}
                            <div className="tab-pane fade" id="pills-pending" role="tabpanel" aria-labelledby="pills-pending-tab" >
                                Pending
                            </div>
                            {/* pending tab end */}

                        </div>
                    </div>
                    {/* burn content end */}
                </div>
            </main>
        </>
    );

}


