# Detailed Requirements & Context

**Project**: Site Structure Implementation
**Source**: Original user requirements specification
**Date**: 2025-11-20

---

## Site Architecture Overview

Complete structure for Alexandra Barbu Psychology Practice website.

```
🌳 SITE ARCHITECTURE
├── 🏠 HOMEPAGE (/)
├── 📖 DESPRE (/despre-mine/)
├── 🛠️ SERVICII (/servicii/)
│   ├── Terapie Individuală (/servicii/terapie-individuala/)
│   ├── Terapie de Cuplu (/servicii/terapie-cuplu/)
│   ├── Terapie de Familie (/servicii/terapie-familie/)
│   └── Psihologie Organizațională (/servicii/psihologie-organizationala/)
├── 🧭 ABORDARE (/abordare/)
├── 📚 RESURSE (/resurse/)
├── 📞 CONTACT (/contact/)
└── 📋 TERMENI & CONDIȚII (/termeni-si-conditii/)
```

**English Equivalent Structure** (`/en/` prefix):
- All Romanian pages have exact English equivalents
- URL structure: `/en/about/`, `/en/services/individual-therapy/`, etc.
- Navigation labels translated but structure identical

---

## Global Elements

### NAVIGATION/HEADER

**Components**:
- Logo (left aligned)
- Main menu (center/right):
  - Acasă / Home
  - Despre / About
  - Servicii / Services (dropdown):
    - Terapie Individuală / Individual Therapy
    - Terapie de Cuplu / Couple Therapy
    - Terapie de Familie / Family Therapy
    - Psihologie Organizațională / Organizational Psychology
  - Abordare / Approach
  - Resurse / Resources
  - Contact
- CTA Button: "Programează Consultație" / "Book Consultation" (highlighted)
- Mobile: Hamburger menu with same structure

**Behavior**:
- Sticky/fixed on scroll (optional)
- Active page highlighting
- Dropdown opens on hover (desktop) / click (mobile)
- Language switcher (RO ⇄ EN)
- Responsive collapse to mobile menu

### FOOTER

**Structure** (4 columns):

**Column 1: Servicii / Services**
- Link: Terapie Individuală / Individual Therapy
- Link: Terapie de Cuplu / Couple Therapy
- Link: Terapie de Familie / Family Therapy
- Link: Psihologie Organizațională / Organizational Psychology

**Column 2: Resurse / Resources**
- Link: Blog/Articole / Blog/Articles
- Link: Ghiduri Gratuite / Free Guides
- Link: Exerciții Practice / Practical Exercises
- Link: Workshop-uri / Workshops

**Column 3: Informații / Information**
- Link: Despre / About
- Link: Abordare / Approach
- Link: Termeni și Condiții / Terms & Conditions
- Link: Politica de Confidențialitate / Privacy Policy

**Column 4: Contact**
- Address
- Phone (clickable tel: link)
- Email (clickable mailto: link)
- Program / Hours

**Below Columns**:
- Social Media Icons (Facebook, LinkedIn, Instagram)
- Newsletter signup (optional)
- Copyright & Legal links

---

## Page Layout Specifications

### 🏠 HOMEPAGE

**URL**: `/` (RO) | `/en/` (EN)
**Sections**: 10 total

---

#### 1. HERO SECTION

**Type**: `hero-breadcrumb`
**Purpose**: Main landing impression, value proposition, primary CTAs

**Content**:
- **Headline principal**: Clear, compelling value proposition
  - Example (RO): "Terapie Psihologică Profesională în București"
  - Example (EN): "Professional Psychological Therapy in Bucharest"
- **Subheadline**: Supporting statement
  - Example (RO): "Ajutor specializat pentru depresie, anxietate, și relații"
  - Example (EN): "Specialized help for depression, anxiety, and relationships"
- **Text introductiv**: 2-3 sentences explaining what's offered
- **CTA principal**: "Programează Consultație Gratuită" / "Book Free Consultation"
- **CTA secundar**: "Află Mai Multe" / "Learn More" (scrolls to problem section)
- **Imagine/Video background**: Professional, warm, inviting

**Visual Style**: Full-width hero, centered text, gradient overlay on image

---

#### 2. PROBLEMA/EMPATIE SECTION

**Type**: `problem-empathy`
**Purpose**: Connect with visitor pain points, show understanding

**Content**:
- **Titlu**: "Recunoști Aceste Semne?" / "Do You Recognize These Signs?"
- **4 blocuri provocări comune**:
  1. "Te simți copleșit de anxietate" / "You feel overwhelmed by anxiety"
  2. "Relațiile tale suferă" / "Your relationships are suffering"
  3. "Nu mai găsești bucurie în viață" / "You no longer find joy in life"
  4. "Te simți blocat în trecut" / "You feel stuck in the past"
- **Text empatic de conectare**: "Nu ești singur. Aceste sentimente sunt mai comune decât crezi, și există ajutor." / "You're not alone. These feelings are more common than you think, and help is available."

**Visual Style**: 2x2 grid desktop, stacked mobile, icons + short text

---

#### 3. SERVICII PREVIEW

**Type**: `services-preview` (NEW SECTION)
**Purpose**: Showcase 4 main services with CTAs to service pages

