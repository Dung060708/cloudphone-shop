// ===== DATA =====
const products = [
  { id:1, category:'android', name:'CloudPhone Android Basic - 2GB RAM', stock:245, sold:1830, price:30000, desc:'Android 13 | 2GB RAM | 32GB Storage | 24/7 Online | Auto backup', specs:{os:'Android 13',ram:'2GB',storage:'32GB',uptime:'24/7'}, features:['Online 24/7 không tắt','Auto backup hàng ngày','Root access sẵn','Hỗ trợ đa tài khoản','API quản lý từ xa'] },
  { id:2, category:'android', name:'CloudPhone Android Pro - 4GB RAM', stock:182, sold:967, price:55000, desc:'Android 14 | 4GB RAM | 64GB Storage | Root access | 24/7 Online', specs:{os:'Android 14',ram:'4GB',storage:'64GB',uptime:'24/7'}, features:['Root + Xposed Framework','GPS giả lập','Multi-app clone','Priority support','Bandwidth không giới hạn'] },
  { id:3, category:'android', name:'CloudPhone Android Ultra - 8GB RAM', stock:78, sold:432, price:95000, desc:'Android 14 | 8GB RAM | 128GB Storage | Gaming ready | Root + Xposed', specs:{os:'Android 14',ram:'8GB',storage:'128GB',uptime:'24/7'}, features:['Gaming performance','8GB RAM mượt mà','Root + Magisk + Xposed','GPU emulation','Dedicated resources'] },
  { id:4, category:'ios', name:'CloudPhone iOS Basic - iPhone 12', stock:56, sold:289, price:80000, desc:'iOS 17 | 4GB RAM | 64GB | iMessage + FaceTime | Jailbreak ready', specs:{os:'iOS 17',ram:'4GB',storage:'64GB',uptime:'24/7'}, features:['iMessage + FaceTime','App Store access','Jailbreak ready','iCloud sync','Apple ID riêng'] },
  { id:5, category:'ios', name:'CloudPhone iOS Pro - iPhone 14', stock:34, sold:156, price:150000, desc:'iOS 18 | 6GB RAM | 128GB | Full Apple ID | App Store access', specs:{os:'iOS 18',ram:'6GB',storage:'128GB',uptime:'24/7'}, features:['Full Apple ecosystem','Face ID simulation','128GB storage','Premium support 24/7','Không giới hạn bandwidth'] },
  { id:6, category:'windows', name:'CloudPhone Windows - RDP Basic', stock:120, sold:560, price:45000, desc:'Windows 10 | 4GB RAM | 80GB SSD | Full admin | 24/7 uptime', specs:{os:'Windows 10',ram:'4GB',storage:'80GB SSD',uptime:'24/7'}, features:['Full Administrator','RDP access','SSD tốc độ cao','Windows Update','Cài đặt phần mềm tùy ý'] },
  { id:7, category:'windows', name:'CloudPhone Windows - RDP Pro', stock:65, sold:312, price:85000, desc:'Windows 11 | 8GB RAM | 160GB SSD | GPU support | Unlimited bandwidth', specs:{os:'Windows 11',ram:'8GB',storage:'160GB SSD',uptime:'24/7'}, features:['GPU support','8GB RAM','160GB NVMe SSD','Bandwidth không giới hạn','Priority network'] },
  { id:8, category:'package', name:'Gói 5 CloudPhone Android Basic', stock:40, sold:198, price:120000, desc:'Tiết kiệm 20% | 5x Android 13 Basic | Quản lý tập trung | API control', specs:{os:'Android 13',ram:'2GB x5',storage:'32GB x5',uptime:'24/7'}, features:['5 devices trong 1 dashboard','Tiết kiệm 20%','API quản lý tập trung','Bulk actions','Priority support'] },
  { id:9, category:'package', name:'Gói 10 CloudPhone Android Pro', stock:25, sold:87, price:450000, desc:'Tiết kiệm 25% | 10x Android 14 Pro | Dashboard quản lý | Priority support', specs:{os:'Android 14',ram:'4GB x10',storage:'64GB x10',uptime:'24/7'}, features:['10 devices Pro','Tiết kiệm 25%','Dashboard chuyên dụng','Webhook notifications','Dedicated support'] },
  { id:10, category:'package', name:'Enterprise Package - 50 Devices', stock:10, sold:23, price:2000000, desc:'Custom OS | Unlimited RAM | Dedicated server | SLA 99.9% | 24/7 support', specs:{os:'Custom',ram:'Unlimited',storage:'Unlimited',uptime:'SLA 99.9%'}, features:['50 devices tùy chỉnh','Dedicated server','SLA 99.9%','24/7 priority support','Custom API integration'] },
];
const recentOrders = [
  { user:'...ovu', qty:3, product:'Android Basic', price:'90.000đ', time:'5 phút trước' },
  { user:'...490', qty:1, product:'iOS Pro', price:'150.000đ', time:'12 phút trước' },
  { user:'...dsd', qty:10, product:'Android Pro', price:'550.000đ', time:'25 phút trước' },
  { user:'...nyy', qty:2, product:'Windows RDP', price:'170.000đ', time:'1 giờ trước' },
  { user:'...iet', qty:5, product:'Gói 5 Android', price:'120.000đ', time:'2 giờ trước' },
  { user:'...23b', qty:1, product:'Android Ultra', price:'95.000đ', time:'3 giờ trước' },
  { user:'...905', qty:50, product:'Enterprise', price:'2.000.000đ', time:'4 giờ trước' },
  { user:'...362', qty:2, product:'iOS Basic', price:'160.000đ', time:'5 giờ trước' },
];
const recentDeposits = [
  { user:'...ovu', amount:'500.000đ', method:'VCB', received:'500.000đ', time:'10 phút trước' },
  { user:'...490', amount:'200.000đ', method:'Momo', received:'200.000đ', time:'30 phút trước' },
  { user:'...dsd', amount:'1.000.000đ', method:'VCB', received:'1.000.000đ', time:'1 giờ trước' },
  { user:'...nyy', amount:'100.000đ', method:'Thẻ cào', received:'80.000đ', time:'2 giờ trước' },
  { user:'...iet', amount:'300.000đ', method:'MB Bank', received:'300.000đ', time:'3 giờ trước' },
  { user:'...905', amount:'2.000.000đ', method:'Binance', received:'2.000.000đ', time:'6 giờ trước' },
];

