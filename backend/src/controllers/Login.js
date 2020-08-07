"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LoginController = void 0;
var typeorm_1 = require("typeorm");
var crypto = require("crypto");
var User_1 = require("../entity/User");
var utils_1 = require("../utils");
var database_1 = require("../database");
var bcrypt = require("bcrypt");
var Access_1 = require("../entity/Access");
var nodemailer = require("nodemailer");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.insert = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, connection, user, token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = { email: req.body.email,
                            password: req.body.password };
                        return [4 /*yield*/, typeorm_1.createConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, database_1.UserDatabase.getUser(connection, data.email)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            res.status(500).send({ success: false, message: "Usuário não encontrado" });
                            connection.close();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, bcrypt.compare(data.password, user.passwordHash)];
                    case 3:
                        if (!_a.sent()) return [3 /*break*/, 5];
                        token = crypto.randomBytes(20).toString('hex');
                        ;
                        return [4 /*yield*/, AccessDatabase.createAccess(connection, user, token)];
                    case 4:
                        response = _a.sent();
                        res.send({ success: true, token: token });
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(500).send({ success: false, message: "Senha inválida" });
                        _a.label = 6;
                    case 6:
                        connection.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.forgot = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, connection, userRepository, user, token, now, transport, mailOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        return [4 /*yield*/, typeorm_1.createConnection()];
                    case 1:
                        connection = _a.sent();
                        userRepository = connection.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne({ email: email })];
                    case 2:
                        user = _a.sent();
                        if (!(user === undefined)) return [3 /*break*/, 3];
                        res.status(500).send({ success: false, message: "Usuário não encontrado" });
                        connection.close();
                        return [2 /*return*/];
                    case 3:
                        token = crypto.randomBytes(20).toString('hex');
                        now = new Date();
                        now.setHours(now.getHours() + 1);
                        user.passwordResetToken = token;
                        user.passwordResetExpires = now;
                        return [4 /*yield*/, userRepository.save(user)];
                    case 4:
                        _a.sent();
                        transport = nodemailer.createTransport({
                            host: "smtp.mailtrap.io",
                            port: 2525,
                            auth: {
                                user: "dde70d2c456687",
                                pass: "54936f07fd5612"
                            }
                        });
                        mailOptions = {
                            from: "no-reply@findamechanic",
                            to: email,
                            subject: "Recuperação de acesso",
                            text: "Use este token (" + token + ") para redefinir sua senha em até 1h."
                        };
                        transport.sendMail(mailOptions, function (error, info) {
                            if (error)
                                res.status(500).send({ success: false, message: "Erro ao enviar Token para o e-mail " + email + "." });
                            else
                                console.log("E-mail enviado com sucesso.");
                        });
                        //Fim do envio de e-mail
                        connection.close();
                        res.status(200).send({ success: true, user: user });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.reset = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, connection, userRepository, user, now, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = { email: req.body.email,
                            password: req.body.password,
                            passwordResetToken: req.body.token };
                        return [4 /*yield*/, typeorm_1.createConnection()];
                    case 1:
                        connection = _b.sent();
                        userRepository = connection.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne(data.email)];
                    case 2:
                        user = _b.sent();
                        if (!user) {
                            res.status(500).send({ success: false, message: "Usuário não encontrado." });
                            connection.close();
                            return [2 /*return*/];
                        }
                        if (data.passwordResetToken != user.passwordResetToken) {
                            res.status(500).send({ success: false, message: "Token inválido." });
                            connection.close();
                            return [2 /*return*/];
                        }
                        now = new Date();
                        if (now > user.passwordResetExpires) {
                            res.status(500).send({ success: false, message: "Token expirado, gere um novo." });
                            connection.close();
                            return [2 /*return*/];
                        }
                        _a = user;
                        return [4 /*yield*/, utils_1.generateSaltedPassword(data.password)];
                    case 3:
                        _a.passwordHash = _b.sent();
                        return [4 /*yield*/, userRepository.save(user)];
                    case 4:
                        _b.sent();
                        connection.close();
                        res.status(200).send({ success: true, user: user });
                        return [2 /*return*/];
                }
            });
        });
    };
    return LoginController;
}());
exports.LoginController = LoginController;
var AccessDatabase = {
    createAccess: function (connection, user, userToken) {
        return __awaiter(this, void 0, void 0, function () {
            var accessRepository, access;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accessRepository = connection.getRepository(Access_1.Access);
                        access = new Access_1.Access();
                        access.user = user;
                        access.userToken = userToken;
                        return [4 /*yield*/, accessRepository.save(access)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
};
