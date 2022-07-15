import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [fedFund, setFedFund] = useState(null);
  const [bPolarity, setBPolarity] = useState(null);
  const [bSub, setBSub] = useState(null);
  const [gPolarity, setGPolarity] = useState(null);
  const [gSub, setGSub] = useState(null);
  const [beigeText, setBeigeText] = useState("");
  const [speechText, setSpeechText] = useState("");
  const backendAPIPoint =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/fedrate"
      : "https://predictfedfund-backend.herokuapp.com/fedrate";
  const predict = () => {
    fetch(backendAPIPoint, {
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

  useEffect(() => {
    const setProgressBars = () => {
      const gSubBar = document.querySelector(".gSubBar");
      const bSubBar = document.querySelector(".bSubBar");
      const gPolBar = document.querySelector(".gPolBar");
      const bPolBar = document.querySelector(".bPolBar");
      gSubBar.style.width = gSub * 100 + "%";
      gSubBar.innerHTML = (gSub * 100).toFixed(2) + "%";
      bSubBar.style.width = bSub * 100 + "%";
      bSubBar.innerHTML = (bSub * 100).toFixed(2) + "%";
      gPolBar.style.width = gPolarity * 100 + "%";
      gPolBar.innerHTML = (gPolarity * 100).toFixed(2) + "%";
      bPolBar.style.width = bPolarity * 100 + "%";
      bPolBar.innerHTML = (bPolarity * 100).toFixed(2) + "%";
    };
    setProgressBars();
  }, [gSub, bSub, gPolarity, bPolarity]);

  return (
    <div className="App">
      <div className="fedFund">
        <h2>
          Loan Loss Reserve To Total Loans Predicted Value:{" "}
          {(fedFund * 100).toFixed(2)}%
        </h2>
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
          <div className="bars">
            <h3>Subjectivity: </h3>
            <div className="progressBar">
              <div className="bSubBar"></div>
            </div>
          </div>
          <div className="bars">
            <h3>Polarity: </h3>
            <div className="progressBar">
              <div className="bPolBar"></div>
            </div>
          </div>
          {/* <h3>Subjectivity: {bSub.toFixed(4)}</h3>
          <h3>Polarity: {bPolarity.toFixed(4)}</h3> */}
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
          <div className="bars">
            <h3>Subjectivity: </h3>
            <div className="progressBar">
              <div className="gSubBar"></div>
            </div>
          </div>
          <div className="bars">
            <h3>Polarity: </h3>
            <div className="progressBar">
              <div className="gPolBar"></div>
            </div>
          </div>
          {/* <h3>Polarity: {gPolarity.toFixed(4)}</h3> */}
        </div>
      </div>
      <button onClick={predict}>Predict</button>
    </div>
  );
}

export default App;
