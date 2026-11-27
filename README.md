# ha-smart-orb

全本機運作的 Home Assistant **3D Plexus 星圖智慧球體 ＋ Assist 語音動態儀表板**（不依賴任何外部 CDN）。

- **Lovelace 自訂卡片**：[`ha-smart-orb.js`](ha-smart-orb.js)（`custom:ha-smart-orb`，直接讀取 HA 即時 `hass.states` 與監聽 `assist_dashboard_event`）
- **獨立單檔 Kiosk 網頁**：[`ha-plexus-dashboard.html`](ha-plexus-dashboard.html)（內建 `HomeAssistantClient` 原生 WebSocket API 與 Demo 模擬模式）
- **HA Automation 範例**：[`assist-automation-example.yaml`](assist-automation-example.yaml)（開燈動畫、真實 4 日天氣預報、通用語音回應）

---

## 一、換台電腦後的快速開發與同步流程

### 1. 取得專案（新電腦首次執行）
```bash
git clone https://github.com/song910394/ha-smart-orb.git
cd ha-smart-orb
```

### 2. 修改並推送到 GitHub
修改 `ha-smart-orb.js`（或其他檔案）後，直接推送至 `main`：
```bash
git add ha-smart-orb.js
git commit -m "chore: update smart orb"
git push origin main
```

### 3. 一行指令同步到 Home Assistant（Terminal & SSH）
開啟 Home Assistant 側邊欄的 **Terminal & SSH** 附加元件（`/app/core_ssh`），將 `VER` 改成新的版本號（例如 `20261127.7`）後執行：

```sh
VER="20261127.7"
mkdir -p /config/www/ha-smart-orb
curl -fsSL "https://raw.githubusercontent.com/song910394/ha-smart-orb/main/ha-smart-orb.js?$(date +%s)" \
  -o "/config/www/ha-smart-orb/ha-smart-orb.${VER}.js" \
  && chmod 644 "/config/www/ha-smart-orb/ha-smart-orb.${VER}.js" \
  && sha256sum "/config/www/ha-smart-orb/ha-smart-orb.${VER}.js"
```

> 使用加上版本號的檔名（`ha-smart-orb.${VER}.js`）與 `$(date +%s)` 參數，可同時避開 GitHub Raw 快取與瀏覽器／HA App 的舊版快取，且自然保留舊版檔案供隨時回退。

### 4. 更新 Lovelace 資源網址並重載
1. 前往 Home Assistant **設定 → 儀表板 → 右上角選單 → 資源**（`/config/lovelace/resources`）。
2. 點選既有的 `ha-smart-orb` 資源項目（類型維持 **JavaScript 模組**）。
3. 將網址更新為新版本：
   ```text
   /local/ha-smart-orb/ha-smart-orb.20261127.7.js
   ```
4. 回到智慧球體測試頁（`/smart-orb-test/overview`）重新整理即可生效。

---

## 二、給 AI 助理的跨機自動同步指引（Agent Quick-Sync）

若你在另一台電腦上請 AI 助理協助修改與部署本專案，直接依以下高速流程執行即可：
1. **不要透過瀏覽器終端機分段貼上 base64 檔案**（容易耗時或掉字）。
2. 在本機修改 `ha-smart-orb.js` 並完成檢查後，執行 `git add`、`git commit`、`git push origin main`。
3. 在 Home Assistant 的 **Terminal & SSH**（`/app/core_ssh`）中執行上方「步驟 3」的一行 `curl` 指令，拉取最新檔案到 `/config/www/ha-smart-orb/ha-smart-orb.<新版本號>.js`。
4. 在 `/config/lovelace/resources` 只更新 `ha-smart-orb` 這一筆資源網址，**不要更動其他儀表板設定，也不要觸發任何真實家電開關**。
5. 重新整理 `/smart-orb-test/overview` 驗證畫面、Console 零報錯，以及 `1 開燈`（純視覺預覽）／`2 天氣`／`3 語音`／`待機` 與 `設備` 抽屜皆正常。

---

## 三、卡片設定與自訂參數

儀表板檢視建議設為 `type: panel`（滿版），卡片 YAML 支援下列參數：

```yaml
type: custom:ha-smart-orb
title: 家中智慧球體
area: 家的日常・全屋即時狀態
weather_entity: weather.forecast_jia   # 選填：指定天氣實體（未填時自動偵測第一個 weather.*）
assist_event: assist_dashboard_event   # 選填：監聽的 HA 自訂事件名稱
date_locale: en-US                     # 選填：en-US（Friday 27 November）或 zh-TW（11月27日 星期五）
overlay_timeout_ms: 6800               # 選填：底部語音卡片自動收合毫秒數
entities:
  - entity: switch.zhi_neng_kai_guan_4_switch
    name: 1F 廚房主燈
    role: light
  - entity: sensor.wen_shi_du_hong_wai_xian_yao_kong_qi_temperature
    name: 1F 餐廳溫度
    role: sensor
```

若想完全自訂球體周圍公轉的標籤項目，可選填 `orb_pins`：
```yaml
orb_pins:
  - kind: lights_summary
    label: 燈光
    color: "#fde68a"
  - entity: sensor.wen_shi_du_hong_wai_xian_yao_kong_qi_temperature
    label: 餐廳溫度
    color: "#67e8f9"
```

---

## 四、操作與語音卡片測試

- **球體互動**：滑鼠／觸控拖曳即可 3D 旋轉（帶慣性減速），閒置約 1.6 秒後恢復緩慢自轉。
- **快捷鍵／右下角低調工具列**：
  - `1` / `1 開燈`：開燈發光動畫預覽（僅視覺模擬，不控制真實開關）
  - `2` / `2 天氣`：顯示天氣預報卡（自動向 HA 讀取即時天氣與 4 日預報）
  - `3` / `3 語音`：顯示通用語音回應卡
  - `0` / `Esc` / `待機`：收合卡片並恢復待機狀態與真實燈數
  - `設備 (...)`：展開側邊玻璃擬態設備清單，支援即時搜尋與點選高亮球面節點
- **HA 真實事件測試**：前往 **開發者工具 → 事件**，事件類型填 `assist_dashboard_event`，事件資料參考 [`assist-automation-example.yaml`](assist-automation-example.yaml)。

---

## 五、快速回退（Rollback）

若新版本有任何異常，無須還原整台 Home Assistant：
1. 前往 **設定 → 儀表板 → 資源**（`/config/lovelace/resources`）。
2. 將 `ha-smart-orb` 資源網址改回前一個穩定版本（例如 `/local/ha-smart-orb/ha-smart-orb.20261127.6.js` 或 `.3.js`）。
3. 重新整理頁面即刻復原。
