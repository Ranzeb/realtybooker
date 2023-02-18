import AuthCheck from "@/components/AuthCheck";
import Navbar from "@/components/Navbar";
import SubNavbar from "@/components/SubNavbar";
import {
    VStack, Box, StackDivider, Heading, Text, Container, HStack, Button
} from '@chakra-ui/react';
import { useState } from "react";
import { TriangleDownIcon } from '@chakra-ui/icons';

export default function Appointments() {

    const [appointments, setAppointments] = useState([
        {
            date: "today",
            list: [
                {
                    email: "r.ranzieri@gmail.com",
                    time: "09.00 - 12.00",
                    user: "Gabriele Ranzieri",
                    desc: "The future can be even brighter but a goal without a plan is just a wish"
                },
                {
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
                    email: "r.ranzieri@gmail.com",
                    time: "09.00 - 12.00",
                    user: "Gabriele Ranzieri",
                    desc: "The future can be even brighter but a goal without a plan is just a wish"
                },
                {
                    email: "r.ranzieri@gmail.com",
                    time: "09.00 - 12.00",
                    user: "Gabriele Ranzieri",
                    desc: "The future can be even brighter but a goal without a plan is just a wish"
                }
            ]
        },
    ]);
    
    function AdditionalInfo({location, timezone, email}) {
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

    function Feature({ email, desc, time, user, ...rest }) {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                
                <HStack p={5} shadow='md' borderWidth='1px' borderRadius={10} {...rest} mb={5}>
                    <Box mr={50}>
                        {time}
                    </Box>
                    <Box mr={50}>
                        <Heading fontSize='l'>{user}</Heading>
                        <Text mt={1}>{email}</Text>
                    </Box>
                    <Box>
                        <TriangleDownIcon ml={50} onClick={() => {setIsOpen(currentIsOpen => !currentIsOpen)}}/>
                    </Box>
                </HStack>
                {isOpen && <AdditionalInfo 
                            email={email}
                            timezone="UTC"
                            location="Parma"
                            />
                }
            </>
        )
      }

    return(
        <>

            <AuthCheck>
                <Navbar/> 
                <SubNavbar props={"Appointments"}/>
                <Container mt={20}>
                <VStack
                    divider={<StackDivider borderColor='gray.200' />}
                    spacing={4}
                    width={400}
                    align='stretch'
                    >
                    {appointments.map((app) => {
                        return(
                            <>
                                <Heading as='h3' size='lg' mb={5}>{app.date}</Heading>
                                {app.list.map((appointment) => {
                                    return(
                                        <>
                                            <Feature
                                                email={appointment.email}
                                                user={appointment.user}
                                                time={appointment.time}
                                                desc={appointment.desc}
                                            />
                                        </>
                                    )
                                })}
                            </>
                        )
                    })}
                </VStack>   
                </Container>
                
            </AuthCheck>
            
        </>
    )
}