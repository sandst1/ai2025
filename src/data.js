// Company color definitions for fireworks
export const companyColors = {
  anthropic: { primary: 0xda7756, secondary: 0xff9a7a, name: 'Anthropic' },
  openai: { primary: 0x10a37f, secondary: 0x1ed9a5, name: 'OpenAI' },
  google: { primary: 0x4285f4, secondary: 0xfbbc04, name: 'Google' },
  xai: { primary: 0xffffff, secondary: 0xcccccc, name: 'xAI' },
  meta: { primary: 0x0668e1, secondary: 0x00b2ff, name: 'Meta' },
  deepseek: { primary: 0xa855f7, secondary: 0xd946ef, name: 'DeepSeek' },
  alibaba: { primary: 0xff6a00, secondary: 0xffaa00, name: 'Alibaba' },
  moonshot: { primary: 0x06b6d4, secondary: 0x22d3ee, name: 'Moonshot' },
  industry: { primary: 0xffd700, secondary: 0xffea00, name: 'Industry' }
}

// Timeline data with releases, events, and technical breakthroughs
export const timelineData = [
  {
    month: 'January',
    releases: [
      { name: 'DeepSeek R1', company: 'deepseek', highlight: true },
      { name: 'o3-mini', company: 'openai' }
    ],
    events: [
      {
        type: 'milestone',
        title: 'The "Sputnik Moment"',
        description: 'DeepSeek R1 matches OpenAI o1 performance, trained for just $5.6M vs billions for Western models'
      },
      {
        type: 'market',
        title: '$600B Nvidia Crash',
        description: 'Largest single-day market cap loss in history (18% drop) following DeepSeek release'
      },
      {
        type: 'technical',
        title: 'Pure RLVR Breakthrough',
        description: 'Reinforcement Learning from Verifiable Rewards without supervised fine-tuning - paradigm shift in training'
      },
      {
        type: 'release',
        title: 'DeepSeek R1 Specs',
        description: '671B total params (MoE), 37B active per forward pass, MIT licensed with full weights'
      }
    ]
  },
  {
    month: 'February',
    releases: [
      { name: 'Claude 3.7 Sonnet', company: 'anthropic', highlight: true },
      { name: 'Claude Code', company: 'anthropic', highlight: true },
      { name: 'Grok 3', company: 'xai' }
    ],
    events: [
      {
        type: 'technical',
        title: 'Hybrid Reasoning Models',
        description: 'Claude 3.7 introduces user-controlled reasoning budget with up to 128K thinking tokens'
      },
      {
        type: 'product',
        title: 'Claude Code Launch',
        description: 'Terminal-based agentic coding with 200K context - shift from cloud to local dev environments'
      },
      {
        type: 'benchmark',
        title: 'SWE-bench Record',
        description: 'Claude 3.7 Sonnet hits 62.3% on SWE-bench Verified (vs o3-mini\'s 49.3%)'
      },
      {
        type: 'infrastructure',
        title: 'Colossus Cluster',
        description: 'xAI\'s Grok 3 trained on 200,000 GPU cluster with 10x more compute than Grok 2'
      }
    ]
  },
  {
    month: 'March',
    releases: [
      { name: 'Gemini 2.5 Pro', company: 'google', highlight: true },
      { name: 'GPT-4.5 Preview', company: 'openai' }
    ],
    events: [
      {
        type: 'milestone',
        title: 'MCP Goes Universal',
        description: 'OpenAI announces full MCP support - "People love MCP" - major competitor joins Anthropic\'s protocol'
      },
      {
        type: 'technical',
        title: '1M Token Context',
        description: 'Gemini 2.5 Pro launches with 1 million token context window'
      },
      {
        type: 'benchmark',
        title: 'LMArena #1',
        description: 'Gemini 2.5 Pro takes top spot on LMArena leaderboard by significant margin'
      },
      {
        type: 'research',
        title: 'Humanity\'s Last Exam',
        description: 'New benchmark introduced - Gemini 2.5 Pro achieves 18.8% SOTA without tool use'
      }
    ]
  },
  {
    month: 'April',
    releases: [
      { name: 'Llama 4', company: 'meta', highlight: true },
      { name: 'Qwen3', company: 'alibaba' },
      { name: 'o3 / o4-mini', company: 'openai' },
      { name: 'Codex CLI', company: 'openai' }
    ],
    events: [
      {
        type: 'technical',
        title: 'MoE Goes Mainstream',
        description: 'Meta\'s first Mixture-of-Experts Llama: Scout (10M context), Maverick (1M context)'
      },
      {
        type: 'tooling',
        title: 'OpenAI Codex CLI',
        description: 'Open-source terminal coding agent in Rust - MIT licensed with sandbox execution'
      },
      {
        type: 'benchmark',
        title: '99.5% AIME',
        description: 'o4-mini achieves 99.5% on AIME 2025 with tool use - near-perfect math competition performance'
      },
      {
        type: 'scale',
        title: '36 Trillion Tokens',
        description: 'Qwen3 trained on 36T tokens (double Qwen2.5), supports 119 languages'
      }
    ]
  },
  {
    month: 'May',
    releases: [
      { name: 'Claude 4 Opus', company: 'anthropic', highlight: true },
      { name: 'Claude 4 Sonnet', company: 'anthropic' },
      { name: 'Jules', company: 'google' }
    ],
    events: [
      {
        type: 'milestone',
        title: '"World\'s Best Coding Model"',
        description: 'Claude 4 Opus achieves 72.5% SWE-bench, can work continuously for hours on complex tasks'
      },
      {
        type: 'safety',
        title: 'ASL-3 Classification',
        description: 'Claude 4 Opus classified as AI Safety Level 3 - first model at significantly higher risk tier'
      },
      {
        type: 'technical',
        title: 'Extended Thinking + Tools',
        description: 'Claude 4 models can alternate between reasoning and tool use (beta feature)'
      },
      {
        type: 'product',
        title: 'Google I/O Updates',
        description: 'Gemini 2.5 Flash becomes default, Deep Think mode with native audio output introduced'
      }
    ]
  },
  {
    month: 'June',
    releases: [
      { name: 'Gemini 2.5 GA', company: 'google', highlight: true },
      { name: 'Gemini CLI', company: 'google' }
    ],
    events: [
      {
        type: 'tooling',
        title: 'Terminal Renaissance',
        description: 'CLI coding tools gain major mindshare - Gemini CLI offers 1M token context with generous free tier'
      },
      {
        type: 'trend',
        title: '"Year of Agents" Momentum',
        description: 'Industry-wide shift toward agentic AI systems accelerates'
      },
      {
        type: 'industry',
        title: 'Meta Superintelligence Lab',
        description: 'Meta forms dedicated lab with aggressive talent poaching (7-9 figure compensation packages)'
      },
      {
        type: 'culture',
        title: '"AI-nxiety" Emerges',
        description: 'Term coined for developer exhaustion at relentless pace of AI change'
      }
    ]
  },
  {
    month: 'July',
    releases: [
      { name: 'Grok 4', company: 'xai', highlight: true },
      { name: 'Kimi K2', company: 'moonshot', highlight: true },
      { name: 'Qwen3-Coder', company: 'alibaba' }
    ],
    events: [
      {
        type: 'efficiency',
        title: '100x Cost Reduction',
        description: 'Kimi K2: 1T params trained for $4.6M, API pricing 100x cheaper than Claude Opus 4'
      },
      {
        type: 'technical',
        title: 'MuonClip Optimizer',
        description: 'Kimi K2 achieves zero training spikes across 15.5T tokens with novel optimizer'
      },
      {
        type: 'benchmark',
        title: 'Grok 4 vs GPT-5',
        description: 'Grok 4 outperforms GPT-5 High on Humanity\'s Last Exam with 6x efficiency improvement'
      },
      {
        type: 'tools',
        title: 'Qwen Code CLI',
        description: 'Alibaba releases CLI tool compatible with Claude Code interface'
      }
    ]
  },
  {
    month: 'August',
    releases: [
      { name: 'GPT-5', company: 'openai', highlight: true },
      { name: 'GPT-OSS', company: 'openai' },
      { name: 'Grok Code Fast 1', company: 'xai' }
    ],
    events: [
      {
        type: 'technical',
        title: 'Adaptive Routing',
        description: 'GPT-5 automatically chooses between fast response and thinking mode based on query complexity'
      },
      {
        type: 'milestone',
        title: 'First Open Weights Since GPT-2',
        description: 'OpenAI releases gpt-oss-120b and gpt-oss-20b with MIT license - historic shift'
      },
      {
        type: 'tooling',
        title: 'Coding Tools Explode',
        description: 'Claude Code captures 42% market share; OpenCode hits 41K GitHub stars, 400K monthly developers'
      },
      {
        type: 'product',
        title: 'Free Coding Agent',
        description: 'Grok Code Fast 1 free on GitHub Copilot, Cursor, Windsurf, and more'
      }
    ]
  },
  {
    month: 'September',
    releases: [
      { name: 'Claude Sonnet 4.5', company: 'anthropic', highlight: true },
      { name: 'Qwen3-Max', company: 'alibaba' },
      { name: 'Qwen3-Next', company: 'alibaba' }
    ],
    events: [
      {
        type: 'benchmark',
        title: '82% SWE-bench',
        description: 'Claude Sonnet 4.5 achieves 82.0% with high-compute setting - massive jump from 50% at year start'
      },
      {
        type: 'paradigm',
        title: 'Context Engineering Emerges',
        description: 'Anthropic blog post sparks industry discussion - shift from prompt engineering to building information ecosystems around models'
      },
      {
        type: 'capability',
        title: '30+ Hour Focus',
        description: 'Claude Sonnet 4.5 maintains focus for 30+ hours on complex multi-step tasks'
      },
      {
        type: 'computer-use',
        title: '61.4% OSWorld',
        description: 'State-of-the-art on real computer-use tasks benchmark'
      },
      {
        type: 'competition',
        title: 'Qwen3-Max Surpasses GPT-5',
        description: 'Alibaba model ranks #3 globally on LMArena, beats GPT-5-Chat'
      }
    ]
  },
  {
    month: 'October',
    releases: [
      { name: 'Kimi Linear', company: 'moonshot', highlight: true },
      { name: 'Claude Haiku 4.5', company: 'anthropic' }
    ],
    events: [
      {
        type: 'technical',
        title: 'Delta Attention (KDA)',
        description: 'Kimi Linear introduces more efficient attention method for long contexts'
      },
      {
        type: 'value',
        title: 'Frontier Quality at $1/$5',
        description: 'Claude Haiku 4.5 achieves 73.3% SWE-bench at fraction of larger model costs'
      },
      {
        type: 'surprise',
        title: 'Small Model Dominance',
        description: 'Haiku 4.5 matches Sonnet 4 on coding, surpasses it on some computer-use tasks'
      }
    ]
  },
  {
    month: 'November',
    releases: [
      { name: 'Claude Opus 4.5', company: 'anthropic', highlight: true },
      { name: 'Gemini 3 Pro', company: 'google', highlight: true },
      { name: 'Grok 4.1', company: 'xai' },
      { name: 'Kimi K2 Thinking', company: 'moonshot' }
    ],
    events: [
      {
        type: 'milestone',
        title: 'Opus 4.5 - Most Advanced Claude',
        description: 'Anthropic\'s largest and most intelligent model with enhanced reasoning and creativity'
      },
      {
        type: 'competition',
        title: 'OpenAI "Code Red"',
        description: 'Gemini 3 Pro wins 19/20 benchmarks, 41% on Humanity\'s Last Exam (vs OpenAI 31.64%)'
      },
      {
        type: 'ecosystem',
        title: 'MCP 1-Year Anniversary',
        description: '97M+ monthly SDK downloads, 2,000+ servers - context engineering infrastructure matures'
      },
      {
        type: 'tooling',
        title: 'Memory Tool Beta',
        description: 'Anthropic releases Memory Tool - 39% agent performance improvement, 84% token reduction in long tasks'
      },
      {
        type: 'capability',
        title: 'Automatic Tool Selection',
        description: 'Kimi K2 Thinking auto-selects 200-300 tools per task, reducing human intervention'
      },
      {
        type: 'acquisition',
        title: 'OpenAI Acquires Windsurf',
        description: 'OpenAI acquires Codeium\'s Windsurf IDE - consolidation in AI coding tools market'
      }
    ]
  },
  {
    month: 'December',
    releases: [
      { name: 'Gemini 3 Flash', company: 'google', highlight: true },
      { name: 'GPT-5.2', company: 'openai', highlight: true },
      { name: 'GPT-5.2-Codex', company: 'openai' }
    ],
    events: [
      {
        type: 'governance',
        title: 'MCP → Linux Foundation',
        description: 'Anthropic donates MCP to AAIF, co-founded with Block and OpenAI - vendor-neutral governance'
      },
      {
        type: 'scale',
        title: '10,000+ Public MCP Servers',
        description: 'Protocol ecosystem reaches massive scale with 75+ connectors in Claude directory'
      },
      {
        type: 'paradigm',
        title: 'Context Engineering Matures',
        description: 'Gartner predicts context engineering becomes foundational to enterprise AI within 12-18 months'
      },
      {
        type: 'security',
        title: 'React CVE Discovery',
        description: 'GPT-5.2-Codex discovers CVE-2025-55182 vulnerability - AI-powered security research'
      },
      {
        type: 'upcoming',
        title: 'Grok 4.20 Announced',
        description: 'Expected in 3-4 weeks with major improvements in tool use and language generalization'
      }
    ]
  }
]

// Year statistics for finale
export const yearStats = {
  modelReleases: '50+',
  swebenchProgress: '50% → 82%',
  mcpServers: '10,000+',
  largestCluster: '200,000 GPUs',
  cheapestTraining: '$4.6M'
}
