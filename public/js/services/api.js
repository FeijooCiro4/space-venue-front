/**
 * Capa de Servicios del Cliente HTTP (Fetch API con Interceptor Core)
 */
const ApiService = {
    getHeaders() {
        const headers = { 'Content-Type': 'application/json' };
        const token = localStorage.getItem("jwt_token");
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    },

    async request(endpoint, method = 'GET', body = null) {
        const config = {
            method: method,
            headers: this.getHeaders()
        };
        if (body) {
            config.body = JSON.stringify(body);
        }

        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url, config);
        
        // Manejo de respuestas vacías (como el 200 OK de webhooks sin body)
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        return await response.text();
    },

    login(username, passwordHash) {
        return this.request('/api/auth/login', 'POST', { username, passwordHash });
    },

    register(username, passwordHash) {
        return this.request('/api/auth/register', 'POST', { username, passwordHash });
    },

    getSpaces() {
        return this.request('/api/spaces');
    },

    createReservation(dto) {
        return this.request('/api/reservations', 'POST', dto);
    },

    getReservations() {
        return this.request('/api/reservations');
    },

    triggerCheckout(id) {
        return this.request(`/api/reservations/${id}/checkout`, 'POST');
    },

    cancelReservation(id) {
        return this.request(`/api/reservations/cancel/${id}`, 'PUT');
    },

    createSpace(dto) {
        return this.request('/api/spaces/ownedspace', 'POST', dto);
    },

    getOwnedSpaces() {
        return this.request('/api/spaces/ownedspaces');
    },

    adminListUsers() {
        return this.request('/api/usuarios');
    },

    simulateWebhook(payload) {
        return this.request('/api/v1/payments/webhook', 'POST', payload);
    }
};