// ===== STATE =====
let currentFilter = 'all';
let cart = [];
let currentUser = null;
let selectedDepositAmount = 200000;

// ===== UTILS =====
const fmt = n => n.toLocaleString('vi-VN') + 'đ';
const $ = id => document.getElementById(id);

// ===== PARTICLES =====
function initParticles() {
  const c = $('particles-container'); if (!c) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div'); p.className = 'particle';
    p.style.left = Math.random()*100+'%';
    p.style.animationDuration = (8+Math.random()*12)+'s';
    p.style.animationDelay = Math.random()*8+'s';
    p.style.width = p.style.height = (2+Math.random()*3)+'px';
    c.appendChild(p);
  }
}

// ===== RENDER =====
function renderProducts(filter) {
  filter = filter || currentFilter;
  const grid = $('products-grid');
  const list = filter === 'all' ? products : products.filter(p => p.category === filter);
  grid.innerHTML = list.map(p => {
    const badge = p.id<=2?'<span class="product-badge badge-hot">🔥 Hot</span>':p.id===8||p.id===9?'<span class="product-badge badge-sale">Sale</span>':p.id===10?'<span class="product-badge badge-new">New</span>':'';
    const isFav = favorites.includes(p.id);
    return `
    <div class="product-card" data-id="${p.id}">
      ${badge}
      <h6 class="product-name"><a href="#" onclick="openDetail(${p.id});return false">${p.name}</a></h6>
      <div class="product-labels">
        <span class="label-stock">Kho: <b>${p.stock}</b></span>
        <span class="label-sold">Đã bán: <b>${p.sold.toLocaleString()}</b></span>
      </div>
      <div class="product-price">${fmt(p.price)}</div>
      <p class="product-desc"><i class="fa-solid fa-angles-right"></i> ${p.desc}</p>
      <div class="product-actions">
        <button class="btn-fav ${isFav?'active':''}" onclick="toggleFav(${p.id})" title="Yêu thích"><i class="fa-solid fa-heart"></i></button>
        <a class="btn-detail" href="#" onclick="openDetail(${p.id});return false">Chi tiết</a>
        <button class="btn-buy" onclick="addToCart(${p.id})"><i class="fa-solid fa-cart-plus"></i> Thêm giỏ</button>
        <button class="btn-buy" style="background:var(--green);" onclick="openBuyModal(${p.id})">Mua Ngay</button>
      </div>
    </div>`;
  }).join('');
}

function renderRecent() {
  const o = $('recent-orders'), d = $('recent-deposits');
  if(o) o.innerHTML = recentOrders.map(x => `<div class="order-item"><div><span class="user">${x.user}</span> mua <span class="qty">${x.qty}</span> <span class="product-n">${x.product}</span> - <span class="price">${x.price}</span></div><span class="badge-time">${x.time}</span></div>`).join('');
  if(d) d.innerHTML = recentDeposits.map(x => `<div class="order-item"><div><span class="user">${x.user}</span> nạp <span class="price">${x.amount}</span> bằng <span class="qty">${x.method}</span> → <span class="price">${x.received}</span></div><span class="badge-time">${x.time}</span></div>`).join('');
}

// ===== FILTER =====
function filterCategory(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.btn-category').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else document.querySelector(`.btn-category[data-cat="${cat}"]`)?.classList.add('active');
  renderProducts(cat);
}

// ===== SEARCH =====
function handleSearch(e) {
  e.preventDefault();
  const q = $('search-input').value.toLowerCase().trim();
  if (!q) { renderProducts(); return; }
  const grid = $('products-grid');
  const list = products.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  grid.innerHTML = list.length ? list.map(p => `
    <div class="product-card"><h6 class="product-name"><a href="#" onclick="openDetail(${p.id});return false">${p.name}</a></h6>
    <div class="product-labels"><span class="label-stock">Kho: <b>${p.stock}</b></span><span class="label-sold">Đã bán: <b>${p.sold.toLocaleString()}</b></span></div>
    <div class="product-price">${fmt(p.price)}</div><p class="product-desc"><i class="fa-solid fa-angles-right"></i> ${p.desc}</p>
    <div class="product-actions"><a class="btn-detail" href="#" onclick="openDetail(${p.id});return false">Chi tiết</a>
    <button class="btn-buy" onclick="addToCart(${p.id})"><i class="fa-solid fa-cart-plus"></i> Thêm giỏ</button>
    <button class="btn-buy" style="background:var(--green);" onclick="openBuyModal(${p.id})">Mua Ngay</button></div></div>
  `).join('') : '<p style="color:var(--text-muted);padding:20px;">Không tìm thấy sản phẩm nào.</p>';
}

// ===== PRODUCT DETAIL MODAL =====
function openDetail(id) {
  const p = products.find(x => x.id === id); if (!p) return;
  $('detail-title').textContent = p.name;
  $('detail-body').innerHTML = `
    <div class="detail-specs">
      <div class="detail-spec"><div class="spec-label">Hệ điều hành</div><div class="spec-value">${p.specs.os}</div></div>
      <div class="detail-spec"><div class="spec-label">RAM</div><div class="spec-value">${p.specs.ram}</div></div>
      <div class="detail-spec"><div class="spec-label">Bộ nhớ</div><div class="spec-value">${p.specs.storage}</div></div>
      <div class="detail-spec"><div class="spec-label">Uptime</div><div class="spec-value">${p.specs.uptime}</div></div>
    </div>
    <h4 style="margin-bottom:8px;font-size:14px;">✨ Tính năng nổi bật</h4>
    <ul class="detail-features">${p.features.map(f => `<li><i class="fa-solid fa-check-circle"></i> ${f}</li>`).join('')}</ul>
    <div style="display:flex;justify-content:space-between;align-items:center;margin:16px 0;padding:16px;background:rgba(30,30,30,0.6);border-radius:10px;border:1px solid var(--border);">
      <div><span style="color:var(--text-muted);font-size:13px;">Giá chỉ từ</span><div style="font-size:24px;font-weight:800;color:var(--primary);">${fmt(p.price)}</div></div>
      <div style="text-align:right;"><span class="label-stock" style="margin-right:8px;">Kho: ${p.stock}</span><span class="label-sold">Đã bán: ${p.sold.toLocaleString()}</span></div>
    </div>
    <div class="detail-actions">
      <button class="btn-detail" style="flex:1;" onclick="addToCart(${p.id});closeDetailModal()"><i class="fa-solid fa-cart-plus"></i> Thêm giỏ hàng</button>
      <button class="btn-buy" style="flex:1;" onclick="closeDetailModal();openBuyModal(${p.id})"><i class="fa-solid fa-bolt"></i> Mua ngay</button>
    </div>`;
  $('detail-modal').classList.add('active');
}
function closeDetailModal() { $('detail-modal').classList.remove('active'); }

