// three slashes is a special syntax telling typescript to import the file
// we also specified outfile in tsconfig.json to output everything to bundle.js
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />
/// <reference path="components/project-item.ts" />

namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
