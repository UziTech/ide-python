"use strict";

var _main = require("./debugger/main");

const cp = require("child_process");

const {
  shell
} = require("electron");

const {
  AutoLanguageClient
} = require("atom-languageclient");

const {
  detectVirtualEnv,
  detectPipEnv,
  replacePipEnvPathVar,
  sanitizeConfig
} = require("./utils");

// Ref: https://github.com/nteract/hydrogen/blob/master/lib/autocomplete-provider.js#L33
// adapted from http://stackoverflow.com/q/5474008
const PYTHON_REGEX = /(([^\d\W]|[\u00A0-\uFFFF])[\w.\u00A0-\uFFFF]*)|\.$/;

class PythonLanguageClient extends AutoLanguageClient {
  getGrammarScopes() {
    return ["source.python", "python"];
  }

  getLanguageName() {
    return "Python";
  }

  getServerName() {
    return "pyls";
  }

  getRootConfigurationKey() {
    return "ide-python";
  }

  activate() {
    // Remove deprecated option
    atom.config.unset("ide-python.pylsPath");
    super.activate();
    (0, _main.activate)();
  }

  mapConfigurationObject(configuration) {
    return {
      pyls: {
        configurationSources: configuration.pylsConfigurationSources,
        rope: sanitizeConfig(configuration.rope),
        plugins: configuration.pylsPlugins
      }
    };
  }

  async startServerProcess(projectPath) {
    const venvPath = (await detectPipEnv(projectPath)) || (await detectVirtualEnv(projectPath));
    const pylsEnvironment = Object.assign({}, process.env);

    if (venvPath) {
      pylsEnvironment["VIRTUAL_ENV"] = venvPath;
    }

    const python = replacePipEnvPathVar(atom.config.get("ide-python.python"), venvPath);
    const childProcess = cp.spawn(python, ["-m", "pyls"], {
      cwd: projectPath,
      env: pylsEnvironment
    });
    childProcess.on("error", err => {
      const description = err.code == "ENOENT" ? `No Python interpreter found at \`${python}\`.` : `Could not spawn the Python interpreter \`${python}\`.`;
      atom.notifications.addError("`ide-python` could not launch your Python runtime.", {
        dismissable: true,
        description: `${description}<p>If you have Python installed please set "Python Executable" setting correctly. If you do not please install Python.</p>`
      });
    });
    childProcess.on("close", (code, signal) => {
      if (code !== 0 && signal == null) {
        atom.notifications.addError("Unable to start the Python language server.", {
          dismissable: true,
          buttons: [{
            text: "Install Instructions",
            onDidClick: () => atom.workspace.open("atom://config/packages/ide-python")
          }, {
            text: "Download Python",
            onDidClick: () => shell.openExternal("https://www.python.org/downloads/")
          }],
          description: "Make sure to install `pyls` 0.19 or newer by running:\n" + "```\n" + `${python} -m pip install 'python-language-server[all]'\n` + "```"
        });
      }
    });
    return childProcess;
  }

  async getSuggestions(request) {
    if (!PYTHON_REGEX.test(request.prefix)) return null;
    return super.getSuggestions(request);
  }

  deactivate() {
    (0, _main.dispose)();
    return Promise.race([super.deactivate(), this.createTimeoutPromise(2000)]);
  }

  createTimeoutPromise(milliseconds) {
    return new Promise((resolve, reject) => {
      let timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.logger.error(`Server failed to shutdown in ${milliseconds}ms, forcing termination`);
        resolve();
      }, milliseconds);
    });
  }

}

const pythonClient = new PythonLanguageClient();
pythonClient.createDebuggerProvider = _main.createDebuggerProvider; // add the debugger

