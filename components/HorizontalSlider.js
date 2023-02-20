import { Stack, HStack, VStack, Box } from '@chakra-ui/react'
import { useState } from 'react'
import HourPicker from './HourPicker'

export default function HorizontalSlider(props) {

    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    return (
        <>
            <HStack spacing='24px' width='100%' overflowX={'scroll'}>
                <HStack mb={5}>
                    {hours.map((hour) => {
                        return (<HourPicker time={hour} />)
                    })}
                </HStack>
            </HStack>
        </>
    )
}