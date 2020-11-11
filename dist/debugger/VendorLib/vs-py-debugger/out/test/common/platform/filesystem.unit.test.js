"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

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

const chai_1 = require("chai");

const fs = require("fs-extra");

const path = require("path");

const TypeMoq = require("typemoq");

const fileSystem_1 = require("../../../client/common/platform/fileSystem"); // tslint:disable-next-line:no-require-imports no-var-requires


const assertArrays = require('chai-arrays');

chai_1.use(assertArrays); // tslint:disable-next-line:max-func-body-length

suite('FileSystem', () => {
  let platformService;
  let fileSystem;
  const fileToAppendTo = path.join(__dirname, 'created_for_testing_dummy.txt');
  setup(() => {
    platformService = TypeMoq.Mock.ofType();
    fileSystem = new fileSystem_1.FileSystem(platformService.object);
    cleanTestFiles();
  });
  teardown(cleanTestFiles);

  function cleanTestFiles() {
    if (fs.existsSync(fileToAppendTo)) {
      fs.unlinkSync(fileToAppendTo);
    }
  }

  test('ReadFile returns contents of a file', () => __awaiter(void 0, void 0, void 0, function* () {
    const file = __filename;
    const expectedContents = yield fs.readFile(file).then(buffer => buffer.toString());
    const content = yield fileSystem.readFile(file);
    chai_1.expect(content).to.be.equal(expectedContents);
  }));
  test('ReadFile throws an exception if file does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
    const readPromise = fs.readFile('xyz', {
      encoding: 'utf8'
    });
    yield chai_1.expect(readPromise).to.be.rejectedWith();
  }));

  function caseSensitivityFileCheck(isWindows, isOsx, isLinux) {
    platformService.setup(p => p.isWindows).returns(() => isWindows);
    platformService.setup(p => p.isMac).returns(() => isOsx);
    platformService.setup(p => p.isLinux).returns(() => isLinux);
    const path1 = 'c:\\users\\Peter Smith\\my documents\\test.txt';
    const path2 = 'c:\\USERS\\Peter Smith\\my documents\\test.TXT';
    const path3 = 'c:\\USERS\\Peter Smith\\my documents\\test.exe';

    if (isWindows) {
      chai_1.expect(fileSystem.arePathsSame(path1, path2)).to.be.equal(true, 'file paths do not match (windows)');
    } else {
      chai_1.expect(fileSystem.arePathsSame(path1, path2)).to.be.equal(false, 'file match (non windows)');
    }

    chai_1.expect(fileSystem.arePathsSame(path1, path1)).to.be.equal(true, '1. file paths do not match');
    chai_1.expect(fileSystem.arePathsSame(path2, path2)).to.be.equal(true, '2. file paths do not match');
    chai_1.expect(fileSystem.arePathsSame(path1, path3)).to.be.equal(false, '2. file paths do not match');
  }

  test('Case sensitivity is ignored when comparing file names on windows', () => __awaiter(void 0, void 0, void 0, function* () {
    caseSensitivityFileCheck(true, false, false);
  }));
  test('Case sensitivity is not ignored when comparing file names on osx', () => __awaiter(void 0, void 0, void 0, function* () {
    caseSensitivityFileCheck(false, true, false);
  }));
  test('Case sensitivity is not ignored when comparing file names on linux', () => __awaiter(void 0, void 0, void 0, function* () {
    caseSensitivityFileCheck(false, false, true);
  }));
  test('Check existence of files synchronously', () => __awaiter(void 0, void 0, void 0, function* () {
    chai_1.expect(fileSystem.fileExistsSync(__filename)).to.be.equal(true, 'file not found');
  }));
  test('Test appending to file', () => __awaiter(void 0, void 0, void 0, function* () {
    const dataToAppend = `Some Data\n${new Date().toString()}\nAnd another line`;
    fileSystem.appendFileSync(fileToAppendTo, dataToAppend);
    const fileContents = yield fileSystem.readFile(fileToAppendTo);
    chai_1.expect(fileContents).to.be.equal(dataToAppend);
  }));
  test('Test searching for files', () => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield fileSystem.search(path.join(__dirname, '*.js'));
    chai_1.expect(files).to.be.array();
    chai_1.expect(files.length).to.be.at.least(1);

    const expectedFileName = __filename.replace(/\\/g, '/');

    const fileName = files[0].replace(/\\/g, '/');
    chai_1.expect(fileName).to.equal(expectedFileName);
  }));
  test('Ensure creating a temporary file results in a unique temp file path', () => __awaiter(void 0, void 0, void 0, function* () {
    const tempFile = yield fileSystem.createTemporaryFile('.tmp');
    const tempFile2 = yield fileSystem.createTemporaryFile('.tmp');
    chai_1.expect(tempFile.filePath).to.not.equal(tempFile2.filePath, 'Temp files must be unique, implementation of createTemporaryFile is off.');
  }));
  test('Ensure writing to a temp file is supported via file stream', () => __awaiter(void 0, void 0, void 0, function* () {
    yield fileSystem.createTemporaryFile('.tmp').then(tf => {
      chai_1.expect(tf).to.not.equal(undefined, 'Error trying to create a temporary file');
      const writeStream = fileSystem.createWriteStream(tf.filePath);
      writeStream.write('hello', 'utf8', err => {
        chai_1.expect(err).to.equal(undefined, `Failed to write to a temp file, error is ${err}`);
      });
    }, failReason => {
      chai_1.expect(failReason).to.equal('No errors occured', `Failed to create a temporary file with error ${failReason}`);
    });
  }));
  test('Ensure chmod works against a temporary file', () => __awaiter(void 0, void 0, void 0, function* () {
    yield fileSystem.createTemporaryFile('.tmp').then(fl => __awaiter(this, void 0, void 0, function* () {
      yield fileSystem.chmod(fl.filePath, '7777').then(success => {// cannot check for success other than we got here, chmod in Windows won't have any effect on the file itself.
      }, failReason => {
        chai_1.expect(failReason).to.equal('There was no error using chmod', `Failed to perform chmod operation successfully, got error ${failReason}`);
      });
    }));
  }));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGVzeXN0ZW0udW5pdC50ZXN0LmpzIl0sIm5hbWVzIjpbIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwidmFsdWUiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJjaGFpXzEiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwiVHlwZU1vcSIsImZpbGVTeXN0ZW1fMSIsImFzc2VydEFycmF5cyIsInVzZSIsInN1aXRlIiwicGxhdGZvcm1TZXJ2aWNlIiwiZmlsZVN5c3RlbSIsImZpbGVUb0FwcGVuZFRvIiwiam9pbiIsIl9fZGlybmFtZSIsInNldHVwIiwiTW9jayIsIm9mVHlwZSIsIkZpbGVTeXN0ZW0iLCJvYmplY3QiLCJjbGVhblRlc3RGaWxlcyIsInRlYXJkb3duIiwiZXhpc3RzU3luYyIsInVubGlua1N5bmMiLCJ0ZXN0IiwiZmlsZSIsIl9fZmlsZW5hbWUiLCJleHBlY3RlZENvbnRlbnRzIiwicmVhZEZpbGUiLCJidWZmZXIiLCJ0b1N0cmluZyIsImNvbnRlbnQiLCJleHBlY3QiLCJ0byIsImJlIiwiZXF1YWwiLCJyZWFkUHJvbWlzZSIsImVuY29kaW5nIiwicmVqZWN0ZWRXaXRoIiwiY2FzZVNlbnNpdGl2aXR5RmlsZUNoZWNrIiwiaXNXaW5kb3dzIiwiaXNPc3giLCJpc0xpbnV4IiwicCIsInJldHVybnMiLCJpc01hYyIsInBhdGgxIiwicGF0aDIiLCJwYXRoMyIsImFyZVBhdGhzU2FtZSIsImZpbGVFeGlzdHNTeW5jIiwiZGF0YVRvQXBwZW5kIiwiRGF0ZSIsImFwcGVuZEZpbGVTeW5jIiwiZmlsZUNvbnRlbnRzIiwiZmlsZXMiLCJzZWFyY2giLCJhcnJheSIsImxlbmd0aCIsImF0IiwibGVhc3QiLCJleHBlY3RlZEZpbGVOYW1lIiwicmVwbGFjZSIsImZpbGVOYW1lIiwidGVtcEZpbGUiLCJjcmVhdGVUZW1wb3JhcnlGaWxlIiwidGVtcEZpbGUyIiwiZmlsZVBhdGgiLCJub3QiLCJ0ZiIsInVuZGVmaW5lZCIsIndyaXRlU3RyZWFtIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJ3cml0ZSIsImVyciIsImZhaWxSZWFzb24iLCJmbCIsImNobW9kIiwic3VjY2VzcyJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUNBO0FBQ0E7O0FBQ0EsSUFBSUEsU0FBUyxHQUFJLFVBQVEsU0FBS0EsU0FBZCxJQUE0QixVQUFVQyxPQUFWLEVBQW1CQyxVQUFuQixFQUErQkMsQ0FBL0IsRUFBa0NDLFNBQWxDLEVBQTZDO0FBQ3JGLFNBQU8sS0FBS0QsQ0FBQyxLQUFLQSxDQUFDLEdBQUdFLE9BQVQsQ0FBTixFQUF5QixVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUN2RCxhQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUFFLFVBQUk7QUFBRUMsUUFBQUEsSUFBSSxDQUFDTixTQUFTLENBQUNPLElBQVYsQ0FBZUYsS0FBZixDQUFELENBQUo7QUFBOEIsT0FBcEMsQ0FBcUMsT0FBT0csQ0FBUCxFQUFVO0FBQUVMLFFBQUFBLE1BQU0sQ0FBQ0ssQ0FBRCxDQUFOO0FBQVk7QUFBRTs7QUFDM0YsYUFBU0MsUUFBVCxDQUFrQkosS0FBbEIsRUFBeUI7QUFBRSxVQUFJO0FBQUVDLFFBQUFBLElBQUksQ0FBQ04sU0FBUyxDQUFDLE9BQUQsQ0FBVCxDQUFtQkssS0FBbkIsQ0FBRCxDQUFKO0FBQWtDLE9BQXhDLENBQXlDLE9BQU9HLENBQVAsRUFBVTtBQUFFTCxRQUFBQSxNQUFNLENBQUNLLENBQUQsQ0FBTjtBQUFZO0FBQUU7O0FBQzlGLGFBQVNGLElBQVQsQ0FBY0ksTUFBZCxFQUFzQjtBQUFFQSxNQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBY1QsT0FBTyxDQUFDUSxNQUFNLENBQUNMLEtBQVIsQ0FBckIsR0FBc0MsSUFB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QUFELElBQWEsQ0FDMUQ7QUFDSCxPQUZLLEVBRUZILFVBQUQsSUFBZ0I7QUFDZjFFLFFBQUFBLE1BQU0sQ0FBQytCLE1BQVAsQ0FBYzJDLFVBQWQsRUFBMEIxQyxFQUExQixDQUE2QkUsS0FBN0IsQ0FBbUMsZ0NBQW5DLEVBQXNFLDZEQUE0RHdDLFVBQVcsRUFBN0k7QUFDSCxPQUpLLENBQU47QUFLSCxLQU5rRSxDQUE3RCxDQUFOO0FBT0gsR0FSa0UsQ0FBL0QsQ0FBSjtBQVNILENBN0ZJLENBQUwiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBjaGFpXzEgPSByZXF1aXJlKFwiY2hhaVwiKTtcclxuY29uc3QgZnMgPSByZXF1aXJlKFwiZnMtZXh0cmFcIik7XHJcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuY29uc3QgVHlwZU1vcSA9IHJlcXVpcmUoXCJ0eXBlbW9xXCIpO1xyXG5jb25zdCBmaWxlU3lzdGVtXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vY2xpZW50L2NvbW1vbi9wbGF0Zm9ybS9maWxlU3lzdGVtXCIpO1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tcmVxdWlyZS1pbXBvcnRzIG5vLXZhci1yZXF1aXJlc1xyXG5jb25zdCBhc3NlcnRBcnJheXMgPSByZXF1aXJlKCdjaGFpLWFycmF5cycpO1xyXG5jaGFpXzEudXNlKGFzc2VydEFycmF5cyk7XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtZnVuYy1ib2R5LWxlbmd0aFxyXG5zdWl0ZSgnRmlsZVN5c3RlbScsICgpID0+IHtcclxuICAgIGxldCBwbGF0Zm9ybVNlcnZpY2U7XHJcbiAgICBsZXQgZmlsZVN5c3RlbTtcclxuICAgIGNvbnN0IGZpbGVUb0FwcGVuZFRvID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ2NyZWF0ZWRfZm9yX3Rlc3RpbmdfZHVtbXkudHh0Jyk7XHJcbiAgICBzZXR1cCgoKSA9PiB7XHJcbiAgICAgICAgcGxhdGZvcm1TZXJ2aWNlID0gVHlwZU1vcS5Nb2NrLm9mVHlwZSgpO1xyXG4gICAgICAgIGZpbGVTeXN0ZW0gPSBuZXcgZmlsZVN5c3RlbV8xLkZpbGVTeXN0ZW0ocGxhdGZvcm1TZXJ2aWNlLm9iamVjdCk7XHJcbiAgICAgICAgY2xlYW5UZXN0RmlsZXMoKTtcclxuICAgIH0pO1xyXG4gICAgdGVhcmRvd24oY2xlYW5UZXN0RmlsZXMpO1xyXG4gICAgZnVuY3Rpb24gY2xlYW5UZXN0RmlsZXMoKSB7XHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZmlsZVRvQXBwZW5kVG8pKSB7XHJcbiAgICAgICAgICAgIGZzLnVubGlua1N5bmMoZmlsZVRvQXBwZW5kVG8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRlc3QoJ1JlYWRGaWxlIHJldHVybnMgY29udGVudHMgb2YgYSBmaWxlJywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBfX2ZpbGVuYW1lO1xyXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkQ29udGVudHMgPSB5aWVsZCBmcy5yZWFkRmlsZShmaWxlKS50aGVuKGJ1ZmZlciA9PiBidWZmZXIudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IHlpZWxkIGZpbGVTeXN0ZW0ucmVhZEZpbGUoZmlsZSk7XHJcbiAgICAgICAgY2hhaV8xLmV4cGVjdChjb250ZW50KS50by5iZS5lcXVhbChleHBlY3RlZENvbnRlbnRzKTtcclxuICAgIH0pKTtcclxuICAgIHRlc3QoJ1JlYWRGaWxlIHRocm93cyBhbiBleGNlcHRpb24gaWYgZmlsZSBkb2VzIG5vdCBleGlzdCcsICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCByZWFkUHJvbWlzZSA9IGZzLnJlYWRGaWxlKCd4eXonLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XHJcbiAgICAgICAgeWllbGQgY2hhaV8xLmV4cGVjdChyZWFkUHJvbWlzZSkudG8uYmUucmVqZWN0ZWRXaXRoKCk7XHJcbiAgICB9KSk7XHJcbiAgICBmdW5jdGlvbiBjYXNlU2Vuc2l0aXZpdHlGaWxlQ2hlY2soaXNXaW5kb3dzLCBpc09zeCwgaXNMaW51eCkge1xyXG4gICAgICAgIHBsYXRmb3JtU2VydmljZS5zZXR1cChwID0+IHAuaXNXaW5kb3dzKS5yZXR1cm5zKCgpID0+IGlzV2luZG93cyk7XHJcbiAgICAgICAgcGxhdGZvcm1TZXJ2aWNlLnNldHVwKHAgPT4gcC5pc01hYykucmV0dXJucygoKSA9PiBpc09zeCk7XHJcbiAgICAgICAgcGxhdGZvcm1TZXJ2aWNlLnNldHVwKHAgPT4gcC5pc0xpbnV4KS5yZXR1cm5zKCgpID0+IGlzTGludXgpO1xyXG4gICAgICAgIGNvbnN0IHBhdGgxID0gJ2M6XFxcXHVzZXJzXFxcXFBldGVyIFNtaXRoXFxcXG15IGRvY3VtZW50c1xcXFx0ZXN0LnR4dCc7XHJcbiAgICAgICAgY29uc3QgcGF0aDIgPSAnYzpcXFxcVVNFUlNcXFxcUGV0ZXIgU21pdGhcXFxcbXkgZG9jdW1lbnRzXFxcXHRlc3QuVFhUJztcclxuICAgICAgICBjb25zdCBwYXRoMyA9ICdjOlxcXFxVU0VSU1xcXFxQZXRlciBTbWl0aFxcXFxteSBkb2N1bWVudHNcXFxcdGVzdC5leGUnO1xyXG4gICAgICAgIGlmIChpc1dpbmRvd3MpIHtcclxuICAgICAgICAgICAgY2hhaV8xLmV4cGVjdChmaWxlU3lzdGVtLmFyZVBhdGhzU2FtZShwYXRoMSwgcGF0aDIpKS50by5iZS5lcXVhbCh0cnVlLCAnZmlsZSBwYXRocyBkbyBub3QgbWF0Y2ggKHdpbmRvd3MpJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFpXzEuZXhwZWN0KGZpbGVTeXN0ZW0uYXJlUGF0aHNTYW1lKHBhdGgxLCBwYXRoMikpLnRvLmJlLmVxdWFsKGZhbHNlLCAnZmlsZSBtYXRjaCAobm9uIHdpbmRvd3MpJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNoYWlfMS5leHBlY3QoZmlsZVN5c3RlbS5hcmVQYXRoc1NhbWUocGF0aDEsIHBhdGgxKSkudG8uYmUuZXF1YWwodHJ1ZSwgJzEuIGZpbGUgcGF0aHMgZG8gbm90IG1hdGNoJyk7XHJcbiAgICAgICAgY2hhaV8xLmV4cGVjdChmaWxlU3lzdGVtLmFyZVBhdGhzU2FtZShwYXRoMiwgcGF0aDIpKS50by5iZS5lcXVhbCh0cnVlLCAnMi4gZmlsZSBwYXRocyBkbyBub3QgbWF0Y2gnKTtcclxuICAgICAgICBjaGFpXzEuZXhwZWN0KGZpbGVTeXN0ZW0uYXJlUGF0aHNTYW1lKHBhdGgxLCBwYXRoMykpLnRvLmJlLmVxdWFsKGZhbHNlLCAnMi4gZmlsZSBwYXRocyBkbyBub3QgbWF0Y2gnKTtcclxuICAgIH1cclxuICAgIHRlc3QoJ0Nhc2Ugc2Vuc2l0aXZpdHkgaXMgaWdub3JlZCB3aGVuIGNvbXBhcmluZyBmaWxlIG5hbWVzIG9uIHdpbmRvd3MnLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY2FzZVNlbnNpdGl2aXR5RmlsZUNoZWNrKHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9KSk7XHJcbiAgICB0ZXN0KCdDYXNlIHNlbnNpdGl2aXR5IGlzIG5vdCBpZ25vcmVkIHdoZW4gY29tcGFyaW5nIGZpbGUgbmFtZXMgb24gb3N4JywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNhc2VTZW5zaXRpdml0eUZpbGVDaGVjayhmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgfSkpO1xyXG4gICAgdGVzdCgnQ2FzZSBzZW5zaXRpdml0eSBpcyBub3QgaWdub3JlZCB3aGVuIGNvbXBhcmluZyBmaWxlIG5hbWVzIG9uIGxpbnV4JywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNhc2VTZW5zaXRpdml0eUZpbGVDaGVjayhmYWxzZSwgZmFsc2UsIHRydWUpO1xyXG4gICAgfSkpO1xyXG4gICAgdGVzdCgnQ2hlY2sgZXhpc3RlbmNlIG9mIGZpbGVzIHN5bmNocm9ub3VzbHknLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY2hhaV8xLmV4cGVjdChmaWxlU3lzdGVtLmZpbGVFeGlzdHNTeW5jKF9fZmlsZW5hbWUpKS50by5iZS5lcXVhbCh0cnVlLCAnZmlsZSBub3QgZm91bmQnKTtcclxuICAgIH0pKTtcclxuICAgIHRlc3QoJ1Rlc3QgYXBwZW5kaW5nIHRvIGZpbGUnLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YVRvQXBwZW5kID0gYFNvbWUgRGF0YVxcbiR7bmV3IERhdGUoKS50b1N0cmluZygpfVxcbkFuZCBhbm90aGVyIGxpbmVgO1xyXG4gICAgICAgIGZpbGVTeXN0ZW0uYXBwZW5kRmlsZVN5bmMoZmlsZVRvQXBwZW5kVG8sIGRhdGFUb0FwcGVuZCk7XHJcbiAgICAgICAgY29uc3QgZmlsZUNvbnRlbnRzID0geWllbGQgZmlsZVN5c3RlbS5yZWFkRmlsZShmaWxlVG9BcHBlbmRUbyk7XHJcbiAgICAgICAgY2hhaV8xLmV4cGVjdChmaWxlQ29udGVudHMpLnRvLmJlLmVxdWFsKGRhdGFUb0FwcGVuZCk7XHJcbiAgICB9KSk7XHJcbiAgICB0ZXN0KCdUZXN0IHNlYXJjaGluZyBmb3IgZmlsZXMnLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY29uc3QgZmlsZXMgPSB5aWVsZCBmaWxlU3lzdGVtLnNlYXJjaChwYXRoLmpvaW4oX19kaXJuYW1lLCAnKi5qcycpKTtcclxuICAgICAgICBjaGFpXzEuZXhwZWN0KGZpbGVzKS50by5iZS5hcnJheSgpO1xyXG4gICAgICAgIGNoYWlfMS5leHBlY3QoZmlsZXMubGVuZ3RoKS50by5iZS5hdC5sZWFzdCgxKTtcclxuICAgICAgICBjb25zdCBleHBlY3RlZEZpbGVOYW1lID0gX19maWxlbmFtZS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XHJcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlc1swXS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XHJcbiAgICAgICAgY2hhaV8xLmV4cGVjdChmaWxlTmFtZSkudG8uZXF1YWwoZXhwZWN0ZWRGaWxlTmFtZSk7XHJcbiAgICB9KSk7XHJcbiAgICB0ZXN0KCdFbnN1cmUgY3JlYXRpbmcgYSB0ZW1wb3JhcnkgZmlsZSByZXN1bHRzIGluIGEgdW5pcXVlIHRlbXAgZmlsZSBwYXRoJywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IHRlbXBGaWxlID0geWllbGQgZmlsZVN5c3RlbS5jcmVhdGVUZW1wb3JhcnlGaWxlKCcudG1wJyk7XHJcbiAgICAgICAgY29uc3QgdGVtcEZpbGUyID0geWllbGQgZmlsZVN5c3RlbS5jcmVhdGVUZW1wb3JhcnlGaWxlKCcudG1wJyk7XHJcbiAgICAgICAgY2hhaV8xLmV4cGVjdCh0ZW1wRmlsZS5maWxlUGF0aCkudG8ubm90LmVxdWFsKHRlbXBGaWxlMi5maWxlUGF0aCwgJ1RlbXAgZmlsZXMgbXVzdCBiZSB1bmlxdWUsIGltcGxlbWVudGF0aW9uIG9mIGNyZWF0ZVRlbXBvcmFyeUZpbGUgaXMgb2ZmLicpO1xyXG4gICAgfSkpO1xyXG4gICAgdGVzdCgnRW5zdXJlIHdyaXRpbmcgdG8gYSB0ZW1wIGZpbGUgaXMgc3VwcG9ydGVkIHZpYSBmaWxlIHN0cmVhbScsICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICB5aWVsZCBmaWxlU3lzdGVtLmNyZWF0ZVRlbXBvcmFyeUZpbGUoJy50bXAnKS50aGVuKCh0ZikgPT4ge1xyXG4gICAgICAgICAgICBjaGFpXzEuZXhwZWN0KHRmKS50by5ub3QuZXF1YWwodW5kZWZpbmVkLCAnRXJyb3IgdHJ5aW5nIHRvIGNyZWF0ZSBhIHRlbXBvcmFyeSBmaWxlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyaXRlU3RyZWFtID0gZmlsZVN5c3RlbS5jcmVhdGVXcml0ZVN0cmVhbSh0Zi5maWxlUGF0aCk7XHJcbiAgICAgICAgICAgIHdyaXRlU3RyZWFtLndyaXRlKCdoZWxsbycsICd1dGY4JywgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hhaV8xLmV4cGVjdChlcnIpLnRvLmVxdWFsKHVuZGVmaW5lZCwgYEZhaWxlZCB0byB3cml0ZSB0byBhIHRlbXAgZmlsZSwgZXJyb3IgaXMgJHtlcnJ9YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIChmYWlsUmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgIGNoYWlfMS5leHBlY3QoZmFpbFJlYXNvbikudG8uZXF1YWwoJ05vIGVycm9ycyBvY2N1cmVkJywgYEZhaWxlZCB0byBjcmVhdGUgYSB0ZW1wb3JhcnkgZmlsZSB3aXRoIGVycm9yICR7ZmFpbFJlYXNvbn1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIHRlc3QoJ0Vuc3VyZSBjaG1vZCB3b3JrcyBhZ2FpbnN0IGEgdGVtcG9yYXJ5IGZpbGUnLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgeWllbGQgZmlsZVN5c3RlbS5jcmVhdGVUZW1wb3JhcnlGaWxlKCcudG1wJykudGhlbigoZmwpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgeWllbGQgZmlsZVN5c3RlbS5jaG1vZChmbC5maWxlUGF0aCwgJzc3NzcnKS50aGVuKChzdWNjZXNzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYW5ub3QgY2hlY2sgZm9yIHN1Y2Nlc3Mgb3RoZXIgdGhhbiB3ZSBnb3QgaGVyZSwgY2htb2QgaW4gV2luZG93cyB3b24ndCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGZpbGUgaXRzZWxmLlxyXG4gICAgICAgICAgICB9LCAoZmFpbFJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hhaV8xLmV4cGVjdChmYWlsUmVhc29uKS50by5lcXVhbCgnVGhlcmUgd2FzIG5vIGVycm9yIHVzaW5nIGNobW9kJywgYEZhaWxlZCB0byBwZXJmb3JtIGNobW9kIG9wZXJhdGlvbiBzdWNjZXNzZnVsbHksIGdvdCBlcnJvciAke2ZhaWxSZWFzb259YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH0pKTtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbGVzeXN0ZW0udW5pdC50ZXN0LmpzLm1hcCJdfQ==