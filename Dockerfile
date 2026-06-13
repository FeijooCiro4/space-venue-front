# Usamos el servidor web Nginx basado en Alpine Linux por su alta velocidad y bajo peso
FROM nginx:alpine

# Copiamos la carpeta 'public' que contiene toda nuestra estructura estática compilada
# hacia la ruta por defecto donde Nginx sirve contenido web
COPY ./public /usr/share/nginx/html

# Exponemos el puerto de red estándar 80
EXPOSE 80

# Al arrancar el contenedor se ejecuta automáticamente el comando nativo de Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
