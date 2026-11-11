/**
 * ELEMENTAL — PREMIUM LUXURY FASHION E-COMMERCE
 * File: js/3d-scene.js
 * Interactive 3D Experiences powered by Three.js (with graceful 2D Canvas fallback):
 *   1. Hero Sculptural Fashion Atelier Scene (#hero-3d-canvas)
 *   2. Interactive 3D Product Showcase Studio (#product-3d-canvas)
 */

(function () {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================================================
  // 1. HERO 3D INTERACTIVE EXPERIENCE (#hero-3d-canvas)
  // =========================================================================
  function initHero3DScene() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;

    // Fallback to refined 2D canvas silk-ribbon renderer if Three.js or WebGL is unavailable
    if (typeof window.THREE === 'undefined' || !isWebGLAvailable()) {
      initHero2DFallback(canvas);
      return;
    }

    try {
      const THREE = window.THREE;
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });

      const isMobile = window.innerWidth < 768;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
      renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight);
      renderer.shadowMap.enabled = !isMobile;
      if (THREE.PCFSoftShadowMap) {
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        40,
        (canvas.clientWidth || window.innerWidth) / (canvas.clientHeight || window.innerHeight),
        0.1,
        100
      );
      camera.position.set(0, 0, 11.5);

      // Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xf5f2eb, 0.85);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xfff8ed, 1.45);
      keyLight.position.set(6, 9, 8);
      keyLight.castShadow = !isMobile;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xd8c9b5, 0.9);
      fillLight.position.set(-7, -4, 5);
      scene.add(fillLight);

      const rimLight = new THREE.PointLight(0xb7aea2, 1.1, 25);
      rimLight.position.set(0, 6, -6);
      scene.add(rimLight);

      // Main Sculptural Group (positioned slightly left-center behind the editorial frame)
      const rootGroup = new THREE.Group();
      rootGroup.position.set(isMobile ? 0 : -1.2, 0.2, 0);
      scene.add(rootGroup);

      // Primary Fashion-Inspired Abstract Draped Silk TorusKnot Sculpture
      const silkMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D8C9B5'),
        roughness: 0.26,
        metalness: 0.35
      });

      const knotGeo = new THREE.TorusKnotGeometry(2.15, 0.44, isMobile ? 96 : 160, 28, 2, 3);
      const knotMesh = new THREE.Mesh(knotGeo, silkMat);
      knotMesh.castShadow = true;
      knotMesh.receiveShadow = true;
      rootGroup.add(knotMesh);

      // Secondary Finely-Woven Charcoal Architectural Ring
      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#171717'),
        roughness: 0.32,
        metalness: 0.65
      });
      const outerRingGeo = new THREE.TorusGeometry(3.35, 0.045, 24, 120);
      const outerRing = new THREE.Mesh(outerRingGeo, ringMat);
      outerRing.rotation.x = Math.PI / 3;
      outerRing.rotation.y = Math.PI / 6;
      rootGroup.add(outerRing);

      // Third Champagne Gold Inner Filament Ring
      const innerRingMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#8B8177'),
        roughness: 0.2,
        metalness: 0.75
      });
      const innerRingGeo = new THREE.TorusGeometry(2.75, 0.03, 20, 100);
      const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
      innerRing.rotation.x = -Math.PI / 4;
      rootGroup.add(innerRing);

      // Floating Atelier Dust Particles
      const particleCount = isMobile ? 45 : 95;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 18;
        positions[i + 1] = (Math.random() - 0.5) * 11;
        positions[i + 2] = (Math.random() - 0.5) * 8;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x8b8177,
        size: 0.06,
        transparent: true,
        opacity: 0.55
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // Interactive Mouse & Scroll State
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;
      let scrollProgress = 0;
      let isHeroVisible = true;

      window.addEventListener(
        'mousemove',
        (e) => {
          targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        },
        { passive: true }
      );

      window.addEventListener(
        'scroll',
        () => {
          const maxScroll = Math.max(window.innerHeight, 600);
          scrollProgress = Math.min(window.scrollY / maxScroll, 1.5);
        },
        { passive: true }
      );

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              isHeroVisible = entry.isIntersecting;
            });
          },
          { threshold: 0.02 }
        );
        observer.observe(canvas);
      }

      window.addEventListener('resize', () => {
        if (!canvas.clientWidth || !canvas.clientHeight) return;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      });

      let clock = new THREE.Clock();
      function animateHero() {
        requestAnimationFrame(animateHero);
        if (!isHeroVisible || document.hidden) return;

        const elapsed = clock.getElapsedTime();
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        if (!prefersReducedMotion) {
          knotMesh.rotation.y = elapsed * 0.18 + scrollProgress * 1.4 + currentMouseX * 0.45;
          knotMesh.rotation.x = elapsed * 0.11 + scrollProgress * 0.8 - currentMouseY * 0.35;
          outerRing.rotation.z = elapsed * 0.14 - scrollProgress * 0.9;
          innerRing.rotation.y = -elapsed * 0.22 + currentMouseX * 0.3;
          particles.rotation.y = elapsed * 0.03;
        }

        // Subtle camera movement based on mouse & scroll
        camera.position.x = currentMouseX * 0.65;
        camera.position.y = -currentMouseY * 0.45 - scrollProgress * 1.1;
        camera.position.z = 11.5 + scrollProgress * 1.8;
        camera.lookAt(rootGroup.position);

        renderer.render(scene, camera);
      }

      animateHero();
    } catch (err) {
      initHero2DFallback(canvas);
    }
  }

  // Graceful 2D Canvas sculptural animation if WebGL context is unavailable
  function initHero2DFallback(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let t = 0;
    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width * 0.38;
      const cy = canvas.height * 0.5;
      const baseR = Math.min(canvas.width, canvas.height) * 0.26;

      for (let i = 0; i < 18; i++) {
        ctx.beginPath();
        const angleOffset = (i / 18) * Math.PI * 2;
        ctx.ellipse(
          cx,
          cy,
          baseR * (0.85 + 0.15 * Math.sin(t + angleOffset)),
          baseR * 0.42,
          t * 0.3 + angleOffset * 0.5,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(139, 129, 119, 0.18)' : 'rgba(23, 23, 23, 0.10)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }

    function resize() {
      canvas.width = canvas.clientWidth || window.innerWidth;
      canvas.height = canvas.clientHeight || 680;
      drawFrame();
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      if (!document.hidden) {
        drawFrame();
      }
      if (!prefersReducedMotion) {
        t += 0.008;
        requestAnimationFrame(draw);
      }
    }
    draw();
  }

  // =========================================================================
  // 2. INTERACTIVE 3D PRODUCT SHOWCASE STUDIO (#product-3d-canvas)
  // =========================================================================
  function initProduct3DShowcase() {
    const canvas = document.getElementById('product-3d-canvas');
    if (!canvas) return;

    const state = {
      currentModel: canvas.getAttribute('data-default-model') || 'overcoat',
      currentColor: '#D8C9B5',
      currentColorName: 'Champagne Beige',
      wireframe: false,
      autoRotate: !prefersReducedMotion,
      zoom: 6.8,
      targetZoom: 6.8,
      rotX: 0.12,
      rotY: 0.45,
      targetRotX: 0.12,
      targetRotY: 0.45,
      isDragging: false,
      prevX: 0,
      prevY: 0,
      photoMode: false
    };

    const metadataByModel = {
      overcoat: {
        id: 'elm-m-01',
        title: 'Architectural Double-Breasted Overcoat',
        subtitle: 'Tailored Silhouette — 360° Atelier Form',
        price: 68500,
        fabric: '90% Virgin Wool, 10% Cashmere',
        weight: '580 GSM Heavyweight Drape',
        origin: 'Biella, Italy',
        finish: 'Hand-Pick Stitched Lapels',
        fallbackImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85'
      },
      tote: {
        id: 'elm-a-01',
        title: 'Artisanal Box-Calf Architectural Tote',
        subtitle: 'Leather Goods — 360° Structural Inspection',
        price: 58000,
        fabric: '100% Vegetable-Tanned Calfskin',
        weight: '1.8mm Full-Grain Hide',
        origin: 'Florence, Italy',
        finish: 'Brushed Palladium Hardware',
        fallbackImg: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
      },
      watch: {
        id: 'elm-a-02',
        title: 'Chronographe Minimaliste 40mm Watch',
        subtitle: 'Haute Horlogerie — 360° Case & Dial View',
        price: 92000,
        fabric: '316L Brushed Steel & Sapphire',
        weight: '40mm Diameter / 7mm Ultra-Thin',
        origin: 'Geneva / Milan',
        finish: 'Sunray Champagne Dial',
        fallbackImg: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85'
      }
    };

    function updateShowcaseDOM() {
      const meta = metadataByModel[state.currentModel] || metadataByModel.overcoat;
      const titleEl = document.getElementById('showcase-3d-title');
      const subEl = document.getElementById('showcase-3d-subtitle');
      const priceEl = document.getElementById('showcase-3d-price');
      const specFabric = document.getElementById('spec-fabric');
      const specWeight = document.getElementById('spec-weight');
      const specOrigin = document.getElementById('spec-origin');
      const specFinish = document.getElementById('spec-finish');
      const colorLabel = document.getElementById('showcase-color-name');
      const addBtn = document.getElementById('showcase-add-to-bag');
      const fallbackImg = document.getElementById('stage-photo-fallback');

      if (titleEl) titleEl.textContent = meta.title;
      if (subEl) subEl.textContent = meta.subtitle;
      if (priceEl && window.formatPKR) priceEl.textContent = window.formatPKR(meta.price);
      if (specFabric) specFabric.textContent = meta.fabric;
      if (specWeight) specWeight.textContent = meta.weight;
      if (specOrigin) specOrigin.textContent = meta.origin;
      if (specFinish) specFinish.textContent = meta.finish;
      if (colorLabel) colorLabel.textContent = state.currentColorName;
      if (addBtn) addBtn.setAttribute('data-showcase-product-id', meta.id);
      if (fallbackImg) {
        fallbackImg.src = meta.fallbackImg;
        fallbackImg.classList.toggle('visible', state.photoMode);
      }
    }

    let rebuildModelFn = null;
    let applyMaterialColorFn = null;

    if (typeof window.THREE !== 'undefined' && isWebGLAvailable()) {
      try {
        const THREE = window.THREE;
        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(canvas.clientWidth || 700, canvas.clientHeight || 540);
        renderer.shadowMap.enabled = true;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          38,
          (canvas.clientWidth || 700) / (canvas.clientHeight || 540),
          0.1,
          100
        );
        camera.position.set(0, 0.3, state.zoom);

        // Studio 3-Point Lighting
        const ambient = new THREE.AmbientLight(0xf5f2eb, 0.9);
        scene.add(ambient);

        const mainSpot = new THREE.DirectionalLight(0xfff9f0, 1.6);
        mainSpot.position.set(5, 8, 6);
        mainSpot.castShadow = true;
        scene.add(mainSpot);

        const rimSpot = new THREE.DirectionalLight(0xd8c9b5, 1.1);
        rimSpot.position.set(-6, 4, -5);
        scene.add(rimSpot);

        const bottomFill = new THREE.PointLight(0xb7aea2, 0.7, 15);
        bottomFill.position.set(0, -4, 3);
        scene.add(bottomFill);

        // Turntable Plinth
        const plinthGroup = new THREE.Group();
        scene.add(plinthGroup);

        const pedestalGeo = new THREE.CylinderGeometry(2.1, 2.25, 0.14, 64);
        const pedestalMat = new THREE.MeshStandardMaterial({
          color: 0x22201e,
          roughness: 0.4,
          metalness: 0.5
        });
        const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
        pedestal.position.y = -2.05;
        pedestal.receiveShadow = true;
        plinthGroup.add(pedestal);

        const brassRingGeo = new THREE.TorusGeometry(2.15, 0.02, 16, 100);
        const brassMat = new THREE.MeshStandardMaterial({
          color: 0xd8c9b5,
          roughness: 0.22,
          metalness: 0.85
        });
        const brassRing = new THREE.Mesh(brassRingGeo, brassMat);
        brassRing.rotation.x = Math.PI / 2;
        brassRing.position.y = -1.98;
        plinthGroup.add(brassRing);

        const productGroup = new THREE.Group();
        scene.add(productGroup);

        // Primary dynamic material
        const primaryMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(state.currentColor),
          roughness: 0.38,
          metalness: 0.15,
          wireframe: state.wireframe
        });

        const accentDarkMat = new THREE.MeshStandardMaterial({
          color: 0x171717,
          roughness: 0.3,
          metalness: 0.4
        });

        const hardwareGoldMat = new THREE.MeshStandardMaterial({
          color: 0xd8c9b5,
          roughness: 0.18,
          metalness: 0.88
        });

        function buildOvercoatModel() {
          // Sculpted Atelier Tailored Overcoat on Mannequin Form
          const group = new THREE.Group();

          // Mannequin Brass Stand & Neck
          const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.6, 24), hardwareGoldMat);
          pole.position.y = -0.2;
          group.add(pole);

          const neckCap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.35, 32), accentDarkMat);
          neckCap.position.y = 1.55;
          group.add(neckCap);

          // Structured Torso Drape
          const torsoGeo = new THREE.CylinderGeometry(0.88, 0.72, 2.25, 48, 16);
          torsoGeo.scale(1.15, 1, 0.68);
          const torso = new THREE.Mesh(torsoGeo, primaryMat);
          torso.position.y = 0.25;
          torso.castShadow = true;
          group.add(torso);

          // Lower Flared Overcoat Skirt
          const skirtGeo = new THREE.CylinderGeometry(0.72, 1.02, 1.35, 48, 12, true);
          skirtGeo.scale(1.15, 1, 0.72);
          const skirt = new THREE.Mesh(skirtGeo, primaryMat);
          skirt.position.y = -1.15;
          group.add(skirt);

          // Architectural Peak Lapels
          const lapelGeo = new THREE.BoxGeometry(0.34, 1.35, 0.08);
          const leftLapel = new THREE.Mesh(lapelGeo, primaryMat);
          leftLapel.position.set(-0.28, 0.72, 0.52);
          leftLapel.rotation.z = -0.24;
          leftLapel.rotation.y = 0.2;
          group.add(leftLapel);

          const rightLapel = new THREE.Mesh(lapelGeo, primaryMat);
          rightLapel.position.set(0.28, 0.72, 0.54);
          rightLapel.rotation.z = 0.24;
          rightLapel.rotation.y = -0.2;
          group.add(rightLapel);

          // Tailored Shoulders & Sleeves
          const sleeveGeo = new THREE.CylinderGeometry(0.24, 0.2, 2.15, 32);
          const leftSleeve = new THREE.Mesh(sleeveGeo, primaryMat);
          leftSleeve.position.set(-1.12, 0.2, 0);
          leftSleeve.rotation.z = 0.16;
          group.add(leftSleeve);

          const rightSleeve = new THREE.Mesh(sleeveGeo, primaryMat);
          rightSleeve.position.set(1.12, 0.2, 0);
          rightSleeve.rotation.z = -0.16;
          group.add(rightSleeve);

          // Double-Breasted Horn Buttons (6 buttons)
          const btnGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.03, 20);
          for (let r = 0; r < 3; r++) {
            [-0.22, 0.22].forEach((xPos) => {
              const btn = new THREE.Mesh(btnGeo, accentDarkMat);
              btn.rotation.x = Math.PI / 2;
              btn.position.set(xPos, 0.15 - r * 0.38, 0.54);
              group.add(btn);
            });
          }

          // Sculpted Waist Belt
          const beltGeo = new THREE.TorusGeometry(0.78, 0.065, 16, 64);
          beltGeo.scale(1.18, 1, 0.72);
          const belt = new THREE.Mesh(beltGeo, primaryMat);
          belt.rotation.x = Math.PI / 2;
          belt.position.y = -0.15;
          group.add(belt);

          return group;
        }

        function buildToteModel() {
          // Artisanal Box-Calf Leather Tote
          const group = new THREE.Group();

          // Main Structured Leather Body
          const bodyGeo = new THREE.BoxGeometry(2.35, 1.95, 0.85);
          const body = new THREE.Mesh(bodyGeo, primaryMat);
          body.position.y = -0.35;
          body.castShadow = true;
          group.add(body);

          // Gusset Accent Seam Bars
          const seamGeo = new THREE.BoxGeometry(0.05, 1.98, 0.88);
          [-1.16, 1.16].forEach((x) => {
            const seam = new THREE.Mesh(seamGeo, accentDarkMat);
            seam.position.set(x, -0.35, 0);
            group.add(seam);
          });

          // Architectural Top Leather Handles
          const handleGeo = new THREE.TorusGeometry(0.62, 0.055, 20, 64, Math.PI);
          [-0.26, 0.26].forEach((z) => {
            const handle = new THREE.Mesh(handleGeo, accentDarkMat);
            handle.position.set(0, 0.62, z);
            group.add(handle);
          });

          // Brushed Palladium Clasp & Buckle Hardware
          [-0.62, 0.62].forEach((x) => {
            [-0.44, 0.44].forEach((z) => {
              const mount = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.18, 20), hardwareGoldMat);
              mount.position.set(x, 0.55, z);
              group.add(mount);
            });
          });

          // Signature Foil Plaque
          const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.16, 0.04), hardwareGoldMat);
          plaque.position.set(0, 0.25, 0.43);
          group.add(plaque);

          return group;
        }

        function buildWatchModel() {
          // Chronographe Minimaliste 40mm Watch
          const group = new THREE.Group();

          // Brushed Metallic Case
          const caseGeo = new THREE.CylinderGeometry(1.35, 1.35, 0.26, 64);
          const watchCase = new THREE.Mesh(caseGeo, hardwareGoldMat);
          watchCase.rotation.x = Math.PI / 2;
          group.add(watchCase);

          // Dial Face (tinted by selected swatch color)
          const dialGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.28, 64);
          const dial = new THREE.Mesh(dialGeo, primaryMat);
          dial.rotation.x = Math.PI / 2;
          group.add(dial);

          // 12 Hour Baton Indices
          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const baton = new THREE.Mesh(
              new THREE.BoxGeometry(i % 3 === 0 ? 0.06 : 0.03, 0.18, 0.04),
              hardwareGoldMat
            );
            baton.position.set(Math.sin(angle) * 0.98, Math.cos(angle) * 0.98, 0.16);
            baton.rotation.z = -angle;
            group.add(baton);
          }

          // Watch Hands
          const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.65, 0.04), accentDarkMat);
          hourHand.position.set(-0.18, 0.18, 0.18);
          hourHand.rotation.z = 0.75;
          group.add(hourHand);

          const minHand = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.92, 0.04), accentDarkMat);
          minHand.position.set(0.24, 0.28, 0.19);
          minHand.rotation.z = -0.65;
          group.add(minHand);

          // Crown
          const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.22, 24), hardwareGoldMat);
          crown.rotation.z = Math.PI / 2;
          crown.position.set(1.45, 0, 0);
          group.add(crown);

          // Top & Bottom Calfskin Straps
          const strapGeo = new THREE.BoxGeometry(0.78, 1.25, 0.12);
          const topStrap = new THREE.Mesh(strapGeo, accentDarkMat);
          topStrap.position.set(0, 1.65, -0.02);
          group.add(topStrap);

          const botStrap = new THREE.Mesh(strapGeo, accentDarkMat);
          botStrap.position.set(0, -1.65, -0.02);
          group.add(botStrap);

          return group;
        }

        rebuildModelFn = function () {
          while (productGroup.children.length > 0) {
            productGroup.remove(productGroup.children[0]);
          }
          let built;
          if (state.currentModel === 'tote') {
            built = buildToteModel();
          } else if (state.currentModel === 'watch') {
            built = buildWatchModel();
          } else {
            built = buildOvercoatModel();
          }
          productGroup.add(built);
          updateShowcaseDOM();
        };

        applyMaterialColorFn = function (hex) {
          primaryMat.color.set(hex);
          primaryMat.wireframe = state.wireframe;
        };

        rebuildModelFn();

        // Pointer Drag & Wheel Zoom Controls
        canvas.addEventListener('pointerdown', (e) => {
          state.isDragging = true;
          state.prevX = e.clientX;
          state.prevY = e.clientY;
        });

        window.addEventListener('pointermove', (e) => {
          if (!state.isDragging) return;
          const dx = e.clientX - state.prevX;
          const dy = e.clientY - state.prevY;
          state.targetRotY += dx * 0.01;
          state.targetRotX = Math.max(-0.6, Math.min(0.6, state.targetRotX + dy * 0.008));
          state.prevX = e.clientX;
          state.prevY = e.clientY;
        });

        window.addEventListener('pointerup', () => {
          state.isDragging = false;
        });

        canvas.addEventListener(
          'wheel',
          (e) => {
            e.preventDefault();
            state.targetZoom = Math.max(4.2, Math.min(9.5, state.targetZoom + e.deltaY * 0.004));
          },
          { passive: false }
        );

        window.addEventListener('resize', () => {
          if (!canvas.clientWidth || !canvas.clientHeight) return;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });

        function animateShowcase() {
          requestAnimationFrame(animateShowcase);
          if (state.autoRotate && !state.isDragging && !state.photoMode) {
            state.targetRotY += 0.0045;
          }
          state.rotX += (state.targetRotX - state.rotX) * 0.1;
          state.rotY += (state.targetRotY - state.rotY) * 0.1;
          state.zoom += (state.targetZoom - state.zoom) * 0.1;

          productGroup.rotation.y = state.rotY;
          productGroup.rotation.x = state.rotX;
          camera.position.z = state.zoom;

          renderer.render(scene, camera);
        }
        animateShowcase();
      } catch (e) {
        state.photoMode = true;
        updateShowcaseDOM();
      }
    } else {
      // If WebGL is disabled, show interactive 2D blueprint + photo fallback seamlessly
      state.photoMode = true;
      updateShowcaseDOM();
    }

    // Bind UI Controls for the 3D Showcase
    document.querySelectorAll('[data-3d-model]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-3d-model]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentModel = btn.getAttribute('data-3d-model');
        if (rebuildModelFn) rebuildModelFn();
        else updateShowcaseDOM();
      });
    });

    document.querySelectorAll('[data-3d-color]').forEach((swatch) => {
      swatch.addEventListener('click', () => {
        document.querySelectorAll('[data-3d-color]').forEach((s) => s.classList.remove('active'));
        swatch.classList.add('active');
        state.currentColor = swatch.getAttribute('data-3d-color');
        state.currentColorName = swatch.getAttribute('data-color-name') || 'Custom Finish';
        if (applyMaterialColorFn) applyMaterialColorFn(state.currentColor);
        updateShowcaseDOM();
      });
    });

    const zoomInBtn = document.getElementById('ctrl-zoom-in');
    const zoomOutBtn = document.getElementById('ctrl-zoom-out');
    const rotateBtn = document.getElementById('ctrl-auto-rotate');
    const wireBtn = document.getElementById('ctrl-wireframe');
    const photoBtn = document.getElementById('ctrl-photo-mode');
    const resetBtn = document.getElementById('ctrl-reset-view');
    const addShowcaseBtn = document.getElementById('showcase-add-to-bag');

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        state.targetZoom = Math.max(4.2, state.targetZoom - 0.8);
      });
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        state.targetZoom = Math.min(9.5, state.targetZoom + 0.8);
      });
    }
    if (rotateBtn) {
      rotateBtn.addEventListener('click', () => {
        state.autoRotate = !state.autoRotate;
        rotateBtn.classList.toggle('active', state.autoRotate);
      });
    }
    if (wireBtn) {
      wireBtn.addEventListener('click', () => {
        state.wireframe = !state.wireframe;
        wireBtn.classList.toggle('active', state.wireframe);
        if (applyMaterialColorFn) applyMaterialColorFn(state.currentColor);
      });
    }
    if (photoBtn) {
      photoBtn.addEventListener('click', () => {
        state.photoMode = !state.photoMode;
        photoBtn.classList.toggle('active', state.photoMode);
        updateShowcaseDOM();
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.targetZoom = 6.8;
        state.targetRotX = 0.12;
        state.targetRotY = 0.45;
        state.wireframe = false;
        state.photoMode = false;
        if (wireBtn) wireBtn.classList.remove('active');
        if (photoBtn) photoBtn.classList.remove('active');
        if (applyMaterialColorFn) applyMaterialColorFn(state.currentColor);
        updateShowcaseDOM();
      });
    }
    if (addShowcaseBtn) {
      addShowcaseBtn.addEventListener('click', () => {
        const pid = addShowcaseBtn.getAttribute('data-showcase-product-id') || 'elm-m-01';
        if (window.ElementalCart) {
          window.ElementalCart.addItem(pid, {
            color: state.currentColorName,
            size: 'M',
            quantity: 1
          });
          window.ElementalCart.openDrawer();
        }
      });
    }
  }

  function isWebGLAvailable() {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHero3DScene();
    initProduct3DShowcase();
  });
})();

