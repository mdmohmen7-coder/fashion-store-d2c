import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ShoppingBag, Check, ShieldCheck, RefreshCw, X, Plus, Minus,
  ArrowRight, Lock, CheckCircle2, LayoutDashboard, Store, Layers,
  ChevronLeft, Search, SlidersHorizontal, PlusCircle, Star, BadgeCheck,
  MessageSquare, Tag, Sparkles, PackageSearch, Truck, CreditCard, Banknote
} from 'lucide-react';

// Pre-generated 200 Products Dataset for Instant Showcase
const initialCatalog = (() => {
  const menImages = [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
  ];

  const womenImages = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  ];

  const kidsImages = [
    'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80'
  ];

  const titles = {
    Men: ['Tailored Wool Blazer', 'Heavyweight Oversized Tee', 'Pleated Straight Trouser', 'Cashmere Knit Crewneck', 'Structured Minimal Trench', 'French Terry Hoodie', 'Linen Relaxed Shirt', 'Japanese Selvedge Denim'],
    Women: ['Sculpted Hourglass Blazer', 'Silk Drape Slip Dress', 'Merino Ribbed Knit Sweater', 'High-Rise Tailored Pant', 'Belted Cashmere Overcoat', 'Structured Poplin Blouse', 'Pleated Midi Skirt', 'Brushed Wool Cardigan'],
    Kids: ['Organic Cotton Hoodie', 'Everyday Minimal Jogger', 'Relaxed French Terry Sweatshirt', 'Structured Mini Bomber Jacket', 'Soft Knit Ribbed Beanie', 'Organic Fleece Crewneck', 'Chino Utility Pants', 'Warm Puffer Vest']
  };

  const cats = ['Women', 'Men', 'Kids'];
  const res = [];
  for (let i = 1; i <= 200; i++) {
    const cat = cats[i % 3];
    const pool = cat === 'Men' ? menImages : cat === 'Women' ? womenImages : kidsImages;
    const thumb = pool[i % pool.length];
    res.push({
      id: i,
      title: `${titles[cat][i % titles[cat].length]} Ed. ${Math.floor(i / 3) + 1}`,
      slug: `product-${i}-${cat.toLowerCase()}`,
      category_name: cat,
      base_price: (45 + (i * 7) % 180).toFixed(2),
      description: `Precision-crafted ${cat.toLowerCase()}'s luxury garment. Structured from organic long-staple fibers, featuring tailored finishes and natural drape.`,
      thumbnail_url: thumb,
      images: [
        { id: 1, image_url: thumb, color_id: 1 },
        { id: 2, image_url: pool[(i + 1) % pool.length], color_id: 2 }
      ],
      variants: [
        { id: i * 10 + 1, color_id: 1, color_name: 'Charcoal Noir', hex_code: '#1A1A1A', size_id: 1, size_name: 'S', stock_quantity: 12, sku: `SKU-${i}-S` },
        { id: i * 10 + 2, color_id: 1, color_name: 'Charcoal Noir', hex_code: '#1A1A1A', size_id: 2, size_name: 'M', stock_quantity: 18, sku: `SKU-${i}-M` },
        { id: i * 10 + 3, color_id: 1, color_name: 'Charcoal Noir', hex_code: '#1A1A1A', size_id: 3, size_name: 'L', stock_quantity: 8, sku: `SKU-${i}-L` },
        { id: i * 10 + 4, color_id: 2, color_name: 'Raw Ecru', hex_code: '#FAF9F6', size_id: 1, size_name: 'S', stock_quantity: 10, sku: `SKU-${i}-W-S` },
        { id: i * 10 + 5, color_id: 2, color_name: 'Raw Ecru', hex_code: '#FAF9F6', size_id: 2, size_name: 'M', stock_quantity: 15, sku: `SKU-${i}-W-M` }
      ]
    });
  }
  return res;
})();

