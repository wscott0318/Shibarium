import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export { RouteGuard };

function RouteGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
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
      
    function authCheck(url) {
        var isLoggedIn=localStorage.getItem('isLoggedIn')

        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/dashboard','/balance'];
        const path = url.split('?')[0];
        // console.log(path)
        if (!isLoggedIn && publicPaths.includes(path)) {
            if(!path.startsWith('/user-area/dashboard/user-trade/')){
                setAuthorized(false);
                router.push({
                    pathname: '/login'
                });
            }
            
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}