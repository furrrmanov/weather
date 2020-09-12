import React from "react";

import "./time-block.css";

export default class TimeBlock extends React.Component {
  state = {
    time: null,
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.getLocationTime(), 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.timezone !== prevProps.timezone) {
      this.getLocationTime();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getLocationTime = () => {
    let clock;

    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: `${this.props.timezone}`,
    };

    clock = new Date().toLocaleString("ru", options);

    this.setState({
      time: clock,
    });
  };

  render() {
    return <div className="time">{this.state.time}</div>;
  }
}
