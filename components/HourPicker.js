import { Box } from '@chakra-ui/react'

export default function HourPicker(props) {
    return (
        <>
            <Box maxW='md' minW='36' borderWidth='1px' borderRadius='lg' p='6' overflow='hidden' display={'flex'} justifyContent={'center'}>
                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                >
                    {props.time + ".00 - " + (props.time + 1) + ".00"}
                </Box>
            </Box>
        </>
    )
}