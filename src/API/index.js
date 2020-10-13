import axios from "axios";

let url = 'https://disease.sh/';

export const fetchSummaryData = async (query) => {
  url = 'https://disease.sh/';

  let country = `countries/${query}`;

  if (!query) { country = "all"}

  try {
    const {data: {cases, deaths, recovered, todayCases, todayDeaths, todayRecovered, updated}} = await axios.get(`${url}v3/covid-19/${country}`);
    return {cases, deaths, recovered, todayCases, todayDeaths, todayRecovered, updated};
  }

  catch (error) {
    console.log(error)
  }
}

export const fetchHistoricData = async (query) => {
  url = 'https://disease.sh/';

  let country = `${query}`;
  
  if (!query) {country = 'all'};

  try {
    const {data} = await axios.get(`${url}v3/covid-19/historical/${country}`);
    return data;
  }
  catch (error) {
    console.log(error)
  }
}

export const fetchAffectedCountries = async (query) => {
  url = 'https://disease.sh/';

  let country = `countries/${query}`;

  if(!query) {country = 'countries'};

  try {
    const {data} = await axios.get(`${url}v3/covid-19/${country}`)
    return data;
  }
  catch (error) {
    console.log(error)
  }
}