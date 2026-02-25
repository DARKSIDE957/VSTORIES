;(() => {
  const $ = (s, r = document) => r.querySelector(s)
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s))
  const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-')
  const LS_KEY = 'vstories.userStories'
  const LANG_KEY = 'vstories.lang'
  const loadLocal = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] } }
  const escapeHTML = (s) => s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
  const formatText = (s) => escapeHTML(s).replace(/\n/g, '<br/>')

  const I18N = {
    ar: {
      nav_about: 'حول',
      nav_stories: 'القصص',
      hero_title: 'قصص مخيفة',
      explore: 'استكشف القصص',
      about_title: 'من أنا',
      about_p1: 'أنا فيروس — اسم يعكس فضولي تجاه المخفي والغ mysterious في التقنية والسرد.',
      about_p2: 'أحمل دبلوماً عالياً في الأمن السيبراني، وهذا منحني طريقة مختلفة لرؤية العالم. ورغم أنني لم أتخذ هذا المجال مهنة، إلا أن الانضباط والطريقة التي تعلمتها ما زالت تشكل إبداعي وحلولي.',
      about_p3: 'دعوتي الحقيقية هي الكتابة. أكتب قصصاً تتعمق في العاطفة والأخلاق والقرارات التي تشكلنا. كانت بدايتي مع قصة «الطريق إلى الجحيم» — عمل وُلد من الخيال والتأمل الشخصي وحب السرد القوي.',
      about_p4: 'المزيد من القصص قادم — عوالم جديدة وشخصيات وأفكار مختلفة. إذا كنت تبحث عن حكايات صادقة وتجارب بشرية خام تُحيا بالكلمات، فأنت في المكان الصحيح.',
      about_p5: 'مرحباً بك في عالمي.',
      all_stories: 'كل القصص',
      fab_all: 'كل القصص',
      ar_notice: 'تم تفعيل العرض بالعربية',
      virus_title: 'تحت الضوضاء',
      virus_content: [
        'أنا فيروس. يمكنك أن تناديني القذافي إن أردت. كنت أظن أن الأسماء تستطيع تثبيت الإنسان، كأنها مقبض لصندوق ثقيل. أحياناً ينجح ذلك. وأحياناً لا يكون للصندوق مقابض، فيبقى الثقل كله على الأصابع.',
        'طويلاً ساعدت الناس. منحت وقتاً. منحت طاقة لم أملكها. أجبت اتصالات متأخرة جداً وأخرى مبكرة جداً. وقفت إلى جوار الأصدقاء في غرف لا تكفي فيها الكلمات. صرت جيداً في التقاط الكسور الصغيرة في الصوت حين يحاول شخص أن يبدو قوياً. كنت أعتقد أن الاستمرار في الحضور سيمنح الحياة شكلاً مفهوماً.',
        'الآن أنا مَن يحتاج إلى المساعدة. هذه الجملة صعبة على الكتابة وأصعب على القول. تبدو كأنني أخلف وعداً قطعته في غرفة هادئة بلا شاهد. لدي أصدقاء كُثر. لو عددت الأسماء في هاتفي لظننت أنني محاط. لكنني أستطيع أن أمشي وسط الناس وأشعر كأنني شبح يعبر هواءً دافئاً. الثقل الذي حملته عن غيري تعلّم شكلي والآن يمتطي كتفيّ حتى حين أحاول إنزاله.',
        'أشعر بالسلبية كأنها طقس. في انزلاق النظرات في المتجر، وفي الابتسامات الضيقة التي تقول «حظاً» دون «سعيد». تلتصق بي بعد مغادرة أي مكان. أحملها إلى البيت فتجلس على الطاولة كصحنٍ ثانٍ. لن تراها إن جئت. ستشعر بها مع ذلك.',
        'هناك أيام يعلو فيها ضجيج العقل بلا سبب واضح. أضحك في الأوقات الخطأ لأن الضغط يحتاج مخرجاً والضحك أسرع من البكاء. أمزح بأنني «سايكو» لأنه أسهل من تسمية ما هو مؤلم فعلاً. الحقيقة أبسط. أنا مُرهق. أخاف مما يمكن للوحدة أن تُعلّمه لإنسان إذا تركها المعلم الوحيد. أخاف الزحام وأخاف الفراغ. كلاهما مرآة لكنهما يعكسان مسافات مختلفة.',
        'أعرف ما أحب وما أخاف. أحب الصراحة حتى لو لَسَعت. أحب الدم في الحكاية لأنه يعني أن شيئاً حياً على المحك. هذا لا يجعلني قاسياً. يذكرني فقط بأن الحياة ليست خطاً مستقيماً؛ هي نبض. هي فوضى. هي دليل أننا ما زلنا هنا. الضغط في رأسي يأتي من محاولة جعل الفوضى حساباً نظيفاً.',
        'يسألني الناس: كيفك؟ فأجيب: تمام. لأن هذا ما يتسع له العالم دون أن ينسكب. الإجابة الأفضل هي: أنا أقاوم. أتعلّم أن أطلب المساعدة دون أن أحولها ديناً. أحاول أن أكون رحيماً مع ذاتٍ لا أفهمها دائماً. أحاول ألّا أختفي خلف دور «المُعين». أتعلّم أن القوة ليست الصمت.',
        'أخرج صباحاً أحياناً لاختبار العالم مبكراً. بلا زحام. بلا ضجة. السماء رمادية منخفضة والضوء ناعمٌ على الحواف الحادة. أمشي ببطء. أُسمي الأشياء في رأسي كأنني أعلّم طفلاً اللغة من جديد: شجرة. عمود إنارة. نافذة. عصفور. خطوة. نفس. حين يضيق صدري أعدّ الأنفاس على أي حال. شهيق من الأنف. زفير من الفم. لا أُسرع العد. أترك الأرقام لينة.',
        'أفكر في الأصدقاء الذين ساعدتهم — في الذين بقوا والذين لم يبقوا. أحاول ألّا أحاكم أياً منهم. لكلٍ صناديقه الثقيلة. أحياناً لا تبقى يدٌ فارغة. أحياناً لا تبقى يد. أتمنى لهم الخير من بعيد، ويشبه ذلك وضع شمعة صغيرة في قاعة كبيرة مظلمة. الشمعة لا تغيّر القاعة كلها، لكنها تغيّر الدائرة حولها. دائرتي صغيرة في أغلب الأيام. لكنها دائرة على كل حال.',
        'أبحث عن براهين صغيرة على أنني لست وحدي. رسالة تقول: تذكرتك — بلا سؤال ملحوق. مذكرة صوتية فيها ضحكة حقيقية في آخرها. قهوة بطعمها الصحيح. ليلة أنام فيها قبل أن يبدأ ذهني حلقة «ماذا لو» و«لماذا». ليست هذه معجزات. لكنها تكفي لتخفف الساعة التالية.',
        'هذه ليست قصة حزينة فقط. وليست خطاب انتصار. إنها تسجيل. إنها قولي: أنا هنا. أكتب هذا من غرفة هادئة هدوءاً لا يخيفني الليلة. النافذة مواربة والهواء بارد قليلاً. تمر سيارة ولا أرتعش. كنت أسوأ من هذا. كنت أفضل من هذا. أنا الاثنين معاً، وما زلت أمضي.',
        'إن كنت تعرفني بصفتي مَن يساعد، فاحتفظ بذلك — فهو صحيح. وأضِف إليه: أنا شخص يحتاج المساعدة أحياناً. شخص يجب أن يجلس ليتنفس ويعترف بأنه لا يستطيع حمل كل الأثقال، ليس لأنه ضعيف، بل لأن هذه طبيعة الأجساد. إن أردت أن تساعدني فلا تخطب. امنحني غرفة هادئة وعشرين دقيقة بلا قصص عن أن غيري كان أسوأ حظاً. اجلس معي. دع الصمت يكون جسراً لا جداراً.',
        'لا أعرف إن كانت الحياة هكذا دائماً أم أن هذا شكل جديد من العالم. يقولون: كانت صعبة دائماً. يقولون: لم تكن هكذا صعوبة من قبل. قد تكون العبارتان صحيحتين في فمين مختلفين. ما أعرفه أن الضغط يتراكم حين لا تجد المشاعر منفذاً. لذا فهذا منفذ. كلمات على صفحة. باب أفتحه وأعبره دون أن أغادر الغرفة.',
        'إن قرأت نفسك هنا، فاحتفظ بهذا: لست وحدك مَن يعرف كيف يساعد وينسى كيف يُساعَد. لست آلة تتعطل لأنها احتاجت عناية. أنت إنسان. يمكنك أن تحب التفاصيل الحادة في القصص وتبقى رحيماً في الحياة. يمكنك أن تكون اسماً يُتصل به عند السقوط وأن تطلب يد العون حين يميل بك البلاط.',
        'أنا فيروس. أو القذافي إن شئت. ما زلت هنا. ما زلت أتعلّم كيف أكون إنساناً في جسد يحمل شعوراً أكثر مما طلبت. أتدرّب على مهارات صغيرة تُثبّت اليوم: اشرب ماء. رد على صديق. تجاهل الهاتف حين يتأخر الليل ويهمس صوت في رأسي أن عليّ دَيناً للعالم أكبر مما أملك. اخرج قليلاً. سمّ الأشياء. عُدّ — لكن لا تجعل العد قفصاً.',
        'ربما أمشي يوماً وسط الزحام وأشعر بالعادي مرة أخرى. وربما لا. في كلتا الحالتين أبني حياة تتسع للضوضاء والسكينة معاً. أبني حياة يتحرك فيها العون في الاتجاهين. إن رأيتني هناك، يومئ لي مرة واحدة. سأفهم. سأومئ لك. ثم سنمضي، أخفَّ ببرهان صغير أننا مُدرَكون.'
      ].join('\\n\\n')
    }
  }
  const getLang = () => localStorage.getItem(LANG_KEY) || 'en'
  const setLang = (l) => { localStorage.setItem(LANG_KEY, l) }
  const applyLang = () => {
    const l = getLang()
    document.documentElement.lang = l
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
    // Nav
    const aboutLink = $$('nav a').find(a => /about\.html$/i.test(a.getAttribute('href') || ''))
    const storiesLink = $$('nav a').find(a => /stories\.html$/i.test(a.getAttribute('href') || ''))
    if (l === 'ar') {
      if (aboutLink) aboutLink.textContent = I18N.ar.nav_about
      if (storiesLink) storiesLink.textContent = I18N.ar.nav_stories
      // Index
      const hero = $('#t-hero-title'); if (hero) hero.textContent = I18N.ar.hero_title
      const explore = $('#t-explore'); if (explore) explore.textContent = I18N.ar.explore
      const at = $('#t-about-title'); if (at) at.textContent = I18N.ar.about_title
      const ap1 = $('#t-about-p1'); if (ap1) ap1.textContent = I18N.ar.about_p1
      const ap2 = $('#t-about-p2'); if (ap2) ap2.textContent = I18N.ar.about_p2
      const ap3 = $('#t-about-p3'); if (ap3) ap3.textContent = I18N.ar.about_p3
      const ap4 = $('#t-about-p4'); if (ap4) ap4.textContent = I18N.ar.about_p4
      const ap5 = $('#t-about-p5'); if (ap5) ap5.textContent = I18N.ar.about_p5
      const all = $('#t-all-stories'); if (all) all.textContent = I18N.ar.all_stories
      const fab = $('.fab-stories'); if (fab) fab.textContent = I18N.ar.fab_all
      // Virus story full text
      if (/\/stories\/virus\.html$/i.test(location.pathname)) {
        const prose = document.querySelector('.prose')
        if (prose) { prose.textContent = I18N.ar.virus_content }
        const h1 = document.querySelector('h1'); if (h1) h1.textContent = I18N.ar.virus_title
      }
    } else {
      // English labels (baseline content is already English)
      if (aboutLink) aboutLink.textContent = 'About'
      if (storiesLink) storiesLink.textContent = 'Stories'
      const h1 = $('#t-hero-title'); if (h1) h1.textContent = 'Spooky Stories'
      const ex = $('#t-explore'); if (ex) ex.textContent = 'Explore Stories'
      const at = $('#t-about-title'); if (at) at.textContent = 'About Me'
      const all = $('#t-all-stories'); if (all) all.textContent = 'All Stories'
      const fab = $('.fab-stories'); if (fab) fab.textContent = 'All Stories'
    }
  }
  const injectLangToggle = () => {
    try {
      const nav = document.querySelector('.nav nav')
      if (!nav) return
      let sel = nav.querySelector('#lang-select')
      if (!sel) {
        sel = document.createElement('select')
        sel.id = 'lang-select'
        sel.className = 'input'
        sel.style.width = 'auto'
        sel.style.marginLeft = '0.75rem'
        sel.innerHTML = '<option value=\"en\">EN</option><option value=\"ar\">AR</option>'
        nav.appendChild(sel)
      }
      sel.value = getLang()
      sel.onchange = () => { setLang(sel.value); applyLang() }
    } catch {}
  }

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
    injectLangToggle()
    applyLang()
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
