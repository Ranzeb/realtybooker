import { Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import HourPicker from './HourPicker';

export default function VerticalSlider({ setTime, availableHours, selectedDay, schedule }) {

    schedule = schedule.filter((el) => !availableHours.includes(el));

    const [selected, setSelected] = useState();

    return (
        <>
            <VStack mb={5} paddingLeft={2} paddingRight={2}>
                <Text>{selectedDay}</Text>
                <VStack spacing='24px' height={"450"} overflowY={'scroll'}>
                    <VStack mt={2} mb={5} paddingLeft={2} paddingRight={2}>
                        {schedule.map((hour, idx) => {
                            return (<HourPicker key={idx} time={hour} onClick={() => setTime(hour)} id={idx} isSelected={selected === idx} onSelected={() => setSelected(idx)} />)
                        })}
                    </VStack>
                </VStack>
            </VStack>
        </>
    )
}