document.addEventListener("DOMContentLoaded", function () {
    // URL del JSON (reemplaza con la ubicación real del JSON)
    const jsonURL = "hector.json"; // Cambia la ubicación del archivo JSON según sea necesario

    // Realiza una solicitud para cargar el JSON
    fetch(jsonURL)
        .then((response) => response.json())
        .then((data) => {
            // Almacena los datos del JSON en localStorage
            localStorage.setItem("userData", JSON.stringify(data));

            // Actualiza los elementos HTML con los detalles del usuario
            document.querySelector(".titulo-usuario").textContent = data.usuario.nombre;
            document.querySelector(".bio-usuario").textContent = data.usuario.bio;

            // Actualiza la información de dirección
            const direccionElement = document.querySelector(".menu-perfil li:nth-child(1) a");
            direccionElement.textContent = `Mi Dirección: ${data.direccion.contenido}`;
            direccionElement.href = data.direccion.enlace;

            // Actualiza la información de la ciudad
            const ciudadElement = document.querySelector(".menu-perfil li:nth-child(2) a");
            ciudadElement.textContent = `Mi Ciudad: ${data.ciudad.contenido}`;
            ciudadElement.href = data.ciudad.enlace;

            // Actualiza la información del teléfono
            const telefonoElement = document.querySelector(".menu-perfil li:nth-child(3) a");
            telefonoElement.textContent = `Mi Teléfono: ${data.telefono.contenido}`;
            telefonoElement.href = data.telefono.enlace;

            // Actualiza la información del correo electrónico
            const correoElectronicoElement = document.querySelector(".menu-perfil li:nth-child(4) a");
            correoElectronicoElement.textContent = `Mi Correo Electrónico: ${data.correoElectronico.contenido}`;
            correoElectronicoElement.href = data.correoElectronico.enlace;

            // Actualiza la imagen de avatar
            const avatarImg = document.querySelector(".avatar-perfil img");
            avatarImg.src = data.avatar.imagenURL;
            avatarImg.alt = `Avatar de ${data.usuario.nombre}`;

            // Actualiza los enlaces de las redes sociales y el nombre
            document.querySelector(".social-buttons .facebook a").href = data.redesSociales[0].enlace;
            document.querySelector(".social-buttons .facebook .btn-name").textContent = data.redesSociales[0].nombre;

            document.querySelector(".social-buttons .whatsapp a").href = data.redesSociales[1].enlace;
            document.querySelector(".social-buttons .whatsapp .btn-name").textContent = data.redesSociales[1].nombre;

            document.querySelector(".social-buttons .linkedin a").href = data.redesSociales[2].enlace;
            document.querySelector(".social-buttons .linkedin .btn-name").textContent = data.redesSociales[2].nombre;

            document.querySelector(".social-buttons .email a").href = `mailto:${data.email.direccion}`;
            document.querySelector(".social-buttons .email .btn-name").textContent = "Email";

            // Actualiza la experiencia laboral
            const experienciaLaboralList = document.querySelector("#experiencia-laboral ul");
            experienciaLaboralList.innerHTML = ""; // Limpiar la lista existente

            data.experienciaLaboral.forEach((experiencia) => {
                const li = document.createElement("li");
                li.innerHTML = `<h3>${experiencia.nombreEmpresa}</h3>
                                <p>${experiencia.cargo} | ${experiencia.fecha}</p>
                                <p>${experiencia.descripcion}</p>`;
                experienciaLaboralList.appendChild(li);
            });

 // Actualiza la educación
const educacionList = document.querySelector("#educacion ul");
educacionList.innerHTML = ""; // Limpiar la lista existente

data.educacion.forEach((educacion) => {
    const li = document.createElement("li");
    li.innerHTML = `<h3>${educacion.nombreUniversidad || educacion.nombreEscuela}</h3>
                    <p>${educacion.tituloUniversitario || educacion.gradoEscolar}`;
    
    if (educacion.fechaGraduacion) {
        li.innerHTML += ` | ${educacion.fechaGraduacion}`;
    }

    li.innerHTML += `</p>`;
    educacionList.appendChild(li);
});




            // Actualiza las habilidades
            const habilidadesList = document.querySelector("#habilidades ul");
            habilidadesList.innerHTML = ""; // Limpiar la lista existente

            data.habilidades.forEach((habilidad) => {
                const li = document.createElement("li");
                li.textContent = habilidad;
                habilidadesList.appendChild(li);
            });
        })
        
        .catch((error) => {
            console.error("Error al cargar el JSON:", error);
        });
});
