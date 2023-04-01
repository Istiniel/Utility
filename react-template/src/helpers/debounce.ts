export const debounce = (
  fn: () => void,
  observable: { timeout: ReturnType<typeof setTimeout> | null },
  ms = 500
): void => {
  if (observable.timeout === null) {
    observable.timeout = setTimeout(() => {
      fn();
      observable.timeout = null;
    }, ms);
  }
};
