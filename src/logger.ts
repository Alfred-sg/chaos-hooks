interface Logger {
  enableLogger?: boolean,
  log?: Function,
  success?: Function,
  fail?: Function,
  [key: string]: any,
}

let logger: Logger = {
  log: console.log,
  fail: console.warn,
};

export const enableLogger = (enable: boolean) => {
  logger.enableLogger = enable;
}

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
