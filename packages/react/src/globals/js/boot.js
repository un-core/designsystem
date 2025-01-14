import { settings } from './settings';
import * as components from './components';

/**
 * The handles for event handlers to lazily instantiate components.
 * @type {Handle[]}
 */
const lazyInitHandles = [];

/**
 * Instantiates components automatically
 * by searching for elements with `data-component-name` (e.g. `data-loading`) attribute
 * or upon DOM events (e.g. clicking) on such elements.
 * See each components' static `.init()` methods for details.
 * @private
 */
const init = () => {
  const componentClasses = Object.keys(components)
    .map((key) => components[key])
    .filter((component) => typeof component.init === 'function');
  if (!settings.disableAutoInit) {
    componentClasses.forEach((Clz) => {
      const h = Clz.init();
      if (h) {
        lazyInitHandles.push(h);
      }
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOMContentLoaded has been fired already
  // Let consumer have chance to see if it wants automatic instantiation disabled, and then run automatic instantiation otherwise
  setTimeout(init, 0);
}

export default lazyInitHandles;
