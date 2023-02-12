import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
} from '@chakra-ui/react';
import { auth, firestore } from '../../lib/firebase';
import 'firebase/storage';
import Navbar from "@/components/Navbar";
import { UserContext } from '@/lib/context';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import 'firebase/compat/database';
import Sidebar from '@/components/Sidebar';




export default function Settings() {

    const { user, username } = useContext(UserContext);
    const [userCredential, setUserCredentials] = useState({ name: user?.displayName ? user.displayName : username, email: user?.email, password: "" });
    const postRef = firestore.collection('users').doc(auth.currentUser?.uid);

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
            <Flex>
                <Flex>
                <Sidebar />
                </Flex>
                <Flex>
                <form onSubmit={handleSubmit} method="post">
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.50', 'gray.800')}>

                    <Stack
                        spacing={4}
                        w={'full'}
                        maxW={'md'}
                        bg={useColorModeValue('white', 'gray.700')}
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
            </Flex>
            </Flex>
           



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