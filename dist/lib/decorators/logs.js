"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("../debug");
function prints(messageHandler, level = 'log', type = '*', force = false) {
    return (target, key, desc) => {
        const _print = function () {
            const p = _ => {
                let context = '';
                if (target.constructor && target.constructor.name) {
                    context = `${target.constructor.name}:${String(key)}`;
                }
                else if (target.name) {
                    context = `${target.name}:${String(key)}`;
                }
                else if (this.name) {
                    context = `${this.name}:${String(key)}`;
                }
                debug_1.print(context, type, _, level, force);
            };
            if (typeof messageHandler === 'function') {
                p(messageHandler.apply(this, arguments));
            }
            else {
                p(messageHandler);
            }
        };
        const assignDescValue = (d) => {
            let original = d.value;
            d.get = function () {
                _print.apply(this, [key, original]);
                return original;
            };
            d.set = function (v) {
                _print.apply(this, [key, original, v]);
                original = v;
            };
        };
        if (desc) {
            if (typeof desc.value === 'function') {
                let original = desc.value;
                desc.value = function () {
                    _print.apply(this, arguments);
                    return original.apply(this, arguments);
                };
            }
            else if (typeof desc.value !== 'undefined' || desc.set) {
                assignDescValue(desc);
            }
        }
        else {
            const d = {};
            if (d.get) {
                const original = d.get;
                d.get = function () {
                    _print.apply(this);
                    return original.apply(this);
                };
            }
            else {
                assignDescValue(d);
            }
            Reflect.deleteProperty(target, key);
            Reflect.defineProperty(target, key, d);
        }
    };
}
exports.prints = prints;
//# sourceMappingURL=logs.js.map