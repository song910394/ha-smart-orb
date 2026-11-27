# ha-smart-orb

Home Assistant 3D Plexus Ambient Sphere + Assist Overlay custom Lovelace card (custom:ha-smart-orb) and standalone local Kiosk HTML dashboard.

## Quick Sync to Home Assistant (Terminal & SSH)

\\\sh
curl -fsSL https://raw.githubusercontent.com/song910394/ha-smart-orb/main/ha-smart-orb.js -o /config/www/ha-smart-orb/ha-smart-orb.js
\\\

## Files
- \ha-smart-orb.js\ — Lovelace custom card (\custom:ha-smart-orb\), 100% local/offline, no external CDN.
- \ha-plexus-dashboard.html\ — Standalone single-file Kiosk web app with \HomeAssistantClient\ WebSocket API + Demo mode.
- \ssist-automation-example.yaml\ — Home Assistant automation examples to trigger \ssist_dashboard_event\ overlay cards.
