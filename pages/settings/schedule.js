import AuthCheck from "@/components/AuthCheck";
import Navbar from "@/components/Navbar";
import SubNavbar from "@/components/SubNavbar";
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
import { useState } from "react";

const workingHours = {
    day: "",
    startingHour: "9",
    endingHour: "17",
    available: true
};

export default function Schedule() {
    const pageName = "Working Hours";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [checkBoxes, setCheckBoxes] = useState([]);
    const [schedule, setSchedule] = useState([{}]);

    const changeCheckBoxesState = (day) => {
        const newCheckBox = [...checkBoxes];
        const index = newCheckBox.indexOf(day);
        if (index === -1) {
            newCheckBox.push(day);
        } else {
            newCheckBox.splice(index, 1);
        }

        setCheckBoxes(newCheckBox);
        console.log(setCheckBoxes);
    }

    const changeSchedule = (value, day) => {
        const newSchedule = [...schedule];
        const index = newSchedule.indexOf(day);
        if (index === -1) {
            newSchedule.push({
                day: day,
                startingHour: value,
                endingHour: "",
                available: true
            });
        } else {
            newCheckBox.splice(index, 1);
        }

        setCheckBoxes(newCheckBox);
        console.log(setCheckBoxes);
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
                                                <Checkbox defaultChecked mr={5} width={70}>{day}</Checkbox>

                                                <Box display={'flex'} alignItems={'center'}>
                                                    <Input id={day + "BeginningHour"} mr={2} htmlSize={4} width='auto' onChange={e => changeSchedule(e.target.value, day)} />
                                                    -
                                                    <Input id={day + "EndingHour"} ml={2} htmlSize={4} width='auto' />
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
                                }}>
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </Flex>
            </AuthCheck>
        </>
    )
}