/* ─────────────────────────────────────────

   DIV  —  script.js  (Updated)
   GSAP + ScrollTrigger 기반 스크롤 애니메이션
───────────────────────────────────────── */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ─── 네비 클릭 스무스 스크롤 ─── */
document.querySelectorAll('#navbar a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');
        window.location.href = href;
    });
});
/* ═══════════════════════════════════════
   2.HERO — 순차 애니메이션
═══════════════════════════════════════ */
const heroTl = gsap.timeline({ delay: 0.2 });

heroTl
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
    })
    .to('.hero-logo-wrap', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out'
    }, '-=0.3')
    .to('.hero-phone', {
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out'
    }, '-=0.4');

/* ═══════════════════════════════════════
   3.기부자 감소 — 스크롤 6단계 + 스포트라이트 + 말풍선
═══════════════════════════════════════ */

const bubbleSpeakerMap = {
    'bubble--1': 'person--2',
    'bubble--3': 'person--5',
    'bubble--2': 'person--7',
    'bubble--4': 'person--3',
};

const allPersons = document.querySelectorAll('.donors-people .person');
const overlay = document.querySelector('.donors-overlay');

function setSpotlight(speakerClass) {
    allPersons.forEach(p => {
        p.classList.remove('is-speaking', 'is-faded');
        if (speakerClass && p.classList.contains(speakerClass)) {
            p.classList.add('is-speaking');
        } else if (speakerClass) {
            p.classList.add('is-faded');
        }
    });
    if (overlay) {
        gsap.to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.out' });
    }
}

function clearSpotlight() {
    allPersons.forEach(p => p.classList.remove('is-speaking', 'is-faded'));
    if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.5, ease: 'power2.out' });
}

const donorsTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.section-donors',
        start: 'top top',
        end: '+=9000',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
            // 기존 코드 그대로
            const p = self.progress * 26;
            if (p < 3.5 || p >= 13.0) {
                clearSpotlight();
            } else if (p >= 10.5) {
                setSpotlight('person--3');
            } else if (p >= 8.0) {
                setSpotlight('person--5');
            } else if (p >= 5.5) {
                setSpotlight('person--7');
            } else if (p >= 3.5) {
                setSpotlight('person--2');
            }
        }
    }
});

donorsTl.to('.donors-text--1', { opacity: 1, duration: 0.5 }, 0);
donorsTl.to('.donors-text--1', { opacity: 0, duration: 0.5 }, 2.0);
donorsTl.to('.bubble--1', { opacity: 1, duration: 0.4 }, 3.5);
donorsTl.to('.bubble--1', { opacity: 0, duration: 0.4 }, 5.5);
donorsTl.to('.bubble--2', { opacity: 1, duration: 0.4 }, 6.5);
donorsTl.to('.bubble--2', { opacity: 0, duration: 0.4 }, 8.5);
donorsTl.to('.bubble--3', { opacity: 1, duration: 0.4 }, 9.5);
donorsTl.to('.bubble--3', { opacity: 0, duration: 0.4 }, 11.5);
donorsTl.to('.bubble--4', { opacity: 1, duration: 0.4 }, 12.5);
donorsTl.to('.bubble--4', { opacity: 0, duration: 0.4 }, 14.0);
donorsTl.to('.donors-people', { opacity: 0.12, duration: 0.5 }, 17.0);
donorsTl.to('.donors-text--2', { opacity: 1, duration: 0.5 }, 17.5);
donorsTl.to('.donors-text--2', { opacity: 0, duration: 0.5 }, 19.5);
donorsTl.to('.donors-people', { opacity: 0, duration: 0.5 }, 19.5);
donorsTl.to('.donors-text--3', { opacity: 1, duration: 0.5 }, 20.5);
donorsTl.to('.donors-text--3', { opacity: 0, duration: 0.5 }, 22.5);
donorsTl.to('.donors-text--4', { opacity: 1, duration: 0.5 }, 23.5);
donorsTl.to('.donors-text--4', { opacity: 0, duration: 0.5 }, 25.5);
donorsTl.to('.donors-text--5', { opacity: 1, duration: 0.5 }, 26.5);
donorsTl.to(overlay, { opacity: 0, duration: 1.0, ease: 'power2.out' }, 26.0);

/* ═══════════════════════════════════════
   5.DiV 소개 — 마스코트 아래서 위로 등장
═══════════════════════════════════════ */
gsap.fromTo('.ongi-mascot-img',
    { y: 200, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.ongi-mascot-img',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
        }
    }
);

