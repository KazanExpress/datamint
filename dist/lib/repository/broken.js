"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class BrokenRepository extends base_1.Repository {
    get API() {
        return this.api;
    }
}
exports.BrokenRepository = BrokenRepository;
//# sourceMappingURL=broken.js.map