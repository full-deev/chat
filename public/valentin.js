// valentin.js

document.getElementById('palabraForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const palabraInput = document.getElementById('palabraInput').value.trim().toLowerCase();
    const imagenContenedor = document.getElementById('imagenContenedor');
    const mensajeContenedor = document.getElementById('mensajeContenedor');

    // Limpiar contenido anterior
    imagenContenedor.innerHTML = '';
    mensajeContenedor.innerHTML = '';

    if (!palabraInput) {
        mensajeContenedor.innerHTML = '<p>Por favor, ingresa una palabra.</p>';
        return;
    }

    if (palabraInput === 'ratona') {
        mensajeContenedor.innerHTML = '<p>¡Feliz San Valentín, Yadii! 🐭💖 Que el amor te rodee siempre y tu corazón brille con la luz más hermosa. ¡Que cada día sea tan dulce como este!</p>';

        const imagen1 = crearImagen('ratona/uno.jpg', 'Imagen Ratona', '600px', '500px');
        const imagen2 = crearImagen('ratona/dos.jpg', 'Imagen Ratona 2', '600px', '500px');
        const imagen3 = crearImagen('ratona/cuatro.jpg', 'Imagen Ratona 3', '800px', '300px');

        imagenContenedor.append(imagen1, imagen2, imagen3);

        setTimeout(() => {
            pedirNombreYMostrarChat(); // Mostrar chat luego de imágenes
        }, 500);
    } else if (palabraInput === 'chocolates') {
        mensajeContenedor.innerHTML = '<p>¡Feliz San Valentín, Brii! 🌍💌 El amor no tiene fronteras y el corazón siempre encuentra su camino. Que este día esté lleno de felicidad y magia romántica.</p>';

        const imagen1 = crearImagen('extra/uno.jpg', 'Imagen Uno', null, '550px');
        const imagen2 = crearImagen('extra/dos.jpg', 'Imagen Dos', '400px', '550px');

        imagenContenedor.append(imagen1, imagen2);
    } else {
        mensajeContenedor.innerHTML = '<p>¡Feliz San Valentín! 💖 No importa lo que digas, lo importante es celebrar la amistad que nos une. ¡Que tengas un día lleno de cariño y alegría! Besoooos ♥</p>';

        const imagen1 = crearImagen('predet/uno.jpeg', 'Imagen Predeterminada', '400px', '300px');
        const imagen2 = crearImagen('predet/dos.jpeg', 'Imagen Predeterminada 2', '400px', '300px');

        imagenContenedor.append(imagen1, imagen2);
    }
});

function crearImagen(src, alt, width, height) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.classList.add('imagen', 'aparecer');
    if (width) img.style.width = width;
    if (height) img.style.height = height;
    return img;
}

function pedirNombreYMostrarChat() {
    const username = prompt('Ingresa tu nombre para conversar:');
    if (!username) return;

    mostrarChatPopup(username);
}

function mostrarChatPopup(username) {
    const existingPopup = document.querySelector('.chat-popup');
    if (existingPopup) return; // Evita duplicados

    const socket = io();

    const chatPopup = document.createElement('div');
    chatPopup.className = 'chat-popup';
    chatPopup.innerHTML = `
        <div class="chat-header">💬 Chat San Valentín</div>
        <div class="chat-messages" id="chatMessages"></div>
        <form id="chatForm">
            <input type="text" id="chatInput" placeholder="Escribe un mensaje..." autocomplete="off" />
            <button type="submit">Enviar</button>
        </form>
    `;
    document.body.appendChild(chatPopup);

    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            socket.emit('chat message', {
                username,
                message
            });
            chatInput.value = '';
        }
    });

    socket.on('chat message', (data) => {
        const msg = document.createElement('div');
        msg.textContent = `${data.username}: ${data.message}`;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}
