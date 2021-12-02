## BITACORA

### DIA 1 - 21/10/2021

#### Iñaki
El dia de hoy instale las dependencias necesarias para empezar el trabajo:
- Truffle
- Extensiones en VSCode
- Unpack con Web3

Y pude correr el proyecto base y conectarlo con la wallet de prueba en la red local.

Ademas, clone el proyecto y agregue los archivos base en main:
- .gitignore
- README
- La bitacora

Por ultimo deje seteado el tablero de trello con la primera gran iteracion: crear el Token.
El link de acceso public en Trello se encuentra en el README.

#### Gaston Landeira
El dia de hoy instale lo necesario para el inicio del proyecto mencionadas arriba. Ademas se definieron las condiciones de trabajo con el profesor.

#### Martín Iturbide
Hoy instale las herramientas y tecnologias mencionadas, necesarias para inicar el proyecto. Pude conectarlo con la wallet de metamask de la red local y hacer algunas pequeñas primeras pruebas.

#### Marcos Novelli
Punteo de cosas que realicé en el día:
- Instalación correcta de truffle (globalmente)
- Creación de init correcta
- Verificación de funcionamiento de lo generado con el init
- Insalo correctamente el webpack
- Error en el truffle develop
- Encontré que el problema era la versión del node.js que tenía descargada. Me habia bajado el node v.17.0.1 (Current) y me tendría que haber bajado la versión v.16.13.0 (LTS)
- Desinstalo y vuelvo a instalar el node.js pero la versión v.16.13.0
- Instale el truflle, webpack (le hago el develop, compilo, migrate, ejecuto el dev de la app, le hago el test en el develop y ejecuto el build de la app). Funciona todo ok
- Por ultimo, veo el correcto funcionamiento del contrato a través de localhost:8080 e ingreso con mi cuenta de metamask. Todo ok.

#### Matias Gonzalez

Al ser el primer dia lo principal fue instalar todas las dependencias necesarias para trabajar en el obligatorio.

Ademas de instalar truffle yo personalmente al utilizar las IDEs de JetBrains tuve que buscar como utilizar solidity en ellos, que IDE usar, que plugins instalar para tener todo funcionando correctamente.

Por ultimo hicimos un slack para el grupo que nos puede facilitar a la hora de comunicarnos con los profesores.

### DIA 2 - 28/10/2021

#### Marcos Novelli
El día de hoy, en base al archivo obtenido en la clase pasada:
- Instalé el zeppelin (se utilizó el ERC20 para nuestra moneda)
- Modifiqué la versión del solidity a 0.8.0
- Implementé el constructor y la función "getBalance"
- Verifiqué en el localhost:8080 ingresando con la cuenta de metamask y todo ok
- Agregué el address de este nuevo contrato (importando el token en metamask)
- Verifiqué que ya se dispone de esta nueva moneda creada

#### Iñaki
Hoy hice el unbox del webpack en el proyecto nuestro en GitHub, admitiendo asi su versionado.

Instale la dependencia de openzeppelin para poder hacer uso de su interfaz IERC20 y sus funciones para un token ERC20 de acuerdo a las especificaciones del obligatorio.

Luego logramos hacer funcionar la aplicacion ejemplo obteniendo el balance de una cuenta pero con la implementacion de openzeppelin (ERC20) con todos los integrantes del grupo.

Verifique poder agregar la moneda META de prueba en la wallet de Metamask.

Finalmente cree un issue en github que describe un problema con la funcion sendCoin del contrato que se debe solucionar la proxima vez que nos juntemos a trabajar.

#### Gaston Landeira
Hoy dimos comienzo real al proyecto ya que instalando openzepeling se creo nuestra criptomoneda con standard ERC-20. Esto se dio en una instancia grupal en la computadora de un companero y despues lo replique en la mia sin ningun problema. Durante esta instalacion individual continuamos en llamada para brindarnos ayuda mutuamente con problemas que podian surgir, como por ejemplo que se utilice el comando networks y no network o, que se debia escribir en la consola npm install tanto en el paquete del codigo como de la app para instalar todas las dependencias. 
Por ahora el programa solo puede obtener acceso a la cantidad de monedas que poseo en la cuenta de metamask. 

