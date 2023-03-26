import AuthCheck from '@/components/AuthCheck';
import Navbar from "@/components/Navbar";
import Sidebar from '@/components/Sidebar';
import SubNavbar from '@/components/Subnavbar';
import { UserContext } from '@/lib/context';
import {
    Avatar, Button, Center, Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack
} from '@chakra-ui/react';
import 'firebase/compat/database';
import 'firebase/storage';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { auth, firestore } from '../../lib/firebase';
export default function Settings() {

    const { user, username } = useContext(UserContext);
    const [userCredential, setUserCredentials] = useState({ name: user?.displayName ? user.displayName : username, email: user?.email, password: "" });
    const postRef = firestore.collection('users').doc(auth.currentUser?.uid);
    const pageName = "Settings";

    const onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUserCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const remove = () => {
        setUserCredentials({
            name: user?.displayName ? user.displayName : username,
            email: user?.email,
            password: ""
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postRef.update({
                displayName: userCredential.name,
            });
            toast.success('Name updated successfully!')
        } catch (err) {
            toast.error('Failed')
        }
    };

    return (
        <>

            <Navbar />
            <SubNavbar props={pageName} />
            <AuthCheck>
                <Stack isInline spacing={8} align="center" justify="center">
                    <Flex>
                        <Sidebar />
                    </Flex>
                    <form onSubmit={handleSubmit} method="post">
                        <Flex
                            width="500px"
                            minH={'100vh'}
                            align={'center'}
                            justify={'center'}
                        >

                            <Stack
                                spacing={4}
                                w={'full'}
                                maxW={'md'}
                                rounded={'xl'}
                                boxShadow={'lg'}
                                p={6}
                                my={12}>
                                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                                    User Profile Edit
                                </Heading>

                                <FormControl id="userName">
                                    <FormLabel>User Icon</FormLabel>
                                    <Stack direction={['column', 'row']} spacing={6}>
                                        <Center>
                                            <Avatar
                                                size={'xl'}
                                                name={user?.displayName ? user.displayName : username}
                                                src={user?.photoURL}>
                                            </Avatar>
                                        </Center>
                                    </Stack>
                                </FormControl>
                                <FormControl id="Name" >
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        placeholder={user?.displayName ? user.displayName : username}
                                        _placeholder={{ color: 'gray.500' }}
                                        name="name"
                                        type="name"
                                        value={userCredential.name || ""}
                                        onChange={onChange}
                                    />
                                </FormControl>
                                <FormControl id="Email" >
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        placeholder={user?.email}
                                        _placeholder={{ color: 'gray.500' }}
                                        name="email"
                                        type="email"
                                        disabled
                                    />
                                </FormControl>
                                <Stack spacing={6} direction={['column', 'row']}>
                                    <Button
                                        bg={'red.400'}
                                        color={'white'}
                                        w="full"
                                        _hover={{
                                            bg: 'red.500',
                                        }}
                                        onClick={remove}>
                                        Cancel
                                    </Button>
                                    <Button
                                        bg={'blue.400'}
                                        color={'white'}
                                        w="full"
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        type={"submit"}>
                                        Submit
                                    </Button>
                                </Stack>

                            </Stack>
                        </Flex>
                    </form>
                </Stack>
            </AuthCheck>
        </>
    )
}

function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
        return <p>Checking...</p>;
    } else if (isValid) {
        return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
        return <p className="text-danger">That username is taken!</p>;
    } else {
        return <p></p>;
    }
}