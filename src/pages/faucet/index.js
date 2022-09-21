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
      <h1>faucet</h1>
    </>
  );
}
