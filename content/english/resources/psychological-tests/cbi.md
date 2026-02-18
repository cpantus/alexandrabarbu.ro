---
title: "CBI Burnout Inventory"
description: "Copenhagen Burnout Inventory - assessment across 3 dimensions: personal, work-related, and client-related burnout. 19 questions."
date: 2026-02-18
author: "Psychologist Alexandra Barbu"
layout: "single"
draft: false
---

<div class="c-assessment__disclaimer">
⚠️ <strong>Notice:</strong> This test is a self-assessment tool, not a clinical diagnosis. Results are indicative and do not replace evaluation by a specialist. If you feel overwhelmed, please consult a psychologist.
</div>

<div x-data="cbiApp()" class="c-assessment">
  <div class="c-assessment__progress">
    <div class="c-assessment__progress-bar" :style="'width:' + progress + '%'"></div>
  </div>

  <div x-show="!showResults">
      <div class="c-assessment__question">
        <div class="c-assessment__question-number" x-text="sectionLabel + ' — Question ' + (currentIndex + 1) + ' of ' + questions.length"></div>
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
        <button class="c-assessment__btn c-assessment__btn--secondary" @click="prev()" x-show="currentIndex > 0">Back</button>
        <div class="c-assessment__counter" x-text="(currentIndex + 1) + ' / ' + questions.length"></div>
        <button class="c-assessment__btn c-assessment__btn--primary" @click="currentIndex === questions.length - 1 ? calculate() : next()" :disabled="answers[currentIndex] === null">
          <span x-text="currentIndex === questions.length - 1 ? 'See Results' : 'Next'"></span>
        </button>
      </div>
  </div>

  <div x-show="showResults" class="c-assessment__results">
      <div class="c-assessment__subscales">
        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Personal Burnout</span>
          <span class="c-assessment__subscale-value" x-text="personalScore.toFixed(0) + ' / 100'"></span>
        </div>
        <div :class="'c-assessment__severity--' + personalSeverity" style="margin-bottom: 1rem;">
          <span x-text="personalLabel"></span>
        </div>
        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Work-Related Burnout</span>
          <span class="c-assessment__subscale-value" x-text="workScore.toFixed(0) + ' / 100'"></span>
        </div>
        <div :class="'c-assessment__severity--' + workSeverity" style="margin-bottom: 1rem;">
          <span x-text="workLabel"></span>
        </div>
        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Client/Patient-Related Burnout</span>
          <span class="c-assessment__subscale-value" x-text="clientScore.toFixed(0) + ' / 100'"></span>
        </div>
        <div :class="'c-assessment__severity--' + clientSeverity" style="margin-bottom: 1rem;">
          <span x-text="clientLabel"></span>
        </div>
      </div>
      <div class="c-assessment__interpretation" x-html="interpretation"></div>
      <div class="c-assessment__disclaimer">
        ⚠️ This result is indicative and does not constitute a diagnosis. Burnout is a complex phenomenon that requires professional assessment for effective management. If your scores are moderate or high, please consult a specialist.
      </div>
      <div class="c-assessment__cta">
        <a href="https://cal.com/alexandra-barbu-ras8xc/50min" class="c-button c-button--primary">Schedule a Consultation</a>
      </div>
      <button class="c-assessment__restart" @click="restart()">Retake the Test</button>
  </div>
</div>

