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

const fs = require("fs-extra");

const path = require("path");

const restTextConverter_1 = require("../../client/common/markdown/restTextConverter");

const textUtils_1 = require("../textUtils");

const srcPythoFilesPath = path.join(__dirname, '..', '..', '..', 'src', 'test', 'pythonFiles', 'markdown');

function testConversion(fileName) {
  return __awaiter(this, void 0, void 0, function* () {
    const cvt = new restTextConverter_1.RestTextConverter();
    const file = path.join(srcPythoFilesPath, fileName);
    const source = yield fs.readFile(`${file}.pydoc`, 'utf8');
    const actual = cvt.toMarkdown(source);
    const expected = yield fs.readFile(`${file}.md`, 'utf8');
    textUtils_1.compareFiles(expected, actual);
  });
} // tslint:disable-next-line:max-func-body-length


suite('Hover - RestTextConverter', () => {
  test('scipy', () => __awaiter(void 0, void 0, void 0, function* () {
    return yield testConversion('scipy');
  }));
  test('scipy.spatial', () => __awaiter(void 0, void 0, void 0, function* () {
    return yield testConversion('scipy.spatial');
  }));
  test('scipy.spatial.distance', () => __awaiter(void 0, void 0, void 0, function* () {
    return yield testConversion('scipy.spatial.distance');
  }));
  test('anydbm', () => __awaiter(void 0, void 0, void 0, function* () {
    return yield testConversion('anydbm');
  }));
  test('aifc', () => __awaiter(void 0, void 0, void 0, function* () {
    return yield testConversion('aifc');
  }));
  test('astroid', () => __awaiter(void 0, void 0, void 0, function* () {
    return yield testConversion('astroid');
  }));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3RUZXh0Q29udmVydGVyLnRlc3QuanMiXSwibmFtZXMiOlsiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsImZzIiwicmVxdWlyZSIsInBhdGgiLCJyZXN0VGV4dENvbnZlcnRlcl8xIiwidGV4dFV0aWxzXzEiLCJzcmNQeXRob0ZpbGVzUGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJ0ZXN0Q29udmVyc2lvbiIsImZpbGVOYW1lIiwiY3Z0IiwiUmVzdFRleHRDb252ZXJ0ZXIiLCJmaWxlIiwic291cmNlIiwicmVhZEZpbGUiLCJhY3R1YWwiLCJ0b01hcmtkb3duIiwiZXhwZWN0ZWQiLCJjb21wYXJlRmlsZXMiLCJzdWl0ZSIsInRlc3QiXSwibWFwcGluZ3MiOiJBQUFBLGEsQ0FDQTtBQUNBOztBQUNBLElBQUlBLFNBQVMsR0FBSSxVQUFRLFNBQUtBLFNBQWQsSUFBNEIsVUFBVUMsT0FBVixFQUFtQkMsVUFBbkIsRUFBK0JDLENBQS9CLEVBQWtDQyxTQUFsQyxFQUE2QztBQUNyRixTQUFPLEtBQUtELENBQUMsS0FBS0EsQ0FBQyxHQUFHRSxPQUFULENBQU4sRUFBeUIsVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDdkQsYUFBU0MsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEI7QUFBRSxVQUFJO0FBQUVDLFFBQUFBLElBQUksQ0FBQ04sU0FBUyxDQUFDTyxJQUFWLENBQWVGLEtBQWYsQ0FBRCxDQUFKO0FBQThCLE9BQXBDLENBQXFDLE9BQU9HLENBQVAsRUFBVTtBQUFFTCxRQUFBQSxNQUFNLENBQUNLLENBQUQsQ0FBTjtBQUFZO0FBQUU7O0FB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LE1BQU02QixjQUFjLENBQUMsZUFBRCxDQUEzQjtBQUErQyxHQUFyRixDQUFqQyxDQUFKO0FBQ0FZLEVBQUFBLElBQUksQ0FBQyx3QkFBRCxFQUEyQixNQUFNekMsU0FBUyxTQUFPLEtBQUssQ0FBWixFQUFlLEtBQUssQ0FBcEIsRUFBdUIsYUFBYTtBQUFFLFdBQU8sTUFBTTZCLGNBQWMsQ0FBQyx3QkFBRCxDQUEzQjtBQUF3RCxHQUE5RixDQUExQyxDQUFKO0FBQ0FZLEVBQUFBLElBQUksQ0FBQyxRQUFELEVBQVcsTUFBTXpDLFNBQVMsU0FBTyxLQUFLLENBQVosRUFBZSxLQUFLLENBQXBCLEVBQXVCLGFBQWE7QUFBRSxXQUFPLE1BQU02QixjQUFjLENBQUMsUUFBRCxDQUEzQjtBQUF3QyxHQUE5RSxDQUExQixDQUFKO0FBQ0FZLEVBQUFBLElBQUksQ0FBQyxNQUFELEVBQVMsTUFBTXpDLFNBQVMsU0FBTyxLQUFLLENBQVosRUFBZSxLQUFLLENBQXBCLEVBQXVCLGFBQWE7QUFBRSxXQUFPLE1BQU02QixjQUFjLENBQUMsTUFBRCxDQUEzQjtBQUFzQyxHQUE1RSxDQUF4QixDQUFKO0FBQ0FZLEVBQUFBLElBQUksQ0FBQyxTQUFELEVBQVksTUFBTXpDLFNBQVMsU0FBTyxLQUFLLENBQVosRUFBZSxLQUFLLENBQXBCLEVBQXVCLGFBQWE7QUFBRSxXQUFPLE1BQU02QixjQUFjLENBQUMsU0FBRCxDQUEzQjtBQUF5QyxHQUEvRSxDQUEzQixDQUFKO0FBQ0gsQ0FQSSxDQUFMIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgZnMgPSByZXF1aXJlKFwiZnMtZXh0cmFcIik7XHJcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuY29uc3QgcmVzdFRleHRDb252ZXJ0ZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9jbGllbnQvY29tbW9uL21hcmtkb3duL3Jlc3RUZXh0Q29udmVydGVyXCIpO1xyXG5jb25zdCB0ZXh0VXRpbHNfMSA9IHJlcXVpcmUoXCIuLi90ZXh0VXRpbHNcIik7XHJcbmNvbnN0IHNyY1B5dGhvRmlsZXNQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJy4uJywgJ3NyYycsICd0ZXN0JywgJ3B5dGhvbkZpbGVzJywgJ21hcmtkb3duJyk7XHJcbmZ1bmN0aW9uIHRlc3RDb252ZXJzaW9uKGZpbGVOYW1lKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IGN2dCA9IG5ldyByZXN0VGV4dENvbnZlcnRlcl8xLlJlc3RUZXh0Q29udmVydGVyKCk7XHJcbiAgICAgICAgY29uc3QgZmlsZSA9IHBhdGguam9pbihzcmNQeXRob0ZpbGVzUGF0aCwgZmlsZU5hbWUpO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHlpZWxkIGZzLnJlYWRGaWxlKGAke2ZpbGV9LnB5ZG9jYCwgJ3V0ZjgnKTtcclxuICAgICAgICBjb25zdCBhY3R1YWwgPSBjdnQudG9NYXJrZG93bihzb3VyY2UpO1xyXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkID0geWllbGQgZnMucmVhZEZpbGUoYCR7ZmlsZX0ubWRgLCAndXRmOCcpO1xyXG4gICAgICAgIHRleHRVdGlsc18xLmNvbXBhcmVGaWxlcyhleHBlY3RlZCwgYWN0dWFsKTtcclxuICAgIH0pO1xyXG59XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtZnVuYy1ib2R5LWxlbmd0aFxyXG5zdWl0ZSgnSG92ZXIgLSBSZXN0VGV4dENvbnZlcnRlcicsICgpID0+IHtcclxuICAgIHRlc3QoJ3NjaXB5JywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgeyByZXR1cm4geWllbGQgdGVzdENvbnZlcnNpb24oJ3NjaXB5Jyk7IH0pKTtcclxuICAgIHRlc3QoJ3NjaXB5LnNwYXRpYWwnLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiB5aWVsZCB0ZXN0Q29udmVyc2lvbignc2NpcHkuc3BhdGlhbCcpOyB9KSk7XHJcbiAgICB0ZXN0KCdzY2lweS5zcGF0aWFsLmRpc3RhbmNlJywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgeyByZXR1cm4geWllbGQgdGVzdENvbnZlcnNpb24oJ3NjaXB5LnNwYXRpYWwuZGlzdGFuY2UnKTsgfSkpO1xyXG4gICAgdGVzdCgnYW55ZGJtJywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgeyByZXR1cm4geWllbGQgdGVzdENvbnZlcnNpb24oJ2FueWRibScpOyB9KSk7XHJcbiAgICB0ZXN0KCdhaWZjJywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgeyByZXR1cm4geWllbGQgdGVzdENvbnZlcnNpb24oJ2FpZmMnKTsgfSkpO1xyXG4gICAgdGVzdCgnYXN0cm9pZCcsICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsgcmV0dXJuIHlpZWxkIHRlc3RDb252ZXJzaW9uKCdhc3Ryb2lkJyk7IH0pKTtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlc3RUZXh0Q29udmVydGVyLnRlc3QuanMubWFwIl19