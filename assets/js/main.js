;(() => {
  const $ = (s, r = document) => r.querySelector(s)
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s))
  const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-')
  const LS_KEY = 'vstories.userStories'
  const loadLocal = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] } }
  const escapeHTML = (s) => s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
  const formatText = (s) => escapeHTML(s).replace(/\n/g, '<br/>')

  // i18n removed per request

  const renderCard = (s) => {
    const tags = s.tags.map(t => `<span class="tag">#${escapeHTML(t)}</span>`).join('')
    return `<a class="card glass" href="story.html?slug=${encodeURIComponent(s.slug)}">
      <h3>${escapeHTML(s.title)}</h3>
      <div class="meta">by ${escapeHTML(s.author)} • ${new Date(s.createdAt).toLocaleDateString()}</div>
      <p>${escapeHTML(s.excerpt)}</p>
      <div class="tags">${tags}</div>
    </a>`
  }

  const mountIndex = () => {
    const list = $('#featured')
    if (!list) return
    const featured = (window.BUILTIN_STORIES || []).filter(s => s.featured).slice(0,4)
    list.innerHTML = featured.map(renderCard).join('')
  }

  const mountStories = () => {
    const container = $('#stories-list')
    if (!container) return
    const builtins = (window.BUILTIN_STORIES || []).slice().sort((a,b)=>a.title.localeCompare(b.title))
    const rows = builtins.map(s => `<a class="story-btn" href="story.html?slug=${encodeURIComponent(s.slug)}">${escapeHTML(s.title)}</a>`).join('')
    container.innerHTML = rows || `<div class="muted">No stories available.</div>`
  }

  const mountStory = () => {
    const area = $('#story')
    if (!area) return
    const u = new URL(location.href)
    const slug = u.searchParams.get('slug') || ''
    const builtins = window.BUILTIN_STORIES || []
    const local = loadLocal()
    const story = [...local, ...builtins].find(s => s.slug === slug)
    if (!story) {
      area.innerHTML = `<div class="muted">Story not found.</div>`
      return
    }
    document.title = `${story.title} - VStories`
    $('#story-title').textContent = story.title
    $('#story-meta').textContent = `by ${story.author} • ${new Date(story.createdAt).toLocaleString()}`
    area.innerHTML = `<div class="prose">${formatText(story.content)}</div><div class="tags" id="story-tags"></div>`
    $('#story-tags').innerHTML = story.tags.map(t => `<span class="tag">#${escapeHTML(t)}</span>`).join('')
  }

  const installProgress = () => {
    const isStaticStory = /\/stories\//i.test(location.pathname)
    if (!isStaticStory) return
    const bar = document.createElement('div')
    bar.className = 'progress'
    const inner = document.createElement('div')
    inner.className = 'progress-inner'
    bar.appendChild(inner)
    document.body.appendChild(bar)
    const update = () => {
      const st = document.documentElement.scrollTop || document.body.scrollTop
      const h = (document.documentElement.scrollHeight - document.documentElement.clientHeight)
      const pct = Math.max(0, Math.min(100, h > 0 ? (st / h) * 100 : 0))
      inner.style.width = pct + '%'
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
  }

  document.addEventListener('DOMContentLoaded', () => {
    mountIndex()
    mountStories()
    mountStory()
    installProgress()
    // Floating "All Stories" button
    try {
      const isStories = /(?:^|\/)stories\.html$/i.test(location.pathname)
      const hasFab = document.querySelector('.fab-stories')
      if (!isStories && !hasFab) {
        const a = document.createElement('a')
        a.className = 'fab-stories'
        a.setAttribute('aria-label', 'All Stories')
        a.textContent = 'All Stories'
        const href = location.pathname.includes('/stories/') ? '../stories.html' : 'stories.html'
        a.href = href
        document.body.appendChild(a)
      }
      // Removed floating direct "Read Road To Hell" per request
    } catch {}
  })
})()
