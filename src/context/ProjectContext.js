import { createContext, Component } from "react";
import React from "react";

const Context = createContext();
export class ProjectContext extends Component {
  state = {
    account:"",
    chainId:"",
    walletBalance:"",
    validatorList:[]
  };

  setAccount=(account)=>{
      console.log('account-------------------------', account)
      localStorage.removeItem('accounts')
      localStorage.setItem('accounts_context',account)
    this.setState({account})
  }
  setChainId=(chainId)=>{
    this.setState({chainId})
  }
  setWalletBalance=(walletBalance)=>{
    this.setState({walletBalance})
  }
  setValidators=(validatorList)=>{
    console.log('validatorList-------------------------', validatorList)
  this.setState({validatorList})
}
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          handleAccount: this.setAccount,
          handleChainId: this.setChainId,
          handleValidors: this.setValidators,
          handleWalletBalance: this.setWalletBalance,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
