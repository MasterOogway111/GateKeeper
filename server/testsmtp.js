import net from "net";

const client = net.createConnection({ host: "smtp-relay.brevo.com", port: 587 }, () => {
  console.log("✅ Connected to SMTP server!");
  client.end();
});

client.on("error", (err) => {
  console.error("❌ Connection failed:", err.message);
});
