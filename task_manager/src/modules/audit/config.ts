import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname, "logs");
const logFilePath = path.join(logDir, "audit.log");

export const AUDIT_CONFIG = {
    logDir,
    logFilePath,
}