**Content**:
- **Titlu secțiune**: "Cum Te Pot Ajuta" / "How I Can Help"
- **4 card-uri servicii principale**:
  1. **Terapie Individuală**
     - Icon: person icon
     - Titlu: "Terapie Individuală" / "Individual Therapy"
     - Descriere scurtă: "Abordare personalizată pentru depresie, anxietate, și creștere personală" / "Personalized approach for depression, anxiety, and personal growth"
     - CTA: "Află Mai Multe" → `/servicii/terapie-individuala/`
  2. **Terapie de Cuplu**
     - Icon: couple/hearts icon
     - Titlu: "Terapie de Cuplu" / "Couple Therapy"
     - Descriere scurtă: "Reconstruiește conexiunea și comunicarea în relație" / "Rebuild connection and communication in your relationship"
     - CTA: "Află Mai Multe" → `/servicii/terapie-cuplu/`
  3. **Terapie de Familie**
     - Icon: family icon
     - Titlu: "Terapie de Familie" / "Family Therapy"
     - Descriere scurtă: "Vindecare și armonizare a dinamicii familiale" / "Healing and harmonizing family dynamics"
     - CTA: "Află Mai Multe" → `/servicii/terapie-familie/`
  4. **Psihologie Organizațională**
     - Icon: organization/building icon
     - Titlu: "Psihologie Organizațională" / "Organizational Psychology"
     - Descriere scurtă: "Optimizare echipe și cultură organizațională sănătoasă" / "Team optimization and healthy organizational culture"
     - CTA: "Află Mai Multe" → `/servicii/psihologie-organizationala/`

**Visual Style**: 4-column grid desktop, 2-column tablet, 1-column mobile, cards with hover effects

---

#### 4. DESPRE PREVIEW

**Type**: `about-preview` (NEW SECTION)
**Purpose**: Introduce therapist, build trust, link to full about page

**Content**:
- **Fotografie Alexandra**: Professional headshot, warm expression
- **Text scurt introducere**: 2-3 sentences about Alexandra
  - Example (RO): "Sunt psiholog clinician cu peste 15 ani de experiență în terapie individuală și de cuplu. Cred în puterea vindecării prin compasiune, înțelegere, și tehnici bazate pe dovezi."
  - Example (EN): "I'm a clinical psychologist with over 15 years of experience in individual and couple therapy. I believe in the power of healing through compassion, understanding, and evidence-based techniques."
- **Credențiale principale**: Bullet list
  - "Psiholog Clinician Licențiat" / "Licensed Clinical Psychologist"
  - "15+ ani experiență" / "15+ years experience"
  - "Certificări: CBT, EMDR, Mindfulness" / "Certifications: CBT, EMDR, Mindfulness"
- **CTA**: "Citește Povestea Mea" / "Read My Story" → `/despre-mine/`

**Visual Style**: 2-column layout (image left, content right), warm colors

---

#### 5. ABORDARE PREVIEW

**Type**: `approach-preview` (NEW SECTION)
**Purpose**: Preview therapeutic philosophy, link to approach page

**Content**:
- **Titlu**: "Abordarea Mea Terapeutică" / "My Therapeutic Approach"
- **4 principii cheie**:
  1. **Bazat pe Dovezi / Evidence-Based**
     - Icon: science/research icon
     - Text: "Folosesc metode validate științific: CBT, DBT, ACT" / "I use scientifically validated methods: CBT, DBT, ACT"
  2. **Personalizat / Personalized**
     - Icon: person/customize icon
     - Text: "Fiecare plan de terapie este adaptat nevoilor tale unice" / "Every therapy plan is adapted to your unique needs"
  3. **Compasiune / Compassion**
     - Icon: heart icon
     - Text: "Creez un spațiu sigur, lipsit de judecată" / "I create a safe, judgment-free space"
  4. **Rezultate Măsurabile / Measurable Results**
     - Icon: chart/progress icon
     - Text: "Urmărim progresul împreună și ajustăm abordarea" / "We track progress together and adjust the approach"
- **CTA**: "Descoperă Abordarea Completă" / "Discover Complete Approach" → `/abordare/`

**Visual Style**: 2x2 grid desktop, stacked mobile, icons prominent

---

#### 6. TESTIMONIALE

**Type**: `testimonials-enhanced`
**Purpose**: Social proof, build trust through client stories

**Content**:
- **Titlu secțiune**: "Ce Spun Clienții Mei" / "What My Clients Say"
- **3 testimoniale** (carousel or grid):
  1. **Testimonial 1**:
     - Quote: "Alexandra m-a ajutat să găsesc puterea de a depăși depresia. Acum văd viața diferit." / "Alexandra helped me find the strength to overcome depression. I see life differently now."
     - Name: "Maria, 34 ani" / "Maria, 34 years old"
     - Service: "Terapie Individuală" / "Individual Therapy"
     - Photo: Avatar or real photo (if available)
     - Rating: 5 stars
  2. **Testimonial 2**:
     - Quote: "Relația noastră era pe marginea prăpastiei. Acum comunicăm cu adevărat." / "Our relationship was on the edge. Now we truly communicate."
     - Name: "Andrei și Elena" / "Andrei and Elena"
     - Service: "Terapie de Cuplu" / "Couple Therapy"
     - Rating: 5 stars
  3. **Testimonial 3**:
     - Quote: "Tehnicile învățate în terapie m-au ajutat să gestionez anxietatea zilnică." / "The techniques learned in therapy helped me manage daily anxiety."
     - Name: "Ioana, 28 ani" / "Ioana, 28 years old"
     - Service: "Terapie Individuală" / "Individual Therapy"
     - Rating: 5 stars

