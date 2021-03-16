const fs = require("fs");
const path = require("path");
let rootPath = ".";
let includeExts = [".html", ".js", ".ts"];
let exportDirectory = ["./node_modules", "./dist"];
let exportFiles = ["./codenumber.ts", "./dist/app.js"];
let totalNum = 0;

// 获取行数
async function getLine(path) {
  let rep = await fs.readFileSync(path);
  rep = rep.toString();
  const lines = rep.split("\n");
  console.log(`${path}  ${lines.length}`);
  totalNum += lines.length;
}

// 递归所有文件夹统计
async function start(startPath) {
  let files = fs.readdirSync(startPath);
  files
    .map((file) => `${startPath}/${file}`)
    .forEach((file) => {
      let stat = fs.statSync(file);
      if (stat.isDirectory()) {
        if (exportDirectory.includes(startPath)) {
          return;
        }
        start(file);
        return;
      } else {
        if (exportFiles.includes(file)) {
          return;
        }
      }
      let ext = path.extname(file);
      if (includeExts.includes(ext)) {
        getLine(file);
      }
    });
}

(async () => {
  await start(rootPath);
  console.log(`总代码行数：${totalNum}`);
})();
