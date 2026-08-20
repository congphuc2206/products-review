/**
 * FlexiReview — Frontend Controller (100% Real API - Không dùng Mock Fallback)
 */

// App State
const state = {
  products: [],
  categories: [],
  currentCategory: 'All',
  searchQuery: '',
  sortBy: 'newest',
  currentProduct: null
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

// Format currency to VNĐ (ví dụ: 49.990.000 ₫)
function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '0 ₫';
  return amount.toLocaleString('vi-VN') + ' ₫';
}

function renderStarIcons(rating) {
  const fullStars = Math.floor(rating || 0);
  const hasHalf = (rating || 0) - fullStars >= 0.4;
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

    state.products = (res && res.data) ? res.data : [];
    renderCatalog();
    await loadCategories();
  } catch (error) {
    console.error('Lỗi khi tải danh sách sản phẩm từ backend:', error);
    state.products = [];
    renderCatalog();
    showToast('Lỗi kết nối cơ sở dữ liệu: ' + (error.message || 'Không thể lấy dữ liệu'), 'error');
  }
}

async function loadCategories() {
  try {
    const cats = await api.getCategories();
    state.categories = cats || [];
    renderCategoryPills();
  } catch (err) {
    state.categories = [];
    renderCategoryPills();
  }
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
    
    // Minimalist, elegant specs format
    const specsHTML = specEntries.map(([k, v]) => {
      const cleanKey = k.replace(/\s*\(.*?\)\s*/g, '').trim();
      return `
        <div class="spec-dot-item">
          <span>${escapeHTML(cleanKey)}:</span>
          <strong>${escapeHTML(String(v))}</strong>
        </div>
      `;
    }).join('');

    const formattedPrice = formatCurrency(Number(product.price));
    const ratingDisplay = product.averageRating > 0 ? product.averageRating.toFixed(1) : 'Mới';
    const starsHTML = product.averageRating > 0 ? renderStarIcons(product.averageRating) : '☆☆☆☆☆';

    return `
      <article class="product-card" data-id="${product._id}">
        <div class="card-img-box">
          <img src="${escapeHTML(product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80')}" alt="${escapeHTML(product.name)}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'">
          <span class="card-badge">${escapeHTML(product.category)}</span>
        </div>
        <div class="card-content">
          <div class="card-header-line">
            <h3 class="card-title">${escapeHTML(product.name)}</h3>
            <span class="card-price">${formattedPrice}</span>
          </div>
          <p class="card-desc">${escapeHTML(product.description || '')}</p>
          
          ${specsHTML ? `
            <div class="card-specs-minimal">
              ${specsHTML}
            </div>
          ` : ''}

          <div class="card-footer-line">
            <div class="stars-group">
              <span class="stars-gold">${starsHTML}</span>
              <span class="score-num">${ratingDisplay}</span>
            </div>
            <span class="review-tally">${product.reviewCount || 0} đánh giá</span>
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
    const product = await api.getProductById(productId);
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
      <img src="${escapeHTML(product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80')}" alt="${escapeHTML(product.name)}" class="showcase-main-img" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'">
    </div>
    <div class="showcase-info">
      <div class="showcase-meta-top">
        <span class="category-tag">${escapeHTML(product.category)}</span>
        <span class="verified-tag">✓ Đã kiểm định</span>
      </div>
      <h1 class="showcase-title">${escapeHTML(product.name)}</h1>
      <div class="rating-overview-row">
        <span class="stars-gold" style="font-size: 1.1rem;">${starsHTML}</span>
        <strong style="font-size: 1rem; color: var(--text-main);">${ratingDisplay}</strong>
        <span class="text-muted">(${product.reviewCount || 0} đánh giá từ người mua)</span>
      </div>
      <div class="showcase-price">${formattedPrice}</div>
      <p class="showcase-desc">${escapeHTML(product.description || '')}</p>
      
      ${product.tags && product.tags.length > 0 ? `
        <div class="tags-list">
          ${product.tags.map(t => `<span class="tag-item">#${escapeHTML(t)}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `;

  // Render Clean Specifications Table
  const specs = product.specifications || {};
  const specEntries = Object.entries(specs);

  if (specEntries.length === 0) {
    DOM.detailSpecsContainer.innerHTML = `
      <p class="text-muted" style="grid-column: 1 / -1;">Chưa có thông số kỹ thuật tùy biến cho sản phẩm này.</p>
    `;
  } else {
    const tableRows = specEntries.map(([key, value]) => `
      <tr>
        <td class="spec-col-name">${escapeHTML(key)}</td>
        <td class="spec-col-value">${escapeHTML(String(value))}</td>
      </tr>
    `).join('');

    DOM.detailSpecsContainer.innerHTML = `
      <table class="specs-table">
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
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
      month: '2-digit',
      day: '2-digit'
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
              <div class="review-date">📅 ${formattedDate}</div>
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
          await api.deleteReview(reviewId);
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
    if (id) {
      await api.updateProduct(id, payload);
    } else {
      await api.createProduct(payload);
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
    if (reviewId) {
      await api.updateReview(reviewId, payload);
    } else {
      await api.createReview(productId, payload);
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
    searchTimeout = setTimeout(loadProducts, 240);
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
        await api.deleteProduct(state.currentProduct._id);
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
