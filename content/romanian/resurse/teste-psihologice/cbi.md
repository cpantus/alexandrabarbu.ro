---
title: "Inventarul de Burnout CBI"
description: "Copenhagen Burnout Inventory - evaluare pe 3 dimensiuni: burnout personal, profesional și legat de clienți. 19 întrebări."
date: 2026-02-18
author: "Psiholog Alexandra Barbu"
layout: "single"
draft: false
---

<div class="c-assessment__disclaimer">
⚠️ <strong>Atenție:</strong> Acest test este un instrument de auto-evaluare, nu un diagnostic clinic. Rezultatele sunt orientative și nu înlocuiesc evaluarea unui specialist. Dacă te simți copleșit(ă), te încurajez să consulți un psiholog.
</div>

<div x-data="cbiApp()" class="c-assessment">
  <div class="c-assessment__progress">
    <div class="c-assessment__progress-bar" :style="'width:' + progress + '%'"></div>
  </div>

  <template x-if="!showResults">
    <div>
      <div class="c-assessment__question">
        <div class="c-assessment__question-number" x-text="sectionLabel + ' — Întrebarea ' + (currentIndex + 1) + ' din ' + questions.length"></div>
        <div class="c-assessment__question-text" x-text="questions[currentIndex].text"></div>
        <div class="c-assessment__options">
          <template x-for="(opt, i) in questions[currentIndex].opts" :key="i">
            <div class="c-assessment__option"
                 :class="{'c-assessment__option--selected': answers[currentIndex] === questions[currentIndex].values[i]}"
                 @click="answers[currentIndex] = questions[currentIndex].values[i]; if(currentIndex < questions.length - 1) { setTimeout(() => next(), 300) }">
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
  </template>

  <template x-if="showResults">
    <div class="c-assessment__results">
      <div class="c-assessment__subscales">
        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Burnout Personal</span>
          <span class="c-assessment__subscale-value" x-text="personalScore.toFixed(0) + ' / 100'"></span>
        </div>
        <div :class="'c-assessment__severity--' + personalSeverity" style="margin-bottom: 1rem;">
          <span x-text="personalLabel"></span>
        </div>

        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Burnout Profesional</span>
          <span class="c-assessment__subscale-value" x-text="workScore.toFixed(0) + ' / 100'"></span>
        </div>
        <div :class="'c-assessment__severity--' + workSeverity" style="margin-bottom: 1rem;">
          <span x-text="workLabel"></span>
        </div>

        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Burnout legat de Clienți/Pacienți</span>
          <span class="c-assessment__subscale-value" x-text="clientScore.toFixed(0) + ' / 100'"></span>
        </div>
        <div :class="'c-assessment__severity--' + clientSeverity" style="margin-bottom: 1rem;">
          <span x-text="clientLabel"></span>
        </div>
      </div>

      <div class="c-assessment__interpretation" x-html="interpretation"></div>

      <div class="c-assessment__disclaimer">
        ⚠️ Acest rezultat este orientativ și nu constituie un diagnostic. Burnout-ul este un fenomen complex care necesită o evaluare profesională pentru a fi abordat eficient. Dacă scorurile tale sunt moderate sau ridicate, consultă un specialist.
      </div>
      <div class="c-assessment__cta">
        <a href="/contact/" class="c-assessment__cta-link">Programează o Consultație</a>
      </div>
      <button class="c-assessment__restart" @click="restart()">Reia Testul</button>
    </div>
  </template>
</div>

