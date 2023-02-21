import { Box } from '@chakra-ui/react'

export default function HourPicker({ time, onClick, id, onSelected, isSelected }) {

    const handleOnClick = () => {
        onClick(time, "time", id);
        onSelected();
    }

    return (
        <>
            <Box maxW='md' minW='36' borderWidth='1px' borderRadius='lg' p='6' overflow='hidden' display={'flex'} justifyContent={'center'} boxShadow={isSelected && 'outline'} >
                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                    onClick={() => handleOnClick()}
                >
                    {time + ".00 - " + (time + 1) + ".00"}
                </Box>
            </Box>
        </>
    )
}