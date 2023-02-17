import Link from 'next/link';
import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/context';
import redirect from '@/lib/redirect';
import { Button } from '@chakra-ui/react';
// Component's children only shown to logged-in users
export default function AuthCheck(props) {
    const { user, username } = useContext(UserContext);
    /*
    useEffect(() => {
        if (!username || !user)
            Router.push('/signin')
    }, [username, user])
    */

    return username ? props.children : props.fallback
}