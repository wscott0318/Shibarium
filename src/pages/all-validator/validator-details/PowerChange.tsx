import React from 'react';
import { Nav } from 'react-bootstrap';

interface Props{

}
const PowerChange:React.FC<Props> =()=> {
  return (
    <div>
         {/* voting tabs start , currently hide */}
         <div className="mb-4 table-data-tab my-lg-5">
                                    <div className="btn-nav">
                                        <Nav variant="pills" defaultActiveKey="/firts-tab">
                                            <Nav.Item>
                                                <Nav.Link className='active'><span className='trs-2'>Power Change</span></Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="link-1"><span className='trs-2'>Polygon</span></Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="disabled">
                                                    <span className='trs-2'>Transactions</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                </div>
                                {/* votign tabs end */}

                                <div className='py-3 table-data darkBg rad-10'>
                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round down'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc down-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>                                                <tr>
                                                    <td>
                                                        <div className='arrow-round down'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc down-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
    </div>
  )
}

export default PowerChange