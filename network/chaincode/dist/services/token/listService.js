"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenListService = void 0;
class TokenListService {
    constructor(ctx) {
        this.ctx = ctx;
    }
    async call() {
        return await this.ctx.tokenRepository.select();
    }
}
exports.TokenListService = TokenListService;
//# sourceMappingURL=listService.js.map