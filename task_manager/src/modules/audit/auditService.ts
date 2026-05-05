import type { IAuditService, TAuditEvent } from "./IAuditService.js";
import { AUDIT_CONFIG } from "./config.js";
import fs from "fs";

class AuditService implements IAuditService {
  log(event: TAuditEvent): void {
    const entry = `[${event.occurredAt}] ${event.operation} | id=${event.entityId} | ${JSON.stringify(event.payload)}\n`;

    fs.mkdir(AUDIT_CONFIG.logDir, { recursive: true }, (err) => {
      if (err) throw err;
    });

    fs.appendFile(AUDIT_CONFIG.logFilePath, entry, "utf8", (err) => {
      if (err) throw err;
    });
  }
}

export default AuditService;
