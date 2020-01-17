export function on(obj) {
  const args = [];
  for (let i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }
  return obj.addEventListener.apply(obj, args);
}

export function off(obj) {
  const args = [];
  for (let i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }
  return obj.removeEventListener.apply(obj, args);
}
