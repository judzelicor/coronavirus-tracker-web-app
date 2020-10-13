import React from "react";
import {Cards, Map, Dropdown, News, HierarchyList} from "./Components";
import css from "./App.module.css";
import {fetchSummaryData, fetchHistoricData, fetchAffectedCountries} from "./API";

class App extends React.Component {
  state = {
    summaryData: {},
    historicData: {},
    mapInfo: {
      lat: 34,
      long: -60,
      zoom: 3,
      circles: 'cases',
    },
    activeCard: "cases",
  }

  async componentDidMount() {
    const summaryData = await fetchSummaryData();
    const historicData = await fetchHistoricData();
    this.setState({summaryData : summaryData})
    this.setState({historicData : historicData})
    this.setState({mapInfo: {lat: 34, long: -60, zoom: 3, circles: "cases"}})
  }

  handleChangeToCountry = async (country, circles) => {
    const fetchedData = await fetchSummaryData(country);
    this.setState({summaryData: fetchedData})
    const fetchedHistoricData = await fetchHistoricData(country);
    this.setState({historicData: fetchedHistoricData.timeline})
    const selectedCountry = await fetchAffectedCountries(country);
    this.setState({mapInfo: {lat: selectedCountry.countryInfo.lat, long: selectedCountry.countryInfo.long, zoom: 5, circles : this.state.activeCard}})
  }

  changeCircles = async (data, target) => {
    this.setState({mapInfo: {circles : data}});
    this.setState({activeCard: data})
  }

  render () {
    console.log(this.state.activeCard)
    return (
      <div className={css.container}>
        <div className={css.sidebar}>
          <Dropdown handleChangeToCountry={this.handleChangeToCountry} />
          <Cards data={this.state} changeCircles={this.changeCircles} activeCard={this.state.activeCard}/>
        </div>
        <Map mapInfo={this.state.mapInfo}/>
        <HierarchyList activeCard={this.state.activeCard}/>
        <News />
      </div>
    )
  }
}

export default App;