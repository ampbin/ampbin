// App.tsx
import { h, Component, render } from "preact";
import { Ampbin } from "../Classes/Ampbin";
import { Button } from "./Button";
import { Validator as ValidatorComponent } from "./Validator";
import * as amp4ads from '../amp4ads.html';
import * as amp4email from '../amp4email.html';

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
  viewportSize: string;
}

class App extends Component<AppInterface, AppState> {
  constructor() {
    super();

    this.setState({ 
      loggedIn: false,
      valid: true,
      format: '',
      viewportSize: '50%'
    });

    this.handleChange = this.handleChange.bind(this);
    this.changeViewportSize = this.changeViewportSize.bind(this);

  }

  handleChange(event: any) {
    this.setState({format: event.target.value});
    if(this.state.format == "") {
      this.props.app.getEditor().reset();
    } else if(this.state.format == "AMP4ADS") {
      this.props.app.getEditor().getCodemirror().setValue(amp4ads);
    } else if(this.state.format == "AMP4EMAIL") {
      this.props.app.getEditor().getCodemirror().setValue(amp4email);
    }
    // @TODO load a file that is valid for each format
  }

  changeViewportSize(event: any) {
    this.setState({viewportSize: event.target.value});
  }

  render() {
    let inOut;
    if (this.state.loggedIn) {
      inOut = (
        <Button
          title="Sign out"
          name="fa-sign-out-alt"
          onClick={() => {
            const result = this.props.app.getAuth().logout();
            result.then(() => {
              this.setState({loggedIn: false});
            });
          }}
          auth={this.state.loggedIn}
          hide={false}
        />
      );
    } else {
      inOut = (
        <Button
          title="Sign in"
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
          auth={this.state.loggedIn}
          hide={false}
        />
      );
    }
    return (
      <div>
        <header class="header">
          <div class="col brand toolbar">
            AMPb.in
            <Button
              title="New bin"
              name="fa-file"
              onClick={() => {
                this.props.app.reset();
              }}
              auth={this.state.loggedIn}
              hide={false}
            />
            <Button
              title="Save bin"
              name="fa-save"
              onClick={() => {
                this.props.app.save();
              }}
              auth={this.state.loggedIn}
              hide={true}
            />
            <Button
              title="Share bin"
              name="fa-share-alt-square"
              onClick={() => {
                this.props.app.copyStaticUrl();
              }}
              auth={this.state.loggedIn}
              hide={true}
            />
            {inOut}
            <Button
              title=""
              name="fa-question-circle"
              onClick={() => {
                console.log("clicked");
              }}
              auth={this.state.loggedIn}
              hide={false}
            />
            <select onChange={this.handleChange}>
              <option value="">AMPHTML</option>
              <option value="AMP4ADS">AMP4ADS</option>
              <option value="AMP4EMAIL">AMP4EMAIL</option>
            </select>
            
            <span className="header-right">
              <div className="input-box">
                <span class="unit">Viewport Size</span>
                <input type="text" id="viewportSize" value={this.state.viewportSize} onKeyUp={this.changeViewportSize} />
              </div>
                <ValidatorComponent valid={this.state.valid} />
            </span>
          </div>
        </header>
        <div id={this.props.editorId} />
        <div id={this.props.previewId} style={{width: this.state.viewportSize}} />
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
