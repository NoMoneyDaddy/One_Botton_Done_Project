const test = require('node:test');
const assert = require('node:assert/strict');

const { buildProfileFiles, buildEnvExample } = require('../scripts/generate_project_configs');

test('react-native-expo profile emits env and quality baseline', () => {
  const files = buildProfileFiles(
    'react-native-expo',
    {
      displayName: 'React Native + Expo',
      officialScaffold: 'npx create-expo-app@latest',
      recommendedNode: '20+'
    },
    'expo-smoke',
    {
      language: 'typescript',
      styling: 'none',
      database: 'supabase',
      qualityTool: 'biome',
      packageManager: 'npm'
    }
  );

  const packageJson = JSON.parse(files.get('package.json'));
  assert.equal(packageJson.devDependencies['@biomejs/biome'], 'latest');
  assert.equal(packageJson.dependencies['@supabase/supabase-js'], 'latest');
  assert.match(files.get('docs/STACK_SETUP.md'), /npx expo start/);
  assert.match(buildEnvExample('react-native-expo', { database: 'supabase' }), /EXPO_PUBLIC_SUPABASE_URL/);
});

test('tauri-desktop profile emits rust note and vite env prefix', () => {
  const files = buildProfileFiles(
    'tauri-desktop',
    {
      displayName: 'Tauri Desktop',
      officialScaffold: 'npm create tauri-app@latest',
      recommendedNode: '20+'
    },
    'tauri-smoke',
    {
      language: 'typescript',
      styling: 'none',
      database: 'supabase',
      qualityTool: 'biome',
      packageManager: 'npm'
    }
  );

  const packageJson = JSON.parse(files.get('package.json'));
  assert.equal(packageJson.devDependencies['@biomejs/biome'], 'latest');
  assert.equal(packageJson.dependencies['@supabase/supabase-js'], 'latest');
  assert.match(files.get('docs/STACK_SETUP.md'), /Rust toolchain/);
  assert.match(buildEnvExample('tauri-desktop', { database: 'supabase' }), /VITE_SUPABASE_URL/);
});
