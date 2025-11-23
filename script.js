document.addEventListener('DOMContentLoaded', () => {
    console.log('AGOD Redesign Loaded');

    const header = document.querySelector('.site-header');
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const body = document.body;

    // Scroll effect for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    function toggleMenu() {
        body.classList.toggle('menu-open');
    }

    menuToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Product Page Interactivity
    const sizeOptions = document.querySelectorAll('.size-option');
    const colorOptions = document.querySelectorAll('.color-option');
    const btnAddToBag = document.querySelector('.btn-add-to-bag');

    // Size Selection
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => {
                opt.style.backgroundColor = '';
                opt.style.fontWeight = 'normal';
            });
            option.style.backgroundColor = '#f5f5f5';
            option.style.fontWeight = '600';
        });
    });

    // Color Selection
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    // Side Drawer Logic
    const drawerOverlay = document.getElementById('drawerOverlay');
    const sideDrawer = document.getElementById('sideDrawer');
    const drawerTitle = document.getElementById('drawerTitle');
    const drawerContent = document.getElementById('drawerContent');
    const drawerClose = document.getElementById('drawerClose');

    function openDrawer(title, contentHTML) {
        drawerTitle.textContent = title;
        drawerContent.innerHTML = contentHTML;
        drawerOverlay.classList.add('active');
        sideDrawer.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeDrawer() {
        drawerOverlay.classList.remove('active');
        sideDrawer.classList.remove('active');
        body.style.overflow = '';
    }

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // Add to Bag
    if (btnAddToBag) {
        btnAddToBag.addEventListener('click', () => {
            const selectedSize = Array.from(sizeOptions).find(opt => opt.style.fontWeight === '600');
            if (selectedSize) {
                const sizeText = selectedSize.textContent.split(' ')[0]; // Extract XS, S, etc.
                const content = `
                    <div class="cart-success-msg">장바구니에 담겼습니다</div>
                    <div class="cart-item-preview">
                        <img src="https://picsum.photos/850/1275?random=1" alt="Product" class="cart-item-img">
                        <div class="cart-item-details">
                            <div class="cart-item-name">후드 다운 패딩 점퍼</div>
                            <div class="cart-item-price">109,900 원</div>
                            <div class="cart-item-meta">먹색 | ${sizeText}</div>
                        </div>
                    </div>
                    <div class="cart-actions">
                        <a href="#" class="btn-view-cart">장바구니 보기</a>
                        <a href="#" class="btn-checkout">결제하기</a>
                    </div>
                `;
                openDrawer('장바구니 담기', content);
            } else {
                alert('사이즈를 선택해주세요.'); // Keep alert for error or use a toast/small drawer
            }
        });
    }

    // Footer Links (Dummy Content)
    const footerLinks = document.querySelectorAll('.footer-link-item');
    const dummyContent = {
        '소재 및 관리': `
            <p><strong>겉감</strong><br>100% 폴리에스터</p><br>
            <p><strong>안감</strong><br>100% 폴리에스터</p><br>
            <p><strong>충전재</strong><br>100% 폴리에스터</p><br>
            <p><strong>관리</strong><br>세탁기 사용 가능 (30도 이하)<br>표백제 사용 금지<br>다림질 금지<br>드라이클리닝 권장</p>
        `,
        '배송 및 반품': `
            <p><strong>배송</strong><br>무료 배송<br>주문일로부터 3-5일 이내 배송 (영업일 기준)</p><br>
            <p><strong>반품</strong><br>제품 수령 후 30일 이내 반품 가능<br>반품 배송비 무료 (단, 단순 변심의 경우 고객 부담일 수 있음)</p>
        `,
        '매장 내 재고 확인': `
            <p>현재 온라인 전용 상품입니다.</p><br>
            <p>가까운 매장의 재고 확인을 원하시면 고객센터(1234-5678)로 문의해 주시기 바랍니다.</p>
        `
    };

    footerLinks.forEach(link => {
        link.addEventListener('click', () => {
            const text = link.textContent.trim();
            if (dummyContent[text]) {
                openDrawer(text, dummyContent[text]);
            }
        });
    });
});
