// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DebugOptions;

(function (DebugOptions) {
  DebugOptions["RedirectOutput"] = "RedirectOutput";
  DebugOptions["Django"] = "Django";
  DebugOptions["Jinja"] = "Jinja";
  DebugOptions["DebugStdLib"] = "DebugStdLib";
  DebugOptions["Sudo"] = "Sudo";
  DebugOptions["Pyramid"] = "Pyramid";
  DebugOptions["FixFilePathCase"] = "FixFilePathCase";
  DebugOptions["WindowsClient"] = "WindowsClient";
  DebugOptions["UnixClient"] = "UnixClient";
  DebugOptions["StopOnEntry"] = "StopOnEntry";
  DebugOptions["ShowReturnValue"] = "ShowReturnValue";
  DebugOptions["SubProcess"] = "Multiprocess";
})(DebugOptions = exports.DebugOptions || (exports.DebugOptions = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVzLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiRGVidWdPcHRpb25zIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0FBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRUMsRUFBQUEsS0FBSyxFQUFFO0FBQVQsQ0FBN0M7QUFDQSxJQUFJQyxZQUFKOztBQUNBLENBQUMsVUFBVUEsWUFBVixFQUF3QjtBQUNyQkEsRUFBQUEsWUFBWSxDQUFDLGdCQUFELENBQVosR0FBaUMsZ0JBQWpDO0FBQ0FBLEVBQUFBLFlBQVksQ0FBQyxRQUFELENBQVosR0FBeUIsUUFBekI7QUFDQUEsRUFBQUEsWUFBWSxDQUFDLE9BQUQsQ0FBWixHQUF3QixPQUF4QjtBQUNBQSxFQUFBQSxZQUFZLENBQUMsYUFBRCxDQUFaLEdBQThCLGFBQTlCO0FBQ0FBLEVBQUFBLFlBQVksQ0FBQyxNQUFELENBQVosR0FBdUIsTUFBdkI7QUFDQUEsRUFBQUEsWUFBWSxDQUFDLFNBQUQsQ0FBWixHQUEwQixTQUExQjtBQUNBQSxFQUFBQSxZQUFZLENBQUMsaUJBQUQsQ0FBWixHQUFrQyxpQkFBbEM7QUFDQUEsRUFBQUEsWUFBWSxDQUFDLGVBQUQsQ0FBWixHQUFnQyxlQUFoQztBQUNBQSxFQUFBQSxZQUFZLENBQUMsWUFBRCxDQUFaLEdBQTZCLFlBQTdCO0FBQ0FBLEVBQUFBLFlBQVksQ0FBQyxhQUFELENBQVosR0FBOEIsYUFBOUI7QUFDQUEsRUFBQUEsWUFBWSxDQUFDLGlCQUFELENBQVosR0FBa0MsaUJBQWxDO0FBQ0FBLEVBQUFBLFlBQVksQ0FBQyxZQUFELENBQVosR0FBNkIsY0FBN0I7QUFDSCxDQWJELEVBYUdBLFlBQVksR0FBR0YsT0FBTyxDQUFDRSxZQUFSLEtBQXlCRixPQUFPLENBQUNFLFlBQVIsR0FBdUIsRUFBaEQsQ0FibEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBEZWJ1Z09wdGlvbnM7XG4oZnVuY3Rpb24gKERlYnVnT3B0aW9ucykge1xuICAgIERlYnVnT3B0aW9uc1tcIlJlZGlyZWN0T3V0cHV0XCJdID0gXCJSZWRpcmVjdE91dHB1dFwiO1xuICAgIERlYnVnT3B0aW9uc1tcIkRqYW5nb1wiXSA9IFwiRGphbmdvXCI7XG4gICAgRGVidWdPcHRpb25zW1wiSmluamFcIl0gPSBcIkppbmphXCI7XG4gICAgRGVidWdPcHRpb25zW1wiRGVidWdTdGRMaWJcIl0gPSBcIkRlYnVnU3RkTGliXCI7XG4gICAgRGVidWdPcHRpb25zW1wiU3Vkb1wiXSA9IFwiU3Vkb1wiO1xuICAgIERlYnVnT3B0aW9uc1tcIlB5cmFtaWRcIl0gPSBcIlB5cmFtaWRcIjtcbiAgICBEZWJ1Z09wdGlvbnNbXCJGaXhGaWxlUGF0aENhc2VcIl0gPSBcIkZpeEZpbGVQYXRoQ2FzZVwiO1xuICAgIERlYnVnT3B0aW9uc1tcIldpbmRvd3NDbGllbnRcIl0gPSBcIldpbmRvd3NDbGllbnRcIjtcbiAgICBEZWJ1Z09wdGlvbnNbXCJVbml4Q2xpZW50XCJdID0gXCJVbml4Q2xpZW50XCI7XG4gICAgRGVidWdPcHRpb25zW1wiU3RvcE9uRW50cnlcIl0gPSBcIlN0b3BPbkVudHJ5XCI7XG4gICAgRGVidWdPcHRpb25zW1wiU2hvd1JldHVyblZhbHVlXCJdID0gXCJTaG93UmV0dXJuVmFsdWVcIjtcbiAgICBEZWJ1Z09wdGlvbnNbXCJTdWJQcm9jZXNzXCJdID0gXCJNdWx0aXByb2Nlc3NcIjtcbn0pKERlYnVnT3B0aW9ucyA9IGV4cG9ydHMuRGVidWdPcHRpb25zIHx8IChleHBvcnRzLkRlYnVnT3B0aW9ucyA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiXX0=