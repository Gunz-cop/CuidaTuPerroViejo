#!/usr/bin/env bash
set -euo pipefail
# Ejecutar desde la raíz del repositorio; requiere FFmpeg con drawtext/libx264.
base=docs/contenido/incontinencia-urinaria-perros-mayores/imagineart
ffmpeg -nostdin -y -loop 1 -t 3 -i "$base/originales/materiales.png" \
  -t 10 -i "$base/originales/video.mp4" \
  -loop 1 -t 5 -i "$base/originales/final-video.png" \
  -filter_complex_script "$base/montaje.ffmpeg.txt" -map '[v]' -an -r 25 \
  -c:v libx264 -crf 23 -preset fast -pix_fmt yuv420p -movflags +faststart \
  public/images/blog/incontinencia-urinaria-perros-mayores/tutorial-descanso-seco-imagineart-v1.mp4
