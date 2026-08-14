/**
 * FlexiReview — Professional Frontend Controller (Vietnamese Redesign)
 * 
 * Features:
 * - Dynamic rendering of MongoDB flexible specifications
 * - Full CRUD for Products and Reviews
 * - Interactive 5-star rating picker with Vietnamese labels
 * - Dynamic Key-Value specification builder
 * - Built-in fallback sample data for seamless offline/disconnected preview
 */

// Fallback initial dataset (used if MongoDB is not connected yet)
const fallbackProducts = [
  {
    _id: 'sample_prod_1',
    name: 'MacBook Pro 14" (Chip Apple M3 Pro)',
    category: 'Điện tử & Laptop',
    price: 1999.00,
    description: 'Trang bị chip Apple M3 Pro với CPU 11 lõi và GPU 14 lõi. Màn hình Liquid Retina XDR 14.2 inch tuyệt đẹp với công nghệ ProMotion 120Hz mượt mà.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    tags: ['apple', 'macbook', 'm3-pro', 'lap-trinh', 'do-hoa'],
    averageRating: 4.8,
    reviewCount: 2,
    specifications: {
      'Vi xử lý (CPU)': 'Apple M3 Pro (11 nhân CPU, 14 nhân GPU)',
      'Bộ nhớ RAM': '18GB Unified Memory',
      'Ổ cứng lưu trữ': '512GB NVMe SSD tốc độ cao',
      'Màn hình': '14.2" Liquid Retina XDR (3024x1964 @ 120Hz)',
      'Thời lượng pin': 'Lên tới 18 giờ sử dụng liên tục',
      'Cổng kết nối': '3x Thunderbolt 4, HDMI, MagSafe 3, SDXC',
      'Trọng lượng': '1.61 kg'
    },
    reviews: [
      {
        _id: 'rev_1_1',
        productId: 'sample_prod_1',
        author: 'Nguyễn Hoàng Long',
        rating: 5,
        title: 'Hiệu năng biên dịch code cực nhanh, pin dùng cả ngày!',
        comment: 'Nâng cấp từ bản Intel và sự khác biệt thực sự vượt trội. Khởi động Docker containers chỉ trong tích tắc, chạy server dev Next.js siêu mượt. Màn hình Mini-LED 120Hz xuất sắc.',
        pros: ['Tốc độ build dự án cực kỳ nhanh', 'Quạt tản nhiệt chạy êm ái', 'Màn hình Mini-LED 120Hz sắc nét', 'Pin thoải mái làm việc cả ngày dài'],
        cons: ['Giá nâng cấp RAM từ hãng còn khá đắt', 'Hơi dày hơn so với MacBook Air'],
        tags: ['lap-trinh', 'pin-trau', 'hieu-nang-cao'],
        images: [
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80'
        ],
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        _id: 'rev_1_2',
        productId: 'sample_prod_1',
        author: 'Trần Minh Thư',
        rating: 4,
        title: 'Rất tốt cho dựng video 4K, cổng kết nối đầy đủ',
        comment: 'Render timeline video 4K ProRes mượt mà, không bị giật lag khung hình nào. Cổng sạc MagSafe và khe thẻ nhớ SD rất tiện dụng.',
        pros: ['Xử lý đồ họa mượt mà', 'Cổng cắm đầy đủ tiện lợi', 'Hệ thống loa ngoài rất hay'],
        cons: ['Bản tiêu chuẩn chỉ có 512GB ở mức giá gần 2000 USD'],
        tags: ['dung-phim', 'sang-tao', 'apple'],
        images: [],
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
      }
    ]
  },
  {
    _id: 'sample_prod_2',
    name: 'Giày Chạy Bộ Nike ZoomX Vaporfly 3',
    category: 'Giày & Thể thao',
    price: 259.99,
    description: 'Mẫu giày đua đường trường đỉnh cao dành cho vận động viên marathon, tích hợp đĩa đệm sợi carbon Flyplate toàn chiều dài cùng bọt siêu nhẹ ZoomX.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    tags: ['chay-bo', 'marathon', 'dia-carbon', 'sieu-nhe'],
    averageRating: 5.0,
    reviewCount: 1,
    specifications: {
      'Chất liệu thân trên': 'Lưới kỹ thuật Flyknit Mesh thoáng khí',
      'Đế giữa (Midsole)': 'Bọt phản hồi lực ZoomX Super-Foam',
      'Đĩa trợ lực': 'Đĩa sợi Carbon Flyplate toàn phần',
      'Độ dốc gót-mũi (Drop)': '8 mm',
      'Trọng lượng': '180g (Size 42)',
      'Cự ly tối ưu': '5K, 10K, Half Marathon, Full Marathon 42K'
    },
    reviews: [
      {
        _id: 'rev_2_1',
        productId: 'sample_prod_2',
        author: 'Lê Văn Nam',
        rating: 5,
        title: 'Phá kỷ lục cá nhân (PR) ở giải chạy 21km!',
        comment: 'Độ nảy và lực đẩy về phía trước của đĩa carbon kết hợp đệm ZoomX thực sự ấn tượng. Giúp mình rút ngắn được 3 phút so với thành tích cũ.',
        pros: ['Lực phản hồi cực mạnh ở mỗi sải chân', 'Trọng lượng siêu nhẹ', 'Thoáng khí tốt khi chạy trời nắng'],
        cons: ['Độ bền đế ngoài chỉ tối ưu trong khoảng 300km đầu', 'Giá thành tương đối cao'],
        tags: ['giai-chay', 'pha-ky-luc', 'tro-luc-tot'],
        images: [
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80'
        ],
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
      }
    ]
  },
  {
    _id: 'sample_prod_3',
    name: 'Máy Pha Cà Phê De’Longhi Dedica Deluxe',
    category: 'Gia dụng & Đời sống',
    price: 299.95,
    description: 'Máy pha cafe espresso bơm áp suất chuẩn Ý 15 bar, thiết kế kim loại siêu mỏng gọn 15cm, hệ thống gia nhiệt Thermo-block làm nóng siêu tốc.',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    tags: ['cafe', 'espresso', 'may-pha-cafe', 'gia-dung'],
    averageRating: 5.0,
    reviewCount: 1,
    specifications: {
      'Áp suất bơm': 'Bơm 15 Bar chuẩn Ý',
      'Hệ thống gia nhiệt': 'Thermo-block làm nóng nhanh (35 giây)',
      'Dung tích bình nước': '1.0 Lít (Tháo rời dễ vệ sinh)',
      'Kích thước': '15cm Rộng x 33cm Sâu x 30cm Cao',
      'Công suất': '1300 Watts',
      'Vòi đánh sữa': 'Vòi Panarello tạo bọt Cappuccino & Latte'
    },
    reviews: [
      {
        _id: 'rev_3_1',
        productId: 'sample_prod_3',
        author: 'Đặng Thùy Trang',
        rating: 5,
        title: 'Máy pha cafe hoàn hảo cho gia đình',
        comment: 'Chiếm cực ít diện tích gian bếp, chỉ mất khoảng nửa phút để sẵn sàng chiết xuất. Pha cùng cafe rang mộc tạo lớp crema vàng óng rất thơm!',
        pros: ['Bề ngang siêu gọn chỉ 15cm', 'Làm nóng nhanh trong 35 giây', 'Chiết xuất crema dày và đều'],
        cons: ['Vòi tạo bọt sữa cần luyện tập chút để đánh mịn'],
        tags: ['espresso', 'yeu-cafe', 'nho-gon'],
        images: [
          'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80'
        ],
        createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
      }
    ]
  },
  {
    _id: 'sample_prod_4',
    name: 'Sách: Clean Code - Nghệ Thuật Viết Mã Sạch',
    category: 'Sách & Tài liệu',
    price: 34.99,
    description: 'Cuốn cẩm nang kinh điển của Robert C. Martin ("Uncle Bob") hướng dẫn tư duy viết code dễ đọc, dễ bảo trì và chuẩn mực chuyên nghiệp cho kỹ sư phần mềm.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    tags: ['sach-lap-trinh', 'clean-code', 'ky-su-phan-mem'],
    averageRating: 5.0,
    reviewCount: 1,
    specifications: {
      'Tác giả': 'Robert C. Martin ("Uncle Bob")',
      'Nhà xuất bản': 'Prentice Hall',
      'Năm phát hành': '2008',
      'Số trang': '464 trang',
      'Mã chuẩn ISBN-13': '978-0132350884',
      'Định dạng': 'Bìa mềm / E-Book'
    },
    reviews: [
      {
        _id: 'rev_4_1',
        productId: 'sample_prod_4',
        author: 'Phạm Đức Duy',
        rating: 5,
        title: 'Cuốn sách bắt buộc phải đọc cho mọi lập trình viên',
        comment: 'Thay đổi hoàn toàn cách mình đặt tên biến, cách chia nhỏ hàm và tư duy refactor code. Rất nhiều ví dụ thực chiến hữu ích.',
        pros: ['Quy tắc đặt tên và chia hàm cực kỳ dễ áp dụng', 'Ví dụ so sánh trước/sau rõ ràng', 'Nâng cao chuẩn mực viết code trong team'],
        cons: ['Một số ví dụ Java cũ nhưng nguyên lý vẫn vẹn nguyên giá trị'],
        tags: ['lap-trinh-vien', 'phat-trien-ban-than'],
        images: [],
        createdAt: new Date(Date.now() - 86400000 * 6).toISOString()
      }
    ]
  },
  {
    _id: 'sample_prod_5',
    name: 'Tai Nghe Chống Ồn Sony WH-1000XM5',
    category: 'Âm thanh & Phụ kiện',
    price: 398.00,
    description: 'Tai nghe chống ồn chủ động hàng đầu trang bị 2 chip xử lý độc quyền V1 & QN1, 8 micro thu âm, hỗ trợ âm thanh Hi-Res LDAC và thời lượng pin 30 giờ.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    tags: ['tai-nghe', 'chong-on', 'sony', 'bluetooth', 'hi-res'],
    averageRating: 5.0,
    reviewCount: 1,
    specifications: {
      'Màng loa (Driver)': '30mm màng vòm sợi Carbon composite siêu nhẹ',
      'Công nghệ chống ồn': 'Bộ xử lý kép V1 + QN1 với 8 micro chuyên dụng',
      'Thời lượng pin': '30 giờ (Bật ANC), 40 giờ (Tắt ANC)',
      'Sạc nhanh': 'Sạc 3 phút nghe được 3 giờ qua USB-PD',
      'Chuẩn Bluetooth': 'Bluetooth 5.2, kết nối 2 thiết bị cùng lúc (Multipoint)',
      'Trọng lượng': '250g'
    },
    reviews: [
      {
        _id: 'rev_5_1',
        productId: 'sample_prod_5',
        author: 'Vũ Quốc Bảo',
        rating: 5,
        title: 'Không gian văn phòng ồn ào biến mất hoàn toàn',
        comment: 'Khả năng chống ồn chủ động tuyệt vời. Đệm tai cực kỳ êm ái, đeo liên tục 8 tiếng làm việc không bị đau vành tai. Chuyển đổi qua lại giữa laptop và điện thoại siêu nhanh.',
        pros: ['Chống ồn ANC đỉnh cao', 'Trọng lượng nhẹ, đeo cực kỳ thoải mái', 'Micro đàm thoại họp online rất trong trẻo'],
        cons: ['Hộp đựng kích thước hơi lớn hơn thế hệ XM4 cũ'],
        tags: ['lam-viec-tu-xa', 'chong-on', 'am-thanh-hay'],
        images: [
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80'
        ],
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
      }
    ]
  }
];

