import React, { Component } from "react";
import { Container, Header, Content, Spinner } from "native-base";

export default class SpinnerComponent extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Spinner color="#dddddd" className="mt-5" />
        </Content>
      </Container>
    );
  }
}
