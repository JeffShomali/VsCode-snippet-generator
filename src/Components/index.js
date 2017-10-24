import React, { Component } from "react";
import { html } from "common-tags";
import brace from "brace";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/solarized_dark";
import "./index.css";

class Ace extends Component {
  state = {
    snippet: null,
    trigger: null,
    description: null,
    clickCounter: true
  };

  defaultSnippet() {
    return html`
      /* 

      Remove this comment and write your own snippet.
      Then copy and paste -> Preferences -> User Snippet.

      */
    `;
  }

  componentWillMount() {
    let defaultSnippet = this.defaultSnippet();
    this.setState({ snippet: defaultSnippet });
  }

  handleChange(newValue) {
    this.setState({ snippet: newValue });
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
        <div className="row">
          <input
            className="description_input"
            type="text"
            name="trigger"
            onChange={this.handleTrigger.bind(this)}
            placeholder="RCCC"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="off"
            autoComplete="off"
            autoFocus
          />
          <input
            className="description_input"
            type="text"
            name="description"
            onChange={this.handleDescription.bind(this)}
            placeholder="React Create Class Components"
            placeholder="RCCC"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="off"
            autoComplete="off"
          />
        </div>

        <div className="column">
          <AceEditor
            mode="javascript"
            theme="solarized_dark"
            width="100%"
            height="1000px"
            name="snippet"
            onLoad={this.onLoad}
            value={this.state.snippet}
            onChange={this.handleChange.bind(this)}
            fontSize={13}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2
            }}
          />
        </div>

        <div className="column">
          <AceEditor
            mode="javascript"
            theme="solarized_dark"
            name="snippet"
            width="100%"
            height="1000px"
            onLoad={this.onLoad}
            value={htmlOutput}
            onChange={this.handleChange.bind(this)}
            fontSize={13}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2
            }}
            readOnly
          />
        </div>
      </div>
    );
  }
}

export default Ace;
