"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activate = activate;
exports.dispose = dispose;
exports.createDebuggerProvider = createDebuggerProvider;
exports.getPythonAutoGenConfig = getPythonAutoGenConfig;
exports.NUCLIDE_PYTHON_DEBUGGER_DEX_URI = void 0;

var _UniversalDisposable = _interopRequireDefault(require("@atom-ide-community/nuclide-commons/UniversalDisposable"));

var React = _interopRequireWildcard(require("react"));

var _AutoGenLaunchAttachProvider = require("@atom-ide-community/nuclide-debugger-common/AutoGenLaunchAttachProvider");

var _utils = require("./utils");

var _path = _interopRequireDefault(require("path"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NUCLIDE_PYTHON_DEBUGGER_DEX_URI = 'https://our.intern.facebook.com/intern/dex/python-and-fbcode/debugging/#nuclide';
exports.NUCLIDE_PYTHON_DEBUGGER_DEX_URI = NUCLIDE_PYTHON_DEBUGGER_DEX_URI;

_subscriptions: _UniversalDisposable.default;

function activate() {
  _subscriptions = new _UniversalDisposable.default((0, _utils.listenToRemoteDebugCommands)());
}

function dispose() {
  _subscriptions.dispose();
}

function createDebuggerProvider() {
  return {
    type: "python",
    getLaunchAttachProvider: connection => {
      return new _AutoGenLaunchAttachProvider.AutoGenLaunchAttachProvider("Python", connection, getPythonAutoGenConfig());
    }
  };
} // TODO this service does not exist
// export function consumeRpcService(rpcService: nuclide$RpcService): IDisposable {
//   return setRpcService(rpcService);
// }


function getPythonAutoGenConfig() {
  const program = {
    name: 'program',
    type: 'path',
    description: 'Absolute path to the program.',
    required: true,
    visible: true
  };
  const pythonPath = {
    name: 'pythonPath',
    type: 'path',
    description: 'Path to python executable.',
    required: true,
    visible: true
  };
  const cwd = {
    name: 'cwd',
    type: 'path',
    description: '(Optional) Absolute path to the working directory of the program being debugged. Default is the root directory of the file.',
    required: true,
    visible: true
  };
  const args = {
    name: 'args',
    type: 'array',
    itemType: 'string',
    description: 'Command line arguments passed to the program',
    defaultValue: [],
    required: false,
    visible: true
  };
  const stopOnEntry = {
    name: 'stopOnEntry',
    type: 'boolean',
    description: 'Automatically stop after launch.',
    defaultValue: false,
    required: false,
    visible: true
  };
  const debugOptions = {
    name: 'debugOptions',
    type: 'array',
    itemType: 'string',
    description: 'Advanced options, view read me for further details.',
    defaultValue: ['WaitOnAbnormalExit', 'WaitOnNormalExit', 'RedirectOutput'],
    required: false,
    visible: false
  };
  const env = {
    name: 'env',
    type: 'object',
    description: '(Optional) Environment variables (e.g. SHELL=/bin/bash PATH=/bin)',
    defaultValue: {},
    required: false,
    visible: true
  };
  const consoleEnum = {
    name: 'console',
    type: 'enum',
    enums: ['internalConsole', 'integratedTerminal'],
    description: '',
    defaultValue: 'internalConsole',
    required: true,
    visible: true
  };
  const adapterExecutable = {
    command: "node",
    args: [_path.default.resolve(_path.default.join(__dirname, "VendorLib/vs-py-debugger/out/client/debugger/debugAdapter/main.js"))]
  };

  const adapterRoot = _path.default.resolve(_path.default.join(__dirname, "VendorLib/vs-py-debugger"));

  return {
    launch: {
      launch: true,
      vsAdapterType: "python",
      adapterExecutable,
      adapterRoot,
      properties: [program, pythonPath, cwd, args, stopOnEntry, debugOptions, env, consoleEnum],
      scriptPropertyName: 'program',
      scriptExtension: '.py',
      cwdPropertyName: 'cwd',
      header: isNuclideEnvironment() ? /*#__PURE__*/React.createElement("p", null, "This is intended to debug python script files.", /*#__PURE__*/React.createElement("br", null), "To debug buck targets, you should", ' ', /*#__PURE__*/React.createElement("a", {
        href: NUCLIDE_PYTHON_DEBUGGER_DEX_URI
      }, "use the buck toolbar instead"), ".") : null,

      getProcessName(values) {
        let processName = values.program;
        const lastSlash = processName.lastIndexOf('/');

        if (lastSlash >= 0) {
          processName = processName.substring(lastSlash + 1, processName.length);
        }

        processName += ' (Python)';
        return processName;
      }

    },
    attach: null
  };
}

function isNuclideEnvironment() {
  return atom.packages.isPackageLoaded('nuclide');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiTlVDTElERV9QWVRIT05fREVCVUdHRVJfREVYX1VSSSIsIl9zdWJzY3JpcHRpb25zIiwiVW5pdmVyc2FsRGlzcG9zYWJsZSIsImFjdGl2YXRlIiwiZGlzcG9zZSIsImNyZWF0ZURlYnVnZ2VyUHJvdmlkZXIiLCJ0eXBlIiwiZ2V0TGF1bmNoQXR0YWNoUHJvdmlkZXIiLCJjb25uZWN0aW9uIiwiQXV0b0dlbkxhdW5jaEF0dGFjaFByb3ZpZGVyIiwiZ2V0UHl0aG9uQXV0b0dlbkNvbmZpZyIsInByb2dyYW0iLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJyZXF1aXJlZCIsInZpc2libGUiLCJweXRob25QYXRoIiwiY3dkIiwiYXJncyIsIml0ZW1UeXBlIiwiZGVmYXVsdFZhbHVlIiwic3RvcE9uRW50cnkiLCJkZWJ1Z09wdGlvbnMiLCJlbnYiLCJjb25zb2xlRW51bSIsImVudW1zIiwiYWRhcHRlckV4ZWN1dGFibGUiLCJjb21tYW5kIiwicGF0aCIsInJlc29sdmUiLCJqb2luIiwiX19kaXJuYW1lIiwiYWRhcHRlclJvb3QiLCJsYXVuY2giLCJ2c0FkYXB0ZXJUeXBlIiwicHJvcGVydGllcyIsInNjcmlwdFByb3BlcnR5TmFtZSIsInNjcmlwdEV4dGVuc2lvbiIsImN3ZFByb3BlcnR5TmFtZSIsImhlYWRlciIsImlzTnVjbGlkZUVudmlyb25tZW50IiwiZ2V0UHJvY2Vzc05hbWUiLCJ2YWx1ZXMiLCJwcm9jZXNzTmFtZSIsImxhc3RTbGFzaCIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwiYXR0YWNoIiwiYXRvbSIsInBhY2thZ2VzIiwiaXNQYWNrYWdlTG9hZGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUtBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVPLE1BQU1BLCtCQUErQixHQUMxQyxpRkFESzs7O0FBSVBDLGNBQWMsRUFBRUM7O0FBQ1QsU0FBU0MsUUFBVCxHQUFvQjtBQUN6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QixPQUF6QjtBQUNBLGNBQU1pQyxTQUFTLEdBQUdELFdBQVcsQ0FBQ0UsV0FBWixDQUF3QixHQUF4QixDQUFsQjs7QUFDQSxZQUFJRCxTQUFTLElBQUksQ0FBakIsRUFBb0I7QUFDbEJELFVBQUFBLFdBQVcsR0FBR0EsV0FBVyxDQUFDRyxTQUFaLENBQ1pGLFNBQVMsR0FBRyxDQURBLEVBRVpELFdBQVcsQ0FBQ0ksTUFGQSxDQUFkO0FBSUQ7O0FBQ0RKLFFBQUFBLFdBQVcsSUFBSSxXQUFmO0FBQ0EsZUFBT0EsV0FBUDtBQUNEOztBQXZDSyxLQURIO0FBMENMSyxJQUFBQSxNQUFNLEVBQUU7QUExQ0gsR0FBUDtBQTRDRDs7QUFFRCxTQUFTUixvQkFBVCxHQUF5QztBQUN2QyxTQUFPUyxJQUFJLENBQUNDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixTQUE5QixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7XHJcbiAgQXV0b0dlbkNvbmZpZyxcclxuICBOdWNsaWRlRGVidWdnZXJQcm92aWRlcixcclxufSBmcm9tICdAYXRvbS1pZGUtY29tbXVuaXR5L251Y2xpZGUtZGVidWdnZXItY29tbW9uL3R5cGVzJztcclxuXHJcbmltcG9ydCBVbml2ZXJzYWxEaXNwb3NhYmxlIGZyb20gJ0BhdG9tLWlkZS1jb21tdW5pdHkvbnVjbGlkZS1jb21tb25zL1VuaXZlcnNhbERpc3Bvc2FibGUnO1xyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7QXV0b0dlbkxhdW5jaEF0dGFjaFByb3ZpZGVyfSBmcm9tICdAYXRvbS1pZGUtY29tbXVuaXR5L251Y2xpZGUtZGVidWdnZXItY29tbW9uL0F1dG9HZW5MYXVuY2hBdHRhY2hQcm92aWRlcic7XHJcbmltcG9ydCB7bGlzdGVuVG9SZW1vdGVEZWJ1Z0NvbW1hbmRzLCBzZXRScGNTZXJ2aWNlfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5leHBvcnQgY29uc3QgTlVDTElERV9QWVRIT05fREVCVUdHRVJfREVYX1VSSSA9XHJcbiAgJ2h0dHBzOi8vb3VyLmludGVybi5mYWNlYm9vay5jb20vaW50ZXJuL2RleC9weXRob24tYW5kLWZiY29kZS9kZWJ1Z2dpbmcvI251Y2xpZGUnO1xyXG5cclxuXHJcbl9zdWJzY3JpcHRpb25zOiBVbml2ZXJzYWxEaXNwb3NhYmxlXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcclxuICBfc3Vic2NyaXB0aW9ucyA9IG5ldyBVbml2ZXJzYWxEaXNwb3NhYmxlKFxyXG4gICAgbGlzdGVuVG9SZW1vdGVEZWJ1Z0NvbW1hbmRzKCksXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XHJcbiAgX3N1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGVidWdnZXJQcm92aWRlcigpOiBOdWNsaWRlRGVidWdnZXJQcm92aWRlciB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFwicHl0aG9uXCIsXHJcbiAgICBnZXRMYXVuY2hBdHRhY2hQcm92aWRlcjogY29ubmVjdGlvbiA9PiB7XHJcbiAgICAgIHJldHVybiBuZXcgQXV0b0dlbkxhdW5jaEF0dGFjaFByb3ZpZGVyKFxyXG4gICAgICAgIFwiUHl0aG9uXCIsXHJcbiAgICAgICAgY29ubmVjdGlvbixcclxuICAgICAgICBnZXRQeXRob25BdXRvR2VuQ29uZmlnKCksXHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuXHJcbi8vIFRPRE8gdGhpcyBzZXJ2aWNlIGRvZXMgbm90IGV4aXN0XHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBjb25zdW1lUnBjU2VydmljZShycGNTZXJ2aWNlOiBudWNsaWRlJFJwY1NlcnZpY2UpOiBJRGlzcG9zYWJsZSB7XHJcbi8vICAgcmV0dXJuIHNldFJwY1NlcnZpY2UocnBjU2VydmljZSk7XHJcbi8vIH1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQeXRob25BdXRvR2VuQ29uZmlnKCk6IEF1dG9HZW5Db25maWcge1xyXG4gIGNvbnN0IHByb2dyYW0gPSB7XHJcbiAgICBuYW1lOiAncHJvZ3JhbScsXHJcbiAgICB0eXBlOiAncGF0aCcsXHJcbiAgICBkZXNjcmlwdGlvbjogJ0Fic29sdXRlIHBhdGggdG8gdGhlIHByb2dyYW0uJyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgdmlzaWJsZTogdHJ1ZSxcclxuICB9O1xyXG4gIGNvbnN0IHB5dGhvblBhdGggPSB7XHJcbiAgICBuYW1lOiAncHl0aG9uUGF0aCcsXHJcbiAgICB0eXBlOiAncGF0aCcsXHJcbiAgICBkZXNjcmlwdGlvbjogJ1BhdGggdG8gcHl0aG9uIGV4ZWN1dGFibGUuJyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgdmlzaWJsZTogdHJ1ZSxcclxuICB9O1xyXG4gIGNvbnN0IGN3ZCA9IHtcclxuICAgIG5hbWU6ICdjd2QnLFxyXG4gICAgdHlwZTogJ3BhdGgnLFxyXG4gICAgZGVzY3JpcHRpb246XHJcbiAgICAgICcoT3B0aW9uYWwpIEFic29sdXRlIHBhdGggdG8gdGhlIHdvcmtpbmcgZGlyZWN0b3J5IG9mIHRoZSBwcm9ncmFtIGJlaW5nIGRlYnVnZ2VkLiBEZWZhdWx0IGlzIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGUgZmlsZS4nLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB2aXNpYmxlOiB0cnVlLFxyXG4gIH07XHJcbiAgY29uc3QgYXJncyA9IHtcclxuICAgIG5hbWU6ICdhcmdzJyxcclxuICAgIHR5cGU6ICdhcnJheScsXHJcbiAgICBpdGVtVHlwZTogJ3N0cmluZycsXHJcbiAgICBkZXNjcmlwdGlvbjogJ0NvbW1hbmQgbGluZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBwcm9ncmFtJyxcclxuICAgIGRlZmF1bHRWYWx1ZTogW10sXHJcbiAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICB2aXNpYmxlOiB0cnVlLFxyXG4gIH07XHJcbiAgY29uc3Qgc3RvcE9uRW50cnkgPSB7XHJcbiAgICBuYW1lOiAnc3RvcE9uRW50cnknLFxyXG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgZGVzY3JpcHRpb246ICdBdXRvbWF0aWNhbGx5IHN0b3AgYWZ0ZXIgbGF1bmNoLicsXHJcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxyXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgdmlzaWJsZTogdHJ1ZSxcclxuICB9O1xyXG4gIGNvbnN0IGRlYnVnT3B0aW9ucyA9IHtcclxuICAgIG5hbWU6ICdkZWJ1Z09wdGlvbnMnLFxyXG4gICAgdHlwZTogJ2FycmF5JyxcclxuICAgIGl0ZW1UeXBlOiAnc3RyaW5nJyxcclxuICAgIGRlc2NyaXB0aW9uOiAnQWR2YW5jZWQgb3B0aW9ucywgdmlldyByZWFkIG1lIGZvciBmdXJ0aGVyIGRldGFpbHMuJyxcclxuICAgIGRlZmF1bHRWYWx1ZTogWydXYWl0T25BYm5vcm1hbEV4aXQnLCAnV2FpdE9uTm9ybWFsRXhpdCcsICdSZWRpcmVjdE91dHB1dCddLFxyXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgfTtcclxuICBjb25zdCBlbnYgPSB7XHJcbiAgICBuYW1lOiAnZW52JyxcclxuICAgIHR5cGU6ICdvYmplY3QnLFxyXG4gICAgZGVzY3JpcHRpb246XHJcbiAgICAgICcoT3B0aW9uYWwpIEVudmlyb25tZW50IHZhcmlhYmxlcyAoZS5nLiBTSEVMTD0vYmluL2Jhc2ggUEFUSD0vYmluKScsXHJcbiAgICBkZWZhdWx0VmFsdWU6IHt9LFxyXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgdmlzaWJsZTogdHJ1ZSxcclxuICB9O1xyXG4gIGNvbnN0IGNvbnNvbGVFbnVtID0ge1xyXG4gICAgbmFtZTogJ2NvbnNvbGUnLFxyXG4gICAgdHlwZTogJ2VudW0nLFxyXG4gICAgZW51bXM6IFsnaW50ZXJuYWxDb25zb2xlJywgJ2ludGVncmF0ZWRUZXJtaW5hbCddLFxyXG4gICAgZGVzY3JpcHRpb246ICcnLFxyXG4gICAgZGVmYXVsdFZhbHVlOiAnaW50ZXJuYWxDb25zb2xlJyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgdmlzaWJsZTogdHJ1ZSxcclxuICB9O1xyXG5cclxuICBjb25zdCBhZGFwdGVyRXhlY3V0YWJsZSA9IHtcclxuICAgIGNvbW1hbmQ6IFwibm9kZVwiLFxyXG4gICAgYXJnczogW3BhdGgucmVzb2x2ZShwYXRoLmpvaW4oX19kaXJuYW1lLCBcIlZlbmRvckxpYi92cy1weS1kZWJ1Z2dlci9vdXQvY2xpZW50L2RlYnVnZ2VyL2RlYnVnQWRhcHRlci9tYWluLmpzXCIpKV0sXHJcbiAgfVxyXG4gIGNvbnN0IGFkYXB0ZXJSb290ID0gcGF0aC5yZXNvbHZlKHBhdGguam9pbihfX2Rpcm5hbWUsIFwiVmVuZG9yTGliL3ZzLXB5LWRlYnVnZ2VyXCIpKVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbGF1bmNoOiB7XHJcbiAgICAgIGxhdW5jaDogdHJ1ZSxcclxuICAgICAgdnNBZGFwdGVyVHlwZTogXCJweXRob25cIixcclxuICAgICAgYWRhcHRlckV4ZWN1dGFibGUsXHJcbiAgICAgIGFkYXB0ZXJSb290LFxyXG4gICAgICBwcm9wZXJ0aWVzOiBbXHJcbiAgICAgICAgcHJvZ3JhbSxcclxuICAgICAgICBweXRob25QYXRoLFxyXG4gICAgICAgIGN3ZCxcclxuICAgICAgICBhcmdzLFxyXG4gICAgICAgIHN0b3BPbkVudHJ5LFxyXG4gICAgICAgIGRlYnVnT3B0aW9ucyxcclxuICAgICAgICBlbnYsXHJcbiAgICAgICAgY29uc29sZUVudW0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHNjcmlwdFByb3BlcnR5TmFtZTogJ3Byb2dyYW0nLFxyXG4gICAgICBzY3JpcHRFeHRlbnNpb246ICcucHknLFxyXG4gICAgICBjd2RQcm9wZXJ0eU5hbWU6ICdjd2QnLFxyXG4gICAgICBoZWFkZXI6IGlzTnVjbGlkZUVudmlyb25tZW50KCkgPyAoXHJcbiAgICAgICAgPHA+XHJcbiAgICAgICAgICBUaGlzIGlzIGludGVuZGVkIHRvIGRlYnVnIHB5dGhvbiBzY3JpcHQgZmlsZXMuXHJcbiAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgIFRvIGRlYnVnIGJ1Y2sgdGFyZ2V0cywgeW91IHNob3VsZHsnICd9XHJcbiAgICAgICAgICA8YSBocmVmPXtOVUNMSURFX1BZVEhPTl9ERUJVR0dFUl9ERVhfVVJJfT5cclxuICAgICAgICAgICAgdXNlIHRoZSBidWNrIHRvb2xiYXIgaW5zdGVhZFxyXG4gICAgICAgICAgPC9hPi5cclxuICAgICAgICA8L3A+XHJcbiAgICAgICkgOiBudWxsLFxyXG4gICAgICBnZXRQcm9jZXNzTmFtZSh2YWx1ZXMpIHtcclxuICAgICAgICBsZXQgcHJvY2Vzc05hbWUgPSB2YWx1ZXMucHJvZ3JhbTtcclxuICAgICAgICBjb25zdCBsYXN0U2xhc2ggPSBwcm9jZXNzTmFtZS5sYXN0SW5kZXhPZignLycpO1xyXG4gICAgICAgIGlmIChsYXN0U2xhc2ggPj0gMCkge1xyXG4gICAgICAgICAgcHJvY2Vzc05hbWUgPSBwcm9jZXNzTmFtZS5zdWJzdHJpbmcoXHJcbiAgICAgICAgICAgIGxhc3RTbGFzaCArIDEsXHJcbiAgICAgICAgICAgIHByb2Nlc3NOYW1lLmxlbmd0aCxcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb2Nlc3NOYW1lICs9ICcgKFB5dGhvbiknO1xyXG4gICAgICAgIHJldHVybiBwcm9jZXNzTmFtZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBhdHRhY2g6IG51bGwsXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNOdWNsaWRlRW52aXJvbm1lbnQoKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlTG9hZGVkKCdudWNsaWRlJyk7XHJcbn1cclxuIl19