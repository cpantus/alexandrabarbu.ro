---
title: "Stilul de Atașament ECR-RS"
description: "Test pentru evaluarea stilului de atașament în relații pe două dimensiuni: anxietate și evitare. 9 întrebări."
date: 2026-02-18
author: "Psiholog Alexandra Barbu"
layout: "single"
draft: false
---

<div class="c-assessment__disclaimer">
⚠️ <strong>Atenție:</strong> Acest test este un instrument de auto-evaluare, nu un diagnostic clinic. Stilul de atașament este un concept psihologic complex, iar rezultatele sunt orientative. Pentru o înțelegere aprofundată, consultă un psiholog.
</div>

<div x-data="ecrsApp()" class="c-assessment">
  <div class="c-assessment__progress">
    <div class="c-assessment__progress-bar" :style="'width:' + progress + '%'"></div>
  </div>

  <div x-show="!showResults">
      <div class="c-assessment__question">
        <div class="c-assessment__question-number" x-text="'Întrebarea ' + (currentIndex + 1) + ' din ' + questions.length"></div>
        <div class="c-assessment__question-text" x-text="questions[currentIndex].text"></div>
        <div class="c-assessment__options">
          <template x-for="(opt, i) in options" :key="i">
            <div class="c-assessment__option"
                 :class="{'c-assessment__option--selected': answers[currentIndex] === (i + 1)}"
                 @click="answers[currentIndex] = i + 1; if(currentIndex < questions.length - 1) { setTimeout(() => next(), 300) }">
              <div class="c-assessment__option-radio"></div>
              <div class="c-assessment__option-label" x-text="opt"></div>
            </div>
          </template>
        </div>
      </div>
      <div class="c-assessment__nav">
        <button class="c-assessment__btn c-assessment__btn--secondary" @click="prev()" x-show="currentIndex > 0">Înapoi</button>
        <div class="c-assessment__counter" x-text="(currentIndex + 1) + ' / ' + questions.length"></div>
        <button class="c-assessment__btn c-assessment__btn--primary" @click="currentIndex === questions.length - 1 ? calculate() : next()" :disabled="answers[currentIndex] === null">
          <span x-text="currentIndex === questions.length - 1 ? 'Vezi Rezultatele' : 'Următoarea'"></span>
        </button>
      </div>
  </div>

  <div x-show="showResults" class="c-assessment__results">
      <div class="c-assessment__score-display">
        <span class="c-assessment__score-value" x-text="attachmentStyle"></span>
      </div>
      <div class="c-assessment__subscales">
        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Evitare</span>
          <span class="c-assessment__subscale-value" x-text="avoidanceScore.toFixed(1) + ' / 7'"></span>
        </div>
        <div :class="'c-assessment__severity--' + avoidanceSeverity" style="margin-bottom: 1rem;">
          <span x-text="avoidanceScore < 3.5 ? 'Scăzut' : 'Ridicat'"></span>
        </div>
        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Anxietate</span>
          <span class="c-assessment__subscale-value" x-text="anxietyScore.toFixed(1) + ' / 7'"></span>
        </div>
        <div :class="'c-assessment__severity--' + anxietySeverity" style="margin-bottom: 1rem;">
          <span x-text="anxietyScore < 3.5 ? 'Scăzut' : 'Ridicat'"></span>
        </div>
      </div>
      <div class="c-assessment__interpretation" x-html="interpretation"></div>
      <div class="c-assessment__disclaimer">
        ⚠️ Acest rezultat este orientativ. Stilul de atașament nu este fix — poate evolua prin experiențe de viață și terapie. Pentru o înțelegere completă a tiparelor tale relaționale, consultă un psiholog.
      </div>
      <div class="c-assessment__cta">
        <a href="https://cal.com/alexandra-barbu-ras8xc/50min" class="c-button c-button--primary">Programează o Consultație</a>
      </div>
      <button class="c-assessment__restart" @click="restart()">Reia Testul</button>
  </div>
</div>

