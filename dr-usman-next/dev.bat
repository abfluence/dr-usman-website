@echo off
cd /d "%~dp0"
IF "%PORT%"=="" (
  node node_modules\next\dist\bin\next dev --port 4321
) ELSE (
  node node_modules\next\dist\bin\next dev --port %PORT%
)
