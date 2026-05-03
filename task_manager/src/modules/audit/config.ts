import path from "path";
const configPath = process.env.CONFIG_PATH;
const configDir = path.dirname(configPath);
const logDir = path.join(configDir, "logs");
const logFilePath = path.join(logDir, "audit.log");

export const AUDIT_CONFIG = {
    logDir,
    logFilePath,
}