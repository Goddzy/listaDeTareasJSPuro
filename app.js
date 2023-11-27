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
                maxlength: 40, // Limitar la longitud máxima del texto a 40 caracteres
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
             <div class="col-8 col-md-9">
                 <div class="descripcion-tarea">
                     <input type="checkbox">
                     <span class="display-">${tarea}</span>
                 </div>
             </div>
             <div class="col-4 col-md-3">
                 <div class="d-grid gap-2">
                     <button class="btn btn-danger" onClick="borrarTarea(${posicion})">
                         <i class="fa-solid fa-trash"></i>
                     </button>
                     <button class="btn btn-warning" onClick="editarTarea(${posicion})">
                         <i class="fa-solid fa-pen-to-square"></i>
                     </button>
                 </div>
             </div>
             <hr class="mt-1"></hr>
         </div>
     </div>
      `;
     });
 };
 formulario.addEventListener('submit', agregarTarea);


//funciones para agregar/editar/borrar/cargar pestañas
let agregarPestania = () => {
    Swal.fire({
        title: 'Agregar pestaña',
        input: 'text',
        inputPlaceholder: 'Ingrese el nombre de la pestaña',
        inputAttributes: {
            maxlength: 15, // Limitar la longitud máxima del texto a 40 caracteres
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
                    <a class="nav-link mx active">${value}</a>
                `;
                listaPestanias.appendChild(nuevaPestania);
                pestanias[value] = [];
                pestaniaSeleccionada = value;

                nuevaPestania.querySelector('.nav-link').addEventListener('click', () => {
                    pestaniaSeleccionada = value;
                    tareaAgregada.innerHTML = '';
                    cargarTareas();
                });
            } else {
                Swal.showValidationMessage('Por favor, ingrese un valor válido para la pestaña');
            }
        },
    });
};

let quitarPestania=()=>{
    console.log('desde quitar pestania')
}

let editarPestania=()=>{
    console.log('desde editar pestania')
}
botonAgregarPestania.addEventListener('click', agregarPestania);
botonQuitarPestania.addEventListener('click', quitarPestania);
botonEditarPestania.addEventListener('click', editarPestania);