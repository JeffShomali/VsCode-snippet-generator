import React, { Component } from "react";

class Index extends Component {
  state = {
    input: null,
    trigger: null,
    description: null
  };

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleTrigger(e) {
    this.setState({ trigger: e.target.value });
  }

  handleDescription(e) {
    this.setState({ description: e.target.value });
  }

  render() {
    var htmlOutput = `${this.state.trigger}, ${this.state.description} \n ${this
      .state.input}`;

    return (
      <div>
        <h1>This is index page</h1>
        <input
          type="text"
          name="trigger"
          onChange={this.handleTrigger.bind(this)}
        />
        <input
          type="text"
          name="description"
          onChange={this.handleDescription.bind(this)}
        />

        <textarea
          rows="10"
          cols="100"
          value={this.state.input}
          onChange={this.handleChange.bind(this)}
        >
          {this.state.input}
        </textarea>
        <br />
        <br />

        <textarea rows="10" cols="100" value={htmlOutput} />
        <input
          type="text"
          value={`${this.state.trigger}, ${this.state.description}`}
        />
      </div>
    );
  }
}

export default Index;