// ===== BUY MODAL =====
function openBuyModal(id) {
  const p = products.find(x => x.id === id); if (!p) return;
  $('modal-product-name').textContent = p.name;
  $('modal-product-price').textContent = fmt(p.price);
  $('modal-product-stock').textContent = p.stock;
  $('modal-qty').value = 1;
  $('modal-total').textContent = fmt(p.price);
  $('modal-product-id').value = p.id;
  if (currentUser) $('buy-email').value = currentUser.email;
  $('buy-modal').classList.add('active');
}
function closeModal() { $('buy-modal').classList.remove('active'); }
function updateQty(d) {
  const input = $('modal-qty'), pid = +$('modal-product-id').value, p = products.find(x=>x.id===pid);
  let v = (+input.value||1)+d; if(v<1)v=1; if(p&&v>p.stock)v=p.stock;
  input.value=v; if(p) $('modal-total').textContent = fmt(p.price*v);
}
function onQtyChange() { updateQty(0); }
function confirmBuy() {
  const pid=+$('modal-product-id').value, qty=+$('modal-qty').value, p=products.find(x=>x.id===pid);
  if(!p) return;
  showToast(`✅ Đã mua ${qty}x ${p.name} thành công!`,'success');
  p.stock-=qty; p.sold+=qty; closeModal(); renderProducts();
}

// ===== CART =====
function addToCart(id) {
  const p = products.find(x=>x.id===id); if(!p||p.stock<1) return;
  const existing = cart.find(c=>c.id===id);
  if(existing) { if(existing.qty<p.stock) existing.qty++; else { showToast('Đã đạt giới hạn kho!','error'); return; } }
  else cart.push({id, qty:1});
  showToast(`🛒 Đã thêm "${p.name}" vào giỏ hàng`,'success');
  updateCartUI();
}
function removeFromCart(id) { cart = cart.filter(c=>c.id!==id); updateCartUI(); }
function changeCartQty(id, d) {
  const item = cart.find(c=>c.id===id), p = products.find(x=>x.id===id);
  if(!item||!p) return;
  item.qty += d;
  if(item.qty<1) { removeFromCart(id); return; }
  if(item.qty>p.stock) item.qty=p.stock;
  updateCartUI();
}
function updateCartUI() {
  const countEl = $('cart-count'), itemsEl = $('cart-items'), footerEl = $('cart-footer'), totalEl = $('cart-total');
  const totalItems = cart.reduce((s,c)=>s+c.qty,0);
  countEl.textContent = totalItems;
  countEl.style.display = totalItems > 0 ? 'flex' : 'none';
  if(cart.length === 0) {
    itemsEl.innerHTML = '<div class="cart-empty"><i class="fa-solid fa-cart-arrow-down"></i><p>Giỏ hàng trống</p></div>';
    footerEl.style.display = 'none'; return;
  }
  let total = 0;
  itemsEl.innerHTML = cart.map(c => {
    const p = products.find(x=>x.id===c.id); if(!p) return '';
    total += p.price * c.qty;
    return `<div class="cart-item"><div class="cart-item-info"><div class="cart-item-name">${p.name}</div><div class="cart-item-price">${fmt(p.price)}</div>
      <div class="cart-item-qty"><button onclick="changeCartQty(${c.id},-1)">−</button><span>${c.qty}</span><button onclick="changeCartQty(${c.id},1)">+</button></div></div>
      <button class="cart-item-remove" onclick="removeFromCart(${c.id})"><i class="fa-solid fa-trash"></i></button></div>`;
  }).join('');
  footerEl.style.display = 'block';
  totalEl.textContent = fmt(total);
}
function toggleCart() {
  $('cart-sidebar').classList.toggle('active');
  $('cart-overlay').classList.toggle('active');
}
function checkoutCart() {
  if(cart.length===0) { showToast('Giỏ hàng trống!','error'); return; }
  if(!currentUser) { showToast('Vui lòng đăng nhập để thanh toán!','error'); toggleCart(); openAuthModal('login'); return; }
  const total = cart.reduce((s,c)=>{const p=products.find(x=>x.id===c.id);return s+(p?p.price*c.qty:0);},0);
  cart.forEach(c=>{const p=products.find(x=>x.id===c.id);if(p){p.stock-=c.qty;p.sold+=c.qty;}});
  cart=[]; updateCartUI(); toggleCart(); renderProducts();
  showToast(`✅ Thanh toán ${fmt(total)} thành công!`,'success');
}

