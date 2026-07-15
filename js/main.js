    const scrollContainer = document.getElementById('scrollContainer');
    const galaxyFrame = document.getElementById('galaxyFrame');
    const letterA = document.getElementById('letterA');
    const letterE = document.getElementById('letterE');
    const centerLine = document.getElementById('centerLine');
    const logoFull = document.getElementById('logoFull');
    const mainHeader = document.getElementById('mainHeader');
    const aboutSection = document.getElementById('about');

    function handleScrollAnimations() {
      const containerRect = scrollContainer.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const viewWidth = window.innerWidth;
      
      // 스크롤 진행도를 0에서 1 사이의 비율로 정밀하게 맵핑
      const totalScrollableDistance = containerRect.height - viewHeight;
      let scrollRatio = -containerRect.top / totalScrollableDistance;
      
      scrollRatio = Math.max(0, Math.min(1, scrollRatio));

      // 1. 은하 프레임 팽창 연산 (가로: 50vw -> 100vw, 세로: 35vh -> 100vh)
      const startWidth = 50;  
      const startHeight = 35; 
      
      const currentWidth = startWidth + (100 - startWidth) * scrollRatio;
      const currentHeight = startHeight + (100 - startHeight) * scrollRatio;
      
      galaxyFrame.style.width = `${currentWidth}vw`;
      galaxyFrame.style.height = `${currentHeight}vh`;

      // 2. 가로 수렴 계산 (Horizontal Convergence Physics)
      // 모바일과 PC 환경의 스크린 가로폭에 비례하여 도달 지점을 역계산합니다.
      const isMobile = viewWidth <= 768;
      
      // CSS에서 작성한 초기 Letter의 위치 거리 보정값
      // 데스크톱: 25vw + 90px / 모바일: 37.5vw + 50px
      const startOffset = isMobile 
        ? (viewWidth * 0.375 + 50) 
        : (viewWidth * 0.25 + 90);

      // 스크롤이 끝에 닿을수록 정중앙(0px)에 정착하도록 translate 계산
      const currentTranslate = startOffset * scrollRatio;
      const currentScale = Math.max(0, 1 - scrollRatio); // 수렴과 동시에 서서히 작아짐
      const currentOpacity = 1 - (scrollRatio * 1.3);    // 스무스한 투명도 제거

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

    // 브라우저 리스너 등록
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('DOMContentLoaded', handleScrollAnimations);

    // ===== 커스텀 마우스 커서 =====
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    const ringEase = 0.15; // 링이 점을 따라가는 지연 속도

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

      // 링크, 버튼 등에 마우스 오버 시 링 사이즈 확대
      const hoverTargets = document.querySelectorAll('a, button, .service-panel');
      hoverTargets.forEach((el) => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('is-hovering'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hovering'));
      });
    }