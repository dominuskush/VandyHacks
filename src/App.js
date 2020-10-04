import React, {useState, useEffect} from 'react'
import trump from './static/retro_trump.jpg'
import biden from './static/retro_biden.jpg'
import twitter from './static/retro_twitter.png'
import { Container, Progress } from "nes-react"

function Chance(props){
  return (
    <Container title = {props.trump ? 'Trump' : 'Biden'} style = {{width: '50%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      {props.trump ? <img src = {trump} width = {400} alt = 'trump'/> : <img src = {biden} width = {200} alt = 'biden'/>}
      <Progress value = {props.value} max = {100} error = {props.trump} primary = {!props.trump} style = {{marginTop: 16}}/>
      <div style = {{fontSize: 69, marginTop: 8}}>{props.value}%</div>
      <h4>Chance of winning</h4>
    </Container>
  ) 
}

function App() {
  const [trumpOdds, setTrumpOdds] = useState((20).toFixed(1))
  const requestOdds = () => {
    fetch('http://127.0.0.1:8000/').then(res => res.json()).then(data => {
      setTrumpOdds(data['trump'])
    })
  }
  useEffect(() => {
    requestOdds()
    const interval = setInterval(() => {
      requestOdds()
    }, 60000);
    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <div style = {{display: 'flex', justifyContent: 'center'}}>
        <img src = {twitter} width = {100} style = {{marginTop: -24}}/>
        <h2 style = {{marginTop: 24}}>Election Center</h2>
      </div>
      <div style = {{display: 'flex'}}>
        <Chance trump value = {trumpOdds}/>
        <Chance value = {(100 - trumpOdds).toFixed(1)} />
      </div>
      <h6 style = {{display: 'flex', justifyContent: 'center', marginTop: 16}}>Updates every minute</h6>
    </div>
    
  );
}

export default App;
