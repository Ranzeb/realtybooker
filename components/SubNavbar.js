import {
    Box,
    Flex, Text, useColorModeValue
} from '@chakra-ui/react';



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