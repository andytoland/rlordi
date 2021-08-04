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
import express from 'express';
var app = express();
var port = 3000;
import mariadb from 'mariadb';
var pool = mariadb.createPool({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'rakennuslordi',
    connectionLimit: 1
});
//these two are needed for form data to be parsed
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) { return res.send('Express + TypeScript Server'); });
//ottaa id:n ja palauttaa id:n
app.get('/api/work_site', function (req, res) {
    res.send('Hei maailma' + req.query.id);
});
//esimerkki json vastauksesta
app.get('/api/work_site/json', function (req, res) {
    var jsonAnswer = { test: "jotain tekstiä", id: req.query.id };
    res.json(jsonAnswer);
});
//Haetaan käyttäjä id:n perusteella
app.get('/api/user/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, doReadQuery("SELECT * FROM user WHERE user_id=" + req.query.id)];
            case 1:
                rows = _a.sent();
                return [4 /*yield*/, res.json(rows)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//Haetaan työalueet työalue-id:n perusteella
app.get('/api/work_area/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, doReadQuery("SELECT * FROM work_area WHERE work_area_id=" + req.query.id)];
            case 1:
                rows = _a.sent();
                return [4 /*yield*/, res.json(rows)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//Haetaan työalueet työalue-id:n perusteella
app.get('/api/work_task/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, doReadQuery("SELECT * FROM work_task WHERE work_task_id=" + req.query.id)];
            case 1:
                rows = _a.sent();
                return [4 /*yield*/, res.json(rows)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//json example how to get from POST
app.post('/postjsonexample', express.json({ type: '*/*' }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(JSON.stringify(req.body)); //to get whole body JSON
                console.log(JSON.stringify(req.body.test)); //to get value from JSON like {"test":1,"test2":"something"}
                return [4 /*yield*/, res.json(req.body)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//form example how to get form
app.post('/postjformexample', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body); //to get whole body JSON
                console.log(JSON.stringify(req.body.test)); //to get value from JSON like {"test":1,"test2":"something"}
                return [4 /*yield*/, res.json(req.body)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//returns simple json from database
app.get('/api/poolstest', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, doReadQuery("SELECT * FROM test")];
            case 1:
                rows = _a.sent();
                console.log(JSON.stringify(rows));
                res.json(rows);
                return [2 /*return*/];
        }
    });
}); });
//returns simple json from database
app.get('/api/inserttest', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, doInsertQuery("INSERT INTO test (name, number) VALUES(\"" + req.query.name + "\", " + req.query.number + ")")];
            case 1:
                rows = _a.sent();
                console.log(JSON.stringify(rows));
                res.json(rows);
                return [2 /*return*/];
        }
    });
}); });
//gets data from databse
function doReadQuery(query) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, pool.getConnection()];
                case 2:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query(query)];
                case 3:
                    result = _a.sent();
                    console.log(JSON.stringify(result));
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    console.log(err_1); //[ {val: 1}, meta: ... ]
                    throw err_1;
                case 5:
                    if (conn)
                        conn.end();
                    return [2 /*return*/, result]; // return has to be here because finally executes last
                case 6: return [2 /*return*/];
            }
        });
    });
}
//insert data to database. Returns true if successful, false if not
function doInsertQuery(query) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, result, returnValue, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = { "affectedRows": 1 };
                    returnValue = false;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, pool.getConnection()];
                case 2:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query(query)];
                case 3:
                    result = _a.sent();
                    console.log(JSON.stringify(result));
                    if (result && result.affectedRows !== undefined && result.affectedRows > 0) {
                        console.log("inserted data successfully");
                        returnValue = true;
                    }
                    return [3 /*break*/, 6];
                case 4:
                    err_2 = _a.sent();
                    console.log(err_2); //[ {val: 1}, meta: ... ]
                    throw err_2;
                case 5:
                    if (conn)
                        conn.end();
                    return [2 /*return*/, returnValue]; // return has to be here because finally executes last
                case 6: return [2 /*return*/];
            }
        });
    });
}
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
