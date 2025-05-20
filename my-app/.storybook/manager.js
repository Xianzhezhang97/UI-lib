import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: 'EUI',
    brandUrl: 'https://xianzhe.site',
    brandImage: 'https://sdmntprwestus3.oaiusercontent.com/files/00000000-d0c4-61fd-a0b4-d8847cb3357b/raw?se=2025-05-19T22%3A34%3A46Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=c953efd6-2ae8-41b4-a6d6-34b1475ac07c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-19T18%3A18%3A29Z&ske=2025-05-20T18%3A18%3A29Z&sks=b&skv=2024-08-04&sig=bX%2Bvh8E/jQUfxaKN7O5Fjqb09QyRdlzTZZlknqzpIZc%3D',

  },
});
