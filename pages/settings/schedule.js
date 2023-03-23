import AuthCheck from "@/components/AuthCheck";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SubNavbar from "@/components/SubNavbar";
import { firestore } from "@/lib/firebase";
import { doc, setDoc, getDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Checkbox,
    CheckboxGroup,
    SimpleGrid,
    Box,
    Divider
} from '@chakra-ui/react';
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const workingHours = {
    day: "",
    startingHour: "9",
    endingHour: "17",
    available: true
};

export default function Schedule() {
    const pageName = "Working Hours";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [schedule, setSchedule] = useState(days.map((day) => {
        return {
            day: day,
            startingHour: "9",
            endingHour: "17",
            available: true
        }
    }));

    const changeSchedule = (value, day, type) => {
        const newSchedule = [...schedule];
        const currentWorkingHour = schedule.findIndex(obj => obj.day === day);

        const newWorkingHour = {
            day: day,
            startingHour: type === "beginningHour" ? value : newSchedule[currentWorkingHour].startingHour,
            endingHour: type === "endingHour" ? value : newSchedule[currentWorkingHour].endingHour,
            available: type === "checkBox" ? value : newSchedule[currentWorkingHour].available
        }

        newSchedule[currentWorkingHour] = newWorkingHour;
        console.log(newWorkingHour);
        console.log(newSchedule[currentWorkingHour])
        setSchedule(newSchedule);
        console.log(schedule);
    }

    const handleSubmit = () => {
        //save state on DB then reload the page.

        schedule.map(async (day) => {
            try {
                const docRef = await setDoc(doc(firestore, "availabilities", uid, day.day, "0"), {
                    available: day.available,
                    startingHour: day.startingHour,
                    endingHour: day.endingHour,
                })

            } catch (e) {
                console.log(e)
            }
        })
        toast.success("Availabilities set successfully");
    }

    return (
        <>
            <Navbar />
            <SubNavbar props={pageName} />
            <AuthCheck>
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
                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} mb={5}>
                            Set your weekly schedule
                        </Heading>

                        <FormControl id="email" display={'flex'} mt={5} mb={5} isRequired>
                            <SimpleGrid columns={[2, null, 1]} spacing='40px'>
                                {days.map((day, id) => {
                                    return (
                                        <div key={id}>
                                            <Box display={'flex'} mb={30} >
                                                <Checkbox defaultChecked mr={5} width={70} onChange={e => changeSchedule(e.target.value, day, "checkBox")}>{day}</Checkbox>

                                                <Box display={'flex'} alignItems={'center'}>
                                                    <Input id={day + "BeginningHour"} mr={2} htmlSize={4} width='auto' onChange={e => changeSchedule(e.target.value, day, "beginningHour")} />
                                                    -
                                                    <Input id={day + "EndingHour"} ml={2} htmlSize={4} width='auto' onChange={e => changeSchedule(e.target.value, day, "endingHour")} />
                                                </Box>
                                            </Box>
                                            <Divider />
                                        </div>
                                    )
                                })}
                            </SimpleGrid>
                        </FormControl>
                        <Stack spacing={6} mt={10}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                type={"submit"}
                                onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Stack>

                    </Stack>
                </Flex>
            </AuthCheck>
        </>
    )
}