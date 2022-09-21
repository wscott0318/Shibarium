/* eslint-disable @next/next/no-img-element */
import { UserType } from 'app/enums/UserType';
import { useUserType } from 'app/state/user/hooks';
import Link from 'next/link';
import React, { useState } from 'react'
import NumberFormat from 'react-number-format';
import DelegatePopup from '../../delegate-popup';

export default function ValidatorGrid({ validatorsList, searchKey }: { validatorsList: any, searchKey: any }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [userType, setUserType] = useUserType()
    return (
       <>
       <h1>all-validator gridView</h1>
       </>
    )
}
