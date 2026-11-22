#!/usr/bin/env python3
"""Regenerate progress/stats.json for the public progress page.

Reads the private application tracker CSV and writes ONLY aggregate counts:
applications today / this week / this month, total submitted, interviews, and
per-day application counts. No company names, job IDs, pay, recruiters, notes
or any other row-level field ever leaves the CSV.

Usage:
  python3 scripts/update_progress.py [--csv PATH] [--as-of YYYY-MM-DD]
"""
import argparse
import csv
import json
import os
from collections import Counter
from datetime import date, timedelta

DEFAULT_CSV = os.path.expanduser("~/Desktop/claude/agency/tracker/application_tracker.csv")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "progress", "stats.json")
NO_INTERVIEW = {"", "none", "n/a", "na", "no", "-"}


def parse_day(value):
    value = (value or "").strip()[:10]
    try:
        return date.fromisoformat(value)
    except ValueError:
        return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", default=DEFAULT_CSV)
    ap.add_argument("--as-of", default=None, help="date to count from (default: today)")
    args = ap.parse_args()
    as_of = date.fromisoformat(args.as_of) if args.as_of else date.today()
    week_start = as_of - timedelta(days=as_of.weekday())  # Monday

    with open(args.csv, newline="", encoding="utf-8") as fh:
        rows = list(csv.DictReader(fh))

    submitted = [r for r in rows if (r.get("Application status") or "").strip().upper() == "SUBMITTED"]
    days = [d for d in (parse_day(r.get("Application date")) for r in submitted) if d and d <= as_of]
    per_day = Counter(days)
    interviews = sum(
        1 for r in rows if (r.get("Interview status") or "").strip().lower() not in NO_INTERVIEW
    )

    stats = {
        "as_of": as_of.isoformat(),
        "today": per_day.get(as_of, 0),
        "this_week": sum(n for d, n in per_day.items() if d >= week_start),
        "this_month": sum(n for d, n in per_day.items() if d.year == as_of.year and d.month == as_of.month),
        "total_applications": len(submitted),
        "interviews": interviews,
        "daily": [{"date": d.isoformat(), "applications": per_day[d]} for d in sorted(per_day, reverse=True)],
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(stats, fh, indent=2)
        fh.write("\n")
    print(json.dumps({k: v for k, v in stats.items() if k != "daily"}))


if __name__ == "__main__":
    main()
