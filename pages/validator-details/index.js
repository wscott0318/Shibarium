import React from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import InnerHeader from '../inner-header';

export default function validatorDetails() {
  return (
    <>
        <div className='page-content'>
            <InnerHeader />
            <section className='banner-section darkBg py-4 py-lg-5'>
                <div className="container">
                <div className="row">
                    <div className="col-sm-5 col-lg-4">
                        <div className="shib-card card text-center">
                            <div className='image-wrap'>
                                <img className='img-fluid' src="../../assets/images/fundbaron.png" alt="fundborn-img" width={135} />
                            </div>
                            <h4 className='py-2 mt-2'><span className='trs-3 primary-text'>FUNDBaron</span></h4>
                            <p className='d-flex align-items-center justify-content-center'>
                                <span className='me-2 trs-3'>49962E94F099AFA4 </span>
                                <div className="tick-round">
                                <img className='img-fluid' src="../../assets/images/light-tick.png" alt="tick-ico" width={10} />
                                </div>
                            </p>
                            <p className='mb-0'>
                                100% FUND reward and 100% xFUND reward for all delegators.
                            </p>
                        </div>
                    </div>
                    <div className='col-sm-7 col-lg-8'>
                        <div className="cus-panel">
                            <div className="panel-header">
                                <h4 className='mb-0'>Validator Info</h4>
                                <div className='badge-md success-bg'>
                                    active
                                </div>
                            </div>
                            <div className="panel-body">

                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div className='row-check'>
                    <div className="row-col">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam nihil fugiat itaque voluptatum corrupti a totam laborum eius ipsa dolore numquam voluptate incidunt exercitationem ex aperiam autem minus est delectus quisquam odit, nemo nobis alias. Voluptas reiciendis beatae nemo aliquid impedit voluptatum natus itaque suscipit ex minima deleniti recusandae reprehenderit, minus magni dignissimos explicabo sed? Voluptatibus, aliquid iure autem atque nostrum cupiditate odit quasi fugit! Odio quaerat fuga earum dolorum possimus vero nostrum ducimus in qui. Labore mollitia velit nihil, sunt illo, repellat facere vitae laudantium provident eius quam quos laborum facilis voluptatum molestias? Vero doloremque nemo atque similique ipsa?
                    </div>
                    <div className="row-col">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, ipsa. Et officia enim exercitationem aliquam eligendi commodi. Nihil placeat dolore, nulla eius asperiores sunt tempora vero illum ipsam consequuntur voluptas quia ratione cum eos magni reprehenderit explicabo consectetur, inventore perferendis quis, corrupti saepe. Quae dolorum voluptates id sunt ipsa libero?
                    </div>
                    <div className="row-col">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste maxime vero quis aliquid unde corrupti maiores? Temporibus nesciunt corporis ducimus facilis perferendis, dignissimos officia quasi maiores dicta! Saepe, asperiores aut!
                    </div>
                </div>
            </section>
        </div>
    </>
  )
}
