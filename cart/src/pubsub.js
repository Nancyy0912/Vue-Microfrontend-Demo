const globalListenersKey = '__pubsub_listeners__';

const getGlobalListeners = () => {
  if (!window[globalListenersKey]) {
    window[globalListenersKey] = {};
  }
  return window[globalListenersKey];
};

export const pubsub = {
  subscribe: (event, callback) => {
    const listeners = getGlobalListeners();

    if (!listeners[event]) {
      listeners[event] = [];
    }
    listeners[event].push(callback);
  },
  publish: (event, data) => {
    const listeners = getGlobalListeners();

    if (listeners[event]) {
      listeners[event].forEach((callback) => callback(data));
    }
  },
};
