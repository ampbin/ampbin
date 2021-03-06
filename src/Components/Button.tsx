import { h, Component } from 'preact';

export interface ButtonIcon {
  name: string;
  onClick: () => void;
  title: string;
  auth: boolean;
  hide: boolean;
}

export class Button extends Component<ButtonIcon> {

  render(props: ButtonIcon) {
    if(this.props.auth == false && this.props.hide == true) {
      return '';
    }
    return (
      <button class="fa-container" title={props.title} onClick={props.onClick}>
        <i class={'fal ' + props.name}></i>
      </button>
    );
  }

}
