export const sleep = (timeInMs: number): Promise<void> =>
  new Promise(resolve => {
    window.setTimeout(resolve, timeInMs);
  });
