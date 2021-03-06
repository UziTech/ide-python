// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
}); // tslint:disable:no-any unified-signatures

exports.IApplicationShell = Symbol('IApplicationShell');
exports.ICommandManager = Symbol('ICommandManager');
exports.IDocumentManager = Symbol('IDocumentManager');
exports.IWorkspaceService = Symbol('IWorkspaceService');
exports.ITerminalManager = Symbol('ITerminalManager');
exports.IDebugService = Symbol('IDebugManager');
exports.IApplicationEnvironment = Symbol('IApplicationEnvironment');
exports.IWebPanelMessageListener = Symbol('IWebPanelMessageListener'); // Wraps the VS Code webview panel

exports.IWebPanel = Symbol('IWebPanel'); // Wraps the VS Code api for creating a web panel

exports.IWebPanelProvider = Symbol('IWebPanelProvider');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVzLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiSUFwcGxpY2F0aW9uU2hlbGwiLCJTeW1ib2wiLCJJQ29tbWFuZE1hbmFnZXIiLCJJRG9jdW1lbnRNYW5hZ2VyIiwiSVdvcmtzcGFjZVNlcnZpY2UiLCJJVGVybWluYWxNYW5hZ2VyIiwiSURlYnVnU2VydmljZSIsIklBcHBsaWNhdGlvbkVudmlyb25tZW50IiwiSVdlYlBhbmVsTWVzc2FnZUxpc3RlbmVyIiwiSVdlYlBhbmVsIiwiSVdlYlBhbmVsUHJvdmlkZXIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3QyxFLENBQ0E7O0FBQ0FELE9BQU8sQ0FBQ0UsaUJBQVIsR0FBNEJDLE1BQU0sQ0FBQyxtQkFBRCxDQUFsQztBQUNBSCxPQUFPLENBQUNJLGVBQVIsR0FBMEJELE1BQU0sQ0FBQyxpQkFBRCxDQUFoQztBQUNBSCxPQUFPLENBQUNLLGdCQUFSLEdBQTJCRixNQUFNLENBQUMsa0JBQUQsQ0FBakM7QUFDQUgsT0FBTyxDQUFDTSxpQkFBUixHQUE0QkgsTUFBTSxDQUFDLG1CQUFELENBQWxDO0FBQ0FILE9BQU8sQ0FBQ08sZ0JBQVIsR0FBMkJKLE1BQU0sQ0FBQyxrQkFBRCxDQUFqQztBQUNBSCxPQUFPLENBQUNRLGFBQVIsR0FBd0JMLE1BQU0sQ0FBQyxlQUFELENBQTlCO0FBQ0FILE9BQU8sQ0FBQ1MsdUJBQVIsR0FBa0NOLE1BQU0sQ0FBQyx5QkFBRCxDQUF4QztBQUNBSCxPQUFPLENBQUNVLHdCQUFSLEdBQW1DUCxNQUFNLENBQUMsMEJBQUQsQ0FBekMsQyxDQUNBOztBQUNBSCxPQUFPLENBQUNXLFNBQVIsR0FBb0JSLE1BQU0sQ0FBQyxXQUFELENBQTFCLEMsQ0FDQTs7QUFDQUgsT0FBTyxDQUFDWSxpQkFBUixHQUE0QlQsTUFBTSxDQUFDLG1CQUFELENBQWxDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4ndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgdW5pZmllZC1zaWduYXR1cmVzXG5leHBvcnRzLklBcHBsaWNhdGlvblNoZWxsID0gU3ltYm9sKCdJQXBwbGljYXRpb25TaGVsbCcpO1xuZXhwb3J0cy5JQ29tbWFuZE1hbmFnZXIgPSBTeW1ib2woJ0lDb21tYW5kTWFuYWdlcicpO1xuZXhwb3J0cy5JRG9jdW1lbnRNYW5hZ2VyID0gU3ltYm9sKCdJRG9jdW1lbnRNYW5hZ2VyJyk7XG5leHBvcnRzLklXb3Jrc3BhY2VTZXJ2aWNlID0gU3ltYm9sKCdJV29ya3NwYWNlU2VydmljZScpO1xuZXhwb3J0cy5JVGVybWluYWxNYW5hZ2VyID0gU3ltYm9sKCdJVGVybWluYWxNYW5hZ2VyJyk7XG5leHBvcnRzLklEZWJ1Z1NlcnZpY2UgPSBTeW1ib2woJ0lEZWJ1Z01hbmFnZXInKTtcbmV4cG9ydHMuSUFwcGxpY2F0aW9uRW52aXJvbm1lbnQgPSBTeW1ib2woJ0lBcHBsaWNhdGlvbkVudmlyb25tZW50Jyk7XG5leHBvcnRzLklXZWJQYW5lbE1lc3NhZ2VMaXN0ZW5lciA9IFN5bWJvbCgnSVdlYlBhbmVsTWVzc2FnZUxpc3RlbmVyJyk7XG4vLyBXcmFwcyB0aGUgVlMgQ29kZSB3ZWJ2aWV3IHBhbmVsXG5leHBvcnRzLklXZWJQYW5lbCA9IFN5bWJvbCgnSVdlYlBhbmVsJyk7XG4vLyBXcmFwcyB0aGUgVlMgQ29kZSBhcGkgZm9yIGNyZWF0aW5nIGEgd2ViIHBhbmVsXG5leHBvcnRzLklXZWJQYW5lbFByb3ZpZGVyID0gU3ltYm9sKCdJV2ViUGFuZWxQcm92aWRlcicpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIl19