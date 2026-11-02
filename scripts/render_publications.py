#!/usr/bin/env python3
"""Render curated publications into index.html; no network or dependencies needed."""
from __future__ import annotations

import argparse
import html
import json
import re
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
START = "<!-- PUBLICATIONS:START -->"
END = "<!-- PUBLICATIONS:END -->"


def escape(value: object) -> str:
    return html.escape(str(value), quote=True)


def https_url(value: str) -> str:
    parsed = urlparse(value)
    if parsed.scheme != "https" or not parsed.netloc:
        raise ValueError(f"Expected an HTTPS resource URL: {value}")
    return escape(value)


def render(publications: list[dict]) -> str:
    selected = sorted(
        (p for p in publications if p.get("selected_order") is not None),
        key=lambda p: p["selected_order"],
    )
    ids = [p["id"] for p in selected]
    if len(ids) != len(set(ids)) or any(not re.fullmatch(r"[a-z0-9-]+", id_) for id_ in ids):
        raise ValueError("Publication IDs must be unique lowercase slugs")
    articles = []
    for p in selected:
        authors = escape(p["authors"]).replace("Yunhao Feng", "<strong>Yunhao Feng</strong>")
        links = "\n".join(
            f'              <a href="{https_url(link["url"])}" aria-label="{escape(link["label"])}: {escape(p["title"])}">{escape(link["label"])}</a>'
            for link in p["links"]
        )
        articles.append(f'''          <article class="publication" id="{p["id"]}" aria-labelledby="{p["id"]}-title">
            <span class="pub-venue">{escape(p["venue"])}</span>
            <h3 class="pub-title" id="{p["id"]}-title"><a href="{https_url(p["url"])}">{escape(p["title"])}</a></h3>
            <p class="pub-authors">{authors}</p>
            <p class="pub-summary" data-zh="{escape(p["highlight_zh"])}">{escape(p["highlight"])}</p>
            <div class="pub-links">
{links}
            </div>
          </article>''')
    return "\n".join(articles)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Fail if generated HTML is stale")
    args = parser.parse_args()
    publications = json.loads((ROOT / "data/publications.json").read_text(encoding="utf-8"))
    page_path = ROOT / "index.html"
    page = page_path.read_text(encoding="utf-8")
    if page.count(START) != 1 or page.count(END) != 1:
        raise ValueError("Expected exactly one pair of publication markers")
    before, tail = page.split(START)
    _, after = tail.split(END)
    updated = before + START + "\n" + render(publications) + "\n" + END + after
    if args.check:
        if page != updated:
            print("Publications are stale. Run python scripts/render_publications.py")
            return 1
        print("Static publications match the curated data.")
    else:
        page_path.write_text(updated, encoding="utf-8")
        print("Rendered selected publications into index.html")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
