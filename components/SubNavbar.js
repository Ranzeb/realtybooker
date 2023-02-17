import { ReactNode, useEffect } from 'react';
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Text
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { UserContext } from '@/lib/context';
import { useContext } from 'react';
import { auth } from '@/lib/firebase';
import redirect from '@/lib/redirect';



export default function SubNavbar({ props }) {

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'center'} marginRight={'25%'}>
                    <Box><Text fontSize={32} as='b'>{props}</Text></Box>
                </Flex>
            </Box>
        </>
    );
}