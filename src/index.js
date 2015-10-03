import React from "react";
import Root from "./containers/Root.jsx";

window.onload = () => {
  React.render(
    <Root />,
    document.querySelector("#root")
  );
};
