import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Select
} from '@chakra-ui/react';

const Dropdown = ({ options, onChoose, type }) => {

    return <Select mb={3} onChange={(e) => onChoose(type, e.target.value)}>
        {
            options.map((option, index) => {
                return <option key={index} value={option.countryCode}>{option.displayValue}</option>
            })
        }
    </Select>
}

export default Dropdown;