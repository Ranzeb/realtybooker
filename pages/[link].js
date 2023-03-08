import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import NotFound from '@/components/NotFound'
import firebase from 'firebase/compat/app'
import { doc, auth, firestore, googleAuthProvider } from '../lib/firebase';
import { getDoc, collection, query, where, getDocs } from "firebase/firestore";
import Navbar from '@/components/Navbar';
import UserInput from '@/components/UserInput';


export default function Link() {
    const router = useRouter()
    const { link } = router.query
    const [linkExist, setLinkExist] = useState(true);
    const [userId, setUserId] = useState();

    useEffect(() => {
        fetchLink(link);
    }, [linkExist]);


    async function fetchLink(url) {
        const ref = firestore.doc(`links/${url}`);

        const linkDocSnap = await getDoc(ref);

        if (linkDocSnap.exists()) {
            setLinkExist(linkDocSnap.exists());
            setUserId(linkDocSnap.data().uid);
            console.log("Document data:", userId);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    return (
        <>
            {!linkExist ? <NotFound /> : <UserInput link={link} uid={userId} />}
        </>
    )
}

