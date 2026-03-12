import { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Star, Zap, Shield, Truck, MoveRight, Heart, ShoppingBag, LogOut, CheckCircle, X } from 'lucide-react';
import './App.css';

const mockProducts = [
  {
    id: 1,
    title: 'Sony WH-1000XM5 Noise Cancelling',
    price: 398.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop',
    rating: 4.8,
    isNew: true
  },
  {
    id: 2,
    title: 'Apple Watch Ultra Titanium',
    price: 799.00,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop',
    rating: 4.9,
    isNew: true
  },
  {
    id: 3,
    title: 'Nike Air Max 270 React Flyknit',
    price: 150.00,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop',
    rating: 4.7,
    isNew: false
  },
  {
    id: 4,
    title: 'Fujifilm X-T4 Mirrorless Camera',
    price: 1699.00,
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop',
    rating: 4.6,
    isNew: false
  },
  {
    id: 5,
    title: 'Chanel Bleu De Chanel Parfum',
    price: 175.00,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1590736704702-fce8d6a834b5?w=800&auto=format&fit=crop',
    rating: 4.9,
    isNew: false
  },
  {
    id: 6,
    title: 'PlayStation DualSense Controller',
    price: 69.99,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&auto=format&fit=crop',
    rating: 4.8,
    isNew: false
  },
  {
    id: 7,
    title: 'Dyson V15 Detect Cordless Vacuum',
    price: 749.99,
    category: 'Home Appilance',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop',
    rating: 4.7,
    isNew: true
  },
  {
    id: 8,
    title: 'Bowflex SelectTech 552 Dumbbells',
    price: 429.00,
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop',
    rating: 4.8,
    isNew: false
  },
  {
    id: 9,
    title: 'Logitech MX Master 3S Mouse',
    price: 99.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop',
    rating: 4.9,
    isNew: false
  },
  {
    id: 10,
    title: 'Maison Margiela REPLICA Jazz Club',
    price: 160.00,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop',
    rating: 4.6,
    isNew: false
  },
  {
    id: 11,
    title: 'Keychron Q1 Pro Mechanical Keyboard',
    price: 199.00,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop',
    rating: 4.8,
    isNew: true
  },
  {
    id: 12,
    title: 'Balenciaga Triple S Sneakers',
    price: 1050.00,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop',
    rating: 4.4,
    isNew: false
  },
  {
    id: 13,
    title: 'Ember Temperature Control Smart Mug 2',
    price: 149.95,
    category: 'Home Appilance',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&auto=format&fit=crop',
    rating: 4.5,
    isNew: false
  },
  {
    id: 14,
    title: 'Garmin Fenix 7 Sapphire Solar',
    price: 899.99,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&auto=format&fit=crop',
    rating: 4.9,
    isNew: false
  },
  {
    id: 15,
    title: 'GoPro HERO12 Black Action Camera',
    price: 399.99,
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800&auto=format&fit=crop',
    rating: 4.7,
    isNew: true
  }
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Track Order States
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [trackInput, setTrackInput] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState('');

  // Review & Product Detail States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ firstName: '', lastName: '', phone: '', address: '' });
  const [availableCategories, setAvailableCategories] = useState(['All', 'Electronics', 'Wearables', 'Fashion', 'Gaming', 'Furniture']);
  const [productReviews, setProductReviews] = useState([]);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  // Check localStorage for token on load
  useEffect(() => {
    // Session persistence removed as per user request
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000); // clear after 3s
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: loginEmail, password: loginPassword })
        });
        
        if (res.ok) {
          const data = await res.json();
          setToken(data.token);
          const userData = { name: data.email.split('@')[0], email: data.email };
          
          // Try to fetch full customer profile from customer-service
          try {
            const customerRes = await fetch(`/api/customers/email/${data.email}`, {
              headers: { 'Authorization': `Bearer ${data.token}` }
            });
            if (customerRes.ok) {
              const customerData = await customerRes.json();
              userData.firstName = customerData.firstName;
              userData.lastName = customerData.lastName;
              userData.name = `${customerData.firstName} ${customerData.lastName}`;
              userData.id = customerData.id;
              userData.address = customerData.address;
              userData.phone = customerData.phone;
            }
          } catch (cErr) {
            console.warn('Customer profile not found or service down:', cErr);
          }

          setUser(userData);
          setShowLoginModal(false);
          setLoginEmail('');
          setLoginPassword('');
          showToast(`Welcome back, ${userData.name}!`);
          fetchProducts(data.token); // refetch products now that we have token
        } else {
          showToast('Login failed. Please verify your credentials.');
        }
      } catch (err) {
        showToast('Login error: Unable to reach backend server.');
      }
    } else {
      showToast('Please enter both email and password.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    setShowProfileModal(false);
    setIsEditingProfile(false);
    showToast('Logged out successfully.');
  };

  const startEditingProfile = () => {
    setProfileForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      address: user.address || ''
    });
    setIsEditingProfile(true);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/customers/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...profileForm,
          email: user.email // keep email same
        })
      });

      if (res.ok) {
        const updatedCustomer = await res.json();
        const updatedUser = {
          ...user,
          firstName: updatedCustomer.firstName,
          lastName: updatedCustomer.lastName,
          name: `${updatedCustomer.firstName} ${updatedCustomer.lastName}`,
          phone: updatedCustomer.phone,
          address: updatedCustomer.address
        };
        setUser(updatedUser);
        setIsEditingProfile(false);
        showToast('Profile updated successfully!');
      } else {
        showToast('Failed to update profile.');
      }
    } catch (err) {
      showToast('Error updating profile.');
    }
  };

  const scrollToSection = (e, sectionId) => {
    if (e) e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    showToast(`${product.title} added to cart!`);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = async () => {
    if (!token) {
      showToast('Please login to checkout.');
      setShowCartModal(false);
      return;
    }
    if (cart.length === 0) return;
    
    // Call backend order microservice first to reserve
    try {
      const baseOrderNum = `ORD-${Date.now()}`;
      
      // Call Checkout Service to handle the payment simulation and order finalization
      const checkoutRes = await fetch('/api/checkout/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user.email,
          items: cart,
          total: cart.reduce((sum, item) => sum + item.price, 0),
          orderId: baseOrderNum
        })
      });

      if (!checkoutRes.ok) throw new Error('Checkout service failed');
      const checkoutData = await checkoutRes.json();

      const orderPromises = cart.map((item, index) => {
        return fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            orderNumber: `${baseOrderNum}-${index}`,
            productId: item.id.toString(),
            customerId: user.id,
            quantity: 1,
            totalPrice: item.price
          })
        });
      });
      
      const results = await Promise.all(orderPromises);
      const allSuccess = results.every(res => res.ok);
      
      if (allSuccess) {
        setCart([]);
        setShowCartModal(false);
        showToast(`${checkoutData.message} Tracking # is ${baseOrderNum}-0`);
      } else {
        showToast('Warning: Some items could not be ordered. Is the product invalid?');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to connect to the checkout or order service.');
    }
  };

  const openProductDetails = async (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
    // Fetch reviews for this product
    try {
      const res = await fetch(`/api/reviews/${product.id}`);
      if (res.ok) {
        const data = await res.json();
        setProductReviews(data);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      showToast('Please login to leave a review.');
      return;
    }
    if (!newReviewComment.trim()) return;

    const reviewData = {
      productId: selectedProduct.id,
      userId: user.email,
      userName: user.name,
      comment: newReviewComment,
      rating: newReviewRating
    };

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reviewData)
      });
      if (res.ok) {
        const savedReview = await res.json();
        setProductReviews([savedReview, ...productReviews]);
        setNewReviewComment('');
        setNewReviewRating(5);
        showToast('Review submitted!');
      }
    } catch (err) {
      showToast('Failed to submit review.');
    }
  };


  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    setTrackError('');
    setTrackResult(null);
    if (!trackInput.trim()) return;

    try {
      const res = await fetch(`/api/orders/track/${trackInput.trim()}`);
      if (res.ok) {
        const data = await res.json();
        setTrackResult(data);
      } else {
        setTrackError('Order not found. Please check your tracking number.');
      }
    } catch (err) {
      setTrackError('Failed to connect to the server.');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Connect to microservices via API Gateway
  const fetchProducts = async (authToken = token) => {
    if (!authToken) return; // Prevent 401 unauth calls, use mocked fallback in mean time
    try {
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          // Map the backend Product entity to the frontend UI model
          const mappedProducts = data.map((item, index) => ({
            id: item.id || `fetched-${index}`,
            title: item.name || 'Unnamed Product',
            price: item.price ? Number(item.price) : 99.99,
            category: item.description || 'Category',
            // Use mock images cyclically for dynamically loaded items if no image is present
            image: mockProducts[index % mockProducts.length].image,
            rating: 4.5 + (Math.random() * 0.5),
            isNew: index < 2
          }));
          setProducts(mappedProducts);
        }
      }
    } catch (error) {
      console.error('Failed to fetch from microservices API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/products/categories');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setAvailableCategories(['All', ...data]);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch categories from service:', err);
    }
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-grid">
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a href="#" className="logo">
            <ShoppingBag size={28} className="text-gradient" />
            <span>Shopscale</span>Fabric
          </a>
          
          <nav className="nav">
            <a href="#home" className="nav-link" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
            <a href="#shop" className="nav-link" onClick={(e) => scrollToSection(e, 'shop')}>Shop</a>
            <a href="#categories" className="nav-link" onClick={(e) => scrollToSection(e, 'categories')}>Categories</a>
            <a href="#about" className="nav-link" onClick={(e) => scrollToSection(e, 'about')}>About</a>
          </nav>
          
          <div className="nav-actions">
            <button className="btn-icon">
              <Search size={20} />
            </button>
            <button className="btn-icon" onClick={() => setShowTrackModal(true)} title="Track Order">
              <Truck size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {user ? (
                <>
                  <button className="btn-icon" onClick={() => setShowProfileModal(true)} title="View Profile">
                    <User size={20} />
                  </button>
                  <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: '500' }}>Hi, {user.name}</span>
                  <button className="btn-icon" onClick={handleLogout} title="Logout">
                    <LogOut size={20} />
                  </button>
                </>
              ) : (
                <button className="btn-icon" onClick={() => setShowLoginModal(true)} title="Login">
                  <User size={20} />
                </button>
              )}
            </div>
            <button className="btn-icon" style={{ position: 'relative' }} onClick={() => setShowCartModal(true)}>
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: '-5px', 
                  right: '-5px', 
                  background: 'var(--accent-primary)', 
                  color: '#fff', 
                  fontSize: '10px', 
                  fontWeight: 'bold', 
                  width: '18px', 
                  height: '18px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>{cart.length}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg"></div>
        <div className="hero-bg-2"></div>
        
        <div className="container hero-container">
          <div className="hero-content animate-fade-in">
            <div style={{ display: 'inline-block', padding: '0.25rem 1rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '100px', color: 'var(--accent-primary)', marginBottom: '1.5rem', fontWeight: '600', fontSize: '0.85rem', letterSpacing: '0.5px' }}>
              NEW COLLECTION 2026
            </div>
            <h1>The Future of <br/><span className="text-gradient">Commerce</span> is Here</h1>
            <p>Discover hand-picked premium products that elevate your everyday life. Fast shipping, secure payments, and incredible support.</p>
            
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={(e) => scrollToSection(e, 'shop')}>
                Shop Now <MoveRight size={18} />
              </button>
              <button className="btn btn-secondary" onClick={(e) => scrollToSection(e, 'categories')}>
                View Collections
              </button>
            </div>
            
            <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.25rem' }}>10k+</h3>
                <p style={{ fontSize: '0.9rem' }}>Happy Customers</p>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'var(--border-color)' }}></div>
              <div>
                <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.25rem' }}>4.9</h3>
                <div style={{ display: 'flex', color: 'var(--warning)', gap: '0.1rem' }}>
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="hero-image animate-fade-in delay-200">
            <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1000&auto=format&fit=crop" alt="Premium Headphones" />
            
            {/* Floating Glass Element */}
            <div className="glass" style={{
              position: 'absolute',
              bottom: '20px',
              left: '-30px',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{ padding: '0.75rem', background: 'var(--accent-primary)', borderRadius: '30%', color: '#fff' }}>
                <Zap size={24} />
              </div>
              <div>
                <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem', margin: 0 }}>Flash Sale</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>Up to 40% Off</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card animate-fade-in delay-100">
              <div className="feature-icon"><Truck /></div>
              <h3>Free Shipping</h3>
              <p>On all orders over $150. Fast, reliable delivery straight to your door globally.</p>
            </div>
            <div className="feature-card animate-fade-in delay-200">
              <div className="feature-icon"><Shield /></div>
              <h3>Secure Checkout</h3>
              <p>100% protected payments. We use advanced encryption to keep your data safe.</p>
            </div>
            <div className="feature-card animate-fade-in delay-300">
              <div className="feature-icon"><Zap /></div>
              <h3>Fast Support</h3>
              <p>Our dedicated team is online 24/7 to help you with any questions or issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="shop" className="products">
        <div className="container">
          <div className="section-header">
            <h2>Trending <span className="text-gradient">Products</span></h2>
            <p>Explore our carefully curated selection of premium products designed to bring joy and functionality to your lifestyle.</p>
          </div>

          <div className="filter-container">
            <div className="search-wrapper">
              <Search size={18} style={{ position: 'absolute', left: '1.25rem', color: 'var(--text-tertiary)' }} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="category-pills">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
              <h3>No products found matching your criteria.</h3>
              <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>Clear Filters</button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                {product.isNew && <div className="product-badge">NEW</div>}
                
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 2 }}>
                  <button style={{ 
                    background: 'var(--glass-bg)', 
                    backdropFilter: 'blur(4px)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                    width: '36px', height: '36px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }} onMouseOver={(e) => {
                    e.currentTarget.style.color = 'var(--danger)';
                    e.currentTarget.style.borderColor = 'var(--danger)';
                  }} onMouseOut={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                  }}>
                    <Heart size={18} />
                  </button>
                </div>

                <div className="product-image" onClick={() => openProductDetails(product)}>
                  <img src={product.image} alt={product.title} />
                </div>
                
                <div className="product-content">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-title" title={product.title}>{product.title}</h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', color: 'var(--warning)', gap: '0.1rem' }}>
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>({product.rating})</span>
                  </div>
                  
                  <div className="product-price-row">
                    <div className="product-price">${product.price.toFixed(2)}</div>
                    <div className="product-action">
                      <button className="btn-icon" title="Add to cart" onClick={() => addToCart(product)}>
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button className="btn btn-secondary" style={{ padding: '1rem 2.5rem' }}>
              Load More Products
            </button>
          </div>
        </div>
      </section>

      {/* Categories / Collections Section */}
      <section id="categories" className="categories-section" style={{ padding: '6rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Collections</h2>
            <p style={{ color: 'var(--text-tertiary)', maxWidth: '600px', margin: '0 auto' }}>Explore our curated collections designed to match your lifestyle and needs.</p>
          </div>
          
          <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {availableCategories.filter(c => c !== 'All').map((cat, idx) => (
              <div 
                key={idx} 
                className="category-card animate-fade-in" 
                style={{ 
                  height: '200px', 
                  borderRadius: 'var(--radius-lg)', 
                  background: `linear-gradient(${135 + idx * 45}deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))`,
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  setSelectedCategory(cat);
                  scrollToSection(null, 'shop');
                }}
              >
                <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', marginBottom: '1rem' }}>
                  <ShoppingBag size={32} />
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: 0 }}>{cat}</h3>
                <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>View Collection</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section" style={{ padding: '6rem 0', background: 'var(--bg-tertiary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div className="animate-fade-in">
              <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About Shopscale Fabric</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Shopscale Fabric is more than just an e-commerce platform. We are a technology-first marketplace built on a high-performance microservices architecture, ensuring your shopping experience is fast, secure, and reliable.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={18} className="text-gradient" /> Innovation
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Using the latest tech stacks to provide seamless interactions.</p>
                </div>
                <div>
                  <h4 style={{ color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={18} className="text-gradient" /> Reliability
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Distributed systems designed to handle thousands of requests per second.</p>
                </div>
              </div>
            </div>
            <div className="animate-fade-in delay-200" style={{ position: 'relative' }}>
               <img 
                 src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop" 
                 alt="Team working" 
                 style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }} 
               />
               <div className="glass" style={{ position: 'absolute', top: '-20px', right: '-20px', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                 <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>Est. 2026</p>
                 <p style={{ fontSize: '0.8rem' }}>Revolutionizing Commerce</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="logo">
                <ShoppingBag size={28} className="text-gradient" />
                <span>Shopscale</span>Fabric
              </a>
              <p>We are a premium e-commerce platform dedicated to bringing you the best products from around the globe seamlessly integrated with cutting-edge microservices architecture.</p>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <a href="#" style={{ width: '40px', height: '40px', background: 'var(--bg-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>X</a>
                <a href="#" style={{ width: '40px', height: '40px', background: 'var(--bg-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>in</a>
                <a href="#" style={{ width: '40px', height: '40px', background: 'var(--bg-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>ig</a>
              </div>
            </div>
            
            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Shop</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="footer-title">Customer Care</h4>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Track Your Order</a></li>
                <li><a href="#">Returns & Refunds</a></li>
                <li><a href="#">Shipping Info</a></li>
                <li><a href="#">Terms & Conditions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="footer-title">Newsletter</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
              <div style={{ display: 'flex' }}>
                <input type="email" placeholder="Enter your email" style={{ 
                  flex: 1, 
                  padding: '0.75rem 1rem', 
                  background: 'var(--bg-tertiary)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-md) 0 0 var(--radius-md)',
                  color: '#fff',
                  outline: 'none',
                  fontFamily: 'inherit'
                }} />
                <button className="btn btn-primary" style={{ borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2026 Shopscale Fabric. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <CheckCircle size={20} />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>
              <X size={24} />
            </button>
            <h2 style={{ color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User /> Sign In
            </h2>
            <form onSubmit={submitLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
                <input 
                  type="email" 
                  className="search-input" 
                  style={{ padding: '0.75rem 1rem', width: '100%' }} 
                  placeholder="Enter your email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required 
                />
              </div>
              <div>
                <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
                <input 
                  type="password" 
                  className="search-input" 
                  style={{ padding: '0.75rem 1rem', width: '100%' }} 
                  placeholder="Enter your password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Product Details Modal with Reviews */}
      {showProductModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
          <div className="modal-content animate-fade-in" style={{ maxWidth: '800px', width: '95%' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowProductModal(false)}>
              <X size={24} />
            </button>
            
            <div className="product-details-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '2rem' }}>
              <div className="product-detail-img">
                <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: '100%', borderRadius: 'var(--radius-lg)', objectFit: 'cover' }} />
                <div style={{ marginTop: '1rem' }}>
                   <h1 style={{ color: '#fff', fontSize: '1.8rem' }}>{selectedProduct.title}</h1>
                   <p style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: '700', margin: '0.5rem 0' }}>${selectedProduct.price.toFixed(2)}</p>
                   <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
                </div>
              </div>

              <div className="product-detail-info" style={{ overflowY: 'auto', maxHeight: '500px', paddingRight: '1rem' }}>
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Customer Reviews</h3>
                
                <div className="reviews-list">
                  {productReviews.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No reviews yet. Be the first to review!</p>
                  ) : (
                    productReviews.map((rev, idx) => (
                      <div key={idx} className="review-card">
                        <div className="review-card-header">
                          <span className="review-user">{rev.userName}</span>
                          <div className="review-rating">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill={i < rev.rating ? "#fbbf24" : "transparent"} stroke={i < rev.rating ? "#fbbf24" : "rgba(255,255,255,0.2)"} />
                            ))}
                          </div>
                        </div>
                        <p className="review-comment">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="reviews-section" style={{ marginTop: '2rem' }}>
                  <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Submit a Review</h4>
                  <form onSubmit={submitReview} className="review-input-group">
                    <div className="review-rating-select">
                      <span style={{ color: 'var(--text-secondary)' }}>Rating: </span>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`rating-star ${i < newReviewRating ? 'active' : ''}`} 
                          onClick={() => setNewReviewRating(i + 1)}
                          fill={i < newReviewRating ? "#fbbf24" : "transparent"}
                          size={20}
                        />
                      ))}
                    </div>
                    <textarea 
                      className="review-textarea" 
                      placeholder="Share your experience with this product..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      required
                    ></textarea>
                    <button type="submit" className="btn btn-secondary">Post Review</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Track Order Modal */}
      {showTrackModal && (
        <div className="modal-overlay" onClick={() => setShowTrackModal(false)}>
          <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowTrackModal(false)}>
              <X size={24} />
            </button>
            <h2 style={{ color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck /> Track Your Order
            </h2>
            <form onSubmit={handleTrackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Tracking Number</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ padding: '0.75rem 1rem', width: '100%' }} 
                  placeholder="e.g. ORD-1701234567-0" 
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                Track Order
              </button>
            </form>

            {trackError && <p style={{ color: 'var(--danger)', marginTop: '1rem', fontSize: '0.9rem' }}>{trackError}</p>}
            
            {trackResult && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Order Details</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><strong>Order #:</strong> {trackResult.orderNumber}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><strong>Product ID:</strong> {trackResult.productId}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><strong>Quantity:</strong> {trackResult.quantity}</p>
                <p style={{ color: 'var(--accent-primary)', fontSize: '1rem', marginTop: '0.5rem', fontWeight: 'bold' }}>Total: ${trackResult.totalPrice?.toFixed(2) || '0.00'}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: 'var(--success)' }}>
                  <CheckCircle size={16} /> <span>Order Confirmed & Processing</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <div className="modal-overlay" onClick={() => setShowCartModal(false)}>
          <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCartModal(false)}>
              <X size={24} />
            </button>
            <h2 style={{ color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingCart /> Your Cart
            </h2>
            
            {cart.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Your cart is currently empty.</p>
            ) : (
              <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="cart-item-info">
                      <img src={item.image} alt={item.title} className="cart-item-img" />
                      <div>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem' }}>{item.title}</h4>
                        <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 'bold' }}>
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button 
                      className="btn-icon" 
                      style={{ width: '32px', height: '32px', border: 'none', background: 'transparent' }} 
                      onClick={() => removeFromCart(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <div className="cart-total">
                  <span style={{ color: 'var(--text-secondary)' }}>Total:</span>
                  <span style={{ color: '#fff' }}>
                    ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                  </span>
                </div>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '1.5rem' }}
                  onClick={handleCheckout}
                >
                  Confirm Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Profile Modal */}
      {showProfileModal && user && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content animate-fade-in" style={{ maxWidth: '450px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowProfileModal(false)}>
              <X size={24} />
            </button>
            <h2 style={{ color: '#fff', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <User className="text-gradient" /> Customer Profile
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ color: '#fff', margin: 0 }}>{user.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Customer ID: #{user.id || 'N/A'}</p>
                </div>
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleUpdateProfile} style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>First Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={profileForm.firstName} 
                        onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Last Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={profileForm.lastName} 
                        onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Phone Number</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={profileForm.phone} 
                      onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Shipping Address</label>
                    <textarea 
                      className="form-control" 
                      value={profileForm.address} 
                      style={{ minHeight: '80px', resize: 'vertical' }}
                      onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
                    <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setIsEditingProfile(false)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Full Name</label>
                      <p style={{ color: '#fff', margin: 0, paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>{user.name}</p>
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Email Address</label>
                      <p style={{ color: '#fff', margin: 0, paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>{user.email}</p>
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Phone</label>
                      <p style={{ color: '#fff', margin: 0, paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>{user.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Shipping Address</label>
                      <p style={{ color: '#fff', margin: 0, paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>{user.address || 'No address provided'}</p>
                    </div>
                  </div>

                  <button className="btn btn-secondary" style={{ width: '100%' }} onClick={startEditingProfile}>
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
