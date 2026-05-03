import type {IAuditService, TAuditEvent} from './IAuditService.js';
import fs from "fs";

class AuditService implements IAuditService {
    log(event: TAuditEvent): void {
        const entry = JSON.stringify(event) + "\n"

        fs.appendFile("./audit.log", JSON.stringify(entry), 'utf8', err => {
            if (err) throw err;
        });
    }
}

export default AuditService;