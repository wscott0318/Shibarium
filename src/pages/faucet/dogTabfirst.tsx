import { Dropdown } from "react-bootstrap";


function DogTab(){

    return(
        <>
            <div className="tab-content-wrap">
                      <div className="swap-area">
                        <div className="form-group">
                          <label htmlFor="" className="form-label fwb">
                            Select Token
                          </label>
                          <Dropdown className="cus-dropdown position-relative">
                            <i className="arrow down"></i>
                            <Dropdown.Toggle
                              id="dropdown-basic"
                              className="w-100 text-start"
                            >
                              <span>BONE Token</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="w-100">
                              <Dropdown.Item href="#/action-1">
                                Action
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                Another action
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                Something else
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="form-group">
                          <label htmlFor="" className="form-label fwb">
                            Wallet Address
                          </label>
                          <div className="swap-control swap-flex p-0">
                            <div className="swap-col full-col">
                              <input
                                type="text"
                                className="swap-input"
                                placeholder="0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                              />
                              <span className="primary-text over-text fw-600">
                                <span className="trs-2">Copy</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
        </>
    )
}
export default DogTab