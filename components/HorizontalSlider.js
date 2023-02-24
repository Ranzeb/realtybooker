import { Stack, HStack, VStack, Box } from '@chakra-ui/react'
import { useState } from 'react'
import HourPicker from './HourPicker'

export default function HorizontalSlider({ onClick }) {

    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const [selected, setSelected] = useState();

    return (
        <>
            <HStack spacing='24px' width='100%' overflowX={'scroll'}>
                <HStack mt={2} mb={5} paddingLeft={2} paddingRight={2}>
                    {hours.map((hour, idx) => {
                        return (<HourPicker time={hour} onClick={() => onClick(hour, "time", idx)} id={idx} isSelected={selected === idx} onSelected={() => setSelected(idx)} />)
                    })}
                </HStack>
            </HStack>
        </>
    )
}