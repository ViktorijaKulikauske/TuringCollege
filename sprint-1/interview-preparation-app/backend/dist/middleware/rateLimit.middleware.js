"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitGuard = rateLimitGuard;
const rateLimitWindowMs = 60 * 1000;
const maxRequestsPerWindow = 30;
const ipRequestCounts = {};
function rateLimitGuard(req, res, next) {
    let ip = req.ip;
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") {
        ip = forwarded;
    }
    else if (Array.isArray(forwarded)) {
        ip = forwarded[0];
    }
    ip = ip || "unknown";
    const now = Date.now();
    if (!ipRequestCounts[ip]) {
        ipRequestCounts[ip] = { count: 1, lastReset: now };
        next();
        return;
    }
    const entry = ipRequestCounts[ip];
    if (now - entry.lastReset > rateLimitWindowMs) {
        entry.count = 1;
        entry.lastReset = now;
        next();
        return;
    }
    entry.count += 1;
    if (entry.count > maxRequestsPerWindow) {
        res
            .status(429)
            .json({ error: "Too many requests. Please try again later." });
        return;
    }
    next();
}
