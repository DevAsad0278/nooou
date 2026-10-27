/**
 * NISHA'S LITTLE WORLD — INTERACTIVE BIRTHDAY SURPRISE
 * Vanilla JavaScript Logic
 * 
 * Features:
 * - Scene transition router (6 scenes with clean state management)
 * - Canvas ambient floating particles (hearts, stars, sparkles)
 * - High performance confetti engine with physics
 * - Interactive 3-tier birthday cake with lighting sequence & typewriter message
 * - Playful dodging NO button with friendly progressive messages
 * - Animated envelope seal & letter unfold with typewriter effect
 * - Polaroid photo gallery with smooth carousel, lightbox, and graceful placeholders
 * - Ambient background music toggle with Web Audio API chime fallback
 * - Memory & replay hooks without duplicate event listeners
 */

// ==========================================================================
// 1. CONFIGURATION & PERSONAL DATA
// ==========================================================================
const SURPRISE_CONFIG = {
  recipientName: "Nisha",
  senderName: "Tania",
  
  // Scene 2 Cake message lines
  cakeMessage: {
    line1: "HAPPY BIRTHDAY, MY DEAR SISTER! 🎂💗",
    line2: "Today is all about YOU, Nisha!"
  },

  // Scene 3 Playful responses for the "NO" button clicks/hovers
  playfulQuotes: [
    "Excuse me, birthday girl! You HAVE to see this little surprise! 😂💕",
    "Nope! Nisha isn't allowed to press that button today! 😜💖",
    "Are you sure? There's a mountain of love waiting for you! 🥹🌸",
    "Hey! Stop clicking NO, my dear elder sister! 😂💗",
    "Okay okay, look how big the pink YES button is! Just click it! ✨"
  ],

  // Scene 4 The Heartfelt Letter Paragraphs
  letterParagraphs: [
    "Happy Birthday to my dearest Nisha! 💗🎂",
    "You may not be my real elder sister, but you have always been so much more than just a friend to me. You are my sister by heart, and I feel so lucky to have you in my life.",
    "Thank you for guiding me, explaining things to me, supporting me, and helping me understand things when I need it the most. Sometimes you scold me so much 😂, but I know that behind every scolding, there is love and care.",
    "You don't just make me smile; you help me learn, grow, and become a better version of myself. Your guidance means more to me than I can properly explain.",
    "On your special day, I wish you endless happiness, good health, peace, success, and all the beautiful things your heart dreams of.",
    "May you always have reasons to smile, people who truly care about you, and the courage to achieve everything you want.",
    "Thank you for being my sister, my friend, my guide, and sometimes my personal scolding machine! 😂💗",
    "No matter how much you scold me, you will always have a very special place in my heart.",
    "Happy Birthday once again, my dear Nisha. Stay happy, stay blessed, and never stop being the wonderful person you are.",
    "With lots of love,<br/>Your little sister-like friend, <strong>Tania 💗</strong>"
  ],

  // Scene 5 Photo Gallery Data
  // If images exist in assets/images/photo1.jpg, etc., they load; otherwise beautiful custom polaroid placeholders appear!
  memories: [
    {
      id: 1,
      src: "assets/images/photo1.jpg",
      caption: "A little memory, a lot of love 💗",
      fallbackEmoji: "🌸",
      fallbackTitle: "Special Sister Moment",
      fallbackDate: "Our Sweetest Bond"
    },
    {
      id: 2,
      src: "assets/images/photo2.jpg",
      caption: "One of my favourite moments with you ✨",
      fallbackEmoji: "👭",
      fallbackTitle: "Endless Laughter & Talks",
      fallbackDate: "Cherished Forever"
    },
    {
      id: 3,
      src: "assets/images/photo3.jpg",
      caption: "Guiding me through every step 💖",
      fallbackEmoji: "🌟",
      fallbackTitle: "My Guiding Star",
      fallbackDate: "Love & Gratitude"
    },
    {
      id: 4,
      src: "assets/images/photo4.jpg",
      caption: "Smiles, scoldings, and sweet memories 😂💗",
      fallbackEmoji: "🎂",
      fallbackTitle: "Celebration Time",
      fallbackDate: "Nisha's Special Day"
    }
  ]
};

