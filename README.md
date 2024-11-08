1) LO PRIMERO EN LO QUE SE PIENSA ES EN SEPARAR COMPONENTES Y FUNCIONALIDADES TENIENDO EN CUENTA QUE EN ESTE JUEGO DE TRIQUI SE TIENEN LOS SIGUIENTES REQUISITOS: 
1. TABLERO CON 9 CELDAS
2. DOS JUGADORES, UNO X OTRO 0, que se turnan
3. determinar un ganador
4. opcion para reiniciar el juego

componentes principales identificados: 
    App: punto de partida de la aplicacion. Dentro de un provider ejecuto mi componente GameBoard
    GameBoard:Renderiza el tablero del juego, con valores iniciales y con los cambios transcurridos.
    Square: crea cada celda del tablero como un boton, inicialmente tiene el valor de NULL 

funcionalidades identificadas.
     manejador del estado: gestion del tablero, turno de los jugadores y el ganador. El contexto de estado global del juego se maneja en el componente GameContext


2) Estructura de la aplicacion
        1. App.js: se define el componente App como el punto de entrada principal
        2. se envuelve la aplicacion con un GameProvider que gestiona el contexto de estado global del juego. 
        3. se incluye el componente GameBoard que manejara la interfaz del tablero

3) Gestion del estado global con Context
        se maneja el estado del juego de forma centralizada y se simplifica el flujo de datos entre componentes por medio de Context API.

        GameContext.jsx
        1. creacion del contexto: 
            const GameContext = createContext(); se crea para manejar el estado global del juego
        2. definicion del estado inicial:
            se define el estado inicial const initialState que tiene un array de 9 elementos con valores NULL. el array se almacena en la variable board y quedaria
            board: [NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL];
            Se define el jugador inicial por medio de una funcion randon que se almacena en la variable currentPlayer
            Se define la variable winner como NULL

        3. creacion de un reducer (gameReducer):
        aca se define como el estado cambia basado en la acciones MAKE_MOVE y RESET
        En la accion MAKE_MOVE primero se verifica si hay ganador o si el elemento del array en board ya tiene un valor asignado. Si tiene valor asignado entonces se retorna el state sin ningun cambio y no se hace nada PERO si esas dos codiciones no se cumplen entonces quiere decir que en ese espacio del array habia un NULL y lo siguiente es crear una variable newBoard donde se extrae el valor de board, con slice se crea una copia. 
        En la siguiente linea se le asigna a newBoard en la posicion index el valor de state.currentPlayer  que corresponde al jugador que en ese momento dio click al espacio vacio en el tablero de triqui.
        Se retorna el nuevo estado, en la parte ...statese esta creando un nuevoobjeto que copia todas las propiedades del estado actual (state), asegura que cualquier dato en el estado que no cambie mantenga su valor. 
        la sigunte linea alterna el jugador para dar paso al siguiente.
        con winner se hace un llamado a una funcion para identificar si hubo un ganador con esa jugada.

        El case RESET inicializa los valores del estado con initialState

        4. Proveedor del Contexto: 
            GameProvider envuelve los componentes hijos y proporciona el estado y las funciones de dispatch para actualizarlo

4) creacion del componete del tablero GameBoard:
        - Se representa visualmente el tablero de 3x3
        - uso del contexto: se accede al estado global (state) y a la funcion para despachar acciones (dispatch) usando el hook useGame()
        - Rendeizado del tablero: Se utiliza un div con un display grid para mostrar las celdas (squares)
        - cada celda se representa como un componente separado que puede recibir clics
        - manejo de clics: cuando un usuario hace click en alguna celda se llama a la funcion:  const handleSquareClick = (index) => {
        dispatch({ type: "MAKE_MOVE", index });
    };
    aca se despacha una accion MAKE_MOVE y un indice que corresponde a la casilla a la que se le dio click
        - estado del juego: Muestra el turno del jugador actual y si la jugada fue ganadora muestra el mensaje del jugador que gano.

5) Creacion de celdas (square): en este componente se representa cada celda del tablero. Recibe VALUE el valor de la celda X o 0 o NULL y una funcion onClick para manejar click. Este componente es el responsable de mostrar un valor en la celda o una celda vacia
