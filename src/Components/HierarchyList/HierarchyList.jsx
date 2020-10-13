import React, {useState, useEffect} from "react";
import css from "./HierarchyList.module.css"
import {Card, makeStyles} from "@material-ui/core";
import {fetchAffectedCountries} from "../../API";
import numeral from "numeral";
import cx from "classnames";

const useStyles = makeStyles({
  card: {
    display: 'inline-block',
    border: 'unset',
    backgroundColor: 'rgb(255, 255, 255, 1)',
    boxShadow: '0 0 25px -7px rgba(0,0,0,.1)',
    borderRadius: '14px',
    textAlign: 'center',
    margin: "16px 0",
  }
})

const HierarchyList = ({activeCard}) => {
  const classes = useStyles();

  const [fectchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setFetchedCountries(await fetchAffectedCountries())
    }

    fetchData();
  }, [setFetchedCountries]);

  let tierList,
      title;

  if (activeCard === "cases") {
    title = "Cases";
    fectchedCountries.sort((a, b) => (a.cases < b.cases) ? 1 : ((b.cases < a.cases) ? -1 : 0));
    tierList = fectchedCountries.map((country, i) => <li key={i} className={css.listItem}><div className={css.listItemImage}><img className={css.countryFlag} src={country.countryInfo.flag} alt=""/></div><div>{country.country}</div><div className={css.casesData}>{numeral(country.cases).format('0,0')}</div></li>)
  } else if (activeCard === "recovered") {
    title = "Recovered";
    fectchedCountries.sort((a, b) => (a.recovered < b.recovered) ? 1 : ((b.recovered < a.recovered) ? -1 : 0));
    tierList = fectchedCountries.map((country, i) => <li key={i} className={css.listItem}><div className={css.listItemImage}><img className={css.countryFlag} src={country.countryInfo.flag} alt=""/></div><div>{country.country}</div><div className={css.recoveredData}>{numeral(country.recovered).format('0,0')}</div></li>)
  } else {
    title = "Deaths";
    fectchedCountries.sort((a, b) => (a.deaths < b.deaths) ? 1 : ((b.deaths < a.deaths) ? -1 : 0));
    tierList = fectchedCountries.map((country, i) => <li key={i} className={css.listItem}><div className={css.listItemImage}><img className={css.countryFlag} src={country.countryInfo.flag} alt=""/></div><div>{country.country}</div><div className={css.deathsData}>{numeral(country.deaths).format('0,0')}</div></li>)
  }


  return (
    <div className={css.container}>
      <div className={css.cardContainer}>
        <Card className={cx(classes.card, css.card)}>
          <h2 className={css.cardTitle}>Country Hierarchy: {title}</h2>
          <ul className={css.tierList}>
            {tierList}
          </ul>
        </Card>
      </div>
    </div>
  )
}

export default HierarchyList;