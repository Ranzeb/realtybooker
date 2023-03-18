import {
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import Calendar from 'react-calendar'
import { useState, useEffect } from 'react';
import CountryAndStateComponent from './CountryAndState';
import 'react-calendar/dist/Calendar.css';
import VerticalSlider from './VerticalSlider';
import { firestore } from '../lib/firebase';
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

function DatePicker({ selectedCity, link, userId }) {
    //const [value, onChange] = useState(new Date());
    const [time, setTime] = useState();
    const [name, setName] = useState();
    const [bookedHours, setBookedHours] = useState([]);

    const [dayPicked, setDayPicked] = useState(false);
    const [selectedDay, setSelectedDay] = useState();
    const [selectedDate, setSelectedDate] = useState();


    function getMonthName(monthNumber, locale) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString(locale, { month: 'long' });
    }

    function getDayName(date) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date(date);
        return days[d.getDay()];
    }


    function getCurrentDayToString(day, dayNumber, monthNumber, locale) {
        return getDayName(dayNumber) + ", " + getMonthName(monthNumber, locale) + " " + day;
    }

    //fetch all booked session for selected date
    async function fetchLink(value) {

        setSelectedDate(`${value.getFullYear()}-${value.getMonth() + 1 < 10 ? '0' : ''}${value.getMonth() + 1}-${value.getDate() < 10 ? '0' : ''}${value.getDate()}`);

        const dayDate = getCurrentDayToString(value.getDate(), value.getDay(), value.getMonth() + 1, 'en-US');
        setSelectedDay(dayDate);
        setDayPicked(true);
        console.log("fetch link value:", selectedDate);
        setBookedHours([]);

        const selectedDateStart = `${value.getFullYear()}-${value.getMonth() + 1 < 10 ? '0' : ''}${value.getMonth() + 1}-${value.getDate() < 10 ? '0' : ''}${value.getDate()}`;
        const selectedDateEnd = `${value.getFullYear()}-${value.getMonth() + 1 < 10 ? '0' : ''}${value.getMonth() + 1}-${value.getDate() < 10 ? '0' : ''}${value.getDate() + 1}`;

        let startDate = new Date(selectedDateStart);
        let endDate = new Date(selectedDateEnd);

        // change static userId with uid variable
        const q = query(collection(firestore, "sessionBooked"), where("uid", "==", "e3txVp68l3TaEr8r2KHjonKGxNw1"), where("date", '>', startDate), where("date", "<", endDate));

        console.log("query: ", q);

        const sessions = [];

        await getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                sessions.push(doc.data());
            })
        });

        sessions.map((session) => {
            setBookedHours(oldBookedHours => [...oldBookedHours, session.date.toDate().getHours()]);
        })


    }

    const bookSelectedSession = async () => {
        // fetch available hours from db based on location and calendar picked
        const city = "Traversetolo";
        const state = "Parma";
        const country = "Italy";
        const duration = 1;
        const uid = "e3txVp68l3TaEr8r2KHjonKGxNw1";

        console.log(selectedDate)
        const bookedSession = new Date(selectedDate);

        bookedSession.setHours(time);
        bookedSession.setMinutes(0);
        bookedSession.setSeconds(0);

        console.log(bookedSession);


        const docRef = await addDoc(collection(firestore, "sessionBooked"), {
            city: city,
            state: state,
            country: country,
            uid: uid,
            duration: duration,
            date: bookedSession
        });
        console.log("Document written with ID: ", docRef.id);

    };

    const tileDisabled = ({ date }) => {
        return date < new Date()
    }

    return (
        <>
            <HStack mb={10} spacing={4} width="850px">
                <HStack spacing={10}>
                    <Calendar tileDisabled={tileDisabled} onClickDay={(e) => fetchLink(e)} locale="en-EN" />
                </HStack>
                {dayPicked && <HStack spacing={10}>
                    <VerticalSlider setTime={setTime} availableHours={bookedHours} selectedDay={selectedDay} />
                </HStack>}
            </HStack>
            <Stack spacing={10}>
                <Button onClick={bookSelectedSession}> Book session </Button>
            </Stack>
        </>
    )
}

export default function UserInput({ link, uid }) {

    const [submittedCity, setSubmittedCity] = useState(true);
    const [location, setLocation] = useState({
        country: "",
        state: "",
        city: ""
    });

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
                    width={!submittedCity ? 600 : 850}
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