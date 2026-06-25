const test = require('node:test');
const assert = require('node:assert/strict');

const { parseArgs, buildScaffoldCommand } = require('../scripts/scaffold_project');

test('parseArgs accepts --platforms for flutter scaffold', () => {
  const options = parseArgs([
    '/tmp/flutter-app',
    '--profile', 'flutter-app',
    '--platforms', 'android,web',
    '--run'
  ]);

  assert.equal(options.targetDir, '/tmp/flutter-app');
  assert.equal(options.profile, 'flutter-app');
  assert.equal(options.platforms, 'android,web');
  assert.equal(options.run, true);
});

test('buildScaffoldCommand forwards flutter platforms', () => {
  const scaffold = buildScaffoldCommand(
    'flutter-app',
    'flutter_smoke',
    '/tmp/flutter-smoke',
    {
      platforms: 'android,web'
    }
  );

  assert.equal(scaffold.command, 'flutter');
  assert.deepEqual(scaffold.args, ['create', 'flutter_smoke', '--platforms', 'android,web']);
});
