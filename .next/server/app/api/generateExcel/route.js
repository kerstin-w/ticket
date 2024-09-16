"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/generateExcel/route";
exports.ids = ["app/api/generateExcel/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "constants":
/*!****************************!*\
  !*** external "constants" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("constants");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("string_decoder");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2FgenerateExcel%2Froute&page=%2Fapi%2FgenerateExcel%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FgenerateExcel%2Froute.js&appDir=%2FUsers%2Fkerst1%2FDocuments%2FChallanges%2FTicket%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkerst1%2FDocuments%2FChallanges%2FTicket&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2FgenerateExcel%2Froute&page=%2Fapi%2FgenerateExcel%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FgenerateExcel%2Froute.js&appDir=%2FUsers%2Fkerst1%2FDocuments%2FChallanges%2FTicket%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkerst1%2FDocuments%2FChallanges%2FTicket&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_kerst1_Documents_Challanges_Ticket_app_api_generateExcel_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/generateExcel/route.js */ \"(rsc)/./app/api/generateExcel/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/generateExcel/route\",\n        pathname: \"/api/generateExcel\",\n        filename: \"route\",\n        bundlePath: \"app/api/generateExcel/route\"\n    },\n    resolvedPagePath: \"/Users/kerst1/Documents/Challanges/Ticket/app/api/generateExcel/route.js\",\n    nextConfigOutput,\n    userland: _Users_kerst1_Documents_Challanges_Ticket_app_api_generateExcel_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/generateExcel/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZnZW5lcmF0ZUV4Y2VsJTJGcm91dGUmcGFnZT0lMkZhcGklMkZnZW5lcmF0ZUV4Y2VsJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGZ2VuZXJhdGVFeGNlbCUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRmtlcnN0MSUyRkRvY3VtZW50cyUyRkNoYWxsYW5nZXMlMkZUaWNrZXQlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGa2Vyc3QxJTJGRG9jdW1lbnRzJTJGQ2hhbGxhbmdlcyUyRlRpY2tldCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDd0I7QUFDckc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aWNrZXQvPzhlNjUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2tlcnN0MS9Eb2N1bWVudHMvQ2hhbGxhbmdlcy9UaWNrZXQvYXBwL2FwaS9nZW5lcmF0ZUV4Y2VsL3JvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9nZW5lcmF0ZUV4Y2VsL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZ2VuZXJhdGVFeGNlbFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZ2VuZXJhdGVFeGNlbC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9rZXJzdDEvRG9jdW1lbnRzL0NoYWxsYW5nZXMvVGlja2V0L2FwcC9hcGkvZ2VuZXJhdGVFeGNlbC9yb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvZ2VuZXJhdGVFeGNlbC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2FgenerateExcel%2Froute&page=%2Fapi%2FgenerateExcel%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FgenerateExcel%2Froute.js&appDir=%2FUsers%2Fkerst1%2FDocuments%2FChallanges%2FTicket%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkerst1%2FDocuments%2FChallanges%2FTicket&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/(models)/Ticket.js":
/*!********************************!*\
  !*** ./app/(models)/Ticket.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nmongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGODB_URI);\n(mongoose__WEBPACK_IMPORTED_MODULE_0___default().Promise) = global.Promise;\nconst ticketSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    title: String,\n    description: String,\n    category: String,\n    priority: Number,\n    progress: Number,\n    status: String,\n    active: Boolean,\n    type: String,\n    screenshots: [\n        String\n    ],\n    hours: {\n        type: Number,\n        default: 0\n    },\n    costs: {\n        type: Number,\n        default: 0\n    }\n}, {\n    timestamps: true\n});\nconst Ticket = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Ticket || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Ticket\", ticketSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ticket);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvKG1vZGVscykvVGlja2V0LmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE0QztBQUU1Q0EsdURBQWdCLENBQUNHLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVztBQUN4Q0wseURBQWdCLEdBQUdPLE9BQU9ELE9BQU87QUFFakMsTUFBTUUsZUFBZSxJQUFJUCw0Q0FBTUEsQ0FDN0I7SUFDRVEsT0FBT0M7SUFDUEMsYUFBYUQ7SUFDYkUsVUFBVUY7SUFDVkcsVUFBVUM7SUFDVkMsVUFBVUQ7SUFDVkUsUUFBUU47SUFDUk8sUUFBUUM7SUFDUkMsTUFBTVQ7SUFDTlUsYUFBYTtRQUFDVjtLQUFPO0lBQ3JCVyxPQUFPO1FBQUVGLE1BQU1MO1FBQVFRLFNBQVM7SUFBRTtJQUNsQ0MsT0FBTztRQUFFSixNQUFNTDtRQUFRUSxTQUFTO0lBQUU7QUFDcEMsR0FDQTtJQUNFRSxZQUFZO0FBQ2Q7QUFHRixNQUFNQyxTQUFTekIsd0RBQWUsQ0FBQ3lCLE1BQU0sSUFBSXpCLHFEQUFjLENBQUMsVUFBVVE7QUFDbEUsaUVBQWVpQixNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGlja2V0Ly4vYXBwLyhtb2RlbHMpL1RpY2tldC5qcz9hYzk3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEgfSBmcm9tICdtb25nb29zZSc7XG5cbm1vbmdvb3NlLmNvbm5lY3QocHJvY2Vzcy5lbnYuTU9OR09EQl9VUkkpO1xubW9uZ29vc2UuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuXG5jb25zdCB0aWNrZXRTY2hlbWEgPSBuZXcgU2NoZW1hKFxuICB7XG4gICAgdGl0bGU6IFN0cmluZyxcbiAgICBkZXNjcmlwdGlvbjogU3RyaW5nLFxuICAgIGNhdGVnb3J5OiBTdHJpbmcsXG4gICAgcHJpb3JpdHk6IE51bWJlcixcbiAgICBwcm9ncmVzczogTnVtYmVyLFxuICAgIHN0YXR1czogU3RyaW5nLFxuICAgIGFjdGl2ZTogQm9vbGVhbixcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgc2NyZWVuc2hvdHM6IFtTdHJpbmddLFxuICAgIGhvdXJzOiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogMCB9LFxuICAgIGNvc3RzOiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogMCB9LFxuICB9LFxuICB7XG4gICAgdGltZXN0YW1wczogdHJ1ZSxcbiAgfVxuKTtcblxuY29uc3QgVGlja2V0ID0gbW9uZ29vc2UubW9kZWxzLlRpY2tldCB8fCBtb25nb29zZS5tb2RlbCgnVGlja2V0JywgdGlja2V0U2NoZW1hKTtcbmV4cG9ydCBkZWZhdWx0IFRpY2tldDtcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlNjaGVtYSIsImNvbm5lY3QiLCJwcm9jZXNzIiwiZW52IiwiTU9OR09EQl9VUkkiLCJQcm9taXNlIiwiZ2xvYmFsIiwidGlja2V0U2NoZW1hIiwidGl0bGUiLCJTdHJpbmciLCJkZXNjcmlwdGlvbiIsImNhdGVnb3J5IiwicHJpb3JpdHkiLCJOdW1iZXIiLCJwcm9ncmVzcyIsInN0YXR1cyIsImFjdGl2ZSIsIkJvb2xlYW4iLCJ0eXBlIiwic2NyZWVuc2hvdHMiLCJob3VycyIsImRlZmF1bHQiLCJjb3N0cyIsInRpbWVzdGFtcHMiLCJUaWNrZXQiLCJtb2RlbHMiLCJtb2RlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/(models)/Ticket.js\n");

/***/ }),

