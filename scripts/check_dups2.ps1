$content = Get-Content 'C:\Users\saidm\Desktop\PapusBank-V2\index.html' -Raw
$ids = @{}
$lines = $content.Split("`n")
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    $matches = [regex]::Matches($line, 'id="([^"]+)"')
    foreach ($match in $matches) {
        $id = $match.Groups[1].Value
        if ($ids.ContainsKey($id)) {
            if ($ids[$id] -ne ($i+1)) {
                Write-Host "DUPLICATE ID at line $($i+1): $id (first at line $($ids[$id]))"
            }
        } else {
            $ids[$id] = $i+1
        }
    }
}