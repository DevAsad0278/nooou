# 🌸 Nisha's Little World — An Interactive Birthday Surprise 🎂✨

A heartfelt, dreamy, emotionally meaningful interactive birthday surprise website created with love for **Nisha** by her sister-like friend **Tania**.

Built purely with **HTML5, CSS3, and Vanilla JavaScript** — zero frameworks, ultra-responsive, mobile-first, and loaded with thoughtful animations, interactive birthday cake, typewriter letter reveal, sound controls, and polaroid photo memories!

---

## 🌟 Surprise Journey & Experience

1. **Scene 1: Secret Birthday Welcome**
   - Floating hearts, sparkles, glowing avatar, and private note greeting.
   - Interactive glowing call-to-action: *"Open Your Surprise ✨"*.
2. **Scene 2: Interactive 3-Tier Birthday Cake**
   - Pure CSS layered cake with frosting drips, sugar pearls, and strawberries.
   - Clicking the cake sequentially lights the candle flames with warm flicker animations and launches celebratory confetti.
   - Typewriter announcement: *"HAPPY BIRTHDAY, MY DEAR SISTER! 🎂💗 Today is all about YOU, Nisha!"*.
3. **Scene 3: A Fun "YES or NO" Question**
   - Floating 3D ribbon gift box.
   - *"Nisha, are you ready to see how special you are to me? 🥹💗"*.
   - **YES Button**: Pops confetti, opens the gift box lid, and continues the journey.
   - **NO Button**: Playfully dodges clicks/hovers within the card bounds and cycles through witty, affectionate remarks (*"Excuse me, birthday girl! You HAVE to see this little surprise! 😂💕"*).
4. **Scene 4: The Heartfelt Letter**
   - Sealed envelope with a golden monogram seal.
   - Clicking the seal unseals the envelope and pulls out Tania's heartfelt personal letter with a smooth typewriter animation.
   - Includes a *Replay Letter ↺* button and *See Our Memories 📸* navigation.
5. **Scene 5: Our Little Memory Gallery**
   - Polaroid-style picture frames with subtle rotation and soft drop shadows.
   - Carousel navigation (`‹` and `›`), thumbnails, and keyboard arrow support.
   - Clicking any photo opens a high-resolution lightbox modal.
   - Graceful fallback cards if photos are being updated.
6. **Scene 6: Birthday Wishes & Final Celebrations**
   - Floating celebratory balloons, glowing cake halo, and large festive heading.
   - Heartfelt personal quote card.
   - Interactive *"Throw Confetti! 🎊"* button.
   - Replay buttons: *"Read My Letter Again 💌"* & *"Relive the Surprise ✨"*.

---

## 📁 Project Structure

```text
nisha-birthday-surprise/
├── index.html                  # Accessible semantic structure with 6 scenes
├── css/
│   └── style.css               # Custom design system (Pink, Lavender, Rose Gold)
├── js/
│   └── script.js               # Clean Vanilla JS (Particles, Confetti, Audio, Router)
├── assets/
│   ├── images/
│   │   ├── photo1.jpg          # Polaroid Memory 1
│   │   ├── photo2.jpg          # Polaroid Memory 2
│   │   ├── photo3.jpg          # Polaroid Memory 3
│   │   └── photo4.jpg          # Polaroid Memory 4
│   └── audio/
│       └── birthday-music.mp3  # Optional background music (Fallback chimes included)
└── README.md
```

---

## 🚀 How to Run Locally

Because this project is built using pure standard web technologies, you can run it in multiple easy ways:

### Option A: Direct Browser Preview (Instant)
Simply double-click `index.html` or drag it into any web browser (Google Chrome, Safari, Microsoft Edge, Firefox, Brave).

### Option B: Local Live Server (Recommended)
You can start a lightweight local server to test audio and asset loading smoothly:

```bash
# Using Python 3:
cd nisha-birthday-surprise
python -m http.server 8080

# Or using Node.js:
npx serve .
```
Then open your browser and navigate to: `http://localhost:8080` (or `http://localhost:3000`).

---

## 📸 Adding Real Photos & Changing Captions

1. Place your pictures into the `assets/images/` folder with these names:
   - `photo1.jpg`
   - `photo2.jpg`
   - `photo3.jpg`
   - `photo4.jpg`
2. You can also add more photos! To change the captions or customize titles, open `js/script.js` and look at the `SURPRISE_CONFIG.memories` array at the top of the file:
   ```javascript
   {
     id: 1,
     src: "assets/images/photo1.jpg",
     caption: "A little memory, a lot of love 💗"
   }
   ```
3. If an image is missing, the website will **gracefully render a sweet pastel card** with an icon and custom title instead of showing an ugly broken image symbol.

---

## 🎵 Background Music & Audio Fallback

- **Adding your song**: Place any MP3 file into `assets/audio/birthday-music.mp3`.
- **Music Controls**: There is a music toggle button in the top navigation bar. For accessibility and browser policies, audio never autoplays until toggled.
- **Built-in Chime Synthesizer Fallback**: Even if you don't add an MP3 file, clicking the music button will automatically generate a soothing, dreamy music-box chime melody using the browser's built-in Web Audio API!

---

## 🌐 How to Publish & Share with Nisha

You can share this surprise with Nisha over a public link for free in under 2 minutes:

### Method 1: GitHub Pages (Free & Easy)
1. Create a free account on [GitHub.com](https://github.com).
2. Create a new repository named `nisha-birthday-surprise`.
3. Upload all the files inside `nisha-birthday-surprise/` to the repository.
4. Go to **Settings** > **Pages**.
5. Under **Branch**, select `main` (or `master`) and `/root`, then click **Save**.
6. Within a minute, your link will be live at:
   `https://<your-username>.github.io/nisha-birthday-surprise/`
7. Copy the link and send it to Nisha with a birthday wish! 💌

### Method 2: Vercel (Instant Drag & Drop)
1. Go to [Vercel.com](https://vercel.com) and sign up/log in.
2. Drag and drop the `nisha-birthday-surprise` folder into Vercel Dashboard.
3. Click **Deploy**.
4. You will instantly get a custom URL like `https://nisha-birthday-surprise.vercel.app`!

---

## 💗 Crafted With Care

- **Recipient:** Nisha 🌸
- **Sender:** Tania 💖
- **Made with:** HTML5, CSS3 & Vanilla JavaScript
