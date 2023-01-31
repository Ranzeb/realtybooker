import Link from 'next/link';
import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/context';

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
    const { user, username } = useContext(UserContext);

    useEffect(() => {
        if (!user)
            Router.push('/signin')
    }, [user])


    return username ? props.children : props.fallback;
}