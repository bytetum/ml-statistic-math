interface CanvasSetup {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
}

function createCanvas(container: HTMLElement, w: number, h: number): CanvasSetup {
  const canvas = document.createElement('canvas');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
  return { canvas, ctx, w, h };
}

function drawAxes(ctx: CanvasRenderingContext2D, w: number, h: number, ox: number, oy: number, scaleX: number, scaleY: number): void {
  ctx.strokeStyle = '#2d3148';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, oy); ctx.lineTo(w, oy);
  ctx.moveTo(ox, 0); ctx.lineTo(ox, h);
  ctx.stroke();

  ctx.fillStyle = '#555';
  ctx.font = '10px sans-serif';
  for (let i = -10; i <= 10; i++) {
    if (i === 0) continue;
    const x = ox + i * scaleX;
    if (x > 0 && x < w) {
      ctx.beginPath(); ctx.moveTo(x, oy - 3); ctx.lineTo(x, oy + 3); ctx.stroke();
      ctx.fillText(String(i), x - 3, oy + 14);
    }
    const y = oy - i * scaleY;
    if (y > 0 && y < h) {
      ctx.beginPath(); ctx.moveTo(ox - 3, y); ctx.lineTo(ox + 3, y); ctx.stroke();
      ctx.fillText(String(i), ox + 6, y + 4);
    }
  }
}

function vectorPlot(container: HTMLElement): void {
  container.innerHTML = '<div class="controls"><label>x: <input type="range" id="vx" min="-5" max="5" value="3" step="0.5"><span id="vx-val">3</span></label><label>y: <input type="range" id="vy" min="-5" max="5" value="2" step="0.5"><span id="vy-val">2</span></label></div>';
  const { ctx, w, h } = createCanvas(container, 400, 300);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  function draw(): void {
    const vx = parseFloat((document.getElementById('vx') as HTMLInputElement).value);
    const vy = parseFloat((document.getElementById('vy') as HTMLInputElement).value);
    document.getElementById('vx-val')!.textContent = String(vx);
    document.getElementById('vy-val')!.textContent = String(vy);

    const ox = w / 2, oy = h / 2, s = 35;
    ctx.clearRect(0, 0, w, h);
    drawAxes(ctx, w, h, ox, oy, s, s);

    const px = ox + vx * s, py = oy - vy * s;
    ctx.strokeStyle = '#6c5ce7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(px, py);
    ctx.stroke();

    const angle = Math.atan2(oy - py, px - ox);
    ctx.fillStyle = '#6c5ce7';
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px - 10 * Math.cos(angle - 0.3), py + 10 * Math.sin(angle - 0.3));
    ctx.lineTo(px - 10 * Math.cos(angle + 0.3), py + 10 * Math.sin(angle + 0.3));
    ctx.fill();

    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();

    const norm = Math.sqrt(vx * vx + vy * vy).toFixed(2);
    caption.textContent = `Vector [${vx}, ${vy}], L2 norm = ${norm}`;
  }

  document.getElementById('vx')!.addEventListener('input', draw);
  document.getElementById('vy')!.addEventListener('input', draw);
  draw();
}

