/** Mocha con Chai
Mocha.js es un completo framework de pruebas JavaScript construido tanto para el navegador como para Node.js.
 Ejecuta todas tus pruebas unitarias en serie y crea informes detallados.
  Una de las mejores características de Mocha es que te permite conectar fácilmente cualquier
  librería de aserción que quieras, tanto si estás familiarizado con las APIs de aserción de xUnit como assert.js
   u otras variantes como expect.js (usada anteriormente) y should.js, por nombrar algunas.
   En este libro, dado que tenemos requisitos de pruebas tanto síncronas como asíncronas,
   utilizaremos una API flexible o un lenguaje específico del dominio (DSL) llamado Chai.js,
    que incluye soporte para todas las API de pruebas mencionadas anteriormente.
    Should.js será fundamental a la hora de ejecutar pruebas con Promises.

Traducción realizada con la versión gratuita del traductor www.DeepL.com/Translator*/
let Mocha = require("mocha"),
  path = require("path");
// Instantiate a Mocha instance.
let mocha = new Mocha({
  ui: "bdd",
  reporter: "list",
  checkLeaks: true,
});

let testDir = "./test";

mocha.addFile(path.join(testDir, "testingrxjs.js"));

// Run the tests.
mocha.run((failures) => {
  process.on("exit", () => {
    process.exit(failures); // exit with non-zero status if there were failures
  });
});
