/**
 * Utilidades de Interfaz de Usuario y Manipulación Dinámica del DOM
 */
const UI = {
    switchView(viewId) {
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active-view');
        });
        const target = document.getElementById(viewId);
        if(target) target.classList.add('active-view');
    },

    logConsole(message, obj = null) {
        const consoleBox = document.getElementById("console-output");
        if (!consoleBox) return;
        
        let timestamp = new Date().toLocaleTimeString();
        let logLine = `[${timestamp}] ${message}`;
        if (obj) {
            logLine += `
📦 Estructura JSON:
${JSON.stringify(obj, null, 2)}`;
        }
        
        consoleBox.innerText = logLine + "───────────────────────────────────" + consoleBox.innerText;
    },

    updateNavbar(token) {
        const elements = {
            login: document.getElementById("nav-login"),
            logout: document.getElementById("nav-logout"),
            reservations: document.getElementById("nav-my-reservations"),
            owner: document.getElementById("nav-owner-spaces"),
            admin: document.getElementById("nav-admin"),
            userInfo: document.getElementById("user-info")
        };

        if (token) {
            elements.login.style.display = "none";
            elements.logout.style.display = "inline-block";
            elements.reservations.style.display = "inline-block";
            elements.owner.style.display = "inline-block";
            elements.userInfo.style.display = "inline-block";
            elements.admin.style.display = "inline-block"; // Visible para testing arquitectónico

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                elements.userInfo.innerText = `👤 ${payload.sub}`;
            } catch (e) {
                elements.userInfo.innerText = "👤 Usuario Autenticado";
            }
        } else {
            elements.login.style.display = "inline-block";
            elements.logout.style.display = "none";
            elements.reservations.style.display = "none";
            elements.owner.style.display = "none";
            elements.userInfo.style.display = "none";
            elements.admin.style.display = "none";
        }
    }
};
