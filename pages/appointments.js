import AuthCheck from "@/components/AuthCheck";
import Navbar from "@/components/Navbar";
import SubNavbar from "@/components/SubNavbar";
import {
    VStack, Box, StackDivider, Heading, Text, Container
} from '@chakra-ui/react';
import { useState } from "react";
export default function Appointments() {

    const [appointments, setAppointments] = useState([
        {
            date: "today",
            list: [
                {
                    title: "app1",
                    desc: "The future can be even brighter but a goal without a plan is just a wish"
                },
                {
                    title: "app2",
                    desc: "The future can be even brighter but a goal without a plan is just a wish"
                }
            ]
        },
        {
            date: "tomorrow",
            list: [
                {
                    title: "app1",
                    desc: "The future can be even brighter but a goal without a plan is just a wish"
                },
                {
                    title: "app2",
                    desc: "The future can be even brighter but a goal without a plan is just a wish"
                }
            ]
        },
    ]);
            

    function Feature({ title, desc, ...rest }) {
        return (
          <Box p={5} shadow='md' borderWidth='1px' {...rest} mb={5}>
            <Heading fontSize='xl'>{title}</Heading>
            <Text mt={4}>{desc}</Text>
          </Box>
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
                                                title={appointment.title}
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