// ===== AUTH =====
function openAuthModal(tab) {
  $('auth-modal').classList.add('active');
  switchAuthTab(tab||'login');
}
function closeAuthModal() { $('auth-modal').classList.remove('active'); }
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  $('login-form').style.display = tab==='login'?'block':'none';
  $('register-form').style.display = tab==='register'?'block':'none';
}
function togglePassword(inputId, btn) {
  const inp = $(inputId); const icon = btn.querySelector('i');
  if(inp.type==='password'){inp.type='text';icon.className='fa-solid fa-eye-slash';}
  else{inp.type='password';icon.className='fa-solid fa-eye';}
}
function handleLogin(e) {
  e.preventDefault();
  const email=$('login-email').value, pw=$('login-password').value;
  if(!email||!pw){showToast('Vui lòng nhập đầy đủ!','error');return;}
  currentUser = { username: email.split('@')[0], email, balance: 500000 };
  closeAuthModal(); updateAuthUI();
  showToast(`🎉 Chào mừng ${currentUser.username}!`,'success');
}
function handleRegister(e) {
  e.preventDefault();
  const u=$('reg-username').value, em=$('reg-email').value, pw=$('reg-password').value, pw2=$('reg-password-confirm').value;
  if(!u||!em||!pw){showToast('Vui lòng nhập đầy đủ!','error');return;}
  if(pw!==pw2){showToast('Mật khẩu không khớp!','error');return;}
  if(pw.length<6){showToast('Mật khẩu tối thiểu 6 ký tự!','error');return;}
  currentUser = { username: u, email: em, balance: 0 };
  closeAuthModal(); updateAuthUI();
  showToast(`✅ Đăng ký thành công! Chào ${u}!`,'success');
}
function logout() {
  currentUser = null; updateAuthUI();
  showToast('Đã đăng xuất!','info');
}
function updateAuthUI() {
  const area = $('auth-area'), sidebar = $('sidebar-auth-buttons');
  if(currentUser) {
    area.innerHTML = `<div style="display:flex;align-items:center;gap:10px;">
      <span style="font-size:13px;color:var(--text-muted);">💰 <strong style="color:var(--green);">${fmt(currentUser.balance)}</strong></span>
      <a class="btn-login" href="#" onclick="logout();return false" style="background:var(--red);font-size:12px;padding:6px 14px;"><i class="fa-solid fa-right-from-bracket"></i> Thoát</a></div>`;
    sidebar.innerHTML = `<div class="user-panel">
      <div class="user-avatar">${currentUser.username[0].toUpperCase()}</div>
      <div class="user-name">${currentUser.username}</div>
      <div class="user-balance">Số dư: <strong>${fmt(currentUser.balance)}</strong></div>
      <div class="user-actions">
        <a class="user-action-btn" onclick="openDepositModal();return false"><i class="fa-solid fa-plus-circle" style="color:var(--green);"></i> Nạp tiền</a>
        <a class="user-action-btn" href="#"><i class="fa-solid fa-receipt" style="color:var(--primary);"></i> Đơn hàng</a>
        <a class="user-action-btn btn-logout" onclick="logout();return false"><i class="fa-solid fa-right-from-bracket"></i> Đăng xuất</a>
      </div></div>`;
  } else {
    area.innerHTML = '<a class="btn-login" href="#" onclick="openAuthModal(\'login\');return false"><i class="fa-solid fa-right-to-bracket"></i> Đăng nhập</a>';
    sidebar.innerHTML = '<a class="btn-auth login" href="#" onclick="openAuthModal(\'login\');return false"><i class="fa-solid fa-right-to-bracket"></i> ĐĂNG NHẬP</a><a class="btn-auth register" href="#" onclick="openAuthModal(\'register\');return false"><i class="fa-solid fa-user-plus"></i> ĐĂNG KÝ</a>';
  }
}

// ===== DEPOSIT =====
function openDepositModal() { $('deposit-modal').classList.add('active'); }
function closeDepositModal() { $('deposit-modal').classList.remove('active'); }
function selectDepositMethod(m, btn) {
  document.querySelectorAll('.deposit-method').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}
