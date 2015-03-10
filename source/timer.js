var Timer = React.createClass({
  render: function() {
    return (
      <div className="timer">
      Seconds remaining: {this.props.countdown}
      </div>
    );
  }
});

var Btn = React.createClass({
  render: function() {
    return (
      <button type="button" onClick={this.props.execute}>{this.props.value}</button>
    );
  }
});

var Countdown = React.createClass({
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
      <div id="countdown">
      <Timer countdown={this.state.counter}></Timer>
      <Btn execute={this.startCountdown} value="Start countdown"></Btn>
      <Btn execute={this.resetTimer} value="Reset timer"></Btn>
      </div>
    );
  }
});

var App = React.createClass({
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
      <div id="application">
        <Countdown remaining="10" execute={this.showMessage} reset={this.hideMessage}></Countdown>
        <h1 className={this.state.messageStatus}>{this.props.message}</h1>
      </div>
      );
  }
});

React.render(
  <App message="Boom!"></App>,
  document.getElementById("content")
);
