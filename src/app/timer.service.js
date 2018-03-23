import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/take';

class TimerService {
  _source;

  constructor() {
    this._source = Observable
      .interval(1000)
      .publish();
  }

  start() {
    this._source.connect();
  }

  getSource() {
    return this._source;
  }
}

// Singleton
export const timerService = new TimerService();
