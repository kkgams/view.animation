import { readFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'
import assert from 'node:assert/strict'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const blend = ['1d', '2d'].map(dimension => ({ name: `view.animation-blend-space-${dimension}`, path: `src/view.animation-blend-space-${dimension}/views/view-animation-blend-space${dimension === '1d' ? 's' : '-2d'}.js` }))
if (blend.length) {
  assert.equal(blend.length, 2)
  const registry = new Map()
  for (const unit of blend) {
    const own = unit.name.endsWith('1d') ? '1d' : '2d'
    const source = await readFile(resolve(root, unit.path), 'utf8')
    const context = vm.createContext({
      HTMLElement: class { constructor() { this.dataset = {} } }, structuredClone,
      customElements: { get: tag => registry.get(tag), define: (tag, cls) => {
        assert(!registry.has(tag)); registry.set(tag, cls)
      } }, registerViewPlugin() {}, unregisterViewPlugin() {},
    })
    vm.runInContext(source.replace(/^import .*\n/, '').replaceAll('export class ', 'class '), context)
    const tag = `view-animation-blend-space-${own}`
    assert(registry.has(tag))
    const editor = new (registry.get(tag))()
    assert.equal(editor.expectedKind, 'blend-space-' + own)
    assert.equal(editor.fields.length, own === '1d' ? 3 : 6)
    assert.throws(() => { editor.animationNode = { kind: 'wrong' } })
    editor.animationNode = { kind: 'blend-space-' + own, name: 'Example', parameters: {}, points: [] }
    assert.equal(editor.animationNode.name, 'Example')
  }
  assert.deepEqual([...registry.keys()].sort(), ['view-animation-blend-space-1d', 'view-animation-blend-space-2d'])
  console.log('blend separation: model behavior and combined registration verified (not DOM E2E)')
}
