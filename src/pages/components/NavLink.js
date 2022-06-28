/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";


const NavLink = ({ tab, index, handleActiveTab }) => {
  console.log('tab.link', tab.link)

  const router = useRouter();

  return (
    <li
      className={`nav-item ${tab&&tab.link==router.pathname ? "active" : ""}`}
      onClick={() => handleActiveTab(index)}
    >
      <div className="active-shape">
        <img
          className="img-fluid"
          src="../../assets/images/radius.png"
          alt=""
        />
      </div>
      <Link href={tab.link}>
        {tab.title == "Faucet" ||tab.title =="Shiba Burn"? (
          <a target="_blank" rel="noopener noreferrer" className="nav-link">
            <span className="nav-icon">
              <img
                className="img-fluid light-ico"
                src={tab.icon}
                alt="side-ico"
              />
            </span>
            <span>{tab.title}</span>
          </a>
        ) : (
          <a className="nav-link">
            <span className="nav-icon">
            <img className='img-fluid dark-ico' src={tab.icon} alt="" />
              <img
                className="img-fluid light-ico"
                src={tab.icon}
                alt="side-ico"
              />
            </span>
            <span>{tab.title}</span>
          </a>
        )}
      </Link>
    </li>
  );
};

export default NavLink;