/* ═══════════════════════════════════════
   8.Core Features
═══════════════════════════════════════ */

const cardRotations = [-8, -3, 3, 8];

gsap.utils.toArray('.feat-card').forEach((card, i) => {
    gsap.set(card, {
        opacity: 0,
        y: 180,
        rotation: cardRotations[i],
    });
});

const featureTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.section-features',
        start: 'top 0%',
        end: '+=1600',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
    }
});

gsap.utils.toArray('.feat-card').forEach((card, i) => {
    featureTl.to(card, {
        opacity: 1,
        y: 0,
        rotation: cardRotations[i],
        duration: 0.8,
        ease: 'power3.out',
    }, i * 0.9);
});

gsap.utils.toArray('.feat-card').forEach((card, i) => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -20,
            scale: 1.03,
            zIndex: 10,
            boxShadow: '0 40px 100px rgba(0,0,0,0.28)',
            duration: 0.3,
            ease: 'power2.out',
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            zIndex: i + 1,
            boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
            duration: 0.3,
            ease: 'power2.out',
        });
    });
});

/* ═══════════════════════════════════════
   11.세액공제 섹션 — GSAP ScrollTrigger
═══════════════════════════════════════ */

const taxSection = document.querySelector('.section-tax-flow-new');

if (taxSection) {
    const slot1 = document.getElementById('tax-slot-1');
    const slot2 = document.getElementById('tax-slot-2');
    const slot3 = document.getElementById('tax-slot-3');
    const slot4 = document.getElementById('tax-slot-4');
    const slot5 = document.getElementById('tax-slot-5');

    let hoverEnabled = false;

    document.querySelectorAll('.tax-phone-slot').forEach(slot => {
        const text = slot.querySelector('.tax-hover-text');
        const img = slot.id === 'tax-slot-4'
            ? document.getElementById('tax-img-2160')
            : slot.querySelector('.tax-phone-img') || slot.querySelector('.tax-result-phone');

        if (!text || !img) return;
    });
}

/* ═══════════════════════════════════════
   14.결제 화면 — 스크롤 고정 + 순차 등장
═══════════════════════════════════════ */
const paymentTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.section-payment',
        start: 'top top',
        end: '+=1500',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
    }
});

paymentTl.to('.showcase-phone-center', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
});

paymentTl.to('.desc-right-top', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
}, '+=0.3');

paymentTl.to('.desc-left-bottom', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
}, '+=0.5');

/* ═══════════════════════════════════════
   디자인 루프 — iconBox.png 무한반복
═══════════════════════════════════════ */
const designTrack = document.getElementById('designTrack');
if (designTrack) { }

/* ═══════════════════════════════════════
   상단 버튼 표시
═══════════════════════════════════════ */
const toTopBtn = document.getElementById('toTopBtn');
gsap.set(toTopBtn, { opacity: 0, y: 20 });

ScrollTrigger.create({
    start: 'top -10%',
    onEnter: () => gsap.to(toTopBtn, { opacity: 1, y: 0, duration: 0.3 }),
    onLeaveBack: () => gsap.to(toTopBtn, { opacity: 0, y: 20, duration: 0.3 }),
});

/* ═══════════════════════════════════════
   4.체험 섹션 — 폰 이동 + 원/말풍선 인터랙션
═══════════════════════════════════════ */

const bubbleTexts = {
    home:     '탐색탭을 눌러보세요!',
    explore:  '카테고리를 선택해보세요!',
    category: '기부처를 눌러보세요!',
    detail:   '자세히 알아보기를 눌러보세요!',
    payment:  '기부하기를 눌러보세요!',
    password: '비밀번호를 입력해보세요!',
};

let pwInput = [];

function updateBubble(step) {
    const el = document.getElementById('expBubbleText');
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px)';
    setTimeout(() => {
        el.textContent = bubbleTexts[step] || '';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }, 200);
}

function shiftPhone(shifted) {
    const outer   = document.getElementById('expPhoneOuter');
    const circle  = document.getElementById('expCircle');
    const bubble  = document.getElementById('expBubble');
    const dotline = document.getElementById('expDotline');
    const dot     = document.getElementById('expDot');
    const method  = shifted ? 'add' : 'remove';

    outer  && outer.classList[method]('shifted');
    circle && circle.classList[method]('shifted');
    bubble && bubble.classList[method]('visible');
    dotline && dotline.classList[method]('visible');
    dot    && dot.classList[method]('visible');
}

