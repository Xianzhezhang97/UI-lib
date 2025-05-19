import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: 'EUI',
    brandUrl: 'https://xianzhe.site',
    brandImage: 'https://media.licdn.com/dms/image/v2/D5603AQECYxBqcxprfg/profile-displayphoto-shrink_400_400/B56ZaMQ34xHsAs-/0/1746109957382?e=1753315200&v=beta&t=X6tvS6aIbFJSt-15Daub1EVkCOS18ijYkCIjj6nZ5XI',

  },
});
