#!/bin/sh
# Chrome for Testing sin la configuracion de field trials de prueba (que activa WebMCP
# por defecto en CfT 155). Asi el flag WebMCPTesting es la unica variable.
exec "${CHROME:?CHROME=<ruta a chrome>}" --disable-field-trial-config "$@"
