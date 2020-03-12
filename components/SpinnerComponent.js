import React, { Component } from "react";
import { Container, Header, Content, Spinner, View } from "native-base";

export default class SpinnerComponent extends Component {
  render() {
    return <Spinner color="#d3d3d3" className="mt-5 " />;
  }
}
