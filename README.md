# Dozzle → CallMeBot Gateway

A small Docker web service that receives Dozzle webhooks and forwards them to CallMeBot.

Supports multiple messaging apps:
- WhatsApp
- Telegram
- Facebook Messenger
- Signal

---

# ✨ Features

- A single endpoint: `/webhook`
- Multi-service selection via `.env`
- Docker-ready
- Easy integration with Dozzle

---

# 🚀 Installation

## 1. Configure `.env`

```env
PORT=3000

CALLMEBOT_SERVICE=whatsapp

CALLMEBOT_WHATSAPP_PHONE=49123456789
CALLMEBOT_WHATSAPP_APIKEY=xxxxx

CALLMEBOT_TELEGRAM_CHATID=123456789
CALLMEBOT_TELEGRAM_APIKEY=xxxxx

CALLMEBOT_FACEBOOK_USERID=123456789
CALLMEBOT_FACEBOOK_APIKEY=xxxxx

CALLMEBOT_SIGNAL_PHONE=49123456789
CALLMEBOT_SIGNAL_APIKEY=xxxxx
```
