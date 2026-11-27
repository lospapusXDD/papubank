$content = Get-Content "C:\Users\saidm\Desktop\PapusBank-V2\style.css" -Raw
$openBraces = 0
$closeBraces = 0
$lines = $content.Split("`n")
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    $openBraces += ($line -split '{').Count - 1
    $closeBraces += ($line -split '}').Count - 1
    if ($closeBraces -gt $openBraces) {
        Write-Host "Unbalanced at line $($i+1): $line"
        break
    }
}
Write-Host "Total open braces: $openBraces"
Write-Host "Total close braces: $closeBraces"