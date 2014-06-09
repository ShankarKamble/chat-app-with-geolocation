@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\bower\bin\bower" %*
) ELSE (
  node  "%~dp0\..\bower\bin\bower" %*
)