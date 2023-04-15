import React from 'react'
import AuthCheck from "@/components/AuthCheck";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SubNavbar from "@/components/SubNavbar";
import {
    Button, Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { addDoc, collection, getDocs, query, where, getDoc, setDoc, doc } from "firebase/firestore";
import toast from 'react-hot-toast';
import { UserContext } from '../../lib/context';
import { auth, firestore } from '../../lib/firebase';

function duration() {
    const pageName = "Set event duration";
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const uid = auth.currentUser?.uid;
    const { user, username } = useContext(UserContext);
    const postRef = firestore.collection('sessionTime').doc(auth.currentUser?.uid);
    const [duration, setDuration] = useState("");
    const router = useRouter();

    const getCurrentDuration = () => {
        postRef.get()
            .then(doc => {
                setDuration(doc.data()?.duration);
            })
    }

    useEffect(() => {
        getCurrentDuration();
    });


    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Entered onSubmit");
            console.log("doc; ", doc(firestore, "sessionTime", "e3txVp68l3TaEr8r2KHjonKGxNw1"))

            // Add a new document in collection "cities"
            await setDoc(doc(firestore, "sessionTime", uid), {
                duration: formValue
            });

            toast.success("Value set correctly");
        } catch (e) {
            toast.error("Sbagliato: ", e)
        }

        getCurrentDuration();
        router.reload(window.location.pathname);
    };


    const onChange = (e) => {
        // Force form value typed in form to match correct format
        const val = e.target.value;
        console.log("On change value: ", val);
        setFormValue(val)

        console.log("formValue: ", formValue)
    };

    return (
        <>
            <AuthCheck>
                <Navbar />
                <SubNavbar props={pageName} />
                <Stack isInline spacing={8} align="center" justify="center">
                    <Flex>
                        <Sidebar />
                    </Flex>
                    <Flex
                        width="500px"
                        minH={'100vh'}
                        align={'center'}
                        justify={'center'}
                    >
                        <Stack
                            spacing={4}
                            w={'full'}
                            maxW={'md'}
                            bg={useColorModeValue('white', 'gray.700')}
                            rounded={'xl'}
                            boxShadow={'lg'}
                            p={6}
                            my={12}>
                            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                                Do you want to change your event duration?
                            </Heading>
                            <form onSubmit={onSubmit} method="POST">
                                <Input name="link"
                                    textAlign={'right'}
                                    placeholder={duration}
                                    _placeholder={{ color: 'gray.500' }}
                                    value={formValue}
                                    onChange={onChange} />
                                <Stack spacing={6} mt={5}>
                                    <Button
                                        bg={'blue.400'}
                                        color={'white'}
                                        type="submit"
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Change Duration
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Flex>
                </Stack>
            </AuthCheck>
        </>
    )
}

export default duration;
