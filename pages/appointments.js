import AuthCheck from "@/components/AuthCheck";
import Navbar from "@/components/Navbar";
import SubNavbar from "@/components/SubNavbar";
import {
    VStack, Box, StackDivider, Heading, Text, Container, HStack, Button
} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import { auth, firestore, googleAuthProvider, db } from '../lib/firebase';
import { doc, setDoc, getDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { forEach } from "lodash";

export default function Appointments() {
    const [sessions, setSessions] = useState([]);
    const [isLoading, setLoading] = useState(false)

    const sessionsMap = new Map();

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

        setSessions([]);

        // change static userId with uid variable
        const q = query(collection(firestore, "sessionBooked"), where("uid", "==", "e3txVp68l3TaEr8r2KHjonKGxNw1"), where("date", ">=", new Date()));

        await getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log("doc: ", doc.data());
                setSessions(oldSessions => [...oldSessions, doc.data()]);
                const value = doc.data().date.toDate();
                console.log("value: ", value);
                const dayDate = getCurrentDayToString(value.getDate(), value.getDay(), value.getMonth() + 1, 'en-US');
                if (sessionsMap.has(dayDate)) {
                    sessionsMap.get(dayDate).push(doc.data());
                } else {
                    sessionsMap.set(dayDate, [doc.data()]);
                }
            })
        });
    }


    const [appointments, setAppointments] = useState([
        {
            date: "today",
            list: [
                {
                    id: 0,
                    email: "r.ranzieri@gmail.com",
                    time: "09.00 - 12.00",
                    user: "Gabriele Ranzieri",
                    desc: "The future can be even brighter but a goal without a plan is just a wish"
                },
                {
                    id: 1,
                    email: "r.ranzieri@gmail.com",
                    time: "09.00 - 12.00",
                    user: "Gabriele Ranzieri",
                    desc: "The future can be even brighter but a goal without a plan is just a wish"
                }
            ]
        },
        {
            date: "tomorrow",
            list: [
                {
                    id: 2,
                    email: "r.ranzieri@gmail.com",
                    time: "09.00 - 12.00",
                    user: "Gabriele Ranzieri",
                    desc: "The future can be even brighter but a goal without a plan is just a wish"
                },
                {
                    id: 3,
                    email: "r.ranzieri@gmail.com",
                    time: "09.00 - 12.00",
                    user: "Gabriele Ranzieri",
                    desc: "The future can be even brighter but a goal without a plan is just a wish"
                }
            ]
        },
    ]);

    function AdditionalInfo({ location, timezone, email }) {
        return (
            <>
                <HStack p={5} shadow='md' borderWidth='1px' borderRadius={10} mt={-5} mb={5} display={'grid'}>
                    <Box mr={50}>
                        <Heading fontSize='l'>Email: {email}</Heading>
                        <Text mt={1}>Location: {location}</Text>
                        <Text mt={1}>Timezone: {timezone}</Text>
                    </Box>
                    <Button mt={'20px'} fontSize='revert' colorScheme='red'>Cancel Appointment</Button>
                </HStack>
            </>
        )
    }

    function Feature({ email, desc, time, user, duration, isActive, onShow, ...rest }) {
        return (
            <>

                <HStack p={5} shadow='md' borderWidth='1px' borderRadius={10} {...rest} mb={5}>
                    <Box mr={50}>
                        {time + " - " + (time + duration)}
                    </Box>
                    <Box mr={50}>
                        <Heading fontSize='l'>{user}</Heading>
                        <Text mt={1}>{email}</Text>
                    </Box>
                    <Box>
                        <TriangleDownIcon ml={50} onClick={onShow} />
                    </Box>
                </HStack>
                {isActive && <AdditionalInfo
                    email={email}
                    timezone="UTC"
                    location="Parma"
                />
                }
            </>
        )
    }

    const [isOpen, setIsOpen] = useState();

    useEffect(() => {
        fetchLink("test").then(() => {
            console.log(sessionsMap)
            setLoading(true);
        })

    }, [])
    return (

        <>
            <AuthCheck>
                <Navbar />
                <SubNavbar props={"Appointments"} />
                <Container mt={20}>
                    <VStack
                        divider={<StackDivider borderColor='gray.200' />}
                        spacing={4}
                        width={480}
                        align='stretch'
                    >

                        {
                            isLoading && sessionsMap.forEach((sessions, key) => {
                                console.log("key: ", key);
                                sessions.map((session) => {
                                    console.log("session: ", session);
                                    return (
                                        <>
                                            <Text>{key}</Text>
                                            <Feature
                                                email={session.email}
                                                user={session.username}
                                                time={session.date.toDate().getHours()}
                                                duration={session.duration}
                                                desc={session.desc}
                                                isActive={isOpen === 1}
                                                onShow={() => setIsOpen(1)}
                                            />
                                        </>
                                    )
                                })
                            })
                        }
                    </VStack>
                </Container>

            </AuthCheck>

        </>
    )
}