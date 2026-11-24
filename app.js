/* Everything on this page comes from the DATA block below; nothing is sent anywhere. */
(function () {
  'use strict';

  /* ---------- data ---------- */
  var DXC = 'DXC Technology', ICICI = 'ICICI Bank', ALL = 'AllState Solution', OWN = 'Personal project';

  // [name, category, where used, optional alias pattern for matching text]
  var SKILLS = [
    ['Python', 'Languages and engines', [DXC, ICICI, ALL, OWN]],
    ['SQL', 'Languages and engines', [DXC, ICICI, ALL, OWN]],
    ['PySpark', 'Languages and engines', [DXC, ICICI]],
    ['Spark SQL', 'Languages and engines', [DXC, ICICI]],
    ['Apache Spark', 'Languages and engines', [DXC, ICICI, ALL], 'apache spark|spark'],
    ['Azure Databricks', 'Azure', [DXC], 'databricks'],
    ['Delta Lake', 'Azure', [DXC], 'delta lake|delta tables?'],
    ['Databricks Auto Loader', 'Azure', [DXC], 'auto ?loader'],
    ['Azure Data Factory', 'Azure', [DXC], 'azure data factory|data factory|adf'],
    ['ADLS Gen2', 'Azure', [DXC], 'adls|azure data lake'],
    ['Unity Catalog', 'Azure', [DXC]],
    ['Azure SQL Database', 'Azure', [ALL], 'azure sql'],
    ['AWS Glue', 'AWS', [ICICI], 'glue'],
    ['Amazon S3', 'AWS', [ICICI, OWN], 's3'],
    ['Amazon EMR', 'AWS', [ICICI], 'emr'],
    ['Amazon Athena', 'AWS', [ICICI], 'athena'],
    ['Apache Iceberg', 'AWS', [ICICI], 'iceberg'],
    ['Snowflake', 'Snowflake and dbt', [OWN]],
    ['Snowpipe', 'Snowflake and dbt', [OWN]],
    ['Streams and tasks', 'Snowflake and dbt', [OWN], 'streams? (?:and|&) tasks?|snowflake streams?|snowflake tasks?'],
    ['Dynamic tables', 'Snowflake and dbt', [OWN], 'dynamic tables?'],
    ['dbt', 'Snowflake and dbt', [OWN], 'dbt|data build tool'],
    ['Apache Kafka', 'Streaming and GCP', [OWN], 'kafka'],
    ['Dataflow', 'Streaming and GCP', [OWN]],
    ['BigQuery', 'Streaming and GCP', [OWN], 'big ?query'],
    ['Pub/Sub', 'Streaming and GCP', [OWN], 'pub ?/? ?sub'],
    ['Cloud Storage', 'Streaming and GCP', [OWN], 'google cloud storage|cloud storage|gcs'],
    ['ETL/ELT pipelines', 'Data engineering', [DXC, ICICI, ALL, OWN], 'etl|elt'],
    ['CDC and incremental loads', 'Data engineering', [DXC, ICICI], 'cdc|change data capture|incremental(?:ly)?'],
    ['Lakehouse and layered lakes', 'Data engineering', [DXC, ICICI], 'lakehouse|medallion|data lakes?|bronze'],
    ['Fact and dimension tables', 'Data engineering', [ALL], 'fact tables?|dimension tables?|dimensional|fact and dimension|data model(?:l?ing|s)?'],
    ['Star schema', 'Data engineering', []],
    ['SCD Types 1 and 2', 'Data engineering', [], 'scd|slowly changing dimensions?'],
    ['Databricks Workflows', 'Orchestration', [DXC]],
    ['Apache Airflow', 'Orchestration', [ICICI], 'airflow'],
    ['Data validation', 'Quality and governance', [DXC, ICICI, ALL], 'validation|data quality'],
    ['Reconciliation', 'Quality and governance', [DXC, ICICI]],
    ['Data profiling', 'Quality and governance', [ALL], 'profiling'],
    ['Lineage and access control', 'Quality and governance', [DXC], 'lineage|rbac|role-based access'],
    ['Reltio MDM', 'Quality and governance', [ICICI], 'reltio|mdm|master data management'],
    ['Azure DevOps', 'Delivery and operations', [DXC]],
    ['CI/CD', 'Delivery and operations', [DXC], 'ci ?/ ?cd'],
    ['Git', 'Delivery and operations', [DXC, ALL]],
    ['Azure Monitor', 'Delivery and operations', [DXC], 'azure monitor'],
    ['Log Analytics', 'Delivery and operations', [DXC]],
    ['Production troubleshooting', 'Delivery and operations', [DXC, ICICI], 'troubleshoot(?:ing)?|root[- ]cause|production support'],
    ['SQL Server', 'Reporting', [ALL]],
    ['Power BI', 'Reporting', [ALL], 'power ?bi']
  ];

  var TABLES = {
    experience: [
      { role: 'Azure Databricks Data Engineer', client: DXC, country: 'USA', domain: 'Healthcare', start_date: '2024-11', end_date: null },
      { role: 'AWS Data Engineer', client: ICICI, country: 'India', domain: 'Banking', start_date: '2022-06', end_date: '2023-11' },
      { role: 'Data Analyst', client: ALL, country: 'India', domain: 'Insurance', start_date: '2021-05', end_date: '2022-05' }
    ],
    results: [
      { metric: 'Data processed daily', value: 'Over 50 GB', client: DXC },
      { metric: 'Source systems', value: '12+', client: DXC },
      { metric: 'Batch-processing time', value: 'About 40% less', client: DXC },
      { metric: 'Validation rules supported', value: 'More than 100', client: DXC },
      { metric: 'Transactions processed daily', value: 'Over 8 million', client: ICICI },
      { metric: 'Spark job runtime', value: 'About 30% less', client: ICICI }
    ],
    projects: [
      { name: 'S3-to-Snowflake ELT and Analytics Reporting Pipeline', type: 'personal', stack: 'S3, Snowpipe, Snowflake, Python, dbt' },
      { name: 'GCP and Kafka Streaming', type: 'personal', stack: 'Kafka, Dataflow, BigQuery' }
    ],
    education: [
      { degree: 'Master of Science in Computer Science', school: 'Lawrence Technological University', location: 'Southfield, Michigan', finished: '2025-12' }
    ],
    skills: []
  };
  SKILLS.forEach(function (s) {
    if (!s[2].length) TABLES.skills.push({ skill: s[0], category: s[1], used_at: null, type: null });
    s[2].forEach(function (w) {
      TABLES.skills.push({ skill: s[0], category: s[1], used_at: w, type: w === OWN ? 'personal' : 'production' });
    });
  });

  // tier: 0 raw source, 1 bronze, 2 silver, 3 gold
  var PIPES = [
    {
      stages: [
        ['Source systems', 0, 'More than 12 healthcare and claims source systems, adding up to over 50 GB of data a day.', 'Azure Data Factory, PySpark, Spark SQL'],
        ['Incremental ingestion', 0, 'Databricks Auto Loader and CDC-based loads pick up only changed records, using checkpointing and schema controls. This cut batch-processing time by about 40%.', 'Auto Loader, CDC, Azure Databricks'],
        ['Bronze', 1, 'Raw data lands in ADLS Gen2 and Delta Lake and stays separate from anything transformed.', 'ADLS Gen2, Delta Lake'],
        ['Silver', 2, 'The layer for validated transformations, kept separate from raw ingestion and from curated reporting datasets.', 'ADLS Gen2, Delta Lake'],
        ['Gold', 3, 'Curated reporting datasets. Partitioning, file compaction, OPTIMIZE, Z-ORDER and SQL tuning improve processing efficiency.', 'Delta Lake, Spark SQL']
      ],
      across: [
        ['Validation', 'Source-to-target validation, business-rule reconciliation, duplicate detection and schema checks across healthcare datasets, supporting more than 100 validation rules.', 'SQL, PySpark'],
        ['Orchestration', 'Dependencies, scheduling and execution monitoring for ingestion and transformation jobs.', 'Azure Data Factory, Databricks Workflows'],
        ['Governance', 'Curated datasets organized with metadata, lineage visibility and role-based access controls.', 'Unity Catalog'],
        ['Production support', 'Databricks and ADF failures diagnosed from job logs, transformation defects traced, and reliable reruns supported.', 'Azure Monitor, Log Analytics'],
        ['Delivery', 'Version-controlled notebooks and pipelines, peer reviews, and CI/CD deployments across environments.', 'Git, Azure DevOps']
      ], first: 1
    },
    {
      stages: [
        ['Transactions', 0, 'Over 8 million banking transaction records a day, used for risk analytics and regulatory reporting.', 'Amazon S3'],
        ['S3 raw', 1, 'The raw layer of the data lake, loaded incrementally and partitioned for historical transaction analysis.', 'Amazon S3'],
        ['Glue and EMR', 1, 'Glue jobs ingest, clean, enrich and validate transactions. Spark on EMR ran about 30% faster after partitioning, caching and query tuning.', 'AWS Glue, Amazon EMR, PySpark, Spark SQL'],
        ['S3 processed', 2, 'The processed layer of the data lake, between raw and curated.', 'Amazon S3'],
        ['Curated', 3, 'Curated banking datasets, with Apache Iceberg tables for schema evolution, partition management and reliable access.', 'Amazon S3, Apache Iceberg'],
        ['Athena', 3, 'Athena SQL over S3 for transaction analysis, reconciliation and investigating reporting discrepancies.', 'Amazon Athena, SQL']
      ],
      across: [
        ['Orchestration', 'Airflow DAGs run the Glue and EMR workloads, with task dependencies, retries and data-validation steps.', 'Apache Airflow'],
        ['Master data', 'Reltio matching, merging and survivorship rules consolidate customer master records used in downstream integrations.', 'Reltio MDM'],
        ['Production support', 'Pipeline failures investigated to root cause, working with fraud, risk and analytics teams to resolve data-processing issues.', 'AWS Glue, Amazon EMR']
      ], first: 2
    },
    {
      stages: [
        ['S3 CSV files', 0, 'CSV files in Amazon S3 are the source for the project.', 'Amazon S3, CSV'],
        ['Snowpipe', 1, 'Snowpipe, Python and stages ingest the files into Snowflake for downstream SQL transformations.', 'Snowpipe, Python, stages'],
        ['Streams and tasks', 2, 'Snowflake streams, tasks and dynamic tables handle processing.', 'Snowflake streams, tasks, dynamic tables'],
        ['dbt staging', 2, 'Staging models built in dbt, alongside incremental models.', 'dbt'],
        ['dbt marts', 3, 'Mart models with tests, snapshots and documentation.', 'dbt'],
        ['Reporting', 3, 'Curated datasets prepared for dashboard reporting.', 'Snowflake, SQL']
      ],
      across: [
        ['Testing and docs', 'dbt tests, snapshots and documentation cover the models.', 'dbt'],
        ['Warehouse tuning', 'Snowflake warehouse workloads optimized for the project.', 'Snowflake']
      ], first: 2
    },
    {
      stages: [
        ['JSON events', 0, 'JSON events are the input to the streaming flow.', 'JSON'],
        ['Kafka producer', 1, 'The producer side of a Kafka flow for JSON events.', 'Apache Kafka'],
        ['Kafka consumer', 1, 'The consumer side of the same Kafka flow.', 'Apache Kafka'],
        ['Dataflow', 2, 'Messages are processed through Dataflow.', 'Dataflow'],
        ['BigQuery', 3, 'Processed messages land in BigQuery.', 'BigQuery']
      ],
      across: [
        ['Monitoring and recovery', 'The flow includes monitoring and recovery controls.', 'GCP']
      ], first: 3
    }
  ];

  var $ = function (id) { return document.getElementById(id); };
  function el(tag, text, cls) {
    var n = document.createElement(tag);
    if (text != null) n.textContent = text;
    if (cls) n.className = cls;
    return n;
  }

  /* ---------- pipeline explorer ---------- */
  var TIER_VAR = ['--raw', '--bronze', '--silver', '--gold'];
  var css = getComputedStyle(document.documentElement);
  var TIER = TIER_VAR.map(function (v) { return css.getPropertyValue(v).trim(); });
  var DISORDER = [1, 0.72, 0.24, 0];
  var pipe = 0, stage = 0, acrossSel = -1;

  function showDetail() {
    var p = PIPES[pipe], item, title;
    if (acrossSel >= 0) { item = p.across[acrossSel]; title = item[0]; $('d-text').textContent = item[1]; $('d-tools').textContent = item[2]; }
    else { item = p.stages[stage]; title = (stage + 1) + '. ' + item[0]; $('d-text').textContent = item[2]; $('d-tools').textContent = item[3]; }
    $('d-title').textContent = title;
    [].forEach.call($('stages').querySelectorAll('button'), function (b, i) { b.setAttribute('aria-pressed', String(acrossSel < 0 && i === stage)); });
    [].forEach.call($('across').querySelectorAll('button'), function (b, i) { b.setAttribute('aria-pressed', String(i === acrossSel)); });
  }

  function showPipe(i) {
    pipe = i; stage = PIPES[i].first; acrossSel = -1;
    [].forEach.call(document.querySelectorAll('.picker button'), function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
    var ol = $('stages'); ol.textContent = ''; ol.style.setProperty('--n', PIPES[i].stages.length);
    PIPES[i].stages.forEach(function (s, k) {
      var li = el('li'), b = el('button'); b.type = 'button';
      b.style.setProperty('--tier', 'var(' + TIER_VAR[s[1]] + ')');
      b.append(el('i', k + 1), el('b', s[0]));
      b.addEventListener('click', function () { stage = k; acrossSel = -1; showDetail(); draw(); });
      li.append(b); ol.append(li);
    });
    var ac = $('across'); ac.textContent = '';
    PIPES[i].across.forEach(function (a, k) {
      var li = el('li'), b = el('button', a[0], 'chip'); b.type = 'button';
      b.addEventListener('click', function () { acrossSel = k; showDetail(); draw(); });
      li.append(b); ac.append(li);
    });
    showDetail(); draw();
  }

  var cv = $('flow'), cx = cv.getContext('2d'), W = 0, H = 0, parts = [], clock = 0, last = 0, raf = 0;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var paused = reduce, inView = true;

  function rnd(seed) { var x = Math.sin(seed * 127.1) * 43758.5453; return x - Math.floor(x); }
  function seedParts() {
    parts = [];
    var lanes = H > 180 ? 9 : 7, per = Math.max(16, Math.round(W / 30)), k = 0;
    for (var l = 0; l < lanes; l++) for (var j = 0; j < per; j++) {
      k++;
      parts.push({ u: (j + (l % 2) * 0.5) / per, y: (l + 1) / (lanes + 1), jx: rnd(k) - 0.5, jy: rnd(k + 900) - 0.5, r: (rnd(k + 1800) - 0.5) * 3.1, bad: rnd(k + 2700) < 0.16 });
    }
  }
  function resize() {
    var r = cv.parentElement.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    if (!r.width) return;
    W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cx.setTransform(dpr, 0, 0, dpr, 0, 0); seedParts(); draw();
  }
  // The stage buttons sit inside the centred column, so the gates line up with them.
  function lane() {
    var a = cv.getBoundingClientRect(), b = $('stages').getBoundingClientRect();
    return { x: b.left - a.left, w: b.width };
  }
  function draw() {
    if (!W) return;
    var st = PIPES[pipe].stages, n = st.length, g = lane(), i;
    cx.clearRect(0, 0, W, H);
    if (acrossSel < 0) {
      cx.globalAlpha = 0.09; cx.fillStyle = TIER[st[stage][1]];
      cx.fillRect(g.x + g.w * stage / n, 0, g.w / n, H);
    }
    cx.globalAlpha = 1; cx.strokeStyle = css.getPropertyValue('--line'); cx.lineWidth = 1;
    for (i = 1; i < n; i++) { var gx = Math.round(g.x + g.w * i / n) + 0.5; cx.beginPath(); cx.moveTo(gx, 0); cx.lineTo(gx, H); cx.stroke(); }
    var top = 26, span = H - 30, cell = W / Math.max(16, W / 30);
    parts.forEach(function (p) {
      var u = (p.u + clock) % 1, x = u * W, pos = (x - g.x) / g.w * n;
      var c = Math.max(0, Math.min(n - 1, Math.floor(pos))), f = Math.max(0, Math.min(1, pos - c));
      var d0 = DISORDER[st[c][1]], d1 = c > 0 ? DISORDER[st[c - 1][1]] : d0;
      var e = Math.min(1, f / 0.35), d = d1 + (d0 - d1) * e * e * (3 - 2 * e);
      var alpha = 1;
      if (p.bad) { // records that fail checks fade out before the silver layer
        if (st[c][1] >= 2) { alpha = (c > 0 && st[c - 1][1] < 2) ? Math.max(0, 1 - f / 0.3) : 0; }
      }
      if (alpha <= 0) return;
      var px = x + p.jx * d * cell * 2.2, py = top + Math.max(0.03, Math.min(0.97, p.y + p.jy * d * 0.62)) * span;
      if (acrossSel < 0 && c !== stage) alpha *= 0.62;
      cx.save(); cx.globalAlpha = alpha; cx.translate(px, py); cx.rotate(p.r * d);
      if (p.bad) { cx.strokeStyle = TIER[st[c][1]]; cx.strokeRect(-5, -1.5, 10, 3); }
      else { cx.fillStyle = TIER[st[c][1]]; cx.fillRect(-5.5, -1.75, 11, 3.5); }
      cx.restore();
    });
    cx.globalAlpha = 1; cx.font = '500 13px "IBM Plex Mono", monospace'; cx.textBaseline = 'top';
    for (i = 0; i < n; i++) {
      var tx = g.x + g.w * i / n + 16; cx.fillStyle = css.getPropertyValue('--ink'); cx.fillRect(tx - 4, 5, 16, 19);
      cx.fillStyle = TIER[st[i][1]]; cx.fillText(i + 1, tx, 8);
    }
  }
  function tick(t) {
    raf = 0;
    if (last) clock = (clock + Math.min(60, t - last) / 46000) % 1;
    last = t; draw(); run();
  }
  function run() {
    if (!paused && inView && !document.hidden) { if (!raf) raf = requestAnimationFrame(tick); }
    else { if (raf) cancelAnimationFrame(raf); raf = 0; last = 0; }
  }
  function label() { $('pause').textContent = paused ? 'Play animation' : 'Pause animation'; }

  [].forEach.call(document.querySelectorAll('.picker button'), function (b, i) { b.addEventListener('click', function () { showPipe(i); }); });
  [].forEach.call(document.querySelectorAll('[data-pipe]'), function (a) { a.addEventListener('click', function () { showPipe(+a.getAttribute('data-pipe')); }); });
  $('pause').addEventListener('click', function () { paused = !paused; label(); run(); });
  document.addEventListener('visibilitychange', run);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { inView = e[e.length - 1].isIntersecting; run(); }).observe(cv);
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(cv.parentElement); else window.addEventListener('resize', resize);
  showPipe(0); resize(); label(); run();

  /* ---------- skills ---------- */
  var COLS = [DXC, ICICI, ALL, OWN];
  var body = $('matrix-body'), rows = [], cats = [];
  SKILLS.forEach(function (s) {
    var cat = cats.filter(function (c) { return c.name === s[1]; })[0];
    if (!cat) {
      var tr0 = el('tr', null, 'cat'), th0 = el('th', s[1]); th0.colSpan = 5; th0.scope = 'colgroup'; tr0.append(th0); body.append(tr0);
      cat = { name: s[1], tr: tr0, rows: [] }; cats.push(cat);
    }
    var tr = el('tr'), th = el('th', s[0]); th.scope = 'row'; tr.append(th);
    if (!s[2].length) { var only = el('td', 'Listed on resume', 'muted'); only.colSpan = 4; tr.append(only); }
    else COLS.forEach(function (c) {
      var td = el('td');
      if (s[2].indexOf(c) >= 0) { var d = el('span', null, c === OWN ? 'dot own' : 'dot'); d.setAttribute('aria-hidden', 'true'); td.append(d, el('span', 'Yes', 'sr')); }
      tr.append(td);
    });
    body.append(tr);
    var src = s[3] || s[0].toLowerCase().replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
    var r = { skill: s[0], tr: tr, re: new RegExp('(^|[^a-z0-9])(?:' + src + ')(?![a-z0-9])', 'i') };
    rows.push(r); cat.rows.push(r);
  });

  function hit(r, text) {
    if (!r.re.test(text)) return false;
    // "EMR" also means electronic medical record, so long text must mention AWS too
    if (r.skill === 'Amazon EMR' && text.length > 40) return /\b(aws|amazon)\b/i.test(text);
    return true;
  }
  function match() {
    var text = $('jd').value.trim(), n = 0;
    rows.forEach(function (r) { var on = !text || hit(r, text); r.tr.hidden = !on; if (on) n++; });
    cats.forEach(function (c) { c.tr.hidden = !c.rows.some(function (r) { return !r.tr.hidden; }); });
    $('jd-status').textContent = !text ? 'Showing all ' + rows.length + ' skills.'
      : n ? 'Showing the ' + n + (n === 1 ? ' skill' : ' skills') + ' on my resume that your text mentions.'
      : 'Your text mentions none of the skills listed here.';
    $('matrix').hidden = n === 0;
    $('jd-clear').hidden = !text;
  }
  $('jd').addEventListener('input', match);
  $('jd-clear').addEventListener('click', function () { $('jd').value = ''; match(); $('jd').focus(); });
  $('jd-sample').addEventListener('click', function () {
    $('jd').value = 'Example posting: Data Engineer. Build PySpark pipelines on Databricks with Delta Lake and Unity Catalog, orchestrate with Airflow or Azure Data Factory, model data in Snowflake with dbt, and own data quality and CI/CD.';
    match();
  });
  match();

  /* ---------- SQL ---------- */
  function SqlError(m) { this.message = m; }
  function lex(q) {
    var re = /\s+|'((?:[^']|'')*)'|(\d+(?:\.\d+)?)|([A-Za-z_]\w*)|(<>|!=|<=|>=|[=<>(),*;])/y, out = [], m;
    while (re.lastIndex < q.length) {
      var at = re.lastIndex; m = re.exec(q);
      if (!m) throw new SqlError('Unexpected character "' + q[at] + '". Put text values in single quotes.');
      if (m[1] != null) out.push({ t: 'str', v: m[1].replace(/''/g, "'") });
      else if (m[2] != null) out.push({ t: 'num', v: +m[2] });
      else if (m[3] != null) out.push({ t: 'id', v: m[3] });
      else if (m[4] != null) out.push({ t: 'op', v: m[4] });
    }
    return out;
  }
  var RESERVED = ['from', 'where', 'group', 'order', 'limit', 'and', 'or', 'not', 'as', 'by', 'select'];
  var AGG = ['count', 'min', 'max', 'sum', 'avg'];

  function runSql(q) {
    var tk = lex(q), i = 0;
    while (tk.length && tk[tk.length - 1].v === ';') tk.pop();
    function peek(v, o) { var t = tk[i + (o || 0)]; return !!t && t.t !== 'str' && String(t.v).toLowerCase() === v; }
    function eat(v) { if (peek(v)) { i++; return true; } return false; }
    function need(v) { if (!eat(v)) throw new SqlError('Expected ' + v.toUpperCase() + (tk[i] ? ' before "' + tk[i].v + '".' : ' at the end of the query.')); }
    function ident(what) {
      var t = tk[i];
      if (!t || t.t !== 'id' || RESERVED.indexOf(t.v.toLowerCase()) >= 0) throw new SqlError('Expected ' + what + (t ? ' before "' + t.v + '".' : ' at the end of the query.'));
      i++; return t.v.toLowerCase();
    }
    if (!tk.length) throw new SqlError('Type a query first.');
    if (!peek('select')) throw new SqlError('Only SELECT works here. The tables are read-only.');
    i++;
    var distinct = eat('distinct'), items = [];
    do {
      if (eat('*')) { items.push({ star: true }); continue; }
      var name = ident('a column name'), it;
      if (AGG.indexOf(name) >= 0 && peek('(')) {
        i++; it = { agg: name, distinct: eat('distinct') };
        if (eat('*')) { if (name !== 'count') throw new SqlError(name.toUpperCase() + ' needs a column name.'); it.col = '*'; }
        else it.col = ident('a column name');
        need(')'); it.name = name;
      } else it = { col: name, name: name };
      if (eat('as')) it.name = ident('a name after AS');
      items.push(it);
    } while (eat(','));
    need('from');
    var table = ident('a table name'), data = Object.prototype.hasOwnProperty.call(TABLES, table) ? TABLES[table] : null;
    if (!data) throw new SqlError('There is no table called "' + table + '". Try ' + Object.keys(TABLES).join(', ') + '.');
    if (peek('join') || peek(',')) throw new SqlError('Joins are not supported here. Query one table at a time.');
    var cols = Object.keys(data[0]);
    function col(c) { if (cols.indexOf(c) < 0) throw new SqlError('"' + c + '" is not a column of ' + table + '. Columns: ' + cols.join(', ') + '.'); return c; }
    function lit() { var t = tk[i]; if (!t || (t.t !== 'str' && t.t !== 'num')) throw new SqlError('Expected a value in single quotes or a number' + (t ? ' before "' + t.v + '".' : '.')); i++; return t.v; }
    function norm(v) { return typeof v === 'string' ? v.toLowerCase() : v; }

    function or() { var a = and(); while (eat('or')) { (function (l, r) { a = function (x) { return l(x) || r(x); }; })(a, and()); } return a; }
    function and() { var a = not(); while (eat('and')) { (function (l, r) { a = function (x) { return l(x) && r(x); }; })(a, not()); } return a; }
    function not() { if (eat('not')) { var f = not(); return function (x) { return !f(x); }; } return pred(); }
    function pred() {
      if (eat('(')) { var e = or(); need(')'); return e; }
      var c = col(ident('a column name'));
      if (eat('is')) { var nn = eat('not'); need('null'); return function (x) { return (x[c] === null) !== nn; }; }
      var neg = eat('not');
      if (eat('like')) {
        var pat = String(lit()).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '[\\s\\S]*').replace(/_/g, '[\\s\\S]');
        var re = new RegExp('^' + pat + '$', 'i');
        return function (x) { return x[c] !== null && re.test(x[c]) !== neg; };
      }
      if (eat('in')) {
        need('('); var vals = []; do { vals.push(norm(lit())); } while (eat(',')); need(')');
        return function (x) { return x[c] !== null && (vals.indexOf(norm(x[c])) >= 0) !== neg; };
      }
      if (neg) throw new SqlError('Expected LIKE or IN after NOT.');
      var op = tk[i] && tk[i].v;
      if (['=', '!=', '<>', '<', '>', '<=', '>='].indexOf(op) < 0) throw new SqlError('Expected =, LIKE, IN or IS after "' + c + '".');
      i++; var v = norm(lit());
      return function (x) {
        if (x[c] === null) return false; var a = norm(x[c]);
        return op === '=' ? a === v : op === '!=' || op === '<>' ? a !== v : op === '<' ? a < v : op === '>' ? a > v : op === '<=' ? a <= v : a >= v;
      };
    }
    var rowsOut = data;
    if (eat('where')) rowsOut = data.filter(or());
    var group = [];
    if (eat('group')) { need('by'); do { group.push(col(ident('a column name'))); } while (eat(',')); }
    var order = [];
    if (eat('order')) {
      need('by');
      do {
        if (AGG.indexOf(String(tk[i] && tk[i].v).toLowerCase()) >= 0 && peek('(', 1)) throw new SqlError('Name the total with AS, then use that name in ORDER BY.');
        var oc = ident('a column name'), desc = eat('desc'); if (!desc) eat('asc'); order.push([oc, desc]);
      } while (eat(','));
    }
    var limit = Infinity;
    if (eat('limit')) { if (!tk[i] || tk[i].t !== 'num') throw new SqlError('LIMIT needs a number.'); limit = tk[i++].v; }
    if (i < tk.length) throw new SqlError('Did not understand "' + tk[i].v + '".');

    var list = [];
    items.forEach(function (it) {
      if (it.star) cols.forEach(function (c) { list.push({ col: c, name: c }); });
      else { if (it.col !== '*') col(it.col); list.push(it); }
    });
    var grouped = group.length || list.some(function (x) { return x.agg; });
    var out;
    if (grouped) {
      list.forEach(function (x) { if (!x.agg && group.indexOf(x.col) < 0) throw new SqlError('Add "' + x.col + '" to GROUP BY, or remove it from SELECT.'); });
      var keys = [], map = {};
      rowsOut.forEach(function (r) { var k = JSON.stringify(group.map(function (g) { return r[g]; })); if (!map[k]) { map[k] = []; keys.push(k); } map[k].push(r); });
      if (!group.length && !keys.length) { keys.push(''); map[''] = []; }
      out = keys.map(function (k) {
        var rs = map[k], o = {};
        list.forEach(function (x) {
          if (!x.agg) { o[x.name] = rs[0][x.col]; return; }
          var vs = x.col === '*' ? rs : rs.map(function (r) { return r[x.col]; }).filter(function (v) { return v !== null; });
          if (x.distinct) vs = vs.filter(function (v, n) { return vs.indexOf(v) === n; });
          if (x.agg === 'count') o[x.name] = vs.length;
          else if (!vs.length) o[x.name] = null;
          else if (x.agg === 'min' || x.agg === 'max') { var s = vs.slice().sort(); o[x.name] = x.agg === 'min' ? s[0] : s[s.length - 1]; }
          else throw new SqlError(x.agg.toUpperCase() + ' needs a numeric column, and these tables have none. Try COUNT, MIN or MAX.');
        });
        order.forEach(function (d) { if (!(d[0] in o) && group.indexOf(d[0]) >= 0) Object.defineProperty(o, d[0], { value: rs[0][d[0]] }); });
        return o;
      });
    } else {
      out = rowsOut.map(function (r) {
        var o = {}; list.forEach(function (x) { o[x.name] = r[x.col]; });
        if (!distinct) order.forEach(function (d) { if (!(d[0] in o) && cols.indexOf(d[0]) >= 0) Object.defineProperty(o, d[0], { value: r[d[0]] }); });
        return o;
      });
    }
    if (distinct) { var seen = {}; out = out.filter(function (o) { var k = JSON.stringify(o); if (seen[k]) return false; seen[k] = 1; return true; }); }
    order.forEach(function (d) {
      var known = list.some(function (x) { return x.name === d[0]; }) || (grouped ? group.indexOf(d[0]) >= 0 : !distinct && cols.indexOf(d[0]) >= 0);
      if (!known) throw new SqlError('Cannot order by "' + d[0] + '". Add it to SELECT first.');
    });
    if (order.length) out = out.slice().sort(function (a, b) {
      for (var k = 0; k < order.length; k++) {
        var x = a[order[k][0]], y = b[order[k][0]], s = order[k][1] ? -1 : 1;
        if (x === y) continue; if (x === null) return 1; if (y === null) return -1;
        return (x < y ? -1 : 1) * s;
      }
      return 0;
    });
    return { cols: list.map(function (x) { return x.name; }), rows: out.slice(0, limit) };
  }

  function exec() {
    var status = $('sql-status'), box = $('sql-out');
    try {
      var r = runSql($('sql').value), t = el('table'), h = el('tr'), th = el('thead'), tb = el('tbody');
      r.cols.forEach(function (c) { var x = el('th', c); x.scope = 'col'; h.append(x); }); th.append(h);
      r.rows.forEach(function (row) {
        var tr = el('tr');
        r.cols.forEach(function (c) { tr.append(row[c] === null ? el('td', 'null', 'null') : el('td', row[c])); });
        tb.append(tr);
      });
      t.append(th, tb); box.textContent = ''; box.append(t); box.hidden = false;
      status.className = 'status'; status.textContent = r.rows.length + (r.rows.length === 1 ? ' row' : ' rows');
    } catch (e) {
      if (!(e instanceof SqlError)) throw e;
      box.hidden = true; status.className = 'status bad'; status.textContent = e.message;
    }
  }
  [].forEach.call(document.querySelectorAll('[data-sql]'), function (b) {
    b.addEventListener('click', function () { $('sql').value = b.getAttribute('data-sql'); exec(); });
  });
  $('sql-run').addEventListener('click', exec);
  $('sql').addEventListener('keydown', function (e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); exec(); } });
  exec();

  /* ---------- copy buttons and section marker ---------- */
  [].forEach.call(document.querySelectorAll('[data-copy]'), function (b) {
    b.addEventListener('click', function () {
      function say(t) { b.textContent = t; setTimeout(function () { b.textContent = 'Copy'; }, 1600); }
      function pick() {
        var r = document.createRange(); r.selectNodeContents($(b.getAttribute('data-from')));
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); say('Selected');
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () { say('Copied'); }, pick);
      else pick();
    });
  });
  if ('IntersectionObserver' in window) {
    var links = [].slice.call(document.querySelectorAll('.bar nav a'));
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { if (a.getAttribute('href') === '#' + e.target.id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) io.observe(s); });
  }
})();