**Visual Style**: Cards with quotes, client info, 3-column desktop, carousel mobile

---

#### 7. PROCES SIMPLU

**Type**: `simple-process` (NEW SECTION)
**Purpose**: Demystify therapy process, make it approachable

**Content**:
- **Titlu**: "3 Pași Către Vindecare" / "3 Steps to Healing"
- **3 pași**:
  1. **Programează / Schedule**
     - Icon: calendar icon
     - Număr: "1"
     - Titlu: "Programează Consultația Gratuită" / "Book Free Consultation"
     - Descriere: "30 minute pentru a ne cunoaște și stabili dacă pot să te ajut" / "30 minutes to get to know each other and see if I can help"
  2. **Evaluează / Assess**
     - Icon: clipboard/assessment icon
     - Număr: "2"
     - Titlu: "Evaluare și Plan Personalizat" / "Assessment and Personalized Plan"
     - Descriere: "Înțelegem provocările tale și creăm un plan de acțiune" / "We understand your challenges and create an action plan"
  3. **Vindecă / Heal**
     - Icon: growth/plant icon
     - Număr: "3"
     - Titlu: "Începe Călătoria de Vindecare" / "Begin Healing Journey"
     - Descriere: "Lucrăm împreună spre obiectivele tale de sănătate mentală" / "We work together toward your mental health goals"

**Visual Style**: Horizontal timeline desktop (with connecting line), vertical stacked mobile, numbers prominent

---

#### 8. FAQ PREVIEW

**Type**: `faq-mini`
**Purpose**: Answer common questions, reduce friction to booking

**Content**:
- **Titlu**: "Întrebări Frecvente" / "Frequently Asked Questions"
- **3-4 întrebări**:
  1. Q: "Cât durează o ședință?" / "How long is a session?"
     A: "O ședință durează 50-60 minute." / "A session lasts 50-60 minutes."
  2. Q: "Cât costă terapia?" / "How much does therapy cost?"
     A: "Tariful pentru o ședință individuală este X lei. Vezi detalii complete pe pagina de Contact." / "The rate for an individual session is X lei. See complete details on the Contact page."
  3. Q: "Este confidențial?" / "Is it confidential?"
     A: "Da, complet confidențial. Respectăm strictele standarde de confidențialitate GDPR." / "Yes, completely confidential. We strictly adhere to GDPR confidentiality standards."
  4. Q: "Câte ședințe sunt necesare?" / "How many sessions are needed?"
     A: "Variază după nevoi. Unii clienți beneficiază de 6-10 ședințe, alții de terapie pe termen mai lung." / "It varies by needs. Some clients benefit from 6-10 sessions, others from longer-term therapy."
- **Link**: "Vezi Toate Întrebările" / "See All Questions" → FAQ page or section

**Visual Style**: Accordion (expandable), 4 questions visible

---

#### 9. CTA FINAL

**Type**: `cta-standard`
**Purpose**: Strong final call-to-action before footer

**Content**:
- **Headline acțiune**: "Gata Să Faci Primul Pas?" / "Ready to Take the First Step?"
- **Text motivațional**: "Nu trebuie să treci prin asta singur. Programează o consultație gratuită astăzi și să începem împreună călătoria spre vindecare." / "You don't have to go through this alone. Book a free consultation today and let's begin the journey to healing together."
- **Buton programare**: "Programează Consultație Gratuită" / "Book Free Consultation" (prominent, primary button)
- **Garanții/beneficii** (bullet list):
  - "✓ Consultație inițială gratuită 30 minute" / "✓ Free 30-minute initial consultation"
  - "✓ Complet confidențial" / "✓ Completely confidential"
  - "✓ Online sau la cabinet" / "✓ Online or in-office"

**Visual Style**: Full-width section, contrasting background color, centered content, large CTA button

---

#### 10. FOOTER

**Type**: Standard footer (see Global Elements section above)

---

### 📖 DESPRE (ABOUT PAGE)

**URL**: `/despre-mine/` (RO) | `/en/about/` (EN)
**Sections**: 8 total

---

#### 1. HERO SECTION

**Type**: `hero-breadcrumb`
**Content**:
- Titlu pagină: "Despre Mine" / "About Me"
- Subtitlu: "Povestea Mea și Abordarea Terapeutică" / "My Story and Therapeutic Approach"
- Fotografie profesională: Full-width hero with professional photo

---

#### 2. POVESTEA MEA

**Type**: `my-story` (NEW SECTION)
**Purpose**: Personal narrative, build connection and trust

**Content**:
- **Titlu secțiune**: "Povestea Mea" / "My Story"
- **2-3 paragrafe narative**:
  - Paragraph 1: Why became a psychologist (personal motivation, calling)
  - Paragraph 2: Journey through education and career
  - Paragraph 3: Philosophy and what drives me today
- **Fotografie informală/cabinet**: Image of therapist in office or more casual setting
- **Optional pull quote**: Highlighted meaningful quote from narrative

**Visual Style**: Rich text with image embeds, personal, warm tone

---

#### 3. FORMARE & CERTIFICĂRI

**Type**: `training-certifications` (NEW SECTION)
**Purpose**: Establish credentials and expertise

