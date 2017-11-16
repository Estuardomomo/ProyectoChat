//Crear metodos que utillicen la dll
var edge = require('edge');
var constraseña;
var ruta;

var Cifrar = edge.func({
  assemblyFile: "Libreria.dll",
  typeName: "Libreria.Sdes",
  methodName: "Cifrar"
});
var Descifrar = edge.func({
    assemblyFile: "Libreria.dll",
    typeName: "Libreria.Sdes",
    methodName: "Descifrar"
  });
  var Comprimir = edge.func({
    assemblyFile: "Libreria.dll",
    typeName: "Libreria.Huffman",
    methodName: "HComprimir"
  });
  var Descomprimir = edge.func({
    assemblyFile: "Libreria.dll",
    typeName: "Libreria.Huffman",
    methodName: "HDescomprimir"
  });
Cifrar('Texto a cifrar', function (error, result) {
  if(error) throw error;
  console.log(result);
  contraseña = result;
});
Descifrar(contraseña, function (error, result) {
    if(error) throw error;
    console.log(result);
  });
Comprimir('Archivo.txt', function (error, result) {
    if(error) throw error;
    console.log(result);
    ruta = result;
  });
Descomprimir(ruta, function (error, result) {
    if(error) throw error;
    console.log(result);
  });