function goTo(step, opts) {
    const vp = document.getElementById('app-viewport');
    const guideText = document.querySelector('.exp-guide-text');

    vp.innerHTML = '';
    vp.scrollTop = 0;

    if (step === 'home') {
        if (guideText) guideText.style.opacity = '1';
        shiftPhone(false);
        renderHome(vp);
    } else {
        if (guideText) guideText.style.opacity = '0';
        shiftPhone(true);
        updateBubble(step);

        if (step === 'explore')       renderExplore(vp);
        else if (step === 'category') renderCategory(vp, opts);
        else if (step === 'detail')   renderDetail(vp, opts);
        else if (step === 'payment')  renderPayment(vp);
        else if (step === 'password') renderPassword(vp);
    }

    const first = vp.firstElementChild;
    if (first) {
        first.style.opacity = '0';
        first.style.transition = 'opacity 0.2s';
        requestAnimationFrame(() => { first.style.opacity = '1'; });
    }
}

function renderHome(vp) {
    vp.innerHTML = `
    <div style="position:relative;width:100%;">
        <img src="${IMG.home}" alt="홈" style="width:100%;display:block;pointer-events:none;user-select:none;">
        <div onclick="goTo('explore')" style="position:absolute;top:56.5%;left:5%;width:90%;height:8%;background:transparent;cursor:pointer;border-radius:14px;z-index:10;"></div>
        <div onclick="goTo('explore')" style="position:absolute;top:67.5%;left:3%;width:28%;height:8%;background:transparent;cursor:pointer;z-index:10;"></div>
        <div onclick="goTo('explore')" style="position:absolute;top:67.5%;left:36%;width:28%;height:8%;background:transparent;cursor:pointer;z-index:10;"></div>
        <div onclick="goTo('explore')" style="position:absolute;top:67.5%;left:68%;width:28%;height:8%;background:transparent;cursor:pointer;z-index:10;"></div>
        <div onclick="goTo('explore')" style="position:absolute;top:91%;left:33%;width:34%;height:7%;background:transparent;cursor:pointer;z-index:10;"></div>
    </div>`;
}

function renderExplore(vp) {
    vp.innerHTML = `
    <div style="position:relative;width:100%;">
        <img src="${IMG.explore}" alt="탐색" style="width:100%;display:block;pointer-events:none;user-select:none;">
        <div onclick="goTo('home')" style="position:absolute;top:1.5%;left:2%;width:12%;height:4%;background:transparent;cursor:pointer;z-index:10;"></div>
        ${[
        ['11%','3%'],['11%','52%'],['25%','3%'],['25%','52%'],
        ['39%','3%'],['39%','52%'],['53%','3%'],['53%','52%'],
        ['67%','3%'],['67%','52%']
    ].map(([t,l]) => `<div onclick="goTo('category',{label:'카테고리'})" style="position:absolute;top:${t};left:${l};width:45%;height:12%;background:transparent;cursor:pointer;border-radius:12px;z-index:10;"></div>`).join('')}
    </div>`;
}

function renderCategory(vp, opts) {
    vp.innerHTML = `
    <div style="position:relative;width:100%;">
        <img src="${IMG.category}" alt="목록" style="width:100%;display:block;pointer-events:none;user-select:none;">
        <div onclick="goTo('explore')" style="position:absolute;top:1.5%;left:2%;width:12%;height:4%;background:transparent;cursor:pointer;z-index:10;"></div>
        <div onclick="goTo('detail',{idx:0})" style="position:absolute;top:22%;left:2%;width:96%;height:20%;background:transparent;cursor:pointer;border-radius:12px;z-index:10;"></div>
        <div onclick="goTo('detail',{idx:1})" style="position:absolute;top:44.5%;left:2%;width:96%;height:20%;background:transparent;cursor:pointer;border-radius:12px;z-index:10;"></div>
        <div onclick="goTo('detail',{idx:2})" style="position:absolute;top:67%;left:2%;width:96%;height:20%;background:transparent;cursor:pointer;border-radius:12px;z-index:10;"></div>
    </div>`;
}

