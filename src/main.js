import { ControlComponent } from './app/control.component';
import { DisplayComponent } from './app/display.component';
import './assets/css/style.scss';

export function main() {
  const controlComponent = new ControlComponent();
  const displayComponent = new DisplayComponent();

  document.querySelector('.js-control').innerHTML = controlComponent.render();
  displayComponent
    .render()
    .subscribe((html) => {
      document.querySelector('.js-display').innerHTML = html;
    });
}

if (document.addEventListener) { // Mozilla, Opera, Webkit
  const run = () => {
    document.removeEventListener('DOMContentLoaded', run, false);
    main();
  };
  document.addEventListener('DOMContentLoaded', run);
} else if (document.attachEvent) { // If IE event model is used
  const run = () => {
    if (document.readyState === 'complete') {
      document.removeEventListener('onreadystatechange', run);
      main();
    }
  };
  document.attachEvent('onreadystatechange', run);
}
