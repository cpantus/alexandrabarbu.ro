---
title: "Screening ADHD - ASRS v1.1"
description: "Scala de Auto-Raportare pentru ADHD la Adulți (OMS). 18 întrebări, rezultat instant."
date: 2026-02-18
author: "Psiholog Alexandra Barbu"
layout: "single"
draft: false
---

<div class="c-assessment__disclaimer">
⚠️ <strong>Atenție:</strong> Acest test este un instrument de screening, nu un diagnostic clinic. ADHD poate fi diagnosticat doar de un specialist printr-o evaluare completă. Rezultatele sunt orientative și nu înlocuiesc evaluarea profesională.
</div>

<div x-data="asrsApp()" class="c-assessment">
  <div class="c-assessment__progress">
    <div class="c-assessment__progress-bar" :style="'width:' + progress + '%'"></div>
  </div>

  <div x-show="!showResults">
      <div class="c-assessment__question">
        <div class="c-assessment__question-number" x-text="(currentIndex < 6 ? 'Partea A — ' : 'Partea B — ') + 'Întrebarea ' + (currentIndex + 1) + ' din ' + questions.length"></div>
        <div class="c-assessment__question-text" x-text="questions[currentIndex].text"></div>
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
        <span class="c-assessment__score-value" x-text="partAPositive"></span>
        <span class="c-assessment__score-max">/ 6 pozitive (Partea A)</span>
      </div>
      <div :class="'c-assessment__severity--' + severity">
        <span x-text="severityLabel"></span>
      </div>
      <div class="c-assessment__interpretation" x-html="interpretation"></div>
      <div class="c-assessment__subscales">
        <h4>Profil Simptomatic (Partea B)</h4>
        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Inatenție (medie)</span>
          <span class="c-assessment__subscale-value" x-text="inattentionAvg.toFixed(1) + ' / 4'"></span>
        </div>
        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Hiperactivitate/Impulsivitate (medie)</span>
          <span class="c-assessment__subscale-value" x-text="hyperAvg.toFixed(1) + ' / 4'"></span>
        </div>
      </div>
      <div class="c-assessment__disclaimer">
        ⚠️ Acest rezultat este orientativ și nu constituie un diagnostic. ADHD necesită o evaluare completă de către un specialist. Rezultatele screening-ului indică doar dacă o evaluare suplimentară este recomandată.
      </div>
      <div class="c-assessment__cta">
        <a href="/contact/" class="c-assessment__cta-link">Programează o Consultație</a>
      </div>
      <button class="c-assessment__restart" @click="restart()">Reia Testul</button>
  </div>
</div>

<script>
function asrsApp() {
  return {
    currentIndex: 0,
    answers: new Array(18).fill(null),
    showResults: false,
    partAPositive: 0,
    severity: '',
    severityLabel: '',
    interpretation: '',
    inattentionAvg: 0,
    hyperAvg: 0,
    questions: [
      { text: 'Cât de des ai dificultăți în a finaliza detaliile unui proiect, după ce părțile provocatoare sunt terminate?' },
      { text: 'Cât de des ai dificultăți în a pune lucrurile în ordine când trebuie să faci o sarcină care necesită organizare?' },
      { text: 'Cât de des ai probleme în a-ți aminti programări sau obligații?' },
      { text: 'Când ai o sarcină care necesită multă gândire, cât de des eviți sau amâni începerea ei?' },
      { text: 'Cât de des te foiești sau te miști neliniștit când trebuie să stai așezat mult timp?' },
      { text: 'Cât de des te simți excesiv de activ(ă) și simți nevoia să faci lucruri, de parcă ai fi condus(ă) de un motor?' },
      { text: 'Cât de des faci greșeli din neatenție când lucrezi la ceva plictisitor sau dificil?' },
      { text: 'Cât de des ai dificultăți în a-ți menține atenția când faci muncă plictisitoare sau repetitivă?' },
      { text: 'Cât de des ai dificultăți în a te concentra pe ce spune cineva, chiar și când îți vorbește direct?' },
      { text: 'Cât de des pierzi sau ai dificultăți în a găsi lucruri acasă sau la muncă?' },
      { text: 'Cât de des ești distras(ă) de activitate sau zgomot din jur?' },
      { text: 'Cât de des pleci de pe scaun în ședințe sau alte situații în care ar trebui să stai pe loc?' },
      { text: 'Cât de des te simți neliniștit(ă) sau agitat(ă)?' },
      { text: 'Cât de des ai dificultăți în a te relaxa când ai timp liber?' },
      { text: 'Cât de des te surprinzi vorbind prea mult în situații sociale?' },
      { text: 'Cât de des termini propozițiile altor persoane, înainte ca acestea să termine ce au de spus?' },
      { text: 'Cât de des ai dificultăți în a aștepta la rând, când situația o cere?' },
      { text: 'Cât de des întrerupi alte persoane când sunt ocupate?' }
    ],
    options: ['Niciodată', 'Rareori', 'Uneori', 'Des', 'Foarte des'],
    get progress() {
      var answered = this.answers.filter(a => a !== null).length;
      return Math.round((answered / this.questions.length) * 100);
    },
    next() { if (this.currentIndex < this.questions.length - 1) this.currentIndex++; },
    prev() { if (this.currentIndex > 0) this.currentIndex--; },
    calculate() {
      // Part A scoring with shaded thresholds
      var thresholds = [2, 2, 2, 3, 3, 2]; // minimum value for "positive"
      this.partAPositive = 0;
      for (var i = 0; i < 6; i++) {
        if (this.answers[i] >= thresholds[i]) {
          this.partAPositive++;
        }
      }

      // Part B symptom profile
      // Inattention items: 1-3 (Part A) + 7-11 (Part B) = indices 0,1,2,6,7,8,9,10
      var inattentionItems = [0,1,2,6,7,8,9,10];
      var inattentionSum = inattentionItems.reduce((s, idx) => s + (this.answers[idx] || 0), 0);
      this.inattentionAvg = inattentionSum / inattentionItems.length;

      // Hyperactivity items: 4-6 (Part A) + 12-18 (Part B) = indices 3,4,5,11,12,13,14,15,16,17
      var hyperItems = [3,4,5,11,12,13,14,15,16,17];
      var hyperSum = hyperItems.reduce((s, idx) => s + (this.answers[idx] || 0), 0);
      this.hyperAvg = hyperSum / hyperItems.length;

      if (this.partAPositive >= 4) {
        this.severity = 'severe';
        this.severityLabel = 'Foarte Consistent cu ADHD';
        this.interpretation = '<strong>Rezultat: Foarte consistent cu ADHD la adulți.</strong> Ai obținut ' + this.partAPositive + ' din 6 răspunsuri pozitive în Partea A a screening-ului. Acest rezultat sugerează puternic prezența simptomelor ADHD și este recomandat să consulți un specialist pentru o evaluare completă de diagnostic.';
      } else {
        this.severity = 'minimal';
        this.severityLabel = 'Mai Puțin Consistent cu ADHD';
        this.interpretation = '<strong>Rezultat: Mai puțin consistent cu ADHD.</strong> Ai obținut ' + this.partAPositive + ' din 6 răspunsuri pozitive în Partea A. Deși rezultatul screening-ului nu indică în mod clar ADHD, dacă ai preocupări legate de atenție sau concentrare, o consultație cu un specialist poate fi utilă.';
      }

      this.showResults = true;
    },
    restart() {
      this.currentIndex = 0;
      this.answers = new Array(18).fill(null);
      this.showResults = false;
      this.partAPositive = 0;
      this.inattentionAvg = 0;
      this.hyperAvg = 0;
    }
  };
}
</script>
