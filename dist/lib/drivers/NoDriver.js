"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const entry_1 = require("../entry");
class NoDriver {
    isSuitable() {
        return true;
    }
    setName(name) { }
    get(key, fetchHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            return new entry_1.default(this, key, null);
        });
    }
    add(key, entry, fetchHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
}
exports.NoDriver = NoDriver;
//# sourceMappingURL=NoDriver.js.map