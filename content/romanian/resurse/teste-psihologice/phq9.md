---
title: "Test Depresie PHQ-9"
description: "Chestionar validat științific pentru evaluarea depresiei. 9 întrebări, rezultat instant."
date: 2026-02-18
author: "Psiholog Alexandra Barbu"
layout: "single"
draft: false
---

<div class="c-assessment__disclaimer">
⚠️ <strong>Atenție:</strong> Acest test este un instrument de screening, nu un diagnostic clinic. Rezultatele sunt orientative și nu înlocuiesc evaluarea unui specialist. Dacă ai gânduri de auto-vătămare, te rog să contactezi imediat un serviciu de urgență sau Telefonul Sufletului: 0800 801 200.
</div>

<div x-data="phq9App()" class="c-assessment">
  <div class="c-assessment__progress">
    <div class="c-assessment__progress-bar" :style="'width:' + progress + '%'"></div>
  </div>

  <div x-show="!showResults">
      <div class="c-assessment__question">
        <div x-show="!showFunctional">
            <div class="c-assessment__question-number" x-text="'Întrebarea ' + (currentIndex + 1) + ' din ' + questions.length"></div>
            <div class="c-assessment__question-text" x-text="'În ultimele 2 săptămâni, cât de des ai fost deranjat(ă) de: ' + questions[currentIndex].text"></div>
            <div class="c-assessment__options">
              <template x-for="(opt, i) in options" :key="i">
                <div class="c-assessment__option"
                     :class="{'c-assessment__option--selected': answers[currentIndex] === i}"
                     @click="answers[currentIndex] = i; if(currentIndex < questions.length - 1) { setTimeout(() => next(), 300) } else { setTimeout(() => showFunctionalQ(), 300) }">
                  <div class="c-assessment__option-radio"></div>
                  <div class="c-assessment__option-label" x-text="opt"></div>
                </div>
              </template>
            </div>
        </div>
        <div x-show="showFunctional">
            <div class="c-assessment__question-number">Întrebare suplimentară</div>
            <div class="c-assessment__question-text">Dacă ai bifat oricare dintre probleme, cât de dificil ți-au făcut ele munca, treburile casnice sau relațiile cu alte persoane?</div>
            <div class="c-assessment__options">
              <template x-for="(opt, i) in functionalOptions" :key="i">
                <div class="c-assessment__option"
                     :class="{'c-assessment__option--selected': functionalAnswer === i}"
                     @click="functionalAnswer = i">
                  <div class="c-assessment__option-radio"></div>
                  <div class="c-assessment__option-label" x-text="opt"></div>
                </div>
              </template>
            </div>
        </div>
      </div>
      <div class="c-assessment__nav">
        <button class="c-assessment__btn c-assessment__btn--secondary" @click="showFunctional ? backFromFunctional() : prev()" x-show="currentIndex > 0 || showFunctional">Înapoi</button>
        <div class="c-assessment__counter" x-text="showFunctional ? 'Bonus' : ((currentIndex + 1) + ' / ' + questions.length)"></div>
        <button class="c-assessment__btn c-assessment__btn--primary"
                @click="showFunctional ? calculate() : (currentIndex === questions.length - 1 ? showFunctionalQ() : next())"
                :disabled="showFunctional ? functionalAnswer === null : answers[currentIndex] === null">
          <span x-text="showFunctional ? 'Vezi Rezultatele' : (currentIndex === questions.length - 1 ? 'Continuă' : 'Următoarea')"></span>
        </button>
      </div>
  </div>

  <div x-show="showResults" class="c-assessment__results">
      <div class="c-assessment__score-display">
        <span class="c-assessment__score-value" x-text="score"></span>
        <span class="c-assessment__score-max">/ 27</span>
      </div>
      <div :class="'c-assessment__severity--' + severity">
        <span x-text="severityLabel"></span>
      </div>
      <div class="c-assessment__interpretation" x-html="interpretation"></div>
      <div x-show="functionalText" class="c-assessment__interpretation" x-html="functionalText"></div>
      <div class="c-assessment__disclaimer">
        ⚠️ Acest rezultat este orientativ și nu constituie un diagnostic. Pentru o evaluare completă, consultă un specialist în sănătate mintală. Dacă ai gânduri de auto-vătămare, contactează imediat un serviciu de urgență.
      </div>
      <div class="c-assessment__cta">
        <a href="https://cal.com/alexandra-barbu-ras8xc/50min" class="c-button c-button--primary">Programează o Consultație</a>
      </div>
      <button class="c-assessment__restart" @click="restart()">Reia Testul</button>
  </div>
