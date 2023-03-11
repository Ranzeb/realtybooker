import { Stack, HStack, VStack, Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import HourPicker from './HourPicker'

export default function VerticalSlider({ setTime, availableHours }) {

    let hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const [selected, setSelected] = useState();

    useEffect(() => {
        console.log("vertical slider availability: ", availableHours);
    }, [availableHours]);
    
    hours = hours.filter((el) => !availableHours.includes(el));

    return (
        <>
            <VStack spacing='24px' height={"80"} overflowY={'scroll'}>
                <VStack mt={2} mb={5} paddingLeft={2} paddingRight={2}>
                    {hours.map((hour, idx) => {
                        return (<HourPicker key={idx} time={hour} onClick={() => setTime(hour)} id={idx} isSelected={selected === idx} onSelected={() => setSelected(idx)} />)
                    })}
                </VStack>
            </VStack>
        </>
    )
}