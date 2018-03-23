class Util {
  bindEvent(el, eventName, eventHandler) {
    if (el.addEventListener) {
      el.addEventListener(eventName, eventHandler, false);
    } else if (el.attachEvent) {
      el.attachEvent(`on${eventName}`, eventHandler);
    }
  }

  unbindEvent(el, eventName, eventHandler) {
    if (el.removeEventListener) {
      el.removeEventListener(eventName, eventHandler, false);
    } else if (el.detachEvent) {
      el.detachEvent(`on${eventName}`, eventHandler);
    }
  }
}

// Singleton
export const util = new Util();
