import React, { Component } from "react";
import { html } from "common-tags";
import "./index.css";
class Index extends Component {
  state = {
    snippet: null,
    trigger: null,
    description: null,
    clickCounter: true
  };

  defaultSnippet() {
    return html`
      /* --------------------------------------------
      Remove this comment and write your own snippet.
      Then copy and code -> Preferences -> user snippet
      to know how to use the place holder visit tge link below
      https://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets
      ------------------------------------------------*/
    `;
  }

  componentWillMount() {
    let defaultSnippet = this.defaultSnippet();
    this.setState({ snippet: defaultSnippet });
  }

  handleChange(e) {
    this.setState({ snippet: e.target.value });
  }

  handleTrigger(e) {
    this.setState({ trigger: e.target.value });
  }

  handleDescription(e) {
    this.setState({ description: e.target.value });
  }

  handleButtonClick() {
    this.setState({ clickCounter: true });
  }

  generateSnippet() {
    const inputSnippet = this.state.snippet;
    const lineStringArray = inputSnippet.replace(/"/g, '\\"').split("\n");
    const count = lineStringArray.length - 1;
    const outputSnippet = lineStringArray.map((endofline, iterator) => {
      return iterator < count ? `"${endofline}",` : `"${endofline}"`;
    });
    // eslint-disable-next-line
    return html`
    "${this.state.description}": {
      "prefix": "${this.state.trigger}",
      "body": [
        ${outputSnippet.join("\n")}
      ],
      "description": "${this.state.description}"
    }
  `;
  }

  render() {
    const htmlOutput = this.generateSnippet();

    return (
      <div className="row">
        <header>This Is Index Page</header>

        <input
          className="description_input"
          type="text"
          name="trigger"
          onChange={this.handleTrigger.bind(this)}
          placeholder="RCC"
          autofocus
        />
        <input
          className="description_input"
          type="text"
          name="description"
          onChange={this.handleDescription.bind(this)}
          placeholder="React Create Class"
        />

        <div className="column_left">
          <div id="input_textarea">
            <textarea
              rows="10"
              cols="100"
              value={this.state.snippet}
              onChange={this.handleChange.bind(this)}
            >
              {this.state.snippet}
            </textarea>
          </div>
        </div>

        <div className="column_right">
          <div id="output_textarea">
            {this.state.clickCounter ? (
              <textarea rows="10" cols="100" value={htmlOutput} readOnly />
            ) : (
              <button onClick={this.handleButtonClick.bind(this)}>
                Click me!
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