// App State
const state = {
  products: [],
  categories: [],
  currentCategory: 'All',
  searchQuery: '',
  sortBy: 'newest',
  currentProduct: null,
  isOfflineFallback: false
};

const ratingLabelsVN = {
  1: '1.0 - Rất tệ',
  2: '2.0 - Tạm được',
  3: '3.0 - Khá tốt',
  4: '4.0 - Rất tốt',
  5: '5.0 - Xuất sắc!'
};

// DOM Cache
const DOM = {
  navBrand: document.getElementById('nav-brand'),
  btnAddProduct: document.getElementById('btn-add-product'),

  viewCatalog: document.getElementById('view-catalog'),
  viewDetail: document.getElementById('view-detail'),

  searchInput: document.getElementById('search-input'),
  searchClear: document.getElementById('search-clear'),
  categoryPills: document.getElementById('category-pills'),
  sortSelect: document.getElementById('sort-select'),
  productCount: document.getElementById('product-count'),
  productGrid: document.getElementById('product-grid'),
  catalogEmpty: document.getElementById('catalog-empty'),
  btnResetFilters: document.getElementById('btn-reset-filters'),

  btnBackToCatalog: document.getElementById('btn-back-to-catalog'),
  btnEditProduct: document.getElementById('btn-edit-product'),
  btnDeleteProduct: document.getElementById('btn-delete-product'),
  detailHero: document.getElementById('detail-hero'),
  detailSpecsContainer: document.getElementById('detail-specs-container'),
  ratingBreakdownPanel: document.getElementById('rating-breakdown-panel'),
  reviewsList: document.getElementById('reviews-list'),
  reviewsEmpty: document.getElementById('reviews-empty'),
  btnOpenAddReview: document.getElementById('btn-open-add-review'),
  btnEmptyAddReview: document.getElementById('btn-empty-add-review'),

  modalProduct: document.getElementById('modal-product'),
  modalProductTitle: document.getElementById('modal-product-title'),
  formProduct: document.getElementById('form-product'),
  btnCloseProductModal: document.getElementById('btn-close-product-modal'),
  btnCancelProduct: document.getElementById('btn-cancel-product'),
  btnAddSpecRow: document.getElementById('btn-add-spec-row'),
  specsBuilderRows: document.getElementById('specs-builder-rows'),

  prodFormId: document.getElementById('prod-form-id'),
  prodName: document.getElementById('prod-name'),
  prodCategory: document.getElementById('prod-category'),
  prodPrice: document.getElementById('prod-price'),
  prodImage: document.getElementById('prod-image'),
  prodDescription: document.getElementById('prod-description'),
  prodTags: document.getElementById('prod-tags'),

  modalReview: document.getElementById('modal-review'),
  modalReviewTitle: document.getElementById('modal-review-title'),
  formReview: document.getElementById('form-review'),
  btnCloseReviewModal: document.getElementById('btn-close-review-modal'),
  btnCancelReview: document.getElementById('btn-cancel-review'),
  starPicker: document.getElementById('star-picker'),
  ratingText: document.getElementById('rating-text'),

  revFormId: document.getElementById('rev-form-id'),
  revFormProductId: document.getElementById('rev-form-product-id'),
  revRating: document.getElementById('rev-rating'),
  revAuthor: document.getElementById('rev-author'),
  revTitle: document.getElementById('rev-title'),
  revComment: document.getElementById('rev-comment'),
  revPros: document.getElementById('rev-pros'),
  revCons: document.getElementById('rev-cons'),
  revTags: document.getElementById('rev-tags'),
  revImages: document.getElementById('rev-images'),

  toastContainer: document.getElementById('toast-container')
};

