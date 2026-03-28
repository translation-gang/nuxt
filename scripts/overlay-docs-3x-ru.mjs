#!/usr/bin/env node
/**
 * После `git checkout upstream/3.x -- docs/` восстанавливает русские .md из бэкапа
 * ветки translation-gang/3.x по сопоставлению старой и новой структуры.
 *
 * Использование:
 *   node scripts/overlay-docs-3x-ru.mjs <абсолютный_путь_к_папке_docs_бэкапа>
 *
 * Бэкап — распакованный `git archive HEAD docs` (внутри должна быть папка docs/).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')

function readUtf8 (p) {
  return fs.readFileSync(p, 'utf8')
}

function writeUtf8 (p, s) {
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, s, 'utf8')
}

function walkMd (dir, baseRel = '') {
  const out = []
  if (!fs.existsSync(dir)) { return out }
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(baseRel, name.name)
    const full = path.join(dir, name.name)
    if (name.isDirectory()) {
      out.push(...walkMd(full, rel))
    }
    else if (name.name.endsWith('.md')) {
      out.push(rel.split(path.sep).join('/'))
    }
  }
  return out
}

function conceptSlug (filename) {
  const m = String(filename).match(/^(\d+)\.(.+)\.md$/)
  return m ? m[2] : null
}

function main () {
  const backupDocs = process.argv[2]
  if (!backupDocs || !fs.existsSync(backupDocs)) {
    console.error('Usage: node scripts/overlay-docs-3x-ru.mjs <path-to-backup/docs>')
    process.exit(1)
  }

  const targetDocs = path.join(REPO_ROOT, 'docs')
  const backup = path.resolve(backupDocs)

  const backupFiles = new Map()
  for (const rel of walkMd(backup)) {
    const full = path.join(backup, rel)
    backupFiles.set(rel.replace(/\\/g, '/'), readUtf8(full))
  }

  const get = (rel) => backupFiles.get(rel)

  // slug -> содержимое для concepts
  const conceptBySlug = new Map()
  const conceptDir = path.join(backup, '2.guide/1.concepts')
  if (fs.existsSync(conceptDir)) {
    for (const f of fs.readdirSync(conceptDir)) {
      if (!f.endsWith('.md')) { continue }
      const slug = conceptSlug(f)
      if (slug) { conceptBySlug.set(slug, get(`2.guide/1.concepts/${f}`)) }
    }
  }

  let applied = 0
  let skipped = 0

  const tryWrite = (targetRel, content, reason) => {
    if (content == null) { skipped++; return }
    const out = path.join(targetDocs, ...targetRel.split('/'))
    writeUtf8(out, content)
    applied++
    console.log(`+ ${targetRel}  (${reason})`)
  }

  // 1) Те же пути, что и в бэкапе (getting-started, community, bridge, migration, README)
  for (const rel of walkMd(targetDocs)) {
    const key = rel
    if (backupFiles.has(key)) {
      tryWrite(key, get(key), 'same path')
    }
  }

  // 2) 3.api → 4.api
  for (const rel of walkMd(targetDocs)) {
    if (!rel.startsWith('4.api/')) { continue }
    const oldKey = `3.api/${rel.slice('4.api/'.length)}`
    if (get(oldKey) && !backupFiles.has(rel)) {
      tryWrite(rel, get(oldKey), `3.api → 4.api`)
    }
  }

  // 3) directory-structure
  for (const rel of walkMd(targetDocs)) {
    if (!rel.startsWith('2.directory-structure/')) { continue }
    const base = path.basename(rel)
    const oldKey = `2.guide/2.directory-structure/${base}`
    if (get(oldKey)) {
      tryWrite(rel, get(oldKey), '2.guide/2.directory-structure → 2.directory-structure')
    }
  }

  // 4) guide index
  tryWrite('3.guide/0.index.md', get('2.guide/0.index.md'), 'guide index')

  // 5) concepts по slug
  const conceptsTarget = path.join(targetDocs, '3.guide/1.concepts')
  if (fs.existsSync(conceptsTarget)) {
    for (const f of fs.readdirSync(conceptsTarget)) {
      if (!f.endsWith('.md')) { continue }
      const slug = conceptSlug(f)
      if (slug && conceptBySlug.has(slug)) {
        tryWrite(`3.guide/1.concepts/${f}`, conceptBySlug.get(slug), `concept slug:${slug}`)
      }
    }
  }

  // 6) best-practices 5 → 2
  const bpTarget = path.join(targetDocs, '3.guide/2.best-practices')
  if (fs.existsSync(bpTarget)) {
    for (const f of fs.readdirSync(bpTarget)) {
      if (!f.endsWith('.md')) { continue }
      const oldKey = `2.guide/5.best-practices/${f}`
      tryWrite(`3.guide/2.best-practices/${f}`, get(oldKey), 'best-practices')
    }
  }

  // 7) recipes 4 → 5
  const recipesTarget = path.join(targetDocs, '3.guide/5.recipes')
  if (fs.existsSync(recipesTarget)) {
    for (const f of fs.readdirSync(recipesTarget)) {
      if (!f.endsWith('.md')) { continue }
      const oldKey = `2.guide/4.recipes/${f}`
      tryWrite(`3.guide/5.recipes/${f}`, get(oldKey), 'recipes')
    }
  }

  // 8) going-further 3 → 6 (без переноса 3.modules в 4.modules — там новая структура)
  const gfTarget = path.join(targetDocs, '3.guide/6.going-further')
  if (fs.existsSync(gfTarget)) {
    for (const f of fs.readdirSync(gfTarget)) {
      if (!f.endsWith('.md')) { continue }
      if (f === 'index.md') {
        const oldIdx = get('2.guide/3.going-further/index.md')
        if (oldIdx) { tryWrite(`3.guide/6.going-further/index.md`, oldIdx, 'going-further index') }
        continue
      }
      const oldKey = `2.guide/3.going-further/${f}`
      tryWrite(`3.guide/6.going-further/${f}`, get(oldKey), 'going-further')
    }
  }

  console.log(`\nDone. Applied ${applied} overlays, skipped ${skipped} missing sources.`)
  console.log('Остались на английском: docs/3.guide/3.ai/*, docs/3.guide/4.modules/* (новые разделы в upstream).')
}

main()
