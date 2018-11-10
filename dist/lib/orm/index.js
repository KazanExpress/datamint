"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../storable/entity");
const constructor_1 = require("./constructor");
exports.Connection = constructor_1.Connection;
class Product extends entity_1.Entity {
    constructor(options) {
        super(options);
    }
}
class User extends entity_1.Entity {
    constructor(options) {
        super(options);
    }
}
const orm = new exports.Connection('asd', [], {
    Products: Product,
    User
});
orm.User.add({
    name: 'max',
    birthDate: new Date(),
    cart: [
        new Product({
            title: 'podguzniki',
            url: '/package.json'
        })
    ]
});
orm.User.update(0, {});
orm.Products.delete(1);
//# sourceMappingURL=index.js.map