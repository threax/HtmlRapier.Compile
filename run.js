"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("./io");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
(function () {
    return __awaiter(this, void 0, void 0, function () {
        function finishComponent() {
            if (component !== null) {
                output += currentBuilder;
                output += 'component.register("' + component + '", builder);';
                currentBuilder = "";
            }
        }
        var inputFile, outputFile, html, dom, document, templates, component, variant, prefix, suffix, output, currentBuilder, i, template;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.argv.length < 4) {
                        console.log("You must include input and output filenames.");
                        process.exit(1);
                    }
                    inputFile = process.argv[2];
                    outputFile = process.argv[3];
                    console.log("Loading " + inputFile);
                    return [4 /*yield*/, io.readFile(inputFile)];
                case 1:
                    html = _a.sent();
                    dom = new JSDOM(html, { pretendToBeVisual: true });
                    document = dom.window.document;
                    templates = document.getElementsByTagName("TEMPLATE");
                    component = null;
                    output = "import * as component from 'hr.components';\nimport {ComponentBuilder, VariantBuilder} from 'hr.componentbuilder';\n\nvar builder;";
                    currentBuilder = "";
                    for (i = 0; i < templates.length; ++i) {
                        template = templates[i];
                        if (template.hasAttribute("data-hr-component")) {
                            finishComponent();
                            component = template.getAttribute("data-hr-component");
                            prefix = "\n\nbuilder = new ComponentBuilder('";
                            suffix = "');\n";
                        }
                        else if (template.hasAttribute("data-hr-variant")) {
                            variant = template.getAttribute("data-hr-variant");
                            prefix = 'builder.addVariant("' + variant + "\", new VariantBuilder('";
                            suffix = "'));\n";
                        }
                        currentBuilder += prefix + minify(template.innerHTML) + suffix;
                    }
                    finishComponent();
                    console.log("Writing " + outputFile);
                    return [4 /*yield*/, io.writeFile(outputFile, output)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
})();
function minify(html) {
    var lines = html.split('\n');
    var result = "";
    var separator = "";
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i].trim();
        if (line) {
            result += separator + lines[i].trim();
            separator = " ";
        }
    }
    return result;
}