// ==========================================================================
// 2. STATE MANAGER
// ==========================================================================
const AppState = {
  currentScene: 1,
  candlesLit: false,
  noClickCount: 0,
  letterOpened: false,
  letterTyping: false,
  currentPhotoIndex: 0,
  musicPlaying: false,
  audioContext: null
};

// ==========================================================================
// 3. AMBIENT PARTICLES (CANVAS)
// ==========================================================================
class AmbientCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = window.innerWidth < 600 ? 25 : 45;
    this.symbols = ['💗', '✨', '🌸', '⭐', '🤍'];
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initParticles();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        symbol: this.symbols[Math.floor(Math.random() * this.symbols.length)],
        size: Math.random() * 14 + 10,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: -(Math.random() * 0.7 + 0.3),
        opacity: Math.random() * 0.6 + 0.2,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    for (let p of this.particles) {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rot += p.rotSpeed;

      if (p.y < -30) {
        p.y = this.height + 20;
        p.x = Math.random() * this.width;
      }
      if (p.x < -30) p.x = this.width + 20;
      if (p.x > this.width + 30) p.x = -20;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rot * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.font = `${p.size}px sans-serif`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(p.symbol, 0, 0);
      this.ctx.restore();
    }
    
    requestAnimationFrame(this.animate);
  }
}

// ==========================================================================
// 4. CONFETTI ENGINE (CANVAS)
// ==========================================================================
class ConfettiCannon {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.pieces = [];
    this.colors = ['#ff8fb1', '#ffd1dc', '#b592ff', '#f7d070', '#ffffff', '#eb5b89'];
    this.active = false;
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.render = this.render.bind(this);
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  burst(x = this.width / 2, y = this.height / 2, count = 70) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 4;
      this.pieces.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 8 + 6,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.22,
        decay: Math.random() * 0.015 + 0.007,
        alpha: 1,
        shape: Math.random() > 0.4 ? 'rect' : 'circle'
      });
    }

    if (!this.active) {
      this.active = true;
      requestAnimationFrame(this.render);
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.pieces.length - 1; i >= 0; i--) {
      const p = this.pieces[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > this.height + 20) {
        this.pieces.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    if (this.pieces.length > 0) {
      requestAnimationFrame(this.render);
    } else {
      this.active = false;
    }
  }
}