<script>
function cbiApp() {
  var freqOpts = ['Niciodată/Aproape niciodată', 'Rareori', 'Uneori', 'Des', 'Întotdeauna'];
  var freqVals = [0, 25, 50, 75, 100];
  var degOpts = ['Deloc', 'Într-o mică măsură', 'Într-o oarecare măsură', 'Într-o mare măsură', 'Într-o foarte mare măsură'];
  var degVals = [0, 25, 50, 75, 100];

  return {
    currentIndex: 0,
    answers: new Array(19).fill(null),
    showResults: false,
    personalScore: 0,
    workScore: 0,
    clientScore: 0,
    personalSeverity: '',
    workSeverity: '',
    clientSeverity: '',
    personalLabel: '',
    workLabel: '',
    clientLabel: '',
    interpretation: '',
    questions: [
      // Personal Burnout (0-5)
      { text: 'Cât de des te simți obosit(ă)?', opts: freqOpts, values: freqVals },
      { text: 'Cât de des te simți epuizat(ă) fizic?', opts: freqOpts, values: freqVals },
      { text: 'Cât de des te simți epuizat(ă) emoțional?', opts: freqOpts, values: freqVals },
      { text: 'Cât de des gândești: "Nu mai pot"?', opts: freqOpts, values: freqVals },
      { text: 'Cât de des te simți slăbit(ă) și susceptibil(ă) la boli?', opts: freqOpts, values: freqVals },
      { text: 'Cât de epuizat(ă) fizic te simți?', opts: degOpts, values: degVals },
      // Work Burnout (6-12)
      { text: 'Munca ta este epuizantă emoțional?', opts: degOpts, values: degVals },
      { text: 'Te simți epuizat(ă) de munca ta?', opts: degOpts, values: degVals },
      { text: 'Munca ta te frustrează?', opts: degOpts, values: degVals },
      { text: 'Cât de des te simți consumat(ă) de munca ta?', opts: freqOpts, values: freqVals },
      { text: 'Cât de des te simți obosit(ă) la gândul că trebuie să lucrezi încă o zi?', opts: freqOpts, values: freqVals },
      { text: 'Simți că fiecare oră de muncă este obositoare?', opts: freqOpts, values: freqVals },
      { text: 'Ai suficientă energie pentru familie și prieteni în timpul liber?', opts: freqOpts, values: freqVals }, // REVERSE
      // Client Burnout (13-18)
      { text: 'Este dificil să lucrezi cu clienți/pacienți?', opts: degOpts, values: degVals },
      { text: 'Lucrul cu clienți/pacienți te seacă de energie?', opts: degOpts, values: degVals },
      { text: 'Ți se pare frustrant să lucrezi cu clienți/pacienți?', opts: degOpts, values: degVals },
      { text: 'Simți că dai mai mult decât primești lucrând cu clienți/pacienți?', opts: freqOpts, values: freqVals },
      { text: 'Ești obosit(ă) de lucrul cu clienți/pacienți?', opts: freqOpts, values: freqVals },
      { text: 'Te întrebi uneori cât timp vei mai putea lucra cu clienți/pacienți?', opts: freqOpts, values: freqVals }
    ],
    get progress() {
      var answered = this.answers.filter(a => a !== null).length;
      return Math.round((answered / this.questions.length) * 100);
    },
    get sectionLabel() {
      if (this.currentIndex < 6) return 'Burnout Personal';
      if (this.currentIndex < 13) return 'Burnout Profesional';
      return 'Burnout Clienți/Pacienți';
    },
    next() { if (this.currentIndex < this.questions.length - 1) this.currentIndex++; },
    prev() { if (this.currentIndex > 0) this.currentIndex--; },
    getSeverity(score) {
      if (score < 50) return { sev: 'minimal', label: 'Burnout Scăzut (sub 50)' };
      if (score < 75) return { sev: 'moderate', label: 'Burnout Moderat (50-74)' };
      if (score < 100) return { sev: 'severe', label: 'Burnout Ridicat (75-99)' };
      return { sev: 'severe', label: 'Burnout Sever (100)' };
    },
    calculate() {
      // Personal Burnout: items 0-5
      var pItems = [0,1,2,3,4,5];
      this.personalScore = pItems.reduce((s, i) => s + (this.answers[i] || 0), 0) / pItems.length;

      // Work Burnout: items 6-12, item 12 is REVERSE scored
      var wItems = [6,7,8,9,10,11,12];
      var wSum = 0;
      for (var w = 0; w < wItems.length; w++) {
        var val = this.answers[wItems[w]] || 0;
        if (wItems[w] === 12) val = 100 - val; // reverse score
        wSum += val;
      }
      this.workScore = wSum / wItems.length;

      // Client Burnout: items 13-18
      var cItems = [13,14,15,16,17,18];
      this.clientScore = cItems.reduce((s, i) => s + (this.answers[i] || 0), 0) / cItems.length;

      var p = this.getSeverity(this.personalScore);
      this.personalSeverity = p.sev; this.personalLabel = p.label;
      var wk = this.getSeverity(this.workScore);
      this.workSeverity = wk.sev; this.workLabel = wk.label;
      var c = this.getSeverity(this.clientScore);
      this.clientSeverity = c.sev; this.clientLabel = c.label;

      var parts = [];
      parts.push('<strong>Burnout Personal (' + this.personalScore.toFixed(0) + '/100):</strong> ');
      if (this.personalScore < 50) parts.push('Nivelul tău de epuizare personală este scăzut. Ai resurse emoționale bune.');
      else if (this.personalScore < 75) parts.push('Experimentezi un nivel moderat de epuizare personală. Este important să acorzi atenție nevoilor tale de recuperare.');
      else parts.push('Nivelul de epuizare personală este ridicat. Ai nevoie de sprijin și strategii de recuperare.');

      parts.push('<br><br><strong>Burnout Profesional (' + this.workScore.toFixed(0) + '/100):</strong> ');
      if (this.workScore < 50) parts.push('Relația ta cu munca este sănătoasă. Nivelul de epuizare profesională este scăzut.');
      else if (this.workScore < 75) parts.push('Experimentezi un nivel moderat de epuizare legată de muncă. Poate fi util să discuți cu un specialist despre strategii de echilibru.');
      else parts.push('Nivelul de epuizare profesională este ridicat. Este recomandat să consulți un specialist.');

      parts.push('<br><br><strong>Burnout Clienți/Pacienți (' + this.clientScore.toFixed(0) + '/100):</strong> ');
      if (this.clientScore < 50) parts.push('Relația cu clienții/pacienții nu generează un nivel semnificativ de epuizare.');
      else if (this.clientScore < 75) parts.push('Experimentezi un nivel moderat de epuizare în relația cu clienții/pacienții. Supervizarea sau suportul profesional pot ajuta.');
      else parts.push('Nivelul de epuizare legat de clienți/pacienți este ridicat. Supervizarea profesională este recomandată.');

      this.interpretation = parts.join('');
      this.showResults = true;
    },
    restart() {
      this.currentIndex = 0;
      this.answers = new Array(19).fill(null);
      this.showResults = false;
      this.personalScore = 0;
      this.workScore = 0;
      this.clientScore = 0;
    }
  };
}
</script>