function matMul(container: HTMLElement): void {
  container.innerHTML = '<div class="caption">2x2 Matrix Multiplication: A * B = C</div>';
  const table = document.createElement('div');
  table.style.cssText = 'display:flex; gap:1rem; align-items:center; justify-content:center; flex-wrap:wrap; font-family:var(--mono); font-size:0.85rem; padding:0.5rem;';

  function compute(): void {
    const v = (id: string) => parseFloat((document.getElementById(id) as HTMLInputElement).value) || 0;
    (document.getElementById('c11') as HTMLInputElement).value = String(v('a11')*v('b11') + v('a12')*v('b21'));
    (document.getElementById('c12') as HTMLInputElement).value = String(v('a11')*v('b12') + v('a12')*v('b22'));
    (document.getElementById('c21') as HTMLInputElement).value = String(v('a21')*v('b11') + v('a22')*v('b21'));
    (document.getElementById('c22') as HTMLInputElement).value = String(v('a21')*v('b12') + v('a22')*v('b22'));
  }

  function makeMatrix(label: string, ids: string[], editable = true): HTMLDivElement {
    const div = document.createElement('div');
    div.style.textAlign = 'center';
    div.innerHTML = `<div style="color:var(--text-dim); margin-bottom:0.3rem; font-size:0.75rem">${label}</div>`;
    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:4px;';
    ids.forEach(id => {
      const inp = document.createElement('input');
      inp.type = 'number';
      inp.id = id;
      inp.value = String(Math.floor(Math.random() * 5) + 1);
      inp.style.cssText = 'width:50px; padding:0.3rem; text-align:center; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:4px; font-family:var(--mono);';
      if (!editable) { inp.readOnly = true; inp.style.borderColor = 'var(--accent)'; inp.style.color = 'var(--accent-light)'; }
      if (editable) inp.addEventListener('input', compute);
      grid.appendChild(inp);
    });
    div.appendChild(grid);
    return div;
  }

  table.appendChild(makeMatrix('A', ['a11','a12','a21','a22']));
  const times = document.createElement('span');
  times.textContent = '\u00d7';
  times.style.cssText = 'font-size:1.2rem; color:var(--text-dim);';
  table.appendChild(times);
  table.appendChild(makeMatrix('B', ['b11','b12','b21','b22']));
  const eq = document.createElement('span');
  eq.textContent = '=';
  eq.style.cssText = 'font-size:1.2rem; color:var(--text-dim);';
  table.appendChild(eq);
  table.appendChild(makeMatrix('C', ['c11','c12','c21','c22'], false));
  container.appendChild(table);

  compute();
}

function eigenTransform(container: HTMLElement): void {
  container.innerHTML = '<div class="controls"><label>a\u2081\u2081: <input type="range" id="e11" min="-3" max="3" value="2" step="0.5"><span id="e11v">2</span></label><label>a\u2081\u2082: <input type="range" id="e12" min="-3" max="3" value="1" step="0.5"><span id="e12v">1</span></label><label>a\u2082\u2081: <input type="range" id="e21" min="-3" max="3" value="0" step="0.5"><span id="e21v">0</span></label><label>a\u2082\u2082: <input type="range" id="e22" min="-3" max="3" value="1" step="0.5"><span id="e22v">1</span></label></div>';
  const { ctx, w, h } = createCanvas(container, 400, 300);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  function draw(): void {
    const a = parseFloat((document.getElementById('e11') as HTMLInputElement).value);
    const b = parseFloat((document.getElementById('e12') as HTMLInputElement).value);
    const c = parseFloat((document.getElementById('e21') as HTMLInputElement).value);
    const d = parseFloat((document.getElementById('e22') as HTMLInputElement).value);
    (['e11','e12','e21','e22'] as const).forEach(id => {
      document.getElementById(id+'v')!.textContent = (document.getElementById(id) as HTMLInputElement).value;
    });

    const ox = w / 2, oy = h / 2, s = 40;
    ctx.clearRect(0, 0, w, h);
    drawAxes(ctx, w, h, ox, oy, s, s);

    ctx.strokeStyle = 'rgba(108,92,231,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let t = 0; t <= Math.PI * 2; t += 0.02) {
      const x = Math.cos(t), y = Math.sin(t);
      const tx = a * x + b * y, ty = c * x + d * y;
      const px = ox + tx * s, py = oy - ty * s;
      t === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.arc(ox, oy, s, 0, Math.PI * 2);
    ctx.stroke();

    const tr = a + d;
    const det = a * d - b * c;
    const disc = tr * tr - 4 * det;

    if (disc >= 0) {
      const l1 = (tr + Math.sqrt(disc)) / 2;
      const l2 = (tr - Math.sqrt(disc)) / 2;

      ([[l1, '#00b894'], [l2, '#fdcb6e']] as const).forEach(([lam, color]) => {
        let vx: number, vy: number;
        if (Math.abs(b) > 0.01) { vx = b; vy = lam - a; }
        else if (Math.abs(c) > 0.01) { vx = lam - d; vy = c; }
        else { vx = 1; vy = 0; }
        const len = Math.sqrt(vx * vx + vy * vy);
        if (len > 0.01) { vx /= len; vy /= len; }

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ox - vx * s * 3, oy + vy * s * 3);
        ctx.lineTo(ox + vx * s * 3, oy - vy * s * 3);
        ctx.stroke();
      });

      caption.textContent = `Eigenvalues: \u03bb\u2081 = ${l1.toFixed(2)} (green), \u03bb\u2082 = ${l2.toFixed(2)} (yellow) | det = ${det.toFixed(2)}`;
    } else {
      const re = tr / 2;
      const im = Math.sqrt(-disc) / 2;
      caption.textContent = `Complex eigenvalues: ${re.toFixed(2)} \u00b1 ${im.toFixed(2)}i (rotation) | det = ${det.toFixed(2)}`;
    }
  }

  (['e11','e12','e21','e22'] as const).forEach(id => document.getElementById(id)!.addEventListener('input', draw));
  draw();
}

