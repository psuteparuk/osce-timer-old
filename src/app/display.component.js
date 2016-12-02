import template from './display.template.ejs';

export class DisplayComponent {
  _template;

  constructor() {
    this._template = template;
  }

  render() {
    return this._template();
  }
}
