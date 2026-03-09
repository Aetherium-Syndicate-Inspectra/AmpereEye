# 🔋 AmpereEye — The Battery Truth

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-Android-blue.svg)](https://www.android.com)
[![Kotlin](https://img.shields.io/badge/kotlin-2.0.0-purple.svg)](https://kotlinlang.org)

AmpereEye คือแอปพลิเคชันตรวจสอบแบตเตอรี่ที่วัดค่าจากกระแสไฟจริง (Real Current mAh) ผ่านฮาร์ดแวร์ Fuel Gauge IC ไม่ใช้การคาดเดาจากโปรไฟล์พลังงาน มาพร้อม AI Governance และระบบวิเคราะห์เชิงลึก ช่วยให้คุณเข้าใจพฤติกรรมแบตเตอรี่และยืดอายุการใช้งานได้อย่างแท้จริง

### 🚀 Frontend Prototype Implementation
This repository contains a high-fidelity React + TypeScript prototype of the AmpereEye dashboard, featuring:
- **The Pulse:** Real-time metrics with a circular battery status ring and dynamic AI-driven insights.
- **The Memory:** Battery health tracking with SVG-based capacity retention charts and session logs.
- **The Enforcer:** Energy consumption breakdown (Screen On/Off) and background process management.
- **Persistent Notification:** A simulation of the Android notification shade snippet for high-density monitoring.

---

---

## ✨ คุณสมบัติหลัก

- **วัดกระแสไฟจริง** – อ่านค่า mA/mAh จาก `/sys/class/power_supply/battery/current_now` และ `charge_counter` โดยตรง ด้วย native code (Go/C) เพื่อความแม่นยำสูงสุด
- **สุขภาพแบตเตอรี่** – คำนวณความจุปัจจุบันเทียบกับดีไซน์ (Design Capacity) และแสดงเปอร์เซ็นต์การเสื่อมสภาพ
- **ผู้พิทักษ์การชาร์จ** – แจ้งเตือนเมื่อชาร์จถึงระดับที่ตั้ง (80%, 90% ฯลฯ) ป้องกัน overcharge
- **วิเคราะห์ Deep Sleep** – ตรวจจับ Wakelock ที่ผิดปกติด้วยโมเดล LightGBM บนเครื่อง
- **รายงานแยกตามแอป** – ดูปริมาณการใช้ mAh ของแต่ละแอปแบบเรียลไทม์ (รวมทั้ง background)
- **ประวัติการชาร์จ/คายประจุ** – เก็บสถิติทุกรอบ (cycle) ในฐานข้อมูล local พร้อมกราฟ
- **สรุปด้วย AI** – On-device LLM (Gemini Nano หรือ TinyLlama quantized) อ่านข้อมูลและให้คำแนะนำเป็นภาษาธรรมชาติ
- **ซิงก์คลาวด์แบบไม่ระบุตัวตน (Optional)** – ผู้ใช้สามารถเลือกส่งข้อมูลแบบ anonymized เพื่อช่วยพัฒนาโมเดล AI สำหรับอุปกรณ์รุ่นต่างๆ

---

## 🏗️ สถาปัตยกรรมระบบ (System Architecture)

AmpereEye ออกแบบตามหลัก **4‑Layer Architecture** ที่เน้นความแม่นยำและประหยัดพลังงาน:

```mermaid
flowchart TD
    subgraph A [Layer 1: ระบบประสาทสัมผัสระดับจุลภาค]
        direction TB
        K[Kernel Space<br/>Go/C Native Daemon] -->|อ่านค่า mA/µAh| FG[Fuel Gauge IC]
        K -->|Micro‑batch Wakeups| SM[AlarmManager / WorkManager]
    end

    subgraph B [Layer 2: ผู้พิทักษ์และผู้คุมกฎ]
        direction TB
        GE[Governance Enforcer] -->|ตรวจจับ Wakelock| PS[/proc/wakelocks]
        GE -->|แจ้งเตือน 80%| NO[Notification Service]
        GE -->|Anomaly Detection| ML[LightGBM Model]
    end

    subgraph C [Layer 3: ฮิปโปแคมปัสของระบบ]
        direction TB
        DB[(Local DB<br/>SQLite / Realm)] -->|Snapshot & Cycle| TS[Time‑series Data]
        DB -->|App Usage Stats| AU[App Statistics]
    end

    subgraph D [Layer 4: นักสื่อสารจิตวิญญาณ]
        direction TB
        LLM[On‑device LLM] -->|Summarize| INS[User Insights / Notifications]
        UI[UI Layer] -->|Query| DB
    end

    A -->|Raw Data| B
    B -->|Filtered/Annotated Data| C
    C -->|Historical Context| D
    D -->|Display| UI

    C -.->|Optional Anonymized Sync| Cloud[(Cloud Analytics<br/>BigQuery / Vertex AI)]
```

คำอธิบายแต่ละชั้น

1. Layer 1 – Low‑Latency Data Ingestion
   · โค้ดระดับ native (Go/C) ทำงานใน daemon อ่านค่ากระแสและประจุจาก sysfs โดยตรง
   · ใช้ AlarmManager แบบ setExactAndAllowWhileIdle เพื่อปลุกเป็นช่วงสั้นๆ (micro‑batch) ขณะปิดหน้าจอ ประหยัดพลังงาน
2. Layer 2 – AI Governance Enforcer
   · ติดตาม wakelock และกระแสที่ผิดปกติด้วยโมเดล LightGBM ขนาดเล็ก
   · ส่งการแจ้งเตือนทันทีเมื่อพบ anomaly หรือเมื่อแบตเตอรี่ถึงระดับชาร์จที่ตั้ง
3. Layer 3 – Long‑Term Memory Pipeline
   · ข้อมูลทั้งหมดถูกบีบอัดและเก็บในฐานข้อมูล local (SQLite + Room หรือ Realm)
   · รองรับการส่งออกเป็น JSON และ optional sync ขึ้นคลาวด์แบบไม่ระบุตัวตน
4. Layer 4 – LLM Diagnostic & UI
   · On‑device LLM (ผ่าน ML Kit หรือ LLM Runtime) อ่านข้อมูลจากฐานและสรุปเป็นข้อความเข้าใจง่าย
   · UI แสดงกราฟ สถิติ และคำแนะนำผ่าน notification

---

## 🗄️ โครงสร้างฐานข้อมูล (Database Schema)

เราใช้ SQLite (ผ่าน Room) เป็นหลัก โดยมีตารางหลักดังนี้:

### battery_snapshots

| Column | Type | Description |
| --- | --- | --- |
| id | Long (PK) | auto increment |
| timestamp | Long | เวลาที่บันทึก (Unix ms) |
| level_percent | Int | เปอร์เซ็นต์แบตเตอรี่ |
| voltage_mv | Int | แรงดัน (mV) |
| current_ma | Int | กระแสขณะนั้น (mA) |
| capacity_mah | Int | ความจุปัจจุบัน (mAh) |
| temperature_c | Float | อุณหภูมิ (°C) |
| screen_on | Boolean | หน้าจอเปิดหรือไม่ |

### charge_cycles

| Column | Type | Description |
| --- | --- | --- |
| id | Long (PK) | auto increment |
| start_time | Long | เวลาเริ่มรอบชาร์จ |
| end_time | Long | เวลาสิ้นสุดรอบชาร์จ |
| start_level | Int | % เริ่มต้น |
| end_level | Int | % สิ้นสุด |
| total_mah_added | Int | mAh ที่เพิ่มทั้งหมด |
| max_current_ma | Int | กระแสสูงสุด |
| avg_temperature_c | Float | อุณหภูมิเฉลี่ย |

### app_usage

| Column | Type | Description |
| --- | --- | --- |
| id | Long (PK) | auto increment |
| timestamp | Long | เวลาที่บันทึก |
| uid | Int | UID ของแอป |
| app_name | String | ชื่อแพ็กเกจ |
| wake_count | Int | จำนวนครั้งที่ปลุกเครื่อง |
| foreground_time_ms | Long | เวลาที่แอปเปิดหน้าจอ |
| background_time_ms | Long | เวลาที่แอปทำงานเบื้องหลัง |
| estimated_drain_mah | Float | ค่ากระแสโดยประมาณที่ใช้ (จาก current_flow) |

### wakelock_offenders (จาก JSON ในรอบชาร์จ)

| Column | Type | Description |
| --- | --- | --- |
| id | Long (PK) | auto increment |
| cycle_id | Long (FK) | อ้างอิง charge_cycles.id |
| app_name | String | แพ็กเกจแอป |
| wake_count | Int | จำนวน wakelock ในรอบนั้น |
| estimated_drain_mah | Float | ค่ากระแสที่สูญเสียโดยประมาณ |

> หมายเหตุ: ข้อมูลใน wakelock_offenders ถูกกรองโดย AI Governance เพื่อให้แสดงเฉพาะแอปที่น่าสงสัยเท่านั้น

---

## 🛠️ เทคโนโลยีที่ใช้

### Frontend (Dashboard Prototype)
- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS v3 (OLED-optimized dark theme)
- **Icons:** Lucide-React
- **Build Tool:** Vite

### System Architecture (Target)
- ภาษา: Kotlin, Java (สำหรับ Android), Go / C (สำหรับ native daemon)
- ฐานข้อมูล: Room (SQLite), Realm (optional)
- Background Task: WorkManager, AlarmManager
- Machine Learning: TensorFlow Lite (LightGBM), ML Kit (LLM Inference)
- Cloud (Optional): Firebase / Google Cloud (BigQuery, Vertex AI) สำหรับรวบรวมสถิติ anonymized
- Build System: Gradle (Kotlin DSL)

---

## 📲 การติดตั้งและการพัฒนา (Setup & Development)

### Frontend Dashboard Preview
1. Clone repository และเข้าสู่โฟลเดอร์:
   ```bash
   git clone https://github.com/yourname/AmpereEye.git
   cd AmpereEye
   ```
2. ติดตั้ง dependencies:
   ```bash
   npm install
   ```
3. รัน Development Server:
   ```bash
   npm run dev
   ```
4. สร้าง Production Build:
   ```bash
   npm run build
   ```

### Native Android App (Target)
1. เปิดโปรเจคด้วย Android Studio (Ladybug หรือใหม่กว่า)
2. รัน build script สำหรับ native library:
   ```bash
   ./gradlew assembleDebug
   ```
3. ติดตั้ง APK ลงอุปกรณ์ (ต้องเปิด USB Debugging)

ข้อกำหนด: Android 8.0 (API 26) ขึ้นไป และอุปกรณ์ต้องมี Fuel Gauge IC ที่รองรับการอ่านค่า CURRENT_NOW และ CHARGE_COUNTER (อุปกรณ์สมัยใหม่ส่วนใหญ่รองรับ)

---

## 🤝 การมีส่วนร่วม

เรายินดีรับ Pull Request และ Issue จากชุมชน!
หากคุณพบข้อบกพร่องหรือมีไอเดียใหม่ กรุณาเปิด Issue หรือส่ง PR มาที่ GitHub Repository

---

## 📄 ลิขสิทธิ์

เผยแพร่ภายใต้สัญญาอนุญาต MIT ดูรายละเอียดเพิ่มเติมได้ที่ไฟล์ LICENSE

---

AmpereEye – รู้ทุกกระแสไฟจริง เพื่อแบตเตอรี่ที่ยืนยาว
