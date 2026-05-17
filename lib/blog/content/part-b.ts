import type { PostContent } from "@/lib/blog/post-content-types";

export const partB: Record<string, PostContent> = {
  "designing-for-mobile-first": [
    {
      type: "paragraph",
      text: "Mobile-first is not just a layout discipline; it is a way to force clarity before complexity. When you start with a narrow viewport, every pixel asks for a reason to exist, and that discipline scales surprisingly well into AI-assisted workflows where generated screens can sprawl if you never defined constraints up front.",
    },
    {
      type: "heading",
      level: 2,
      text: "Start with constraints, not components",
    },
    {
      type: "paragraph",
      text: "Before you open a design tool or prompt an assistant, write the non-negotiables: primary task, critical data, and the single next action you want someone to take. Mobile-first succeeds when those answers are short enough to fit above the fold without scrolling, which also makes them legible for large-language-model suggestions that tend to mirror whatever context you give them.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Define one primary user goal per screen so responsive stacks do not become a junk drawer of secondary features.",
        "Specify touch targets and spacing before typography scales, because thumb reach beats aesthetic novelty on real devices.",
        "Prototype the slow-network case early; AI can help suggest skeleton states once you name the loading sequence clearly.",
      ],
    },
    {
      type: "quote",
      text: "If you cannot explain the screen in one breath, you are not ready to scale it to desktop.",
      attribution: "Common studio mantra among mobile leads",
    },
    {
      type: "heading",
      level: 2,
      text: "Partner with AI without inheriting its bad habits",
    },
    {
      type: "heading",
      level: 3,
      text: "Ground the model in real usage",
    },
    {
      type: "paragraph",
      text: "Feed assistants your breakpoints, grid rules, and content hierarchy as structured notes rather than screenshots alone. Models mirror patterns they have seen; your job is to redirect that pattern-matching toward your performance budget and accessibility requirements instead of toward decorative density.",
    },
    {
      type: "callout",
      title: "Practical check",
      text: "Export a quick thumb-reach overlay on your smallest frame. If critical actions sit in the hard-to-reach top corners, revise before you generate alternative layouts—the issue is structural, not cosmetic.",
    },
    {
      type: "paragraph",
      text: "Finish by testing on hardware that actually ships: mid-range phones, not just the flagship on your desk. Mobile-first design ages well when the experience still feels intentional on a warm device with spotty signal, because that is where most of the world meets your product.",
    },
  ],

  "minimalism-vs-maximalism": [
    {
      type: "paragraph",
      text: "Finance products live or die on whether people trust what they see. Minimalism whispers reassurance through calm hierarchy and generous whitespace; maximalism can signal sophistication or urgency—but only when every extra layer supports comprehension rather than decoration. The decision is less a vibe and more a clarity contract with people who are often stressed about money.",
    },
    {
      type: "heading",
      level: 2,
      text: "Minimalism as financial focus",
    },
    {
      type: "paragraph",
      text: "A minimal interface removes competing stories so a person can answer one question at a time: balance, burn rate, payment due, risk. That restraint maps directly to brand clarity because the product feels like it respects cognitive load the same way a good advisor speaks plainly before offering options.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Name the primary number on each screen before adding charts; let supporting visuals earn their place.",
        "Use motion sparingly so confirmation states—transfers, approvals, disclosures—read as deliberate, not playful.",
        "Mirror the same verbal tone in UI copy and marketing pages so the brand does not feel frugal in-product and loud out-of-product.",
      ],
    },
    {
      type: "quote",
      text: "Wealth interfaces should feel orderly before they feel impressive.",
      attribution: "Paraphrased from a fintech design review brief",
    },
    {
      type: "heading",
      level: 2,
      text: "Maximalism that still builds trust",
    },
    {
      type: "heading",
      level: 3,
      text: "Density without chaos",
    },
    {
      type: "paragraph",
      text: "Some trading, business banking, and analytics surfaces need simultaneous data. Maximalism works when grids, badges, and sparklines align to a strict modular rhythm—users scan for anomalies, not inspiration. Brand clarity then comes from consistent iconography and predictable color semantics, not from removing every secondary metric.",
    },
    {
      type: "callout",
      title: "Pick one north star",
      text: "If your roadmap tries to be the calmest money app and the most data-rich terminal at once, neither narrative will land. Choose which anxiety you are reducing, then design density around that promise.",
    },
    {
      type: "paragraph",
      text: "Audit both extremes against support tickets, not aesthetics alone. The right philosophy is whichever lets people complete money tasks with fewer doubts—and the brand language that follows should simply reinforce that outcome.",
    },
  ],

  "microinteractions-that-delight": [
    {
      type: "paragraph",
      text: "In fintech, delight is often mistrusted—and rightly so—because cute animation has preceded many hidden fees. The microinteractions that earn loyalty are the small confirmations that money moved safely, eligibility updated correctly, or a dispute was received. They are the tactile proof that the system is listening.",
    },
    {
      type: "heading",
      level: 2,
      text: "Trust comes before delight",
    },
    {
      type: "paragraph",
      text: "Prioritize feedback that explains state: pending, posted, failed, and why. A successful toggle, checkbox, or biometric success animation should land within milliseconds and announce the outcome to assistive technologies with equal clarity. When those basics are solid, a subtle easing curve or haptic tap reads as polish instead of misdirection.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Pair every celebratory animation with plain-language status text; motion should never be the sole confirmation of value.",
        "Use consistent easing for destructive and constructive actions so muscle memory transfers across flows.",
        "Limit looping motion near balances and disclosures; repetition reads like distraction in regulated contexts.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Moments that feel human without feeling cute",
    },
    {
      type: "quote",
      text: "If a user smiles because they understand, that is the only fireworks you needed.",
      attribution: "UX research synthesis note",
    },
    {
      type: "paragraph",
      text: "Signature sounds, staggered reveals on success, and contextual illustrations can humanize fintech brands, but they should echo the same restraint you apply to color: enough to signal care, never enough to obscure numbers. Test with people who recently had a declined payment; their read of the interaction is the honest bar.",
    },
    {
      type: "callout",
      title: "Measure the right smile",
      text: "Track task completion time, error recovery, and repeat usage—not just satisfaction scores. Delightful microinteractions reduce anxiety when those metrics improve together.",
    },
    {
      type: "heading",
      level: 3,
      text: "Handoff to engineering",
    },
    {
      type: "paragraph",
      text: "Document durations, reduced-motion fallbacks, and loading edge cases alongside your prototypes. Trustworthy UX is a cross-functional promise; microinteractions degrade fast when engineering receives only a video loop without specifications.",
    },
  ],

  "typography-that-speaks": [
    {
      type: "paragraph",
      text: "Your type system is the voice people hear before they read a single word you wrote. For personal brands—consultants, founders, independent creatives—that voice needs to sound like you on a great day: clear, confident, and consistent across the site, PDFs, slides, and email.",
    },
    {
      type: "heading",
      level: 2,
      text: "Choose a voice, then a typeface",
    },
    {
      type: "paragraph",
      text: "Start with adjectives that describe how you want to be remembered after a thirty-second scan: surgical, warm, editorial, technical. Narrow to two families at most for the public layer: one for headlines that carry personality and one for body text that prioritizes legibility across devices and print.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Set a modular scale so hierarchy is obvious at a glance; your H2 should feel related to body copy, not like a different brand.",
        "Limit stylistic alternates in logos and hero treatments only; unusual ligatures in paragraphs can undermine authority.",
        "Test on low-resolution screens and in grayscale to ensure your brand still reads when color is removed.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Pairing and rhythm",
    },
    {
      type: "heading",
      level: 3,
      text: "Let whitespace do the talking",
    },
    {
      type: "paragraph",
      text: "Personal branding typography fails when everything is bold. Reserve weight jumps for the ideas you want quoted later. Generous line height and measured line length signal that you are not rushing the reader, which paradoxically makes busy professionals more willing to stay.",
    },
    {
      type: "quote",
      text: "The font is not your personality; the decisions you make with it are.",
      attribution: "Brand studio critique",
    },
    {
      type: "callout",
      title: "License and longevity",
      text: "Buy fonts properly and track where they are embedded. A personal brand compounds when you are not forced into an emergency re-skin because a trial expired.",
    },
    {
      type: "paragraph",
      text: "Document your type rules in a one-page cheatsheet: sizes, weights, tracking for all caps, and forbidden combinations. Consistency is how strangers recognize your work in the wild, from a LinkedIn carousel to a keynote deck.",
    },
  ],

  "accessibility-beyond-compliance": [
    {
      type: "paragraph",
      text: "Compliance with standards is the floor, not the ceiling. For personal brands—especially coaches, educators, and public voices—accessible design is part of the promise you make about who you welcome into your community. People notice when captions exist, when contrast holds on sunny days, and when focus outlines are not hidden for aesthetics.",
    },
    {
      type: "heading",
      level: 2,
      text: "Design for real bodies and real contexts",
    },
    {
      type: "paragraph",
      text: "Keyboard paths, screen readers, and voice control are not edge cases; they are how many of your readers already navigate. Beyond WCAG checks, test with larger default text sizes, one-handed phone grips, and noisy rooms where transcripts beat polished video alone.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Write descriptive links instead of repeated “click here” phrases so navigation makes sense out of context.",
        "Caption and describe meaningful visuals; decorative flourishes should be marked as such for assistive tech.",
        "Offer content in more than one modality—text summaries beside video—without forcing extra steps to reach the core idea.",
      ],
    },
    {
      type: "quote",
      text: "Accessibility is hospitality encoded into layout.",
      attribution: "Inclusive design workshop takeaway",
    },
    {
      type: "heading",
      level: 2,
      text: "Brand trust grows when friction disappears",
    },
    {
      type: "paragraph",
      text: "A personal brand that bolts accessibility on at the end reads as performative. When your newsletter, course portal, and booking flow share predictable landmarks, people spend their energy on your ideas instead of decoding your interface.",
    },
    {
      type: "heading",
      level: 3,
      text: "Sustain the practice",
    },
    {
      type: "paragraph",
      text: "Schedule quarterly audits with fresh content, not only at launch. Automated scanners miss tone problems in alt text and broken heading order in long-form articles—exactly where personal brands publish most.",
    },
    {
      type: "callout",
      title: "Invite feedback",
      text: "Publish a short accessibility statement with a contact path. People willing to report barriers are doing you a favor; respond quickly and publicly note fixes when you ship them.",
    },
  ],

  "the-art-of-prototyping": [
    {
      type: "paragraph",
      text: "Prototyping is the gentle art of being wrong in cheap materials before you are wrong in production. In lifestyle brands—travel, wellness, food, home—prototypes test not only layout but mood: does this feel restorative, adventurous, or indulgent at the exact moment a tired person opens the app?",
    },
    {
      type: "heading",
      level: 2,
      text: "Match fidelity to the question",
    },
    {
      type: "paragraph",
      text: "Low fidelity answers sequencing and information priority. Mid fidelity tests rhythm, photography, and copy together. High fidelity belongs to the moment you need someone to react to pricing, membership perks, or a premium aesthetic without imagining gaps.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Start with paper or a single grayscale frame when the debate is still about what belongs on screen.",
        "Introduce real content early; lifestyle UX fails on lorem ipsum because emotion hides in specifics.",
        "Time-box critiques so debates return to user stories instead of personal taste spirals.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Make feedback feel like a shared hobby",
    },
    {
      type: "quote",
      text: "A prototype is an invitation to co-imagine, not a contract carved in marble.",
      attribution: "Product studio facilitator",
    },
    {
      type: "paragraph",
      text: "Share prototypes as scenarios—“Sunday evening trip planning,” “post-workout meal logging”—so stakeholders evaluate choices in context. Lifestyle products are judged in the margin between aspiration and effort; scenarios keep that margin visible.",
    },
    {
      type: "callout",
      title: "Know when to stop",
      text: "Polish removes ambiguity, but it also removes honesty. Stop refining when the next unknown is operational—inventory, staffing, fulfillment—not when the drop shadow still feels subjective.",
    },
    {
      type: "heading",
      level: 3,
      text: "Carry lessons into launch",
    },
    {
      type: "paragraph",
      text: "Archive prototype branches with notes about rejected directions. Lifestyle brands iterate seasonally; future you will thank present you for documenting why a breezy illustration style did not survive contact with real photography constraints.",
    },
  ],
};