// ==========================================
// TOAST NOTIFICATION
// ==========================================
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast-msg toast-${type}`;
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;
  
  DOM.toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0.00';
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function renderStarIcons(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.4;
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars += '★';
    } else if (i === fullStars + 1 && hasHalf) {
      stars += '★';
    } else {
      stars += '☆';
    }
  }
  return stars;
}

// ==========================================
// VIEW SWITCHING
// ==========================================
function switchView(viewName) {
  if (viewName === 'catalog') {
    DOM.viewCatalog.classList.remove('hidden');
    DOM.viewCatalog.classList.add('active');
    DOM.viewDetail.classList.add('hidden');
    DOM.viewDetail.classList.remove('active');
    state.currentProduct = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (viewName === 'detail') {
    DOM.viewCatalog.classList.add('hidden');
    DOM.viewCatalog.classList.remove('active');
    DOM.viewDetail.classList.remove('hidden');
    DOM.viewDetail.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ==========================================
// CATALOG VIEW
// ==========================================
async function loadProducts() {
  try {
    const res = await api.getProducts({
      category: state.currentCategory,
      search: state.searchQuery,
      sort: state.sortBy
    });

    state.products = res.data || [];
    state.isOfflineFallback = false;
    renderCatalog();
    await loadCategories();
  } catch (error) {
    // If backend DB not connected, seamlessly load fallback dataset
    console.warn('Backend MongoDB offline, using fallback dataset:', error.message);
    state.isOfflineFallback = true;
    
    // Filter and sort locally
    let list = [...fallbackProducts];
    if (state.currentCategory && state.currentCategory !== 'All') {
      list = list.filter(p => p.category === state.currentCategory);
    }
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (state.sortBy === 'rating_desc') list.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    if (state.sortBy === 'price_asc') list.sort((a, b) => a.price - b.price);
    if (state.sortBy === 'price_desc') list.sort((a, b) => b.price - a.price);
    if (state.sortBy === 'name_asc') list.sort((a, b) => a.name.localeCompare(b.name));

    state.products = list;
    renderCatalog();
    extractFallbackCategories();
  }
}

async function loadCategories() {
  try {
    const cats = await api.getCategories();
    state.categories = cats || [];
    renderCategoryPills();
  } catch (err) {
    extractFallbackCategories();
  }
}

function extractFallbackCategories() {
  const set = new Set(fallbackProducts.map(p => p.category));
  state.categories = Array.from(set);
  renderCategoryPills();
}

function renderCategoryPills() {
  const allCategories = ['All', ...state.categories];
  DOM.categoryPills.innerHTML = allCategories.map(cat => {
    const label = cat === 'All' ? 'Tất cả' : cat;
    return `
      <button class="cat-btn ${state.currentCategory === cat ? 'active' : ''}" data-category="${escapeHTML(cat)}">
        ${escapeHTML(label)}
      </button>
    `;
  }).join('');

  DOM.categoryPills.querySelectorAll('.cat-btn').forEach(pill => {
    pill.addEventListener('click', () => {
      state.currentCategory = pill.getAttribute('data-category');
      DOM.categoryPills.querySelectorAll('.cat-btn').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      loadProducts();
    });
  });
}

function renderCatalog() {
  const count = state.products.length;
  DOM.productCount.textContent = `Hiển thị ${count} sản phẩm ${state.currentCategory !== 'All' ? `trong danh mục "${state.currentCategory}"` : ''}`;

  if (count === 0) {
    DOM.productGrid.innerHTML = '';
    DOM.catalogEmpty.classList.remove('hidden');
    return;
  }

  DOM.catalogEmpty.classList.add('hidden');
  
  DOM.productGrid.innerHTML = state.products.map(product => {
    const specs = product.specifications || {};
    const specEntries = Object.entries(specs).slice(0, 3);
    const specsHTML = specEntries.map(([k, v]) => `
      <span class="spec-chip" title="${escapeHTML(k)}: ${escapeHTML(String(v))}">
        ${escapeHTML(k)}: <strong>${escapeHTML(String(v))}</strong>
      </span>
    `).join('');

    const formattedPrice = formatCurrency(Number(product.price));
    const ratingDisplay = product.averageRating > 0 ? product.averageRating.toFixed(1) : 'Mới';
    const starsHTML = product.averageRating > 0 ? renderStarIcons(product.averageRating) : '☆☆☆☆☆';

    return `
      <article class="product-card" data-id="${product._id}">
        <div class="card-img-box">
          <img src="${escapeHTML(product.imageUrl)}" alt="${escapeHTML(product.name)}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'">
          <span class="card-badge">${escapeHTML(product.category)}</span>
        </div>
        <div class="card-content">
          <div class="card-header-line">
            <h3 class="card-title">${escapeHTML(product.name)}</h3>
            <span class="card-price">${formattedPrice}</span>
          </div>
          <p class="card-desc">${escapeHTML(product.description)}</p>
          
          <div class="card-specs-row">
            ${specsHTML}
          </div>

          <div class="card-footer-line">
            <div class="stars-group">
              <span class="stars-gold">${starsHTML}</span>
              <span class="score-num">${ratingDisplay}</span>
            </div>
            <span class="review-tally">${product.reviewCount || (product.reviews ? product.reviews.length : 0)} đánh giá</span>
          </div>
        </div>
      </article>
    `;
  }).join('');

  DOM.productGrid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      loadProductDetail(id);
    });
  });
}

// ==========================================
// PRODUCT DETAIL VIEW
// ==========================================
async function loadProductDetail(productId) {
  try {
    let product;
    if (state.isOfflineFallback) {
      product = fallbackProducts.find(p => p._id === productId);
    } else {
      try {
        product = await api.getProductById(productId);
      } catch {
        product = fallbackProducts.find(p => p._id === productId);
      }
    }

    if (!product) throw new Error('Không tìm thấy thông tin sản phẩm');

    state.currentProduct = product;
    renderProductDetail(product);
    switchView('detail');
  } catch (error) {
    showToast(error.message, 'error');
  }
}

function renderProductDetail(product) {
  const formattedPrice = formatCurrency(Number(product.price));
  const ratingDisplay = product.averageRating > 0 ? product.averageRating.toFixed(1) : 'Chưa có đánh giá';
  const starsHTML = product.averageRating > 0 ? renderStarIcons(product.averageRating) : '☆☆☆☆☆';

  // Render Hero Showcase
  DOM.detailHero.innerHTML = `
    <div class="showcase-img-box">
      <img src="${escapeHTML(product.imageUrl)}" alt="${escapeHTML(product.name)}" class="showcase-main-img" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'">
    </div>
    <div class="showcase-info">
      <span class="category-tag">${escapeHTML(product.category)}</span>
      <h1 class="showcase-title">${escapeHTML(product.name)}</h1>
      <div class="rating-overview-row">
        <span class="stars-gold" style="font-size: 1.15rem;">${starsHTML}</span>
        <strong style="font-size: 1.05rem; color: var(--text-title);">${ratingDisplay}</strong>
        <span class="text-muted">(${product.reviewCount || (product.reviews ? product.reviews.length : 0)} đánh giá)</span>
      </div>
      <div class="showcase-price">${formattedPrice}</div>
      <p class="showcase-desc">${escapeHTML(product.description)}</p>
      
      ${product.tags && product.tags.length > 0 ? `
        <div class="tags-list">
          ${product.tags.map(t => `<span class="tag-item">#${escapeHTML(t)}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `;

  // Render Dynamic Specifications
  const specs = product.specifications || {};
  const specEntries = Object.entries(specs);

  if (specEntries.length === 0) {
    DOM.detailSpecsContainer.innerHTML = `
      <p class="text-muted" style="grid-column: 1 / -1;">Chưa có thông số kỹ thuật tùy biến.</p>
    `;
  } else {
    DOM.detailSpecsContainer.innerHTML = specEntries.map(([key, value]) => `
      <div class="spec-box">
        <span class="spec-name">${escapeHTML(key)}</span>
        <span class="spec-val">${escapeHTML(String(value))}</span>
      </div>
    `).join('');
  }

  // Render Reviews & Rating Breakdown
  renderRatingBreakdown(product);
  renderReviewsList(product.reviews || []);
}

