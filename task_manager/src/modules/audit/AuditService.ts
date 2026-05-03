import type {IAuditService, TAuditEvent} from './IAuditService.js';
import {AUDIT_CONFIG} from "./config.js";
import fs from "fs";

class AuditService implements IAuditService {
    log(event: TAuditEvent): void {
        const entry = JSON.stringify(event) + "\n"

        fs.mkdir(AUDIT_CONFIG.logDir, { recursive: true } , (err) => {
            if (err) throw err;
        });

        fs.appendFile(AUDIT_CONFIG.logFilePath, JSON.stringify(entry), 'utf8', err => {
            if (err) throw err;
        });
    }
}

export default AuditService;