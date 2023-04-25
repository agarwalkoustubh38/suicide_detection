import React from "react";

export default function Interest(props) {
  console.log(props.heading);
  console.log(props.arr_p);
  return (
    <div>
      <h5>{props.heading}</h5>
      <hr />
      <div>
        {props.arr_p.map((url) => (
          <>
            <a href={url} target="_blank">
              {url}
            </a>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
}
