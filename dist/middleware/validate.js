"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = {};
        errors.array().map((err) => (error[err.param] = err.msg));
        return res.status(422).json({ error });
    }
    next();
};
exports.default = validate;
//# sourceMappingURL=validate.js.map