**Content**:
- **Titlu secțiune**: "Formare Profesională" / "Professional Training"
- **Listă educație** (timeline or cards):
  1. **Doctorate/Master**:
     - Degree: "Doctor în Psihologie Clinică" / "PhD in Clinical Psychology"
     - Institution: "Universitatea București"
     - Year: "2005"
     - Logo: University logo (if available)
  2. **Bachelor**:
     - Degree: "Licență în Psihologie" / "Bachelor in Psychology"
     - Institution: "Universitatea București"
     - Year: "2000"
  3. **Specializations**:
     - Certification: "Certificare CBT (Cognitive Behavioral Therapy)"
     - Institution: "Beck Institute"
     - Year: "2008"
  4. **Certification 2**:
     - Certification: "EMDR Practitioner"
     - Institution: "EMDR International Association"
     - Year: "2012"
  5. **Ongoing Training**:
     - Text: "Participare continuă la conferințe și training-uri internaționale" / "Ongoing participation in international conferences and trainings"

**Visual Style**: Vertical timeline desktop, cards mobile, institution logos, dates prominent

---

#### 4. VALORI & FILOZOFIE

**Type**: `values-compass` (EXISTING - enhanced v4.0)
**Purpose**: Core values that guide practice

**Content**:
- **Titlu secțiune**: "Valorile Mele" / "My Values"
- **4-6 valori cu descrieri**:
  1. **Compasiune / Compassion**
     - Icon: heart
     - Descriere: "Cred în puterea empatiei și înțelegerii" / "I believe in the power of empathy and understanding"
  2. **Integritate / Integrity**
     - Icon: shield
     - Descriere: "Onestitate și transparență în toate interacțiunile" / "Honesty and transparency in all interactions"
  3. **Colaborare / Collaboration**
     - Icon: handshake
     - Descriere: "Lucrăm împreună ca parteneri în vindecare" / "We work together as partners in healing"
  4. **Excelență / Excellence**
     - Icon: star
     - Descriere: "Angajament față de cele mai înalte standarde profesionale" / "Commitment to the highest professional standards"
  5. **Respect / Respect**
     - Icon: person
     - Descriere: "Fiecare persoană este unică și merită respect" / "Every person is unique and deserves respect"
  6. **Creștere / Growth**
     - Icon: plant/arrow-up
     - Descriere: "Cred că fiecare poate crește și evolua" / "I believe everyone can grow and evolve"

**Visual Style**: Compass layout (values-compass component), glassmorphism cards, gradient icons

---

#### 5. CIFRE & EXPERIENȚĂ

**Type**: `stats-numbers` (EXISTING - enhanced v4.0)
**Purpose**: Quantify experience and impact

**Content**:
- **Titlu secțiune**: "Experiența Mea în Cifre" / "My Experience in Numbers"
- **4 statistici**:
  1. **Ani experiență**:
     - Number: "15+"
     - Label: "Ani de Experiență" / "Years of Experience"
     - Icon: calendar
  2. **Clienți ajutați**:
     - Number: "500+"
     - Label: "Clienți Ajutați" / "Clients Helped"
     - Icon: people
  3. **Ore de formare**:
     - Number: "2000+"
     - Label: "Ore de Formare Continuă" / "Hours of Continuous Training"
     - Icon: book
  4. **Specializări**:
     - Number: "8"
     - Label: "Certificări Specializate" / "Specialized Certifications"
     - Icon: certificate

**Visual Style**: SVG progress rings with animated counting (0→target, 2s), 4-column grid desktop, 2-column mobile

---

#### 6. ABORDAREA MEA

**Type**: `approach-preview` (NEW SECTION)
**Purpose**: Link to full approach page

**Content**:
- Text scurt despre abordare terapeutică
- CTA: "Descoperă Abordarea Mea Completă" / "Discover My Complete Approach" → `/abordare/`

---

#### 7. CTA SECTION

**Type**: `cta-standard`
**Content**:
- Text încurajator: "Hai să Vorbim" / "Let's Talk"
- Subtitlu: "Programează o consultație gratuită pentru a vedea dacă putem lucra împreună" / "Book a free consultation to see if we can work together"
- Buton: "Programează Consultație" / "Book Consultation" → `/contact/`

---

#### 8. FOOTER

**Type**: Standard footer

---

### 🛠️ SERVICII - PAGINA PRINCIPALĂ

**URL**: `/servicii/` (RO) | `/en/services/` (EN)
**Sections**: 6 total

---

#### 1. HERO SECTION

**Type**: `hero-breadcrumb`
**Content**:
- Titlu principal: "Servicii de Terapie" / "Therapy Services"
- Subtitlu: "Găsește Serviciul Potrivit Pentru Tine" / "Find the Right Service for You"
- Text introductiv: Brief overview of service offerings

---

#### 2. SERVICII GRID

**Type**: `services-preview` (NEW SECTION)
**Content**: All 4 service cards (same as homepage section 3)
- Each card with: icon, title, short description, CTA to individual service page

---

#### 3. CUM ALEG SERVICIUL POTRIVIT

**Type**: `feature-blocks`
**Purpose**: Guide visitors to appropriate service

**Content**:
- Titlu: "Cum Aleg Serviciul Potrivit?" / "How Do I Choose the Right Service?"
- Ghid de orientare:
  - "Dacă te confrunți cu..." → "Consideră..." guidance
  - Decision tree or quiz-style questions
