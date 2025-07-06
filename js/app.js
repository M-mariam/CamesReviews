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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var Ui = /** @class */ (function () {
    function Ui() {
    }
    Ui.prototype.displayGamesData = function (data) {
        var gamesCard = '';
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var game = data_1[_i];
            gamesCard += "\n        <div class=\"col-md-4\">\n          <div class=\"card\" role=\"button\" data-id=\"".concat(game.id, "\">\n            <div class=\"card-content\">\n              <div class=\"main-img position-relative\">\n                <img class=\"card-img-top object-fit-cover h-100\" src=\"").concat(game.thumbnail, "\" alt=\"").concat(game.title, " Thumbnail\">\n              </div>\n              <div class=\"content\">\n                <div class=\"hstack justify-content-between\">\n                  <h3 class=\"h6 small text-white\">").concat(game.title, "</h3>\n                  <span class=\"badge text-bg-primary p-2\">Free</span>\n                </div>\n                <p class=\"card-text small text-center opacity-50\">\n                  ").concat(game.short_description.split(" ", 8).join(" "), "\n                </p>\n              </div>\n              <footer class=\"card-footer small d-flex justify-content-between\">\n                <span class=\"badge badge-color\">").concat(game.genre, "</span>\n                <span class=\"badge badge-color\">").concat(game.platform, "</span>\n              </footer>\n            </div>\n          </div>\n        </div>");
        }
        var rowData = document.getElementById("rowData");
        if (rowData) {
            rowData.innerHTML = gamesCard;
        }
    };
    Ui.prototype.displayDetails = function (data) {
        var content = "\n      <div class=\"col-md-4\">\n        <img src=\"".concat(data.thumbnail, "\" class=\"w-100\" alt=\"image details\" />\n      </div>\n      <div class=\"col-md-8\">\n        <h3 class=\"text-white\">Title: ").concat(data.title, "</h3>\n        <p class=\"text-white\">Category: <span class=\"badge text-bg-info\">").concat(data.genre, "</span></p>\n        <p class=\"text-white\">Platform: <span class=\"badge text-bg-info\">").concat(data.platform, "</span></p>\n        <p class=\"text-white\">Status: <span class=\"badge text-bg-info\">").concat(data.status, "</span></p>\n        <p class=\"small text-white\">").concat(data.description, "</p>\n        <a class=\"btn btn-outline-warning\" target=\"_blank\" href=\"").concat(data.game_url, "\">Show Game</a>\n      </div>");
        var contentDetails = document.getElementById("contentDetails");
        if (contentDetails) {
            contentDetails.innerHTML = content;
        }
    };
    return Ui;
}());
var Details = /** @class */ (function () {
    function Details(id) {
        this.ui = new Ui();
        this.initClose();
        this.getDetails(id);
    }
    Details.prototype.initClose = function () {
        var btnClose = document.getElementById("btnClose");
        btnClose === null || btnClose === void 0 ? void 0 : btnClose.addEventListener("click", function () {
            var _a, _b;
            (_a = document.querySelector(".games")) === null || _a === void 0 ? void 0 : _a.classList.remove("d-none");
            (_b = document.querySelector(".details")) === null || _b === void 0 ? void 0 : _b.classList.add("d-none");
        });
    };
    Details.prototype.getDetails = function (idGame) {
        return __awaiter(this, void 0, void 0, function () {
            var loading, options, api, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loading = document.querySelector(".loading");
                        loading === null || loading === void 0 ? void 0 : loading.classList.remove("d-none");
                        options = {
                            method: 'GET',
                            headers: {
                                'x-rapidapi-key': '337ea965d5msh628726a3b2ed715p1654bajsn809d11d2e54d',
                                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch("https://free-to-play-games-database.p.rapidapi.com/api/game?id=".concat(idGame), options)];
                    case 2:
                        api = _a.sent();
                        return [4 /*yield*/, api.json()];
                    case 3:
                        response = _a.sent();
                        this.ui.displayDetails(response);
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _a.sent();
                        console.error("Details error:", err_1);
                        return [3 /*break*/, 6];
                    case 5:
                        loading === null || loading === void 0 ? void 0 : loading.classList.add("d-none");
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Details;
}());
var Games = /** @class */ (function () {
    function Games() {
        var _this = this;
        this.ui = new Ui();
        this.getGames("mmorpg");
        document.querySelectorAll('.menu a').forEach(function (link) {
            link.addEventListener("click", function (e) {
                var _a;
                var target = e.target;
                (_a = document.querySelector(".menu .active")) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
                target.classList.add("active");
                var category = target.getAttribute("data-category");
                if (category) {
                    _this.getGames(category);
                }
            });
        });
    }
    Games.prototype.getGames = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var loading, options, api, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loading = document.querySelector(".loading");
                        loading === null || loading === void 0 ? void 0 : loading.classList.remove("d-none");
                        options = {
                            method: 'GET',
                            headers: {
                                'x-rapidapi-key': '337ea965d5msh628726a3b2ed715p1654bajsn809d11d2e54d',
                                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?category=".concat(category), options)];
                    case 2:
                        api = _a.sent();
                        return [4 /*yield*/, api.json()];
                    case 3:
                        response = _a.sent();
                        this.ui.displayGamesData(response);
                        this.attachCardEvents();
                        return [3 /*break*/, 6];
                    case 4:
                        err_2 = _a.sent();
                        console.error("Games error:", err_2);
                        return [3 /*break*/, 6];
                    case 5:
                        loading === null || loading === void 0 ? void 0 : loading.classList.add("d-none");
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Games.prototype.attachCardEvents = function () {
        document.querySelectorAll(".card").forEach(function (card) {
            card.addEventListener("click", function () {
                var _a, _b;
                var id = card.dataset.id;
                if (id) {
                    new Details(id);
                    (_a = document.querySelector(".games")) === null || _a === void 0 ? void 0 : _a.classList.add("d-none");
                    (_b = document.querySelector(".details")) === null || _b === void 0 ? void 0 : _b.classList.remove("d-none");
                }
            });
        });
    };
    return Games;
}());
var logoutBtn = document.querySelector('#logoutBtn');
logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener('click', function () {
    window.location.href = 'index.html';
});
document.addEventListener("DOMContentLoaded", function () {
    new Games();
});
