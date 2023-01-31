import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Center
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { auth, googleAuthProvider } from '../lib/firebase';
import { UserContext } from '../lib/context';
import { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";
import toast from 'react-hot-toast';

export default function SignIn() {
    const { user, username } = useContext(UserContext);

    const redirect = () => {
        Router.push('/home');
    }

    function SignInPage() {
        const [userCredential, setUserCredentials] = useState({ email: "", password: "" });

        const onChange = (e) => {
            e.preventDefault();
            const { name, value } = e.target;
            setUserCredentials(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            signInWithEmailAndPassword(auth, userCredential.email, userCredential.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                    Router.push('/home');
                })
                .catch((error) => {
                    console.log(error);
                    const message = "Username or password incorrect";
                    toast.error(message);
                });
        };

        // Sign in with Google button
        const signInWithGoogle = async () => {
            await auth.signInWithPopup(googleAuthProvider);
        };

        return (
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <form onSubmit={handleSubmit} method="post">
                                <FormControl id="email">
                                    <FormLabel>Email address</FormLabel>
                                    <Input autoComplete="off" type="email" name="email" value={userCredential.email} onChange={onChange} />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Password</FormLabel>
                                    <Input autoComplete="new-password" type="password" name="password" value={userCredential.password} onChange={onChange} />
                                </FormControl>
                                <Stack spacing={10}>
                                    <Stack
                                        direction={{ base: 'column', sm: 'row' }}
                                        align={'start'}
                                        justify={'space-between'}>
                                        <Checkbox>Remember me</Checkbox>
                                        <Link color={'blue.400'}>Forgot password?</Link>
                                    </Stack>
                                </Stack>

                                <Stack spacing={10} pt={2}>
                                    <Button
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        type={"submit"}
                                    >
                                        Sign in
                                    </Button>
                                </Stack>
                            </form>
                            <Stack spacing={10} pt={2}>
                                <Center>
                                    <Button
                                        w={'full'}
                                        maxW={'md'}
                                        variant={'outline'}
                                        leftIcon={<FcGoogle />}
                                        onClick={signInWithGoogle}>
                                        <Center>
                                            <Text>Sign in with Google</Text>
                                        </Center>
                                    </Button>
                                </Center>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    You don't have an account? <Link color={'blue.400'} href={'/signup'}>Register</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        )
    }
    return !user ? <SignInPage /> : redirect()
}