function selectAmount(a, btn) {
  selectedDepositAmount = a;
  document.querySelectorAll('.amount-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}
function confirmDeposit() {
  const custom = +($('custom-amount')?.value || 0);
  const amount = custom > 0 ? custom : selectedDepositAmount;
  if(!currentUser){showToast('Vui lòng đăng nhập trước!','error');closeDepositModal();openAuthModal('login');return;}
  currentUser.balance += amount;
  showToast(`✅ Nạp ${fmt(amount)} thành công! Số dư: ${fmt(currentUser.balance)}`,'success');
  closeDepositModal(); updateAuthUI();
}

// ===== TOAST =====
function showToast(msg, type) {
  const t = $('toast'); t.textContent = msg; t.className = `toast ${type||'success'} show`;
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ===== BACK TO TOP =====
window.addEventListener('scroll', () => {
  const b = $('back-top'); if(!b) return;
  b.style.display = window.scrollY > 300 ? 'flex' : 'none';
});

// ===== CLOSE MODALS ON OVERLAY =====
document.addEventListener('click', e => {
  if(e.target.id==='buy-modal') closeModal();
  if(e.target.id==='auth-modal') closeAuthModal();
  if(e.target.id==='detail-modal') closeDetailModal();
  if(e.target.id==='deposit-modal') closeDepositModal();
});

// ===== ADMIN CREDENTIALS =====
const ADMIN_USER='admin',ADMIN_PASS='admin123';
let isAdmin=false;

// ===== SHOP SETTINGS =====
const defaultShopSettings={shopName:'CloudPhone Shop',shopDesc:'Cung cấp điện thoại ảo Android, iOS, Windows chất lượng cao.',email:'support@cloudphone.vn',phone:'0123.456.789',discord:'discord.gg/cloudphone',telegram:'t.me/cloudphone',zalo:'0123.456.789',bankName:'VIETCOMBANK',bankNumber:'1234 5678 9012',bankHolder:'CLOUDPHONE SHOP',webhook:''};
let shopSettings={...defaultShopSettings};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadState(); loadShopSettings(); applyShopSettings(); renderProducts(); renderRecent(); initParticles(); updateCartUI(); updateAuthUI(); animateHeroStats();
});

// ===== LOCALSTORAGE =====
function saveState(){localStorage.setItem('cp_user',JSON.stringify(currentUser));localStorage.setItem('cp_cart',JSON.stringify(cart));localStorage.setItem('cp_orders',JSON.stringify(orderHistory));localStorage.setItem('cp_admin',isAdmin?'1':'0');}
function loadState(){
  try{const u=localStorage.getItem('cp_user');if(u)currentUser=JSON.parse(u);
  const c=localStorage.getItem('cp_cart');if(c)cart=JSON.parse(c);
  const o=localStorage.getItem('cp_orders');if(o)orderHistory=JSON.parse(o);
  isAdmin=localStorage.getItem('cp_admin')==='1';}catch(e){}
}
function loadShopSettings(){try{const s=localStorage.getItem('cp_shop');if(s)shopSettings={...defaultShopSettings,...JSON.parse(s)};}catch(e){}}
function saveShopSettings(){localStorage.setItem('cp_shop',JSON.stringify(shopSettings));}
let orderHistory=[];

// ===== HERO STATS ANIMATION =====
function animateHeroStats(){
  document.querySelectorAll('.hero-stat-num').forEach(el=>{
    const target=+el.dataset.count;let current=0;
    const step=Math.max(1,Math.floor(target/60));
    const timer=setInterval(()=>{current+=step;if(current>=target){current=target;clearInterval(timer);}
    el.textContent=current.toLocaleString();},30);
  });
}
function scrollToProducts(){document.getElementById('products-section')?.scrollIntoView({behavior:'smooth'});}

// ===== PAGE NAVIGATION =====
function switchPage(page){
  if(page==='admin'&&!isAdmin){promptAdminLogin();return;}
  document.querySelectorAll('.page-section').forEach(s=>s.classList.remove('active'));
  const el=document.getElementById('page-'+page);if(el)el.classList.add('active');
  document.querySelectorAll('.navbar-link').forEach(l=>{l.classList.remove('active');if(l.dataset.page===page)l.classList.add('active');});
  const hero=document.getElementById('hero-banner');
  if(hero)hero.style.display=page==='home'?'block':'none';
  if(page==='orders')renderOrderHistory();
  if(page==='admin')renderAdmin();
  window.scrollTo({top:0,behavior:'smooth'});
}
function promptAdminLogin(){
  const u=prompt('🔐 Tên đăng nhập Admin:');if(!u)return;
  const p=prompt('🔑 Mật khẩu Admin:');if(!p)return;
  if(u===ADMIN_USER&&p===ADMIN_PASS){isAdmin=true;saveState();showToast('✅ Đăng nhập Admin thành công!','success');switchPage('admin');}
  else showToast('❌ Sai tài khoản Admin!','error');
}

// ===== ORDER HISTORY =====
function addOrder(productName,qty,total){
  orderHistory.unshift({id:'ORD-'+Date.now().toString(36).toUpperCase(),product:productName,qty,total,date:new Date().toLocaleString('vi-VN'),status:'success'});
  if(orderHistory.length>50)orderHistory.pop();saveState();
}
function renderOrderHistory(){
  const el=document.getElementById('orders-content');if(!el)return;
  if(!currentUser){el.innerHTML='<div class="empty-state"><i class="fa-solid fa-lock"></i><p>Vui lòng đăng nhập</p><small>Đăng nhập để xem lịch sử đơn hàng</small><br><button class="btn-confirm" style="margin-top:16px;width:auto;padding:12px 32px;" onclick="openAuthModal(\'login\')">Đăng nhập</button></div>';return;}
  if(orderHistory.length===0){el.innerHTML='<div class="empty-state"><i class="fa-solid fa-box-open"></i><p>Chưa có đơn hàng nào</p><small>Hãy mua sản phẩm đầu tiên!</small></div>';return;}
  el.innerHTML='<table class="orders-table"><thead><tr><th>Mã đơn</th><th>Sản phẩm</th><th>SL</th><th>Tổng tiền</th><th>Thời gian</th><th>Trạng thái</th></tr></thead><tbody>'+orderHistory.map(o=>'<tr><td style="color:var(--primary);font-weight:600;">'+o.id+'</td><td>'+o.product+'</td><td>'+o.qty+'</td><td style="color:var(--green);font-weight:700;">'+fmt(o.total)+'</td><td style="color:var(--text-muted);">'+o.date+'</td><td><span class="status-badge status-'+o.status+'">'+(o.status==='success'?'✅ Hoàn thành':'⏳ Chờ')+'</span></td></tr>').join('')+'</tbody></table>';
}

// ===== ADMIN =====
function renderAdmin(){
  const statsEl=document.getElementById('admin-stats');
  const totalSold=products.reduce((s,p)=>s+p.sold,0);
  const totalStock=products.reduce((s,p)=>s+p.stock,0);
  const totalRevenue=products.reduce((s,p)=>s+p.price*p.sold,0);
  if(statsEl)statsEl.innerHTML=`
    <div class="admin-stat-card"><div class="stat-icon" style="background:rgba(59,130,246,0.15);color:var(--primary);"><i class="fa-solid fa-box"></i></div><div class="stat-value">${products.length}</div><div class="stat-label">Sản phẩm</div></div>
    <div class="admin-stat-card"><div class="stat-icon" style="background:rgba(34,197,94,0.15);color:var(--green);"><i class="fa-solid fa-bag-shopping"></i></div><div class="stat-value">${totalSold.toLocaleString()}</div><div class="stat-label">Đã bán</div></div>
    <div class="admin-stat-card"><div class="stat-icon" style="background:rgba(251,191,36,0.15);color:var(--yellow);"><i class="fa-solid fa-warehouse"></i></div><div class="stat-value">${totalStock.toLocaleString()}</div><div class="stat-label">Tồn kho</div></div>
    <div class="admin-stat-card"><div class="stat-icon" style="background:rgba(139,92,246,0.15);color:#8B5CF6;"><i class="fa-solid fa-coins"></i></div><div class="stat-value">${(totalRevenue/1000000).toFixed(1)}M</div><div class="stat-label">Doanh thu</div></div>`;
  switchAdminTab('products',document.querySelector('.admin-tab.active'));
}
function switchAdminTab(tab,btn){
  document.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));
  if(btn)btn.classList.add('active');
  const el=document.getElementById('admin-tab-content');if(!el)return;
  if(tab==='products'){
    el.innerHTML='<table class="admin-table"><thead><tr><th>ID</th><th>Tên</th><th>Loại</th><th>Giá</th><th>Kho</th><th>Đã bán</th><th>Thao tác</th></tr></thead><tbody>'+products.map(p=>'<tr><td>#'+p.id+'</td><td style="font-weight:600;">'+p.name+'</td><td><span class="status-badge status-success">'+p.category+'</span></td><td style="color:var(--primary);font-weight:700;">'+fmt(p.price)+'</td><td>'+p.stock+'</td><td style="color:var(--green);">'+p.sold.toLocaleString()+'</td><td><button class="btn-admin" onclick="adminEditStock('+p.id+')"><i class="fa-solid fa-pen"></i> Sửa</button></td></tr>').join('')+'</tbody></table>';
  }else if(tab==='orders'){
    el.innerHTML=orderHistory.length?'<table class="admin-table"><thead><tr><th>Mã</th><th>SP</th><th>SL</th><th>Tổng</th><th>Ngày</th><th>TT</th></tr></thead><tbody>'+orderHistory.map(o=>'<tr><td style="color:var(--primary);">'+o.id+'</td><td>'+o.product+'</td><td>'+o.qty+'</td><td style="color:var(--green);font-weight:700;">'+fmt(o.total)+'</td><td style="color:var(--text-muted);font-size:12px;">'+o.date+'</td><td><span class="status-badge status-'+o.status+'">'+(o.status==='success'?'✅':'⏳')+'</span></td></tr>').join('')+'</tbody></table>':'<div class="empty-state"><i class="fa-solid fa-receipt"></i><p>Chưa có đơn hàng</p></div>';
  }else if(tab==='users'){
    el.innerHTML='<div class="admin-card"><h4><i class="fa-solid fa-users" style="color:var(--primary);"></i> Danh sách người dùng</h4>'+(currentUser?'<table class="admin-table"><thead><tr><th>Username</th><th>Email</th><th>Số dư</th><th>Đơn hàng</th></tr></thead><tbody><tr><td style="font-weight:600;">'+currentUser.username+'</td><td style="color:var(--text-muted);">'+currentUser.email+'</td><td style="color:var(--green);font-weight:700;">'+fmt(currentUser.balance)+'</td><td>'+orderHistory.length+'</td></tr></tbody></table>':'<p style="color:var(--text-muted);">Chưa có user đăng nhập</p>')+'</div>';
  }else{
    const s=shopSettings;const fi=(id,lb,val,ph)=>'<div class="field"><label style="display:block;font-size:13px;color:var(--text-muted);margin-bottom:6px;">'+lb+'</label><input id="set-'+id+'" style="width:100%;padding:10px 14px;border-radius:8px;border:1px solid var(--border);background:rgba(40,40,40,0.9);color:var(--text);font-size:14px;outline:none;" value="'+(val||'')+'" placeholder="'+(ph||'')+'"></div>';
    el.innerHTML='<div class="admin-card"><h4><i class="fa-solid fa-store" style="color:var(--primary);"></i> Thông tin Shop</h4><div style="display:grid;gap:12px;">'+fi('shopName','Tên shop',s.shopName,'')+fi('shopDesc','Mô tả shop',s.shopDesc,'')+'</div></div>'+
    '<div class="admin-card"><h4><i class="fa-solid fa-address-book" style="color:var(--green);"></i> Liên hệ</h4><div style="display:grid;gap:12px;grid-template-columns:1fr 1fr;">'+fi('email','Email',s.email,'support@shop.vn')+fi('phone','Số điện thoại',s.phone,'0123.456.789')+fi('discord','Discord',s.discord,'discord.gg/...')+fi('telegram','Telegram',s.telegram,'t.me/...')+fi('zalo','Zalo',s.zalo,'0123.456.789')+'</div></div>'+
    '<div class="admin-card"><h4><i class="fa-solid fa-building-columns" style="color:var(--yellow);"></i> Thông tin ngân hàng</h4><div style="display:grid;gap:12px;grid-template-columns:1fr 1fr 1fr;">'+fi('bankName','Tên ngân hàng',s.bankName,'VIETCOMBANK')+fi('bankNumber','Số tài khoản',s.bankNumber,'1234 5678 9012')+fi('bankHolder','Chủ tài khoản',s.bankHolder,'CLOUDPHONE SHOP')+'</div></div>'+
    '<div class="admin-card"><h4><i class="fa-solid fa-robot" style="color:#8B5CF6;"></i> Tích hợp</h4><div style="display:grid;gap:12px;">'+fi('webhook','Discord Webhook URL',s.webhook,'https://discord.com/api/webhooks/...')+'</div></div>'+
    '<button class="btn-confirm" style="width:auto;padding:14px 40px;" onclick="saveSettings()"><i class="fa-solid fa-save"></i> Lưu tất cả cài đặt</button> <button class="btn-confirm" style="width:auto;padding:14px 40px;background:var(--red);margin-left:12px;" onclick="adminLogout()"><i class="fa-solid fa-right-from-bracket"></i> Đăng xuất Admin</button>';
  }
}
function adminEditStock(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  const val=prompt('Nhập số lượng kho mới cho "'+p.name+'":',p.stock);
  if(val!==null&&!isNaN(+val)){p.stock=+val;renderAdmin();renderProducts();showToast('✅ Đã cập nhật kho: '+p.name,'success');}
}
function saveSettings(){
  ['shopName','shopDesc','email','phone','discord','telegram','zalo','bankName','bankNumber','bankHolder','webhook'].forEach(k=>{const el=document.getElementById('set-'+k);if(el)shopSettings[k]=el.value;});
  saveShopSettings();applyShopSettings();showToast('✅ Đã lưu tất cả cài đặt!','success');
}
function adminLogout(){isAdmin=false;saveState();switchPage('home');showToast('Đã đăng xuất Admin','info');}
function applyShopSettings(){
  const s=shopSettings;
  document.title=s.shopName+' - Điện Thoại Ảo Giá Rẻ';
  document.querySelectorAll('.header-logo,.footer-logo').forEach(el=>{const parts=s.shopName.split(' ');el.innerHTML=(el.classList.contains('header-logo')?'<i class="fa-solid fa-cloud"></i> ':'')+parts[0]+'<span>'+(parts.slice(1).join(' ')||'')+'</span>';});
  const desc=document.querySelector('.announce-card p:first-child');if(desc)desc.innerHTML='<strong>'+s.shopName+'</strong> — '+s.shopDesc;
  const bankCard=document.querySelector('.bank-card-number');if(bankCard)bankCard.textContent=s.bankNumber;
  const bankName=document.querySelector('.bank-name');if(bankName)bankName.textContent=s.bankName;
  const bankHolder=document.querySelector('.bank-card-holder');if(bankHolder)bankHolder.textContent=s.bankHolder;
  const contacts=document.querySelectorAll('.footer-contact li');if(contacts[0])contacts[0].innerHTML='<i class="fa-solid fa-envelope"></i> '+s.email;if(contacts[1])contacts[1].innerHTML='<i class="fa-solid fa-phone"></i> '+s.phone;if(contacts[2])contacts[2].innerHTML='<i class="fa-brands fa-discord"></i> '+s.discord;
  const sidebar=document.querySelectorAll('.sidebar-card:last-child div p');if(sidebar[0])sidebar[0].innerHTML='<i class="fa-brands fa-discord" style="color:#5865F2;"></i> '+s.discord;if(sidebar[1])sidebar[1].innerHTML='<i class="fa-brands fa-telegram" style="color:#26A5E4;"></i> '+s.telegram;if(sidebar[2])sidebar[2].innerHTML='<i class="fa-solid fa-phone" style="color:var(--green);"></i> Zalo: '+s.zalo;
}

