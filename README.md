# Vue 3 Page Builder

<div align="center">

![BinaryCastle Page Builder](screenshot.png)

[![npm version](https://img.shields.io/npm/v/@binarycastle/page-builder.svg)](https://www.npmjs.com/package/@binarycastle/page-builder)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)

**A modern, extensible drag-and-drop page builder for Vue 3**

[Live Demo](https://github.com/binary-castle/page-builder) • [Documentation](#documentation) • [Examples](#examples) • [Contributing](#contributing)

</div>

---

## 🚀 Overview

BinaryCastle Page Builder is a powerful, extensible visual page builder built with Vue 3, TypeScript, and modern web technologies. It provides an intuitive drag-and-drop interface for creating dynamic web pages with real-time preview, rich text editing, and customizable components.

### ✨ Key Features

- **🎯 Drag & Drop Interface** - Intuitive visual editor with real-time preview
- **🧩 Extensible Components** - Built-in blocks (Text, Button, Columns, HTML) with custom component support
- **📝 Rich Text Editing** - Powered by TipTap with formatting controls and bubble menus
- **💻 Code Editor** - Integrated CodeMirror for HTML/CSS editing
- **🎨 Visual Customization** - Color pickers, style controls, and CSS class management
- **📱 Responsive Design** - Mobile-first approach with device preview modes
- **🔧 TypeScript Support** - Full type safety and IntelliSense support
- **⚡ Modern Stack** - Vue 3 Composition API, Vite, and Tailwind CSS
- **🎪 Live Preview** - Real-time page preview with seamless editing experience
- **🏗️ Layout System** - Flexible column layouts with nested component support

---

## 📦 Installation

### npm
```bash
npm install @binarycastle/page-builder
```

### yarn
```bash
yarn add @binarycastle/page-builder
```

### pnpm
```bash
pnpm add @binarycastle/page-builder
```

---

## 🚀 Quick Start

### Basic Usage

```vue
<script setup>
import { PageBuilder } from "@binarycastle/page-builder"
import "@binarycastle/page-builder/dist/bc-page-builder.css"

const handleSave = (data) => {
  console.log('Page data:', data)
  // data.renderList contains the page structure
  // data.meta contains the page metadata
}
</script>

<template>
  <PageBuilder @onSave="handleSave" />
</template>
```

### With Initial Content

```vue
<script setup>
import { PageBuilder } from "@binarycastle/page-builder"

const initialContent = [
  {
    id: "text-block-1",
    name: "text",
    options: {
      text: "<h1>Welcome to my page!</h1>",
      hasContainer: true
    }
  }
]

const handleSave = (data) => {
  // Save your page data
}
</script>

<template>
  <PageBuilder 
    :renderList="initialContent"
    @onSave="handleSave" 
  />
</template>
```

### Preview Only Mode

```vue
<script setup>
import { PagePreview } from "@binarycastle/page-builder"

const pageContent = [
  // Your page structure
]
</script>

<template>
  <PagePreview :renderList="pageContent" />
</template>
```

---

## 📚 Components

### Core Components

#### `PageBuilder`
The main page builder component with full editing capabilities.

**Props:**
- `cssUrl?: string` - External CSS file URL
- `renderList?: Block[]` - Initial page content
- `meta?: Array<Record<string, string>>` - Page metadata
- `pageTitle?: string` - Page title

**Events:**
- `@onSave` - Emitted when user saves the page

#### `PagePreview`
Render-only component for displaying pages without editing interface.

**Props:**
- `renderList: Block[]` - Page content to render
- `cssUrl?: string` - External CSS file URL

### Built-in Blocks

#### Text Block
Rich text editor with formatting controls, alignment, and styling options.

```vue
// Usage in custom registration
{
  type: 'element',
  name: 'text',
  title: 'Text',
  description: 'Rich text with formatting'
}
```

#### Button Block
Interactive buttons with customizable actions, styling, and alignment.

```vue
// Features:
// - Text customization
// - External/internal links
// - Alignment controls
// - Custom CSS classes and styles
```

#### Column Block
Flexible layout system supporting 1-6 columns with individual styling.

```vue
// Features:
// - Up to 6 columns
// - Individual column styling
// - Nested component support
// - Responsive design
```

#### HTML Block
Raw HTML and CSS editor for advanced customization.

```vue
// Features:
// - CodeMirror HTML editor
// - Scoped CSS styling
// - Live preview
```

### Utility Components

#### `BasePreview`
Base wrapper for creating custom block components.

```vue
<script setup lang="ts">
import { BasePreview, Block } from "@binarycastle/page-builder"

interface Props {
  blockInfo: Block
  inEditor?: boolean
}

defineProps<Props>()
</script>

<template>
  <BasePreview :inEditor="inEditor">
    <h1>Your custom content</h1>
  </BasePreview>
</template>
```

#### `BaseOption`
Base wrapper for creating block option panels.

```vue
<script setup lang="ts">
import { BaseOption, OptionWidget, Block } from "@binarycastle/page-builder"

interface Props {
  blockInfo: Block
}

defineProps<Props>()
</script>

<template>
  <BaseOption title="Custom Block">
    <OptionWidget title="Setting 1">
      <!-- Your controls -->
    </OptionWidget>
  </BaseOption>
</template>
```

#### Form Controls

- **`ColorInput`** - Color picker component
- **`SliderToggle`** - Toggle switch component
- **`RichTextEditor`** - Standalone rich text editor
- **`CodeMirrorEditor`** - Code editor component

---

## 🔧 Custom Components

### Registering a Custom Block

```vue
<script setup>
import { PageBuilder, registerBlock } from "@binarycastle/page-builder"
import CustomComponent from "./CustomComponent.vue"
import CustomOptionComponent from "./CustomOptionComponent.vue"

// Register your custom block
registerBlock({
  type: 'element',
  component: CustomComponent,
  optionComponent: CustomOptionComponent,
  options: {
    // Default options for your block
    customProperty: 'default value'
  },
  title: 'Custom Block',
  name: 'custom_block',
  description: 'A custom component for special content',
  previewImg: '/path/to/preview.png',
  icon: '<svg>...</svg>' // SVG icon or HTML
})
</script>

<template>
  <PageBuilder @onSave="handleSave" />
</template>
```

### Custom Component Implementation

```vue
<!-- CustomComponent.vue -->
<script setup lang="ts">
import { BasePreview, Block } from "@binarycastle/page-builder"

interface CustomBlock extends Block {
  options: {
    customProperty: string
    // ... other options
  }
}

interface Props {
  blockInfo: CustomBlock
  inEditor?: boolean
}

defineProps<Props>()
</script>

<template>
  <BasePreview :inEditor="inEditor">
    <div>{{ blockInfo.options.customProperty }}</div>
  </BasePreview>
</template>
```

### Custom Option Panel

```vue
<!-- CustomOptionComponent.vue -->
<script setup lang="ts">
import { BaseOption, OptionWidget } from "@binarycastle/page-builder"

interface Props {
  blockInfo: CustomBlock
}

defineProps<Props>()
</script>

<template>
  <BaseOption title="Custom Block Settings">
    <OptionWidget title="Custom Property">
      <input 
        v-model="blockInfo.options.customProperty" 
        class="bg-page-builder-input"
      />
    </OptionWidget>
  </BaseOption>
</template>
```

---

## 🎨 Styling

The page builder uses Tailwind CSS with the `bcpb:` prefix to avoid conflicts with your application styles.

### Custom CSS

```css
/* Your custom styles */
.my-custom-block {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  padding: 2rem;
  border-radius: 0.5rem;
}
```

### CSS Classes in Components

```vue
<template>
  <BasePreview>
    <div class="my-custom-block">
      Content
    </div>
  </BasePreview>
</template>
```

---

## 💾 Data Structure

### Block Structure

```typescript
interface Block {
  id: string
  name: string
  type: 'element' | 'layout' | 'ui-component'
  options: Record<string, any>
  children?: Block[][] // For layout blocks
}
```

### Save Data Format

```typescript
interface SaveData {
  renderList: Block[]
  meta: Array<Record<string, string>>
}
```

### Example Output

```json
{
  "renderList": [
    {
      "id": "text-123",
      "name": "text",
      "type": "element",
      "options": {
        "text": "<h1>Hello World</h1>",
        "hasContainer": true,
        "backgroundColor": "#ffffff"
      }
    },
    {
      "id": "button-456",
      "name": "button",
      "type": "element",
      "options": {
        "text": "Click Me",
        "buttonAction": {
          "type": "external_link",
          "url": "https://example.com"
        }
      }
    }
  ],
  "meta": [
    {
      "attitude": "property",
      "name": "title",
      "content": "My Awesome Page"
    }
  ]
}
```

---

## 🔧 Development

### Setup

```bash
# Clone the repository
git clone https://github.com/binary-castle/page-builder.git
cd page-builder

# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

### Project Structure

```
src/
├── lib/
│   ├── block-components/     # Built-in block components
│   ├── controls/            # Form controls (ColorInput, SliderToggle)
│   ├── editors/             # Text and code editors
│   ├── layouts/             # Layout components
│   ├── ui-components/       # UI component blocks
│   ├── utils/               # Utilities and types
│   └── PageBuilder.vue      # Main component
├── scss/                    # SCSS styles
└── main.ts                  # Entry point
```

### Technology Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Tailwind CSS** with custom prefix (`bcpb:`)
- **TipTap** for rich text editing
- **CodeMirror** for code editing
- **Popper.js** for tooltips and dropdowns

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `yarn test` (if applicable)
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Add TypeScript types for new features
- Update documentation for new components
- Test your changes thoroughly
- Keep commits focused and descriptive

### Reporting Issues

Please use the [GitHub Issues](https://github.com/binary-castle/page-builder/issues) page to report bugs or request features.

---

## 📄 License

This project is licensed under the [LGPL-3.0 License](LICENSE).

---

## 🏢 About BinaryCastle

BinaryCastle Page Builder is developed and maintained by [BinaryCastle.net](https://binarycastle.net), a company focused on creating modern web development tools and solutions.

### Connect With Us

- **Website**: [binarycastle.net](https://binarycastle.net)
- **GitHub**: [github.com/binary-castle](https://github.com/binary-castle)
- **Issues**: [Report bugs or request features](https://github.com/binary-castle/page-builder/issues)

---

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - The progressive JavaScript framework
- [TipTap](https://tiptap.dev/) - Headless editor framework
- [CodeMirror](https://codemirror.net/) - In-browser code editor
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

---

<div align="center">

**Built with ❤️ by the BinaryCastle team**

[⭐ Star us on GitHub](https://github.com/binary-castle/page-builder) • [🐛 Report a bug](https://github.com/binary-castle/page-builder/issues) • [💡 Request a feature](https://github.com/binary-castle/page-builder/issues)

</div>