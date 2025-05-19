import type { Meta } from '@storybook/react';

// 这是一个空的 meta 对象，用于满足 Storybook 的要求
const meta = {
  title: 'Components/Badge',
  // 由于 Badge 组件目前被注释掉了，我们暂时不指定 component
  parameters: { layout: 'centered' },
};

// 必须提供默认导出，否则 Storybook 会报错
export default meta;