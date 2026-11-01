// Text of the two legal pages (privacy policy + deletion), 5 languages. Edit here, then `node scripts/build.mjs`.
// Written ONLY from what the app really does (checked against /workspace/cafemenu + AndroidManifest, v1.6: owner-only Google sign-in + Drive drive.file backup).
// Sections: [heading, [blocks]] where a block is a paragraph string, {ul:[...]} or {ol:[...]}.
// Never claim something the app does not do.
export const LANGS = [['th', 'ไทย'], ['en', 'English'], ['ko', '한국어'], ['zh', '简体中文'], ['hi', 'हिन्दी']];
export const SOCIAL = { th: 'th_TH', en: 'en_US', ko: 'ko_KR', zh: 'zh_CN', hi: 'hi_IN' };

export function makeContent({ OPERATOR, EMAIL, UPDATED, SITE }) {
  const UI = {
    th: { updated: 'อัปเดตล่าสุด', privacyTitle: 'นโยบายความเป็นส่วนตัว', deleteTitle: 'ขอลบข้อมูลและบัญชี', other: 'วิธีลบข้อมูล →', otherP: 'นโยบายความเป็นส่วนตัว →', home: 'หน้าแรก', app: 'Moffee' },
    en: { updated: 'Last updated', privacyTitle: 'Privacy Policy', deleteTitle: 'Delete your data and account', other: 'How to delete your data →', otherP: 'Privacy Policy →', home: 'Home', app: 'Moffee' },
    ko: { updated: '최종 업데이트', privacyTitle: '개인정보 처리방침', deleteTitle: '데이터 및 계정 삭제', other: '데이터 삭제 방법 →', otherP: '개인정보 처리방침 →', home: '홈', app: 'Moffee' },
    zh: { updated: '最后更新', privacyTitle: '隐私政策', deleteTitle: '删除数据和账号', other: '如何删除数据 →', otherP: '隐私政策 →', home: '首页', app: 'Moffee' },
    hi: { updated: 'अंतिम अपडेट', privacyTitle: 'गोपनीयता नीति', deleteTitle: 'डेटा और खाता हटाएँ', other: 'डेटा हटाने का तरीका →', otherP: 'गोपनीयता नीति →', home: 'होम', app: 'Moffee' },
  };
  const PRIVACY = {
    en: [
      ['Who we are', [`Moffee (Android package com.motoraa.cafemenu) is a counter order app for coffee shops, made by ${OPERATOR} (“we”) for Motor AA Garage Cafe and other small shops. Contact: ${EMAIL}. This policy says what the app and this website store and send, in plain words.`]],
      ['In short', [{ ul: [
        'No ads at all. No analytics, tracking or crash-reporting tools.',
        'No payment processing. Card payments go through your own separate card terminal. The app only records a payment tag (PromptPay / Card / Cash) and never sees card numbers.',
        'The app works offline. Your menu, orders, expenses and reports stay on your device.',
        'We run no server that collects sales data. We do not receive your orders, reports or photos.',
        'From version 1.6 the shop owner signs in with Google once, in first-run setup (name, email and a user ID, via Google’s Firebase Authentication). Staff never sign in, and the app keeps working offline. See “Google sign-in and Google Drive backup”.'] }]],
      ['What the app stores on your device', [{ ul: [
        'Shop settings: shop name, theme colours, logo, ticket layout, printer settings (printer name, Bluetooth address or local IP address and port), language, and the “account holder name” used in the closing report (a name only — please do not type bank or card numbers).',
        'Menu: categories, items, prices, options and the photos you choose.',
        'Orders: items, options, notes, discounts, totals, order and queue numbers, time, payment tag, and the reason you type when voiding an order.',
        'Expenses (with an optional receipt photo) and your daily closing reports.',
        'Manager PIN and recovery code: kept only as salted hashes, which cannot be read back. They unlock manager functions.',
        'Customers are never asked for a name, phone number or email. What you type into a note is up to you — please keep personal data out of notes.'] },
        'All of this is kept in the app’s private storage on the device. The app does not add its own encryption on top of Android’s device protection (screen lock / device encryption), and Android’s cloud backup of the app is switched off.']],
      ['Permissions the app asks for', [{ ul: [
        'Bluetooth (Bluetooth connect; on Android 11 and older also Bluetooth and Bluetooth admin): to print to a Bluetooth receipt printer you have already paired in Android settings. The app lists paired devices only. It does not scan for nearby devices and does not use your location.',
        'Internet: to print to a Wi-Fi/LAN printer on your local network, to open links (such as this policy) in your browser, and, for the owner, to sign in with Google and to back up to the owner’s own Google Drive. The app does not send data to any server run by us.',
        'Photos: you choose a picture with Android’s own file picker. The app asks for no camera, storage, contacts, microphone or location permission.'] }]],
      ['What leaves your device, and where it goes', [{ ul: [
        'Printing: the ticket is sent only to the printer you set up.',
        'Saving and sharing: when you save or share a closing report (PDF or image) or a backup file, Android’s share sheet opens and the file goes only where you choose (for example LINE, email or Google Drive).',
        'Google Drive (owner only): backups and daily closing PDFs are uploaded from the device straight to a “Moffee” folder in the owner’s own Google Drive, under the narrow drive.file permission. See “Google sign-in and Google Drive backup”.',
        `Feedback: “Send feedback” opens your mail app with a message to ${EMAIL}, optionally pre-filled with the app version, language and screen size. Nothing is sent until you press send in your mail app. We then receive your message and email address and use them only to reply and to improve the app. When you are offline the text is kept on the device until you send it again.`,
        'Links: pages you open (such as this policy) open in your browser and are governed by those sites.'] }]],
      ['This website', ['This site is a static page hosted on GitHub Pages. We add no cookies, analytics, ads or third-party scripts. Your browser’s local storage keeps only your chosen language and the join-page step ticks, on your own device. GitHub, as host, may process visitor IP addresses under its own privacy statement.']],
      ['Google sign-in and Google Drive backup', [
        'From version 1.6 the shop owner signs in with Google once, in first-run setup. Staff never sign in, and after that the app works offline. Sign-in uses Firebase Authentication, a Google service.',
        { ul: [
          'What sign-in gives us: your Google account name, email address and a Firebase user ID (uid). They are held by Firebase Authentication (Google) and on your device, to show the signed-in account in the Manage menu. We use them for nothing else, and we do not sell or share them.',
          'Google Drive: with your permission, and only under the narrow “drive.file” scope (the app can see only files it created itself), the app saves backups (menu, photos, ticket designs, settings, sales records) and the daily closing PDFs into a folder called “Moffee” in your own Google Drive. Files go straight from the device to your Drive; they do not pass through any server of ours, and we cannot see them. The manager PIN is not included in backups.',
          'Control: backups run when you tap “Back up now”, and automatically once a day after closing when the device is online. Restoring needs the manager PIN and a confirmation. You can sign out, or delete the account, in the Manage menu (Account). You can also remove Moffee’s access in your Google Account (Security › Third-party access).',
          'Google processes sign-in and Drive under its own privacy policy.'] }]],
      ['How long data is kept, and deleting it', [{ ul: [
        'Data on the device stays until you erase it in the app (Manage › Settings › Erase all data and start over) or uninstall the app.',
        'Sales records, backups and closing reports saved in the owner’s own Google Drive are kept by default, because they may be tax records. They are deleted only if the owner ticks “Also delete Moffee backups/reports from Google Drive” when deleting the account in the app (manager PIN needed), or deletes them directly in Drive. Deleting the account removes the Firebase user (name, email, uid) from Firebase Authentication.',
        'Emails you send us are kept only as long as needed to answer you.'] },
        'Step by step: see the “Delete your data and account” page.']],
      ['Your rights', [`You can ask us about, correct or delete any personal data we hold, and withdraw consent. Because your sales data stays on your device and your own Drive, you control it directly. For anything we hold (such as an email you sent) write to ${EMAIL}; we will act without undue delay and within 30 days. In Thailand you may also complain to the Personal Data Protection Committee (PDPC).`]],
      ['Security', ['Data stays on the device, so it is protected by your tablet’s lock. Manager functions need a PIN, which is stored only as a salted hash. Keep the tablet locked and the recovery code safe. Printing to Bluetooth/LAN printers uses your own local connection.']],
      ['Children', ['The app is for shop staff and owners aged 18 and over. It is not designed for children and we do not knowingly collect data from children.']],
      ['Changes', ['If we make an important change we will update the date above, and tell you in the app’s notices.']],
      ['Contact', [`${OPERATOR} · ${EMAIL}`]],
    ],
    th: [
      ['เราคือใคร', [`Moffee (มอฟฟี่, แพ็กเกจ Android com.motoraa.cafemenu) เป็นแอปรับออเดอร์หน้าร้านสำหรับร้านกาแฟ จัดทำโดย ${OPERATOR} (“เรา”) สำหรับ Motor AA Garage Cafe และร้านเล็ก ๆ อื่น ๆ ติดต่อ: ${EMAIL} นโยบายนี้อธิบายด้วยภาษาง่าย ๆ ว่าแอปและเว็บไซต์นี้เก็บและส่งข้อมูลอะไรบ้าง`]],
      ['สรุปสั้น ๆ', [{ ul: [
        'ไม่มีโฆษณาเลย ไม่มีเครื่องมือวิเคราะห์ ติดตามผู้ใช้ หรือรายงานข้อผิดพลาด',
        'ไม่ประมวลผลการชำระเงิน การจ่ายด้วยบัตรผ่านเครื่องรูดบัตรแยกของร้านเอง แอปบันทึกเพียงป้ายวิธีจ่าย (พร้อมเพย์ / บัตร / เงินสด) และไม่เห็นเลขบัตรเลย',
        'แอปใช้งานได้แบบออฟไลน์ เมนู ออเดอร์ ค่าใช้จ่าย และรายงานอยู่ในเครื่องของคุณ',
        'เราไม่มีเซิร์ฟเวอร์ที่เก็บข้อมูลการขาย เราไม่ได้รับออเดอร์ รายงาน หรือรูปภาพของคุณ',
        'ตั้งแต่เวอร์ชัน 1.6 เจ้าของร้านเข้าสู่ระบบด้วย Google ครั้งเดียวตอนตั้งค่าครั้งแรก (ชื่อ อีเมล และรหัสผู้ใช้ ผ่าน Firebase Authentication ของ Google) พนักงานไม่ต้องเข้าสู่ระบบ และแอปยังใช้งานออฟไลน์ได้ ดู “เข้าสู่ระบบด้วย Google และสำรองข้อมูลไป Google Drive”'] }]],
      ['ข้อมูลที่แอปเก็บไว้ในเครื่องของคุณ', [{ ul: [
        'การตั้งค่าร้าน: ชื่อร้าน สีธีม โลโก้ รูปแบบใบออเดอร์ การตั้งค่าเครื่องพิมพ์ (ชื่อเครื่องพิมพ์ ที่อยู่บลูทูธ หรือที่อยู่ IP ในเครือข่ายและพอร์ต) ภาษา และ “ชื่อเจ้าของบัญชี” ที่ใช้ในรายงานปิดยอด (เป็นแค่ชื่อ โปรดอย่าพิมพ์เลขบัญชีธนาคารหรือเลขบัตร)',
        'เมนู: หมวดหมู่ รายการ ราคา ตัวเลือก และรูปภาพที่คุณเลือก',
        'ออเดอร์: รายการ ตัวเลือก หมายเหตุ ส่วนลด ยอดรวม เลขออเดอร์และเลขคิว เวลา ป้ายวิธีจ่าย และเหตุผลที่คุณพิมพ์ตอนยกเลิกบิล',
        'ค่าใช้จ่าย (พร้อมรูปใบเสร็จได้ถ้าต้องการ) และรายงานปิดยอดรายวัน',
        'PIN ผู้จัดการและรหัสกู้คืน: เก็บเป็นค่าแฮชที่ใส่ salt เท่านั้น อ่านย้อนกลับไม่ได้ ใช้ปลดล็อกฟังก์ชันของผู้จัดการ',
        'เราไม่เคยขอชื่อ เบอร์โทร หรืออีเมลจากลูกค้า สิ่งที่คุณพิมพ์ในช่องหมายเหตุเป็นดุลพินิจของคุณ โปรดอย่าใส่ข้อมูลส่วนบุคคลในหมายเหตุ'] },
        'ข้อมูลทั้งหมดนี้เก็บในพื้นที่ส่วนตัวของแอปบนเครื่อง แอปไม่ได้เพิ่มการเข้ารหัสของตัวเองนอกเหนือจากการป้องกันของ Android (ล็อกหน้าจอ / การเข้ารหัสเครื่อง) และปิดการสำรองข้อมูลบนคลาวด์ของ Android สำหรับแอปนี้ไว้']],
      ['สิทธิ์ที่แอปขอ', [{ ul: [
        'บลูทูธ (การเชื่อมต่อบลูทูธ; บน Android 11 และเก่ากว่าจะมี Bluetooth และ Bluetooth admin ด้วย): เพื่อพิมพ์ไปยังเครื่องพิมพ์ใบเสร็จบลูทูธที่คุณจับคู่ไว้แล้วในการตั้งค่า Android แอปแสดงเฉพาะอุปกรณ์ที่จับคู่แล้ว ไม่สแกนหาอุปกรณ์ใกล้เคียงและไม่ใช้ตำแหน่งที่ตั้งของคุณ',
        'อินเทอร์เน็ต: เพื่อพิมพ์ไปยังเครื่องพิมพ์ Wi-Fi/LAN ในเครือข่ายของคุณ เพื่อเปิดลิงก์ (เช่นนโยบายนี้) ในเบราว์เซอร์ และสำหรับเจ้าของร้าน เพื่อเข้าสู่ระบบด้วย Google และสำรองข้อมูลไป Google Drive ของเจ้าของเอง แอปไม่ส่งข้อมูลไปยังเซิร์ฟเวอร์ใด ๆ ที่เราดูแล',
        'รูปภาพ: คุณเลือกรูปจากตัวเลือกไฟล์ของ Android เอง แอปไม่ขอสิทธิ์กล้อง ที่เก็บข้อมูล รายชื่อติดต่อ ไมโครโฟน หรือตำแหน่งที่ตั้ง'] }]],
      ['อะไรออกจากเครื่องของคุณ และไปที่ไหน', [{ ul: [
        'การพิมพ์: ใบออเดอร์ถูกส่งไปยังเครื่องพิมพ์ที่คุณตั้งค่าไว้เท่านั้น',
        'การบันทึกและแชร์: เมื่อคุณบันทึกหรือแชร์รายงานปิดยอด (PDF หรือรูป) หรือไฟล์สำรองข้อมูล หน้าต่างแชร์ของ Android จะเปิดขึ้น และไฟล์จะไปที่ที่คุณเลือกเท่านั้น (เช่น LINE อีเมล หรือ Google Drive)',
        'Google Drive (เฉพาะเจ้าของ): ไฟล์สำรองและ PDF ปิดยอดรายวันถูกอัปโหลดจากเครื่องตรงไปยังโฟลเดอร์ “Moffee” ใน Google Drive ของเจ้าของเอง ภายใต้สิทธิ์แคบ drive.file ดู “เข้าสู่ระบบด้วย Google และสำรองข้อมูลไป Google Drive”',
        `ข้อเสนอแนะ: “ส่งข้อเสนอแนะ” เปิดแอปอีเมลของคุณพร้อมข้อความถึง ${EMAIL} ซึ่งอาจเติมเวอร์ชันแอป ภาษา และขนาดหน้าจอให้ล่วงหน้า จะไม่มีอะไรถูกส่งจนกว่าคุณจะกดส่งในแอปอีเมล จากนั้นเราจะได้รับข้อความและอีเมลของคุณ และใช้เพื่อตอบกลับและปรับปรุงแอปเท่านั้น ถ้าออฟไลน์ ข้อความจะค้างอยู่ในเครื่องจนกว่าคุณจะส่งอีกครั้ง`,
        'ลิงก์: หน้าเว็บที่คุณเปิด (เช่นนโยบายนี้) จะเปิดในเบราว์เซอร์ และอยู่ภายใต้นโยบายของเว็บไซต์นั้น ๆ'] }]],
      ['เว็บไซต์นี้', ['เว็บไซต์นี้เป็นหน้าแบบสถิตที่โฮสต์บน GitHub Pages เราไม่ใส่คุกกี้ เครื่องมือวิเคราะห์ โฆษณา หรือสคริปต์ของบุคคลที่สาม ที่เก็บข้อมูลในเบราว์เซอร์ของคุณ (local storage) มีเพียงภาษาที่คุณเลือกและเครื่องหมายขั้นตอนในหน้าเข้าร่วมทดสอบ ซึ่งอยู่ในเครื่องของคุณเอง ส่วน GitHub ในฐานะผู้โฮสต์อาจประมวลผลที่อยู่ IP ของผู้เข้าชมตามนโยบายความเป็นส่วนตัวของ GitHub']],
      ['เข้าสู่ระบบด้วย Google และสำรองข้อมูลไป Google Drive', [
        'ตั้งแต่เวอร์ชัน 1.6 เจ้าของร้านเข้าสู่ระบบด้วย Google ครั้งเดียวตอนตั้งค่าครั้งแรก พนักงานไม่ต้องเข้าสู่ระบบ และหลังจากนั้นแอปใช้งานออฟไลน์ได้ การเข้าสู่ระบบใช้ Firebase Authentication ซึ่งเป็นบริการของ Google',
        { ul: [
          'สิ่งที่เราได้จากการเข้าสู่ระบบ: ชื่อบัญชี Google อีเมล และรหัสผู้ใช้ Firebase (uid) ข้อมูลนี้อยู่ใน Firebase Authentication (Google) และในเครื่องของคุณ เพื่อแสดงบัญชีที่เข้าสู่ระบบในเมนูจัดการ เราไม่ใช้เพื่อเรื่องอื่น และไม่ขายหรือแบ่งปันข้อมูลนี้',
          'Google Drive: เมื่อคุณอนุญาต และเฉพาะสิทธิ์แคบ “drive.file” (แอปเห็นเฉพาะไฟล์ที่แอปสร้างเอง) แอปจะบันทึกไฟล์สำรอง (เมนู รูปภาพ แบบใบออเดอร์ การตั้งค่า บันทึกการขาย) และ PDF ปิดยอดรายวันลงในโฟลเดอร์ “Moffee” ใน Google Drive ของคุณเอง ไฟล์ไปจากเครื่องตรงไปยัง Drive ของคุณ ไม่ผ่านเซิร์ฟเวอร์ใด ๆ ของเรา และเรามองไม่เห็น PIN ผู้จัดการไม่ถูกรวมในไฟล์สำรอง',
          'การควบคุม: สำรองข้อมูลเมื่อกด “สำรองตอนนี้” และอัตโนมัติวันละครั้งหลังปิดยอดเมื่อเครื่องออนไลน์ การกู้คืนต้องใช้ PIN ผู้จัดการและการยืนยัน คุณออกจากระบบหรือลบบัญชีได้ในเมนูจัดการ (บัญชี) และเพิกถอนสิทธิ์ของ Moffee ได้ในบัญชี Google (ความปลอดภัย › การเข้าถึงของบุคคลที่สาม)',
          'Google ประมวลผลการเข้าสู่ระบบและ Drive ตามนโยบายความเป็นส่วนตัวของ Google เอง'] }]],
      ['ระยะเวลาเก็บรักษาและการลบข้อมูล', [{ ul: [
        'ข้อมูลในเครื่องอยู่จนกว่าคุณจะลบในแอป (จัดการร้าน › ตั้งค่า › ล้างข้อมูลทั้งหมดและเริ่มใหม่) หรือถอนการติดตั้งแอป',
        'บันทึกการขาย ไฟล์สำรอง และรายงานปิดยอดที่บันทึกใน Google Drive ของเจ้าของเองจะถูกเก็บไว้เป็นค่าเริ่มต้น เพราะอาจเป็นเอกสารทางภาษี จะลบก็ต่อเมื่อเจ้าของติ๊ก “ลบข้อมูลสำรอง/รายงานของ Moffee ออกจาก Google Drive ด้วย” ตอนลบบัญชีในแอป (ต้องใช้ PIN ผู้จัดการ) หรือลบใน Drive เอง การลบบัญชีจะลบผู้ใช้ Firebase (ชื่อ อีเมล uid) ออกจาก Firebase Authentication',
        'อีเมลที่คุณส่งถึงเรา เก็บไว้เท่าที่จำเป็นต่อการตอบกลับเท่านั้น'] },
        'ขั้นตอน: ดูหน้า “ขอลบข้อมูลและบัญชี”']],
      ['สิทธิของคุณ', [`คุณขอทราบ แก้ไข หรือลบข้อมูลส่วนบุคคลใด ๆ ที่เราเก็บ และถอนความยินยอมได้ เนื่องจากข้อมูลการขายอยู่ในเครื่องและ Drive ของคุณเอง คุณจึงควบคุมได้โดยตรง สำหรับสิ่งที่เราเก็บ (เช่นอีเมลที่คุณส่งมา) โปรดเขียนถึง ${EMAIL} เราจะดำเนินการโดยไม่ชักช้าและภายใน 30 วัน ในประเทศไทยคุณยังร้องเรียนต่อคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.) ได้`]],
      ['ความปลอดภัย', ['ข้อมูลอยู่ในเครื่อง จึงได้รับการปกป้องด้วยการล็อกแท็บเล็ตของคุณ ฟังก์ชันของผู้จัดการต้องใช้ PIN ซึ่งเก็บเป็นค่าแฮชที่ใส่ salt เท่านั้น โปรดล็อกแท็บเล็ตและเก็บรหัสกู้คืนให้ปลอดภัย การพิมพ์ไปยังเครื่องพิมพ์บลูทูธ/LAN ใช้การเชื่อมต่อในเครือข่ายของคุณเอง']],
      ['เด็ก', ['แอปนี้สำหรับพนักงานและเจ้าของร้านอายุ 18 ปีขึ้นไป ไม่ได้ออกแบบสำหรับเด็ก และเราไม่เก็บข้อมูลของเด็กโดยเจตนา']],
      ['การเปลี่ยนแปลง', ['หากมีการเปลี่ยนแปลงสำคัญ เราจะปรับวันที่ด้านบน และแจ้งในประกาศของแอป']],
      ['ติดต่อเรา', [`${OPERATOR} · ${EMAIL}`]],
    ],
    ko: [
      ['운영자', [`Moffee(모피, Android 패키지 com.motoraa.cafemenu)는 ${OPERATOR}(“저희”)가 Motor AA Garage Cafe와 다른 작은 가게를 위해 만든 카페 카운터 주문 앱입니다. 문의: ${EMAIL}. 이 방침은 앱과 이 웹사이트가 무엇을 저장하고 보내는지 쉬운 말로 설명합니다.`]],
      ['한눈에 보기', [{ ul: [
        '광고가 전혀 없습니다. 분석, 추적, 오류 수집 도구도 없습니다.',
        '결제를 처리하지 않습니다. 카드 결제는 가게의 별도 카드 단말기로 합니다. 앱은 결제 태그(PromptPay / 카드 / 현금)만 기록하며 카드 번호를 보지 못합니다.',
        '앱은 오프라인으로 동작합니다. 메뉴, 주문, 지출, 리포트는 기기 안에만 있습니다.',
        '저희는 매출 데이터를 수집하는 서버를 운영하지 않습니다. 주문, 리포트, 사진을 받지 않습니다.',
        '1.6 버전부터 사장님이 첫 설정 때 Google로 한 번 로그인합니다(이름, 이메일, 사용자 ID — Google의 Firebase Authentication). 직원은 로그인하지 않으며 앱은 계속 오프라인으로 동작합니다. “Google 로그인과 Google Drive 백업”을 참고하세요.'] }]],
      ['앱이 기기에 저장하는 것', [{ ul: [
        '가게 설정: 가게 이름, 테마 색, 로고, 티켓 모양, 프린터 설정(프린터 이름, 블루투스 주소 또는 로컬 IP 주소와 포트), 언어, 마감 리포트에 쓰는 “예금주 이름”(이름만 — 은행 계좌나 카드 번호는 입력하지 마세요).',
        '메뉴: 카테고리, 항목, 가격, 옵션, 직접 고른 사진.',
        '주문: 항목, 옵션, 메모, 할인, 합계, 주문·대기 번호, 시각, 결제 태그, 주문을 취소할 때 직접 입력한 사유.',
        '지출(영수증 사진은 선택)과 일일 마감 리포트.',
        '매니저 PIN과 복구 코드: 솔트가 붙은 해시로만 저장되어 다시 읽을 수 없으며, 매니저 기능을 여는 데 쓰입니다.',
        '손님에게 이름, 전화번호, 이메일을 묻지 않습니다. 메모에 적는 내용은 사용자가 정하며, 메모에는 개인정보를 적지 마세요.'] },
        '이 모든 것은 기기 안의 앱 전용 저장 공간에 있습니다. 앱은 Android의 기기 보호(화면 잠금 / 기기 암호화) 위에 자체 암호화를 더하지 않으며, 이 앱의 Android 클라우드 백업은 꺼져 있습니다.']],
      ['앱이 요청하는 권한', [{ ul: [
        '블루투스(블루투스 연결, Android 11 이하에서는 Bluetooth와 Bluetooth admin도 포함): Android 설정에서 이미 페어링한 블루투스 영수증 프린터로 출력하기 위해서입니다. 앱은 페어링된 기기만 보여 주며, 주변 기기를 검색하거나 위치를 사용하지 않습니다.',
        '인터넷: 같은 네트워크의 Wi-Fi/LAN 프린터로 출력하고, 링크(예: 이 방침)를 브라우저에서 열고, 사장님이 Google에 로그인하고 본인의 Google Drive에 백업하기 위해서입니다. 앱은 저희가 운영하는 어떤 서버로도 데이터를 보내지 않습니다.',
        '사진: Android 기본 파일 선택기로 직접 사진을 고릅니다. 앱은 카메라, 저장소, 연락처, 마이크, 위치 권한을 요청하지 않습니다.'] }]],
      ['기기 밖으로 나가는 것과 보내지는 곳', [{ ul: [
        '출력: 티켓은 설정해 둔 프린터로만 보내집니다.',
        '저장과 공유: 마감 리포트(PDF 또는 이미지)나 백업 파일을 저장·공유하면 Android 공유 창이 열리고, 파일은 직접 고른 곳(예: LINE, 이메일, Google Drive)으로만 갑니다.',
        'Google Drive(사장님 전용): 백업과 일일 마감 PDF가 기기에서 사장님 본인의 Google Drive의 “Moffee” 폴더로 바로 업로드됩니다(좁은 drive.file 권한). “Google 로그인과 Google Drive 백업”을 참고하세요.',
        `피드백: “피드백 보내기”는 ${EMAIL}로 보내는 메시지와 함께 메일 앱을 열며, 앱 버전·언어·화면 크기가 미리 채워질 수 있습니다. 메일 앱에서 보내기를 누르기 전에는 아무것도 전송되지 않습니다. 보내면 저희가 메시지와 이메일 주소를 받아 답장과 앱 개선에만 사용합니다. 오프라인이면 다시 보낼 때까지 글이 기기에 보관됩니다.`,
        '링크: 여는 페이지(예: 이 방침)는 브라우저에서 열리며 해당 사이트의 정책을 따릅니다.'] }]],
      ['이 웹사이트', ['이 사이트는 GitHub Pages에 올린 정적 페이지입니다. 쿠키, 분석 도구, 광고, 제3자 스크립트를 넣지 않습니다. 브라우저의 로컬 저장소에는 선택한 언어와 참여 페이지의 단계 체크만 내 기기에 저장됩니다. 호스팅을 맡은 GitHub는 자체 개인정보 처리방침에 따라 방문자 IP 주소를 처리할 수 있습니다.']],
      ['Google 로그인과 Google Drive 백업', [
        '1.6 버전부터 사장님이 첫 설정 때 Google로 한 번 로그인합니다. 직원은 로그인하지 않으며, 이후 앱은 오프라인으로 동작합니다. 로그인은 Google 서비스인 Firebase Authentication을 사용합니다.',
        { ul: [
          '로그인으로 받는 정보: Google 계정 이름, 이메일 주소, Firebase 사용자 ID(uid). Firebase Authentication(Google)과 기기에 보관되며, 관리 메뉴에 로그인한 계정을 보여주는 데만 씁니다. 다른 용도로 쓰거나 판매·공유하지 않습니다.',
          'Google Drive: 허락하신 경우에만, 좁은 “drive.file” 권한(앱이 직접 만든 파일만 볼 수 있음)으로 백업(메뉴, 사진, 주문서 디자인, 설정, 매출 기록)과 일일 마감 PDF를 사장님 본인의 Google Drive의 “Moffee” 폴더에 저장합니다. 파일은 기기에서 사장님의 Drive로 바로 가며 저희 서버를 거치지 않고 저희는 볼 수 없습니다. 매니저 PIN은 백업에 포함되지 않습니다.',
          '관리: “지금 백업”을 누르면 백업되고, 온라인일 때 마감 후 하루 한 번 자동 백업됩니다. 복원에는 매니저 PIN과 확인이 필요합니다. 관리 메뉴(계정)에서 로그아웃하거나 계정을 삭제할 수 있고, Google 계정(보안 › 서드파티 액세스)에서 Moffee의 접근 권한을 없앨 수도 있습니다.',
          '로그인과 Drive는 Google의 개인정보 처리방침에 따라 Google이 처리합니다.'] }]],
      ['보관 기간과 삭제', [{ ul: [
        '기기의 데이터는 앱에서 지우거나(관리 › 설정 › 모든 데이터 지우고 새로 시작) 앱을 삭제할 때까지 남습니다.',
        '사장님 본인의 Google Drive에 저장된 매출 기록, 백업, 마감 리포트는 세무 자료일 수 있어 기본으로 보관됩니다. 앱에서 계정을 삭제할 때 “Google Drive의 Moffee 백업/리포트도 함께 삭제”를 체크하고 매니저 PIN을 입력하거나, Drive에서 직접 지울 때만 삭제됩니다. 계정 삭제는 Firebase Authentication에서 Firebase 사용자(이름, 이메일, uid)를 지웁니다.',
        '저희에게 보낸 이메일은 답변에 필요한 기간만 보관합니다.'] },
        '절차: “데이터 및 계정 삭제” 페이지를 보세요.']],
      ['이용자의 권리', [`저희가 가진 개인정보에 대해 열람, 정정, 삭제를 요청하거나 동의를 철회할 수 있습니다. 매출 데이터는 기기와 본인의 Drive에 있으므로 직접 관리하실 수 있습니다. 저희가 가진 것(예: 보내 주신 이메일)은 ${EMAIL}로 요청해 주세요. 지체 없이, 늦어도 30일 안에 처리합니다. 태국에서는 개인정보보호위원회(PDPC)에 민원을 낼 수도 있습니다.`]],
      ['보안', ['데이터가 기기 안에 있으므로 태블릿 잠금으로 보호됩니다. 매니저 기능에는 PIN이 필요하며 PIN은 솔트가 붙은 해시로만 저장됩니다. 태블릿을 잠가 두고 복구 코드를 안전하게 보관하세요. 블루투스/LAN 프린터 출력은 사용자의 로컬 연결을 씁니다.']],
      ['아동', ['이 앱은 만 18세 이상의 가게 직원과 사장님을 위한 것입니다. 아동용으로 설계되지 않았으며 아동의 정보를 알면서 수집하지 않습니다.']],
      ['변경', ['중요한 변경이 있으면 위의 날짜를 고치고 앱의 공지로 알립니다.']],
      ['문의', [`${OPERATOR} · ${EMAIL}`]],
    ],
    zh: [
      ['我们是谁', [`Moffee（Android 包名 com.motoraa.cafemenu）是由 ${OPERATOR}（“我们”）为 Motor AA Garage Cafe 及其他小店制作的咖啡店柜台点单应用。联系方式：${EMAIL}。本政策用通俗的话说明应用和本网站会保存和发送什么。`]],
      ['简要说明', [{ ul: [
        '完全没有广告。没有统计分析、跟踪或崩溃上报工具。',
        '不处理支付。刷卡通过店里单独的刷卡机完成。应用只记录付款方式标签（PromptPay / 银行卡 / 现金），看不到任何卡号。',
        '应用可离线使用。菜单、订单、支出和报表都只保存在你的设备上。',
        '我们不运营收集销售数据的服务器，不会收到你的订单、报表或照片。',
        '从 1.6 版本起，店主在首次设置时用 Google 登录一次（姓名、邮箱和用户 ID，通过 Google 的 Firebase Authentication）。员工无需登录，应用仍可离线使用。详见“Google 登录与 Google Drive 备份”。'] }]],
      ['应用在你的设备上保存什么', [{ ul: [
        '店铺设置：店名、主题颜色、标志、小票样式、打印机设置（打印机名称、蓝牙地址或本地 IP 地址和端口）、语言，以及日结报表中的“账户持有人”（仅填姓名，请勿填写银行账号或卡号）。',
        '菜单：类别、商品、价格、选项和你选择的图片。',
        '订单：商品、选项、备注、折扣、合计、订单号和排队号、时间、付款方式标签，以及作废订单时你输入的原因。',
        '支出（可附收据照片）和每日日结报表。',
        '店长 PIN 和恢复码：仅以加盐哈希形式保存，无法还原，用于解锁店长功能。',
        '我们从不向顾客索要姓名、电话或邮箱。你在备注里填什么由你决定，请不要在备注里写个人信息。'] },
        '以上内容都保存在设备上应用的私有存储中。应用没有在 Android 设备保护（锁屏 / 设备加密）之外再加自己的加密，且已关闭本应用的 Android 云备份。']],
      ['应用申请的权限', [{ ul: [
        '蓝牙（蓝牙连接；Android 11 及更低版本还包括蓝牙和蓝牙管理）：用于打印到你已在 Android 设置中配对的蓝牙小票打印机。应用只列出已配对的设备，不会扫描附近设备，也不使用你的位置。',
        '互联网：用于打印到本地网络的 Wi-Fi/LAN 打印机、在浏览器中打开链接（如本政策），以及供店主使用 Google 登录并备份到店主自己的 Google Drive。应用不会向我们运营的任何服务器发送数据。',
        '照片：你通过 Android 自带的文件选择器选择图片。应用不申请相机、存储、通讯录、麦克风或位置权限。'] }]],
      ['哪些内容会离开设备，去向何处', [{ ul: [
        '打印：小票只会发送到你设置的打印机。',
        '保存和分享：保存或分享日结报表（PDF 或图片）或备份文件时，会打开 Android 分享面板，文件只会发送到你选择的地方（例如 LINE、邮件或 Google Drive）。',
        'Google Drive（仅店主）：备份和每日日结 PDF 会从设备直接上传到店主自己 Google Drive 中的“Moffee”文件夹，仅使用窄权限 drive.file。详见“Google 登录与 Google Drive 备份”。',
        `反馈：“发送反馈”会打开你的邮件应用，写好发给 ${EMAIL} 的邮件，并可预填应用版本、语言和屏幕大小。你在邮件应用中点发送之前不会发出任何内容。发送后我们会收到你的内容和邮箱地址，仅用于回复和改进应用。离线时文字会保存在设备上，等你再次发送。`,
        '链接：你打开的页面（例如本政策）在浏览器中打开，适用该网站自己的政策。'] }]],
      ['本网站', ['本网站是托管在 GitHub Pages 上的静态页面。我们不添加 Cookie、统计分析、广告或第三方脚本。浏览器的本地存储只在你自己的设备上保存你选择的语言和“加入测试”页的步骤勾选。作为托管方，GitHub 可能按其自身隐私声明处理访问者的 IP 地址。']],
      ['Google 登录与 Google Drive 备份', [
        '从 1.6 版本起，店主在首次设置时用 Google 登录一次。员工无需登录，之后应用可离线使用。登录使用 Google 的服务 Firebase Authentication。',
        { ul: [
          '登录会给我们的信息：你的 Google 账号姓名、邮箱地址和 Firebase 用户 ID（uid）。它们保存在 Firebase Authentication（Google）和你的设备上，仅用于在管理菜单中显示已登录账号。我们不会用于其他用途，也不会出售或分享。',
          'Google Drive：经你许可，且仅使用窄权限“drive.file”（应用只能看到自己创建的文件），应用会把备份（菜单、照片、小票设计、设置、销售记录）和每日日结 PDF 保存到你自己 Google Drive 中名为“Moffee”的文件夹。文件从设备直接发送到你的 Drive，不经过我们的任何服务器，我们也看不到。店长 PIN 不包含在备份中。',
          '控制：点击“立即备份”时备份；设备在线时，每天关店后自动备份一次。恢复需要店长 PIN 和确认。你可以在管理菜单（账户）中退出登录或删除账户，也可以在 Google 账号（安全 › 第三方访问）中移除 Moffee 的访问权限。',
          '登录和 Drive 由 Google 按其自身的隐私政策处理。'] }]],
      ['保存多久，如何删除', [{ ul: [
        '设备上的数据会一直保存，直到你在应用中清除（管理 › 设置 › 清除所有数据并重新开始）或卸载应用。',
        '保存在店主自己 Google Drive 中的销售记录、备份和日结报表默认保留，因为它们可能是税务记录。只有店主在应用中删除账户时勾选“同时删除 Google Drive 中的 Moffee 备份/报表”并输入店长 PIN，或在 Drive 中自行删除时才会删除。删除账户会从 Firebase Authentication 中删除 Firebase 用户（姓名、邮箱、uid）。',
        '你发给我们的邮件只在答复所需的时间内保存。'] },
        '具体步骤请看“删除数据和账号”页面。']],
      ['你的权利', [`你可以要求查阅、更正或删除我们持有的任何个人数据，也可以撤回同意。由于你的销售数据保存在你的设备和你自己的 Drive 上，你可以直接掌控。对于我们持有的内容（例如你发来的邮件），请写信至 ${EMAIL}，我们会及时处理，最迟 30 天内。在泰国，你还可以向个人数据保护委员会（PDPC）投诉。`]],
      ['安全', ['数据保存在设备上，因此由平板的锁屏保护。店长功能需要 PIN，PIN 仅以加盐哈希保存。请给平板上锁并妥善保管恢复码。通过蓝牙/LAN 打印使用的是你自己的本地连接。']],
      ['儿童', ['本应用面向 18 岁及以上的店员和店主，并非为儿童设计，我们不会故意收集儿童的数据。']],
      ['变更', ['如有重要变更，我们会更新上方日期，并在应用的公告中告知。']],
      ['联系我们', [`${OPERATOR} · ${EMAIL}`]],
    ],
    hi: [
      ['हम कौन हैं', [`Moffee (Android पैकेज com.motoraa.cafemenu) कॉफ़ी शॉप के लिए काउंटर ऑर्डर ऐप है, जिसे ${OPERATOR} (“हम”) ने Motor AA Garage Cafe और अन्य छोटी दुकानों के लिए बनाया है। संपर्क: ${EMAIL}। यह नीति सरल शब्दों में बताती है कि ऐप और यह वेबसाइट क्या सहेजती और भेजती हैं।`]],
      ['संक्षेप में', [{ ul: [
        'कोई विज्ञापन नहीं। कोई एनालिटिक्स, ट्रैकिंग या क्रैश-रिपोर्टिंग टूल नहीं।',
        'भुगतान प्रोसेस नहीं होता। कार्ड भुगतान आपकी अपनी अलग कार्ड मशीन से होता है। ऐप केवल भुगतान का टैग (PromptPay / कार्ड / नकद) दर्ज करता है और कार्ड नंबर कभी नहीं देखता।',
        'ऐप ऑफ़लाइन चलता है। आपका मेनू, ऑर्डर, खर्च और रिपोर्ट आपके डिवाइस पर ही रहते हैं।',
        'हम बिक्री का डेटा इकट्ठा करने वाला कोई सर्वर नहीं चलाते। हमें आपके ऑर्डर, रिपोर्ट या फ़ोटो नहीं मिलते।',
        'संस्करण 1.6 से दुकान के मालिक पहली बार सेटअप में एक बार Google से साइन-इन करते हैं (नाम, ईमेल और यूज़र ID, Google के Firebase Authentication के ज़रिए)। स्टाफ़ साइन-इन नहीं करता और ऐप ऑफ़लाइन चलता रहता है। “Google साइन-इन और Google Drive बैकअप” देखें।'] }]],
      ['ऐप आपके डिवाइस पर क्या सहेजता है', [{ ul: [
        'दुकान की सेटिंग: दुकान का नाम, थीम के रंग, लोगो, टिकट का लेआउट, प्रिंटर की सेटिंग (प्रिंटर का नाम, ब्लूटूथ पता या लोकल IP पता और पोर्ट), भाषा, और क्लोज़िंग रिपोर्ट में इस्तेमाल होने वाला “खाताधारक का नाम” (केवल नाम — कृपया बैंक या कार्ड नंबर न लिखें)।',
        'मेनू: श्रेणियाँ, आइटम, कीमतें, विकल्प और आपकी चुनी हुई फ़ोटो।',
        'ऑर्डर: आइटम, विकल्प, नोट, छूट, कुल राशि, ऑर्डर और कतार के नंबर, समय, भुगतान का टैग, और ऑर्डर रद्द करते समय आपका लिखा कारण।',
        'खर्च (रसीद की फ़ोटो वैकल्पिक) और दैनिक क्लोज़िंग रिपोर्ट।',
        'मैनेजर PIN और रिकवरी कोड: केवल सॉल्ट के साथ हैश के रूप में रखे जाते हैं, जिन्हें वापस पढ़ा नहीं जा सकता। इनसे मैनेजर के फ़ंक्शन खुलते हैं।',
        'ग्राहकों से कभी नाम, फ़ोन नंबर या ईमेल नहीं माँगा जाता। नोट में आप जो लिखते हैं वह आपके हाथ में है — कृपया नोट में व्यक्तिगत जानकारी न लिखें।'] },
        'यह सब डिवाइस पर ऐप के निजी स्टोरेज में रहता है। ऐप Android की डिवाइस सुरक्षा (स्क्रीन लॉक / डिवाइस एन्क्रिप्शन) के ऊपर अपनी कोई एन्क्रिप्शन नहीं जोड़ता, और इस ऐप का Android क्लाउड बैकअप बंद है।']],
      ['ऐप कौन-सी अनुमतियाँ माँगता है', [{ ul: [
        'ब्लूटूथ (ब्लूटूथ कनेक्ट; Android 11 और उससे पुराने में Bluetooth और Bluetooth admin भी): उस ब्लूटूथ रसीद प्रिंटर पर प्रिंट करने के लिए जिसे आपने Android सेटिंग में पहले ही पेयर किया है। ऐप केवल पेयर किए डिवाइस दिखाता है। यह आसपास के डिवाइस नहीं खोजता और आपकी लोकेशन का उपयोग नहीं करता।',
        'इंटरनेट: आपके लोकल नेटवर्क के Wi-Fi/LAN प्रिंटर पर प्रिंट करने, लिंक (जैसे यह नीति) ब्राउज़र में खोलने, और मालिक के लिए Google से साइन-इन करने व मालिक के अपने Google Drive में बैकअप लेने के लिए। ऐप हमारे चलाए किसी सर्वर को डेटा नहीं भेजता।',
        'फ़ोटो: आप Android के अपने फ़ाइल चयनकर्ता से तस्वीर चुनते हैं। ऐप कैमरा, स्टोरेज, कॉन्टैक्ट, माइक्रोफ़ोन या लोकेशन की अनुमति नहीं माँगता।'] }]],
      ['डिवाइस से बाहर क्या जाता है, और कहाँ', [{ ul: [
        'प्रिंटिंग: टिकट केवल आपके सेट किए प्रिंटर को भेजा जाता है।',
        'सहेजना और शेयर करना: जब आप क्लोज़िंग रिपोर्ट (PDF या इमेज) या बैकअप फ़ाइल सहेजते या शेयर करते हैं, तो Android की शेयर शीट खुलती है और फ़ाइल केवल वहीं जाती है जहाँ आप चुनते हैं (जैसे LINE, ईमेल या Google Drive)।',
        'Google Drive (केवल मालिक): बैकअप और रोज़ की क्लोज़िंग PDF डिवाइस से सीधे मालिक के अपने Google Drive के “Moffee” फ़ोल्डर में अपलोड होती हैं, सीमित drive.file अनुमति के तहत। “Google साइन-इन और Google Drive बैकअप” देखें।',
        `फ़ीडबैक: “फ़ीडबैक भेजें” आपका मेल ऐप खोलता है, जिसमें ${EMAIL} के लिए संदेश होता है और ऐप संस्करण, भाषा व स्क्रीन आकार पहले से भरे हो सकते हैं। जब तक आप मेल ऐप में भेजें नहीं दबाते, कुछ नहीं भेजा जाता। भेजने पर हमें आपका संदेश और ईमेल पता मिलता है, जिसे हम केवल जवाब देने और ऐप सुधारने के लिए इस्तेमाल करते हैं। ऑफ़लाइन होने पर टेक्स्ट दोबारा भेजने तक डिवाइस पर रखा रहता है।`,
        'लिंक: आप जो पेज खोलते हैं (जैसे यह नीति) वे ब्राउज़र में खुलते हैं और उन साइटों की अपनी नीतियाँ लागू होती हैं।'] }]],
      ['यह वेबसाइट', ['यह साइट GitHub Pages पर होस्ट किया गया स्थिर पेज है। हम कोई कुकी, एनालिटिक्स, विज्ञापन या तीसरे पक्ष की स्क्रिप्ट नहीं जोड़ते। आपके ब्राउज़र का लोकल स्टोरेज आपके अपने डिवाइस पर केवल आपकी चुनी भाषा और जॉइन पेज के कदमों के निशान रखता है। होस्ट के रूप में GitHub अपनी गोपनीयता नीति के अनुसार विज़िटरों के IP पते प्रोसेस कर सकता है।']],
      ['Google साइन-इन और Google Drive बैकअप', [
        'संस्करण 1.6 से दुकान के मालिक पहली बार सेटअप में एक बार Google से साइन-इन करते हैं। स्टाफ़ साइन-इन नहीं करता, और उसके बाद ऐप ऑफ़लाइन चलता है। साइन-इन Google की सेवा Firebase Authentication से होता है।',
        { ul: [
          'साइन-इन से हमें क्या मिलता है: आपके Google खाते का नाम, ईमेल पता और Firebase यूज़र ID (uid)। ये Firebase Authentication (Google) और आपके डिवाइस पर रहते हैं, ताकि मैनेज मेन्यू में साइन-इन खाता दिखे। हम इन्हें किसी और काम में नहीं लेते, और न बेचते या साझा करते हैं।',
          'Google Drive: आपकी अनुमति से, और केवल सीमित “drive.file” दायरे में (ऐप सिर्फ़ अपनी बनाई फ़ाइलें देख सकता है), ऐप बैकअप (मेन्यू, फ़ोटो, टिकट डिज़ाइन, सेटिंग, बिक्री रिकॉर्ड) और रोज़ की क्लोज़िंग PDF आपके अपने Google Drive के “Moffee” फ़ोल्डर में सहेजता है। फ़ाइलें डिवाइस से सीधे आपके Drive में जाती हैं; ये हमारे किसी सर्वर से नहीं गुज़रतीं और हम इन्हें नहीं देख सकते। मैनेजर PIN बैकअप में शामिल नहीं होता।',
          'नियंत्रण: “अभी बैकअप लें” दबाने पर बैकअप होता है, और डिवाइस ऑनलाइन हो तो दिन बंद करने के बाद रोज़ एक बार अपने-आप। रीस्टोर के लिए मैनेजर PIN और पुष्टि चाहिए। आप मैनेज मेन्यू (खाता) में साइन आउट या खाता हटा सकते हैं, और अपने Google खाते (सुरक्षा › तीसरे पक्ष की पहुँच) में Moffee की पहुँच हटा सकते हैं।',
          'साइन-इन और Drive को Google अपनी गोपनीयता नीति के अनुसार प्रोसेस करता है।'] }]],
      ['डेटा कितने समय रखा जाता है और उसे हटाना', [{ ul: [
        'डिवाइस का डेटा तब तक रहता है जब तक आप उसे ऐप में मिटा नहीं देते (प्रबंधन › सेटिंग्स › सारा डेटा मिटाकर नए सिरे से शुरू करें) या ऐप अनइंस्टॉल नहीं कर देते।',
        'मालिक के अपने Google Drive में सहेजे बिक्री रिकॉर्ड, बैकअप और क्लोज़िंग रिपोर्ट डिफ़ॉल्ट रूप से रखे जाते हैं, क्योंकि वे कर संबंधी रिकॉर्ड हो सकते हैं। ये तभी हटते हैं जब मालिक ऐप में खाता हटाते समय “Google Drive से Moffee बैकअप/रिपोर्ट भी हटाएँ” चुनकर मैनेजर PIN डालता है, या Drive में सीधे हटाता है। खाता हटाने पर Firebase Authentication से Firebase यूज़र (नाम, ईमेल, uid) हट जाता है।',
        'आपके भेजे ईमेल केवल जवाब देने के लिए ज़रूरी समय तक रखे जाते हैं।'] },
        'चरण-दर-चरण: “डेटा और खाता हटाएँ” पेज देखें।']],
      ['आपके अधिकार', [`हमारे पास मौजूद किसी भी व्यक्तिगत डेटा के बारे में आप पूछ सकते हैं, उसे सुधरवा या हटवा सकते हैं, और सहमति वापस ले सकते हैं। क्योंकि आपका बिक्री डेटा आपके डिवाइस और आपके अपने Drive में है, आप उसे सीधे नियंत्रित करते हैं। हमारे पास जो है (जैसे आपका भेजा ईमेल) उसके लिए ${EMAIL} पर लिखें; हम बिना देरी, अधिकतम 30 दिनों में कार्रवाई करेंगे। थाईलैंड में आप व्यक्तिगत डेटा संरक्षण समिति (PDPC) में शिकायत भी कर सकते हैं।`]],
      ['सुरक्षा', ['डेटा डिवाइस पर रहता है, इसलिए आपके टैबलेट के लॉक से सुरक्षित है। मैनेजर के फ़ंक्शन के लिए PIN चाहिए, जो केवल सॉल्ट वाले हैश के रूप में रखा जाता है। टैबलेट को लॉक रखें और रिकवरी कोड सुरक्षित रखें। ब्लूटूथ/LAN प्रिंटर पर प्रिंटिंग आपके अपने लोकल कनेक्शन से होती है।']],
      ['बच्चे', ['यह ऐप 18 वर्ष और उससे अधिक उम्र के दुकान के स्टाफ़ और मालिकों के लिए है। यह बच्चों के लिए डिज़ाइन नहीं किया गया है और हम जानबूझकर बच्चों का डेटा इकट्ठा नहीं करते।']],
      ['बदलाव', ['महत्वपूर्ण बदलाव होने पर हम ऊपर की तारीख अपडेट करेंगे और ऐप की सूचनाओं में बताएँगे।']],
      ['संपर्क', [`${OPERATOR} · ${EMAIL}`]],
    ],
  };
  const DELETE = {
    en: [
      ['Option 1: erase the data on the device (in the app)', [{ ol: [
        'Open Moffee, tap “Manager” and enter your manager PIN.',
        'Go to Manage › Settings.',
        'Tap “Erase all data and start over” and confirm.',
        'The menu, orders, expenses, closing reports, printer and shop settings and the PIN on this device are erased at once. Uninstalling the app also removes everything stored on the device.'] },
        'Tip: if you still need your records, save or share your closing reports and a backup file first. Forgot the PIN? Use “Forgot PIN” with the recovery code shown when you set it.']],
      ['Google account and Google Drive records', ['Version 1.6 has an owner-only Google sign-in. To delete it, open Moffee › Manager (PIN) › Account › “Delete account”, enter the PIN and confirm. This deletes the Firebase user (name, email, user ID) and clears the sign-in on the device. Files in the owner’s own Google Drive (the “Moffee” folder: backups and Reports) are kept by default, because they may be tax records. They are deleted only if you tick “Also delete Moffee backups/reports from Google Drive” (unticked by default) on that screen; this needs an internet connection, and if it fails nothing is removed and the account stays so you can retry. You can also delete the files yourself in Google Drive, and remove Moffee’s access in your Google Account (Security › Third-party access).']],
      ['Option 2: request by email', [`If you cannot use the app, email ${EMAIL} with the subject “Delete my Moffee data”, from the address you want us to act on, and say what you want deleted (for example emails you sent us). We have no sales data of our own and no access to your device or your Drive, so normally the only thing we can delete on our side is the correspondence you sent us. We reply within 30 days and tell you what we deleted and how to erase the rest yourself.`]],
      ['What is deleted, and what is kept', [{ ul: [
        'Deleted by option 1: everything Moffee stored on the device.',
        'Kept by default: backups, sales records and reports in the owner’s own Google Drive, until the owner deletes them as described above.',
        'Deleted on request: emails you sent us (option 2).',
        'Deleted by “Delete account” in the app: the Firebase sign-in account (name, email, user ID). We hold no other account data.'] }]],
      ['Note', ['Erasing cannot be undone. The app is for people aged 18 and over.']],
    ],
    th: [
      ['วิธีที่ 1: ลบข้อมูลในเครื่อง (ในแอป)', [{ ol: [
        'เปิด Moffee กด “ผู้จัดการ” แล้วใส่ PIN ผู้จัดการ',
        'ไปที่ จัดการร้าน › ตั้งค่า',
        'กด “ล้างข้อมูลทั้งหมดและเริ่มใหม่” แล้วยืนยัน',
        'เมนู ออเดอร์ ค่าใช้จ่าย รายงานปิดยอด การตั้งค่าเครื่องพิมพ์และร้าน และ PIN ในเครื่องนี้จะถูกลบทันที การถอนการติดตั้งแอปก็ลบทุกอย่างที่เก็บในเครื่องเช่นกัน'] },
        'เคล็ดลับ: ถ้ายังต้องใช้ข้อมูล ให้บันทึกหรือแชร์รายงานปิดยอดและไฟล์สำรองข้อมูลไว้ก่อน ลืม PIN? ใช้ “ลืม PIN” กับรหัสกู้คืนที่แสดงตอนตั้ง PIN']],
      ['บัญชี Google และข้อมูลใน Google Drive', ['เวอร์ชัน 1.6 มีการเข้าสู่ระบบด้วย Google เฉพาะเจ้าของร้าน การลบ: เปิด Moffee › ผู้จัดการ (PIN) › บัญชี › “ลบบัญชี” ใส่ PIN แล้วยืนยัน ระบบจะลบผู้ใช้ Firebase (ชื่อ อีเมล รหัสผู้ใช้) และล้างการเข้าสู่ระบบในเครื่อง ไฟล์ใน Google Drive ของเจ้าของเอง (โฟลเดอร์ “Moffee”: ไฟล์สำรองและ Reports) จะถูกเก็บไว้เป็นค่าเริ่มต้น เพราะอาจเป็นเอกสารทางภาษี จะลบก็ต่อเมื่อคุณติ๊ก “ลบข้อมูลสำรอง/รายงานของ Moffee ออกจาก Google Drive ด้วย” (ไม่ติ๊กเป็นค่าเริ่มต้น) ในหน้านั้น ต้องต่ออินเทอร์เน็ต และถ้าล้มเหลวจะไม่มีอะไรถูกลบและบัญชียังอยู่เพื่อให้ลองใหม่ คุณลบไฟล์เองใน Google Drive และเพิกถอนสิทธิ์ของ Moffee ในบัญชี Google ได้ (ความปลอดภัย › การเข้าถึงของบุคคลที่สาม)']],
      ['วิธีที่ 2: ขอทางอีเมล', [`ถ้าใช้แอปไม่ได้ ส่งอีเมลถึง ${EMAIL} หัวข้อ “ขอลบข้อมูล Moffee” จากอีเมลที่ต้องการให้เราดำเนินการ และบอกว่าต้องการลบอะไร (เช่น อีเมลที่คุณเคยส่งถึงเรา) เราไม่มีข้อมูลการขายของเราเอง และเข้าถึงเครื่องหรือ Drive ของคุณไม่ได้ โดยปกติสิ่งเดียวที่เราลบได้ฝั่งเราคือข้อความที่คุณส่งมา เราตอบภายใน 30 วัน พร้อมบอกว่าลบอะไรไปและวิธีลบส่วนที่เหลือด้วยตัวเอง`]],
      ['อะไรถูกลบ และอะไรถูกเก็บไว้', [{ ul: [
        'ลบด้วยวิธีที่ 1: ทุกอย่างที่ Moffee เก็บไว้ในเครื่อง',
        'เก็บไว้เป็นค่าเริ่มต้น: ไฟล์สำรอง บันทึกการขาย และรายงานใน Google Drive ของเจ้าของเอง จนกว่าเจ้าของจะลบตามที่อธิบายข้างต้น',
        'ลบเมื่อร้องขอ: อีเมลที่คุณส่งถึงเรา (วิธีที่ 2)',
        'ลบด้วย “ลบบัญชี” ในแอป: บัญชีเข้าสู่ระบบ Firebase (ชื่อ อีเมล รหัสผู้ใช้) เราไม่มีข้อมูลบัญชีอื่น'] }]],
      ['หมายเหตุ', ['การลบทำย้อนกลับไม่ได้ แอปนี้สำหรับผู้ที่มีอายุ 18 ปีขึ้นไป']],
    ],
    ko: [
      ['방법 1: 기기의 데이터 지우기 (앱에서)', [{ ol: [
        'Moffee를 열고 “매니저”를 눌러 매니저 PIN을 입력합니다.',
        '관리 › 설정으로 갑니다.',
        '“모든 데이터 지우고 새로 시작”을 누르고 확인합니다.',
        '이 기기의 메뉴, 주문, 지출, 마감 리포트, 프린터·가게 설정과 PIN이 즉시 지워집니다. 앱을 삭제해도 기기에 저장된 모든 것이 함께 지워집니다.'] },
        '팁: 기록이 더 필요하면 먼저 마감 리포트와 백업 파일을 저장하거나 공유해 두세요. PIN을 잊었다면 PIN을 만들 때 보여 준 복구 코드로 “PIN을 잊었어요”를 사용하세요.']],
      ['Google 계정과 Google Drive 기록', ['1.6 버전에는 사장님 전용 Google 로그인이 있습니다. 삭제하려면 Moffee › 관리자(PIN) › 계정 › “계정 삭제”에서 PIN을 입력하고 확인하세요. Firebase 사용자(이름, 이메일, 사용자 ID)가 삭제되고 기기의 로그인 정보도 지워집니다. 사장님 본인의 Google Drive(“Moffee” 폴더: 백업과 Reports)에 있는 파일은 세무 자료일 수 있어 기본으로 보관됩니다. 같은 화면에서 “Google Drive의 Moffee 백업/리포트도 함께 삭제”(기본은 체크 해제)를 체크할 때만 삭제되며, 인터넷 연결이 필요하고 실패하면 아무것도 지워지지 않고 계정도 유지되어 다시 시도할 수 있습니다. Google Drive에서 직접 파일을 지우거나 Google 계정(보안 › 서드파티 액세스)에서 Moffee의 접근 권한을 없앨 수도 있습니다.']],
      ['방법 2: 이메일로 요청', [`앱을 쓸 수 없다면 처리를 원하는 주소로 ${EMAIL}에 “Moffee 데이터 삭제 요청”이라는 제목으로 메일을 보내고, 무엇을 지울지 적어 주세요(예: 저희에게 보낸 이메일). 저희는 자체 매출 데이터가 없고 기기나 Drive에 접근할 수 없어서, 보통 저희 쪽에서 지울 수 있는 것은 보내 주신 문의 메일뿐입니다. 30일 안에 회신하며, 무엇을 지웠는지와 나머지를 직접 지우는 방법을 알려 드립니다.`]],
      ['지워지는 것과 보관되는 것', [{ ul: [
        '방법 1로 지워지는 것: Moffee가 기기에 저장한 모든 것',
        '기본으로 보관되는 것: 사장님 본인의 Google Drive에 있는 백업, 매출 기록, 리포트 — 위 설명대로 사장님이 지울 때까지',
        '요청 시 삭제: 저희에게 보낸 이메일(방법 2)',
        '앱의 “계정 삭제”로 지워지는 것: Firebase 로그인 계정(이름, 이메일, 사용자 ID). 그 밖의 계정 데이터는 저희에게 없습니다.'] }]],
      ['참고', ['삭제는 되돌릴 수 없습니다. 이 앱은 만 18세 이상을 위한 앱입니다.']],
    ],
    zh: [
      ['方式一：清除设备上的数据（在应用内）', [{ ol: [
        '打开 Moffee，点“店长”并输入店长 PIN。',
        '进入 管理 › 设置。',
        '点“清除所有数据并重新开始”并确认。',
        '本设备上的菜单、订单、支出、日结报表、打印机和店铺设置以及 PIN 会立即被清除。卸载应用也会删除设备上保存的全部内容。'] },
        '提示：如果还需要这些记录，请先保存或分享日结报表和备份文件。忘记 PIN？使用设置 PIN 时显示的恢复码，点“忘记 PIN”。']],
      ['Google 账号与 Google Drive 中的记录', ['1.6 版本有仅限店主的 Google 登录。删除方法：打开 Moffee › 管理（PIN）› 账户 › “删除账户”，输入 PIN 并确认。这会删除 Firebase 用户（姓名、邮箱、用户 ID），并清除设备上的登录信息。店主自己 Google Drive 中的文件（“Moffee”文件夹：备份和 Reports）默认保留，因为它们可能是税务记录。只有在该页面勾选“同时删除 Google Drive 中的 Moffee 备份/报表”（默认不勾选）时才会删除；这需要联网，如果失败则不会删除任何内容，账户也会保留，方便重试。你也可以在 Google Drive 中自行删除文件，并在 Google 账号（安全 › 第三方访问）中移除 Moffee 的访问权限。']],
      ['方式二：邮件申请', [`如果无法使用应用，请用希望我们处理的邮箱发邮件到 ${EMAIL}，主题为“删除我的 Moffee 数据”，并说明要删除什么（例如你发给我们的邮件）。我们自己没有销售数据，也无法访问你的设备或 Drive，所以通常我们这边唯一能删除的是你发来的往来邮件。我们会在 30 天内回复，告诉你删除了什么，以及如何自行清除其余内容。`]],
      ['哪些会被删除，哪些会保留', [{ ul: [
        '方式一删除：Moffee 保存在设备上的全部内容',
        '默认保留：店主自己 Google Drive 中的备份、销售记录和报表，直到店主按上述方式删除',
        '应要求删除：你发给我们的邮件（方式二）',
        '应用内“删除账户”会删除：Firebase 登录账户（姓名、邮箱、用户 ID）。我们没有其他账户数据。'] }]],
      ['说明', ['清除后无法恢复。本应用面向 18 岁及以上的用户。']],
    ],
    hi: [
      ['तरीका 1: डिवाइस का डेटा मिटाएँ (ऐप में)', [{ ol: [
        'Moffee खोलें, “मैनेजर” दबाएँ और अपना मैनेजर PIN डालें।',
        'प्रबंधन › सेटिंग्स में जाएँ।',
        '“सारा डेटा मिटाकर नए सिरे से शुरू करें” दबाएँ और पुष्टि करें।',
        'इस डिवाइस का मेनू, ऑर्डर, खर्च, क्लोज़िंग रिपोर्ट, प्रिंटर व दुकान की सेटिंग और PIN तुरंत मिट जाते हैं। ऐप अनइंस्टॉल करने से भी डिवाइस पर रखा सब कुछ हट जाता है।'] },
        'सुझाव: अगर रिकॉर्ड चाहिए तो पहले क्लोज़िंग रिपोर्ट और बैकअप फ़ाइल सहेज या शेयर कर लें। PIN भूल गए? PIN बनाते समय दिखे रिकवरी कोड से “PIN भूल गए” इस्तेमाल करें।']],
      ['Google खाता और Google Drive के रिकॉर्ड', ['संस्करण 1.6 में केवल मालिक के लिए Google साइन-इन है। हटाने के लिए: Moffee › मैनेजर (PIN) › खाता › “खाता हटाएँ” खोलें, PIN डालें और पुष्टि करें। इससे Firebase यूज़र (नाम, ईमेल, यूज़र ID) हट जाता है और डिवाइस का साइन-इन साफ़ हो जाता है। मालिक के अपने Google Drive की फ़ाइलें (“Moffee” फ़ोल्डर: बैकअप और Reports) डिफ़ॉल्ट रूप से रखी जाती हैं, क्योंकि वे कर संबंधी रिकॉर्ड हो सकते हैं। ये तभी हटती हैं जब आप उसी स्क्रीन पर “Google Drive से Moffee बैकअप/रिपोर्ट भी हटाएँ” (डिफ़ॉल्ट रूप से चुना नहीं) चुनते हैं; इसके लिए इंटरनेट चाहिए, और विफल होने पर कुछ नहीं हटता और खाता बना रहता है ताकि आप दोबारा कोशिश कर सकें। आप Google Drive में खुद फ़ाइलें हटा सकते हैं, और अपने Google खाते (सुरक्षा › तीसरे पक्ष की पहुँच) में Moffee की पहुँच हटा सकते हैं।']],
      ['तरीका 2: ईमेल से अनुरोध', [`अगर आप ऐप इस्तेमाल नहीं कर सकते, तो जिस पते पर कार्रवाई चाहते हैं उससे ${EMAIL} पर “मेरा Moffee डेटा हटाएँ” विषय के साथ ईमेल करें और बताएँ कि क्या हटाना है (जैसे आपके भेजे ईमेल)। हमारे पास अपना कोई बिक्री डेटा नहीं है और हम आपके डिवाइस या Drive तक नहीं पहुँच सकते, इसलिए आम तौर पर हमारी ओर से हटाने लायक केवल आपका भेजा पत्राचार होता है। हम 30 दिनों में जवाब देते हैं और बताते हैं कि क्या हटाया और बाकी खुद कैसे मिटाएँ।`]],
      ['क्या हटता है और क्या रखा जाता है', [{ ul: [
        'तरीका 1 से हटता है: Moffee ने डिवाइस पर जो कुछ रखा था, सब',
        'डिफ़ॉल्ट रूप से रखा जाता है: मालिक के अपने Google Drive के बैकअप, बिक्री रिकॉर्ड और रिपोर्ट, जब तक मालिक ऊपर बताए अनुसार उन्हें न हटाए',
        'अनुरोध पर हटता है: आपके हमें भेजे ईमेल (तरीका 2)',
        'ऐप में “खाता हटाएँ” से हटता है: Firebase साइन-इन खाता (नाम, ईमेल, यूज़र ID)। हमारे पास खाते का और कोई डेटा नहीं है।'] }]],
      ['ध्यान दें', ['मिटाना वापस नहीं हो सकता। यह ऐप 18 वर्ष और उससे अधिक उम्र के लोगों के लिए है।']],
    ],
  };
  return { UI, PRIVACY, DELETE };
}
