# Integration Feature Block

A modern WordPress Gutenberg block for displaying integration features with tier badges and optional accordion descriptions.

## Features

- **Tier Badges**: Visual indicators for FREE, PRO, and PRO+ tiers
- **Accordion Support**: Optional expandable descriptions using native `<details>` element
- **TypeScript**: Full type safety with strict TypeScript compilation
- **Accessibility**: WCAG-compliant with keyboard navigation and screen reader support
- **BEM CSS**: Organized, maintainable styling with BEM methodology
- **Modern React**: Uses hooks and derived state patterns (no anti-patterns)

## Installation

### From npm (recommended)

```bash
npm install @code-atlantic/integration-feature-block
```

### Manual Installation

1. Download the latest release
2. Upload to `/wp-content/plugins/integration-features/`
3. Activate the plugin in WordPress
4. The block will be available in the block editor

## Development

### Prerequisites

- Node.js 18+ and npm
- WordPress 6.0+
- PHP 7.4+

### Setup

```bash
# Install dependencies
npm install

# Start development build (watches for changes)
npm start

# Create production build
npm run build

# Run TypeScript type checking
npm run type-check

# Lint JavaScript/TypeScript
npm run lint:js

# Lint CSS/SCSS
npm run lint:css
```

### Project Structure

```
integration-features/
├── src/integration-features/
│   ├── block.json           # Block metadata and configuration
│   ├── index.ts             # Block registration
│   ├── types.ts             # TypeScript type definitions
│   ├── edit.tsx             # Editor component
│   ├── save.tsx             # Save component (frontend output)
│   ├── lib/
│   │   └── hasDescription.ts # Shared utility function
│   ├── editor.scss          # Editor-only styles
│   └── style.scss           # Frontend and editor styles
├── build/                   # Compiled output (generated)
├── integration-features.php # WordPress plugin file
├── package.json             # npm dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Usage

### Basic Example

Add the Integration Feature block in the WordPress editor:

1. Click the (+) icon to add a new block
2. Search for "Integration Feature"
3. Select a tier badge (FREE, PRO, PRO+)
4. Enter a feature label
5. Optionally add description content

### Accordion Behavior

The block automatically becomes an accordion when you add description content (paragraphs, lists, headings). The native `<details>` element provides:

- Collapsible/expandable behavior
- No JavaScript required
- Better performance
- Built-in accessibility

## Technical Details

### Derived State Pattern

The block uses a derived state pattern to compute `hasDescription` from inner blocks:

```typescript
const hasDescription = useMemo(
  () => computeHasDescription(innerBlocks || []),
  [innerBlocks]
);
```

This eliminates `useEffect` feedback loops and ensures consistent behavior.

### Type Safety

All components are fully typed with TypeScript strict mode:

- `IntegrationFeatureAttributes` - Block attribute interface
- `EditProps` - Edit component props
- `SaveProps` - Save component props
- `WPBlock` - WordPress block structure
- `TierType` - Tier badge type union

### Accessibility Features

- Keyboard navigation support (Enter/Space to toggle)
- ARIA attributes for screen readers
- Focus indicators for keyboard users
- High contrast mode support
- Reduced motion preference support
- Print-friendly output

## Browser Support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- WordPress 6.0+ editor support
- Native `<details>` element support

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

GPL-2.0-or-later - see LICENSE file for details

## Author

**Code Atlantic**  
https://code-atlantic.com

## Support

For bugs and feature requests, please use the [GitHub issue tracker](https://github.com/code-atlantic/integration-feature-block/issues).
