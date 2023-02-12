import Navbar from "@/components/Navbar"
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  

export default function Link () {
    return (
        <>
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
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Do you want to change your link?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            Changing your Calendly URL will mean that all of your copied links will no longer work and will need to be updated.
          </Text>
          <FormControl id="link">
            <Input
              placeholder="your link"
              _placeholder={{ color: 'gray.500' }}
              type=""
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Change Link
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
    )
}