// ==========================================================================
// 5. GENTLE AUDIO CONTROLLER (MP3 + SYNTHESIZER FALLBACK)
// ==========================================================================
class SoundController {
  constructor() {
    this.audioEl = document.getElementById('bgMusic');
    this.toggleBtn = document.getElementById('musicToggleBtn');
    this.musicLabel = document.getElementById('musicLabel');
    this.musicIcon = document.getElementById('musicIcon');
    this.isSynthesizing = false;
    this.synthInterval = null;

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggleMusic());
    }
  }

  toggleMusic() {
    if (AppState.musicPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  play() {
    AppState.musicPlaying = true;
    if (this.toggleBtn) this.toggleBtn.classList.add('playing');
    if (this.musicLabel) this.musicLabel.textContent = "Music: On 🎶";
    if (this.musicIcon) this.musicIcon.textContent = "🎵";

    if (this.audioEl) {
      const playPromise = this.audioEl.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Direct MP3 play failed or file missing. Using dreamy chime synthesizer fallback.", err);
          this.startDreamyChimes();
        });
      }
    } else {
      this.startDreamyChimes();
    }
  }

  stop() {
    AppState.musicPlaying = false;
    if (this.toggleBtn) this.toggleBtn.classList.remove('playing');
    if (this.musicLabel) this.musicLabel.textContent = "Music: Off";
    if (this.musicIcon) this.musicIcon.textContent = "🔇";

    if (this.audioEl) {
      this.audioEl.pause();
    }
    this.stopDreamyChimes();
  }

  // Pure Web Audio API chime melody fallback (Gentle pentatonic birthday tune)
  startDreamyChimes() {
    if (this.isSynthesizing) return;
    this.isSynthesizing = true;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AppState.audioContext) {
        AppState.audioContext = new AudioCtx();
      }
      if (AppState.audioContext.state === 'suspended') {
        AppState.audioContext.resume();
      }

      // Gentle C major / A minor pentatonic frequencies (peaceful, music-box feel)
      const notes = [
        261.63, 293.66, 329.63, 392.00, 440.00, // C4, D4, E4, G4, A4
        523.25, 587.33, 659.25, 783.99          // C5, D5, E5, G5
      ];
      let step = 0;

      const playChime = () => {
        if (!this.isSynthesizing) return;
        const note = notes[step % notes.length];
        step = (step + Math.floor(Math.random() * 3) + 1) % notes.length;

        const ctx = AppState.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.8);
      };

      playChime();
      this.synthInterval = setInterval(playChime, 850);
    } catch (e) {
      console.warn("Web Audio not supported in this environment.", e);
    }
  }

  stopDreamyChimes() {
    this.isSynthesizing = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

// ==========================================================================
// 6. SCENE CONTROLLER & ROUTING
// ==========================================================================
class SceneManager {
  constructor(confetti) {
    this.confetti = confetti;
    this.scenes = [
      document.getElementById('scene1'),
      document.getElementById('scene2'),
      document.getElementById('scene3'),
      document.getElementById('scene4'),
      document.getElementById('scene5'),
      document.getElementById('scene6')
    ];
    this.dots = document.querySelectorAll('.scene-progress .dot');

    this.bindEvents();
  }

  goToScene(sceneNumber) {
    if (sceneNumber < 1 || sceneNumber > 6) return;
    
    // Deactivate previous scene
    this.scenes.forEach((sc, idx) => {
      if (sc) {
        sc.classList.remove('active');
      }
    });

    // Activate new scene
    const targetScene = this.scenes[sceneNumber - 1];
    if (targetScene) {
      targetScene.classList.add('active');
    }

    AppState.currentScene = sceneNumber;

    // Update progress dots
    this.dots.forEach((dot, idx) => {
      if (idx + 1 === sceneNumber) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Trigger scene-specific onEnter logic
    this.onEnterScene(sceneNumber);

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onEnterScene(sceneNumber) {
    if (sceneNumber === 2) {
      // Cake scene: if not lit, prompt
      const hint = document.getElementById('cakeClickHint');
      if (hint && !AppState.candlesLit) {
        hint.style.display = 'inline-block';
      }
    } else if (sceneNumber === 3) {
      // Question scene: reset playful text
      const feedback = document.getElementById('playfulFeedback');
      if (feedback) feedback.textContent = "";
      const noBtn = document.getElementById('noBtn');
      if (noBtn) noBtn.style.transform = 'translate(0, 0)';
    } else if (sceneNumber === 4) {
      // Letter scene: if opened previously and re-entered, trigger letter
      if (AppState.letterOpened && !AppState.letterTyping) {
        this.renderLetterContent(false);
      }
    } else if (sceneNumber === 5) {
      // Gallery scene
      renderCurrentPolaroid();
    } else if (sceneNumber === 6) {
      // Final celebrations burst
      this.confetti.burst(window.innerWidth / 2, window.innerHeight / 3, 90);
    }
  }

  bindEvents() {
    // Scene 1 -> Scene 2
    const startSurpriseBtn = document.getElementById('startSurpriseBtn');
    if (startSurpriseBtn) {
      startSurpriseBtn.addEventListener('click', () => {
        this.confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 40);
        this.goToScene(2);
      });
    }

    // Scene 2: Interactive Cake Click
    const cakeWrapper = document.getElementById('cakeWrapper');
    if (cakeWrapper) {
      cakeWrapper.addEventListener('click', () => this.lightCakeCandles());
      cakeWrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.lightCakeCandles();
        }
      });
    }

    // Scene 2 -> Scene 3
    const toScene3Btn = document.getElementById('toScene3Btn');
    if (toScene3Btn) {
      toScene3Btn.addEventListener('click', () => {
        this.goToScene(3);
      });
    }

    // Scene 3: YES Button
    const yesBtn = document.getElementById('yesBtn');
    const giftBox = document.getElementById('giftBox');
    if (yesBtn) {
      yesBtn.addEventListener('click', (e) => {
        const rect = yesBtn.getBoundingClientRect();
        this.confetti.burst(rect.left + rect.width / 2, rect.top, 80);
        if (giftBox) giftBox.classList.add('opened');

        setTimeout(() => {
          this.goToScene(4);
        }, 900);
      });
    }

    // Scene 3: NO Button (Dodging playfully)
    const noBtn = document.getElementById('noBtn');
    const questionCard = document.getElementById('questionCard');
    const feedback = document.getElementById('playfulFeedback');

    const handleNoEvasion = (e) => {
      e.preventDefault();
      AppState.noClickCount++;

      // Cycle friendly messages
      const quoteIndex = (AppState.noClickCount - 1) % SURPRISE_CONFIG.playfulQuotes.length;
      if (feedback) {
        feedback.textContent = SURPRISE_CONFIG.playfulQuotes[quoteIndex];
      }

      // Constrained movement within the playfield so it never leaves the card or screen
      const playfield = document.getElementById('btnPlayfield');
      if (playfield && noBtn) {
        const fieldRect = playfield.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Safe bounds
        const maxDeltaX = (fieldRect.width / 2) - (btnRect.width / 2) - 10;
        const maxDeltaY = 35; // gentle vertical shift

        const randomX = (Math.random() * 2 - 1) * Math.min(maxDeltaX, 85);
        const randomY = (Math.random() * 2 - 1) * maxDeltaY;

        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }

      // Little burst of stars near the button to keep it delightful
      const bRect = noBtn.getBoundingClientRect();
      this.confetti.burst(bRect.left + bRect.width / 2, bRect.top + bRect.height / 2, 12);
    };

    if (noBtn) {
      noBtn.addEventListener('click', handleNoEvasion);
      noBtn.addEventListener('mouseenter', handleNoEvasion);
    }

    // Scene 4: Envelope Click
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    if (envelopeWrapper) {
      envelopeWrapper.addEventListener('click', () => this.openEnvelope());
      envelopeWrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openEnvelope();
        }
      });
    }

    // Scene 4: Replay Letter Button
    const replayLetterBtn = document.getElementById('replayLetterBtn');
    if (replayLetterBtn) {
      replayLetterBtn.addEventListener('click', () => {
        this.renderLetterContent(true);
      });
    }

    // Scene 4 -> Scene 5 (Gallery)
    const toScene5Btn = document.getElementById('toScene5Btn');
    if (toScene5Btn) {
      toScene5Btn.addEventListener('click', () => {
        this.goToScene(5);
      });
    }

    // Scene 5 -> Scene 6 (Final Surprise)
    const toScene6Btn = document.getElementById('toScene6Btn');
    if (toScene6Btn) {
      toScene6Btn.addEventListener('click', () => {
        this.goToScene(6);
      });
    }

    // Scene 6 Actions:
    // "Read My Letter Again"
    const readLetterAgainBtn = document.getElementById('readLetterAgainBtn');
    if (readLetterAgainBtn) {
      readLetterAgainBtn.addEventListener('click', () => {
        this.goToScene(4);
      });
    }

    // "Relive the Surprise"
    const reliveSurpriseBtn = document.getElementById('reliveSurpriseBtn');
    if (reliveSurpriseBtn) {
      reliveSurpriseBtn.addEventListener('click', () => {
        // Reset necessary states
        AppState.candlesLit = false;
        AppState.noClickCount = 0;
        const flames = [document.getElementById('flame1'), document.getElementById('flame2'), document.getElementById('flame3')];
        flames.forEach(f => f && f.classList.add('unlit'));
        const cakeMessageBox = document.getElementById('cakeMessageBox');
        if (cakeMessageBox) cakeMessageBox.classList.add('hidden');
        const cakeClickHint = document.getElementById('cakeClickHint');
        if (cakeClickHint) cakeClickHint.classList.remove('hidden');
        const giftBox = document.getElementById('giftBox');
        if (giftBox) giftBox.classList.remove('opened');

        this.goToScene(1);
      });
    }

    // Confetti Throw Button
    const celebrateConfettiBtn = document.getElementById('celebrateConfettiBtn');
    if (celebrateConfettiBtn) {
      celebrateConfettiBtn.addEventListener('click', (e) => {
        const rect = celebrateConfettiBtn.getBoundingClientRect();
        this.confetti.burst(rect.left + rect.width / 2, rect.top, 85);
      });
    }
  }

  lightCakeCandles() {
    if (AppState.candlesLit) return;
    AppState.candlesLit = true;

    const cakeWrapper = document.getElementById('cakeWrapper');
    if (cakeWrapper) cakeWrapper.classList.add('lit');

    // Light flames with staggered delay
    const flames = [
      document.getElementById('flame1'),
      document.getElementById('flame2'),
      document.getElementById('flame3')
    ];

    flames.forEach((flame, idx) => {
      if (flame) {
        setTimeout(() => {
          flame.classList.remove('unlit');
        }, idx * 220);
      }
    });

    // Confetti celebration burst around cake
    setTimeout(() => {
      const cakeRect = cakeWrapper.getBoundingClientRect();
      this.confetti.burst(cakeRect.left + cakeRect.width / 2, cakeRect.top + 40, 75);
    }, 450);

    // Hide tap hint and reveal typewriter message
    const hint = document.getElementById('cakeClickHint');
    if (hint) hint.classList.add('hidden');

    const msgBox = document.getElementById('cakeMessageBox');
    if (msgBox) msgBox.classList.remove('hidden');

    const line1El = document.getElementById('cakeTypeLine1');
    const line2El = document.getElementById('cakeTypeLine2');
    const nextBtn = document.getElementById('toScene3Btn');

    if (line1El && line2El) {
      typewriterText(line1El, SURPRISE_CONFIG.cakeMessage.line1, 35, () => {
        typewriterText(line2El, SURPRISE_CONFIG.cakeMessage.line2, 35, () => {
          if (nextBtn) {
            nextBtn.classList.remove('hidden');
            nextBtn.focus();
          }
        });
      });
    }
  }

  openEnvelope() {
    const envelope = document.getElementById('envelopeWrapper');
    const letterSheet = document.getElementById('letterSheet');
    if (!envelope || !letterSheet) return;

    envelope.classList.add('opened');
    AppState.letterOpened = true;

    // Little burst
    const rect = envelope.getBoundingClientRect();
    this.confetti.burst(rect.left + rect.width / 2, rect.top + 50, 45);

    setTimeout(() => {
      envelope.classList.add('hidden');
      letterSheet.classList.remove('hidden');
      this.renderLetterContent(true);
    }, 600);
  }

  renderLetterContent(shouldAnimate = false) {
    const container = document.getElementById('letterTypewriterContent');
    if (!container) return;

    if (!shouldAnimate) {
      container.innerHTML = SURPRISE_CONFIG.letterParagraphs.map((p, idx) => {
        if (idx === 0) return `<p class="letter-salutation">${p}</p>`;
        if (idx === SURPRISE_CONFIG.letterParagraphs.length - 1) return `<p class="letter-sign">${p}</p>`;
        return `<p>${p}</p>`;
      }).join('');
      return;
    }

    // Typewriter sequential animation
    AppState.letterTyping = true;
    container.innerHTML = "";
    container.classList.add('typing-cursor');

    let pIdx = 0;

    const typeNextParagraph = () => {
      if (pIdx >= SURPRISE_CONFIG.letterParagraphs.length) {
        container.classList.remove('typing-cursor');
        AppState.letterTyping = false;
        return;
      }

      const pText = SURPRISE_CONFIG.letterParagraphs[pIdx];
      const pEl = document.createElement('p');
      if (pIdx === 0) pEl.classList.add('letter-salutation');
      if (pIdx === SURPRISE_CONFIG.letterParagraphs.length - 1) pEl.classList.add('letter-sign');
      container.appendChild(pEl);

      let charIdx = 0;
      const speed = pText.length > 100 ? 12 : 22; // smooth and brisk

      const typeChar = () => {
        if (charIdx < pText.length) {
          // Handle HTML like <br/> safely
          if (pText.substr(charIdx, 5) === '<br/>') {
            pEl.innerHTML += '<br/>';
            charIdx += 5;
          } else if (pText.substr(charIdx, 8) === '<strong>') {
            pEl.innerHTML += '<strong>';
            charIdx += 8;
          } else if (pText.substr(charIdx, 9) === '</strong>') {
            pEl.innerHTML += '</strong>';
            charIdx += 9;
          } else {
            pEl.innerHTML += pText.charAt(charIdx);
            charIdx++;
          }
          setTimeout(typeChar, speed);
        } else {
          pIdx++;
          setTimeout(typeNextParagraph, 160);
        }
      };

      typeChar();
    };

    typeNextParagraph();
  }
}

