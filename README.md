# Integration Features

[![CI](https://github.com/code-atlantic/integration-features-block/actions/workflows/ci.yml/badge.svg)](https://github.com/code-atlantic/integration-features-block/actions/workflows/ci.yml)
[![Release](https://github.com/code-atlantic/integration-features-block/actions/workflows/release.yml/badge.svg)](https://github.com/code-atlantic/integration-features-block/releases)

A collection of WordPress Gutenberg blocks for displaying integration features with tier badges, accordion descriptions, and organized grouping.

## Blocks Included

### Integration Feature (`popup-maker/integration-feature`)
Individual feature items with tier badges and optional expandable descriptions.

- **Tier Badges**: Visual indicators for FREE, PRO, and PRO+ tiers
- **Accordion Support**: Optional expandable descriptions using native `<details>` element
- **Icon Styles**: Plus/minus or chevron toggle indicators

### Integration Features Group (`popup-maker/integration-features-group`)
Container block for organizing multiple features with shared behavior.

- **Group Icon**: Dashicon picker with color customization
- **Collapsible Groups**: Optional expand/collapse for entire feature sets
- **One-Open Accordion**: Coordinate child features so only one is open at a time
- **Feature Count**: Display number of features in the group
- **SEO Friendly**: Content visible to search engines (progressive enhancement)

### Section Heading (`popup-maker/section-heading`)
Page section headers with optional "View All" links.

- **Heading Levels**: H2 or H3 support
- **Optional Subtitle**: Additional descriptive text
- **View All Link**: Internal or external links with smart icon detection
- **Color Controls**: Customizable heading, subtitle, and link colors

## Installation

### Via GitHub Updater (Recommended)

1. Install [Git Updater](https://github.com/afragen/git-updater) plugin
2. Go to Settings → Git Updater → Install Plugin
3. Enter: `code-atlantic/integration-features-block`
4. Install and activate

### Manual Installation

1. Download the latest release from [Releases](https://github.com/code-atlantic/integration-features-block/releases)
2. Upload to `/wp-content/plugins/integration-features/`
3. Activate the plugin in WordPress

## Requirements

- WordPress 6.7+
- PHP 7.4+

## Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
# Clone the repository
git clone git@github.com:code-atlantic/integration-features-block.git
cd integration-features-block

# Install dependencies
npm install

# Start development build (watches for changes)
npm start

# Create production build
npm run build

# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint:js
npm run lint:css
```

### Project Structure

```
integration-features/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # CI: test, lint, build
│   │   └── release.yml         # Release: build zip, create release
│   └── dependabot.yml          # Automated dependency updates
├── src/
│   ├── integration-features/        # Individual feature block
│   ├── integration-features-group/  # Group container block
│   └── section-heading/             # Section heading block
├── build/                      # Compiled output (generated)
├── integration-features.php    # Plugin main file
├── package.json
├── tsconfig.json
├── CHANGELOG.md
└── README.md
```

## Git Workflow

This project uses **Git Flow** with automated CI/CD.

### Branches

- `main` - Production releases (protected, requires CI pass)
- `develop` - Development integration branch

### Making Changes

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/my-feature

# Make changes, commit, push
git add .
git commit -m "feat: Add my feature"
git push origin feature/my-feature

# Create PR to develop
```

### Creating a Release

```bash
# Merge develop to main
git checkout main
git pull origin main
git merge develop

# Create and push tag
git tag v0.4.0
git push origin main --tags

# GitHub Actions will:
# 1. Run tests
# 2. Build the plugin
# 3. Create a GitHub Release with zip attached
```

## Technical Details

### Progressive Enhancement

All blocks use progressive enhancement for SEO and accessibility:

- Content renders visible by default (no JavaScript required)
- JavaScript enhances with interactive features (accordions, etc.)
- Search engines index all content regardless of collapsed state

### WordPress Interactivity API

Uses the modern WordPress Interactivity API for frontend interactions:

- Declarative state management
- Server-side rendered initial state
- Hydration on client

### Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation (Enter/Space to toggle)
- ARIA attributes for screen readers
- Focus indicators
- Reduced motion support
- High contrast mode support

## Contributing

1. Fork the repository
2. Create a feature branch from `develop`
3. Make your changes with tests
4. Submit a PR to `develop`

All PRs must pass CI (tests, type-check, build) before merging.

## License

GPL-2.0-or-later

## Author

**Code Atlantic**
https://code-atlantic.com
