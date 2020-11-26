"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenContract = void 0;
const bignumber_js_1 = require("bignumber.js");
const fabric_contract_api_1 = require("fabric-contract-api");
const contexts_1 = require("../contexts");
const responses_1 = require("../responses");
const token_1 = require("../services/token");
const listService_1 = require("../services/token/listService");
let TokenContract = class TokenContract extends fabric_contract_api_1.Contract {
    constructor() {
        super('token');
    }
    createContext() {
        return new contexts_1.TokenContext();
    }
    async getAddress(ctx) {
        return new responses_1.AddressResponse(ctx.getAddress());
    }
    async create(ctx, symbol, name, decimals, totalSupply) {
        const createToken = new token_1.TokenCreateService(ctx);
        await createToken.call(symbol, name, decimals, new bignumber_js_1.default(totalSupply), ctx.getAddress());
    }
    async find(ctx, symbol) {
        const findService = new token_1.TokenFindService(ctx);
        const token = await findService.call(symbol);
        return new responses_1.TokenResponse(token);
    }
    async tokens(ctx) {
        const getTokensService = new listService_1.TokenListService(ctx);
        const tokens = await getTokensService.call();
        return tokens.map((token) => new responses_1.TokenResponse(token));
    }
    async mine(ctx, symbol) {
        const mineToken = new token_1.TokenMineService(ctx);
        await mineToken.call(symbol, ctx.getAddress());
    }
    async transfer(ctx, symbol, address, amount) {
        const transferToken = new token_1.TokenTransferService(ctx);
        await transferToken.call(symbol, new bignumber_js_1.default(amount), ctx.getAddress(), address);
    }
    async balance(ctx, symbol) {
        const balanceService = new token_1.TokenGetBalanceService(ctx);
        const balance = await balanceService.call(symbol, ctx.getAddress());
        return new responses_1.BalanceResponse(symbol, balance);
    }
    async balances(ctx) {
        const getTokensService = new listService_1.TokenListService(ctx);
        const getBalanceService = new token_1.TokenGetBalanceService(ctx);
        const tokens = await getTokensService.call();
        const balances = [];
        tokens.forEach(async (token) => {
            const balance = await getBalanceService.call(token.symbol, ctx.getAddress());
            balances.push(new responses_1.BalanceResponse(token.symbol, balance));
        });
        return balances;
    }
};
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contexts_1.TokenContext]),
    __metadata("design:returntype", Promise)
], TokenContract.prototype, "getAddress", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contexts_1.TokenContext, String, String, Number, String]),
    __metadata("design:returntype", Promise)
], TokenContract.prototype, "create", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contexts_1.TokenContext, String]),
    __metadata("design:returntype", Promise)
], TokenContract.prototype, "find", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contexts_1.TokenContext]),
    __metadata("design:returntype", Promise)
], TokenContract.prototype, "tokens", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contexts_1.TokenContext, String]),
    __metadata("design:returntype", Promise)
], TokenContract.prototype, "mine", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contexts_1.TokenContext, String, String, String]),
    __metadata("design:returntype", Promise)
], TokenContract.prototype, "transfer", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contexts_1.TokenContext, String]),
    __metadata("design:returntype", Promise)
], TokenContract.prototype, "balance", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contexts_1.TokenContext]),
    __metadata("design:returntype", Promise)
], TokenContract.prototype, "balances", null);
TokenContract = __decorate([
    fabric_contract_api_1.Info({ title: 'Token', description: 'Smart contract for token' }),
    __metadata("design:paramtypes", [])
], TokenContract);
exports.TokenContract = TokenContract;
//# sourceMappingURL=tokenContract.js.map