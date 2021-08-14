/**
 * @param {Function} func
 * @param {number} delay
 */
export const debounce = (func, delay, noContext = true) => {
    let debounceTimer;
    return function debouncedFn() {
      const context = this;
      // eslint-disable-next-line prefer-rest-params
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (noContext) {
          func(...args);
        } else {
          func.apply(context, args);
        }
      }, delay);
    };
  };
