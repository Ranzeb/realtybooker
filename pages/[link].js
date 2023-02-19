import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import NotFound from '@/components/NotFound'
import firebase from 'firebase/compat/app'
import { doc, auth, firestore, googleAuthProvider } from '../lib/firebase';
import Navbar from '@/components/Navbar';
import UserInput from '@/components/UserInput';


export default function Link() {
    const router = useRouter()
    const { link } = router.query
    const [linkExist, setLinkExist] = useState(true);

    useEffect(() => {
        fetchLink(link);
    }, [linkExist]);


    async function fetchLink(url) {
        const ref = firestore.doc(`links/${url}`);
        const { exists } = await ref.get();
        setLinkExist(exists);
        console.log(linkExist);
    }

    return (
        <>
            {!linkExist ? <NotFound /> : <UserInput />}
        </>
    )
}

