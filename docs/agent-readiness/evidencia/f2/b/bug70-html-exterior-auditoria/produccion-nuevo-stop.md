# Producción F2: nueva ejecución detenida por #71

El correctivo #70 conserva aceptación técnica PASS R2/5 y la SDD PASS R2/2. Su publicación se comprobó antes de admitir una copia EXEC nueva y finita, con autorización explícita vigente del dueño. `main` y el deployment siguen en d2bd; el helper documental no se despliega.

La ejecución real resolvió 1.129 IDs: 849 respuestas HTTP validadas y 280 N/A. La siguiente GET /gracias respondió HTTP200 y falló el hash estricto heredado. Quedan 154 IDs nunca intentados; el fallo añade una respuesta, para 850 HTTP totales. No se reintentó ni continuó la matriz. P01/P02 no pasan y P03 conserva cero scans. El primer STOP de #70 permanece separado e intacto.

La captura de /gracias coincide exactamente con el build existente de d2bd. El hash del plan corresponde al asset antiguo, cuyo único cambio es el nombre del CSS. El inventario offline encontró el mismo delta en /politica-de-cookies y /politica-de-privacidad, que no se solicitaron a producción. Es un hueco de baseline y alcance contractual: la SDD70 permitía corregir el corpus canónico, índice y CSS, conservando los hashes nativos externos. El validador ejecutó ese contrato correctamente.

Se abrió [bug #71](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/71), con propuesta acotada: congelar los tres assets nativos independientes y actualizar únicamente sus expectativas GET bajo revisión arquitectónica separada; mantener comparación exacta y comprobar las expectativas estáticas restantes offline. No extender el fragmento exterior a nativos, aprender del servidor o eliminar hashes. No se modifica nuevamente la SDD70 ratificada ni se declara una revisión R3 de su correctivo.

Los archivos JSON de esta entrega publican conteos, hashes y procedencia. El sello completo, cuerpos, fragmento de tracking, trazas y listas operativas permanecen privados. La publicación es documental en rama separada y no activa otro plan ni autoriza deploy.
