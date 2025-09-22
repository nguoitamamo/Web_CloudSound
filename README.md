
## 📈 Thống kê dữ liệu

| Bảng | Số lượng records | Mô tả |
|------|------------------|-------|
| `courses_role` | 3 | Vai trò: admin, teacher, student |
| `courses_user` | 3 | Người dùng: admin, teacher1, student1 |
| `courses_category` | 3 | Danh mục: Lập trình Web, UI/UX, Data Science |
| `courses_course` | 1 | Khóa học: React.js từ A-Z |
| `courses_chapter` | 2 | Chương: Giới thiệu React.js, Components và JSX |
| `courses_lesson` | 6 | Bài học: 3 bài học cơ bản về React |
| `courses_usercourse` | 3 | Đăng ký khóa học |
| `courses_lessonprogress` | 2 | Tiến độ học tập bài học |
| `courses_courseprogress` | 1 | Tiến độ học tập khóa học |

## 👥 Thông tin đăng nhập

### 🔐 Tài khoản Admin
- **Username**: `admin`
- **Password**: `123`
- **Role**: Quản trị viên hệ thống
- **Quyền**: Toàn quyền quản lý hệ thống

### 👨‍🏫 Tài khoản Teacher
- **Username**: `teacher1`
- **Password**: `123`
- **Role**: Giảng viên
- **Tên**: Nguyễn Văn An
- **Email**: teacher1@courseonline.com
- **Chuyên môn**: Lập trình web

### 👨‍🎓 Tài khoản Student
- **Username**: `student1`
- **Password**: `123`
- **Role**: Học viên
- **Tên**: Phạm Văn Dũng
- **Email**: student1@courseonline.com
- **Trạng thái**: Đang học khóa React.js

## 📚 Nội dung khóa học mẫu

### 🎯 Khóa học: "Lập trình Web với React.js từ A-Z"
- **ID**: 7
- **Giảng viên**: Nguyễn Văn An (teacher1)
- **Danh mục**: Lập trình Web
- **Mức độ**: Trung cấp
- **Thời lượng**: 120 phút
- **Giá**: 500,000 VNĐ
- **Video giới thiệu**: YouTube

#### 📖 Chương 1: Giới thiệu về React.js
1. **React là gì?** (30 phút)
   - Tìm hiểu về React và tại sao nó phổ biến
   - Video: YouTube
   - Trạng thái: Đã hoàn thành (100%)

2. **Cài đặt môi trường phát triển** (40 phút)
   - Hướng dẫn cài đặt Node.js, npm và tạo project React
   - Video: YouTube
   - Trạng thái: Đang học (25%)

#### 📖 Chương 2: Components và JSX
3. **JSX là gì?** (25 phút)
   - Tìm hiểu về JSX syntax
   - Video: YouTube
   - Trạng thái: Chưa bắt đầu

## 📊 Tiến độ học tập

### 👨‍🎓 Học viên: Phạm Văn Dũng (student1)
- **Khóa học**: React.js từ A-Z
- **Trạng thái**: Đang học (IN_PROGRESS)
- **Tiến độ tổng thể**: 33.3%
- **Bài học đã hoàn thành**: 1/3
- **Tổng thời gian học**: 40 phút

#### 📈 Chi tiết tiến độ từng bài học:
1. **React là gì?**
   - Trạng thái: ✅ Hoàn thành
   - Thời gian học: 30 phút
   - Hoàn thành: 100%
   - Ngày hoàn thành: 4 ngày trước

2. **Cài đặt môi trường phát triển**
   - Trạng thái: 🔄 Đang học
   - Thời gian học: 10 phút
   - Hoàn thành: 25%
   - Lần cuối học: 1 ngày trước

3. **JSX là gì?**
   - Trạng thái: ⏸️ Chưa bắt đầu
   - Thời gian học: 0 phút
   - Hoàn thành: 0%

## 🌐 Truy cập hệ thống

### 🔗 Django Admin
- **URL**: http://localhost:8000/admin/
- **Tài khoản**: admin / password
- **Chức năng**: Quản lý toàn bộ hệ thống

### 🔗 API Backend
- **URL**: http://localhost:8000/
- **Chức năng**: API endpoints cho Frontend
- **Documentation**: Swagger UI tại /swagger/

### 🔗 Frontend
- **URL**: http://localhost:3000/
- **Chức năng**: Giao diện người dùng
- **Tính năng**: Đăng nhập, xem khóa học, học tập

## 🛠️ Các tính năng đã tích hợp

### ✅ Backend (Django API)
- [x] Quản lý người dùng và phân quyền
- [x] Quản lý khóa học và nội dung
- [x] Theo dõi tiến độ học tập
- [x] API chi tiết khóa học
- [x] Hệ thống đăng ký khóa học
- [x] Django Admin interface

### ✅ Frontend (Next.js)
- [x] Giao diện đăng nhập/đăng ký
- [x] Trang chủ và danh sách khóa học
- [x] Trang chi tiết khóa học
- [x] Trang học tập với video player
- [x] Theo dõi tiến độ học tập
- [x] Trang "Khóa học của tôi"

### ✅ Tính năng học tập
- [x] Video player hỗ trợ YouTube
- [x] Theo dõi thời gian xem video
- [x] Cập nhật tiến độ tự động
- [x] Hiển thị trạng thái học tập
- [x] Quản lý tiến độ khóa học

## 📝 Ghi chú quan trọng

1. **Mật khẩu mặc định**: Tất cả tài khoản đều có mật khẩu là `password`
2. **Dữ liệu mẫu**: Đã tạo sẵn dữ liệu để test các tính năng
3. **Video mẫu**: Sử dụng YouTube URL làm video giới thiệu
4. **Hình ảnh**: Sử dụng Cloudinary để lưu trữ hình ảnh
5. **Database**: MySQL với encoding UTF-8

