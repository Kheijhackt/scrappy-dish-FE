export enum LogLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  LOG = "log",
}

const isDebugMode = process.env.EXPO_PUBLIC_DEBUG === "true";

export function logger(
  caller: string,
  data: any,
  level: LogLevel = LogLevel.LOG,
) {
  if (!isDebugMode || !data) return;

  const prefix = `[${caller}] :`;

  switch (level) {
    case LogLevel.INFO:
      console.info(prefix, data);
      break;
    case LogLevel.WARN:
      console.warn(prefix, data);
      break;
    case LogLevel.ERROR:
      console.error(prefix, data);
      break;
    case LogLevel.LOG:
      console.log(prefix, data);
      break;
    default:
      console.log(prefix, data);
  }
}
