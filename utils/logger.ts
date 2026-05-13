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

  const finalData = `[${caller}] : ${data}`;

  switch (level) {
    case LogLevel.INFO:
      console.info(finalData);
      break;
    case LogLevel.WARN:
      console.warn(finalData);
      break;
    case LogLevel.ERROR:
      console.error(finalData);
      break;
    case LogLevel.LOG:
      console.log(finalData);
      break;
    default:
      console.log(finalData);
  }
}
