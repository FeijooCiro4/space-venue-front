/**
 * Configuración de Entorno Global para la API Gateway de Space & Venue
 * Resuelve automáticamente la URL base dependiendo del host de despliegue.
 */
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8080'
    : 'https://space-venue-api.onrender.com'; // Inyectar URL de Render/AWS en producción

console.log(`[Config] Ecosistema apuntando a: ${API_BASE_URL}`);
