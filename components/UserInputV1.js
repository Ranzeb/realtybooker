import {
    Box, Button, Flex, FormControl,
    FormLabel, Heading, Link, Stack, Text,
    useColorModeValue
} from '@chakra-ui/react';
import { DatePickerInput } from 'chakra-datetime-picker';
import { useEffect, useState } from 'react';
import CountryAndStateComponent from './CountryAndState';
import HorizontalSlider from './HorizontalSlider';


export default function UserInput() {
    const [dateTime, setDateTime] = useState([]);
    const [value, setValue] = useState();

    const [countryCode, setCountryCode] = useState();
    const [cityCode, setCityCode] = useState();
    const [city, setCity] = useState();

    const [location, setLocation] = useState({
        country: "",
        state: "",
        city: ""
    });

    const handleSelect = (value, type, id) => {

        const currentIdx = dateTime.findIndex(obj => obj.id === id);
        if (currentIdx === -1) {
            const currentDateTime = dateTime;
            currentDateTime.push({
                id: id,
                date: type === 'date' ? value : '',
                time: type === 'time' ? value : ''
            })
        } else {
            const newDateTime = [...dateTime];
            const addNewAvailability = {
                id: id,
                date: type === 'date' ? value : newDateTime[currentIdx].date,
                time: type === 'time' ? value : newDateTime[currentIdx].time
            };

            newDateTime[currentIdx] = addNewAvailability;
            setDateTime(newDateTime);
        }

    }

    useEffect(() => {
        console.log(location);
    }, [location])

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
                        <FormControl id="location">
                            <FormLabel>Location of the showing</FormLabel>
                            <CountryAndStateComponent currentLocation={location} setValue={setLocation} />
                        </FormControl>
                        <FormControl id="date">
                            <FormLabel>Date</FormLabel>
                            <DatePickerInput onChange={date => handleSelect(date, "date", 0)} />
                        </FormControl>
                        <FormControl id="time">
                            <FormLabel>Time</FormLabel>
                            <HorizontalSlider onClick={handleSelect} />
                        </FormControl>
                        <FormControl id="date">
                            <FormLabel>Date</FormLabel>
                            <DatePickerInput onChange={date => handleSelect(date, "date", 1)} />
                        </FormControl>
                        <FormControl id="time">
                            <FormLabel>Time</FormLabel>
                            <HorizontalSlider onClick={handleSelect} />
                        </FormControl>
                        <FormControl id="date">
                            <FormLabel>Date</FormLabel>
                            <DatePickerInput onChange={date => handleSelect(date, "date", 2)} />
                        </FormControl>
                        <FormControl id="time">
                            <FormLabel>Time</FormLabel>
                            <HorizontalSlider onClick={handleSelect} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                mt={5}
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