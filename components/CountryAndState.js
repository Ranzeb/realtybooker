import { Country, State, City } from 'country-state-city';
import Dropdown from './Commons/Dropdown'
import { useState, useEffect } from 'react';
const CountryAndStateComponent = ({ onChange }) => {

    const [countryCode, setCountryCode] = useState();
    const [cityCode, setCityCode] = useState();
    const [city, setCity] = useState();

    const countryData = Country.getAllCountries().map(city => ({
        value: city.name,
        displayValue: city.name,
        countryCode: city.isoCode
    }))

    const stateData = State.getStatesOfCountry(countryCode).map(state => ({
        value: state.name,
        displayValue: state.name,
        countryCode: state.isoCode
    }))

    const cityData = City.getCitiesOfState(countryCode, cityCode).map(city => ({
        value: city.name,
        displayValue: city.name
    }))


    return <>

        <p>Select your country</p>
        <Dropdown options={countryData} onChoose={setCountryCode}></Dropdown>
        <p>Select your state</p>
        <Dropdown options={stateData} onChoose={setCityCode}></Dropdown>
        <p>Select your city</p>
        <Dropdown options={cityData} onChoose={setCity}></Dropdown>
    </>
}

export default CountryAndStateComponent;