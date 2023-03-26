import { auth, firestore, googleAuthProvider } from '@/lib/firebase';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Box, Button, Center, Flex, FormControl,
    FormLabel, Heading, HStack, Input,
    InputGroup, InputRightElement, Link, Stack, Text,
    useColorModeValue
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

export default function SignUp() {

    const redirect = () => {
        Router.push('/home');
    }

    function SignUpPage() {
        const [showPassword, setShowPassword] = useState(false);
        const [userCredential, setUserCredentials] = useState({ name: "", surname: "", email: "", password: "" });

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
            createUserWithEmailAndPassword(auth, userCredential.email, userCredential.password)
                .then(async (currUser) => {
                    // Signed in 
                    const user = currUser.user;
                    // Create refs for both documents
                    const currUsername = userCredential.name + "_" + userCredential.surname;
                    const currDisplayName = userCredential.name + " " + userCredential.surname;
                    const userDoc = firestore.doc(`users/${user.uid}`);
                    const usernameDoc = firestore.doc(`usernames/${currUsername}`);

                    // Commit both docs together as a batch write.
                    const batch = firestore.batch();
                    batch.set(userDoc, { username: currUsername, photoURL: user?.photoURL, displayName: currDisplayName });
                    batch.set(usernameDoc, { uid: user.uid });

                    await batch.commit();
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
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>

                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <form onSubmit={handleSubmit} method="post">
                                <HStack>
                                    <Box>
                                        <FormControl id="firstName" isRequired>
                                            <FormLabel>First Name</FormLabel>
                                            <Input type="text" name="name" value={userCredential.name} onChange={onChange} />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl id="lastName">
                                            <FormLabel>Last Name</FormLabel>
                                            <Input type="text" name="surname" value={userCredential.surname} onChange={onChange} />
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input autoComplete="off" type="email" name="email" value={userCredential.email} onChange={onChange} />
                                </FormControl>
                                <FormControl id="password" isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input type={showPassword ? 'text' : 'password'} value={userCredential.password} onChange={onChange} name="password" autoComplete="new-password" />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowPassword((showPassword) => !showPassword)
                                                }>
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <Stack spacing={10} pt={2} mt={2}>
                                    <Button
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        type={"submit"}>
                                        Sign up
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
                                    Already a user? <Link color={'blue.400'} href={'/signin'}>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        );
    }

    return !user ? <SignUpPage /> : redirect();
}