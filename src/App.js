import marked from 'marked';
import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  return `<a id="tribute-link" href=${href} title=${title}" target="_blank">${text}</a>`;
}

const Header = (props) => {
  return (
    <div id="img-div" className="d-flex justify-content-between w-100 bg-secondary">
      <h5 className="p-2 m-0 text-center text-white d-flex align-items-center">
        <div className="logo--size">
          <img id="image" className="d-block img-fluid" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png" alt="logo" />
        </div>
        <span id="img-caption">{props.header}</span>
      </h5>
      <button className="bg-secondary border-0 d-block text-white p-2" onClick={props.onScreenChange} id={props.header}>
        {!props.fullScreen && <i className="fa fa-arrows-alt"></i>}
        {props.fullScreen && <i className="fa fa-angle-double-down"></i>}
      </button>
    </div>
  );
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: props.text
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    })
    this.props.handleChangeText(event.target.value);
  }
  render() {
    return (
      <div className="d-flex justify-content-center m-3 w-100">
        <div className="w-50">
          <Header onScreenChange={this.props.onScreenChange} header="Editor" fullScreen={this.props.fullScreen} />
          <textarea id="editor" type="text" rows="5" className="editor--overflow-auto w-100 px-3 py-2 bg-light" value={this.state.input} onChange={this.handleChange}>
            {this.state.input}
          </textarea>
        </div>
      </div>
    );
  }
}

const Preview = (props) => {
  return (
    <div id="tribute-info" className="d-flex justify-content-center m-3 w-100">
      <div className="w-75">
        <Header onScreenChange={props.onScreenChange} header="Previewer" fullScreen={props.fullScreen} />
        <div id="preview" className="previewer--min-height border editor--overflow-auto w-100 px-3 py-2 bg-light" dangerouslySetInnerHTML={{ __html: props.markdown }}>
        </div>
      </div>
    </div>
  );
}

const textSample = `
  # abc
  [links](https://www.freecodecamp.com)
  \`123\`
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: textSample,
      fullScreenEditor: false,
      fullScreenPreview: false
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.convertMarkdown = this.convertMarkdown.bind(this);
    this.changeScreenModeEditor = this.changeScreenModeEditor.bind(this);
    this.changeScreenModePreview = this.changeScreenModePreview.bind(this);
  }

  handleChangeText(text) {
    this.setState({
      text: text
    });
  }

  changeScreenModeEditor() {
    this.setState((prev) => {
      return {
        fullScreenEditor: !prev.fullScreenEditor,
        fullScreenPreview: false
      }
    })
  }

  changeScreenModePreview() {
    this.setState((prev) => {
      return {
        fullScreenPreview: !prev.fullScreenPreview,
        fullScreenEditor: false
      }
    })
  }

  convertMarkdown(text) {
    return marked(text, { renderer: renderer });
  }

  render() {
    return (
      <div id="main" className="p-5 d-flex justify-content-center align-items-center flex-column">
        <h4 id="title" className="text-secondary">
          Markdown Project
        </h4>
        <div className={this.state.fullScreenEditor ? 'w-100 box--fullscreen' : 'w-100'}>
          <Editor handleChangeText={this.handleChangeText} text={this.state.text} onScreenChange={this.changeScreenModeEditor} fullScreen={this.state.fullScreenEditor} />
        </div>

        <div className={this.state.fullScreenPreview ? 'w-100 box--fullscreen' : 'w-100'}>
          <Preview markdown={this.convertMarkdown(this.state.text)} onScreenChange={this.changeScreenModePreview} fullScreen={this.state.fullScreenPreview} />
        </div>
      </div>
    );
  }
}

export default App;