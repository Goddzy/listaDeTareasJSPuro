let tareaInput = document.getElementById('tareaInput');
let tareaAgregada = document.getElementById('tareaAgregada');
let formulario = document.getElementById('formulario');
let botonAgregarPestania = document.getElementById('botonAgregar');
let botonQuitarPestania = document.getElementById('botonQuitar');
let botonEditarPestania = document.getElementById('botonEditar');
let listaPestanias = document.getElementById('listaPestanias');
let listaTareas = [];
let pestanias = {}
let pestaniaSeleccionada = ''

//funciones para agregar/editar/borrar/cargar tareas
let agregarTarea = (e) => {
    e.preventDefault();
    if (tareaInput.value.trim()) {
        if (!pestanias[pestaniaSeleccionada]) {
            Swal.fire('Error', 'Agregue una pestaña antes de añadir una tarea', 'error').then(() => {
                tareaInput.value = '';
            });
            return;
        }
        pestanias[pestaniaSeleccionada].push(tareaInput.value);
        cargarTareas();
        tareaInput.value = '';
    }
};
      let borrarTarea = (posicion)=>{
        Swal.fire({
            title: "¿Borrar tarea?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Borrar",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
                pestanias[pestaniaSeleccionada].splice(posicion,1);
                cargarTareas()
              Swal.fire({
                title: "Hecho!",
                text: "Tarea borrada",
                icon: "success"
              });
            }
          });
      }
      let editarTarea = (posicion) => {
        Swal.fire({
            title: 'Editar tarea',
            input: 'text',
            inputValue: pestanias[pestaniaSeleccionada][posicion],
            inputPlaceholder: 'Ingrese la nueva tarea',
            inputAttributes: {
                maxlength: 30, // Limitar la longitud máxima del texto a 40 caracteres
            },
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            showLoaderOnConfirm: true,
            preConfirm: (value) => {
                if (value.trim() && value !== '') {
                    pestanias[pestaniaSeleccionada].splice(posicion, 1, value);
                    cargarTareas();
                } else {
                    Swal.showValidationMessage('Por favor, ingrese una tarea válida');
                }
            },
        });
    };
    

 let cargarTareas = () => {
     tareaAgregada.innerHTML = '';
     pestanias[pestaniaSeleccionada].forEach((tarea, posicion) => {
         tareaAgregada.innerHTML += `
         <div class="container">
         <div class="row tarea-container align-items-center">
             <div class="col-12 col-md-3">
                 <!-- Checkbox -->
                 <input type="checkbox">
             </div>
             <div class="col-12 col-md-7">
                 <!-- Texto -->
                 <div class="descripcion-tarea mb-3 mt-1">
                     <span class="fs-5">${tarea}</span>
                 </div>
             </div>
             <div class="col-12 col-md-2">
                 <!-- Botones -->
                 <div class="d-grid gap-2">
                     <button class="btn btn-danger" onClick="borrarTarea(${posicion})">
                         <i class="fa-solid fa-trash"></i>
                     </button>
                     <button class="btn btn-warning" onClick="editarTarea(${posicion})">
                         <i class="fa-solid fa-pen-to-square"></i>
                     </button>
                 </div>
             </div>
             <hr class="col-12 mt-1">
         </div>
     </div>
     
      `;
     });
 };
 formulario.addEventListener('submit', agregarTarea);


//funciones para agregar/editar/borrar/cargar pestañas
let verificarPestanias = ()=>{
    if(Object.keys(pestanias).length> 0){
        botonQuitarPestania.classList.remove('disabled')
        botonEditarPestania.classList.remove('disabled')
    }else{
        botonQuitarPestania.classList.add('disabled')
        botonEditarPestania.classList.add('disabled')
    }
}

verificarPestanias()

let agregarPestania = () => {
    Swal.fire({
        title: 'Agregar pestaña',
        input: 'text',
        inputPlaceholder: 'Ingrese el nombre de la pestaña',
        inputAttributes: {
            maxlength: 15, // Limitar la longitud máxima del texto a 15 caracteres
            style: 'text-align: center;'
        },
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
            if (value.trim() && value !== '') {
                let nuevaPestania = document.createElement('li');
                nuevaPestania.classList.add('nav-item', 'mx-2');
                nuevaPestania.innerHTML = `
                    <a class="nav-link">${value}</a>
                `;
                // Restaurar el estilo predeterminado de las pestañas
                const pestaniasAntiguas = document.querySelectorAll('.nav-link');
                pestaniasAntiguas.forEach((pestania) => {
                    pestania.classList.remove('selected');
                });

                // Establecer la nueva pestaña como seleccionada
                nuevaPestania.querySelector('.nav-link').classList.add('selected');
                // Estilos para mostrar las pestañas en línea
                nuevaPestania.style.display = 'inline-block';
                nuevaPestania.style.marginRight = '10px'; // Espacio entre las pestañas

                listaPestanias.appendChild(nuevaPestania);
                pestanias[value] = [];
                pestaniaSeleccionada = value;
                //habilitar los botones para editar y borrar pestañas
                verificarPestanias()
                nuevaPestania.querySelector('.nav-link').addEventListener('click', () => {
                    const pestanias = document.querySelectorAll('.nav-link');
                    pestanias.forEach((pestania) => {
                        pestania.classList.remove('selected');
                    });
                
                    // Agregar la clase 'selected' solo a la pestaña seleccionada
                    pestaniaSeleccionada = value;
                    tareaAgregada.innerHTML = '';
                    cargarTareas();
                    nuevaPestania.querySelector('.nav-link').classList.add('selected');
                });
            } else {
                Swal.showValidationMessage('Por favor, ingrese un valor válido para la pestaña');
            }
        },
    });
};



let quitarPestania=()=>{
    //objeto que solo hice para poder mostrar las opciones
    let pestaniasParaBorrar = []
        for(let clave in pestanias){
            pestaniasParaBorrar[clave] = clave
        }    
    Swal.fire({
        title: 'Borrar pestaña',
        input: 'select',
        inputOptions: pestaniasParaBorrar,
        inputPlaceholder: 'Borrar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Borrar',
        showLoaderOnConfirm: true,
        preConfirm: (selectedOption) => {
          if (!selectedOption) {
            Swal.showValidationMessage('Debes seleccionar una opción');
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          let selectedValue = result.value;
          delete pestanias[selectedValue]
          //elimina las tareas de la pestaña
          tareaAgregada.innerHTML= ''
          //eliminar de manera visual la pestaña
           listaPestanias.innerHTML = '';
          //verifica si existen pestañas para "disablear" el botón
          verificarPestanias()
        // Vuelve a cargar las pestañas después de borrar
        for (let pestania in pestanias) {
            listaPestanias.innerHTML += `
                <li class="nav-item mx-2">
                    <a class="nav-link">${pestania}</a>
                </li>
            `;
        }
        }
      });
      listaPestanias.addEventListener('click', (event) => {
        const selectedTab = event.target.closest('.nav-link');
        if (selectedTab) {
            const allTabs = document.querySelectorAll('.nav-link');
            allTabs.forEach((tab) => {
                tab.classList.remove('selected');
            });
            selectedTab.classList.add('selected');
            pestaniaSeleccionada = selectedTab.textContent.trim(); // Actualiza la pestaña seleccionada
        }
        cargarTareas();
    });
}

let editarPestania=()=>{
    console.log('desde editar pestania')
}
botonAgregarPestania.addEventListener('click', agregarPestania);
botonQuitarPestania.addEventListener('click', quitarPestania);
botonEditarPestania.addEventListener('click', editarPestania);