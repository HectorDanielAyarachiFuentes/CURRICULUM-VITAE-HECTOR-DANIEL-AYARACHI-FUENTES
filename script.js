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
            // Actualiza la información de educación
            const educacionList = document.querySelector("#educacion ul");
            educacionList.innerHTML = ""; // Limpiar la lista existente
            data.educacion.forEach((educacion) => {
                const li = document.createElement("li");
                li.innerHTML = `<h3>${educacion.nombre}</h3>
                                 <p>${educacion.institucion}</p>
                                 <p>${educacion.direccion || ''}</p>
                                 <p>${educacion.fecha || ''}</p>
                                 <p>${educacion.titulo || ''}</p>
                                 <p>${educacion.fecha_inicio || ''} - ${educacion.fecha_fin || ''}</p>
                                 <p>${educacion.detalle || ''}</p>`;
                educacionList.appendChild(li);
            });
            // Actualiza la sección "Experiencia Laboral"
            const experienciaLaboralList = document.querySelector("#experiencia-laboral ul");
            experienciaLaboralList.innerHTML = ""; // Limpiar la lista existente
            data.experienciaLaboral.forEach((experiencia) => {
                const li = document.createElement("li");
                li.innerHTML = `<h3>${experiencia.nombreEmpresa}</h3>
                                 <p>${experiencia.cargo}  ${experiencia.fecha}</p>
                                 <p>${experiencia.descripcion}</p>`;
                experienciaLaboralList.appendChild(li);
            });
            // Ahora, actualiza la sección del "resumen" en el HTML
            const resumenElement = document.querySelector("#resumen");
            resumenElement.innerHTML = `<h2>${data.resumen.titulo}</h2>
            <p><br>${data.resumen.contenido}</p>
            <ul>
                <li><strong>Nacionalidad:</strong> ${data.resumen.detalles.Nacionalidad}</li>
                <li><strong>DNI:</strong> ${data.resumen.detalles.DNI}</li>
                <li><strong>Fecha de Nacimiento:</strong> ${data.resumen.detalles["Fecha de Nacimiento"]}</li>
                <li><strong>Estado Civil:</strong> ${data.resumen.detalles["Estado Civil"]}</li>
                <li><strong>Edad:</strong> ${data.resumen.detalles.Edad}</li>
            </ul>`;
            
            // Actualiza la información de habilidades
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




            // Para descargar en formato PDF

    function downloadPDF() {
        // Load print-optimized CSS
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'print-style.css';
        link.media = 'all';

        // Clone the body and apply the print stylesheet
        var body = document.body.cloneNode(true);
        body.appendChild(link);
        
        var opt = {
            margin:       [15, 15, 15, 15],
            filename:     'CV-Hector Daniel-Ayarachi Fuentes.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(body).set(opt).save();
    }
