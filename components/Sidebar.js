import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
export default function Sidebar() {
    return (
        <>
            <Box
                left={0}
                p={5}
                w="200px"
                top={0}
                h="100%"
            >
                <VStack
                    alignItems={'baseline'}
                    height={300}
                    display={'grid'}
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    p={6}
                    my={12}>
                    <Stack>
                        <Link href="/settings/profile"><Text fontSize={22}>Profile</Text></Link>
                        <Link href="/settings/link"><Text fontSize={22}>Link</Text></Link>
                        <Link href="/settings/schedule"><Text fontSize={22}>Schedule</Text></Link>
                    </Stack>
                </VStack>
            </Box>
        </>
    )
}