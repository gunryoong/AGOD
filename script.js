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
                opt.classList.remove('selected');
                opt.style.backgroundColor = '';
                opt.style.fontWeight = 'normal';
                opt.style.color = '';
                opt.style.borderColor = '';
            });
            option.classList.add('selected');
            // Styles handled by CSS class .selected, but keeping inline removal for safety
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

    // Old Add to Bag Logic Removed

    // Tab Switching Logic
    const tabItems = document.querySelectorAll('.tab-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            tabItems.forEach(tab => tab.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active to clicked
            item.classList.add('active');
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Total Price Logic
    const totalPriceElement = document.querySelector('.total-price');
    const productPrice = 109900;

    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // ... existing selection logic ...
            totalPriceElement.textContent = `${productPrice.toLocaleString()} KRW`;
        });
    });

    // Buy Now & Add to Bag
    const btnBuyNow = document.querySelector('.btn-buy-now');
    const btnAddToBagNew = document.querySelector('.btn-add-to-bag');

    function handleAddToCart(isBuyNow) {
        const selectedSize = Array.from(sizeOptions).find(opt => opt.classList.contains('selected') || opt.style.fontWeight === '600');

        if (selectedSize) {
            const sizeText = selectedSize.textContent.split(' ')[0];
            if (isBuyNow) {
                alert(`Proceeding to checkout with size ${sizeText}`);
            } else {
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
            }
        } else {
            alert('Please select a size.');
        }
    }

    if (btnBuyNow) {
        btnBuyNow.addEventListener('click', () => handleAddToCart(true));
    }

    if (btnAddToBagNew) {
        btnAddToBagNew.addEventListener('click', () => handleAddToCart(false));
    }
});

// ===== 클릭 & 드래그로 가로 스크롤 =====
const bottomScroll = document.querySelector('.bottom-banner-scroll');

let isDown = false;
let startX;
let scrollLeft;

if (bottomScroll) {
    bottomScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        bottomScroll.classList.add('active');
        startX = e.pageX - bottomScroll.offsetLeft;
        scrollLeft = bottomScroll.scrollLeft;
    });

    bottomScroll.addEventListener('mouseleave', () => {
        isDown = false;
        bottomScroll.classList.remove('active');
    });

    bottomScroll.addEventListener('mouseup', () => {
        isDown = false;
        bottomScroll.classList.remove('active');
    });

    bottomScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - bottomScroll.offsetLeft;
        const walk = (x - startX) * 1.5; // 드래그 속도
        bottomScroll.scrollLeft = scrollLeft - walk;
    });
}

// ===== Mix and Match Slider =====
const mixMatchData = [
    {
        video: 'AGOD 25 F/V5FLWJ03_CHARCOAL+V5FLWP03_CHARCOAL.mov',
        poster: 'AGOD 25 F/V5FLWJ03_CHARCOAL+V5FLWP03_CHARCOAL.mov',
        left1: 'https://picsum.photos/400/500?random=201',
        left2: 'https://picsum.photos/400/500?random=202',
        right1: 'https://picsum.photos/400/500?random=203',
        right2: 'https://picsum.photos/400/500?random=204',
        navLeft: 'https://picsum.photos/400/900?random=400', // Preview of prev (index 2)
        navRight: 'https://picsum.photos/400/900?random=300' // Preview of next (index 1)
    },
    {
        video: 'https://videos.pexels.com/video-files/3205916/3205916-uhd_2160_3840_25fps.mp4',
        poster: 'https://picsum.photos/600/900?random=300',
        left1: 'https://picsum.photos/400/500?random=301',
        left2: 'https://picsum.photos/400/500?random=302',
        right1: 'https://picsum.photos/400/500?random=303',
        right2: 'https://picsum.photos/400/500?random=304',
        navLeft: 'AGOD 25 F/V5FLWJ03_CHARCOAL+V5FLWP03_CHARCOAL.mov', // Preview of prev (index 0) - using poster/image
        navRight: 'https://picsum.photos/600/900?random=400' // Preview of next (index 2)
    },
    {
        video: 'https://videos.pexels.com/video-files/5309381/5309381-uhd_2160_4096_25fps.mp4',
        poster: 'https://picsum.photos/600/900?random=400',
        left1: 'https://picsum.photos/400/500?random=401',
        left2: 'https://picsum.photos/400/500?random=402',
        right1: 'https://picsum.photos/400/500?random=403',
        right2: 'https://picsum.photos/400/500?random=404',
        navLeft: 'https://picsum.photos/600/900?random=300', // Preview of prev (index 1)
        navRight: 'AGOD 25 F/V5FLWJ03_CHARCOAL+V5FLWP03_CHARCOAL.mov' // Preview of next (index 0)
    }
];

let currentMixIndex = 0;

const mainVideo = document.getElementById('mainVideo');
const imgLeft1 = document.getElementById('imgLeft1');
const imgLeft2 = document.getElementById('imgLeft2');
const imgRight1 = document.getElementById('imgRight1');
const imgRight2 = document.getElementById('imgRight2');
const imgNavLeft = document.getElementById('imgNavLeft');
const imgNavRight = document.getElementById('imgNavRight');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

function updateMixMatch(index) {
    const data = mixMatchData[index];

    // Fade out
    const elements = [mainVideo, imgLeft1, imgLeft2, imgRight1, imgRight2, imgNavLeft, imgNavRight];
    elements.forEach(el => {
        if (el) el.style.opacity = '0';
    });

    setTimeout(() => {
        // Update content
        if (mainVideo) {
            mainVideo.src = data.video;
            mainVideo.poster = data.poster;
            mainVideo.load();
            mainVideo.play();
        }
        if (imgLeft1) imgLeft1.src = data.left1;
        if (imgLeft2) imgLeft2.src = data.left2;
        if (imgRight1) imgRight1.src = data.right1;
        if (imgRight2) imgRight2.src = data.right2;

        // Update Nav Images (Handle video paths by using poster or specific image)
        // For simplicity, if path ends in .mov or .mp4, we might want a poster, but here we used specific nav keys
        // Checking if data.navLeft is a video...
        if (imgNavLeft) {
            if (data.navLeft.endsWith('.mov') || data.navLeft.endsWith('.mp4')) {
                // Use a static image for video preview if possible, or just the poster of that video
                // For this demo, I'll assume the poster is available or just use the string if it's an image.
                // Let's just use the string.
                imgNavLeft.src = 'https://picsum.photos/400/900?random=999'; // Fallback for video
            } else {
                imgNavLeft.src = data.navLeft;
            }
        }
        if (imgNavRight) {
            if (data.navRight.endsWith('.mov') || data.navRight.endsWith('.mp4')) {
                imgNavRight.src = 'https://picsum.photos/400/900?random=999';
            } else {
                imgNavRight.src = data.navRight;
            }
        }

        // Fade in
        elements.forEach(el => {
            if (el) el.style.opacity = '1';
        });
    }, 300);
}

if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
        currentMixIndex = (currentMixIndex - 1 + mixMatchData.length) % mixMatchData.length;
        updateMixMatch(currentMixIndex);
    });

    btnNext.addEventListener('click', () => {
        currentMixIndex = (currentMixIndex + 1) % mixMatchData.length;
        updateMixMatch(currentMixIndex);
    });

    // Initialize transition styles
    [mainVideo, imgLeft1, imgLeft2, imgRight1, imgRight2, imgNavLeft, imgNavRight].forEach(el => {
        if (el) el.style.transition = 'opacity 0.3s ease-in-out';
    });
}
