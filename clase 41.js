//Definimos constante para indicar el numero de niveles del juego
const ULTIMO_NIVEL = 10;
//Declaramos la clase Juego
class Juego {
    constructor() {
        this.inicializar();
        this.generarSecuencia();
        setTimeout(this.siguienteNivel, 500)
    }
    // Metodo de inicializar atributos de la clase
    inicializar() {
        //Obtenemos los elementos del DOM y los asignamos a variables
        const celeste = document.getElementById('celeste');
        const violeta = document.getElementById('violeta');
        const naranja = document.getElementById('naranja');
        const verde = document.getElementById('verde');
        this.inicializar = this.inicializar.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.toogleBtnEmpezar();
        this.nivel = 1;
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }
    //Metodo para quitar y asignar la clase hide al boton empezar
    toogleBtnEmpezar(){
        //Adicionamos la clase css "hide" al boton empezar
        debugger
        const btnEmpezar = document.getElementById('btnEmpezar');
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        }else{
            btnEmpezar.classList.add('hide');
        }
    }
    //Metodo para generar secuencia de numeros que representan los colores a iluninar
    generarSecuencia() {
        //Creamos un array de 10 posiciones que va crear numeros del 1 al 3
        //Esta secuencia de colores a iluminar
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subnivel = 0;
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            //Secuencia de ejemplo [0,1,3,2,2,1,0,3,3,1]
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => {
                console.log(color);
                this.iluminarColor(color)
            }, 1000 * i);

        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light');
        setTimeout(() => {
            this.apagarColor(color)
        }, 350);

    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick() {
        console.log('Quien es this en metodo agregarEventosClick() ', this)
        /* var self = this;
        this.colores.celeste.addEventListener('click', this.elegirColor.bind(self));
        this.colores.verde.addEventListener('click', this.elegirColor.bind(self));
        this.colores.violeta.addEventListener('click', this.elegirColor.bind(self));
        this.colores.naranja.addEventListener('click', this.elegirColor.bind(self)); */

        /* Otra forma de realizar el cambio de contexto this
        this.colores.celeste.addEventListener('click', this.elegirColor.bind(this));
        this.colores.verde.addEventListener('click', this.elegirColor.bind(this));
        this.colores.violeta.addEventListener('click', this.elegirColor.bind(this));
        this.colores.naranja.addEventListener('click', this.elegirColor.bind(this)); */

        //Otra forma de escribir la asignación inicializando el this en la función inicializar
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);

    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
    }

    elegirColor(ev) {
        console.log('Objeto click del color: ', ev);
        console.log('Quien es this en metodo eligirColor() ', this);
        const nombreColor = ev.target.dataset.color;
        console.log('Nombre color seleccionado', nombreColor);
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if (numeroColor === this.secuencia[this.subnivel]) {
            console.log('numero color selecionado', numeroColor);
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick();
                if (this.nivel === ULTIMO_NIVEL + 1) {
                    this.ganoElJuego();
                } else {
                    setTimeout(this.siguienteNivel, 1500);
                }
            }
        } else {
            this.perdioElJuego();
        }
    }

    ganoElJuego() {
        swal('Simon Dice', 'Felicitaciones, ganaste el juego', 'success').then(this.inicializar)
    }

    perdioElJuego(){
        swal('Simon Dice', 'Lo lamentamos, perdiste :(', 'error').then(()=>{
            this.eliminarEventosClick();
            this.inicializar();
        })
    }


}

//Declaración de función empezarJuego() para iniciar el simon dice
function empezarJuego() {
    window.juego = new Juego()
}