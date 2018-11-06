import { h, Component } from 'preact';

interface ValidatorProps {
  valid: boolean;
}

export class Validator extends Component<ValidatorProps> {

  render() {
    return (
      <div className={"validation-status center-text " + (this.props.valid ? 'pass': 'fail')}>
          <i class={"fal fa-thumbs-" + (this.props.valid ? 'up': 'down')}></i>
      </div>
    );
  }

}
