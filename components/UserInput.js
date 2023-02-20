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
} from '@chakra-ui/react';
import { DatePickerInput } from 'chakra-datetime-picker';
import HorizontalSlider from './HorizontalSlider';
import { useState } from 'react';

export default function UserInput() {
    const [dateTime, setDateTime] = useState([]);

    const handleSelect = (value, type, id) => {
        if (!dateTime.indexOf(id)) {
            const currentDateTime = dateTime;
            currentDateTime.push({
                id: id,
                date: type === 'date' ? value : '',
                time: type === 'time' ? value : ''
            })
        } else {
            const newDateTime = [...dateTime];
            const currentIdx = dateTime.findIndex(obj => obj.id === id);
            const addNewAvailability = {
                id: id,
                date: type === 'date' ? value : newDateTime[currentIdx].date,
                time: type === 'time' ? value : newDateTime[currentIdx].time
            };

            newDateTime[currentIdx] = addNewAvailability;
            setDateTime(newDateTime);
        }

    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>Select at least three date and time for your availabilities</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to find the best spot for <Link color={'blue.400'}>your showing</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="date">
                            <FormLabel>Date</FormLabel>
                            <DatePickerInput onChange={e => handleSelect(e.target.value, "date", 0)} />
                        </FormControl>
                        <FormControl id="time">
                            <FormLabel>Time</FormLabel>
                            <HorizontalSlider />
                        </FormControl>
                        <FormControl id="date">
                            <FormLabel>Date</FormLabel>
                            <DatePickerInput onChange={e => handleSelect(e.target.value, "date", 1)} />
                        </FormControl>
                        <FormControl id="time">
                            <FormLabel>Time</FormLabel>
                            <HorizontalSlider />
                        </FormControl>
                        <FormControl id="date">
                            <FormLabel>Date</FormLabel>
                            <DatePickerInput onChange={e => handleSelect(e.target.value, "date", 2)} />
                        </FormControl>
                        <FormControl id="time">
                            <FormLabel>Time</FormLabel>
                            <HorizontalSlider />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Find the best spot
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}