import React from "react";
import PureComponent from "./PureComponent";

class Footer extends PureComponent {
  render() {
    var year = new Date().getFullYear();

    return (
      <div className="footer">
        <p>&copy; Julien Vanier {year}</p>
        <p>sleep icon by Matt Brooks from the Noun Project</p>
      </div>
    );
  }
}

export default Footer;
