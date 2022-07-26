import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMoralis } from 'react-moralis';
import { useActiveWeb3React } from 'app/services/web3';

export { RouteGuard };

function RouteGuard({ children,user }) {
   
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    // const {logout} = useMoralis();
    // const {deactivate} = useActiveWeb3React()
    useEffect(() => {
      
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
      
  async  function authCheck(url) {
        let isLoggedIn = localStorage.getItem('ShibariumUser');
        isLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn)?.objectId: ''
        console.log("isLoggedIn", isLoggedIn);
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/dashboard','/balance','/account'];
        const path = url.split('?')[0];
        // console.log(path)
        if (!isLoggedIn && publicPaths.includes(path)) {
            
                setAuthorized(false);

                router.push({
                    pathname: '/home'
                });
            
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}