/**
 * Orquestador Central y Controlador de Eventos de la Aplicación (App Kernel)
 */
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar listeners del navbar con Delegación de Eventos
    document.getElementById("main-nav").addEventListener("click", (e) => {
        if (e.target.hasAttribute("data-view")) {
            UI.switchView(e.target.getAttribute("data-view"));
        }
    });

    document.getElementById("nav-logout").addEventListener("click", () => {
        localStorage.removeItem("jwt_token");
        UI.updateNavbar(null);
        UI.logConsole("Sesión destruida y credenciales revocadas del almacenamiento local.");
        UI.switchView("view-auth");
    });

    // Restaurar sesión persistente
    const savedToken = localStorage.getItem("jwt_token");
    if (savedToken) {
        UI.updateNavbar(savedToken);
        UI.logConsole("Token JWT detectado de una sesión previa activa.");
    }

    // ====== FORMULARIOS & ACCIONES EVENT DRIVEN ======

    // 1. Autenticación / Login
    document.getElementById("form-login").addEventListener("submit", async (e) => {
        e.preventDefault();
        const user = document.getElementById("login-username").value;
        const pass = document.getElementById("login-password").value;

        try {
            const result = await ApiService.login(user, pass);
            if (typeof result === 'string' && result.includes("Bearer")) {
                const token = result.replace("Bearer ", "").trim();
                localStorage.setItem("jwt_token", token);
                UI.updateNavbar(token);
                UI.logConsole("Autenticación exitosa. Token interceptado y guardado.", { token });
                UI.switchView("view-spaces");
                loadCatalog();
            } else {
                UI.logConsole("Respuesta inesperada del control de accesos: " + result);
            }
        } catch (err) {
            UI.logConsole("Fallo de red en autenticación: " + err.message);
        }
    });

    // 2. Catálogo de Espacios
    document.getElementById("btn-refresh-catalog").addEventListener("click", loadCatalog);
    
    async function loadCatalog() {
        try {
            const spaces = await ApiService.getSpaces();
            UI.logConsole("Catálogo obtenido desde el servidor backend", spaces);
            const container = document.getElementById("spaces-list");
            container.innerHTML = "";
            
            if(!spaces.length) {
                container.innerHTML = "<p class='placeholder-text'>No se registran salones activos.</p>";
                return;
            }

            spaces.forEach(s => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <h4>${s.title || 'Salón Temporal'}</h4>
                    <p style="color: var(--text-muted)">Ubicación ID: ${s.idSpace || s.id}</p>
                    <p><strong>Precio Base:</strong> $${s.price || '0.00'}</p>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 10px;" onclick="selectForReservation(${s.idSpace || s.id})">Reservar Este Espacio</button>
                `;
                container.appendChild(card);
            });
        } catch (err) {
            UI.logConsole("Error al consultar catálogo: " + err.message);
        }
    }

    // Window binding para botones dinámicos de las tarjetas
    window.selectForReservation = (id) => {
        UI.switchView("view-reservations");
        document.getElementById("res-space-id").value = id;
        UI.logConsole(`Formulario de reserva precargado con el espacio #${id}`);
    };

    // 3. Crear Reserva
    document.getElementById("form-create-reservation").addEventListener("submit", async (e) => {
        e.preventDefault();
        const dto = {
            idSpace: parseInt(document.getElementById("res-space-id").value),
            fromDate: document.getElementById("res-from").value,
            toDate: document.getElementById("res-to").value
        };

        try {
            const res = await ApiService.createReservation(dto);
            UI.logConsole("Reserva registrada con éxito en el servidor", res);
            loadReservations();
        } catch (err) {
            UI.logConsole("Error al solicitar reserva: " + err.message);
        }
    });

    document.getElementById("btn-refresh-reservations").addEventListener("click", loadReservations);

    async function loadReservations() {
        try {
            const data = await ApiService.getReservations();
            UI.logConsole("Historial de alquileres obtenido", data);
            const tbody = document.getElementById("reservations-tbody");
            tbody.innerHTML = "";

            if(!data.length) {
                tbody.innerHTML = "<tr><td colspan='4' class='text-center'>No posees alquileres salientes cargados.</td></tr>";
                return;
            }

            data.forEach(res => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>#${res.idReservation || res.id}</td>
                    <td>Salón ID: ${res.space?.idSpace || 'Asignado'}</td>
                    <td><span class="status-badge ${res.status}">${res.status}</span></td>
                    <td>
                        ${res.status === 'TENTATIVE' ? `<button class="btn btn-success" style="padding: 4px 8px; font-size: 0.8rem;" onclick="checkoutPayment(${res.idReservation || res.id})">Proceder Pago MP</button>` : ''}
                        ${res.status !== 'CANCELED' ? `<button class="btn btn-danger" style="padding: 4px 8px; font-size: 0.8rem; margin-left: 5px;" onclick="cancelRes(${res.idReservation || res.id})">Cancelar</button>` : 'Fijo'}
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (err) {
            UI.logConsole("Error al listar alquileres: " + err.message);
        }
    }

    window.checkoutPayment = async (id) => {
        try {
            const response = await ApiService.triggerCheckout(id);
            UI.logConsole("Checkout Preference creada por Mercado Pago", response);
            if (response.initPoint) {
                UI.logConsole(`Abriendo pasarela Sandbox de pagos: ${response.initPoint}`);
                window.open(response.initPoint, '_blank');
            }
        } catch (err) {
            UI.logConsole("Error en Checkout transaccional: " + err.message);
        }
    };

    window.cancelRes = async (id) => {
        try {
            await ApiService.cancelReservation(id);
            UI.logConsole(`Solicitada la baja lógica de la reserva #${id}`);
            loadReservations();
        } catch (err) {
            UI.logConsole("Error al cancelar: " + err.message);
        }
    };

    // 4. Módulo de Administración & Webhook
    document.getElementById("btn-admin-list-users").addEventListener("click", async () => {
        try {
            const users = await ApiService.adminListUsers();
            const list = document.getElementById("admin-users-list");
            list.innerHTML = "";
            users.forEach(u => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${u.username}</strong> - Rol asignado: <span style="color:var(--admin-color)">${u.rol}</span>`;
                list.appendChild(li);
            });
            UI.logConsole("Usuarios del sistema obtenidos por rol jerárquico.", users);
        } catch (err) {
            UI.logConsole("Error de privilegios de administrador: " + err.message);
        }
    });

    document.getElementById("btn-trigger-webhook").addEventListener("click", async () => {
        const payId = document.getElementById("webhook-payment-id").value;
        const payload = {
            type: "payment",
            data: { id: payId.toString() }
        };

        try {
            UI.logConsole("Inyectando notificación asíncrona de pasarela...");
            const status = await ApiService.simulateWebhook(payload);
            UI.logConsole("Webhook respondido por el Backend Server. Status 200 OK. Estado mutado asíncronamente en BD.", status);
        } catch (err) {
            UI.logConsole("Fallo al propagar webhook: " + err.message);
        }
    });
});
