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
var IDBDatabaseHelper = /** @class */ (function () {
    function IDBDatabaseHelper(databaseName, version) {
        var _this = this;
        this.databaseName = 'kloak';
        this.version = 1;
        this.getObjectStore = function () { return new Promise(function (resolve, reject) {
            // eslint-disable-next-line no-undef
            var req = indexedDB.open(_this.databaseName, _this.version);
            req.onupgradeneeded = function (evt) { return __awaiter(_this, void 0, void 0, function () {
                var db, objectStore, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, evt.target.result];
                        case 1:
                            db = _a.sent();
                            return [4 /*yield*/, db.createObjectStore('data')];
                        case 2:
                            objectStore = _a.sent();
                            resolve(objectStore);
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            reject(err_1);
                            console.log('IDBDatabaseHelper error:', err_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            req.onsuccess = function (evt) { return __awaiter(_this, void 0, void 0, function () {
                var db, tx, objectStore, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, evt.target.result];
                        case 1:
                            db = _a.sent();
                            return [4 /*yield*/, db.transaction('data', 'readwrite')];
                        case 2:
                            tx = _a.sent();
                            return [4 /*yield*/, tx.objectStore('data')];
                        case 3:
                            objectStore = _a.sent();
                            resolve(objectStore);
                            return [3 /*break*/, 5];
                        case 4:
                            err_2 = _a.sent();
                            reject(err_2);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
        }); };
        this.save = function (uuid, data) { return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var objectStore, storeAction, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getObjectStore()];
                    case 1:
                        objectStore = _a.sent();
                        return [4 /*yield*/, (objectStore === null || objectStore === void 0 ? void 0 : objectStore.put(JSON.stringify(data), uuid))];
                    case 2:
                        storeAction = _a.sent();
                        storeAction.onsuccess = function () { return resolve(uuid); };
                        storeAction.onerror = function (evt) { return reject(evt); };
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        reject(err_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }); };
        this["delete"] = function (uuid) { return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var objectStore, storeAction, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getObjectStore()];
                    case 1:
                        objectStore = _a.sent();
                        return [4 /*yield*/, (objectStore === null || objectStore === void 0 ? void 0 : objectStore["delete"](uuid))];
                    case 2:
                        storeAction = _a.sent();
                        storeAction.onsuccess = function () { return resolve(uuid); };
                        storeAction.onerror = function (evt) { return reject(evt); };
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        reject(err_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }); };
        if (databaseName)
            this.databaseName = databaseName;
        if (version)
            this.version = version;
    }
    return IDBDatabaseHelper;
}());
exports["default"] = IDBDatabaseHelper;
