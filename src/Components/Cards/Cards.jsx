import React from "react";
import {Card, makeStyles} from "@material-ui/core";
import css from "./Cards.module.css";
import CountUp from "react-countup";
import {Line} from "react-chartjs-2";
import cx from "classnames";

const useStyles = makeStyles({
  card: {
    display: 'inline-block',
    padding: '16px 32px',
    border: 'unset',
    backgroundColor: 'rgb(255, 255, 255, 1)',
    boxShadow: '0 0 25px -7px rgba(0,0,0,.1)',
    borderRadius: '14px',
    textAlign: 'center',
  }
})


const Cards = ({data: {summaryData, historicData}, changeCircles, activeCard}) => {
const classes = useStyles();
  let casesDataPoints = [],
      prevCasesDataPoint,
      recoveredDataPoints = [],
      prevRecoveredDataPoint,
      deathsDataPoints = [],
      prevDeathsDataPoint;

  if (!summaryData.cases && !historicData.cases) {
    return "Loading..."
  }

  const lastUpdated = `Last updated: ${new Date(Date.now() - summaryData.updated).getMinutes()} minutes ago`;

  for (let date in historicData.cases) {
    if(prevCasesDataPoint) {
      let newCasesDataPoint = {
        x: date,
        y: historicData.cases[date] - prevCasesDataPoint
      }
      casesDataPoints.push(newCasesDataPoint);
    }
    prevCasesDataPoint = historicData.cases[date];
  }

  for (let date in historicData.recovered) {
    if(prevRecoveredDataPoint || prevRecoveredDataPoint === 0) {
      let newRecoveredDataPoint = {
        x: date,
        y: historicData.recovered[date] - prevRecoveredDataPoint
      }
      recoveredDataPoints.push(newRecoveredDataPoint);
    }
    prevRecoveredDataPoint = historicData.recovered[date];
  }

  for (let date in historicData.deaths) {
    if(prevDeathsDataPoint) {
      let newDeathsDataPoint = {
        x: date,
        y: historicData.deaths[date] - prevDeathsDataPoint
      }
      deathsDataPoints.push(newDeathsDataPoint);
    }
    prevDeathsDataPoint = historicData.deaths[date];
  }

  const casesLineChart = (
    casesDataPoints.length ? 
    <Line 
      data={{
          datasets: [
            {
              label: false,
              data: casesDataPoints,
              fill: false,
              borderColor: '#FFCDD2',
              pointRadius: 0,
              lineTension: 0,
              borderWidth: 4
            }
          ]
      }}
      options={{
        legend: {display: false}, 
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {mode: 'index', intersect: false},
        scales: {xAxes: [{ display: false, type: "time"}], yAxes: [{display: false}]}
        }}
    /> : null
  );

  const recoveredLineChart = (
    recoveredDataPoints.length ? 
    <Line 
      data={{
          datasets: [
            {
              label: false,
              data: recoveredDataPoints,
              fill: false,
              borderColor: '#C8E6C9',
              pointRadius: 0,
              lineTension: 0,
              borderWidth: 4
            }
          ]
      }}
      options={{
        legend: {display: false}, 
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {mode: 'index', intersect: false},
        scales: {xAxes: [{ display: false, type: "time"}], yAxes: [{display: false}]}
        }}
    /> : null
  );

  const deathsLineChart = (
    deathsDataPoints.length ? 
    <Line 
      data={{
          datasets: [
            {
              label: false,
              data: deathsDataPoints,
              fill: false,
              borderColor: '#E0E0E0',
              pointRadius: 0,
              lineTension: 0,
              borderWidth: 4
            }
          ]
      }}
      options={{
        legend: {display: false}, 
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {mode: 'index', intersect: false},
        scales: {xAxes: [{ display: false, type: "time"}], yAxes: [{display: false}]}
        }}
    /> : null
  );
  let casesActive,
      recoveredActive,
      deathsActive;

  if (activeCard === "cases") {
    casesActive = true;
  } else if (activeCard === "recovered") {
    recoveredActive = true;
  } else {
    deathsActive = true;
  }

  return (
    <div className={css.container}>
      <div className={css.cardsContainer}>
        <Card onClick={(event) => changeCircles("cases", event.target)} className={cx(casesActive ? css.activeCard : "", classes.card, css.card)} variant="outlined">
          <div className={css.lineChart}>{casesLineChart}</div>
          <h3 className={cx(css.dataUpdated, css.casesUpdatedData)}>+ <CountUp 
              start={0} 
              end={summaryData.todayCases}
              duration={0.8}
              separator=","/></h3>
          <h2 className={cx(css.data, css.casesData)}><CountUp 
              start={0} 
              end={summaryData.cases}
              duration={2}
              separator=","/>
          </h2>
          <h2 className={cx(css.dataTitle, css.casesTitle)}>Infected</h2>
          <p className={css.lastUpdated}>{lastUpdated}</p>
        </Card>
        <Card onClick={(event) => changeCircles("recovered", event.target)} className={cx(recoveredActive ? css.activeCard : "", classes.card, css.card)} variant="outlined">
          <div className={css.lineChart}>{recoveredLineChart}</div>
          <h3 className={cx(css.dataUpdated, css.recoveredUpdatedData)}>+ <CountUp 
              start={0} 
              end={summaryData.todayRecovered}
              duration={0.8}
              separator=","/></h3>
          <h2 className={cx(css.data, css.recoveredData)}><CountUp 
              start={0} 
              end={summaryData.recovered}
              duration={1.5}
              separator=","/>
          </h2>
          <h2 className={cx(css.dataTitle, css.recoveredTitle)}>Recovered</h2>
          <p className={css.lastUpdated}>{lastUpdated}</p>
        </Card>
        <Card onClick={(event) => changeCircles("deaths", event.target)} className={cx(deathsActive ? css.activeCard : "", classes.card, css.card)} variant="outlined">
          <div className={css.lineChart}>{deathsLineChart}</div>
          <h3 className={cx(css.dataUpdated, css.deathsUpdatedData)}>+ <CountUp 
              start={0} 
              end={summaryData.todayDeaths}
              duration={0.8}
              separator=","/></h3>
          <h2 className={cx(css.data, css.deathsData)}><CountUp 
              start={0} 
              end={summaryData.deaths}
              duration={1.5}
              separator=","/>
          </h2>
          <h2 className={css.dataTitle}>Deceased</h2>
          <p className={css.lastUpdated}>{lastUpdated}</p>
        </Card>
      </div>
    </div>
  )
}

export default Cards;