#### Martín Iturbide
Hoy estuvimos trabajando sobre el código del webpack box de Truffle, estuve analizando todos los archivos para comprender las funcionalidades basicas que vienen incluidas. Logramos crear nuestro token ERC20 utilizando las librerias de OpenZeppelin para crear un contrato. Logre ejecutar la aplicacion y ver mi balance del token que creamos. Tambien comence a trabajar en la funcionalidad de enviar tokens sin exito, trabajaremos sobre eso en la proxima sesion de trabajo.

#### Matias Gonzalez

El objetivo del dia de hoy fue comenzar con el codigo del verdadero proyecto. Instalamos la libreria de node de openzepellin de la cual luego utilizamos la interfaz ERC20 para comenzar la implementación de nuestro token. Esto nos dio algunos errores pero en el transcurso del dia se pudo solucionar logrando que le funcionase a todos los integrantes la conexion del nuevo token a la plataforma de MetaCoin implementada en el ejemplo de unbox.

### DIA 3 - 04/11/2021

#### Todos
Realizamos la division de responsabilidades entre los integrantes del grupo, luego de asegurarnos que todos estabamos en el mismo punto.
- Frontend
    - Marcos
    - Gaston (Trello)
    - Iñaki
- Backend
    - Mati
    - Martin (Trello)
#### Martin Iturbide
Trabajamos en equipo para solucionar los errores que teniamos y comezamos a dividirnos tareas. Estuve investigando más en profundidad la interfaz de OpenZepelling de ERC20 para poder continuar trabajando en el Backend.

#### Matías González
Primero solucionamos algunos errores que estaba teniendo en grupo a la hora de correr el proyecto y ver su balance. Luego dividimos responsabilidades dentro del grupo separandonos en front y backend. Como backend decidimos centraros primero en completar las funcionalidades basicas del token antes de enfocarnos en el conjunto.

#### Iñaki Etchegaray
Asisti con el resto de los companeros para que todos puedieramos alcanzar al mismo punto. Logre arreglar el envio de monedas e hice el cambio del nombre al nombre provisorio "EventCoin".

#### Marcos Novelli
El día de hoy, en base al archivo obtenido en la clase pasada:
- Solucionamos errores en conjunto
- Nos dividinos en dos grupos: fronten y backend
- Con el grupo de frontend comenzamos a discutir futuros lineamientos en términos generales

#### Gaston Landeira
El dia de me surgieron problemas de inicio del proyecto que ya habian sido solucionados, fui asistido por mis companeros y en poco tiempo ya todos alcanzamos el mismo punto. Posteriormente nos dividimos las tareas y se comenzo con la discusion del frontend.

### DIA 4 - 11/11/2021

#### Iñaki Etchegaray
Ayude a definir las tareas en el Trello del Frontend. Intentamos hacer funcionar un template para la aplicacion de puro html-css pero no pudimos. Retrocedi a intentar hacer funcionar CSS en webpack comun, pero no se logro realizarlo. Se intentara nuevamente y, de ultima, nos enfocaremos en hacer algo funcional y luego en la apariencia.

#### Marcos Novelli
El día de hoy, con el equipo de frontend:
- Discutimos sobre las interfaces gráficas planteadas con mirada del fututro desarrollo de front
- Agregamos tarjetas al trello para organizar las futuros pasos a seguir
- Estuvimos tratando de solicionar un un error al intentar utilizar una template. No nos reconoce el css. 
- Después de pasado el horario de clase, nos juntamos con el equipo de back a poder solucionar ese mismo error y no lo pudimos 
- 
Por ultimo, documente el cambio en Avance_Front y el cambio de estados del tablero en Trello.


#### Martin Iturbide
El día de hoy estuve trabajando en el Backend de la aplicacion, trabajamos sobre el tablero de trello de Backend organizando las tareas a realizar y funcionalidades necesarias.
Una vez hecho esto estuvimos intentando crear un pequeño faucet para generar tokens, con el objetivo a futuro de poder utilizarlo cuando se vendan los tokens a los usuarios, sin embargo no logramos hacer que funcionara y tras una discusion con los profesores decidimos descartar la idea y para el futuro trabajar con una cantidad de tokens fija.
De todas formas, investigando para hacer la funcionalidad mencionada pude profundizar mas en la implementacion de ERC20 de OpenZeppelin y comprenderla mejor, asi que si bien no tuvimos mucho progreso en el backend considero que fue muy beneficioso.

