$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
try {
    $listener.Start()
    Write-Host "PapusBank Localhost corriendo en http://localhost:8080"
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        
        $urlPath = $req.Url.LocalPath
        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        
        # Remove query strings if any
        if ($urlPath.Contains("?")) { $urlPath = $urlPath.Split("?")[0] }
        
        $filePath = Join-Path $PSScriptRoot $urlPath.TrimStart('/')
        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css" { "text/css" }
                ".js" { "text/javascript" }
                ".png" { "image/png" }
                ".jpg" { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".webp" { "image/webp" }
                ".svg" { "image/svg+xml" }
                ".mp4" { "video/mp4" }
                ".mp3" { "audio/mpeg" }
                ".json" { "application/json" }
                default { "application/octet-stream" }
            }
            $res.ContentType = $mime
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $res.StatusCode = 404
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 - Archivo no encontrado en PapusBank")
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        $res.OutputStream.Close()
    }
} catch {
    Write-Host "Error en el servidor de PapusBank: $_"
} finally {
    $listener.Stop()
}
