import json
import sys

def apply_enhancements():
    with open('turing_prep/app/app.js', 'r', encoding='utf-8') as f:
        code = f.read()

    # 1. Define SoundFX, ConfettiFX, LEVELS before class TuringApp
    gamification_classes = """// ================= GAMIFICATION, AUDIO & VISUAL EFFECTS =================
const LEVELS = [
  { level: 1, title: 'Java Apprentice', minXP: 0, maxXP: 150 },
  { level: 2, title: 'OOP Practitioner', minXP: 150, maxXP: 400 },
  { level: 3, title: 'Spring Boot Builder', minXP: 400, maxXP: 850 },
  { level: 4, title: 'Concurrency Crafter', minXP: 850, maxXP: 1600 },
  { level: 5, title: 'Turing Senior Engineer', minXP: 1600, maxXP: 3000 }
];

class SoundFX {
  constructor() {
    this.enabled = localStorage.getItem('turing_sound_enabled') !== 'false';
    this.ctx = null;
  }
  
  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('turing_sound_enabled', this.enabled);
    return this.enabled;
  }

  initContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playCorrect() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch(e) {}
  }

  playWrong() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.22);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch(e) {}
  }

  playFanfare() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.1;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      });
    } catch(e) {}
  }
}

class ConfettiFX {
  constructor() {
    this.canvas = document.getElementById('confetti-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animating = false;
    if (this.canvas) {
      window.addEventListener('resize', () => this.resize());
      this.resize();
    }
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  launch(count = 70) {
    if (!this.canvas || !this.ctx) {
      this.canvas = document.getElementById('confetti-canvas');
      if (this.canvas) this.ctx = this.canvas.getContext('2d');
    }
    if (!this.canvas || !this.ctx) return;
    this.resize();
    const colors = ['#38bdf8', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#3b82f6'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
        y: window.innerHeight * 0.35,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 11 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }
    if (!this.animating) {
      this.animating = true;
      this.animate();
    }
  }

  animate() {
    if (!this.ctx || this.particles.length === 0) {
      this.animating = false;
      if (this.ctx && this.canvas) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.vx *= 0.98;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.012;

      if (p.opacity <= 0 || p.y > window.innerHeight) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      this.ctx.restore();
    }
    requestAnimationFrame(() => this.animate());
  }
}

// ================= APP STATE =================
"""

    old_marker = "// ================= APP STATE ================="
    if old_marker in code:
        code = code.replace(old_marker, gamification_classes, 1)
        print("Inserted SoundFX, ConfettiFX & LEVELS!")

    # 2. Update constructor in TuringApp
    old_ctor = """    // Server status
    this.serverOnline = false;

    this.init();"""

    new_ctor = """    // Server status
    this.serverOnline = false;

    // Gamification & Habit Loop
    this.sounds = new SoundFX();
    this.confetti = new ConfettiFX();
    this.xp = parseInt(localStorage.getItem('turing_xp') || '0', 10);
    this.streak = parseInt(localStorage.getItem('turing_streak') || '1', 10);
    this.lastPracticeDate = localStorage.getItem('turing_last_date') || '';
    this.dailyGoalCount = parseInt(localStorage.getItem('turing_daily_goal_count') || '0', 10);
    this.dailyGoalDate = localStorage.getItem('turing_daily_goal_date') || '';
    
    // Blitz Timer state
    this.blitzMode = false;
    this.blitzTimerInterval = null;
    this.blitzSeconds = 60;

    this.init();"""

    if old_ctor in code:
        code = code.replace(old_ctor, new_ctor)
        print("Updated constructor with gamification state!")

    # 3. Update init() in TuringApp
    old_init = """  async init() {
    this.bindEvents();
    this.applySavedTheme();
    await this.loadData();
    this.populateTopicDropdowns();
    this.renderDashboard();
    this.initMCQQuiz();
    this.renderLeetCodeList();
    this.renderTopicsList();
  }"""

    new_init = """  async init() {
    this.checkDailyStreak();
    this.bindEvents();
    this.applySavedTheme();
    await this.loadData();
    this.populateTopicDropdowns();
    this.updateGamificationUI();
    this.renderDashboard();
    this.initMCQQuiz();
    this.renderLeetCodeList();
    this.renderTopicsList();
    this.registerPWA();
  }"""

    if old_init in code:
        code = code.replace(old_init, new_init)
        print("Updated init()!")

    # 4. Update bindEvents() in TuringApp
    old_bind = """    // Tab switching
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabTarget = tab.dataset.tab;
        this.switchTab(tabTarget);
      });
    });"""

    new_bind = """    // Tab switching (Desktop Top Nav & Mobile Bottom Dock)
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabTarget = tab.dataset.tab;
        this.switchTab(tabTarget);
      });
    });

    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const tabTarget = item.dataset.tab;
        this.switchTab(tabTarget);
      });
    });

    // Sound toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.textContent = this.sounds.enabled ? '🔊' : '🔇';
      soundBtn.addEventListener('click', () => {
        const isEnabled = this.sounds.toggle();
        soundBtn.textContent = isEnabled ? '🔊' : '🔇';
        this.showToast(isEnabled ? 'Sound effects enabled' : 'Sound effects muted');
      });
    }

    // Daily Warmup Drill Button
    const warmupBtn = document.getElementById('btn-quick-warmup');
    if (warmupBtn) {
      warmupBtn.addEventListener('click', () => this.startDailyWarmupDrill());
    }

    // Blitz Timer Toggle
    const blitzToggle = document.getElementById('toggle-blitz-timer');
    if (blitzToggle) {
      blitzToggle.addEventListener('change', (e) => {
        this.blitzMode = e.target.checked;
        if (this.blitzMode) {
          this.startBlitzTimer();
        } else {
          this.clearBlitzTimer();
        }
      });
    }"""

    if old_bind in code:
        code = code.replace(old_bind, new_bind)
        print("Updated bindEvents()!")

    # 5. Update switchTab(tabId)
    old_switch = """  switchTab(tabId) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    const tabBtn = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
    const pane = document.getElementById(`tab-${tabId}`);
    if (tabBtn) tabBtn.classList.add('active');
    if (pane) pane.classList.add('active');

    if (tabId === 'dashboard') this.renderDashboard();
    if (tabId === 'leetcode') this.renderLeetCodeList();
    if (tabId === 'knowledge') this.renderTopicsList();
  }"""

    new_switch = """  switchTab(tabId) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.mobile-nav-item').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    const tabBtn = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
    const mobileBtn = document.querySelector(`.mobile-nav-item[data-tab="${tabId}"]`);
    const pane = document.getElementById(`tab-${tabId}`);
    if (tabBtn) tabBtn.classList.add('active');
    if (mobileBtn) mobileBtn.classList.add('active');
    if (pane) pane.classList.add('active');

    // Scroll to top on mobile tab change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tabId === 'dashboard') this.renderDashboard();
    if (tabId === 'leetcode') this.renderLeetCodeList();
    if (tabId === 'knowledge') this.renderTopicsList();
  }"""

    if old_switch in code:
        code = code.replace(old_switch, new_switch)
        print("Updated switchTab()!")

    # 6. Update evaluateAnswer
    old_eval_branch = """    if (!stats.topicMastery[question.topicId]) {
      stats.topicMastery[question.topicId] = { attempts: 0, correct: 0, score: 0 };
    }
    const tMastery = stats.topicMastery[question.topicId];
    tMastery.attempts += 1;
    if (isCorrect) tMastery.correct += 1;
    tMastery.score = Math.round((tMastery.correct / tMastery.attempts) * 100);

    this.saveData();
    this.updateHeaderMetrics();
    this.renderCurrentQuestion();"""

    new_eval_branch = """    if (!stats.topicMastery[question.topicId]) {
      stats.topicMastery[question.topicId] = { attempts: 0, correct: 0, score: 0 };
    }
    const tMastery = stats.topicMastery[question.topicId];
    tMastery.attempts += 1;
    if (isCorrect) tMastery.correct += 1;
    tMastery.score = Math.round((tMastery.correct / tMastery.attempts) * 100);

    // Audio & Gamification feedback
    this.clearBlitzTimer();
    if (isCorrect) {
      this.sounds.playCorrect();
      this.addXP(15);
      this.incrementDailyGoal();
    } else {
      this.sounds.playWrong();
    }
    this.recordPracticeActivity();

    // Check if entire active drill completed with distinction (>=80%)
    const allAnswered = this.activeQuizList.every(q => this.answeredQuestions[q.id]);
    if (allAnswered && this.activeQuizList.length >= 3) {
      const correctCount = this.activeQuizList.filter(q => this.answeredQuestions[q.id]?.isCorrect).length;
      if (correctCount / this.activeQuizList.length >= 0.8) {
        setTimeout(() => {
          this.sounds.playFanfare();
          this.confetti.launch(85);
          this.showToast(`🎯 Drill Complete! ${correctCount}/${this.activeQuizList.length} Correct. Excellent mastery!`);
        }, 350);
      }
    }

    this.saveData();
    this.updateHeaderMetrics();
    this.renderCurrentQuestion();"""

    if old_eval_branch in code:
        code = code.replace(old_eval_branch, new_eval_branch)
        print("Updated evaluateAnswer() with audio & gamification!")

    # 7. Add Blitz timer launch inside renderCurrentQuestion()
    old_render_q = """    // Multi-Select Action Bar Visibility
    const multiselectBar = document.getElementById('multiselect-action-bar');
    if (multiselectBar) {
      if (currentQ.isMultiSelect && !answerState) {
        multiselectBar.classList.remove('hidden');
      } else {
        multiselectBar.classList.add('hidden');
      }
    }"""

    new_render_q = """    // Multi-Select Action Bar Visibility
    const multiselectBar = document.getElementById('multiselect-action-bar');
    if (multiselectBar) {
      if (currentQ.isMultiSelect && !answerState) {
        multiselectBar.classList.remove('hidden');
      } else {
        multiselectBar.classList.add('hidden');
      }
    }

    // Blitz Timer handling
    if (this.blitzMode && !answerState) {
      this.startBlitzTimer();
    } else {
      this.clearBlitzTimer();
    }"""

    if old_render_q in code:
        code = code.replace(old_render_q, new_render_q)
        print("Updated renderCurrentQuestion() with blitz timer handling!")

    # 8. Add gamification helper methods before class TuringApp ends
    helper_methods = """  // ================= GAMIFICATION & REWARD LOGIC =================
  addXP(amount) {
    const prevXP = this.xp;
    this.xp += amount;
    localStorage.setItem('turing_xp', this.xp);

    const prevLevel = this.getLevel(prevXP);
    const newLevel = this.getLevel(this.xp);

    this.updateGamificationUI();

    if (newLevel.level > prevLevel.level) {
      setTimeout(() => {
        this.sounds.playFanfare();
        this.confetti.launch(110);
        this.showToast(`🎉 Level Up! You reached Level ${newLevel.level}: ${newLevel.title}!`);
      }, 300);
    }
  }

  getLevel(xp) {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (xp >= LEVELS[i].minXP) return LEVELS[i];
    }
    return LEVELS[0];
  }

  updateGamificationUI() {
    const currentLevel = this.getLevel(this.xp);
    const levelBadge = document.getElementById('xp-level-badge');
    const xpText = document.getElementById('xp-text');
    const xpFill = document.getElementById('xp-bar-fill');
    const streakPill = document.getElementById('metric-streak-count');

    if (levelBadge) {
      levelBadge.textContent = `Lvl ${currentLevel.level} · ${currentLevel.title}`;
    }

    if (xpText && xpFill) {
      const nextXP = currentLevel.maxXP;
      const progressInLevel = this.xp - currentLevel.minXP;
      const neededInLevel = currentLevel.maxXP - currentLevel.minXP;
      const pct = Math.min(100, Math.round((progressInLevel / neededInLevel) * 100));

      xpText.textContent = `${this.xp} / ${nextXP} XP`;
      xpFill.style.width = `${pct}%`;
    }

    if (streakPill) {
      streakPill.textContent = `🔥 ${this.streak} Day${this.streak > 1 ? 's' : ''}`;
    }

    // Dashboard Quest Card updates
    const questBadge = document.getElementById('quest-streak-badge');
    const questSub = document.getElementById('quest-goal-sub');
    const questFill = document.getElementById('quest-progress-fill');

    if (questBadge) questBadge.textContent = `🔥 ${this.streak} Day Streak`;
    if (questSub) questSub.textContent = `${this.dailyGoalCount} of 5 completed today`;
    if (questFill) {
      const goalPct = Math.min(100, Math.round((this.dailyGoalCount / 5) * 100));
      questFill.style.width = `${goalPct}%`;
    }
  }

  checkDailyStreak() {
    const today = new Date().toISOString().slice(0, 10);
    
    // Check daily goal reset
    if (this.dailyGoalDate !== today) {
      this.dailyGoalDate = today;
      this.dailyGoalCount = 0;
      localStorage.setItem('turing_daily_goal_date', this.dailyGoalDate);
      localStorage.setItem('turing_daily_goal_count', '0');
    }

    // Check streak
    if (!this.lastPracticeDate) {
      this.streak = 1;
      this.lastPracticeDate = today;
      localStorage.setItem('turing_streak', '1');
      localStorage.setItem('turing_last_date', today);
      return;
    }

    if (this.lastPracticeDate === today) {
      return; // Already active today
    }

    const last = new Date(this.lastPracticeDate);
    const curr = new Date(today);
    const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day!
      this.streak += 1;
      this.lastPracticeDate = today;
      localStorage.setItem('turing_streak', this.streak);
      localStorage.setItem('turing_last_date', today);
    } else if (diffDays > 1) {
      // Streak broken
      this.streak = 1;
      this.lastPracticeDate = today;
      localStorage.setItem('turing_streak', '1');
      localStorage.setItem('turing_last_date', today);
    }
  }

  recordPracticeActivity() {
    const today = new Date().toISOString().slice(0, 10);
    if (this.lastPracticeDate !== today) {
      this.checkDailyStreak();
    }
  }

  incrementDailyGoal() {
    this.dailyGoalCount += 1;
    localStorage.setItem('turing_daily_goal_count', this.dailyGoalCount);
    
    if (this.dailyGoalCount === 5) {
      setTimeout(() => {
        this.addXP(50);
        this.sounds.playFanfare();
        this.confetti.launch(90);
        this.showToast('🎯 Quest Complete! 5/5 daily MCQs conquered! (+50 XP)');
      }, 500);
    }
    this.updateGamificationUI();
  }

  // ================= BLITZ TIMER SYSTEM =================
  startBlitzTimer() {
    this.clearBlitzTimer();
    const container = document.getElementById('blitz-timer-container');
    const fill = document.getElementById('blitz-timer-fill');
    const label = document.getElementById('blitz-timer-text');
    if (!container || !fill || !label) return;

    container.classList.remove('hidden');
    this.blitzSeconds = 60;
    fill.style.width = '100%';
    fill.style.background = 'linear-gradient(90deg, var(--accent-amber), var(--accent-rose))';
    label.textContent = '⏱️ 60s';

    this.blitzTimerInterval = setInterval(() => {
      this.blitzSeconds -= 1;
      const pct = Math.max(0, (this.blitzSeconds / 60) * 100);
      fill.style.width = `${pct}%`;
      label.textContent = `⏱️ ${this.blitzSeconds}s`;

      if (this.blitzSeconds <= 15) {
        fill.style.background = 'var(--accent-rose)';
        label.style.color = 'var(--accent-rose)';
      }

      if (this.blitzSeconds <= 0) {
        this.clearBlitzTimer();
        const currentQ = this.activeQuizList[this.currentQuizIndex];
        if (currentQ && !this.answeredQuestions[currentQ.id]) {
          this.evaluateAnswer(currentQ, []);
          this.showToast('⏱️ Time up! Review the breakdown below.');
        }
      }
    }, 1000);
  }

  clearBlitzTimer() {
    if (this.blitzTimerInterval) {
      clearInterval(this.blitzTimerInterval);
      this.blitzTimerInterval = null;
    }
    const container = document.getElementById('blitz-timer-container');
    if (container && !this.blitzMode) {
      container.classList.add('hidden');
    }
  }

  // ================= DAILY WARMUP DRILL =================
  startDailyWarmupDrill() {
    if (!this.mcqs || this.mcqs.length === 0) return;

    // Pick 5 varied questions
    const shuffled = [...this.mcqs].sort(() => 0.5 - Math.random());
    const picked = [];
    const seenTopics = new Set();

    for (const q of shuffled) {
      if (!seenTopics.has(q.topicId)) {
        picked.push(q);
        seenTopics.add(q.topicId);
        if (picked.length >= 5) break;
      }
    }

    if (picked.length < 5) {
      for (const q of shuffled) {
        if (!picked.includes(q)) {
          picked.push(q);
          if (picked.length >= 5) break;
        }
      }
    }

    this.activeQuizList = picked;
    this.currentQuizIndex = 0;
    this.answeredQuestions = {};
    this.pendingMultiSelections.clear();
    this.manuallyOpenedExplanations.clear();

    document.getElementById('filter-topic').value = 'all';
    document.getElementById('filter-difficulty').value = 'all';
    document.getElementById('filter-weak-only').checked = false;

    this.switchTab('mcq');
    this.renderCurrentQuestion();
    this.showToast('⚡ Daily 5-Question Warmup Loaded! Give it your best shot.');
  }

  // ================= PWA REGISTRATION =================
  registerPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => {
          console.log('[PWA] ServiceWorker registration:', err);
        });
      });
    }
  }
"""

    # Insert before the last closing brace
    last_brace_idx = code.rfind('}')
    if last_brace_idx != -1:
        code = code[:last_brace_idx] + helper_methods + "\n}\n" + code[last_brace_idx+1:]
        print("Inserted gamification helper methods!")

    with open('turing_prep/app/app.js', 'w', encoding='utf-8') as f:
        f.write(code)

    print("Successfully updated app/app.js with full gamification, audio, confetti, blitz timer & PWA support!")

if __name__ == '__main__':
    apply_enhancements()

