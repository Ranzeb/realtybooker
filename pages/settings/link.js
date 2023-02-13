import Navbar from "@/components/Navbar"
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { auth, firestore, googleAuthProvider } from '../../lib/firebase';
import { UserContext } from '../../lib/context';

import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';

export default function Link() {

  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const linkDoc = firestore.doc(`links/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, { link: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(linkDoc, { uid: user.uid });

    await batch.commit();
  };


  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkLink(formValue);
  }, [formValue]);

  // Hit the database for link match after each debounced change
  // useCallback is required for debounce to work
  const checkLink = useCallback(
    debounce(async (link) => {
      if (link.length >= 3) {
        const ref = firestore.doc(`links/${link}`);
        const { exists } = await ref.get();
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    <>
      <Navbar />
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
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Do you want to change your link?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            Changing your Calendly URL will mean that all of your copied links will no longer work and will need to be updated.
          </Text>
          <form onSubmit={onSubmit}>


            <Input name="link"
              placeholder="your link"
              _placeholder={{ color: 'gray.500' }}
              value={formValue}
              onChange={onChange} />
            <LinkMessage link={formValue} isValid={isValid} loading={loading} />
            <Stack spacing={6} mt={5}>
              <Button
                bg={'blue.400'}
                color={'white'}
                type="submit"
                isDisabled={!isValid}
                _hover={{
                  bg: 'blue.500',
                }}>
                Change Link
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </>
  )
}

function LinkMessage({ link, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{link} is available!</p>;
  } else if (link && !isValid) {
    return <p className="text-danger">That link is taken!</p>;
  } else {
    return <p></p>;
  }
}