/***/ "(rsc)/./app/api/generateExcel/route.js":
/*!****************************************!*\
  !*** ./app/api/generateExcel/route.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! exceljs */ \"(rsc)/./node_modules/exceljs/excel.js\");\n/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(exceljs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _models_Ticket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../(models)/Ticket */ \"(rsc)/./app/(models)/Ticket.js\");\n// pages/api/generateExcel.js\n\n\n\nasync function GET() {\n    try {\n        // Fetch all tickets from the database\n        const tickets = await _models_Ticket__WEBPACK_IMPORTED_MODULE_2__[\"default\"].find();\n        // Create a new workbook and worksheet\n        const workbook = new (exceljs__WEBPACK_IMPORTED_MODULE_1___default().Workbook)();\n        const worksheet = workbook.addWorksheet(\"Tickets\");\n        // Add headers\n        worksheet.addRow([\n            \"Title\",\n            \"Description\",\n            \"Category\",\n            \"Priority\",\n            \"Progress\",\n            \"Status\",\n            \"Type\",\n            \"Hours\",\n            \"Costs\",\n            \"Created At\",\n            \"Updated At\"\n        ]);\n        // Add data\n        tickets.forEach((ticket)=>{\n            worksheet.addRow([\n                ticket.title,\n                ticket.description,\n                ticket.category,\n                ticket.priority,\n                ticket.progress,\n                ticket.status,\n                ticket.type,\n                ticket.hours,\n                ticket.costs,\n                ticket.createdAt,\n                ticket.updatedAt\n            ]);\n        });\n        // Generate Excel file\n        const buffer = await workbook.xlsx.writeBuffer();\n        // Set response headers\n        const headers = new Headers();\n        headers.append(\"Content-Disposition\", \"attachment; filename=tickets.xlsx\");\n        headers.append(\"Content-Type\", \"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\");\n        // Return the Excel file\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(buffer, {\n            status: 200,\n            headers: headers\n        });\n    } catch (error) {\n        console.error(\"Error generating Excel file:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to generate Excel file\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2dlbmVyYXRlRXhjZWwvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSw2QkFBNkI7QUFDYztBQUNiO0FBQ2E7QUFFcEMsZUFBZUc7SUFDcEIsSUFBSTtRQUNGLHNDQUFzQztRQUN0QyxNQUFNQyxVQUFVLE1BQU1GLHNEQUFNQSxDQUFDRyxJQUFJO1FBRWpDLHNDQUFzQztRQUN0QyxNQUFNQyxXQUFXLElBQUlMLHlEQUFnQjtRQUNyQyxNQUFNTyxZQUFZRixTQUFTRyxZQUFZLENBQUM7UUFFeEMsY0FBYztRQUNkRCxVQUFVRSxNQUFNLENBQUM7WUFDZjtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1NBQ0Q7UUFFRCxXQUFXO1FBQ1hOLFFBQVFPLE9BQU8sQ0FBQyxDQUFDQztZQUNmSixVQUFVRSxNQUFNLENBQUM7Z0JBQ2ZFLE9BQU9DLEtBQUs7Z0JBQ1pELE9BQU9FLFdBQVc7Z0JBQ2xCRixPQUFPRyxRQUFRO2dCQUNmSCxPQUFPSSxRQUFRO2dCQUNmSixPQUFPSyxRQUFRO2dCQUNmTCxPQUFPTSxNQUFNO2dCQUNiTixPQUFPTyxJQUFJO2dCQUNYUCxPQUFPUSxLQUFLO2dCQUNaUixPQUFPUyxLQUFLO2dCQUNaVCxPQUFPVSxTQUFTO2dCQUNoQlYsT0FBT1csU0FBUzthQUNqQjtRQUNIO1FBRUEsc0JBQXNCO1FBQ3RCLE1BQU1DLFNBQVMsTUFBTWxCLFNBQVNtQixJQUFJLENBQUNDLFdBQVc7UUFFOUMsdUJBQXVCO1FBQ3ZCLE1BQU1DLFVBQVUsSUFBSUM7UUFDcEJELFFBQVFFLE1BQU0sQ0FBQyx1QkFBdUI7UUFDdENGLFFBQVFFLE1BQU0sQ0FDWixnQkFDQTtRQUdGLHdCQUF3QjtRQUN4QixPQUFPLElBQUk3QixxREFBWUEsQ0FBQ3dCLFFBQVE7WUFDOUJOLFFBQVE7WUFDUlMsU0FBU0E7UUFDWDtJQUNGLEVBQUUsT0FBT0csT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsZ0NBQWdDQTtRQUM5QyxPQUFPOUIscURBQVlBLENBQUNnQyxJQUFJLENBQ3RCO1lBQUVGLE9BQU87UUFBZ0MsR0FDekM7WUFBRVosUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aWNrZXQvLi9hcHAvYXBpL2dlbmVyYXRlRXhjZWwvcm91dGUuanM/MWE3ZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYWdlcy9hcGkvZ2VuZXJhdGVFeGNlbC5qc1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IEV4Y2VsSlMgZnJvbSAnZXhjZWxqcyc7XG5pbXBvcnQgVGlja2V0IGZyb20gJy4uLy4uLyhtb2RlbHMpL1RpY2tldCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgLy8gRmV0Y2ggYWxsIHRpY2tldHMgZnJvbSB0aGUgZGF0YWJhc2VcbiAgICBjb25zdCB0aWNrZXRzID0gYXdhaXQgVGlja2V0LmZpbmQoKTtcblxuICAgIC8vIENyZWF0ZSBhIG5ldyB3b3JrYm9vayBhbmQgd29ya3NoZWV0XG4gICAgY29uc3Qgd29ya2Jvb2sgPSBuZXcgRXhjZWxKUy5Xb3JrYm9vaygpO1xuICAgIGNvbnN0IHdvcmtzaGVldCA9IHdvcmtib29rLmFkZFdvcmtzaGVldCgnVGlja2V0cycpO1xuXG4gICAgLy8gQWRkIGhlYWRlcnNcbiAgICB3b3Jrc2hlZXQuYWRkUm93KFtcbiAgICAgICdUaXRsZScsXG4gICAgICAnRGVzY3JpcHRpb24nLFxuICAgICAgJ0NhdGVnb3J5JyxcbiAgICAgICdQcmlvcml0eScsXG4gICAgICAnUHJvZ3Jlc3MnLFxuICAgICAgJ1N0YXR1cycsXG4gICAgICAnVHlwZScsXG4gICAgICAnSG91cnMnLFxuICAgICAgJ0Nvc3RzJyxcbiAgICAgICdDcmVhdGVkIEF0JyxcbiAgICAgICdVcGRhdGVkIEF0JyxcbiAgICBdKTtcblxuICAgIC8vIEFkZCBkYXRhXG4gICAgdGlja2V0cy5mb3JFYWNoKCh0aWNrZXQpID0+IHtcbiAgICAgIHdvcmtzaGVldC5hZGRSb3coW1xuICAgICAgICB0aWNrZXQudGl0bGUsXG4gICAgICAgIHRpY2tldC5kZXNjcmlwdGlvbixcbiAgICAgICAgdGlja2V0LmNhdGVnb3J5LFxuICAgICAgICB0aWNrZXQucHJpb3JpdHksXG4gICAgICAgIHRpY2tldC5wcm9ncmVzcyxcbiAgICAgICAgdGlja2V0LnN0YXR1cyxcbiAgICAgICAgdGlja2V0LnR5cGUsXG4gICAgICAgIHRpY2tldC5ob3VycyxcbiAgICAgICAgdGlja2V0LmNvc3RzLFxuICAgICAgICB0aWNrZXQuY3JlYXRlZEF0LFxuICAgICAgICB0aWNrZXQudXBkYXRlZEF0LFxuICAgICAgXSk7XG4gICAgfSk7XG5cbiAgICAvLyBHZW5lcmF0ZSBFeGNlbCBmaWxlXG4gICAgY29uc3QgYnVmZmVyID0gYXdhaXQgd29ya2Jvb2sueGxzeC53cml0ZUJ1ZmZlcigpO1xuXG4gICAgLy8gU2V0IHJlc3BvbnNlIGhlYWRlcnNcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1EaXNwb3NpdGlvbicsICdhdHRhY2htZW50OyBmaWxlbmFtZT10aWNrZXRzLnhsc3gnKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcbiAgICAgICdDb250ZW50LVR5cGUnLFxuICAgICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0J1xuICAgICk7XG5cbiAgICAvLyBSZXR1cm4gdGhlIEV4Y2VsIGZpbGVcbiAgICByZXR1cm4gbmV3IE5leHRSZXNwb25zZShidWZmZXIsIHtcbiAgICAgIHN0YXR1czogMjAwLFxuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBnZW5lcmF0aW5nIEV4Y2VsIGZpbGU6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6ICdGYWlsZWQgdG8gZ2VuZXJhdGUgRXhjZWwgZmlsZScgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJFeGNlbEpTIiwiVGlja2V0IiwiR0VUIiwidGlja2V0cyIsImZpbmQiLCJ3b3JrYm9vayIsIldvcmtib29rIiwid29ya3NoZWV0IiwiYWRkV29ya3NoZWV0IiwiYWRkUm93IiwiZm9yRWFjaCIsInRpY2tldCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJjYXRlZ29yeSIsInByaW9yaXR5IiwicHJvZ3Jlc3MiLCJzdGF0dXMiLCJ0eXBlIiwiaG91cnMiLCJjb3N0cyIsImNyZWF0ZWRBdCIsInVwZGF0ZWRBdCIsImJ1ZmZlciIsInhsc3giLCJ3cml0ZUJ1ZmZlciIsImhlYWRlcnMiLCJIZWFkZXJzIiwiYXBwZW5kIiwiZXJyb3IiLCJjb25zb2xlIiwianNvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/generateExcel/route.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/exceljs","vendor-chunks/jszip","vendor-chunks/bluebird","vendor-chunks/unzipper","vendor-chunks/@fast-csv","vendor-chunks/fstream","vendor-chunks/archiver-utils","vendor-chunks/pako","vendor-chunks/uuid","vendor-chunks/readable-stream","vendor-chunks/lazystream","vendor-chunks/duplexer2","vendor-chunks/compress-commons","vendor-chunks/zip-stream","vendor-chunks/archiver","vendor-chunks/tar-stream","vendor-chunks/readdir-glob","vendor-chunks/graceful-fs","vendor-chunks/xmlchars","vendor-chunks/dayjs","vendor-chunks/crc32-stream","vendor-chunks/inherits","vendor-chunks/fs.realpath","vendor-chunks/buffer-indexof-polyfill","vendor-chunks/bl","vendor-chunks/binary","vendor-chunks/async","vendor-chunks/wrappy","vendor-chunks/util-deprecate","vendor-chunks/traverse","vendor-chunks/tmp","vendor-chunks/string_decoder","vendor-chunks/saxes","vendor-chunks/safe-buffer","vendor-chunks/process-nextick-args","vendor-chunks/path-is-absolute","vendor-chunks/once","vendor-chunks/normalize-path","vendor-chunks/mkdirp","vendor-chunks/minimatch","vendor-chunks/lodash.uniq","vendor-chunks/lodash.union","vendor-chunks/lodash.isundefined","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnil","vendor-chunks/lodash.isfunction","vendor-chunks/lodash.isequal","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.groupby","vendor-chunks/lodash.flatten","vendor-chunks/lodash.escaperegexp","vendor-chunks/lodash.difference","vendor-chunks/lodash.defaults","vendor-chunks/listenercount","vendor-chunks/lie","vendor-chunks/inflight","vendor-chunks/immediate","vendor-chunks/fs-constants","vendor-chunks/fast-csv","vendor-chunks/end-of-stream","vendor-chunks/crc-32","vendor-chunks/core-util-is","vendor-chunks/concat-map","vendor-chunks/chainsaw","vendor-chunks/buffers","vendor-chunks/buffer-crc32","vendor-chunks/brace-expansion","vendor-chunks/big-integer","vendor-chunks/balanced-match"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2FgenerateExcel%2Froute&page=%2Fapi%2FgenerateExcel%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FgenerateExcel%2Froute.js&appDir=%2FUsers%2Fkerst1%2FDocuments%2FChallanges%2FTicket%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkerst1%2FDocuments%2FChallanges%2FTicket&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();