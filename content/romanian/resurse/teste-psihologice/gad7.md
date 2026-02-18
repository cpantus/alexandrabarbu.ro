---
title: "Test Anxietate GAD-7"
description: "Chestionar validat științific pentru evaluarea anxietății generalizate. 7 întrebări, rezultat instant."
date: 2026-02-18
author: "Psiholog Alexandra Barbu"
layout: "single"
draft: false
---

<div class="c-assessment__disclaimer">
⚠️ <strong>Atenție:</strong> Acest test este un instrument de screening, nu un diagnostic clinic. Rezultatele sunt orientative și nu înlocuiesc evaluarea unui specialist. Dacă simți că ai nevoie de ajutor, te încurajez să consulți un psiholog sau psihiatru.
</div>

<div x-data="gad7App()" class="c-assessment">
  <div class="c-assessment__progress">
    <div class="c-assessment__progress-bar" :style="'width:' + progress + '%'"></div>
  </div>

  <div x-show="!showResults">
      <div class="c-assessment__question">
        <div class="c-assessment__question-number" x-text="'Întrebarea ' + (currentIndex + 1) + ' din ' + questions.length"></div>
        <div class="c-assessment__question-text" x-text="'În ultimele 2 săptămâni, cât de des ai fost deranjat(ă) de: ' + questions[currentIndex].text"></div>
        <div class="c-assessment__options">
          <template x-for="(opt, i) in options" :key="i">
            <div class="c-assessment__option"
                 :class="{'c-assessment__option--selected': answers[currentIndex] === i}"
                 @click="answers[currentIndex] = i; if(currentIndex < questions.length - 1) { setTimeout(() => next(), 300) }">
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
        <span class="c-assessment__score-value" x-text="score"></span>
        <span class="c-assessment__score-max">/ 21</span>
      </div>
      <div :class="'c-assessment__severity--' + severity">
        <span x-text="severityLabel"></span>
      </div>
      <div class="c-assessment__interpretation" x-html="interpretation"></div>
      <div class="c-assessment__disclaimer">
        ⚠️ Acest rezultat este orientativ și nu constituie un diagnostic. Pentru o evaluare completă, consultă un specialist în sănătate mintală.
      </div>
      <div class="c-assessment__cta">
        <a href="/contact/" class="c-assessment__cta-link">Programează o Consultație</a>
      </div>
      <button class="c-assessment__restart" @click="restart()">Reia Testul</button>
  </div>
</div>

<script>
function gad7App() {
  return {
    currentIndex: 0,
    answers: new Array(7).fill(null),
    showResults: false,
    score: 0,
    severity: '',
    severityLabel: '',
    interpretation: '',
    questions: [
      { text: 'Senzația de nervozitate, anxietate sau iritabilitate' },
      { text: 'Incapacitatea de a opri sau controla îngrijorarea' },
      { text: 'Îngrijorare excesivă în legătură cu diverse lucruri' },
      { text: 'Dificultatea de a te relaxa' },
      { text: 'Neliniște care face dificilă starea pe loc' },
      { text: 'Iritabilitate ușoară sau nemulțumire' },
      { text: 'Senzația de frică, de parcă ceva rău s-ar putea întâmpla' }
    ],
    options: ['Deloc', 'Mai multe zile', 'Mai mult de jumătate din zile', 'Aproape în fiecare zi'],
    get progress() {
      var answered = this.answers.filter(a => a !== null).length;
      return Math.round((answered / this.questions.length) * 100);
    },
    next() { if (this.currentIndex < this.questions.length - 1) this.currentIndex++; },
    prev() { if (this.currentIndex > 0) this.currentIndex--; },
    calculate() {
      this.score = this.answers.reduce((sum, val) => sum + (val || 0), 0);
      if (this.score <= 4) {
        this.severity = 'minimal';
        this.severityLabel = 'Anxietate Minimă (0-4)';
        this.interpretation = '<strong>Anxietate minimală.</strong> Scorul tău sugerează un nivel foarte scăzut de anxietate. Continuă să ai grijă de starea ta emoțională și revino la test peste câteva săptămâni dacă simți o schimbare.';
      } else if (this.score <= 9) {
        this.severity = 'mild';
        this.severityLabel = 'Anxietate Ușoară (5-9)';
        this.interpretation = '<strong>Anxietate ușoară.</strong> Scorul tău indică un nivel ușor de anxietate. Tehnicile de relaxare și un stil de viață echilibrat pot fi utile. Dacă simptomele persistă, o consultație cu un specialist poate oferi claritate.';
      } else if (this.score <= 14) {
        this.severity = 'moderate';
        this.severityLabel = 'Anxietate Moderată (10-14)';
        this.interpretation = '<strong>Anxietate moderată.</strong> Scorul tău sugerează un nivel moderat de anxietate care merită atenție. Este recomandat să consulți un specialist pentru o evaluare completă și pentru a discuta opțiunile terapeutice.';
      } else {
        this.severity = 'severe';
        this.severityLabel = 'Anxietate Severă (15-21)';
        this.interpretation = '<strong>Anxietate severă.</strong> Scorul tău indică un nivel ridicat de anxietate. Te încurajez puternic să programezi o consultație cu un psiholog sau psihiatru cât mai curând. Tratamentul poate face o diferență semnificativă.';
      }
      this.showResults = true;
    },
    restart() {
      this.currentIndex = 0;
      this.answers = new Array(7).fill(null);
      this.showResults = false;
      this.score = 0;
    }
  };
}
</script>
