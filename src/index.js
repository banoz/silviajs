import React from "react";
import { createRoot } from "react-dom/client";
import Root from "./containers/Root.jsx";

window.onload = () => {

  const domNode = document.getElementById("root");
  const root = createRoot(domNode);

  root.render(<Root />);
};
