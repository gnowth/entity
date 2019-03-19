export default function setupWorkbox() {
  if ('serviceWorker' in navigator) {
    window.addEventListener(
      'load',
      () => navigator.serviceWorker
        .register('/service-worker.js')
        .catch(console.error), // eslint-disable-line no-console
    );
  }
}
