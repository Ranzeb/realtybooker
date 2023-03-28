import AuthCheck from "@/components/AuthCheck";
import Navbar from "@/components/Navbar";
import SubNavbar from "@/components/SubNavbar";
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { firestore } from "@/lib/firebase";
import {
    Box, Button, Checkbox, Divider, Flex,
    FormControl, Heading,
    Input, SimpleGrid, Stack,
    useColorModeValue
} from '@chakra-ui/react';
import { doc, getDocs, query, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function Schedule() {
    const { user, username } = useContext(UserContext);
    const userId = user?.uid;
    const pageName = "Working Hours";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [isLoading, setLoading] = useState(false)

    const [schedule, setSchedule] = useState([]);

    const dataFetch = useRef(false)

    const changeSchedule = (value, day, type) => {
        const newSchedule = [...schedule];
        const currentWorkingHour = schedule.findIndex(obj => obj.day === day);

        const newWorkingHour = {
            day: day,
            startingHour: type === "beginningHour" ? value : newSchedule[currentWorkingHour].startingHour,
            endingHour: type === "endingHour" ? value : newSchedule[currentWorkingHour].endingHour,
            available: type === "checkBox" ? !newSchedule[currentWorkingHour].available : newSchedule[currentWorkingHour].available
        }

        newSchedule[currentWorkingHour] = newWorkingHour;
        console.log("newWorkingHour: ", newWorkingHour);
        console.log("new schedule: ", newSchedule[currentWorkingHour])
        setSchedule(newSchedule);
        console.log("full schedule: ", schedule);
    }

    const handleSubmit = () => {
        //save state on DB then reload the page.
        //change uid with userId
        const uid = "e3txVp68l3TaEr8r2KHjonKGxNw1";

        schedule.map(async (day) => {
            try {
                await setDoc(doc(firestore, "availabilities", uid, day.day, "0"), {
                    available: day.available,
                    startingHour: day.startingHour,
                    endingHour: day.endingHour,
                })

            } catch (e) {
                console.log("error: ", e)
            }
        })
        toast.success("Availabilities set successfully");
    }

    async function fetchLink() {

        //change uid with userId
        const uid = "e3txVp68l3TaEr8r2KHjonKGxNw1";

        // change static userId with uid variable
        console.log("Fetch")
        setSchedule([]);

        let idx = 0;
        days.map(async (day) => {
            console.log(day)
            const docRef = firestore.collection('availabilities').doc(uid).collection(day);


            const q = query(docRef);
            await getDocs(q).then((querySnapshot) => {
                console.log("idx: ", idx);
                querySnapshot.forEach(async (doc) => {
                    console.log("ending: ", doc.id);
                    const scheduleObj = {
                        day: day,
                        startingHour: doc.data().startingHour,
                        endingHour: doc.data().endingHour,
                        available: doc.data().available
                    }
                    setSchedule(oldSchedule => [...oldSchedule, scheduleObj]);
                })
                idx++;
            });
        })

    }

    useEffect(() => {
        console.log("useEffect : ");

        if (dataFetch.current)
            return
        dataFetch.current = true

        setSchedule([]);
        //change uid with userId
        fetchLink().then(() => {
            setLoading(true);
        })

    }, [])

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

                        {isLoading && <FormControl id="email" display={'flex'} mt={5} mb={5} isRequired>
                            <SimpleGrid columns={[2, null, 1]} spacing='40px'>
                                {schedule.map((schedule, id) => {
                                    return (
                                        <div key={id}>
                                            <Box display={'flex'} mb={30} >
                                                <Checkbox isChecked={schedule.available} mr={5} width={70} onChange={e => changeSchedule(e.target.value, schedule.day, "checkBox")}>{schedule.day}</Checkbox>

                                                <Box display={'flex'} alignItems={'center'}>
                                                    <Input value={schedule.startingHour} isDisabled={!schedule.available} placeholder={schedule.startingHour} id={schedule.day + "BeginningHour"} mr={2} htmlSize={4} width='auto' onChange={e => changeSchedule(e.target.value, schedule.day, "beginningHour")} />
                                                    -
                                                    <Input value={schedule.endingHour} isDisabled={!schedule.available} id={schedule.day + "EndingHour"} ml={2} htmlSize={4} width='auto' onChange={e => changeSchedule(e.target.value, schedule.day, "endingHour")} />
                                                </Box>
                                            </Box>
                                            <Divider />
                                        </div>
                                    )
                                })}
                            </SimpleGrid>
                        </FormControl>
                        }
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