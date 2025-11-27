---
title: "{{ replace .Name "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: false
layout: "flexible"

sections:
  - type: "hero-breadcrumb"
  - type: "confidentiality-notice"
  - type: "contact-info-cards"

# Hero Breadcrumb
hero_breadcrumb:
  title: "{{ replace .Name "-" " " | title }}"
  subtitle: "Legal Information"
  background: "light"
  show_breadcrumb: true

# Confidentiality Notice
confidentiality_notice:
  enable: true
  title: "Professional Confidentiality"
  subtitle: "Your Privacy Protected"
  description: "All therapy sessions and communications are protected by professional confidentiality."

  main_notice:
    type: "info"
    title: "Confidentiality Guarantee"
    content: "Everything discussed in therapy is confidential and protected by psychologist-client privilege. Your information will never be shared without your explicit written consent."

  exceptions:
    title: "Legal Exceptions to Confidentiality"
    description: "Confidentiality may be limited in the following situations:"

    limits:
      - "Risk of harm to self or others"
      - "Suspected child or elder abuse"
      - "Court order or legal requirement"
      - "Insurance billing (with consent)"

# Contact Info
contact_info_cards:
  enable: true
  title: "Questions About Our Policies?"
  subtitle: "Get In Touch"
  description: "If you have questions about these terms, please contact us."

  cards:
    - icon: "envelope"
      label: "Email"
      value: "contact@example.com"
      link: "mailto:contact@example.com"
      type: "email"

    - icon: "phone"
      label: "Phone"
      value: "+40 123 456 789"
      link: "tel:+40123456789"
      type: "phone"
---

## Terms and Conditions

### 1. Services Provided

Description of therapy services offered, qualifications, and professional standards.

### 2. Appointment Policies

**Scheduling**: [Policy details]

**Cancellations**: [Cancellation policy]

**Late Arrivals**: [Late arrival policy]

**Payment**: [Payment terms]

### 3. Client Responsibilities

- Attend scheduled sessions
- Provide accurate information
- Pay fees on time
- Follow treatment recommendations

### 4. Therapist Responsibilities

- Provide professional services
- Maintain confidentiality
- Respect client autonomy
- Follow ethical guidelines

### 5. Confidentiality

Detailed explanation of confidentiality protections and exceptions.

### 6. Records and Data

How client records are maintained, stored, and protected under GDPR.

### 7. Emergency Procedures

This practice does not provide emergency services. In case of emergency, contact 112 or go to the nearest hospital.

### 8. Termination of Services

Either party may terminate the therapeutic relationship. Referrals will be provided if appropriate.

### 9. Complaints and Disputes

Procedure for addressing concerns or filing complaints.

### 10. Agreement

By using our services, you agree to these terms and conditions.

---

**Last Updated**: {{ .Date }}

**Contact**: [Email] | [Phone]

**Professional Registration**: [Registration Number]
