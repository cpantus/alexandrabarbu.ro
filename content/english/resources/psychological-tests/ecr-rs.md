---
title: "ECR-RS Attachment Style"
description: "Attachment style assessment across two dimensions: anxiety and avoidance. 9 questions, instant results."
date: 2026-02-18
author: "Psychologist Alexandra Barbu"
layout: "single"
draft: false
---

<div class="c-assessment__disclaimer">
⚠️ <strong>Notice:</strong> This test is a self-assessment tool, not a clinical diagnosis. Attachment style is a complex psychological concept and results are indicative. For a deeper understanding, please consult a psychologist.
</div>

<div x-data="ecrsApp()" class="c-assessment">
  <div class="c-assessment__progress">
    <div class="c-assessment__progress-bar" :style="'width:' + progress + '%'"></div>
  </div>

  <div x-show="!showResults">
      <div class="c-assessment__question">
        <div class="c-assessment__question-number" x-text="'Question ' + (currentIndex + 1) + ' of ' + questions.length"></div>
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
        <button class="c-assessment__btn c-assessment__btn--secondary" @click="prev()" x-show="currentIndex > 0">Back</button>
        <div class="c-assessment__counter" x-text="(currentIndex + 1) + ' / ' + questions.length"></div>
        <button class="c-assessment__btn c-assessment__btn--primary" @click="currentIndex === questions.length - 1 ? calculate() : next()" :disabled="answers[currentIndex] === null">
          <span x-text="currentIndex === questions.length - 1 ? 'See Results' : 'Next'"></span>
        </button>
      </div>
  </div>

  <div x-show="showResults" class="c-assessment__results">
      <div class="c-assessment__score-display">
        <span class="c-assessment__score-value" x-text="attachmentStyle"></span>
      </div>
      <div class="c-assessment__subscales">
        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Avoidance</span>
          <span class="c-assessment__subscale-value" x-text="avoidanceScore.toFixed(1) + ' / 7'"></span>
        </div>
        <div :class="'c-assessment__severity--' + avoidanceSeverity" style="margin-bottom: 1rem;">
          <span x-text="avoidanceScore < 3.5 ? 'Low' : 'High'"></span>
        </div>
        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Anxiety</span>
          <span class="c-assessment__subscale-value" x-text="anxietyScore.toFixed(1) + ' / 7'"></span>
        </div>
        <div :class="'c-assessment__severity--' + anxietySeverity" style="margin-bottom: 1rem;">
          <span x-text="anxietyScore < 3.5 ? 'Low' : 'High'"></span>
        </div>
      </div>
      <div class="c-assessment__interpretation" x-html="interpretation"></div>
      <div class="c-assessment__disclaimer">
        ⚠️ This result is indicative. Attachment style is not fixed — it can evolve through life experiences and therapy. For a complete understanding of your relational patterns, please consult a psychologist.
      </div>
      <div class="c-assessment__cta">
        <a href="https://cal.com/alexandra-barbu-ras8xc/50min" class="c-button c-button--primary">Schedule a Consultation</a>
      </div>
      <button class="c-assessment__restart" @click="restart()">Retake the Test</button>
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
      { text: 'It helps to turn to the people close to me.' },
      { text: 'I know that the people close to me will be there when I need them.' },
      { text: 'I don\'t feel comfortable opening up to people close to me.' },
      { text: 'I prefer not to be too close to people in my life.' },
      { text: 'I worry that the people close to me don\'t value me as much as I value them.' },
      { text: 'I worry that the people close to me don\'t really care about me.' },
      { text: 'I worry a lot about my relationships.' },
      { text: 'I worry that I will be abandoned.' },
      { text: 'I fear that the people close to me will reject me.' }
    ],
    options: [
      '1 — Strongly Disagree',
      '2 — Disagree',
      '3 — Slightly Disagree',
      '4 — Neutral',
      '5 — Slightly Agree',
      '6 — Agree',
      '7 — Strongly Agree'
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
        this.attachmentStyle = 'Secure Attachment';
        this.interpretation = '<strong>Secure attachment style.</strong> You feel comfortable with both intimacy and independence in relationships. You trust that the important people in your life will be there when you need them and don\'t worry excessively about your relationships. This style is associated with stable and satisfying relationships.';
      } else if (lowAvoid && !lowAnx) {
        this.attachmentStyle = 'Anxious-Preoccupied';
        this.interpretation = '<strong>Anxious-preoccupied attachment style.</strong> You seek intimacy and closeness in relationships but frequently worry that loved ones don\'t value you as much or will abandon you. This style can lead to a need for constant reassurance. Therapy can help develop a more stable sense of security in relationships.';
      } else if (!lowAvoid && lowAnx) {
        this.attachmentStyle = 'Dismissive-Avoidant';
        this.interpretation = '<strong>Dismissive-avoidant attachment style.</strong> You tend to value independence and self-sufficiency, sometimes avoiding emotional intimacy. It may be difficult for you to rely on others or open up emotionally. Therapy can help comfortably explore emotional closeness in relationships.';
      } else {
        this.attachmentStyle = 'Fearful-Avoidant';
        this.interpretation = '<strong>Fearful-avoidant attachment style.</strong> You experience both the desire for closeness and the fear of being hurt in relationships. This style combines anxiety about abandonment with difficulty opening up emotionally. Therapy can be particularly helpful for understanding and transforming these relational patterns.';
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
