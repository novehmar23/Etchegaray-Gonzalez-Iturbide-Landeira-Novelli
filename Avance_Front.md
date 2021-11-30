### Front End

### 11/11/2021
Se empezo creando un tablero de Trello con las siguientes tareas:
![image info](./images/frontend/Initial_Frontend.png)

Decidimos empezar buscando un Template, luego a este template le aplicariamos cambios para acercarnos a nuestros prototipos deseados. De esta manera, aprenderiamos Web3 y de paso armariamos el login juntos para luego poder hacer las otras pantallas por separado.

Sin embargo, cuando empezamos a aplicar el template, nos saltaron muchos errores y nos dimos cuenta que primero debiamos hacer funcionar los estilos en webpack.

Se intento durante el resto del dia poder hacer funcionar los estilos en webpack, pero no se pudo lograr el cometido. Quedo subido un issue al respecto.

El estado final del Trello fue el siguiente:
![image info](./images/frontend/11-Nov.png)

### 18/11/2021
Se continuo intentando hacer funcionar el template. Pero fue una pared de errores. El equipo se vio reducido por factores externos como entregas de otras materias.
No se pudo concretar ni solucionar los errores relacionados al funcionado de las paginas de estilos en Webpack.

El tablero de trello no tuvo modifcaciones.

### 23/11/2021
Luego de muchas entregas, el equipo se puso de vuelta en marcha para avanzar en el proyecto.

El primer tema grande por resolver era el del template y del aplicado de estilos en Webpack. Para esto, el equipo entero (Front y Back) se pusieron en marcha para resolver el problema. Decidimos incluir al Backend en el problema ya que era algo que sabiamos que tenia que solucionarse lo antes posible, creemos que una pagina con un buen look aporta mucho a la usabilidad, incluso si no es funcionalidad pura y dura. Aun asi, estabamos prontos para dejar de lado el problema si consumia demasiado tiempo.

El tablero de Trello, en este momento, se veia asi:
![image info](./images/frontend/23-Nov-1.png)

La estrategia dio frutos ya que la solucion fue encontrada por un miembro del equipo de Backend, fueron de mucha ayuda y nos puso en marcha en realmente implementar las paginas.

Luego de solucionar el problema y de encontrar un template bueno, el tablero se veia asi:
![image info](./images/frontend/23-Nov-2.png)

Empezamos inmediatamente con la tarea de realizar el Login juntos, para poder establecer las bases e ideas comunes a todas las paginas. El avance fue bueno y el template fue muy util. Se establecio una pagina de Login que funciona como Landing Page para informacion basica sobre la aplicacion. El login, luego, seria filtrado por Metamask. La pagina fue terminada, pero quedo con un issue registrado en Github.

Luego de terminada la pagina de Login, el grupo se ocupo de dividir el resto de las pantallas para esta primera mitad del trabajo. Se tuvo que agregar nuevas tareas al tablero de Trello, pero ya estabamos trabajando en paralelo y de manera eficiente:
![image info](./images/frontend/23-Nov-3.png)
GL: Gaston Landeira, S: Iñaki Etchegaray y Marcos Novelli con su foto, los miembros del Frontend.

La pagina relacionada al Exchange de Tokens avanzo mucho, con algunas cosas por verse para concretar su funcionamiento.

Fue un dia muy productivo que permitio avanzar mucho al equipo.

### 24/11/2021
Hubieron cientos de avances hoy, dado que el template ya no era un problema, nos concentramos en implementar las paginas. Antes de ir a trabajar con eso, sin embargo, se intento separar los archivos js en distintos archivos js.

Despues de intentar mucho con webpack, agregando distintos loaders y plugins de versiones nuevas y anteriores, no logramos separar los archivos js, ya que no era posible conseguir la informacion obtenida en el primer HTML. Por lo tanto, no tuvimos otra que componer toda la funcionalidad en un mismo archivo js y consultar a la blockchain cada vez que se queria utilizar una funcionalidad que requiera la blockchain.

Luego de resolver eso, se comenzo a implementar las paginas. El trello este dia comenzo asi:
![image info](./images/frontend/24-Nov-1.png)

El equipo se enfoco en cada uno terminar una pagina respectivamente:
[image info](./images/frontend/24-Nov-2.png)

Cada página quedo implementada con los botones, los inputs y la estética deseada, la resolución fue sumamente rapida. Luego solo quedaba una pantalla para completar la primera funcionalidad grande. Dos integrantes del equipo se encargaron de implementar esa ultima pagina mientras otro se encargaba de implementar las funcionalidades prontas del backend con el frontend.

Progreso del tablero en este tiempo:
[image info](./images/frontend/24-Nov-3.png)
[image info](./images/frontend/24-Nov-4.png)
[image info](./images/frontend/24-Nov-5.png)
[image info](./images/frontend/24-Nov-6.png)

Finalmente el tablero quedo de la siguiente manera:
[image info](./images/frontend/24-Nov-7.png)

Las implementaciones con el backend eran simples y fueron rapidas. Una vez terminada la ultima pantalla, el equipo se junto con backend para ver avances.

Luego de ver los avances de backend, se vio de empezar a implementar la ultima gran funcionalidad de la primera parte del proyecto: el Exchange. Esta funcionalidad aun no estaba pronta del backend. Igual se decidio vincular las funcionalidades para tener eso pronto:
[image info](./images/frontend/24-Nov-8.png)

Aun así, no se dio por terminada la tarea ya que las cosas del backend aun no estaban prontas. Para el próximo día, se decidió definir las tareas para la segunda gran funcionalidad.

### 25/11/2021
Luego de presentar los avances del proyecto, el equipo de frontend se encargo de seguir avanzando y corregir algunas cosas anotadas en la presentacion.

Se agrego en el header de la pagina, un label que indica la cuenta ingresada presentemente. Ademas, se arreglo unos errores de formato en la muestra del balance de la cuenta. Ademas, se arreglaron unos bugs visuales de las cartas en Exchange. Falta hacer este arreglo en las cartas de las otras paginas.

Estas pequeñas tareas no fueron anotadas en el Trello, pero fueron realizadas por Gastón Landeira.

Luego se decidio realizar una pagina nueva para el Admin de la aplicacion (los dueños de la empresa), los cuales pueden adaptar el precio de la moneda Event Token. Se agrego la tarea al trello y fue asignada:
[image info](./images/frontend/25-Nov-1.png)

Durante el resto del dia, se logro realizar la funcionalidad del Admin.
[image info](./images/frontend/25-Nov-2.png)

Los avances no fueron enormes, pero fueron sustanciales.

### 30/11/2021
El equipo de frontend discutio los pasos siguientes a tomar. Dado que el backend aun esta intentando hacer funcionar las partes de la moneda en si, el frontend decidio seguir trabajando en las pantallas restantes. Luego, una vez terminados, el equipo de frontend puede juntarse al de backend para lograr concluir las funcionalidades.

En un principio, se definieron las tareas restantes para las funcionalidades de Voting:
[image info](./images/frontend/30-Nov-1.png)

Luego el equipo se tomo un descanso para luego empezar a trabajar. Lamentablemente, algunos de los miembros tuvieron problemas tecnicos y nos tuvimos que separar en el trabajo por realizar. Cada uno se iba a asignar la pantalla deseada y la realizaria.

La primera asingacion fue realizada:
[image info](./images/frontend/30-Nov-2.png)

Y completada al rato, para luego realizar otra asignacion:
[image info](./images/frontend/30-Nov-3.png)

Pero esto siguio con otros integrantes asignandose y avanzando cuando podian: