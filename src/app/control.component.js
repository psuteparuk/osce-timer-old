import template from './control.template.ejs';

export class ControlComponent {
  _template;

  constructor() {
    this._template = template;
  }

  render() {
    return this._template();
  }
}
