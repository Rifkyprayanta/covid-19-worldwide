import React, { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./Utils";
import LineGraph from "./LineGraph";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import "leaflet/dist/leaflet.css";
import { Alert, AlertTitle } from "@material-ui/lab";

function App() {
  /*Using state to store, and write some variable */

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -40.47986,
  });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  // Using an UseEffect to run code fecth API functions
  // UseEffect based on given condition

  // Use effect will run when component mounted this is also react hooks features

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) =>
        response.json().then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        })
      );
    };

    fetchData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    console.log(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        // All data
        // from country response
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  console.log(countryInfo);

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 WorldWide Tracker</h1>
          {/* Loop all city in Indonesia */}

          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value} key={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox
            class="flex-item-left"
            title="Coronavirus Case"
            cases={countryInfo.todayCases}
            fatal={countryInfo.cases}
          ></InfoBox>

          <InfoBox
            class="flex-item-middle"
            title="Recovered"
            cases={countryInfo.todayRecovered}
            fatal={countryInfo.recovered}
          ></InfoBox>

          <InfoBox
            class="flex-item-right"
            title="Death"
            cases={countryInfo.todayDeaths}
            fatal={countryInfo.deaths}
          ></InfoBox>
          {/* Box title number of infected*/}
          {/* Box title number of recovered*/}
          {/* Box title number of fatal*/}
        </div>

        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom}></Map>
        <div className="app_made">
          <Alert variant="filled" severity="info">
            <AlertTitle>Info!</AlertTitle>
            This Project made using ReactJs and API from
            <strong> Disease.sh</strong>
          </Alert>
        </div>
      </div>

      <div className="app_right">
        <Card>
          <CardContent>
            <h3>Live Cases By Country</h3>
            <Table countries={tableData} />
          </CardContent>
          <CardContent>
            <h3>Live Case By Regions</h3>
            <LineGraph />
          </CardContent>
        </Card>

        <div className="app_made">
          <Alert variant="filled" severity="success">
            <AlertTitle>Info!</AlertTitle>
            This Covid-19 World Wide Tracker made by
            <strong> Rifky Prayanta</strong> Thankyou for Supporting
          </Alert>
        </div>
      </div>

      {/* Header Website */}
      {/* Title Select Input Kota */}

      {/* Box*/}
      {/* Box */}
      {/* Box */}

      {/* Tabel */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
