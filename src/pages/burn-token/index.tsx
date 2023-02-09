import Link from "next/link";
import React from "react";

export default function BurnCrypto() {
 
    return (
      <>
        <main className="main-content">
  <div className="sidebar-toggle">
    <span className="menu-btn navbar-brand">
      <img className="img-fluid" src="../../assets/images/menu.png" alt=""/>
    </span>
    <div className="sidebar-logo">
      <a className="sidelogo-link" href="/home">
        <img className="img-fluid" src="../../assets/images/logo.png" alt=""/>
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
          <img className="img-fluid" src="../../assets/images/logo.png" alt=""/>
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
                <img className="img-fluid" src="../../assets/images/sidebar/faq.png" alt="side-icon"/>
              </span>
              <span>FAQs</span>
            </span>
          </button>
        </li>
        <li className="side-menu-item">
          <button className="side-link btn w-100">
            <span>
              <span className="side-ico">
                <img className="img-fluid" src="../../assets/images/sidebar/tools.png" alt="side-icon"/>
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
                      <a id="account-dropdown" aria-expanded="false" role="button" className="dropdown-toggle nav-link"  href="#"></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="burn-wrap">
        <div className="mb-3 mb-sm-4 mb-xxxl-5">
          <h3>Burn Bone Token</h3>
          <p className="lite-color">Trigger and watch BONE tokens get burned with EIP-1559</p>
        </div>
        <div className="cus-card border-radius-8 p-0">
            <div className="cus-card-head">
              <div  className="burn-top">
                <div  className="burn-step grey-btn btn-sm me-2 me-sm-3">Step 1</div>
                <div  className="burn-flex">
                  <div className="item-grp bs-fs lite-color">Initiate burn on</div>
                  <div className="item-grp burn-img">
                    <img className="img-fluid"  src="../../assets/images/Shib-Logo.png" alt="chain-logo" width={20}/>
                  </div>
                  <div className="item-grp bs-fs lite-color">Shibarium</div>
                </div>
              </div>
            </div>
            <div className="cus-card-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias sit aliquid magni, ad perferendis saepe ea harum praesentium numquam, asperiores, dolore suscipit a error porro provident consequatur tenetur repellendus? At atque amet ea quos ipsum assumenda, ipsam autem ullam commodi dolor maiores recusandae excepturi ipsa aliquid maxime numquam, dolore eos iusto praesentium. Amet reiciendis facere dolor, id consequuntur quos voluptate corporis magni a fugit consectetur ipsum doloremque molestias eveniet nulla ratione aspernatur. Enim, atque. Impedit soluta officiis asperiores sapiente quisquam iste incidunt est, tenetur nostrum voluptates? Consectetur, aspernatur quis obcaecati voluptatibus expedita sint magnam possimus nesciunt, quasi est necessitatibus ullam.
            </div>
        </div>
      </div>
    </div>
</main>
      </>
    );

}