// ==========================================================================
// 7. TYPEWRITER HELPER UTILITY
// ==========================================================================
function typewriterText(element, text, speed = 40, callback = null) {
  element.textContent = "";
  let i = 0;
  function write() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(write, speed);
    } else if (callback) {
      callback();
    }
  }
  write();
}

// ==========================================================================
// 8. POLAROID GALLERY & LIGHTBOX
// ==========================================================================
function initGallery(confetti) {
  const polaroidStage = document.getElementById('polaroidStage');
  const thumbsContainer = document.getElementById('galleryThumbnails');
  const prevBtn = document.getElementById('galleryPrevBtn');
  const nextBtn = document.getElementById('galleryNextBtn');
  const counterEl = document.getElementById('galleryCounter');

  if (!polaroidStage) return;

  // Render Thumbnails
  thumbsContainer.innerHTML = "";
  SURPRISE_CONFIG.memories.forEach((mem, index) => {
    const thumb = document.createElement('button');
    thumb.className = `gallery-thumb ${index === 0 ? 'active' : ''}`;
    thumb.setAttribute('aria-label', `View photo ${index + 1}`);
    thumb.innerHTML = `<span>${mem.fallbackEmoji}</span>`;

    // Try loading actual image thumbnail if available
    const imgTest = new Image();
    imgTest.src = mem.src;
    imgTest.onload = () => {
      thumb.innerHTML = `<img src="${mem.src}" alt="${mem.caption}" />`;
    };

    thumb.addEventListener('click', () => {
      AppState.currentPhotoIndex = index;
      renderCurrentPolaroid();
    });

    thumbsContainer.appendChild(thumb);
  });

  // Prev / Next Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      AppState.currentPhotoIndex = (AppState.currentPhotoIndex - 1 + SURPRISE_CONFIG.memories.length) % SURPRISE_CONFIG.memories.length;
      renderCurrentPolaroid();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      AppState.currentPhotoIndex = (AppState.currentPhotoIndex + 1) % SURPRISE_CONFIG.memories.length;
      renderCurrentPolaroid();
    });
  }

  // Keyboard navigation for gallery
  window.addEventListener('keydown', (e) => {
    if (AppState.currentScene === 5) {
      if (e.key === 'ArrowLeft') prevBtn && prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn && nextBtn.click();
    }
  });

  // Initial render
  renderCurrentPolaroid();
}

