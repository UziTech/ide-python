"use strict";

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

const path = require("path");

class WorkspacePythonPathUpdaterService {
  constructor(workspace, workspaceService) {
    this.workspace = workspace;
    this.workspaceService = workspaceService;
  }

  updatePythonPath(pythonPath) {
    return __awaiter(this, void 0, void 0, function* () {
      const pythonConfig = this.workspaceService.getConfiguration('python', this.workspace);
      const pythonPathValue = pythonConfig.inspect('pythonPath');

      if (pythonPathValue && pythonPathValue.workspaceValue === pythonPath) {
        return;
      }

      if (pythonPath.startsWith(this.workspace.fsPath)) {
        pythonPath = path.relative(this.workspace.fsPath, pythonPath);
      }

      yield pythonConfig.update('pythonPath', pythonPath, false);
    });
  }

}

exports.WorkspacePythonPathUpdaterService = WorkspacePythonPathUpdaterService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtzcGFjZVVwZGF0ZXJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwidmFsdWUiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJwYXRoIiwicmVxdWlyZSIsIldvcmtzcGFjZVB5dGhvblBhdGhVcGRhdGVyU2VydmljZSIsImNvbnN0cnVjdG9yIiwid29ya3NwYWNlIiwid29ya3NwYWNlU2VydmljZSIsInVwZGF0ZVB5dGhvblBhdGgiLCJweXRob25QYXRoIiwicHl0aG9uQ29uZmlnIiwiZ2V0Q29uZmlndXJhdGlvbiIsInB5dGhvblBhdGhWYWx1ZSIsImluc3BlY3QiLCJ3b3Jrc3BhY2VWYWx1ZSIsInN0YXJ0c1dpdGgiLCJmc1BhdGgiLCJyZWxhdGl2ZSIsInVwZGF0ZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBSUEsU0FBUyxHQUFJLFVBQVEsU0FBS0EsU0FBZCxJQUE0QixVQUFVQyxPQUFWLEVBQW1CQyxVQUFuQixFQUErQkMsQ0FBL0IsRUFBa0NDLFNBQWxDLEVBQTZDO0FBQ3JGLFNBQU8sS0FBS0QsQ0FBQyxLQUFLQSxDQUFDLEdBQUdFLE9BQVQsQ0FBTixFQUF5QixVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUN2RCxhQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUFFLFVBQUk7QUFBRUMsUUFBQUEsSUFBSSxDQUFDTixTQUFTLENBQUNPLElBQVYsQ0FBZUYsS0FBZixDQUFELENBQUo7QUFBOEIsT0FBcEMsQ0FBcUMsT0FBT0csQ0FBUCxFQUFVO0FBQUVMLFFBQUFBLE1BQU0sQ0FBQ0ssQ0FBRCxDQUFOO0FBQVk7QUFBRTs7QUFDM0YsYUFBU0MsUUFBVCxDQUFrQkosS0FBbEIsRUFBeUI7QUFBRSxVQUFJO0FBQUVDLFFBQUFBLElBQUksQ0FBQ04sU0FBUyxDQUFDLE9BQUQsQ0FBVCxDQUFtQkssS0FBbkIsQ0FBRCxDQUFKO0FBQWtDLE9BQXhDLENBQXlDLE9BQU9HLENBQVAsRUFBVTtBQUFFTCxRQUFBQSxNQUFNLENBQUNLLENBQUQsQ0FBTjtBQUFZO0FBQUU7O0FBQzlGLGFBQVNGLElBQVQsQ0FBY0ksTUFBZCxFQUFzQjtBQUFFQSxNQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBY1QsT0FBTyxDQUFDUSxNQUFNLENBQUNMLEtBQVIsQ0FBckIsR0FBc0MsSUFBSU4sQ0FBSixDQUFNLFVBQVVHLE9BQVYsRUFBbUI7QUFBRUEsUUFBQUEsT0FBTyxDQUFDUSxNQUFNLENBQUNMLEtBQVIsQ0FBUDtBQUF3QixPQUFuRCxFQUFxRE8sSUFBckQsQ0FBMERSLFNBQTFELEVBQXFFSyxRQUFyRSxDQUF0QztBQUF1SDs7QUFDL0lILElBQUFBLElBQUksQ0FBQyxDQUFDTixTQUFTLEdBQUdBLFNBQVMsQ0FBQ2EsS0FBVixDQUFnQmhCLE9BQWhCLEVBQXlCQyxVQUFVLElBQUksRUFBdkMsQ0FBYixFQUF5RFMsSUFBekQsRUFBRCxDQUFKO0FBQ0gsR0FMTSxDQUFQO0FBTUgsQ0FQRDs7QUFRQU8sTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFWCxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3Qzs7QUFDQSxNQUFNWSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLE1BQU1DLGlDQUFOLENBQXdDO0FBQ3BDQyxFQUFBQSxXQUFXLENBQUNDLFNBQUQsRUFBWUMsZ0JBQVosRUFBOEI7QUFDckMsU0FBS0QsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QkEsZ0JBQXhCO0FBQ0g7O0FBQ0RDLEVBQUFBLGdCQUFnQixDQUFDQyxVQUFELEVBQWE7QUFDekIsV0FBTzVCLFNBQVMsQ0FBQyxJQUFELEVBQU8sS0FBSyxDQUFaLEVBQWUsS0FBSyxDQUFwQixFQUF1QixhQUFhO0FBQ2hELFlBQU02QixZQUFZLEdBQUcsS0FBS0gsZ0JBQUwsQ0FBc0JJLGdCQUF0QixDQUF1QyxRQUF2QyxFQUFpRCxLQUFLTCxTQUF0RCxDQUFyQjtBQUNBLFlBQU1NLGVBQWUsR0FBR0YsWUFBWSxDQUFDRyxPQUFiLENBQXFCLFlBQXJCLENBQXhCOztBQUNBLFVBQUlELGVBQWUsSUFBSUEsZUFBZSxDQUFDRSxjQUFoQixLQUFtQ0wsVUFBMUQsRUFBc0U7QUFDbEU7QUFDSDs7QUFDRCxVQUFJQSxVQUFVLENBQUNNLFVBQVgsQ0FBc0IsS0FBS1QsU0FBTCxDQUFlVSxNQUFyQyxDQUFKLEVBQWtEO0FBQzlDUCxRQUFBQSxVQUFVLEdBQUdQLElBQUksQ0FBQ2UsUUFBTCxDQUFjLEtBQUtYLFNBQUwsQ0FBZVUsTUFBN0IsRUFBcUNQLFVBQXJDLENBQWI7QUFDSDs7QUFDRCxZQUFNQyxZQUFZLENBQUNRLE1BQWIsQ0FBb0IsWUFBcEIsRUFBa0NULFVBQWxDLEVBQThDLEtBQTlDLENBQU47QUFDSCxLQVZlLENBQWhCO0FBV0g7O0FBakJtQzs7QUFtQnhDUixPQUFPLENBQUNHLGlDQUFSLEdBQTRDQSxpQ0FBNUMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY2xhc3MgV29ya3NwYWNlUHl0aG9uUGF0aFVwZGF0ZXJTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih3b3Jrc3BhY2UsIHdvcmtzcGFjZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy53b3Jrc3BhY2UgPSB3b3Jrc3BhY2U7XG4gICAgICAgIHRoaXMud29ya3NwYWNlU2VydmljZSA9IHdvcmtzcGFjZVNlcnZpY2U7XG4gICAgfVxuICAgIHVwZGF0ZVB5dGhvblBhdGgocHl0aG9uUGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgcHl0aG9uQ29uZmlnID0gdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24oJ3B5dGhvbicsIHRoaXMud29ya3NwYWNlKTtcbiAgICAgICAgICAgIGNvbnN0IHB5dGhvblBhdGhWYWx1ZSA9IHB5dGhvbkNvbmZpZy5pbnNwZWN0KCdweXRob25QYXRoJyk7XG4gICAgICAgICAgICBpZiAocHl0aG9uUGF0aFZhbHVlICYmIHB5dGhvblBhdGhWYWx1ZS53b3Jrc3BhY2VWYWx1ZSA9PT0gcHl0aG9uUGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChweXRob25QYXRoLnN0YXJ0c1dpdGgodGhpcy53b3Jrc3BhY2UuZnNQYXRoKSkge1xuICAgICAgICAgICAgICAgIHB5dGhvblBhdGggPSBwYXRoLnJlbGF0aXZlKHRoaXMud29ya3NwYWNlLmZzUGF0aCwgcHl0aG9uUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB5aWVsZCBweXRob25Db25maWcudXBkYXRlKCdweXRob25QYXRoJywgcHl0aG9uUGF0aCwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLldvcmtzcGFjZVB5dGhvblBhdGhVcGRhdGVyU2VydmljZSA9IFdvcmtzcGFjZVB5dGhvblBhdGhVcGRhdGVyU2VydmljZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdvcmtzcGFjZVVwZGF0ZXJTZXJ2aWNlLmpzLm1hcCJdfQ==