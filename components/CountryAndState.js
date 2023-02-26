import { Country, State, City } from 'country-state-city';
import Dropdown from './Commons/Dropdown'
const CountryAndStateComponent = ({ setValue, currentLocation }) => {


    const countryData = Country.getAllCountries().map(city => ({
        value: city.name,
        displayValue: city.name,
        countryCode: city.isoCode
    }))

    const stateData = State.getStatesOfCountry(currentLocation.country).map(state => ({
        value: state.name,
        displayValue: state.name,
        countryCode: state.isoCode
    }))

    const cityData = City.getCitiesOfState(currentLocation.country, currentLocation.state).map(city => ({
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
        <Dropdown options={countryData} onChoose={handleChange} type={"country"}></Dropdown>
        {currentLocation.country && (<>
            <p>Select your state</p>
            <Dropdown options={stateData} onChoose={handleChange} type={"state"}></Dropdown>
        </>
        )}

        {currentLocation.state && (<>
            <p>Select your city</p>
            <Dropdown options={cityData} onChoose={handleChange} type={"city"}></Dropdown>
        </>
        )}
    </>
}

export default CountryAndStateComponent;