// ===== PATCH confirmBuy to save order =====
const _origConfirmBuy=confirmBuy;
confirmBuy=function(){
  const pid=+$('modal-product-id').value,qty=+$('modal-qty').value,p=products.find(x=>x.id===pid);
  if(!p)return;
  addOrder(p.name,qty,p.price*qty);
  showToast(`✅ Đã mua ${qty}x ${p.name} thành công!`,'success');
  p.stock-=qty;p.sold+=qty;closeModal();renderProducts();saveState();
};

// ===== PATCH checkoutCart to save orders =====
const _origCheckout=checkoutCart;
checkoutCart=function(){
  if(cart.length===0){showToast('Giỏ hàng trống!','error');return;}
  if(!currentUser){showToast('Vui lòng đăng nhập!','error');toggleCart();openAuthModal('login');return;}
  const total=cart.reduce((s,c)=>{const p=products.find(x=>x.id===c.id);return s+(p?p.price*c.qty:0);},0);
  cart.forEach(c=>{const p=products.find(x=>x.id===c.id);if(p){addOrder(p.name,c.qty,p.price*c.qty);p.stock-=c.qty;p.sold+=c.qty;}});
  cart=[];updateCartUI();toggleCart();renderProducts();saveState();
  showToast(`✅ Thanh toán ${fmt(total)} thành công!`,'success');
};