function renderRatingBreakdown(product) {
  const reviews = product.reviews || [];
  const total = reviews.length;

  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    if (counts[r.rating] !== undefined) counts[r.rating]++;
  });

  const avg = product.averageRating > 0 ? product.averageRating.toFixed(1) : '0.0';
  const starsHTML = product.averageRating > 0 ? renderStarIcons(product.averageRating) : '☆☆☆☆☆';

  DOM.ratingBreakdownPanel.innerHTML = `
    <div class="rating-total-col">
      <div class="grand-number">${avg}</div>
      <div class="grand-stars">${starsHTML}</div>
      <div class="grand-sub">Dựa trên ${total} đánh giá</div>
    </div>
    <div class="rating-bars-col">
      ${[5, 4, 3, 2, 1].map(star => {
        const c = counts[star] || 0;
        const pct = total > 0 ? Math.round((c / total) * 100) : 0;
        return `
          <div class="bar-row">
            <span class="bar-label">${star} sao</span>
            <div class="bar-track">
              <div class="bar-fill" style="width: ${pct}%"></div>
            </div>
            <span class="bar-count">${c}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderReviewsList(reviews) {
  if (!reviews || reviews.length === 0) {
    DOM.reviewsList.innerHTML = '';
    DOM.reviewsEmpty.classList.remove('hidden');
    return;
  }

  DOM.reviewsEmpty.classList.add('hidden');

  DOM.reviewsList.innerHTML = reviews.map(rev => {
    const formattedDate = new Date(rev.createdAt || Date.now()).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const authorInitials = (rev.author || 'A').substring(0, 2).toUpperCase();
    const starsHTML = renderStarIcons(rev.rating);

    // Pros & Cons
    const hasPros = rev.pros && rev.pros.length > 0;
    const hasCons = rev.cons && rev.cons.length > 0;
    let prosConsHTML = '';

    if (hasPros || hasCons) {
      prosConsHTML = `
        <div class="pros-cons-grid">
          ${hasPros ? `
            <div class="feature-panel panel-pro">
              <div class="feature-heading text-success-label">👍 Ưu điểm</div>
              <ul class="points-list">
                ${rev.pros.map(p => `<li>${escapeHTML(p)}</li>`).join('')}
              </ul>
            </div>
          ` : '<div></div>'}
          
          ${hasCons ? `
            <div class="feature-panel panel-con">
              <div class="feature-heading text-danger-label">👎 Nhược điểm</div>
              <ul class="points-list">
                ${rev.cons.map(c => `<li>${escapeHTML(c)}</li>`).join('')}
              </ul>
            </div>
          ` : '<div></div>'}
        </div>
      `;
    }

    // Review Photos
    let imagesHTML = '';
    if (rev.images && rev.images.length > 0) {
      imagesHTML = `
        <div class="photos-row">
          ${rev.images.map(imgUrl => `
            <a href="${escapeHTML(imgUrl)}" target="_blank" rel="noopener noreferrer">
              <img src="${escapeHTML(imgUrl)}" class="photo-thumb" alt="Ảnh đánh giá" onerror="this.style.display='none'">
            </a>
          `).join('')}
        </div>
      `;
    }

    // Review Tags
    let tagsHTML = '';
    if (rev.tags && rev.tags.length > 0) {
      tagsHTML = `
        <div class="tags-footer">
          ${rev.tags.map(t => `<span class="tag-item">🏷️ ${escapeHTML(t)}</span>`).join('')}
        </div>
      `;
    }

    return `
      <article class="review-item" data-review-id="${rev._id}">
        <div class="review-top-line">
          <div class="author-info">
            <div class="author-circle">${escapeHTML(authorInitials)}</div>
            <div>
              <div class="author-name">${escapeHTML(rev.author || 'Người dùng ẩn danh')}</div>
              <div class="review-date">${formattedDate}</div>
            </div>
          </div>
          <div class="review-actions-group">
            <button class="btn-icon btn-edit-review" title="Sửa đánh giá" data-id="${rev._id}">✏️</button>
            <button class="btn-icon btn-delete-review" title="Xóa đánh giá" data-id="${rev._id}">🗑️</button>
          </div>
        </div>

        <div class="review-score-headline">
          <span class="stars-gold">${starsHTML}</span>
          <h4 class="review-title-text">${escapeHTML(rev.title)}</h4>
        </div>

        <p class="review-comment-body">${escapeHTML(rev.comment)}</p>

        ${prosConsHTML}
        ${imagesHTML}
        ${tagsHTML}
      </article>
    `;
  }).join('');

  // Edit / Delete button actions
  DOM.reviewsList.querySelectorAll('.btn-edit-review').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const reviewId = btn.getAttribute('data-id');
      const rev = reviews.find(r => r._id === reviewId);
      if (rev) openEditReviewModal(rev);
    });
  });

  DOM.reviewsList.querySelectorAll('.btn-delete-review').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const reviewId = btn.getAttribute('data-id');
      if (confirm('Bạn có chắc chắn muốn xóa bài đánh giá này?')) {
        try {
          if (state.isOfflineFallback) {
            state.currentProduct.reviews = state.currentProduct.reviews.filter(r => r._id !== reviewId);
            state.currentProduct.reviewCount = state.currentProduct.reviews.length;
            const sum = state.currentProduct.reviews.reduce((acc, r) => acc + r.rating, 0);
            state.currentProduct.averageRating = state.currentProduct.reviews.length > 0 ? (sum / state.currentProduct.reviews.length) : 0;
          } else {
            await api.deleteReview(reviewId);
          }
          showToast('Đã xóa đánh giá thành công!', 'success');
          await loadProductDetail(state.currentProduct._id);
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  });
}

