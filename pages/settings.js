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
import { SmallCloseIcon } from '@chakra-ui/icons';
import AuthCheck from "@/components/AuthCheck";
import Navbar from "@/components/Navbar";
import { UserContext } from '@/lib/context';
import { useContext } from 'react';


function UserProfileEdit({ user, username }) {
    console.log(user);
    return (
        <>
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
                                <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                                    <AvatarBadge
                                        as={IconButton}
                                        size="sm"
                                        rounded="full"
                                        top="-10px"
                                        colorScheme="red"
                                        aria-label="remove Image"
                                        icon={<SmallCloseIcon />}
                                    />
                                </Avatar>
                            </Center>
                            <Center w="full">
                                <Button w="full">Change Icon</Button>
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl id="userName" isRequired>

                    </FormControl>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            placeholder="password"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                        />
                    </FormControl>
                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'red.500',
                            }}>
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
        </>
    )
}
export default function Settings() {

    const { user, username } = useContext(UserContext);

    return (
        <>
            <AuthCheck>
                <Navbar />
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
                                value={user?.displayName ? user.displayName : username}
                                _placeholder={{ color: 'gray.500' }}
                                name="displayName"
                                type="name"
                                onChange={""}
                            />
                        </FormControl>
                        <Stack spacing={6} direction={['column', 'row']}>
                            <Button
                                bg={'red.400'}
                                color={'white'}
                                w="full"
                                _hover={{
                                    bg: 'red.500',
                                }}>
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
