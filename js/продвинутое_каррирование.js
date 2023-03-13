function curryPartial1(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
}

function curryPartial2(func, ...args0) {
  if (args0.length >= func.length) {
    return func.apply(this, args0);
  } else {
    return function (...args2) {
      return curryPartial2(func, ...args0, ...args2);
    };
  }
}