function renderDetail(vp, opts) {
    vp.innerHTML = `
    <div style="position:relative;width:100%;">
        <img src="${IMG.detail}" alt="상세" style="width:100%;display:block;pointer-events:none;user-select:none;">
        <div onclick="goTo('category',{label:'소방관'})" style="position:absolute;top:1.5%;left:2%;width:12%;height:4%;background:transparent;cursor:pointer;z-index:10;"></div>
        <div onclick="goTo('payment')" style="position:absolute;bottom:1.8%;left:34%;width:62%;height:6%;background:transparent;cursor:pointer;border-radius:14px;z-index:10;"></div>
    </div>`;
}

function renderPayment(vp) {
    payAmount = 100000;
    vp.innerHTML = `
    <div style="position:relative;width:100%;">
        <img src="${IMG.payment}" alt="결제" style="width:100%;display:block;pointer-events:none;user-select:none;">
        <div onclick="goTo('detail',null)" style="position:absolute;top:1.5%;left:2%;width:12%;height:3.5%;background:transparent;cursor:pointer;z-index:10;"></div>
        <div onclick="goTo('password')" style="position:absolute;bottom:4%;right:5%;width:50%;height:6.5%;background:#355872;cursor:pointer;border-radius:10px;z-index:10;display:flex;align-items:center;justify-content:center;">
            <span style="color:#fff;font-size:14px;font-weight:800;font-family:'Noto Sans KR',sans-serif;">기부하기</span>
        </div>
    </div>`;
}

