"use strict";

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const inversify_1 = require("inversify");

const path = require("path");

const types_1 = require("../types");

const constants_1 = require("./constants"); // tslint:disable-next-line:no-var-requires no-require-imports


const untildify = require('untildify');

let PathUtils = class PathUtils {
  constructor(isWindows) {
    this.isWindows = isWindows;
    this.home = '';
    this.home = untildify('~');
  }

  get delimiter() {
    return path.delimiter;
  } // TO DO: Deprecate in favor of IPlatformService


  getPathVariableName() {
    return this.isWindows ? constants_1.WINDOWS_PATH_VARIABLE_NAME : constants_1.NON_WINDOWS_PATH_VARIABLE_NAME;
  }

  basename(pathValue, ext) {
    return path.basename(pathValue, ext);
  }

  getDisplayName(pathValue, cwd) {
    if (cwd && pathValue.startsWith(cwd)) {
      return `.${path.sep}${path.relative(cwd, pathValue)}`;
    } else if (pathValue.startsWith(this.home)) {
      return `~${path.sep}${path.relative(this.home, pathValue)}`;
    } else {
      return pathValue;
    }
  }

};
PathUtils = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.IsWindows))], PathUtils);
exports.PathUtils = PathUtils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhdGhVdGlscy5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJfX3BhcmFtIiwicGFyYW1JbmRleCIsImRlY29yYXRvciIsImV4cG9ydHMiLCJ2YWx1ZSIsImludmVyc2lmeV8xIiwicmVxdWlyZSIsInBhdGgiLCJ0eXBlc18xIiwiY29uc3RhbnRzXzEiLCJ1bnRpbGRpZnkiLCJQYXRoVXRpbHMiLCJjb25zdHJ1Y3RvciIsImlzV2luZG93cyIsImhvbWUiLCJkZWxpbWl0ZXIiLCJnZXRQYXRoVmFyaWFibGVOYW1lIiwiV0lORE9XU19QQVRIX1ZBUklBQkxFX05BTUUiLCJOT05fV0lORE9XU19QQVRIX1ZBUklBQkxFX05BTUUiLCJiYXNlbmFtZSIsInBhdGhWYWx1ZSIsImV4dCIsImdldERpc3BsYXlOYW1lIiwiY3dkIiwic3RhcnRzV2l0aCIsInNlcCIsInJlbGF0aXZlIiwiaW5qZWN0YWJsZSIsImluamVjdCIsIklzV2luZG93cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2QixVQUFVQyxVQUFWLEVBQXNCQyxNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ25GLE1BQUlDLENBQUMsR0FBR0MsU0FBUyxDQUFDQyxNQUFsQjtBQUFBLE1BQTBCQyxDQUFDLEdBQUdILENBQUMsR0FBRyxDQUFKLEdBQVFILE1BQVIsR0FBaUJFLElBQUksS0FBSyxJQUFULEdBQWdCQSxJQUFJLEdBQUdLLE1BQU0sQ0FBQ0Msd0JBQVAsQ0FBZ0NSLE1BQWhDLEVBQXdDQyxHQUF4QyxDQUF2QixHQUFzRUMsSUFBckg7QUFBQSxN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RUFBcEQ7QUFDSCxLQUZELE1BR0ssSUFBSUEsU0FBUyxDQUFDSSxVQUFWLENBQXFCLEtBQUtWLElBQTFCLENBQUosRUFBcUM7QUFDdEMsYUFBUSxJQUFHUCxJQUFJLENBQUNrQixHQUFJLEdBQUVsQixJQUFJLENBQUNtQixRQUFMLENBQWMsS0FBS1osSUFBbkIsRUFBeUJNLFNBQXpCLENBQW9DLEVBQTFEO0FBQ0gsS0FGSSxNQUdBO0FBQ0QsYUFBT0EsU0FBUDtBQUNIO0FBQ0o7O0FBMUIyQixDQUFoQztBQTRCQVQsU0FBUyxHQUFHM0IsVUFBVSxDQUFDLENBQ25CcUIsV0FBVyxDQUFDc0IsVUFBWixFQURtQixFQUVuQjNCLE9BQU8sQ0FBQyxDQUFELEVBQUlLLFdBQVcsQ0FBQ3VCLE1BQVosQ0FBbUJwQixPQUFPLENBQUNxQixTQUEzQixDQUFKLENBRlksQ0FBRCxFQUduQmxCLFNBSG1CLENBQXRCO0FBSUFSLE9BQU8sQ0FBQ1EsU0FBUixHQUFvQkEsU0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX3BhcmFtID0gKHRoaXMgJiYgdGhpcy5fX3BhcmFtKSB8fCBmdW5jdGlvbiAocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi90eXBlc1wiKTtcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzXCIpO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZhci1yZXF1aXJlcyBuby1yZXF1aXJlLWltcG9ydHNcbmNvbnN0IHVudGlsZGlmeSA9IHJlcXVpcmUoJ3VudGlsZGlmeScpO1xubGV0IFBhdGhVdGlscyA9IGNsYXNzIFBhdGhVdGlscyB7XG4gICAgY29uc3RydWN0b3IoaXNXaW5kb3dzKSB7XG4gICAgICAgIHRoaXMuaXNXaW5kb3dzID0gaXNXaW5kb3dzO1xuICAgICAgICB0aGlzLmhvbWUgPSAnJztcbiAgICAgICAgdGhpcy5ob21lID0gdW50aWxkaWZ5KCd+Jyk7XG4gICAgfVxuICAgIGdldCBkZWxpbWl0ZXIoKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmRlbGltaXRlcjtcbiAgICB9XG4gICAgLy8gVE8gRE86IERlcHJlY2F0ZSBpbiBmYXZvciBvZiBJUGxhdGZvcm1TZXJ2aWNlXG4gICAgZ2V0UGF0aFZhcmlhYmxlTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNXaW5kb3dzID8gY29uc3RhbnRzXzEuV0lORE9XU19QQVRIX1ZBUklBQkxFX05BTUUgOiBjb25zdGFudHNfMS5OT05fV0lORE9XU19QQVRIX1ZBUklBQkxFX05BTUU7XG4gICAgfVxuICAgIGJhc2VuYW1lKHBhdGhWYWx1ZSwgZXh0KSB7XG4gICAgICAgIHJldHVybiBwYXRoLmJhc2VuYW1lKHBhdGhWYWx1ZSwgZXh0KTtcbiAgICB9XG4gICAgZ2V0RGlzcGxheU5hbWUocGF0aFZhbHVlLCBjd2QpIHtcbiAgICAgICAgaWYgKGN3ZCAmJiBwYXRoVmFsdWUuc3RhcnRzV2l0aChjd2QpKSB7XG4gICAgICAgICAgICByZXR1cm4gYC4ke3BhdGguc2VwfSR7cGF0aC5yZWxhdGl2ZShjd2QsIHBhdGhWYWx1ZSl9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwYXRoVmFsdWUuc3RhcnRzV2l0aCh0aGlzLmhvbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYH4ke3BhdGguc2VwfSR7cGF0aC5yZWxhdGl2ZSh0aGlzLmhvbWUsIHBhdGhWYWx1ZSl9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwYXRoVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59O1xuUGF0aFV0aWxzID0gX19kZWNvcmF0ZShbXG4gICAgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSgpLFxuICAgIF9fcGFyYW0oMCwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzEuSXNXaW5kb3dzKSlcbl0sIFBhdGhVdGlscyk7XG5leHBvcnRzLlBhdGhVdGlscyA9IFBhdGhVdGlscztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdGhVdGlscy5qcy5tYXAiXX0=