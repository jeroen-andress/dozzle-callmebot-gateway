const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const SERVICE = (process.env.CALLMEBOT_SERVICE || "whatsapp").toLowerCase();

/**
 * Build CallMeBot URLs per service
 */

function buildWhatsApp(text) {
  return (
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${encodeURIComponent(process.env.CALLMEBOT_WHATSAPP_PHONE)}` +
    `&text=${encodeURIComponent(text)}` +
    `&apikey=${encodeURIComponent(process.env.CALLMEBOT_WHATSAPP_APIKEY)}`
  );
}

function buildTelegram(text) {
  return (
    `https://api.callmebot.com/text.php` +
    `?user=${encodeURIComponent(process.env.CALLMEBOT_TELEGRAM_CHATID)}` +
    `&text=${encodeURIComponent(text)}` +
    `&apikey=${encodeURIComponent(process.env.CALLMEBOT_TELEGRAM_APIKEY)}`
  );
}

function buildFacebook(text) {
  return (
    `https://api.callmebot.com/facebook.php` +
    `?user=${encodeURIComponent(process.env.CALLMEBOT_FACEBOOK_USERID)}` +
    `&text=${encodeURIComponent(text)}` +
    `&apikey=${encodeURIComponent(process.env.CALLMEBOT_FACEBOOK_APIKEY)}`
  );
}

function buildSignal(text) {
  return (
    `https://api.callmebot.com/signal.php` +
    `?phone=${encodeURIComponent(process.env.CALLMEBOT_SIGNAL_PHONE)}` +
    `&text=${encodeURIComponent(text)}` +
    `&apikey=${encodeURIComponent(process.env.CALLMEBOT_SIGNAL_APIKEY)}`
  );
}

function buildUrl(text) {
  switch (SERVICE) {
    case "telegram":
      return buildTelegram(text);
    case "facebook":
      return buildFacebook(text);
    case "signal":
      return buildSignal(text);
    case "whatsapp":
    default:
      return buildWhatsApp(text);
  }
}

app.post("/webhook", async (req, res) => {
  try {
    const message =
      req.body.message ||
      req.body?.log?.message ||
      JSON.stringify(req.body);

    const url = buildUrl(message);

    await axios.get(url);

    res.json({
      success: true,
      service: SERVICE
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 running on port ${PORT} (${SERVICE})`);
});