function renderCurrentPolaroid() {
  const polaroidStage = document.getElementById('polaroidStage');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const counterEl = document.getElementById('galleryCounter');
  if (!polaroidStage) return;

  const mem = SURPRISE_CONFIG.memories[AppState.currentPhotoIndex];

  // Update counter
  if (counterEl) {
    counterEl.textContent = `${AppState.currentPhotoIndex + 1} / ${SURPRISE_CONFIG.memories.length}`;
  }

  // Update thumb active state
  thumbs.forEach((t, i) => {
    if (i === AppState.currentPhotoIndex) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  // Build Polaroid HTML
  const polaroidCard = document.createElement('div');
  polaroidCard.className = 'polaroid-card animate-pop';
  polaroidCard.setAttribute('tabindex', '0');
  polaroidCard.setAttribute('role', 'button');
  polaroidCard.setAttribute('aria-label', `Enlarge: ${mem.caption}`);

  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'polaroid-img-wrapper';

  // Test if image file exists
  const img = new Image();
  img.src = mem.src;
  let imageLoaded = false;

  const fallbackHtml = `
    <div class="polaroid-placeholder">
      <span class="placeholder-icon">${mem.fallbackEmoji}</span>
      <div class="placeholder-text">${mem.fallbackTitle}</div>
      <div class="placeholder-sub">${mem.fallbackDate}</div>
    </div>
  `;

  img.onload = () => {
    imageLoaded = true;
    imgWrapper.innerHTML = `<img src="${mem.src}" alt="${mem.caption}" />`;
  };

  img.onerror = () => {
    imgWrapper.innerHTML = fallbackHtml;
  };

  // Start with fallback while loading or if not present
  imgWrapper.innerHTML = fallbackHtml;

  const captionEl = document.createElement('p');
  captionEl.className = 'polaroid-caption';
  captionEl.textContent = mem.caption;

  polaroidCard.appendChild(imgWrapper);
  polaroidCard.appendChild(captionEl);

  // Click to open Lightbox
  const openModal = () => openLightbox(mem, imageLoaded);
  polaroidCard.addEventListener('click', openModal);
  polaroidCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  });

  polaroidStage.innerHTML = "";
  polaroidStage.appendChild(polaroidCard);
}