// ==========================================
// DYNAMIC SPECIFICATIONS BUILDER
// ==========================================
function addSpecRow(key = '', value = '') {
  const row = document.createElement('div');
  row.className = 'spec-row-input';
  row.innerHTML = `
    <input type="text" class="spec-key-input" placeholder="Tên thông số (VD: RAM)" value="${escapeHTML(key)}" required>
    <input type="text" class="spec-val-input" placeholder="Giá trị (VD: 18GB)" value="${escapeHTML(value)}" required>
    <button type="button" class="btn-remove" title="Xóa dòng">&times;</button>
  `;

  row.querySelector('.btn-remove').addEventListener('click', () => row.remove());
  DOM.specsBuilderRows.appendChild(row);
}

function getSpecificationsFromBuilder() {
  const specs = {};
  const rows = DOM.specsBuilderRows.querySelectorAll('.spec-row-input');
  rows.forEach(row => {
    const key = row.querySelector('.spec-key-input').value.trim();
    const val = row.querySelector('.spec-val-input').value.trim();
    if (key && val) {
      specs[key] = val;
    }
  });
  return specs;
}

// ==========================================
// PRODUCT MODAL
// ==========================================
function openAddProductModal() {
  DOM.modalProductTitle.textContent = 'Thêm Sản Phẩm Mới';
  DOM.formProduct.reset();
  DOM.prodFormId.value = '';
  DOM.specsBuilderRows.innerHTML = '';

  addSpecRow('Thương hiệu', '');
  addSpecRow('Model / Phiên bản', '');
  addSpecRow('Tính năng nổi bật', '');

  DOM.modalProduct.classList.remove('hidden');
}

