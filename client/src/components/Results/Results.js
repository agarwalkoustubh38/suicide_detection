import React, { useState } from "react";
import { topics } from "./topics";
import Header from "../Header/Header";
import Interest from "./Interest";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Results.css";
export default function Results() {
  const location = useLocation();
  const data = location.state;
  // console.log(data);

  const [arr, setarr] = useState([
    "sports",
    "sitcoms",
    "nature",
    "entertainment",
    "films",
    "books",
  ]);
  let temp = "0";
  temp = data["val"];
  console.log(temp);

  let temp2 = data["result"];
  if (temp2.length == 0) temp2 = arr;
  // setarr();
  console.log(temp2);
  // setarr(temp2);
  return (
    <>
      <Header></Header>
      <div className="container m-5">
        <div>
          {temp ? (
            <>
              <h2>You may need to find help!</h2>
              <p>here are the helpline numbers</p>
              <li>93479823985</li>
              <li>22478912892</li>
            </>
          ) : (
            <h2>Yayy!! you are fine and healthy</h2>
          )}
        </div>
        <hr />
        <h3>Want to improve your mood? Read these topics</h3>
        {temp2.map((keyword) => (
          <Interest heading={keyword} arr_p={topics[keyword]}></Interest>
        ))}
      </div>
    </>
  );
}

//  return <div>{arr.map((keyword) => console.log(topics[keyword]))}</div>;
