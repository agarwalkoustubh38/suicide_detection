import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import stat1 from "../../images/bar_graph.png";
import stat2 from "../../images/pie_chart.png";
import stat3 from "../../images/suicides_year_wise.png";
import stat4 from "../../images/top_10_reasons.png";
export default function Homepage() {
  return (
    <>
      <Header></Header>
      <div className="container div_main">
        <div className="div1">
          <h5>
            1 out of 7 children among the age 15- to 24-year-olds feels
            depressed
          </h5>
          <img src={stat1} className="images" alt="stat1" />
          <img src={stat2} className="images" alt="stat2" />
        </div>
        <h4>Feeling lonely sad?</h4>
        <Link to={"/Form"} style={{ textDecoration: "none" }}>
          <button className="btn btn-warning btn-outline-dark m-3">
            Take Our Depression test now
          </button>
        </Link>
        <div className="div2">
          <img src={stat3} className="images" alt="stat3" />
          <img src={stat4} className="images" alt="stat4" />
        </div>
      </div>
    </>
  );
}
