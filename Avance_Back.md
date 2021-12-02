# Backend

### 11/11/2021
Se empezo creando un tablero de Trello con las siguientes tareas:

![image info](./images/backend/initial_backend.png)

Sin embargo, nos dimos cuenta que de esas tareas iniciales, varias ya se encontraban hechas. Algunas porque la propia implementacion de OpenZeppeling ya trae muchas funcionalidades que podemos utilizar y otras por los progresos que hicimos los primeros dias trabajando todo el equipo junto.

Entonces el estado paso a este:

![image info](./images/backend/11-Nov.png)

Conmenzamos a trabajar en la funcionalidad de emitir un Token pero luego de no lograr hacerla funcionar y por feedback de los profesores, decidimos descartar tal funcionalidad y quedarnos con un sistema basico que genere una cantidad fija de tokens al comenzar y no se puedan emitir nuevos.

Esto hizo que el progreso del dia fuera muy poco, pero nos dio la oportunidad de investigar un poco más ERC20 y como funciona. El objetivo para el proximo dia de trabajo será implementar la funcionalidad que falta y volver a hacer una revision de los requerimientos para encontrar mas funcionalidades en las que debemos trabajar.


### 24/11/2021
Continuamos trabajando sobre las funcionalidades del contract del token, corroborando que al conectarlo con el frontend todo se mantenga funcionando. 
Tambien, empezamos a trabajar en un Vendor contract, encargado de comprar y vender tokens, sin embargo no pudimos terminar de hacerlo funcionar.

Hemos hecho tambien algunas investigaciones respecto a el sistema de votacion, en el que estaremos trabajando la proxima semana

### 29/11/2021
El trello de esta semana comienza en este estado:
![image](https://user-images.githubusercontent.com/57157637/144485844-b0eb0e1e-141e-45fe-9c16-9d1d4746651e.png)

Se agregaron al To Do las funciones relacionadas al sistema de votacion y tambien la funcionalidad de cobro de comision por tokens. Y tenemos In Progress las funciones de BuyTokens y SellTokens, que comenzamos la semana pasada pero aun no hemos logrado resolver los bugs y por aun no funciona. Nos centraremos en solucionar estos problemas y comenzar a trabajar en el sistema de votacion.

### 01/12/2021
Esta semana hemos logrado terminar con las funcionalidades de compra y venta de tokens. También implementamos la funcionalidad de cobro de comisiones por transferencia y hemos comenzado con la ultima etapa del backend, el sistema de votacion.
Hay una funcionalidad, de cambiar el precio de compra-venta de tokens que no esta en Trello, ya que se hablo y Martín comenzo a trabajar en ella directamente, por lo que nunca la anotamos.

Este es el estado del Trello en este momento:
![image](https://user-images.githubusercontent.com/57157637/144485875-0c83dacd-caff-466a-ad20-d3bb37ffa52f.png)

Las dos funcionalidadades que se encuentran In Progress estan casi acabadas y creemos que la ultima no debería tomar demasiado tiempo. Tambien, tenemos que trabajar en arreglar algunos test y agregar nuevos ya que resolver todos los bugs que hemos encontrado ha hecho que tengamos que reducir el tiempo de dedicacion a crear tests.

### 02/12/2021
El día de hoy logramos terminar las funcionalidades definidas en el backend. El principal trabajo que estamos desarrollando ahora es conectar esas funciones con el frontend y asegurarnos que todo funcione, asi como tambien terminar de agregar algunos tests extra para asegurarnos que tenemos una buena cobertura del codigo y los casos bordes.

Este es el resultado final del Trello, con toda las tareas terminadas:
![image](https://user-images.githubusercontent.com/57157637/144504656-bde46196-d792-47ad-9eed-dec69011a17e.png)

Creemos que, todas las funcionalidades fueron implementadas y funcionan correctamente.