export default function App() {
  const [view, setView] = useState('store');
  const [storeMode, setStoreMode] = useState('catalog');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  // Catalog & Product states (Instant 200 items loaded!)
  const [productsList, setProductsList] = useState(initialCatalog);
  const [selectedSlug, setSelectedSlug] = useState(initialCatalog[0].slug);
  const [product, setProduct] = useState(initialCatalog[0]);
  const [loading, setLoading] = useState(false);

  // Reviews States
  const [reviews, setReviews] = useState([
    { id: 1, reviewer_name: 'Sophia L.', rating: 5, fit_feedback: 'True to Size', review_text: 'The drape and tailoring on this piece is unmatched. Heavyweight organic fabric with premium stitching.', created_at: new Date().toISOString() },
    { id: 2, reviewer_name: 'Marcus K.', rating: 5, fit_feedback: 'True to Size', review_text: 'Structured silhouette and exceptional feel. 10/10 recommendation.', created_at: new Date().toISOString() }
  ]);
  const [newReview, setNewReview] = useState({
    reviewer_name: '',
    rating: 5,
    fit_feedback: 'True to Size',
    review_text: ''
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  // Variant & Cart states
  const [selectedColor, setSelectedColor] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImage, setActiveImage] = useState(initialCatalog[0].thumbnail_url);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState(null);

  // Payment Selection States (Stripe / Cash)
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '123'
  });

  // Promo Code States
  const [inputCoupon, setInputCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  // Live Order Tracking States
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackOrderId, setTrackOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingError, setTrackingError] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Customer Form
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  // Admin Dashboard States
  const [orders, setOrders] = useState([
    { id: 101, customer_name: 'Alexander Wright', customer_email: 'alex@example.com', shipping_address: '450 Lexington Ave', city: 'New York', postal_code: '10017', total_amount: '185.00', order_status: 'delivered' },
    { id: 102, customer_name: 'Elena Rostova', customer_email: 'elena@example.com', shipping_address: '12 Queen St', city: 'London', postal_code: 'W1J 5PA', total_amount: '240.00', order_status: 'shipped' }
  ]);
  const [adminTab, setAdminTab] = useState('orders');

  // Admin New Product Form State
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

  // Connect to local backend if running, otherwise seamlessly keep instant catalog
  useEffect(() => {
    axios.get('http://localhost:5000/api/products', { timeout: 1000 })
      .then(res => {
        if (res.data?.data && res.data.data.length > 0) {
          setProductsList(res.data.data);
          setSelectedSlug(res.data.data[0].slug);
        }
      })
      .catch(() => {
        // Fallback already pre-loaded into state
      });
  }, []);

  const handleSelectProduct = (slug) => {
    setSelectedSlug(slug);
    const found = productsList.find(p => p.slug === slug);
    if (found) {
      setProduct(found);
      if (found.variants && found.variants.length > 0) {
        setSelectedColor(found.variants[0].color_id);
      }
      setActiveImage(found.thumbnail_url || found.images?.[0]?.image_url);
      setSelectedSize(null);
    }
    setStoreMode('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = productsList
    .filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category_name?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === 'price-asc') return Number(a.base_price) - Number(b.base_price);
      if (sortOption === 'price-desc') return Number(b.base_price) - Number(a.base_price);
      return 0;
    });

  const availableColors = product ? Array.from(
    new Map(product.variants.map(v => [v.color_id, { id: v.color_id, name: v.color_name, hex: v.hex_code }])).values()
  ) : [];

  const availableSizes = product ? Array.from(
    new Map(product.variants.map(v => [v.size_id, { id: v.size_id, name: v.size_name }])).values()
  ) : [];

  const displayedImages = product?.images?.filter(img => img.color_id === selectedColor) || [];

  const currentVariant = product ? product.variants.find(
    v => v.color_id === selectedColor && v.size_id === selectedSize
  ) : null;

  const handleColorChange = (colorId) => {
    setSelectedColor(colorId);
    setSelectedSize(null);
    const matchingImages = product.images.filter(img => img.color_id === colorId);
    if (matchingImages.length > 0) {
      setActiveImage(matchingImages[0].image_url);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !currentVariant || !product) return;

    const colorObj = availableColors.find(c => c.id === selectedColor);
    const sizeObj = availableSizes.find(s => s.id === selectedSize);

    const existingIndex = cart.findIndex(item => item.variantId === currentVariant.id);

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          variantId: currentVariant.id,
          title: product.title,
          price: Number(product.base_price),
          color: colorObj?.name,
          size: sizeObj?.name,
          image: activeImage,
          quantity: 1
        }
      ]);
    }
    setIsCartOpen(true);
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

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    setCouponLoading(true);
    setCouponError('');

    // Automatic Instant Coupon Engine
    if (inputCoupon.trim().toUpperCase() === 'VIP20') {
      setTimeout(() => {
        setAppliedCoupon({ code: 'VIP20', discount_percentage: 20 });
        setInputCoupon('');
        setCouponLoading(false);
      }, 300);
    } else {
      setTimeout(() => {
        setCouponError('Invalid promo code. Use VIP20 for 20% off.');
        setCouponLoading(false);
      }, 300);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setOrderSubmitting(true);

    const simulatedOrderId = Math.floor(1000 + Math.random() * 9000);
    setTimeout(() => {
      setOrderSuccessData({
        orderId: simulatedOrderId,
        total: cartFinalTotal,
        itemsCount: totalItemsCount,
        discount: discountAmount,
        method: paymentMethod === 'card' ? 'Stripe Card (Auth: 4242)' : 'Cash on Delivery'
      });

      // Update admin orders view
      setOrders(prev => [{
        id: simulatedOrderId,
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
      setOrderSubmitting(false);
    }, 600);
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!trackOrderId.trim()) return;
    setTrackingLoading(true);
    setTrackingError('');
    setTrackingResult(null);

    const cleanId = trackOrderId.replace(/[^0-9]/g, '');
    const foundOrder = orders.find(o => String(o.id) === cleanId);

    setTimeout(() => {
      if (foundOrder) {
        setTrackingResult({
          id: foundOrder.id,
          order_status: foundOrder.order_status,
          customer_name: foundOrder.customer_name,
          shipping_address: foundOrder.shipping_address,
          city: foundOrder.city,
          postal_code: foundOrder.postal_code,
          total_amount: foundOrder.total_amount,
          items: [
            { id: 1, product_name: 'Studio Essentials Tailored Edition', color_name: 'Noir', size_name: 'M', quantity: 1, unit_price: foundOrder.total_amount }
          ]
        });
      } else {
        setTrackingError('Order not found. Try searching with Order #101 or #102.');
      }
      setTrackingLoading(false);
    }, 400);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, order_status: newStatus } : o));
  };

  const handleUpdateStock = (variantId, newStock) => {
    setProduct(prev => ({
      ...prev,
      variants: prev.variants.map(v => v.id === variantId ? { ...v, stock_quantity: Number(newStock) } : v)
    }));
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    setIsAddingProduct(true);
    setTimeout(() => {
      const added = {
        id: productsList.length + 1,
        title: newProduct.title,
        slug: newProduct.slug,
        category_name: newProduct.category_id === 1 ? 'Men' : newProduct.category_id === 2 ? 'Women' : 'Kids',
        base_price: Number(newProduct.base_price).toFixed(2),
        description: newProduct.description,
        thumbnail_url: newProduct.image_url,
        images: [{ id: 1, image_url: newProduct.image_url, color_id: 1 }],
        variants: [
          { id: Date.now() + 1, color_id: 1, color_name: 'Noir', hex_code: '#1A1A1A', size_id: 1, size_name: 'S', stock_quantity: newProduct.stock_s, sku: 'NEW-S' },
          { id: Date.now() + 2, color_id: 1, color_name: 'Noir', hex_code: '#1A1A1A', size_id: 2, size_name: 'M', stock_quantity: newProduct.stock_m, sku: 'NEW-M' },
          { id: Date.now() + 3, color_id: 1, color_name: 'Noir', hex_code: '#1A1A1A', size_id: 3, size_name: 'L', stock_quantity: newProduct.stock_l, sku: 'NEW-L' }
        ]
      };
      setProductsList([added, ...productsList]);
      alert('Product published successfully!');
      setAdminTab('inventory');
      setIsAddingProduct(false);
    }, 400);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.reviewer_name || !newReview.review_text) return;
    setSubmittingReview(true);
    setTimeout(() => {
      setReviews([
        {
          id: Date.now(),
          reviewer_name: newReview.reviewer_name,
          rating: newReview.rating,
          fit_feedback: newReview.fit_feedback,
          review_text: newReview.review_text,
          created_at: new Date().toISOString()
        },
        ...reviews
      ]);
      setNewReview({ reviewer_name: '', rating: 5, fit_feedback: 'True to Size', review_text: '' });
      setSubmittingReview(false);
    }, 300);
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
    <div className="min-h-screen bg-[#FDFDFD] text-neutral-900 antialiased font-sans relative overflow-x-hidden flex flex-col justify-between">
      <div>
        {/* Top Announcement Bar */}
        <div className="bg-neutral-900 text-white text-[11px] py-2 px-4 text-center font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Complimentary worldwide shipping on orders over $150 • Use code <strong>VIP20</strong></span>
        </div>