function derivativePlot(container: HTMLElement): void {
  container.innerHTML = '<div class="controls"><label>Function: <select id="dfn"><option value="x2">x\u00b2</option><option value="x3">x\u00b3</option><option value="sin">sin(x)</option><option value="sigmoid">sigmoid(x)</option></select></label><label>x = <input type="range" id="dx" min="-4" max="4" value="1" step="0.1"><span id="dxv">1</span></label></div>';
  const { ctx, w, h } = createCanvas(container, 400, 280);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  const fns: Record<string, { f: (x: number) => number; df: (x: number) => number; label: string }> = {
    x2: { f: (x: number) => x*x, df: (x: number) => 2*x, label: "f(x)=x\u00b2, f'(x)=2x" },
    x3: { f: (x: number) => x*x*x, df: (x: number) => 3*x*x, label: "f(x)=x\u00b3, f'(x)=3x\u00b2" },
    sin: { f: Math.sin, df: Math.cos, label: "f(x)=sin(x), f'(x)=cos(x)" },
    sigmoid: { f: (x: number) => 1/(1+Math.exp(-x)), df: (x: number) => { const s = 1/(1+Math.exp(-x)); return s*(1-s); }, label: "f(x)=\u03c3(x), f'(x)=\u03c3(x)(1-\u03c3(x))" },
  };

  function draw(): void {
    const fn = fns[(document.getElementById('dfn') as HTMLSelectElement).value];
    const xv = parseFloat((document.getElementById('dx') as HTMLInputElement).value);
    document.getElementById('dxv')!.textContent = xv.toFixed(1);

    const ox = w / 2, oy = h / 2, sx = 40, sy = 40;
    ctx.clearRect(0, 0, w, h);
    drawAxes(ctx, w, h, ox, oy, sx, sy);

    ctx.strokeStyle = '#6c5ce7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let px = 0; px < w; px++) {
      const x = (px - ox) / sx;
      const y = fn.f(x);
      const py = oy - y * sy;
      px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    const yv = fn.f(xv);
    const slope = fn.df(xv);
    const tpx = ox + xv * sx, tpy = oy - yv * sy;

    ctx.strokeStyle = '#00b894';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(tpx - 60, tpy + slope * 60);
    ctx.lineTo(tpx + 60, tpy - slope * 60);
    ctx.stroke();

    ctx.fillStyle = '#e17055';
    ctx.beginPath();
    ctx.arc(tpx, tpy, 5, 0, Math.PI * 2);
    ctx.fill();

    caption.textContent = `${fn.label} | At x=${xv.toFixed(1)}: f(x)=${yv.toFixed(3)}, f'(x)=${slope.toFixed(3)}`;
  }

  document.getElementById('dfn')!.addEventListener('change', draw);
  document.getElementById('dx')!.addEventListener('input', draw);
  draw();
}