## 🚀 Hướng dẫn sử dụng

1. **Khởi động Backend**:
   ```bash
   cd /home/truong/quanlikhoahoc/Courses-Online-Api
   python manage.py runserver 0.0.0.0:8000
   ```

2. **Khởi động Frontend**:
   ```bash
   cd /home/truong/quanlikhoahoc/Courses-Online-Web
   npm run dev
   ```

3. **Truy cập hệ thống**:
   - Frontend: http://localhost:3000/
   - Backend API: http://localhost:8000/
   - Django Admin: http://localhost:8000/admin/

## 🔧 Troubleshooting

- **Lỗi kết nối database**: Kiểm tra MySQL service và thông tin kết nối
- **Lỗi CORS**: Kiểm tra cấu hình CORS trong Django settings
- **Lỗi video không hiển thị**: Kiểm tra URL video và cấu hình Cloudinary
- **Lỗi đăng nhập**: Kiểm tra token và session

---


### Forum
- **Mô tả**: Diễn đàn thảo luận của một khóa học
- **Quan hệ**: 1-1 với Course, 1-n với Topic
- **Quyền truy cập**: 
  - Teacher: Có thể tạo và quản lý forum của mình
  - Student: Chỉ có thể xem forum của khóa học đã đăng ký
  - Admin: Có quyền truy cập tất cả

### Topic
- **Mô tả**: Chủ đề thảo luận trong forum
- **Quan hệ**: n-1 với Forum, 1-n với Comment
- **Tính năng**: 
  - Ghim topic lên đầu (is_pinned)
  - Khóa topic không cho bình luận (is_locked)
  - Đếm số lượt xem (view_count)

### Comment
- **Mô tả**: Bình luận trong topic
- **Quan hệ**: n-1 với Topic, 1-n với Comment (reply)
- **Tính năng**: Hỗ trợ reply (bình luận con)

## API Endpoints

### 1. Forum APIs

#### GET /forums/
- **Mô tả**: Lấy danh sách forum
- **Quyền**: Authenticated
- **Response**: Danh sách forum mà user có quyền truy cập

#### POST /forums/
- **Mô tả**: Tạo forum mới
- **Quyền**: Teacher only
- **Body**:
  ```json
  {
    "name": "Tên forum",
    "description": "Mô tả forum",
    "course": 1
  }
  ```

### 2. Topic APIs

#### GET /topics/
- **Mô tả**: Lấy danh sách topic
- **Quyền**: Authenticated
- **Query params**: `forum_id` (optional)
- **Response**: Danh sách topic với thông tin comment_count, last_comment

#### POST /topics/
- **Mô tả**: Tạo topic mới
- **Quyền**: Authenticated
- **Body**:
  ```json
  {
    "forum": 1,
    "title": "Tiêu đề topic",
    "content": "Nội dung topic",
    "is_pinned": false,
    "is_locked": false
  }
  ```

#### GET /topics/{id}/
- **Mô tả**: Lấy chi tiết topic
- **Quyền**: Authenticated

#### PUT /topics/{id}/
- **Mô tả**: Cập nhật topic
- **Quyền**: Owner hoặc Admin

#### DELETE /topics/{id}/
- **Mô tả**: Xóa topic
- **Quyền**: Owner hoặc Admin

#### POST /topics/{id}/increment-view/
- **Mô tả**: Tăng số lượt xem topic
- **Quyền**: Authenticated
- **Response**:
  ```json
  {
    "view_count": 15
  }
  ```

#### GET /topics/{id}/comments/
- **Mô tả**: Lấy danh sách comment của topic
- **Quyền**: Authenticated
- **Response**: Danh sách comment với replies

### 3. Comment APIs

#### GET /comments/
- **Mô tả**: Lấy danh sách comment
- **Quyền**: Authenticated
- **Query params**: `topic_id` (optional)

#### POST /comments/
- **Mô tả**: Tạo comment mới
- **Quyền**: Authenticated
- **Body**:
  ```json
  {
    "topic": 1,
    "content": "Nội dung bình luận",
    "parent": null
  }
  ```

#### GET /comments/{id}/
- **Mô tả**: Lấy chi tiết comment
- **Quyền**: Authenticated

#### PUT /comments/{id}/
- **Mô tả**: Cập nhật comment
- **Quyền**: Owner hoặc Admin

#### DELETE /comments/{id}/
- **Mô tả**: Xóa comment
- **Quyền**: Owner hoặc Admin

#### GET /comments/{id}/replies/
- **Mô tả**: Lấy danh sách reply của comment
- **Quyền**: Authenticated

### 4. Progress Tracking APIs

#### POST /lesson-progress/update-progress/
- **Mô tả**: Cập nhật tiến độ học bài
- **Quyền**: Authenticated
- **Body**:
  ```json
  {
    "lesson_id": 1,
    "watch_time": 300,
    "completion_percentage": 75.5
  }
  ```

#### GET /lesson-progress/course/{course_id}/
- **Mô tả**: Lấy tiến độ khóa học
- **Quyền**: Authenticated
- **Response**:
  ```json
  {
    "course_progress": {
      "completion_percentage": 60.5,
      "completed_lessons": 12,
      "total_lessons": 20
    },
    "lesson_progresses": [...]
  }
  ```


  # Course Detail API Documentation

  ## 🚀 Endpoint

```
GET /courses/{id}/detail/
```

### Tham số
- `id` (integer): ID của khóa học

### Response Codes
- `200 OK`: Thành công
- `404 Not Found`: Không tìm thấy khóa học
- `500 Internal Server Error`: Lỗi server
