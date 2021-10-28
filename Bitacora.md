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

### DIA 1 - 28/10/2021

#### Marcos Novelli
El día de hoy, en base al archivo obtenido en la clase pasada, relicé lo siguiente:
- Instalación del zeppelin (se utilizó el ERC20 para nuestra moneda)
- Modificación de la versión del solidity a 0.8.0
- Implementación del constructor y la función "getBalance"
- Verificación en el localhsot:8080 ingresando con la cuenta de metamask y todo ok
- Agregué el address de este nuevo contrato (importando el token en metamask)
- Verificación de que ya se dispone de esta nueva moneda creada
