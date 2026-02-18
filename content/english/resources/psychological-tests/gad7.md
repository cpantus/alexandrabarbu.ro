---
title: "GAD-7 Anxiety Test"
description: "Scientifically validated questionnaire for assessing generalized anxiety. 7 questions, instant results."
date: 2026-02-18
author: "Psychologist Alexandra Barbu"
layout: "single"
draft: false
---

<div class="c-assessment__disclaimer">
⚠️ <strong>Notice:</strong> This test is a screening tool, not a clinical diagnosis. Results are indicative and do not replace evaluation by a specialist. If you feel you need help, please consult a psychologist or psychiatrist.
</div>

<div x-data="gad7App()" class="c-assessment">
  <div class="c-assessment__progress">
    <div class="c-assessment__progress-bar" :style="'width:' + progress + '%'"></div>
  </div>

  <div x-show="!showResults">
      <div class="c-assessment__question">
        <div class="c-assessment__question-number" x-text="'Question ' + (currentIndex + 1) + ' of ' + questions.length"></div>
        <div class="c-assessment__question-text" x-text="'Over the last 2 weeks, how often have you been bothered by: ' + questions[currentIndex].text"></div>
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
        <button class="c-assessment__btn c-assessment__btn--secondary" @click="prev()" x-show="currentIndex > 0">Back</button>
        <div class="c-assessment__counter" x-text="(currentIndex + 1) + ' / ' + questions.length"></div>
        <button class="c-assessment__btn c-assessment__btn--primary" @click="currentIndex === questions.length - 1 ? calculate() : next()" :disabled="answers[currentIndex] === null">
          <span x-text="currentIndex === questions.length - 1 ? 'See Results' : 'Next'"></span>
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
        ⚠️ This result is indicative and does not constitute a diagnosis. For a complete evaluation, please consult a mental health professional.
      </div>
      <div class="c-assessment__cta">
        <a href="https://cal.com/alexandra-barbu-ras8xc/50min" class="c-assessment__cta-link">Schedule a Consultation</a>
      </div>
      <button class="c-assessment__restart" @click="restart()">Retake the Test</button>
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
      { text: 'Feeling nervous, anxious, or on edge' },
      { text: 'Not being able to stop or control worrying' },
      { text: 'Worrying too much about different things' },
      { text: 'Trouble relaxing' },
      { text: 'Being so restless that it\'s hard to sit still' },
      { text: 'Becoming easily annoyed or irritable' },
      { text: 'Feeling afraid as if something awful might happen' }
    ],
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
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
        this.severityLabel = 'Minimal Anxiety (0-4)';
        this.interpretation = '<strong>Minimal anxiety.</strong> Your score suggests a very low level of anxiety. Continue to take care of your emotional well-being and retake this test in a few weeks if you notice a change.';
      } else if (this.score <= 9) {
        this.severity = 'mild';
        this.severityLabel = 'Mild Anxiety (5-9)';
        this.interpretation = '<strong>Mild anxiety.</strong> Your score indicates a mild level of anxiety. Relaxation techniques and a balanced lifestyle can be helpful. If symptoms persist, a consultation with a specialist can provide clarity.';
      } else if (this.score <= 14) {
        this.severity = 'moderate';
        this.severityLabel = 'Moderate Anxiety (10-14)';
        this.interpretation = '<strong>Moderate anxiety.</strong> Your score suggests a moderate level of anxiety that deserves attention. It is recommended to consult a specialist for a complete evaluation and to discuss therapeutic options.';
      } else {
        this.severity = 'severe';
        this.severityLabel = 'Severe Anxiety (15-21)';
        this.interpretation = '<strong>Severe anxiety.</strong> Your score indicates a high level of anxiety. I strongly encourage you to schedule a consultation with a psychologist or psychiatrist as soon as possible. Treatment can make a significant difference.';
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
