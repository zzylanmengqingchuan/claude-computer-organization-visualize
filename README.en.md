# co-visualize

[中文](README.md)

A Claude Code Skill that distills visualization capability into interactive teaching pages for **Computer Organization and Architecture** — one of the four subjects in China's graduate entrance exam (408). Designed for students who lack a hardware background, such as software engineering majors.

## Demo

[From the Principle of Locality to Three Mapping Strategies, Replacement Algorithms, and Write Policies](https://dkfile.istester.com/zzy/cache_overview.html)

Memory hierarchy:

![image-20260503212742160](https://zzy-1326340203.cos.ap-beijing.myqcloud.com//image-20260503212742160.png?imageSlim)

Cache internal structure:

![image-20260503212818882](https://zzy-1326340203.cos.ap-beijing.myqcloud.com//image-20260503212818882.png?imageSlim)

Direct mapping:

![image-20260503212919983](https://zzy-1326340203.cos.ap-beijing.myqcloud.com//image-20260503212919983.png?imageSlim)

Step-by-step animation:

![image-20260503212939890](https://zzy-1326340203.cos.ap-beijing.myqcloud.com//image-20260503212939890.png?imageSlim)

## Features

- Generate complete interactive HTML teaching pages (single file, no external dependencies)
- Multiple input scenarios: PDF/textbook explanations, topic animations, instruction/address sequence visualization, concept comparison
- Built-in CSS skeleton (with dark mode) and five JS animation templates
- SVG hardware component diagrams + bit-level register views + pipeline timing tables + step-by-step animations
- Covers all seven chapters of 408 Computer Organization: Overview, Data Representation, Memory Systems, Instruction Set, CPU, Bus, I/O

## Topics Covered

| Chapter | Typical Visualizations |
|---|---|
| Data Representation | Two's complement, IEEE 754 floating point bit-field animations |
| Memory Systems | Cache mapping (direct/associative/set-associative), LRU replacement, virtual address translation |
| Instruction Set | Seven addressing modes diagrams, opcode extension |
| CPU | 5-stage pipeline timing diagram, data hazard stall demo, datapath SVG |
| Bus | Three arbitration schemes, synchronous/asynchronous timing |
| I/O System | DMA transfer flow animation, interrupt handling timeline |

## Installation

```bash
npx skills add L0dyv/claude-algo-visualize
```

Or manually clone to your Claude Code skills directory:

```bash
git clone https://github.com/L0dyv/claude-algo-visualize.git ~/.claude/skills/co-visualize
```

## Structure

```
co-visualize/
├── SKILL.md                  # Skill definition: iron laws, template selection guide, topic coverage
├── assets/
│   ├── base.css              # CSS skeleton (dark mode, pipeline table, bit-level register styles)
│   ├── boilerplate.js        # JS templates (A: binary tree / B: custom coords / C: array / D: pipeline / E: bit-level)
│   └── animation-html.html   # HTML animation skeletons (5 variants, incl. CO-specific structures 4 & 5)
└── references/
    └── cache_overview.html   # Full reference: Cache memory overview (452 lines)
```

## Usage

The skill activates automatically when you ask Claude Code to:

- Generate a teaching page from a PDF or textbook
- Create an animation for a topic (e.g., "demonstrate pipeline data hazards")
- Visualize an instruction sequence or memory access pattern step by step
- Compare two concepts (e.g., "direct mapping vs. set-associative", "interrupt vs. DMA")

## Acknowledgments

This project thanks the [Linux.do](https://linux.do) community for promoting open-source sharing.
