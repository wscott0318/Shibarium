const SideNavTab=[
    {
      id:0,
      isActive:false,
      title:"Assets on Shibarium",
      icon:"../../assets/images/icons/assets.png",
      activeShapeImg:"../../assets/images/radius.png",
      link:"/balance",
    },
    {
      id:1,
      isActive:true,
      title:"Bridge",
      icon:"../../assets/images/icons/bridge.png",
      activeShapeImg:"../../assets/images/radius.png",
      link:"/dashboard"
    },
    {
      id:2,
      isActive:false,
      title:"Transactions",
      icon:"../../assets/images/icons/transfer.png",
      activeShapeImg:"../../assets/images/radius.png",
      link:"/transactions"
    },
    {
      id:3,
      isActive:false,
      title:"Shiba Burn",
      icon:"../../assets/images/icons/burn.png",
      activeShapeImg:"../../assets/images/radius.png",
      link:"/shibatoken"
    },
    {
      id:4,
      isActive:false,
      title:"Token swap",
      icon:"../../assets/images/icons/tokenswap.png",
      activeShapeImg:"../../assets/images/radius.png",
      link:"/different-chain-bridge"
    },
    {
      id:5,
      isActive:false,
        title:"Swap for gas token",
        icon:"../../assets/images/icons/gastoken.png",
        activeShapeImg:"../../assets/images/radius.png",
        link:"/gas-token"
      },
      {
        id:6,
      isActive:false,
        title:"Faucet",
        icon:"../../assets/images/icons/faucet.png",
        activeShapeImg:"../../assets/images/radius.png",
        link:"/faucet"
      },
      {
        id:7,
      isActive:false,
        title:"What’s New?",
        icon:"../../assets/images/icons/new.png",
        activeShapeImg:"../../assets/images/radius.png",
        link:"/whats-new"
      },
      {
        id:8,
      isActive:false,
        title:"Mainnet Wallet",
        icon:"../../assets/images/icons/wallet.png",
        activeShapeImg:"../../assets/images/radius.png",
        link:"#!"
      },
      {
        id:9,
      isActive:false,
        title:"Support",
        icon:"../../assets/images/icons/support.png",
        activeShapeImg:"../../assets/images/radius.png",
        link:"#!"
      },
      {
        id:10,
      isActive:false,
        title:"How it Works?",
        icon:"../../assets/images/icons/work.png",
        activeShapeImg:"../../assets/images/radius.png",
        link:"#!"
      },    

      {
        id:11,
      isActive:false,
        title:"FAQ",
        icon:"../../assets/images/icons/faq.png",
        activeShapeImg:"../../assets/images/radius.png",
        link:"#!"
      },
      {
        id:12,
      isActive:false,
        title:"User Guide",
        icon:"../../assets/images/icons/userguide.png",
        activeShapeImg:"../../assets/images/radius.png",
        link:"#!"
      }
  ]

  export const innerNavTab=[
    {
      id:0,
      title:"Overview",
      link:"/bone-staking",
      isActive:true
    },
    {
      id:1,
      title:"All Validators",
      link:"/all-validator",
      isActive:false
    },
    {
      id:2,
      title:"My Account",
      link:"/account",
      isActive:false
    }
  ]
  
  export const leftheaderTab=[
    {
      id:0,
      title:"Overview",
      link:"/become-validator",
      isActive:true
    },
    {
      id:1,
      title:"All Validators",
      link:"/all-validator",
      isActive:false
    },
  ]

  export default SideNavTab;