- CTA: "Nu ești sigur? Programează consultație gratuită de orientare" / "Not sure? Book free orientation consultation"

---

#### 4. BENEFICII GENERALE

**Type**: `values-intro`
**Purpose**: General benefits of therapy

**Content**:
- Titlu: "De Ce Terapia Funcționează" / "Why Therapy Works"
- Ce poți aștepta: List of general therapy benefits
- Evidence-based approach explanation

---

#### 5. CTA SECTION

**Type**: `cta-standard`
**Content**:
- Consultație gratuită orientare
- Contact pentru întrebări

---

#### 6. FOOTER

---

### 🛠️ SERVICII - PAGINI INDIVIDUALE

**Structure**: 12 sections each
**Pages**: 4 services × 2 languages = 8 files total

**URLs**:
- RO: `/servicii/terapie-individuala/`, `/servicii/terapie-cuplu/`, `/servicii/terapie-familie/`, `/servicii/psihologie-organizationala/`
- EN: `/en/services/individual-therapy/`, `/en/services/couple-therapy/`, `/en/services/family-therapy/`, `/en/services/organizational-psychology/`

---

#### 1. HERO SECTION

**Type**: `hero-breadcrumb`
**Content**:
- Titlu serviciu (specific pentru fiecare serviciu)
- Subtitlu descriptiv
- Imagine reprezentativă

---

#### 2. PENTRU CINE ESTE

**Type**: `feature-blocks`
**Purpose**: Who benefits from this service

**Content**:
- Titlu: "Pentru Cine Este [Service Name]?" / "Who Is [Service Name] For?"
- Checklist situații/simptome:
  - "✓ Te confrunți cu..." / "✓ You're dealing with..."
  - 6-8 specific situations relevant to service
- Persoane care beneficiază: Descriptive text

**Example (Individual Therapy)**:
- "✓ Depresie și lipsă de motivație" / "✓ Depression and lack of motivation"
- "✓ Anxietate și atacuri de panică" / "✓ Anxiety and panic attacks"
- "✓ Traume din trecut" / "✓ Past traumas"
- "✓ Probleme de stimă de sine" / "✓ Self-esteem issues"
- "✓ Tranziții de viață dificile" / "✓ Difficult life transitions"
- "✓ Dorința de creștere personală" / "✓ Desire for personal growth"

---

#### 3. CE PROBLEMĂ REZOLVĂ

**Type**: `problem-empathy`
**Purpose**: Specific problems this service addresses

**Content**:
- Titlu: "Ce Provocări Abordăm" / "What Challenges We Address"
- Lista provocări abordate (specific pentru fiecare serviciu)
- Explicații detaliate pentru fiecare

---

#### 4. PROCESUL TERAPEUTIC

**Type**: `therapeutic-process` (NEW SECTION)
**Purpose**: Step-by-step therapy process

**Content**:
- Titlu: "Procesul Terapeutic" / "The Therapeutic Process"
- Timeline/pași:
  1. **Evaluare Inițială / Initial Assessment**
     - Ce se întâmplă: "Primele 1-2 ședințe sunt dedicate înțelegerii situației tale" / "The first 1-2 sessions are dedicated to understanding your situation"
     - Durata: "1-2 ședințe" / "1-2 sessions"
  2. **Plan de Tratament / Treatment Plan**
     - Ce se întâmplă: "Creăm împreună un plan personalizat" / "We create a personalized plan together"
     - Durata: "1 ședință" / "1 session"
  3. **Faza Activă / Active Phase**
     - Ce se întâmplă: "Lucrăm activ cu tehnici specifice" / "We actively work with specific techniques"
     - Durata: "6-20 ședințe (variază)" / "6-20 sessions (varies)"
  4. **Consolidare și Integrare / Consolidation and Integration**
     - Ce se întâmplă: "Consolidăm progresul și pregătim pentru după terapie" / "We consolidate progress and prepare for after therapy"
     - Durata: "2-4 ședințe" / "2-4 sessions"

**Visual Style**: Vertical or horizontal timeline with phases, durations, descriptions

---

#### 5. METODE UTILIZATE

**Type**: `methods-used` (NEW SECTION)
**Purpose**: Specific therapy methods for this service

**Content**:
- Titlu: "Metodele Pe Care Le Folosesc" / "Methods I Use"
- Tehnici specifice (accordion or tabs):
  1. **CBT (Cognitive Behavioral Therapy)**:
     - Ce este: Description
     - Cum funcționează: Mechanism
     - De ce funcționează: Evidence/benefits
  2. **DBT (Dialectical Behavior Therapy)** (if applicable):
     - Similar structure
  3. **EMDR** (if applicable):
     - Similar structure
  4. **Mindfulness**:
     - Similar structure
- Bază științifică: Link to research or explanation

**Visual Style**: Accordion (expandable sections) or tabs, allows detailed content per method

---

#### 6. BENEFICII & REZULTATE

**Type**: `benefits-results` (NEW SECTION)
**Purpose**: What clients can expect to achieve

**Content**:
- Titlu: "Ce Vei Obține" / "What You'll Achieve"
- Ce vei obține:
  - List of specific, measurable benefits for this service
  - Icons for each benefit
- Schimbări așteptate:
  - Emotional changes
  - Behavioral changes
  - Relationship changes (if applicable)