module.exports = pythonClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY3AiLCJyZXF1aXJlIiwic2hlbGwiLCJBdXRvTGFuZ3VhZ2VDbGllbnQiLCJkZXRlY3RWaXJ0dWFsRW52IiwiZGV0ZWN0UGlwRW52IiwicmVwbGFjZVBpcEVudlBhdGhWYXIiLCJzYW5pdGl6ZUNvbmZpZyIsIlBZVEhPTl9SRUdFWCIsIlB5dGhvbkxhbmd1YWdlQ2xpZW50IiwiZ2V0R3JhbW1hclNjb3BlcyIsImdldExhbmd1YWdlTmFtZSIsImdldFNlcnZlck5hbWUiLCJnZXRSb290Q29uZmlndXJhdGlvbktleSIsImFjdGl2YXRlIiwiYXRvbSIsImNvbmZpZyIsInVuc2V0IiwibWFwQ29uZmlndXJhdGlvbk9iamVjdCIsImNvbmZpZ3VyYXRpb24iLCJweWxzIiwiY29uZmlndXJhdGlvblNvdXJjZXMiLCJweWxzQ29uZmlndXJhdGlvblNvdXJjZXMiLCJyb3BlIiwicGx1Z2lucyIsInB5bHNQbHVnaW5zIiwic3RhcnRTZXJ2ZXJQcm9jZXNzIiwicHJvamVjdFBhdGgiLCJ2ZW52UGF0aCIsInB5bHNFbnZpcm9ubWVudCIsIk9iamVjdCIsImFzc2lnbiIsInByb2Nlc3MiLCJlbnYiLCJweXRob24iLCJnZXQiLCJjaGlsZFByb2Nlc3MiLCJzcGF3biIsImN3ZCIsIm9uIiwiZXJyIiwiZGVzY3JpcHRpb24iLCJjb2RlIiwibm90aWZpY2F0aW9ucyIsImFkZEVycm9yIiwiZGlzbWlzc2FibGUiLCJzaWduYWwiLCJidXR0b25zIiwidGV4dCIsIm9uRGlkQ2xpY2siLCJ3b3Jrc3BhY2UiLCJvcGVuIiwib3BlbkV4dGVybmFsIiwiZ2V0U3VnZ2VzdGlvbnMiLCJyZXF1ZXN0IiwidGVzdCIsInByZWZpeCIsImRlYWN0aXZhdGUiLCJQcm9taXNlIiwicmFjZSIsImNyZWF0ZVRpbWVvdXRQcm9taXNlIiwibWlsbGlzZWNvbmRzIiwicmVzb2x2ZSIsInJlamVjdCIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwibG9nZ2VyIiwiZXJyb3IiLCJweXRob25DbGllbnQiLCJjcmVhdGVEZWJ1Z2dlclByb3ZpZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFVQTs7QUFWQSxNQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxlQUFELENBQWxCOztBQUNBLE1BQU07QUFBRUMsRUFBQUE7QUFBRixJQUFZRCxPQUFPLENBQUMsVUFBRCxDQUF6Qjs7QUFDQSxNQUFNO0FBQUVFLEVBQUFBO0FBQUYsSUFBeUJGLE9BQU8sQ0FBQyxxQkFBRCxDQUF0Qzs7QUFDQSxNQUFNO0FBQ0pHLEVBQUFBLGdCQURJO0FBRUpDLEVBQUFBLFlBRkk7QUFHSkMsRUFBQUEsb0JBSEk7QUFJSkMsRUFBQUE7QUFKSSxJQUtGTixPQUFPLENBQUMsU0FBRCxDQUxYOztBQVNBO0FBQ0E7QUFDQSxNQUFNTyxZQUFZLEdBQUcsb0RBQXJCOztBQUVBLE1BQU1DLG9CQUFOLFNBQW1DTixrQkFBbkMsQ0FBc0Q7QUFDcERPLEVBQUFBLGdCQUFnQixHQUFHO0FBQ2pCLFdBQU8sQ0FBQyxlQUFELEVBQWtCLFFBQWxCLENBQVA7QUFDRDs7QUFFREMsRUFBQUEsZUFBZSxHQUFHO0FBQ2hCLFdBQU8sUUFBUDtBQUNEOztBQUVEQyxFQUFBQSxhQUFhLEdBQUc7QUFDZCxXQUFPLE1BQVA7QUFDRDs7QUFFREMsRUFBQUEsdUJBQXVCLEdBQUc7QUFDeEIsV0FBTyxZQUFQO0FBQ0Q7O0FBRURDLEVBQUFBLFFBQVEsR0FBRztBQUNUO0FBQ0FDLElBQUFBLElBQUksQ0FBQ0MsTUFBTCxDQUFZQyxLQUFaLENBQWtCLHFCQUFsQjtBQUNBLFVBQU1ILFFBQU47QUFDQTtBQUNEOztBQUVESSxFQUFBQSxzQkFBc0IsQ0FBQ0MsYUFBRCxFQUFnQjtBQUNwQyxXQUFPO0FBQ0xDLE1BQUFBLElBQUksRUFBRTtBQUNKQyxRQUFBQSxvQkFBb0IsRUFBRUYsYUFBYSxDQUFDRyx3QkFEaEM7QUFFSkMsUUFBQUEsSUFBSSxFQUFFaEIsY0FBYyxDQUFDWSxhQUFhLENBQUNJ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WUFBRCxFQUFlO0FBQ2pDLFdBQU8sSUFBSUgsT0FBSixDQUFZLENBQUNJLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUN0QyxVQUFJQyxPQUFPLEdBQUdDLFVBQVUsQ0FBQyxNQUFNO0FBQzdCQyxRQUFBQSxZQUFZLENBQUNGLE9BQUQsQ0FBWjtBQUNBLGFBQUtHLE1BQUwsQ0FBWUMsS0FBWixDQUNHLGdDQUErQlAsWUFBYSx5QkFEL0M7QUFHQUMsUUFBQUEsT0FBTztBQUNSLE9BTnVCLEVBTXJCRCxZQU5xQixDQUF4QjtBQU9ELEtBUk0sQ0FBUDtBQVNEOztBQWxIbUQ7O0FBcUh0RCxNQUFNUSxZQUFZLEdBQUcsSUFBSTVELG9CQUFKLEVBQXJCO0FBQ0E0RCxZQUFZLENBQUNDLHNCQUFiLEdBQXNDQSw0QkFBdEMsQyxDQUE4RDs7QUFDOURDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkgsWUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjcCA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuY29uc3QgeyBzaGVsbCB9ID0gcmVxdWlyZShcImVsZWN0cm9uXCIpO1xuY29uc3QgeyBBdXRvTGFuZ3VhZ2VDbGllbnQgfSA9IHJlcXVpcmUoXCJhdG9tLWxhbmd1YWdlY2xpZW50XCIpO1xuY29uc3Qge1xuICBkZXRlY3RWaXJ0dWFsRW52LFxuICBkZXRlY3RQaXBFbnYsXG4gIHJlcGxhY2VQaXBFbnZQYXRoVmFyLFxuICBzYW5pdGl6ZUNvbmZpZ1xufSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuXG5pbXBvcnQgeyBjcmVhdGVEZWJ1Z2dlclByb3ZpZGVyLCBhY3RpdmF0ZSBhcyBkZWJ1Z2dlckFjdGl2YXRlLCBkaXNwb3NlIGFzIGRlYnVnZ2VyRGlzcG9zZSB9IGZyb20gXCIuL2RlYnVnZ2VyL21haW5cIlxuXG4vLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9udGVyYWN0L2h5ZHJvZ2VuL2Jsb2IvbWFzdGVyL2xpYi9hdXRvY29tcGxldGUtcHJvdmlkZXIuanMjTDMzXG4vLyBhZGFwdGVkIGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3EvNTQ3NDAwOFxuY29uc3QgUFlUSE9OX1JFR0VYID0gLygoW15cXGRcXFddfFtcXHUwMEEwLVxcdUZGRkZdKVtcXHcuXFx1MDBBMC1cXHVGRkZGXSopfFxcLiQvO1xuXG5jbGFzcyBQeXRob25MYW5ndWFnZUNsaWVudCBleHRlbmRzIEF1dG9MYW5ndWFnZUNsaWVudCB7XG4gIGdldEdyYW1tYXJTY29wZXMoKSB7XG4gICAgcmV0dXJuIFtcInNvdXJjZS5weXRob25cIiwgXCJweXRob25cIl07XG4gIH1cblxuICBnZXRMYW5ndWFnZU5hbWUoKSB7XG4gICAgcmV0dXJuIFwiUHl0aG9uXCI7XG4gIH1cblxuICBnZXRTZXJ2ZXJOYW1lKCkge1xuICAgIHJldHVybiBcInB5bHNcIjtcbiAgfVxuXG4gIGdldFJvb3RDb25maWd1cmF0aW9uS2V5KCkge1xuICAgIHJldHVybiBcImlkZS1weXRob25cIjtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIC8vIFJlbW92ZSBkZXByZWNhdGVkIG9wdGlvblxuICAgIGF0b20uY29uZmlnLnVuc2V0KFwiaWRlLXB5dGhvbi5weWxzUGF0aFwiKTtcbiAgICBzdXBlci5hY3RpdmF0ZSgpO1xuICAgIGRlYnVnZ2VyQWN0aXZhdGUoKTtcbiAgfVxuXG4gIG1hcENvbmZpZ3VyYXRpb25PYmplY3QoY29uZmlndXJhdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICBweWxzOiB7XG4gICAgICAgIGNvbmZpZ3VyYXRpb25Tb3VyY2VzOiBjb25maWd1cmF0aW9uLnB5bHNDb25maWd1cmF0aW9uU291cmNlcyxcbiAgICAgICAgcm9wZTogc2FuaXRpemVDb25maWcoY29uZmlndXJhdGlvbi5yb3BlKSxcbiAgICAgICAgcGx1Z2luczogY29uZmlndXJhdGlvbi5weWxzUGx1Z2luc1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBhc3luYyBzdGFydFNlcnZlclByb2Nlc3MocHJvamVjdFBhdGgpIHtcbiAgICBjb25zdCB2ZW52UGF0aCA9XG4gICAgICAoYXdhaXQgZGV0ZWN0UGlwRW52KHByb2plY3RQYXRoKSkgfHxcbiAgICAgIChhd2FpdCBkZXRlY3RWaXJ0dWFsRW52KHByb2plY3RQYXRoKSk7XG4gICAgY29uc3QgcHlsc0Vudmlyb25tZW50ID0gT2JqZWN0LmFzc2lnbih7fSwgcHJvY2Vzcy5lbnYpO1xuICAgIGlmICh2ZW52UGF0aCkge1xuICAgICAgcHlsc0Vudmlyb25tZW50W1wiVklSVFVBTF9FTlZcIl0gPSB2ZW52UGF0aDtcbiAgICB9XG4gICAgY29uc3QgcHl0aG9uID0gcmVwbGFjZVBpcEVudlBhdGhWYXIoXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoXCJpZGUtcHl0aG9uLnB5dGhvblwiKSxcbiAgICAgIHZlbnZQYXRoXG4gICAgKTtcbiAgICBjb25zdCBjaGlsZFByb2Nlc3MgPSBjcC5zcGF3bihweXRob24sIFtcIi1tXCIsIFwicHlsc1wiXSwge1xuICAgICAgY3dkOiBwcm9qZWN0UGF0aCxcbiAgICAgIGVudjogcHlsc0Vudmlyb25tZW50XG4gICAgfSk7XG4gICAgY2hpbGRQcm9jZXNzLm9uKFwiZXJyb3JcIiwgZXJyID0+IHtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID1cbiAgICAgICAgZXJyLmNvZGUgPT0gXCJFTk9FTlRcIlxuICAgICAgICAgID8gYE5vIFB5dGhvbiBpbnRlcnByZXRlciBmb3VuZCBhdCBcXGAke3B5dGhvbn1cXGAuYFxuICAgICAgICAgIDogYENvdWxkIG5vdCBzcGF3biB0aGUgUHl0aG9uIGludGVycHJldGVyIFxcYCR7cHl0aG9ufVxcYC5gO1xuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKFxuICAgICAgICBcImBpZGUtcHl0aG9uYCBjb3VsZCBub3QgbGF1bmNoIHlvdXIgUHl0aG9uIHJ1bnRpbWUuXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBkaXNtaXNzYWJsZTogdHJ1ZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYCR7ZGVzY3JpcHRpb259PHA+SWYgeW91IGhhdmUgUHl0aG9uIGluc3RhbGxlZCBwbGVhc2Ugc2V0IFwiUHl0aG9uIEV4ZWN1dGFibGVcIiBzZXR0aW5nIGNvcnJlY3RseS4gSWYgeW91IGRvIG5vdCBwbGVhc2UgaW5zdGFsbCBQeXRob24uPC9wPmBcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGNoaWxkUHJvY2Vzcy5vbihcImNsb3NlXCIsIChjb2RlLCBzaWduYWwpID0+IHtcbiAgICAgIGlmIChjb2RlICE9PSAwICYmIHNpZ25hbCA9PSBudWxsKSB7XG4gICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihcbiAgICAgICAgICBcIlVuYWJsZSB0byBzdGFydCB0aGUgUHl0aG9uIGxhbmd1YWdlIHNlcnZlci5cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkaXNtaXNzYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiSW5zdGFsbCBJbnN0cnVjdGlvbnNcIixcbiAgICAgICAgICAgICAgICBvbkRpZENsaWNrOiAoKSA9PlxuICAgICAgICAgICAgICAgICAgYXRvbS53b3Jrc3BhY2Uub3BlbihcImF0b206Ly9jb25maWcvcGFja2FnZXMvaWRlLXB5dGhvblwiKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJEb3dubG9hZCBQeXRob25cIixcbiAgICAgICAgICAgICAgICBvbkRpZENsaWNrOiAoKSA9PlxuICAgICAgICAgICAgICAgICAgc2hlbGwub3BlbkV4dGVybmFsKFwiaHR0cHM6Ly93d3cucHl0aG9uLm9yZy9kb3dubG9hZHMvXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICAgICAgXCJNYWtlIHN1cmUgdG8gaW5zdGFsbCBgcHlsc2AgMC4xOSBvciBuZXdlciBieSBydW5uaW5nOlxcblwiICtcbiAgICAgICAgICAgICAgXCJgYGBcXG5cIiArXG4gICAgICAgICAgICAgIGAke3B5dGhvbn0gLW0gcGlwIGluc3RhbGwgJ3B5dGhvbi1sYW5ndWFnZS1zZXJ2ZXJbYWxsXSdcXG5gICtcbiAgICAgICAgICAgICAgXCJgYGBcIlxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY2hpbGRQcm9jZXNzO1xuICB9XG5cbiAgYXN5bmMgZ2V0U3VnZ2VzdGlvbnMocmVxdWVzdCkge1xuICAgIGlmICghUFlUSE9OX1JFR0VYLnRlc3QocmVxdWVzdC5wcmVmaXgpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gc3VwZXIuZ2V0U3VnZ2VzdGlvbnMocmVxdWVzdCk7XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIGRlYnVnZ2VyRGlzcG9zZSgpO1xuICAgIHJldHVybiBQcm9taXNlLnJhY2UoW3N1cGVyLmRlYWN0aXZhdGUoKSwgdGhpcy5jcmVhdGVUaW1lb3V0UHJvbWlzZSgyMDAwKV0pO1xuICB9XG5cbiAgY3JlYXRlVGltZW91dFByb21pc2UobWlsbGlzZWNvbmRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgYFNlcnZlciBmYWlsZWQgdG8gc2h1dGRvd24gaW4gJHttaWxsaXNlY29uZHN9bXMsIGZvcmNpbmcgdGVybWluYXRpb25gXG4gICAgICAgICk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0sIG1pbGxpc2Vjb25kcyk7XG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgcHl0aG9uQ2xpZW50ID0gbmV3IFB5dGhvbkxhbmd1YWdlQ2xpZW50KClcbnB5dGhvbkNsaWVudC5jcmVhdGVEZWJ1Z2dlclByb3ZpZGVyID0gY3JlYXRlRGVidWdnZXJQcm92aWRlcjsgLy8gYWRkIHRoZSBkZWJ1Z2dlclxubW9kdWxlLmV4cG9ydHMgPSBweXRob25DbGllbnQ7XG4iXX0=