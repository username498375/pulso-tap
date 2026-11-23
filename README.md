# Pulso Tap

Aplicación web ligera que estima la **frecuencia cardíaca** a partir de toques de pantalla sincronizados con el pulso.

## Funcionamiento

1. Localiza el pulso radial con dos dedos.
2. Toca el botón grande una vez por cada latido durante 15–30 segundos.
3. Desde el cuarto toque se muestra una estimación, calculada con la mediana de los últimos 12 intervalos.
4. Pulsa **Terminar** para fijar el resultado o **Reiniciar** para repetir.

Los toques separados por menos de 250 ms se ignoran; las pausas superiores a 2,5 segundos reinician la medición. Avisa cuando la cadencia es variable.

**No es un dispositivo médico.** La frecuencia depende de la precisión manual y no sirve para detectar arritmias ni descartar sepsis u otras enfermedades. Con pulso irregular, cuenta durante 60 segundos. Los datos se procesan localmente y no se almacenan ni se transmiten.

## Publicar en GitHub Pages

En el repositorio, abre **Settings → Pages → Build and deployment**, selecciona **Deploy from a branch**, rama **main**, carpeta **/ (root)** y pulsa **Save**.

Luego abre https://username498375.github.io/pulso-tap/ en el navegador móvil.

Puedes añadirla a la pantalla de inicio desde el menú de Chrome. El service worker guarda los recursos necesarios para su uso sin conexión tras una primera visita correcta.

## Desarrollo

Sin dependencias, compilación, servidor ni API. Abre `index.html` en un navegador para probarla localmente. Para probar el modo offline en desarrollo:

```bash
python3 -m http.server 8000
```

Visita http://localhost:8000 en el mismo equipo.

## Archivos

- `index.html`: interfaz y cálculo.
- `manifest.webmanifest`: metadatos de instalación.
- `sw.js`: caché offline.
- `icon.svg`: icono vectorial.
- `LICENSE`: licencia MIT.
