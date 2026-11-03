# Yunhao Feng · Academic Homepage

A responsive, bilingual academic homepage for [yunhao-feng.github.io](https://yunhao-feng.github.io/), with a layout inspired by [Ziyang Chen’s homepage](https://czy1999.github.io/). The design uses a compact profile sidebar, readable body text, and conventional publication entries with bracketed resource links.

## Preview

Open `index.html` directly in a browser. The page, publications, and language switch work without a build step or network API.

For an HTTP preview, run:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8765/`.

## Edit

- `index.html`: biography, news, experience, education, service, and awards.
- `styles.css`: desktop, mobile, and print styles. System fonts avoid external font requests.
- `script.js`: Chinese translations and the language preference.
- `data/publications.json`: publication metadata and verified resource links.
- `resume/Photo.png`: profile portrait.

Only publications with a `selected_order` appear on the homepage. The selected order is SkillTrojan, AgentHazard, BackdoorAgent, JAIL, and PaperAsk. Other entries remain in the data file.

After editing publication data, CSS, or JavaScript, regenerate the static HTML:

```sh
python scripts/render_publications.py
python scripts/render_publications.py --check
node --check script.js
```

Generated articles are between the `PUBLICATIONS:START` / `PUBLICATIONS:END` comments. Edit their JSON source instead of the generated HTML. All primary content is available without JavaScript. The renderer also adds content-based version parameters to CSS and JavaScript URLs to prevent stale browser assets after a deployment.

The existing scheduled Scholar workflow refreshes citation metadata and renders the curated selection. It preserves manually curated venues, years, links, and order; newly discovered papers are not automatically selected.

## Content notes (2026-11-03)

- News records the owner-confirmed 2026 acceptances: Findings of ACL × 1, ICML × 2, ACM Multimedia × 1, NeurIPS × 1, and WWW × 1. Exact acceptance months were not supplied, so the page shows the year only.
- The NeurIPS paper is [ShadowFPT](https://arxiv.org/abs/2610.22871). The two ICML papers are SkillTrojan and [FakeWorld 1.0](https://proceedings.mlr.press/v306/gao26g.html). News intentionally omits paper titles.
- Research experience follows the supplied résumé: Fudan visiting student first, followed by Ant Group, Alibaba Future Living Lab, and JD Explore Academy.
- Service and the four highlighted awards follow the owner's supplied list, including ACL ARR, TCSVT, IJMIR, and the 2024 NUDT National Defense Science and Technology Scholarship. Qingyun and KStar dates were not supplied and are not inferred.
- JAIL is labelled “Accepted 2026” to reflect the résumé; its publisher assigns the article to volume 333 (January 2027).
- Per the owner's preference, neither JAIL nor PaperAsk has a Code link. Data links are shown only for verified public releases.

## Publication sources

- SkillTrojan: [paper](https://arxiv.org/abs/2604.06811), [official repository](https://github.com/Yunhao-Feng/SkillTrojan).
- AgentHazard: [paper](https://arxiv.org/abs/2604.02947), [official repository](https://github.com/Yunhao-Feng/AgentHazard), [dataset](https://huggingface.co/datasets/Yunhao-Feng/AgentHazard).
- BackdoorAgent: [ACL Anthology](https://aclanthology.org/2026.findings-acl.791/), [official repository](https://github.com/Yunhao-Feng/BackdoorAgent).
- JAIL: [publisher DOI](https://doi.org/10.1016/j.eswa.2026.133684).
- PaperAsk: [paper](https://arxiv.org/abs/2510.22242), [benchmark data](https://github.com/wuyoscar/PaperAsk/tree/main/test_cases). Its repository distinguishes released data from evaluation code that is not yet released.

## Deployment

This remains a buildless GitHub Pages site. Publish the updated source to the existing homepage repository; no Sites hosting registration or new platform is required.

