export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const delayPayload = (ms, payload) =>
  new Promise(resolve => setTimeout(() => resolve(payload), ms));
