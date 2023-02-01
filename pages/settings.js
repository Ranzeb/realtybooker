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
import AuthCheck from "@/components/AuthCheck";
import Navbar from "@/components/Navbar";
import { UserContext } from '@/lib/context';
import { useContext, useState } from 'react';


export default function Settings() {

    const { user, username } = useContext(UserContext);
    const [userCredential, setUserCredentials] = useState({ name: user?.displayName ? user.displayName : username, email: "", password: "" });
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
            email: "",
            password: ""
        })
    }

    return (
        <>

            <Navbar />
            <AuthCheck>
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
                                }}>
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </Flex>
            </AuthCheck>


        </>
    )
}
