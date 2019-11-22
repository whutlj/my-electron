function Observer() {
  this.events = {};
}
Observer.prototype.$on = function(eventName, callback) {
  if (this.events[eventName]) {
    this.events[eventName].push(callback);
  } else {
    this.events[eventName] = [callback];
  }
};
Observer.prototype.$emit = function(eventName, ...args) {
  if (this.events[eventName]) {
    this.events[eventName].forEach(cb => cb(...args));
  }
};

export default new Observer();