// Lightbox preview logic
function openLightbox(mem, hasImage) {
  const modal = document.getElementById('lightboxModal');
  const frame = document.getElementById('lightboxFrame');
  const caption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const backdrop = document.getElementById('lightboxBackdrop');

  if (!modal || !frame) return;

  if (hasImage) {
    frame.innerHTML = `<img src="${mem.src}" alt="${mem.caption}" />`;
  } else {
    frame.innerHTML = `
      <div class="polaroid-placeholder" style="padding: 40px 20px;">
        <span class="placeholder-icon" style="font-size: 3.8rem;">${mem.fallbackEmoji}</span>
        <div class="placeholder-text" style="font-size: 1.35rem;">${mem.fallbackTitle}</div>
        <div class="placeholder-sub" style="font-size: 0.9rem;">${mem.fallbackDate}</div>
        <div style="margin-top: 10px; font-size: 0.8rem; color: #88395e;">(Add ${mem.src} to replace with your real photo)</div>
      </div>
    `;
  }

  if (caption) caption.textContent = mem.caption;
  modal.classList.remove('hidden');

  const closeModal = () => modal.classList.add('hidden');
  closeBtn.onclick = closeModal;
  backdrop.onclick = closeModal;

  window.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
      window.removeEventListener('keydown', escHandler);
    }
  });
}

// ==========================================================================
// 9. INITIALIZE EVERYTHING ON DOM READY
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Ambient Background Particles
  new AmbientCanvas('ambientCanvas');

  // 2. High Performance Confetti Cannon
  const confetti = new ConfettiCannon('confettiCanvas');

  // 3. Audio & Music Player
  new SoundController();

  // 4. Scene Manager
  const sceneManager = new SceneManager(confetti);

  // 5. Polaroid Gallery
  initGallery(confetti);

  // Set current date in letter if present
  const letterDateEl = document.getElementById('letterDate');
  if (letterDateEl) {
    const today = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    letterDateEl.textContent = `Today & Forever 💖 (${today.toLocaleDateString(undefined, options)})`;
  }
});
