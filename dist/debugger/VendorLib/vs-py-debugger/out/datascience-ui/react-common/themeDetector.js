// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
}); // From here:
// https://stackoverflow.com/questions/37257911/detect-light-dark-theme-programatically-in-visual-studio-code
// Detect vscode-light, vscode-dark, and vscode-high-contrast class name on the body element.

function detectTheme() {
  const body = document.body;

  if (body) {
    switch (body.className) {
      default:
      case 'vscode-light':
        return 'vscode-light';

      case 'vscode-dark':
        return 'vscode-dark';

      case 'vscode-high-contrast':
        return 'vscode-high-contrast';
    }
  }

  return 'vscode-light';
}

exports.detectTheme = detectTheme;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRoZW1lRGV0ZWN0b3IuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZXRlY3RUaGVtZSIsImJvZHkiLCJkb2N1bWVudCIsImNsYXNzTmFtZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDLEUsQ0FDQTtBQUNBO0FBQ0E7O0FBQ0EsU0FBU0MsV0FBVCxHQUF1QjtBQUNuQixRQUFNQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0QsSUFBdEI7O0FBQ0EsTUFBSUEsSUFBSixFQUFVO0FBQ04sWUFBUUEsSUFBSSxDQUFDRSxTQUFiO0FBQ0k7QUFDQSxXQUFLLGNBQUw7QUFDSSxlQUFPLGNBQVA7O0FBQ0osV0FBSyxhQUFMO0FBQ0ksZUFBTyxhQUFQOztBQUNKLFdBQUssc0JBQUw7QUFDSSxlQUFPLHNCQUFQO0FBUFI7QUFTSDs7QUFDRCxTQUFPLGNBQVA7QUFDSDs7QUFDREwsT0FBTyxDQUFDRSxXQUFSLEdBQXNCQSxXQUF0QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gRnJvbSBoZXJlOlxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzcyNTc5MTEvZGV0ZWN0LWxpZ2h0LWRhcmstdGhlbWUtcHJvZ3JhbWF0aWNhbGx5LWluLXZpc3VhbC1zdHVkaW8tY29kZVxuLy8gRGV0ZWN0IHZzY29kZS1saWdodCwgdnNjb2RlLWRhcmssIGFuZCB2c2NvZGUtaGlnaC1jb250cmFzdCBjbGFzcyBuYW1lIG9uIHRoZSBib2R5IGVsZW1lbnQuXG5mdW5jdGlvbiBkZXRlY3RUaGVtZSgpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBpZiAoYm9keSkge1xuICAgICAgICBzd2l0Y2ggKGJvZHkuY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FzZSAndnNjb2RlLWxpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ZzY29kZS1saWdodCc7XG4gICAgICAgICAgICBjYXNlICd2c2NvZGUtZGFyayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICd2c2NvZGUtZGFyayc7XG4gICAgICAgICAgICBjYXNlICd2c2NvZGUtaGlnaC1jb250cmFzdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICd2c2NvZGUtaGlnaC1jb250cmFzdCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICd2c2NvZGUtbGlnaHQnO1xufVxuZXhwb3J0cy5kZXRlY3RUaGVtZSA9IGRldGVjdFRoZW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWVEZXRlY3Rvci5qcy5tYXAiXX0=