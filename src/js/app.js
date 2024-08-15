document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})


function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

//Header fijo
function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){

        //Quiere decir que pasando del apartado .sobre-festival => se muestra el header fijo
        if(sobreFestival.getBoundingClientRect().bottom < 50){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
        
    });
}


//FUNCIÓN PARA UN SCROLL SUAVE
function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a'); //Selecciona todos los enlaces
        //El forEach es para utilizar todos los enlaces
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth" });
        });
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <=12; i++){
        const imagenes = document.createElement('picture');
        imagenes.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen galería">
        `;

        imagenes.onclick = function(){ 
            mostrarImagen(i);  //(Viene de la variable ${i})
        }

        galeria.appendChild(imagenes);
    }
    
}

function mostrarImagen(id){     //Lo nombramos como queremos (id)
    const imagenes = document.createElement('picture');
        imagenes.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen galería">
        `;


    //Crea el Overlay a la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagenes);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        overlay.remove()
        body.classList.remove('fijar-body');
    }

    //Botón para cerrar la imágen y quitar el overlay
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.onclick = function(){
        overlay.remove()
        body.classList.remove('fijar-body');
    }
    cerrarModal.classList.add("btn-cerrar");
    overlay.appendChild(cerrarModal);

    //Añadirlo al HTML
    const body = document.querySelector('body')
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}


