// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const vscode_1 = require("vscode");

class TextIterator {
  constructor(text) {
    this.text = text;
  }

  charCodeAt(index) {
    if (index >= 0 && index < this.text.length) {
      return this.text.charCodeAt(index);
    }

    return 0;
  }

  get length() {
    return this.text.length;
  }

  getText() {
    return this.text;
  }

}

exports.TextIterator = TextIterator;

class DocumentTextIterator {
  constructor(document) {
    this.document = document;
    const lastIndex = this.document.lineCount - 1;
    const lastLine = this.document.lineAt(lastIndex);
    const end = new vscode_1.Position(lastIndex, lastLine.range.end.character);
    this.length = this.document.offsetAt(end);
  }

  charCodeAt(index) {
    const position = this.document.positionAt(index);
    return this.document.getText(new vscode_1.Range(position, position.translate(0, 1))).charCodeAt(position.character);
  }

  getText() {
    return this.document.getText();
  }

}

exports.DocumentTextIterator = DocumentTextIterator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHRJdGVyYXRvci5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsInZzY29kZV8xIiwicmVxdWlyZSIsIlRleHRJdGVyYXRvciIsImNvbnN0cnVjdG9yIiwidGV4dCIsImNoYXJDb2RlQXQiLCJpbmRleCIsImxlbmd0aCIsImdldFRleHQiLCJEb2N1bWVudFRleHRJdGVyYXRvciIsImRvY3VtZW50IiwibGFzdEluZGV4IiwibGluZUNvdW50IiwibGFzdExpbmUiLCJsaW5lQXQiLCJlbmQiLCJQb3NpdGlvbiIsInJhbmdlIiwiY2hhcmFjdGVyIiwib2Zmc2V0QXQiLCJwb3NpdGlvbiIsInBvc2l0aW9uQXQiLCJSYW5nZSIsInRyYW5zbGF0ZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDOztBQUNBLE1BQU1DLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBeEI7O0FBQ0EsTUFBTUMsWUFBTixDQUFtQjtBQUNmQyxFQUFBQSxXQUFXLENBQUNDLElBQUQsRUFBTztBQUNkLFNBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNIOztBQUNEQyxFQUFBQSxVQUFVLENBQUNDLEtBQUQsRUFBUTtBQUNkLFFBQUlBLEtBQUssSUFBSSxDQUFULElBQWNBLEtBQUssR0FBRyxLQUFLRixJQUFMLENBQVVHLE1BQXBDLEVBQTRDO0FBQ3hDLGFBQU8sS0FBS0gsSUFBTCxDQUFVQyxVQUFWLENBQXFCQyxLQUFyQixDQUFQO0FBQ0g7O0FBQ0QsV0FBTyxDQUFQO0FBQ0g7O0FBQ0QsTUFBSUMsTUFBSixHQUFhO0FBQ1QsV0FBTyxLQUFLSCxJQUFMLENBQVVHLE1BQWpCO0FBQ0g7O0FBQ0RDLEVBQUFBLE9BQU8sR0FBRztBQUNOLFdBQU8sS0FBS0osSUFBWjtBQUNIOztBQWZjOztBQWlCbkJOLE9BQU8sQ0FBQ0ksWUFBUixHQUF1QkEsWUFBdkI7O0FBQ0EsTUFBTU8sb0JBQU4sQ0FBMkI7QUFDdkJOLEVBQUFBLFdBQVcsQ0FBQ08sUUFBRCxFQUFXO0FBQ2xCLFNBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsVUFBTUMsU0FBUyxHQUFHLEtBQUtELFFBQUwsQ0FBY0UsU0FBZCxHQUEwQixDQUE1QztBQUNBLFVBQU1DLFFBQVEsR0FBRyxLQUFLSCxRQUFMLENBQWNJLE1BQWQsQ0FBcUJILFNBQXJCLENBQWpCO0FBQ0EsVUFBTUksR0FBRyxHQUFHLElBQUlmLFFBQVEsQ0FBQ2dCLFFBQWIsQ0FBc0JMLFNBQXRCLEVBQWlDRSxRQUFRLENBQUNJLEtBQVQsQ0FBZUYsR0FBZixDQUFtQkcsU0FBcEQsQ0FBWjtBQUNBLFNBQUtYLE1BQUwsR0FBYyxLQUFLRyxRQUFMLENBQWNTLFFBQWQsQ0FBdUJKLEdBQXZCLENBQWQ7QUFDSDs7QUFDRFYsRUFBQUEsVUFBVSxDQUFDQyxLQUFELEVBQVE7QUFDZCxVQUFNYyxRQUFRLEdBQUcsS0FBS1YsUUFBTCxDQUFjVyxVQUFkLENBQXlCZixLQUF6QixDQUFqQjtBQUNBLFdBQU8sS0FBS0ksUUFBTCxDQUNGRixPQURFLENBQ00sSUFBSVIsUUFBUSxDQUFDc0IsS0FBYixDQUFtQkYsUUFBbkIsRUFBNkJBLFFBQVEsQ0FBQ0csU0FBVCxDQUFtQixDQUFuQixFQUFzQixDQUF0QixDQUE3QixDQUROLEVBRUZsQixVQUZFLENBRVNlLFFBQVEsQ0FBQ0YsU0FGbEIsQ0FBUDtBQUdIOztBQUNEVixFQUFBQSxPQUFPLEdBQUc7QUFDTixXQUFPLEtBQUtFLFFBQUwsQ0FBY0YsT0FBZCxFQUFQO0FBQ0g7O0FBaEJzQjs7QUFrQjNCVixPQUFPLENBQUNXLG9CQUFSLEdBQStCQSxvQkFBL0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHZzY29kZV8xID0gcmVxdWlyZShcInZzY29kZVwiKTtcbmNsYXNzIFRleHRJdGVyYXRvciB7XG4gICAgY29uc3RydWN0b3IodGV4dCkge1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIH1cbiAgICBjaGFyQ29kZUF0KGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy50ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dC5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dC5sZW5ndGg7XG4gICAgfVxuICAgIGdldFRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQ7XG4gICAgfVxufVxuZXhwb3J0cy5UZXh0SXRlcmF0b3IgPSBUZXh0SXRlcmF0b3I7XG5jbGFzcyBEb2N1bWVudFRleHRJdGVyYXRvciB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnQpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICAgICAgICBjb25zdCBsYXN0SW5kZXggPSB0aGlzLmRvY3VtZW50LmxpbmVDb3VudCAtIDE7XG4gICAgICAgIGNvbnN0IGxhc3RMaW5lID0gdGhpcy5kb2N1bWVudC5saW5lQXQobGFzdEluZGV4KTtcbiAgICAgICAgY29uc3QgZW5kID0gbmV3IHZzY29kZV8xLlBvc2l0aW9uKGxhc3RJbmRleCwgbGFzdExpbmUucmFuZ2UuZW5kLmNoYXJhY3Rlcik7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5kb2N1bWVudC5vZmZzZXRBdChlbmQpO1xuICAgIH1cbiAgICBjaGFyQ29kZUF0KGluZGV4KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5kb2N1bWVudC5wb3NpdGlvbkF0KGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRcbiAgICAgICAgICAgIC5nZXRUZXh0KG5ldyB2c2NvZGVfMS5SYW5nZShwb3NpdGlvbiwgcG9zaXRpb24udHJhbnNsYXRlKDAsIDEpKSlcbiAgICAgICAgICAgIC5jaGFyQ29kZUF0KHBvc2l0aW9uLmNoYXJhY3Rlcik7XG4gICAgfVxuICAgIGdldFRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50LmdldFRleHQoKTtcbiAgICB9XG59XG5leHBvcnRzLkRvY3VtZW50VGV4dEl0ZXJhdG9yID0gRG9jdW1lbnRUZXh0SXRlcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZXh0SXRlcmF0b3IuanMubWFwIl19