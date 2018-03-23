import { timerService } from './timer.service';
import template from './display.template.html';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import * as _ from 'lodash';

export class DisplayComponent {
  _compiledTemplate;
  _source;

  constructor() {
    this._compiledTemplate = _.template(template);
    this._source = timerService.getSource();
  }

  render() {
    return this._source
      .take(10)
      .map((val) => this._compiledTemplate({
        test: val,
      }));
  }
}
