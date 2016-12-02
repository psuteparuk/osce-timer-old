export function main() {
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
