import type { Preview } from '@storybook/react';
import { withAnimation } from './decorators/animation';
import './styles.css';

// 添加 Flaticon CSS
const styles = [
  'regular-rounded',
  'regular-straight',
  'solid-rounded',
  'solid-straight',
  'bold-rounded',
  'bold-straight',
  'thin-rounded',
  'thin-straight'
];

styles.forEach(style => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://cdn-uicons.flaticon.com/uicons-${style}/css/uicons-${style}.css`;
  document.head.appendChild(link);
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      story: {
        inline: true,
        iframeHeight: '100px',
      },
    },
    grid: {
      gridOn: true,
      columns: 2,
      gap: '16px',
      padding: '16px',
    },
  },
  decorators: [withAnimation],
};

export default preview; 