import React, {Component} from 'react';
import axios from 'axios';
import Country from '../../components/Country/Country';
import CountryDetail from '../../components/CountryDetail/CountryDetail';
import './countries.css';

class Countries extends Component {
    state = {
        currentCountry: null,
        countries: []
    };

    componentDidMount() {
        const baseURL = "https://restcountries.eu/rest/v2/all?fields=name;alpha3Code";
        axios.get(baseURL).then(response => {
            return response;
        }).then(response => {
            this.setState({countries: response.data});
        }).catch(error => {
            console.log(error);
        });
    }

    setCurrentCountry = (country) => {
        this.setState({
            ...this.state,
            currentCountry: country
        });
    };

    render() {
        let countries = this.state.countries;

        return (
            <div className="contries-container">
                <div className="container">
                    {countries.map(country => (<Country name={country.name} clicked={()=>{this.setCurrentCountry(country.alpha3Code)}}/>))}
                </div>
                <div  className="country-info">
                    <CountryDetail code={this.state.currentCountry} />
                </div>
            </div>
        );
    }
}

export default Countries;