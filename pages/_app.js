import { useUserData } from '../lib/hooks';
import { UserContext } from '../lib/context';
import ProjectNavbar from '@/components/ProjectNavbar';
import Navbar from '@/components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';

export default function MyApp({ Component, pageProps }) {

  const userData = useUserData();

  return (
    <ChakraProvider>
      <UserContext.Provider value={userData}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  );
}