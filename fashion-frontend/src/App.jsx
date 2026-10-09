import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  ShoppingBag, Check, ShieldCheck, RefreshCw, X, Plus, Minus,
  ArrowRight, Lock, CheckCircle2, LayoutDashboard, Store, Layers,
  ChevronLeft, Search, SlidersHorizontal, PlusCircle, Star, BadgeCheck,
  MessageSquare, Tag, Sparkles, PackageSearch, Truck, CreditCard, Banknote,
  Volume2, VolumeX, Play, Pause, Eye, Award, Feather, Compass
} from 'lucide-react';

const initialCatalog = [
  {
    id: 1,
    title: 'Premium Cotton Panjabi',
    slug: 'premium-cotton-panjabi',
    category: 'Men',
    category_name: 'Men',
    price: 2500,
    base_price: '2500.00',
    description: 'Exclusive cotton collection tailored to perfection.',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
    images: [{ id: 1, image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800', color_id: 1 }],
    variants: [
      { id: 101, color_id: 1, color_name: 'Noir', hex_code: '#1A1A1A', size_id: 1, size_name: 'M', stock_quantity: 10, sku: 'PANJ-M' },
      { id: 102, color_id: 1, color_name: 'Noir', hex_code: '#1A1A1A', size_id: 2, size_name: 'L', stock_quantity: 8, sku: 'PANJ-L' }
    ]
  },
  {
    id: 2,
    title: 'Classic Linen Shirt',
    slug: 'classic-linen-shirt',
    category: 'Men',
    category_name: 'Men',
    price: 1800,
    base_price: '1800.00',
    description: 'Pure linen casual shirt designed for comfort.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
    images: [{ id: 2, image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800', color_id: 1 }],
    variants: [
      { id: 201, color_id: 1, color_name: 'White', hex_code: '#FAF9F6', size_id: 1, size_name: 'M', stock_quantity: 12, sku: 'SHIRT-M' }
    ]
  },
  {
    id: 3,
    title: 'Haute Couture Silk Dress',
    slug: 'haute-couture-silk-dress',
    category: 'Women',
    category_name: 'Women',
    price: 3500,
    base_price: '3500.00',
    description: 'Sculpted hourglass tailoring and pure silk drapery.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800',
    images: [{ id: 3, image_url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800', color_id: 1 }],
    variants: [
      { id: 301, color_id: 1, color_name: 'Silk Rose', hex_code: '#B76E79', size_id: 1, size_name: 'S', stock_quantity: 6, sku: 'DRESS-S' }
    ]
  },
  {
    id: 4,
    title: 'Kids Loopback Fleece',
    slug: 'kids-loopback-fleece',
    category: 'Kids',
    category_name: 'Kids',
    price: 1200,
    base_price: '1200.00',
    description: 'Ultra-soft organic daily staple fleece.',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800',
    images: [{ id: 4, image_url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800', color_id: 1 }],
    variants: [
      { id: 401, color_id: 1, color_name: 'Heather Gray', hex_code: '#808080', size_id: 1, size_name: 'M', stock_quantity: 15, sku: 'FLEECE-M' }
    ]
  }
];

export default function App() {
  const [view, setView] = useState('store');
  const [storeMode, setStoreMode] = useState('catalog');
  const [selectedCategory, setSelectedCategory] = useState('Featured');

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  const videoRef = useRef(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const [productsList, setProductsList] = useState(initialCatalog);
  const [selectedSlug, setSelectedSlug] = useState(initialCatalog[0].slug);
  const [product, setProduct] = useState(initialCatalog[0]);

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const [reviews, setReviews] = useState([
    { id: 1, reviewer_name: 'Camille Laurent', rating: 5, fit_feedback: 'True to Size', review_text: 'The architectural drape is unmatched. Equivalent to Parisian atelier pieces twice this value.', created_at: new Date().toISOString() },
    { id: 2, reviewer_name: 'Julian Vance', rating: 5, fit_feedback: 'True to Size', review_text: 'Heavyweight organic fabric with flawless tailored finishes. Absolute wardrobe essential.', created_at: new Date().toISOString() }
  ]);
  const [newReview, setNewReview] = useState({
    reviewer_name: '',
    rating: 5,
    fit_feedback: 'True to Size',
    review_text: ''
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  const [selectedColor, setSelectedColor] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImage, setActiveImage] = useState(initialCatalog[0].thumbnail_url);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '123'
  });

  const [inputCoupon, setInputCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackOrderId, setTrackOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingError, setTrackingError] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const [orders, setOrders] = useState([
    { id: 101, customer_name: 'Alexander Wright', customer_email: 'alex@example.com', shipping_address: '450 Lexington Ave', city: 'New York', postal_code: '10017', total_amount: '185.00', order_status: 'delivered' },
    { id: 102, customer_name: 'Elena Rostova', customer_email: 'elena@example.com', shipping_address: '12 Queen St', city: 'London', postal_code: 'W1J 5PA', total_amount: '240.00', order_status: 'shipped' }
  ]);
  const [adminTab, setAdminTab] = useState('orders');

  const [newProduct, setNewProduct] = useState({
    category_id: 1,
    title: '',
    slug: '',
    description: '',
    base_price: '',
    image_url: '',
    stock_s: 10,
    stock_m: 15,
    stock_l: 10
  });
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  useEffect(() => {
    axios.get('https://fashion-backend-api-s5sg.onrender.com/api/products', { timeout: 60000 })
      .then(res => {
        const rawProducts = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        if (rawProducts.length > 0) {
          const formatted = rawProducts.map(p => {
            const rawCat = (p.category || 'Men').toString().toLowerCase().trim();
            let catName = 'Men';
            if (rawCat.includes('women')) catName = 'Women';
            else if (rawCat.includes('kids') || rawCat.includes('kid')) catName = 'Kids';

            const img = p.image_url || p.thumbnail_url || (Array.isArray(p.images) ? p.images[0] : p.image) || '';
            const priceVal = Number(p.price || p.base_price) || 0;

            return {
              id: p.id,
              title: p.title || p.name || 'Untitled Piece',
              name: p.title || p.name || 'Untitled Piece',
              slug: p.slug || `item-${p.id}`,
              category: catName,
              category_name: catName,
              price: priceVal,
              base_price: priceVal.toFixed(2),
              description: p.description || 'Exclusive Atelier collection garment.',
              image: img,
              thumbnail_url: img,
              images: [{ id: 1, image_url: img, color_id: 1 }],
              variants: p.variants && p.variants.length > 0 ? p.variants : [
                { id: p.id * 10 + 1, color_id: 1, color_name: 'Noir', hex_code: '#1A1A1A', size_id: 1, size_name: 'M', stock_quantity: 10, sku: `SKU-${p.id}-M` }
              ]
            };
          });

          setProductsList(formatted);
          setProduct(formatted[0]);
          setSelectedSlug(formatted[0].slug);
          setActiveImage(formatted[0].thumbnail_url);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
      });
  }, []);

  // Admin View-te gele Database theke real orders load hobe
  useEffect(() => {
    if (view === 'admin') {
      axios.get('https://fashion-backend-api-s5sg.onrender.com/api/orders')
        .then(res => {
          if (res.data.success && Array.isArray(res.data.data)) {
            const mappedOrders = res.data.data.map(o => ({
              id: o.id,
              customer_name: o.customer_name,
              customer_email: o.customer_email || 'N/A',
              shipping_address: o.customer_address,
              city: o.city || '',
              postal_code: o.postal_code || '',
              total_amount: Number(o.total_price).toFixed(2),
              order_status: o.order_status
            }));
            setOrders(mappedOrders);
          }
        })
        .catch(err => {
          console.error('Failed to fetch admin orders:', err);
        });
    }
  }, [view]);

  // Live Reviews Fetch Hook
  useEffect(() => {
    axios.get('https://fashion-backend-api-s5sg.onrender.com/api/reviews')
      .then(res => {
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setReviews(res.data.data);
        }
      })
      .catch(err => console.error('Error fetching reviews:', err));
  }, []);

  const handleSelectProduct = (slug) => {
    setSelectedSlug(slug);
    const found = productsList.find(p => p.slug === slug);
    if (found) {
      setProduct(found);
      if (found.variants && found.variants.length > 0) {
        setSelectedColor(found.variants[0].color_id);
      } else {
        setSelectedColor(1);
      }
      setActiveImage(found.thumbnail_url || found.image || '');
      setSelectedSize(null);
      setStoreMode('product');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavCategory = (catName) => {
    setSelectedCategory(catName);
    setView('store');
    setStoreMode('catalog');
    const el = document.getElementById('catalog-grid-start');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = (productsList || [])
    .filter(p => {
      if (!p) return false;
      const currentCat = (p.category || p.category_name || '').toString().toLowerCase();
      const targetCat = (selectedCategory || '').toString().toLowerCase();

      const matchesCategory =
        !selectedCategory ||
        targetCat === 'all' ||
        targetCat === 'featured' ||
        currentCat === targetCat;

      const query = (searchQuery || '').toString().toLowerCase();
      const title = (p.title || p.name || '').toString().toLowerCase();
      const desc = (p.description || '').toString().toLowerCase();

      return matchesCategory && (!query || title.includes(query) || desc.includes(query));
    })
    .sort((a, b) => {
      if (sortOption === 'price-asc') return Number(a.base_price) - Number(b.base_price);
      if (sortOption === 'price-desc') return Number(b.base_price) - Number(a.base_price);
      return 0;
    });

  const availableColors = product?.variants ? Array.from(
    new Map(product.variants.map(v => [v.color_id, { id: v.color_id, name: v.color_name, hex: v.hex_code }])).values()
  ) : [{ id: 1, name: 'Noir', hex: '#1A1A1A' }];

  const availableSizes = product?.variants ? Array.from(
    new Map(product.variants.map(v => [v.size_id, { id: v.size_id, name: v.size_name }])).values()
  ) : [{ id: 1, name: 'M' }];

  const displayedImages = product?.images?.filter(img => img.color_id === selectedColor) || [];

  const currentVariant = product?.variants?.find(
    v => v.color_id === selectedColor && v.size_id === selectedSize
  ) || null;

  const handleColorChange = (colorId) => {
    setSelectedColor(colorId);
    setSelectedSize(null);
    const matchingImages = product.images.filter(img => img.color_id === colorId);
    if (matchingImages.length > 0) {
      setActiveImage(matchingImages[0].image_url);
    }
  };

  const handleAddToCart = (targetProduct = product, targetSize = selectedSize, targetColor = selectedColor) => {
    if (!targetProduct) return;
    const sizeToUse = targetSize || 'M';
    const existingIndex = cart.findIndex(item => item.slug === targetProduct.slug && item.size === sizeToUse);

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          variantId: targetProduct.id * 10 + 1,
          slug: targetProduct.slug,
          title: targetProduct.title,
          price: Number(targetProduct.base_price),
          color: 'Noir Charcoal',
          size: sizeToUse,
          image: targetProduct.thumbnail_url || targetProduct.image,
          quantity: 1
        }
      ]);
    }
    setIsCartOpen(true);
    setQuickViewProduct(null);
  };

  const updateQuantity = (variantId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.variantId === variantId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (cartSubtotal * (appliedCoupon.discount_percentage / 100)) : 0;
  const cartFinalTotal = Math.max(0, cartSubtotal - discountAmount);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleVideoSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    setCouponLoading(true);
    setCouponError('');

    if (inputCoupon.trim().toUpperCase() === 'VIP20') {
      setTimeout(() => {
        setAppliedCoupon({ code: 'VIP20', discount_percentage: 20 });
        setInputCoupon('');
        setCouponLoading(false);
      }, 300);
    } else {
      setTimeout(() => {
        setCouponError('Invalid code. Use VIP20 for 20% off.');
        setCouponLoading(false);
      }, 300);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setOrderSubmitting(true);

    const payload = {
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      customer_address: customer.address,
      city: customer.city,
      postal_code: customer.postalCode,
      total_price: cartFinalTotal.toFixed(2),
      payment_method: paymentMethod,
      items: cart
    };

    try {
      const res = await axios.post('https://fashion-backend-api-s5sg.onrender.com/api/orders', payload);
      if (res.data.success) {
        const orderId = res.data.orderId;
        setOrderSuccessData({
          orderId: orderId,
          total: cartFinalTotal,
          itemsCount: totalItemsCount,
          discount: discountAmount,
          method: paymentMethod === 'card' ? 'Stripe Encrypted Card (4242)' : 'Cash on Delivery'
        });

        // Admin list update
        setOrders(prev => [{
          id: orderId,
          customer_name: customer.name,
          customer_email: customer.email,
          shipping_address: customer.address,
          city: customer.city,
          postal_code: customer.postalCode,
          total_amount: cartFinalTotal.toFixed(2),
          order_status: 'processing'
        }, ...prev]);

        setCart([]);
        setAppliedCoupon(null);
        setIsCheckoutOpen(false);
      }
    } catch (err) {
      console.error('Order creation error:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setOrderSubmitting(false);
    }
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!trackOrderId.trim()) return;
    setTrackingLoading(true);
    setTrackingError('');
    setTrackingResult(null);

    const cleanId = trackOrderId.replace(/[^0-9]/g, '');

    try {
      const res = await axios.get(`https://fashion-backend-api-s5sg.onrender.com/api/orders/${cleanId}`);
      if (res.data.success && res.data.order) {
        setTrackingResult(res.data.order);
      } else {
        setTrackingError(`Order #${cleanId} not found in database.`);
      }
    } catch (err) {
      console.error('Tracking fetch error:', err);
      setTrackingError(`Order #${cleanId} not found or connection failed.`);
    } finally {
      setTrackingLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    // 1. UI-te shathe shathe status change kora
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, order_status: newStatus } : o));

    // 2. MySQL Database-e live update pathano
    try {
      await axios.put(`https://fashion-backend-api-s5sg.onrender.com/api/orders/${orderId}/status`, {
        status: newStatus
      });
    } catch (err) {
      console.error('Order status update failed:', err);
      alert('Could not update status in database.');
    }
  };
  const handleUpdateStock = (variantId, newStock) => {
    setProduct(prev => ({
      ...prev,
      variants: prev.variants.map(v => v.id === variantId ? { ...v, stock_quantity: Number(newStock) } : v)
    }));
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setIsAddingProduct(true);

    const categoryMap = { 1: 'men', 2: 'women', 3: 'kids' };
    const payload = {
      title: newProduct.title,
      slug: newProduct.slug || newProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: Number(newProduct.base_price),
      category: categoryMap[newProduct.category_id] || 'men',
      description: newProduct.description,
      image_url: newProduct.image_url
    };

    try {
      const res = await axios.post('https://fashion-backend-api-s5sg.onrender.com/api/products', payload);
      if (res.data.success) {
        alert('Product published successfully to Database!');

        const refreshed = await axios.get('https://fashion-backend-api-s5sg.onrender.com/api/products');
        if (refreshed.data.success && Array.isArray(refreshed.data.data)) {
          const formatted = refreshed.data.data.map(p => {
            const rawCat = (p.category || 'Men').toString().toLowerCase().trim();
            let catName = 'Men';
            if (rawCat.includes('women')) catName = 'Women';
            else if (rawCat.includes('kids') || rawCat.includes('kid')) catName = 'Kids';

            const img = p.image_url || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800';
            const priceVal = Number(p.price) || 0;

            return {
              id: p.id,
              title: p.title,
              name: p.title,
              slug: p.slug,
              category: catName,
              category_name: catName,
              price: priceVal,
              base_price: priceVal.toFixed(2),
              description: p.description || '',
              image: img,
              thumbnail_url: img,
              images: [{ id: 1, image_url: img, color_id: 1 }],
              variants: [
                { id: p.id * 10 + 1, color_id: 1, color_name: 'Noir', hex_code: '#1A1A1A', size_id: 1, size_name: 'M', stock_quantity: 10, sku: `SKU-${p.id}-M` }
              ]
            };
          });
          setProductsList(formatted);
        }

        setNewProduct({
          category_id: 1,
          title: '',
          slug: '',
          description: '',
          base_price: '',
          image_url: '',
          stock_s: 10,
          stock_m: 15,
          stock_l: 10
        });

        setAdminTab('inventory');
      }
    } catch (err) {
      console.error('Failed to publish product:', err);
      alert('Error publishing product to database.');
    } finally {
      setIsAddingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to permanently delete this product?')) return;

    try {
      const res = await axios.delete(`https://fashion-backend-api-s5sg.onrender.com/api/products/${productId}`);
      if (res.data.success) {
        setProductsList(prev => prev.filter(item => item.id !== productId));
        alert('Product deleted successfully from Database!');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete product from database.');
    }
  };

  const handleUpdateProduct = async (productId, currentPrice) => {
    const newPrice = prompt('Enter new price ($):', currentPrice);
    if (!newPrice || isNaN(Number(newPrice))) return;

    try {
      const res = await axios.put(`https://fashion-backend-api-s5sg.onrender.com/api/products/${productId}`, {
        price: Number(newPrice)
      });

      if (res.data.success) {
        setProductsList(prev => prev.map(p =>
          p.id === productId ? { ...p, price: Number(newPrice) } : p
        ));
        alert('Product price updated successfully in Database!');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update product details');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.reviewer_name || !newReview.review_text) return;
    setSubmittingReview(true);

    try {
      const res = await axios.post('https://fashion-backend-api-s5sg.onrender.com/api/reviews', newReview);
      if (res.data.success) {
        // Refetch reviews from DB to show immediately
        const refreshed = await axios.get('https://fashion-backend-api-s5sg.onrender.com/api/reviews');
        if (refreshed.data.success && Array.isArray(refreshed.data.data)) {
          setReviews(refreshed.data.data);
        }
        setNewReview({ reviewer_name: '', rating: 5, fit_feedback: 'True to Size', review_text: '' });
        alert('Review published successfully to Database!');
      }
    } catch (err) {
      console.error('Submit review error:', err);
      alert('Failed to submit review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 antialiased font-sans relative overflow-x-hidden flex flex-col justify-between selection:bg-amber-400 selection:text-black">
      <div>
        <div className="bg-neutral-950 text-slate-400 text-[10px] sm:text-[11px] py-2 px-4 text-center font-mono tracking-[0.25em] uppercase border-b border-white/5 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span>PARIS RUNWAY ARCHIVE • COMPLIMENTARY COURIER OVER $150 • PROMO: <strong className="text-white">VIP20</strong></span>
        </div>

        <header className="sticky top-0 z-40 bg-[#070b12]/85 backdrop-blur-xl border-b border-white/10 py-3.5 px-4 sm:px-10 flex justify-between items-center transition-all">
          <div className="flex items-center gap-4 sm:gap-10">
            <button
              onClick={() => { setView('store'); setStoreMode('catalog'); setSelectedCategory('Featured'); }}
              className="group flex items-center gap-2.5 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-950 border border-white/20 flex items-center justify-center font-serif text-sm font-bold text-white group-hover:scale-105 transition">
                S<span className="text-amber-400">E</span>
              </div>
              <div>
                <span className="font-extrabold tracking-[0.2em] text-xs sm:text-base uppercase block text-white group-hover:text-amber-300 transition">
                  STUDIO ESSENTIALS
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-slate-500 uppercase block -mt-0.5">
                  HAUTE COUTURE ATELIER
                </span>
              </div>
            </button>

            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => { setView('store'); setStoreMode('catalog'); setSelectedCategory('Featured'); }}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all rounded-lg ${selectedCategory === 'Featured' && view === 'store'
                  ? 'text-amber-300 bg-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                Atelier Home
              </button>
              <button
                onClick={() => handleNavCategory('Women')}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all rounded-lg ${selectedCategory === 'Women' && view === 'store'
                  ? 'text-amber-300 bg-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                Women
              </button>
              <button
                onClick={() => handleNavCategory('Men')}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all rounded-lg ${selectedCategory === 'Men' && view === 'store'
                  ? 'text-amber-300 bg-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                Men
              </button>
              <button
                onClick={() => handleNavCategory('Kids')}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all rounded-lg ${selectedCategory === 'Kids' && view === 'store'
                  ? 'text-amber-300 bg-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                Kids
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => { setView('store'); setSelectedCategory('Featured'); }}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase rounded-lg transition-all ${view === 'store' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-slate-400 hover:text-white'
                  }`}
              >
                <Store className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden sm:inline">Store</span>
              </button>
              <button
                onClick={() => setView('admin')}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase rounded-lg transition-all ${view === 'admin' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-slate-400 hover:text-white'
                  }`}
              >
                <LayoutDashboard className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden sm:inline">Admin</span>
              </button>
            </div>

            {view === 'store' && (
              <button
                onClick={() => setIsTrackingOpen(true)}
                className="hidden lg:flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-slate-300 hover:text-white px-3 py-1.5 rounded-full border border-white/15 hover:border-white/40 transition-all bg-white/5 backdrop-blur-md"
              >
                <PackageSearch className="w-3.5 h-3.5 text-amber-400" /> Track
              </button>
            )}

            {view === 'store' ? (
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all shadow-lg shadow-white/10"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>BAG ({totalItemsCount})</span>
              </button>
            ) : (
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Console Active
              </span>
            )}
          </div>
        </header>

        {view === 'store' && (
          <div className="flex md:hidden items-center justify-around bg-black/60 border-b border-white/10 py-2.5 px-4 backdrop-blur-md">
            <button
              onClick={() => { setSelectedCategory('Featured'); setStoreMode('catalog'); }}
              className={`text-[11px] font-bold uppercase tracking-wider transition ${selectedCategory === 'Featured' ? 'text-amber-300 border-b border-amber-300' : 'text-slate-400'}`}
            >
              Atelier Home
            </button>
            <button
              onClick={() => handleNavCategory('Women')}
              className={`text-[11px] font-bold uppercase tracking-wider transition ${selectedCategory === 'Women' ? 'text-amber-300 border-b border-amber-300' : 'text-slate-400'}`}
            >
              Women
            </button>
            <button
              onClick={() => handleNavCategory('Men')}
              className={`text-[11px] font-bold uppercase tracking-wider transition ${selectedCategory === 'Men' ? 'text-amber-300 border-b border-amber-300' : 'text-slate-400'}`}
            >
              Men
            </button>
            <button
              onClick={() => handleNavCategory('Kids')}
              className={`text-[11px] font-bold uppercase tracking-wider transition ${selectedCategory === 'Kids' ? 'text-amber-300 border-b border-amber-300' : 'text-slate-400'}`}
            >
              Kids
            </button>
          </div>
        )}

        {view === 'store' && (
          <div>
            {storeMode === 'catalog' && (
              <div>
                <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden border-b border-white/10">
                  <div className="absolute inset-0 z-0">
                    <video
                      ref={videoRef}
                      autoPlay
                      loop
                      muted={isVideoMuted}
                      playsInline
                      poster="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
                      className="w-full h-full object-cover opacity-45 mix-blend-screen scale-105 transition-all duration-700"
                    >
                      <source
                        src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-runway-show-41484-large.mp4"
                        type="video/mp4"
                      />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-[#070b12]/40 to-[#070b12]/70" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#070b12]/50 to-[#070b12]" />
                  </div>

                  <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/15 p-1.5 rounded-full">
                    <button
                      onClick={toggleVideoPlay}
                      className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
                      aria-label="Play/Pause Video"
                    >
                      {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={toggleVideoSound}
                      className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
                      aria-label="Mute/Unmute Video"
                    >
                      {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  </div>

                  <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6 animate-pulse">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.3em] text-slate-200">
                        2026 Haute Couture Archive
                      </span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08] mb-6">
                      Portfolio Website. <br />
                      <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-slate-300">
                        MD Mohmen
                      </span>
                    </h1>

                    <p className="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed mb-10 font-light">
                      Engineered with heavyweight Australian cashmere, unwashed Japanese denim, and double-knit French terry. Designed for lifetime rotation.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setSelectedCategory('Featured');
                          const el = document.getElementById('catalog-grid-start');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full sm:w-auto px-9 py-4 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-neutral-200 hover:scale-105 transition-all"
                      >
                        Explore Curated Drops
                      </button>
                      <button
                        onClick={() => handleNavCategory('Women')}
                        className="w-full sm:w-auto px-9 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold text-xs uppercase tracking-[0.2em] transition-all"
                      >
                        Women Runway
                      </button>
                    </div>

                    <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-slate-400 font-mono">
                      <div className="flex items-center justify-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span>Certified 450 GSM</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Feather className="w-4 h-4 text-amber-400" />
                        <span>Organic Long-Staple</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Compass className="w-4 h-4 text-amber-400" />
                        <span>Made in Atelier</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Zero Carbon Supply</span>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="bg-[#05080e] border-y border-white/10 py-3.5 overflow-hidden">
                  <div className="flex whitespace-nowrap animate-marquee gap-8 text-xs font-mono tracking-[0.25em] uppercase text-slate-400 font-bold">
                    <span>• MILAN FASHION WEEK ARCHIVE</span>
                    <span>• LIMITED 200 RUNWAY EDITIONS</span>
                    <span>• BESPOKE HAND-STITCHED TAILORING</span>
                    <span>• WORLDWIDE EXPRESS COURIER</span>
                    <span>• 100% TRACEABLE ORGANIC FIBERS</span>
                    <span>• VIP ATELIER MEMBERSHIP ACCESS</span>
                  </div>
                </div>

                <section className="max-w-[1440px] mx-auto px-6 sm:px-10 py-16">
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-400 font-bold">
                      Atelier Collections
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
                      Explore By Department
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                      onClick={() => handleNavCategory('Women')}
                      className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer border border-white/15"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
                        alt="Women Collection"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">Department 01</span>
                        <h3 className="text-2xl font-bold text-white mt-1">Women Haute Couture</h3>
                        <p className="text-xs text-slate-300 mt-1">Sculpted hourglass tailoring and pure silk drapery.</p>
                      </div>
                    </div>

                    <div
                      onClick={() => handleNavCategory('Men')}
                      className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer border border-white/15"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80"
                        alt="Men Collection"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">Department 02</span>
                        <h3 className="text-2xl font-bold text-white mt-1">Men Minimal Atelier</h3>
                        <p className="text-xs text-slate-300 mt-1">Tailored wool blazers, heavy terry, and boxy cuts.</p>
                      </div>
                    </div>

                    <div
                      onClick={() => handleNavCategory('Kids')}
                      className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer border border-white/15"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80"
                        alt="Kids Collection"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">Department 03</span>
                        <h3 className="text-2xl font-bold text-white mt-1">Kids Pure Essentials</h3>
                        <p className="text-xs text-slate-300 mt-1">Ultra-soft organic loopback fleeces and daily staples.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <main id="catalog-grid-start" className="max-w-[1440px] mx-auto px-6 sm:px-10 py-12">
                  <div className="flex flex-col gap-6 border-b border-white/10 pb-8 mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 font-bold">
                          {selectedCategory === 'Featured' ? 'Curated Atelier Drops' : `${selectedCategory} Collection`}
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                          {selectedCategory === 'Featured' ? 'Attractive Fashion Highlights' : `${selectedCategory} Garments`} ({filteredProducts.length} Items)
                        </h2>
                      </div>

                      <div className="relative w-full md:w-80">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search items by cut, fabric..."
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-full text-xs text-white placeholder-slate-500 outline-none focus:border-white transition-all backdrop-blur-md"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto -mx-1 px-1">
                        <button
                          onClick={() => setSelectedCategory('Featured')}
                          className={`px-3.5 sm:px-5 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest rounded-full whitespace-nowrap shrink-0 transition-all ${selectedCategory === 'Featured'
                            ? 'bg-white text-black shadow-lg shadow-white/15'
                            : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                            }`}
                        >
                          Curated Drops
                        </button>
                        {['Women', 'Men', 'Kids'].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3.5 sm:px-5 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest rounded-full whitespace-nowrap shrink-0 transition-all ${selectedCategory === cat
                              ? 'bg-white text-black shadow-lg shadow-white/15'
                              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                              }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                        <span>SORT:</span>
                        <select
                          value={sortOption}
                          onChange={e => setSortOption(e.target.value)}
                          className="bg-transparent font-semibold border-b border-white/20 pb-0.5 outline-none cursor-pointer text-white"
                        >
                          <option value="default" className="bg-neutral-900">Featured Atelier</option>
                          <option value="price-asc" className="bg-neutral-900">Price: Low to High</option>
                          <option value="price-desc" className="bg-neutral-900">Price: High to Low</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                    {filteredProducts.map(item => (
                      <div
                        key={item.id}
                        className="group flex flex-col"
                      >
                        <div className="w-full aspect-[3/4] bg-neutral-900 rounded-xl overflow-hidden border border-white/10 mb-3.5 relative">
                          <img
                            src={item.thumbnail_url || item.image}
                            alt={item.title}
                            onClick={() => handleSelectProduct(item.slug)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                          />
                          <button
                            onClick={() => setQuickViewProduct(item)}
                            className="absolute bottom-3 left-3 right-3 py-2.5 rounded-lg bg-black/70 hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" /> Quick View
                          </button>
                        </div>

                        <div className="flex justify-between items-start cursor-pointer" onClick={() => handleSelectProduct(item.slug)}>
                          <div>
                            <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">{item.category_name || item.category}</p>
                            <h3 className="text-sm font-bold tracking-tight text-white group-hover:text-amber-300 transition truncate max-w-[200px]">{item.title}</h3>
                          </div>
                          <p className="text-sm font-bold text-slate-200">${item.base_price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </main>
              </div>
            )}

            {storeMode === 'product' && product && (
              <main className="max-w-6xl mx-auto px-6 py-8">
                <button
                  onClick={() => { setStoreMode('catalog'); setSelectedSize(null); }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-full border border-white/15 text-xs font-bold uppercase tracking-wider transition-all mb-8 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Runway Archive
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                  <div className="flex flex-col gap-4">
                    <div className="w-full aspect-[3/4] bg-neutral-900 rounded-2xl overflow-hidden border border-white/15">
                      <img src={activeImage} alt={product.title} className="w-full h-full object-cover transition-all duration-300" />
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {displayedImages.map((img) => (
                        <button
                          key={img.id}
                          onClick={() => setActiveImage(img.image_url)}
                          className={`w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${activeImage === img.image_url ? 'border-amber-400 ring-1 ring-amber-400' : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                        >
                          <img src={img.image_url} alt="Thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-400">{averageRating} / 5.0 ({reviews.length} authenticated reviews)</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-white">{product.title}</h1>
                    <p className="text-2xl font-bold font-mono mb-6 text-amber-300">${product.base_price}</p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-8">{product.description}</p>

                    <div className="mb-6">
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-3 text-slate-400">
                        Selected Palette: <span className="font-bold text-white">{availableColors.find(c => c.id === selectedColor)?.name}</span>
                      </label>
                      <div className="flex gap-3">
                        {availableColors.map((color) => (
                          <button
                            key={color.id}
                            onClick={() => handleColorChange(color.id)}
                            style={{ backgroundColor: color.hex }}
                            className={`w-8 h-8 rounded-full border border-white/30 flex items-center justify-center transition-all ${selectedColor === color.id ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black scale-105' : 'hover:scale-105'
                              }`}
                          >
                            {selectedColor === color.id && (
                              <Check className={`w-4 h-4 ${color.hex === '#FAF9F6' ? 'text-black' : 'text-white'}`} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Select Atelier Size</label>
                        <button className="text-xs text-slate-400 underline hover:text-white">Atelier Measurements</button>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {availableSizes.map((size) => {
                          const variant = product?.variants?.find(
                            v => v.color_id === selectedColor && v.size_id === size.id
                          );
                          const isOutOfStock = !variant || variant.stock_quantity === 0;
                          const isSelected = selectedSize === size.id;

                          return (
                            <button
                              key={size.id}
                              disabled={isOutOfStock}
                              onClick={() => setSelectedSize(size.id)}
                              className={`py-3 text-sm font-semibold rounded-lg border transition-all ${isSelected ? 'border-white bg-white text-black font-bold' : 'border-white/20 bg-white/5 text-white hover:border-white'
                                } ${isOutOfStock ? 'opacity-25 cursor-not-allowed line-through' : ''}`}
                            >
                              {size.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product, selectedSize, selectedColor)}
                      disabled={!selectedSize || (currentVariant && currentVariant.stock_quantity === 0)}
                      className="w-full bg-white hover:bg-neutral-200 disabled:bg-neutral-800 text-black py-4 rounded-xl font-extrabold uppercase tracking-widest text-xs transition-all shadow-xl shadow-white/10"
                    >
                      {!selectedSize ? 'Select An Atelier Size' : currentVariant?.stock_quantity === 0 ? 'Out of Stock' : 'Add to Wardrobe Bag'}
                    </button>

                    <div className="mt-8 border-t border-white/10 pt-6 grid grid-cols-2 gap-4 text-xs text-slate-400 font-mono">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-amber-400" /> 100% Organic Materials
                      </div>
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-amber-400" /> Complimentary 30-Day Returns
                      </div>
                    </div>
                  </div>
                </div>

                <section className="border-t border-white/10 pt-16">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div>
                      <h2 className="text-xl font-extrabold tracking-tight mb-2 text-white">Client Impression</h2>
                      <p className="text-xs text-slate-400 mb-6">Authenticated atelier reviews on fit and drapery.</p>

                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-4xl font-extrabold tracking-tight text-white font-mono">{averageRating}</span>
                          <span className="text-xs font-semibold text-slate-400">/ 5.0</span>
                        </div>
                        <div className="flex items-center text-amber-400 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-300 font-medium">
                          Based on {reviews.length} authenticated orders. 99% recommend this cut.
                        </p>
                      </div>

                      <form onSubmit={handleSubmitReview} className="mt-6 border border-white/10 rounded-2xl p-6 bg-white/5 space-y-4 text-xs">
                        <h3 className="font-bold uppercase tracking-wider flex items-center gap-2 text-white">
                          <MessageSquare className="w-4 h-4 text-amber-400" /> Submit Impression
                        </h3>
                        <div>
                          <label className="block font-semibold mb-1 text-slate-300">Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Marc Jacobs"
                            value={newReview.reviewer_name}
                            onChange={e => setNewReview({ ...newReview, reviewer_name: e.target.value })}
                            className="w-full p-2.5 bg-black/40 border border-white/15 rounded-lg text-white outline-none focus:border-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold mb-1 text-slate-300">Rating</label>
                            <select
                              value={newReview.rating}
                              onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                              className="w-full p-2.5 bg-neutral-900 border border-white/15 rounded-lg text-white outline-none focus:border-white"
                            >
                              <option value={5}>5 Stars (Superior)</option>
                              <option value={4}>4 Stars (Great)</option>
                              <option value={3}>3 Stars (Average)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block font-semibold mb-1 text-slate-300">Fit Feedback</label>
                            <select
                              value={newReview.fit_feedback}
                              onChange={e => setNewReview({ ...newReview, fit_feedback: e.target.value })}
                              className="w-full p-2.5 bg-neutral-900 border border-white/15 rounded-lg text-white outline-none focus:border-white"
                            >
                              <option value="True to Size">True to Size</option>
                              <option value="Runs Large">Runs Large</option>
                              <option value="Runs Small">Runs Small</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block font-semibold mb-1 text-slate-300">Review</label>
                          <textarea
                            rows={3}
                            required
                            placeholder="Describe garment weight, hand-feel, and tailoring..."
                            value={newReview.review_text}
                            onChange={e => setNewReview({ ...newReview, review_text: e.target.value })}
                            className="w-full p-2.5 bg-black/40 border border-white/15 rounded-lg text-white outline-none focus:border-white"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={submittingReview}
                          className="w-full bg-white hover:bg-neutral-200 disabled:bg-neutral-800 text-black py-3 rounded-lg font-bold uppercase tracking-wider text-[11px]"
                        >
                          {submittingReview ? 'Posting...' : 'Publish Feedback'}
                        </button>
                      </form>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="border-b border-white/10 pb-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-white">{rev.reviewer_name}</span>
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                <BadgeCheck className="w-3 h-3" /> Authenticated
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-slate-500">{new Date(rev.created_at).toLocaleDateString()}</span>
                          </div>

                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex text-amber-400">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                              ))}
                            </div>
                            <span className="text-slate-600 text-xs">|</span>
                            <span className="text-xs text-slate-400 font-mono">Fit: <span className="text-white font-bold">{rev.fit_feedback}</span></span>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed font-light">
                            "{rev.review_text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </main>
            )}
          </div>
        )}

        {view === 'admin' && (
          <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Atelier Command Center</h1>
                <p className="text-xs text-slate-400 mt-1">Real-time orders, stock allocation, and catalog deployment.</p>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setAdminTab('orders')}
                  className={`px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all ${adminTab === 'orders' ? 'bg-white text-black' : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                >
                  Orders ({orders.length})
                </button>
                <button
                  onClick={() => setAdminTab('inventory')}
                  className={`px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all ${adminTab === 'inventory' ? 'bg-white text-black' : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                >
                  Stock Inventory
                </button>
                <button
                  onClick={() => setAdminTab('add-product')}
                  className={`flex items-center gap-1 px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all ${adminTab === 'add-product' ? 'bg-white text-black' : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Publish Item
                </button>
              </div>
            </div>

            {adminTab === 'orders' && (
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-mono uppercase">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Destination</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-white/5">
                        <td className="p-4 font-mono font-bold text-amber-400">#{order.id}</td>
                        <td className="p-4">
                          <p className="font-semibold text-white">{order.customer_name}</p>
                          <p className="text-slate-500 font-mono text-[11px]">{order.customer_email}</p>
                        </td>
                        <td className="p-4 text-slate-300">
                          {order.shipping_address}, {order.city} ({order.postal_code})
                        </td>
                        <td className="p-4 font-bold text-white font-mono">${order.total_amount}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono ${order.order_status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            order.order_status === 'shipped' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                              'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                            {order.order_status}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={order.order_status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="p-1 border border-white/20 rounded bg-neutral-900 text-white text-xs outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {adminTab === 'inventory' && (
              <div className="space-y-6">
                {/* 1. Global Products Catalog (Edit & Delete Table) */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                  <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2 text-white">
                      <Layers className="w-4 h-4 text-amber-400" /> Database Product Catalog
                    </h2>
                    <span className="text-xs font-mono text-slate-400">Total: {productsList.length} items</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-mono uppercase">
                        <tr>
                          <th className="p-4">Item</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Price</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {productsList.map(item => (
                          <tr key={item.id} className="hover:bg-white/5">
                            <td className="p-4 flex items-center gap-3">
                              {item.image_url && (
                                <img src={item.image_url} alt={item.title} className="w-9 h-12 object-cover rounded bg-neutral-900 border border-white/10" />
                              )}
                              <div>
                                <p className="font-semibold text-white">{item.title}</p>
                                <p className="text-slate-500 font-mono text-[10px]">#{item.id} • {item.slug}</p>
                              </div>
                            </td>
                            <td className="p-4 font-mono text-slate-300 capitalize">{item.category || 'Men'}</td>
                            <td className="p-4 font-bold text-amber-400 font-mono">${item.price}</td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateProduct(item.id, item.price)}
                                  className="text-xs bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black px-2.5 py-1 rounded transition border border-amber-500/30 font-medium font-mono"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProduct(item.id)}
                                  className="text-xs bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-2.5 py-1 rounded transition border border-red-500/30 font-medium font-mono"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Real-Time Atelier SKU Stock Details */}
                {product && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
                      <h2 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2 text-white">
                        <Layers className="w-4 h-4 text-amber-400" /> Real-Time Atelier SKU Stock
                      </h2>
                      <select
                        value={selectedSlug}
                        onChange={(e) => handleSelectProduct(e.target.value)}
                        className="p-2 border border-white/20 rounded bg-neutral-900 text-white text-xs font-semibold w-full sm:max-w-xs"
                      >
                        {productsList.slice(0, 50).map(p => (
                          <option key={p.id} value={p.slug}>{p.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(product.variants || []).map(variant => (
                        <div key={variant.id} className="border border-white/10 bg-black/40 p-4 rounded-xl flex justify-between items-center">
                          <div>
                            <p className="font-bold text-sm text-white">{variant.color_name} / Size {variant.size_name}</p>
                            <p className="text-xs text-slate-500 font-mono">SKU: {variant.sku}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              defaultValue={variant.stock_quantity}
                              onBlur={(e) => handleUpdateStock(variant.id, e.target.value)}
                              className="w-16 p-2 bg-neutral-900 border border-white/20 rounded font-bold text-center text-sm text-white focus:border-white outline-none"
                            />
                            <span className="text-xs text-slate-500 font-mono">pcs</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {adminTab === 'add-product' && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-2xl backdrop-blur-md">
                <h2 className="text-xl font-bold tracking-tight mb-2 text-white">Publish Direct to Haute Couture</h2>
                <p className="text-xs text-slate-400 mb-6">Instantly deploy a new piece to the luxury garments collection.</p>

                <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-mono font-bold uppercase mb-1 text-slate-300">Product Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sculpted Wool Topcoat"
                      value={newProduct.title}
                      onChange={e => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        setNewProduct({ ...newProduct, title, slug });
                      }}
                      className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono font-bold uppercase mb-1 text-slate-300">Target Category</label>
                      <select
                        value={newProduct.category_id}
                        onChange={e => setNewProduct({ ...newProduct, category_id: Number(e.target.value) })}
                        className="w-full p-3 bg-neutral-900 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-white"
                      >
                        <option value={1}>Men</option>
                        <option value={2}>Women</option>
                        <option value={3}>Kids</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono font-bold uppercase mb-1 text-slate-300">Base Price ($ USD)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        placeholder="185.00"
                        value={newProduct.base_price}
                        onChange={e => setNewProduct({ ...newProduct, base_price: e.target.value })}
                        className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono font-bold uppercase mb-1 text-slate-300">Image CDN URL (Unsplash)</label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={newProduct.image_url}
                      onChange={e => setNewProduct({ ...newProduct, image_url: e.target.value })}
                      className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold uppercase mb-1 text-slate-300">Editorial Description</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Detail GSM, drape, fiber source, and atelier cut..."
                      value={newProduct.description}
                      onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isAddingProduct}
                    className="w-full bg-white hover:bg-neutral-200 disabled:bg-neutral-800 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs mt-4"
                  >
                    {isAddingProduct ? 'Deploying...' : 'Deploy to Global Storefront'}
                  </button>
                </form>
              </div>
            )}
          </main>
        )}
      </div>

      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0b101b] border border-white/20 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl text-white">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
                <img src={quickViewProduct.thumbnail_url || quickViewProduct.image} alt={quickViewProduct.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-bold">
                  {quickViewProduct.category_name || quickViewProduct.category} Edition
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white">{quickViewProduct.title}</h3>
                <p className="text-xl font-mono font-bold text-amber-300">${quickViewProduct.base_price}</p>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{quickViewProduct.description}</p>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleAddToCart(quickViewProduct, 'M')}
                    className="flex-1 py-3 bg-white text-black font-extrabold uppercase text-xs tracking-wider rounded-xl hover:bg-neutral-200 transition"
                  >
                    Add to Bag (Size M)
                  </button>
                  <button
                    onClick={() => {
                      const p = quickViewProduct;
                      setQuickViewProduct(null);
                      handleSelectProduct(p.slug);
                    }}
                    className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition border border-white/15"
                  >
                    Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-black text-slate-400 border-t border-white/10 mt-20 pt-16 pb-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-xs">
          <div className="md:col-span-2">
            <span className="font-extrabold tracking-[0.2em] text-base uppercase block mb-3 text-white">STUDIO ESSENTIALS</span>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-6 font-light">
              An independent haute couture design atelier dedicated to uncompromising drapery, certified organic fibers, and permanent silhouette longevity.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="max-w-sm">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 block mb-2 font-bold">Private Runway Newsletter</span>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter VIP email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs flex-1 outline-none focus:border-white text-white"
                />
                <button type="submit" className="bg-white text-black hover:bg-neutral-200 px-5 py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all">
                  Subscribe
                </button>
              </div>
              {newsletterSubscribed && (
                <p className="text-emerald-400 text-[11px] mt-2 font-mono">Authenticated. Private invitations will be transmitted.</p>
              )}
            </form>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-[0.2em] text-white mb-4 font-bold text-xs">Client Care</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><button onClick={() => setIsTrackingOpen(true)} className="hover:text-white transition-colors">Order Tracking</button></li>
              <li><a href="#catalog-grid-start" className="hover:text-white transition-colors">Global Courier SLA</a></li>
              <li><a href="#catalog-grid-start" className="hover:text-white transition-colors">Bespoke Fitting Guide</a></li>
              <li><a href="#catalog-grid-start" className="hover:text-white transition-colors">Sustainable Materiality</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-[0.2em] text-white mb-4 font-bold text-xs">Atelier Location</h4>
            <p className="text-slate-400 leading-relaxed font-light">
              Flagship Atelier: <br />
              452 Broadway, SoHo <br />
              New York, NY 10013 <br />
              Monitored Concierge
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} STUDIO ESSENTIALS ATELIER LLC. REGISTERED TRADEMARK.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 cursor-pointer">PRIVACY</span>
            <span className="hover:text-slate-300 cursor-pointer">TERMS</span>
            <span className="hover:text-slate-300 cursor-pointer">ENCRYPTION</span>
          </div>
        </div>
      </footer>

      {isTrackingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0b101b] border border-white/20 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 relative text-white">
            <button
              onClick={() => { setIsTrackingOpen(false); setTrackingResult(null); setTrackingError(''); }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              <Truck className="w-4 h-4" /> Live Courier Dispatch
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-4 text-white">Track Order Consignment</h2>

            <form onSubmit={handleTrackOrder} className="flex gap-2 mb-6">
              <input
                type="text"
                required
                placeholder="Enter Order ID (e.g. 101 or 102)"
                value={trackOrderId}
                onChange={e => setTrackOrderId(e.target.value)}
                className="flex-1 p-3 bg-black/50 border border-white/20 rounded-xl text-xs outline-none focus:border-white font-mono"
              />
              <button
                type="submit"
                disabled={trackingLoading}
                className="bg-white hover:bg-neutral-200 text-black px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                {trackingLoading ? '...' : 'Track'}
              </button>
            </form>

            {trackingError && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-3 rounded-xl text-xs font-semibold mb-4">
                {trackingError}
              </div>
            )}

            {trackingResult && (
              <div className="border border-white/15 rounded-2xl p-6 bg-white/5 space-y-4 text-xs font-mono">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <span className="text-slate-400 uppercase text-[10px]">Reference</span>
                    <p className="font-extrabold text-base text-amber-300">#{trackingResult.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${trackingResult.order_status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    trackingResult.order_status === 'shipped' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                    {trackingResult.order_status}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-400 uppercase text-[10px]">Consignee</p>
                  <p className="font-bold text-white font-sans">{trackingResult.customer_name}</p>
                  <p className="text-slate-400">{trackingResult.shipping_address}, {trackingResult.city} ({trackingResult.postal_code})</p>
                </div>

                <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-sm text-white">
                  <span>Authorized Total</span>
                  <span>${trackingResult.total_amount}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      <aside className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0f19] border-l border-white/15 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-base font-extrabold uppercase tracking-widest text-white">Atelier Bag ({totalItemsCount})</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
              <ShoppingBag className="w-12 h-12 mb-3 stroke-[1.5]" />
              <p className="text-xs font-mono uppercase tracking-widest">Your wardrobe bag is empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.variantId} className="flex gap-4 border-b border-white/5 pb-4">
                <img src={item.image} alt={item.title} className="w-20 aspect-[3/4] object-cover rounded-xl bg-neutral-900 border border-white/10" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-sm text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-mono">{item.color} / Size {item.size}</p>
                    <p className="text-sm font-bold font-mono mt-1 text-amber-300">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.variantId, -1)} className="p-1 border border-white/20 rounded hover:bg-white/10 text-white">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-bold text-white">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.variantId, 1)} className="p-1 border border-white/20 rounded hover:bg-white/10 text-white">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black/40">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-slate-400 font-mono uppercase">Subtotal</span>
              <span className="text-lg font-bold font-mono text-white">${cartSubtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full bg-white hover:bg-neutral-200 text-black py-4 rounded-xl font-extrabold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0b101b] border border-white/20 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 relative text-white">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Vault
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-5 text-white">Dispatch & Settlement</h2>

            <div className="bg-white/5 border border-white/15 rounded-xl p-3.5 mb-5">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. VIP20)"
                    value={inputCoupon}
                    onChange={e => setInputCoupon(e.target.value.toUpperCase())}
                    className="w-full pl-9 pr-3 py-2 text-xs uppercase font-mono font-bold tracking-wider border border-white/15 rounded-lg outline-none focus:border-white bg-black/40 text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponLoading || !inputCoupon}
                  className="bg-white hover:bg-neutral-200 disabled:bg-neutral-800 text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
                >
                  {couponLoading ? '...' : 'Apply'}
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex justify-between items-center mt-2 text-xs text-emerald-400 font-mono bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                  <span>Code <strong>{appliedCoupon.code}</strong> Applied ({appliedCoupon.discount_percentage}% OFF)</span>
                  <button onClick={() => setAppliedCoupon(null)} className="underline text-slate-400 hover:text-white">Remove</button>
                </div>
              )}

              {couponError && (
                <p className="text-xs text-rose-400 mt-2 font-mono">{couponError}</p>
              )}
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase mb-1 text-slate-400">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jean Paul"
                  value={customer.name}
                  onChange={e => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-xl text-white outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase mb-1 text-slate-400">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jean@couture.com"
                    value={customer.email}
                    onChange={e => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full p-3 bg-black/50 border border-white/20 rounded-xl text-white outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase mb-1 text-slate-400">Cell Contact</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={customer.phone}
                    onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full p-3 bg-black/50 border border-white/20 rounded-xl text-white outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase mb-1 text-slate-400">Delivery Address</label>
                <input
                  type="text"
                  required
                  placeholder="452 Broadway, SoHo"
                  value={customer.address}
                  onChange={e => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-xl text-white outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase mb-1 text-slate-400">City</label>
                  <input
                    type="text"
                    required
                    placeholder="New York"
                    value={customer.city}
                    onChange={e => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full p-3 bg-black/50 border border-white/20 rounded-xl text-white outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase mb-1 text-slate-400">Zip Code</label>
                  <input
                    type="text"
                    required
                    placeholder="10013"
                    value={customer.postalCode}
                    onChange={e => setCustomer({ ...customer, postalCode: e.target.value })}
                    className="w-full p-3 bg-black/50 border border-white/20 rounded-xl text-white outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <label className="block font-mono uppercase mb-2 text-slate-400">Settlement Gateway</label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${paymentMethod === 'card' ? 'border-amber-400 bg-white text-black font-extrabold' : 'border-white/15 bg-white/5 text-slate-400 hover:text-white'
                      }`}
                  >
                    <CreditCard className="w-4 h-4" /> Stripe Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 border rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${paymentMethod === 'cod' ? 'border-amber-400 bg-white text-black font-extrabold' : 'border-white/15 bg-white/5 text-slate-400 hover:text-white'
                      }`}
                  >
                    <Banknote className="w-4 h-4" /> Courier Cash
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="bg-black/40 border border-white/15 rounded-xl p-3.5 space-y-3 font-mono">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                      <span>Card Vault (Test Ready)</span>
                      <span className="text-emerald-400 flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> Encrypted</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        value={cardDetails.cardNumber}
                        onChange={e => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                        className="w-full p-2.5 bg-neutral-900 border border-white/20 rounded-lg text-xs font-mono font-semibold focus:border-white outline-none tracking-widest text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={cardDetails.cardExp}
                        onChange={e => setCardDetails({ ...cardDetails, cardExp: e.target.value })}
                        className="p-2.5 bg-neutral-900 border border-white/20 rounded-lg text-xs font-mono font-semibold focus:border-white outline-none text-center text-white"
                      />
                      <input
                        type="text"
                        required
                        value={cardDetails.cardCvc}
                        onChange={e => setCardDetails({ ...cardDetails, cardCvc: e.target.value })}
                        className="p-2.5 bg-neutral-900 border border-white/20 rounded-lg text-xs font-mono font-semibold focus:border-white outline-none text-center text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 space-y-1 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>VIP Code ({appliedCoupon.discount_percentage}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-white/10 text-white">
                  <span>Total Due:</span>
                  <span className="text-xl text-amber-300">${cartFinalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={orderSubmitting}
                className="w-full bg-white hover:bg-neutral-200 disabled:bg-neutral-800 text-black py-4 rounded-xl font-extrabold uppercase tracking-widest text-xs mt-2 transition-all shadow-xl shadow-white/10"
              >
                {orderSubmitting
                  ? 'Authorizing Vault...'
                  : paymentMethod === 'card'
                    ? `Authorize Card ($${cartFinalTotal.toFixed(2)})`
                    : `Confirm Cash Order ($${cartFinalTotal.toFixed(2)})`}
              </button>
            </form>
          </div>
        </div>
      )}

      {orderSuccessData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0b101b] border border-white/20 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center text-white">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold tracking-tight mb-2">Order Confirmed!</h2>
            <p className="text-xs text-slate-300 mb-6 font-light leading-relaxed">
              Your haute couture pieces have been routed to our packing atelier. Tracking details transmitted to your inbox.
            </p>
            <div className="bg-white/5 border border-white/15 p-4 rounded-2xl text-left text-xs font-mono space-y-1.5 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Order ID:</span>
                <span className="font-bold text-amber-300">#{orderSuccessData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Items:</span>
                <span className="font-bold">{orderSuccessData.itemsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Settlement:</span>
                <span className="text-white">{orderSuccessData.method}</span>
              </div>
              {orderSuccessData.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Saved:</span>
                  <span>-${orderSuccessData.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-white/10 pt-1.5 font-bold">
                <span>Total Paid:</span>
                <span className="text-white">${orderSuccessData.total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => { setOrderSuccessData(null); setStoreMode('catalog'); setSelectedCategory('Featured'); }}
              className="w-full bg-white hover:bg-neutral-200 text-black py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  );
}