#### Gaston Landeira
Dia frustrante para el equipo de frontend que no pudo aplicar ningun template a el. Decidimos enfocarnos en las funcionalidades antes que lo bonito pero, no se quiere dejar tan de lado el aspecto estetico de esta. Por otro lado al backend parece irle bien.

#### Matías González
    El equipo de backend se enfocó principalmente en la funcionalidad de emisión, intentando la creación de un faucet e investigando sobre las funciones ya existentes dentro de openZepellin. Se perdió un poco de tiempo ya que en un comienzo se creia que por "emisión" se referia a un faucet que se encargue de la creación de nuevos tokens pero luego de hablarlo más en detalle nos dimos cuenta que esto no era correcto y que con una cuenta a la que se le asignen las monedas al comienzo era suficiente.

### DIA 5 - 23/11/2021

#### Iñaki Etchegaray
Ayude al equipo en buscar una solucion al problema que habia con el template y aplicado de estilos a las paginas en el frontend. Una vez solucionado, me concentre en realizar la pagina de Login y Landing con el equipo de Frontend.

Se consiguio realizar una pagina de login pero que necesita trabajo en funcionalidad y algo de contenido. Me encargue de postear un issue relacionado al Login y de asignarme a solucionarlo.

Luego, junto con el equipo, decidimos las tareas que faltaban realizarse para terminar la primera mitad del trabajo. Estas fueron planteadas y divididas entre los integrantes del frontend.

Por ultimo, reorganice el tablero de trello, manteniendolo al dia con las nuevas tareas encontradas y asignadas al equipo de Frontend. Ademas, realice la bitacora de avances del Frontend en los dias 11/11 y el dia de hoy con sus imagenes respectivas sobre el avance de los tableros.

#### Martín Iturbide
Dedique parte del tiempo a indagar un poco mas en la documentacion de OpenZeppelin y a investigar por Internet pensando en solucionar algunos bugs que teniamos que logramos resolver y tambien en la gran funcionalidad que nos queda pendiente, el sistema de votacion.

Tambien estuvimos con el equipo de Backend trabajando en la funcionalidad de compra y venta de EV.

#### Gaston Landeira
Se pidio ayuda al equipo de backend y porfin pudimos resolver el problema del template. Acto siguiente nos volvimos a dividir, y todos los integrantes del frontend definimos un plan de menus e hicimos un html en comun, el main, para usar como ejemplo a la hora de dividirnos.

#### Marcos Novelli
El día de hoy:
- Participé de la discusión con los de fronted de los próximos pasos a seguir.
- Creé la base de lo que sería la pantalla de "Exchange".
- Agregué en el nav bar el balance de la cuenta de metamask que estoy loggeado.
- Agregué en el nav bar el botón de log out.
- Hice la pantalla "Market".
- No pude hacer funcionar el redirect.

#### Matías González
Comenzamos a investigar como realizar la compra y venta de tokens en solidity. Probamos unas primeras versiones de metodos a traves de un Vendor contract. Se investigó también como realizar las pruebas en solidity pero al tener metodos que no funcionaban adecuadamente no era posible saber si las pruebas fueron hechas correctamente.

### DIA 6 - 24/11/2021

#### Iñaki Etchegaray
Hoy intente lograr la separacion de los JS, trabajando con webpack e implementando librerias con NPM para distintos plugins. El proceso fue muy lento y honestamente frustrante, estuve cerca de lograr hacerlo funcionar instalando versiones viejas de paquetes. Pero al final no se pudo lograr una buena separacion de archivos.

Una vez concluido eso, me encarge de completar la pantalla principal y sus links hacia las otras pantallas. Tambien me ocupe de escribir el contenido de las páginas principal y de landing para que sea un poco mas estetica.

Luego, mientras el equipo se encargaba de la última página, fui a realizar las conexiones de la funcionalidad del backend con el frontend. El proceso fue fácil y no hubo mucho problema.

Una vez terminado eso, consulte con el backend sus avances y cuando frontend terminó la última página intentamos vincular la ultima funcionalidad de backend con lo realizado con frontend. La funcionalidad no se dio.

Finalmente, trabaje con el equipo en preparar la presentacion y la demo de lo avanzado.

