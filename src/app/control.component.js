import { timerService } from './timer.service';
import template from './control.template.html';
import { util } from './lib/util';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEventPattern';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

export class ControlComponent {
  _compiledTemplate;
  _el;

  numStationsInput;
  tpsMinutesInput;
  tpsSecondsInput;
  reminderMinutesInput;
  reminderSecondsInput;

  constructor() {
    this._compiledTemplate = _.template(template);
    this._el = document.createElement('html');
    this._el.innerHTML = template;

    this.numStationsInput = this._el.querySelector('input[name="num-stations"]');
    this.tpsMinutesInput = this._el.querySelector('input[name="tps-minutes"]');
    this.tpsSecondsInput = this._el.querySelector('input[name="tps-seconds"]');
    this.reminderMinutesInput = this._el.querySelector('input[name="reminder-minutes"]');
    this.reminderSecondsInput = this._el.querySelector('input[name="reminder-seconds"]');

    const runButton = this._el.querySelector('.run-btn');
    const clearButton = this._el.querySelector('.clear-btn');

    const runClick = Observable
      .fromEventPattern(
        (handler) => util.bindEvent(runButton, 'click', handler),
        (handler) => util.unbindEvent(runButton, 'click', handler)
      )
      .share();

    runClick.subscribe(() => this.start());
  }

  render() {
    return this._compiledTemplate();
  }

  start() {
    console.log('start');
    timerService.start();
  }
}
