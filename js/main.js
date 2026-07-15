const storyPosts = [
    {
      id: 1,
      category: 'ahnues',
      categoryLabel: 'ahnues',
      title: 'ahnue 공식 디자인 포트폴리오 사이트 리뉴얼 오픈 안내',
      date: '2026.07.15',
      isNew: true,
      link: '#ahnues'
    },
    {
      id: 2,
      category: 'archive',
      categoryLabel: 'archive',
      title: '반려동물 케어 매칭 서비스 [PawU] UI/UX & 브랜딩 개발',
      date: '2026.07.10',
      isNew: true,
      link: '#ahnues'
    },
    {
      id: 3,
      category: 'ahnues',
      categoryLabel: 'ahnues',
      title: '여름 시즌 맞이 한정판 감성 다꾸 스티커 팩 출시 알림',
      date: '2026.06.28',
      isNew: false,
      link: '#ahnues'
    },
    {
      id: 4,
      category: 'archive',
      categoryLabel: 'archive',
      title: 'A NEW PERSPECTIVE - 미니멀리즘 비주얼 정체성 수립 프로젝트',
      date: '2026.06.12',
      isNew: false,
      link: '#ahnues'
    },
    {
      id: 5,
      category: 'ahnues',
      categoryLabel: 'ahnues',
      title: '프리랜서 디자이너 어뉴(ahnue) 외부 출강 및 기업 세미나 일정',
      date: '2026.05.20',
      isNew: false,
      link: '#ahnues'
    }
  ];

  function setStableViewportUnit() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    cachedViewHeight = window.innerHeight;
    cachedViewWidth = window.innerWidth;
  }

  let cachedViewHeight = window.innerHeight;
  let cachedViewWidth = window.innerWidth;

  const scrollContainer = document.getElementById('scrollContainer');
  const galaxyFrame = document.getElementById('galaxyFrame');
  const letterA = document.getElementById('letterA');
  const letterE = document.getElementById('letterE');
  const centerLine = document.getElementById('centerLine');
  const logoFull = document.getElementById('logoFull');
  const mainHeader = document.getElementById('mainHeader');
  const aboutSection = document.getElementById('about');
  
  const navStory = document.getElementById('navStory');
  const storyList = document.getElementById('storyList');
  const tabButtons = document.querySelectorAll('.story-tab-btn');

  function checkNewStories() {
    const hasNew = storyPosts.some(post => post.isNew);
    if (hasNew && navStory) {
      if (!navStory.querySelector('.new-badge')) {
        const badge = document.createElement('span');
        badge.className = 'new-badge';
        badge.innerText = 'new';
        navStory.appendChild(badge);
      }
    }
  }

  function renderStories(categoryFilter = 'all') {
    storyList.classList.add('fade-out');

    setTimeout(() => {
      storyList.innerHTML = '';

      const filteredPosts = (categoryFilter === 'all' 
        ? storyPosts 
        : storyPosts.filter(post => post.category === categoryFilter)
      ).slice(0, 5);

      if (filteredPosts.length === 0) {
        storyList.innerHTML = `<div class="story-empty">등록된 최신 글이 없습니다.</div>`;
      } else {
        filteredPosts.forEach(post => {
          const isNewMarkup = post.isNew ? `<span class="story-item-new">n</span>` : '';
          const itemHTML = `
            <a href="${post.link}" class="story-item" data-id="${post.id}">
              <div class="story-item-left">
                <span class="story-tag tag-${post.category}">${post.categoryLabel}</span>
                <span class="story-item-title">${post.title}${isNewMarkup}</span>
              </div>
              <div class="story-item-right">
                <span class="story-item-date">${post.date}</span>
                <div class="story-item-arrow">→</div>
              </div>
            </a>
          `;
          storyList.insertAdjacentHTML('beforeend', itemHTML);
        });
      }

      storyList.classList.remove('fade-out');
      bindCursorToDynamicElements();
    }, 300);
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedCategory = e.currentTarget.getAttribute('data-category');
      
      tabButtons.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      renderStories(selectedCategory);
    });
  });

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
      document.body.classList.toggle('menu-open', isActive);
    });

    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  const ringEase = 0.15;

  function bindCursorToDynamicElements() {
    if (window.matchMedia('(pointer: fine)').matches) {
      const hoverTargets = document.querySelectorAll('a, button, .service-panel, .story-tab-btn, .story-item');
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    }
  }

  function onMouseEnter() {
    cursorRing.classList.add('is-hovering');
  }

  function onMouseLeave() {
    cursorRing.classList.remove('is-hovering');
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      cursorDot.classList.add('is-visible');
      cursorRing.classList.add('is-visible');
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('is-visible');
      cursorRing.classList.remove('is-visible');
    });

    function animateCursorRing() {
      ringX += (mouseX - ringX) * ringEase;
      ringY += (mouseY - ringY) * ringEase;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursorRing);
    }
    animateCursorRing();
  }

  function handleScrollAnimations() {
    const containerRect = scrollContainer.getBoundingClientRect();
    const viewHeight = cachedViewHeight;
    const viewWidth = cachedViewWidth;
    
    const totalScrollableDistance = containerRect.height - viewHeight;
    let scrollRatio = -containerRect.top / totalScrollableDistance;
    
    scrollRatio = Math.max(0, Math.min(1, scrollRatio));

    const startWidth = 50;  
    const startHeight = 35; 
    
    const currentWidth = startWidth + (100 - startWidth) * scrollRatio;
    const currentHeight = startHeight + (100 - startHeight) * scrollRatio;
    
    galaxyFrame.style.width = `${currentWidth}vw`;
    galaxyFrame.style.height = `${currentHeight}vh`;

    const isMobile = viewWidth <= 768;
    
    const startOffset = isMobile 
      ? (viewWidth * 0.35 + 40) 
      : (viewWidth * 0.25 + 90);

    const currentTranslate = startOffset * scrollRatio;
    const currentScale = Math.max(0, 1 - scrollRatio);
    const currentOpacity = 1 - (scrollRatio * 1.3);

    letterA.style.transform = `translateX(${currentTranslate}px) scale(${currentScale})`;
    letterA.style.opacity = Math.max(0, currentOpacity);

    letterE.style.transform = `translateX(${-currentTranslate}px) scale(${currentScale})`;
    letterE.style.opacity = Math.max(0, currentOpacity);

    centerLine.style.opacity = Math.max(0, 0.8 - scrollRatio * 2);
    centerLine.style.transform = `scaleX(${1 - scrollRatio})`;

    if (scrollRatio >= 0.45) {
      const logoProgress = (scrollRatio - 0.45) / 0.55;
      logoFull.style.opacity = logoProgress;
      logoFull.style.transform = `scale(${0.85 + (0.15 * logoProgress)})`;
    } else {
      logoFull.style.opacity = 0;
      logoFull.style.transform = `scale(0.85)`;
    }

    const aboutRect = aboutSection.getBoundingClientRect();

    if (aboutRect.top <= 60) {
      mainHeader.className = "light-bg";
    } else if (scrollRatio > 0.4) {
      mainHeader.className = "dark-bg";
    } else {
      mainHeader.className = "light-bg";
    }
  }

  window.addEventListener('scroll', handleScrollAnimations);
  window.addEventListener('resize', setStableViewportUnit);
  window.addEventListener('orientationchange', setStableViewportUnit);
  window.addEventListener('DOMContentLoaded', () => {
    setStableViewportUnit();
    handleScrollAnimations();
    checkNewStories();
    renderStories('all');
  });

  setStableViewportUnit();