// ===== PATCH login/register to save =====
const _origLogin=handleLogin,_origRegister=handleRegister,_origLogout=logout,_origDeposit=confirmDeposit;
handleLogin=function(e){e.preventDefault();const email=$('login-email').value,pw=$('login-password').value;if(!email||!pw){showToast('Nhập đầy đủ!','error');return;}currentUser={username:email.split('@')[0],email,balance:500000};closeAuthModal();updateAuthUI();saveState();showToast(`🎉 Chào ${currentUser.username}!`,'success');};
handleRegister=function(e){e.preventDefault();const u=$('reg-username').value,em=$('reg-email').value,pw=$('reg-password').value,pw2=$('reg-password-confirm').value;if(!u||!em||!pw){showToast('Nhập đầy đủ!','error');return;}if(pw!==pw2){showToast('Mật khẩu không khớp!','error');return;}currentUser={username:u,email:em,balance:0};closeAuthModal();updateAuthUI();saveState();showToast(`✅ Đăng ký thành công!`,'success');};
logout=function(){currentUser=null;orderHistory=[];updateAuthUI();saveState();showToast('Đã đăng xuất!','info');};
confirmDeposit=function(){const custom=+($('custom-amount')?.value||0);const amount=custom>0?custom:selectedDepositAmount;if(!currentUser){showToast('Đăng nhập trước!','error');closeDepositModal();openAuthModal('login');return;}currentUser.balance+=amount;addTransaction('+'+fmt(amount),'Nạp tiền','success');addActivityLog('Nạp '+fmt(amount)+' vào tài khoản');showToast(`✅ Nạp ${fmt(amount)} thành công!`,'success');closeDepositModal();updateAuthUI();saveState();};

// ===== FAVORITES =====
let favorites=[];
function loadFavorites(){try{const f=localStorage.getItem('cp_favs');if(f)favorites=JSON.parse(f);}catch(e){}}
function saveFavorites(){localStorage.setItem('cp_favs',JSON.stringify(favorites));}
function toggleFav(id){
  const i=favorites.indexOf(id);
  if(i>=0)favorites.splice(i,1);else favorites.push(id);
  saveFavorites();renderProducts();updateFavCount();
  showToast(i>=0?'Đã bỏ yêu thích':'❤️ Đã thêm vào yêu thích',i>=0?'info':'success');
}
function updateFavCount(){const el=$('fav-count');if(el){el.textContent=favorites.length;el.style.display=favorites.length>0?'flex':'none';}}
function renderFavorites(){
  const el=document.getElementById('favorites-content');if(!el)return;
  const favProducts=products.filter(p=>favorites.includes(p.id));
  if(favProducts.length===0){el.innerHTML='<div class="empty-state"><i class="fa-solid fa-heart-crack"></i><p>Chưa có sản phẩm yêu thích</p><small>Nhấn ❤️ trên sản phẩm để thêm</small></div>';return;}
  el.innerHTML='<div class="products-grid">'+favProducts.map(p=>'<div class="product-card"><h6 class="product-name"><a href="#" onclick="openDetail('+p.id+');return false">'+p.name+'</a></h6><div class="product-labels"><span class="label-stock">Kho: <b>'+p.stock+'</b></span><span class="label-sold">Đã bán: <b>'+p.sold.toLocaleString()+'</b></span></div><div class="product-price">'+fmt(p.price)+'</div><div class="product-actions"><button class="btn-fav active" onclick="toggleFav('+p.id+')"><i class="fa-solid fa-heart"></i></button><button class="btn-buy" style="flex:1;" onclick="openBuyModal('+p.id+')">Mua Ngay</button></div></div>').join('')+'</div>';
}

