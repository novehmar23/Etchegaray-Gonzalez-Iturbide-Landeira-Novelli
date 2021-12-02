# Proyecto taller de tecnologías 2

#### Integrantes del equipo:
- Marcos Novelli - 201663
- Iñaki Etchegaray - 241072
- Martín Iturbide - 241107
- Matías González - 219329
- Gastón Landeira - 238473

#### Link al Proyecto
https://github.com/TallerTecnologias/Etchegaray-Gonzalez-Iturbide-Landeira-Novelli

#### Introducción
El proyecto consistió en implementar un token con estándar ERC-20 y utilizarlo para un sistema de votaciones. Mediante una página web se lo hizo visible en una interfaz amigable al cliente.

#### Notas
EL sistema de tokens funciona perfectamente. Sin embargo, en el sistema de votación surgieron problemas al mergear frontend con backend que debido a la falta de tiempo no se pudieron probar. Igualmente, se entrega hasta la última línea de código del proyecto, y todos los tests del sistemas de votacion pasaron satisfactoriamente.

## Documentación

### Tecnologías
Para la implementacion de esta solución utilizamos múltiples tecnologías, tanto para el sistema en si como para el desarrollo del mismo. 
Algunas de ellas son:

- Solidity - Lenguaje de programación para la implementación de los contratos inteligentes
- Truffle - Para trabajar con la EVM (Ethereum Virtual Machine)
- OpenZeppelin - Implementación del estándar ERC-20
- Metamask - Wallet para ver y manejar las accounts
- Webpack - Generador de bundles 
- Web3 -  Conjunto de librerías para interactuar con un nodo de ethereum
- Template - Para facilitar el diseño de una página agradable

Tambien utilizamos algunas herramientas para el desarrollo:

- Trello: Para tener un tablero con todas las tareas pendientes y tareas hechas
- Git y Github: Para el control de versionado del desarrollo. Tambien para tener un repositorio centralizado con el código para facil acceso de todos los miembros del equipo.
- Discord: Herramienta para la comunicacion entre el equipo
- VSCode: Fue el principal IDE utilizado.


### Flujo de trabajo
Nos dividimos en dos grupos para trabajar entre el Backend (los contracts) y el Frontend (la página web). A medida que avanzabamos con las funcionalidades se mergeaban en develop y se unía ambas funcionalidades.

El proceso de trabajo fue incremental, ya que diseñamos, desarrollamos y testeamos cada funcionalidad antes de pasar a la siguiente.

No pudimos cumplir en todo momento esta modalidad de trabajo dado que tuvimos muchos grandes bugs en los que todos los miembros del equipo trabajamos, priorizando corregir esos bugs y lograr la funcionalidad requerida.

#### Bitacora
Trabajamos con 3 bitacoras. Una de ellas individual para cada uno de los miembros donde ponemos el progreso diario de cada uno.

Luego tenemos una bitacora con los avances en Backend y Frontend, tambien lo organizamos por dia, aunque en el Backend como tuvimos muchos días sin mucho progreso al final no esta todo completo.


### Decisiones de diseño

#### Template
El equipo decidió hacer uso de un template para facilitar el manejo de frontend y tener una mejor interfaz gráfica. Este incluye sus propios archivos css y utiliza Bootstrap.

El template utilizado puede ser encontrado en el siguiente link:
  - https://templatemo.com/tm-570-chain-app-dev

Se clarifica que algunos archivos css fueron modificados para lograr utilizar objetos que se adecuen más a lo necesitado.
  
#### Flujo de la página (NavBars)
Se decidió manejar la navegabilidad de la página después del login desde el menú principal y a través de una NavBar ubicada en la parte superior de la pantalla. Al haber dos sistemas, de tokens y de votación, al loguearse en la aplicación se despliegan las dos opciones. El usuario puede cliquear en una de ellas y será re-dirigido a su menú correspondiente. Después de esto la navBar muestra las opciones del menú al cual se accedió, y no todas las opciones disponibles. Para acceder a estas se debe ir al menú del otro sistema.
Se creó así para mantener un flujo de navegación separado en partes, y para no sobrecargar la navBar de opciones.
Además, desde la navBar el usuario siempre puede salir de la aplicación mediante el botón de sign out, y será re-dirigido al index.html. cliquear en el icono de EventChain tiene las mismas consecuencias. 

#### JS Unificado
Aunque se supone que mediante plugins esto se podría dividir, la tecnología Webpack nos obligó a utilizar solo un js, ya que no fue posible hacer que el grupo los haga funcionar. Este js llamado index.js encapsula toda lógica de frontend y conexión con backend. En un diseño ideal hubiese sido óptimo separar esta lógica por html, y que cada uno tenga su js correspondiente. Sin embargo, debido a este problema el grupo no vio otra forma más que tener un archivo gigante js. Esto al menos ahorra posibles problemas de exportación entre archivos js.

