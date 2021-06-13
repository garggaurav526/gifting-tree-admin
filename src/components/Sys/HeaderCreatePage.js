import React, { Component } from "react";
import { Form, Icon, Header } from "semantic-ui-react";
import "../../App.scss";

export default class HeaderCreatePage extends Component {
  render() {
      const {heading, subHeading} = this.props
    return (
      <div className="header-page-section">
          <Header as='h2'>
            <Header.Content>
            {heading}
            <Icon name='angle right' />
            <Header.Subheader>{subHeading}</Header.Subheader>
            </Header.Content>
        </Header>
      </div>
    );
  }
}
