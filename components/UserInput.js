import {
    Button, Flex,
    FormControl,
    FormLabel, Heading, HStack, Link, Stack, Text,
    useColorModeValue
} from '@chakra-ui/react';
import { addDoc, collection, getDocs, query, where, getDoc, doc } from "firebase/firestore";
import next from 'next';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-hot-toast';
import { firestore } from '../lib/firebase';
import CountryAndStateComponent from './CountryAndState';
import VerticalSlider from './VerticalSlider';
import { useRouter } from 'next/router';

function DatePicker({ selectedCity }) {

    const router = useRouter()
    const [time, setTime] = useState();
    const [bookedHours, setBookedHours] = useState([]);
    const [unavailableDays, setUnavailableDays] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [dayPicked, setDayPicked] = useState(false);
    const [selectedDay, setSelectedDay] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [realtorUserId, setRealtorUserId] = useState();
    const [location, setLocation] = useState(selectedCity);
    const [isLoading, setIsLoading] = useState(false);
    function getMonthName(monthNumber, locale) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString(locale, { month: 'long' });
    }

    function getDayNameUpdated(date = new Date(), locale = 'en-US') {
        return date.toLocaleDateString(locale, { weekday: 'short' });
    }

    function getDayName(date) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date];
    }


    function getCurrentDayToString(day, dayNumber, monthNumber, locale) {
        return getDayName(dayNumber) + ", " + getMonthName(monthNumber, locale) + " " + day;
    }

    async function fetchLink() {
        const { link } = router.query
        const ref = firestore.doc(`links/${link}`);

        let userId = "";
        await getDoc(ref).then((url) => {

            if (url.exists()) {
                console.log(url.data().uid)
                userId = url.data().uid;
            } else {
                console.log("link dont exist")
            }
        })

        return userId;
    }


    //fetch all booked session for selected date
    async function fetchSessionsAvailable(value) {


        setSelectedDate(`${value.getFullYear()}-${value.getMonth() + 1 < 10 ? '0' : ''}${value.getMonth() + 1}-${value.getDate() < 10 ? '0' : ''}${value.getDate()}`);

        const dayDate = getCurrentDayToString(value.getDate(), value.getDay(), value.getMonth() + 1, 'en-US');
        setSelectedDay(dayDate);
        console.log("fetch link value:", selectedDate);
        setBookedHours([]);

        const selectedDateStart = `${value.getFullYear()}-${value.getMonth() + 1 < 10 ? '0' : ''}${value.getMonth() + 1}-${value.getDate() < 10 ? '0' : ''}${value.getDate()}`;
        const nextDay = value.getDate() + 1 > 31 ? '1' : value.getDate() + 1;
        const nextMonth = value.getDate() + 1 > 31 ? value.getMonth() + 2 : value.getMonth() + 1;
        const selectedDateEnd = `${value.getFullYear()}-${nextMonth < 10 ? '0' : ''}${nextMonth}-${nextDay < 10 ? '0' : ''}${nextDay}`;

        let startDate = new Date(selectedDateStart);
        let endDate = new Date(selectedDateEnd);

        const uid = await fetchLink();
        setRealtorUserId(uid);
        console.log(uid);
        // change static userId with uid variable


        const q = query(collection(firestore, "sessionBooked"), where("uid", "==", uid), where("date", '>', startDate), where("date", "<", endDate));

        console.log("start: ", startDate, " end: ", endDate);

        const sessions = [];

        await getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                sessions.push(doc.data());
            })
        });

        sessions.map((session) => {
            setBookedHours(oldBookedHours => [...oldBookedHours, session.date.toDate().getHours()]);
        })

        const ref = firestore.doc(`availabilities/${uid}/${getDayName(value.getDay()).substring(0, 3)}/0`);

        await getDoc(ref).then((document) => {
            const startDoc = document.data().startingHour;
            const endDoc = document.data().endingHour;
            const range = (start, stop, step) =>
                Array.from({ length: (stop - start) / step + 1 }, (_, i) => +start + i * step);
            setSchedule(range(startDoc, endDoc, 1));
        })

        setDayPicked(true);
    }

    const bookSelectedSession = async () => {
        // fetch available hours from db based on location and calendar picked
        const city = location.city;
        const state = location.state;
        const country = location.country;
        const duration = 1;

        console.log(selectedDate)
        const bookedSession = new Date(selectedDate);

        bookedSession.setHours(time);
        bookedSession.setMinutes(0);
        bookedSession.setSeconds(0);

        console.log(bookedSession);


        await addDoc(collection(firestore, "sessionBooked"), {
            city: city,
            state: state,
            country: country,
            uid: realtorUserId,
            duration: duration,
            date: bookedSession,
            username: "Gabriele Ranzieri",
            email: "gabriele.ranzieri@studenti.unipr.it",
            desc: "First house"
        });

        toast.success("Session booked successfully");
    };

    const tileDisabled = ({ date }) => {
        console.log("tileDisabled: ", unavailableDays)
        console.log(getDayNameUpdated(date) + " " + unavailableDays[0])
        console.log(unavailableDays.includes(getDayNameUpdated(date)))
        return date < new Date() || unavailableDays.includes(getDayNameUpdated(date));
    }

    async function fetchUnavailabilities() {

        //change uid with userId
        const uid = "e3txVp68l3TaEr8r2KHjonKGxNw1";
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        setUnavailableDays([]);
        // change static userId with uid variable
        console.log("Fetch")
        let idx = 0;
        days.map(async (day) => {
            const docRef = firestore.collection('availabilities').doc(uid).collection(day);


            const q = query(docRef);
            await getDocs(q).then((querySnapshot) => {
                querySnapshot.forEach(async (doc) => {
                    if (!doc.data().available) {
                        setUnavailableDays(oldUnavailableDays => [...oldUnavailableDays, day]);
                    }
                })
            });
        })
    }

    useEffect(() => {
        setUnavailableDays([]);
        //change uid with userId
        fetchUnavailabilities().then(() => {
            setIsLoading(true);
        })

    }, [])

    return (
        <>
            {isLoading &&
                <>
                    <HStack mb={10} spacing={4} width="850px">
                        <HStack spacing={10}>
                            <Calendar tileDisabled={tileDisabled} onClickDay={(e) => fetchSessionsAvailable(e)} locale="en-EN" />
                        </HStack>
                        {dayPicked && <HStack spacing={10}>
                            <VerticalSlider schedule={schedule} setTime={setTime} availableHours={bookedHours} selectedDay={selectedDay} />
                        </HStack>}
                    </HStack>
                    <Stack spacing={10}>
                        <Button onClick={bookSelectedSession}> Book session </Button>
                    </Stack>
                </>
            }
        </>
    );
}

export default function UserInput({ link, uid }) {

    const [submittedCity, setSubmittedCity] = useState(false);
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