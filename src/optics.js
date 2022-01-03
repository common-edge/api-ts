"use strict";
exports.__esModule = true;
exports.idOpt = void 0;
/**
 * Optics for internal use.
 *
 * @internal
 * @since 0.1.0
 */
var monocle_ts_1 = require("monocle-ts");
var Option_1 = require("fp-ts/Option");
/**
 * The identity `Optional` optic, which always successed.
 *
 * @since 0.1.0
 */
var idOpt = function () { return new monocle_ts_1.Optional(function (s) { return Option_1.some(s); }, function (a) { return function (s) { return a; }; }); };
exports.idOpt = idOpt;
