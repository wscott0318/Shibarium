/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";

import { Button, Container, Nav, Navbar, NavDropdown, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
// @ts-ignore
import Popup from "../components/PopUp";
import { ChainId } from "shibarium-chains";
import Web3 from "web3";
import CommonModal, { CommonModalNew } from "../components/CommonModel";
import InnerHeader from "../inner-header";
// @ts-ignore
import Link from 'next/link'
import { useRouter } from "next/router";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import Sidebar from "../layout/sidebar"
import Web3Status from "app/components/Web3Status";
import { useActiveWeb3React } from "app/services/web3";
import { useEthBalance } from "../../hooks/useEthBalance";
import { useTokenBalance, getTokenBalance } from '../../hooks/useTokenBalance';
import { BONE_ID } from '../../config/constant';
import ERC20 from "../../ABI/ERC20Abi.json";
import fromExponential from "from-exponential";
import { useAppDispatch } from "../../state/hooks"
import { addTransaction, finalizeTransaction } from "../../state/transactions/actions"
import QrModal from "../components/QrModal";
import { getBoneUSDValue, getWalletTokenList } from "../../services/apis/validator/index";
import NumberFormat from 'react-number-format';
import { useSearchFilter } from "app/hooks/useSearchFilter";
import { dynamicChaining } from "../../web3/DynamicChaining";
import Pagination from 'app/components/Pagination';
// @ts-ignore
import { ShimmerTitle, ShimmerTable } from "react-shimmer-effects";
import DynamicShimmer from "app/components/Shimmer/DynamicShimmer";
import Router from "next/router";
import { getExplorerLink } from "app/functions";
import { currentGasPrice } from "web3/commonFunctions";
import * as Sentry from "@sentry/nextjs";
import Comingsoon from "app/components/coming-soon";

const sendInitialState = {
  step0: true,
  step1: false,
  step2: false,
  step3: false,
  showTokens: false
}

export const SortData = (a: any, b: any) => {
  return (a > b)
    ? 1 : ((b > a)
      ? -1 : 0);
}

export default function Wallet() {

  const router = useRouter()
  const { chainId = 1, account, library } = useActiveWeb3React();
  const id: any = chainId
  // console.log(dynamicChaining[id].BONE)

  const availBalance = chainId === ChainId.SHIBARIUM ? useEthBalance() : useTokenBalance(dynamicChaining[chainId].BONE);
  const lib: any = library
  const web3: any = new Web3(lib?.provider)
  const dispatch = useAppDispatch()

  const [listLoader, setListLoader] = useState(true)
  const [hashLink, setHashLink] = useState('')

  const [senderAddress, setSenderAdress] = useState('');
  const [userQrCode, setUserQrCode] = useState(false)
  const [isValidAddress, setIsValidAddress] = useState(false)
  const [sendAmount, setSendAmount] = useState('')
  const [senderModal, setSenderModal] = useState(false)
  const [verifyAmount, setVerifyAmount] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const [boneUSDValue, setBoneUSDValue] = useState(0);
  const [showSendModal, setSendModal] = useState(sendInitialState);
  const [menuState, setMenuState] = useState(false);
  const [tokenList, setTokenList] = useState<any>([]);
  const [tokenFilteredList, setTokenFilteredList] = useState<any>([]);
  const [tokenModalList, setTokenModalList] = useState<any>([]);
  const [selectedToken, setSelectedToken] = useState<any>({})
  const [searchKey, setSearchKey] = useState<string>('');
  const [modalKeyword, setmodalKeyword] = useState<string>('');
  const [nullAddress, setNullAddress] = useState(false)

  const searchResult = useSearchFilter(tokenList, searchKey.trim());

  useEffect(() => {
    if (tokenFilteredList.length) {
      let obj = tokenFilteredList.filter((x: any) => x.parentSymbol === 'BoneToken').map((y: any) => y)[0]
      setSelectedToken(obj)
    }
  }, [tokenFilteredList, tokenList])

  // console.log(selectedToken)

  const verifyAddress = (address: any) => {
    try {
      let result = Web3.utils.isAddress(address)
      setIsValidAddress(result)
      return result
    }
    catch (err: any) {
      Sentry.captureException("verifyAddress ", err);
    }
  }

  const getNetworkName = () => {
    try {
      if (chainId == 1) {
        return "Ethereum Mainnet"
      } else if (chainId == 5) {
        return "Goerli Testnet"
      } else {
        return "Shibarium Mainnet"
      }
    }
    catch (err: any) {
      Sentry.captureException("getNetworkName ", err);
    }
  }

  const getTokensList = () => {
    try {// console.log("token list called ==> ")
      setListLoader(true)
      getWalletTokenList().then(res => {
        let list = res.data.message.tokens
        // .sort((a: any, b: any) => {
        //   return (parseInt(b.balance) - parseInt(a.balance));
        // });
        list.forEach(async (x: any) => {
          x.balance = 0 //await getTokenBalance(lib, account, x.parentContract)
        })
        setTokenList(list)
        setTokenFilteredList(list)
        setTokenModalList(list)
        setListLoader(false)
      })
    }
    catch (err: any) {
      Sentry.captureException("getTokensList ", err);
    }
  }


  // console.log(tokenList)

  useEffect(() => {
    if (account) {
      getBoneUSDValue(BONE_ID).then(res => {
        setBoneUSDValue(res.data.data.price);
      })
      getTokensList()
    } else {
      router.push('/')
    }

  }, [account])




  const handleChange = (e: any) => {
    setNullAddress(true)
    setSenderAdress(e.target.value)
    const isValid = verifyAddress(e.target.value)
    // console.log(isValid)
  }


  const handleMenuState = () => {
    // console.log("called click")
    setMenuState(!menuState);
  }

  const handleSend = (e: any) => {
    try {
      e.preventDefault()
      // console.log("called handleSend")
      if (isValidAddress && sendAmount && senderAddress) {
        // console.log("called handleSend")
        setSendModal({
          step0: false,
          step1: false,
          step2: true,
          step3: false,
          showTokens: false
        })
      }
    }
    catch (err: any) {
      Sentry.captureException("handleSend ", err);
    }
  }
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [slicedTokenFilteredList, setSliceTokenFilteredList] = useState([]);

  useEffect(() => {
    if (tokenFilteredList.length) {
      const slicedList = tokenFilteredList.slice(0, pageSize);
      setSliceTokenFilteredList(slicedList);
    } else if (tokenFilteredList.length === 0) {
      setSliceTokenFilteredList([])
    } else {
      // console.log("check state")
    }

  }, [tokenFilteredList]);

  const pageChangeHandler = (index: number) => {
    try {
      const slicedList = tokenFilteredList.sort((a: any, b: any) => {
        return (b.balance - a.balance);
      }).slice(
        (index - 1) * pageSize,
        index * pageSize
      );
      setSliceTokenFilteredList(slicedList);
      setCurrentPage(index);
    } catch (err: any) {
      Sentry.captureException("pageChangeHandler ", err);
    }
  };

  const handleSearchList = (key: any, type: any = 'main') => {
    try {
      if (type === 'modal') {
        setmodalKeyword(key)
      } else {
        setSearchKey(key)
      }
      if (key.length) {
        let newData = tokenList.filter((name: any) => {
          return Object.values(name)
            .join(" ")
            .toLowerCase()
            .includes(key.toLowerCase());
        });
        if (type === 'modal') {
          setTokenModalList(newData)
        } else {
          setTokenFilteredList(newData)
          pageChangeHandler(currentPage);
        }
      } else {
        if (type === 'modal') {
          setTokenModalList(tokenList)
        } else {
          setTokenFilteredList(tokenList)
        }
      }
    }
    catch (err: any) {
      Sentry.captureException("handleSearchList ", err);
    }
  }

  // console.log(tokenList, tokenFilteredList, slicedTokenFilteredList)

  const submitTransaction = async () => {
    try {
      let user: any = account;
      let amount = web3.utils.toBN(fromExponential(+sendAmount * Math.pow(10, 18)));
      let instance = new web3.eth.Contract(ERC20, '0x5063b1215bbF268ab00a5F47cDeC0A4783c3Ab58');
      instance.methods.transfer(senderAddress, amount).send({ from: user })

      let gasFee = await instance.methods.transfer(senderAddress, amount).estimateGas({ from: user })
      let encodedAbi = await instance.methods.transfer(senderAddress, amount).encodeABI()
      let CurrentgasPrice: any = await currentGasPrice(web3)
      //  console.log((parseInt(gasFee) + 30000) * CurrentgasPrice, " valiuee ==> ")
      await web3.eth.sendTransaction({
        from: user,
        to: '0x5063b1215bbF268ab00a5F47cDeC0A4783c3Ab58',
        gas: (parseInt(gasFee) + 30000).toString(),
        gasPrice: CurrentgasPrice,
        // value : web3.utils.toHex(combinedFees),
        data: encodedAbi
      }).on('transactionHash', (res: any) => {
        // console.log(res, "hash")
        setTransactionHash(res)
        setSendModal({
          step0: false,
          step1: false,
          step2: false,
          step3: true,
          showTokens: false
        })
        dispatch(
          addTransaction({
            hash: res,
            from: user,
            chainId,
            summary: `${res}`,
          })
        )
        let link = getExplorerLink(chainId, res, 'transaction')
        setHashLink(link)
      }).on('receipt', (res: any) => {
        // console.log(res, "response")
        dispatch(
          finalizeTransaction({
            hash: res.transactionHash,
            chainId,
            receipt: {
              to: res.to,
              from: res.from,
              contractAddress: res.contractAddress,
              transactionIndex: res.transactionIndex,
              blockHash: res.blockHash,
              transactionHash: res.transactionHash,
              blockNumber: res.blockNumber,
              status: 1
            }
          })
        )
        setTokenFilteredList([])
        setTokenList([])
        getTokensList()
      }).on('error', (err: any) => {
        // console.log(err, "error")
        if (err.code === 4001) {
          setSenderModal(false)
          setSendModal(sendInitialState)
        }
      })
    }
    catch (err: any) {
      Sentry.captureException("submitTransaction ", err);
    }
  }


  // transactionCounts()

  const handleCloseModal = () => {
    setSenderModal(false)
    setVerifyAmount(false)
    setSendAmount('');
    setSenderAdress('')
    setSendModal(sendInitialState)
  }

  const handledropDown = (x: any) => {
    // console.log(x)
    setSelectedToken(x)
  }

  const handleSendAmount = () => {
    try {
      if (sendAmount > selectedToken.balance) {
        return true
      } else if (!sendAmount) {
        return true
      } else {
        return false
      }
    }
    catch (err: any) {
      Sentry.captureException("handleSendAmount ", err);
    }
  }
  const [sendToken, setSendToken] = useState('');

  const sendTokenWithRoute = async (x: any, type: any = "deposit") => {
    try {
      // console.log("Router data for send", x)
      localStorage.setItem("depositToken", JSON.stringify(x))
      localStorage.setItem("bridgeType", type)
      await Router.push(`/bridge`);
    }
    catch (err: any) {
      Sentry.captureException("sendTokenWithRoute ", err);
    }
  }


  // const cardShimmerEffects = (lines:any, gaps:any) => {
  //   return <ShimmerTitle line={lines} gap={gaps} variant="primary" />;
  // };

  return (
    <>
       <main className="main-content">
        <Sidebar
          handleMenuState={handleMenuState}
          onClickOutside={() => {
            setMenuState(false);
          }}
          menuState={menuState}
        />

        <section className="assets-section">
          <div className="cmn_dashbord_main_outr">
            <InnerHeader />
            <Comingsoon />
          </div>
        </section>
      </main>
    </>
  );
}