/* eslint-disable @next/next/link-passhref */
import React from "react";
import Link from "next/link";
import { Nav, NavDropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { useUserType } from "app/state/user/hooks";
import { UserType } from "app/enums/UserType";
import * as Sentry from "@sentry/nextjs";
const GlobleHeader = ({tab}) => {

    const router = useRouter();

    const [userType, setUserType] = useUserType();
    const handleActiveTab = (index) => {
      try{
        if(index === 3) {
          // console.log(index)
        } else {
          tab.filter((elm) => {
            if (elm.id == index) {
              elm.isActive = true;
            } else {
              elm.isActive = false;
            }
          });
        }
      }
      catch(err){
        Sentry.captureMessage("handleActiveTab ", err);
      }
      };

  return (
    <>
    <h1>GlobleHeader</h1>
    </>
  );
};

export default GlobleHeader