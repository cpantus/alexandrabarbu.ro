---
title: "Complete Component Showcase - All 66 Components"
description: "Comprehensive visual reference of all 9 atoms + 29 molecules + 2 organisms + 26 sections"
layout: "flexible"
draft: false

sections:
  - type: "hero-breadcrumb"
  - type: "values-compass"
  - type: "feature-blocks"
  - type: "stats-numbers"
  - type: "credentials-showcase"
  - type: "pricing-tables"
  - type: "problem-empathy"
  - type: "values-intro"
  - type: "feature-details"
  - type: "blog-grid"
  - type: "cta-standard"
  - type: "method-tabs"
  - type: "video-popup"
  - type: "faq-mini"
  - type: "faq-content"
  - type: "contact-form-enhanced"
  - type: "signup-form-enhanced"
  - type: "newsletter-signup"
  - type: "contact-info-cards"
  - type: "contact-options"
  - type: "onboarding-steps"
  - type: "privacy-guarantee"
  - type: "confidentiality-notice"
  - type: "first-session-timeline"
  - type: "service-faq-inline"
  - type: "testimonials-enhanced"

# 01. hero-breadcrumb - Page Header Section
hero_breadcrumb:
  title: "Complete Component Showcase"
  subtitle: "All 66 Components: 9 Atoms + 29 Molecules + 2 Organisms + 26 Sections"
  breadcrumbs:
    - name: "Home"
      url: "/"
    - name: "Components"
      url: "/components-complete-showcase"

# 02. values-compass - Enhanced v4.0 Compass Layout
values_compass:
  title: "01. values-compass (Enhanced v4.0)"
  subtitle: "Compass-pattern layout with glassmorphism"
  benefits:
    - title: "Glassmorphism"
      icon: "gem"
      description: "Frosted glass effect with backdrop-filter"
    - title: "Compass Layout"
      icon: "compass"
      description: "Unique radial card arrangement"
    - title: "Progressive Disclosure"
      icon: "mobile"
      description: "Tap-to-expand on mobile devices"
    - title: "Gradient Icons"
      icon: "palette"
      description: "Animated gradient icon circles"

# 03. feature-blocks - Enhanced v4.0 Zigzag Layout
feature_blocks_section:
  title: "02. feature-blocks (Enhanced v4.0)"
  subtitle: "Zigzag layout with parallax scrolling"
  features:
    - icon: "chart-line"
      title: "Evidence-Based Methods"
      description: "CBT, DBT, ACT approaches backed by research"
      image: "images/therapy-session.jpg"
    - icon: "heart"
      title: "Person-Centered Approach"
      description: "Tailored to your unique needs and goals"
      image: "images/consultation.jpg"

# 04. stats-numbers - Enhanced v4.0 Animated Counters
stats_section:
  title: "03. stats-numbers (Enhanced v4.0)"
  subtitle: "SVG progress rings with animated counting"
  stats:
    - number: 500
      suffix: "+"
      label: "Clients Helped"
      icon: "users"
    - number: 15
      suffix: "+"
      label: "Years Experience"
      icon: "calendar"
    - number: 95
      suffix: "%"
      label: "Success Rate"
      icon: "chart-line"
    - number: 1200
      suffix: "+"
      label: "Sessions"
      icon: "comments"

# 05. credentials-showcase - Enhanced v4.0 Gradient Badges
credentials_showcase:
  title: "04. credentials-showcase (Enhanced v4.0)"
  subtitle: "Gradient icon circles with credential badges"
  credentials:
    - icon: "user-md"
      title: "Licensed Psychologist"
      description: "Romanian College of Psychologists certified"
      badge_variant: "primary"
      badge_text: "CPR Licensed"
    - icon: "graduation-cap"
      title: "PhD in Psychology"
      description: "Advanced clinical psychology degree"
      badge_variant: "info"
      badge_text: "Education"
    - icon: "award"
      title: "CBT Specialist"
      description: "Cognitive Behavioral Therapy certified"
      badge_variant: "secondary"
      badge_text: "Specialty"
    - icon: "brain"
      title: "Trauma-Informed"
      description: "EMDR and somatic therapy trained"
      badge_variant: "premium"
      badge_text: "Advanced"

