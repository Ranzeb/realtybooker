import { useContext } from 'react';
import { UserContext } from '../lib/context';
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