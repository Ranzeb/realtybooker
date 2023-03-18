import { useUserData } from '../lib/hooks';
import { UserContext } from '../lib/context';
import Navbar from '@/components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import '../components/css/calendar.css'

export default function MyApp({ Component, pageProps }) {

  const userData = useUserData();

  return (
    <ChakraProvider>
      <Toaster />
      <UserContext.Provider value={userData}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  );
}