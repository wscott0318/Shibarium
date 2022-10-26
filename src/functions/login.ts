import Moralis from "moralis/types";
import { AuthenticateOptions } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisAuth";

export const login = async (authenticate:(options?: AuthenticateOptions | undefined) => Promise<Moralis.User<Moralis.Attributes> | undefined>,isAuthenticated:boolean) => {
    if (!isAuthenticated) {

      // await authenticate({signingMessage: "Log in to Shibarium" })
      //   .then(function (user:any) {
      //      console.log("logged in user:", user);
      //     localStorage.setItem('isLoggedIn', 'true')
      //     // console.log(user!.get("ethAddress"));
      //   })
      //   .catch(function (error:any) {
      //     // console.log(error);
      //     localStorage.removeItem('isLoggedIn')
      //   });
    }
  }