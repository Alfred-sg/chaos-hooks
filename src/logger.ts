interface Logger {
  log?: Function,
  success?: Function,
  fail?: Function,
  [key: string]: any,
}

let logger: Logger = {
  log: console.log,
  success: console.log,
  fail: console.warn,
};

export const setLogger = (logger: Logger) => {
  logger = logger;
}

export const log = (...args: any[]) => {
  logger.log && logger.log(...args);
}

export const success = (...args: any[]) => {
  logger.success && logger.success(...args);
}

export const fail = (...args: any[]) => {
  logger.fail && logger.fail(...args);
}
