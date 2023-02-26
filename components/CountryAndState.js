import { Country, State, City } from 'country-state-city';
import Dropdown from './Commons/Dropdown'
import { useState, useEffect } from 'react';
const CountryAndStateComponent = ({ currentLocation, setValue }) => {

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

    const handleChange = (type, value) => { 
        setValue({ 
            country: type === "country" ? value : currentLocation.country,
            state: type === "state" ? value : currentLocation.state,
            city: type === "city" ? value : currentLocation.city
        });
    
    }

    return <>

        <p>Select your country</p>
        <Dropdown options={countryData} onChoose={setCountryCode}></Dropdown>
        {countryCode && ( <>
        <p>Select your state</p>
        <Dropdown options={stateData} onChoose={setCityCode}></Dropdown>
        </>)}
       
        {cityCode && ( <><p>Select your city</p>
        <Dropdown options={cityData} onChoose={setCity}
        ></Dropdown></>)}
    </>
}

export default CountryAndStateComponent;