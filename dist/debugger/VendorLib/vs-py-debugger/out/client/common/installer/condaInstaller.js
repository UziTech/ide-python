"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

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

const contracts_1 = require("../../interpreter/contracts");

const types_1 = require("../../ioc/types");

const types_2 = require("../types");

const moduleInstaller_1 = require("./moduleInstaller");
/**
 * A Python module installer for a conda environment.
 */


let CondaInstaller = class CondaInstaller extends moduleInstaller_1.ModuleInstaller {
  constructor(serviceContainer) {
    super(serviceContainer);
  }

  get displayName() {
    return 'Conda';
  }

  get priority() {
    return 0;
  }
  /**
   * Checks whether we can use Conda as module installer for a given resource.
   * We need to perform two checks:
   * 1. Ensure we have conda.
   * 2. Check if the current environment is a conda environment.
   * @param {Uri} [resource=] Resource used to identify the workspace.
   * @returns {Promise<boolean>} Whether conda is supported as a module installer or not.
   */


  isSupported(resource) {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.isCondaAvailable === false) {
        return false;
      }

      const condaLocator = this.serviceContainer.get(contracts_1.ICondaService);
      this.isCondaAvailable = yield condaLocator.isCondaAvailable();

      if (!this.isCondaAvailable) {
        return false;
      } // Now we need to check if the current environment is a conda environment or not.


      return this.isCurrentEnvironmentACondaEnvironment(resource);
    });
  }
  /**
   * Return the commandline args needed to install the module.
   */


  getExecutionInfo(moduleName, resource) {
    return __awaiter(this, void 0, void 0, function* () {
      const condaService = this.serviceContainer.get(contracts_1.ICondaService);
      const condaFile = yield condaService.getCondaFile();
      const pythonPath = this.serviceContainer.get(types_2.IConfigurationService).getSettings(resource).pythonPath;
      const info = yield condaService.getCondaEnvironment(pythonPath);
      const args = ['install'];

      if (info && info.name) {
        // If we have the name of the conda environment, then use that.
        args.push('--name');
        args.push(info.name.toCommandArgument());
      } else if (info && info.path) {
        // Else provide the full path to the environment path.
        args.push('--prefix');
        args.push(info.path.fileToCommandArgument());
      }

      args.push(moduleName);
      return {
        args,
        execPath: condaFile
      };
    });
  }
  /**
   * Is anaconda the current interpreter?
   */


  isCurrentEnvironmentACondaEnvironment(resource) {
    return __awaiter(this, void 0, void 0, function* () {
      const condaService = this.serviceContainer.get(contracts_1.ICondaService);
      const pythonPath = this.serviceContainer.get(types_2.IConfigurationService).getSettings(resource).pythonPath;
      return condaService.isCondaEnvironment(pythonPath);
    });
  }

};
CondaInstaller = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.IServiceContainer))], CondaInstaller);
exports.CondaInstaller = CondaInstaller;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmRhSW5zdGFsbGVyLmpzIl0sIm5hbWVzIjpbIl9fZGVjb3JhdGUiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZCIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsIl9fcGFyYW0iLCJwYXJhbUluZGV4IiwiZGVjb3JhdG9yIiwiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsImV4cG9ydHMiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJjb250cmFjdHNfMSIsInR5cGVzXzEiLCJ0eXBlc18yIiwibW9kdWxlSW5zdGFsbGVyXzEiLCJDb25kYUluc3RhbGxlciIsIk1vZHVsZUluc3RhbGxlciIsImNvbnN0cnVjdG9yIiwic2VydmljZUNvbnRhaW5lciIsImRpc3BsYXlOYW1lIiwicHJpb3JpdHkiLCJpc1N1cHBvcnRlZCIsInJlc291cmNlIiwiaXNDb25kYUF2YWlsYWJsZSIsImNvbmRhTG9jYXRvciIsImdldCIsIklDb25kYVNlcnZpY2UiLCJpc0N1cnJlbnRFbnZpcm9ubWVudEFDb25kYUVudmlyb25tZW50IiwiZ2V0RXhlY3V0aW9uSW5mbyIsIm1vZHVsZU5hbWUiLCJjb25kYVNlcnZpY2UiLCJjb25kYUZpbGUiLCJnZXRDb25kYUZpbGUiLCJweXRob25QYXRoIiwiSUNvbmZpZ3VyYXRpb25TZXJ2aWNlIiwiZ2V0U2V0dGluZ3MiLCJpbmZvIiwiZ2V0Q29uZGFFbnZpcm9ubWVudCIsImFyZ3MiLCJuYW1lIiwicHVzaCIsInRvQ29tbWFuZEFyZ3VtZW50IiwicGF0aCIsImZpbGVUb0NvbW1hbmRBcmd1bWVudCIsImV4ZWNQYXRoIiwiaXNDb25kYUVudmlyb25tZW50IiwiaW5qZWN0YWJsZSIsImluamVjdCIsIklTZXJ2aWNlQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiQUFBQSxhLENBQ0E7QUFDQTs7QUFDQSxJQUFJQSxVQUFVLEdBQUksVUFBUSxTQUFLQSxVQUFkLElBQTZCLFVBQVVDLFVBQVYsRUFBc0JDLE1BQXRCLEVBQThCQyxHQUE5QixFQUFtQ0MsSUFBbkMsRUFBeUM7QUFDbkYsTUFBSUMsQ0FBQyxHQUFHQyxTQUFTLENBQUNDLE1BQWxCO0FBQUEsTUFBMEJDLENBQUMsR0FBR0gsQ0FBQyxHQUFHLENBQUosR0FBUUgsTUFBUixHQUFpQkUsSUFBSSxLQUFLLElBQVQsR0FBZ0JBLElBQUksR0FBR0ssTUFBTSxDQUFDQyx3QkFBUCxDQUFnQ1IsTUFBaEMsRUFBd0NDLEdBQXhDLENBQXZCLEdBQXNFQyxJQUFySDtBQUFBLE1BQTJITyxDQUEzSDtBQUNBLE1BQUksT0FBT0MsT0FBUCxLQUFtQixRQUFuQixJQUErQixPQUFPQSxPQUFPLENBQUNDLFFBQWYsS0FBNEIsVUFBL0QsRUFBMkVMLENBQUMsR0FBR0ksT0FBTyxDQUFDQyxRQUFSLENBQWlCWixVQUFqQixFQUE2QkMsTUFBN0IsRUFBcUNDLEdBQXJDLEVBQTBDQyxJQUExQyxDQUFKLENBQTNFLEtBQ0ssS0FBSyxJQUFJVSxDQUFDLEdBQUdiLFVBQVUsQ0FBQ00sTUFBWCxHQUFvQixDQUFqQyxFQUFvQ08sQ0FBQyxJQUFJLENBQXpDLEVBQTRDQSxDQUFDLEVBQTdDLEVBQWlELElBQUlILENBQUMsR0FBR1YsVUFBVSxDQUFDYSxDQUFELENBQWxCLEVBQXVCTixDQUFDLEdBQUcsQ0FBQ0gsQ0FBQyxHQUFHLENBQUosR0FBUU0sQ0FBQyxDQUFDSCxDQUFELENBQVQsR0FBZUgsQ0FBQyxHQUFHLENBQUosR0FBUU0sQ0FBQyxDQUFDVCxNQUFELEVBQVNDLEdBQVQsRUFBY0ssQ0FBZCxDQUFULEdBQTRC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QyxDQUFQO0FBQ0gsS0FKZSxDQUFoQjtBQUtIOztBQXBFK0UsQ0FBcEY7QUFzRUFsQixjQUFjLEdBQUc1QyxVQUFVLENBQUMsQ0FDeEJzQyxXQUFXLENBQUNxQyxVQUFaLEVBRHdCLEVBRXhCM0QsT0FBTyxDQUFDLENBQUQsRUFBSXNCLFdBQVcsQ0FBQ3NDLE1BQVosQ0FBbUJuQyxPQUFPLENBQUNvQyxpQkFBM0IsQ0FBSixDQUZpQixDQUFELEVBR3hCakMsY0FId0IsQ0FBM0I7QUFJQVAsT0FBTyxDQUFDTyxjQUFSLEdBQXlCQSxjQUF6QiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19wYXJhbSA9ICh0aGlzICYmIHRoaXMuX19wYXJhbSkgfHwgZnVuY3Rpb24gKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xuY29uc3QgY29udHJhY3RzXzEgPSByZXF1aXJlKFwiLi4vLi4vaW50ZXJwcmV0ZXIvY29udHJhY3RzXCIpO1xuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9pb2MvdHlwZXNcIik7XG5jb25zdCB0eXBlc18yID0gcmVxdWlyZShcIi4uL3R5cGVzXCIpO1xuY29uc3QgbW9kdWxlSW5zdGFsbGVyXzEgPSByZXF1aXJlKFwiLi9tb2R1bGVJbnN0YWxsZXJcIik7XG4vKipcbiAqIEEgUHl0aG9uIG1vZHVsZSBpbnN0YWxsZXIgZm9yIGEgY29uZGEgZW52aXJvbm1lbnQuXG4gKi9cbmxldCBDb25kYUluc3RhbGxlciA9IGNsYXNzIENvbmRhSW5zdGFsbGVyIGV4dGVuZHMgbW9kdWxlSW5zdGFsbGVyXzEuTW9kdWxlSW5zdGFsbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlQ29udGFpbmVyKSB7XG4gICAgICAgIHN1cGVyKHNlcnZpY2VDb250YWluZXIpO1xuICAgIH1cbiAgICBnZXQgZGlzcGxheU5hbWUoKSB7XG4gICAgICAgIHJldHVybiAnQ29uZGEnO1xuICAgIH1cbiAgICBnZXQgcHJpb3JpdHkoKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB3ZSBjYW4gdXNlIENvbmRhIGFzIG1vZHVsZSBpbnN0YWxsZXIgZm9yIGEgZ2l2ZW4gcmVzb3VyY2UuXG4gICAgICogV2UgbmVlZCB0byBwZXJmb3JtIHR3byBjaGVja3M6XG4gICAgICogMS4gRW5zdXJlIHdlIGhhdmUgY29uZGEuXG4gICAgICogMi4gQ2hlY2sgaWYgdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQgaXMgYSBjb25kYSBlbnZpcm9ubWVudC5cbiAgICAgKiBAcGFyYW0ge1VyaX0gW3Jlc291cmNlPV0gUmVzb3VyY2UgdXNlZCB0byBpZGVudGlmeSB0aGUgd29ya3NwYWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBXaGV0aGVyIGNvbmRhIGlzIHN1cHBvcnRlZCBhcyBhIG1vZHVsZSBpbnN0YWxsZXIgb3Igbm90LlxuICAgICAqL1xuICAgIGlzU3VwcG9ydGVkKHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0NvbmRhQXZhaWxhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvbmRhTG9jYXRvciA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQoY29udHJhY3RzXzEuSUNvbmRhU2VydmljZSk7XG4gICAgICAgICAgICB0aGlzLmlzQ29uZGFBdmFpbGFibGUgPSB5aWVsZCBjb25kYUxvY2F0b3IuaXNDb25kYUF2YWlsYWJsZSgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ29uZGFBdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb3cgd2UgbmVlZCB0byBjaGVjayBpZiB0aGUgY3VycmVudCBlbnZpcm9ubWVudCBpcyBhIGNvbmRhIGVudmlyb25tZW50IG9yIG5vdC5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzQ3VycmVudEVudmlyb25tZW50QUNvbmRhRW52aXJvbm1lbnQocmVzb3VyY2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBjb21tYW5kbGluZSBhcmdzIG5lZWRlZCB0byBpbnN0YWxsIHRoZSBtb2R1bGUuXG4gICAgICovXG4gICAgZ2V0RXhlY3V0aW9uSW5mbyhtb2R1bGVOYW1lLCByZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgY29uZGFTZXJ2aWNlID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldChjb250cmFjdHNfMS5JQ29uZGFTZXJ2aWNlKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbmRhRmlsZSA9IHlpZWxkIGNvbmRhU2VydmljZS5nZXRDb25kYUZpbGUoKTtcbiAgICAgICAgICAgIGNvbnN0IHB5dGhvblBhdGggPSB0aGlzLnNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzIuSUNvbmZpZ3VyYXRpb25TZXJ2aWNlKS5nZXRTZXR0aW5ncyhyZXNvdXJjZSkucHl0aG9uUGF0aDtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSB5aWVsZCBjb25kYVNlcnZpY2UuZ2V0Q29uZGFFbnZpcm9ubWVudChweXRob25QYXRoKTtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbJ2luc3RhbGwnXTtcbiAgICAgICAgICAgIGlmIChpbmZvICYmIGluZm8ubmFtZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgdGhlIG5hbWUgb2YgdGhlIGNvbmRhIGVudmlyb25tZW50LCB0aGVuIHVzZSB0aGF0LlxuICAgICAgICAgICAgICAgIGFyZ3MucHVzaCgnLS1uYW1lJyk7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKGluZm8ubmFtZS50b0NvbW1hbmRBcmd1bWVudCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGluZm8gJiYgaW5mby5wYXRoKSB7XG4gICAgICAgICAgICAgICAgLy8gRWxzZSBwcm92aWRlIHRoZSBmdWxsIHBhdGggdG8gdGhlIGVudmlyb25tZW50IHBhdGguXG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKCctLXByZWZpeCcpO1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChpbmZvLnBhdGguZmlsZVRvQ29tbWFuZEFyZ3VtZW50KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXJncy5wdXNoKG1vZHVsZU5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgICAgIGV4ZWNQYXRoOiBjb25kYUZpbGVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJcyBhbmFjb25kYSB0aGUgY3VycmVudCBpbnRlcnByZXRlcj9cbiAgICAgKi9cbiAgICBpc0N1cnJlbnRFbnZpcm9ubWVudEFDb25kYUVudmlyb25tZW50KHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBjb25kYVNlcnZpY2UgPSB0aGlzLnNlcnZpY2VDb250YWluZXIuZ2V0KGNvbnRyYWN0c18xLklDb25kYVNlcnZpY2UpO1xuICAgICAgICAgICAgY29uc3QgcHl0aG9uUGF0aCA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMi5JQ29uZmlndXJhdGlvblNlcnZpY2UpLmdldFNldHRpbmdzKHJlc291cmNlKS5weXRob25QYXRoO1xuICAgICAgICAgICAgcmV0dXJuIGNvbmRhU2VydmljZS5pc0NvbmRhRW52aXJvbm1lbnQocHl0aG9uUGF0aCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5Db25kYUluc3RhbGxlciA9IF9fZGVjb3JhdGUoW1xuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKSxcbiAgICBfX3BhcmFtKDAsIGludmVyc2lmeV8xLmluamVjdCh0eXBlc18xLklTZXJ2aWNlQ29udGFpbmVyKSlcbl0sIENvbmRhSW5zdGFsbGVyKTtcbmV4cG9ydHMuQ29uZGFJbnN0YWxsZXIgPSBDb25kYUluc3RhbGxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmRhSW5zdGFsbGVyLmpzLm1hcCJdfQ==