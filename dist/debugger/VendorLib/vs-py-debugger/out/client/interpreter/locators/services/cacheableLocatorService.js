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
}); // tslint:disable:no-any

const inversify_1 = require("inversify");

const md5 = require("md5");

const vscode_1 = require("vscode");

const types_1 = require("../../../common/application/types");

require("../../../common/extensions");

const logger_1 = require("../../../common/logger");

const types_2 = require("../../../common/types");

const async_1 = require("../../../common/utils/async");

let CacheableLocatorService = class CacheableLocatorService {
  constructor(name, serviceContainer, cachePerWorkspace = false) {
    this.serviceContainer = serviceContainer;
    this.cachePerWorkspace = cachePerWorkspace;
    this.promisesPerResource = new Map();
    this.handlersAddedToResource = new Set();
    this.locating = new vscode_1.EventEmitter();
    this.cacheKeyPrefix = `INTERPRETERS_CACHE_v2_${name}`;
  }

  get onLocating() {
    return this.locating.event;
  }

  getInterpreters(resource) {
    return __awaiter(this, void 0, void 0, function* () {
      const cacheKey = this.getCacheKey(resource);
      let deferred = this.promisesPerResource.get(cacheKey);

      if (!deferred) {
        deferred = async_1.createDeferred();
        this.promisesPerResource.set(cacheKey, deferred);
        this.addHandlersForInterpreterWatchers(cacheKey, resource).ignoreErrors();
        this.getInterpretersImplementation(resource).then(items => __awaiter(this, void 0, void 0, function* () {
          yield this.cacheInterpreters(items, resource);
          deferred.resolve(items);
        })).catch(ex => deferred.reject(ex));
        this.locating.fire(deferred.promise);
      }

      if (deferred.completed) {
        return deferred.promise;
      }

      const cachedInterpreters = this.getCachedInterpreters(resource);
      return Array.isArray(cachedInterpreters) ? cachedInterpreters : deferred.promise;
    });
  }

  addHandlersForInterpreterWatchers(cacheKey, resource) {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.handlersAddedToResource.has(cacheKey)) {
        return;
      }

      this.handlersAddedToResource.add(cacheKey);
      const watchers = yield this.getInterpreterWatchers(resource);
      const disposableRegisry = this.serviceContainer.get(types_2.IDisposableRegistry);
      watchers.forEach(watcher => {
        watcher.onDidCreate(() => {
          logger_1.Logger.verbose(`Interpreter Watcher change handler for ${this.cacheKeyPrefix}`);
          this.promisesPerResource.delete(cacheKey);
          this.getInterpreters(resource).ignoreErrors();
        }, this, disposableRegisry);
      });
    });
  }

  getInterpreterWatchers(_resource) {
    return __awaiter(this, void 0, void 0, function* () {
      return [];
    });
  }

  createPersistenceStore(resource) {
    const cacheKey = this.getCacheKey(resource);
    const persistentFactory = this.serviceContainer.get(types_2.IPersistentStateFactory);

    if (this.cachePerWorkspace) {
      return persistentFactory.createWorkspacePersistentState(cacheKey, undefined);
    } else {
      return persistentFactory.createGlobalPersistentState(cacheKey, undefined);
    }
  }

  getCachedInterpreters(resource) {
    const persistence = this.createPersistenceStore(resource);

    if (!Array.isArray(persistence.value)) {
      return;
    }

    return persistence.value.map(item => {
      return Object.assign({}, item, {
        cachedEntry: true
      });
    });
  }

  cacheInterpreters(interpreters, resource) {
    return __awaiter(this, void 0, void 0, function* () {
      const persistence = this.createPersistenceStore(resource);
      yield persistence.updateValue(interpreters);
    });
  }

  getCacheKey(resource) {
    if (!resource || !this.cachePerWorkspace) {
      return this.cacheKeyPrefix;
    } // Ensure we have separate caches per workspace where necessary.Î


    const workspaceService = this.serviceContainer.get(types_1.IWorkspaceService);

    if (!Array.isArray(workspaceService.workspaceFolders)) {
      return this.cacheKeyPrefix;
    }

    const workspace = workspaceService.getWorkspaceFolder(resource);
    return workspace ? `${this.cacheKeyPrefix}:${md5(workspace.uri.fsPath)}` : this.cacheKeyPrefix;
  }

};
CacheableLocatorService = __decorate([inversify_1.injectable(), __param(0, inversify_1.unmanaged()), __param(1, inversify_1.unmanaged()), __param(2, inversify_1.unmanaged())], CacheableLocatorService);
exports.CacheableLocatorService = CacheableLocatorService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhY2hlYWJsZUxvY2F0b3JTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIl9fZGVjb3JhdGUiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZCIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsIl9fcGFyYW0iLCJwYXJhbUluZGV4IiwiZGVjb3JhdG9yIiwiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsImV4cG9ydHMiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJtZDUiLCJ2c2NvZGVfMSIsInR5cGVzXzEiLCJsb2dnZXJfMSIsInR5cGVzXzIiLCJhc3luY18xIiwiQ2FjaGVhYmxlTG9jYXRvclNlcnZpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJzZXJ2aWNlQ29udGFpbmVyIiwiY2FjaGVQZXJXb3Jrc3BhY2UiLCJwcm9taXNlc1BlclJlc291cmNlIiwiTWFwIiwiaGFuZGxlcnNBZGRlZFRvUmVzb3VyY2UiLCJTZXQiLCJsb2NhdGluZyIsIkV2ZW50RW1pdHRlciIsImNhY2hlS2V5UHJlZml4Iiwib25Mb2NhdGluZyIsImV2ZW50IiwiZ2V0SW50ZXJwcmV0ZXJzIiwicmVzb3VyY2UiLCJjYWNoZUtleSIsImdldENhY2hlS2V5IiwiZGVmZXJyZWQiLCJnZXQiLCJjcmVhdGVEZWZlcnJlZCIsInNldCIsImFkZEhhbmRsZXJzRm9ySW50ZXJwcmV0ZXJXYXRjaGVycyIsImlnbm9yZUVycm9ycyIsImdldEludGVycHJldGVyc0ltcGxlbWVudGF0aW9uIiwiaXRlbXMiLCJjYWNoZUludGVycHJldGVycyIsImNhdGNoIiwiZXgiLCJmaXJlIiwicHJvbWlzZSIsImNvbXBsZXRlZCIsImNhY2hlZEludGVycHJldGVycyIsImdldENhY2hlZEludGVycHJldGVycyIsIkFycmF5IiwiaXNBcnJheSIsImhhcyIsImFkZCIsIndhdGNoZXJzIiwiZ2V0SW50ZXJwcmV0ZXJXYXRjaGVycyIsImRpc3Bvc2FibGVSZWdpc3J5IiwiSURpc3Bvc2FibGVSZWdpc3RyeSIsImZvckVhY2giLCJ3YXRjaGVyIiwib25EaWRDcmVhdGUiLCJMb2dnZXIiLCJ2ZXJib3NlIiwiZGVsZXRlIiwiX3Jlc291cmNlIiwiY3JlYXRlUGVyc2lzdGVuY2VTdG9yZSIsInBlcnNpc3RlbnRGYWN0b3J5IiwiSVBlcnNpc3RlbnRTdGF0ZUZhY3RvcnkiLCJjcmVhdGVXb3Jrc3BhY2VQZXJzaXN0ZW50U3RhdGUiLCJ1bmRlZmluZWQiLCJjcmVhdGVHbG9iYWxQZXJzaXN0ZW50U3RhdGUiLCJwZXJzaXN0ZW5jZSIsIm1hcCIsIml0ZW0iLCJhc3NpZ24iLCJjYWNoZWRFbnRyeSIsImludGVycHJldGVycyIsInVwZGF0ZVZhbHVlIiwid29ya3NwYWNlU2VydmljZSIsIklXb3Jrc3BhY2VTZXJ2aWNlIiwid29ya3NwYWNlRm9sZGVycyIsIndvcmtzcGFjZSIsImdldFdvcmtzcGFjZUZvbGRlciIsInVyaSIsImZzUGF0aCIsImluamVjdGFibGUiLCJ1bm1hbmFnZWQiXSwibWFwcGluZ3MiOiJBQUFBLGEsQ0FDQTtBQUNBOztBQUNBLElBQUlBLFVBQVUsR0FBSSxVQUFRLFNBQUtBLFVBQWQsSUFBNkIsVUFBVUMsVUFBVixFQUFzQkMsTUFBdEIsRUFBOEJDLEdBQTlCLEVBQW1DQyxJQUFuQyxFQUF5QztBQUNuRixNQUFJQyxDQUFDLEdBQUdDLFNBQVMsQ0FBQ0MsTUFBbEI7QUFBQSxNQUEwQkMsQ0FBQyxHQUFHSCxDQUFDLEdBQUcsQ0FBSixHQUFRSCxNQUFSLEdBQWlCRSxJQUFJLEtBQUssSUFBVCxHQUFnQkEsSUFB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dXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19wYXJhbSA9ICh0aGlzICYmIHRoaXMuX19wYXJhbSkgfHwgZnVuY3Rpb24gKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gdHNsaW50OmRpc2FibGU6bm8tYW55XG5jb25zdCBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG5jb25zdCBtZDUgPSByZXF1aXJlKFwibWQ1XCIpO1xuY29uc3QgdnNjb2RlXzEgPSByZXF1aXJlKFwidnNjb2RlXCIpO1xuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jb21tb24vYXBwbGljYXRpb24vdHlwZXNcIik7XG5yZXF1aXJlKFwiLi4vLi4vLi4vY29tbW9uL2V4dGVuc2lvbnNcIik7XG5jb25zdCBsb2dnZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jb21tb24vbG9nZ2VyXCIpO1xuY29uc3QgdHlwZXNfMiA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jb21tb24vdHlwZXNcIik7XG5jb25zdCBhc3luY18xID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbW1vbi91dGlscy9hc3luY1wiKTtcbmxldCBDYWNoZWFibGVMb2NhdG9yU2VydmljZSA9IGNsYXNzIENhY2hlYWJsZUxvY2F0b3JTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBzZXJ2aWNlQ29udGFpbmVyLCBjYWNoZVBlcldvcmtzcGFjZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuc2VydmljZUNvbnRhaW5lciA9IHNlcnZpY2VDb250YWluZXI7XG4gICAgICAgIHRoaXMuY2FjaGVQZXJXb3Jrc3BhY2UgPSBjYWNoZVBlcldvcmtzcGFjZTtcbiAgICAgICAgdGhpcy5wcm9taXNlc1BlclJlc291cmNlID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmhhbmRsZXJzQWRkZWRUb1Jlc291cmNlID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLmxvY2F0aW5nID0gbmV3IHZzY29kZV8xLkV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLmNhY2hlS2V5UHJlZml4ID0gYElOVEVSUFJFVEVSU19DQUNIRV92Ml8ke25hbWV9YDtcbiAgICB9XG4gICAgZ2V0IG9uTG9jYXRpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2F0aW5nLmV2ZW50O1xuICAgIH1cbiAgICBnZXRJbnRlcnByZXRlcnMocmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gdGhpcy5nZXRDYWNoZUtleShyZXNvdXJjZSk7XG4gICAgICAgICAgICBsZXQgZGVmZXJyZWQgPSB0aGlzLnByb21pc2VzUGVyUmVzb3VyY2UuZ2V0KGNhY2hlS2V5KTtcbiAgICAgICAgICAgIGlmICghZGVmZXJyZWQpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZCA9IGFzeW5jXzEuY3JlYXRlRGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb21pc2VzUGVyUmVzb3VyY2Uuc2V0KGNhY2hlS2V5LCBkZWZlcnJlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRIYW5kbGVyc0ZvckludGVycHJldGVyV2F0Y2hlcnMoY2FjaGVLZXksIHJlc291cmNlKVxuICAgICAgICAgICAgICAgICAgICAuaWdub3JlRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJbnRlcnByZXRlcnNJbXBsZW1lbnRhdGlvbihyZXNvdXJjZSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGl0ZW1zKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuY2FjaGVJbnRlcnByZXRlcnMoaXRlbXMsIHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShpdGVtcyk7XG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChleCA9PiBkZWZlcnJlZC5yZWplY3QoZXgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW5nLmZpcmUoZGVmZXJyZWQucHJvbWlzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVmZXJyZWQuY29tcGxldGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYWNoZWRJbnRlcnByZXRlcnMgPSB0aGlzLmdldENhY2hlZEludGVycHJldGVycyhyZXNvdXJjZSk7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShjYWNoZWRJbnRlcnByZXRlcnMpID8gY2FjaGVkSW50ZXJwcmV0ZXJzIDogZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZEhhbmRsZXJzRm9ySW50ZXJwcmV0ZXJXYXRjaGVycyhjYWNoZUtleSwgcmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZXJzQWRkZWRUb1Jlc291cmNlLmhhcyhjYWNoZUtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzQWRkZWRUb1Jlc291cmNlLmFkZChjYWNoZUtleSk7XG4gICAgICAgICAgICBjb25zdCB3YXRjaGVycyA9IHlpZWxkIHRoaXMuZ2V0SW50ZXJwcmV0ZXJXYXRjaGVycyhyZXNvdXJjZSk7XG4gICAgICAgICAgICBjb25zdCBkaXNwb3NhYmxlUmVnaXNyeSA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMi5JRGlzcG9zYWJsZVJlZ2lzdHJ5KTtcbiAgICAgICAgICAgIHdhdGNoZXJzLmZvckVhY2god2F0Y2hlciA9PiB7XG4gICAgICAgICAgICAgICAgd2F0Y2hlci5vbkRpZENyZWF0ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlcl8xLkxvZ2dlci52ZXJib3NlKGBJbnRlcnByZXRlciBXYXRjaGVyIGNoYW5nZSBoYW5kbGVyIGZvciAke3RoaXMuY2FjaGVLZXlQcmVmaXh9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvbWlzZXNQZXJSZXNvdXJjZS5kZWxldGUoY2FjaGVLZXkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEludGVycHJldGVycyhyZXNvdXJjZSkuaWdub3JlRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcywgZGlzcG9zYWJsZVJlZ2lzcnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRJbnRlcnByZXRlcldhdGNoZXJzKF9yZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY3JlYXRlUGVyc2lzdGVuY2VTdG9yZShyZXNvdXJjZSkge1xuICAgICAgICBjb25zdCBjYWNoZUtleSA9IHRoaXMuZ2V0Q2FjaGVLZXkocmVzb3VyY2UpO1xuICAgICAgICBjb25zdCBwZXJzaXN0ZW50RmFjdG9yeSA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMi5JUGVyc2lzdGVudFN0YXRlRmFjdG9yeSk7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlUGVyV29ya3NwYWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcGVyc2lzdGVudEZhY3RvcnkuY3JlYXRlV29ya3NwYWNlUGVyc2lzdGVudFN0YXRlKGNhY2hlS2V5LCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHBlcnNpc3RlbnRGYWN0b3J5LmNyZWF0ZUdsb2JhbFBlcnNpc3RlbnRTdGF0ZShjYWNoZUtleSwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRDYWNoZWRJbnRlcnByZXRlcnMocmVzb3VyY2UpIHtcbiAgICAgICAgY29uc3QgcGVyc2lzdGVuY2UgPSB0aGlzLmNyZWF0ZVBlcnNpc3RlbmNlU3RvcmUocmVzb3VyY2UpO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGVyc2lzdGVuY2UudmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBlcnNpc3RlbmNlLnZhbHVlLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBpdGVtLCB7IGNhY2hlZEVudHJ5OiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2FjaGVJbnRlcnByZXRlcnMoaW50ZXJwcmV0ZXJzLCByZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgcGVyc2lzdGVuY2UgPSB0aGlzLmNyZWF0ZVBlcnNpc3RlbmNlU3RvcmUocmVzb3VyY2UpO1xuICAgICAgICAgICAgeWllbGQgcGVyc2lzdGVuY2UudXBkYXRlVmFsdWUoaW50ZXJwcmV0ZXJzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldENhY2hlS2V5KHJlc291cmNlKSB7XG4gICAgICAgIGlmICghcmVzb3VyY2UgfHwgIXRoaXMuY2FjaGVQZXJXb3Jrc3BhY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlS2V5UHJlZml4O1xuICAgICAgICB9XG4gICAgICAgIC8vIEVuc3VyZSB3ZSBoYXZlIHNlcGFyYXRlIGNhY2hlcyBwZXIgd29ya3NwYWNlIHdoZXJlIG5lY2Vzc2FyeS7DjlxuICAgICAgICBjb25zdCB3b3Jrc3BhY2VTZXJ2aWNlID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18xLklXb3Jrc3BhY2VTZXJ2aWNlKTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHdvcmtzcGFjZVNlcnZpY2Uud29ya3NwYWNlRm9sZGVycykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlS2V5UHJlZml4O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdvcmtzcGFjZSA9IHdvcmtzcGFjZVNlcnZpY2UuZ2V0V29ya3NwYWNlRm9sZGVyKHJlc291cmNlKTtcbiAgICAgICAgcmV0dXJuIHdvcmtzcGFjZSA/IGAke3RoaXMuY2FjaGVLZXlQcmVmaXh9OiR7bWQ1KHdvcmtzcGFjZS51cmkuZnNQYXRoKX1gIDogdGhpcy5jYWNoZUtleVByZWZpeDtcbiAgICB9XG59O1xuQ2FjaGVhYmxlTG9jYXRvclNlcnZpY2UgPSBfX2RlY29yYXRlKFtcbiAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKCksXG4gICAgX19wYXJhbSgwLCBpbnZlcnNpZnlfMS51bm1hbmFnZWQoKSksXG4gICAgX19wYXJhbSgxLCBpbnZlcnNpZnlfMS51bm1hbmFnZWQoKSksXG4gICAgX19wYXJhbSgyLCBpbnZlcnNpZnlfMS51bm1hbmFnZWQoKSlcbl0sIENhY2hlYWJsZUxvY2F0b3JTZXJ2aWNlKTtcbmV4cG9ydHMuQ2FjaGVhYmxlTG9jYXRvclNlcnZpY2UgPSBDYWNoZWFibGVMb2NhdG9yU2VydmljZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNhY2hlYWJsZUxvY2F0b3JTZXJ2aWNlLmpzLm1hcCJdfQ==