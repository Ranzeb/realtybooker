import NotFound from '@/components/NotFound';
import UserInput from '@/components/UserInput';
import { getDoc } from "firebase/firestore";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { firestore } from '../lib/firebase';


export default function Link() {
    const router = useRouter()
    const { link } = router.query
    const [linkExist, setLinkExist] = useState(true);
    const [userId, setUserId] = useState();

    useEffect(() => {
        fetchLink(link);
    }, []);


    async function fetchLink(url) {
        const ref = firestore.doc(`links/${url}`);

        await getDoc(ref).then((linkDocSnap) => {
            if (linkDocSnap.exists()) {
                setLinkExist(linkDocSnap.exists());
                setUserId(linkDocSnap.data().uid);
                console.log("Document data:", userId);
            } else {
                //toast.error("No such document!");
            }
        })
    }

    return (
        <>
            {!linkExist ? <NotFound /> : <UserInput link={link} uid={userId} />}
        </>
    )
}