// ===== TRANSACTIONS =====
let transactions=[];
function loadTransactions(){try{const t=localStorage.getItem('cp_tx');if(t)transactions=JSON.parse(t);}catch(e){}}
function saveTransactions(){localStorage.setItem('cp_tx',JSON.stringify(transactions));}
function addTransaction(amount,desc,type){
  transactions.unshift({amount,desc,type,date:new Date().toLocaleString('vi-VN')});
  if(transactions.length>100)transactions.pop();saveTransactions();
}
function renderTransactions(){
  const el=document.getElementById('transactions-content');if(!el)return;
  if(!currentUser){el.innerHTML='<div class="empty-state"><i class="fa-solid fa-lock"></i><p>Đăng nhập để xem</p></div>';return;}
  if(transactions.length===0){el.innerHTML='<div class="empty-state"><i class="fa-solid fa-wallet"></i><p>Chưa có giao dịch</p></div>';return;}
  el.innerHTML='<table class="orders-table"><thead><tr><th>Thời gian</th><th>Mô tả</th><th>Số tiền</th><th>Loại</th></tr></thead><tbody>'+transactions.map(t=>'<tr><td style="color:var(--text-muted);font-size:12px;">'+t.date+'</td><td>'+t.desc+'</td><td class="'+(t.type==='success'?'tx-positive':'tx-negative')+'">'+t.amount+'</td><td><span class="status-badge status-'+t.type+'">'+(t.type==='success'?'✅ Cộng':'🔻 Trừ')+'</span></td></tr>').join('')+'</tbody></table>';
}

// ===== ACTIVITY LOG =====
let activityLog=[];
function loadActivityLog(){try{const a=localStorage.getItem('cp_activity');if(a)activityLog=JSON.parse(a);}catch(e){}}
function saveActivityLog(){localStorage.setItem('cp_activity',JSON.stringify(activityLog));}
function addActivityLog(action){
  activityLog.unshift({action,date:new Date().toLocaleString('vi-VN')});
  if(activityLog.length>100)activityLog.pop();saveActivityLog();
}
function renderActivity(){
  const el=document.getElementById('activity-content');if(!el)return;
  if(!currentUser){el.innerHTML='<div class="empty-state"><i class="fa-solid fa-lock"></i><p>Đăng nhập để xem</p></div>';return;}
  if(activityLog.length===0){el.innerHTML='<div class="empty-state"><i class="fa-solid fa-list-check"></i><p>Chưa có hoạt động</p></div>';return;}
  el.innerHTML='<table class="orders-table"><thead><tr><th>Thời gian</th><th>Hoạt động</th></tr></thead><tbody>'+activityLog.map(a=>'<tr><td style="color:var(--text-muted);font-size:12px;">'+a.date+'</td><td>'+a.action+'</td></tr>').join('')+'</tbody></table>';
}

// ===== WELCOME POPUP =====
function showWelcomePopup(){
  if(localStorage.getItem('cp_no_welcome')==='1')return;
  setTimeout(()=>$('welcome-modal')?.classList.add('active'),800);
}
function closeWelcomeModal(){
  $('welcome-modal')?.classList.remove('active');
  if($('no-show-welcome')?.checked)localStorage.setItem('cp_no_welcome','1');
}

// ===== FAQ =====
const faqData=[
  {q:'CloudPhone là gì?',a:'CloudPhone là điện thoại ảo chạy trên cloud, bạn có thể sử dụng Android, iOS, Windows mà không cần thiết bị vật lý. Online 24/7, truy cập từ bất kỳ đâu.'},
  {q:'Làm sao để mua sản phẩm?',a:'Đăng ký tài khoản → Nạp tiền → Chọn sản phẩm → Mua ngay. Hệ thống sẽ tự động cung cấp thông tin truy cập.'},
  {q:'Có được bảo hành không?',a:'Tất cả sản phẩm được bảo hành 7 ngày. Đổi trả 1-1 trong 24h nếu lỗi từ hệ thống.'},
  {q:'Thanh toán bằng cách nào?',a:'Hỗ trợ: Ngân hàng (tự động 24/7), MoMo, Thẻ cào, Crypto (Binance/USDT). Tỷ giá: 1$ = 26.000 VNĐ.'},
  {q:'Có API để quản lý không?',a:'Có! Chúng tôi cung cấp API RESTful để quản lý CloudPhone từ xa. Xem tài liệu tại mục Tài liệu API.'},
  {q:'Liên hệ hỗ trợ ở đâu?',a:'Discord: discord.gg/cloudphone | Telegram: t.me/cloudphone | Zalo: 0123.456.789. Hỗ trợ 24/7.'}
];
function renderFAQ(){
  const el=$('faq-body');if(!el)return;
  el.innerHTML=faqData.map((f,i)=>'<div class="faq-item" onclick="this.classList.toggle(\'open\')"><div class="faq-q"><span>'+f.q+'</span><i class="fa-solid fa-chevron-down"></i></div><div class="faq-a">'+f.a+'</div></div>').join('');
}

// ===== PATCH switchPage for new pages =====
const _origSwitchPage=switchPage;
switchPage=function(page){
  if(page==='admin'&&!isAdmin){promptAdminLogin();return;}
  document.querySelectorAll('.page-section').forEach(s=>s.classList.remove('active'));
  const el=document.getElementById('page-'+page);if(el)el.classList.add('active');
  document.querySelectorAll('.navbar-link').forEach(l=>{l.classList.remove('active');if(l.dataset.page===page)l.classList.add('active');});
  const hero=document.getElementById('hero-banner');
  if(hero)hero.style.display=page==='home'?'block':'none';
  if(page==='orders')renderOrderHistory();
  if(page==='admin')renderAdmin();
  if(page==='favorites')renderFavorites();
  if(page==='transactions')renderTransactions();
  if(page==='activity')renderActivity();
  window.scrollTo({top:0,behavior:'smooth'});
};

// ===== PATCH INIT to load new data =====
const _origDOMReady=true;
loadFavorites();loadTransactions();loadActivityLog();updateFavCount();renderFAQ();showWelcomePopup();

// ===== Close new modals on overlay click =====
document.addEventListener('click',e=>{if(e.target.id==='welcome-modal')closeWelcomeModal();if(e.target.id==='policy-modal')e.target.classList.remove('active');if(e.target.id==='faq-modal')e.target.classList.remove('active');});