{/* Top Universal Control Header (Mobile Optimized) */}
        <header className="border-b border-neutral-200 py-3 px-4 sm:px-10 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-md z-30 shadow-sm">
          <div className="flex items-center gap-2 sm:gap-6">
            <button 
              onClick={() => { setView('store'); setStoreMode('catalog'); }}
              className="font-extrabold tracking-wider text-xs sm:text-lg uppercase hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              STUDIO ESSENTIALS
            </button>
            
            <div className="flex items-center gap-0.5 bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
              <button
                onClick={() => setView('store')}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-md transition-all ${
                  view === 'store' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-black'
                }`}
              >
                <Store className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline">Store</span>
              </button>
              <button
                onClick={() => setView('admin')}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-md transition-all ${
                  view === 'admin' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-black'
                }`}
              >
                <LayoutDashboard className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline">Admin</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {view === 'store' && (
              <button 
                onClick={() => setIsTrackingOpen(true)}
                className="hidden md:flex items-center gap-1.5 text-xs font-semibold tracking-wide text-neutral-600 hover:text-black px-3 py-1.5 rounded-full border border-neutral-200 hover:border-black transition-all"
              >
                <PackageSearch className="w-3.5 h-3.5" /> Track
              </button>
            )}

            {view === 'store' ? (
              <button 
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-full transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>({totalItemsCount})</span>
              </button>
            ) : (
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full whitespace-nowrap">
                ● Admin
              </span>
            )}
          </div>
        </header>

        {/* VIEW 1: STOREFRONT */}
        {view === 'store' && (
          <div>
            {storeMode === 'catalog' && (
              <div>
                {/* EDITORIAL HERO BILLBOARD */}
                <section className="relative bg-neutral-950 text-white overflow-hidden py-20 sm:py-28 px-6 sm:px-12 border-b border-neutral-800">
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                    <img
                      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
                      alt="Editorial Billboard Background"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-neutral-400 mb-4">Edition 01 / Full 200 Atelier Collection</span>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                      Structured Silhouettes. <br /> Uncompromising Comfort.
                    </h1>
                    <p className="max-w-xl text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
                      Engineered from heavyweight organic fibers, loopback terry, and Australian cashmere. Tailored for elevated daily wear across Women, Men, and Kids.
                    </p>
                    <button
                      onClick={() => {
                        const el = document.getElementById('catalog-grid-start');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-white text-neutral-950 hover:bg-neutral-200 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
                    >
                      Explore 200 Products
                    </button>
                  </div>
                </section>

                {/* 4-COLUMN PRODUCT GRID CONTAINER */}
                <main id="catalog-grid-start" className="max-w-[1440px] mx-auto px-6 sm:px-10 py-12">
                  <div className="flex flex-col gap-6 border-b border-neutral-200 pb-8 mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Complete Atelier Archive</p>
                        <h2 className="text-3xl font-extrabold tracking-tight mt-1">Curated Catalog ({filteredProducts.length} Items)</h2>
                      </div>

                      <div className="relative w-full md:w-80">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Search 200 products by title, style..."
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 bg-neutral-100/80 rounded-full text-xs outline-none border border-transparent focus:border-black transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {['All', 'Women', 'Men', 'Kids'].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all ${selectedCategory === cat
                              ? 'bg-neutral-900 text-white shadow-sm'
                              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                              }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-600">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>SORT:</span>
                        <select
                          value={sortOption}
                          onChange={e => setSortOption(e.target.value)}
                          className="bg-transparent font-semibold border-b border-neutral-300 pb-0.5 outline-none cursor-pointer"
                        >
                          <option value="default">Featured</option>
                          <option value="price-asc">Price: Low to High</option>
                          <option value="price-desc">Price: High to Low</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 4 CARDS PER ROW */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                    {filteredProducts.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectProduct(item.slug)}
                        className="group cursor-pointer flex flex-col"
                      >
                        <div className="w-full aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 mb-3.5 relative">
                          <img
                            src={item.thumbnail_url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">{item.category_name}</p>
                            <h3 className="text-sm font-bold tracking-tight text-neutral-900 group-hover:underline truncate max-w-[200px]">{item.title}</h3>
                          </div>
                          <p className="text-sm font-semibold text-neutral-800">${item.base_price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </main>
              </div>
            )}

            {/* Sub-view B: Product Detail Page (PDP) */}
            {storeMode === 'product' && product && (
              <main className="max-w-6xl mx-auto px-6 py-8">
                <button
                  onClick={() => setStoreMode('catalog')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100/80 hover:bg-neutral-200 text-neutral-700 hover:text-black rounded-full border border-neutral-200 text-xs font-bold uppercase tracking-wider transition-all mb-8 shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Collection
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                  <div className="flex flex-col gap-4">
                    <div className="w-full aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200">
                      <img src={activeImage} alt={product.title} className="w-full h-full object-cover transition-all duration-300" />
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {displayedImages.map((img) => (
                        <button
                          key={img.id}
                          onClick={() => setActiveImage(img.image_url)}
                          className={`w-20 aspect-[3/4] rounded-md overflow-hidden border-2 transition-all ${activeImage === img.image_url ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                        >
                          <img src={img.image_url} alt="Thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-neutral-600">{averageRating} / 5.0 ({reviews.length} reviews)</span>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight mb-3">{product.title}</h1>
                    <p className="text-2xl font-semibold mb-6">${product.base_price}</p>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-8">{product.description}</p>

                    <div className="mb-6">
                      <label className="block text-xs font-bold uppercase tracking-wider mb-3">
                        Color: <span className="font-normal text-neutral-600">{availableColors.find(c => c.id === selectedColor)?.name}</span>
                      </label>
                      <div className="flex gap-3">
                        {availableColors.map((color) => (
                          <button
                            key={color.id}
                            onClick={() => handleColorChange(color.id)}
                            style={{ backgroundColor: color.hex }}
                            className={`w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center transition-all ${selectedColor === color.id ? 'ring-2 ring-neutral-900 ring-offset-2 scale-105' : 'hover:scale-105'
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
                        <label className="text-xs font-bold uppercase tracking-wider">Select Size</label>
                        <button className="text-xs text-neutral-500 underline hover:text-black">Size Guide</button>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {availableSizes.map((size) => {
                          const variant = product.variants.find(
                            v => v.color_id === selectedColor && v.size_id === size.id
                          );
                          const isOutOfStock = !variant || variant.stock_quantity === 0;
                          const isSelected = selectedSize === size.id;

                          return (
                            <button
                              key={size.id}
                              disabled={isOutOfStock}
                              onClick={() => setSelectedSize(size.id)}
                              className={`py-3 text-sm font-semibold rounded border transition-all ${isSelected ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 hover:border-black'
                                } ${isOutOfStock ? 'opacity-30 cursor-not-allowed bg-neutral-100 line-through' : ''}`}
                            >
                              {size.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={!selectedSize || (currentVariant && currentVariant.stock_quantity === 0)}
                      className="w-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white py-4 rounded font-bold uppercase tracking-wider transition-all"
                    >
                      {!selectedSize ? 'Select A Size' : currentVariant?.stock_quantity === 0 ? 'Out of Stock' : 'Add to Bag'}
                    </button>

                    <div className="mt-8 border-t border-neutral-200 pt-6 grid grid-cols-2 gap-4 text-xs text-neutral-600">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-neutral-800" /> Premium Materials
                      </div>
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-neutral-800" /> Free 30-Day Returns
                      </div>
                    </div>
                  </div>
                </div>

                {/* EDITORIAL REVIEWS */}
                <section className="border-t border-neutral-200 pt-16">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div>
                      <h2 className="text-xl font-extrabold tracking-tight mb-2">Customer Feedback</h2>
                      <p className="text-xs text-neutral-500 mb-6">Verified buyer impressions on tailoring and comfort.</p>

                      <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-4xl font-extrabold tracking-tight">{averageRating}</span>
                          <span className="text-xs font-semibold text-neutral-400">/ 5.0</span>
                        </div>
                        <div className="flex items-center text-amber-500 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-neutral-600 font-medium">
                          Based on {reviews.length} authenticated orders. 98% of customers recommend this cut.
                        </p>
                      </div>

                      <form onSubmit={handleSubmitReview} className="mt-6 border border-neutral-200 rounded-xl p-6 bg-white space-y-4 text-xs">
                        <h3 className="font-bold uppercase tracking-wider flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" /> Share Your Thoughts
                        </h3>
                        <div>
                          <label className="block font-semibold mb-1">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alex M."
                            value={newReview.reviewer_name}
                            onChange={e => setNewReview({ ...newReview, reviewer_name: e.target.value })}
                            className="w-full p-2.5 border rounded outline-none focus:border-black"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold mb-1">Rating</label>
                            <select
                              value={newReview.rating}
                              onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                              className="w-full p-2.5 border rounded outline-none focus:border-black bg-white"
                            >
                              <option value={5}>5 Stars (Exceptional)</option>
                              <option value={4}>4 Stars (Great)</option>
                              <option value={3}>3 Stars (Average)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block font-semibold mb-1">Fit Feedback</label>
                            <select
                              value={newReview.fit_feedback}
                              onChange={e => setNewReview({ ...newReview, fit_feedback: e.target.value })}
                              className="w-full p-2.5 border rounded outline-none focus:border-black bg-white"
                            >
                              <option value="True to Size">True to Size</option>
                              <option value="Runs Large">Runs Large</option>
                              <option value="Runs Small">Runs Small</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Review</label>
                          <textarea
                            rows={3}
                            required
                            placeholder="Comment on weight, texture, drape..."
                            value={newReview.review_text}
                            onChange={e => setNewReview({ ...newReview, review_text: e.target.value })}
                            className="w-full p-2.5 border rounded outline-none focus:border-black"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={submittingReview}
                          className="w-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white py-3 rounded font-bold uppercase tracking-wider text-[11px]"
                        >
                          {submittingReview ? 'Posting...' : 'Submit Review'}
                        </button>
                      </form>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="border-b border-neutral-100 pb-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-neutral-900">{rev.reviewer_name}</span>
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                <BadgeCheck className="w-3 h-3" /> Verified Buyer
                              </span>
                            </div>
                            <span className="text-[11px] text-neutral-400">{new Date(rev.created_at).toLocaleDateString()}</span>
                          </div>

                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex text-amber-500">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                              ))}
                            </div>
                            <span className="text-neutral-300 text-xs">|</span>
                            <span className="text-xs text-neutral-500 font-medium">Fit: <span className="text-neutral-800 font-bold">{rev.fit_feedback}</span></span>
                          </div>

                          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
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

        {/* VIEW 2: ADMIN MANAGEMENT PORTAL */}
      {/* VIEW 2: ADMIN MANAGEMENT PORTAL (FULLY MOBILE RESPONSIVE) */}
        {view === 'admin' && (
          <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            {/* Header & Tabs */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 border-b pb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Store Management Portal</h1>
                <p className="text-xs text-neutral-500 mt-1">Manage orders, live inventory, and add products.</p>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setAdminTab('orders')}
                  className={`px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all ${
                    adminTab === 'orders' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  Orders ({orders.length})
                </button>
                <button
                  onClick={() => setAdminTab('inventory')}
                  className={`px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all ${
                    adminTab === 'inventory' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  Stock Inventory
                </button>
                <button
                  onClick={() => setAdminTab('add-product')}
                  className={`flex items-center gap-1 px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all ${
                    adminTab === 'add-product' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Add Product
                </button>
              </div>
            </div>

            {/* Orders View: Responsive Card View on Mobile, Table on Desktop */}
            {adminTab === 'orders' && (
              <div>
                {/* Mobile Cards (Hidden on sm screens and up) */}
                <div className="block sm:hidden space-y-4">
                  {orders.length === 0 ? (
                    <div className="p-8 text-center text-xs text-neutral-400 bg-white border rounded-xl">
                      No orders recorded yet.
                    </div>
                  ) : (
                    orders.map(order => (
                      <div key={order.id} className="bg-white border rounded-xl p-4 shadow-xs space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-extrabold text-sm text-neutral-900">Order #{order.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.order_status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                            order.order_status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {order.order_status}
                          </span>
                        </div>
                        <div className="text-xs space-y-1">
                          <p className="font-bold text-neutral-900">{order.customer_name}</p>
                          <p className="text-neutral-500">{order.customer_email}</p>
                          <p className="text-neutral-600 text-[11px] pt-1">
                            {order.shipping_address}, {order.city} ({order.postal_code})
                          </p>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t text-xs">
                          <span className="font-bold text-neutral-900">Total: ${order.total_amount}</span>
                          <select
                            value={order.order_status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="p-1 border rounded text-xs bg-white focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Desktop Full Table (Hidden on Mobile) */}
                <div className="hidden sm:block bg-white border rounded-xl shadow-xs overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b text-neutral-500 font-bold uppercase">
                      <tr>
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Shipping Destination</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-neutral-50/50">
                          <td className="p-4 font-bold">#{order.id}</td>
                          <td className="p-4">
                            <p className="font-semibold text-neutral-900">{order.customer_name}</p>
                            <p className="text-neutral-500">{order.customer_email}</p>
                          </td>
                          <td className="p-4 text-neutral-600">
                            {order.shipping_address}, {order.city} ({order.postal_code})
                          </td>
                          <td className="p-4 font-bold text-neutral-900">${order.total_amount}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              order.order_status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                              order.order_status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {order.order_status}
                            </span>
                          </td>
                          <td className="p-4">
                            <select
                              value={order.order_status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="p-1 border rounded text-xs bg-white focus:outline-none"
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
              </div>
            )}

            {adminTab === 'inventory' && product && (
              <div className="bg-white border rounded-xl shadow-xs p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4" /> Live Variant Stock Levels
                  </h2>
                  <select 
                    value={selectedSlug} 
                    onChange={(e) => handleSelectProduct(e.target.value)}
                    className="p-2 border rounded text-xs font-semibold w-full sm:max-w-xs"
                  >
                    {productsList.slice(0, 50).map(p => (
                      <option key={p.id} value={p.slug}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.variants.map(variant => (
                    <div key={variant.id} className="border p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-bold text-sm">{variant.color_name} / Size {variant.size_name}</p>
                        <p className="text-xs text-neutral-500">SKU: {variant.sku}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number"
                          min="0"
                          defaultValue={variant.stock_quantity}
                          onBlur={(e) => handleUpdateStock(variant.id, e.target.value)}
                          className="w-16 p-2 border rounded font-bold text-center text-sm focus:border-black outline-none"
                        />
                        <span className="text-xs text-neutral-400">pcs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {adminTab === 'add-product' && (
              <div className="bg-white border rounded-xl shadow-xs p-5 sm:p-8 max-w-2xl">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-2">Create New Storefront Product</h2>
                <p className="text-xs text-neutral-500 mb-6">Publish a new luxury piece directly to your live marketplace without SQL.</p>

                <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold uppercase mb-1">Product Title</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Classic Trench Coat"
                      value={newProduct.title}
                      onChange={e => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        setNewProduct({...newProduct, title, slug});
                      }}
                      className="w-full p-3 border rounded text-sm outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold uppercase mb-1">Target Category</label>
                      <select 
                        value={newProduct.category_id}
                        onChange={e => setNewProduct({...newProduct, category_id: Number(e.target.value)})}
                        className="w-full p-3 border rounded text-sm outline-none focus:border-black bg-white"
                      >
                        <option value={1}>Men</option>
                        <option value={2}>Women</option>
                        <option value={3}>Kids</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold uppercase mb-1">Base Price ($ USD)</label>
                      <input 
                        type="number" 
                        step="0.01" 
                        required 
                        placeholder="85.00"
                        value={newProduct.base_price}
                        onChange={e => setNewProduct({...newProduct, base_price: e.target.value})}
                        className="w-full p-3 border rounded text-sm outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold uppercase mb-1">Image URL (Unsplash / Web CDN)</label>
                    <input 
                      type="url" 
                      required 
                      placeholder="https://images.unsplash.com/..."
                      value={newProduct.image_url}
                      onChange={e => setNewProduct({...newProduct, image_url: e.target.value})}
                      className="w-full p-3 border rounded text-sm outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase mb-1">Product Description</label>
                    <textarea 
                      rows={3} 
                      required 
                      placeholder="Describe tailoring, GSM fabric weight, and styling instructions..."
                      value={newProduct.description}
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full p-3 border rounded text-sm outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase mb-2">Initial Stock Allocation by Size</label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div>
                        <span className="text-neutral-500 font-semibold text-[11px]">Size S:</span>
                        <input 
                          type="number" 
                          value={newProduct.stock_s}
                          onChange={e => setNewProduct({...newProduct, stock_s: Number(e.target.value)})}
                          className="w-full p-2 border rounded text-center font-bold text-sm outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <span className="text-neutral-500 font-semibold text-[11px]">Size M:</span>
                        <input 
                          type="number" 
                          value={newProduct.stock_m}
                          onChange={e => setNewProduct({...newProduct, stock_m: Number(e.target.value)})}
                          className="w-full p-2 border rounded text-center font-bold text-sm outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <span className="text-neutral-500 font-semibold text-[11px]">Size L:</span>
                        <input 
                          type="number" 
                          value={newProduct.stock_l}
                          onChange={e => setNewProduct({...newProduct, stock_l: Number(e.target.value)})}
                          className="w-full p-2 border rounded text-center font-bold text-sm outline-none focus:border-black"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isAddingProduct}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white py-3.5 rounded font-bold uppercase tracking-wider text-xs mt-4"
                  >
                    {isAddingProduct ? 'Publishing Product...' : 'Publish to Storefront'}
                  </button>
                </form>
              </div>
            )}
          </main>
        )}
      </div>

      {/* EDITORIAL FOOTER */}
      <footer className="bg-neutral-950 text-white border-t border-neutral-800 mt-20 pt-16 pb-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800 text-xs">
          <div className="md:col-span-2">
            <span className="font-extrabold tracking-widest text-base uppercase block mb-3">STUDIO ESSENTIALS</span>
            <p className="text-neutral-400 max-w-sm leading-relaxed mb-6">
              A design atelier dedicated to pure materiality, tailored drapery, and elevated everyday silhouettes. Made for permanent rotation.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="max-w-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-300 block mb-2">Join the VIP Atelier Circle</span>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-xs flex-1 outline-none focus:border-white text-white"
                />
                <button type="submit" className="bg-white text-neutral-950 hover:bg-neutral-200 px-4 py-2 rounded font-bold uppercase text-[10px] tracking-wider transition-all">
                  Subscribe
                </button>
              </div>
              {newsletterSubscribed && (
                <p className="text-emerald-400 text-[11px] mt-2 font-medium">Thank you for joining. Check your inbox for private previews.</p>
              )}
            </form>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-neutral-300 mb-4">Client Care</h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li><button onClick={() => setIsTrackingOpen(true)} className="hover:text-white transition-colors">Track Order</button></li>
              <li><a href="#catalog-grid-start" className="hover:text-white transition-colors">Shipping & Duties</a></li>
              <li><a href="#catalog-grid-start" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#catalog-grid-start" className="hover:text-white transition-colors">Garment Care & Sizing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-neutral-300 mb-4">Atelier Locations</h4>
            <p className="text-neutral-400 leading-relaxed">
              Flagship Studio: <br />
              452 Broadway, SoHo <br />
              New York, NY 10013 <br />
              United States
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} STUDIO ESSENTIALS ATELIER LLC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <span className="hover:text-neutral-300 cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-neutral-300 cursor-pointer">TERMS OF SERVICE</span>
            <span className="hover:text-neutral-300 cursor-pointer">SECURITY</span>
          </div>
        </div>
      </footer>

      {/* TRACKING MODAL */}
      {isTrackingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 relative text-neutral-900">
            <button
              onClick={() => { setIsTrackingOpen(false); setTrackingResult(null); setTrackingError(''); }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100"
            >
              <X className="w-5 h-5 text-neutral-500" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
              <Truck className="w-4 h-4" /> Self-Service Order Tracking
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Track Your Shipment</h2>

            <form onSubmit={handleTrackOrder} className="flex gap-2 mb-6">
              <input
                type="text"
                required
                placeholder="Enter Order ID (e.g. 101 or 102)"
                value={trackOrderId}
                onChange={e => setTrackOrderId(e.target.value)}
                className="flex-1 p-3 border rounded text-xs outline-none focus:border-black font-semibold"
              />
              <button
                type="submit"
                disabled={trackingLoading}
                className="bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white px-5 py-3 rounded text-xs font-bold uppercase tracking-wider"
              >
                {trackingLoading ? 'Searching...' : 'Track'}
              </button>
            </form>

            {trackingError && (
              <div className="bg-rose-50 text-rose-700 p-3 rounded text-xs font-semibold mb-4 border border-rose-200">
                {trackingError}
              </div>
            )}

            {trackingResult && (
              <div className="border border-neutral-200 rounded-xl p-6 bg-neutral-50 space-y-4 text-xs">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <span className="text-neutral-400 uppercase text-[10px] font-bold">Order Number</span>
                    <p className="font-extrabold text-base">#{trackingResult.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${trackingResult.order_status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                    trackingResult.order_status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                    {trackingResult.order_status}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-neutral-400 uppercase text-[10px] font-bold">Destination</p>
                  <p className="font-semibold">{trackingResult.customer_name}</p>
                  <p className="text-neutral-600">{trackingResult.shipping_address}, {trackingResult.city} ({trackingResult.postal_code})</p>
                </div>

                <div className="border-t pt-3">
                  <p className="text-neutral-400 uppercase text-[10px] font-bold mb-2">Package Contents</p>
                  <div className="space-y-2">
                    {trackingResult.items?.map(it => (
                      <div key={it.id} className="flex justify-between font-medium">
                        <span>{it.quantity}x {it.product_name} ({it.color_name} / {it.size_name})</span>
                        <span className="font-bold">${it.unit_price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-3 flex justify-between font-bold text-sm">
                  <span>Total Paid</span>
                  <span>${trackingResult.total_amount}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      <aside className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase tracking-wider">Your Bag ({totalItemsCount})</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-400">
              <ShoppingBag className="w-12 h-12 mb-3 stroke-[1.5]" />
              <p className="text-sm">Your bag is currently empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.variantId} className="flex gap-4 border-b border-neutral-100 pb-4">
                <img src={item.image} alt={item.title} className="w-20 aspect-[3/4] object-cover rounded bg-neutral-100" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">{item.color} / {item.size}</p>
                    <p className="text-sm font-bold mt-1">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.variantId, -1)} className="p-1 border rounded hover:bg-neutral-100">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.variantId, 1)} className="p-1 border rounded hover:bg-neutral-100">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-neutral-200 bg-neutral-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-neutral-600">Subtotal</span>
              <span className="text-lg font-bold">${cartSubtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-4 rounded font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* STRIPE CARD CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100"
            >
              <X className="w-5 h-5 text-neutral-500" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
              <Lock className="w-3.5 h-3.5" /> End-to-End Encrypted Checkout
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-5">Shipping & Payment</h2>

            {/* Promo Code Box */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 mb-5">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. VIP20)"
                    value={inputCoupon}
                    onChange={e => setInputCoupon(e.target.value.toUpperCase())}
                    className="w-full pl-9 pr-3 py-2 text-xs uppercase font-bold tracking-wider border rounded outline-none focus:border-black bg-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponLoading || !inputCoupon}
                  className="bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider"
                >
                  {couponLoading ? '...' : 'Apply'}
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex justify-between items-center mt-2 text-xs text-emerald-700 font-semibold bg-emerald-50 p-2 rounded border border-emerald-200">
                  <span>Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discount_percentage}% OFF)</span>
                  <button onClick={() => setAppliedCoupon(null)} className="underline text-neutral-500 hover:text-black">Remove</button>
                </div>
              )}

              {couponError && (
                <p className="text-xs text-rose-600 mt-2 font-medium">{couponError}</p>
              )}
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={customer.name}
                  onChange={e => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full p-2.5 border rounded text-xs focus:border-black outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={customer.email}
                    onChange={e => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full p-2.5 border rounded text-xs focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={customer.phone}
                    onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full p-2.5 border rounded text-xs focus:border-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Address</label>
                <input
                  type="text"
                  required
                  placeholder="742 Evergreen Terrace"
                  value={customer.address}
                  onChange={e => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full p-2.5 border rounded text-xs focus:border-black outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">City</label>
                  <input
                    type="text"
                    required
                    placeholder="New York"
                    value={customer.city}
                    onChange={e => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full p-2.5 border rounded text-xs focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    placeholder="10001"
                    value={customer.postalCode}
                    onChange={e => setCustomer({ ...customer, postalCode: e.target.value })}
                    className="w-full p-2.5 border rounded text-xs focus:border-black outline-none"
                  />
                </div>
              </div>

              {/* PAYMENT METHOD SELECTION */}
              <div className="pt-3 border-t">
                <label className="block text-xs font-bold uppercase mb-2">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all ${paymentMethod === 'card' ? 'border-black bg-neutral-900 text-white' : 'border-neutral-200 text-neutral-600 hover:border-black'
                      }`}
                  >
                    <CreditCard className="w-4 h-4" /> Credit Card (Stripe)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 border rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all ${paymentMethod === 'cod' ? 'border-black bg-neutral-900 text-white' : 'border-neutral-200 text-neutral-600 hover:border-black'
                      }`}
                  >
                    <Banknote className="w-4 h-4" /> Cash on Delivery
                  </button>
                </div>

                {/* STRIPE CARD FIELDS CONTAINER */}
                {paymentMethod === 'card' && (
                  <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 space-y-3">
                    <div className="flex justify-between items-center text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                      <span>Card Details (Test Sandbox)</span>
                      <span className="text-emerald-600 flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> 256-Bit SSL</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        value={cardDetails.cardNumber}
                        onChange={e => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                        className="w-full p-2.5 bg-white border rounded text-xs font-mono font-semibold focus:border-black outline-none tracking-widest"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={cardDetails.cardExp}
                        onChange={e => setCardDetails({ ...cardDetails, cardExp: e.target.value })}
                        className="p-2.5 bg-white border rounded text-xs font-mono font-semibold focus:border-black outline-none text-center"
                      />
                      <input
                        type="text"
                        required
                        value={cardDetails.cardCvc}
                        onChange={e => setCardDetails({ ...cardDetails, cardCvc: e.target.value })}
                        className="p-2.5 bg-white border rounded text-xs font-mono font-semibold focus:border-black outline-none text-center"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Order Calculation Matrix */}
              <div className="pt-3 border-t border-neutral-100 space-y-1 text-xs">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>VIP Discount ({appliedCoupon.discount_percentage}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm font-bold pt-2 border-t text-neutral-900">
                  <span>Total Due:</span>
                  <span className="text-xl">${cartFinalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={orderSubmitting}
                className="w-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white py-3.5 rounded font-bold uppercase tracking-wider text-xs mt-2"
              >
                {orderSubmitting
                  ? 'Authorizing Transaction...'
                  : paymentMethod === 'card'
                    ? `Pay with Card ($${cartFinalTotal.toFixed(2)})`
                    : `Confirm Cash Order ($${cartFinalTotal.toFixed(2)})`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {orderSuccessData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold tracking-tight mb-2">Order Confirmed!</h2>
            <p className="text-sm text-neutral-600 mb-6">
              Thank you for your order. We've verified your transaction and started processing your package.
            </p>
            <div className="bg-neutral-50 p-4 rounded-lg text-left text-xs space-y-1 mb-6 border border-neutral-200">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order ID:</span>
                <span className="font-bold">#{orderSuccessData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Items:</span>
                <span className="font-bold">{orderSuccessData.itemsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Payment:</span>
                <span className="font-semibold text-neutral-800">{orderSuccessData.method}</span>
              </div>
              {orderSuccessData.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Saved with Promo:</span>
                  <span className="font-bold">-${orderSuccessData.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-1 font-bold">
                <span className="text-neutral-700">Total Paid:</span>
                <span className="text-neutral-900">${orderSuccessData.total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => { setOrderSuccessData(null); setStoreMode('catalog'); }}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3 rounded font-bold uppercase text-xs tracking-wider"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}