function openEditProductModal(product) {
  DOM.modalProductTitle.textContent = 'Chỉnh Sửa Sản Phẩm';
  DOM.formProduct.reset();
  DOM.prodFormId.value = product._id;
  DOM.prodName.value = product.name || '';
  DOM.prodCategory.value = product.category || '';
  DOM.prodPrice.value = product.price || '';
  DOM.prodImage.value = product.imageUrl || '';
  DOM.prodDescription.value = product.description || '';
  DOM.prodTags.value = (product.tags || []).join(', ');

  DOM.specsBuilderRows.innerHTML = '';
  const specs = product.specifications || {};
  const entries = Object.entries(specs);
  if (entries.length > 0) {
    entries.forEach(([k, v]) => addSpecRow(k, v));
  } else {
    addSpecRow('', '');
  }

  DOM.modalProduct.classList.remove('hidden');
}

function closeProductModal() {
  DOM.modalProduct.classList.add('hidden');
}

async function handleProductFormSubmit(e) {
  e.preventDefault();

  const id = DOM.prodFormId.value;
  const name = DOM.prodName.value.trim();
  const category = DOM.prodCategory.value.trim();
  const price = parseFloat(DOM.prodPrice.value);
  const imageUrl = DOM.prodImage.value.trim();
  const description = DOM.prodDescription.value.trim();
  const tagsStr = DOM.prodTags.value.trim();
  const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];
  const specifications = getSpecificationsFromBuilder();

  const payload = {
    name,
    category,
    price,
    description,
    imageUrl: imageUrl || undefined,
    specifications,
    tags
  };

  try {
    if (state.isOfflineFallback) {
      if (id) {
        const prod = fallbackProducts.find(p => p._id === id);
        if (prod) Object.assign(prod, payload);
      } else {
        const newProd = {
          _id: 'custom_' + Date.now(),
          ...payload,
          averageRating: 0,
          reviewCount: 0,
          reviews: []
        };
        fallbackProducts.unshift(newProd);
      }
    } else {
      if (id) {
        await api.updateProduct(id, payload);
      } else {
        await api.createProduct(payload);
      }
    }
    showToast(id ? 'Đã cập nhật sản phẩm thành công!' : 'Đã thêm sản phẩm mới thành công!', 'success');
    closeProductModal();
    await loadProducts();
    if (id) await loadProductDetail(id);
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// ==========================================
// REVIEW MODAL
// ==========================================
function setStarRating(val) {
  DOM.revRating.value = val;
  DOM.ratingText.textContent = ratingLabelsVN[val] || `${val}.0`;

  const starBtns = DOM.starPicker.querySelectorAll('.star-item');
  starBtns.forEach(btn => {
    const starVal = parseInt(btn.getAttribute('data-value'), 10);
    if (starVal <= val) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function openAddReviewModal() {
  if (!state.currentProduct) return;

  DOM.modalReviewTitle.textContent = `Viết Đánh Giá: ${state.currentProduct.name}`;
  DOM.formReview.reset();
  DOM.revFormId.value = '';
  DOM.revFormProductId.value = state.currentProduct._id;
  setStarRating(5);

  DOM.modalReview.classList.remove('hidden');
}

function openEditReviewModal(review) {
  DOM.modalReviewTitle.textContent = 'Chỉnh Sửa Đánh Giá';
  DOM.formReview.reset();
  DOM.revFormId.value = review._id;
  DOM.revFormProductId.value = review.productId;
  DOM.revAuthor.value = review.author || '';
  DOM.revTitle.value = review.title || '';
  DOM.revComment.value = review.comment || '';
  DOM.revPros.value = (review.pros || []).join('\n');
  DOM.revCons.value = (review.cons || []).join('\n');
  DOM.revTags.value = (review.tags || []).join(', ');
  DOM.revImages.value = (review.images || []).join('\n');

  setStarRating(review.rating || 5);
  DOM.modalReview.classList.remove('hidden');
}

function closeReviewModal() {
  DOM.modalReview.classList.add('hidden');
}

async function handleReviewFormSubmit(e) {
  e.preventDefault();

  const reviewId = DOM.revFormId.value;
  const productId = DOM.revFormProductId.value || (state.currentProduct ? state.currentProduct._id : null);
  const rating = parseInt(DOM.revRating.value, 10);
  const author = DOM.revAuthor.value.trim() || 'Người dùng ẩn danh';
  const title = DOM.revTitle.value.trim();
  const comment = DOM.revComment.value.trim();
  
  const pros = DOM.revPros.value.split('\n').map(p => p.trim()).filter(Boolean);
  const cons = DOM.revCons.value.split('\n').map(c => c.trim()).filter(Boolean);
  const images = DOM.revImages.value.split('\n').map(img => img.trim()).filter(Boolean);
  const tags = DOM.revTags.value.split(',').map(t => t.trim()).filter(Boolean);

  const payload = { author, rating, title, comment, pros, cons, tags, images };

  try {
    if (state.isOfflineFallback) {
      if (reviewId) {
        const rev = state.currentProduct.reviews.find(r => r._id === reviewId);
        if (rev) Object.assign(rev, payload);
      } else {
        const newRev = {
          _id: 'rev_' + Date.now(),
          productId,
          ...payload,
          createdAt: new Date().toISOString()
        };
        if (!state.currentProduct.reviews) state.currentProduct.reviews = [];
        state.currentProduct.reviews.unshift(newRev);
      }
      state.currentProduct.reviewCount = state.currentProduct.reviews.length;
      const sum = state.currentProduct.reviews.reduce((acc, r) => acc + r.rating, 0);
      state.currentProduct.averageRating = Math.round((sum / state.currentProduct.reviews.length) * 10) / 10;
    } else {
      if (reviewId) {
        await api.updateReview(reviewId, payload);
      } else {
        await api.createReview(productId, payload);
      }
    }

    showToast(reviewId ? 'Đã cập nhật đánh giá thành công!' : 'Đã gửi đánh giá thành công!', 'success');
    closeReviewModal();
    await loadProductDetail(productId);
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function setupEventListeners() {
  DOM.navBrand.addEventListener('click', () => switchView('catalog'));

  DOM.btnAddProduct.addEventListener('click', openAddProductModal);
  DOM.btnCloseProductModal.addEventListener('click', closeProductModal);
  DOM.btnCancelProduct.addEventListener('click', closeProductModal);
  DOM.formProduct.addEventListener('submit', handleProductFormSubmit);
  DOM.btnAddSpecRow.addEventListener('click', () => addSpecRow('', ''));

  let searchTimeout = null;
  DOM.searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const val = e.target.value;
    DOM.searchClear.classList.toggle('hidden', !val);
    state.searchQuery = val;
    searchTimeout = setTimeout(loadProducts, 260);
  });

  DOM.searchClear.addEventListener('click', () => {
    DOM.searchInput.value = '';
    DOM.searchClear.classList.add('hidden');
    state.searchQuery = '';
    loadProducts();
  });

  DOM.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    loadProducts();
  });

  DOM.btnResetFilters.addEventListener('click', () => {
    DOM.searchInput.value = '';
    DOM.searchClear.classList.add('hidden');
    state.searchQuery = '';
    state.currentCategory = 'All';
    DOM.sortSelect.value = 'newest';
    state.sortBy = 'newest';
    loadProducts();
  });

  DOM.btnBackToCatalog.addEventListener('click', () => switchView('catalog'));

  DOM.btnEditProduct.addEventListener('click', () => {
    if (state.currentProduct) openEditProductModal(state.currentProduct);
  });

  DOM.btnDeleteProduct.addEventListener('click', async () => {
    if (!state.currentProduct) return;
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${state.currentProduct.name}"?`)) {
      try {
        if (state.isOfflineFallback) {
          const idx = fallbackProducts.findIndex(p => p._id === state.currentProduct._id);
          if (idx !== -1) fallbackProducts.splice(idx, 1);
        } else {
          await api.deleteProduct(state.currentProduct._id);
        }
        showToast('Đã xóa sản phẩm thành công!', 'success');
        switchView('catalog');
        await loadProducts();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
  });

  DOM.btnOpenAddReview.addEventListener('click', openAddReviewModal);
  DOM.btnEmptyAddReview.addEventListener('click', openAddReviewModal);
  DOM.btnCloseReviewModal.addEventListener('click', closeReviewModal);
  DOM.btnCancelReview.addEventListener('click', closeReviewModal);
  DOM.formReview.addEventListener('submit', handleReviewFormSubmit);

  const starBtns = DOM.starPicker.querySelectorAll('.star-item');
  starBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseInt(btn.getAttribute('data-value'), 10);
      setStarRating(val);
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target === DOM.modalProduct) closeProductModal();
    if (e.target === DOM.modalReview) closeReviewModal();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadProducts();
});