# 06. pricing-tables - Enhanced v4.0 Featured Tier
pricing_tables:
  title: "05. pricing-tables (Enhanced v4.0)"
  subtitle: "Featured tier elevation with comparison tooltips"
  monthly_label: "Monthly"
  yearly_label: "Yearly"
  show_toggle: true
  default_yearly: false
  plans:
    - name: "Individual Session"
      price_monthly: 250
      price_yearly: 200
      currency: "RON"
      description: "50-minute therapy session"
      features:
        - "Evidence-based approach"
        - "Confidential environment"
        - "Flexible scheduling"
      button_text: "Book Session"
      button_url: "/contact"
      featured: false
    - name: "Monthly Package"
      price_monthly: 900
      price_yearly: 750
      currency: "RON"
      description: "4 sessions per month"
      features:
        - "All Individual benefits"
        - "10% discount"
        - "Priority booking"
        - "Progress tracking"
      button_text: "Get Started"
      button_url: "/contact"
      featured: true
    - name: "Intensive Package"
      price_monthly: 1600
      price_yearly: 1400
      currency: "RON"
      description: "8 sessions per month"
      features:
        - "All Monthly Package benefits"
        - "20% discount"
        - "Unlimited email support"
        - "Crisis intervention"
      button_text: "Contact"
      button_url: "/contact"
      featured: false

# 07. problem-empathy - Challenge Recognition
problem_empathy:
  title: "06. problem-empathy"
  subtitle: "Display challenges with empathy and understanding"
  challenges:
    - title: "Constant Anxiety"
      description: "Overwhelming worry, tension, racing thoughts"
      icon: "brain"
    - title: "Relationship Struggles"
      description: "Communication issues, conflicts, emotional distance"
      icon: "users"
    - title: "Trauma Impact"
      description: "Painful memories, flashbacks, intense emotional reactions"
      icon: "heart-broken"
    - title: "Depression"
      description: "Low energy, loss of interest, hopelessness"
      icon: "sad-tear"

# 08. values-intro - Two-Column Introduction
values_intro:
  title: "07. values-intro"
  subtitle: "Two-column text + image introduction section"
  description: "Evidence-based therapy combining CBT, mindfulness, and person-centered approaches. We create a safe, confidential space where you can explore challenges, develop coping strategies, and achieve meaningful change."
  image: "images/therapy-consultation.jpg"
  buttons:
    - text: "Schedule Consultation"
      url: "/contact"
      variant: "primary"
    - text: "Learn About Approach"
      url: "/approach"
      variant: "secondary"

# 09. feature-details - Detailed Feature Showcase
feature_details:
  title: "08. feature-details"
  subtitle: "Detailed feature showcase with markdown content"
  features:
    - icon: "shield-alt"
      title: "Complete Confidentiality"
      description: "Your privacy is protected by professional ethics and legal confidentiality standards."
    - icon: "calendar-check"
      title: "Flexible Scheduling"
      description: "Evening and weekend appointments available to fit your schedule."
    - icon: "comments"
      title: "Evidence-Based"
      description: "Using scientifically validated therapeutic approaches proven effective."

# 10. blog-grid - Blog Post Grid
blog_grid:
  title: "09. blog-grid"
  subtitle: "Blog post grid with pagination and filtering"
  show_filters: true
  posts_per_page: 6

# 11. cta-standard - Standard Call-to-Action
cta_standard:
  title: "10. cta-standard - Ready to Start?"
  description: "Take the first step towards positive change. Schedule your free consultation today."
  button_text: "Book Free Consultation"
  button_url: "/contact"
  button_variant: "primary"
  secondary_button_text: "Learn More"
  secondary_button_url: "/approach"
  secondary_button_variant: "outline-secondary"
  variant: "primary"
  background: "gradient"

# 12. method-tabs - Tabbed Content Switcher
method_tabs:
  title: "11. method-tabs"
  subtitle: "Tabbed content switcher for methodology"
  methods:
    - name: "cbt"
      id: "cbt"
      label: "CBT"
      title: "Cognitive Behavioral Therapy"
      description: "Evidence-based approach focusing on thoughts, feelings, and behaviors."
      content: "CBT helps identify and change negative thought patterns that contribute to emotional distress. Through structured sessions, you'll learn practical techniques to challenge unhelpful beliefs and develop healthier coping strategies."
    - name: "mindfulness"
      id: "mindfulness"
      label: "Mindfulness"
      title: "Mindfulness-Based Therapy"
      description: "Present-moment awareness for emotional regulation."
      content: "Mindfulness practices help you observe thoughts and feelings without judgment, reducing reactivity and increasing emotional regulation. Learn meditation, breathing techniques, and body awareness exercises."
    - name: "person-centered"
      id: "person-centered"
      label: "Person-Centered"
      title: "Person-Centered Approach"
      description: "Compassionate, non-judgmental therapeutic relationship."
      content: "This approach emphasizes empathy, genuineness, and unconditional positive regard. You lead the direction of therapy while I provide a safe, supportive environment for exploration and growth."

# 13. video-popup - Video Modal
video_popup:
  title: "12. video-popup"
  subtitle: "Video modal with play button overlay"
  video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  thumbnail: "images/video-thumbnail.jpg"
  button_text: "Watch Introduction"

# 14. faq-mini - Compact FAQ
faq_mini:
  title: "13. faq-mini"
  subtitle: "Compact FAQ accordion (3-5 questions)"
  questions:
    - question: "How long are sessions?"
      answer: "Standard sessions are 50 minutes. Initial consultation is 60 minutes."
    - question: "Do you accept insurance?"
      answer: "Yes, we work with major insurance providers. Contact us for specific coverage details."
    - question: "Is everything confidential?"
      answer: "Absolutely. All sessions are protected by professional confidentiality standards and legal privacy requirements."

# 15. faq-content - Full FAQ Section
faq_content:
  title: "14. faq-content"
  subtitle: "Full FAQ section with categorization"
  categories:
    - name: "Getting Started"
      questions:
        - question: "How do I book my first session?"
          answer: "Contact us via phone, email, or the online form. We'll schedule a free 20-minute consultation to discuss your needs."
        - question: "What should I expect in the first session?"
          answer: "The first session focuses on understanding your concerns, history, and goals. We'll discuss confidentiality, answer questions, and create an initial treatment plan."
    - name: "Therapy Process"
      questions:
        - question: "How often should I attend sessions?"
          answer: "Most clients benefit from weekly sessions initially. Frequency can be adjusted based on progress and your needs."
        - question: "How long does therapy take?"
          answer: "Duration varies by individual goals and concerns. Short-term therapy may last 8-12 sessions, while deeper work can extend to 6-12 months or longer."

# 16. contact-form-enhanced - Full Contact Form
contact_form_enhanced:
  title: "15. contact-form-enhanced"
  subtitle: "Full contact form with validation and trust badges"
  show_trust_badges: true
  privacy_text: "Your information is protected and will only be used to contact you regarding your inquiry."

# 17. signup-form-enhanced - Newsletter/Service Signup
signup_form_enhanced:
  title: "16. signup-form-enhanced"
  subtitle: "Newsletter/service signup with benefits display"
  benefits:
    - "Mental health tips and resources"
    - "Exclusive therapy insights"
    - "Workshop announcements"
    - "No spam, unsubscribe anytime"
  privacy_note: "We respect your privacy. Unsubscribe at any time."

# 18. newsletter-signup - Simple Email Subscription
newsletter_signup:
  title: "17. newsletter-signup"
  subtitle: "Simple email subscription form"
  description: "Get mental health tips and therapy insights delivered to your inbox monthly."
  button_text: "Subscribe"
  privacy_text: "We respect your privacy. Unsubscribe anytime."
  background_variant: "primary"

# 19. contact-info-cards - Contact Methods
contact_info_cards:
  title: "18. contact-info-cards"
  subtitle: "Contact methods with icon cards"
  methods:
    - icon: "phone"
      label: "Phone"
      value: "+40 123 456 789"
      link: "tel:+40123456789"
      variant: "primary"
    - icon: "envelope"
      label: "Email"
      value: "contact@example.com"
      link: "mailto:contact@example.com"
      variant: "secondary"
    - icon: "map-marker-alt"
      label: "Address"
      value: "Str. Example 123, București"
      link: "https://maps.google.com"
      variant: "tertiary"