<script>
function ecrsApp() {
  return {
    currentIndex: 0,
    answers: new Array(9).fill(null),
    showResults: false,
    avoidanceScore: 0,
    anxietyScore: 0,
    attachmentStyle: '',
    avoidanceSeverity: '',
    anxietySeverity: '',
    interpretation: '',
    questions: [
      { text: 'Mă ajută să mă bazez pe persoanele apropiate mie.' },
      { text: 'Știu că persoanele apropiate mie vor fi acolo când am nevoie de ele.' },
      { text: 'Nu mă simt confortabil să mă deschid în fața persoanelor apropiate.' },
      { text: 'Prefer să nu fiu prea apropiat(ă) de persoanele din viața mea.' },
      { text: 'Îmi fac griji că persoanele apropiate mie nu mă apreciază la fel de mult cum le apreciez eu.' },
      { text: 'Îmi fac griji că persoanele apropiate mie nu țin la mine cu adevărat.' },
      { text: 'Îmi fac griji mult în legătură cu relațiile mele.' },
      { text: 'Îmi fac griji că voi fi abandonat(ă).' },
      { text: 'Mă tem că persoanele apropiate mă vor respinge.' }
    ],
    options: [
      '1 — Dezacord total',
      '2 — Dezacord',
      '3 — Ușor dezacord',
      '4 — Neutru',
      '5 — Ușor acord',
      '6 — Acord',
      '7 — Acord total'
    ],
    get progress() {
      var answered = this.answers.filter(a => a !== null).length;
      return Math.round((answered / this.questions.length) * 100);
    },
    next() { if (this.currentIndex < this.questions.length - 1) this.currentIndex++; },
    prev() { if (this.currentIndex > 0) this.currentIndex--; },
    calculate() {
      // Avoidance: items 1-4 (indices 0-3), reverse score items 1 and 2 (indices 0, 1)
      var item1 = 8 - this.answers[0]; // reverse
      var item2 = 8 - this.answers[1]; // reverse
      var item3 = this.answers[2];
      var item4 = this.answers[3];
      this.avoidanceScore = (item1 + item2 + item3 + item4) / 4;

      // Anxiety: items 5-9 (indices 4-8)
      this.anxietyScore = (this.answers[4] + this.answers[5] + this.answers[6] + this.answers[7] + this.answers[8]) / 5;

      this.avoidanceSeverity = this.avoidanceScore < 3.5 ? 'minimal' : 'moderate';
      this.anxietySeverity = this.anxietyScore < 3.5 ? 'minimal' : 'moderate';

      var lowAvoid = this.avoidanceScore < 3.5;
      var lowAnx = this.anxietyScore < 3.5;

      if (lowAvoid && lowAnx) {
        this.attachmentStyle = 'Atașament Securizant';
        this.interpretation = '<strong>Stil de atașament securizant.</strong> Te simți confortabil atât cu intimitatea, cât și cu independența în relații. Ai încredere că persoanele importante din viața ta vor fi acolo când ai nevoie și nu te îngrijorezi excesiv în legătură cu relațiile tale. Acest stil este asociat cu relații stabile și satisfăcătoare.';
      } else if (lowAvoid && !lowAnx) {
        this.attachmentStyle = 'Atașament Anxios-Preocupat';
        this.interpretation = '<strong>Stil de atașament anxios-preocupat.</strong> Cauți intimitate și apropiere în relații, dar te îngrijorezi frecvent că cei dragi nu te apreciază la fel de mult sau te vor abandona. Acest stil poate duce la nevoie de reasigurare constantă. Terapia poate ajuta la dezvoltarea unui sentiment mai stabil de securitate în relații.';
      } else if (!lowAvoid && lowAnx) {
        this.attachmentStyle = 'Atașament Evitant-Distant';
        this.interpretation = '<strong>Stil de atașament evitant-distant.</strong> Tindi să prețuiești independența și autosuficiența, uneori evitând intimitatea emoțională. Poate fi dificil să te bazezi pe alții sau să te deschizi emoțional. Terapia poate ajuta la explorarea confortabilă a apropierii emoționale în relații.';
      } else {
        this.attachmentStyle = 'Atașament Temător-Evitant';
        this.interpretation = '<strong>Stil de atașament temător-evitant.</strong> Experimentezi atât dorința de apropiere, cât și teama de a fi rănit(ă) în relații. Acest stil combină anxietatea legată de abandon cu dificultatea de a te deschide emoțional. Terapia poate fi deosebit de utilă pentru a înțelege și a transforma aceste tipare relaționale.';
      }

      this.showResults = true;
    },
    restart() {
      this.currentIndex = 0;
      this.answers = new Array(9).fill(null);
      this.showResults = false;
      this.avoidanceScore = 0;
      this.anxietyScore = 0;
    }
  };
}
</script>
