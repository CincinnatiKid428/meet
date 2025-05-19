// src/components/Alert.jsx

import React, { Component } from 'react';

// Superclass for alert types
class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
    this.alertType = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "14px",
      margin: "10px 0",
      padding: "10px"
    };
  }

  render() {
    return (
      <div className="Alert" id={this.alertType}>
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(0, 0, 255)';
    this.bgColor = 'rgb(220, 220, 255)';
    this.alertType = 'info-alert'
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 0, 0)';
    this.bgColor = 'rgb(247, 172, 172)';
    this.alertType = 'error-alert';
  }
}

export { InfoAlert, ErrorAlert };