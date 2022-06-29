import "./App.css";
import React, { useState } from "react";

function App() {
  const [fedFund, setFedFund] = useState(null);
  const [bPolarity, setBPolarity] = useState(null);
  const [bSub, setBSub] = useState(null);
  const [gPolarity, setGPolarity] = useState(null);
  const [gSub, setGSub] = useState(null);
  const [beigeText, setBeigeText] = useState("");
  const [speechText, setSpeechText] = useState("");
  const predict = () => {
    // fetch("https://predictfedfund-backend.herokuapp.com/fedrate", {
    fetch("http://localhost:5000/fedrate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        beigeText: beigeText,
        speechText: speechText,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFedFund(data[0]);
        setBPolarity(data[1]);
        setBSub(data[2]);
        setGPolarity(data[3]);
        setGSub(data[4]);
      });
  };

  return (
    <div className="App">
      <div className="fedFund">
        <h2>Fed Fund Prediction: {fedFund}</h2>
      </div>
      <div className="textboxes">
        <div>
          <h1>Beige Book</h1>
          <textarea
            type="text"
            name="beigeBook"
            placeholder="Type here"
            value={beigeText}
            onChange={(e) => setBeigeText(e.target.value)}
            rows="30"
            cols="60"
          ></textarea>
          <h3>Subjectivity: {bSub}</h3>
          <h3>Polarity: {bPolarity}</h3>
        </div>
        <div>
          <h1>Governer's Speech</h1>
          <textarea
            type="text"
            name="governersSpeech"
            placeholder="Type here"
            value={speechText}
            onChange={(e) => setSpeechText(e.target.value)}
            rows="30"
            cols="60"
          ></textarea>
          <h3>Subjectivity: {gSub}</h3>
          <h3>Polarity: {gPolarity}</h3>
        </div>
      </div>
      <button onClick={predict}>Predict Fed Fund</button>
    </div>
  );
}

export default App;