#### Martín Iturbide
Continue trabajando sobre la implementacion de un Vendor Contract, encargado de la funcionalidad de compra-venta de tokens con eth. Creemos que esta terminada pero no hemos tenido tiempo para probarlo con el frontend y hemos estado haciendo test para estas funcionalidades, sin embargo encontramos algunas dificultades para hacer estos tests asi que no pudimos terminar de testearlo.
Tambien estuve trabajando sobre los test del contract de EV. Ya que la ultima vez realizamos muchos cambios que rompieron esos tests y arregle algunos para que todo siga funcionando correctamente.

Finalmente, me uni al resto del equipo para trabajar en la presentacion y la demo de lo trabajado hasta hoy.

#### Gaston Landeira
Realize el html de visualizar tokens de usuarios y lo integramos con el backend. Despues hicimos una retrospectiva de lo trabajado y preparamos la presentacion.

#### Marcos Novelli
El día de hoy:
- Partipé en la reunión de pre organización de la presentación. 
- Implemente el .js de la pantalla "Exchange" .

#### Matías González
Se continuó experimentando con el Vendor contract intentando hacer funcionar los metodos de buy y sell tokens. Luego de repetidas etapas de prueba y error creemos que el error se encuentra en que el contrato vendor no esta utilizando la address correcta. Investigaremos más al respecto. Finalmente hicimos una retrospectiva del trabajo junto con una presentación para mostrar en clase.

### DIA 7 - 25/11/2021

#### Gaston Landeira
Hoy fue un dia de arreglos. Separe una rama TradingHotfixes para probar solo en el html trading de que el texto al pasar por la plantilla se vuelva blanco, y lo consegui. Ademas se agrego el id de la cuenta arriba del balance en la navbar. Queda propagarlo a todas los demas html.

#### Iñaki Etchegaray
El dia de hoy me ocupe de realizar la funcionalidad faltante del Administrador de la pagina. Realice la pagina e hice las funciones que conectarian con el backend en si. La pagina fue completada satisfactoriamente.

#### Matías González
Finalmente en backend decidimos trasladar los metodos buy y sell del vendor al contrato principal del token ya que creemos será más facil tener un control sobre las addresses utilizadas, ademas de un más facil acceso a la address _owner, la cual se asigna en el constructor del token.

### DÍA 8 - 30/11/2021
#### Iñaki Etchegaray
Hoy partícipe de la decisión de los últimos pasos para terminar el frontend de la página. Se decidieron sobre varias páginas distintas de la funcionalidad de votos. Luego de unos errores técnicos y de coordinación por parte del grupo, me ocupe en avanzar en lo que podía.

Realice la página principal de la sección de votos. Además, ajuste el contenido de la página de principal y la principal de votos también. Hice todas las redirecciones asociadas a los botones en la navbar. Una vez terminada la página, ajuste el tablero Trello.

Luego, una vez terminado esto, me dedique a realizar la página de creación de votos. Siguiendo los prototipos hechos, creo que llegue a un resultado placentero. Su único problema es un botón que está mal alineado y que decidí dejar como issue para arreglar luego. Los IDs de los inputs fueron posicionados, solo falta hacer conexión con el backend.

Finalmente, me ocupé de realizar los avances de la bitácora de frontend, además de los avances faltantes del día 25/11.

#### Marcos Novelli
El día de hoy:
- Desglosé en el trello las tareas restantes para el front creando checklists en tarjetas.
- Creé la base de la página "myBallots"
- Creé la tabla de myBallots en él .js. Se hace en él .js y con determinada manera para que se pueda reutilizar en otras situaciones simplemente cambiando los valores de los headers y de los elementos a agregar. No se utiliza bootstrap por inconvenientes en incorporar clases dentro del js. Sí no hay problema en usarlo dentro del html, pero al querer usarlo en la creación de elementos en el js se complica (porque bootstrap usa jQuery y no se referencia al mismo desde el js). Eventos de visualización por ejemplo el mouseover o el mouseout son creados también en él .js al momento de refreshear la tabla.
- Creé los detalles de la ballot seleccionada
- Incorporé evento de doble click en la fila de la tabla
- Hice funcional el doble click para mostrar los detalles del ballot seleccionado. Se crean variables de prueba en el js que posteriormente serán migrados hacia el back.

#### Matías González
Hoy no fue un día muy productivo. Fue un día en el que estuve constantemente enfrentándome con errores en la transacción buyTokens, probando cambios en el contrato, en el js, no logro encontrar que es lo que causa estas excepciones. Teniendo problemas para debuggear solidity. Investigaré más al respecto del error mostrado en consola para ver los próximos pasos a seguir a la hora de encontrar una solución.

