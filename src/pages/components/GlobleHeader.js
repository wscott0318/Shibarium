/* eslint-disable @next/next/link-passhref */
import React from "react";
import Link from "next/link";
import { Nav, NavDropdown } from "react-bootstrap";
import { useRouter } from "next/router";

const GlobleHeader = ({tab}) => {

    const router = useRouter();

  
    const handleActiveTab = (index) => {
      if(index === 3) {
        console.log(index)
      } else {
        tab.filter((elm) => {
          if (elm.id == index) {
            elm.isActive = true;
          } else {
            elm.isActive = false;
          }
        });
      }
      };

  return (
    <>
      <ul className="me-auto navbar-nav header-row">
        {tab&&tab.map((t, index) => {
          return (
            <li
              className={`nav-item active`}
              key={index}
              onClick={() => handleActiveTab(index)}
            >
              <Link href={`${t.link}`}>
                <Nav.Link
                  href={`${t.link}`}
                  className={`${router.pathname.startsWith(t.link) ? "active" : ""}`}
                >
                  {t.title}
                </Nav.Link>
              </Link>
            </li>
          );
        })}
        <li className="dark-dd">
          <NavDropdown
            title='History'
            id=""
          >
            <NavDropdown.Item
              className="px-2"
            >
            <Link href="/unbond-history">
                <span className="light-text">Unbound</span>
                </Link>
            </NavDropdown.Item>
            <NavDropdown.Item
              className="px-2"
            ><Link href="/reward-history">
                <span className="light-text">Withdrawal</span>
                </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </li>
      </ul>
    </>
  );
};

export default GlobleHeader