- Timeline rezultate:
  - "După 4-6 ședințe: ..." / "After 4-6 sessions: ..."
  - "După 10-15 ședințe: ..." / "After 10-15 sessions: ..."

**Example (Individual Therapy)**:
- "✓ Reducerea simptomelor de anxietate și depresie" / "✓ Reduction in anxiety and depression symptoms"
- "✓ Strategii eficiente de coping" / "✓ Effective coping strategies"
- "✓ Îmbunătățirea stimei de sine" / "✓ Improved self-esteem"
- "✓ Relații mai sănătoase" / "✓ Healthier relationships"
- "✓ Claritate și scop în viață" / "✓ Clarity and purpose in life"

---

#### 7. TARIFE & PACHETE

**Type**: `pricing-packages` (NEW SECTION)
**Purpose**: Service-specific pricing

**Content**:
- Titlu: "Tarife și Pachete" / "Rates and Packages"
- Preț per ședință:
  - Individual session: "X lei / ședință" / "X lei / session"
  - Session length: "50-60 minute" / "50-60 minutes"
- Pachete disponibile:
  1. **Pachet Start / Starter Package**:
     - 4 ședințe
     - Preț: "X lei" (discount vs. individual)
     - Features: "Evaluare + 3 ședințe active" / "Assessment + 3 active sessions"
  2. **Pachet Standard / Standard Package**:
     - 8 ședințe
     - Preț: "X lei" (discount)
     - Features: "Terapie completă pe termen scurt" / "Complete short-term therapy"
  3. **Pachet Intensiv / Intensive Package**:
     - 12 ședințe
     - Preț: "X lei" (discount)
     - Features: "Abordare profundă și susținută" / "Deep and sustained approach"
- Modalități de plată:
  - Cash, card, transfer bancar
  - Factură pentru companii (organizational psychology)
- Mențiune tarife sociale (if applicable):
  - "Oferim tarife reduse pentru studenți și situații financiare dificile" / "We offer reduced rates for students and difficult financial situations"

**Visual Style**: Pricing cards, featured package highlighted, comparison tooltips

---

#### 8. FAQ SPECIFIC SERVICIULUI

**Type**: `service-faq-inline`
**Purpose**: Service-specific questions

**Content**:
- Titlu: "Întrebări Frecvente despre [Service Name]"
- 4-6 întrebări frecvente specific pentru acest serviciu

**Example (Individual Therapy)**:
1. Q: "Cât durează terapia individuală?" / "How long does individual therapy last?"
2. Q: "Pot face terapie online?" / "Can I do therapy online?"
3. Q: "Ce dacă nu simt conexiune cu terapistul?" / "What if I don't feel connection with the therapist?"
4. Q: "Trebuie să merg săptămânal?" / "Do I need to go weekly?"

---

#### 9. TESTIMONIALE RELEVANTE

**Type**: `testimonials-enhanced`
**Purpose**: Social proof for this specific service

**Content**:
- 2-3 testimoniale pentru serviciul specific
- Filtered from general testimonials or service-specific

---

#### 10. CTA SECTION

**Type**: `cta-standard`
**Content**:
- Programare consultație specific pentru acest serviciu
- Contact pentru întrebări despre serviciu

---

#### 11. SERVICII RELACIONATE

**Type**: `services-preview` (FILTERED)
**Purpose**: Cross-sell related services

**Content**:
- Titlu: "Alte Servicii Care Te-Ar Putea Interesa" / "Other Services That Might Interest You"
- Link-uri către alte servicii relevante (show 3 others, exclude current)

---

#### 12. FOOTER

---

### 🧭 ABORDARE (APPROACH PAGE)

**URL**: `/abordare/` (RO) | `/en/approach/` (EN)
**Sections**: 9 total

---

#### 1. HERO SECTION

**Type**: `hero-breadcrumb`
**Content**:
- Titlu principal: "Abordarea Mea Terapeutică" / "My Therapeutic Approach"
- Subtitlu: "Cum Lucrăm Împreună Spre Vindecare" / "How We Work Together Toward Healing"
- Visual metaphor (compass/map image)

---

#### 2. FILOZOFIA TERAPEUTICĂ

**Type**: `values-intro`
**Purpose**: Core therapeutic philosophy statement

**Content**:
- Statement principal: Overarching philosophy
- Explicație abordare: How approach differs or is unique
- De ce funcționează: Evidence and reasoning

---

#### 3. METODE DE LUCRU

**Type**: `method-tabs` (EXISTING)
**Purpose**: Detailed method explanations

**Content**:
- Tab/Accordion pentru fiecare metodă:
  1. **Terapie Cognitiv-Comportamentală (CBT)**:
     - Ce este: Definition and overview
     - Cum funcționează: Mechanism and techniques
     - Pentru ce: Conditions/situations best suited
  2. **Mindfulness**:
     - Similar structure
  3. **Terapie Sistemică**:
     - Similar structure
  4. **EMDR**:
     - Similar structure

**Visual Style**: Tabs (desktop) or accordion (mobile), detailed content per method

---

#### 4. INTEGRAREA METODELOR

**Type**: `feature-blocks`
**Purpose**: How methods are combined

**Content**:
- Titlu: "Cum Combin Abordările" / "How I Combine Approaches"
- Explicație integrare: How different methods work together
- Personalizare pentru client: Each plan is unique to client needs

