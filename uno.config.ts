import { fileURLToPath } from 'node:url';
import { defineConfig, presetIcons, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss';
import { generateIconCollection } from './internals/plugin-icon';

const customIconPath = fileURLToPath(new URL('./src/icons', import.meta.url));
export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [
    presetWind4({ dark: 'class' }),
    presetIcons({
      collections: {
        core: generateIconCollection(customIconPath, { multiColor: true, varPrefix: 'custom' }),
      },
    }),
  ],
});
