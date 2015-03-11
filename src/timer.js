var Timer = React.createClass({displayName: "Timer",
  render: function() {
    return (
      React.createElement("div", {className: "timer"}, 
      "Seconds remaining: ", this.props.countdown
      )
    );
  }
});

var Btn = React.createClass({displayName: "Btn",
  render: function() {
    return (
      React.createElement("button", {type: "button", onClick: this.props.execute}, this.props.value)
    );
  }
});

var Countdown = React.createClass({displayName: "Countdown",
  resetTimer: function() {
    this.setState({counter: 10});
    this.props.reset();
  },
  _tick: function() {
    if(this.state.counter > 0) {
      var self = this;
      setTimeout(
          function() {
            self.setState({counter: self.state.counter - 1});
            self._tick();
          }
        , 1000);
    } else {
      this.props.execute();
    }
  },
  startCountdown: function() {
    var count = this.state.counter;
    this._tick();
  },
  getInitialState: function() {
    return {counter: 10};
  },
  render: function() {
    return (
      React.createElement("div", {id: "countdown"}, 
      React.createElement(Timer, {countdown: this.state.counter}), 
      React.createElement(Btn, {execute: this.startCountdown, value: "Start countdown"}), 
      React.createElement(Btn, {execute: this.resetTimer, value: "Reset timer"})
      )
    );
  }
});

var App = React.createClass({displayName: "App",
  getInitialState: function() {
    return {messageStatus: "hidden"};
  },
  showMessage: function() {
    this.setState({messageStatus: ""});
  },
  hideMessage: function() {
    this.setState({messageStatus: "hidden"});
  },
  render: function() {
    return (
      React.createElement("div", {id: "application"}, 
        React.createElement(Countdown, {remaining: "10", execute: this.showMessage, reset: this.hideMessage}), 
        React.createElement("h1", {className: this.state.messageStatus}, this.props.message)
      )
      );
  }
});

React.render(
  React.createElement(App, {message: "Boom!"}),
  document.getElementById("content")
);
