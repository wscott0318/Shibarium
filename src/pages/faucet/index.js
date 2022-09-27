/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Nav} from "react-bootstrap";
import DogTab from './dogTabfirst';
import DogTabfirst from './dogTabsecond';
import Footer from "../../pages/footer/index"

export default function faucet() {
  const [isTopdoG, setIsTopdoG] = useState(true);
  const [isPuppyDog, setIsPuppyDog] = useState(false);

  const handleTopdoG = () => {
      // console.log("handleTopdoG");
    setIsTopdoG(true);
    setIsPuppyDog(false);
  };
  const handlePuppyDog = () => {
      // console.log("handlePuppyDog");
    setIsTopdoG(false);
    setIsPuppyDog(true);
  };

  // console.log("isTopdoG",isTopdoG);
  // console.log("isPuppyDog",isPuppyDog);
  return (
    <>
    {/* Form section start */}
      <div className="">
        <div className="form-section">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <div className="block-wrap">
                <h1 className="head-md">Get Test Tokens</h1>
                <p className="top-botom-spc">This faucet transfers TestToken on Matic testnets and parent chain. Confirms details before submitting.</p>
                <form>
                  <div className="black-sel botom-spc">
                    <div className="cus-sel ms-0">
                      <select class="form-select" >
                        <option selected>Select Token</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <i className="arrow-down"></i>
                    </div>
                  </div>
                  <div className="botom-spc">
                    <div className="position-relative input-contain">
                      <input type="text" className="black-field w-100" placeholder="0.00" />
                      <a href="javascript:void(0);" className="orange-btn">Paste</a>
                    </div>
                  </div>
                  <div>
                    <button type="button" className="btn primary-btn w-100">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Form section end */}
    </>
  );
}
