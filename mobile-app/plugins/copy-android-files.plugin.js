const path = require('path');
const fs = require('fs-extra');

let withDangerousMod;
try {
  ({ withDangerousMod } = require('@expo/config-plugins'))
} catch (e) {
  console.warn('@expo/config-plugins not found — skipping copy-android-files plugin')
  // Export a no-op plugin so tooling that loads this file won't crash
  module.exports = (config) => config
}

/**
 * Config plugin: copy any files from mobile-app/native-overrides/android
 * into the prebuilt/generated android/ folder so manual native changes
 * are preserved when using Continuous Native Generation (CNG).
 */
// If the config plugin helper wasn't loaded above, export a no-op (guard)
if (!withDangerousMod) {
  module.exports = (config) => config;
} else {
  module.exports = function withCopyAndroidFiles(config) {
    return withDangerousMod(config, ["android", async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const src = path.join(projectRoot, 'native-overrides', 'android');
      const dest = path.join(projectRoot, 'android');

      try {
        const exists = await fs.pathExists(src);
        if (exists) {
          await fs.copy(src, dest, { overwrite: true, recursive: true });
          console.log(`Copied native overrides from ${src} to ${dest}`);
        } else {
          console.log(`No native overrides found at ${src}`);
        }
      } catch (e) {
        console.warn('copy-android-files.plugin.js: failed to copy native overrides', e);
      }

      return config;
    }]);
  };
}
