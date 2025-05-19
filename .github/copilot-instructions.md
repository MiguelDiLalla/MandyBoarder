# Copilot Project Instructions — MandyBoarder Web (DRAFT)

## Project Context

This repository is a **static website project** for "MandyBoarder", a bilingual, interactive landing page for language instruction and personal branding.

- All major visual elements are built from `.webp` images with alpha channels, located in `/WEB_ELEMENTS/SECTIONS/`.
- Interactive and animated behaviors are implemented using vanilla JS and modular CSS.
- Bi-lingual and accessibility features are a priority.
- Fonts are locally served (e.g., "Rokkitt SemiBold" for bio sections).

## Key Requirements

- Respect all image transparencies (alpha channel) for design overlays.
- Each section is an independent, reusable HTML component, with corresponding JS and CSS modules.
- Layouts are responsive and maintain their aspect ratios on all screens.
- Animations must be smooth and performant (use `@keyframes`, `transform`, and `opacity` transitions where possible).
- Accessibility: interactive elements must be navigable and have appropriate ARIA attributes if extended.
- Texts and tooltips are internationalized (EN/ES).

## Reference Documentation

- **[README.md](README.md)** — contains detailed descriptions, assets references, and per-section specs.
- See `/public/data/bio_translations.json` for interactive bio translations.
- Follow the coding standards listed in our dev profile:
  - JS: Prettier formatting, modular structure
  - CSS: BEM-like naming, avoid global scope pollution
  - HTML: Semantic, minimal nesting, accessible first

## Coding Conventions

- Use 4 spaces for indentation in JS/HTML/CSS (see project settings).
- Organize JS and CSS in `/js/` and `/css/` respectively. Each major section should have a dedicated file.
- All reusable behaviors (e.g. carousels, flip-cards, sliders) must be modular and not rely on global variables.
- Keep all animation, masking and filtering effects hardware-accelerated when possible (`transform`, `will-change`).
- Always reference assets with relative paths.

## GitHub Copilot Usage

- Use Copilot for scaffolding component structure, transitions, and data-driven rendering.
- Suggest utility functions for viewport detection, modular tooltip logic, and ARIA enhancements.
- Generate boilerplate with comments referring to the section and asset described in the README.
- When suggesting tests, focus on responsiveness, accessibility, and smooth animation behaviors.

## Note

This is a **living draft**. Update these instructions as the project evolves.
