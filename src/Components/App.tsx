// App.tsx
import { h, Component, render } from "preact";
import { Ampbin } from "../Classes/Ampbin";
import { Button } from "./Button";
import { Validator as ValidatorComponent } from "./Validator";

declare let amp: any;

interface AppInterface {
  app: Ampbin;
  editorId: string;
  previewId: string;
  callback: () => void;
}

interface AppState {
  loggedIn: boolean;
  valid: boolean;
  format: string;
}

class App extends Component<AppInterface, AppState> {
  constructor() {
    super();

    this.setState({ 
      loggedIn: false,
      valid: true,
      format: ''
    });

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event: any) {
    console.log(event.target.value);
    this.setState({format: event.target.value});
    this.props.app.getEditor().reset();
    // @TODO load a file that is valid for each format
  }

  render() {
    let inOut;
    if (this.state.loggedIn) {
      inOut = (
        <Button
          name="fa-sign-out-alt"
          onClick={() => {
            const result = this.props.app.getAuth().logout();
            result.then(() => {
              this.setState({loggedIn: false});
            });
          }}
        />
      );
    } else {
      inOut = (
        <Button
          name="fa-sign-in-alt"
          onClick={() => {
              // For some reason, setState is killing the editor
            const result = this.props.app.getAuth().loginWithGoogle();
            result.then((value) => {
              if(value) {
                return this.setState({loggedIn: true});
              }

              return this.setState({loggedIn: false});
            });
          }}
        />
      );
    }
    return (
      <div>
        <header class="header">
          <div class="col brand toolbar">
            AMPb.in
            <Button
              name="fa-file"
              onClick={() => {
                this.props.app.reset();
              }}
            />
            <Button
              name="fa-save"
              onClick={() => {
                this.props.app.save();
              }}
            />
            <Button
              name="fa-copy"
              onClick={() => {
                console.log("clicked");
              }}
            />
            <Button
              name="fa-share-alt-square"
              onClick={() => {
                console.log("clicked");
              }}
            />
            {inOut}
            <Button
              name="fa-question-circle"
              onClick={() => {
                console.log("clicked");
              }}
            />
            <select onChange={this.handleChange}>
              <option value="">AMPHTML</option>
              <option value="AMP4ADS">AMP4ADS</option>
              <option value="AMPEMAIL">AMPEMAIL</option>
            </select>
            <span className="header-right">
                <ValidatorComponent valid={this.state.valid} />
            </span>
          </div>
        </header>
        <div id={this.props.editorId} />
        <div id={this.props.previewId} />
      </div>
    );
  }

  componentDidMount() {
    this.props.callback();
    this.props.app.getFirebaseAuth().onAuthStateChanged((user) => {
      if(user) {
        return this.setState({loggedIn: true});
      }

      return this.setState({loggedIn: false});
    });
    this.props.app.getEditor().getCodemirror().on('change', (e) => {
      console.log(this.state.format);
      let result = amp.validator.validateString(e.getValue(), this.state.format /* pass in amp format */);
      if(result.status == "PASS") {
        this.setState({valid:true});
      } else {
        this.setState({valid:false});
        for(let i=0; i<result.errors.length; i++) {
          // console.log(result.errors[i].code);
          // console.log('line: ' + result.errors[i].line, 'column: ' + result.errors[i].col);
          // console.log(result.errors[i].specUrl);
        }
      }
    });
  }
}

/**
 * This loads the main preact component App
 * @param ampbin
 * @param containerId
 * @param editorId
 * @param previewId
 * @param callback
 * @return
 */
export function loadComponents(
  ampbin: Ampbin,
  containerId: string,
  editorId: string,
  previewId: string,
  callback: () => void
) {
  render(
    <App
      app={ampbin}
      editorId={editorId}
      previewId={previewId}
      callback={callback}
    />,
    document.getElementById(containerId)
  );
}
