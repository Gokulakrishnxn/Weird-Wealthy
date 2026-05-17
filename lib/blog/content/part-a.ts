import type { PostContent } from "@/lib/blog/post-content-types";

export const partA: Record<string, PostContent> = {
  "design-systems-that-scale": [
    {
      type: "paragraph",
      text: "A design system is not a UI kit. It is the agreement your organization makes about how products should look, behave, and evolve—backed by tokens, components, and ownership. When teams confuse the artifact for the system, they get pretty libraries that still fragment in production. Scaling means building structures that reduce decision fatigue without freezing creative work.",
    },
    {
      type: "heading",
      level: 2,
      text: "From tokens to components that behave",
    },
    {
      type: "paragraph",
      text: "Start with semantic tokens—color, typography, spacing, elevation, motion—not literal names tied to a single screen. Semantic tokens describe intent (\"surface elevated\", \"text on inverse\") so themes, brands, and dark mode can remap without rewriting components. Pair tokens with clear component APIs: explicit variants, predictable slots, and documented states (hover, focus, disabled, loading, error).",
    },
    {
      type: "list",
      items: [
        "Define naming and versioning for tokens before you ship the first component library.",
        "Treat accessibility as a contract: contrast, focus rings, and motion preferences are not optional polish.",
        "Document decisions in decision logs, not only in Figma—code is the source of truth for behavior.",
        "Establish a contribution model so teams can propose changes without forking the system.",
      ],
    },
    {
      type: "callout",
      title: "Scaling is governance",
      text: "The bottleneck is rarely Figma organization. It is unclear ownership, missing review gates, and teams shipping one-off patterns because the system did not cover their edge case. Give system maintainers time to merge feedback from product work back into the library.",
    },
    {
      type: "heading",
      level: 2,
      text: "Measuring adoption and evolution",
    },
    {
      type: "paragraph",
      text: "Track usage in code—imports, variant frequency, and deprecated pattern drift—not vanity metrics like library downloads. Run regular audits against product screens; when the same bespoke layout appears twice, ask whether it belongs in the system or needs a stronger primitive. Deprecate with timelines and codemods when possible so teams are not trapped on legacy APIs.",
    },
    {
      type: "quote",
      text: "A good design system makes the default path the correct path. A great one learns from products and updates itself without breaking trust.",
      attribution: "Practice note from large product teams",
    },
    {
      type: "paragraph",
      text: "Finally, invest in education: short workshops, office hours, and example compositions teach teams how to assemble experiences rather than memorize variants. When designers and engineers share vocabulary, reviews become faster, and the system compounds instead of rotting in the corner of a file.",
    },
  ],

  "psychology-of-color-in-ui": [
    {
      type: "paragraph",
      text: "Color is not decoration; it is a perceptual shorthand. In UI, people infer meaning from hue, saturation lightness relationships, and surrounding context long before they read labels. Designers who ignore psychology still ship interfaces—but those interfaces fight users with accidental alarm states, muddy hierarchies, and emotional tones that contradict the product promise.",
    },
    {
      type: "heading",
      level: 2,
      text: "Association, culture, and contrast",
    },
    {
      type: "paragraph",
      text: "Warm colors draw attention and can signal urgency or energy; cool colors often recede and feel calm. Cultural context matters as much as cone biology: red may read as prosperity in one market and danger in another. Always validate palette choices with localized research when your audience is global. Regardless of hue, contrast against adjacent surfaces drives legibility—WCAG is a floor, not the ceiling for comfortable reading.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Reserve saturated accents for primary actions and critical alerts so they retain signaling power.",
        "Use neutrals for dense information; let chroma mark hierarchy rather than painting every block.",
        "Pair color with text, icons, or patterns so states remain understandable for color-vision deficiencies.",
        "Test palettes in dark and light themes; identical hex values rarely preserve perceived weight.",
      ],
    },
    {
      type: "callout",
      title: "Emotion follows relationship",
      text: "Users do not react to a single swatch—they react to families of color, whitespace, and motion. A calming blue surrounded by clutter still feels stressful. Design the whole atmosphere, then tune individual tokens.",
    },
    {
      type: "heading",
      level: 2,
      text: "Color in conversion and trust",
    },
    {
      type: "paragraph",
      text: "Calls to action benefit from clarity more than novelty. When every button screams with high-chroma gradients, nothing stands out. For trust-heavy flows—finance, health, identity—understated palettes often outperform flashy ones because they read as stable. Measure completion rates and error recovery after palette changes; small shifts in lightness can alter perceived affordance more than changing the hue.",
    },
    {
      type: "heading",
      level: 3,
      text: "A practical heuristic",
    },
    {
      type: "paragraph",
      text: "Name roles, not ingredients: \"primary interactive\" instead of \"brand purple\". That keeps psychology and accessibility tied to function. When marketing refreshes brand color, your UI adapts by remapping roles—not by hunting down hundreds of hard-coded fills.",
    },
    {
      type: "quote",
      text: "If users must decode your color system, it is already failing. Color should clarify, not puzzle.",
      attribution: "Common critique in UX research sessions",
    },
  ],

  "designing-with-ai-tools": [
    {
      type: "paragraph",
      text: "AI assistants, image generators, and code copilots arrived as novelty toys and are settling into everyday design workflows. The productive teams are not the ones prompting random beauty shots—they are integrating AI where uncertainty is high: divergent exploration, copy iteration, component scaffolding, and test content generation. The craft is learning when to let models speed you up and when to insist on human judgment.",
    },
    {
      type: "heading",
      level: 2,
      text: "Where AI helps most today",
    },
    {
      type: "paragraph",
      text: "Early ideation benefits from breadth. Large language models can propose user flows, empty states, and microcopy variants faster than a blank page allows. Visual models help mood-board textures and lighting for marketing surfaces, not final production assets. In code-forward design systems, copilots accelerate boilerplate—storybook stubs, accessibility props, and test harnesses—if you review output like any junior collaborator's PR.",
    },
    {
      type: "list",
      items: [
        "Write briefs with constraints: audience, tone, brand guardrails, and what \"done\" means for that artifact.",
        "Keep humans on decisions that need accountability: consent patterns, pricing, medical claims, and inclusive language.",
        "Version prompts and store winning templates so the team shares patterns, not superstitions.",
        "Treat generated UI as disposable until it passes the same critique bar as handcrafted work.",
      ],
    },
    {
      type: "callout",
      title: "Watch for generic aesthetics",
      text: "Models converge on statistically likely layouts—same gradients, same hero proportions. Counter that by anchoring prompts to your tokens, real content, and brand asymmetry. The goal is acceleration with identity, not interchangeable SaaS chrome.",
    },
    {
      type: "heading",
      level: 2,
      text: "Workflow design, not vibes",
    },
    {
      type: "paragraph",
      text: "Introduce AI at handoff boundaries with clear artifacts: annotated frames, acceptance criteria, and regression checks. Designers who pair with engineers on generated code catch motion and focus issues early; solo heroics with exported snippets create night-shift bugs. Schedule critiques centered on user outcomes, not tool novelty. The tools will churn; skills in taste, systems thinking, and evidence will not.",
    },
    {
      type: "quote",
      text: "AI in design is delegation, not absolution. You still own the experience users receive.",
      attribution: "Design ops leads, recurring refrain",
    },
    {
      type: "paragraph",
      text: "As capabilities grow—multi-modal context, design-tool plugins, automated accessibility scans—keep a ledger of what improved velocity versus what introduced rework. That honest postmortem is how teams avoid swinging from euphoria to cynicism and instead land on sustainable hybrid workflows.",
    },
  ],

  "dark-mode-done-right": [
    {
      type: "paragraph",
      text: "Dark mode is not an inverted light theme. Slapping #000 backgrounds under light-theme components produces halation, crushed shadows, and neon accents that fatigue eyes. Done well, dark interfaces feel calm, legible, and materially consistent—surfaces step gently in lightness, borders exist without glowing, and photography sits naturally in the scene.",
    },
    {
      type: "heading",
      level: 2,
      text: "Surfaces, elevation, and borders",
    },
    {
      type: "paragraph",
      text: "Use layered neutrals instead of pure black unless your brand truly demands OLED ink. Each elevation level should nudge lightness upward slightly so cards lift off the canvas the way they do in daylight themes, only reversed. Outlines often replace drop shadows: subtle dividers keep dense tables scannable without muddying the background stack.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Desaturate large fields of color; high chroma on dark fills vibrate at the edges.",
        "Test graphs, maps, and heatmaps with your dark palette; default scientific greens and reds may fail together.",
        "Offer manual, system, and scheduled modes; respect prefers-color-scheme but never trap power users.",
        "Check focus indicators: blue rings on charcoal need more contrast than on white.",
      ],
    },
    {
      type: "callout",
      title: "Semantic tokens pay off",
      text: "If every component consumes roles like \"surface/base\" and \"border/subtle\", theme switching becomes a remap, not a redesign. Hard-coded hex spread across components guarantees inconsistent dark mode.",
    },
    {
      type: "heading",
      level: 2,
      text: "Content, imagery, and motion",
    },
    {
      type: "paragraph",
      text: "Marketing photography with baked-in white matting looks amateur in dark layouts; use transparent assets or subtle scrims. Illustrations may need a second stroke or inner highlight to preserve silhouette. Motion should ease in opacity and distance rather than flashing full-screen white modals that blind nighttime readers.",
    },
    {
      type: "heading",
      level: 3,
      text: "Shipping with confidence",
    },
    {
      type: "paragraph",
      text: "Run side-by-side usability sessions: same tasks, both themes, same content. Errors, time-on-task, and subjective comfort tell you more than Lighthouse scores. Iterate on charts, banners, and empty states where color meaning often hides until real data appears.",
    },
    {
      type: "quote",
      text: "Dark mode succeeds when users forget they toggled it—everything simply feels appropriately lit.",
      attribution: "Product designer interview summary",
    },
  ],

  "figma-hacks-for-power-users": [
    {
      type: "paragraph",
      text: "Figma rewards muscle memory. The difference between intermediate and power use is rarely plugins—it is structured libraries, consistent naming, keyboard fluency, and batch workflows that keep you inside design instead of fighting the canvas. These habits compound when your team adopts them together.",
    },
    {
      type: "heading",
      level: 2,
      text: "Speed on the canvas",
    },
    {
      type: "paragraph",
      text: "Learn selection shortcuts deeply: deep select, swap instance, and paste-to-replace save hours when refactoring components. Use auto layout everywhere a component might resize; fixed frames are debt. Embrace component properties and variant boolean toggles instead of duplicating near-identical frames—future you updates once, not forty times.",
    },
    {
      type: "list",
      items: [
        "Cmd/Ctrl + / to jump commands; star your top five so muscle memory builds faster.",
        "Alt-drag to duplicate in place; Option-Shift for constrained duplication grids.",
        "Rename layers in bulk with Rename It or native regex-style patterns before publishing.",
        "Use library analytics to retire zombie components nobody instantiates.",
      ],
    },
    {
      type: "callout",
      title: "File hygiene matters",
      text: "A sprawling page without cover thumbnails and without status labels turns every handoff into archaeology. Co-locate specs, prototype links, and changelog notes adjacent to the published frames stakeholders actually open.",
    },
    {
      type: "heading",
      level: 2,
      text: "Systems, variables, and handoff",
    },
    {
      type: "paragraph",
      text: "Align variable collections with engineering tokens: same names, documented scales, modes for brand themes. Prototype with simple interactive components—overbuilt demos rot quickly. When exporting for engineering, prefer annotations in Dev Mode over guessing from hidden layers.",
    },
    {
      type: "quote",
      text: "If your component set is clean but your file is chaos, velocity leaves with your vacation coverage.",
      attribution: "Design systems Slack channel, paraphrased",
    },
    {
      type: "paragraph",
      text: "Teach shortcuts in five-minute clinics rather than marathon training decks; teams adopt what reduces friction immediately. Revisit your personal toolkit quarterly—Figma ships fast, and a feature you ignored last month may replace a brittle workaround today.",
    },
  ],

  "future-of-ui-animation": [
    {
      type: "paragraph",
      text: "UI animation is leaving the era of gratuitous bounce and entering one governed by performance budgets, accessibility preferences, and cross-platform design systems. The near future belongs to motion that explains causality—what changed, where attention should go, and how state relates—without hijacking the user's sense of control.",
    },
    {
      type: "heading",
      level: 2,
      text: "From effects to semantic motion",
    },
    {
      type: "paragraph",
      text: "Design tools increasingly export motion specs alongside tokens: duration scales, easing curves, and choreography rules that engineers can implement consistently in SwiftUI, Jetpack Compose, and the web. Teams will treat interruptible transitions as first-class, knowing users navigate away mid-animation on slow networks.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Honor prefers-reduced-motion with instant or cross-fade alternatives, not silent removal of critical feedback.",
        "Prefer transform and opacity for performance; reserve blur and shadow animations for sparse moments.",
        "Document \"entrance\", \"emphasis\", and \"exit\" recipes so product teams do not invent new physics weekly.",
        "Prototype with real content density; motion that works on marketing hero screens often fails in data tables.",
      ],
    },
    {
      type: "callout",
      title: "AI-assisted, human-approved",
      text: "Generative tools will propose transition presets from prompts or recording, but designers still arbitrate brand character—whether your product feels brisk, plush, or clinical. Automate grunt work, not taste.",
    },
    {
      type: "heading",
      level: 2,
      text: "2025 and beyond",
    },
    {
      type: "paragraph",
      text: "Spatial and multimodal interfaces push motion into depth, parallax within reason, and shared scene understanding between hand, voice, and pointer. Live collaboration will expose motion bugs earlier—multiple cursors catching jitter that solo designers miss. Expect tighter coupling between analytics and motion: teams will A/B test micro-interactions where stakes warrant, not by default.",
    },
    {
      type: "heading",
      level: 3,
      text: "Staying adaptive",
    },
    {
      type: "paragraph",
      text: "The durable skill is articulating why a transition exists. When you can map each animation to user comprehension or feedback, tooling churn matters less—new export formats plug into the same rationale.",
    },
    {
      type: "quote",
      text: "Motion should feel inevitable. If users notice the animation before the outcome, dial it back.",
      attribution: "Motion guidelines workshop takeaway",
    },
  ],
};
