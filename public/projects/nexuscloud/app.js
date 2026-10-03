// NexusCloud AI Engine - Production Telemetry & Real-Time Stream Processor

(function () {
  'use strict';

  // State Management
  const state = {
    isStreaming: true,
    activeFilter: 'all',
    throughput: 142850,
    p99Latency: 16.8,
    errorRate: 0.002,
    anomaliesCount: 0,
    isAnomalyActive: false,
    nodes: [
      { id: 'us-east-1', name: 'US-East (N. Virginia)', ping: 12, cpu: 34, ram: 48, status: 'healthy' },
      { id: 'us-west-2', name: 'US-West (Oregon)', ping: 18, cpu: 28, ram: 42, status: 'healthy' },
      { id: 'eu-central-1', name: 'EU-Central (Frankfurt)', ping: 24, cpu: 45, ram: 62, status: 'healthy' },
      { id: 'eu-west-1', name: 'EU-West (Ireland)', ping: 22, cpu: 38, ram: 54, status: 'healthy' },
      { id: 'ap-south-1', name: 'AP-South (Mumbai)', ping: 31, cpu: 52, ram: 68, status: 'healthy' },
      { id: 'ap-southeast-1', name: 'AP-East (Singapore)', ping: 29, cpu: 41, ram: 51, status: 'healthy' },
      { id: 'sa-east-1', name: 'SA-East (São Paulo)', ping: 48, cpu: 32, ram: 44, status: 'healthy' },
      { id: 'af-south-1', name: 'AF-South (Cape Town)', ping: 54, cpu: 26, ram: 39, status: 'healthy' }
    ],
    chartData: {
      http: Array.from({ length: 40 }, () => 120 + Math.random() * 40),
      ai: Array.from({ length: 40 }, () => 60 + Math.random() * 30),
      redis: Array.from({ length: 40 }, () => 90 + Math.random() * 25)
    },
    sparkData: {
      throughput: Array.from({ length: 15 }, () => 130 + Math.random() * 20),
      latency: Array.from({ length: 15 }, () => 15 + Math.random() * 4),
      error: Array.from({ length: 15 }, () => 0.001 + Math.random() * 0.002)
    }
  };

  // DOM References
  const dom = {
    valThroughput: document.getElementById('valThroughput'),
    valLatency: document.getElementById('valLatency'),
    valErrorRate: document.getElementById('valErrorRate'),
    valAnomalies: document.getElementById('valAnomalies'),
    globalP99: document.getElementById('globalP99'),
    nodesGrid: document.getElementById('nodesGrid'),
    logTerminal: document.getElementById('logTerminal'),
    btnSimulateAnomaly: document.getElementById('btnSimulateAnomaly'),
    btnLogStreamToggle: document.getElementById('btnLogStreamToggle'),
    streamIcon: document.getElementById('streamIcon'),
    btnClearLogs: document.getElementById('btnClearLogs'),
    btnRunQuery: document.getElementById('btnRunQuery'),
    queryResultBox: document.getElementById('queryResultBox'),
    triageStatusBox: document.getElementById('triageStatusBox'),
    triageStatusIcon: document.getElementById('triageStatusIcon'),
    triageStatusTitle: document.getElementById('triageStatusTitle'),
    triageStatusDesc: document.getElementById('triageStatusDesc'),
    aiStatusBadge: document.getElementById('aiStatusBadge'),
    mainChart: document.getElementById('mainTelemetryChart'),
    sparkThroughput: document.getElementById('sparkThroughput'),
    sparkLatency: document.getElementById('sparkLatency'),
    sparkError: document.getElementById('sparkError')
  };

  // Setup Canvas Elements
  function resizeCanvas(canvas) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    const ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  // Draw Primary Telemetry Chart
  function drawMainChart() {
    const canvas = dom.mainChart;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    ctx.clearRect(0, 0, width, height);

    // Draw Grid Lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
    ctx.lineWidth = 1;
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const drawLine = (data, strokeColor, fillColor) => {
      const step = width / (data.length - 1);
      ctx.beginPath();
      ctx.moveTo(0, height - (data[0] / 200) * height);

      for (let i = 1; i < data.length; i++) {
        const x = i * step;
        const y = height - (data[i] / 200) * height;
        const prevX = (i - 1) * step;
        const prevY = height - (data[i - 1] / 200) * height;
        const cpX = (prevX + x) / 2;
        ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
      }

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = strokeColor;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Area fill
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
    };

    // Draw datasets
    const fillHttp = ctx.createLinearGradient(0, 0, 0, height);
    fillHttp.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
    fillHttp.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
    drawLine(state.chartData.http, '#38bdf8', fillHttp);

    const fillAi = ctx.createLinearGradient(0, 0, 0, height);
    fillAi.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
    fillAi.addColorStop(1, 'rgba(168, 85, 247, 0.0)');
    drawLine(state.chartData.ai, '#a855f7', fillAi);

    const fillRedis = ctx.createLinearGradient(0, 0, 0, height);
    fillRedis.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
    fillRedis.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
    drawLine(state.chartData.redis, '#10b981', fillRedis);
  }

  // Draw Sparkline
  function drawSparkline(canvas, data, color) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    ctx.clearRect(0, 0, width, height);

    const min = Math.min(...data);
    const max = Math.max(...data) || 1;
    const step = width / (data.length - 1);

    ctx.beginPath();
    ctx.moveTo(0, height - ((data[0] - min) / (max - min || 1)) * (height - 6) - 3);

    for (let i = 1; i < data.length; i++) {
      const x = i * step;
      const y = height - ((data[i] - min) / (max - min || 1)) * (height - 6) - 3;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Render Nodes Grid
  function renderNodes() {
    if (!dom.nodesGrid) return;
    dom.nodesGrid.innerHTML = state.nodes.map(node => `
      <div class="node-item ${node.status === 'warning' ? 'border-amber' : ''}">
        <div class="node-header">
          <span class="node-name">${node.name}</span>
          <span class="node-ping ${node.ping > 40 ? 'text-amber' : 'text-emerald'}">
            <i class="fa-solid fa-circle-dot"></i> ${node.ping}ms
          </span>
        </div>
        <div class="node-metrics">
          <span>CPU: <strong>${node.cpu}%</strong></span>
          <span>RAM: <strong>${node.ram}%</strong></span>
        </div>
        <div class="node-bar">
          <div class="node-bar-fill" style="width: ${node.cpu}%; background: ${node.cpu > 75 ? '#f43f5e' : node.cpu > 50 ? '#f59e0b' : '#38bdf8'};"></div>
        </div>
      </div>
    `).join('');
  }

  // Add Log Entry
  const sampleMessages = [
    { type: 'INFO', msg: 'Ingestion pipeline synced 12,400 messages across Redis Pub/Sub cluster.' },
    { type: 'INFO', msg: 'Edge cache warmed for region eu-central-1 (99.8% hit ratio).' },
    { type: 'AI', msg: 'Neural inference model v2.5 evaluated latency distribution [14.2ms nominal].' },
    { type: 'INFO', msg: 'SSE client connected: telemetry-feed session auth verified.' },
    { type: 'WARN', msg: 'Spike in API ingress detected on us-west-2 edge node (+18%).' },
    { type: 'AI', msg: 'Auto-scaling trigger evaluated: no scaling action required.' }
  ];

  function addLog(type, message) {
    if (!dom.logTerminal) return;
    if (state.activeFilter !== 'all' && state.activeFilter !== type) return;

    const time = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100);
    const logEl = document.createElement('div');
    logEl.className = 'log-line';
    logEl.innerHTML = `
      <span class="log-time">[${time}]</span>
      <span class="log-tag tag-${type}">${type}</span>
      <span class="log-msg">${message}</span>
    `;

    dom.logTerminal.appendChild(logEl);

    // Keep log buffer bounded
    if (dom.logTerminal.children.length > 50) {
      dom.logTerminal.removeChild(dom.logTerminal.firstChild);
    }
    dom.logTerminal.scrollTop = dom.logTerminal.scrollHeight;
  }

  // Update Data Cycle (Every 800ms)
  function updateDataCycle() {
    if (!state.isStreaming) return;

    // Shift main chart data
    const jitter = state.isAnomalyActive ? 60 : 15;
    const baseHttp = state.isAnomalyActive ? 180 : 130;
    const baseAi = state.isAnomalyActive ? 120 : 65;

    state.chartData.http.shift();
    state.chartData.http.push(baseHttp + (Math.random() - 0.5) * jitter);

    state.chartData.ai.shift();
    state.chartData.ai.push(baseAi + (Math.random() - 0.5) * jitter);

    state.chartData.redis.shift();
    state.chartData.redis.push(95 + (Math.random() - 0.5) * 15);

    drawMainChart();

    // Update numbers
    const throughputDelta = Math.floor((Math.random() - 0.5) * 1200);
    state.throughput = Math.max(120000, state.throughput + throughputDelta);
    dom.valThroughput.textContent = state.throughput.toLocaleString();

    state.sparkData.throughput.shift();
    state.sparkData.throughput.push(state.throughput / 1000);
    drawSparkline(dom.sparkThroughput, state.sparkData.throughput, '#38bdf8');

    if (!state.isAnomalyActive) {
      state.p99Latency = (15.5 + Math.random() * 2.5).toFixed(1);
      dom.valLatency.textContent = state.p99Latency;
      dom.globalP99.textContent = `${state.p99Latency}ms`;
      state.errorRate = (0.001 + Math.random() * 0.002).toFixed(3);
      dom.valErrorRate.textContent = state.errorRate;
    }

    state.sparkData.latency.shift();
    state.sparkData.latency.push(parseFloat(state.p99Latency));
    drawSparkline(dom.sparkLatency, state.sparkData.latency, state.isAnomalyActive ? '#f43f5e' : '#10b981');

    state.sparkData.error.shift();
    state.sparkData.error.push(parseFloat(state.errorRate));
    drawSparkline(dom.sparkError, state.sparkData.error, '#f59e0b');

    // Update node metrics
    state.nodes.forEach(node => {
      node.cpu = Math.min(95, Math.max(15, node.cpu + Math.floor((Math.random() - 0.5) * 6)));
      node.ping = Math.min(80, Math.max(8, node.ping + Math.floor((Math.random() - 0.5) * 4)));
    });
    renderNodes();

    // Random log trigger
    if (Math.random() > 0.4) {
      const item = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      addLog(item.type, item.msg);
    }
  }

  // Simulate Anomaly
  function triggerAnomalySimulation() {
    if (state.isAnomalyActive) return;
    state.isAnomalyActive = true;
    state.anomaliesCount = 1;
    dom.valAnomalies.textContent = '1';
    dom.valAnomalies.className = 'metric-value text-rose';

    state.p99Latency = '78.4';
    dom.valLatency.textContent = state.p99Latency;
    dom.valLatency.className = 'metric-value text-rose';
    dom.globalP99.textContent = '78.4ms (DEGRADED)';

    state.errorRate = '1.840';
    dom.valErrorRate.textContent = state.errorRate;
    dom.valErrorRate.className = 'metric-value text-rose';

    dom.aiStatusBadge.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-rose"></i> ANOMALY DETECTED';
    dom.aiStatusBadge.className = 'metric-trend text-rose';

    dom.triageStatusBox.className = 'triage-status-box anomaly-active';
    dom.triageStatusIcon.className = 'fa-solid fa-triangle-exclamation text-rose';
    dom.triageStatusTitle.textContent = 'Memory Leak & Latency Spike [us-east-1]';
    dom.triageStatusDesc.textContent = 'AI Root Cause: Unbounded SSE subscriber buffer. Auto-mitigation triggered: cycling worker nodes.';

    // Inject alert logs
    addLog('ERROR', 'High latency anomaly: Redis Pub/Sub buffer threshold exceeded on us-east-1.');
    addLog('AI', 'AI Triage Engine initiating automated self-healing restart protocol...');

    // Self heal after 6 seconds
    setTimeout(() => {
      state.isAnomalyActive = false;
      state.anomaliesCount = 0;
      dom.valAnomalies.textContent = '0';
      dom.valAnomalies.className = 'metric-value text-cyan';

      dom.valLatency.className = 'metric-value text-emerald';
      dom.valErrorRate.className = 'metric-value';
      dom.globalP99.textContent = '16.8ms';

      dom.aiStatusBadge.innerHTML = '<i class="fa-solid fa-robot"></i> Monitoring';
      dom.aiStatusBadge.className = 'metric-trend text-purple';

      dom.triageStatusBox.className = 'triage-status-box';
      dom.triageStatusIcon.className = 'fa-solid fa-circle-check text-emerald';
      dom.triageStatusTitle.textContent = 'Self-Healing Completed';
      dom.triageStatusDesc.textContent = 'Cluster telemetry restored to nominal 99.999% SLA metrics.';

      addLog('INFO', 'Worker node cycled successfully. P99 latency recovered to 16.4ms.');
    }, 6000);
  }

  // Execute Mock Query
  function executeQuery() {
    dom.queryResultBox.innerHTML = `
      <div class="font-mono text-cyan" style="animation: fadeIn 0.3s ease;">
        <span class="text-emerald">✓ HTTP 200 OK (Execution time: 3.2ms)</span><br>
        <pre class="text-slate-300" style="margin-top: 4px;">[
  { "region": "us-east-1", "p99": 14.8, "throughput": 38920, "status": "NOMINAL" },
  { "region": "eu-central-1", "p99": 18.2, "throughput": 42100, "status": "NOMINAL" },
  { "region": "ap-south-1", "p99": 22.4, "throughput": 28540, "status": "NOMINAL" }
]</pre>
      </div>
    `;
    addLog('INFO', 'Custom SQL telemetry query executed via Edge Route Handler.');
  }

  // Event Listeners
  function initEvents() {
    window.addEventListener('resize', () => {
      resizeCanvas(dom.mainChart);
      resizeCanvas(dom.sparkThroughput);
      resizeCanvas(dom.sparkLatency);
      resizeCanvas(dom.sparkError);
      drawMainChart();
    });

    dom.btnSimulateAnomaly?.addEventListener('click', triggerAnomalySimulation);

    dom.btnLogStreamToggle?.addEventListener('click', () => {
      state.isStreaming = !state.isStreaming;
      dom.streamIcon.className = state.isStreaming ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    });

    dom.btnClearLogs?.addEventListener('click', () => {
      if (dom.logTerminal) dom.logTerminal.innerHTML = '';
    });

    dom.btnRunQuery?.addEventListener('click', executeQuery);

    // Filter Chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        state.activeFilter = e.target.dataset.filter;
      });
    });

    // Time Buttons
    document.querySelectorAll('.time-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        addLog('INFO', `Telemetry time window adjusted to [${e.target.dataset.range}].`);
      });
    });
  }

  // Init Application
  function init() {
    resizeCanvas(dom.mainChart);
    resizeCanvas(dom.sparkThroughput);
    resizeCanvas(dom.sparkLatency);
    resizeCanvas(dom.sparkError);

    renderNodes();
    drawMainChart();

    // Initial Logs
    addLog('INFO', 'NexusCloud Telemetry Cluster v2.5 initialized.');
    addLog('INFO', 'Connected to Redis Pub/Sub stream: channel [telemetry-feed].');
    addLog('AI', 'AI Anomaly Detector model loaded with 98.8% confidence weight.');

    initEvents();
    setInterval(updateDataCycle, 850);
  }

  window.addEventListener('DOMContentLoaded', init);
})();
