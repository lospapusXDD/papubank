$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8081/")
try {
    $listener.Start()
    Write-Host "Web aparte (Verificacion) corriendo en http://localhost:8081"
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        $urlPath = $req.Url.LocalPath
        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        if ($urlPath.Contains("?")) { $urlPath = $urlPath.Split("?")[0] }
        $filePath = Join-Path "C:\Users\saidm\Desktop\PapusBank-V2\verificacion" $urlPath.TrimStart('/')
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
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 - Archivo no encontrado en Verificacion")
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        $res.OutputStream.Close()
    }
} catch {
    Write-Host "Error en verificacion: $_"
} finally {
    $listener.Stop()
}
