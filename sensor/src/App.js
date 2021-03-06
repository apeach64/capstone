import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [sensorText , setSensorText] = useState("");
  const [commandTextToSend, setCommnadTextToSend] = useState("");
  useEffect(()=>{
    const loop = setInterval(()=>{
      axios.get('http://ec2-3-84-249-77.compute-1.amazonaws.com:8080/api/sensor').then((data) => {
	//axios로 get을 하는 경우 불러오는 데이터를 자동으로 json형태로 변환하여 얻어 JSON.parse를 사용하여 변환 X
	const json_data = JSON.parse(data.data);
	console.log(json_data);
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
    axios.post('http://ec2-3-84-249-77.compute-1.amazonaws.com:8080/api/command',JSON.stringify(toSend), {
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
