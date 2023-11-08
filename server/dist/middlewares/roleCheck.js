"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoleChecking = void 0;
const adminRoleChecking = (req, res, next) => {
    var _a;
    const role = (_a = req.person) === null || _a === void 0 ? void 0 : _a.role;
    if (role == "admin") {
        next();
    }
    else {
        res.status(403).json({ error: "Access denied, Unauthorised" });
    }
};
exports.adminRoleChecking = adminRoleChecking;
