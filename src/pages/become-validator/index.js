/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";

import Link from "next/link";

import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';

const Rewards = () => {
  const refName = useRef();
  const refWebsite = useRef();
  const refComission = useRef();
  const [activInput, setActivInput] = useState({
    name: false,
    website: false,
    comission: false,
  });



  const handleEdit = (value) => {
    switch (value) {
      case "name":
        setActivInput((activInput) => ({
          ...activInput,
          name: !activInput.name,
          website: false,
          comission: false,
        }));
        break;
      case "website":
        setActivInput((activInput) => ({
          ...activInput,
          name: false,
          website: !activInput.website,
          comission: false,
        }));
        break;
      case "comission":
        setActivInput((activInput) => ({
          ...activInput,
          name: false,
          website: false,
          comission: !activInput.comission,
        }));
        break;
      default:
        break;
    }
  };
  return (
    <>

      <h1>become-validator index.js</h1>
    </>
  );
};

export default Rewards;
