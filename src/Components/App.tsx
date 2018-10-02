// App.tsx
import { h, Component, render } from "preact";
import { Ampbin } from "../Classes/Ampbin";
import { Button } from "./Button";

interface AppInterface {
  app: Ampbin;
  editorId: string;
  previewId: string;
  callback: () => void;
}

interface AppState {
  loggedIn: boolean;
}

class App extends Component<AppInterface, AppState> {
  constructor() {
    super();

    this.setState({ loggedIn: false });
  }

  render() {
    let inOut;
    if (this.state.loggedIn) {
      inOut = (
        <Button
          name="fa-sign-out-alt"
          onClick={() => {
            console.log("clicked");
          }}
        />
      );
    } else {
      inOut = (
        <Button
          name="fa-sign-in-alt"
          onClick={() => {
            console.log("clicked");
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
          </div>
        </header>
        <textarea id={this.props.editorId} />
        <div id={this.props.previewId} />
      </div>
    );
  }

  componentDidMount() {
    this.props.callback();
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