# Calendario de Notas

Aplicación web simple para gestionar notas por meses utilizando JavaScript y localStorage.

## Funcionalidades

- Visualización de los 12 meses del año.
- Indicador de cuántas notas tiene cada mes.
- Visualización de todas las notas creadas, donde se indica el mes donde se creo y el título de la nota.
- Crear notas.
- Editar notas.
- Eliminar notas.
- Listar todas las notas.
- Limpiar todo el calendario.
- Persistencia de datos usando localStorage.

## Estructura del proyecto

index.html → calendario de meses.  
mes.html → gestión de notas de un mes.  

css/styles.css → estilos globales de los dos html.

js/app_index.js → lógica del calendario.
js/app_mes.js → lógica de las notas.

## Uso

1. Abrir index.html.
2. Seleccionar un mes para introducir notas.
3. Crear notas.
4. Las notas se guardan automáticamente en localStorage.
5. Puedes editar y eliminar cada nota.