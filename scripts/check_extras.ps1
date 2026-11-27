$content = Get-Content "C:\Users\saidm\Desktop\PapusBank-V2\extras.js" -Raw
$openBraces = 0
$closeBraces = 0
$openParens = 0
$closeParens = 0
$lines = $content.Split("`n")
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    $openBraces += ($line -split '{').Count - 1
    $closeBraces += ($line -split '}').Count - 1
    $openParens += ($line -split '\(').Count - 1
    $closeParens += ($line -split '\)').Count - 1
    if ($closeBraces -gt $openBraces) {
        Write-Host "Unbalanced braces at line $($i+1): $line"
        break
    }
}
Write-Host "Total open braces: $openBraces"
Write-Host "Total close braces: $closeBraces"
Write-Host "Total open parens: $openParens"
Write-Host "Total close parens: $closeParens"