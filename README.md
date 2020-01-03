# GetSetPlay

**Idiomas/Languages**:
1. [Español](#español)
2. [English](#english)


### Español

## Instalación
- Lanza el comando `npm install` o `npm i` para instalar las dependencias necesarias.
- Lanza `npm run start` para iniciar el proyecto en entorno de desarrollo. 
- Visita `http://localhost:4200/` para ver y utilizar la app.

## Concepto
Este proyecto está concebido como una forma de ayudar a músicos y otros usuarios a poder crear un setlist (listado de canciones para un concierto en directo), permitiendo añadir una serie de canciones con su nombre y duración en mm:ss, en base a una cantidad de tiempo inicial correspondiente a la duración del concierto. 

La app permite reordenar las canciones elegidas con el sistema de Drag and Drop de Angular, y avisa al usuario en cuanto queda poco tiempo restante (3 minutos) o cuando el tiempo restante no permite incluir nuevos temas. Una vez finalizado el setlist, la app ofrece una visualización del resultado final y la posibilidad de exportarlo en PDF.

Provisionalmente la app no dispone de un sistema de creación de usuarios y de login, ya que no hay operativas que requieran de guardado de datos. Si a posteriori se quisiera desarrollar un sistema de guardado de setlists, tendría sentido implementar un backend para crear usuarios.

## Arquitectura y dependencias
El proyecto está construido sobre **Angular 7** utilizando algunas dependencias adicionales:
- `Angular Material` (modales, drag and drop, etc).
- `i18n` para la traducción de la app
- Angular 2- `TextMask` v9 (@GitHub/lozjackson)

Los servicios que usa la app devuelven, en su mayoría, valores internos que maneja la propia app como objetos, strings y cómputos de tiempo en milisegundos. No se usa, por tanto (y hasta la fecha) un entorno o servidor. En gran parte, los servicios se crearon para aligerar el componente principal para facilitar su mantenimiento y desarrollo.


### English

## Installation
- `npm install` or `npm i` to install all required dependencies.
- `npm run start` to launch the project locally.
- Visit `http://localhost:4200/` to see and use the app.

## Concept
This project was conceived as a helping tool for musicians and other users when designing a live setlist, allowing them to add a number of songs with their name and duration in mm:ss, and with an initial time input matching the time that would have been granted for the concert or show. 

The app allows the reordering of songs using Angular’s Drag and Drop, and will warn the user when there is little time left (3 mins) or when the current time left cannot allow for more songs to be included. When the setlist is complete, the app offers a view of the finished list and the option to export said list in a PDF file.

The app does not currently have any user creation or login methods, because there is no flow or operative that requires storing or saving data. If the option to save setlists in the app was developed or planned, a signup and login system would make perfect sense.

## Architecture and dependencies
This proyect was built using **Angular 7** with some additional packages:
- `Angular Material` (modale, drag and drop, etc).
- `i18n` for the app’s translation
- Angular 2- `TextMask` v9 (@GitHub/lozjackson

The services used by the app mostly return values handled internally by the app such as objects, strings or time amounts in milliseconds. Thus, and as of now, no endpoint or server is used. The services were initially built to reduce the size of the main component and to make it easier to maintain and develop