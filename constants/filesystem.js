export const filesystem = {
  name: 'harsh',
  type: 'folder',
  children: [
    {
      name: 'README.txt',
      type: 'file',
      size: '856 B',
      modified: 'Apr 27, 2026',
      desktopPosition: { x: 20, y: 20 },
      content: `<p class="mb-4">I grew up in <a href="https://en.wikipedia.org/wiki/Bihar" target="_blank">Bihar, India</a>. Eldest of three siblings.</p>

<p class="mb-4">Went to college for Electronics and Communication. But I wanted to build software.</p>

<p class="mb-6">So I taught myself to code. Nights and weekends. Worked with five startups while still in college. Built frontends, backends, whatever they needed. Each one taught me something different.</p>

<p class="mb-6">Graduated in 2025. No job lined up. So I kept building. Started contributing to open source. Six months later, found my way to <a href="https://github.com/EpicenterHQ" target="_blank">Epicenter</a> and <a href="https://github.com/topoteretes/cognee" target="_blank">Cognee</a>.</p>

<p class="mb-6">Not getting a traditional job turned out to be the best thing. Open source gave me something better — the chance to build things that matter.</p>

<p class="mb-6">Now I maintain projects at Epicenter (YC S25) and build community at Cognee. I track issues. Submit PRs. Help shape roadmaps. Support developers. Work with React, TypeScript, Next.js, Node.js, Python — whatever solves the problem.</p>

<p class="mb-4">The files here show what I've built and what I'm working on.</p>

<p class="mt-8 text-stone-600">If you're building something interesting, <a href="mailto:9u.harsh@gmail.com">let's talk</a>.</p>

<p class="mt-6 text-stone-500">— Harsh</p>`
    },
    {
      name: 'resume.pdf',
      type: 'file',
      size: '245 KB',
      modified: 'Apr 27, 2026',
      desktopPosition: { x: 24, y: 395 },
      isPDF: true,
      downloadUrl: '/doc/HARSH_KUMAR_2026_resume.pdf',
      shareUrl: 'https://drive.google.com/file/d/1Xem9q9AhpRiw9Fo4cvWHqDqEL3tUoGGE/view?usp=sharing'
    },
    {
      name: 'now.md',
      type: 'file',
      size: '3.1 KB',
      modified: 'Apr 27, 2026',
      desktopPosition: { x: 24, y: 115 },
      content: `<h2 class="text-2xl font-medium mb-6 text-stone-800">What I'm working on</h2>

<p class="mb-4"><strong>Cognee</strong><br/>
<span class="text-sm text-stone-500">Dec 2025 – Present</span></p>

<p class="mb-8">Moderator. I talk with developers. Figure out what they need. Answer technical questions. Share feedback with the team. Suggest fixes.</p>

<p class="mb-4"><strong>Epicenter (YC S25)</strong><br/>
<span class="text-sm text-stone-500">Aug 2025 – Present</span></p>

<p class="mb-8">Maintainer. I build UI. Submit PRs. Work with the team on features and fixes. Help shape the roadmap. Suggest improvements.</p>

<h3 class="text-lg font-medium mb-6 text-stone-800 mt-10">Previously</h3>

<p class="mb-4"><strong>Userology</strong><br/>
<span class="text-sm text-stone-500">Aug 2024 – Jan 2025</span></p>

<p class="mb-8">Built authentication with Firebase and Next.js. Optimized WebRTC — improved video performance by 30%. Worked in an Agile team making technical decisions.</p>

<p class="mb-4"><strong>Freelance</strong><br/>
<span class="text-sm text-stone-500">Mar 2024 – Oct 2024</span></p>

<p class="mb-8">Built a conversational AI platform. Full stack — React, Node.js, MongoDB. Integrated OpenAI, D-ID, ElevenLabs. Added authentication and Stripe payments. Shipped production MVP independently.</p>

<p class="mb-4"><strong>VaySolar</strong><br/>
<span class="text-sm text-stone-500">Nov 2023 – May 2024</span></p>

<p class="mb-8">Enhanced vendor, admin, and customer portals. Fixed bugs and API issues. Updated UI from Figma designs. React and REST APIs.</p>

<p class="mb-4"><strong>Frontend Mentor</strong><br/>
<span class="text-sm text-stone-500">Sep 2023 – Apr 2024</span></p>

<p class="mb-8">Reviewed 350+ web apps. Gave feedback on React and JavaScript. Mentored developers. Earned 2nd place Mentor of the Year.</p>

<p class="mb-4"><strong>Botter Solutions</strong><br/>
<span class="text-sm text-stone-500">Nov 2023 – Dec 2023</span></p>

<p class="mb-4">Built data visualization for directional drilling software. React and MUI Data Grid. Integrated REST APIs. Optimized for large datasets.</p>`
    },
    {
      name: 'projects',
      type: 'folder',
      size: '4 items',
      modified: 'Apr 27, 2026',
      desktopPosition: { x: 26, y: 205 },
      children: [
                {
          name: 'snorlax.md',
          type: 'file',
          size: '180 KB',
          modified: 'Apr 27, 2026',
          language: 'Python',
          githubUrl: 'https://github.com/thisisharsh7/snorlax',
          screenshots: [
            {
              path: '/images/projects/snorlax-dashboard.png',
              alt: 'Snorlax issue triage dashboard',
              caption: 'Main dashboard view'
            },
            {
              path: '/images/projects/snorlax-analysis.png',
              alt: 'AI-powered issue analysis',
              caption: 'Issue analysis with semantic search'
            }
          ],
          content: `<div class="space-y-6">
            <div>
              <h2 class="text-2xl font-medium mb-2 text-stone-800">Snorlax</h2>
              <p class="text-sm text-stone-500 font-mono mb-6">Python · TypeScript · PostgreSQL · 9 stars</p>
            </div>

            <div class="space-y-4 text-stone-700">
              <p>AI-powered GitHub issue triage that finds duplicates, searches your codebase, and drafts responses.</p>

              <p>Indexes your repository's code and issues. Uses semantic search and Claude AI to analyze incoming issues. Finds similar issues and PRs. Searches relevant code. Categorizes issues. Drafts responses you can review and post.</p>

              <p>Local-first tool. Runs with Docker. Saves maintainers hours every week. ~$0.003 per issue with smart caching.</p>
            </div>
          </div>`
        },
        {
          name: 'seeva-ai-assistant.md',
          type: 'file',
          size: '234 KB',
          modified: 'Apr 27, 2026',
          language: 'TypeScript',
          githubUrl: 'https://github.com/thisisharsh7/seeva-ai-assistant',
          websiteUrl: 'https://thisisharsh7.github.io/seeva-ai-assistant/',
          screenshots: [
            {
              path: '/images/projects/seeva-overlay.png',
              alt: 'Seeva AI Assistant overlay interface',
              caption: 'Spotlight-style AI overlay'
            },
            {
              path: '/images/projects/seeva-chat.png',
              alt: 'AI chat interface',
              caption: 'Interactive AI conversation'
            }
          ],
          content: `<div class="space-y-6">
            <div>
              <h2 class="text-2xl font-medium mb-2 text-stone-800">Seeva AI Assistant</h2>
              <p class="text-sm text-stone-500 font-mono mb-6">TypeScript · Tauri · Rust · 25 stars</p>
            </div>

            <div class="space-y-4 text-stone-700">
              <p>AI overlay that works like Spotlight.</p>

              <p>Press a key. Ask AI. Get back to work. Works over fullscreen apps. All data local.</p>
            </div>
          </div>`
        },
        {
          name: 'ccux.md',
          type: 'file',
          size: '145 KB',
          modified: 'Jan 10, 2025',
          language: 'Python',
          githubUrl: 'https://github.com/thisisharsh7/ccux',
          websiteUrl: 'https://ccux.netlify.app/',
          screenshots: [
            {
              path: '/images/projects/ccux-terminal.png',
              alt: 'CCUX terminal interface',
              caption: 'CLI interface for website generation'
            },
            {
              path: '/images/projects/ccux-themes.png',
              alt: 'Generated website themes',
              caption: 'Sample themes generated by CCUX'
            }
          ],
          content: `<div class="space-y-6">
            <div>
              <h2 class="text-2xl font-medium mb-2 text-stone-800">CCUX</h2>
              <p class="text-sm text-stone-500 font-mono mb-6">Python · Claude · Gemini · 1 star</p>
            </div>

            <div class="space-y-4 text-stone-700">
              <p>AI-powered website generator in your terminal.</p>

              <p>46 themes. No prompting. Just describe your product. Get production-ready code.</p>
            </div>
          </div>`
        },
        {
          name: 'alertframe.md',
          type: 'file',
          size: '89 KB',
          modified: 'Dec 2, 2024',
          language: 'TypeScript',
          githubUrl: 'https://github.com/thisisharsh7/alertframe',
          websiteUrl: 'https://alertframe.vercel.app',
          screenshots: [
            {
              path: '/images/projects/alertframe-select.png',
              alt: 'AlertFrame element selector',
              caption: 'Visual element selection interface'
            },
            {
              path: '/images/projects/alertframe-dashboard.png',
              alt: 'Monitoring dashboard',
              caption: 'Track multiple website changes'
            }
          ],
          content: `<div class="space-y-6">
            <div>
              <h2 class="text-2xl font-medium mb-2 text-stone-800">AlertFrame</h2>
              <p class="text-sm text-stone-500 font-mono mb-6">TypeScript · Next.js · Prisma · 3 stars</p>
            </div>

            <div class="space-y-4 text-stone-700">
              <p>Visual website monitoring tool.</p>

              <p>Click any element on any website. Get email when it changes. Perfect for tracking competitors, prices, job postings.</p>
            </div>
          </div>`
        }
      ]
    },
    {
      name: 'open-source',
      type: 'folder',
      size: '3 items',
      modified: 'Apr 27, 2026',
      desktopPosition: { x: 22, y: 300 },
      children: [
        {
          name: 'epicenter.md',
          type: 'file',
          size: '1.1 KB',
          modified: 'Apr 27, 2026',
          content: `<h2 class="text-2xl font-medium mb-6 text-stone-800">Epicenter</h2>

<p class="text-sm text-stone-500 font-mono mb-6">YC S25 · 3,954 stars · Aug 2025 – Present</p>

<p class="mb-4">Productivity platform for YC companies.</p>

<p class="mb-4">Track issues. Submit PRs. Help shape the roadmap. Organize what gets built next.</p>

<p class="mb-6">Share tools and ideas. Make collaboration smoother. Speed up development.</p>

<a href="https://github.com/EpicenterHQ/epicenter" target="_blank" class="text-stone-600 hover:text-stone-800 text-sm underline">View project →</a>`
        },
        {
          name: 'cocoindex.md',
          type: 'file',
          size: '512 B',
          modified: 'Apr 27, 2026',
          content: `<h2 class="text-2xl font-medium mb-6 text-stone-800">cocoindex</h2>

<p class="text-sm text-stone-500 font-mono mb-6">5,933 stars</p>

<p class="mb-4">Data transformation framework for AI. Ultra performant. Incremental processing.</p>

<p class="mb-6">Built in Rust. Contributed to core functionality.</p>

<a href="https://github.com/cocoindex-io/cocoindex" target="_blank" class="text-stone-600 hover:text-stone-800 text-sm underline">View project →</a>`
        },
        {
          name: 'codebuff.md',
          type: 'file',
          size: '384 B',
          modified: 'Apr 27, 2026',
          content: `<h2 class="text-2xl font-medium mb-6 text-stone-800">CodeBuff</h2>

<p class="text-sm text-stone-500 font-mono mb-6">2,722 stars</p>

<p class="mb-4">Generate code from the terminal.</p>

<p class="mb-6">TypeScript code generation tool. Contributed to features and documentation.</p>

<a href="https://github.com/CodebuffAI/codebuff" target="_blank" class="text-stone-600 hover:text-stone-800 text-sm underline">View project →</a>`
        }
      ]
    },
    {
      name: 'guestbook.md',
      type: 'file',
      size: '2.4 KB',
      modified: 'Apr 27, 2026',
      desktopPosition: { x: 24, y: 490 },
      isGuestbook: true
    }
  ]
};

export function findFile(path, fs = filesystem) {
  const parts = path.split('/').filter(Boolean);
  let current = fs;

  for (const part of parts) {
    if (current.type === 'folder' && current.children) {
      const found = current.children.find(child => child.name === part);
      if (!found) return null;
      current = found;
    } else {
      return null;
    }
  }

  return current;
}
