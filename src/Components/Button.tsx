import { h, Component } from 'preact';

export interface ButtonIcon {
  name: string;
  onClick: () => void;
  title: string;
}

export class Button extends Component<ButtonIcon> {

  render(props: ButtonIcon) {
    return (
      <button class="fa-container" title={props.title} onClick={props.onClick}>
        <i class={'fal ' + props.name}></i>
      </button>
    );
  }

}
