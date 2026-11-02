# Moffee promo kit — MOTOR AA Facebook recruiting post + hub card
Updated 2026-11-02. Owner rules: Moffee is FREE; revenue is small banner ads ONLY AFTER the official Google Play release (never full-screen or covering the screen); NO ads during development and testing (including the closed test); no subscription, paid tier or in-app purchase. General-purpose: cafés, restaurants, shops.
**All promotion copy (Facebook posts, tester recruiting) is THAI ONLY. Thai (below) is the primary, polished version.** The other languages are optional extras for the website/hub only, not for posting; ko/zh/hi are drafts not checked by a native speaker.
Not part of the website (only `docs/` is deployed).

## (c) Join the test
- Tester join page (3 steps): https://motoraathailand.github.io/moffee-site/join.html?lang=th  (Thai; without `?lang=` the page follows the visitor's browser language)
- Test countries: ALL countries (anyone with a Google Play account can join)
- One shared Google group for all MOTOR AA test apps: motoraa-testers@googlegroups.com — https://groups.google.com/g/motoraa-testers
- Steps: 1) join the group, 2) become a tester (Play), 3) install from Google Play — use the SAME Gmail for all 3; keep it installed 14 days. (Steps 2–3 on the page stay dimmed until the Play closed test is published; `optInLive` in `config/site.json` is still `false`. Do not post the join link as "ready to install" before that.)

## (d) Live site
https://motoraathailand.github.io/moffee-site/ (Thai: `?lang=th`) · privacy: /privacy.html · delete account: /delete-account.html

## (b) Best screenshots (English UI, demo data; use 2–4)
1. `/workspace/moffee-site/docs-promo/screenshots/order-light-1280x800.png` — tablet order screen, light (best hero)
2. `/workspace/moffee-site/docs-promo/screenshots/cart-sheet-412x915.png` — phone cart (works on phones too)
3. `/workspace/moffee-site/docs-promo/screenshots/order-dark-1280x800.png` — tablet, dark mode (shown with the green accent colour)
4. `/workspace/moffee-site/docs-promo/screenshots/manager-1280x800.png` — manager area behind the PIN
Also: `/workspace/moffee-site/docs-promo/screenshots/share-card-og-1200x630.jpg` (ready-made 1200x630 share card). Originals: `/workspace/cafemenu/docs/screenshots/v2.0/`. Icon: `/workspace/cafemenu/docs/icon-concepts/v2/concept-1-arch-512.png`.

## (a) One-line intro + key features

### ไทย (th) — PRIMARY, use this for all posts
**Moffee — แอปรับออเดอร์หน้าร้านที่ใช้ฟรี สำหรับร้านกาแฟ ร้านอาหาร และร้านค้า ช่วงทดสอบไม่แสดงโฆษณา หลังเปิดตัวจริงมีแค่แบนเนอร์โฆษณาเล็ก ๆ ไม่แสดงโฆษณาเต็มจอ**
- แตะรูปเมนูบนแท็บเล็ตหรือมือถือเพื่อรับออเดอร์ ใช้ออฟไลน์ได้
- พิมพ์ใบร้านและใบลูกค้าตามแบบที่คุณออกแบบเอง (เครื่องพิมพ์ ESC/POS ผ่านบลูทูธหรือ Wi-Fi)
- แตะครั้งเดียวได้รายงานปิดยอดรายวัน A4 เป็น PDF หรือรูป
- ปุ่มใหญ่ มี PIN ผู้จัดการ พนักงานใหม่ใช้ได้ทันทีโดยไม่ต้องอบรม

**Ready-to-paste Facebook post (Thai):**
> มาร่วมทดสอบ Moffee แอปรับออเดอร์หน้าร้านที่ใช้ฟรี สำหรับร้านกาแฟ ร้านอาหาร และร้านค้า บน Android 📱
> • แตะรูปเมนูเพื่อรับออเดอร์ ใช้ออฟไลน์ได้
> • พิมพ์ใบร้านและใบลูกค้าตามแบบของคุณ
> • ปิดยอดรายวันด้วยรายงาน A4 ฉบับเดียว
> • ปุ่มใหญ่ มี PIN ผู้จัดการ พนักงานใหม่ใช้ง่าย
> ช่วงทดสอบไม่แสดงโฆษณา ผู้ทดสอบจากทุกประเทศเข้าร่วมได้ ทำตาม 3 ขั้นตอนง่าย ๆ (ใช้ Gmail เดียวกันทั้ง 3 ขั้นตอน): https://motoraathailand.github.io/moffee-site/join.html?lang=th

### Optional extras (website/hub only; not for posting)
#### English (en)
**Moffee — a free counter order app for cafés, restaurants and shops. No ads during testing; after the official release, only small banner ads (no ads that cover the screen).**
- Tap menu photos on a tablet or phone to take orders — works offline
- Prints store and customer tickets with your own design (ESC/POS Bluetooth or Wi-Fi printers)
- One-tap daily A4 closing report as PDF or image
- Big buttons and a manager PIN, so new staff can use it without training

#### 한국어 (ko, draft)
**Moffee — 카페·음식점·상점을 위한 무료 카운터 주문 앱. 테스트 기간에는 광고가 없고, 정식 출시 후에는 작은 배너 광고만 있어요(화면을 가리는 광고 없음).**
- 태블릿이나 휴대폰에서 메뉴 사진을 눌러 주문받기, 오프라인에서도 동작
- 내가 꾸민 디자인으로 매장용·고객용 티켓 출력(ESC/POS 블루투스·Wi-Fi 프린터)
- 한 번에 A4 일일 마감 리포트를 PDF나 이미지로
- 큰 버튼과 매니저 PIN, 교육 없이도 새 직원이 바로 사용

#### 简体中文 (zh, draft)
**Moffee —— 适用于咖啡馆、餐厅和商店的免费柜台点单应用。测试期间没有广告，正式发布后仅有小型横幅广告（不会有遮挡屏幕的广告）。**
- 在平板或手机上点菜品图片点单，可离线使用
- 按你自己的设计打印门店联和顾客联（ESC/POS 蓝牙或 Wi-Fi 打印机）
- 一键生成 A4 每日日结报表（PDF 或图片）
- 大按钮加店长 PIN，新员工无需培训就能上手

#### हिन्दी (hi, draft)
**Moffee — कैफ़े, रेस्तरां और दुकानों के लिए मुफ़्त काउंटर ऑर्डर ऐप। टेस्टिंग के दौरान कोई विज्ञापन नहीं; आधिकारिक रिलीज़ के बाद सिर्फ़ छोटे बैनर विज्ञापन (स्क्रीन ढकने वाले नहीं)।**
- टैबलेट या फ़ोन पर मेनू की फ़ोटो दबाकर ऑर्डर लें, ऑफ़लाइन भी चलता है
- अपने डिज़ाइन के स्टोर और ग्राहक टिकट प्रिंट करें (ESC/POS ब्लूटूथ या Wi-Fi प्रिंटर)
- एक टैप में A4 रोज़ की क्लोज़िंग रिपोर्ट, PDF या इमेज में
- बड़े बटन और मैनेजर PIN, नया स्टाफ़ बिना ट्रेनिंग के इस्तेमाल कर सके