# 20. contact-options - Alternative Contact Channels
contact_options:
  title: "19. contact-options"
  subtitle: "Alternative contact channels and commitment indicators"
  options:
    - title: "No Commitment Consultation"
      description: "20-minute free phone consultation"
      icon: "phone-alt"
    - title: "Flexible Scheduling"
      description: "Evening and weekend appointments"
      icon: "calendar-alt"
    - title: "Online Sessions"
      description: "Secure video therapy available"
      icon: "video"

# 21. onboarding-steps - Process Timeline
onboarding_steps:
  title: "20. onboarding-steps"
  subtitle: "Process timeline for new clients"
  steps:
    - title: "Contact Us"
      description: "Reach out via phone, email, or contact form"
      icon: "phone"
    - title: "Free Consultation"
      description: "20-minute phone call to discuss your needs"
      icon: "comments"
    - title: "Schedule Session"
      description: "Book your first 60-minute session"
      icon: "calendar"
    - title: "Begin Therapy"
      description: "Start your journey toward positive change"
      icon: "heart"

# 22. privacy-guarantee - Privacy Assurance
privacy_guarantee:
  title: "21. privacy-guarantee"
  subtitle: "Privacy and confidentiality assurance"
  intro: "Your privacy and confidentiality are our top priorities. We adhere to the highest professional and legal standards."
  features:
    - icon: "shield-alt"
      title: "Legal Protection"
      description: "Protected by professional confidentiality laws"
    - icon: "lock"
      title: "Secure Storage"
      description: "Encrypted digital records and secure physical storage"
    - icon: "user-shield"
      title: "Professional Ethics"
      description: "Bound by Romanian College of Psychologists ethical code"

# 23. confidentiality-notice - Legal Confidentiality
confidentiality_notice:
  title: "22. confidentiality-notice"
  subtitle: "Legal confidentiality notice with limits disclosure"
  notice_type: "warning"
  intro: "Everything discussed in therapy is confidential, with specific legal exceptions:"
  limits:
    - "Imminent risk of harm to self or others"
    - "Suspected child or elder abuse"
    - "Court-ordered disclosure"
  link_text: "Read full Privacy Policy"
  link_url: "/privacy-policy"

# 24. first-session-timeline - Session Expectations
first_session_timeline:
  title: "23. first-session-timeline"
  subtitle: "What to expect in your first session"
  duration: "60 minutes"
  steps:
    - title: "Welcome & Paperwork"
      duration: "10 min"
      description: "Complete consent forms and discuss confidentiality"
      icon: "clipboard-list"
      variant: "primary"
    - title: "Your Story"
      duration: "20 min"
      description: "Share what brought you to therapy and your current concerns"
      icon: "comments"
      variant: "secondary"
    - title: "Assessment"
      duration: "15 min"
      description: "Explore history, strengths, and challenges"
      icon: "tasks"
      variant: "tertiary"
    - title: "Treatment Plan"
      duration: "10 min"
      description: "Discuss goals and therapeutic approach"
      icon: "route"
      variant: "primary"
    - title: "Questions & Next Steps"
      duration: "5 min"
      description: "Address questions and schedule follow-up"
      icon: "question-circle"
      variant: "secondary"

# 25. service-faq-inline - Service-Specific FAQ
service_faq_inline:
  title: "24. service-faq-inline"
  subtitle: "Service-specific inline FAQ with rich features"
  questions:
    - question: "Who is individual therapy for?"
      answer: "Individual therapy is for anyone experiencing emotional distress, life transitions, relationship challenges, anxiety, depression, or seeking personal growth."
      icon: "user"
      tags: ["General", "Getting Started"]
    - question: "What methods do you use?"
      answer: "I integrate evidence-based approaches including CBT, mindfulness, person-centered therapy, and trauma-informed techniques tailored to your needs."
      icon: "brain"
      tags: ["Methods", "Approach"]
      highlight: true
    - question: "How long until I see results?"
      answer: "Many clients notice improvements within 4-6 sessions. Significant, lasting change typically occurs over 3-6 months of consistent work."
      icon: "chart-line"
      tags: ["Timeline", "Results"]

