## Avatar

A highly customizable avatar component with multiple display modes, status indicators, and extensive styling options. Built with Framer Motion for smooth animations and fully compatible with React applications.

## Features

* **Multiple Display Modes**
  - Display user images with automatic alt text generation
  - Show user initials with auto-generated background colors
  - Fallback to a default user icon when no image or name is provided

* **Sizing Options**
  - Predefined sizes: `sm`, `md`, `lg`, `xl`
  - Fully customizable dimensions using Tailwind classes via `customSize` prop
  - Responsive sizing with breakpoints (`mobile`, `md`, `lg`, `xl`)

* **Status Indicators**
  - Online: `Green` dot indicator
  - Offline: `Gray` dot indicator
  - Away: `Yellow` dot indicator
  - Busy: `Red` dot indicator
  - Customizable position and size

* **Styling & Customization**
  - **Background Colors**
    - Auto-generated from user name
    - Custom background color support (`hex`, `rgb`, `rgba`, `hsl`, `hsla`, `CSS variables`)
  - **Text Colors**
    - Automatic contrast calculation for optimal readability
    - Supports both light and dark text based on background luminance
  - **Borders**
    - Toggleable border
    - Custom border color support
    - White border option for better visibility on images
  - **Ring Effects**
    - Customizable ring color
    - Supports all color formats (`hex`, `rgb`, `rgba`, `hsl`, `hsla`, `CSS variables`)
    - Configurable ring width

* **Message Badge**
  - Display message count with automatic 99+ truncation
  - Gradient background (`red-500` to `red-300`)
  - Customizable position and styling
  - White border for better contrast

* **Accessibility**
  - Automatic alt text generation
  - Proper ARIA attributes
  - Keyboard navigation support
  - High contrast text for better readability

* **Animation**
  - Smooth hover and focus states
  - Motion animations (via Framer Motion)
  - Custom transition effects

## Usage

### Basic Usage

```tsx
import { Avatar } from './UI/Components/Avatar';

function App() {
  return (
    <Avatar 
      name="John Doe"
      src="/path/to/image.jpg"
    />
  );
}
```

### With Status Indicator

```tsx
function App() {
  return (
    <div className="flex gap-4">
      <Avatar name="Online User" status="online" />
      <Avatar name="Away User" status="away" />
      <Avatar name="Busy User" status="busy" />
      <Avatar name="Offline User" status="offline" />
    </div>
  );
}
```

### With Message Badge

```tsx
function App() {
  return (
    <Avatar 
      name="John Doe"
      src="/path/to/image.jpg"
      message={5}
      status="online"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | The name used for generating initials and alt text |
| `src` | `string` | - | The image source URL |
| `alt` | `string` | - | Alt text for the image (falls back to name if not provided) |
| `size` | `'sm' | 'md' | 'lg' | 'xl'` | `'md'` | Predefined size of the avatar |
| `customSize` | `string` | - | Custom size using Tailwind classes (e.g., `'w-12 h-12'`) |
| `status` | `'online' | 'offline' | 'away' | 'busy'` | - | Status indicator |
| `bordered` | `boolean` | `false` | Add a white border around the avatar |
| `ring` | `boolean` | `false` | Add a colored ring around the avatar |
| `ringColor` | `string` | `'ring-primary-500'` | Custom ring color |
| `borderColor` | `string` | `'border-gray-400'` | Custom border color |
| `bgColor` | `string` | - | Custom background color |
| `message` | `number` | - | Message count to display as a badge |
| `className` | `string` | - | Additional CSS classes for the root element |

## Accessibility

The Avatar component is built with accessibility in mind:

- Automatically generates alt text from the name prop
- Includes proper ARIA attributes
- Supports keyboard navigation
- Ensures proper color contrast for text and status indicators

## Styling

You can customize the appearance using the following props:

- `className`: Style the root element
- `bgColor`: Set a custom background color
- `ringColor`: Customize the ring color
- `borderColor`: Set a custom border color
- `customSize`: Apply custom dimensions using Tailwind classes

## Best Practices

1. **Always provide a name** for better accessibility and fallback content.
2. **Use appropriate image sizes** for optimal performance.
3. **Consider the context** when choosing between different status indicators.
4. **Test with different background colors** to ensure text remains readable.
5. **Use the message badge sparingly** to avoid overwhelming the user.

## Browser Support

The Avatar component works in all modern browsers and includes proper fallbacks:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome for Android

## Contributing

If you'd like to contribute to this component, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This component is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

If you like my Avatar component, please give me a star on [GitHub](https://github.com/xianzhezhang/xianzhe.site).

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false" ><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
