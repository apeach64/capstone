import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [sensorText , setSensorText] = useState("");
  const [commandTextToSend, setCommnadTextToSend] = useState("");
  useEffect(()=>{
    const loop = setInterval(()=>{
      axios.get('http://localhost:8080/api/sensor').then((data) => {
        const json_data = JSON.parse(data.data)
        setSensorText(json_data.data);
    })
    },500);
  }, [])
  
  const onInputChange = (event) => {
    setCommnadTextToSend(event.target.value);
  }

  const sendComandTextHandler = () => {
    const toSend = {
      data:commandTextToSend,
      time: Date.now()
    };
    console.log(toSend);
    axios.post('http://localhost:8080/api/command',JSON.stringify(toSend), {
      headers:{
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p style={{
          'fontSize': '50px'
        }}>
          {sensorText}
        </p>
        <input type="text" onChange={onInputChange}></input>
        <button style={{
          'width': 'auto',
          'height': 20
        }} onClick={sendComandTextHandler}>Summit</button>
      </header>
    </div>
  );
}

export default App;