const FoundationVersion = require("../src/foundation/version.json");
const ComponentVersion = require("../package.json");
const fs = require("fs");

class MyPlugin {
  pluginName = "MyPlugin";
  data = {};

  apply(compiler) {
    // console.log("FoundationVersion", FoundationVersion.version);
    // console.log("ComponentVersion", ComponentVersion.version);
    this.data["foundation-version"] = FoundationVersion.version;
    this.data["component-version"] = ComponentVersion.version;

    compiler.hooks.normalModuleFactory.tap("MyPlugin", (factory) => {
      factory.hooks.parser
        .for("javascript/auto")
        .tap("MyPlugin", (parser, options) => {
          parser.hooks.program.tap(this.pluginName, (ast, comments) => {
            fs.writeFileSync("out.json", JSON.stringify(comments), "utf8");
          });
        });
    });

    // compiler.hooks.normalModuleFactory.tap(this.pluginName, (factory) => {
    //   factory.hooks.parser
    //     .for("javascript/auto")
    //     .tap(this.pluginName, (parser) => {
    //       parser.hooks.importSpecifier.tap(
    //         this.pluginName,
    //         (statement, source, exportName, identifierName) => {
    //           if (source.includes("foundation")) {
    //             console.log("<불러온 모듈 이름>: ", identifierName);
    //           }
    //         }
    //       );

    //       parser.hooks.export.tap(this.pluginName, (statement) => {
    //         console.log("[ 컴포넌트 이름 ]: ", statement.declaration.name);
    //       });
    //     });

    // factory.hooks.parser
    //   .for("javascript/auto")
    //   .tap(this.pluginName, (parser) => {
    //     parser.hooks.export.tap(this.pluginName, (statement) => {
    //       console.log("컴포넌트 이름: ", statement.declaration.name);
    //     });
    //   });
    // });
  }

  outputCoreTracking() {
    fs.writeFileSync(
      "core-tracking-output.json",
      JSON.stringify(this.data),
      "utf8"
    );
  }
}

module.exports = MyPlugin;

/*

1. 파싱 단계 AST에서 foundation을 import 하는 AST 트리만 걸러내기
2. 걸러진 AST에서 컴포넌트 이름과 foundation이 몇 번 사용되는지 카운트

*/
