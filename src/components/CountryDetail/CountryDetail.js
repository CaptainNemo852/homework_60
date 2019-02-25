import React, {Component} from 'react';
import axios from 'axios';
import './CountryDetail.css'


class CountryDetail extends Component {
    state = {
        selectedCountry: null,
        BorderCountry:[]
    };

    componentDidUpdate() {

        const selectedCountry = this.state.selectedCountry;
        const newCountryCode = this.props.code;

        if (newCountryCode) {
            if (!selectedCountry || (newCountryCode !== selectedCountry.alpha3Code)) {
                const baseURL = "https://restcountries.eu/rest/v2/alpha/";
                axios.get(baseURL + this.props.code)
                    .then(response => {
                        this.setState({selectedCountry: response.data});
                        const requests = this.state.selectedCountry.borders.map(borderCountry => axios.get(baseURL + borderCountry).then(response => {return response.data}
                        ));
                        Promise.all(requests).then(countries => {
                            this.setState({borderCountries: countries})
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }

    render() {
        return (
            this.state.selectedCountry ?
            <div className="main-container">
                <h1 className="country-name-container">{this.state.selectedCountry.name}</h1>
                <p>Столица:{this.state.selectedCountry.capital}</p>
                <p>Регион:{this.state.selectedCountry.region}</p>
                <p>Население: {this.state.selectedCountry.population}</p>
                 <div> Граничит с:
                        <ul>
                            {this.state.BorderCountry.map(country => <li>{country.name}</li>)}
                        </ul>
                    </div>}
            </div> :"Выберите страну"
        );
    }
}


export default CountryDetail;