#### Emisión de Tokens
Los tokens solo se emiten al realizar el deploy del contract, se definió una cantidad fija y esta es cargada en la cuenta del Owner. 
A partir de esta cuenta se hace la venta y compra de Tokens hacia las demás cuentas. De esta forma es el Owner quien tiene el control total de los tokens que se encuentran en circulación.

Tomamos la decisión de hacerlo así por cuestiones de simplificar el problema, ya que encontramos problemas al querer hacer una función para emitir nuevos tokens. Esto fue aprobado por los profesores.

#### Destrucción de Tokens
Uno de los puntos requeridos por la letra es que los tokens que sean devueltos deben ser destruidos, para mantener el equilibrio de la economía. Esto, sin embargo, se basa en la idea de que los responsables del emprendimiento puedan emitir nuevos tokens.

Como se mencionó anteriormente, nuestra solución no permite emitir nuevos tokens, sino que esta cantidad es fija. Esto resulta en un problema a la hora de destruir los tokens, ya que estos no se pueden generar nuevamente. Por lo que a la larga el número de tokens terminaría en 0 y no habría manera de revertirlo.

Entonces, evitamos destruir los tokens al ser devueltos, y estos solamente vuelven a guardarse en la cuenta del Owner. Creemos que esto no genera un problema, ya que una vez devueltos vuelven a estar en control de los responsables y, por lo tanto, no afectaría a la economía.

#### Contracts
Para la construcción de nuestro sistema, tuvimos que definir múltiples contratos, cada uno con sus responsabilidades. Estos son los contratos que utiliza nuestro sistema: 

- **EventToken:** Este es nuestro contrato principal, es el que maneja nuestro token y todas las operaciones que se pueden hacer con el mismo. Estas incluyen todas las operaciones relacionadas al estándar ERC-20, como obtener el balance o enviar tokens a otras cuentas.  
- **ConvertLib:** Este contrato ya venía definido por Truffle, el mismo contiene una única función que convierte una cantidad a otra, dado un conversionRate. Esta función nos es útil para trabajar con los decimales de nuestro Token.
- **EventVoterManager:** Este contrato contiene la lógica principal del sistema de votación, este contrato maneja la lista de todas las votaciones disponibles y permite agregar nuevas. También es donde se encuentra la lógica para votar y para dar el ganador de una votación. Este contrato referencias a EventToken y Ballot para cumplir con sus funciones.
- **Ballot:** Este contrato contiene y maneja la información de cada votación, junto con sus opciones de votos. Es utilizado por EventVoterManager para el sistema de votaciones
- **Migrations:** Este contrato venía incluido con la Truffle Box que utilizamos, su funcionalidad está orientada al manejo de las migraciones y, por lo tanto, no modificamos este contrato.
- **Structs:** Contiene structs usados para almacenar información de los ballots. Esto se utiliza en el Ballot Contract.

**Nota: Compra y Venta de Tokens**
Las operaciones relacionadas con la compra y venta de tokens así como la fijación de los precios por parte del administrador se encuentran dentro del contrato de EventToken. Sabemos que esto no es lo más correcto, ya que la esta responsabilidad debería estar en otro contrato.
En algunas versiones del desarrollo existió un contract Vendor, sin embargo, encontramos demasiados problemas para hacerlo funcionar y decidimos priorizar funcionalidad sobre diseño y terminamos embebiendo toda esa lógica en el Contract del EventToken.

### Diagrama
El diagrama muestra todos los contratos con sus operaciones y como se relacionan. Las responsabilidades de los mismos están descritas más arriba en la sección Contracts de Decisiones de Diseño.

![](https://i.imgur.com/XJGyVwO.png)

### Tests
Existe un pequeño problema con los tests del Backend, ya que al correrlos en general funcionan, pero a veces, por razones que no conocemos ni comprendemos algunos fallan sin modificar el codigo.

Dejamos una captura con todos los tests pasando de la última vez que los corrimos y recomendamos que si al probarlo falla entonces se prueben correr de nuevo.

![](https://i.imgur.com/KnR2tHi.png)


### Links de trello
Durante la codificación del proyecto, el equipo se manejó y organizó mediante tableros de Trello. Existe un historial de lo que se hizo cada día por integrante de equipo en un archivo .md llamado Bitacora, y separado por equipos en los restantes archivos.

Link Trello backlog -https://trello.com/b/bvmHjXm9/backlog

Link Trello frontend -https://trello.com/b/F2Q9XsNf/front

Link Trello backend -https://trello.com/b/qat7w19T/back