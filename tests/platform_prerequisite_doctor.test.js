const test = require('node:test');
const assert = require('node:assert/strict');

const { evaluateProfiles } = require('../scripts/platform_prerequisite_doctor');
const config = require('../config/platform_prerequisites.json');

test('evaluateProfiles marks tauri not-ready when rust is missing', () => {
  const probes = {
    node: { present: true, major: 22 },
    rustc: { present: false, major: null },
    cargo: { present: false, major: null },
    'xcode-select': { present: true, major: null }
  };

  const [result] = evaluateProfiles(config, probes, { profile: 'tauri-desktop' });
  assert.equal(result.status, 'not-ready');
  assert.equal(result.checks.some((item) => item.check === 'rustc' && item.status === 'fail'), true);
});

test('evaluateProfiles marks capacitor partial when native mobile deps are missing', () => {
  const probes = {
    node: { present: true, major: 22 },
    xcodebuild: { present: false, major: null },
    'xcode-select': { present: false, major: null },
    adb: { present: false, major: null },
    sdkmanager: { present: false, major: null }
  };

  const [result] = evaluateProfiles(config, probes, { profile: 'capacitor-mobile-app' });
  assert.equal(result.status, 'partial');
  assert.equal(result.checks.some((item) => item.status === 'warn'), true);
});

test('evaluateProfiles marks electron ready with node and npm present', () => {
  const probes = {
    node: { present: true, major: 22 },
    npm: { present: true, major: 10 }
  };

  const [result] = evaluateProfiles(config, probes, { profile: 'electron-desktop' });
  assert.equal(result.status, 'ready');
});
