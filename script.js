document.addEventListener("DOMContentLoaded", function () {
    // URL del JSON (reemplaza con la ubicación real del JSON)
    const jsonURL = "hector.json"; // Cambia la ubicación del archivo JSON según sea necesario
    // Elemento donde se mostrarán los detalles del usuario
    const userDetailsContainer = document.querySelector(".contenedor-perfil .datos-perfil");

    // Realiza una solicitud para cargar el JSON
    fetch(jsonURL)
        .then((response) => response.json())
        .then((data) => {
            // Almacena los datos del JSON en localStorage
            localStorage.setItem("userData", JSON.stringify(data));

            // Actualiza los elementos HTML con los detalles del usuario
            document.querySelector(".titulo-usuario").textContent = data.usuario.nombre;
            document.querySelector(".bio-usuario").textContent = data.usuario.bio;
            document.querySelector(".menu-perfil li:nth-child(1) a").textContent = `Mi Dirección: ${data.direccion.contenido}`;
            document.querySelector(".menu-perfil li:nth-child(2) a").textContent = `Mi Ciudad: ${data.ciudad.contenido}`;
            document.querySelector(".menu-perfil li:nth-child(3) a").textContent = `Mi Teléfono: ${data.telefono.contenido}`;
            document.querySelector(".menu-perfil li:nth-child(4) a").textContent = `Mi Correo Electrónico: ${data.correoElectronico.contenido}`;
            
            // Actualiza los enlaces de los elementos HTML
            document.querySelector(".menu-perfil li:nth-child(1) a").href = data.direccion.enlace;
            document.querySelector(".menu-perfil li:nth-child(2) a").href = data.ciudad.enlace;
            document.querySelector(".menu-perfil li:nth-child(3) a").href = data.telefono.enlace;
            document.querySelector(".menu-perfil li:nth-child(4) a").href = data.correoElectronico.enlace;

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
        })
        .catch((error) => {
            console.error("Error al cargar el JSON:", error);
        });
});
