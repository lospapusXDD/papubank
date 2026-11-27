$content = Get-Content 'C:\Users\saidm\Desktop\PapusBank-V2\index.html' -Raw
$ids = @{}
$lines = $content.Split("`n")
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    while ($line -match 'id="([^"]+)"') {
        $id = $matches[1]
        if ($ids.ContainsKey($id)) {
            Write-Host "DUPLICATE ID at line $($i+1): $id (first at line $($ids[$id]))"
        } else {
            $ids[$id] = $i+1
        }
        $line = $line.Substring($matches[0].Length)
    }
}