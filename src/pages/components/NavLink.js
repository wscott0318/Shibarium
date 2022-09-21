/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";


const NavLink = ({ tab, index, handleActiveTab }) => {
  // console.log('tab.link', tab.link)

  const router = useRouter();

  return (
    <>
      <h1>
        navlinks
      </h1>
    </>
  );
};

export default NavLink;