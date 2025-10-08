import { serve } from "hello-compute";
import axios from "axios";

// Cambia esta URL por tu webhook de Discord
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1419696087865888889/KQTgemmQG7X569fbDxZNAUHoe4O2rCoYAKfNSg_Gw991hItyYXf6UZ0Diee5HOSv71Qc";

serve({
  fetch: async (req) => {
    if (req.method === "POST" && new URL(req.url).pathname === "/send") {
      try {
        const { message, player } = await req.json();
        const content = `**${player || "Jugador"}:** ${message || "Mensaje vacío"}`;

        await axios.post(DISCORD_WEBHOOK, { content });

        return new Response("✅ Enviado a Discord", { status: 200 });
      } catch (e) {
        console.error(e);
        return new Response("❌ Error", { status: 500 });
      }
    }
    return new Response("Servidor intermedio activo", { status: 200 });
  },
});

  
