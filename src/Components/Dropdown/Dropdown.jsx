import React, {useState, useEffect} from "react";
import {Select, FormControl, MenuItem, InputLabel, NativeSelect, makeStyles} from "@material-ui/core";
import css from "./Dropdown.module.css";
import {fetchAffectedCountries} from "../../API";

const useStyles = makeStyles({
  dropdown: {
    backgroundColor: "rgb(255, 255, 255, 1)",
    borderRadius: "7px",
    padding: "7px",
    boxShadow: '0 0 25px -7px rgba(0,0,0,.1)',
  },

})


const Dropdown = ({handleChangeToCountry}) => {
  const classes = useStyles();

  const [fectchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setFetchedCountries(await fetchAffectedCountries())
    }

    fetchData();
  }, [setFetchedCountries]);

  return (
    <div className={css.dropdown}>
      <FormControl>
        <NativeSelect className={classes.dropdown} onChange={(event) => {handleChangeToCountry(event.target.value)}}>
          <option value="worldwide">Worldwide</option>
          {fectchedCountries.map((country, i) => <option key={i} value={country.country}>{country.country}</option>)}
        </NativeSelect>
      </FormControl>
    </div>
  )
}

export default Dropdown;