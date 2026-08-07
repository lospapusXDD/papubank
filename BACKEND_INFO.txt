=== TIENDA PREMIUM / EXCHANGE (lo que falta) ===

33. Tabla nueva: "user_inventory"
    - Campos: id, nick, item_id, item_type, purchased_at, expires_at, active
    - item_type: ring, title, avatar_frame, boost, cosmetic
    - expires_at: null = permanente, timestamp = temporal

34. POST /api/inventory/buy
    - Body: { "nick": "solariswat", "item_id": "ring_rainbow", "price": 50000, "currency": "ppc" }
    - Verifica que tenga el saldo, descuenta, agrega a inventory
    - Respuesta: { "message": "Item comprado", "item": {...} }

35. GET /api/inventory/:nick
    - Devuelve todos los items del usuario
    - Respuesta: [{ item_id: "ring_rainbow", item_type: "ring", active: true, purchased_at: "..." }]

36. PUT /api/inventory/:nick/activate
    - Body: { "item_id": "ring_rainbow" }
    - Activa ese item y desactiva otros del mismo tipo (solo 1 ring activo a la vez)
    - El frontend lee esto para renderizar el aro en el perfil

37. PUT /api/inventory/:nick/deactivate
    - Body: { "item_id": "ring_rainbow" }
    - Desactiva el item

=== AROS DE PERFIL (RINGS) ===
Los que ya existen en extras.js y necesitan backend:
- ring_bronze, ring_silver, ring_gold, ring_platinum, ring_diamond, ring_royal, ring_neon, ring_rainbow
- Cada uno con su precio en PPC/P-USD
- Se guardan en user_inventory cuando el usuario lo compra
- El frontend lee el ring activo para mostrar el borde animado alrededor del avatar

=== NICK RAINBOW / COLORES PREMIUM ===
38. PUT /api/users/:nick/premium-settings
    - Body: { "nickColor": "rainbow", "nickStyle": "animated" }
    - Guarda en campos nuevos de users: "nick_color" (string), "nick_style" (string)
    - Valores posibles de nickColor: "rainbow", "fire", "ice", "neon", "gold", null (normal)
    - El frontend lee esto para aplicar CSS al nick

=== AVATAR FRAME (marco animado) ===
39. PUT /api/users/:nick/avatar-frame
    - Body: { "frame": "frame_fire" }
    - Guarda en campo "avatar_frame" de users
    - Valores: "frame_fire", "frame_ice", "frame_neon", "frame_galaxy", null (sin marco)
    - El frontend renderiza un div con animación CSS sobre el avatar

=== BOOSTERS ===
40. POST /api/boosters/activate
    - Body: { "nick": "solariswat", "type": "xp_boost", "multiplier": 2, "duration_hours": 24 }
    - Guarda en user_inventory con expires_at calculado
    - Tipos: xp_boost, pp_boost, luck_boost

=== TÍTULOS PREMIUM ===
41. PUT /api/users/:nick/title
    - Body: { "title": "👑 Rey del Clan" }
    - Guarda en campo "active_title" de users
    - El frontend muestra el título debajo del nick en el perfil y leaderboard

=== TÍTULOS DESBLOQUEABLES ===
42. Tabla nueva: "unlockable_titles"
    - Campos: id, title, requirement_type, requirement_value, icon
    - Ejemplo: { title: "Leyenda", requirement_type: "total_transfers", requirement_value: 1000, icon: "fa-star" }

43. GET /api/titles/available/:nick
    - Verifica qué títulos ha desbloqueado el usuario según sus stats
    - Devuelve lista de títulos desbloqueados + cuáles le faltan

=== TIENDA DE SKINS/AVATARS ===
44. Tabla nueva: "avatar_shop"
    - Campos: id, filename, name, price_ppc, price_usd, category, limited
    - Ejemplo: { filename: "avt_sukuna.jpg", name: "Sukuna", price_ppc: 500000, price_usd: 50, category: "anime", limited: false }

45. GET /api/shop/avatars
    - Lista todos los avatares disponibles para comprar

46. POST /api/shop/avatars/buy
    - Body: { "nick": "solariswat", "avatar_id": "avt_sukuna" }
    - Descuenta saldo, guarda en user_inventory como item_type "avatar"
    - El usuario puede equipar cualquier avatar que haya comprado

=== TIENDA DE EFECTOS ===
47. Tabla nueva: "effects_shop"
    - Campos: id, name, css_class, price_ppc, price_usd, category
    - Efectos: partículas de fuego, lluvia de estrellas, aura eléctrica, etc.

48. POST /api/shop/effects/buy
    - Misma lógica que avatars

49. PUT /api/users/:nick/active-effect
    - Body: { "effect": "fire_particles" }
    - Guarda en campo "active_effect" de users
    - El frontend renderiza las partículas en el perfil