function renderPassword(vp) {
    pwInput = [];

    const modalBg = document.createElement('div');
    modalBg.id = 'expModal';
    modalBg.style.cssText = 'position:absolute;inset:0;background:rgba(180,200,215,0.55);display:flex;align-items:center;justify-content:center;z-index:100;opacity:0;pointer-events:none;transition:opacity 0.35s ease;';
    modalBg.innerHTML = `
        <div style="background:#fff;border-radius:28px;padding:32px 28px;text-align:center;width:280px;box-shadow:0 8px 40px rgba(0,0,0,0.12);">
            <div style="font-size:52px;margin-bottom:14px;">🙂</div>
            <div style="font-size:17px;font-weight:800;color:#111;line-height:1.6;">기부가 완료 되었습니다<br>함께해주셔서 감사해요!</div>
        </div>`;

    vp.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:1010px;position:relative;">
        <div style="font-size:80px;margin-bottom:28px;">🙂</div>
        <div style="font-size:24px;font-weight:800;color:#111;margin-bottom:36px;text-align:center;">비밀번호를 입력해주세요.</div>
        <div style="display:flex;gap:18px;margin-bottom:40px;" id="exp-pw-dots">
            ${[0,1,2,3,4,5].map(i=>`<div id="exp-d${i}" style="width:18px;height:18px;border-radius:50%;border:2px solid #111;background:transparent;transition:background 0.12s;"></div>`).join('')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;width:360px;">
            ${[1,2,3,4,5,6,7,8,9,'','0','⌫'].map((k,idx) => {
        if (k==='') return `<div></div>`;
        if (k==='⌫') return `<div onclick="expPwDel()" style="background:#f5f5f5;border-radius:11px;height:80px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:22px;">⌫</div>`;
        const subs=['','ABC','DEF','GHI','JKL','MNO','PQRS','TUV','WXYZ',''];
        return `<div onclick="expPwPress(${k})" style="background:#f5f5f5;border-radius:11px;height:80px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;font-size:22px;font-weight:700;color:#111;">${k}<span style="font-size:9px;color:#888;letter-spacing:0.1em;">${subs[Number(k)-1]||''}</span></div>`;
    }).join('')}
        </div>
    </div>`;

    vp.style.position = 'relative';
    vp.appendChild(modalBg);
}

function expPwPress(n) {
    if (pwInput.length >= 6) return;
    pwInput.push(n);
    expUpdateDots();
    if (pwInput.length === 6) {
        setTimeout(() => {
            const m = document.getElementById('expModal');
            if (m) {
                m.style.opacity = '1';
                m.style.pointerEvents = 'all';
            }
            const el = document.getElementById('expBubbleText');
            if (el) el.textContent = '기부 완료! 🎉';
        }, 300);
    }
}

function expPwDel() {
    pwInput.pop();
    expUpdateDots();
}

function expUpdateDots() {
    for (let i = 0; i < 6; i++) {
        const d = document.getElementById('exp-d' + i);
        if (d) d.style.background = i < pwInput.length ? '#111' : 'transparent';
    }
}

const IMG = {
    home:     'images/screen_home.png',
    explore:  'images/screen_explore.png',
    category: 'images/screen_category.png',
    detail:   'images/screen_detail.png',
    payment:  'images/screen_payment.png',
};
let payAmount = 100000;

goTo('home');
/* ═══════════════════════════════════════
   07. User Research — 숫자 카운트업 + 바 애니메이션
═══════════════════════════════════════ */
(function() {
    const container = document.querySelector('.research-main-stat');
    if (!container) return;

    const pieWrap = document.createElement('div');
    pieWrap.className = 'research-pie-wrap';
    pieWrap.innerHTML = `
    <svg width="280" height="280" viewBox="0 0 280 280" style="flex-shrink:0;">
        <circle cx="140" cy="140" r="110" fill="none" stroke="#e0e0e0" stroke-width="55"/>
        <circle cx="140" cy="140" r="110" fill="none" stroke="#c8d8f0" stroke-width="55"
            stroke-dasharray="0 691.1"
            stroke-dashoffset="0"
            transform="rotate(-90 140 140)"
            style="transition: stroke-dasharray 1s ease 0.2s;"
            data-target="259.2 431.9"/>
        <circle cx="140" cy="140" r="110" fill="none" stroke="#1E40AF" stroke-width="55"
            stroke-dasharray="0 691.1"
            stroke-dashoffset="-259.2"
            transform="rotate(-90 140 140)"
            style="transition: stroke-dasharray 1s ease 0.5s;"
            data-target="321.8 369.3"/>
    </svg>  
    <div class="research-pie-legend">
        <div class="research-pie-legend-item">
            <div class="research-pie-dot" style="background:#e0e0e0;"></div>
            기타
        </div>
        <div class="research-pie-legend-item">
            <div class="research-pie-dot" style="background:#c8d8f0;"></div>
            기부에 무관심 <strong style="margin-left:6px;">37.5%</strong>
        </div>
        <div class="research-pie-legend-item">
            <div class="research-pie-dot" style="background:#1E40AF;"></div>
            경제적 부담 <strong style="margin-left:6px;color:#1E40AF;">46.5%</strong>
        </div>
    </div>
`;

    const desc = container.querySelector('.research-main-desc');
    const source = container.querySelector('.research-source');

    if (desc && source) {
        desc.insertAdjacentElement('afterend', source);
        source.style.textAlign = 'right';
    }

    container.appendChild(pieWrap);

    const bars = container.querySelector('.research-bars');
    if (bars) bars.remove();

    ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        onEnter: () => {
            container.querySelectorAll('[data-target]').forEach(el => {
                el.style.strokeDasharray = el.getAttribute('data-target');
            });
        }
    });
})();
/* ═══════════════════════════════════════
   07. User Research — 숫자 카운트업 + 바 애니메이션
═══════════════════════════════════════ */
(function () {
    let triggered = false;

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function countUp(el, target, duration, suffix, prefix) {
        const isFloat = String(target).includes('.');
        const decimals = isFloat ? String(target).split('.')[1].length : 0;
        const start = performance.now();
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = easeOut(progress) * target;
            el.textContent = (prefix || '') + value.toFixed(decimals) + (suffix || '');
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    function runAnimations() {
        if (triggered) return;
        triggered = true;

        document.querySelectorAll('.research-card .research-bar-fill').forEach(bar => {
            const targetW = bar.getAttribute('style').match(/width:\s*([^;]+)/)?.[1] || bar.style.width;
            bar.style.width = '0';
            bar.style.transition = 'none';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.width = targetW;
                });
            });
        });

        const card2 = document.querySelector('.research-cards .research-card:nth-child(2)');
        if (card2) {
            const rows = card2.querySelectorAll('.research-bar-row');
            const targets = [59.7, 55.0, 56.3];
            rows.forEach((row, i) => {
                const val = row.querySelector('.research-bar-val');
                if (val && targets[i] !== undefined) countUp(val, targets[i], 2500, '%');
            });
        }

        const stats = document.querySelectorAll('.research-stat');
        stats.forEach(el => {
            const raw = el.textContent.trim();
            const prefix = raw.startsWith('+') ? '+' : '';
            const num = parseFloat(raw.replace('+', ''));
            if (!isNaN(num)) countUp(el, num, 2800, '%', prefix);
        });
    }

    ScrollTrigger.create({
        trigger: '.research-inner',
        start: 'top 80%',
        onEnter: runAnimations,
        onEnterBack: () => {
            triggered = false;
            runAnimations();
        },
    });
})();