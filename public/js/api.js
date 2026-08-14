/**
 * FlexiReview API Client
 * 
 * Clean, lightweight Vanilla JS Fetch wrapper for REST API communication.
 */

const API_BASE = '/api';

const api = {
  /**
   * Fetch all products with optional filters
   */
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.sort) query.append('sort', params.sort);
    
    const url = `${API_BASE}/products?${query.toString()}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch products');
    return data;
  },

  /**
   * Fetch a single product by ID (including reviews)
   */
  async getProductById(id) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch product details');
    return data.data;
  },

  /**
   * Fetch all product categories
   */
  async getCategories() {
    const res = await fetch(`${API_BASE}/products/meta/categories`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch categories');
    return data.data;
  },

  /**
   * Create a new product (with dynamic specifications object)
   */
  async createProduct(productData) {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create product');
    return data.data;
  },

  /**
   * Update an existing product
   */
  async updateProduct(id, productData) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update product');
    return data.data;
  },

  /**
   * Delete a product and its reviews
   */
  async deleteProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete product');
    return data;
  },

  /**
   * Fetch reviews for a specific product
   */
  async getProductReviews(productId) {
    const res = await fetch(`${API_BASE}/products/${productId}/reviews`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch reviews');
    return data;
  },

  /**
   * Create a new review for a product
   */
  async createReview(productId, reviewData) {
    const res = await fetch(`${API_BASE}/products/${productId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to submit review');
    return data.data;
  },

  /**
   * Get single review by review ID
   */
  async getReviewById(reviewId) {
    const res = await fetch(`${API_BASE}/reviews/single/${reviewId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch review');
    return data.data;
  },

  /**
   * Update a review
   */
  async updateReview(reviewId, reviewData) {
    const res = await fetch(`${API_BASE}/reviews/single/${reviewId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update review');
    return data.data;
  },

  /**
   * Delete a review
   */
  async deleteReview(reviewId) {
    const res = await fetch(`${API_BASE}/reviews/single/${reviewId}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete review');
    return data;
  }
};