</div>

<script>
function phq9App() {
  return {
    currentIndex: 0,
    answers: new Array(9).fill(null),
    showResults: false,
    showFunctional: false,
    functionalAnswer: null,
    score: 0,
    severity: '',
    severityLabel: '',
    interpretation: '',
    functionalText: '',
    questions: [
      { text: 'Interes sau plăcere scăzută în a face lucruri' },
      { text: 'Senzația de depresie, tristețe sau lipsă de speranță' },
      { text: 'Dificultăți de adormire, somn întrerupt sau somn excesiv' },
      { text: 'Senzația de oboseală sau lipsă de energie' },
      { text: 'Apetit scăzut sau alimentație excesivă' },
      { text: 'Părere negativă despre tine — senzația că ești un eșec sau că ai dezamăgit familia' },
      { text: 'Dificultate în concentrare, de exemplu la citit sau la TV' },
      { text: 'Mișcări sau vorbire atât de lentă încât ceilalți au observat. Sau invers — neliniște excesivă' },
      { text: 'Gânduri că ar fi mai bine dacă ai fi mort(ă) sau gânduri de auto-vătămare' }
    ],
    options: ['Deloc', 'Mai multe zile', 'Mai mult de jumătate din zile', 'Aproape în fiecare zi'],
    functionalOptions: ['Deloc dificil', 'Oarecum dificil', 'Foarte dificil', 'Extrem de dificil'],
    get progress() {
      var answered = this.answers.filter(a => a !== null).length;
      var total = this.questions.length + 1;
      if (this.showFunctional && this.functionalAnswer !== null) answered++;
      return Math.round((answered / total) * 100);
    },
    next() { if (this.currentIndex < this.questions.length - 1) this.currentIndex++; },
    prev() { if (this.currentIndex > 0) this.currentIndex--; },
    showFunctionalQ() { this.showFunctional = true; },
    backFromFunctional() { this.showFunctional = false; },
    calculate() {
      this.score = this.answers.reduce((sum, val) => sum + (val || 0), 0);
      if (this.score <= 4) {
        this.severity = 'minimal';
        this.severityLabel = 'Depresie Minimă (0-4)';
        this.interpretation = '<strong>Depresie minimală.</strong> Scorul tău sugerează un nivel foarte scăzut de simptome depresive. Continuă să ai grijă de starea ta emoțională.';
      } else if (this.score <= 9) {
        this.severity = 'mild';
        this.severityLabel = 'Depresie Ușoară (5-9)';
        this.interpretation = '<strong>Depresie ușoară.</strong> Scorul tău indică simptome ușoare de depresie. Monitorizarea simptomelor și un stil de viață sănătos sunt recomandate. O consultație poate oferi strategii utile.';
      } else if (this.score <= 14) {
        this.severity = 'moderate';
        this.severityLabel = 'Depresie Moderată (10-14)';
        this.interpretation = '<strong>Depresie moderată.</strong> Scorul tău sugerează un nivel moderat de depresie. Este recomandat să consulți un specialist pentru evaluare și pentru a discuta opțiuni de tratament.';
      } else if (this.score <= 19) {
        this.severity = 'moderate-severe';
        this.severityLabel = 'Depresie Moderat-Severă (15-19)';
        this.interpretation = '<strong>Depresie moderat-severă.</strong> Scorul tău indică simptome semnificative de depresie. Te încurajez să programezi o consultație cu un specialist cât mai curând.';
      } else {
        this.severity = 'severe';
        this.severityLabel = 'Depresie Severă (20-27)';
        this.interpretation = '<strong>Depresie severă.</strong> Scorul tău indică un nivel ridicat de simptome depresive. Este important să consulți un specialist în sănătate mintală cât mai curând posibil.';
      }
      var fLabels = ['deloc dificil', 'oarecum dificil', 'foarte dificil', 'extrem de dificil'];
      if (this.functionalAnswer !== null && this.functionalAnswer > 0) {
        this.functionalText = '<strong>Impactul funcțional:</strong> Ai indicat că aceste probleme ți-au făcut viața <em>' + fLabels[this.functionalAnswer] + '</em>. Acest lucru oferă informații suplimentare despre modul în care simptomele afectează viața ta de zi cu zi.';
      } else {
        this.functionalText = '';
      }
      this.showResults = true;
    },
    restart() {
      this.currentIndex = 0;
      this.answers = new Array(9).fill(null);
      this.showResults = false;
      this.showFunctional = false;
      this.functionalAnswer = null;
      this.score = 0;
      this.functionalText = '';
    }
  };
}
</script>
