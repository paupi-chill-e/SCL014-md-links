# Seeker Rat

## Índice

* [1. ¿Qué es Seeker Rat?](#1-¿Qué-es-Seeker-Rat?)
* [2. Instalación](#2-Instalación)
* [3. Flujo de Trabajo](#3-Flujo-de-trabajo)
***

## 1. ¿Qué es Seeker Rat?

![portada](https://raw.githubusercontent.com/paupi-chill-e/SCL014-md-links/master/img/portada.jpg)

Seeker Rat, es una línea de comando (CLI) que permite encontrar archivos con extensión "md" (Markdown). Estos archivos normalmente contienen _links_ (vínculos/ligas) que muchas veces están ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.
Con la ayuda de Seeker Rat, esta tarea se hace más fácil, ya que buscará y te entregará la siguiente información:
* HREF (El link)
* Title (El texto en donde se encuentra)
* FILE (El archivo donde está)
* Status (Booleano que devuelve 'Okidoki' o 'Fail' dependiendo del estado del link)
* Código del estado (Petición HTTP que devuelve el código del estado del link)

## 2. Instalación

Para la instalación se necesita ingresar lo siguiente a la terminal:

~~~
$ npm install seeker-rat 
~~~
Una vez instalado se ejecuta con el siguiente comando:

~~~
$ seeker-rat ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
~~~

## 3. Flujo de Trabajo

Para el flujo de trabajo se realizó un diagrama de flujo:

![diagrama](https://raw.githubusercontent.com/paupi-chill-e/SCL014-md-links/master/img/diagrama.png)


---
Creado por Paula Frías Navarro
