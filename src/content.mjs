// Text of the two legal pages (privacy policy + deletion), 5 languages. Edit here, then `node scripts/build.mjs`.
// Written ONLY from what the app really does (checked against /workspace/cafemenu + AndroidManifest, v1.4) and the owner's statement of the planned Google Drive feature.
// Sections: [heading, [blocks]] where a block is a paragraph string, {ul:[...]} or {ol:[...]}.
// Planned/not-yet-built things are always labelled as planned so the policy never claims something the app does not do yet.
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
        'The current version (1.4) has no sign-in and no account. A Google sign-in for the shop owner is planned (see “Planned: Google Drive backup”).'] }]],
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
        'Internet: to print to a Wi-Fi/LAN printer on your local network, and to open links (such as this policy) in your browser. The current version does not send data to any server run by us.',
        'Photos: you choose a picture with Android’s own file picker. The app asks for no camera, storage, contacts, microphone or location permission.'] }]],
      ['What leaves your device, and where it goes', [{ ul: [
        'Printing: the ticket is sent only to the printer you set up.',
        'Saving and sharing: when you save or share a closing report (PDF or image) or a backup file, Android’s share sheet opens and the file goes only where you choose (for example LINE, email or Google Drive).',
        `Feedback: “Send feedback” opens your mail app with a message to ${EMAIL}, optionally pre-filled with the app version, language and screen size. Nothing is sent until you press send in your mail app. We then receive your message and email address and use them only to reply and to improve the app. When you are offline the text is kept on the device until you send it again.`,
        'Links: pages you open (such as this policy) open in your browser and are governed by those sites.'] }]],
      ['This website', ['This site is a static page hosted on GitHub Pages. We add no cookies, analytics, ads or third-party scripts. Your browser’s local storage keeps only your chosen language and the join-page step ticks, on your own device. GitHub, as host, may process visitor IP addresses under its own privacy statement.']],
      ['Planned: Google Drive backup (not in the current version)', [
        'We plan to let the shop owner sign in with Google once, only to enable backup and restore of the app data and to save daily closing PDFs to the owner’s own Google Drive. Staff never sign in. When this is released:',
        { ul: [
          'The files go straight from the device to the owner’s own Google Drive; they do not pass through any server of ours, and we cannot see them.',
          'Sign-in is optional and can be turned off in the app; access can also be removed in your Google Account (Security › Third-party access).',
          'We will ask only for the narrowest Drive permission the feature needs, and this policy will be updated before the feature is released.'] }]],
      ['How long data is kept, and deleting it', [{ ul: [
        'Data on the device stays until you erase it in the app (Manage › Settings › Erase all data and start over) or uninstall the app.',
        'Sales records and closing reports saved in the owner’s own Google Drive (once that feature exists) are kept by default, because they may be tax records. They are deleted only if the owner ticks the delete option and enters the manager PIN, or deletes them directly in Drive.',
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
        'เวอร์ชันปัจจุบัน (1.4) ไม่มีการเข้าสู่ระบบและไม่มีบัญชี การเข้าสู่ระบบด้วย Google สำหรับเจ้าของร้านอยู่ในแผน (ดู “แผนในอนาคต: สำรองข้อมูลไป Google Drive”)'] }]],
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
        'อินเทอร์เน็ต: เพื่อพิมพ์ไปยังเครื่องพิมพ์ Wi-Fi/LAN ในเครือข่ายของคุณ และเพื่อเปิดลิงก์ (เช่นนโยบายนี้) ในเบราว์เซอร์ เวอร์ชันปัจจุบันไม่ส่งข้อมูลไปยังเซิร์ฟเวอร์ใด ๆ ที่เราดูแล',
        'รูปภาพ: คุณเลือกรูปจากตัวเลือกไฟล์ของ Android เอง แอปไม่ขอสิทธิ์กล้อง ที่เก็บข้อมูล รายชื่อติดต่อ ไมโครโฟน หรือตำแหน่งที่ตั้ง'] }]],
      ['อะไรออกจากเครื่องของคุณ และไปที่ไหน', [{ ul: [
        'การพิมพ์: ใบออเดอร์ถูกส่งไปยังเครื่องพิมพ์ที่คุณตั้งค่าไว้เท่านั้น',
        'การบันทึกและแชร์: เมื่อคุณบันทึกหรือแชร์รายงานปิดยอด (PDF หรือรูป) หรือไฟล์สำรองข้อมูล หน้าต่างแชร์ของ Android จะเปิดขึ้น และไฟล์จะไปที่ที่คุณเลือกเท่านั้น (เช่น LINE อีเมล หรือ Google Drive)',
        `ข้อเสนอแนะ: “ส่งข้อเสนอแนะ” เปิดแอปอีเมลของคุณพร้อมข้อความถึง ${EMAIL} ซึ่งอาจเติมเวอร์ชันแอป ภาษา และขนาดหน้าจอให้ล่วงหน้า จะไม่มีอะไรถูกส่งจนกว่าคุณจะกดส่งในแอปอีเมล จากนั้นเราจะได้รับข้อความและอีเมลของคุณ และใช้เพื่อตอบกลับและปรับปรุงแอปเท่านั้น ถ้าออฟไลน์ ข้อความจะค้างอยู่ในเครื่องจนกว่าคุณจะส่งอีกครั้ง`,
        'ลิงก์: หน้าเว็บที่คุณเปิด (เช่นนโยบายนี้) จะเปิดในเบราว์เซอร์ และอยู่ภายใต้นโยบายของเว็บไซต์นั้น ๆ'] }]],
      ['เว็บไซต์นี้', ['เว็บไซต์นี้เป็นหน้าแบบสถิตที่โฮสต์บน GitHub Pages เราไม่ใส่คุกกี้ เครื่องมือวิเคราะห์ โฆษณา หรือสคริปต์ของบุคคลที่สาม ที่เก็บข้อมูลในเบราว์เซอร์ของคุณ (local storage) มีเพียงภาษาที่คุณเลือกและเครื่องหมายขั้นตอนในหน้าเข้าร่วมทดสอบ ซึ่งอยู่ในเครื่องของคุณเอง ส่วน GitHub ในฐานะผู้โฮสต์อาจประมวลผลที่อยู่ IP ของผู้เข้าชมตามนโยบายความเป็นส่วนตัวของ GitHub']],
      ['แผนในอนาคต: สำรองข้อมูลไป Google Drive (ยังไม่มีในเวอร์ชันปัจจุบัน)', [
        'เราวางแผนให้เจ้าของร้านเข้าสู่ระบบด้วย Google ครั้งเดียว เพื่อเปิดใช้การสำรอง/กู้คืนข้อมูลแอป และบันทึก PDF ปิดยอดรายวันลง Google Drive ของเจ้าของเอง พนักงานไม่ต้องเข้าสู่ระบบ เมื่อเปิดตัวฟีเจอร์นี้:',
        { ul: [
          'ไฟล์จะไปจากเครื่องตรงไปยัง Google Drive ของเจ้าของเอง ไม่ผ่านเซิร์ฟเวอร์ใด ๆ ของเรา และเรามองไม่เห็นไฟล์เหล่านั้น',
          'การเข้าสู่ระบบเป็นทางเลือกและปิดได้ในแอป นอกจากนี้ยังเพิกถอนสิทธิ์ได้ในบัญชี Google (ความปลอดภัย › การเข้าถึงของบุคคลที่สาม)',
          'เราจะขอสิทธิ์ Drive เท่าที่จำเป็นน้อยที่สุดสำหรับฟีเจอร์นี้ และจะปรับนโยบายนี้ก่อนปล่อยฟีเจอร์'] }]],
      ['ระยะเวลาเก็บรักษาและการลบข้อมูล', [{ ul: [
        'ข้อมูลในเครื่องอยู่จนกว่าคุณจะลบในแอป (จัดการร้าน › ตั้งค่า › ล้างข้อมูลทั้งหมดและเริ่มใหม่) หรือถอนการติดตั้งแอป',
        'บันทึกการขายและรายงานปิดยอดที่บันทึกใน Google Drive ของเจ้าของเอง (เมื่อมีฟีเจอร์นี้) จะถูกเก็บไว้เป็นค่าเริ่มต้น เพราะอาจเป็นเอกสารทางภาษี จะลบก็ต่อเมื่อเจ้าของติ๊กตัวเลือกลบและใส่ PIN ผู้จัดการ หรือลบเองใน Drive',
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
        '현재 버전(1.4)에는 로그인과 계정이 없습니다. 사장님용 Google 로그인은 계획 중입니다(“계획: Google Drive 백업” 참고).'] }]],
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
        '인터넷: 같은 네트워크의 Wi-Fi/LAN 프린터로 출력하고, 링크(예: 이 방침)를 브라우저에서 열기 위해서입니다. 현재 버전은 저희가 운영하는 어떤 서버로도 데이터를 보내지 않습니다.',
        '사진: Android 기본 파일 선택기로 직접 사진을 고릅니다. 앱은 카메라, 저장소, 연락처, 마이크, 위치 권한을 요청하지 않습니다.'] }]],
      ['기기 밖으로 나가는 것과 보내지는 곳', [{ ul: [
        '출력: 티켓은 설정해 둔 프린터로만 보내집니다.',
        '저장과 공유: 마감 리포트(PDF 또는 이미지)나 백업 파일을 저장·공유하면 Android 공유 창이 열리고, 파일은 직접 고른 곳(예: LINE, 이메일, Google Drive)으로만 갑니다.',
        `피드백: “피드백 보내기”는 ${EMAIL}로 보내는 메시지와 함께 메일 앱을 열며, 앱 버전·언어·화면 크기가 미리 채워질 수 있습니다. 메일 앱에서 보내기를 누르기 전에는 아무것도 전송되지 않습니다. 보내면 저희가 메시지와 이메일 주소를 받아 답장과 앱 개선에만 사용합니다. 오프라인이면 다시 보낼 때까지 글이 기기에 보관됩니다.`,
        '링크: 여는 페이지(예: 이 방침)는 브라우저에서 열리며 해당 사이트의 정책을 따릅니다.'] }]],
      ['이 웹사이트', ['이 사이트는 GitHub Pages에 올린 정적 페이지입니다. 쿠키, 분석 도구, 광고, 제3자 스크립트를 넣지 않습니다. 브라우저의 로컬 저장소에는 선택한 언어와 참여 페이지의 단계 체크만 내 기기에 저장됩니다. 호스팅을 맡은 GitHub는 자체 개인정보 처리방침에 따라 방문자 IP 주소를 처리할 수 있습니다.']],
      ['계획: Google Drive 백업 (현재 버전에는 없음)', [
        '사장님이 Google로 한 번 로그인해, 앱 데이터의 백업·복원을 켜고 일일 마감 PDF를 사장님 본인의 Google Drive에 저장하는 기능을 계획하고 있습니다. 직원은 로그인하지 않습니다. 이 기능이 나오면:',
        { ul: [
          '파일은 기기에서 사장님 본인의 Google Drive로 바로 가며, 저희 서버를 거치지 않고 저희는 볼 수 없습니다.',
          '로그인은 선택 사항이며 앱에서 끌 수 있습니다. Google 계정(보안 › 타사 액세스)에서도 접근 권한을 없앨 수 있습니다.',
          '기능에 꼭 필요한 가장 좁은 Drive 권한만 요청하며, 기능을 내기 전에 이 방침을 먼저 고칩니다.'] }]],
      ['보관 기간과 삭제', [{ ul: [
        '기기의 데이터는 앱에서 지우거나(관리 › 설정 › 모든 데이터 지우고 새로 시작) 앱을 삭제할 때까지 남습니다.',
        '사장님 본인의 Google Drive에 저장된 매출 기록과 마감 리포트(그 기능이 생긴 뒤)는 세무 자료일 수 있어 기본으로 보관됩니다. 사장님이 삭제 옵션을 체크하고 매니저 PIN을 입력하거나, Drive에서 직접 지울 때만 삭제됩니다.',
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
        '当前版本（1.4）没有登录，也没有账号。我们计划为店主提供 Google 登录（见“计划中：Google Drive 备份”）。'] }]],
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
        '网络：用于打印到本地网络中的 Wi-Fi/LAN 打印机，以及在浏览器中打开链接（例如本政策）。当前版本不会向我们运营的任何服务器发送数据。',
        '照片：你通过 Android 自带的文件选择器选择图片。应用不申请相机、存储、通讯录、麦克风或位置权限。'] }]],
      ['哪些内容会离开设备，去向何处', [{ ul: [
        '打印：小票只会发送到你设置的打印机。',
        '保存和分享：保存或分享日结报表（PDF 或图片）或备份文件时，会打开 Android 分享面板，文件只会发送到你选择的地方（例如 LINE、邮件或 Google Drive）。',
        `反馈：“发送反馈”会打开你的邮件应用，写好发给 ${EMAIL} 的邮件，并可预填应用版本、语言和屏幕大小。你在邮件应用中点发送之前不会发出任何内容。发送后我们会收到你的内容和邮箱地址，仅用于回复和改进应用。离线时文字会保存在设备上，等你再次发送。`,
        '链接：你打开的页面（例如本政策）在浏览器中打开，适用该网站自己的政策。'] }]],
      ['本网站', ['本网站是托管在 GitHub Pages 上的静态页面。我们不添加 Cookie、统计分析、广告或第三方脚本。浏览器的本地存储只在你自己的设备上保存你选择的语言和“加入测试”页的步骤勾选。作为托管方，GitHub 可能按其自身隐私声明处理访问者的 IP 地址。']],
      ['计划中：Google Drive 备份（当前版本没有）', [
        '我们计划让店主用 Google 登录一次，仅用于开启应用数据的备份与恢复，并把每日日结 PDF 保存到店主自己的 Google Drive。员工不需要登录。该功能上线后：',
        { ul: [
          '文件从设备直接发送到店主自己的 Google Drive，不经过我们的任何服务器，我们也看不到。',
          '登录是可选的，可以在应用中关闭；也可以在你的 Google 账号（安全性 › 第三方访问）中撤销授权。',
          '我们只会申请该功能所需的最小 Drive 权限，并会在功能上线前先更新本政策。'] }]],
      ['保存多久，如何删除', [{ ul: [
        '设备上的数据会一直保存，直到你在应用中清除（管理 › 设置 › 清除所有数据并重新开始）或卸载应用。',
        '保存在店主自己 Google Drive 中的销售记录和日结报表（该功能上线后）默认保留，因为它们可能是税务记录。只有店主勾选删除选项并输入店长 PIN，或在 Drive 中自行删除时才会删除。',
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
        'मौजूदा संस्करण (1.4) में कोई साइन-इन या खाता नहीं है। दुकान के मालिक के लिए Google साइन-इन की योजना है (देखें “योजना: Google Drive बैकअप”)।'] }]],
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
        'इंटरनेट: आपके लोकल नेटवर्क के Wi-Fi/LAN प्रिंटर पर प्रिंट करने और लिंक (जैसे यह नीति) ब्राउज़र में खोलने के लिए। मौजूदा संस्करण हमारे चलाए किसी भी सर्वर को डेटा नहीं भेजता।',
        'फ़ोटो: आप Android के अपने फ़ाइल चयनकर्ता से तस्वीर चुनते हैं। ऐप कैमरा, स्टोरेज, कॉन्टैक्ट, माइक्रोफ़ोन या लोकेशन की अनुमति नहीं माँगता।'] }]],
      ['डिवाइस से बाहर क्या जाता है, और कहाँ', [{ ul: [
        'प्रिंटिंग: टिकट केवल आपके सेट किए प्रिंटर को भेजा जाता है।',
        'सहेजना और शेयर करना: जब आप क्लोज़िंग रिपोर्ट (PDF या इमेज) या बैकअप फ़ाइल सहेजते या शेयर करते हैं, तो Android की शेयर शीट खुलती है और फ़ाइल केवल वहीं जाती है जहाँ आप चुनते हैं (जैसे LINE, ईमेल या Google Drive)।',
        `फ़ीडबैक: “फ़ीडबैक भेजें” आपका मेल ऐप खोलता है, जिसमें ${EMAIL} के लिए संदेश होता है और ऐप संस्करण, भाषा व स्क्रीन आकार पहले से भरे हो सकते हैं। जब तक आप मेल ऐप में भेजें नहीं दबाते, कुछ नहीं भेजा जाता। भेजने पर हमें आपका संदेश और ईमेल पता मिलता है, जिसे हम केवल जवाब देने और ऐप सुधारने के लिए इस्तेमाल करते हैं। ऑफ़लाइन होने पर टेक्स्ट दोबारा भेजने तक डिवाइस पर रखा रहता है।`,
        'लिंक: आप जो पेज खोलते हैं (जैसे यह नीति) वे ब्राउज़र में खुलते हैं और उन साइटों की अपनी नीतियाँ लागू होती हैं।'] }]],
      ['यह वेबसाइट', ['यह साइट GitHub Pages पर होस्ट किया गया स्थिर पेज है। हम कोई कुकी, एनालिटिक्स, विज्ञापन या तीसरे पक्ष की स्क्रिप्ट नहीं जोड़ते। आपके ब्राउज़र का लोकल स्टोरेज आपके अपने डिवाइस पर केवल आपकी चुनी भाषा और जॉइन पेज के कदमों के निशान रखता है। होस्ट के रूप में GitHub अपनी गोपनीयता नीति के अनुसार विज़िटरों के IP पते प्रोसेस कर सकता है।']],
      ['योजना: Google Drive बैकअप (मौजूदा संस्करण में नहीं है)', [
        'हम चाहते हैं कि दुकान का मालिक एक बार Google से साइन-इन करे, केवल ऐप डेटा का बैकअप/रीस्टोर चालू करने और दैनिक क्लोज़िंग PDF को मालिक के अपने Google Drive में सहेजने के लिए। स्टाफ़ कभी साइन-इन नहीं करता। जब यह सुविधा आएगी:',
        { ul: [
          'फ़ाइलें डिवाइस से सीधे मालिक के अपने Google Drive में जाती हैं; ये हमारे किसी सर्वर से नहीं गुज़रतीं और हम इन्हें देख नहीं सकते।',
          'साइन-इन वैकल्पिक है और ऐप में बंद किया जा सकता है; आप अपने Google खाते (सुरक्षा › तीसरे पक्ष की पहुँच) में भी पहुँच हटा सकते हैं।',
          'हम सुविधा के लिए ज़रूरी सबसे सीमित Drive अनुमति ही माँगेंगे, और सुविधा जारी करने से पहले इस नीति को अपडेट करेंगे।'] }]],
      ['डेटा कितने समय रखा जाता है और उसे हटाना', [{ ul: [
        'डिवाइस का डेटा तब तक रहता है जब तक आप उसे ऐप में मिटा नहीं देते (प्रबंधन › सेटिंग्स › सारा डेटा मिटाकर नए सिरे से शुरू करें) या ऐप अनइंस्टॉल नहीं कर देते।',
        'मालिक के अपने Google Drive में सहेजे बिक्री रिकॉर्ड और क्लोज़िंग रिपोर्ट (जब यह सुविधा आएगी) डिफ़ॉल्ट रूप से रखे जाते हैं, क्योंकि वे कर संबंधी रिकॉर्ड हो सकते हैं। वे तभी हटाए जाते हैं जब मालिक हटाने का विकल्प टिक करके मैनेजर PIN डालता है, या Drive में खुद हटाता है।',
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
      ['Google Drive records (planned feature)', ['The current version (1.4) has no Google sign-in and stores nothing in Google Drive, so there is nothing to delete there yet. When Drive backup is released, sales records and closing reports saved in the owner’s own Drive are kept by default (they may be tax records). They are deleted only if the owner ticks the option “Also delete my sales records and reports from Google Drive” on the erase screen and enters the manager PIN. You can also delete the files yourself in Google Drive, and remove Moffee’s access in your Google Account (Security › Third-party access).']],
      ['Option 2: request by email', [`If you cannot use the app, email ${EMAIL} with the subject “Delete my Moffee data”, from the address you want us to act on, and say what you want deleted (for example emails you sent us). We have no sales data of our own and no access to your device or your Drive, so normally the only thing we can delete on our side is the correspondence you sent us. We reply within 30 days and tell you what we deleted and how to erase the rest yourself.`]],
      ['What is deleted, and what is kept', [{ ul: [
        'Deleted by option 1: everything Moffee stored on the device.',
        'Kept by default: sales records and reports in the owner’s own Google Drive (planned feature), until the owner deletes them as described above.',
        'Deleted on request: emails you sent us (option 2).',
        'We hold no account, because the current version has none.'] }]],
      ['Note', ['Erasing cannot be undone. The app is for people aged 18 and over.']],
    ],
    th: [
      ['วิธีที่ 1: ลบข้อมูลในเครื่อง (ในแอป)', [{ ol: [
        'เปิด Moffee กด “ผู้จัดการ” แล้วใส่ PIN ผู้จัดการ',
        'ไปที่ จัดการร้าน › ตั้งค่า',
        'กด “ล้างข้อมูลทั้งหมดและเริ่มใหม่” แล้วยืนยัน',
        'เมนู ออเดอร์ ค่าใช้จ่าย รายงานปิดยอด การตั้งค่าเครื่องพิมพ์และร้าน และ PIN ในเครื่องนี้จะถูกลบทันที การถอนการติดตั้งแอปก็ลบทุกอย่างที่เก็บในเครื่องเช่นกัน'] },
        'เคล็ดลับ: ถ้ายังต้องใช้ข้อมูล ให้บันทึกหรือแชร์รายงานปิดยอดและไฟล์สำรองข้อมูลไว้ก่อน ลืม PIN? ใช้ “ลืม PIN” กับรหัสกู้คืนที่แสดงตอนตั้ง PIN']],
      ['ข้อมูลใน Google Drive (ฟีเจอร์ที่วางแผนไว้)', ['เวอร์ชันปัจจุบัน (1.4) ไม่มีการเข้าสู่ระบบด้วย Google และไม่เก็บอะไรใน Google Drive จึงยังไม่มีอะไรให้ลบที่นั่น เมื่อเปิดตัวการสำรองข้อมูลไป Drive บันทึกการขายและรายงานปิดยอดที่เก็บใน Drive ของเจ้าของเองจะถูกเก็บไว้เป็นค่าเริ่มต้น (เพราะอาจเป็นเอกสารทางภาษี) จะลบก็ต่อเมื่อเจ้าของติ๊ก “ลบบันทึกการขายและรายงานของฉันออกจาก Google Drive ด้วย” ในหน้าลบข้อมูล และใส่ PIN ผู้จัดการ นอกจากนี้คุณลบไฟล์เองใน Google Drive และเพิกถอนสิทธิ์ของ Moffee ในบัญชี Google (ความปลอดภัย › การเข้าถึงของบุคคลที่สาม) ได้']],
      ['วิธีที่ 2: ขอทางอีเมล', [`ถ้าใช้แอปไม่ได้ ส่งอีเมลถึง ${EMAIL} หัวข้อ “ขอลบข้อมูล Moffee” จากอีเมลที่ต้องการให้เราดำเนินการ และบอกว่าต้องการลบอะไร (เช่น อีเมลที่คุณเคยส่งถึงเรา) เราไม่มีข้อมูลการขายของเราเอง และเข้าถึงเครื่องหรือ Drive ของคุณไม่ได้ โดยปกติสิ่งเดียวที่เราลบได้ฝั่งเราคือข้อความที่คุณส่งมา เราตอบภายใน 30 วัน พร้อมบอกว่าลบอะไรไปและวิธีลบส่วนที่เหลือด้วยตัวเอง`]],
      ['อะไรถูกลบ และอะไรถูกเก็บไว้', [{ ul: [
        'ลบด้วยวิธีที่ 1: ทุกอย่างที่ Moffee เก็บไว้ในเครื่อง',
        'เก็บไว้เป็นค่าเริ่มต้น: บันทึกการขายและรายงานใน Google Drive ของเจ้าของเอง (ฟีเจอร์ที่วางแผนไว้) จนกว่าเจ้าของจะลบตามที่อธิบายข้างต้น',
        'ลบเมื่อร้องขอ: อีเมลที่คุณส่งถึงเรา (วิธีที่ 2)',
        'เราไม่มีบัญชีผู้ใช้ เพราะเวอร์ชันปัจจุบันไม่มี'] }]],
      ['หมายเหตุ', ['การลบทำย้อนกลับไม่ได้ แอปนี้สำหรับผู้ที่มีอายุ 18 ปีขึ้นไป']],
    ],
    ko: [
      ['방법 1: 기기의 데이터 지우기 (앱에서)', [{ ol: [
        'Moffee를 열고 “매니저”를 눌러 매니저 PIN을 입력합니다.',
        '관리 › 설정으로 갑니다.',
        '“모든 데이터 지우고 새로 시작”을 누르고 확인합니다.',
        '이 기기의 메뉴, 주문, 지출, 마감 리포트, 프린터·가게 설정과 PIN이 즉시 지워집니다. 앱을 삭제해도 기기에 저장된 모든 것이 함께 지워집니다.'] },
        '팁: 기록이 더 필요하면 먼저 마감 리포트와 백업 파일을 저장하거나 공유해 두세요. PIN을 잊었다면 PIN을 만들 때 보여 준 복구 코드로 “PIN을 잊었어요”를 사용하세요.']],
      ['Google Drive 기록 (계획 중인 기능)', ['현재 버전(1.4)에는 Google 로그인이 없고 Google Drive에 아무것도 저장하지 않으므로, 아직 그곳에서 지울 것이 없습니다. Drive 백업이 나오면, 사장님 본인의 Drive에 저장된 매출 기록과 마감 리포트는 세무 자료일 수 있어 기본으로 보관됩니다. 사장님이 삭제 화면에서 “Google Drive의 매출 기록과 리포트도 삭제” 옵션을 체크하고 매니저 PIN을 입력할 때만 삭제됩니다. Google Drive에서 직접 파일을 지우거나 Google 계정(보안 › 타사 액세스)에서 Moffee의 접근 권한을 없앨 수도 있습니다.']],
      ['방법 2: 이메일로 요청', [`앱을 쓸 수 없다면 처리를 원하는 주소로 ${EMAIL}에 “Moffee 데이터 삭제 요청”이라는 제목으로 메일을 보내고, 무엇을 지울지 적어 주세요(예: 저희에게 보낸 이메일). 저희는 자체 매출 데이터가 없고 기기나 Drive에 접근할 수 없어서, 보통 저희 쪽에서 지울 수 있는 것은 보내 주신 문의 메일뿐입니다. 30일 안에 회신하며, 무엇을 지웠는지와 나머지를 직접 지우는 방법을 알려 드립니다.`]],
      ['지워지는 것과 보관되는 것', [{ ul: [
        '방법 1로 지워지는 것: Moffee가 기기에 저장한 모든 것',
        '기본으로 보관되는 것: 사장님 본인의 Google Drive에 있는 매출 기록과 리포트(계획 중인 기능) — 위 설명대로 사장님이 지울 때까지',
        '요청 시 삭제: 저희에게 보낸 이메일(방법 2)',
        '현재 버전에는 계정이 없으므로 저희가 가진 계정도 없습니다.'] }]],
      ['참고', ['삭제는 되돌릴 수 없습니다. 이 앱은 만 18세 이상을 위한 앱입니다.']],
    ],
    zh: [
      ['方式一：清除设备上的数据（在应用内）', [{ ol: [
        '打开 Moffee，点“店长”并输入店长 PIN。',
        '进入 管理 › 设置。',
        '点“清除所有数据并重新开始”并确认。',
        '本设备上的菜单、订单、支出、日结报表、打印机和店铺设置以及 PIN 会立即被清除。卸载应用也会删除设备上保存的全部内容。'] },
        '提示：如果还需要这些记录，请先保存或分享日结报表和备份文件。忘记 PIN？使用设置 PIN 时显示的恢复码，点“忘记 PIN”。']],
      ['Google Drive 中的记录（计划中的功能）', ['当前版本（1.4）没有 Google 登录，也不会往 Google Drive 保存任何内容，所以那里暂时没有需要删除的东西。Drive 备份上线后，保存在店主自己 Drive 中的销售记录和日结报表默认保留（它们可能是税务记录）。只有店主在清除界面勾选“同时删除 Google Drive 中的销售记录和报表”并输入店长 PIN 时才会删除。你也可以自己在 Google Drive 中删除文件，并在 Google 账号（安全性 › 第三方访问）中撤销 Moffee 的访问权限。']],
      ['方式二：邮件申请', [`如果无法使用应用，请用希望我们处理的邮箱发邮件到 ${EMAIL}，主题为“删除我的 Moffee 数据”，并说明要删除什么（例如你发给我们的邮件）。我们自己没有销售数据，也无法访问你的设备或 Drive，所以通常我们这边唯一能删除的是你发来的往来邮件。我们会在 30 天内回复，告诉你删除了什么，以及如何自行清除其余内容。`]],
      ['哪些会被删除，哪些会保留', [{ ul: [
        '方式一删除：Moffee 保存在设备上的全部内容',
        '默认保留：店主自己 Google Drive 中的销售记录和报表（计划中的功能），直到店主按上述方式删除',
        '应要求删除：你发给我们的邮件（方式二）',
        '我们没有账号，因为当前版本没有账号。'] }]],
      ['说明', ['清除后无法恢复。本应用面向 18 岁及以上的用户。']],
    ],
    hi: [
      ['तरीका 1: डिवाइस का डेटा मिटाएँ (ऐप में)', [{ ol: [
        'Moffee खोलें, “मैनेजर” दबाएँ और अपना मैनेजर PIN डालें।',
        'प्रबंधन › सेटिंग्स में जाएँ।',
        '“सारा डेटा मिटाकर नए सिरे से शुरू करें” दबाएँ और पुष्टि करें।',
        'इस डिवाइस का मेनू, ऑर्डर, खर्च, क्लोज़िंग रिपोर्ट, प्रिंटर व दुकान की सेटिंग और PIN तुरंत मिट जाते हैं। ऐप अनइंस्टॉल करने से भी डिवाइस पर रखा सब कुछ हट जाता है।'] },
        'सुझाव: अगर रिकॉर्ड चाहिए तो पहले क्लोज़िंग रिपोर्ट और बैकअप फ़ाइल सहेज या शेयर कर लें। PIN भूल गए? PIN बनाते समय दिखे रिकवरी कोड से “PIN भूल गए” इस्तेमाल करें।']],
      ['Google Drive के रिकॉर्ड (योजना वाली सुविधा)', ['मौजूदा संस्करण (1.4) में Google साइन-इन नहीं है और Google Drive में कुछ सहेजा नहीं जाता, इसलिए वहाँ अभी हटाने को कुछ नहीं है। जब Drive बैकअप आएगा, तब मालिक के अपने Drive में सहेजे बिक्री रिकॉर्ड और क्लोज़िंग रिपोर्ट डिफ़ॉल्ट रूप से रखे जाएँगे (वे कर संबंधी रिकॉर्ड हो सकते हैं)। वे तभी हटाए जाएँगे जब मालिक मिटाने वाली स्क्रीन पर “Google Drive से मेरे बिक्री रिकॉर्ड और रिपोर्ट भी हटाएँ” विकल्प टिक करके मैनेजर PIN डाले। आप Google Drive में खुद फ़ाइलें हटा सकते हैं और अपने Google खाते (सुरक्षा › तीसरे पक्ष की पहुँच) में Moffee की पहुँच हटा सकते हैं।']],
      ['तरीका 2: ईमेल से अनुरोध', [`अगर आप ऐप इस्तेमाल नहीं कर सकते, तो जिस पते पर कार्रवाई चाहते हैं उससे ${EMAIL} पर “मेरा Moffee डेटा हटाएँ” विषय के साथ ईमेल करें और बताएँ कि क्या हटाना है (जैसे आपके भेजे ईमेल)। हमारे पास अपना कोई बिक्री डेटा नहीं है और हम आपके डिवाइस या Drive तक नहीं पहुँच सकते, इसलिए आम तौर पर हमारी ओर से हटाने लायक केवल आपका भेजा पत्राचार होता है। हम 30 दिनों में जवाब देते हैं और बताते हैं कि क्या हटाया और बाकी खुद कैसे मिटाएँ।`]],
      ['क्या हटता है और क्या रखा जाता है', [{ ul: [
        'तरीका 1 से हटता है: Moffee ने डिवाइस पर जो कुछ रखा था, सब',
        'डिफ़ॉल्ट रूप से रखा जाता है: मालिक के अपने Google Drive के बिक्री रिकॉर्ड और रिपोर्ट (योजना वाली सुविधा), जब तक मालिक ऊपर बताए अनुसार उन्हें न हटाए',
        'अनुरोध पर हटता है: आपके हमें भेजे ईमेल (तरीका 2)',
        'हमारे पास कोई खाता नहीं है, क्योंकि मौजूदा संस्करण में खाता नहीं है।'] }]],
      ['ध्यान दें', ['मिटाना वापस नहीं हो सकता। यह ऐप 18 वर्ष और उससे अधिक उम्र के लोगों के लिए है।']],
    ],
  };
  return { UI, PRIVACY, DELETE };
}
