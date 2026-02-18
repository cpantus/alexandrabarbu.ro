---
title: "ADHD Screening - ASRS v1.1"
description: "Adult ADHD Self-Report Scale (WHO). 18 questions, instant results."
date: 2026-02-18
author: "Psychologist Alexandra Barbu"
layout: "single"
draft: false
---

<div class="c-assessment__disclaimer">
⚠️ <strong>Notice:</strong> This test is a screening tool, not a clinical diagnosis. ADHD can only be diagnosed by a specialist through a comprehensive evaluation. Results are indicative and do not replace professional assessment.
</div>

<div x-data="asrsApp()" class="c-assessment">
  <div class="c-assessment__progress">
    <div class="c-assessment__progress-bar" :style="'width:' + progress + '%'"></div>
  </div>

  <div x-show="!showResults">
      <div class="c-assessment__question">
        <div class="c-assessment__question-number" x-text="(currentIndex < 6 ? 'Part A — ' : 'Part B — ') + 'Question ' + (currentIndex + 1) + ' of ' + questions.length"></div>
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
        <button class="c-assessment__btn c-assessment__btn--secondary" @click="prev()" x-show="currentIndex > 0">Back</button>
        <div class="c-assessment__counter" x-text="(currentIndex + 1) + ' / ' + questions.length"></div>
        <button class="c-assessment__btn c-assessment__btn--primary" @click="currentIndex === questions.length - 1 ? calculate() : next()" :disabled="answers[currentIndex] === null">
          <span x-text="currentIndex === questions.length - 1 ? 'See Results' : 'Next'"></span>
        </button>
      </div>
  </div>

  <div x-show="showResults" class="c-assessment__results">
      <div class="c-assessment__score-display">
        <span class="c-assessment__score-value" x-text="partAPositive"></span>
        <span class="c-assessment__score-max">/ 6 positive (Part A)</span>
      </div>
      <div :class="'c-assessment__severity--' + severity">
        <span x-text="severityLabel"></span>
      </div>
      <div class="c-assessment__interpretation" x-html="interpretation"></div>
      <div class="c-assessment__subscales">
        <h4>Symptom Profile (Part B)</h4>
        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Inattention (average)</span>
          <span class="c-assessment__subscale-value" x-text="inattentionAvg.toFixed(1) + ' / 4'"></span>
        </div>
        <div class="c-assessment__subscale">
          <span class="c-assessment__subscale-label">Hyperactivity/Impulsivity (average)</span>
          <span class="c-assessment__subscale-value" x-text="hyperAvg.toFixed(1) + ' / 4'"></span>
        </div>
      </div>
      <div class="c-assessment__disclaimer">
        ⚠️ This result is indicative and does not constitute a diagnosis. ADHD requires a comprehensive evaluation by a specialist. Screening results only indicate whether further assessment is recommended.
      </div>
      <div class="c-assessment__cta">
        <a href="https://cal.com/alexandra-barbu-ras8xc/50min" class="c-assessment__cta-link">Schedule a Consultation</a>
      </div>
      <button class="c-assessment__restart" @click="restart()">Retake the Test</button>
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
      { text: 'How often do you have difficulty finishing the final details of a project, once the challenging parts have been done?' },
      { text: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?' },
      { text: 'How often do you have problems remembering appointments or obligations?' },
      { text: 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?' },
      { text: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?' },
      { text: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?' },
      { text: 'How often do you make careless mistakes when you have to work on a boring or difficult project?' },
      { text: 'How often do you have difficulty keeping your attention when you are doing boring or repetitive work?' },
      { text: 'How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?' },
      { text: 'How often do you misplace or have difficulty finding things at home or at work?' },
      { text: 'How often are you distracted by activity or noise around you?' },
      { text: 'How often do you leave your seat in meetings or other situations in which you are expected to remain seated?' },
      { text: 'How often do you feel restless or fidgety?' },
      { text: 'How often do you have difficulty unwinding and relaxing when you have time to yourself?' },
      { text: 'How often do you find yourself talking too much when you are in social situations?' },
      { text: 'How often do you finish the sentences of the people you are talking to, before they can finish them themselves?' },
      { text: 'How often do you have difficulty waiting your turn in situations when turn-taking is required?' },
      { text: 'How often do you interrupt others when they are busy?' }
    ],
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
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
      // Inattention items: indices 0,1,2,6,7,8,9,10
      var inattentionItems = [0,1,2,6,7,8,9,10];
      var inattentionSum = inattentionItems.reduce((s, idx) => s + (this.answers[idx] || 0), 0);
      this.inattentionAvg = inattentionSum / inattentionItems.length;

      // Hyperactivity items: indices 3,4,5,11,12,13,14,15,16,17
      var hyperItems = [3,4,5,11,12,13,14,15,16,17];
      var hyperSum = hyperItems.reduce((s, idx) => s + (this.answers[idx] || 0), 0);
      this.hyperAvg = hyperSum / hyperItems.length;

      if (this.partAPositive >= 4) {
        this.severity = 'severe';
        this.severityLabel = 'Highly Consistent with ADHD';
        this.interpretation = '<strong>Result: Highly consistent with ADHD in adults.</strong> You scored ' + this.partAPositive + ' out of 6 positive responses in Part A of the screener. This result strongly suggests the presence of ADHD symptoms and it is recommended to consult a specialist for a comprehensive diagnostic evaluation.';
      } else {
        this.severity = 'minimal';
        this.severityLabel = 'Less Consistent with ADHD';
        this.interpretation = '<strong>Result: Less consistent with ADHD.</strong> You scored ' + this.partAPositive + ' out of 6 positive responses in Part A. While the screening result does not clearly indicate ADHD, if you have concerns about attention or concentration, a consultation with a specialist may be helpful.';
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