---

#### 5. PRINCIPII DE LUCRU

**Type**: `values-compass` (EXISTING)
**Purpose**: Working principles that guide sessions

**Content**:
- 4-6 principii cu iconițe:
  1. Safety/Trust
  2. Collaboration
  3. Empowerment
  4. Evidence-based
  5. Flexibility
  6. Growth-oriented

---

#### 6. PROCES TERAPEUTIC GENERAL

**Type**: `first-session-timeline` (EXISTING)
**Purpose**: General therapeutic process overview

**Content**:
- Diagrama/timeline:
  - Prima ședință: What happens
  - Evaluare: Assessment phase
  - Plan: Treatment planning
  - Implementare: Active therapy
  - Integrare: Consolidation and closure

---

#### 7. CE MĂ DIFERENȚIAZĂ

**Type**: `feature-details` (EXISTING)
**Purpose**: Unique differentiators

**Content**:
- Puncte unice de diferențiere:
  - Warm, compassionate approach
  - Evidence-based but flexible
  - Years of experience
  - Specialized training
  - Personalized plans

---

#### 8. CTA SECTION

**Type**: `cta-standard`
**Content**:
- Află mai multe în consultație
- Programare

---

#### 9. FOOTER

---

### 📚 RESURSE (RESOURCES PAGE)

**URL**: `/resurse/` (RO) | `/en/resources/` (EN)
**Sections**: 10 total

---

#### 1. HERO SECTION

**Type**: `hero-breadcrumb`
**Content**:
- Titlu pagină: "Resurse Gratuite" / "Free Resources"
- Subtitlu: "Instrumente și Ghiduri Pentru Sănătatea Ta Mentală" / "Tools and Guides for Your Mental Health"
- Bară căutare (optional)

---

#### 2. CATEGORII RESURSE

**Type**: `method-tabs` (EXISTING)
**Purpose**: Category filters

**Content**:
- Tabs/Filtru pentru categorii:
  - Toate / All
  - Articole / Articles
  - Ghiduri / Guides
  - Exerciții / Exercises
  - Video/Audio
  - Workshop-uri / Workshops

---

#### 3. RESURSE FEATURED

**Type**: `feature-blocks`
**Purpose**: Highlight top 3 resources

**Content**:
- 3 resurse promovate:
  - Cards mari cu imagine
  - Title, description, CTA to resource

---

#### 4. GRID RESURSE

**Type**: `blog-grid` (EXISTING)
**Purpose**: Display all resources in grid

**Content**:
- Cards pentru fiecare resursă:
  - Thumbnail image
  - Title
  - Short description
  - Resource type (tag)
  - CTA: "Citește Mai Mult" / "Read More" or "Descarcă" / "Download"

---

#### 5. NEWSLETTER SIGNUP

**Type**: `newsletter-signup` (EXISTING)
**Purpose**: Email list building

**Content**:
- Titlu atractiv: "Primește Resurse Gratuite Săptămânal" / "Receive Free Resources Weekly"
- Beneficii abonare:
  - Articole exclusive
  - Ghiduri descărcabile
  - Workshop notifications
- Formular email: Name, Email, Subscribe button
- Confirmare GDPR: Checkbox with privacy policy link

---

#### 6. WORKSHOP-URI & EVENIMENTE

**Type**: `first-session-timeline` (REPURPOSED)
**Purpose**: Display upcoming workshops/events

**Content**:
- Calendar/listă evenimente viitoare:
  - Event name
  - Date/time
  - Description
  - Registration link/button

---

#### 7. RESURSE DESCĂRCABILE

**Type**: `feature-details` (EXISTING)
**Purpose**: Lead magnets

**Content**:
- Lead magnets:
  - "Ghid: 10 Tehnici de Gestionare a Anxietății" / "Guide: 10 Anxiety Management Techniques"
  - "Jurnal de Recunoștință (PDF)" / "Gratitude Journal (PDF)"
  - "Exerciții de Mindfulness" / "Mindfulness Exercises"
- Formulare descărcare: Email exchange for download

---

#### 8. BLOG/ARTICOLE RECENTE

**Type**: `blog-grid` (EXISTING)
**Purpose**: Latest blog posts

**Content**:
- 6-9 articole recente
- Load more button or pagination

---

#### 9. CTA SECTION

**Type**: `cta-standard`
**Content**:
- Vrei resurse personalizate?
- Link consultație

---

#### 10. FOOTER

---

### 📞 CONTACT (CONTACT PAGE)

**URL**: `/contact/` (RO) | `/en/contact/` (EN)
**Sections**: 9 total

---

#### 1. HERO SECTION

**Type**: `hero-breadcrumb`
**Content**:
- Titlu încurajator: "Hai Să Vorbim" / "Let's Talk"
- Subtitlu: "Primul Pas Este Cel Mai Important" / "The First Step Is the Most Important"
- Imagine cabinet/ambient warm atmosphere

---

#### 2. INFORMAȚII CONTACT

**Type**: `contact-info-cards` (EXISTING)
**Purpose**: Contact information and map

**Content** (2 columns):
- **Coloana 1: Date contact**:
  - Adresă: Full address
  - Telefon: Clickable tel: link
  - Email: Clickable mailto: link
  - Program: Office hours
    - "Luni-Vineri: 10:00-20:00"
    - "Sâmbătă: 10:00-14:00"
    - "Duminică: Închis" / "Closed"
