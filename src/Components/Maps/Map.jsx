import React, {useState, useEffect} from "react";
import {GoogleMap, Circle, InfoWindow, LoadScript} from "@react-google-maps/api";
import css from "./Map.module.css";
import {fetchAffectedCountries} from "../../API";

const demoFancyMapStyles = require("./googleMapStyle.json");

const mapContainerStyle = {
    width: "100%",
    height: "100%",
  }


const Map = ({mapInfo: {lat, long, zoom, circles}}) => {
  const [fectchedCountries, setFetchedCountries] = useState([]);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setFetchedCountries(await fetchAffectedCountries())
    }

    fetchData();
  }, [setFetchedCountries]);

  let generator;


  switch (circles) {
    case "cases":
      generator = fectchedCountries.map((country, i) => <Circle key={i} center={{lat: country.countryInfo.lat, lng: country.countryInfo.long}} radius={Math.sqrt(country.cases)*800} options={{strokeWeight: 0, fillColor: "#f44336"}}>{true && <InfoWindow> <h4>ACTIVE CASES</h4></InfoWindow>}</Circle>);
      break;
    case "recovered":
      generator = fectchedCountries.map((country, i) => <Circle key={i} center={{lat: country.countryInfo.lat, lng: country.countryInfo.long}} radius={Math.sqrt(country.recovered)*800} options={{strokeWeight: 0, fillColor: "#4caf50"}}/>);
      break;
    case "deaths":
      generator = fectchedCountries.map((country, i) => <Circle key={i} center={{lat: country.countryInfo.lat, lng: country.countryInfo.long}} radius={Math.sqrt(country.deaths)*800} options={{strokeWeight: 0, fillColor: "#000000"}}/>);
      break;
  }

    console.log(`${process.env.REACT_APP_GOOGLE_API_KEY}`)
  return (
    <div className={css.mapContainer}>
      <LoadScript
      googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}>
      <GoogleMap
      mapContainerStyle={mapContainerStyle}
      options={{ styles: demoFancyMapStyles }}
      zoom={zoom}
      center={{lat: lat, lng: long}}
      >
        {generator}  
      </GoogleMap></LoadScript>
    </div>
  )
}

export default Map;