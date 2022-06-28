/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Dropdown, Navbar, Container, Nav, ProgressBar } from 'react-bootstrap';
import { useRouter } from "next/router";
import InnerHeader from '../inner-header';

const Delegatorvalidator = () => {
    return (
        <div className='page-content'>
            <InnerHeader />
            <section className="banner-section  darkBg py-4 py-md-5">
                <div className="container">
                    <h1 className="text-white trs-6 fw-500">Delegator and Validator</h1>
                </div>
            </section>
            {/* banner section end */}

            {/* featurs section start */}
            <section className="shiba-features position-relative">
                <div className='floating-img'>
                    <img className='img-fluid' src="../../assets/images/bone-xsm.png" alt="bone-img" />
                </div>
                <div className="container">
                    <div className="row shiba-row mb-lg-5">
                        <div className="col-lg-8 shiba-col order-2 order-lg-1">
                            <h3 className='mb-4'>Delegator</h3>
                            <ul className="shiba-list mb-4 mb-lg-5">
                                <li className='shiba-list-item'>
                                    <p className="shiba-text mb-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text">
                                        Maecenas luctus velit non ipsum ultrices posuere.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text">
                                        Nam bibendum dui eu mi lobortis molestie.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text">
                                        Sed vel lorem quis arcu consequat accumsan.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text">
                                        Phasellus ornare arcu ac leo feugiat, ut fermentum neque cursus.
                                    </p>
                                </li>
                            </ul>
                            <p className='mb-0'>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters
                            </p>
                        </div>
                        <div className="col-lg-4 shiba-col order-1 order-lg-2">
                            <div className="shiba-img">
                                <img className='img-fluid' src="../../assets/images/shiba-col.png" alt="cus-image" />
                            </div>
                        </div>
                    </div>
                    <div className="row shiba-row">
                        <div className="col-lg-4 shiba-col">
                            <div className="shiba-img">
                                <img className='img-fluid' src="../../assets/images/shiba-col-2.png" alt="cus-image" />
                            </div>
                        </div>
                        <div className="col-lg-8 shiba-col">
                            <h3 className='mb-4'>Validator</h3>
                            <ul className="shiba-list mb-4 mb-lg-5">
                                <li className='shiba-list-item'>
                                    <p className="shiba-text mb-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text">
                                        Maecenas luctus velit non ipsum ultrices posuere.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text">
                                        Nam bibendum dui eu mi lobortis molestie.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text">
                                        Sed vel lorem quis arcu consequat accumsan.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text">
                                        Phasellus ornare arcu ac leo feugiat, ut fermentum neque cursus.
                                    </p>
                                </li>
                            </ul>
                            <p className='mb-0'>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* features section end */}

            {/* path section start */}
            <section className='path-section'>
                <div className="float-bottom-left">
                    <img className='img-fluid' src="../../assets/images/shape-left-btm.png" alt="shape-img" />
                </div>
                <div className="float-bottom-right">
                    <img className='img-fluid' src="../../assets/images/shape-right-bt.png" alt="shape-img" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 mx-auto text-center">
                            <h2 className='mb-4'>Do you need help to choose the best path?</h2>
                            <p>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* path section end  */}

        </div>
    );
}

export default Delegatorvalidator;
