import { ControlComponent } from './app/control.component';
import { DisplayComponent } from './app/display.component';
import './assets/css/style.scss';

export function main() {
  const controlComponent = new ControlComponent();
  const displayComponent = new DisplayComponent();

  const mainEl = document.querySelector('.main');
  mainEl.innerHTML += controlComponent.render();
  mainEl.innerHTML += displayComponent.render();
}

// Mozilla, Opera, Webkit
if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", () => {
    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
    main();
  });
}
// If IE event model is used
else if (document.attachEvent) {
  document.attachEvent("onreadystatechange", () => {
    if (document.readyState === "complete") {
      document.detachEvent("onreadystatechange", arguments.callee);
      main();
    }
  });
}
