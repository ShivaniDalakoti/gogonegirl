# Gone Girl Pitch Video - Complete Filming Guide

## 📹 Overview

You're creating a **2-minute founder pitch video** for Amit. It has three parts:

1. **On-camera intro** (You, speaking directly to camera) — 12 seconds
2. **App demo with voiceover** (Screen recording + your voice over it) — 75 seconds
3. **On-camera outro** (You, speaking vision) — 33 seconds

---

## 🎥 PART 1: ON-CAMERA SEGMENTS (Do These First)

### Setup (5 minutes)

**Lighting:**
- Face a window with natural light
- Or use a ring light (phone ringlight is fine)
- **Avoid:** Backlighting (sun behind you), harsh shadows on face

**Audio:**
- Use phone's built-in mic (fine for this)
- Find a quiet room (no background noise, AC, pets)
- Test audio: Record 10 seconds, play it back. Sound clear?

**Camera:**
- Use phone camera (doesn't need to be fancy)
- Prop phone up at eye level (not looking down)
- Angle slightly toward you
- **Dress:** Whatever makes you feel confident. Solid colors work best (avoid busy patterns)

### SCENE 1: The Hook (0:00-0:12)
**What you're doing:** Stating the problem + your solution, eye contact with camera

**Script (read naturally, not robotic):**

> "Hi, I'm Shivani. Women travelers spend over $100 billion a year, but every platform treats travel like a commodity transaction—anonymous, transactional, lonely.
> 
> We built Gone Girl to change that."

**How to nail it:**
1. Press record
2. Take a breath (pause 1 second)
3. Look at camera lens (not the screen)
4. Speak clearly, conversational tone
5. Smile slightly—it comes through in your voice
6. Pause after final sentence (let it land)
7. Stop recording

**Do this 3-5 times.** Pick the best take. The first or second is usually best (less overthinking).

**File:** Save as `pitch_hook.mp4`

---

### SCENE 2: The Wedge (1:20-1:35 in final video)
**What you're doing:** Explaining WHY this works—the defensible insight

**Script:**

> "Here's why this works: trust is the highest-margin feature in travel. Women don't want the cheapest flight to Bali. They want to go with people they trust, in an environment designed for safety and sisterhood.
> 
> Every competitor optimizes for price. We optimize for belonging."

**How to nail it:**
1. Press record
2. Pause 1 second
3. This is your "founder moment"—own it. Speak with conviction.
4. Make eye contact
5. Slightly slower pace than the hook—this is the insight moment
6. Pause after "belonging"
7. Stop

**Do 3-5 takes.** This one needs confidence. Pick the one where you sound most certain.

**File:** Save as `pitch_wedge.mp4`

---

### SCENE 3: The Vision (1:50-2:00 in final video)
**What you're doing:** Paint the future, inspire

**Script:**

> "Travel is one of the few spaces where women outnumber men as consumers but have zero platforms built for them. We're building the social network for women travel.
> 
> In five years, when a woman thinks about booking a trip with her community, she thinks Gone Girl. Let's go."

**How to nail it:**
1. Press record
2. Pause 1 second
3. Speak with vision + confidence
4. You're not asking permission; you're inviting them to join
5. After "Let's go" — smile slightly, hold for 1 second, then stop
6. This one should feel like an ending—definitive

**Do 3-5 takes.** Go for the take where you sound most inspired.

**File:** Save as `pitch_vision.mp4`

---

## 📺 PART 2: SCREEN RECORDING (Do This Second)

### Before you record:

**Verify the app is working:**
```bash
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
cd app
npm run dev
```

Open http://localhost:5173 in Chrome. Wait for it to fully load.

**Test the flow:**
1. Home page loads ✓
2. Click "Explore Trips" → Trips page loads ✓
3. Click "Himalayan Escape" → Trip details load ✓
4. Click "Book Now" → Booking page loads ✓

**If anything is slow or broken:** Fix it before recording.

---

### Screen Recording Settings (Mac)

Use **QuickTime Screen Recording:**

1. Open QuickTime Player
2. File → New Screen Recording
3. A window appears with record button
4. Click the dropdown next to record button → Select "Chrome" as mic source
5. Click on screen to select recording area (pick a reasonable size, ~1280×720)
6. Click Start recording
7. Demo the app
8. Click Stop when done
9. File → Save (save as `demo_full.mp4`)

**Alternative:** Use ScreenFlow or OBS if you're more comfortable with those.

---

### EXACT DEMO FLOW (Copy This)

**Step 1:** Start recording (Chrome window, your app visible)

**Step 2:** 
- Already on home page
- Scroll down to show testimonials & gallery (pause 1 sec)
- Scroll back up

**Step 3:**
- Click "Explore Trips" button
- Wait for Trips page to load (3-5 seconds)
- Pause and look at trips grid (let viewer see all 4 trips)

**Step 4:**
- Click on "Himalayan Escape" card
- Wait for Trip Details to load
- Scroll down slightly to show reviews/ratings (1 sec)
- Scroll back up

**Step 5:**
- Click "Book Now" button
- Wait for Booking page to load
- Look at the form (dates, travelers, price)
- Pause for 2-3 seconds (let viewer read)

**Step 6:**
- Stop recording

**Total recording time: ~60-75 seconds**

---

### Pro Tips for Screen Recording

1. **Move the mouse deliberately** — Smooth, not jerky
2. **Don't click too fast** — Let pages load naturally
3. **Pause at key moments** — Give viewer time to read
4. **Keep resolution consistent** — Don't zoom in/out
5. **No extra windows open** — Just the app

---

## 🔊 PART 3: AUDIO & VOICEOVER

### Recording Voiceover (Use Audacity or GarageBand - Free)

**Script:** Use the voiceover from the pitch script (PITCH_SCRIPT_2MIN.md)

**How to record:**
1. Open Audacity (free, download from audacityteam.org)
2. File → New
3. Click red record button
4. Speak the voiceover at a comfortable pace (not too fast)
5. When done, File → Export → MP3
6. Save as `voiceover.mp3`

**Timing:** Record the voiceover to exactly match the screen recording (75 seconds). Speak deliberately, not rushed.

---

## 🎬 PART 4: ASSEMBLING THE VIDEO (Use iMovie or CapCut)

### In iMovie (Mac - Free):

1. **Create New Project** → "Movie"
2. **Import files:**
   - Drag in `pitch_hook.mp4`
   - Drag in `demo_full.mp4`
   - Drag in `pitch_wedge.mp4`
   - Drag in `pitch_vision.mp4`
   - Drag in `voiceover.mp3`

3. **Timeline order:**
   - Clip 1: `pitch_hook.mp4` (12 sec)
   - Clip 2: `demo_full.mp4` (with voiceover layered on top)
   - Clip 3: `pitch_wedge.mp4` (15 sec)
   - Clip 4: `pitch_vision.mp4` (10 sec)

4. **Sync the voiceover:**
   - In the timeline, drag `voiceover.mp3` to the audio track
   - Make it sync with `demo_full.mp4`
   - This requires listening and adjusting—trim or mute original screen audio

5. **Optional:** Add background music
   - Download royalty-free track from YouTube Audio Library
   - Add as a low-volume background layer
   - Keep it subtle—voiceover is the star

6. **Export:**
   - File → Share → File
   - Format: MP4
   - Resolution: 1080p
   - Quality: High

---

### In CapCut (Free, easier for beginners):

1. **New Project**
2. **Import all video files** (drag into library)
3. **Arrange in timeline:**
   - Drag `pitch_hook.mp4` → Timeline
   - Drag `demo_full.mp4` → Timeline (after hook)
   - Drag `pitch_wedge.mp4` → Timeline
   - Drag `pitch_vision.mp4` → Timeline

4. **Add voiceover:**
   - Audio tab → Upload `voiceover.mp3`
   - Drag to audio track under `demo_full.mp4`
   - Mute the original demo audio (if any)
   - Sync timing by listening

5. **Optional:** Add music
   - Audio → Music
   - Pick royalty-free track
   - Keep volume low (fade in/out)

6. **Export:**
   - Export as MP4, 1080p

---

## 🎵 BACKGROUND MUSIC (Optional but Nice)

Find royalty-free music on:
- **YouTube Audio Library** (free with YouTube account)
- **Epidemic Sound** (paid but high quality)
- **Bensound** (free)

**What to pick:**
- Uplifting, modern, not cheesy
- ~100-130 BPM (energetic)
- No lyrics
- ~30 seconds of intro before you speak
- Fade out during voiceover, fade in after

**How to layer:**
- Import music track
- Lower volume to -6dB (so voiceover is clear but music supports)
- Fade in at start, fade out during voiceover sections

---

## ✅ FINAL CHECKLIST

### Video Quality
- [ ] Video is exactly 2:00 long
- [ ] Resolution is 1080p or higher
- [ ] Audio is clear (voiceover audible, no background noise)
- [ ] Screen demos are smooth (no stuttering)
- [ ] Color grading is consistent

### Content
- [ ] Hook is confident and clear
- [ ] Demo flow is logical (home → trips → details → booking)
- [ ] Voiceover matches timing of screen recording
- [ ] Wedge statement is compelling
- [ ] Vision is inspiring and clear
- [ ] Outro ends decisively

### Technical
- [ ] File format is MP4
- [ ] File size is under 500MB
- [ ] Video plays smoothly on another device
- [ ] Audio syncs perfectly (no lip-flap if on-camera)
- [ ] No glitches, cuts, or errors

### Style
- [ ] You sound authentic (conversational, not corporate)
- [ ] You make eye contact with camera (on-camera segments)
- [ ] App loads quickly in demo (no annoying waits)
- [ ] Overall video feels like a founder sharing their vision

---

## 🚀 FILMING TIMELINE

**Day 1:** Record on-camera segments (30 min)
**Day 2:** Record screen demo (20 min), test app works
**Day 3:** Record voiceover (15 min)
**Day 4:** Assemble in iMovie/CapCut (1-2 hours)
**Day 5:** Review, make tweaks, export final version

**Total time investment: ~4-5 hours**

---

## 💡 FINAL THOUGHTS

This video is your **unfair advantage**. 95% of founders pitching to Amit send slide decks. You're sending **proof that you can build**.

The goal isn't perfection. The goal is authenticity + execution + vision.

- **Authenticity:** Sound like you, not a script
- **Execution:** Show working product, not mockups
- **Vision:** Paint a picture of the future

You've got all three.

**Now go film it.**

---

## 🎬 QUICK REFERENCE - COMMANDS TO START APP

```bash
# Terminal 1 - Backend
cd /Users/shivanidalakoti/Desktop/workspace/gogonegirl
npm start

# Terminal 2 - Frontend (new tab)
cd /Users/shivanidalakoti/Desktop/workspace/gogonegirl/app
npm run dev

# Then open in Chrome:
# http://localhost:5173
```

If anything breaks:
- Stop both processes (Ctrl+C)
- Try `npm install` in both directories
- Restart both processes
- Refresh browser

You've got this. 🚀
