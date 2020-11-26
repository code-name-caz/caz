"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(key) {
        this.type = this.constructor.name;
        this.key = key;
    }
    static makeKey(keyParts) {
        return keyParts.join(Entity.keyDelimiter);
    }
    static splitKey(key) {
        return key.split(Entity.keyDelimiter);
    }
}
exports.Entity = Entity;
Entity.keyDelimiter = ':';
//# sourceMappingURL=entity.js.map