# Cho Bảo 🎂

Một trang web storytelling tương tác cá nhân nhân dịp sinh nhật (15/08), được thiết kế tối ưu hóa trải nghiệm trên thiết bị di động (Mobile-First) với hiệu ứng chuyển động mượt mà và không phụ thuộc bất kỳ thư viện ngoài nào.

---

## ✨ Tính năng chính

- **Màn hình khóa PIN sinh nhật**:
  - Nhập ngày/tháng sinh (15/08) để mở khóa nội dung.
  - Phản hồi dí dỏm tương ứng với số lần nhập sai kèm hiệu ứng rung lắc (shake) và Haptic Feedback (`navigator.vibrate`).
  - Tự động chuyển focus giữa các ô nhập, hỗ trợ điều hướng phím `Backspace` và phím mũi tên.
- **Trải nghiệm Storytelling dọc**:
  - Tận dụng CSS Scroll Snap (`scroll-snap-type: y mandatory`) tạo cảm giác lướt qua từng trang thiệp.
  - Xử lý tương thích thanh điều hướng di động với đơn vị `100dvh` và `env(safe-area-inset-*)`.
- **Hệ thống hiệu ứng hình ảnh (Zero-Dependency)**:
  - **Pháo giấy (Confetti)**: Rơi tự do hoặc nổ tung (`burst`) từ tâm, tự giải phóng DOM node sau khi kết thúc animation.
  - **Bóng bay (Balloons)**: Tạo bóng bay ngẫu nhiên màu sắc và độ bay ở màn kết.
  - **Bụi sao bay (Floating Particles)**: Tạo không gian nền lung linh.
- **Tối ưu hóa hiệu năng & A11y**:
  - Tự động tạm dừng (`animation-play-state: paused`) hiệu ứng hạt nền khi section trôi ra khỏi màn hình bằng `IntersectionObserver`.
  - Hỗ trợ đầy đủ `prefers-reduced-motion` cho người dùng nhạy cảm với chuyển động.
  - Thẻ lá thư (`.letter`) được cấu hình `overscroll-behavior: contain` ngăn xung đột cuộn lồng.
  - Bổ sung đầy đủ thẻ Open Graph / Twitter Card phục vụ xem trước liên kết (Rich Preview) trên Zalo, Messenger, Telegram.

---

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc ngữ nghĩa, đảm bảo accessibility (`aria-*`, `.sr-only`).
- **CSS3**: CSS Custom Properties (biến màu), CSS Grid/Flexbox, Keyframe Animations, Viewport clamp.
- **Vanilla JavaScript (ES6+)**: Xử lý logic DOM, Web APIs (IntersectionObserver, Vibration API).
- **Google Fonts**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [Caveat](https://fonts.google.com/specimen/Caveat).

---

## 📁 Cấu trúc dự án

```text
birthday-bao/
├── .gitignore      # Bỏ qua các file rác của hệ điều hành
├── index.html      # Cấu trúc nội dung 8 sections của thiệp
├── style.css       # Toàn bộ layout, styling, hiệu ứng và responsive
├── script.js       # Logic xác thực PIN, hiệu ứng hạt, confetti và cuộn
└── README.md       # Tài liệu giới thiệu dự án
```

---

## 🚀 Hướng dẫn cài đặt & Chạy dự án

Dự án không có build step, có thể chạy trực tiếp bằng bất kỳ trình duyệt nào:

1. **Clone repository**:
   ```bash
   git clone https://github.com/twotnguyen/birthday-bao.git
   cd birthday-bao
   ```

2. **Khởi chạy**:
   - Mở trực tiếp file `index.html` bằng trình duyệt web.
   - Hoặc khởi chạy thông qua local server:
     ```bash
     # Sử dụng Python 3
     python3 -m http.server 3000

     # Hoặc sử dụng Node.js
     npx serve .
     ```
   - Truy cập: `http://localhost:3000`

---

## 🌐 Triển khai lên GitHub Pages

1. Vào repository trên GitHub: `https://github.com/twotnguyen/birthday-bao`
2. Chọn tab **Settings** > chọn mục **Pages** ở menu bên trái.
3. Tại phần **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch`.
   - **Branch**: Chọn `main` và thư mục `/(root)`.
4. Nhấn **Save**. Trang web sẽ được xuất bản tại: `https://twotnguyen.github.io/birthday-bao/`
