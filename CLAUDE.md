# Project: Czech Mate — Language Learning Website

## Code Rules
- Static site: HTML, CSS, vanilla JS only. No frameworks.
- data.js holds all scenario data (SCENARIOS, SCENARIOS_V2, PHRASES, LangUtils)
- chat.js holds the ChatEngine IIFE — do not restructure it
- Do NOT rewrite whole files. Edit only what's requested.
- Do NOT rewrite the entire project. Only add and fix features requested.

## Response Style
- Be concise. No preamble, no summaries after edits.
- Don't explain what you're about to do — just do it.
- No "Great question!" or filler phrases.
- Short confirmations only ("Done." not paragraphs).
- Skip reading files you don't need to touch.

---

## Feature Requirements

### 1. Language System
- ONE shared scenario system (SCENARIOS_V2)
- Same scenarios for Czech + Spanish — language switch only changes display
- Every phrase must include: czech, english, spanish — no missing Spanish content

### 2. Chat Fixes
- Never repeat same AI response twice in a row
- Never reset conversation randomly
- keyword matching (not exact) — already done via norm()
- Fallbacks must guide: show example like `"Hmm 😄 try saying something like 'Jedno pivo'"`
- Play Along mode (triggered by "play along" or "help me impress"):
  - AI becomes cooperative waiter/receptionist
  - Helps user succeed, does not make it hard
  - Stays in play along mode for the conversation

### 3. Impress Mode
- Button on practice page: "I want to impress someone 😏"
- AI suggests simple phrases, supportive tone
- Helps user sound confident

### 4. Date Mode (main feature)
- Button on homepage: "I have a date tonight 😏"
- Step 1: Ask first date? bar / restaurant / walk?
- Step 2: Give useful phrases (ordering drinks, small talk, light flirting, asking questions)
- Step 3: Live support — if user types "I don't understand" or "she said something fast" → give simple response phrase
- Step 4: Confidence boost "You're doing better than you think 😄"
- Style: simple Czech, practical, slightly playful

### 5. Swear Word Handling
- Czech: kurva, prdele + others; Spanish: coño, joder, puta + others
- Response: playful warning OR slightly rude reply — varied, not always the same

### 6. Retention Hook
- At end of each scenario completion banner: "Try this in real life today"
- Scenario-specific: e.g. "Order a beer in Czech tonight 🍺"
