/* eslint-disable @next/next/link-passhref */
import React from "react";
import Link from "next/link";
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";

const GlobleHeader = ({tab}) => {

    const router = useRouter();

  
    const handleActiveTab = (index) => {
        tab.filter((elm) => {
          if (elm.id == index) {
            elm.isActive = true;
          } else {
            elm.isActive = false;
          }
        });
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
      </ul>
    </>
  );
};

export default GlobleHeader