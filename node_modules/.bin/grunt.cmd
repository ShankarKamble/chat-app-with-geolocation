@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\grunt-cli\bin\grunt" %*
) ELSE (
  node  "%~dp0\..\grunt-cli\bin\grunt" %*
)