function gradientField(container: HTMLElement): void {
  container.innerHTML = '<div class="caption">Gradient field of f(x,y) = x\u00b2 + y\u00b2 \u2014 arrows point uphill, gradient descent goes opposite</div>';
  const { ctx, w, h } = createCanvas(container, 400, 300);

  const ox = w / 2, oy = h / 2, s = 30;
  drawAxes(ctx, w, h, ox, oy, s, s);

  for (let gx = -6; gx <= 6; gx++) {
    for (let gy = -4; gy <= 4; gy++) {
      const dx = 2 * gx, dy = 2 * gy;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < 0.01) continue;
      const nx = dx / len * 12, ny = dy / len * 12;
      const px = ox + gx * s, py = oy - gy * s;
      const intensity = Math.min(len / 10, 1);

      ctx.strokeStyle = `rgba(108,92,231,${0.3 + intensity * 0.5})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + nx, py + ny);
      ctx.stroke();

      const a = Math.atan2(ny, nx);
      ctx.beginPath();
      ctx.moveTo(px + nx, py + ny);
      ctx.lineTo(px + nx - 4 * Math.cos(a - 0.5), py + ny - 4 * Math.sin(a - 0.5));
      ctx.moveTo(px + nx, py + ny);
      ctx.lineTo(px + nx - 4 * Math.cos(a + 0.5), py + ny - 4 * Math.sin(a + 0.5));
      ctx.stroke();
    }
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  [1, 2, 3, 4, 5].forEach(r => {
    ctx.beginPath();
    ctx.arc(ox, oy, r * s, 0, Math.PI * 2);
    ctx.stroke();
  });
}

function distributionPlot(container: HTMLElement): void {
  container.innerHTML = '<div class="controls"><label>\u03bc: <input type="range" id="dmu" min="-3" max="3" value="0" step="0.5"><span id="dmuv">0</span></label><label>\u03c3: <input type="range" id="dsig" min="0.3" max="3" value="1" step="0.1"><span id="dsigv">1</span></label></div>';
  const { ctx, w, h } = createCanvas(container, 400, 250);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  function gauss(x: number, mu: number, sig: number): number {
    return (1 / (sig * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sig) ** 2);
  }

  function draw(): void {
    const mu = parseFloat((document.getElementById('dmu') as HTMLInputElement).value);
    const sig = parseFloat((document.getElementById('dsig') as HTMLInputElement).value);
    document.getElementById('dmuv')!.textContent = String(mu);
    document.getElementById('dsigv')!.textContent = String(sig);

    ctx.clearRect(0, 0, w, h);

    const padL = 30, padB = 30, pw = w - padL - 10, ph = h - padB - 10;

    ctx.strokeStyle = '#2d3148';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, h - padB);
    ctx.lineTo(padL + pw, h - padB);
    ctx.moveTo(padL, h - padB);
    ctx.lineTo(padL, 10);
    ctx.stroke();

    ctx.fillStyle = '#555';
    ctx.font = '10px sans-serif';
    for (let x = -4; x <= 4; x++) {
      const px = padL + (x + 5) / 10 * pw;
      ctx.fillText(String(x), px - 3, h - padB + 14);
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let px = 0; px < pw; px++) {
      const x = (px / pw) * 10 - 5;
      const y = gauss(x, 0, 1);
      const py = h - padB - y * ph * 2.2;
      px === 0 ? ctx.moveTo(padL + px, py) : ctx.lineTo(padL + px, py);
    }
    ctx.stroke();

    ctx.fillStyle = 'rgba(108,92,231,0.2)';
    ctx.beginPath();
    ctx.moveTo(padL, h - padB);
    for (let px = 0; px < pw; px++) {
      const x = (px / pw) * 10 - 5;
      const y = gauss(x, mu, sig);
      ctx.lineTo(padL + px, h - padB - y * ph * 2.2);
    }
    ctx.lineTo(padL + pw, h - padB);
    ctx.fill();

    ctx.strokeStyle = '#6c5ce7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let px = 0; px < pw; px++) {
      const x = (px / pw) * 10 - 5;
      const y = gauss(x, mu, sig);
      const py = h - padB - y * ph * 2.2;
      px === 0 ? ctx.moveTo(padL + px, py) : ctx.lineTo(padL + px, py);
    }
    ctx.stroke();

    const meanPx = padL + (mu + 5) / 10 * pw;
    ctx.strokeStyle = '#e17055';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(meanPx, h - padB);
    ctx.lineTo(meanPx, 10);
    ctx.stroke();
    ctx.setLineDash([]);

    caption.textContent = `Normal Distribution N(${mu}, ${sig}\u00b2) \u2014 red dashed = mean, gray = N(0,1) reference`;
  }

  document.getElementById('dmu')!.addEventListener('input', draw);
  document.getElementById('dsig')!.addEventListener('input', draw);
  draw();
}

function bayesViz(container: HTMLElement): void {
  container.innerHTML = '<div class="controls"><label>Base rate (%): <input type="range" id="brate" min="0.1" max="20" value="1" step="0.1"><span id="bratev">1</span></label><label>Sensitivity (%): <input type="range" id="bsens" min="50" max="100" value="99" step="1"><span id="bsensv">99</span></label><label>Specificity (%): <input type="range" id="bspec" min="50" max="100" value="95" step="1"><span id="bspecv">95</span></label></div>';
  const { ctx, w, h } = createCanvas(container, 400, 200);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  function draw(): void {
    const br = parseFloat((document.getElementById('brate') as HTMLInputElement).value) / 100;
    const sens = parseFloat((document.getElementById('bsens') as HTMLInputElement).value) / 100;
    const spec = parseFloat((document.getElementById('bspec') as HTMLInputElement).value) / 100;
    document.getElementById('bratev')!.textContent = (br * 100).toFixed(1);
    document.getElementById('bsensv')!.textContent = (sens * 100).toFixed(0);
    document.getElementById('bspecv')!.textContent = (spec * 100).toFixed(0);

    const pPos = sens * br + (1 - spec) * (1 - br);
    const posterior = (sens * br) / pPos;

    ctx.clearRect(0, 0, w, h);
    const barY = 40, barH = 50;

    ctx.fillStyle = '#e17055';
    ctx.fillRect(20, barY, br * (w - 40), barH);
    ctx.fillStyle = '#2d3148';
    ctx.fillRect(20 + br * (w - 40), barY, (1 - br) * (w - 40), barH);
    ctx.fillStyle = '#fff';
    ctx.font = '11px sans-serif';
    ctx.fillText(`Prior: ${(br*100).toFixed(1)}% have disease`, 20, barY - 8);

    const barY2 = barY + barH + 35;
    ctx.fillStyle = '#00b894';
    ctx.fillRect(20, barY2, posterior * (w - 40), barH);
    ctx.fillStyle = '#2d3148';
    ctx.fillRect(20 + posterior * (w - 40), barY2, (1 - posterior) * (w - 40), barH);
    ctx.fillStyle = '#fff';
    ctx.fillText(`Posterior: ${(posterior*100).toFixed(1)}% actually have disease given positive test`, 20, barY2 - 8);

    caption.textContent = `P(Disease | Positive Test) = ${(posterior * 100).toFixed(1)}% \u2014 Even with a good test, low base rates mean most positives are false!`;
  }

  (['brate', 'bsens', 'bspec'] as const).forEach(id => document.getElementById(id)!.addEventListener('input', draw));
  draw();
}

function biasVariance(container: HTMLElement): void {
  container.innerHTML = '<div class="controls"><label>Model complexity: <input type="range" id="bvcomp" min="1" max="15" value="3"><span id="bvcompv">3</span></label></div>';
  const { ctx, w, h } = createCanvas(container, 400, 250);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  function draw(): void {
    const comp = parseInt((document.getElementById('bvcomp') as HTMLInputElement).value);
    document.getElementById('bvcompv')!.textContent = String(comp);

    ctx.clearRect(0, 0, w, h);
    const padL = 40, padB = 30, pw = w - padL - 20, ph = h - padB - 20;

    ctx.strokeStyle = '#2d3148';
    ctx.beginPath();
    ctx.moveTo(padL, h - padB);
    ctx.lineTo(padL + pw, h - padB);
    ctx.moveTo(padL, h - padB);
    ctx.lineTo(padL, 15);
    ctx.stroke();

    ctx.fillStyle = '#555';
    ctx.font = '10px sans-serif';
    ctx.fillText('Model Complexity \u2192', padL + pw / 2 - 40, h - 5);
    ctx.save();
    ctx.translate(12, h / 2 + 15);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Error \u2192', 0, 0);
    ctx.restore();

    const points = 100;
    const bias2: number[] = [], variance: number[] = [], total: number[] = [];
    for (let i = 0; i < points; i++) {
      const x = (i / points);
      const b = 0.8 * Math.exp(-3 * x) + 0.05;
      const v = 0.05 + 0.7 * (1 - Math.exp(-2.5 * x));
      bias2.push(b);
      variance.push(v);
      total.push(b + v + 0.05);
    }

    function plotLine(data: number[], color: string): void {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      data.forEach((y, i) => {
        const px = padL + (i / points) * pw;
        const py = h - padB - y * ph;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    plotLine(bias2, '#6c5ce7');
    plotLine(variance, '#fdcb6e');
    plotLine(total, '#e17055');

    const cx = (comp - 1) / 14;
    const cpx = padL + cx * pw;
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cpx, h - padB);
    ctx.lineTo(cpx, 15);
    ctx.stroke();
    ctx.setLineDash([]);

    const ly = 15;
    ([' Bias\u00b2', ' Variance', ' Total Error'] as const).forEach((label, i) => {
      const colors = ['#6c5ce7', '#fdcb6e', '#e17055'];
      ctx.fillStyle = colors[i];
      ctx.fillRect(padL + 10 + i * 100, ly, 12, 12);
      ctx.fillStyle = '#aaa';
      ctx.font = '11px sans-serif';
      ctx.fillText(label, padL + 24 + i * 100, ly + 10);
    });

    const zone = comp <= 4 ? 'Underfitting zone (high bias)' : comp >= 12 ? 'Overfitting zone (high variance)' : 'Sweet spot';
    caption.textContent = `Complexity = ${comp} \u2192 ${zone}`;
  }

  document.getElementById('bvcomp')!.addEventListener('input', draw);
  draw();
}

function gradientDescent2D(container: HTMLElement): void {
  container.innerHTML = '<div class="controls"><label>Learning rate: <input type="range" id="gdlr" min="0.01" max="0.5" value="0.1" step="0.01"><span id="gdlrv">0.1</span></label><button class="btn" id="gd-run" style="padding:0.25rem 0.8rem; font-size:0.78rem;">Run GD</button><button class="btn" id="gd-reset" style="padding:0.25rem 0.8rem; font-size:0.78rem;">Reset</button></div>';
  const { ctx, w, h } = createCanvas(container, 400, 300);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  const ox = w / 2, oy = h / 2, s = 30;
  let path: Array<{ x: number; y: number }> = [{ x: 4, y: 3 }];
  let animating = false;

  function f(x: number, y: number): number { return 0.5 * x * x + 2 * y * y; }
  function gx(x: number): number { return x; }
  function gy(y: number): number { return 4 * y; }

  function drawScene(): void {
    ctx.clearRect(0, 0, w, h);

    [0.5, 2, 5, 10, 18, 30].forEach(level => {
      ctx.strokeStyle = 'rgba(108,92,231,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let t = 0; t <= Math.PI * 2; t += 0.05) {
        const rx = Math.sqrt(2 * level);
        const ry = Math.sqrt(level / 2);
        const px = ox + rx * Math.cos(t) * s;
        const py = oy - ry * Math.sin(t) * s;
        t === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    });

    drawAxes(ctx, w, h, ox, oy, s, s);

    ctx.fillStyle = '#00b894';
    ctx.beginPath();
    ctx.arc(ox, oy, 5, 0, Math.PI * 2);
    ctx.fill();

    if (path.length > 1) {
      ctx.strokeStyle = '#e17055';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      path.forEach((p, i) => {
        const px = ox + p.x * s, py = oy - p.y * s;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    path.forEach((p, i) => {
      const px = ox + p.x * s, py = oy - p.y * s;
      ctx.fillStyle = i === path.length - 1 ? '#e17055' : 'rgba(225,112,85,0.4)';
      ctx.beginPath();
      ctx.arc(px, py, i === path.length - 1 ? 5 : 3, 0, Math.PI * 2);
      ctx.fill();
    });

    const last = path[path.length - 1];
    caption.textContent = `Step ${path.length - 1} | Position: (${last.x.toFixed(3)}, ${last.y.toFixed(3)}) | Loss: ${f(last.x, last.y).toFixed(4)}`;
  }

  function step(): void {
    const lr = parseFloat((document.getElementById('gdlr') as HTMLInputElement).value);
    const last = path[path.length - 1];
    const nx = last.x - lr * gx(last.x);
    const ny = last.y - lr * gy(last.y);
    path.push({ x: nx, y: ny });
  }

  function runGD(): void {
    if (animating) return;
    animating = true;
    let i = 0;
    function tick(): void {
      if (i >= 30 || !animating) { animating = false; return; }
      step();
      drawScene();
      i++;
      requestAnimationFrame(tick);
    }
    tick();
  }

  document.getElementById('gd-run')!.addEventListener('click', runGD);
  document.getElementById('gd-reset')!.addEventListener('click', () => {
    animating = false;
    path = [{ x: 4, y: 3 }];
    drawScene();
  });
  document.getElementById('gdlr')!.addEventListener('input', () => {
    document.getElementById('gdlrv')!.textContent = (document.getElementById('gdlr') as HTMLInputElement).value;
  });

  drawScene();
}

const interactives: Record<string, (container: HTMLElement) => void> = {
  vectorPlot,
  matMul,
  eigenTransform,
  derivativePlot,
  gradientField,
  distributionPlot,
  bayesViz,
  biasVariance,
  gradientDescent2D,
};

export function renderInteractive(type: string, container: HTMLElement): void {
  if (interactives[type]) interactives[type](container);
}