<script>
function cbiApp() {
  var freqOpts = ['Never/Almost never', 'Seldom', 'Sometimes', 'Often', 'Always'];
  var freqVals = [0, 25, 50, 75, 100];
  var degOpts = ['Not at all', 'To a small extent', 'To some extent', 'To a large extent', 'To a very large extent'];
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
      { text: 'How often do you feel tired?', opts: freqOpts, values: freqVals },
      { text: 'How often do you feel physically exhausted?', opts: freqOpts, values: freqVals },
      { text: 'How often do you feel emotionally exhausted?', opts: freqOpts, values: freqVals },
      { text: 'How often do you think: "I can\'t take it anymore"?', opts: freqOpts, values: freqVals },
      { text: 'How often do you feel weak and susceptible to illness?', opts: freqOpts, values: freqVals },
      { text: 'How physically exhausted do you feel?', opts: degOpts, values: degVals },
      // Work Burnout (6-12)
      { text: 'Is your work emotionally exhausting?', opts: degOpts, values: degVals },
      { text: 'Do you feel burnt out because of your work?', opts: degOpts, values: degVals },
      { text: 'Does your work frustrate you?', opts: degOpts, values: degVals },
      { text: 'How often do you feel worn out by your work?', opts: freqOpts, values: freqVals },
      { text: 'How often do you feel tired at the thought of having to work another day?', opts: freqOpts, values: freqVals },
      { text: 'Do you feel that every working hour is tiring for you?', opts: freqOpts, values: freqVals },
      { text: 'Do you have enough energy for family and friends during leisure time?', opts: freqOpts, values: freqVals }, // REVERSE
      // Client Burnout (13-18)
      { text: 'Do you find it hard to work with clients/patients?', opts: degOpts, values: degVals },
      { text: 'Does working with clients/patients drain your energy?', opts: degOpts, values: degVals },
      { text: 'Do you find it frustrating to work with clients/patients?', opts: degOpts, values: degVals },
      { text: 'Do you feel that you give more than you get back when working with clients/patients?', opts: freqOpts, values: freqVals },
      { text: 'Are you tired of working with clients/patients?', opts: freqOpts, values: freqVals },
      { text: 'Do you sometimes wonder how long you will be able to continue working with clients/patients?', opts: freqOpts, values: freqVals }
    ],
    get progress() {
      var answered = this.answers.filter(a => a !== null).length;
      return Math.round((answered / this.questions.length) * 100);
    },
    get sectionLabel() {
      if (this.currentIndex < 6) return 'Personal Burnout';
      if (this.currentIndex < 13) return 'Work-Related Burnout';
      return 'Client/Patient Burnout';
    },
    next() { if (this.currentIndex < this.questions.length - 1) this.currentIndex++; },
    prev() { if (this.currentIndex > 0) this.currentIndex--; },
    getSeverity(score) {
      if (score < 50) return { sev: 'minimal', label: 'Low Burnout (below 50)' };
      if (score < 75) return { sev: 'moderate', label: 'Moderate Burnout (50-74)' };
      if (score < 100) return { sev: 'severe', label: 'High Burnout (75-99)' };
      return { sev: 'severe', label: 'Severe Burnout (100)' };
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
      parts.push('<strong>Personal Burnout (' + this.personalScore.toFixed(0) + '/100):</strong> ');
      if (this.personalScore < 50) parts.push('Your level of personal exhaustion is low. You have good emotional resources.');
      else if (this.personalScore < 75) parts.push('You are experiencing a moderate level of personal exhaustion. It is important to pay attention to your recovery needs.');
      else parts.push('Your level of personal exhaustion is high. You need support and recovery strategies.');

      parts.push('<br><br><strong>Work-Related Burnout (' + this.workScore.toFixed(0) + '/100):</strong> ');
      if (this.workScore < 50) parts.push('Your relationship with work is healthy. Work-related exhaustion is low.');
      else if (this.workScore < 75) parts.push('You are experiencing a moderate level of work-related exhaustion. It may be helpful to discuss work-life balance strategies with a specialist.');
      else parts.push('Your level of work-related exhaustion is high. It is recommended to consult a specialist.');

      parts.push('<br><br><strong>Client/Patient Burnout (' + this.clientScore.toFixed(0) + '/100):</strong> ');
      if (this.clientScore < 50) parts.push('Your relationship with clients/patients does not generate significant exhaustion.');
      else if (this.clientScore < 75) parts.push('You are experiencing a moderate level of exhaustion in your relationship with clients/patients. Professional supervision or support may help.');
      else parts.push('Your level of client/patient-related exhaustion is high. Professional supervision is recommended.');

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
