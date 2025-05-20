## Button

A highly customizable button component with multiple variants, sizes, and interactive states. Built with Framer Motion for smooth animations and fully compatible with React applications.

## Features

* **Multiple Variants**
  - `primary`: Solid button for primary actions
  - `secondary`: Secondary action button
  - `outline`: Outlined button with hover effects
  - `ghost`: Minimal button that appears on hover
  - `link`: Text button that looks like a link
  - `full`: Full-width button for prominent actions
  - `icon`: Icon-only button for compact interfaces

* **Sizing Options**
  - `sm`: Small button (height: 32px)
  - `md`: Medium button (height: 40px)
  - `lg`: Large button (height: 48px)
  - `noPadding`: Compact button with minimal padding

* **Interactive States**
  - Hover effects
  - Active/pressed state
  - Disabled state
  - Loading state with spinner

* **Icon Support**
  - Left icon
  - Right icon
  - Icon-only buttons
  - Custom icon components

* **Animation**
  - Smooth hover and tap animations
  - Spring-based transitions
  - Loading spinner animation

## Usage

### Basic Usage

```tsx
import { Button } from './UI/Components/Button';

function App() {
  return (
    <Button 
      variant="primary"
      size="lg"
      onClick={() => console.log('Button clicked')}
    >
      Click me
    </Button>
  );
}
```

### With Icons

```tsx
import { Button } from './UI/Components/Button';
import { Plus, ChevronRight } from 'lucide-react';

function App() {
  return (
    <div className="flex gap-4">
      <Button leftIcon={<Plus />}>
        Add Item
      </Button>
      <Button rightIcon={<ChevronRight />}>
        Next
      </Button>
      <Button variant="icon" size="noPadding">
        <Plus size={24} />
      </Button>
    </div>
  );
}
```

### Loading State

```tsx
function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleClick = () => {
    setIsLoading(true);
    // Simulate async operation
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Button 
      variant="primary" 
      isLoading={isLoading}
      onClick={handleClick}
    >
      {isLoading ? 'Processing...' : 'Submit'}
    </Button>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'full' | 'icon'` | `'primary'` | The visual style of the button |
| `size` | `'sm' | 'md' | 'lg' | 'noPadding'` | `'lg'` | The size of the button |
| `isLoading` | `boolean` | `false` | Shows a loading spinner and disables the button |
| `leftIcon` | `ReactNode` | - | Icon to display on the left side of the button content |
| `rightIcon` | `ReactNode` | - | Icon to display on the right side of the button content |
| `fullWidth` | `boolean` | `false` | Makes the button take up the full width of its container |
| `disabled` | `boolean` | `false` | Disables the button and shows a disabled state |
| `isPadding` | `boolean` | `true` | Controls whether the button has padding around icons |
| `children` | `ReactNode` | - | The button's content |
| `onClick` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | - | Click handler for the button |
| `className` | `string` | - | Additional CSS classes for the button |

## Accessibility

The Button component is built with accessibility in mind:

- Proper button semantics with `<button>` element
- Keyboard navigation support
- ARIA attributes for loading and disabled states
- Focus states for keyboard users
- Screen reader support for icons and loading states

## Styling

### Customizing with Props

You can customize the button's appearance using the following props:

- `variant`: Choose from different visual styles
- `size`: Control the button's size
- `fullWidth`: Make the button span the full width of its container
- `className`: Add custom CSS classes for additional styling

### Customizing with CSS

You can override the default styles using the `className` prop:

```tsx
<Button className="custom-button">
  Custom Styled Button
</Button>

// In your CSS:
.custom-button {
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  border-radius: 12px;
  /* Add more custom styles */
}
```

## Best Practices

1. **Choose the right variant** based on the button's importance and context
2. **Use appropriate button text** that clearly describes the action
3. **Consider button placement** in relation to other UI elements
4. **Provide visual feedback** for loading and disabled states
5. **Test with different screen sizes** to ensure responsive behavior
6. **Use icons sparingly** and ensure they add value to the button's purpose

## Browser Support

The Button component works in all modern browsers and includes proper fallbacks:

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

If you like my Button component, please give me a star on [GitHub](https://github.com/xianzhezhang/xianzhe.site).

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false" ><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>