// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

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

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const inversify_1 = require("inversify");

const path = require("path");

const types_1 = require("../../../common/application/types");

const types_2 = require("../../../common/platform/types");

const types_3 = require("../../../common/process/types");

const types_4 = require("../../../common/types");

const types_5 = require("../../../ioc/types");

const PSERVE_SCRIPT_FILE_NAME = 'pserve.py';
let ConfigurationProviderUtils = class ConfigurationProviderUtils {
  constructor(serviceContainer) {
    this.serviceContainer = serviceContainer;
    this.executionFactory = this.serviceContainer.get(types_3.IPythonExecutionFactory);
    this.fs = this.serviceContainer.get(types_2.IFileSystem);
    this.logger = this.serviceContainer.get(types_4.ILogger);
  }

  getPyramidStartupScriptFilePath(resource) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const executionService = yield this.executionFactory.create({
          resource
        });
        const output = yield executionService.exec(['-c', 'import pyramid;print(pyramid.__file__)'], {
          throwOnStdErr: true
        });
        const pserveFilePath = path.join(path.dirname(output.stdout.trim()), 'scripts', PSERVE_SCRIPT_FILE_NAME);
        return (yield this.fs.fileExists(pserveFilePath)) ? pserveFilePath : undefined;
      } catch (ex) {
        const message = 'Unable to locate \'pserve.py\' required for debugging of Pyramid applications.';
        this.logger.logError(message, ex);
        const app = this.serviceContainer.get(types_1.IApplicationShell);
        app.showErrorMessage(message);
        return;
      }
    });
  }

};
ConfigurationProviderUtils = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_5.IServiceContainer))], ConfigurationProviderUtils);
exports.ConfigurationProviderUtils = ConfigurationProviderUtils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZ3VyYXRpb25Qcm92aWRlclV0aWxzLmpzIl0sIm5hbWVzIjpbIl9fZGVjb3JhdGUiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZCIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsIl9fcGFyYW0iLCJwYXJhbUluZGV4IiwiZGVjb3JhdG9yIiwiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsImV4cG9ydHMiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJwYXRoIiwidHlwZXNfMSIsInR5cGVzXzIiLCJ0eXBlc18zIiwidHlwZXNfNCIsInR5cGVzXzUiLCJQU0VSVkVfU0NSSVBUX0ZJTEVfTkFNRSIsIkNvbmZpZ3VyYXRpb25Qcm92aWRlclV0aWxzIiwiY29uc3RydWN0b3IiLCJzZXJ2aWNlQ29udGFpbmVyIiwiZXhlY3V0aW9uRmFjdG9yeSIsImdldCIsIklQeXRob25FeGVjdXRpb25GYWN0b3J5IiwiZnMiLCJJRmlsZVN5c3RlbSIsImxvZ2dlciIsIklMb2dnZXIiLCJnZXRQeXJhbWlkU3RhcnR1cFNjcmlwdEZpbGVQYXRoIiwicmVzb3VyY2UiLCJleGVjdXRpb25TZXJ2aWNlIiwiY3JlYXRlIiwib3V0cHV0IiwiZXhlYyIsInRocm93T25TdGRFcnIiLCJwc2VydmVGaWxlUGF0aCIsImpvaW4iLCJkaXJuYW1lIiwic3Rkb3V0IiwidHJpbSIsImZpbGVFeGlzdHMiLCJ1bmRlZmluZWQiLCJleCIsIm1lc3NhZ2UiLCJsb2dFcnJvciIsImFwcCIsIklBcHBsaWNhdGlvblNoZWxsIiwic2hvd0Vycm9yTWVzc2FnZSIsImluamVjdGFibGUiLCJpbmplY3QiLCJJU2VydmljZUNvbnRhaW5lciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBLElBQUlBLFVBQVUsR0FBSSxVQUFRLFNBQUtBLFVBQWQsSUFBNkIsVUFBVUMsVUFBVixFQUFzQkMsTUFBdEIsRUFBOEJDLEdBQTlCLEVBQW1DQyxJQUFuQyxFQUF5QztBQUNuRixNQUFJQyxDQUFDLEdBQUdDLFNBQVMsQ0FBQ0MsTUFBbEI7QUFBQSxNQUEwQkMsQ0FBQyxHQUFHSCxDQUFDLEdBQUcsQ0FBSixHQUFRSCxNQUFSLEdBQWlCRSxJQUFJLEtBQUssSUFBVCxHQUFnQkEsSUFBSSxHQUFHSyxNQUFNLENBQUNDLHdCQUFQLENBQWdDUixNQUFoQyxFQUF3Q0MsR0FBeEMsQ0FBdkIsR0FBc0VDLElBQXJIO0FBQUEsTUFBMkhPLENBQTNIO0FBQ0EsTUFBSSxPQUFPQyxPQUFQLEtBQW1CLFFBQW5CLElBQStCLE9BQU9BLE9BQU8sQ0FBQ0MsUUFBZixLQUE0QixVQUEvRCxFQUEyRUwsQ0FBQyxHQUFHSSxPQUFPLENBQUNDLFFBQVIsQ0FBaUJaLFVBQWpCLEVBQTZCQyxNQUE3QixFQUFxQ0MsR0FBckMsRUFBMENDLElBQTFDLENBQUosQ0FBM0UsS0FDSyxLQUFLLElBQUlVLENBQUMsR0FBR2IsVUFBVSxDQUFDTSxNQUFYLEdBQW9CLENBQWpDLEVBQW9DTyxDQUFDLElBQUksQ0FBekMsRUFBNENBLENBQUMsRUFBN0MsRUFBaUQsSUFBSUgsQ0FBQyxHQUFHVixVQUFVLENBQUNhLENBQUQsQ0FBbEIsRUFBdUJOLENBQUMsR0FBRyxDQUFDSCxDQUFDLEdBQUcsQ0FBSixHQUFRTSxDQUFDLENBQUNILENBQUQsQ0FBVCxHQUFlSCxDQUFDLEdBQUcsQ0FBSixHQUFRTSxDQUFDLENBQUNULE1BQUQsRUFBU0MsR0FBVCxFQUFjSyxDQUFkLENBQVQsR0FBNEJHLENBQUMsQ0FBQ1QsTUFBRCxFQUFTQyxHQUFULENB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Q0FBWWtCLFFBQVosQ0FBcUJELE9BQXJCLEVBQThCRCxFQUE5QjtBQUNBLGNBQU1HLEdBQUcsR0FBRyxLQUFLekIsZ0JBQUwsQ0FBc0JFLEdBQXRCLENBQTBCVixPQUFPLENBQUNrQyxpQkFBbEMsQ0FBWjtBQUNBRCxRQUFBQSxHQUFHLENBQUNFLGdCQUFKLENBQXFCSixPQUFyQjtBQUNBO0FBQ0g7QUFDSixLQWRlLENBQWhCO0FBZUg7O0FBdkI2RCxDQUFsRTtBQXlCQXpCLDBCQUEwQixHQUFHL0MsVUFBVSxDQUFDLENBQ3BDc0MsV0FBVyxDQUFDdUMsVUFBWixFQURvQyxFQUVwQzdELE9BQU8sQ0FBQyxDQUFELEVBQUlzQixXQUFXLENBQUN3QyxNQUFaLENBQW1CakMsT0FBTyxDQUFDa0MsaUJBQTNCLENBQUosQ0FGNkIsQ0FBRCxFQUdwQ2hDLDBCQUhvQyxDQUF2QztBQUlBVixPQUFPLENBQUNVLDBCQUFSLEdBQXFDQSwwQkFBckMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbid1c2Ugc3RyaWN0JztcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX3BhcmFtID0gKHRoaXMgJiYgdGhpcy5fX3BhcmFtKSB8fCBmdW5jdGlvbiAocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbW1vbi9hcHBsaWNhdGlvbi90eXBlc1wiKTtcbmNvbnN0IHR5cGVzXzIgPSByZXF1aXJlKFwiLi4vLi4vLi4vY29tbW9uL3BsYXRmb3JtL3R5cGVzXCIpO1xuY29uc3QgdHlwZXNfMyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jb21tb24vcHJvY2Vzcy90eXBlc1wiKTtcbmNvbnN0IHR5cGVzXzQgPSByZXF1aXJlKFwiLi4vLi4vLi4vY29tbW9uL3R5cGVzXCIpO1xuY29uc3QgdHlwZXNfNSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9pb2MvdHlwZXNcIik7XG5jb25zdCBQU0VSVkVfU0NSSVBUX0ZJTEVfTkFNRSA9ICdwc2VydmUucHknO1xubGV0IENvbmZpZ3VyYXRpb25Qcm92aWRlclV0aWxzID0gY2xhc3MgQ29uZmlndXJhdGlvblByb3ZpZGVyVXRpbHMge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlQ29udGFpbmVyID0gc2VydmljZUNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5leGVjdXRpb25GYWN0b3J5ID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18zLklQeXRob25FeGVjdXRpb25GYWN0b3J5KTtcbiAgICAgICAgdGhpcy5mcyA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMi5JRmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc180LklMb2dnZXIpO1xuICAgIH1cbiAgICBnZXRQeXJhbWlkU3RhcnR1cFNjcmlwdEZpbGVQYXRoKHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4ZWN1dGlvblNlcnZpY2UgPSB5aWVsZCB0aGlzLmV4ZWN1dGlvbkZhY3RvcnkuY3JlYXRlKHsgcmVzb3VyY2UgfSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3V0cHV0ID0geWllbGQgZXhlY3V0aW9uU2VydmljZS5leGVjKFsnLWMnLCAnaW1wb3J0IHB5cmFtaWQ7cHJpbnQocHlyYW1pZC5fX2ZpbGVfXyknXSwgeyB0aHJvd09uU3RkRXJyOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBzZXJ2ZUZpbGVQYXRoID0gcGF0aC5qb2luKHBhdGguZGlybmFtZShvdXRwdXQuc3Rkb3V0LnRyaW0oKSksICdzY3JpcHRzJywgUFNFUlZFX1NDUklQVF9GSUxFX05BTUUpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoeWllbGQgdGhpcy5mcy5maWxlRXhpc3RzKHBzZXJ2ZUZpbGVQYXRoKSkgPyBwc2VydmVGaWxlUGF0aCA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnVW5hYmxlIHRvIGxvY2F0ZSBcXCdwc2VydmUucHlcXCcgcmVxdWlyZWQgZm9yIGRlYnVnZ2luZyBvZiBQeXJhbWlkIGFwcGxpY2F0aW9ucy4nO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZ0Vycm9yKG1lc3NhZ2UsIGV4KTtcbiAgICAgICAgICAgICAgICBjb25zdCBhcHAgPSB0aGlzLnNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzEuSUFwcGxpY2F0aW9uU2hlbGwpO1xuICAgICAgICAgICAgICAgIGFwcC5zaG93RXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcbkNvbmZpZ3VyYXRpb25Qcm92aWRlclV0aWxzID0gX19kZWNvcmF0ZShbXG4gICAgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSgpLFxuICAgIF9fcGFyYW0oMCwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzUuSVNlcnZpY2VDb250YWluZXIpKVxuXSwgQ29uZmlndXJhdGlvblByb3ZpZGVyVXRpbHMpO1xuZXhwb3J0cy5Db25maWd1cmF0aW9uUHJvdmlkZXJVdGlscyA9IENvbmZpZ3VyYXRpb25Qcm92aWRlclV0aWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlndXJhdGlvblByb3ZpZGVyVXRpbHMuanMubWFwIl19