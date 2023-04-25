import React, { useState } from "react";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./form.css";
import { useNavigate } from "react-router-dom";
import image5 from "../../images/back.jpg";
export default function Form(props) {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [users, setUsers] = useState(-1);
  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
    console.log(selectedOptions);
  };

  let temp = 0;
  const getApiData = async () => {
    const response = await fetch("http://localhost:8000/" + text);
    const parsedData = await response.json();
    //console.log(parsedData);
    temp = parsedData[text];
    console.log(temp);
    // setUsers(temp);
  };
  const handleSubmit = async () => {
    try {
      console.log(selectedOptions);

      await getApiData();
      const result = {
        result: selectedOptions,
        val: temp,
      };
      console.log(result);

      navigate("/result", { state: result });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (event) => {
    // console.log("On Change");
    setText(event.target.value);
  };

  const [text, setText] = useState("depress");
  //text = "new text"; // wrong way to change the text
  //setText("new text"); //Correct way to change the text

  return (
    <>
      <Header></Header>
      <div
        style={{ backgroundImage: `url(${image5})` }}
        className="container m-5 div_main"
      >
        <h5>How are you feeling now?</h5>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            rows="8"
            value={text}
            onChange={handleOnChange}
          ></textarea>
        </div>

        <h2>Interests</h2>
        <form className="form_css">
          <div>
            <input
              type="checkbox"
              name="interest"
              value="sports"
              checked={selectedOptions.includes("sports")}
              onChange={handleOptionChange}
            />
            <label className="txt" htmlFor="sports">
              Sports
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="interest"
              value="sitcoms"
              checked={selectedOptions.includes("sitcoms")}
              onChange={handleOptionChange}
            />
            <label className="txt" htmlFor="sitcoms">
              Sitcoms
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="interest"
              value="nature"
              checked={selectedOptions.includes("nature")}
              onChange={handleOptionChange}
            />
            <label className="txt" htmlFor="nature">
              Nature
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="interest"
              value="entertainment"
              checked={selectedOptions.includes("entertainment")}
              onChange={handleOptionChange}
            />
            <label className="txt" htmlFor="entertainment">
              Entertainment
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              name="interest"
              value="films"
              checked={selectedOptions.includes("films")}
              onChange={handleOptionChange}
            />
            <label className="txt" htmlFor="films">
              Films
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              name="interest"
              value="books"
              checked={selectedOptions.includes("books")}
              onChange={handleOptionChange}
            />
            <label className="txt" htmlFor="books">
              Books
            </label>
          </div>
        </form>
        <button className="btn btn-primary m-2" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}