#### Gastón Landeira
Hoy no fue un día productivo. La idea era esparcir los cambios visuales a todos los demás html, pero, se me fue imposibilitado debido a un fallo en el cargador de mi herramienta de trabajo (laptop). Delegue esta tarea a mis colegas que lo implementaron de manera perfecta. 

#### Martín Iturbide
Hoy estuve trabajando en las funcionalidades de administrador, para modificar los precios de compra y venta de nuestro token con relación a Eth. Encontré algunos problemas que no pude resolver, tampoco encontré casi información relacionada con mi problema al hacer una búsqueda por distintos foros y páginas de Internet, así que decidí dejarlo de momento y pasar a otra cosa.
Continué con la funcionalidad de cobrar una comisión por transferencia de tokens entre usuario, esto fue muy fácil de realizar y ya está completamente funcional.
Dedique los últimos momentos del día a trabajar en intentar fixear el bug relacionado con la compra-venta de tokens que no hemos podido solucionar, pero no logre ningún avance significativo.

### DÍA 9 - 01/12/2021

#### Iñaki Etchegaray
Hoy me encargue de ir cerrando mis responsabilidades en el front end. Luego de hablar con los integrantes, quedo claro los pasos a seguir. Como quedaban pocas tareas por completar, decidi pasarme a ayudar al backend en las funcionalidades restantes por realizar.

Asi me pase para el backend y empece a investigar solidity y como funciona nuevamente. Una vez que indague lo suficiente, me ocupe de empezar a realizar las funcionalidades del contrato inteligente responsable por las votaciones.

Luego de un largo dia de trabajo, quedaron codificadas (pero no testeadas) las funcionalidades de votar, agregar votaciones y acceder a todas las votaciones o por address.
#### Marcos Novelli
El día de hoy:
- Agregué la opción de poder cerrar una papeleta de votación (dentro de "myBallots"). Esto va de la mano con el agregado de la columna "status" que toma valores de "open" cuando está habilitada para votar, "closed" cuando la votación está vencida y "destroyed" cuando el usuario cierra la votación. 
- Creé la pagina de visualización de todos las papeletas de votación (allBallots).
- Cambié la visualización (en allBallots) de los detalles de opciones de votación a tarjetas verticales.
- Implementé todo lo competente a myBallots y allBallots en él .js
- Arreglé todas las referencias
- Agregué la función de votar en allBallots

#### Matías González
Después de horas trabajando sobre el buyTokens, el día de hoy fue logrado solucionar esos errores y el funcionamiento correcto del mismo. Este error se encontraba dentro de sellTokens por lo cual ahora ambos métodos quedan finalmente terminados. Por último me comuniqué con la parte del equipo que se encontraba avanzando en el sistema de votaciones para hablar algunas dudas y estar al tanto de como venían.

#### Gastón Landeira
Después de moverme a una nueva estación de trabajo, hoy se realizó una reunión entre el equipo de front para decidir detalles en el diseño del sistema de votos. En consecuencia se pasó un integrante de front a backend, ya que estos necesitaban ayuda, y con Marcos Novelli fuimos implementando lo faltante de front. Se finalizó el día con todas las funcionalidades terminadas de myBallots y allBallots.

#### Martín Iturbide
Hoy termine la funcionalidad de cambiar los precios de compra-venta de tokens, que ya está 100% funcional. Continúe el día intentando arreglar las funciones de buy-sell tokens, y aunque hice algunos avances no pude solucionarlo completamente. 
Termiine el día haciendo una revision de lo que falta por hacer y testeando que todo lo que hemos hecho hasta ahora funcione. 

### Día 10 - 02/12/2021

#### Matías González
Nada más comenzar el día de hoy recordé que mi bitácora no se encontraba al día, por lo cual primero que nada decidí updatear los días faltantes.

#### Gastón Landeira
Hoy se tiene que terminar el proyecto. Trabaje en mejorar los aspectos visuales de allBallots y algún que otro bug. Después me sumergí en cualquier trabajo faltante que necesitase el equipo en general solucionar para dar como finalizado el proyecto.

#### Martín Iturbide
Hoy es el ultimo día de trabajo, mi tarea principal fue escribir la documentacion final del proyecto asi como actualizar las bitacoras. Tambien he estado ayudando en el Backend a solucionar algunos errores para la version final del proyecto
