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
import _ from "lodash";

export default function Appointments() {
    const [sessions, setSessions] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState();

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

        // change static userId with uid variable
        const q = query(collection(firestore, "sessionBooked"), where("uid", "==", "e3txVp68l3TaEr8r2KHjonKGxNw1"), where("date", ">=", new Date()));
        const sessionsList = [];

        await getDocs(q).then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
                console.log("doc: ", doc.id);
                const value = doc.data().date.toDate();
                console.log("value: ", value);
                const dayDate = getCurrentDayToString(value.getDate(), value.getDay(), value.getMonth() + 1, 'en-US');
                const currentObj = {
                    id: doc.id,
                    email: doc.data().email,
                    username: doc.data().username,
                    uid: doc.data().uid,
                    city: doc.data().city,
                    country: doc.data().country,
                    state: doc.data().state,
                    date: doc.data().date.toDate(),
                    duration: doc.data().duration,
                    desc: doc.data().desc,
                    zipcode: doc.data().zipcode,
                    timezone: doc.data().timezone,
                    key: dayDate
                }

                console.log("obj: ", currentObj);
                sessionsList.push(currentObj);
            })
        });

        return sessionsList;
    }

    function AdditionalInfo({ timezone }) {
        return (
            <>
                <HStack p={5} shadow='md' borderWidth='1px' borderRadius={10} mt={-5} mb={5} display={'grid'}>
                    <Box mb={'20px'} mr={50}>
                        <Text mb={1}>Timezone: {timezone}</Text>
                    </Box>
                    <Button mt={'20px'} fontSize='revert' colorScheme='red'>Cancel Appointment</Button>
                </HStack>
            </>
        )
    }

    function Feature({ email, desc, time, user, city, country, state, zipCode, duration, timezone, isActive, onShow, ...rest }) {
        return (
            <>

                <HStack p={5} shadow='md' borderWidth='1px' borderRadius={10} {...rest} mb={5}>
                    <Box mr={50}>
                        {time + " - " + (time + duration)}
                    </Box>
                    <Box mr={50}>
                        <Heading fontSize='l'>{user}</Heading>
                        <Text mt={1}>{city + ", " + country + ", " + state + ", " + zipCode}</Text>
                    </Box>
                    <Box>
                        <TriangleDownIcon ml={50} onClick={onShow} />
                    </Box>
                </HStack>
                {isActive && <AdditionalInfo
                    timezone={timezone}
                />
                }
            </>
        )
    }

    useEffect(() => {
        fetchLink("test").then((list) => {
            setSessions(_.groupBy(list, "key"));
            setLoading(true);
        })

    }, [])


    const render = () => {
        return (
            <>
                {
                    Object.keys(sessions).map((key) => {
                        return (
                            <>
                                <Text key={key} fontSize='2xl' mb={5}>{key}:</Text>
                                {
                                    sessions[key].map((obj) => {
                                        return (
                                            <>
                                                <Feature
                                                    key={obj.id}
                                                    email={obj.email}
                                                    desc={obj.desc}
                                                    time={obj.date.getHours()}
                                                    user={obj.username}
                                                    city={obj.city}
                                                    country={obj.country}
                                                    state={obj.state}
                                                    uid={obj.uid}
                                                    duration={obj.duration}
                                                    isActive={isOpen === obj.id}
                                                    zipCode={obj.zipcode}
                                                    timezone={obj.timezone}
                                                    onShow={() => setIsOpen(isOpen === obj.id ? false : obj.id)}
                                                />
                                            </>
                                        )
                                    })
                                }
                            </>


                        );
                    })}
            </>);
    }


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
                            isLoading && render()
                        }

                    </VStack>
                </Container>

            </AuthCheck>

        </>
    )
}