# 26. testimonials-enhanced - Client Testimonials
testimonials_enhanced:
  title: "25. testimonials-enhanced"
  subtitle: "Client testimonials with ratings and verification"
  testimonials:
    - name: "Maria S."
      role: "Individual Therapy Client"
      avatar: "images/avatar-woman-1.jpg"
      rating: 5
      quote: "The therapy sessions helped me develop practical tools to manage anxiety. I feel more confident and in control of my emotions."
      outcome: "Reduced anxiety, improved coping skills"
      duration: "4 months"
      verified: true
    - name: "Alexandru P."
      role: "Couples Therapy Client"
      avatar: "images/avatar-man-1.jpg"
      rating: 5
      quote: "We learned to communicate better and understand each other's perspectives. Our relationship is stronger than ever."
      outcome: "Improved communication, closer relationship"
      duration: "6 months"
      verified: true
    - name: "Elena R."
      role: "Trauma Therapy Client"
      avatar: "images/avatar-woman-2.jpg"
      rating: 5
      quote: "EMDR therapy helped me process traumatic memories I'd carried for years. I finally feel free from the past."
      outcome: "Processed trauma, increased emotional freedom"
      duration: "8 months"
      verified: true
---

## Complete Component Inventory

### 9 Atoms (Basic Building Blocks)
1. **button** - Buttons with 8 variants (primary, secondary, tertiary, success, warning, error, info, neutral)
2. **heading** - Headings h1-h6 with 8 color variants
3. **icon** - Line Awesome icons with 8 variants, sizes, animations
4. **image** - Responsive images with WebP/AVIF, srcset, lazy loading
5. **tag** - Small labels/tags with 8 variants
6. **divider** - Horizontal/vertical separators
7. **link** - Text links with underline animation
8. **spinner** - Animated loading indicator
9. **avatar** - Circular profile photos

### 29 Molecules (Composite Components)
1. **card** - Flexible cards with 8 variants
2. **accordion** - Collapsible FAQ/content sections
3. **navigation** - Main site navigation with dropdowns
4. **breadcrumb** - Navigation breadcrumb trail
5. **form-field** - Composite form field with label/input/validation
6. **credential-badge** - Professional credentials display
7. **pricing-toggle** - Monthly/yearly pricing switcher
8. **social-links** - Social media icon links
9. **video-embed** - Responsive video wrapper
10. **timeline-step** - Process/timeline step display
11. **stat-card** - Statistics display with count-up
12. **blog-card** - Blog post preview card
13. **back-to-top** - Floating back-to-top button
14. **cookie-consent** - GDPR cookie banner
15. **emergency-banner** - Crisis hotline banner
16. **footer-info** - Footer logo and description
17. **footer-nav** - Footer links and social icons
18. **language-selector** - Language switcher dropdown
19. **logo** - Site logo component
20. **mobile-menu** - Mobile navigation menu
21. **nav-item** - Individual navigation item
22. **service-preview-card** - Service preview with icon/image
23. **value-card** - Value/principle card with icon
24. **process-step** - Numbered process step
25. **resource-card** - Blog/article card with metadata
26. **contact-method-card** - Phone/email/location card
27. **feature-highlight** - Inline feature display
28. **quote-block** - Testimonial/quote block
29. **info-box** - Informational callout box

### 2 Organisms (Complex Compositions)
1. **header** - Site header with logo, navigation, language selector, mobile menu
2. **footer** - Site footer with info, navigation, social links, copyright

### 26 Active Sections (Page Sections)
All sections displayed above in this showcase page.

---

**Total Components**: **66** (9 + 29 + 2 + 26)
**Architecture**: Atomic Design + ITCSS + BEM
**Version**: 5.1.0
**Typography**: Crimson Pro + Work Sans
**Build Time**: <500ms
**Status**: Production Ready ✅
