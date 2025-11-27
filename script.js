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
                    <div class="cart-success-msg">ADDED TO BAG</div>
                    <div class="cart-item-preview">
                        <img src="https://picsum.photos/850/1275?random=1" alt="Product" class="cart-item-img">
                        <div class="cart-item-details">
                            <div class="cart-item-name">HOODED DOWN PUFFER JACKET</div>
                            <div class="cart-item-price">109,900 KRW</div>
                            <div class="cart-item-meta">CHARCOAL | ${sizeText}</div>
                        </div>
                    </div>
                    <div class="cart-actions">
                        <a href="#" class="btn-view-cart">VIEW BAG</a>
                        <a href="#" class="btn-checkout">CHECKOUT</a>
                    </div>
                `;
                openDrawer('ADD TO BAG', content);
            } else {
                alert('Please select a size.'); // Keep alert for error or use a toast/small drawer
            }
        });
    }

    // Footer Links (Dummy Content)
    const footerLinks = document.querySelectorAll('.footer-link-item');
    const dummyContent = {
        'MATERIALS & CARE': `
            <p><strong>OUTER SHELL</strong><br>100% POLYESTER</p><br>
            <p><strong>LINING</strong><br>100% POLYESTER</p><br>
            <p><strong>FILLING</strong><br>100% POLYESTER</p><br>
            <p><strong>CARE</strong><br>MACHINE WASH UP TO 30ºC/86ºF GENTLE CYCLE<br>DO NOT BLEACH<br>DO NOT IRON<br>DRY CLEAN RECOMMENDED</p>
        `,
        'SHIPPING & RETURNS': `
            <p><strong>SHIPPING</strong><br>FREE SHIPPING<br>DELIVERY WITHIN 3-5 BUSINESS DAYS</p><br>
            <p><strong>RETURNS</strong><br>RETURN WITHIN 30 DAYS OF RECEIPT<br>FREE RETURN SHIPPING (EXCEPT FOR CHANGE OF MIND)</p>
        `,
        'STORE AVAILABILITY': `
            <p>CURRENTLY ONLINE EXCLUSIVE.</p><br>
            <p>PLEASE CONTACT CUSTOMER SERVICE (1234-5678) FOR STORE AVAILABILITY.</p>
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
