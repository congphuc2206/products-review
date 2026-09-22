/**
 * Seed Data (Dữ Liệu Mẫu Tiếng Việt)
 */

const sampleProducts = [
  {
    name: 'MacBook Pro 14" (Chip Apple M3 Pro)',
    category: 'Điện tử & Laptop',
    price: 49990000,
    description: 'Trang bị chip Apple M3 Pro với CPU 11 lõi và GPU 14 lõi. Màn hình Liquid Retina XDR 14.2 inch tuyệt đẹp với công nghệ ProMotion 120Hz mượt mà.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    tags: ['apple', 'macbook', 'm3-pro', 'lap-trinh', 'do-hoa'],
    specifications: {
      'Vi xử lý (CPU)': 'Apple M3 Pro (11 nhân CPU, 14 nhân GPU)',
      'Bộ nhớ RAM': '18GB Unified Memory',
      'Ổ cứng lưu trữ': '512GB NVMe SSD tốc độ cao',
      'Màn hình': '14.2" Liquid Retina XDR (3024x1964 @ 120Hz)',
      'Thời lượng pin': 'Lên tới 18 giờ sử dụng liên tục',
      'Cổng kết nối': '3x Thunderbolt 4, HDMI, MagSafe 3, Khe thẻ SDXC',
      'Trọng lượng': '1.61 kg'
    },
    reviews: [
      {
        author: 'Nguyễn Hoàng Long',
        rating: 5,
        title: 'Hiệu năng biên dịch code cực nhanh, pin dùng cả ngày!',
        comment: 'Mình nâng cấp từ phiên bản Intel cũ và sự khác biệt thực sự vượt trội. Khởi động Docker containers chỉ trong tích tắc, chạy server dev Next.js siêu mượt. Màn hình hiển thị màu đen sâu và rất sắc nét.',
        pros: ['Tốc độ build dự án cực kỳ nhanh', 'Quạt tản nhiệt chạy êm ái, hầu như không nghe tiếng', 'Màn hình Mini-LED 120Hz xuất sắc', 'Pin thoải mái làm việc cả ngày dài không cần sạc'],
        cons: ['Giá nâng cấp RAM từ hãng còn khá đắt', 'Hơi dày hơn so với dòng MacBook Air'],
        tags: ['lap-trinh', 'pin-trau', 'hieu-nang-cao', 'man-hinh-dep'],
        images: [
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80'
        ]
      },
      {
        author: 'Trần Minh Thư',
        rating: 4,
        title: 'Rất tốt cho dựng video 4K, cổng kết nối đầy đủ',
        comment: 'Render timeline video 4K ProRes mượt mà, không bị giật lag khung hình nào. Cổng sạc MagSafe và khe đọc thẻ nhớ SD rất tiện cho dân sáng tạo nội dung.',
        pros: ['Xử lý đồ họa mượt mà', 'Cổng cắm đầy đủ, tiện lợi', 'Hệ thống loa ngoài chất lượng cao'],
        cons: ['Bản tiêu chuẩn chỉ có 512GB ở mức giá gần 2000 USD'],
        tags: ['dung-phim', 'sang-tao-noi-dung', 'apple'],
        images: []
      }
    ]
  },
  {
    name: 'Giày Chạy Bộ Nike ZoomX Vaporfly 3',
    category: 'Giày & Thể thao',
    price: 6490000,
    description: 'Mẫu giày đua đường trường đỉnh cao dành cho vận động viên marathon, tích hợp đĩa đệm sợi carbon Flyplate toàn chiều dài cùng bọt siêu nhẹ ZoomX.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    tags: ['chay-bo', 'marathon', 'dia-carbon', 'sieu-nhe'],
    specifications: {
      'Chất liệu thân trên': 'Lưới kỹ thuật Engineered Flyknit Mesh',
      'Đế giữa (Midsole)': 'Bọt phản hồi lực ZoomX Super-Foam',
      'Đĩa trợ lực': 'Đĩa sợi Carbon Flyplate toàn phần',
      'Độ dốc gót-mũi (Drop)': '8 mm',
      'Trọng lượng': '180g (Size 42)',
      'Cự ly tối ưu': '5K, 10K, Half Marathon, Full Marathon 42K',
      'Kiểu dáng': 'Ôm chân khí động học (Race Fit)'
    },
    reviews: [
      {
        author: 'Lê Văn Nam',
        rating: 5,
        title: 'Phá kỷ lục cá nhân (PR) ở giải chạy 21km!',
        comment: 'Độ nảy và lực đẩy về phía trước của đĩa carbon kết hợp đệm ZoomX thực sự ấn tượng. Giúp mình rút ngắn được 3 phút so với thành tích cũ mà chân không bị mỏi nhiều.',
        pros: ['Lực phản hồi cực mạnh ở mỗi sải chân', 'Trọng lượng siêu nhẹ như không đi giày', 'Thoáng khí tốt khi chạy trời nắng'],
        cons: ['Độ bền đế ngoài chỉ tối ưu trong khoảng 300km đầu', 'Giá thành tương đối cao'],
        tags: ['giai-chay', 'pha-ky-luc', 'tro-luc-tot', 'marathon'],
        images: [
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80'
        ]
      }
    ]
  },
  {
    name: 'Máy Pha Cà Phê De’Longhi Dedica Deluxe',
    category: 'Gia dụng & Đời sống',
    price: 7490000,
    description: 'Máy pha cafe espresso bơm áp suất chuẩn Ý 15 bar, thiết kế kim loại siêu mỏng gọn 15cm, hệ thống gia nhiệt Thermo-block làm nóng siêu tốc.',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    tags: ['cafe', 'espresso', 'may-pha-cafe', 'gia-dung', 'nho-gon'],
    specifications: {
      'Áp suất bơm': 'Bơm 15 Bar chuẩn Ý',
      'Hệ thống gia nhiệt': 'Thermo-block đun nóng nhanh (35 giây)',
      'Dung tích bình nước': '1.0 Lít (Tháo rời dễ vệ sinh)',
      'Kích thước': '15cm Rộng x 33cm Sâu x 30cm Cao (Slim design)',
      'Công suất tiêu thụ': '1300 Watts',
      'Vòi đánh sữa': 'Vòi hơi Panarello điều chỉnh tạo bọt Cappuccino & Latte',
      'Khay làm ấm cốc': 'Tích hợp mặt kim loại làm nóng trên đỉnh'
    },
    reviews: [
      {
        author: 'Đặng Thùy Trang',
        rating: 5,
        title: 'Máy pha cafe hoàn hảo cho người mới bắt đầu',
        comment: 'Chiếm cực ít diện tích gian bếp, chỉ mất khoảng nửa phút để sẵn sàng chiết xuất. Pha cùng cafe rang mộc tạo lớp crema vàng óng rất thơm!',
        pros: ['Bề ngang siêu gọn chỉ 15cm', 'Làm nóng nhanh trong 35 giây', 'Chiết xuất crema dày và đều'],
        cons: ['Vòi tạo bọt sữa cần luyện tập chút để đánh mịn cho Latte art'],
        tags: ['espresso', 'yeu-cafe', 'sang-trong', 'nho-gon'],
        images: [
          'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80'
        ]
      }
    ]
  },
  {
    name: 'Sách: Clean Code - Nghệ Thuật Viết Mã Sạch',
    category: 'Sách & Tài liệu',
    price: 280000,
    description: 'Cuốn cẩm nang kinh điển của Robert C. Martin ("Uncle Bob") hướng dẫn tư duy viết code dễ đọc, dễ bảo trì và chuẩn mực chuyên nghiệp cho kỹ sư phần mềm.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    tags: ['sach-lap-trinh', 'clean-code', 'ky-su-phan-mem', 'kinh-dien'],
    specifications: {
      'Tác giả': 'Robert C. Martin ("Uncle Bob")',
      'Nhà xuất bản': 'Prentice Hall',
      'Năm phát hành': '2008',
      'Số trang': '464 trang',
      'Ngôn ngữ': 'Tiếng Anh / Bản dịch tiếng Việt',
      'Mã chuẩn ISBN-13': '978-0132350884',
      'Định dạng': 'Bìa mềm / E-Book'
    },
    reviews: [
      {
        author: 'Phạm Đức Duy',
        rating: 5,
        title: 'Cuốn sách bắt buộc phải đọc cho mọi lập trình viên',
        comment: 'Thay đổi hoàn toàn cách mình đặt tên biến, cách chia nhỏ hàm và tư duy refactor code. Rất nhiều ví dụ thực chiến trước và sau khi tối ưu.',
        pros: ['Quy tắc đặt tên và chia hàm cực kỳ dễ áp dụng', 'Ví dụ so sánh trước/sau rõ ràng', 'Nâng cao chuẩn mực viết code trong team'],
        cons: ['Một số ví dụ dựa trên Java cũ nhưng nguyên lý vẫn vẹn nguyên giá trị'],
        tags: ['lap-trinh-vien', 'phat-trien-ban-than', 'phai-doc'],
        images: []
      }
    ]
  },
  {
    name: 'Tai Nghe Chống Ồn Không Dây Sony WH-1000XM5',
    category: 'Âm thanh & Phụ kiện',
    price: 8490000,
    description: 'Tai nghe chống ồn chủ động hàng đầu phân khúc trang bị 2 chip xử lý độc quyền V1 & QN1, 8 micro thu âm, hỗ trợ âm thanh Hi-Res LDAC và thời lượng pin 30 giờ.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    tags: ['tai-nghe', 'chong-on-chu-dong', 'sony', 'hi-res-audio', 'bluetooth'],
    specifications: {
      'Màng loa (Driver)': '30mm màng vòm sợi Carbon composite siêu nhẹ',
      'Công nghệ chống ồn': 'Bộ xử lý kép V1 + QN1 với 8 micro chuyên dụng',
      'Thời lượng pin': '30 giờ (Bật ANC), 40 giờ (Tắt ANC)',
      'Sạc nhanh': 'Sạc 3 phút nghe được 3 giờ qua chuẩn USB-PD',
      'Chuẩn Bluetooth': 'Bluetooth 5.2, kết nối 2 thiết bị cùng lúc (Multipoint)',
      'Codec hỗ trợ': 'LDAC, AAC, SBC',
      'Trọng lượng': '250g'
    },
    reviews: [
      {
        author: 'Vũ Quốc Bảo',
        rating: 5,
        title: 'Không gian văn phòng ồn ào biến mất hoàn toàn',
        comment: 'Khả năng chống ồn chủ động tốt nhất hiện nay trên thị trường. Đệm tai cực kỳ êm ái, đeo liên tục 8 tiếng làm việc không bị đau vành tai. Chuyển đổi qua lại giữa laptop và điện thoại siêu nhanh.',
        pros: ['Chống ồn ANC đỉnh cao', 'Trọng lượng nhẹ, đeo cực kỳ thoải mái', 'Micro đàm thoại họp online rất trong trẻo'],
        cons: ['Hộp đựng kích thước hơi lớn hơn thế hệ XM4 cũ'],
        tags: ['lam-viec-tu-xa', 'chong-on', 'am-thanh-hay', 'sony'],
        images: [
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80'
        ]
      }
    ]
  }
];

module.exports = sampleProducts;