- **Coloana 2: Hartă interactivă**:
  - Google Maps embed or similar

---

#### 3. OPȚIUNI CONSULTAȚIE

**Type**: `contact-options` (EXISTING)
**Purpose**: In-office vs online options

**Content**:
- **Card Cabinet fizic / In-Office**:
  - Description
  - Benefits: "Spațiu sigur și privat" / "Safe and private space"
  - Address
- **Card Online**:
  - Description
  - Benefits: "Confort de acasă" / "Comfort of home"
  - Platform: Zoom/Skype/etc.

---

#### 4. FORMULAR CONTACT/PROGRAMARE

**Type**: `contact-form-enhanced` (EXISTING)
**Purpose**: Main contact/booking form

**Content**:
- Nume complet* (required)
- Email* (required)
- Telefon* (required)
- Tip serviciu (dropdown): Individual / Couple / Family / Organizational
- Modalitate preferată (radio): Cabinet / Online
- Mesaj (textarea): "Spune-mi puțin despre situația ta" / "Tell me a bit about your situation"
- Disponibilitate: Preferred days/times
- Checkbox GDPR*: "Sunt de acord cu politica de confidențialitate" / "I agree with the privacy policy"
- Buton trimitere: "Trimite Mesaj" / "Send Message"

**Validation**: Frontend validation, backend processing, confirmation message

---

#### 5. CONSULTAȚIE GRATUITĂ

**Type**: `feature-details` (EXISTING)
**Purpose**: Promote free consultation

**Content**:
- Box special pentru consultație 30 min
- Ce include:
  - "Cunoaștere reciprocă" / "Getting to know each other"
  - "Înțelegerea nevoilor tale" / "Understanding your needs"
  - "Explicarea procesului terapeutic" / "Explaining the therapeutic process"
  - "Fără obligații" / "No obligations"
- Cum te ajută:
  - "Vezi dacă există fit" / "See if there's a fit"
  - "Clarifică întrebări" / "Clarify questions"
  - "Stabilește pași următori" / "Establish next steps"

---

#### 6. TARIFE

**Type**: `pricing-tables` (EXISTING)
**Purpose**: Pricing transparency

**Content**:
- Tabel/cards cu prețuri:
  - Terapie Individuală: "X lei/ședință"
  - Terapie de Cuplu: "X lei/ședință"
  - Terapie de Familie: "X lei/ședință"
  - Psihologie Organizațională: "X lei/oră" or package
- Pachete disponibile: Link to service pages for details
- Metode de plată: Cash, card, transfer
- Mențiune tarife sociale: "Contactează-mă pentru tarife reduse" / "Contact me for reduced rates"

---

#### 7. FAQ CONTACT

**Type**: `faq-content` (EXISTING)
**Purpose**: Contact-related FAQs

**Content**:
- Cum anulez/reprogramez?: Cancellation policy
- Este confidențial?: GDPR compliance statement
- Cât durează o ședință?: 50-60 minutes
- Câte ședințe sunt necesare?: Depends on needs, explain variation

---

#### 8. URGENȚE

**Type**: `confidentiality-notice` (EXISTING)
**Purpose**: Crisis resources

**Content**:
- Box vizibil pentru situații de criză
- **Important**: "Dacă ești în situație de urgență, sună la 112" / "If you're in an emergency situation, call 112"
- Numere de urgență:
  - Suicide prevention hotline
  - Crisis intervention numbers
- Resurse imediate: Link to crisis resources

---

#### 9. FOOTER

---

## Content Tone & Style

### Voice
- **Romanian (Default)**: Warm, professional, empathetic, culturally appropriate
- **English**: Professional, approachable, clear, international-friendly

### Tone Guidelines
- Compassionate and understanding
- Non-judgmental
- Professional but not cold
- Encouraging and hopeful
- Evidence-based and credible
- Accessible (avoid jargon)

### Language Considerations
- **Romanian**: Use formal "dumneavoastră" in professional contexts, can shift to "tu" in testimonials for authenticity
- **English**: Use "you" consistently, maintain professional warmth
- Both: Avoid mental health stigma, use person-first language

---

## Technical Requirements

### Performance
- Build time: < 3s full, < 500ms cached
- Page size: < 520KB
- Lighthouse score: ≥ 90
- Images: WebP format, lazy loading

### Accessibility
- WCAG AA compliance
- Alt text on all images
- Semantic HTML
- Keyboard navigation
- Color contrast 4.5:1 minimum
- ARIA labels where needed

### Responsive
- Mobile-first design
- Breakpoints: 375px, 768px, 992px, 1200px
- Touch-optimized
- Mobile menu

### SEO
- Meta descriptions (unique per page)
- Proper heading hierarchy
- Structured data (Organization, Professional Service)
- Open Graph tags
- XML sitemap

### Security & Privacy
- GDPR compliant
- SSL/HTTPS
- Form validation
- Privacy policy linked
- Cookie consent (if needed)

---

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

---

## Future Enhancements (Out of Current Scope)

- Blog system with tagging/categories
- Resource library with search/filtering
- Online booking system integration
- Payment processing
- Client portal
- Email automation
- Analytics dashboard
- A/B testing

---

**Last Updated**: 2025-11-20
**Reference**: Original user requirements specification
**Next**: Use this as definitive reference for implementation
