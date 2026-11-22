# pranav3705.github.io

Personal profile site of Pranav Konreddy, Data Engineer. Live at https://pranav3705.github.io

## Pages

- `/` profile
- `/progress/` public job-search progress (aggregate counts only)

## Refreshing the progress numbers

```bash
python3 scripts/update_progress.py
git add progress/stats.json && git commit -m "Update progress stats" && git push
```

The script reads the private tracker CSV (never committed) and writes only
aggregate counts to `progress/stats.json`. Pass `--as-of YYYY-MM-DD` to pin the date.
