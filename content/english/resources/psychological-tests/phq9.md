---
title: "PHQ-9 Depression Test"
description: "Scientifically validated questionnaire for assessing depression. 9 questions, instant results."
date: 2026-02-18
author: "Psychologist Alexandra Barbu"
layout: "single"
draft: false
---

<div class="c-assessment__disclaimer">
⚠️ <strong>Notice:</strong> This test is a screening tool, not a clinical diagnosis. Results are indicative and do not replace evaluation by a specialist. If you are having thoughts of self-harm, please contact emergency services immediately or call a crisis helpline.
</div>

<div x-data="phq9App()" class="c-assessment">
  <div class="c-assessment__progress">
    <div class="c-assessment__progress-bar" :style="'width:' + progress + '%'"></div>
  </div>

  <div x-show="!showResults">
      <div class="c-assessment__question">
        <div x-show="!showFunctional">
            <div class="c-assessment__question-number" x-text="'Question ' + (currentIndex + 1) + ' of ' + questions.length"></div>
            <div class="c-assessment__question-text" x-text="'Over the last 2 weeks, how often have you been bothered by: ' + questions[currentIndex].text"></div>
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
            <div class="c-assessment__question-number">Additional Question</div>
            <div class="c-assessment__question-text">If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?</div>
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
        <button class="c-assessment__btn c-assessment__btn--secondary" @click="showFunctional ? backFromFunctional() : prev()" x-show="currentIndex > 0 || showFunctional">Back</button>
        <div class="c-assessment__counter" x-text="showFunctional ? 'Bonus' : ((currentIndex + 1) + ' / ' + questions.length)"></div>
        <button class="c-assessment__btn c-assessment__btn--primary"
                @click="showFunctional ? calculate() : (currentIndex === questions.length - 1 ? showFunctionalQ() : next())"
                :disabled="showFunctional ? functionalAnswer === null : answers[currentIndex] === null">
          <span x-text="showFunctional ? 'See Results' : (currentIndex === questions.length - 1 ? 'Continue' : 'Next')"></span>
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
        ⚠️ This result is indicative and does not constitute a diagnosis. For a complete evaluation, please consult a mental health professional. If you are having thoughts of self-harm, please contact emergency services immediately.
      </div>
      <div class="c-assessment__cta">
        <a href="/en/contact/" class="c-assessment__cta-link">Schedule a Consultation</a>
      </div>
      <button class="c-assessment__restart" @click="restart()">Retake the Test</button>
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
      { text: 'Little interest or pleasure in doing things' },
      { text: 'Feeling down, depressed, or hopeless' },
      { text: 'Trouble falling or staying asleep, or sleeping too much' },
      { text: 'Feeling tired or having little energy' },
      { text: 'Poor appetite or overeating' },
      { text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down' },
      { text: 'Trouble concentrating on things, such as reading the newspaper or watching television' },
      { text: 'Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual' },
      { text: 'Thoughts that you would be better off dead or of hurting yourself in some way' }
    ],
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    functionalOptions: ['Not difficult at all', 'Somewhat difficult', 'Very difficult', 'Extremely difficult'],
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
        this.severityLabel = 'Minimal Depression (0-4)';
        this.interpretation = '<strong>Minimal depression.</strong> Your score suggests a very low level of depressive symptoms. Continue to take care of your emotional well-being.';
      } else if (this.score <= 9) {
        this.severity = 'mild';
        this.severityLabel = 'Mild Depression (5-9)';
        this.interpretation = '<strong>Mild depression.</strong> Your score indicates mild depressive symptoms. Monitoring symptoms and maintaining a healthy lifestyle are recommended. A consultation can provide useful strategies.';
      } else if (this.score <= 14) {
        this.severity = 'moderate';
        this.severityLabel = 'Moderate Depression (10-14)';
        this.interpretation = '<strong>Moderate depression.</strong> Your score suggests a moderate level of depression. It is recommended to consult a specialist for evaluation and to discuss treatment options.';
      } else if (this.score <= 19) {
        this.severity = 'moderate-severe';
        this.severityLabel = 'Moderately Severe Depression (15-19)';
        this.interpretation = '<strong>Moderately severe depression.</strong> Your score indicates significant depressive symptoms. I encourage you to schedule a consultation with a specialist as soon as possible.';
      } else {
        this.severity = 'severe';
        this.severityLabel = 'Severe Depression (20-27)';
        this.interpretation = '<strong>Severe depression.</strong> Your score indicates a high level of depressive symptoms. It is important to consult a mental health professional as soon as possible.';
      }
      var fLabels = ['not difficult at all', 'somewhat difficult', 'very difficult', 'extremely difficult'];
      if (this.functionalAnswer !== null && this.functionalAnswer > 0) {
        this.functionalText = '<strong>Functional impact:</strong> You indicated that these problems have made your life <em>' + fLabels[this.functionalAnswer] + '</em>. This provides additional information about how symptoms affect your daily life.';
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
