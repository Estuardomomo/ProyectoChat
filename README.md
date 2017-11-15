# ProyectoChat
Chat entre dos computadoras.
1. Implementación dll
  JavaScript: =============================================
  var edge = require('edge');
  var Variable = edge.func({
    assemblyFile: "Proyect.dll",
    typeName: "Namespace.Class",
    methodName: "Method"
  });
  Variable('text input', function (error, result) {
    if(error) throw error;
    console.log(result);
});
  C# =======================================================
  public async Task<object> metodoc(object input)
  {
    string text = (string)input;
    return text;
  }
  Node.js ==================================================
  npm init, npm install, npm -g express -generator, npm install edge.js
