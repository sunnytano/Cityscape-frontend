import React from "react";
import '../App.css'

class Marker extends React.Component {
  render() {
    return (
    <div className="marker">
      {this.props.price}
    </div>
    )
  }
}
export default Marker;
