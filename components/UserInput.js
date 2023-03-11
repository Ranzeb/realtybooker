import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    HStack,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import Calendar from 'react-calendar'
import HorizontalSlider from './HorizontalSlider';
import { useState, useEffect } from 'react';
import CountryAndStateComponent from './CountryAndState';
import 'react-calendar/dist/Calendar.css';
import VerticalSlider from './VerticalSlider';
import firebase from 'firebase/compat/app'
import { auth, firestore, googleAuthProvider, db } from '../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

function DatePicker({ selectedCity, link, userId }) {
    const [value, onChange] = useState(new Date());
    const [dateTime, setDateTime] = useState([]);
    const [time, setTime] = useState();

    const [sessions, setSessions] = useState([]);
    const [bookedHours, setBookedHours] = useState([]);


    //fetch all booked session for selected date
    async function fetchLink(uid) {

        setSessions([]);
        setBookedHours([]);

        const selectedDateStart = `${value.getFullYear()}-${value.getMonth()+1 < 10 ? '0' : ''}${value.getMonth()+1}-${value.getDate() < 10 ? '0' : ''}${value.getDate()}`;
        console.log(selectedDateStart);
        const selectedDateEnd = `${value.getFullYear()}-${value.getMonth()+1 < 10 ? '0' : ''}${value.getMonth()+1}-${value.getDate() < 10 ? '0' : ''}${value.getDate() + 1}`;
        
        let startDate = new Date(selectedDateStart);
        let endDate = new Date(selectedDateEnd);

        //console.log("start: ", startDate);
        //console.log("end: ", endDate);
        let timeStamp = new Date(selectedDateStart)
        // change static userId with uid variable
        const q = query(collection(firestore, "sessionBooked"), where("uid", "==", "e3txVp68l3TaEr8r2KHjonKGxNw1"), where("date", '>', startDate), where("date", "<", endDate));

        


        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setSessions(oldSessions => [...oldSessions, doc.data()]);
            //console.log(doc.id, " => ", doc.data());
        });

        console.log(sessions);


        

        sessions.map((session) => {
            //bookedHours.push(session.timeStamp)
            setBookedHours(oldBookedHours => [...oldBookedHours, session.date.toDate().getHours()]);
            //bookedHours.push(session.date.toDate().getHours());
            console.log("bookedHoursArray:", bookedHours);
        })


    }

    const fetchAllHours = () => {

    }

    const fetchAvailableHours = () => {
        // fetch available hours from db based on location and calendar picked
        fetchLink(userId);
        console.log(selectedCity);
        console.log(value);
        console.log(time);
    };

    return (
        <>
            <HStack mb={10} spacing={4}>
                <HStack spacing={10}>
                    <Calendar onChange={onChange} value={value} locale="en-EN" />
                </HStack>
                <HStack spacing={10}>
                    <VerticalSlider setTime={setTime} availableHours={bookedHours}/>
                </HStack>
            </HStack>
            <Stack spacing={10}>
                <Button onClick={fetchAvailableHours}> Book session </Button>
            </Stack>
        </>
    )
}

export default function UserInput({ link, uid }) {
    const [dateTime, setDateTime] = useState([]);
    const [value, setValue] = useState();

    const [countryCode, setCountryCode] = useState();
    const [cityCode, setCityCode] = useState();
    const [city, setCity] = useState();

    const [submittedCity, setSubmittedCity] = useState(true);
    const [location, setLocation] = useState({
        country: "",
        state: "",
        city: ""
    });


    /*
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
*/

    useEffect(() => {
        console.log(location);
    }, [location])

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6} align={'center'}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>Select the position of the house</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to find the best spot for <Link color={'blue.400'}>your showing</Link> ✌️
                    </Text>
                </Stack>
                <Stack
                    width={600}
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    {!submittedCity &&
                        <Stack spacing={4}>
                            <FormControl id="location">
                                <FormLabel>Location of the showing</FormLabel>
                                <CountryAndStateComponent currentLocation={location} setValue={setLocation} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    mt={5}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={() => setSubmittedCity(!submittedCity)}>
                                    Find the best spot
                                </Button>
                            </Stack>
                        </Stack>
                    }
                    {submittedCity && <DatePicker selectedCity={location} link={link} userId={uid} />}
                </Stack>
            </Stack>
        </Flex>
    );
}