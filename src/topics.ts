import type { Topic } from './types';

// === Topic Data ===
export const TOPICS: Topic[] = [
  // ===================== FOUNDATIONS =====================
  {
    id: 'foundations',
    title: 'Foundations',
    icon: '🧱',
    description: 'Algebra, functions, notation — the prerequisites for everything else.',
    lessons: [
      {
        id: 'algebra-essentials',
        title: 'Algebra Essentials',
        content: `
<h2>Algebra Essentials <span class="vi">Đại số cơ bản</span></h2>
<p>These rules appear constantly in ML derivations. You need them to be second nature.</p>

<h3>Exponent Rules <span class="vi">Quy tắc lũy thừa</span></h3>
<p>Why learn exponent rules? Because ML is built on exponentials <span class="vi">hàm mũ</span>. Every time you compute softmax, every Gaussian distribution, every learning rate decay — you're using these rules. Think of exponents as a language: once you speak it fluently, formulas that looked intimidating become simple manipulations.</p>

<div class="concept-box formula">
  <div class="box-label">Rules <span class="vi">Quy tắc</span></div>
  $$a^m \\cdot a^n = a^{m+n} \\qquad \\frac{a^m}{a^n} = a^{m-n}$$
  $$(a^m)^n = a^{mn} \\qquad a^0 = 1 \\qquad a^{-n} = \\frac{1}{a^n}$$
  $$(ab)^n = a^n b^n \\qquad a^{1/n} = \\sqrt[n]{a}$$
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Simplify $e^{2x} \\cdot e^{-x} \\cdot e^{3}$</p>
  <p><strong>Step 1:</strong> Apply the product rule — when bases are the same, add exponents: $e^{2x + (-x) + 3}$</p>
  <p><strong>Step 2:</strong> Simplify the exponent: $e^{x + 3}$</p>
  <p><strong>ML connection:</strong> This is exactly what happens when you multiply Gaussian probabilities — the exponents add up, which is why we use log-likelihood.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A learning rate schedule uses $\\eta_t = 0.01 \\cdot (0.5)^{t/10}$. What is the learning rate at epoch $t = 20$?</p>
  <p><strong>Step 1:</strong> Substitute $t = 20$: $\\eta_{20} = 0.01 \\cdot (0.5)^{20/10} = 0.01 \\cdot (0.5)^2$</p>
  <p><strong>Step 2:</strong> Compute: $0.01 \\cdot 0.25 = 0.0025$</p>
  <p><strong>Answer:</strong> The learning rate has decayed to $0.0025$, one-quarter of the initial value.</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p>Exponents appear in softmax ($e^{z_k}$), Gaussian distributions ($e^{-x^2}$), learning rate decay ($\\eta \\cdot 0.1^{\\text{epoch}/30}$), and computational complexity ($O(n^2)$ vs $O(n^3)$).</p>
</div>

<h3>Logarithm Rules <span class="vi">Quy tắc logarit</span></h3>
<p>Think of logarithms as the "undo button" for exponents <span class="vi">nút hoàn tác của hàm mũ</span>. If exponents make numbers explode, logs bring them back to a human-readable scale. This is why almost every loss function in ML uses a log somewhere — it compresses huge ranges into manageable numbers and, crucially, turns multiplications into additions.</p>

<div class="concept-box formula">
  <div class="box-label">Rules <span class="vi">Quy tắc</span></div>
  $$\\log(ab) = \\log a + \\log b \\qquad \\log\\frac{a}{b} = \\log a - \\log b$$
  $$\\log(a^n) = n \\log a \\qquad \\log_a b = \\frac{\\ln b}{\\ln a}$$
  $$\\ln(e^x) = x \\qquad e^{\\ln x} = x$$
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> You have 3 independent data points with probabilities $P(x_1) = 0.2$, $P(x_2) = 0.5$, $P(x_3) = 0.1$. Compute the log-likelihood <span class="vi">log hợp lý</span>.</p>
  <p><strong>Step 1:</strong> The likelihood is the product: $\\mathcal{L} = 0.2 \\times 0.5 \\times 0.1 = 0.01$</p>
  <p><strong>Step 2:</strong> Apply the log rule $\\log(abc) = \\log a + \\log b + \\log c$:</p>
  <p>$\\ell = \\ln(0.2) + \\ln(0.5) + \\ln(0.1) \\approx -1.61 + (-0.69) + (-2.30) = -4.60$</p>
  <p><strong>Step 3:</strong> Verify: $e^{-4.60} \\approx 0.01$ ✓</p>
  <p><strong>ML connection:</strong> With millions of data points, the product would underflow to zero. The sum of logs stays numerically stable.</p>
</div>

<div class="concept-box warning">
  <div class="box-label">Convention <span class="vi">Quy ước</span></div>
  <p>In ML/CS, $\\log$ usually means <strong>natural log</strong> <span class="vi">logarit tự nhiên</span> ($\\ln$, base $e$), not base 10. In information theory, $\\log_2$ (base 2) is used for bits.</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p>Logs are essential because they turn <strong>products into sums</strong> <span class="vi">tích thành tổng</span>:</p>
  <ul>
    <li><strong>Log-likelihood</strong> <span class="vi">log hợp lý</span>: $\\log \\prod P(x_i) = \\sum \\log P(x_i)$ — numerically stable <span class="vi">ổn định số học</span></li>
    <li><strong>Cross-entropy</strong> <span class="vi">entropy chéo</span>: $-\\sum y_i \\log \\hat{y}_i$</li>
    <li><strong>Log scale</strong> <span class="vi">thang logarit</span>: Learning rates are often searched on log scale (0.001, 0.01, 0.1)</li>
  </ul>
</div>

<h3>Polynomial Expressions <span class="vi">Biểu thức đa thức</span></h3>
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>A <strong>polynomial</strong> <span class="vi">đa thức</span> of degree $n$:</p>
  $$f(x) = a_n x^n + a_{n-1} x^{n-1} + \\cdots + a_1 x + a_0$$
  <p>Special cases: linear <span class="vi">tuyến tính</span> ($n=1$), quadratic <span class="vi">bậc hai</span> ($n=2$), cubic <span class="vi">bậc ba</span> ($n=3$).</p>
</div>

<h3>Inequalities <span class="vi">Bất đẳng thức</span></h3>
<p>Inequalities give you guarantees <span class="vi">đảm bảo</span> — upper bounds, lower bounds, constraints on what is possible. Think of them as the "speed limits" of mathematics: they tell you the range of what a quantity can be, even when you cannot compute its exact value. In ML, inequalities power everything from proving that cosine similarity stays between $-1$ and $1$, to deriving the evidence lower bound (ELBO) in variational autoencoders.</p>

<p>Key inequalities in ML:</p>
<ul>
  <li><strong>AM-GM</strong> <span class="vi">Trung bình cộng - Trung bình nhân</span>: $\\frac{a+b}{2} \\geq \\sqrt{ab}$</li>
  <li><strong>Cauchy-Schwarz</strong>: $|\\mathbf{a} \\cdot \\mathbf{b}| \\leq \\|\\mathbf{a}\\| \\|\\mathbf{b}\\|$ — proves cosine similarity is in $[-1, 1]$</li>
  <li><strong>Jensen's inequality</strong> <span class="vi">Bất đẳng thức Jensen</span>: For convex $f$: $f(\\mathbb{E}[X]) \\leq \\mathbb{E}[f(X)]$ — foundational for variational inference <span class="vi">suy luận biến phân</span></li>
</ul>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Two document embeddings have $\\mathbf{a} \\cdot \\mathbf{b} = 6$, $\\|\\mathbf{a}\\| = 3$, $\\|\\mathbf{b}\\| = 4$. Is the cosine similarity valid?</p>
  <p><strong>Step 1:</strong> Cauchy-Schwarz says $|\\mathbf{a} \\cdot \\mathbf{b}| \\leq \\|\\mathbf{a}\\| \\|\\mathbf{b}\\|$, so $|6| \\leq 3 \\times 4 = 12$. ✓</p>
  <p><strong>Step 2:</strong> Cosine similarity $= \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\|\\mathbf{a}\\| \\|\\mathbf{b}\\|} = \\frac{6}{12} = 0.5$</p>
  <p><strong>Answer:</strong> Yes, $0.5 \\in [-1, 1]$ as guaranteed by Cauchy-Schwarz. The documents are moderately similar.</p>
</div>
`,
        quiz: [
          { q: '$\\log(ab)$ equals:', options: ['$\\log a \\cdot \\log b$', '$\\log a + \\log b$', '$(\\log a)^b$', '$\\log a - \\log b$'], answer: 1 },
          { q: '$e^{\\ln 5}$ equals:', options: ['$e^5$', '$\\ln 5$', '$5$', '$5e$'], answer: 2 },
          { q: 'Why do we use log-likelihood instead of likelihood in ML?', options: ['Logs are faster to compute', 'Products become sums, preventing numerical underflow', 'Logs make the result larger', 'It is just a convention'], answer: 1 },
        ],
        bloom: [
          { type: 'choice', level: 0, prompt: '$a^0$ equals (for any $a \\neq 0$):', options: ['$0$', '$a$', '$1$', 'undefined'], answer: 2 },
          { type: 'match', level: 1, prompt: 'Match each log rule to its meaning:', pairs: [['$\\log(ab)$', '$\\log a + \\log b$'], ['$\\log(a/b)$', '$\\log a - \\log b$'], ['$\\log(a^n)$', '$n \\log a$']] },
          { type: 'numeric', level: 2, prompt: 'Simplify: $\\log_2(8) + \\log_2(4)$. What is the result?', correctValue: 5, tolerance: 0 },
          { type: 'order', level: 3, prompt: 'Order these ML concepts by how they use logarithms (most fundamental first):', correctOrder: ['Log transforms products to sums', 'Log-likelihood for numerical stability', 'Cross-entropy loss $-\\sum y \\log \\hat{y}$', 'KL divergence uses log ratios'] },
          { type: 'explain', level: 4, prompt: 'Explain why computing $\\log P(x_1) + \\log P(x_2) + ... + \\log P(x_n)$ is better than computing $P(x_1) \\cdot P(x_2) \\cdot ... \\cdot P(x_n)$ directly. What goes wrong with the product approach?' },
          { type: 'open', level: 5, prompt: 'Design a learning rate search strategy using log scale. Why do we search [0.001, 0.01, 0.1] instead of [0.001, 0.002, 0.003]? Create a concrete example with 5 learning rates you would try.' },
        ],
        homework: [
          { id: 'hw-algebra-essentials-1', type: 'numeric', prompt: 'Simplify: $2^3 \\cdot 2^{-5} \\cdot 2^4$. What is the result?', answer: 4, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-algebra-essentials-2', type: 'numeric', prompt: 'Compute $\\log_2(64) + \\log_2(1/8)$.', answer: 3, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-algebra-essentials-3', type: 'free-response', prompt: 'Explain why $\\log$ transforms products into sums, and give an ML example where this property is essential.', hint: 'Think about computing the likelihood of many independent data points.', difficulty: 'medium' },
          { id: 'hw-algebra-essentials-4', type: 'multiple-choice', prompt: 'Which inequality states that for a convex function $f$: $f(\\mathbb{E}[X]) \\leq \\mathbb{E}[f(X)]$?', options: ['Cauchy-Schwarz', 'AM-GM', 'Jensen\'s inequality', 'Triangle inequality'], answer: 'Jensen\'s inequality', difficulty: 'medium' },
          { id: 'hw-algebra-essentials-5', type: 'free-response', prompt: 'A dataset has $n = 10^6$ samples each with probability $P(x_i) \\approx 10^{-3}$. Explain step by step why computing $\\prod P(x_i)$ directly fails numerically, and how using log-likelihood fixes the problem.', hint: 'Compute what $10^{-3}$ raised to the power $10^6$ would be.', difficulty: 'hard' },
        ],
      },
      {
        id: 'functions',
        title: 'Functions & Graphs',
        content: `
<h2>Functions & Graphs <span class="vi">Hàm số & Đồ thị</span></h2>
<p>A function <span class="vi">hàm số</span> maps each input to exactly one output. Understanding function shapes is crucial for choosing activation functions <span class="vi">hàm kích hoạt</span> and loss functions.</p>

<h3>Key Concepts <span class="vi">Khái niệm chính</span></h3>
<p>Think of a function as a machine <span class="vi">cỗ máy</span>: you feed in an input, it does something to it, and out comes exactly one output. The "domain" is what you are allowed to feed in, and the "range" is what can come out. In ML, this matters because every layer in a neural network is a function, and you need to know what goes in and what comes out to wire layers together correctly.</p>

<div class="concept-box definition">
  <div class="box-label">Definitions <span class="vi">Định nghĩa</span></div>
  <ul>
    <li><strong>Domain</strong> <span class="vi">miền xác định</span>: Set of valid inputs</li>
    <li><strong>Range</strong> <span class="vi">miền giá trị</span>: Set of possible outputs</li>
    <li><strong>Injective (one-to-one)</strong> <span class="vi">đơn ánh</span>: Different inputs → different outputs</li>
    <li><strong>Surjective (onto)</strong> <span class="vi">toàn ánh</span>: Every output is reached</li>
    <li><strong>Bijective</strong> <span class="vi">song ánh</span>: Both injective and surjective → has an inverse <span class="vi">hàm ngược</span></li>
  </ul>
</div>

<h3>Essential Functions for ML <span class="vi">Hàm thiết yếu cho ML</span></h3>
<p>Each of these functions has a distinct "shape" <span class="vi">hình dạng</span>, and that shape determines its behavior. Sigmoid squashes everything into $(0, 1)$ — perfect for probabilities. ReLU kills negatives and passes positives — simple and fast, which is why it dominates deep learning. Learning to recognize these shapes is like learning to recognize musical instruments by their sound.</p>

<table class="example-table">
  <tr><th>Function <span class="vi">Hàm</span></th><th>Formula <span class="vi">Công thức</span></th><th>ML Use <span class="vi">Ứng dụng ML</span></th></tr>
  <tr><td><strong>Linear</strong> <span class="vi">Tuyến tính</span></td><td>$f(x) = ax + b$</td><td>Linear regression <span class="vi">hồi quy tuyến tính</span>, linear layers</td></tr>
  <tr><td><strong>Quadratic</strong> <span class="vi">Bậc hai</span></td><td>$f(x) = ax^2 + bx + c$</td><td>MSE loss <span class="vi">hàm mất mát MSE</span>, parabolic loss surface</td></tr>
  <tr><td><strong>Exponential</strong> <span class="vi">Hàm mũ</span></td><td>$f(x) = e^x$</td><td>Softmax, Boltzmann distribution, growth/decay</td></tr>
  <tr><td><strong>Logarithmic</strong> <span class="vi">Logarit</span></td><td>$f(x) = \\ln(x)$</td><td>Cross-entropy, log-likelihood, log scale</td></tr>
  <tr><td><strong>Sigmoid</strong></td><td>$\\sigma(x) = \\frac{1}{1+e^{-x}}$</td><td>Binary classification <span class="vi">phân loại nhị phân</span>, gates in LSTM</td></tr>
  <tr><td><strong>ReLU</strong></td><td>$f(x) = \\max(0, x)$</td><td>Most common activation <span class="vi">hàm kích hoạt phổ biến nhất</span></td></tr>
  <tr><td><strong>Tanh</strong></td><td>$f(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}$</td><td>Output range $(-1, 1)$, RNNs</td></tr>
</table>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Compute $\\sigma(2)$ where $\\sigma(x) = \\frac{1}{1+e^{-x}}$ (sigmoid).</p>
  <p><strong>Step 1:</strong> Plug in $x = 2$: $\\sigma(2) = \\frac{1}{1 + e^{-2}}$</p>
  <p><strong>Step 2:</strong> Compute $e^{-2} \\approx 0.135$, so $\\sigma(2) = \\frac{1}{1 + 0.135} = \\frac{1}{1.135}$</p>
  <p><strong>Step 3:</strong> $\\sigma(2) \\approx 0.881$</p>
  <p><strong>ML connection:</strong> A logit value of 2 maps to an 88.1% probability — the model is fairly confident this is the positive class.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Compare ReLU and sigmoid at $x = -3$ and $x = 3$.</p>
  <p><strong>Step 1:</strong> At $x = -3$: $\\text{ReLU}(-3) = \\max(0, -3) = 0$. Sigmoid: $\\sigma(-3) = \\frac{1}{1+e^3} \\approx \\frac{1}{21.09} \\approx 0.047$</p>
  <p><strong>Step 2:</strong> At $x = 3$: $\\text{ReLU}(3) = 3$. Sigmoid: $\\sigma(3) \\approx 0.953$</p>
  <p><strong>Answer:</strong> ReLU completely kills negative inputs (outputs 0), while sigmoid only suppresses them to near-zero. ReLU passes positive values unchanged; sigmoid caps them near 1. This is why ReLU trains faster — its gradient for positive values is always 1.</p>
</div>

<h3>Function Composition <span class="vi">Hàm hợp</span></h3>
<p>Composition is like an assembly line <span class="vi">dây chuyền lắp ráp</span>: the output of one machine becomes the input of the next. A 10-layer neural network is literally 10 functions chained together. Understanding composition is the key to understanding how data flows through a network — and later, how gradients flow backward (backpropagation).</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$(f \\circ g)(x) = f(g(x))$$
</div>
<p>A neural network IS a composition of functions: $\\hat{y} = f_L \\circ f_{L-1} \\circ \\cdots \\circ f_1(\\mathbf{x})$</p>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A single neuron computes: linear transform then activation. Let $g(x) = 3x - 1$ (linear) and $f(x) = \\text{ReLU}(x)$ (activation). Compute $(f \\circ g)(x)$ for $x = 0$ and $x = 2$.</p>
  <p><strong>Step 1:</strong> For $x = 0$: First compute $g(0) = 3(0) - 1 = -1$. Then $f(-1) = \\text{ReLU}(-1) = 0$.</p>
  <p><strong>Step 2:</strong> For $x = 2$: First compute $g(2) = 3(2) - 1 = 5$. Then $f(5) = \\text{ReLU}(5) = 5$.</p>
  <p><strong>Answer:</strong> $(f \\circ g)(0) = 0$ and $(f \\circ g)(2) = 5$. Notice the neuron "fires" for $x = 2$ but not $x = 0$ — this is how neural networks learn to respond selectively to different inputs.</p>
</div>

<h3>Inverse Functions <span class="vi">Hàm ngược</span></h3>
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>$f^{-1}$ undoes $f$: if $f(a) = b$, then $f^{-1}(b) = a$.</p>
  <p>Key pairs: $e^x \\leftrightarrow \\ln x$, $x^2 \\leftrightarrow \\sqrt{x}$, sigmoid $\\leftrightarrow$ logit ($\\ln\\frac{p}{1-p}$)</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p>The <strong>logit function</strong> <span class="vi">hàm logit</span> $\\text{logit}(p) = \\ln\\frac{p}{1-p}$ is the inverse of sigmoid. It maps probabilities $(0,1)$ to real numbers $(-\\infty, +\\infty)$. This is why the raw outputs of a classifier are called "logits" <span class="vi">giá trị logit</span>.</p>
</div>
`,
        quiz: [
          { q: 'The inverse of $e^x$ is:', options: ['$x^e$', '$\\ln(x)$', '$10^x$', '$1/e^x$'], answer: 1 },
          { q: 'ReLU is defined as:', options: ['$1/(1+e^{-x})$', '$\\max(0, x)$', '$\\tanh(x)$', '$x^2$'], answer: 1 },
          { q: 'A neural network is mathematically a:', options: ['Single function', 'Composition of functions', 'Matrix', 'Probability distribution'], answer: 1 },
        ],
        homework: [
          { id: 'hw-functions-1', type: 'numeric', prompt: 'Compute $\\sigma(0)$ where $\\sigma(x) = \\frac{1}{1+e^{-x}}$.', answer: 0.5, tolerance: 0.01, difficulty: 'easy' },
          { id: 'hw-functions-2', type: 'multiple-choice', prompt: 'Which function maps $(-\\infty, +\\infty)$ to $(0, 1)$?', options: ['ReLU', 'Sigmoid', 'Tanh', 'Linear'], answer: 'Sigmoid', difficulty: 'easy' },
          { id: 'hw-functions-3', type: 'free-response', prompt: 'Given $f(x) = \\text{ReLU}(x)$ and $g(x) = 2x - 1$, compute $(f \\circ g)(x)$ and describe when the output is zero.', hint: 'Substitute $g(x)$ into $f$, and recall ReLU outputs zero for negative inputs.', difficulty: 'medium' },
          { id: 'hw-functions-4', type: 'free-response', prompt: 'The logit function is the inverse of sigmoid: $\\text{logit}(p) = \\ln\\frac{p}{1-p}$. Verify that $\\sigma(\\text{logit}(0.8))=0.8$ by computing step by step. Then explain why neural network outputs before sigmoid are called "logits."', hint: 'Compute logit(0.8) first, then plug into sigmoid.', difficulty: 'hard' },
        ],
      },
      {
        id: 'summation-notation',
        title: 'Summation & Product Notation',
        content: `
<h2>Summation & Product Notation <span class="vi">Ký hiệu tổng & tích</span></h2>
<p>ML papers use these constantly. You must read them fluently.</p>

<h3>Sigma Notation (Summation) <span class="vi">Ký hiệu Sigma (Phép tổng)</span></h3>
<p>Summation notation is just a compact way to write "add up a bunch of things" <span class="vi">cộng tất cả lại</span>. Think of it like a <code>for</code> loop in programming: the variable $i$ is your loop counter, the bottom says where to start, the top says where to stop, and the expression after $\\Sigma$ is the body of the loop. If you can read a <code>for</code> loop, you can read a summation.</p>

<div class="concept-box formula">
  <div class="box-label">Notation <span class="vi">Ký hiệu</span></div>
  $$\\sum_{i=1}^{n} a_i = a_1 + a_2 + \\cdots + a_n$$
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Compute $\\sum_{i=1}^{4} (3i + 1)$</p>
  <p><strong>Step 1:</strong> Expand — plug in $i = 1, 2, 3, 4$: $(3(1)+1) + (3(2)+1) + (3(3)+1) + (3(4)+1)$</p>
  <p><strong>Step 2:</strong> Evaluate each term: $4 + 7 + 10 + 13$</p>
  <p><strong>Step 3:</strong> Add: $4 + 7 + 10 + 13 = 34$</p>
  <p><strong>Answer:</strong> $34$</p>
</div>

<h3>Common Sums <span class="vi">Các tổng thường gặp</span></h3>
<table class="example-table">
  <tr><th>Sum <span class="vi">Tổng</span></th><th>Result <span class="vi">Kết quả</span></th><th>Used In <span class="vi">Dùng trong</span></th></tr>
  <tr><td>$\\sum_{i=1}^{n} 1$</td><td>$n$</td><td>Counting</td></tr>
  <tr><td>$\\sum_{i=1}^{n} i$</td><td>$\\frac{n(n+1)}{2}$</td><td>Complexity analysis</td></tr>
  <tr><td>$\\sum_{i=1}^{n} x_i / n$</td><td>$\\bar{x}$ (mean <span class="vi">trung bình</span>)</td><td>Everywhere</td></tr>
  <tr><td>$\\sum_{i=1}^{n} (x_i - \\bar{x})^2$</td><td>Sum of squares <span class="vi">tổng bình phương</span></td><td>Variance <span class="vi">phương sai</span>, MSE</td></tr>
</table>

<h3>Properties of Summation <span class="vi">Tính chất của phép tổng</span></h3>
<p>These properties let you rearrange and simplify sums — essential when deriving ML formulas. The key insight: summation is <strong>linear</strong> <span class="vi">tuyến tính</span>, meaning you can split sums apart and pull constants out. This is the reason so many ML derivations involve rearranging sums before taking derivatives.</p>

<div class="concept-box definition">
  <div class="box-label">Rules <span class="vi">Quy tắc</span></div>
  $$\\sum_{i=1}^{n} (a_i + b_i) = \\sum a_i + \\sum b_i \\quad \\text{(linearity / tính tuyến tính)}$$
  $$\\sum_{i=1}^{n} c \\cdot a_i = c \\sum_{i=1}^{n} a_i \\quad \\text{(constant factor / hằng số)}$$
  $$\\sum_{i=1}^{n} c = n \\cdot c$$
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Compute the mean squared error (MSE) for predictions $\\hat{y} = [2, 4, 3]$ vs. true values $y = [1, 5, 2]$ with $n = 3$.</p>
  <p><strong>Step 1:</strong> Write the formula: $\\text{MSE} = \\frac{1}{n}\\sum_{i=1}^{n}(y_i - \\hat{y}_i)^2$</p>
  <p><strong>Step 2:</strong> Compute each squared error: $(1-2)^2 + (5-4)^2 + (2-3)^2 = 1 + 1 + 1 = 3$</p>
  <p><strong>Step 3:</strong> Divide by $n$: $\\text{MSE} = \\frac{3}{3} = 1.0$</p>
  <p><strong>Answer:</strong> $\\text{MSE} = 1.0$. Each prediction was off by exactly 1.</p>
</div>

<h3>Double Summation <span class="vi">Tổng kép</span></h3>
<p>A double sum is like a nested <code>for</code> loop — the outer loop runs through rows, the inner loop runs through columns. This is how you sum all elements of a matrix, and it appears constantly in matrix multiplication, attention mechanisms, and loss functions over batches.</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\sum_{i=1}^{m} \\sum_{j=1}^{n} a_{ij} = \\text{sum over all elements of a matrix}$$
  <p style="text-align:left;"><span class="vi">Tổng tất cả phần tử của ma trận</span></p>
</div>

<h3>Pi Notation (Product) <span class="vi">Ký hiệu Pi (Phép tích)</span></h3>
<p>Just as $\\Sigma$ means "add them all up," $\\Pi$ means "multiply them all together" <span class="vi">nhân tất cả lại</span>. Products appear whenever events are independent — the joint probability of independent events is the product of their individual probabilities. This is the foundation of likelihood in ML.</p>

<div class="concept-box formula">
  <div class="box-label">Notation <span class="vi">Ký hiệu</span></div>
  $$\\prod_{i=1}^{n} a_i = a_1 \\cdot a_2 \\cdots a_n$$
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A classifier assigns probabilities $P(y_1|x_1) = 0.9$, $P(y_2|x_2) = 0.8$, $P(y_3|x_3) = 0.7$ to 3 correct labels. Compute the likelihood and log-likelihood.</p>
  <p><strong>Step 1:</strong> Likelihood: $\\mathcal{L} = \\prod_{i=1}^{3} P(y_i|x_i) = 0.9 \\times 0.8 \\times 0.7 = 0.504$</p>
  <p><strong>Step 2:</strong> Log-likelihood: $\\ell = \\sum_{i=1}^{3} \\ln P(y_i|x_i) = \\ln(0.9) + \\ln(0.8) + \\ln(0.7)$</p>
  <p><strong>Step 3:</strong> $\\ell \\approx -0.105 + (-0.223) + (-0.357) = -0.685$</p>
  <p><strong>Answer:</strong> Likelihood $= 0.504$, log-likelihood $= -0.685$. Verify: $e^{-0.685} \\approx 0.504$ ✓</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Likelihood</strong> <span class="vi">hàm hợp lý</span>: $\\mathcal{L}(\\theta) = \\prod_{i=1}^{n} P(x_i | \\theta)$ — product of individual probabilities</li>
    <li><strong>Log-likelihood</strong>: $\\ell(\\theta) = \\sum_{i=1}^{n} \\log P(x_i | \\theta)$ — log turns $\\prod$ into $\\sum$</li>
    <li><strong>MSE</strong>: $\\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2$</li>
    <li><strong>Softmax denominator</strong>: $\\sum_{j=1}^{K} e^{z_j}$</li>
    <li><strong>Matrix multiplication</strong>: $c_{ij} = \\sum_{k} a_{ik} b_{kj}$</li>
  </ul>
</div>

<h3>Argmax & Argmin <span class="vi">Chỉ số cực đại & cực tiểu</span></h3>
<p>Here is a subtle but important distinction <span class="vi">sự khác biệt quan trọng</span>: $\\max$ gives you the biggest <em>value</em>, but $\\arg\\max$ gives you the <em>input</em> that produced that value. It is like the difference between "What's the highest score?" vs. "Who got the highest score?" In classification, we don't care what the highest probability is — we care <em>which class</em> has it.</p>

<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  $$\\arg\\max_x f(x) = \\text{the value of } x \\text{ that maximizes } f(x)$$
  $$\\arg\\min_x f(x) = \\text{the value of } x \\text{ that minimizes } f(x)$$
  <p><span class="vi">argmax trả về giá trị $x$ làm $f(x)$ lớn nhất, argmin trả về giá trị $x$ làm $f(x)$ nhỏ nhất</span></p>
</div>
<p>Classification prediction: $\\hat{y} = \\arg\\max_k P(y = k | \\mathbf{x})$ — pick the class with highest probability <span class="vi">chọn lớp có xác suất cao nhất</span>.</p>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A softmax classifier outputs probabilities $[0.1, 0.65, 0.25]$ for classes $[\\text{cat}, \\text{dog}, \\text{bird}]$. What is the prediction?</p>
  <p><strong>Step 1:</strong> Find the maximum probability: $\\max(0.1, 0.65, 0.25) = 0.65$</p>
  <p><strong>Step 2:</strong> Find which class achieves it: $\\arg\\max_k P(y=k|\\mathbf{x}) = \\text{dog}$ (index 1)</p>
  <p><strong>Answer:</strong> $\\hat{y} = \\text{dog}$. Note: $\\arg\\max$ returns "dog" (the class), not $0.65$ (the probability).</p>
</div>
`,
        quiz: [
          { q: '$\\sum_{i=1}^{4} i^2$ equals:', options: ['10', '16', '30', '20'], answer: 2 },
          { q: 'Why do we convert $\\prod P(x_i)$ to $\\sum \\log P(x_i)$?', options: ['To make it differentiable', 'To avoid numerical underflow from multiplying tiny numbers', 'To increase accuracy', 'To speed up computation'], answer: 1 },
          { q: '$\\arg\\max$ returns:', options: ['The maximum value', 'The input that gives the maximum value', 'The index of the minimum', 'The derivative at the max'], answer: 1 },
        ],
        homework: [
          { id: 'hw-summation-notation-1', type: 'numeric', prompt: 'Compute $\\sum_{i=1}^{5} (2i - 1)$.', answer: 25, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-summation-notation-2', type: 'numeric', prompt: 'Evaluate $\\sum_{i=1}^{4} i^2$.', answer: 30, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-summation-notation-3', type: 'free-response', prompt: 'Expand the double sum $\\sum_{i=1}^{2}\\sum_{j=1}^{3} a_{ij}$ into all individual terms.', hint: 'There should be 6 terms total: $a_{11}, a_{12}, \\ldots$', difficulty: 'medium' },
          { id: 'hw-summation-notation-4', type: 'free-response', prompt: 'The softmax denominator is $\\sum_{j=1}^{K} e^{z_j}$. If $K=3$ and $z=[1, 2, 3]$, compute the softmax probability for class 3. Round to 3 decimal places.', hint: 'First compute $e^1 + e^2 + e^3$, then divide $e^3$ by the total.', difficulty: 'hard' },
        ],
      },
      {
        id: 'sets-logic',
        title: 'Sets, Logic & Proof',
        content: `
<h2>Sets, Logic & Proof <span class="vi">Tập hợp, Logic & Chứng minh</span></h2>
<p>These provide the language for precise mathematical statements in ML papers.</p>

<p>If math formulas are sentences, then sets and logic are the grammar <span class="vi">ngữ pháp</span>. They define what objects you are working with, what is true about them, and how statements connect to each other. Every ML paper's "Notation" section uses these symbols. Once you learn this grammar, papers go from walls of symbols to readable statements.</p>

<h3>Set Notation <span class="vi">Ký hiệu tập hợp</span></h3>
<p>A set is just a collection of things <span class="vi">tập hợp các đối tượng</span>. Think of a dataset: it is literally a set of data points. The symbols below are shorthand for describing what is in a set and how sets relate to each other.</p>

<table class="example-table">
  <tr><th>Symbol <span class="vi">Ký hiệu</span></th><th>Meaning <span class="vi">Ý nghĩa</span></th><th>Example</th></tr>
  <tr><td>$\\in$</td><td>belongs to <span class="vi">thuộc</span></td><td>$x \\in \\mathbb{R}$ — $x$ is a real number <span class="vi">$x$ là số thực</span></td></tr>
  <tr><td>$\\notin$</td><td>not in <span class="vi">không thuộc</span></td><td>$0 \\notin \\mathbb{N}^+$</td></tr>
  <tr><td>$\\subset, \\subseteq$</td><td>subset <span class="vi">tập con</span></td><td>$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{R}$</td></tr>
  <tr><td>$\\cup$</td><td>union <span class="vi">hợp</span></td><td>$A \\cup B$ — elements in A or B</td></tr>
  <tr><td>$\\cap$</td><td>intersection <span class="vi">giao</span></td><td>$A \\cap B$ — elements in both</td></tr>
  <tr><td>$\\emptyset$</td><td>empty set <span class="vi">tập rỗng</span></td><td>No elements</td></tr>
  <tr><td>$|A|$</td><td>cardinality <span class="vi">lực lượng</span></td><td>Number of elements</td></tr>
</table>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> You train a model on dataset $A$ (1000 images) and dataset $B$ (800 images). 200 images appear in both. How many unique training images do you have?</p>
  <p><strong>Step 1:</strong> This is the inclusion-exclusion principle: $|A \\cup B| = |A| + |B| - |A \\cap B|$</p>
  <p><strong>Step 2:</strong> $|A \\cup B| = 1000 + 800 - 200 = 1600$</p>
  <p><strong>Answer:</strong> 1600 unique images. Without subtracting the intersection, you would double-count 200 images, biasing your model toward those examples.</p>
</div>

<h3>Number Sets <span class="vi">Các tập số</span></h3>
<div class="concept-box definition">
  <div class="box-label">Common Sets <span class="vi">Tập hợp thường gặp</span></div>
  <ul>
    <li>$\\mathbb{N}$ — Natural numbers <span class="vi">số tự nhiên</span>: $\\{0, 1, 2, 3, \\ldots\\}$</li>
    <li>$\\mathbb{Z}$ — Integers <span class="vi">số nguyên</span>: $\\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$</li>
    <li>$\\mathbb{R}$ — Real numbers <span class="vi">số thực</span>: all numbers on the number line</li>
    <li>$\\mathbb{R}^n$ — $n$-dimensional real space <span class="vi">không gian thực $n$ chiều</span>: vectors with $n$ entries</li>
    <li>$\\mathbb{R}^{m \\times n}$ — all $m \\times n$ real matrices <span class="vi">ma trận thực $m \\times n$</span></li>
    <li>$[0, 1]$ — closed interval <span class="vi">đoạn đóng</span>: probabilities live here</li>
  </ul>
</div>

<h3>Logic Symbols <span class="vi">Ký hiệu logic</span></h3>
<p>Logic symbols are the connective tissue of mathematical statements <span class="vi">mô liên kết của phát biểu toán học</span>. Think of $\\forall$ as "every single one, no exceptions" and $\\exists$ as "at least one." ML papers use these to state theorems precisely — for example, convergence guarantees say something like "for all $\\epsilon > 0$, there exists a number of steps $N$ such that the loss is within $\\epsilon$."</p>

<table class="example-table">
  <tr><th>Symbol <span class="vi">Ký hiệu</span></th><th>Meaning <span class="vi">Ý nghĩa</span></th></tr>
  <tr><td>$\\forall$</td><td>for all <span class="vi">với mọi</span></td></tr>
  <tr><td>$\\exists$</td><td>there exists <span class="vi">tồn tại</span></td></tr>
  <tr><td>$\\implies$</td><td>implies <span class="vi">suy ra / kéo theo</span></td></tr>
  <tr><td>$\\iff$</td><td>if and only if <span class="vi">khi và chỉ khi</span></td></tr>
  <tr><td>s.t. / $|$</td><td>such that <span class="vi">sao cho</span></td></tr>
</table>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Translate this ML statement into plain English: "$\\forall \\mathbf{x} \\in \\mathbb{R}^d, \\; \\sigma(\\mathbf{w}^T\\mathbf{x} + b) \\in (0, 1)$"</p>
  <p><strong>Step 1:</strong> $\\forall \\mathbf{x} \\in \\mathbb{R}^d$ means "for every $d$-dimensional real input vector $\\mathbf{x}$"</p>
  <p><strong>Step 2:</strong> $\\sigma(\\mathbf{w}^T\\mathbf{x} + b)$ is the sigmoid applied to the linear combination</p>
  <p><strong>Step 3:</strong> $\\in (0, 1)$ means "the result is between 0 and 1 (exclusive)"</p>
  <p><strong>Answer:</strong> "For every possible input vector, the sigmoid output is strictly between 0 and 1." This is why sigmoid is used for probability outputs in binary classification.</p>
</div>

<h3>Common ML Notation <span class="vi">Ký hiệu ML thường gặp</span></h3>
<p>This is the Rosetta Stone <span class="vi">chìa khóa giải mã</span> for reading ML papers. Every paper assumes you know these conventions. The hat ($\\hat{}$) always means "estimated/predicted," the star ($^*$) always means "optimal," and calligraphic letters ($\\mathcal{L}, \\mathcal{D}$) are reserved for special objects like loss functions and datasets. Memorize these and papers become dramatically easier to parse.</p>

<div class="concept-box ml-context">
  <div class="box-label">Reading ML Papers <span class="vi">Đọc bài báo ML</span></div>
  <ul>
    <li>$\\mathbf{x} \\in \\mathbb{R}^d$ — feature vector with $d$ dimensions <span class="vi">vectơ đặc trưng $d$ chiều</span></li>
    <li>$\\mathcal{D} = \\{(\\mathbf{x}_i, y_i)\\}_{i=1}^n$ — dataset <span class="vi">tập dữ liệu</span> of $n$ pairs</li>
    <li>$\\theta \\in \\Theta$ — parameters in parameter space <span class="vi">tham số trong không gian tham số</span></li>
    <li>$\\hat{y}$ — prediction (hat = estimate <span class="vi">mũ = ước lượng</span>)</li>
    <li>$\\theta^*$ — optimal parameters <span class="vi">tham số tối ưu</span></li>
    <li>$\\mathcal{L}(\\theta)$ — loss function <span class="vi">hàm mất mát</span></li>
    <li>$\\sim$ — "distributed as" <span class="vi">"phân phối theo"</span>: $X \\sim \\mathcal{N}(0,1)$</li>
    <li>$\\propto$ — "proportional to" <span class="vi">"tỷ lệ với"</span></li>
    <li>$\\approx$ — "approximately equal" <span class="vi">"xấp xỉ bằng"</span></li>
  </ul>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Decode this ML paper sentence: "Given $\\mathcal{D} = \\{(\\mathbf{x}_i, y_i)\\}_{i=1}^{100}$ where $\\mathbf{x}_i \\in \\mathbb{R}^{784}$ and $y_i \\in \\{0, 1, \\ldots, 9\\}$, we find $\\theta^* = \\arg\\min_\\theta \\mathcal{L}(\\theta)$."</p>
  <p><strong>Step 1:</strong> $\\mathcal{D} = \\{(\\mathbf{x}_i, y_i)\\}_{i=1}^{100}$ — a dataset of 100 pairs of (input, label)</p>
  <p><strong>Step 2:</strong> $\\mathbf{x}_i \\in \\mathbb{R}^{784}$ — each input is a 784-dimensional vector (like a flattened 28x28 image, i.e., MNIST)</p>
  <p><strong>Step 3:</strong> $y_i \\in \\{0, 1, \\ldots, 9\\}$ — labels are digits 0 through 9</p>
  <p><strong>Step 4:</strong> $\\theta^* = \\arg\\min_\\theta \\mathcal{L}(\\theta)$ — find the parameters that minimize the loss</p>
  <p><strong>Answer:</strong> "We have 100 handwritten digit images (784 pixels each) with labels 0-9, and we want to find the model parameters that minimize our loss function." This is a standard MNIST digit classification setup.</p>
</div>
`,
        quiz: [
          { q: '$x \\in \\mathbb{R}^3$ means $x$ is a:', options: ['3x3 matrix', 'Real number', 'Vector with 3 components', 'Set of 3 numbers'], answer: 2 },
          { q: 'The symbol $\\forall$ means:', options: ['There exists', 'For all', 'Implies', 'Belongs to'], answer: 1 },
          { q: 'In ML, $\\hat{y}$ typically denotes:', options: ['The true label', 'A prediction/estimate', 'A hyperparameter', 'The loss value'], answer: 1 },
        ],
        homework: [
          { id: 'hw-sets-logic-1', type: 'multiple-choice', prompt: 'What does $\\mathbf{x} \\in \\mathbb{R}^d$ mean?', options: ['$x$ is a real number', '$x$ is a $d$-dimensional real vector', '$x$ is a $d \\times d$ matrix', '$x$ is a set of $d$ elements'], answer: '$x$ is a $d$-dimensional real vector', difficulty: 'easy' },
          { id: 'hw-sets-logic-2', type: 'multiple-choice', prompt: 'The notation $\\hat{y}$ in ML typically denotes:', options: ['The true label', 'A predicted value / estimate', 'A hyperparameter', 'The loss function'], answer: 'A predicted value / estimate', difficulty: 'easy' },
          { id: 'hw-sets-logic-3', type: 'free-response', prompt: 'Write the set-builder notation for a dataset $\\mathcal{D}$ of $n$ labeled pairs where features are in $\\mathbb{R}^d$ and labels are binary. Use proper ML notation.', hint: 'Use the format $\\mathcal{D} = \\{(\\mathbf{x}_i, y_i)\\}$ with constraints on dimensions and labels.', difficulty: 'medium' },
          { id: 'hw-sets-logic-4', type: 'free-response', prompt: 'Read this statement from an ML paper: "$\\forall \\epsilon > 0, \\exists \\delta > 0$ s.t. $\\|x - a\\| < \\delta \\implies \\|f(x) - f(a)\\| < \\epsilon$." Translate it into plain English and identify what concept it defines.', hint: 'This is the formal epsilon-delta definition of a fundamental calculus concept.', difficulty: 'hard' },
        ],
      }
    ]
  },

  // ===================== COMPLEXITY & ALGORITHMS =====================
  {
    id: 'complexity',
    title: 'Complexity & Algorithms',
    icon: '⏱️',
    description: 'Big-O, time/space complexity, and the math behind LeetCode.',
    lessons: [
      {
        id: 'big-o',
        title: 'Big-O Notation',
        content: `
<h2>Big-O Notation <span class="vi">Ký hiệu Big-O / Độ phức tạp tiệm cận</span></h2>
<p>Big-O <span class="vi">Big-O</span> describes how an algorithm's runtime or memory grows <span class="vi">tăng trưởng</span> as input size $n$ increases. It captures the <strong>worst-case upper bound</strong> <span class="vi">cận trên trường hợp xấu nhất</span>.</p>

<p>Imagine you need to find a name in a phone book <span class="vi">danh bạ điện thoại</span>. You could flip through every page one by one (linear search, $O(n)$), or you could open to the middle, check whether the name comes before or after, and keep halving (binary search, $O(\\log n)$). With 1,000 pages, that is the difference between 1,000 page flips and about 10. Big-O gives us a precise language to describe this kind of scaling difference, so we can predict whether an algorithm will finish in milliseconds or centuries <em>before we even run it</em>.</p>

<h3>Formal Definition <span class="vi">Định nghĩa hình thức</span></h3>
<p>The formal definition may look intimidating, but the idea is simple: we only care about growth rate <span class="vi">tốc độ tăng trưởng</span> for large inputs. We ignore constant factors and small terms because, when $n$ is a million, whether you do $3n$ or $5n$ operations barely matters compared to the difference between $n$ and $n^2$.</p>

<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>$f(n) = O(g(n))$ means there exist constants <span class="vi">hằng số</span> $c > 0$ and $n_0$ such that:</p>
  $$f(n) \\leq c \\cdot g(n) \\quad \\text{for all } n \\geq n_0$$
  <p><span class="vi">$f(n)$ tăng không nhanh hơn $g(n)$ khi $n$ đủ lớn.</span></p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Show that $f(n) = 5n^2 + 3n + 10$ is $O(n^2)$.</p>
  <p><strong>Step 1:</strong> We need constants $c$ and $n_0$ such that $5n^2 + 3n + 10 \\leq c \\cdot n^2$ for all $n \\geq n_0$.</p>
  <p><strong>Step 2:</strong> For $n \\geq 1$: $3n \\leq 3n^2$ and $10 \\leq 10n^2$, so $5n^2 + 3n + 10 \\leq 5n^2 + 3n^2 + 10n^2 = 18n^2$.</p>
  <p><strong>Answer:</strong> Choose $c = 18$ and $n_0 = 1$. Therefore $f(n) = O(n^2)$. The constants 5, 3, and 10 all get absorbed into the single constant $c$.</p>
</div>

<h3>Common Complexities <span class="vi">Các độ phức tạp thường gặp</span></h3>
<p>The table below shows how dramatically different complexities behave at $n = 1{,}000$. Notice that $O(n^2)$ already means a million operations, while $O(2^n)$ is astronomically large -- more operations than atoms in the universe.</p>

<table class="example-table">
  <tr><th>Big-O</th><th>Name <span class="vi">Tên gọi</span></th><th>n=1000</th><th>Example <span class="vi">Ví dụ</span></th></tr>
  <tr><td>$O(1)$</td><td>Constant <span class="vi">hằng số</span></td><td>1</td><td>Hash table lookup <span class="vi">tra bảng băm</span></td></tr>
  <tr><td>$O(\\log n)$</td><td>Logarithmic <span class="vi">logarit</span></td><td>~10</td><td>Binary search <span class="vi">tìm kiếm nhị phân</span></td></tr>
  <tr><td>$O(n)$</td><td>Linear <span class="vi">tuyến tính</span></td><td>1,000</td><td>Single loop <span class="vi">một vòng lặp</span></td></tr>
  <tr><td>$O(n \\log n)$</td><td>Log-linear</td><td>~10,000</td><td>Merge sort <span class="vi">sắp xếp trộn</span>, sorting <span class="vi">sắp xếp</span></td></tr>
  <tr><td>$O(n^2)$</td><td>Quadratic <span class="vi">bậc hai</span></td><td>1,000,000</td><td>Nested loops <span class="vi">vòng lặp lồng nhau</span></td></tr>
  <tr><td>$O(n^3)$</td><td>Cubic <span class="vi">bậc ba</span></td><td>10^9</td><td>Matrix multiply <span class="vi">nhân ma trận</span></td></tr>
  <tr><td>$O(2^n)$</td><td>Exponential <span class="vi">hàm mũ</span></td><td>☠️</td><td>All subsets <span class="vi">tất cả tập con</span></td></tr>
  <tr><td>$O(n!)$</td><td>Factorial <span class="vi">giai thừa</span></td><td>☠️☠️</td><td>All permutations <span class="vi">tất cả hoán vị</span></td></tr>
</table>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Your algorithm does $n^2$ operations. How long does it take for $n = 10{,}000$ if we assume $10^8$ operations/second?</p>
  <p><strong>Step 1:</strong> Total operations = $n^2 = (10^4)^2 = 10^8$.</p>
  <p><strong>Step 2:</strong> Time = $10^8 / 10^8 = 1$ second. That is right at the limit.</p>
  <p><strong>Step 3:</strong> Now try $n = 10^5$: operations = $10^{10}$, time = $10^{10} / 10^8 = 100$ seconds. Far too slow!</p>
  <p><strong>Answer:</strong> An $O(n^2)$ algorithm handles $n = 10{,}000$ in about 1 second, but at $n = 100{,}000$ it would need ~100 seconds. This is why the LeetCode constraint table matters: it tells you which complexity class you need.</p>
</div>

<h3>Simplification Rules <span class="vi">Quy tắc đơn giản hóa</span></h3>
<p>When simplifying Big-O, think of it like rounding: you keep only the dominant <span class="vi">chiếm ưu thế</span> term. Just as we would not say a building is "100.3 meters tall" when estimating, we do not say $O(3n^2 + 7n)$ -- we say $O(n^2)$.</p>

<div class="concept-box formula">
  <div class="box-label">Rules <span class="vi">Quy tắc</span></div>
  <ul>
    <li><strong>Drop constants</strong> <span class="vi">bỏ hằng số</span>: $O(3n) = O(n)$, $O(n/2) = O(n)$</li>
    <li><strong>Drop lower terms</strong> <span class="vi">bỏ bậc thấp</span>: $O(n^2 + n) = O(n^2)$</li>
    <li><strong>Multiply nested</strong> <span class="vi">nhân khi lồng nhau</span>: loop inside loop → $O(n) \\times O(n) = O(n^2)$</li>
    <li><strong>Add sequential</strong> <span class="vi">cộng khi nối tiếp</span>: loop then loop → $O(n) + O(n) = O(n)$</li>
    <li><strong>Different inputs</strong> <span class="vi">đầu vào khác nhau</span>: $O(a + b)$ not $O(n)$ if two arrays</li>
  </ul>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> What is the time complexity of this code?</p>
  <div class="code-block">
<span class="keyword">for</span> (i = <span class="number">0</span>; i < n; i++)          <span class="comment">// loop 1</span>
    sum += arr[i]
<span class="keyword">for</span> (i = <span class="number">0</span>; i < n; i++)          <span class="comment">// loop 2</span>
    <span class="keyword">for</span> (j = <span class="number">0</span>; j < n; j++)
        <span class="keyword">if</span> (arr[i] + arr[j] == target) count++
  </div>
  <p><strong>Step 1:</strong> Loop 1 is a single pass: $O(n)$.</p>
  <p><strong>Step 2:</strong> Loop 2 is nested: $O(n) \\times O(n) = O(n^2)$.</p>
  <p><strong>Step 3:</strong> Sequential, so add: $O(n) + O(n^2) = O(n^2)$ (drop the lower term).</p>
  <p><strong>Answer:</strong> $O(n^2)$. The nested loop dominates; the single loop is negligible for large $n$.</p>
</div>

<div class="concept-box warning">
  <div class="box-label">LeetCode Rule of Thumb <span class="vi">Quy tắc ngón tay cái cho LeetCode</span></div>
  <p>Most judges allow ~$10^8$ operations per second. Use this to check if your solution will pass:</p>
  <table class="example-table">
    <tr><th>$n$ constraint</th><th>Max complexity <span class="vi">Độ phức tạp tối đa</span></th></tr>
    <tr><td>$n \\leq 10$</td><td>$O(n!)$ or $O(2^n)$ — brute force OK</td></tr>
    <tr><td>$n \\leq 20$</td><td>$O(2^n)$</td></tr>
    <tr><td>$n \\leq 500$</td><td>$O(n^3)$</td></tr>
    <tr><td>$n \\leq 5000$</td><td>$O(n^2)$</td></tr>
    <tr><td>$n \\leq 10^5$</td><td>$O(n \\log n)$</td></tr>
    <tr><td>$n \\leq 10^6$</td><td>$O(n)$</td></tr>
    <tr><td>$n \\leq 10^{18}$</td><td>$O(\\log n)$ or $O(1)$</td></tr>
  </table>
</div>
`,
        quiz: [
          { q: '$O(5n^2 + 3n + 100)$ simplifies to:', options: ['$O(5n^2)$', '$O(n^2)$', '$O(n^2 + n)$', '$O(100)$'], answer: 1 },
          { q: 'Binary search on a sorted array of 1 million items takes at most ___ comparisons:', options: ['1,000,000', '1,000', '~20', '~500,000'], answer: 2 },
          { q: 'If $n \\leq 10^5$ in a LeetCode problem, you need at most:', options: ['$O(n^3)$', '$O(n^2)$', '$O(n \\log n)$', '$O(2^n)$'], answer: 2 },
        ],
        homework: [
          { id: 'hw-big-o-1', type: 'multiple-choice', prompt: 'Simplify $O(3n^2 + 100n + 42)$.', options: ['$O(3n^2)$', '$O(n^2)$', '$O(n^2 + n)$', '$O(42)$'], answer: '$O(n^2)$', difficulty: 'easy' },
          { id: 'hw-big-o-2', type: 'numeric', prompt: 'Binary search on a sorted array of $2^{20} = 1{,}048{,}576$ items requires at most how many comparisons?', answer: 20, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-big-o-3', type: 'free-response', prompt: 'A function runs a loop of size $n$, then inside that loop calls binary search on a sorted array of size $n$. What is the overall time complexity? Show your reasoning.', hint: 'Multiply the outer loop cost by the inner operation cost.', difficulty: 'medium' },
          { id: 'hw-big-o-4', type: 'free-response', prompt: 'You have a LeetCode problem with $n \\leq 10^5$. Your current solution is $O(n^2)$. Explain why it will likely TLE, and propose two algorithmic strategies to achieve $O(n \\log n)$ or $O(n)$.', hint: 'Use the $10^8$ operations/second rule of thumb. Consider sorting+two-pointers or hash maps.', difficulty: 'hard' },
        ],
      },
      {
        id: 'time-complexity-patterns',
        title: 'Time Complexity Patterns',
        content: `
<h2>Time Complexity Patterns <span class="vi">Các mẫu độ phức tạp thời gian</span></h2>
<p>Learn to instantly recognize the complexity of common code patterns <span class="vi">mẫu mã thường gặp</span>.</p>

<p>In coding interviews and competitive programming, you rarely derive Big-O from scratch. Instead, you pattern-match <span class="vi">nhận dạng mẫu</span>: "I see a loop that halves the input -- that is $O(\\log n)$." This lesson trains your eye to recognize the most common patterns instantly, like a chess player recognizing positions.</p>

<h3>O(1) -- Constant <span class="vi">Hằng số</span></h3>
<p>Think of constant time as looking up a word in a dictionary if someone tells you the exact page number. No matter how big the dictionary is, you just go directly there.</p>
<div class="code-block">
<span class="comment">// Array access, hash lookup, math operation</span>
arr[i]                 <span class="comment">// O(1)</span>
hashMap.get(key)       <span class="comment">// O(1) average</span>
x = a + b * c          <span class="comment">// O(1)</span>
</div>

<h3>O(log n) -- Logarithmic <span class="vi">Logarit</span></h3>
<p>The key intuition: every step eliminates half the remaining work <span class="vi">mỗi bước loại bỏ nửa công việc còn lại</span>. If you start with 1,000 items and halve each time, you reach 1 item in only 10 steps ($\\log_2 1000 \\approx 10$). This is why logarithmic algorithms feel almost magical for large inputs.</p>
<div class="code-block">
<span class="comment">// Halving the search space each step</span>
<span class="keyword">while</span> (lo < hi) {        <span class="comment">// O(log n)</span>
    mid = (lo + hi) / <span class="number">2</span>
    <span class="keyword">if</span> (arr[mid] < target)
        lo = mid + <span class="number">1</span>
    <span class="keyword">else</span>
        hi = mid
}
</div>
<p>Pattern: <strong>divide the problem in half</strong> <span class="vi">chia đôi bài toán</span> each iteration. Also: balanced BST operations, exponentiation by squaring.</p>

<h3>O(n) -- Linear <span class="vi">Tuyến tính</span></h3>
<p>Linear time means you look at each element exactly once (or a constant number of times). Think of it like reading every page of a book -- you cannot finish faster than visiting each page once.</p>
<div class="code-block">
<span class="comment">// Single pass through data</span>
<span class="keyword">for</span> (i = <span class="number">0</span>; i < n; i++)    <span class="comment">// O(n)</span>
    total += arr[i]

<span class="comment">// Two pointers (still O(n))</span>
<span class="keyword">while</span> (left < right)       <span class="comment">// O(n) — each pointer moves at most n times</span>
</div>

<h3>O(n log n) -- Log-linear</h3>
<p>This is the "sweet spot" <span class="vi">điểm tối ưu</span> for sorting. You do $n$ work at each of $\\log n$ levels, like a sorting algorithm that splits the array ($\\log n$ splits) and does linear work to merge at each level. For $n = 1{,}000{,}000$, this is only about 20 million operations -- very manageable.</p>
<div class="code-block">
<span class="comment">// Sorting, then one pass</span>
arr.sort()                 <span class="comment">// O(n log n)</span>
<span class="keyword">for</span> (x <span class="keyword">in</span> arr):           <span class="comment">// O(n)</span>
    binarySearch(x)        <span class="comment">// O(log n)</span>
<span class="comment">// Total: O(n log n)</span>
</div>

<h3>O(n²) -- Quadratic <span class="vi">Bậc hai</span></h3>
<p>Quadratic time usually means comparing every pair of elements <span class="vi">so sánh mọi cặp phần tử</span>. Think of a classroom where every student shakes hands with every other student -- with 100 students that is ~5,000 handshakes, with 1,000 students it is ~500,000.</p>
<div class="code-block">
<span class="comment">// Nested loops over same data</span>
<span class="keyword">for</span> (i = <span class="number">0</span>; i < n; i++)        <span class="comment">// O(n)</span>
    <span class="keyword">for</span> (j = <span class="number">0</span>; j < n; j++)    <span class="comment">// × O(n) = O(n²)</span>
        <span class="keyword">if</span> (arr[i] + arr[j] == target) ...

<span class="comment">// Also O(n²): nested loop with j = i+1</span>
<span class="comment">// n*(n-1)/2 iterations ≈ O(n²)</span>
</div>

<h3>O(2ⁿ) -- Exponential <span class="vi">Hàm mũ</span></h3>
<p>Exponential time means the work doubles with each additional input element <span class="vi">công việc tăng gấp đôi với mỗi phần tử thêm vào</span>. At $n = 30$, that is already over a billion operations. At $n = 50$, it exceeds $10^{15}$ -- no computer can handle that in reasonable time.</p>
<div class="code-block">
<span class="comment">// Recursive without memoization</span>
<span class="keyword">def</span> fib(n):
    <span class="keyword">if</span> n <= <span class="number">1</span>: <span class="keyword">return</span> n
    <span class="keyword">return</span> fib(n<span class="number">-1</span>) + fib(n<span class="number">-2</span>)  <span class="comment">// O(2ⁿ) — two branches per call</span>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Analyze the time complexity of this function:</p>
  <div class="code-block">
<span class="keyword">def</span> mystery(arr, n):
    <span class="keyword">for</span> i <span class="keyword">in</span> range(n):          <span class="comment">// outer loop</span>
        j = <span class="number">1</span>
        <span class="keyword">while</span> j < n:              <span class="comment">// inner loop</span>
            process(arr[i], arr[j])
            j *= <span class="number">2</span>               <span class="comment">// j doubles each time</span>
  </div>
  <p><strong>Step 1:</strong> The outer loop runs $n$ times.</p>
  <p><strong>Step 2:</strong> The inner loop doubles $j$ each iteration: $j = 1, 2, 4, 8, \\ldots$ until $j \\geq n$. That is $\\log_2 n$ iterations.</p>
  <p><strong>Step 3:</strong> Multiply nested: $O(n) \\times O(\\log n) = O(n \\log n)$.</p>
  <p><strong>Answer:</strong> $O(n \\log n)$. The doubling inner loop is the key signal -- whenever you see multiply or divide by a constant inside a loop, think $\\log n$.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> What is the complexity of this two-pointer approach?</p>
  <div class="code-block">
<span class="keyword">def</span> twoSum(arr, target):
    arr.sort()                     <span class="comment">// Step A</span>
    left, right = <span class="number">0</span>, len(arr) - <span class="number">1</span>
    <span class="keyword">while</span> left < right:            <span class="comment">// Step B</span>
        s = arr[left] + arr[right]
        <span class="keyword">if</span> s == target: <span class="keyword">return</span> True
        <span class="keyword">elif</span> s < target: left += <span class="number">1</span>
        <span class="keyword">else</span>: right -= <span class="number">1</span>
  </div>
  <p><strong>Step 1:</strong> Step A (sorting) = $O(n \\log n)$.</p>
  <p><strong>Step 2:</strong> Step B (two pointers): each pointer moves at most $n$ times, so $O(n)$.</p>
  <p><strong>Step 3:</strong> Sequential: $O(n \\log n) + O(n) = O(n \\log n)$ (the sort dominates).</p>
  <p><strong>Answer:</strong> $O(n \\log n)$. Compare this with the brute-force $O(n^2)$ approach. For $n = 100{,}000$: brute force = $10^{10}$ ops (100 seconds), two-pointer = ~$1.7 \\times 10^6$ ops (instant).</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> The naive recursive Fibonacci computes fib(5). How many total function calls are made?</p>
  <p><strong>Step 1:</strong> Draw the call tree: fib(5) calls fib(4) and fib(3). fib(4) calls fib(3) and fib(2). And so on.</p>
  <p><strong>Step 2:</strong> Count calls: fib(5)=1, fib(4)=1, fib(3)=2, fib(2)=3, fib(1)=2+3=5... total = 15 calls.</p>
  <p><strong>Step 3:</strong> Notice fib(3) is computed 2 times, fib(2) is computed 3 times -- massive redundancy! Each level roughly doubles the work.</p>
  <p><strong>Answer:</strong> 15 calls for $n=5$. In general, $O(2^n)$. With memoization, each fib(k) is computed only once, reducing to $O(n)$ calls. For $n=50$: naive = $10^{15}$ calls (years), memoized = 50 calls (microseconds).</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">LeetCode Strategy <span class="vi">Chiến lược LeetCode</span></div>
  <ul>
    <li>See $O(2^n)$? → Try <strong>dynamic programming</strong> <span class="vi">quy hoạch động</span> to reduce to $O(n)$ or $O(n^2)$</li>
    <li>See $O(n^2)$ but need faster? → Try <strong>sorting + two pointers</strong> <span class="vi">sắp xếp + hai con trỏ</span> for $O(n \\log n)$, or <strong>hash map</strong> <span class="vi">bảng băm</span> for $O(n)$</li>
    <li>See $O(n)$ linear scan? → Maybe <strong>binary search</strong> <span class="vi">tìm kiếm nhị phân</span> for $O(\\log n)$</li>
    <li><strong>Sliding window</strong> <span class="vi">cửa sổ trượt</span>: Turns $O(n \\times k)$ substring problems into $O(n)$</li>
  </ul>
</div>
`,
        quiz: [
          { q: 'A function that halves the input each step is:', options: ['$O(n)$', '$O(n^2)$', '$O(\\log n)$', '$O(n \\log n)$'], answer: 2 },
          { q: 'Two nested loops over the same array of size n gives:', options: ['$O(n)$', '$O(2n)$', '$O(n^2)$', '$O(n \\log n)$'], answer: 2 },
          { q: 'Naive recursive Fibonacci (no memoization) is:', options: ['$O(n)$', '$O(n^2)$', '$O(2^n)$', '$O(\\log n)$'], answer: 2 },
        ],
        homework: [
          { id: 'hw-time-complexity-patterns-1', type: 'multiple-choice', prompt: 'A while loop that halves a variable each iteration runs in:', options: ['$O(n)$', '$O(n^2)$', '$O(\\log n)$', '$O(1)$'], answer: '$O(\\log n)$', difficulty: 'easy' },
          { id: 'hw-time-complexity-patterns-2', type: 'multiple-choice', prompt: 'Two nested for-loops each iterating from 0 to n give complexity:', options: ['$O(n)$', '$O(2n)$', '$O(n^2)$', '$O(n \\log n)$'], answer: '$O(n^2)$', difficulty: 'easy' },
          { id: 'hw-time-complexity-patterns-3', type: 'free-response', prompt: 'Analyze the time complexity: sort the array ($O(n \\log n)$), then for each element, perform binary search ($O(\\log n)$). What is the total? Is the sort or the search loop the bottleneck?', hint: 'Total = $O(n \\log n)$ + $O(n \\cdot \\log n)$.', difficulty: 'medium' },
          { id: 'hw-time-complexity-patterns-4', type: 'free-response', prompt: 'The sliding window technique turns an $O(n \\times k)$ problem into $O(n)$. Explain how this works for finding the maximum sum subarray of length $k$, and why the window avoids redundant computation.', hint: 'When the window slides by one, you add one element and remove one instead of re-summing all $k$.', difficulty: 'medium' },
          { id: 'hw-time-complexity-patterns-5', type: 'free-response', prompt: 'Naive recursive Fibonacci is $O(2^n)$ but dynamic programming makes it $O(n)$. Explain what overlapping subproblems exist and how memoization eliminates redundant computation. Relate this to the time-space tradeoff.', hint: 'Draw the recursion tree for fib(5) and count how many times fib(2) is computed.', difficulty: 'hard' },
        ],
      },
      {
        id: 'space-complexity',
        title: 'Space Complexity',
        content: `
<h2>Space Complexity <span class="vi">Độ phức tạp không gian</span></h2>
<p>Space complexity <span class="vi">độ phức tạp không gian</span> measures how much extra memory <span class="vi">bộ nhớ</span> your algorithm uses as input grows.</p>

<p>Think of space complexity like packing for a trip <span class="vi">chuẩn bị hành lý cho chuyến đi</span>. The input data is like the destination -- it exists regardless. What we measure is the extra luggage you bring: a few variables ($O(1)$, just a toothbrush), a hash map ($O(n)$, a full suitcase), or a 2D DP table ($O(n^2)$, an entire moving truck). In interviews and competitive programming, reducing space is often as important as reducing time.</p>

<h3>What Counts <span class="vi">Những gì được tính</span></h3>
<p>A common source of confusion: do we count the input itself? Usually <strong>no</strong>. We measure <em>auxiliary</em> <span class="vi">phụ trợ</span> space -- the extra memory your algorithm allocates beyond the input. An algorithm that sorts an array in-place uses $O(1)$ auxiliary space even though the array itself is $O(n)$.</p>

<div class="concept-box definition">
  <div class="box-label">Rules <span class="vi">Quy tắc</span></div>
  <ul>
    <li><strong>Input space</strong> <span class="vi">không gian đầu vào</span>: Usually NOT counted (we measure <em>auxiliary</em> <span class="vi">phụ trợ</span> space)</li>
    <li><strong>Variables</strong> <span class="vi">biến</span>: $O(1)$ — a few variables is constant space</li>
    <li><strong>Data structures</strong> <span class="vi">cấu trúc dữ liệu</span>: Arrays, hash maps, etc. → proportional to their size</li>
    <li><strong>Recursion stack</strong> <span class="vi">ngăn xếp đệ quy</span>: Each recursive call adds a stack frame <span class="vi">khung ngăn xếp</span></li>
  </ul>
</div>

<h3>Common Patterns <span class="vi">Các mẫu thường gặp</span></h3>
<table class="example-table">
  <tr><th>Pattern <span class="vi">Mẫu</span></th><th>Space</th><th>Example <span class="vi">Ví dụ</span></th></tr>
  <tr><td>In-place <span class="vi">tại chỗ</span></td><td>$O(1)$</td><td>Two pointers <span class="vi">hai con trỏ</span>, swapping</td></tr>
  <tr><td>Hash map/set</td><td>$O(n)$</td><td>Two Sum (store seen values <span class="vi">lưu giá trị đã thấy</span>)</td></tr>
  <tr><td>2D DP table <span class="vi">bảng QHĐ 2D</span></td><td>$O(n \\times m)$</td><td>Edit distance, LCS</td></tr>
  <tr><td>Recursion depth <span class="vi">độ sâu đệ quy</span></td><td>$O(\\text{depth})$</td><td>DFS on tree: $O(h)$ where $h$ = height <span class="vi">chiều cao</span></td></tr>
  <tr><td>Adjacency list <span class="vi">danh sách kề</span></td><td>$O(V + E)$</td><td>Graph storage <span class="vi">lưu đồ thị</span></td></tr>
</table>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> What is the space complexity of merge sort on an array of $n$ elements?</p>
  <p><strong>Step 1:</strong> Merge sort recursively splits the array into halves. At each merge step, it creates a temporary array to hold the merged result.</p>
  <p><strong>Step 2:</strong> The largest temporary array needed is $O(n)$ (when merging the final two halves).</p>
  <p><strong>Step 3:</strong> The recursion depth is $\\log n$ (halving each time), so the stack uses $O(\\log n)$.</p>
  <p><strong>Answer:</strong> Total auxiliary space = $O(n) + O(\\log n) = O(n)$. The temporary array dominates. This is why merge sort is not "in-place" -- it needs extra memory proportional to the input size.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Compare the space complexity of these two approaches to "Two Sum" (find two numbers that add to a target):</p>
  <p><strong>Approach A (brute force):</strong> Two nested loops. Only uses variables <code>i</code>, <code>j</code>. Space: $O(1)$.</p>
  <p><strong>Approach B (hash map):</strong> Store each number in a hash map, then look up <code>target - arr[i]</code>. The hash map stores up to $n$ entries. Space: $O(n)$.</p>
  <p><strong>Tradeoff:</strong> Approach A is $O(n^2)$ time, $O(1)$ space. Approach B is $O(n)$ time, $O(n)$ space.</p>
  <p><strong>Answer:</strong> Approach B trades $O(n)$ extra space for a dramatic time improvement from $O(n^2)$ to $O(n)$. For $n = 100{,}000$: A takes ~$10^{10}$ ops (100 sec), B takes ~$10^5$ ops (instant) but uses ~400 KB of memory (trivial).</p>
</div>

<h3>Space Optimization Tricks <span class="vi">Thủ thuật tối ưu không gian</span></h3>
<p>These techniques come up frequently in interviews when the follow-up question is "can you use less memory?"</p>

<div class="concept-box definition">
  <div class="box-label">Techniques <span class="vi">Kỹ thuật</span></div>
  <ul>
    <li><strong>Rolling array</strong> <span class="vi">mảng cuộn</span>: If DP only needs previous row, use 2 rows instead of $n$ → $O(n) \\to O(1)$ rows</li>
    <li><strong>Bit manipulation</strong> <span class="vi">thao tác bit</span>: Store boolean sets in integers → $O(1)$ for up to 32/64 elements</li>
    <li><strong>In-place modification</strong> <span class="vi">sửa đổi tại chỗ</span>: Use input array as storage (mark visited with negative values)</li>
    <li><strong>Iterative > Recursive</strong> <span class="vi">lặp tốt hơn đệ quy</span>: Convert recursion to loop to avoid stack space</li>
  </ul>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> The Fibonacci sequence uses a 1D DP array of size $n$: <code>dp[i] = dp[i-1] + dp[i-2]</code>. Can we reduce the space?</p>
  <p><strong>Step 1:</strong> Notice each value only depends on the previous <em>two</em> values, not the entire array.</p>
  <p><strong>Step 2:</strong> Replace the array with two variables: <code>prev2</code> and <code>prev1</code>. At each step, compute <code>curr = prev1 + prev2</code>, then shift: <code>prev2 = prev1; prev1 = curr</code>.</p>
  <p><strong>Step 3:</strong> We went from storing $n$ values to storing just 2 constants.</p>
  <p><strong>Answer:</strong> Space reduced from $O(n)$ to $O(1)$. This "rolling variables" pattern works whenever the DP recurrence only looks back a fixed number of steps.</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">Interview Context <span class="vi">Ngữ cảnh phỏng vấn</span></div>
  <p>Interviewers often ask: "Can you solve it with $O(1)$ extra space?" <span class="vi">"Bạn có thể giải với $O(1)$ bộ nhớ phụ không?"</span></p>
  <p>Common follow-ups:</p>
  <ul>
    <li>"You used a hash map ($O(n)$ space). Can you do it in-place?" <span class="vi">tại chỗ</span></li>
    <li>"Your 2D DP table is $O(nm)$. Can you reduce to $O(\\min(n,m))$?"</li>
    <li>"Your recursive solution uses $O(n)$ stack. Can you make it iterative?"</li>
  </ul>
</div>

<h3>Time vs Space Tradeoff <span class="vi">Đánh đổi thời gian vs không gian</span></h3>
<div class="concept-box warning">
  <div class="box-label">Key Insight <span class="vi">Hiểu biết then chốt</span></div>
  <p>You can often trade space for time <span class="vi">đổi không gian lấy thời gian</span>:</p>
  <ul>
    <li><strong>Memoization</strong> <span class="vi">ghi nhớ</span>: $O(2^n)$ time → $O(n)$ time + $O(n)$ space</li>
    <li><strong>Hash map</strong>: $O(n^2)$ time → $O(n)$ time + $O(n)$ space</li>
    <li><strong>Precomputation</strong> <span class="vi">tính trước</span>: Prefix sums use $O(n)$ space to answer range queries in $O(1)$</li>
  </ul>
</div>
`,
        quiz: [
          { q: 'A recursive DFS on a balanced binary tree of n nodes uses stack space:', options: ['$O(n)$', '$O(\\log n)$', '$O(1)$', '$O(n^2)$'], answer: 1 },
          { q: 'The "rolling array" DP optimization reduces space from:', options: ['$O(n^2)$ to $O(1)$', '$O(n^2)$ to $O(n)$', '$O(n)$ to $O(1)$', '$O(n)$ to $O(\\log n)$'], answer: 1 },
          { q: 'Hash map in Two Sum trades ___ for ___:', options: ['Time for space', 'Space for time', 'Correctness for speed', 'Readability for speed'], answer: 1 },
        ],
        homework: [
          { id: 'hw-space-complexity-1', type: 'multiple-choice', prompt: 'An in-place algorithm that only uses a few extra variables has space complexity:', options: ['$O(n)$', '$O(\\log n)$', '$O(1)$', '$O(n^2)$'], answer: '$O(1)$', difficulty: 'easy' },
          { id: 'hw-space-complexity-2', type: 'multiple-choice', prompt: 'A hash map storing up to $n$ key-value pairs uses space:', options: ['$O(1)$', '$O(\\log n)$', '$O(n)$', '$O(n^2)$'], answer: '$O(n)$', difficulty: 'easy' },
          { id: 'hw-space-complexity-3', type: 'free-response', prompt: 'A 2D DP table for edit distance between strings of length $m$ and $n$ is $O(mn)$. Explain the rolling-array trick that reduces this to $O(\\min(m,n))$.', hint: 'Each row only depends on the previous row, so you only need to keep 2 rows.', difficulty: 'medium' },
          { id: 'hw-space-complexity-4', type: 'free-response', prompt: 'Your recursive DFS solution for a binary tree uses $O(h)$ stack space where $h$ is the tree height. For a balanced tree of $n$ nodes, what is $h$? For a skewed tree? Propose an iterative solution and analyze its space.', hint: 'Balanced tree has $h = O(\\log n)$; skewed tree has $h = O(n)$. Use an explicit stack.', difficulty: 'hard' },
        ],
      },
      {
        id: 'recurrences',
        title: 'Recurrences & Master Theorem',
        content: `
<h2>Recurrences & Master Theorem <span class="vi">Hệ thức truy hồi & Định lý thợ</span></h2>
<p>Many algorithms are recursive <span class="vi">đệ quy</span>. To find their time complexity, you solve a <strong>recurrence relation</strong> <span class="vi">hệ thức truy hồi</span>.</p>

<p>A recurrence relation is like a recipe that defines a big job in terms of smaller jobs. When you say "to sort $n$ items, split into two halves, sort each half, then merge" -- that is a recurrence: $T(n) = 2T(n/2) + O(n)$. The Master Theorem is a shortcut <span class="vi">lối tắt</span> that lets you solve these recurrences instantly without having to unroll the recursion by hand. Think of it like a lookup table: plug in the parameters, read off the answer.</p>

<h3>Common Recurrences <span class="vi">Các hệ thức truy hồi thường gặp</span></h3>
<p>Before memorizing the Master Theorem, build intuition by seeing how different recurrences arise from actual algorithms:</p>

<table class="example-table">
  <tr><th>Recurrence <span class="vi">Hệ thức truy hồi</span></th><th>Solution</th><th>Algorithm <span class="vi">Thuật toán</span></th></tr>
  <tr><td>$T(n) = T(n-1) + O(1)$</td><td>$O(n)$</td><td>Linear recursion <span class="vi">đệ quy tuyến tính</span></td></tr>
  <tr><td>$T(n) = T(n-1) + O(n)$</td><td>$O(n^2)$</td><td>Selection sort <span class="vi">sắp xếp chọn</span></td></tr>
  <tr><td>$T(n) = 2T(n/2) + O(n)$</td><td>$O(n \\log n)$</td><td>Merge sort <span class="vi">sắp xếp trộn</span></td></tr>
  <tr><td>$T(n) = T(n/2) + O(1)$</td><td>$O(\\log n)$</td><td>Binary search <span class="vi">tìm kiếm nhị phân</span></td></tr>
  <tr><td>$T(n) = 2T(n-1) + O(1)$</td><td>$O(2^n)$</td><td>Towers of Hanoi <span class="vi">tháp Hà Nội</span></td></tr>
  <tr><td>$T(n) = 2T(n/2) + O(1)$</td><td>$O(n)$</td><td>Binary tree traversal <span class="vi">duyệt cây nhị phân</span></td></tr>
</table>

<h3>Master Theorem <span class="vi">Định lý thợ</span></h3>
<p>The Master Theorem applies to divide-and-conquer <span class="vi">chia để trị</span> recurrences where you split the problem into $a$ subproblems, each of size $n/b$, and do $O(n^d)$ work to split and combine. The question is: which part dominates -- the subproblems or the combine work? The answer depends on comparing $\\log_b a$ with $d$.</p>

<div class="concept-box formula">
  <div class="box-label">For Recurrences of the Form <span class="vi">Cho hệ thức dạng</span></div>
  $$T(n) = aT(n/b) + O(n^d)$$
  <p style="text-align:left; margin-top:0.5rem;">$a$ = number of subproblems <span class="vi">số bài toán con</span>, $b$ = factor of size reduction <span class="vi">hệ số giảm kích thước</span>, $d$ = work per level <span class="vi">công việc mỗi mức</span></p>
</div>

<div class="concept-box definition">
  <div class="box-label">Three Cases <span class="vi">Ba trường hợp</span></div>
  <p>Compare $\\log_b a$ with $d$:</p>
  <ul>
    <li>If $d < \\log_b a$: $T(n) = O(n^{\\log_b a})$ — <strong>subproblems dominate</strong> <span class="vi">bài toán con chiếm ưu thế</span></li>
    <li>If $d = \\log_b a$: $T(n) = O(n^d \\log n)$ — <strong>balanced</strong> <span class="vi">cân bằng</span></li>
    <li>If $d > \\log_b a$: $T(n) = O(n^d)$ — <strong>combine step dominates</strong> <span class="vi">bước kết hợp chiếm ưu thế</span></li>
  </ul>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Solve $T(n) = 4T(n/2) + O(n)$ using the Master Theorem.</p>
  <p><strong>Step 1:</strong> Identify parameters: $a = 4$ (four subproblems), $b = 2$ (each is half the size), $d = 1$ (linear combine work).</p>
  <p><strong>Step 2:</strong> Compute $\\log_b a = \\log_2 4 = 2$.</p>
  <p><strong>Step 3:</strong> Compare: $d = 1 < 2 = \\log_b a$, so subproblems dominate (Case 1).</p>
  <p><strong>Answer:</strong> $T(n) = O(n^{\\log_2 4}) = O(n^2)$. Intuitively, the algorithm creates so many subproblems that even though each level does only $O(n)$ combine work, the sheer number of subproblems at the bottom of the tree dominates the total cost.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Solve $T(n) = 3T(n/3) + O(n)$ (e.g., a 3-way partition algorithm).</p>
  <p><strong>Step 1:</strong> Identify: $a = 3$, $b = 3$, $d = 1$.</p>
  <p><strong>Step 2:</strong> Compute $\\log_b a = \\log_3 3 = 1$.</p>
  <p><strong>Step 3:</strong> Compare: $d = 1 = \\log_b a$ (Case 2: balanced).</p>
  <p><strong>Answer:</strong> $T(n) = O(n^1 \\cdot \\log n) = O(n \\log n)$. This is the same complexity as merge sort! Any time $\\log_b a = d$, every level of the recursion tree does exactly $O(n^d)$ total work, and there are $\\log n$ levels.</p>
</div>

<h3>Examples <span class="vi">Ví dụ</span></h3>
<div class="concept-box formula">
  <div class="box-label">Applying Master Theorem <span class="vi">Áp dụng định lý thợ</span></div>
  <p><strong>Merge sort</strong>: $T(n) = 2T(n/2) + O(n)$ → $a=2, b=2, d=1$ → $\\log_2 2 = 1 = d$ → Case 2: $O(n \\log n)$ ✓</p>
  <p><strong>Binary search</strong>: $T(n) = T(n/2) + O(1)$ → $a=1, b=2, d=0$ → $\\log_2 1 = 0 = d$ → Case 2: $O(\\log n)$ ✓</p>
  <p><strong>Strassen</strong>: $T(n) = 7T(n/2) + O(n^2)$ → $a=7, b=2, d=2$ → $\\log_2 7 \\approx 2.81 > 2$ → Case 1: $O(n^{2.81})$</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Solve $T(n) = T(n-1) + O(n)$ by unrolling (this form does NOT fit the Master Theorem -- no $n/b$ split).</p>
  <p><strong>Step 1:</strong> Unroll: $T(n) = T(n-1) + cn = T(n-2) + c(n-1) + cn = \\ldots$</p>
  <p><strong>Step 2:</strong> After full unrolling: $T(n) = c \\cdot n + c \\cdot (n-1) + \\ldots + c \\cdot 1 = c \\cdot \\frac{n(n+1)}{2}$.</p>
  <p><strong>Step 3:</strong> Simplify: $\\frac{n(n+1)}{2} = O(n^2)$.</p>
  <p><strong>Answer:</strong> $T(n) = O(n^2)$. This matches selection sort: at each step, scan the remaining $n-i$ elements to find the minimum, costing $n + (n-1) + \\ldots + 1 = n(n+1)/2$.</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">Interview Tips <span class="vi">Mẹo phỏng vấn</span></div>
  <ul>
    <li>Don't memorize the Master Theorem formula — understand the three cases intuitively</li>
    <li><strong>Draw the recursion tree</strong> <span class="vi">vẽ cây đệ quy</span>: visualize how work distributes across levels</li>
    <li>For DP problems: if you fill an $n \\times m$ table with $O(1)$ per cell → $O(nm)$</li>
    <li>Most divide-and-conquer <span class="vi">chia để trị</span> algorithms follow the Master Theorem pattern</li>
  </ul>
</div>
`,
        quiz: [
          { q: '$T(n) = 2T(n/2) + O(n)$ solves to:', options: ['$O(n)$', '$O(n^2)$', '$O(n \\log n)$', '$O(\\log n)$'], answer: 2 },
          { q: '$T(n) = T(n/2) + O(1)$ solves to:', options: ['$O(n)$', '$O(n \\log n)$', '$O(1)$', '$O(\\log n)$'], answer: 3 },
          { q: 'In the Master Theorem $T(n) = aT(n/b) + O(n^d)$, $a$ represents:', options: ['Input size', 'Number of subproblems', 'Depth of recursion', 'Work per level'], answer: 1 },
        ],
        homework: [
          { id: 'hw-recurrences-1', type: 'multiple-choice', prompt: '$T(n) = 2T(n/2) + O(n)$ solves to:', options: ['$O(n)$', '$O(n^2)$', '$O(n \\log n)$', '$O(\\log n)$'], answer: '$O(n \\log n)$', difficulty: 'easy' },
          { id: 'hw-recurrences-2', type: 'numeric', prompt: 'In the Master Theorem $T(n) = aT(n/b) + O(n^d)$ for merge sort: $a=2, b=2, d=1$. What is $\\log_b a$?', answer: 1, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-recurrences-3', type: 'free-response', prompt: 'Apply the Master Theorem to $T(n) = 4T(n/2) + O(n)$. Identify $a$, $b$, $d$, compare $\\log_b a$ with $d$, and state the resulting complexity.', hint: '$a=4, b=2, d=1$. Compute $\\log_2 4 = 2$. Since $2 > 1$, subproblems dominate.', difficulty: 'medium' },
          { id: 'hw-recurrences-4', type: 'free-response', prompt: 'Strassen\'s matrix multiplication has recurrence $T(n) = 7T(n/2) + O(n^2)$. Apply the Master Theorem and explain why this is faster than the naive $O(n^3)$ algorithm. What is the practical significance for large-scale ML computations?', hint: 'Compute $\\log_2 7 \\approx 2.81$ and compare with $d=2$.', difficulty: 'hard' },
        ],
      },
      {
        id: 'amortized-complexity',
        title: 'Amortized & Special Cases',
        content: `
<h2>Amortized & Special Complexities <span class="vi">Độ phức tạp phân bổ & Trường hợp đặc biệt</span></h2>

<p>Sometimes an operation is expensive once in a while but cheap most of the time. If you only look at the worst case, you would overestimate the cost. <strong>Amortized analysis</strong> <span class="vi">phân tích phân bổ</span> gives a more accurate picture by spreading the cost of rare expensive operations across all operations. Think of it like a gym membership <span class="vi">thẻ tập gym</span>: you pay a large annual fee once, but spread over 365 days, the daily cost is small.</p>

<h3>Amortized Analysis <span class="vi">Phân tích phân bổ</span></h3>
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p><strong>Amortized</strong> <span class="vi">phân bổ</span> complexity: the average time per operation over a worst-case sequence <span class="vi">thời gian trung bình mỗi thao tác trong chuỗi xấu nhất</span>. NOT average case — it's a guarantee.</p>
</div>

<p>The key distinction: <em>average case</em> assumes random inputs. <em>Amortized</em> considers the worst possible sequence of operations, but averages over that sequence. It is a stronger guarantee than average case.</p>

<table class="example-table">
  <tr><th>Operation <span class="vi">Thao tác</span></th><th>Worst case</th><th>Amortized <span class="vi">Phân bổ</span></th><th>Why <span class="vi">Tại sao</span></th></tr>
  <tr><td>Dynamic array append <span class="vi">thêm vào mảng động</span></td><td>$O(n)$</td><td>$O(1)$</td><td>Resize doubles capacity <span class="vi">tăng gấp đôi dung lượng</span> → rare expensive ops</td></tr>
  <tr><td>Hash map insert</td><td>$O(n)$</td><td>$O(1)$</td><td>Rehashing is rare</td></tr>
  <tr><td>Union-Find (path + rank)</td><td>$O(\\log n)$</td><td>$O(\\alpha(n)) \\approx O(1)$</td><td>Inverse Ackermann <span class="vi">hàm Ackermann nghịch đảo</span></td></tr>
</table>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A dynamic array starts with capacity 1 and doubles when full. What is the amortized cost of $n$ appends?</p>
  <p><strong>Step 1:</strong> Most appends are $O(1)$ (just place the element). But when the array is full (at sizes 1, 2, 4, 8, ...), we must copy all elements to a new array.</p>
  <p><strong>Step 2:</strong> Total copy cost = $1 + 2 + 4 + 8 + \\ldots + n = 2n - 1$ (geometric series). Plus $n$ simple insertions.</p>
  <p><strong>Step 3:</strong> Total work for $n$ operations = $n + (2n - 1) = 3n - 1$.</p>
  <p><strong>Answer:</strong> Amortized cost = $(3n - 1) / n \\approx 3 = O(1)$ per append. The rare $O(n)$ resizes are "paid for" by the many cheap $O(1)$ appends. This is why Python lists, Java ArrayLists, and C++ vectors all use this strategy.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A hash map with $n$ elements triggers a rehash (rebuilds the entire table) when the load factor exceeds 0.75. What is the amortized cost per insert?</p>
  <p><strong>Step 1:</strong> Normal insert (no rehash): $O(1)$. Rehash: copy all $n$ elements to a new table = $O(n)$.</p>
  <p><strong>Step 2:</strong> The table doubles on rehash, so rehashes happen at sizes 1, 2, 4, 8, ... Total rehash cost over $n$ inserts: $1 + 2 + 4 + \\ldots \\leq 2n$.</p>
  <p><strong>Step 3:</strong> Total cost = $n$ (normal inserts) + $2n$ (all rehashes) = $3n$.</p>
  <p><strong>Answer:</strong> Amortized = $3n / n = O(1)$ per insert. Same doubling argument as dynamic arrays! This is why hash maps are considered $O(1)$ for practical purposes.</p>
</div>

<h3>Best / Average / Worst Case <span class="vi">Trường hợp tốt nhất / trung bình / xấu nhất</span></h3>
<p>For any algorithm, the complexity can differ depending on the input <span class="vi">đầu vào</span>. Quick sort is the classic example: it is blazing fast on random data but degrades to $O(n^2)$ on already-sorted data if you pick the first element as pivot.</p>

<table class="example-table">
  <tr><th>Algorithm <span class="vi">Thuật toán</span></th><th>Best <span class="vi">Tốt nhất</span></th><th>Average <span class="vi">Trung bình</span></th><th>Worst <span class="vi">Xấu nhất</span></th></tr>
  <tr><td>Quick sort <span class="vi">sắp xếp nhanh</span></td><td>$O(n \\log n)$</td><td>$O(n \\log n)$</td><td>$O(n^2)$</td></tr>
  <tr><td>Hash table lookup</td><td>$O(1)$</td><td>$O(1)$</td><td>$O(n)$</td></tr>
  <tr><td>Binary search <span class="vi">tìm kiếm nhị phân</span></td><td>$O(1)$</td><td>$O(\\log n)$</td><td>$O(\\log n)$</td></tr>
  <tr><td>Insertion sort <span class="vi">sắp xếp chèn</span></td><td>$O(n)$</td><td>$O(n^2)$</td><td>$O(n^2)$</td></tr>
</table>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Why is quick sort $O(n^2)$ worst case but $O(n \\log n)$ on average?</p>
  <p><strong>Step 1 (worst case):</strong> If we always pick the smallest element as pivot, the partition splits into sizes $0$ and $n-1$. The recurrence is $T(n) = T(n-1) + O(n)$, which gives $n + (n-1) + \\ldots + 1 = O(n^2)$.</p>
  <p><strong>Step 2 (average case):</strong> A random pivot gives roughly balanced splits on average. The recurrence is approximately $T(n) = 2T(n/2) + O(n)$, which by the Master Theorem gives $O(n \\log n)$.</p>
  <p><strong>Step 3:</strong> In practice, using randomized pivot selection or median-of-three makes the worst case exceedingly unlikely.</p>
  <p><strong>Answer:</strong> Quick sort is $O(n \\log n)$ average, $O(n^2)$ worst. Despite the worse theoretical guarantee than merge sort, quick sort is often faster in practice due to better cache behavior and smaller constant factors. For $n = 10{,}000$: average ~$130{,}000$ ops, worst case ~$50{,}000{,}000$ ops.</p>
</div>

<h3>Other Notations <span class="vi">Các ký hiệu khác</span></h3>
<div class="concept-box definition">
  <div class="box-label">Beyond Big-O <span class="vi">Ngoài Big-O</span></div>
  <ul>
    <li>$O(f)$ — upper bound <span class="vi">cận trên</span>: "at most this fast"</li>
    <li>$\\Omega(f)$ — lower bound <span class="vi">cận dưới</span>: "at least this slow"</li>
    <li>$\\Theta(f)$ — tight bound <span class="vi">cận chặt</span>: "exactly this order" (both upper and lower)</li>
    <li>In practice <span class="vi">thực tế</span>: everyone says $O$ when they mean $\\Theta$</li>
  </ul>
</div>

<h3>LeetCode Data Structure Complexities <span class="vi">Độ phức tạp cấu trúc dữ liệu LeetCode</span></h3>
<p>Knowing the complexity of each data structure operation is like knowing the price list <span class="vi">bảng giá</span> before you shop. When you need fast lookup, you reach for a hash map. When you need sorted order, you reach for a BST. The table below is your cheat sheet:</p>

<table class="example-table">
  <tr><th>Structure <span class="vi">Cấu trúc</span></th><th>Access <span class="vi">Truy cập</span></th><th>Search <span class="vi">Tìm kiếm</span></th><th>Insert <span class="vi">Chèn</span></th><th>Delete <span class="vi">Xóa</span></th></tr>
  <tr><td>Array <span class="vi">mảng</span></td><td>$O(1)$</td><td>$O(n)$</td><td>$O(n)$</td><td>$O(n)$</td></tr>
  <tr><td>Linked list <span class="vi">danh sách liên kết</span></td><td>$O(n)$</td><td>$O(n)$</td><td>$O(1)$</td><td>$O(1)$</td></tr>
  <tr><td>Hash table <span class="vi">bảng băm</span></td><td>—</td><td>$O(1)$*</td><td>$O(1)$*</td><td>$O(1)$*</td></tr>
  <tr><td>BST (balanced) <span class="vi">cây BST cân bằng</span></td><td>—</td><td>$O(\\log n)$</td><td>$O(\\log n)$</td><td>$O(\\log n)$</td></tr>
  <tr><td>Heap <span class="vi">đống</span></td><td>$O(1)$†</td><td>$O(n)$</td><td>$O(\\log n)$</td><td>$O(\\log n)$</td></tr>
  <tr><td>Stack/Queue <span class="vi">ngăn xếp/hàng đợi</span></td><td>$O(1)$†</td><td>$O(n)$</td><td>$O(1)$</td><td>$O(1)$</td></tr>
</table>
<p style="font-size:0.75rem; color:var(--text-dim);">* = amortized average, † = top/front element only</p>

<div class="concept-box ml-context">
  <div class="box-label">Choosing the Right Structure <span class="vi">Chọn cấu trúc phù hợp</span></div>
  <ul>
    <li>Need fast lookup by key? → <strong>Hash map</strong> <span class="vi">bảng băm</span> $O(1)$</li>
    <li>Need sorted order + fast insert? → <strong>Balanced BST / TreeMap</strong> <span class="vi">cây BST cân bằng</span> $O(\\log n)$</li>
    <li>Need min/max quickly? → <strong>Heap / Priority Queue</strong> <span class="vi">đống / hàng đợi ưu tiên</span> $O(1)$ peek, $O(\\log n)$ pop</li>
    <li>Need FIFO? → <strong>Queue</strong> <span class="vi">hàng đợi</span>. LIFO? → <strong>Stack</strong> <span class="vi">ngăn xếp</span></li>
    <li>Need fast prefix sums / range queries? → <strong>Prefix array</strong> <span class="vi">mảng tiền tố</span> or <strong>Segment tree</strong> <span class="vi">cây đoạn</span></li>
  </ul>
</div>
`,
        quiz: [
          { q: 'Appending to a dynamic array is amortized:', options: ['$O(n)$', '$O(\\log n)$', '$O(1)$', '$O(n^2)$'], answer: 2 },
          { q: 'Quick sort worst case is $O(n^2)$, but average case is:', options: ['$O(n)$', '$O(n \\log n)$', '$O(n^2)$', '$O(\\log n)$'], answer: 1 },
          { q: 'To get min element in $O(1)$, use:', options: ['Array', 'Hash map', 'Heap / Priority Queue', 'Linked list'], answer: 2 },
        ],
        homework: [
          { id: 'hw-amortized-complexity-1', type: 'multiple-choice', prompt: 'Dynamic array append is $O(n)$ worst case but $O(1)$ amortized because:', options: ['It always runs in O(1)', 'Expensive resizing happens rarely enough', 'It uses a hash table internally', 'The array never grows'], answer: 'Expensive resizing happens rarely enough', difficulty: 'easy' },
          { id: 'hw-amortized-complexity-2', type: 'multiple-choice', prompt: 'Quick sort average case is $O(n \\log n)$ but worst case is:', options: ['$O(n)$', '$O(n \\log n)$', '$O(n^2)$', '$O(2^n)$'], answer: '$O(n^2)$', difficulty: 'easy' },
          { id: 'hw-amortized-complexity-3', type: 'free-response', prompt: 'A dynamic array starts with capacity 1 and doubles when full. After inserting $n$ elements, how many total copy operations have occurred? Express using geometric series and give the amortized cost per insert.', hint: 'Copies happen at sizes 1, 2, 4, 8, ..., n. Total copies = $1 + 2 + 4 + ... + n \\approx 2n$.', difficulty: 'medium' },
          { id: 'hw-amortized-complexity-4', type: 'free-response', prompt: 'You need a data structure supporting: insert, delete, and find-min, all in $O(\\log n)$ or better. Compare balanced BST vs. heap vs. hash map. Which operations does each support efficiently? Which structure would you choose and why?', hint: 'Hash maps are $O(1)$ for insert/delete/search but $O(n)$ for find-min. Heaps are $O(1)$ for find-min but $O(n)$ for arbitrary delete.', difficulty: 'hard' },
        ],
      }
    ]
  },

  // ===================== LINEAR ALGEBRA =====================
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    icon: '📐',
    description: 'Vectors, matrices, transformations — the language of data in ML.',
    lessons: [
      {
        id: 'scalars-vectors',
        title: 'Scalars, Vectors & Matrices',
        content: `
<h2>Scalars, Vectors & Matrices <span class="vi">Vô hướng, Vectơ & Ma trận</span></h2>
<p>These are the fundamental data structures <span class="vi">cấu trúc dữ liệu cơ bản</span> in ML. Every dataset, every model parameter, and every computation involves them.</p>

<h3>Scalar <span class="vi">Vô hướng / Đại lượng vô hướng</span></h3>
<p>Think of a scalar as the simplest possible piece of information <span class="vi">thông tin đơn giản nhất</span> -- a single measurement. When you check the temperature outside, that one number (say, 22.5) is a scalar. In machine learning, individual knobs like the learning rate or a single pixel intensity are all scalars. They have no direction, no structure -- just magnitude <span class="vi">chỉ có độ lớn</span>.</p>

<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  A <strong>scalar</strong> <span class="vi">vô hướng</span> is a single number. In ML, it could be a learning rate <span class="vi">tốc độ học</span>, a loss value <span class="vi">giá trị hàm mất mát</span>, or a single feature value <span class="vi">giá trị đặc trưng</span>.
  $$a \\in \\mathbb{R}$$
</div>

<h3>Vector <span class="vi">Vectơ</span></h3>
<p>Imagine an arrow in space <span class="vi">một mũi tên trong không gian</span>. That arrow has both a direction and a length -- that is a vector. Geometrically, a vector in $\\mathbb{R}^2$ is an arrow on a flat plane; in $\\mathbb{R}^3$ it lives in 3D space. Even when we cannot visualize 300 dimensions, the same intuition holds: a vector is a point or direction in some high-dimensional space. In ML, each data sample is an arrow in "feature space" <span class="vi">không gian đặc trưng</span>, and the direction of that arrow encodes what the sample "looks like."</p>

<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  A <strong>vector</strong> <span class="vi">vectơ</span> is an ordered list of numbers. It represents a point <span class="vi">điểm</span> or direction <span class="vi">hướng</span> in space <span class="vi">không gian</span>.
  $$\\mathbf{x} = \\begin{bmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{bmatrix} \\in \\mathbb{R}^n$$
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p>A single data sample <span class="vi">mẫu dữ liệu</span> is typically a vector. For example, a house described by [area, bedrooms, age, price] is a vector in $\\mathbb{R}^4$.</p>
  <p>Word embeddings <span class="vi">biểu diễn từ</span> like Word2Vec represent each word as a vector in $\\mathbb{R}^{300}$.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A house is described by features [area=1200 sqft, bedrooms=3, age=10 years]. Represent it as a vector and determine the dimensionality of the feature space.</p>
  <p><strong>Step 1:</strong> Write the feature values as a column vector: $\\mathbf{x} = \\begin{bmatrix} 1200 \\\\ 3 \\\\ 10 \\end{bmatrix}$</p>
  <p><strong>Step 2:</strong> Count the entries: $n = 3$, so $\\mathbf{x} \\in \\mathbb{R}^3$.</p>
  <p><strong>Answer:</strong> The feature space is 3-dimensional. Each house is a point (or arrow from the origin) in this 3D space.</p>
</div>

<h3>Matrix <span class="vi">Ma trận</span></h3>
<p>If a vector is a single row of data, a matrix is the whole spreadsheet <span class="vi">toàn bộ bảng tính</span>. Picture a table where each row is one data sample and each column is one feature. A matrix can also represent a <em>transformation</em> <span class="vi">phép biến đổi</span> -- a machine that takes in one vector and spits out another. Neural network layers are exactly this: weight matrices that transform input vectors into output vectors.</p>

<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  A <strong>matrix</strong> <span class="vi">ma trận</span> is a 2D array of numbers with $m$ rows <span class="vi">hàng</span> and $n$ columns <span class="vi">cột</span>.
  $$\\mathbf{A} \\in \\mathbb{R}^{m \\times n} = \\begin{bmatrix} a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{bmatrix}$$
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p>Your entire dataset <span class="vi">tập dữ liệu</span> is a matrix: rows = samples <span class="vi">mẫu</span>, columns = features <span class="vi">đặc trưng</span>.</p>
  <p>Neural network weight layers <span class="vi">lớp trọng số mạng nơ-ron</span> are matrices. A layer with 128 inputs and 64 outputs has a weight matrix $\\mathbf{W} \\in \\mathbb{R}^{64 \\times 128}$.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A dataset has 3 houses, each with 2 features (area and bedrooms). Write the data matrix and identify its shape.</p>
  <p><strong>Step 1:</strong> House 1: [1200, 3], House 2: [800, 2], House 3: [1500, 4]. Stack as rows:</p>
  <p>$$\\mathbf{X} = \\begin{bmatrix} 1200 & 3 \\\\ 800 & 2 \\\\ 1500 & 4 \\end{bmatrix}$$</p>
  <p><strong>Step 2:</strong> Count: 3 rows (samples), 2 columns (features).</p>
  <p><strong>Answer:</strong> $\\mathbf{X} \\in \\mathbb{R}^{3 \\times 2}$. The matrix holds $3 \\times 2 = 6$ scalar entries total.</p>
</div>

<h3>Tensor <span class="vi">Ten-xơ</span></h3>
<p>A <strong>tensor</strong> <span class="vi">ten-xơ</span> generalizes to $n$ dimensions <span class="vi">chiều</span>. Think of it as stacking matrices: a color image has 3 channels (R, G, B), each a 2D matrix, giving a 3D tensor. A batch of images adds one more dimension, yielding a 4D tensor: (batch_size, channels, height, width).</p>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A neural network processes a batch of 32 RGB images, each 28x28 pixels. What is the tensor shape and total number of scalar values?</p>
  <p><strong>Step 1:</strong> Each image has shape $(3, 28, 28)$ -- 3 channels, 28 rows, 28 columns.</p>
  <p><strong>Step 2:</strong> A batch of 32 images stacks along a new axis: $(32, 3, 28, 28)$.</p>
  <p><strong>Step 3:</strong> Total scalars: $32 \\times 3 \\times 28 \\times 28 = 75{,}264$.</p>
  <p><strong>Answer:</strong> The tensor shape is $(32, 3, 28, 28)$ containing 75,264 numbers.</p>
</div>
`,
        interactive: 'vectorPlot',
        quiz: [
          { q: 'A dataset with 1000 samples and 5 features is represented as a matrix of shape:', options: ['5 x 1000', '1000 x 5', '5000 x 1', '1 x 5000'], answer: 1 },
          { q: 'A single RGB image of size 28x28 is a tensor of shape:', options: ['28 x 28', '28 x 28 x 3', '3 x 28 x 28', 'Both B and C are valid'], answer: 3 },
          { q: 'The learning rate in gradient descent is a:', options: ['Vector', 'Matrix', 'Scalar', 'Tensor'], answer: 2 },
        ],
        bloom: [
          { type: 'match', level: 0, prompt: 'Match the mathematical object to its dimensions:', pairs: [['Scalar', '0-dimensional'], ['Vector', '1-dimensional'], ['Matrix', '2-dimensional'], ['Tensor', 'n-dimensional']] },
          { type: 'choice', level: 1, prompt: 'A batch of 32 RGB images of size 224x224 is stored as a tensor of shape:', options: ['32 x 224 x 224', '32 x 3 x 224 x 224', '224 x 224 x 3 x 32', '32 x 224 x 224 x 3'], answer: 1 },
          { type: 'numeric', level: 2, prompt: 'How many total numbers (elements) are in a 3x4 matrix?', correctValue: 12, tolerance: 0 },
          { type: 'explain', level: 3, prompt: 'Explain why ML datasets are organized as matrices with samples as rows and features as columns. What advantages does this convention give for matrix multiplication in a linear layer?' },
          { type: 'open', level: 5, prompt: 'Think of a real-world ML application (e.g., image classification, NLP, recommendation). Describe the input data as tensors: what would each dimension represent? How would the weight matrices be shaped?' },
        ],
        homework: [
          { id: 'hw-scalars-vectors-1', type: 'numeric', prompt: 'A dataset has 500 samples and 10 features. What is the total number of entries in its matrix representation?', answer: 5000, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-scalars-vectors-2', type: 'multiple-choice', prompt: 'A single RGB image of size 32x32 is stored as a tensor of shape:', options: ['32 x 32', '3 x 32 x 32', '32 x 32 x 3', 'Both B and C (depending on convention)'], answer: 'Both B and C (depending on convention)', difficulty: 'easy' },
          { id: 'hw-scalars-vectors-3', type: 'free-response', prompt: 'A neural network layer transforms 256-dimensional inputs to 128-dimensional outputs. What is the shape of the weight matrix $\\mathbf{W}$? How many scalar parameters does this layer have (including a bias vector)?', hint: 'The weight matrix shape depends on the convention $y = Wx + b$.', difficulty: 'medium' },
          { id: 'hw-scalars-vectors-4', type: 'free-response', prompt: 'Word2Vec represents words as vectors in $\\mathbb{R}^{300}$. Explain why "king" $-$ "man" $+$ "woman" $\\approx$ "queen" works geometrically. What does this tell us about the structure of the learned vector space?', hint: 'Think about how vector arithmetic encodes semantic relationships as directions in the space.', difficulty: 'hard' },
        ],
      },
      {
        id: 'matrix-operations',
        title: 'Matrix Operations',
        content: `
<h2>Matrix Operations <span class="vi">Các phép toán ma trận</span></h2>
<p>Understanding matrix operations is essential — they are the core computations <span class="vi">tính toán cốt lõi</span> in every ML model.</p>

<h3>Addition & Scalar Multiplication <span class="vi">Phép cộng & Nhân vô hướng</span></h3>
<p>Adding two matrices is like overlaying two spreadsheets and combining corresponding cells <span class="vi">cộng từng phần tử tương ứng</span>. Scalar multiplication scales every entry uniformly -- like turning up the volume on all speakers at once. In ML, when you compute a weighted average of two models' parameters, you are doing exactly these two operations: scalar multiply each set of weights, then add the results.</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$(\\mathbf{A} + \\mathbf{B})_{ij} = a_{ij} + b_{ij}$$
  $$(c\\mathbf{A})_{ij} = c \\cdot a_{ij}$$
</div>
<p>Matrices must have the same dimensions <span class="vi">cùng kích thước</span> to be added. Scalar multiplication scales every element.</p>

<h3>Matrix Multiplication <span class="vi">Phép nhân ma trận</span></h3>
<p>Geometrically, matrix multiplication is <em>composition of transformations</em> <span class="vi">hợp thành các phép biến đổi</span>. If matrix $\\mathbf{A}$ rotates space and matrix $\\mathbf{B}$ stretches it, then $\\mathbf{AB}$ does the stretch first, then the rotation. Each entry $c_{ij}$ is the dot product of the $i$-th row of $\\mathbf{A}$ with the $j$-th column of $\\mathbf{B}$ -- it measures how much the $i$-th output depends on the $j$-th input direction. This is exactly what happens in a neural network layer: the weight matrix mixes input features into output features.</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\mathbf{C} = \\mathbf{A}\\mathbf{B} \\quad \\text{where} \\quad c_{ij} = \\sum_{k=1}^{n} a_{ik} b_{kj}$$
  $$\\mathbf{A} \\in \\mathbb{R}^{m \\times n}, \\; \\mathbf{B} \\in \\mathbb{R}^{n \\times p} \\Rightarrow \\mathbf{C} \\in \\mathbb{R}^{m \\times p}$$
</div>

<div class="concept-box warning">
  <div class="box-label">Key Rule <span class="vi">Quy tắc quan trọng</span></div>
  <p>Matrix multiplication is <strong>not commutative</strong> <span class="vi">không giao hoán</span>: $\\mathbf{AB} \\neq \\mathbf{BA}$ in general.</p>
  <p>Inner dimensions must match <span class="vi">chiều trong phải khớp nhau</span>: (m x <strong>n</strong>) * (<strong>n</strong> x p) = (m x p).</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p>A neural network forward pass <span class="vi">lan truyền xuôi</span> is matrix multiplication: $\\mathbf{y} = \\mathbf{W}\\mathbf{x} + \\mathbf{b}$</p>
  <p>This is why GPUs (optimized for matrix math) are essential for deep learning <span class="vi">học sâu</span>.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A neural network layer has weight matrix $\\mathbf{W} = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ and input vector $\\mathbf{x} = \\begin{bmatrix} 5 \\\\ 6 \\end{bmatrix}$. Compute the output $\\mathbf{y} = \\mathbf{W}\\mathbf{x}$.</p>
  <p><strong>Step 1:</strong> First row of $\\mathbf{W}$ dotted with $\\mathbf{x}$: $1 \\cdot 5 + 2 \\cdot 6 = 5 + 12 = 17$.</p>
  <p><strong>Step 2:</strong> Second row of $\\mathbf{W}$ dotted with $\\mathbf{x}$: $3 \\cdot 5 + 4 \\cdot 6 = 15 + 24 = 39$.</p>
  <p><strong>Answer:</strong> $\\mathbf{y} = \\begin{bmatrix} 17 \\\\ 39 \\end{bmatrix}$. The $2 \\times 2$ matrix transforms a 2D input into a 2D output.</p>
</div>

<h3>Transpose <span class="vi">Chuyển vị</span></h3>
<p>Transposing a matrix is like flipping it along its main diagonal <span class="vi">lật qua đường chéo chính</span> -- rows become columns and vice versa. Picture rotating a spreadsheet 90 degrees and then mirroring it. The transpose reversal rule $(\\mathbf{AB})^T = \\mathbf{B}^T\\mathbf{A}^T$ is like reversing the order when you turn a sequence of actions inside-out -- the same reason you reverse the order of putting on socks and shoes when taking them off.</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$(\\mathbf{A}^T)_{ij} = a_{ji}$$
  $$(\\mathbf{AB})^T = \\mathbf{B}^T\\mathbf{A}^T$$
</div>
<p>Flips rows and columns. A matrix that equals its transpose ($\\mathbf{A} = \\mathbf{A}^T$) is called <strong>symmetric</strong> <span class="vi">ma trận đối xứng</span>.</p>

<h3>Dot Product <span class="vi">Tích vô hướng</span></h3>
<p>The dot product answers the question: "How much do two vectors point in the same direction?" <span class="vi">Hai vectơ cùng hướng đến mức nào?</span> When two vectors are perpendicular, their dot product is zero -- they share nothing in common. When they point the same way, the dot product is large and positive. This geometric meaning is why the dot product is the foundation of similarity measures across all of ML.</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\mathbf{a} \\cdot \\mathbf{b} = \\sum_{i=1}^{n} a_i b_i = \\|\\mathbf{a}\\| \\|\\mathbf{b}\\| \\cos\\theta$$
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p>The dot product measures similarity <span class="vi">độ tương đồng</span> between vectors. It's the foundation of:</p>
  <ul>
    <li><strong>Cosine similarity</strong> <span class="vi">độ tương đồng cô-sin</span> in NLP</li>
    <li><strong>Attention mechanisms</strong> <span class="vi">cơ chế chú ý</span> in Transformers ($QK^T$)</li>
    <li><strong>Linear regression</strong> <span class="vi">hồi quy tuyến tính</span> predictions ($\\hat{y} = \\mathbf{w}^T\\mathbf{x}$)</li>
  </ul>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Compute the dot product of weight vector $\\mathbf{w} = [0.5, -1.0, 2.0]$ and input feature vector $\\mathbf{x} = [4, 3, 1]$ to get a linear regression prediction.</p>
  <p><strong>Step 1:</strong> Multiply element-wise: $0.5 \\times 4 = 2.0$, $(-1.0) \\times 3 = -3.0$, $2.0 \\times 1 = 2.0$.</p>
  <p><strong>Step 2:</strong> Sum up: $2.0 + (-3.0) + 2.0 = 1.0$.</p>
  <p><strong>Answer:</strong> $\\hat{y} = \\mathbf{w}^T \\mathbf{x} = 1.0$. Each weight controls how much the corresponding feature contributes to the prediction.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Verify the dimension rule: if $\\mathbf{A} \\in \\mathbb{R}^{3 \\times 4}$ and $\\mathbf{B} \\in \\mathbb{R}^{4 \\times 2}$, what is the shape of $\\mathbf{AB}$?</p>
  <p><strong>Step 1:</strong> Check inner dimensions: A has 4 columns, B has 4 rows -- they match, so multiplication is valid.</p>
  <p><strong>Step 2:</strong> Output shape = (rows of A) $\\times$ (columns of B) = $3 \\times 2$.</p>
  <p><strong>Step 3:</strong> Total scalar multiplications: $3 \\times 2 \\times 4 = 24$ (each of 6 output entries requires 4 multiply-adds).</p>
  <p><strong>Answer:</strong> $\\mathbf{AB} \\in \\mathbb{R}^{3 \\times 2}$, requiring 24 scalar multiplications.</p>
</div>
`,
        interactive: 'matMul',
        quiz: [
          { q: 'If A is 3x4 and B is 4x2, what is the shape of AB?', options: ['3x2', '4x4', '3x4', 'Cannot multiply'], answer: 0 },
          { q: 'What does the dot product of two vectors measure?', options: ['Their sum', 'The angle and magnitude relationship', 'Their element-wise product', 'The cross product'], answer: 1 },
          { q: 'In a neural network layer y = Wx + b, if x has 256 features and y has 128 outputs, what is the shape of W?', options: ['256 x 128', '128 x 256', '128 x 128', '256 x 256'], answer: 1 },
        ],
        bloom: [
          { type: 'choice', level: 0, prompt: 'The dot product of [1,2,3] and [4,5,6] is:', options: ['15', '32', '21', '12'], answer: 1 },
          { type: 'numeric', level: 2, prompt: 'A matrix A is 5x3 and matrix B is 3x7. How many total scalar multiplications are needed to compute AB?', correctValue: 105, tolerance: 0 },
          { type: 'match', level: 1, prompt: 'Match each matrix operation to its property:', pairs: [['$A^T$', 'Rows become columns'], ['$AB$', 'Inner dimensions must match'], ['$A + B$', 'Must have same shape'], ['$cA$', 'Every element scaled by c']] },
          { type: 'explain', level: 4, prompt: 'In the neural network equation $y = Wx + b$, why must $W$ be 128x256 (not 256x128) when transforming from 256 to 128 features? Explain using matrix multiplication rules.' },
        ],
        homework: [
          { id: 'hw-matrix-operations-1', type: 'numeric', prompt: 'Compute the dot product of $\\mathbf{a} = [2, 3, 1]$ and $\\mathbf{b} = [4, -1, 5]$.', answer: 10, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-matrix-operations-2', type: 'multiple-choice', prompt: 'If $\\mathbf{A} \\in \\mathbb{R}^{3 \\times 5}$ and $\\mathbf{B} \\in \\mathbb{R}^{5 \\times 2}$, the shape of $\\mathbf{AB}$ is:', options: ['$3 \\times 2$', '$5 \\times 5$', '$3 \\times 5$', 'Cannot multiply'], answer: '$3 \\times 2$', difficulty: 'easy' },
          { id: 'hw-matrix-operations-3', type: 'numeric', prompt: 'In a neural network, input $\\mathbf{x} \\in \\mathbb{R}^{784}$ (28x28 image flattened) maps to hidden layer $\\mathbf{h} \\in \\mathbb{R}^{256}$ via $\\mathbf{h} = \\mathbf{W}\\mathbf{x} + \\mathbf{b}$. How many parameters are in $\\mathbf{W}$ alone?', answer: 200704, tolerance: 0, difficulty: 'medium' },
          { id: 'hw-matrix-operations-4', type: 'free-response', prompt: 'Prove that matrix multiplication is NOT commutative by constructing a 2x2 example where $\\mathbf{AB} \\neq \\mathbf{BA}$. Then explain why this matters in neural network design (e.g., does the order of linear layers matter?).', hint: 'Try $A = [[1,2],[0,1]]$ and $B = [[0,1],[1,0]]$.', difficulty: 'medium' },
          { id: 'hw-matrix-operations-5', type: 'free-response', prompt: 'The attention mechanism in Transformers computes $\\text{softmax}(\\frac{QK^T}{\\sqrt{d_k}})V$. If $Q, K, V \\in \\mathbb{R}^{n \\times d_k}$, derive the shape of each intermediate result ($QK^T$, the softmax output, and the final result). What is the computational complexity?', hint: 'Trace through the matrix dimensions step by step: $QK^T$ is $n \\times n$.', difficulty: 'hard' },
        ],
      },
      {
        id: 'eigenvalues',
        title: 'Eigenvalues & Eigenvectors',
        content: `
<h2>Eigenvalues & Eigenvectors <span class="vi">Trị riêng & Vectơ riêng</span></h2>
<p>Eigenvalues and eigenvectors reveal the fundamental structure of linear transformations <span class="vi">phép biến đổi tuyến tính</span> -- the directions that remain unchanged (only scaled) when a matrix is applied.</p>

<p>Here is the key geometric intuition <span class="vi">trực giác hình học</span>: when a matrix multiplies most vectors, it changes both their direction and magnitude. But there are special vectors whose direction the matrix does not change -- it only stretches or compresses them. Imagine pushing on a rubber sheet: most points move in complicated ways, but some directions just get longer or shorter. Those special directions are the <strong>eigenvectors</strong>, and the stretch factors are the <strong>eigenvalues</strong>. In PCA, these special directions are the axes of greatest variation in your data -- the directions along which your data is most "spread out."</p>

<h3>Definition <span class="vi">Định nghĩa</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\mathbf{A}\\mathbf{v} = \\lambda \\mathbf{v}$$
  <p style="text-align:left; margin-top:0.5rem;">$\\mathbf{v}$ is an <strong>eigenvector</strong> <span class="vi">vectơ riêng</span> and $\\lambda$ is its corresponding <strong>eigenvalue</strong> <span class="vi">trị riêng</span>.</p>
</div>

<p>When matrix $\\mathbf{A}$ acts on eigenvector $\\mathbf{v}$, the result is simply $\\mathbf{v}$ scaled <span class="vi">co giãn</span> by $\\lambda$. The direction doesn't change -- only the magnitude <span class="vi">độ lớn</span>.</p>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Verify that $\\mathbf{v} = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$ is an eigenvector of $\\mathbf{A} = \\begin{bmatrix} 3 & 1 \\\\ 1 & 3 \\end{bmatrix}$ and find the eigenvalue.</p>
  <p><strong>Step 1:</strong> Compute $\\mathbf{A}\\mathbf{v} = \\begin{bmatrix} 3 \\cdot 1 + 1 \\cdot 1 \\\\ 1 \\cdot 1 + 3 \\cdot 1 \\end{bmatrix} = \\begin{bmatrix} 4 \\\\ 4 \\end{bmatrix}$.</p>
  <p><strong>Step 2:</strong> Check if the result is a scalar multiple of $\\mathbf{v}$: $\\begin{bmatrix} 4 \\\\ 4 \\end{bmatrix} = 4 \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$. Yes!</p>
  <p><strong>Answer:</strong> $\\lambda = 4$. The matrix stretches the direction $[1, 1]^T$ by a factor of 4 without rotating it.</p>
</div>

<h3>How to Find Them <span class="vi">Cách tìm trị riêng và vectơ riêng</span></h3>
<p>To find eigenvalues, we ask: "For what values of $\\lambda$ does the system $(\\mathbf{A} - \\lambda \\mathbf{I})\\mathbf{v} = 0$ have a non-trivial solution?" This happens exactly when the matrix $\\mathbf{A} - \\lambda \\mathbf{I}$ is singular -- i.e., its determinant is zero. This gives us a polynomial in $\\lambda$ whose roots are the eigenvalues.</p>

<div class="concept-box definition">
  <div class="box-label">Method <span class="vi">Phương pháp</span></div>
  <p>Solve the <strong>characteristic equation</strong> <span class="vi">phương trình đặc trưng</span>:</p>
  $$\\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0$$
  <p>This gives you the eigenvalues $\\lambda_1, \\lambda_2, \\ldots$. Then substitute each $\\lambda_i$ back into $(\\mathbf{A} - \\lambda_i \\mathbf{I})\\mathbf{v} = 0$ to find eigenvectors.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Find the eigenvalues of the 2x2 covariance matrix $\\mathbf{C} = \\begin{bmatrix} 5 & 2 \\\\ 2 & 2 \\end{bmatrix}$.</p>
  <p><strong>Step 1:</strong> Set up the characteristic equation: $\\det(\\mathbf{C} - \\lambda \\mathbf{I}) = (5 - \\lambda)(2 - \\lambda) - 4 = 0$.</p>
  <p><strong>Step 2:</strong> Expand: $\\lambda^2 - 7\\lambda + 6 = 0$. Factor: $(\\lambda - 6)(\\lambda - 1) = 0$.</p>
  <p><strong>Step 3:</strong> Eigenvalues: $\\lambda_1 = 6$ and $\\lambda_2 = 1$. Verify: trace $= 5 + 2 = 7 = 6 + 1$, det $= 10 - 4 = 6 = 6 \\times 1$.</p>
  <p><strong>Answer:</strong> $\\lambda_1 = 6$, $\\lambda_2 = 1$. In PCA, this means the first principal component captures 6x more variance than the second.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A 3x3 matrix has eigenvalues $\\lambda_1 = 5$, $\\lambda_2 = 3$, $\\lambda_3 = 2$. Find its trace and determinant without seeing the matrix.</p>
  <p><strong>Step 1:</strong> Trace = sum of eigenvalues: $5 + 3 + 2 = 10$.</p>
  <p><strong>Step 2:</strong> Determinant = product of eigenvalues: $5 \\times 3 \\times 2 = 30$.</p>
  <p><strong>Answer:</strong> $\\text{trace}(\\mathbf{A}) = 10$, $\\det(\\mathbf{A}) = 30$. These shortcuts are invaluable: you can read off trace and determinant directly from eigenvalues.</p>
</div>

<h3>Properties <span class="vi">Tính chất</span></h3>
<ul>
  <li>A symmetric matrix <span class="vi">ma trận đối xứng</span> has real eigenvalues and orthogonal eigenvectors <span class="vi">vectơ riêng trực giao</span></li>
  <li>$\\text{trace}(\\mathbf{A}) = \\sum \\lambda_i$ <span class="vi">vết ma trận</span> and $\\det(\\mathbf{A}) = \\prod \\lambda_i$ <span class="vi">định thức</span></li>
  <li>If all $\\lambda_i > 0$, the matrix is <strong>positive definite</strong> <span class="vi">xác định dương</span></li>
</ul>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p><strong>PCA (Principal Component Analysis)</strong> <span class="vi">Phân tích thành phần chính</span> — the most common dimensionality reduction <span class="vi">giảm chiều</span> method — is eigendecomposition <span class="vi">phân tích trị riêng</span> of the covariance matrix <span class="vi">ma trận hiệp phương sai</span>. Eigenvectors = principal components <span class="vi">thành phần chính</span>, eigenvalues = variance explained <span class="vi">phương sai được giải thích</span>.</p>
  <p><strong>Google's PageRank</strong> finds the dominant eigenvector <span class="vi">vectơ riêng trội</span> of the web's link matrix.</p>
  <p><strong>Spectral clustering</strong> <span class="vi">phân cụm phổ</span> uses eigenvectors of the graph Laplacian matrix.</p>
</div>
`,
        interactive: 'eigenTransform',
        quiz: [
          { q: 'If Av = 3v, then 3 is a(n) _____ of A.', options: ['Eigenvector', 'Eigenvalue', 'Determinant', 'Trace'], answer: 1 },
          { q: 'In PCA, eigenvectors of the covariance matrix represent:', options: ['Data points', 'Principal components (directions of max variance)', 'Cluster centers', 'Outliers'], answer: 1 },
          { q: 'A positive definite matrix has:', options: ['All negative eigenvalues', 'All zero eigenvalues', 'All positive eigenvalues', 'Mixed sign eigenvalues'], answer: 2 },
        ],
        homework: [
          { id: 'hw-eigenvalues-1', type: 'numeric', prompt: 'If a 3x3 matrix has eigenvalues 2, 5, and 3, what is its trace (sum of eigenvalues)?', answer: 10, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-eigenvalues-2', type: 'numeric', prompt: 'A 2x2 matrix has eigenvalues 4 and 7. What is its determinant?', answer: 28, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-eigenvalues-3', type: 'free-response', prompt: 'Compute the eigenvalues of $\\mathbf{A} = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$ by solving $\\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0$. Show your work.', hint: 'For a triangular matrix, the eigenvalues are the diagonal entries.', difficulty: 'medium' },
          { id: 'hw-eigenvalues-4', type: 'free-response', prompt: 'In PCA, the covariance matrix of a 100-dimensional dataset has eigenvalues where the top 3 explain 95% of the total variance. How would you decide how many principal components to keep, and what does this mean for dimensionality reduction in a downstream ML task?', hint: 'Sum all eigenvalues to get total variance; cumulative explained variance ratio determines the cutoff.', difficulty: 'hard' },
        ],
      },
      {
        id: 'norms',
        title: 'Norms & Distance Metrics',
        content: `
<h2>Norms & Distance Metrics <span class="vi">Chuẩn & Độ đo khoảng cách</span></h2>
<p>Norms <span class="vi">chuẩn</span> measure the "size" of a vector. Distance metrics <span class="vi">độ đo khoảng cách</span> measure how far apart two vectors are. Both are everywhere in ML.</p>

<h3>L1 Norm (Manhattan) <span class="vi">Chuẩn L1</span></h3>
<p>The L1 norm counts the total "taxi cab" distance <span class="vi">khoảng cách taxi</span> -- imagine walking along a city grid where you can only go horizontally or vertically. You add up the absolute value of each step. In ML, L1 is used in Lasso regularization because it pushes weights to exactly zero, producing sparse models <span class="vi">mô hình thưa</span> -- effectively performing automatic feature selection.</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\|\\mathbf{x}\\|_1 = \\sum_{i=1}^{n} |x_i|$$
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Compute the L1 norm of a weight vector $\\mathbf{w} = [-2, 5, -1, 3]$ used in a linear model.</p>
  <p><strong>Step 1:</strong> Take absolute values: $|{-2}| = 2$, $|5| = 5$, $|{-1}| = 1$, $|3| = 3$.</p>
  <p><strong>Step 2:</strong> Sum: $2 + 5 + 1 + 3 = 11$.</p>
  <p><strong>Answer:</strong> $\\|\\mathbf{w}\\|_1 = 11$. In L1 regularization, adding $\\lambda \\cdot 11$ to the loss penalizes this model for having large weights.</p>
</div>

<h3>L2 Norm (Euclidean) <span class="vi">Chuẩn L2 (Ơ-clit)</span></h3>
<p>The L2 norm is the "straight-line" or "as the crow flies" distance <span class="vi">khoảng cách đường thẳng</span> -- exactly the Pythagorean theorem generalized to $n$ dimensions. Geometrically, all vectors with the same L2 norm form a circle (2D) or sphere (3D). In ML, L2 is the default norm for measuring error (MSE loss), computing gradient magnitudes, and Ridge regularization which smoothly shrinks all weights toward zero.</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\|\\mathbf{x}\\|_2 = \\sqrt{\\sum_{i=1}^{n} x_i^2}$$
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Compute the L2 norm of gradient vector $\\mathbf{g} = [3, 4]$ during training, and normalize it to a unit vector.</p>
  <p><strong>Step 1:</strong> $\\|\\mathbf{g}\\|_2 = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.</p>
  <p><strong>Step 2:</strong> Normalize: $\\hat{\\mathbf{g}} = \\frac{\\mathbf{g}}{\\|\\mathbf{g}\\|_2} = \\frac{1}{5}\\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} 0.6 \\\\ 0.8 \\end{bmatrix}$.</p>
  <p><strong>Answer:</strong> $\\|\\mathbf{g}\\|_2 = 5$. The unit vector $\\hat{\\mathbf{g}} = [0.6, 0.8]$ has norm 1 and preserves the direction. Gradient clipping uses this to cap the norm to a threshold.</p>
</div>

<h3>Lp Norm (General) <span class="vi">Chuẩn Lp tổng quát</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\|\\mathbf{x}\\|_p = \\left(\\sum_{i=1}^{n} |x_i|^p\\right)^{1/p}$$
</div>

<h3>Distance Between Vectors <span class="vi">Khoảng cách giữa các vectơ</span></h3>
<p>The distance between $\\mathbf{a}$ and $\\mathbf{b}$ is just the norm of their difference <span class="vi">chuẩn của hiệu</span>: $d(\\mathbf{a}, \\mathbf{b}) = \\|\\mathbf{a} - \\mathbf{b}\\|$</p>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <table class="example-table">
    <tr><th>Norm <span class="vi">Chuẩn</span></th><th>Used In <span class="vi">Ứng dụng</span></th></tr>
    <tr><td>L1</td><td>Lasso regularization <span class="vi">chính quy hóa Lasso</span> (sparsity <span class="vi">tính thưa</span>), Manhattan distance in KNN</td></tr>
    <tr><td>L2</td><td>Ridge regularization <span class="vi">chính quy hóa Ridge</span>, Euclidean distance, loss functions <span class="vi">hàm mất mát</span> (MSE)</td></tr>
    <tr><td>L∞</td><td>Adversarial robustness <span class="vi">độ bền đối kháng</span> (max perturbation per pixel)</td></tr>
    <tr><td>Cosine</td><td>Text similarity <span class="vi">độ tương đồng văn bản</span>, recommendation systems <span class="vi">hệ thống gợi ý</span></td></tr>
  </table>
</div>

<h3>Cosine Similarity <span class="vi">Độ tương đồng cô-sin</span></h3>
<p>Cosine similarity strips away magnitude and looks only at the angle <span class="vi">chỉ xét góc</span> between two vectors. Imagine two arrows: one very long, one short. If they point in the same direction, cosine similarity is 1 regardless of length. This is why it is ideal for comparing documents of different lengths or word embeddings -- a long document and a short document about the same topic should be "similar" even though their raw vectors have very different magnitudes.</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\cos(\\theta) = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\|\\mathbf{a}\\|_2 \\; \\|\\mathbf{b}\\|_2}$$
</div>
<p>Ranges from -1 (opposite <span class="vi">ngược chiều</span>) to 1 (identical direction <span class="vi">cùng chiều</span>). It ignores magnitude and only considers direction -- perfect for comparing documents or embeddings regardless of length.</p>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Two word embeddings are $\\mathbf{a} = [1, 0, 1]$ ("king") and $\\mathbf{b} = [0, 1, 1]$ ("queen"). Compute their cosine similarity.</p>
  <p><strong>Step 1:</strong> Dot product: $\\mathbf{a} \\cdot \\mathbf{b} = 1 \\cdot 0 + 0 \\cdot 1 + 1 \\cdot 1 = 1$.</p>
  <p><strong>Step 2:</strong> Norms: $\\|\\mathbf{a}\\|_2 = \\sqrt{1 + 0 + 1} = \\sqrt{2}$, $\\|\\mathbf{b}\\|_2 = \\sqrt{0 + 1 + 1} = \\sqrt{2}$.</p>
  <p><strong>Step 3:</strong> $\\cos(\\theta) = \\frac{1}{\\sqrt{2} \\cdot \\sqrt{2}} = \\frac{1}{2} = 0.5$.</p>
  <p><strong>Answer:</strong> Cosine similarity = 0.5, meaning a 60-degree angle between the vectors. They share some semantic direction but are not identical.</p>
</div>
`,
        quiz: [
          { q: 'The L2 norm of vector [3, 4] is:', options: ['7', '5', '12', '25'], answer: 1 },
          { q: 'L1 regularization (Lasso) tends to produce:', options: ['Large weights', 'Sparse weights (many zeros)', 'Negative weights', 'Equal weights'], answer: 1 },
          { q: 'Cosine similarity measures:', options: ['Vector magnitude', 'Vector direction similarity', 'Vector sum', 'Vector product'], answer: 1 },
        ],
        homework: [
          { id: 'hw-norms-1', type: 'numeric', prompt: 'Compute the L2 norm of the vector $[3, 4]$.', answer: 5, tolerance: 0.01, difficulty: 'easy' },
          { id: 'hw-norms-2', type: 'numeric', prompt: 'Compute the L1 norm of the vector $[-2, 5, -1, 3]$.', answer: 11, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-norms-3', type: 'free-response', prompt: 'Given $\\mathbf{a} = [1, 0, 1]$ and $\\mathbf{b} = [0, 1, 1]$, compute the cosine similarity $\\cos(\\theta) = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\|\\mathbf{a}\\|_2 \\|\\mathbf{b}\\|_2}$.', hint: 'Dot product = 1. $\\|a\\|_2 = \\sqrt{2}$, $\\|b\\|_2 = \\sqrt{2}$.', difficulty: 'medium' },
          { id: 'hw-norms-4', type: 'free-response', prompt: 'Explain why L1 regularization leads to sparse weight vectors (many exact zeros) while L2 regularization only shrinks weights toward zero. Use the geometric intuition of the "diamond" (L1 ball) vs. "circle" (L2 ball) constraint regions.', hint: 'Consider the contour lines of the loss function meeting the constraint boundary. L1 diamond has corners on the axes.', difficulty: 'hard' },
        ],
      },
      {
        id: 'orthogonality-projections',
        title: 'Orthogonality, Projections & Least Squares',
        content: `
<h2>Orthogonality, Projections & Least Squares <span class="vi">Trực giao, Phép chiếu & Bình phương tối thiểu</span></h2>
<p>Orthogonality <span class="vi">tính trực giao</span> is one of the most powerful ideas in linear algebra. It underlies projections, least squares, and many decompositions used in ML.</p>

<h3>Orthogonal Vectors <span class="vi">Vectơ trực giao</span></h3>
<p>Orthogonality means "completely independent directions" <span class="vi">các hướng hoàn toàn độc lập</span>. Think of North vs. East on a map: moving North tells you absolutely nothing about how far East you have gone. In ML, orthogonal features carry zero redundant information -- each captures something entirely new. This is why PCA seeks orthogonal principal components: each component adds genuinely new information about the data.</p>

<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>Two vectors $\\mathbf{u}$ and $\\mathbf{v}$ are <strong>orthogonal</strong> <span class="vi">trực giao</span> if their dot product is zero:</p>
  $$\\mathbf{u} \\cdot \\mathbf{v} = \\mathbf{u}^T \\mathbf{v} = 0$$
  <p>An <strong>orthonormal</strong> <span class="vi">trực chuẩn</span> set additionally requires each vector to have unit length: $\\|\\mathbf{u}\\| = 1$.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Verify that the vectors $\\mathbf{u} = [1, 2, 3]$ and $\\mathbf{v} = [2, -1, 0]$ are orthogonal.</p>
  <p><strong>Step 1:</strong> Compute the dot product: $\\mathbf{u} \\cdot \\mathbf{v} = 1 \\cdot 2 + 2 \\cdot (-1) + 3 \\cdot 0 = 2 - 2 + 0 = 0$.</p>
  <p><strong>Step 2:</strong> Since $\\mathbf{u} \\cdot \\mathbf{v} = 0$, the vectors are orthogonal.</p>
  <p><strong>Answer:</strong> Yes, $\\mathbf{u} \\perp \\mathbf{v}$. Geometrically, they are at a 90-degree angle in $\\mathbb{R}^3$. If these were feature directions, they would carry completely independent information.</p>
</div>

<h3>Orthogonal Matrices <span class="vi">Ma trận trực giao</span></h3>
<p>An orthogonal matrix is a transformation that preserves all distances and angles <span class="vi">bảo toàn khoảng cách và góc</span> -- it can only rotate or reflect, never stretch or squash. Think of picking up a rigid object and turning it: the shape does not change. This makes orthogonal matrices numerically wonderful because they never amplify errors. Their inverse is simply their transpose, which is essentially free to compute.</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  <p>A square matrix $\\mathbf{Q}$ is <strong>orthogonal</strong> if its columns are orthonormal:</p>
  $$\\mathbf{Q}^T \\mathbf{Q} = \\mathbf{Q} \\mathbf{Q}^T = \\mathbf{I} \\qquad \\text{so} \\quad \\mathbf{Q}^{-1} = \\mathbf{Q}^T$$
  <p>Orthogonal matrices preserve lengths and angles — they represent rotations <span class="vi">phép quay</span> and reflections <span class="vi">phép phản chiếu</span>.</p>
</div>

<h3>Projection onto a Subspace <span class="vi">Phép chiếu lên không gian con</span></h3>
<p>Projection answers the question: "What is the closest point in a subspace to my target?" <span class="vi">Điểm gần nhất trong không gian con là gì?</span> Imagine a flashlight shining straight down onto a table: the shadow of a 3D object on the 2D table is its projection. In ML, when we cannot solve $\\mathbf{Ax} = \\mathbf{b}$ exactly (more equations than unknowns), we project $\\mathbf{b}$ onto the column space of $\\mathbf{A}$ to find the best approximation. This is the geometric heart of least squares regression.</p>

<div class="concept-box formula">
  <div class="box-label">Projection Formula <span class="vi">Công thức chiếu</span></div>
  <p>The projection of $\\mathbf{b}$ onto the column space of $\\mathbf{A}$:</p>
  $$\\hat{\\mathbf{b}} = \\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T \\mathbf{b}$$
  <p>The <strong>projection matrix</strong> <span class="vi">ma trận chiếu</span> is $\\mathbf{P} = \\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T$, with properties: $\\mathbf{P}^2 = \\mathbf{P}$ and $\\mathbf{P}^T = \\mathbf{P}$.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Project vector $\\mathbf{b} = [3, 4]$ onto the direction $\\mathbf{a} = [1, 0]$ (the x-axis).</p>
  <p><strong>Step 1:</strong> Use the 1D projection formula: $\\text{proj}_{\\mathbf{a}} \\mathbf{b} = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\mathbf{a} \\cdot \\mathbf{a}} \\mathbf{a}$.</p>
  <p><strong>Step 2:</strong> $\\mathbf{a} \\cdot \\mathbf{b} = 1 \\cdot 3 + 0 \\cdot 4 = 3$, $\\mathbf{a} \\cdot \\mathbf{a} = 1$.</p>
  <p><strong>Step 3:</strong> $\\text{proj} = \\frac{3}{1} \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 0 \\end{bmatrix}$.</p>
  <p><strong>Answer:</strong> The projection is $[3, 0]^T$ -- the "shadow" of $[3,4]$ on the x-axis. The residual $[0, 4]^T$ is orthogonal to $\\mathbf{a}$, confirming the projection is correct.</p>
</div>

<h3>Least Squares <span class="vi">Bình phương tối thiểu</span></h3>
<p>In the real world, data is noisy and rarely fits a model perfectly. When you have more data points than model parameters (an overdetermined system <span class="vi">hệ thừa ràng buộc</span>), there is no exact solution to $\\mathbf{Ax} = \\mathbf{b}$. Least squares finds the "best compromise" <span class="vi">phương án thỏa hiệp tốt nhất</span> by minimizing the total squared error. Geometrically, it finds the point in the column space of $\\mathbf{A}$ that is closest to $\\mathbf{b}$ -- exactly a projection.</p>

<div class="concept-box formula">
  <div class="box-label">Normal Equations <span class="vi">Phương trình chuẩn</span></div>
  <p>When $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ has no exact solution, we minimize $\\|\\mathbf{A}\\mathbf{x} - \\mathbf{b}\\|^2$:</p>
  $$\\mathbf{A}^T\\mathbf{A}\\hat{\\mathbf{x}} = \\mathbf{A}^T\\mathbf{b} \\qquad \\Rightarrow \\qquad \\hat{\\mathbf{x}} = (\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T\\mathbf{b}$$
  <p>Geometrically, $\\hat{\\mathbf{x}}$ makes the residual $\\mathbf{b} - \\mathbf{A}\\hat{\\mathbf{x}}$ orthogonal to the column space of $\\mathbf{A}$.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Fit a line $y = wx$ through data points $(1, 2)$, $(2, 3)$, $(3, 5)$ using least squares (no intercept for simplicity).</p>
  <p><strong>Step 1:</strong> Write as $\\mathbf{A}w = \\mathbf{b}$ where $\\mathbf{A} = \\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix}$, $\\mathbf{b} = \\begin{bmatrix} 2 \\\\ 3 \\\\ 5 \\end{bmatrix}$.</p>
  <p><strong>Step 2:</strong> Normal equation: $\\mathbf{A}^T\\mathbf{A} \\hat{w} = \\mathbf{A}^T\\mathbf{b}$. Compute: $\\mathbf{A}^T\\mathbf{A} = 1 + 4 + 9 = 14$, $\\mathbf{A}^T\\mathbf{b} = 2 + 6 + 15 = 23$.</p>
  <p><strong>Step 3:</strong> Solve: $\\hat{w} = 23/14 \\approx 1.643$.</p>
  <p><strong>Answer:</strong> The best-fit line is $y \\approx 1.643x$. This minimizes the sum of squared residuals $(2-1.643)^2 + (3-3.286)^2 + (5-4.929)^2$.</p>
</div>

<h3>Gram-Schmidt Process <span class="vi">Quá trình Gram-Schmidt</span></h3>
<div class="concept-box definition">
  <div class="box-label">Algorithm <span class="vi">Thuật toán</span></div>
  <p>Converts any basis into an orthonormal basis, producing the <strong>QR decomposition</strong>: $\\mathbf{A} = \\mathbf{Q}\\mathbf{R}$, where $\\mathbf{Q}$ is orthogonal and $\\mathbf{R}$ is upper triangular <span class="vi">tam giác trên</span>.</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Linear regression</strong> <span class="vi">hồi quy tuyến tính</span> IS the least squares problem: $\\hat{\\mathbf{w}} = (\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T\\mathbf{y}$</li>
    <li><strong>QR decomposition</strong> is used to solve least squares more stably than the normal equations</li>
    <li><strong>Orthogonal weight initialization</strong> <span class="vi">khởi tạo trọng số trực giao</span> helps preserve gradient norms in deep networks</li>
    <li><strong>Batch normalization</strong> <span class="vi">chuẩn hóa theo lô</span> approximately orthogonalizes layer inputs</li>
  </ul>
</div>
`,
        quiz: [
          { q: 'Two vectors are orthogonal when their dot product is:', options: ['1', '-1', '0', 'Infinity'], answer: 2 },
          { q: 'The least squares solution minimizes:', options: ['|Ax|', '|Ax - b|²', '|A^T b|', 'det(A)'], answer: 1 },
          { q: 'An orthogonal matrix Q satisfies Q⁻¹ =', options: ['Q', 'Q^T', '-Q', 'Q²'], answer: 1 },
        ],
        bloom: [
          { type: 'choice', level: 0, prompt: 'If $\\mathbf{u} = [1, 0, 0]$ and $\\mathbf{v} = [0, 3, 0]$, are they orthogonal?', options: ['Yes, because $\\mathbf{u}^T\\mathbf{v} = 0$', 'No, they have different lengths', 'Only if we normalize them first', 'Cannot determine'], answer: 0 },
          { type: 'match', level: 1, prompt: 'Match each concept to its property:', pairs: [['Orthogonal vectors', 'Dot product = 0'], ['Orthogonal matrix', '$Q^{-1} = Q^T$'], ['Projection matrix', '$P^2 = P$'], ['QR decomposition', '$A = QR$']] },
          { type: 'numeric', level: 2, prompt: 'Project $\\mathbf{b} = [3, 4]$ onto $\\mathbf{a} = [1, 0]$. What is the length of the projection?', correctValue: 3, tolerance: 0 },
          { type: 'explain', level: 4, prompt: 'Explain geometrically why the residual in least squares is orthogonal to the column space of A. Why does this give the best approximation?' },
          { type: 'open', level: 5, prompt: 'Linear regression uses the normal equations $(X^TX)\\hat{w} = X^Ty$. Discuss when this can fail numerically and how QR decomposition or regularization can help.' },
        ],
        homework: [
          { id: 'hw-orthogonality-projections-1', type: 'numeric', prompt: 'Are vectors $[1, 2, 3]$ and $[2, -1, 0]$ orthogonal? Compute their dot product.', answer: 0, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-orthogonality-projections-2', type: 'numeric', prompt: 'Project vector $\\mathbf{b} = [3, 4]$ onto $\\mathbf{a} = [1, 0]$. What is the projected vector\'s first component?', answer: 3, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-orthogonality-projections-3', type: 'free-response', prompt: 'For the linear regression normal equation $\\hat{\\mathbf{w}} = (\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T\\mathbf{y}$, explain geometrically what it means for the residual $\\mathbf{y} - \\mathbf{X}\\hat{\\mathbf{w}}$ to be orthogonal to the column space of $\\mathbf{X}$.', hint: 'The prediction $\\mathbf{X}\\hat{\\mathbf{w}}$ is the closest point in the column space of $\\mathbf{X}$ to $\\mathbf{y}$.', difficulty: 'medium' },
          { id: 'hw-orthogonality-projections-4', type: 'free-response', prompt: 'When $\\mathbf{X}^T\\mathbf{X}$ is nearly singular (collinear features), the least squares solution becomes numerically unstable. Explain how QR decomposition provides a more stable alternative and how regularization ($\\mathbf{X}^T\\mathbf{X} + \\lambda\\mathbf{I}$) fixes the singularity issue from a linear algebra perspective.', hint: 'Adding $\\lambda \\mathbf{I}$ shifts all eigenvalues by $\\lambda$, making the smallest eigenvalue at least $\\lambda > 0$.', difficulty: 'hard' },
        ],
      },
      {
        id: 'svd-decompositions',
        title: 'SVD & Matrix Decompositions',
        content: `
<h2>SVD & Matrix Decompositions <span class="vi">SVD & Phân tích ma trận</span></h2>
<p>Matrix decompositions <span class="vi">phân tích ma trận</span> break a matrix into simpler factors, revealing structure and enabling efficient computation. SVD is arguably the most important decomposition in ML.</p>

<h3>Eigendecomposition (Recap) <span class="vi">Phân tích trị riêng (Ôn lại)</span></h3>
<p>Eigendecomposition is like finding a matrix's "natural coordinate system" <span class="vi">hệ tọa độ tự nhiên</span>. In these natural coordinates, the matrix becomes diagonal -- it just scales along each axis. The eigenvectors tell you the directions, and the eigenvalues tell you the scale factors. This is incredibly powerful: instead of a complicated transformation, you see "stretch by 5 along this direction, by 2 along that direction."</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\mathbf{A} = \\mathbf{V} \\boldsymbol{\\Lambda} \\mathbf{V}^{-1}$$
  <p>Only works for square matrices with $n$ linearly independent eigenvectors. For symmetric matrices: $\\mathbf{A} = \\mathbf{Q} \\boldsymbol{\\Lambda} \\mathbf{Q}^T$ (orthogonal eigenvectors).</p>
</div>

<h3>Singular Value Decomposition (SVD) <span class="vi">Phân tích giá trị kỳ dị</span></h3>
<p>SVD is the "Swiss Army knife" of matrix decompositions -- it works on <em>any</em> matrix, not just square or symmetric ones. The core idea: every linear transformation, no matter how complex, can be broken down into three simple steps: (1) rotate the input, (2) scale along each axis, (3) rotate the output. The singular values tell you how much "energy" or "importance" each direction carries. Large singular values capture the main patterns; small ones capture noise. This is why truncating SVD gives you a powerful way to compress data and remove noise.</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\mathbf{A} = \\mathbf{U} \\boldsymbol{\\Sigma} \\mathbf{V}^T$$
  <p>Works for <strong>any</strong> $m \\times n$ matrix:</p>
  <ul>
    <li>$\\mathbf{U}$ ($m \\times m$): left singular vectors <span class="vi">vectơ kỳ dị trái</span> — orthonormal basis for column space</li>
    <li>$\\boldsymbol{\\Sigma}$ ($m \\times n$): diagonal matrix of <strong>singular values</strong> <span class="vi">giá trị kỳ dị</span> $\\sigma_1 \\geq \\sigma_2 \\geq \\cdots \\geq 0$</li>
    <li>$\\mathbf{V}^T$ ($n \\times n$): right singular vectors <span class="vi">vectơ kỳ dị phải</span> — orthonormal basis for row space</li>
  </ul>
</div>

<div class="concept-box definition">
  <div class="box-label">Geometric Interpretation <span class="vi">Ý nghĩa hình học</span></div>
  <p>Any linear transformation = <strong>rotate</strong> ($\\mathbf{V}^T$) &rarr; <strong>scale</strong> ($\\boldsymbol{\\Sigma}$) &rarr; <strong>rotate</strong> ($\\mathbf{U}$). The singular values tell you how much stretching happens along each axis.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A $3 \\times 2$ matrix $\\mathbf{A}$ has SVD with singular values $\\sigma_1 = 10$ and $\\sigma_2 = 0.1$. What can you infer about the data?</p>
  <p><strong>Step 1:</strong> The ratio $\\sigma_1 / \\sigma_2 = 100$ is very large. This means one direction carries 100x more "signal" than the other.</p>
  <p><strong>Step 2:</strong> The data is nearly one-dimensional -- almost all the information lives along the first singular direction $\\mathbf{u}_1$.</p>
  <p><strong>Answer:</strong> The matrix is nearly rank-1. Keeping only $\\sigma_1$ (truncated SVD with $k=1$) captures $\\frac{10^2}{10^2 + 0.1^2} \\approx 99.99\\%$ of the energy (Frobenius norm squared). This is how PCA decides to drop dimensions.</p>
</div>

<h3>Truncated SVD & Low-Rank Approximation <span class="vi">SVD cắt ngắn & Xấp xỉ hạng thấp</span></h3>
<div class="concept-box formula">
  <div class="box-label">Best Rank-k Approximation <span class="vi">Xấp xỉ hạng k tốt nhất</span></div>
  $$\\mathbf{A}_k = \\mathbf{U}_k \\boldsymbol{\\Sigma}_k \\mathbf{V}_k^T = \\sum_{i=1}^{k} \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T$$
  <p>Keep only the top $k$ singular values. By the <strong>Eckart-Young theorem</strong>, this is the best rank-$k$ approximation in Frobenius norm.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> An image is stored as a $512 \\times 512$ grayscale matrix (262,144 numbers). Using truncated SVD with $k = 20$, compute the compression ratio.</p>
  <p><strong>Step 1:</strong> Compressed storage: $\\mathbf{U}_k$ is $512 \\times 20$, $\\boldsymbol{\\Sigma}_k$ is $20$, $\\mathbf{V}_k^T$ is $20 \\times 512$. Total: $512 \\times 20 + 20 + 20 \\times 512 = 20{,}500$.</p>
  <p><strong>Step 2:</strong> Compression ratio: $\\frac{262{,}144}{20{,}500} \\approx 12.8\\times$.</p>
  <p><strong>Answer:</strong> Nearly 13x compression. The image uses only 20,500 numbers instead of 262,144, while retaining the 20 most important "modes" of variation.</p>
</div>

<h3>Other Decompositions <span class="vi">Các phân tích khác</span></h3>
<table class="example-table">
  <tr><th>Decomposition <span class="vi">Phân tích</span></th><th>Form</th><th>Use <span class="vi">Ứng dụng</span></th></tr>
  <tr><td><strong>Cholesky</strong></td><td>$\\mathbf{A} = \\mathbf{L}\\mathbf{L}^T$</td><td>Efficient solve for positive definite systems <span class="vi">hệ xác định dương</span>, sampling from Gaussians</td></tr>
  <tr><td><strong>LU</strong></td><td>$\\mathbf{A} = \\mathbf{L}\\mathbf{U}$</td><td>Solving linear systems <span class="vi">giải hệ tuyến tính</span>, computing determinants</td></tr>
  <tr><td><strong>QR</strong></td><td>$\\mathbf{A} = \\mathbf{Q}\\mathbf{R}$</td><td>Numerically stable least squares <span class="vi">bình phương tối thiểu ổn định</span></td></tr>
</table>

<h3>Pseudoinverse via SVD <span class="vi">Giả nghịch đảo qua SVD</span></h3>
<div class="concept-box formula">
  <div class="box-label">Moore-Penrose Pseudoinverse <span class="vi">Giả nghịch đảo Moore-Penrose</span></div>
  $$\\mathbf{A}^+ = \\mathbf{V} \\boldsymbol{\\Sigma}^+ \\mathbf{U}^T$$
  <p>where $\\boldsymbol{\\Sigma}^+$ inverts each non-zero singular value. Gives the least-squares solution even when $\\mathbf{A}$ is not invertible.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> In LoRA fine-tuning, the original weight matrix is $\\mathbf{W} \\in \\mathbb{R}^{4096 \\times 4096}$ and the low-rank update uses rank $r = 8$. How many parameters does LoRA train vs. full fine-tuning?</p>
  <p><strong>Step 1:</strong> Full fine-tuning: $4096 \\times 4096 = 16{,}777{,}216$ parameters.</p>
  <p><strong>Step 2:</strong> LoRA trains $\\mathbf{B} \\in \\mathbb{R}^{4096 \\times 8}$ and $\\mathbf{A} \\in \\mathbb{R}^{8 \\times 4096}$: $4096 \\times 8 + 8 \\times 4096 = 65{,}536$ parameters.</p>
  <p><strong>Step 3:</strong> Reduction ratio: $\\frac{16{,}777{,}216}{65{,}536} = 256\\times$ fewer parameters.</p>
  <p><strong>Answer:</strong> LoRA trains only $65{,}536$ parameters (0.39% of the original), relying on the insight from SVD that weight updates are approximately low-rank.</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>PCA</strong> <span class="vi">Phân tích thành phần chính</span>: computed via SVD of the centered data matrix — principal components are the right singular vectors</li>
    <li><strong>Latent Semantic Analysis (LSA)</strong> <span class="vi">Phân tích ngữ nghĩa ẩn</span>: truncated SVD on term-document matrices for topic discovery</li>
    <li><strong>Image compression</strong> <span class="vi">nén ảnh</span>: keep top-$k$ singular values to approximate images with far fewer parameters</li>
    <li><strong>Recommender systems</strong> <span class="vi">hệ thống gợi ý</span>: matrix factorization (Netflix Prize) decomposes user-item matrices</li>
    <li><strong>LoRA</strong> <span class="vi">Low-Rank Adaptation</span>: fine-tunes LLMs by adding low-rank decomposition $\\Delta W = BA$ to weight matrices</li>
  </ul>
</div>
`,
        quiz: [
          { q: 'SVD works for:', options: ['Only square matrices', 'Only symmetric matrices', 'Any matrix', 'Only invertible matrices'], answer: 2 },
          { q: 'In A = UΣV^T, the diagonal entries of Σ are:', options: ['Eigenvalues', 'Singular values', 'Eigenvectors', 'Determinants'], answer: 1 },
          { q: 'Truncated SVD keeps the top k singular values to produce:', options: ['An exact copy of A', 'The best rank-k approximation', 'The inverse of A', 'A random matrix'], answer: 1 },
        ],
        bloom: [
          { type: 'match', level: 0, prompt: 'Match each decomposition to its form:', pairs: [['SVD', '$A = U\\Sigma V^T$'], ['Cholesky', '$A = LL^T$'], ['Eigendecomposition', '$A = V\\Lambda V^{-1}$'], ['QR', '$A = QR$']] },
          { type: 'choice', level: 1, prompt: 'Why is SVD more general than eigendecomposition?', options: ['It is faster to compute', 'It works for any matrix, not just square ones', 'It always produces real values', 'It uses fewer factors'], answer: 1 },
          { type: 'numeric', level: 2, prompt: 'A 1000x500 matrix has rank 20. Using truncated SVD with k=20, how many total numbers do you need to store ($U_k$, $\\Sigma_k$, $V_k^T$)?', correctValue: 30020, tolerance: 0 },
          { type: 'order', level: 3, prompt: 'Order the steps of PCA via SVD:', correctOrder: ['Center the data (subtract mean)', 'Compute SVD of centered data matrix', 'Select top k singular values/vectors', 'Project data onto k principal components'] },
          { type: 'explain', level: 4, prompt: 'An image is stored as a 1000x1000 matrix. Explain how truncated SVD with k=50 compresses the image and calculate the compression ratio (original size vs stored size).' },
          { type: 'open', level: 5, prompt: 'LoRA fine-tunes large language models by decomposing weight updates as $\\Delta W = BA$ where B and A are low-rank. Design an experiment to determine the optimal rank for a given task. What metrics would you track?' },
        ],
        homework: [
          { id: 'hw-svd-decompositions-1', type: 'multiple-choice', prompt: 'SVD decomposes any $m \\times n$ matrix into:', options: ['$A = QR$', '$A = LU$', '$A = U\\Sigma V^T$', '$A = V\\Lambda V^{-1}$'], answer: '$A = U\\Sigma V^T$', difficulty: 'easy' },
          { id: 'hw-svd-decompositions-2', type: 'numeric', prompt: 'A 1000x500 matrix with rank 10. Using truncated SVD (k=10), how many numbers are stored in $U_k$ ($1000 \\times 10$), $\\Sigma_k$ ($10$), and $V_k^T$ ($10 \\times 500$)?', answer: 15010, tolerance: 0, difficulty: 'medium' },
          { id: 'hw-svd-decompositions-3', type: 'free-response', prompt: 'An image is a 512x512 grayscale matrix. Using truncated SVD with $k = 20$, compute the compression ratio (original storage / compressed storage). Is this a good tradeoff?', hint: 'Original: $512 \\times 512$. Compressed: $512 \\times 20 + 20 + 20 \\times 512$.', difficulty: 'medium' },
          { id: 'hw-svd-decompositions-4', type: 'free-response', prompt: 'LoRA fine-tunes LLMs by adding low-rank updates $\\Delta W = BA$ where $B \\in \\mathbb{R}^{d \\times r}$ and $A \\in \\mathbb{R}^{r \\times d}$ with $r \\ll d$. If the original weight matrix is $4096 \\times 4096$ and $r = 8$, compute the parameter reduction ratio compared to full fine-tuning. Explain why this works from an SVD perspective.', hint: 'Full fine-tuning updates all $d^2$ parameters. LoRA only updates $2dr$ parameters.', difficulty: 'hard' },
        ],
      },
      {
        id: 'positive-definite',
        title: 'Positive Definite Matrices',
        content: `
<h2>Positive Definite Matrices <span class="vi">Ma trận xác định dương</span></h2>
<p>Positive definite matrices <span class="vi">ma trận xác định dương</span> are a special class of symmetric matrices that appear everywhere in ML — from covariance matrices <span class="vi">ma trận hiệp phương sai</span> to optimization theory <span class="vi">lý thuyết tối ưu hóa</span>.</p>

<h3>Definition <span class="vi">Định nghĩa</span></h3>
<p>Geometrically, a positive definite matrix represents a "bowl-shaped" surface <span class="vi">bề mặt hình bát</span>. Imagine the quadratic form $\\mathbf{x}^T \\mathbf{A} \\mathbf{x}$ as the height of a surface above the origin. If $\\mathbf{A}$ is positive definite, this surface curves upward in <em>every</em> direction -- like the inside of a bowl. There is exactly one lowest point (the bottom of the bowl), which is why positive definite Hessians guarantee a unique minimum in optimization. If the surface dips down in any direction, the matrix is not positive definite -- you have a saddle point instead of a bowl.</p>

<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>A symmetric matrix $\\mathbf{A} \\in \\mathbb{R}^{n \\times n}$ is <strong>positive definite</strong> <span class="vi">xác định dương</span> (written $\\mathbf{A} \\succ 0$) if:</p>
  $$\\mathbf{x}^T \\mathbf{A} \\mathbf{x} > 0 \\quad \\text{for all } \\mathbf{x} \\neq \\mathbf{0}$$
  <p><span class="vi">Với mọi vectơ $\\mathbf{x}$ khác không, dạng toàn phương $\\mathbf{x}^T \\mathbf{A} \\mathbf{x}$ luôn dương.</span></p>
</div>

<p>The expression $\\mathbf{x}^T \\mathbf{A} \\mathbf{x}$ is called a <strong>quadratic form</strong> <span class="vi">dạng toàn phương</span>. For a 2×2 matrix:</p>
$$\\begin{bmatrix} x_1 & x_2 \\end{bmatrix} \\begin{bmatrix} a & b \\\\ b & d \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = a x_1^2 + 2b x_1 x_2 + d x_2^2$$

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Test whether $\\mathbf{A} = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}$ is positive definite by computing $\\mathbf{x}^T \\mathbf{A} \\mathbf{x}$ for $\\mathbf{x} = [1, 1]^T$ and checking eigenvalues.</p>
  <p><strong>Step 1:</strong> Quadratic form: $\\mathbf{x}^T \\mathbf{A} \\mathbf{x} = 2(1)^2 + 2(1)(1)(1) + 3(1)^2 = 2 + 2 + 3 = 7 > 0$.</p>
  <p><strong>Step 2:</strong> Eigenvalue check: solve $\\lambda^2 - 5\\lambda + 5 = 0$ (trace=5, det=5). $\\lambda = \\frac{5 \\pm \\sqrt{5}}{2} \\approx 3.618, 1.382$.</p>
  <p><strong>Step 3:</strong> Both eigenvalues are positive, confirming positive definiteness.</p>
  <p><strong>Answer:</strong> $\\mathbf{A}$ is positive definite. The quadratic surface $f(x_1, x_2) = 2x_1^2 + 2x_1 x_2 + 3x_2^2$ forms a bowl shape with a unique minimum at the origin.</p>
</div>

<h3>Equivalent Conditions <span class="vi">Các điều kiện tương đương</span></h3>
<p>There are many ways to check positive definiteness, and knowing several gives you flexibility <span class="vi">tính linh hoạt</span>. Computing eigenvalues is the most intuitive (all positive = bowl in every direction), but for large matrices, Cholesky decomposition is the fastest practical test: if the algorithm succeeds, the matrix is PD; if it fails, it is not.</p>

<div class="concept-box formula">
  <div class="box-label">Equivalent Tests <span class="vi">Các phép kiểm tương đương</span></div>
  <p>For a symmetric matrix $\\mathbf{A}$, the following are <strong>all equivalent</strong> <span class="vi">tất cả tương đương</span>:</p>
  <ul>
    <li>$\\mathbf{x}^T \\mathbf{A} \\mathbf{x} > 0$ for all $\\mathbf{x} \\neq \\mathbf{0}$</li>
    <li>All eigenvalues <span class="vi">trị riêng</span> are positive: $\\lambda_i > 0$ for all $i$</li>
    <li>All pivots <span class="vi">phần tử chốt</span> in Gaussian elimination are positive</li>
    <li>All leading principal minors <span class="vi">định thức con chính</span> are positive (Sylvester's criterion <span class="vi">tiêu chuẩn Sylvester</span>)</li>
    <li>Cholesky decomposition <span class="vi">phân tích Cholesky</span> exists: $\\mathbf{A} = \\mathbf{L}\\mathbf{L}^T$ where $\\mathbf{L}$ is lower triangular <span class="vi">tam giác dưới</span></li>
  </ul>
</div>

<h3>Positive Semi-Definite (PSD) <span class="vi">Nửa xác định dương</span></h3>
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>$\\mathbf{A}$ is <strong>positive semi-definite</strong> <span class="vi">nửa xác định dương</span> (written $\\mathbf{A} \\succeq 0$) if:</p>
  $$\\mathbf{x}^T \\mathbf{A} \\mathbf{x} \\geq 0 \\quad \\text{for all } \\mathbf{x}$$
  <p>Same as positive definite, but allows zero <span class="vi">cho phép bằng không</span>. Equivalently, all eigenvalues $\\lambda_i \\geq 0$.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A covariance matrix for a 2-feature dataset is $\\boldsymbol{\\Sigma} = \\begin{bmatrix} 4 & 2 \\\\ 2 & 4 \\end{bmatrix}$. Show it is positive definite and find its eigenvalues.</p>
  <p><strong>Step 1:</strong> Characteristic equation: $(4-\\lambda)^2 - 4 = 0$, so $\\lambda^2 - 8\\lambda + 12 = 0$.</p>
  <p><strong>Step 2:</strong> Solve: $\\lambda = \\frac{8 \\pm \\sqrt{64 - 48}}{2} = \\frac{8 \\pm 4}{2}$, giving $\\lambda_1 = 6$, $\\lambda_2 = 2$.</p>
  <p><strong>Step 3:</strong> Both eigenvalues are strictly positive, so $\\boldsymbol{\\Sigma} \\succ 0$.</p>
  <p><strong>Answer:</strong> The covariance matrix is positive definite with eigenvalues 6 and 2. This means the data ellipse has axes with standard deviations $\\sqrt{6} \\approx 2.45$ and $\\sqrt{2} \\approx 1.41$.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> In Ridge regression, $\\mathbf{X}^T\\mathbf{X}$ has eigenvalues $[0.001, 3, 7]$ (nearly singular). After adding $\\lambda \\mathbf{I}$ with $\\lambda = 0.1$, what are the new eigenvalues?</p>
  <p><strong>Step 1:</strong> Adding $\\lambda \\mathbf{I}$ shifts every eigenvalue by $\\lambda$: new eigenvalues = $[0.001 + 0.1, 3 + 0.1, 7 + 0.1] = [0.101, 3.1, 7.1]$.</p>
  <p><strong>Step 2:</strong> The smallest eigenvalue went from 0.001 (nearly zero, nearly singular) to 0.101 (safely positive).</p>
  <p><strong>Answer:</strong> New eigenvalues are $[0.101, 3.1, 7.1]$. The matrix is now comfortably positive definite, making $(\\mathbf{X}^T\\mathbf{X} + 0.1\\mathbf{I})$ safely invertible. This is why Ridge regularization stabilizes linear regression.</p>
</div>

<h3>Properties <span class="vi">Tính chất</span></h3>
<ul>
  <li>Positive definite matrices are always <strong>invertible</strong> <span class="vi">khả nghịch</span> (no zero eigenvalues)</li>
  <li>$\\det(\\mathbf{A}) > 0$ for positive definite $\\mathbf{A}$ <span class="vi">định thức dương</span></li>
  <li>The diagonal entries <span class="vi">phần tử đường chéo</span> must be positive: $a_{ii} > 0$</li>
  <li>If $\\mathbf{A} \\succ 0$ and $\\mathbf{B} \\succ 0$, then $\\mathbf{A} + \\mathbf{B} \\succ 0$ <span class="vi">tổng của hai ma trận xác định dương cũng xác định dương</span></li>
  <li>For any matrix $\\mathbf{B}$ with full column rank: $\\mathbf{B}^T \\mathbf{B} \\succ 0$ <span class="vi">luôn xác định dương</span></li>
</ul>

<div class="concept-box warning">
  <div class="box-label">Key Insight <span class="vi">Điểm mấu chốt</span></div>
  <p>$\\mathbf{B}^T \\mathbf{B}$ is <em>always</em> positive semi-definite for any $\\mathbf{B}$. This is why $\\mathbf{X}^T \\mathbf{X}$ (the Gram matrix of data) is PSD — a fact used constantly in ML.</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Covariance matrices are PSD</strong> <span class="vi">Ma trận hiệp phương sai luôn nửa xác định dương</span>: $\\text{Cov} = \\mathbb{E}[(\\mathbf{x} - \\boldsymbol{\\mu})(\\mathbf{x} - \\boldsymbol{\\mu})^T] \\succeq 0$. This guarantees variances are non-negative.</li>
    <li><strong>Kernel matrices (Gram matrices)</strong> <span class="vi">Ma trận kernel (ma trận Gram)</span> must be PSD — this is Mercer's condition <span class="vi">điều kiện Mercer</span>. A function $k(x, x')$ is a valid kernel if and only if it produces PSD matrices.</li>
    <li><strong>Hessian positive definite = convex function</strong> <span class="vi">Hessian xác định dương = hàm lồi</span>: If the Hessian matrix $\\mathbf{H}$ of a loss function is positive definite at a critical point, that point is a local minimum <span class="vi">cực tiểu</span>. If $\\mathbf{H} \\succ 0$ everywhere, the function is strictly convex <span class="vi">lồi chặt</span> and has a unique global minimum <span class="vi">cực tiểu toàn cục duy nhất</span>.</li>
    <li><strong>Regularization ensures positive definiteness</strong> <span class="vi">Chính quy hóa đảm bảo tính xác định dương</span>: Adding $\\lambda \\mathbf{I}$ to a PSD matrix makes it positive definite: $\\mathbf{A} + \\lambda \\mathbf{I} \\succ 0$ for $\\lambda > 0$. This is why Ridge regression <span class="vi">hồi quy Ridge</span> adds $\\lambda \\mathbf{I}$ to $\\mathbf{X}^T\\mathbf{X}$ — it ensures invertibility.</li>
  </ul>
</div>
`,
        quiz: [
          { q: 'A matrix is positive definite if $\\mathbf{x}^T \\mathbf{A} \\mathbf{x}$ is:', options: ['Zero for all x', 'Positive for all x \\neq 0', 'Negative for all x', 'Positive for some x'], answer: 1 },
          { q: 'Which is NOT an equivalent condition for positive definiteness?', options: ['All eigenvalues > 0', 'Cholesky decomposition exists', 'All entries are positive', 'All pivots > 0'], answer: 2 },
          { q: 'Adding $\\lambda \\mathbf{I}$ ($\\lambda > 0$) to a PSD matrix makes it:', options: ['Singular', 'Positive definite', 'Negative definite', 'Symmetric only'], answer: 1 },
        ],
        bloom: [
          { type: 'choice', level: 0, prompt: 'A positive semi-definite matrix has eigenvalues that are:', options: ['All positive', 'All non-negative', 'All negative', 'Mixed sign'], answer: 1 },
          { type: 'match', level: 1, prompt: 'Match each property to the correct matrix type:', pairs: [['$\\mathbf{x}^T \\mathbf{A} \\mathbf{x} > 0$ for all $\\mathbf{x} \\neq 0$', 'Positive definite'], ['$\\mathbf{x}^T \\mathbf{A} \\mathbf{x} \\geq 0$ for all $\\mathbf{x}$', 'Positive semi-definite'], ['All eigenvalues $\\lambda_i > 0$', 'Positive definite'], ['$\\det(\\mathbf{A}) = 0$ possible', 'Positive semi-definite']] },
          { type: 'numeric', level: 2, prompt: 'Matrix $\\mathbf{A}$ has eigenvalues 2, 5, and 8. What is $\\det(\\mathbf{A})$? (Hint: determinant = product of eigenvalues)', correctValue: 80, tolerance: 0 },
          { type: 'order', level: 3, prompt: 'Order the steps to verify positive definiteness using Cholesky decomposition:', correctOrder: ['Check that A is symmetric', 'Attempt to compute A = L L^T', 'Verify all diagonal entries of L are positive', 'If decomposition succeeds, A is positive definite'] },
          { type: 'explain', level: 4, prompt: 'In Ridge regression, we solve $(\\mathbf{X}^T\\mathbf{X} + \\lambda\\mathbf{I})^{-1}\\mathbf{X}^T\\mathbf{y}$. Explain why $\\mathbf{X}^T\\mathbf{X}$ alone might not be invertible, and how adding $\\lambda\\mathbf{I}$ fixes this using the concept of positive definiteness.' },
          { type: 'open', level: 5, prompt: 'Design a check that determines whether a given kernel function produces valid (PSD) Gram matrices. Describe what you would compute given a set of data points, and explain why PSD-ness is required for kernel methods like SVM to work correctly.' },
        ],
        homework: [
          { id: 'hw-positive-definite-1', type: 'multiple-choice', prompt: 'A positive definite matrix must have:', options: ['All entries positive', 'All eigenvalues positive', 'Determinant zero', 'All eigenvalues negative'], answer: 'All eigenvalues positive', difficulty: 'easy' },
          { id: 'hw-positive-definite-2', type: 'numeric', prompt: 'Matrix $\\mathbf{A}$ has eigenvalues 3, 7, and 2. What is $\\det(\\mathbf{A})$?', answer: 42, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-positive-definite-3', type: 'free-response', prompt: 'Verify that $\\mathbf{A} = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}$ is positive definite by: (a) checking eigenvalues, and (b) checking that $\\mathbf{x}^T\\mathbf{A}\\mathbf{x} > 0$ for $\\mathbf{x} = [1, 1]^T$.', hint: 'Eigenvalues of a 2x2 symmetric matrix: solve $\\lambda^2 - \\text{trace}\\cdot\\lambda + \\det = 0$.', difficulty: 'medium' },
          { id: 'hw-positive-definite-4', type: 'free-response', prompt: 'In Ridge regression, we solve $(\\mathbf{X}^T\\mathbf{X} + \\lambda\\mathbf{I})\\hat{\\mathbf{w}} = \\mathbf{X}^T\\mathbf{y}$. Explain why $\\mathbf{X}^T\\mathbf{X}$ might be only positive semi-definite (not positive definite), and prove that adding $\\lambda\\mathbf{I}$ with $\\lambda > 0$ makes it positive definite.', hint: 'If $\\mathbf{X}$ has linearly dependent columns, some eigenvalues of $\\mathbf{X}^T\\mathbf{X}$ are zero. Adding $\\lambda\\mathbf{I}$ shifts all eigenvalues by $\\lambda$.', difficulty: 'hard' },
        ],
      }
    ]
  },

  // ===================== CALCULUS =====================
  {
    id: 'calculus',
    title: 'Calculus',
    icon: '📈',
    description: 'Derivatives, gradients, and the math behind optimization.',
    lessons: [
      {
        id: 'limits',
        title: 'Limits & Continuity',
        content: `
<h2>Limits & Continuity <span class="vi">Giới hạn & Tính liên tục</span></h2>
<p>Limits <span class="vi">giới hạn</span> are the foundation of calculus. Derivatives and integrals are both defined using limits.</p>

<p>Imagine walking toward a cliff edge <span class="vi">mép vực</span>. You can get closer and closer without ever stepping off. That is the intuition behind a limit: we care about what value a function <strong>approaches</strong> <span class="vi">tiến đến</span> as the input gets near some target, even if the function never actually arrives there. In ML, limits appear every time we write a derivative — the definition $f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}$ literally asks "what happens as the step $h$ shrinks toward zero?" Understanding limits means understanding why gradient-based training works at all.</p>

<h3>What is a Limit? <span class="vi">Giới hạn là gì?</span></h3>
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>$\\lim_{x \\to a} f(x) = L$ means as $x$ gets closer and closer to $a$, $f(x)$ gets closer and closer to $L$.</p>
  <p><span class="vi">Khi $x$ tiến tới $a$, $f(x)$ tiến tới $L$.</span></p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Evaluate $\\lim_{x \\to 3} (x^2 - 1)$.</p>
  <p><strong>Step 1:</strong> Since $f(x) = x^2 - 1$ is a polynomial <span class="vi">đa thức</span>, it is continuous everywhere, so we can substitute directly.</p>
  <p><strong>Step 2:</strong> $f(3) = 3^2 - 1 = 9 - 1 = 8$.</p>
  <p><strong>Answer:</strong> $\\lim_{x \\to 3}(x^2 - 1) = 8$.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Evaluate $\\lim_{x \\to 0} \\frac{x^2 + 3x}{x}$. (This pattern appears in derivative difference quotients <span class="vi">thương sai phân</span>.)</p>
  <p><strong>Step 1:</strong> Direct substitution gives $\\frac{0}{0}$ — indeterminate <span class="vi">dạng vô định</span>. Factor the numerator: $\\frac{x^2 + 3x}{x} = \\frac{x(x+3)}{x}$.</p>
  <p><strong>Step 2:</strong> Cancel $x$ (valid for $x \\neq 0$): the expression becomes $x + 3$.</p>
  <p><strong>Step 3:</strong> Now substitute $x = 0$: $0 + 3 = 3$.</p>
  <p><strong>Answer:</strong> $\\lim_{x \\to 0} \\frac{x^2+3x}{x} = 3$.</p>
</div>

<h3>Limit Rules <span class="vi">Quy tắc giới hạn</span></h3>
<p>These rules let you break complex limits into simpler pieces — just like factoring a large computation into small, manageable parts. They hold whenever the individual limits exist and are finite.</p>

<div class="concept-box formula">
  <div class="box-label">Rules <span class="vi">Quy tắc</span></div>
  $$\\lim [f(x) + g(x)] = \\lim f(x) + \\lim g(x)$$
  $$\\lim [f(x) \\cdot g(x)] = \\lim f(x) \\cdot \\lim g(x)$$
  $$\\lim [c \\cdot f(x)] = c \\cdot \\lim f(x)$$
  $$\\lim \\frac{f(x)}{g(x)} = \\frac{\\lim f(x)}{\\lim g(x)} \\quad \\text{if } \\lim g(x) \\neq 0$$
</div>

<h3>Important Limits <span class="vi">Các giới hạn quan trọng</span></h3>
<table class="example-table">
  <tr><th>Limit <span class="vi">Giới hạn</span></th><th>Value <span class="vi">Giá trị</span></th><th>Why it matters</th></tr>
  <tr><td>$\\lim_{n \\to \\infty} (1 + 1/n)^n$</td><td>$e \\approx 2.718$</td><td>Defines $e$ <span class="vi">định nghĩa số $e$</span></td></tr>
  <tr><td>$\\lim_{x \\to 0} \\frac{\\sin x}{x}$</td><td>$1$</td><td>Small angle approximation</td></tr>
  <tr><td>$\\lim_{x \\to \\infty} \\frac{e^x}{x^n}$</td><td>$\\infty$</td><td>Exponentials dominate polynomials <span class="vi">hàm mũ tăng nhanh hơn đa thức</span></td></tr>
  <tr><td>$\\lim_{x \\to 0^+} x \\ln x$</td><td>$0$</td><td>Used in entropy when $p \\to 0$</td></tr>
</table>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Show that $\\lim_{x \\to 0^+} x \\ln x = 0$. (This result is used in ML when computing entropy <span class="vi">entropy</span> terms like $p \\log p$ as $p \\to 0$.)</p>
  <p><strong>Step 1:</strong> As $x \\to 0^+$, we have $x \\to 0$ and $\\ln x \\to -\\infty$, giving the indeterminate form $0 \\cdot (-\\infty)$. Rewrite as a fraction: $x \\ln x = \\frac{\\ln x}{1/x}$, which is $\\frac{-\\infty}{\\infty}$.</p>
  <p><strong>Step 2:</strong> Apply L'Hopital's rule <span class="vi">quy tắc L'Hopital</span>: $\\lim_{x \\to 0^+} \\frac{\\ln x}{1/x} = \\lim_{x \\to 0^+} \\frac{1/x}{-1/x^2} = \\lim_{x \\to 0^+} (-x) = 0$.</p>
  <p><strong>Answer:</strong> $\\lim_{x \\to 0^+} x \\ln x = 0$. This is why we define $0 \\log 0 = 0$ in cross-entropy loss <span class="vi">hàm mất mát entropy chéo</span>.</p>
</div>

<h3>Continuity <span class="vi">Tính liên tục</span></h3>
<p>Continuity is what allows us to "trust" a function's local behavior <span class="vi">hành vi cục bộ</span>. If a function is continuous, there are no surprises: nearby inputs produce nearby outputs. Think of it as a smooth road with no potholes <span class="vi">con đường trơn, không ổ gà</span>. This property is essential for optimization — gradient descent assumes we can take small steps and get predictable changes in loss.</p>

<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>$f$ is <strong>continuous</strong> <span class="vi">liên tục</span> at $x = a$ if:</p>
  $$\\lim_{x \\to a} f(x) = f(a)$$
  <p>No jumps, no holes, no breaks. <span class="vi">Không nhảy, không có lỗ hổng, không gián đoạn.</span></p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Derivatives require continuity</strong> <span class="vi">đạo hàm yêu cầu tính liên tục</span>: You can only differentiate continuous functions</li>
    <li><strong>ReLU is continuous but not differentiable at 0</strong> <span class="vi">ReLU liên tục nhưng không khả vi tại 0</span> — in practice we just define $f'(0) = 0$</li>
    <li><strong>Softmax ensures continuity</strong>: Smooth mapping from logits to probabilities</li>
    <li><strong>Gradient descent assumes smooth loss surface</strong> <span class="vi">hạ gradient giả định bề mặt mất mát trơn</span></li>
    <li>The definition of the derivative IS a limit: $f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$</li>
  </ul>
</div>

<h3>L'Hôpital's Rule <span class="vi">Quy tắc L'Hôpital</span></h3>
<p>When direct substitution gives an indeterminate form <span class="vi">dạng vô định</span> like $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$, L'Hopital's rule gives us an escape hatch: differentiate the top and bottom separately and try again. Think of it as "zooming in" on the race between numerator and denominator to see which one wins.</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  <p>If $\\lim \\frac{f(x)}{g(x)}$ gives $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$, then:</p>
  $$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$$
  <p style="text-align:left;"><span class="vi">Thay thế bằng giới hạn của tỉ số đạo hàm.</span></p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Evaluate $\\lim_{x \\to 0} \\frac{e^x - 1}{x}$. (This limit appears when deriving the derivative of $e^x$ from the definition.)</p>
  <p><strong>Step 1:</strong> Substituting $x = 0$ gives $\\frac{e^0 - 1}{0} = \\frac{0}{0}$ — indeterminate. Apply L'Hopital's rule.</p>
  <p><strong>Step 2:</strong> Differentiate top and bottom: $\\lim_{x \\to 0} \\frac{\\frac{d}{dx}(e^x - 1)}{\\frac{d}{dx}(x)} = \\lim_{x \\to 0} \\frac{e^x}{1} = e^0 = 1$.</p>
  <p><strong>Answer:</strong> $\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$. This confirms that $\\frac{d}{dx}e^x = e^x$.</p>
</div>
`,
        quiz: [
          { q: '$\\lim_{x \\to 0} \\frac{\\sin x}{x}$ equals:', options: ['0', '1', '$\\infty$', 'Undefined'], answer: 1 },
          { q: 'A function is continuous at $x = a$ if:', options: ['$f(a)$ exists', '$\\lim_{x \\to a} f(x) = f(a)$', '$f\'(a)$ exists', '$f(a) = 0$'], answer: 1 },
          { q: 'ReLU at $x = 0$ is:', options: ['Continuous and differentiable', 'Continuous but not differentiable', 'Differentiable but not continuous', 'Neither'], answer: 1 },
        ],
        homework: [
          { id: 'hw-limits-1', type: 'numeric', prompt: 'Evaluate $\\lim_{x \\to 2} (x^2 + 3x - 1)$.', answer: 9, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-limits-2', type: 'multiple-choice', prompt: '$\\lim_{n \\to \\infty} (1 + 1/n)^n$ equals:', options: ['1', '$\\pi$', '$e \\approx 2.718$', '$\\infty$'], answer: '$e \\approx 2.718$', difficulty: 'easy' },
          { id: 'hw-limits-3', type: 'free-response', prompt: 'Use L\'Hopital\'s rule to evaluate $\\lim_{x \\to 0} \\frac{e^x - 1}{x}$. Show each step.', hint: 'This is a $0/0$ form. Differentiate numerator and denominator separately.', difficulty: 'medium' },
          { id: 'hw-limits-4', type: 'free-response', prompt: 'The derivative is defined as $f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$. Use this definition to derive the derivative of $f(x) = x^2$ from first principles. Then explain why ReLU is not differentiable at $x=0$ using this definition.', hint: 'For $x^2$: expand $(x+h)^2$ and simplify. For ReLU at 0: consider left vs right limits.', difficulty: 'hard' },
        ],
      },
      {
        id: 'derivatives',
        title: 'Derivatives & Partial Derivatives',
        content: `
<h2>Derivatives & Partial Derivatives <span class="vi">Đạo hàm & Đạo hàm riêng</span></h2>
<p>The derivative <span class="vi">đạo hàm</span> tells you the <strong>rate of change</strong> <span class="vi">tốc độ thay đổi</span> of a function — how the output changes as input changes. This is the foundation of all ML optimization <span class="vi">tối ưu hóa</span>.</p>

<p>Think about driving a car <span class="vi">lái xe</span>. Your speedometer shows your <strong>rate of change of position</strong> — that is a derivative. If your position is $s(t)$, your speed is $s'(t) = \\frac{ds}{dt}$. Now imagine "zooming in" on a curve <span class="vi">đường cong</span> until it looks like a straight line — the slope of that line is the derivative at that point. In ML, the loss function is a curve (or surface) over parameter space. The derivative tells us which direction to nudge each parameter to make the loss go down. Without derivatives, there would be no gradient descent <span class="vi">hạ gradient</span>, no backpropagation, and no modern deep learning.</p>

<h3>Derivative (Single Variable) <span class="vi">Đạo hàm một biến</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$f'(x) = \\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Using the power rule, find the derivative of $f(x) = 3x^4 - 2x^2 + 5$ and evaluate it at $x = 1$.</p>
  <p><strong>Step 1:</strong> Apply the power rule <span class="vi">quy tắc lũy thừa</span> term by term: $f'(x) = 3 \\cdot 4x^3 - 2 \\cdot 2x + 0 = 12x^3 - 4x$.</p>
  <p><strong>Step 2:</strong> Evaluate at $x = 1$: $f'(1) = 12(1)^3 - 4(1) = 12 - 4 = 8$.</p>
  <p><strong>Answer:</strong> $f'(1) = 8$. The function is increasing at rate 8 when $x = 1$.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> Derive the sigmoid derivative <span class="vi">đạo hàm sigmoid</span>: show that $\\sigma'(x) = \\sigma(x)(1 - \\sigma(x))$ where $\\sigma(x) = \\frac{1}{1+e^{-x}}$.</p>
  <p><strong>Step 1:</strong> Rewrite as $\\sigma(x) = (1 + e^{-x})^{-1}$. Apply the chain rule: $\\sigma'(x) = -(1 + e^{-x})^{-2} \\cdot (-e^{-x}) = \\frac{e^{-x}}{(1+e^{-x})^2}$.</p>
  <p><strong>Step 2:</strong> Notice that $\\frac{e^{-x}}{(1+e^{-x})^2} = \\frac{1}{1+e^{-x}} \\cdot \\frac{e^{-x}}{1+e^{-x}} = \\sigma(x) \\cdot \\frac{(1+e^{-x}) - 1}{1+e^{-x}} = \\sigma(x)(1 - \\sigma(x))$.</p>
  <p><strong>Answer:</strong> $\\sigma'(x) = \\sigma(x)(1 - \\sigma(x))$. The maximum is $0.25$ at $x=0$, which causes the vanishing gradient problem <span class="vi">vấn đề gradient biến mất</span> in deep networks.</p>
</div>

<h3>Common Derivatives <span class="vi">Các đạo hàm thường gặp</span></h3>
<table class="example-table">
  <tr><th>$f(x)$</th><th>$f'(x)$ <span class="vi">Đạo hàm</span></th></tr>
  <tr><td>$x^n$</td><td>$nx^{n-1}$</td></tr>
  <tr><td>$e^x$</td><td>$e^x$</td></tr>
  <tr><td>$\\ln(x)$</td><td>$1/x$</td></tr>
  <tr><td>$\\sin(x)$</td><td>$\\cos(x)$</td></tr>
  <tr><td>$\\sigma(x) = \\frac{1}{1+e^{-x}}$</td><td>$\\sigma(x)(1-\\sigma(x))$</td></tr>
</table>

<h3>Partial Derivatives <span class="vi">Đạo hàm riêng</span></h3>
<p>When a function depends on multiple inputs, a partial derivative asks: "if I wiggle just <em>one</em> input while freezing all others, how does the output change?" It is like adjusting one knob on a mixing board <span class="vi">bàn trộn âm thanh</span> while keeping the rest fixed. In ML with millions of weights, each partial derivative $\\frac{\\partial \\mathcal{L}}{\\partial w_i}$ tells us the effect of one specific weight on the loss.</p>

<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>When $f$ depends on multiple variables <span class="vi">nhiều biến</span>, the <strong>partial derivative</strong> <span class="vi">đạo hàm riêng</span> $\\frac{\\partial f}{\\partial x_i}$ tells you how $f$ changes when only $x_i$ changes, with all other variables held constant <span class="vi">giữ các biến khác cố định</span>.</p>
  $$f(x, y) = x^2 + 3xy \\implies \\frac{\\partial f}{\\partial x} = 2x + 3y, \\quad \\frac{\\partial f}{\\partial y} = 3x$$
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> For the MSE loss of a single sample $\\mathcal{L}(w, b) = (wx + b - y)^2$, compute $\\frac{\\partial \\mathcal{L}}{\\partial w}$ and $\\frac{\\partial \\mathcal{L}}{\\partial b}$.</p>
  <p><strong>Step 1:</strong> Let $e = wx + b - y$ (the prediction error <span class="vi">sai số dự đoán</span>). Then $\\mathcal{L} = e^2$.</p>
  <p><strong>Step 2:</strong> $\\frac{\\partial \\mathcal{L}}{\\partial w} = 2e \\cdot \\frac{\\partial e}{\\partial w} = 2(wx + b - y) \\cdot x$. (Treat $b, x, y$ as constants.)</p>
  <p><strong>Step 3:</strong> $\\frac{\\partial \\mathcal{L}}{\\partial b} = 2e \\cdot \\frac{\\partial e}{\\partial b} = 2(wx + b - y) \\cdot 1$.</p>
  <p><strong>Answer:</strong> $\\frac{\\partial \\mathcal{L}}{\\partial w} = 2x(wx + b - y)$ and $\\frac{\\partial \\mathcal{L}}{\\partial b} = 2(wx + b - y)$. These are exactly the gradients used in linear regression <span class="vi">hồi quy tuyến tính</span> training.</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p>A loss function <span class="vi">hàm mất mát</span> like MSE depends on millions of parameters <span class="vi">tham số</span>. The partial derivative $\\frac{\\partial \\mathcal{L}}{\\partial w_i}$ tells us how to adjust each weight <span class="vi">trọng số</span> $w_i$ to reduce the loss. This is exactly what backpropagation <span class="vi">lan truyền ngược</span> computes.</p>
</div>
`,
        interactive: 'derivativePlot',
        quiz: [
          { q: 'The derivative of $x^3$ is:', options: ['$x^2$', '$3x^2$', '$3x^3$', '$x^4/4$'], answer: 1 },
          { q: 'If $f(x,y) = x^2y + y^3$, what is $\\partial f/\\partial x$?', options: ['$2xy$', '$x^2 + 3y^2$', '$2xy + 3y^2$', '$2x + y$'], answer: 0 },
          { q: 'The sigmoid derivative $\\sigma\'(x)$ equals:', options: ['$\\sigma(x)$', '$1 - \\sigma(x)$', '$\\sigma(x)(1-\\sigma(x))$', '$e^{-x}$'], answer: 2 },
        ],
        bloom: [
          { type: 'match', level: 0, prompt: 'Match each function to its derivative:', pairs: [['$x^n$', '$nx^{n-1}$'], ['$e^x$', '$e^x$'], ['$\\ln(x)$', '$1/x$'], ['$\\sin(x)$', '$\\cos(x)$']] },
          { type: 'numeric', level: 2, prompt: 'If $f(x) = 3x^4 - 2x^2 + 5$, what is $f\'(2)$? (Compute the derivative, then evaluate at $x=2$)', correctValue: 88, tolerance: 0.5 },
          { type: 'choice', level: 3, prompt: 'The partial derivative $\\partial f / \\partial x$ treats which variables as constants?', options: ['x only', 'All variables except x', 'No variables', 'All variables'], answer: 1 },
          { type: 'explain', level: 4, prompt: 'Why is the derivative of the sigmoid function $\\sigma(x)(1-\\sigma(x))$ significant for neural networks? What problem does its maximum value of 0.25 cause during training?' },
          { type: 'open', level: 5, prompt: 'Design a custom activation function for a neural network. Define it mathematically, compute its derivative, and explain what properties make it suitable (differentiable, non-saturating, etc.).' },
        ],
        homework: [
          { id: 'hw-derivatives-1', type: 'numeric', prompt: 'Compute $f\'(3)$ where $f(x) = x^4 - 2x^2$.', answer: 96, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-derivatives-2', type: 'multiple-choice', prompt: 'The derivative of $\\sigma(x) = \\frac{1}{1+e^{-x}}$ is:', options: ['$e^{-x}$', '$\\sigma(x)(1-\\sigma(x))$', '$-\\sigma(x)$', '$\\ln(\\sigma(x))$'], answer: '$\\sigma(x)(1-\\sigma(x))$', difficulty: 'easy' },
          { id: 'hw-derivatives-3', type: 'free-response', prompt: 'Given $f(x, y) = x^2y + \\sin(xy)$, compute $\\frac{\\partial f}{\\partial x}$ and $\\frac{\\partial f}{\\partial y}$.', hint: 'Treat $y$ as constant when differentiating with respect to $x$, and vice versa.', difficulty: 'medium' },
          { id: 'hw-derivatives-4', type: 'numeric', prompt: 'The maximum value of $\\sigma\'(x) = \\sigma(x)(1-\\sigma(x))$ occurs at $x=0$. What is this maximum value?', answer: 0.25, tolerance: 0.001, difficulty: 'medium' },
          { id: 'hw-derivatives-5', type: 'free-response', prompt: 'The vanishing gradient problem occurs because the sigmoid derivative has a maximum of 0.25. If a network has 10 sigmoid layers, estimate the magnitude of the gradient at the first layer (multiply the maximum derivatives). Then explain why ReLU ($f\'(x) = 1$ for $x > 0$) mitigates this problem.', hint: '$0.25^{10}$ gives you the worst-case gradient shrinkage factor.', difficulty: 'hard' },
        ],
      },
      {
        id: 'chain-rule',
        title: 'Chain Rule & Backpropagation',
        content: `
<h2>Chain Rule & Backpropagation <span class="vi">Quy tắc dây chuyền & Lan truyền ngược</span></h2>
<p>The chain rule <span class="vi">quy tắc dây chuyền</span> is the single most important calculus concept for deep learning <span class="vi">học sâu</span> — it's how neural networks learn <span class="vi">mạng nơ-ron học</span>.</p>

<p>Imagine a Rube Goldberg machine <span class="vi">cỗ máy Rube Goldberg</span>: a ball rolls into a lever, the lever tips a cup, the cup pours water that turns a wheel. Each stage transforms the "signal" and passes it along. The chain rule answers: if I nudge the ball a little at the start, how much does the wheel turn at the end? You just multiply the "amplification factor" <span class="vi">hệ số khuếch đại</span> at each stage. A neural network works the same way — data flows through layers, and backpropagation multiplies local derivatives layer by layer to figure out how each weight affects the final loss.</p>

<h3>Chain Rule <span class="vi">Quy tắc dây chuyền</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  <p>If $y = f(g(x))$ <span class="vi">hàm hợp</span>, then:</p>
  $$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx} \\quad \\text{where } u = g(x)$$
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> If $y = (3x + 1)^5$, find $\\frac{dy}{dx}$.</p>
  <p><strong>Step 1:</strong> Identify the outer and inner functions <span class="vi">hàm ngoài và hàm trong</span>: outer $f(u) = u^5$, inner $u = g(x) = 3x + 1$.</p>
  <p><strong>Step 2:</strong> Compute each derivative: $\\frac{dy}{du} = 5u^4 = 5(3x+1)^4$ and $\\frac{du}{dx} = 3$.</p>
  <p><strong>Step 3:</strong> Multiply: $\\frac{dy}{dx} = 5(3x+1)^4 \\cdot 3 = 15(3x+1)^4$.</p>
  <p><strong>Answer:</strong> $\\frac{dy}{dx} = 15(3x+1)^4$.</p>
</div>

<h3>Multivariate Chain Rule <span class="vi">Quy tắc dây chuyền nhiều biến</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  <p>If $L = f(g(h(x)))$, the derivatives "chain" together:</p>
  $$\\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial f} \\cdot \\frac{\\partial f}{\\partial g} \\cdot \\frac{\\partial g}{\\partial h} \\cdot \\frac{\\partial h}{\\partial x}$$
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p><strong>Backpropagation IS the chain rule.</strong> <span class="vi">Lan truyền ngược CHÍNH LÀ quy tắc dây chuyền.</span> A neural network is a composition of functions <span class="vi">hàm hợp</span>:</p>
  $$\\hat{y} = \\sigma(\\mathbf{W}_3 \\cdot \\text{ReLU}(\\mathbf{W}_2 \\cdot \\text{ReLU}(\\mathbf{W}_1 \\mathbf{x} + \\mathbf{b}_1) + \\mathbf{b}_2) + \\mathbf{b}_3)$$
  <p>To compute $\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}_1}$, we apply the chain rule through every layer <span class="vi">qua từng lớp</span>. This is done automatically by frameworks like PyTorch (autograd <span class="vi">tính đạo hàm tự động</span>).</p>
</div>

<h3>Example: Simple Network <span class="vi">Ví dụ: Mạng đơn giản</span></h3>
<p>Consider: input $x$ → linear $z = wx + b$ → sigmoid $a = \\sigma(z)$ → loss $L = (a - y)^2$</p>
<div class="concept-box formula">
  <div class="box-label">Backprop Step by Step <span class="vi">Lan truyền ngược từng bước</span></div>
  $$\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial a} \\cdot \\frac{\\partial a}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w} = 2(a-y) \\cdot \\sigma(z)(1-\\sigma(z)) \\cdot x$$
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> In a 2-layer network, input $x=2$, weights $w_1=0.5$, $w_2=1.0$, biases $b_1=0$, $b_2=0$, target $y=1$. Compute $\\frac{\\partial L}{\\partial w_1}$ for MSE loss with ReLU activation.</p>
  <p><strong>Step 1:</strong> Forward pass <span class="vi">lan truyền xuôi</span>: $z_1 = w_1 x + b_1 = 0.5(2) = 1$. $a_1 = \\text{ReLU}(1) = 1$. $z_2 = w_2 a_1 + b_2 = 1(1) = 1$. $\\hat{y} = z_2 = 1$. $L = (\\hat{y} - y)^2 = 0$.</p>
  <p><strong>Step 2:</strong> Backward pass <span class="vi">lan truyền ngược</span>: $\\frac{\\partial L}{\\partial \\hat{y}} = 2(\\hat{y} - y) = 0$. $\\frac{\\partial \\hat{y}}{\\partial a_1} = w_2 = 1$. $\\frac{\\partial a_1}{\\partial z_1} = 1$ (since $z_1 > 0$). $\\frac{\\partial z_1}{\\partial w_1} = x = 2$.</p>
  <p><strong>Step 3:</strong> Chain together: $\\frac{\\partial L}{\\partial w_1} = 0 \\cdot 1 \\cdot 1 \\cdot 2 = 0$.</p>
  <p><strong>Answer:</strong> $\\frac{\\partial L}{\\partial w_1} = 0$. The gradient is zero because the prediction already matches the target perfectly — the network is at a local optimum for this sample.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> For $y = e^{\\sin(x^2)}$, find $\\frac{dy}{dx}$ by applying the chain rule layer by layer.</p>
  <p><strong>Step 1:</strong> Identify three nested functions: outermost $e^u$ where $u = \\sin(v)$ where $v = x^2$.</p>
  <p><strong>Step 2:</strong> Derivatives of each: $\\frac{d}{du}e^u = e^u$, $\\frac{du}{dv} = \\cos(v)$, $\\frac{dv}{dx} = 2x$.</p>
  <p><strong>Step 3:</strong> Chain them: $\\frac{dy}{dx} = e^{\\sin(x^2)} \\cdot \\cos(x^2) \\cdot 2x$.</p>
  <p><strong>Answer:</strong> $\\frac{dy}{dx} = 2x \\cos(x^2) \\, e^{\\sin(x^2)}$. Each layer contributes one factor — exactly like backprop through a 3-layer network.</p>
</div>

<div class="concept-box warning">
  <div class="box-label">Vanishing Gradient Problem <span class="vi">Vấn đề gradient biến mất</span></div>
  <p>The sigmoid derivative maxes out at 0.25. After chaining through many layers, gradients become vanishingly small: $0.25^{10} \\approx 0.000001$. This is why ReLU replaced sigmoid in deep networks <span class="vi">mạng sâu</span>.</p>
</div>
`,
        quiz: [
          { q: 'If $y = (3x+1)^5$, then $dy/dx$ equals:', options: ['$5(3x+1)^4$', '$15(3x+1)^4$', '$5 \\cdot 3x^4$', '$(3x+1)^4$'], answer: 1 },
          { q: 'Backpropagation is a direct application of:', options: ['Matrix decomposition', 'The chain rule', 'Bayes theorem', 'The central limit theorem'], answer: 1 },
          { q: 'The vanishing gradient problem occurs because:', options: ['Learning rates are too high', 'Repeated multiplication of small derivatives', 'Matrices are singular', 'Data is not normalized'], answer: 1 },
        ],
        homework: [
          { id: 'hw-chain-rule-1', type: 'numeric', prompt: 'If $y = (2x + 3)^4$, compute $dy/dx$ at $x = 0$. (Use the chain rule: $4(2x+3)^3 \\cdot 2$)', answer: 216, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-chain-rule-2', type: 'multiple-choice', prompt: 'Backpropagation is a direct application of:', options: ['Taylor series', 'The chain rule', 'Bayes theorem', 'Matrix decomposition'], answer: 'The chain rule', difficulty: 'easy' },
          { id: 'hw-chain-rule-3', type: 'free-response', prompt: 'For a simple network: input $x$ -> $z = wx+b$ -> $a = \\text{ReLU}(z)$ -> loss $L = (a - y)^2$. Compute $\\frac{\\partial L}{\\partial w}$ using the chain rule. Assume $z > 0$ (so ReLU derivative is 1).', hint: '$\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial a} \\cdot \\frac{\\partial a}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w}$.', difficulty: 'medium' },
          { id: 'hw-chain-rule-4', type: 'free-response', prompt: 'In a deep network with $L$ sigmoid layers, the gradient of the loss with respect to the first layer weight involves multiplying $L$ sigmoid derivatives. If $\\sigma\'(z) \\leq 0.25$, bound the gradient magnitude after $L=20$ layers. Then explain two architectural solutions to the vanishing gradient problem used in modern networks.', hint: 'The bound is $0.25^{20}$. Consider ResNets (skip connections) and LSTM (gating mechanisms).', difficulty: 'hard' },
        ],
      },
      {
        id: 'gradients',
        title: 'Gradients & Jacobians',
        content: `
<h2>Gradients, Jacobians & Hessians <span class="vi">Gradient, Ma trận Jacobi & Ma trận Hesse</span></h2>

<h3>Gradient <span class="vi">Gradient / Vectơ đạo hàm</span></h3>
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>The <strong>gradient</strong> <span class="vi">gradient</span> is the vector of all partial derivatives <span class="vi">vectơ chứa tất cả đạo hàm riêng</span>. It points in the direction of steepest increase <span class="vi">hướng tăng nhanh nhất</span>.</p>
  $$\\nabla f = \\begin{bmatrix} \\frac{\\partial f}{\\partial x_1} \\\\ \\frac{\\partial f}{\\partial x_2} \\\\ \\vdots \\\\ \\frac{\\partial f}{\\partial x_n} \\end{bmatrix}$$
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p>Gradient descent <span class="vi">hạ gradient</span> moves in the <strong>opposite direction</strong> <span class="vi">ngược hướng</span> of the gradient to minimize loss <span class="vi">cực tiểu hóa hàm mất mát</span>:</p>
  $$\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\eta \\nabla \\mathcal{L}(\\mathbf{w}_t)$$
  <p>where $\\eta$ is the learning rate <span class="vi">tốc độ học</span>.</p>
</div>

<h3>Jacobian Matrix <span class="vi">Ma trận Jacobi</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  <p>For a vector-valued function <span class="vi">hàm vectơ</span> $\\mathbf{f}: \\mathbb{R}^n \\to \\mathbb{R}^m$:</p>
  $$\\mathbf{J} = \\begin{bmatrix} \\frac{\\partial f_1}{\\partial x_1} & \\cdots & \\frac{\\partial f_1}{\\partial x_n} \\\\ \\vdots & \\ddots & \\vdots \\\\ \\frac{\\partial f_m}{\\partial x_1} & \\cdots & \\frac{\\partial f_m}{\\partial x_n} \\end{bmatrix}$$
</div>
<p>The Jacobian generalizes the gradient to vector outputs. Each row is the gradient of one output component.</p>

<h3>Hessian Matrix <span class="vi">Ma trận Hesse</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  <p>The matrix of second-order partial derivatives <span class="vi">đạo hàm riêng bậc hai</span>:</p>
  $$\\mathbf{H}_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}$$
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Hessian</strong>: Tells us about the curvature <span class="vi">độ cong</span> of the loss surface <span class="vi">bề mặt hàm mất mát</span>. Used in second-order optimization <span class="vi">tối ưu bậc hai</span> methods (Newton's method, L-BFGS).</li>
    <li><strong>Jacobian</strong>: Used in normalizing flows <span class="vi">luồng chuẩn hóa</span>, physics-informed neural networks, and understanding layer transformations.</li>
    <li>If Hessian is positive definite <span class="vi">xác định dương</span> at a critical point <span class="vi">điểm tới hạn</span> → local minimum <span class="vi">cực tiểu địa phương</span>.</li>
  </ul>
</div>
`,
        interactive: 'gradientField',
        quiz: [
          { q: 'The gradient vector points in the direction of:', options: ['Steepest decrease', 'Steepest increase', 'Zero change', 'Random direction'], answer: 1 },
          { q: 'In gradient descent, we move in the _____ of the gradient.', options: ['Same direction', 'Opposite direction', 'Perpendicular direction', 'Random direction'], answer: 1 },
          { q: 'The Hessian matrix contains:', options: ['First derivatives', 'Second derivatives', 'Third derivatives', 'Eigenvalues'], answer: 1 },
        ],
        homework: [
          { id: 'hw-gradients-1', type: 'free-response', prompt: 'Compute the gradient $\\nabla f$ of $f(x, y) = x^2 + 3xy + y^2$.', hint: '$\\nabla f = [\\partial f/\\partial x, \\partial f/\\partial y]^T$.', difficulty: 'easy' },
          { id: 'hw-gradients-2', type: 'multiple-choice', prompt: 'The gradient vector points in the direction of:', options: ['Steepest decrease', 'Steepest increase', 'Zero change', 'Random direction'], answer: 'Steepest increase', difficulty: 'easy' },
          { id: 'hw-gradients-3', type: 'free-response', prompt: 'Given $f(x_1, x_2) = x_1^2 + 4x_2^2$, compute the gradient at point $(2, 1)$. If the learning rate is $\\eta = 0.1$, what is the new point after one gradient descent step?', hint: 'Gradient descent: $(x_1, x_2)_{\\text{new}} = (x_1, x_2) - \\eta \\nabla f$.', difficulty: 'medium' },
          { id: 'hw-gradients-4', type: 'free-response', prompt: 'The Jacobian of a function $\\mathbf{f}: \\mathbb{R}^3 \\to \\mathbb{R}^2$ is a $2 \\times 3$ matrix. Explain why, and describe how the Jacobian generalizes the gradient. Give an example of where Jacobians appear in deep learning (e.g., normalizing flows).', hint: 'Each row of the Jacobian is the gradient of one output component.', difficulty: 'hard' },
        ],
      },
      {
        id: 'hessians',
        title: 'Hessians & Second-Order Methods',
        content: `
<h2>Hessians & Second-Order Methods <span class="vi">Ma trận Hesse & Phương pháp bậc hai</span></h2>
<p>While gradients tell us the <strong>slope</strong> <span class="vi">độ dốc</span> of the loss surface, the Hessian <span class="vi">ma trận Hesse</span> tells us about its <strong>curvature</strong> <span class="vi">độ cong</span>. Second-order methods use curvature information to take smarter optimization steps.</p>

<h3>Hessian Matrix Definition <span class="vi">Định nghĩa ma trận Hesse</span></h3>
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>The <strong>Hessian</strong> <span class="vi">ma trận Hesse</span> of a scalar function $f: \\mathbb{R}^n \\to \\mathbb{R}$ is the $n \\times n$ matrix of all second partial derivatives <span class="vi">đạo hàm riêng bậc hai</span>:</p>
  $$\\mathbf{H} = \\begin{bmatrix} \\frac{\\partial^2 f}{\\partial x_1^2} & \\frac{\\partial^2 f}{\\partial x_1 \\partial x_2} & \\cdots & \\frac{\\partial^2 f}{\\partial x_1 \\partial x_n} \\\\\\\\ \\frac{\\partial^2 f}{\\partial x_2 \\partial x_1} & \\frac{\\partial^2 f}{\\partial x_2^2} & \\cdots & \\frac{\\partial^2 f}{\\partial x_2 \\partial x_n} \\\\\\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\\\\\ \\frac{\\partial^2 f}{\\partial x_n \\partial x_1} & \\frac{\\partial^2 f}{\\partial x_n \\partial x_2} & \\cdots & \\frac{\\partial^2 f}{\\partial x_n^2} \\end{bmatrix}$$
  <p>For smooth functions <span class="vi">hàm trơn</span>, the Hessian is <strong>symmetric</strong> <span class="vi">đối xứng</span>: $\\frac{\\partial^2 f}{\\partial x_i \\partial x_j} = \\frac{\\partial^2 f}{\\partial x_j \\partial x_i}$ (Schwarz's theorem <span class="vi">định lý Schwarz</span>).</p>
</div>

<h3>Positive Definiteness & Convexity <span class="vi">Tính xác định dương & Tính lồi</span></h3>
<div class="concept-box formula">
  <div class="box-label">Second Derivative Test (Multivariable) <span class="vi">Kiểm tra đạo hàm bậc hai (nhiều biến)</span></div>
  <p>At a critical point <span class="vi">điểm tới hạn</span> where $\\nabla f = 0$:</p>
  <ul>
    <li>$\\mathbf{H}$ is <strong>positive definite</strong> <span class="vi">xác định dương</span> (all eigenvalues $> 0$) &rarr; <strong>local minimum</strong> <span class="vi">cực tiểu địa phương</span></li>
    <li>$\\mathbf{H}$ is <strong>negative definite</strong> <span class="vi">xác định âm</span> (all eigenvalues $< 0$) &rarr; <strong>local maximum</strong> <span class="vi">cực đại địa phương</span></li>
    <li>$\\mathbf{H}$ has both positive and negative eigenvalues &rarr; <strong>saddle point</strong> <span class="vi">điểm yên ngựa</span></li>
  </ul>
</div>

<div class="concept-box warning">
  <div class="box-label">Saddle Points in High Dimensions <span class="vi">Điểm yên ngựa trong không gian nhiều chiều</span></div>
  <p>In high-dimensional loss surfaces <span class="vi">bề mặt mất mát nhiều chiều</span>, saddle points are <strong>far more common</strong> <span class="vi">phổ biến hơn nhiều</span> than local minima. For $n$ dimensions, a critical point has $2^n$ possible sign combinations for Hessian eigenvalues, but only 1 is all-positive (minimum) and 1 is all-negative (maximum).</p>
</div>

<h3>Newton's Method <span class="vi">Phương pháp Newton</span></h3>
<div class="concept-box formula">
  <div class="box-label">Update Rule <span class="vi">Quy tắc cập nhật</span></div>
  <p>Newton's method uses curvature to take optimal steps:</p>
  $$\\mathbf{x}_{t+1} = \\mathbf{x}_t - \\mathbf{H}^{-1} \\nabla f(\\mathbf{x}_t)$$
  <p><span class="vi">$\\mathbf{H}^{-1}$ là nghịch đảo ma trận Hesse, $\\nabla f$ là gradient</span></p>
  <p>Compare with gradient descent <span class="vi">hạ gradient</span>: $\\mathbf{x}_{t+1} = \\mathbf{x}_t - \\eta \\nabla f$. Newton's method replaces the scalar learning rate $\\eta$ with $\\mathbf{H}^{-1}$, which adapts the step size per-dimension based on curvature.</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Newton's method vs gradient descent</strong> <span class="vi">phương pháp Newton so với hạ gradient</span>: Newton converges in fewer steps <span class="vi">hội tụ ít bước hơn</span> (quadratic vs linear convergence), but each step costs $O(n^3)$ to invert the Hessian — impractical for millions of parameters <span class="vi">không khả thi cho hàng triệu tham số</span></li>
    <li><strong>L-BFGS</strong> <span class="vi">L-BFGS</span>: Approximates the inverse Hessian <span class="vi">xấp xỉ nghịch đảo Hesse</span> using gradient history, requiring only $O(nm)$ memory where $m \\ll n$. Popular for small-to-medium models.</li>
    <li><strong>Hessian-free optimization</strong> <span class="vi">tối ưu không cần Hesse</span>: Computes Hessian-vector products <span class="vi">tích Hesse-vectơ</span> $\\mathbf{H}v$ without forming $\\mathbf{H}$ explicitly, using the identity $\\mathbf{H}v \\approx \\frac{\\nabla f(x + \\epsilon v) - \\nabla f(x)}{\\epsilon}$</li>
    <li><strong>Loss surface curvature</strong> <span class="vi">độ cong bề mặt mất mát</span>: The ratio of largest to smallest Hessian eigenvalue (condition number <span class="vi">số điều kiện</span>) determines how "elongated" the loss landscape is — high condition number means gradient descent zigzags <span class="vi">đi ziczac</span></li>
    <li><strong>Adam optimizer</strong>: Can be viewed as a diagonal approximation to the Hessian <span class="vi">xấp xỉ đường chéo của Hesse</span>, adapting per-parameter learning rates based on second moment of gradients</li>
  </ul>
</div>
`,
        quiz: [
          { q: 'If all eigenvalues of the Hessian at a critical point are positive, the point is a:', options: ['Saddle point', 'Local minimum', 'Local maximum', 'Inflection point'], answer: 1 },
          { q: 'Newton\'s method update rule is:', options: ['$x - \\\\eta \\\\nabla f$', '$x - H^{-1} \\\\nabla f$', '$x - H \\\\nabla f$', '$x + H^{-1} \\\\nabla f$'], answer: 1 },
          { q: 'Why is Newton\'s method impractical for large neural networks?', options: ['It diverges always', 'Inverting the Hessian costs $O(n^3)$ which is too expensive', 'It only works for convex functions', 'It requires the gradient to be zero'], answer: 1 },
        ],
        bloom: [
          { type: 'choice', level: 0, prompt: 'The Hessian matrix contains which type of derivatives?', options: ['First partial derivatives', 'Second partial derivatives', 'Third partial derivatives', 'Mixed first and third derivatives'], answer: 1 },
          { type: 'match', level: 1, prompt: 'Match each Hessian property to its geometric meaning:', pairs: [['All eigenvalues > 0', 'Local minimum (bowl shape)'], ['All eigenvalues < 0', 'Local maximum (dome shape)'], ['Mixed positive & negative eigenvalues', 'Saddle point'], ['Some eigenvalues = 0', 'Flat direction (degenerate)']] },
          { type: 'numeric', level: 2, prompt: 'For $f(x,y) = x^2 + 4y^2$, the Hessian is $\\\\begin{bmatrix} 2 & 0 \\\\\\\\\\\\\\\\ 0 & 8 \\\\end{bmatrix}$. What is the condition number (ratio of largest to smallest eigenvalue)?', correctValue: 4, tolerance: 0.01 },
          { type: 'order', level: 3, prompt: 'Order these optimization methods from least to most curvature information used:', correctOrder: ['Gradient descent (first-order only)', 'Adam (diagonal Hessian approximation)', 'L-BFGS (limited-memory Hessian approximation)', 'Newton\'s method (full Hessian)'] },
          { type: 'explain', level: 4, prompt: 'Explain why saddle points are more problematic than local minima for training deep neural networks. How does the Hessian help us distinguish between them, and why are saddle points exponentially more common in high dimensions?' },
          { type: 'open', level: 5, prompt: 'Design a hybrid optimization strategy for a neural network with 10M parameters. You cannot afford full Newton\'s method. Describe which second-order approximations you would use, when to switch between methods, and how you would monitor curvature during training.' },
        ],
        homework: [
          { id: 'hw-hessians-1', type: 'multiple-choice', prompt: 'The Hessian matrix contains:', options: ['First partial derivatives', 'Second partial derivatives', 'Eigenvalues', 'Gradient vectors'], answer: 'Second partial derivatives', difficulty: 'easy' },
          { id: 'hw-hessians-2', type: 'numeric', prompt: 'For $f(x,y) = x^2 + 4y^2$, the Hessian is $\\begin{bmatrix} 2 & 0 \\\\ 0 & 8 \\end{bmatrix}$. What is the condition number (ratio of largest to smallest eigenvalue)?', answer: 4, tolerance: 0.01, difficulty: 'easy' },
          { id: 'hw-hessians-3', type: 'free-response', prompt: 'Compute the full 2x2 Hessian of $f(x,y) = x^3 + x^2y - y^2$ and evaluate it at the point $(1, 1)$. Determine whether this point is a local min, max, or saddle point.', hint: 'Compute all four second partial derivatives, then check eigenvalues of the resulting matrix.', difficulty: 'medium' },
          { id: 'hw-hessians-4', type: 'free-response', prompt: 'Newton\'s method uses $\\mathbf{x}_{t+1} = \\mathbf{x}_t - \\mathbf{H}^{-1}\\nabla f$. For a neural network with $10^7$ parameters, explain why inverting $\\mathbf{H}$ is impractical. Describe how L-BFGS and the Adam optimizer approximate second-order information without forming the full Hessian.', hint: 'The Hessian is $10^7 \\times 10^7$ — that is $10^{14}$ entries. L-BFGS uses gradient history; Adam uses running second moments.', difficulty: 'hard' },
        ],
      },

      {
        id: 'integration',
        title: 'Integration Basics',
        content: `
<h2>Integration Basics <span class="vi">Cơ bản về Tích phân</span></h2>
<p>Integration <span class="vi">tích phân</span> is the reverse of differentiation <span class="vi">phép lấy đạo hàm</span>. It computes areas, totals, and expected values.</p>

<h3>Indefinite Integral (Antiderivative) <span class="vi">Tích phân bất định (Nguyên hàm)</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\int f(x) \\, dx = F(x) + C \\quad \\text{where } F'(x) = f(x)$$
  <p style="text-align:left; margin-top:0.5rem;"><span class="vi">$F(x)$ là nguyên hàm của $f(x)$, $C$ là hằng số tích phân</span></p>
</div>

<h3>Common Integrals <span class="vi">Các tích phân thường gặp</span></h3>
<table class="example-table">
  <tr><th>$f(x)$</th><th>$\\int f(x) \\, dx$</th></tr>
  <tr><td>$x^n$ ($n \\neq -1$)</td><td>$\\frac{x^{n+1}}{n+1} + C$</td></tr>
  <tr><td>$1/x$</td><td>$\\ln|x| + C$</td></tr>
  <tr><td>$e^x$</td><td>$e^x + C$</td></tr>
  <tr><td>$\\cos x$</td><td>$\\sin x + C$</td></tr>
  <tr><td>$\\sin x$</td><td>$-\\cos x + C$</td></tr>
</table>

<h3>Definite Integral <span class="vi">Tích phân xác định</span></h3>
<div class="concept-box formula">
  <div class="box-label">Fundamental Theorem of Calculus <span class="vi">Định lý cơ bản của giải tích</span></div>
  $$\\int_a^b f(x) \\, dx = F(b) - F(a)$$
  <p style="text-align:left; margin-top:0.5rem;"><span class="vi">Tích phân xác định = diện tích dưới đường cong từ $a$ đến $b$</span></p>
</div>

<h3>Multiple Integrals <span class="vi">Tích phân bội</span></h3>
<div class="concept-box formula">
  <div class="box-label">Double Integral <span class="vi">Tích phân kép</span></div>
  $$\\iint f(x, y) \\, dx \\, dy$$
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Expected value</strong> <span class="vi">kỳ vọng</span>: $\\mathbb{E}[X] = \\int x \\cdot f(x) \\, dx$ — average over continuous distributions <span class="vi">trung bình trên phân phối liên tục</span></li>
    <li><strong>Probability from PDF</strong> <span class="vi">xác suất từ hàm mật độ</span>: $P(a \\leq X \\leq b) = \\int_a^b f(x) \\, dx$</li>
    <li><strong>Normalization</strong> <span class="vi">chuẩn hóa</span>: PDF must satisfy $\\int_{-\\infty}^{\\infty} f(x) \\, dx = 1$</li>
    <li><strong>Marginalization</strong> <span class="vi">lấy biên</span>: $P(x) = \\int P(x, y) \\, dy$ — integrate out unwanted variables <span class="vi">tích phân biến không cần</span></li>
    <li><strong>Bayesian inference</strong> <span class="vi">suy luận Bayes</span>: posterior $\\propto$ likelihood $\\times$ prior, but computing the normalizer requires integration — often intractable <span class="vi">không tính được chính xác</span>, hence MCMC and variational methods <span class="vi">phương pháp biến phân</span></li>
    <li><strong>KL divergence</strong>: $D_{KL} = \\int p(x) \\ln \\frac{p(x)}{q(x)} dx$</li>
  </ul>
</div>

<h3>Gaussian Integral <span class="vi">Tích phân Gauss</span></h3>
<div class="concept-box formula">
  <div class="box-label">Famous Result <span class="vi">Kết quả nổi tiếng</span></div>
  $$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$
  <p style="text-align:left; margin-top:0.5rem;"><span class="vi">Đây là lý do phân phối chuẩn có $\\sqrt{2\\pi}$ trong mẫu số.</span></p>
  <p style="text-align:left;">This is why the Normal distribution has $\\sqrt{2\\pi}$ in the denominator.</p>
</div>
`,
        quiz: [
          { q: '$\\int x^2 \\, dx$ equals:', options: ['$2x + C$', '$x^3/3 + C$', '$x^3 + C$', '$x^2/2 + C$'], answer: 1 },
          { q: 'The probability from a PDF is computed by:', options: ['Evaluating the PDF at a point', 'Integrating the PDF over an interval', 'Differentiating the PDF', 'Taking the maximum of the PDF'], answer: 1 },
          { q: 'Marginalization $P(x) = \\int P(x,y) dy$ is used to:', options: ['Find joint probability', 'Eliminate/integrate out a variable', 'Compute the derivative', 'Normalize probabilities'], answer: 1 },
        ],
        homework: [
          { id: 'hw-integration-1', type: 'numeric', prompt: 'Compute $\\int_0^3 x^2 \\, dx$.', answer: 9, tolerance: 0.01, difficulty: 'easy' },
          { id: 'hw-integration-2', type: 'multiple-choice', prompt: 'The probability $P(a \\leq X \\leq b)$ from a continuous PDF $f(x)$ is computed by:', options: ['$f(a) + f(b)$', '$\\int_a^b f(x) dx$', '$f(b) - f(a)$', '$f((a+b)/2)$'], answer: '$\\int_a^b f(x) dx$', difficulty: 'easy' },
          { id: 'hw-integration-3', type: 'free-response', prompt: 'A PDF must satisfy $\\int_{-\\infty}^{\\infty} f(x) dx = 1$. For the Gaussian $f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-(x-\\mu)^2/(2\\sigma^2)}$, explain the role of the normalizing constant $\\frac{1}{\\sqrt{2\\pi\\sigma^2}}$.', hint: 'Without the constant, the integral of $e^{-(x-\\mu)^2/(2\\sigma^2)}$ equals $\\sqrt{2\\pi\\sigma^2}$.', difficulty: 'medium' },
          { id: 'hw-integration-4', type: 'free-response', prompt: 'In Bayesian inference, the posterior is $P(\\theta|D) = \\frac{P(D|\\theta)P(\\theta)}{\\int P(D|\\theta)P(\\theta) d\\theta}$. The denominator (evidence) requires integration over all possible parameters. Explain why this integral is often intractable and name two approximate methods used in practice.', hint: 'For high-dimensional $\\theta$, the integral has no closed form. Consider MCMC and variational inference.', difficulty: 'hard' },
        ],
      },
      {
        id: 'taylor-series',
        title: 'Taylor Series & Approximation',
        content: `
<h2>Taylor Series & Approximation <span class="vi">Chuỗi Taylor & Phép xấp xỉ</span></h2>
<p>Taylor series let you approximate any smooth function <span class="vi">hàm trơn</span> as a polynomial <span class="vi">đa thức</span>. This is how computers actually compute $e^x$, $\\sin x$, etc.</p>

<h3>Taylor Series <span class="vi">Chuỗi Taylor</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\cdots$$
  <p style="text-align:left; margin-top:0.5rem;">When $a = 0$, it's called a <strong>Maclaurin series</strong> <span class="vi">chuỗi Maclaurin</span>.</p>
</div>

<h3>Key Taylor Expansions <span class="vi">Các khai triển Taylor quan trọng</span></h3>
<table class="example-table">
  <tr><th>Function <span class="vi">Hàm</span></th><th>Expansion <span class="vi">Khai triển</span></th></tr>
  <tr><td>$e^x$</td><td>$1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$</td></tr>
  <tr><td>$\\sin x$</td><td>$x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots$</td></tr>
  <tr><td>$\\cos x$</td><td>$1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots$</td></tr>
  <tr><td>$\\ln(1+x)$</td><td>$x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots$</td></tr>
  <tr><td>$\\frac{1}{1-x}$</td><td>$1 + x + x^2 + x^3 + \\cdots \\quad (|x| < 1)$</td></tr>
</table>

<h3>Linear Approximation <span class="vi">Xấp xỉ tuyến tính</span></h3>
<div class="concept-box formula">
  <div class="box-label">First-Order Taylor <span class="vi">Taylor bậc nhất</span></div>
  $$f(x) \\approx f(a) + f'(a)(x - a)$$
  <p style="text-align:left; margin-top:0.5rem;"><span class="vi">Xấp xỉ hàm bằng tiếp tuyến tại điểm $a$.</span></p>
</div>

<h3>Quadratic Approximation <span class="vi">Xấp xỉ bậc hai</span></h3>
<div class="concept-box formula">
  <div class="box-label">Second-Order Taylor <span class="vi">Taylor bậc hai</span></div>
  $$f(x) \\approx f(a) + f'(a)(x-a) + \\frac{1}{2}f''(a)(x-a)^2$$
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Gradient descent is 1st-order Taylor</strong> <span class="vi">Hạ gradient là Taylor bậc 1</span>: We approximate the loss locally as linear, then step downhill</li>
    <li><strong>Newton's method is 2nd-order Taylor</strong> <span class="vi">Phương pháp Newton là Taylor bậc 2</span>: Uses curvature (Hessian) for better steps — converges faster but expensive</li>
    <li><strong>Log-linearization</strong>: $\\log(1 + x) \\approx x$ for small $x$ — used in many approximations</li>
    <li><strong>Softplus</strong> <span class="vi">hàm softplus</span>: $\\log(1 + e^x)$ is a smooth approximation of ReLU</li>
    <li><strong>XGBoost</strong>: Uses 2nd-order Taylor expansion of the loss for efficient tree splitting</li>
    <li><strong>Natural gradient</strong> <span class="vi">gradient tự nhiên</span>: Uses Fisher information (related to 2nd-order Taylor of KL divergence)</li>
  </ul>
</div>

<h3>Convergence <span class="vi">Sự hội tụ</span></h3>
<div class="concept-box definition">
  <div class="box-label">Key Idea <span class="vi">Ý tưởng chính</span></div>
  <p>More terms = better approximation <span class="vi">nhiều số hạng hơn = xấp xỉ tốt hơn</span>, but only within the <strong>radius of convergence</strong> <span class="vi">bán kính hội tụ</span>.</p>
  <p>For $e^x$: converges everywhere. For $\\ln(1+x)$: only converges for $|x| \\leq 1$.</p>
</div>
`,
        quiz: [
          { q: 'The 1st-order Taylor approximation is a:', options: ['Constant', 'Straight line (tangent)', 'Parabola', 'Cubic'], answer: 1 },
          { q: 'Gradient descent uses which order Taylor approximation of the loss?', options: ['0th order', '1st order', '2nd order', '3rd order'], answer: 1 },
          { q: '$e^x \\approx 1 + x$ is valid when:', options: ['$x$ is large', '$x$ is close to 0', '$x$ is negative', 'Always'], answer: 1 },
        ],
        homework: [
          { id: 'hw-taylor-series-1', type: 'numeric', prompt: 'Using the first-order Taylor approximation $e^x \\approx 1 + x$, estimate $e^{0.1}$. (Exact value is 1.10517...)', answer: 1.1, tolerance: 0.01, difficulty: 'easy' },
          { id: 'hw-taylor-series-2', type: 'multiple-choice', prompt: 'Gradient descent corresponds to which order Taylor approximation of the loss?', options: ['0th order', '1st order', '2nd order', '3rd order'], answer: '1st order', difficulty: 'easy' },
          { id: 'hw-taylor-series-3', type: 'free-response', prompt: 'Write the second-order Taylor expansion of $f(x) = \\ln(1+x)$ around $x = 0$ and use it to approximate $\\ln(1.2)$. Compare with the exact value.', hint: '$f(0) = 0$, $f\'(0) = 1$, $f\'\'(0) = -1$. So $\\ln(1+x) \\approx x - x^2/2$.', difficulty: 'medium' },
          { id: 'hw-taylor-series-4', type: 'free-response', prompt: 'XGBoost uses a second-order Taylor expansion of the loss function: $\\mathcal{L} \\approx \\mathcal{L}_0 + g \\cdot f(x) + \\frac{1}{2} h \\cdot f(x)^2$ where $g$ and $h$ are the first and second derivatives. Explain how this relates to Newton\'s method and why using second-order information leads to better tree splits than using only gradients (as in standard gradient boosting).', hint: 'Newton\'s method uses both gradient and curvature. The optimal step for a quadratic is $-g/h$.', difficulty: 'hard' },
        ],
      }
    ]
  },

  // ===================== PROBABILITY =====================
  {
    id: 'probability',
    title: 'Probability',
    icon: '🎲',
    description: 'Random variables, distributions, and Bayes\' theorem.',
    lessons: [
      {
        id: 'probability-basics',
        title: 'Probability Fundamentals',
        content: `
<h2>Probability Fundamentals <span class="vi">Cơ sở Xác suất</span></h2>
<p>Probability <span class="vi">xác suất</span> quantifies uncertainty <span class="vi">tính bất định</span>. ML models are fundamentally probabilistic — they estimate $P(y | \\mathbf{x})$.</p>

<p>Think of probability as assigning a number to "how likely" something is. A weather forecast saying "70% chance of rain" is probability in action. In ML, every classifier prediction is really a probability — "I am 92% confident this email is spam." Understanding probability is the first step to understanding <em>why</em> models work and when they might fail.</p>

<h3>Basic Rules <span class="vi">Các quy tắc cơ bản</span></h3>
<p>Imagine you have a bag of marbles. Probability follows intuitive rules: no event can be less likely than "impossible" (0) or more likely than "certain" (1), <em>something</em> always happens, and if two events overlap you must avoid double-counting.</p>

<div class="concept-box formula">
  <div class="box-label">Axioms <span class="vi">Tiên đề</span></div>
  $$0 \\leq P(A) \\leq 1$$
  $$P(\\Omega) = 1 \\quad \\text{(something must happen)} \\; \\text{\\small{— }} \\text{\\small{phải có điều gì đó xảy ra}}$$
  $$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A bag has 3 red, 4 blue, and 3 green marbles. What is P(red or blue)?</p>
  <p><strong>Step 1:</strong> P(red) = 3/10, P(blue) = 4/10. These are mutually exclusive, so $P(\\text{red} \\cap \\text{blue}) = 0$.</p>
  <p><strong>Step 2:</strong> $P(\\text{red} \\cup \\text{blue}) = 3/10 + 4/10 - 0 = 7/10$.</p>
  <p><strong>Answer:</strong> $P(\\text{red or blue}) = 0.7$</p>
</div>

<h3>Conditional Probability <span class="vi">Xác suất có điều kiện</span></h3>
<p>Conditional probability answers: "Now that I know B happened, how does that change the likelihood of A?" Think of it like this — if someone tells you it is cloudy, your estimate of rain goes up. That updated estimate is a conditional probability.</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$
  <p style="text-align:left; margin-top:0.5rem;">The probability of A <em>given</em> <span class="vi">khi biết</span> that B has occurred.</p>
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> In a deck of 52 cards, given that the drawn card is a face card (J, Q, K — 12 total), what is P(King)?</p>
  <p><strong>Step 1:</strong> $P(\\text{King} \\cap \\text{face}) = 4/52$ and $P(\\text{face}) = 12/52$.</p>
  <p><strong>Step 2:</strong> $P(\\text{King}|\\text{face}) = \\frac{4/52}{12/52} = \\frac{4}{12} = 1/3$.</p>
  <p><strong>Answer:</strong> $P(\\text{King}|\\text{face card}) \\approx 0.333$</p>
</div>

<h3>Independence <span class="vi">Tính độc lập</span></h3>
<p>Think of independence like flipping two separate coins — the result of one has no effect on the other. In ML, Naive Bayes <em>assumes</em> features are independent given the class, and this "naive" assumption often works surprisingly well.</p>
<p>Events <span class="vi">sự kiện</span> A and B are <strong>independent</strong> <span class="vi">độc lập</span> if $P(A \\cap B) = P(A) \\cdot P(B)$, meaning knowing B tells you nothing about A.</p>

<h3>Law of Total Probability <span class="vi">Công thức xác suất toàn phần</span></h3>
<p>Sometimes you cannot compute a probability directly, but you <em>can</em> break it into cases. Think of it as: "What is the overall chance of rain? It depends on the season — compute each case and combine them."</p>

<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$P(A) = \\sum_{i} P(A|B_i) P(B_i)$$
</div>

<div class="concept-box" style="border-color: var(--green);">
  <div class="box-label" style="color: var(--green);">Worked Example <span class="vi">Ví dụ minh họa</span></div>
  <p><strong>Problem:</strong> A spam filter knows: P("free" | spam) = 0.8, P("free" | not spam) = 0.1, P(spam) = 0.2. What is P("free")?</p>
  <p><strong>Step 1:</strong> Apply total probability: $P(\\text{free}) = P(\\text{free}|\\text{spam})P(\\text{spam}) + P(\\text{free}|\\neg\\text{spam})P(\\neg\\text{spam})$.</p>
  <p><strong>Step 2:</strong> $= 0.8 \\times 0.2 + 0.1 \\times 0.8 = 0.16 + 0.08 = 0.24$.</p>
  <p><strong>Answer:</strong> $P(\\text{"free"}) = 0.24$ — the word appears in 24% of all emails.</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Classification</strong> <span class="vi">Phân loại</span>: Model outputs $P(\\text{class}|\\text{features})$</li>
    <li><strong>Naive Bayes</strong> <span class="vi">Bayes ngây thơ</span>: Assumes feature independence → $P(\\mathbf{x}|y) = \\prod P(x_i|y)$</li>
    <li><strong>Dropout</strong>: Each neuron <span class="vi">nơ-ron</span> is kept with probability $p$ (independence assumption <span class="vi">giả định độc lập</span>)</li>
  </ul>
</div>
`,
        quiz: [
          { q: 'If P(A) = 0.3 and P(B) = 0.4, and A and B are independent, then P(A and B) = ?', options: ['0.7', '0.12', '0.1', '0.3'], answer: 1 },
          { q: 'P(A|B) is always equal to P(B|A).', options: ['True', 'False'], answer: 1 },
          { q: 'A classifier that outputs P(spam|email) uses:', options: ['Marginal probability', 'Joint probability', 'Conditional probability', 'Prior probability'], answer: 2 },
        ],
        bloom: [
          { type: 'choice', level: 0, prompt: 'If P(A) = 0.6, what is P(not A)?', options: ['0.6', '0.4', '1.6', '0'], answer: 1 },
          { type: 'choice', level: 1, prompt: 'Two events are independent if:', options: ['P(A and B) = P(A) + P(B)', 'P(A|B) = P(A)', 'P(A or B) = 0', 'They never occur together'], answer: 1 },
          { type: 'numeric', level: 2, prompt: 'A bag has 3 red and 7 blue balls. You draw 2 without replacement. What is P(both red)? Round to 3 decimals.', correctValue: 0.067, tolerance: 0.002 },
          { type: 'order', level: 3, prompt: 'Order these probability concepts from most basic to most complex:', correctOrder: ['Sample space', 'Event probability', 'Conditional probability', 'Joint probability', 'Bayes\' theorem'] },
          { type: 'explain', level: 4, prompt: 'Explain the difference between P(A|B) and P(B|A) using a real-world example. Why is confusing these dangerous in medical testing?' },
        ],
        homework: [
          { id: 'hw-probability-basics-1', type: 'numeric', prompt: 'If P(A) = 0.4 and P(B) = 0.3 and A, B are independent, compute P(A and B).', answer: 0.12, tolerance: 0.001, difficulty: 'easy' },
          { id: 'hw-probability-basics-2', type: 'numeric', prompt: 'P(A) = 0.5, P(B) = 0.3, P(A and B) = 0.1. Compute P(A or B).', answer: 0.7, tolerance: 0.001, difficulty: 'easy' },
          { id: 'hw-probability-basics-3', type: 'free-response', prompt: 'A spam filter observes that P(word="free" | spam) = 0.8 and P(word="free" | not spam) = 0.1. If 20% of emails are spam, use the law of total probability to compute P(word="free").', hint: '$P(\\text{free}) = P(\\text{free}|\\text{spam})P(\\text{spam}) + P(\\text{free}|\\text{not spam})P(\\text{not spam})$.', difficulty: 'medium' },
          { id: 'hw-probability-basics-4', type: 'free-response', prompt: 'Naive Bayes assumes feature independence: $P(x_1, x_2, ..., x_d | y) = \\prod_{i=1}^d P(x_i | y)$. This assumption is almost always wrong in practice. Explain why Naive Bayes still works well for text classification despite this, and give an example where the independence assumption clearly fails.', hint: 'Think about why the decision boundary might still be reasonable even if probability estimates are miscalibrated.', difficulty: 'hard' },
        ],
      },
      {
        id: 'bayes-theorem',
        title: 'Bayes\' Theorem',
        content: `
<h2>Bayes' Theorem <span class="vi">Định lý Bayes</span></h2>
<p>Bayes' theorem lets you update your beliefs <span class="vi">cập nhật niềm tin</span> when new evidence <span class="vi">bằng chứng</span> arrives. It's the foundation of probabilistic ML.</p>

<div class="concept-box formula">
  <div class="box-label">Bayes' Theorem <span class="vi">Định lý Bayes</span></div>
  $$P(H|E) = \\frac{P(E|H) \\cdot P(H)}{P(E)}$$
</div>

<table class="example-table">
  <tr><th>Term</th><th>Name</th><th>Meaning <span class="vi">Ý nghĩa</span></th></tr>
  <tr><td>$P(H|E)$</td><td>Posterior <span class="vi">Hậu nghiệm</span></td><td>Updated belief after seeing evidence <span class="vi">Niềm tin cập nhật sau khi thấy bằng chứng</span></td></tr>
  <tr><td>$P(E|H)$</td><td>Likelihood <span class="vi">Hợp lý</span></td><td>How likely is the evidence if hypothesis is true <span class="vi">Bằng chứng có khả năng xảy ra thế nào nếu giả thuyết đúng</span></td></tr>
  <tr><td>$P(H)$</td><td>Prior <span class="vi">Tiên nghiệm</span></td><td>Initial belief before evidence <span class="vi">Niềm tin ban đầu trước khi có bằng chứng</span></td></tr>
  <tr><td>$P(E)$</td><td>Evidence <span class="vi">Bằng chứng</span></td><td>Total probability of seeing this evidence <span class="vi">Tổng xác suất quan sát được bằng chứng</span></td></tr>
</table>

<h3>Example: Medical Test <span class="vi">Ví dụ: Xét nghiệm y tế</span></h3>
<p>A disease <span class="vi">bệnh</span> affects 1% of people. A test has 99% sensitivity <span class="vi">độ nhạy</span> and 95% specificity <span class="vi">độ đặc hiệu</span>.</p>
<p>If you test positive <span class="vi">dương tính</span>, what's the probability you have the disease?</p>
<div class="concept-box formula">
  <div class="box-label">Solution <span class="vi">Lời giải</span></div>
  $$P(D|+) = \\frac{P(+|D) \\cdot P(D)}{P(+|D)P(D) + P(+|\\neg D)P(\\neg D)} = \\frac{0.99 \\times 0.01}{0.99 \\times 0.01 + 0.05 \\times 0.99} \\approx 16.7\\%$$
</div>
<p>Only 16.7%! The low base rate <span class="vi">tỷ lệ cơ sở thấp</span> dominates. This is the <strong>base rate fallacy</strong> <span class="vi">ngụy biện tỷ lệ cơ sở</span>.</p>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Naive Bayes classifiers</strong> <span class="vi">bộ phân loại Bayes ngây thơ</span> directly apply Bayes' theorem</li>
    <li><strong>Bayesian neural networks</strong> <span class="vi">mạng nơ-ron Bayes</span> maintain distributions over weights <span class="vi">phân phối trên trọng số</span></li>
    <li><strong>MAP estimation</strong> <span class="vi">ước lượng hậu nghiệm cực đại</span> = finding the most probable parameters given data</li>
    <li><strong>Prior</strong> <span class="vi">tiên nghiệm</span> = regularization <span class="vi">chính quy hóa</span> (L2 regularization = Gaussian prior on weights)</li>
  </ul>
</div>
`,
        interactive: 'bayesViz',
        quiz: [
          { q: 'In Bayes\' theorem, the "prior" represents:', options: ['Evidence', 'Updated belief', 'Initial belief before evidence', 'Likelihood of data'], answer: 2 },
          { q: 'L2 regularization is equivalent to placing what prior on weights?', options: ['Uniform', 'Laplace (L1)', 'Gaussian', 'Beta'], answer: 2 },
          { q: 'The base rate fallacy shows that:', options: ['Bayes theorem is wrong', 'Low base rates make positive tests unreliable', 'Medical tests are useless', 'Priors don\'t matter'], answer: 1 },
        ],
        bloom: [
          { type: 'match', level: 0, prompt: 'Match each Bayes\' theorem component:', pairs: [['P(A|B)', 'Posterior'], ['P(B|A)', 'Likelihood'], ['P(A)', 'Prior'], ['P(B)', 'Evidence']] },
          { type: 'numeric', level: 2, prompt: 'A disease has 1% base rate. A test has 90% sensitivity and 95% specificity. Given a positive test, what is P(disease)? (Enter as decimal, round to 2 places)', correctValue: 0.15, tolerance: 0.02 },
          { type: 'explain', level: 3, prompt: 'Explain why doctors cannot rely on a single positive test result when the disease is rare. Use the concepts of prior, likelihood, and posterior in your explanation.' },
          { type: 'open', level: 5, prompt: 'Design a Bayesian spam filter: describe what the prior would be, what features you would use as evidence, and how the posterior updates as new emails arrive.' },
        ],
        homework: [
          { id: 'hw-bayes-theorem-1', type: 'numeric', prompt: 'A disease affects 2% of people. A test has 95% sensitivity and 90% specificity. If you test positive, what is P(disease | positive)? Round to 2 decimal places.', answer: 0.16, tolerance: 0.02, difficulty: 'medium' },
          { id: 'hw-bayes-theorem-2', type: 'multiple-choice', prompt: 'In Bayes\' theorem, the prior P(H) represents:', options: ['The data likelihood', 'Belief before seeing evidence', 'The posterior probability', 'The evidence probability'], answer: 'Belief before seeing evidence', difficulty: 'easy' },
          { id: 'hw-bayes-theorem-3', type: 'free-response', prompt: 'L2 regularization corresponds to a Gaussian prior on weights. Explain this connection using Bayes\' theorem: start from $P(w|D) \\propto P(D|w) P(w)$, take the log, and show how the Gaussian prior $P(w) \\propto e^{-w^2/(2\\sigma^2)}$ produces the $\\lambda \\|w\\|_2^2$ penalty term.', hint: '$-\\log P(w) = \\frac{w^2}{2\\sigma^2} + \\text{const}$, which becomes the L2 penalty with $\\lambda = 1/\\sigma^2$.', difficulty: 'medium' },
          { id: 'hw-bayes-theorem-4', type: 'free-response', prompt: 'Design a Bayesian A/B test: website version A has 100 visitors with 12 conversions, version B has 100 visitors with 18 conversions. Instead of a frequentist p-value, describe how you would use Beta priors, update with data to get posteriors, and compute P(B is better than A). What advantage does the Bayesian approach offer?', hint: 'Use Beta(1,1) as an uninformative prior. After observing data, the posterior for A is Beta(13, 89) and B is Beta(19, 83).', difficulty: 'hard' },
        ],
      },
      {
        id: 'distributions',
        title: 'Common Distributions',
        content: `
<h2>Common Probability Distributions <span class="vi">Các phân phối xác suất thường gặp</span></h2>
<p>Different types of data follow different distributions <span class="vi">phân phối</span>. Knowing which distribution applies helps you choose the right model and loss function.</p>

<h3>Discrete Distributions <span class="vi">Phân phối rời rạc</span></h3>

<h4>Bernoulli Distribution <span class="vi">Phân phối Bernoulli</span></h4>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$P(X=1) = p, \\quad P(X=0) = 1-p$$
  $$\\mathbb{E}[X] = p, \\quad \\text{Var}(X) = p(1-p)$$
</div>
<p>Single coin flip <span class="vi">một lần tung đồng xu</span>. Binary classification output <span class="vi">đầu ra phân loại nhị phân</span>.</p>

<h4>Binomial Distribution <span class="vi">Phân phối nhị thức</span></h4>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}$$
</div>
<p>Number of successes <span class="vi">số lần thành công</span> in $n$ independent trials <span class="vi">phép thử độc lập</span>.</p>

<h3>Continuous Distributions <span class="vi">Phân phối liên tục</span></h3>

<h4>Normal (Gaussian) Distribution <span class="vi">Phân phối chuẩn (Gauss)</span></h4>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)$$
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context — The Gaussian is Everywhere <span class="vi">Phân phối Gauss có mặt khắp nơi</span></div>
  <ul>
    <li><strong>Weight initialization</strong> <span class="vi">Khởi tạo trọng số</span>: $W \\sim \\mathcal{N}(0, \\sigma^2)$</li>
    <li><strong>Batch normalization</strong> <span class="vi">Chuẩn hóa theo lô</span>: Normalizes to $\\mathcal{N}(0, 1)$</li>
    <li><strong>VAE</strong> <span class="vi">Bộ tự mã hóa biến phân</span>: Latent space <span class="vi">không gian ẩn</span> follows $\\mathcal{N}(0, I)$</li>
    <li><strong>MSE loss</strong> <span class="vi">Hàm mất mát bình phương trung bình</span>: Assumes Gaussian noise <span class="vi">nhiễu Gauss</span> on targets</li>
    <li><strong>Gaussian Processes</strong> <span class="vi">Quá trình Gauss</span>: Prior over functions <span class="vi">tiên nghiệm trên không gian hàm</span></li>
  </ul>
</div>

<h4>Uniform Distribution <span class="vi">Phân phối đều</span></h4>
<p>$f(x) = \\frac{1}{b-a}$ for $x \\in [a, b]$. Used for random initialization <span class="vi">khởi tạo ngẫu nhiên</span>, data augmentation <span class="vi">tăng cường dữ liệu</span> parameters.</p>

<h4>Softmax Distribution (Categorical) <span class="vi">Phân phối Softmax (Phân loại)</span></h4>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$P(y=k) = \\frac{e^{z_k}}{\\sum_{j=1}^{K} e^{z_j}}$$
</div>
<p>Converts logits to probabilities <span class="vi">chuyển logit thành xác suất</span>. Used in the output layer <span class="vi">lớp đầu ra</span> of every classification network.</p>
`,
        interactive: 'distributionPlot',
        quiz: [
          { q: 'The output of a binary classifier follows which distribution?', options: ['Normal', 'Bernoulli', 'Poisson', 'Uniform'], answer: 1 },
          { q: 'Assuming Gaussian noise on targets leads to which loss function?', options: ['Cross-entropy', 'Hinge loss', 'Mean Squared Error', 'KL divergence'], answer: 2 },
          { q: 'Softmax converts logits to:', options: ['Binary values', 'Probabilities summing to 1', 'Negative values', 'Integers'], answer: 1 },
        ],
        homework: [
          { id: 'hw-distributions-1', type: 'numeric', prompt: 'A Bernoulli random variable with $p = 0.7$. What is its variance? ($\\text{Var} = p(1-p)$)', answer: 0.21, tolerance: 0.001, difficulty: 'easy' },
          { id: 'hw-distributions-2', type: 'multiple-choice', prompt: 'Assuming Gaussian noise on targets leads to which loss function?', options: ['Cross-entropy', 'Hinge loss', 'Mean Squared Error', 'KL divergence'], answer: 'Mean Squared Error', difficulty: 'easy' },
          { id: 'hw-distributions-3', type: 'free-response', prompt: 'Compute the softmax probabilities for logits $z = [2, 1, 0]$. Show all steps and verify they sum to 1.', hint: 'Compute $e^2, e^1, e^0$, sum them, then divide each by the sum.', difficulty: 'medium' },
          { id: 'hw-distributions-4', type: 'free-response', prompt: 'In a VAE, the latent space prior is $\\mathbf{z} \\sim \\mathcal{N}(0, I)$ and the encoder outputs $q(\\mathbf{z}|\\mathbf{x}) = \\mathcal{N}(\\mu(x), \\sigma^2(x))$. The KL divergence between these is added to the loss. Explain intuitively why this regularization term is needed and what would happen without it.', hint: 'Without the KL term, the encoder could map different inputs to very different, separated regions in latent space, destroying the smooth structure needed for generation.', difficulty: 'hard' },
        ],
      },
      {
        id: 'expectation-variance',
        title: 'Expectation & Variance',
        content: `
<h2>Expectation & Variance <span class="vi">Kỳ vọng & Phương sai</span></h2>

<h3>Expected Value (Mean) <span class="vi">Giá trị kỳ vọng (Trung bình)</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\mathbb{E}[X] = \\sum_x x \\cdot P(X=x) \\quad \\text{(discrete / rời rạc)}$$
  $$\\mathbb{E}[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x) \\, dx \\quad \\text{(continuous / liên tục)}$$
</div>

<h3>Properties of Expectation <span class="vi">Tính chất của kỳ vọng</span></h3>
<ul>
  <li>$\\mathbb{E}[aX + b] = a\\mathbb{E}[X] + b$ — linearity <span class="vi">tính tuyến tính</span></li>
  <li>$\\mathbb{E}[X + Y] = \\mathbb{E}[X] + \\mathbb{E}[Y]$ — always true <span class="vi">luôn đúng</span></li>
  <li>$\\mathbb{E}[XY] = \\mathbb{E}[X]\\mathbb{E}[Y]$ only if X, Y are independent <span class="vi">chỉ khi X, Y độc lập</span></li>
</ul>

<h3>Variance <span class="vi">Phương sai</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\text{Var}(X) = \\mathbb{E}[(X - \\mu)^2] = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$$
  $$\\text{Std}(X) = \\sigma = \\sqrt{\\text{Var}(X)} \\quad \\text{\\small{— }} \\text{\\small{Độ lệch chuẩn}}$$
</div>

<h3>Covariance & Correlation <span class="vi">Hiệp phương sai & Tương quan</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\text{Cov}(X, Y) = \\mathbb{E}[(X - \\mu_X)(Y - \\mu_Y)] = \\mathbb{E}[XY] - \\mathbb{E}[X]\\mathbb{E}[Y]$$
  $$\\text{Corr}(X, Y) = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y} \\in [-1, 1] \\quad \\text{\\small{— Hệ số tương quan}}$$
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Loss functions</strong> <span class="vi">hàm mất mát</span> are expected values: $\\mathcal{L} = \\mathbb{E}_{(x,y) \\sim D}[\\ell(f(x), y)]$</li>
    <li><strong>Variance</strong> <span class="vi">phương sai</span> relates to model stability — high variance = overfitting <span class="vi">quá khớp</span></li>
    <li><strong>Covariance matrix</strong> <span class="vi">ma trận hiệp phương sai</span> is central to PCA, Gaussian distributions, and Mahalanobis distance <span class="vi">khoảng cách Mahalanobis</span></li>
    <li><strong>Batch normalization</strong> <span class="vi">chuẩn hóa theo lô</span> computes running mean <span class="vi">trung bình trượt</span> and variance to normalize activations <span class="vi">giá trị kích hoạt</span></li>
  </ul>
</div>
`,
        quiz: [
          { q: '$\\mathbb{E}[3X + 5]$ where $\\mathbb{E}[X] = 2$ equals:', options: ['11', '6', '8', '13'], answer: 0 },
          { q: 'Var(X) = 0 means:', options: ['X is always negative', 'X is always the same value', 'X has zero mean', 'X is normally distributed'], answer: 1 },
          { q: 'The covariance matrix is used in:', options: ['Only regression', 'PCA and Gaussian distributions', 'Only neural networks', 'Only classification'], answer: 1 },
        ],
        homework: [
          { id: 'hw-expectation-variance-1', type: 'numeric', prompt: 'If $\\mathbb{E}[X] = 5$, compute $\\mathbb{E}[3X - 2]$.', answer: 13, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-expectation-variance-2', type: 'numeric', prompt: 'If $\\text{Var}(X) = 4$, compute $\\text{Var}(3X + 2)$. (Recall: $\\text{Var}(aX + b) = a^2 \\text{Var}(X)$)', answer: 36, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-expectation-variance-3', type: 'free-response', prompt: 'Prove that $\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$ starting from the definition $\\text{Var}(X) = \\mathbb{E}[(X - \\mu)^2]$.', hint: 'Expand $(X - \\mu)^2 = X^2 - 2\\mu X + \\mu^2$ and use linearity of expectation.', difficulty: 'medium' },
          { id: 'hw-expectation-variance-4', type: 'free-response', prompt: 'In batch normalization, activations are normalized using the batch mean $\\mu_B$ and variance $\\sigma_B^2$. Explain why this stabilizes training (relate to the covariance shift problem), and discuss what happens at test time when there is no batch to compute statistics from.', hint: 'During training, running averages of mean and variance are maintained. At test time, these running statistics are used instead of batch statistics.', difficulty: 'hard' },
        ],
      },
      {
        id: 'multivariate-gaussian',
        title: 'Multivariate Gaussian & Covariance',
        content: `
<h2>Multivariate Gaussian & Covariance <span class="vi">Phân phối Gauss đa biến & Hiệp phương sai</span></h2>
<p>The multivariate Gaussian <span class="vi">phân phối Gauss đa biến</span> (multivariate normal) is the most important distribution in ML. It generalizes the familiar bell curve <span class="vi">đường cong hình chuông</span> to multiple dimensions.</p>

<h3>The PDF Formula <span class="vi">Công thức hàm mật độ</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  <p>For a random vector $\\mathbf{x} \\in \\mathbb{R}^d$ with mean vector <span class="vi">vectơ trung bình</span> $\\boldsymbol{\\mu}$ and covariance matrix <span class="vi">ma trận hiệp phương sai</span> $\\boldsymbol{\\Sigma}$:</p>
  $$p(\\mathbf{x}) = \\frac{1}{(2\\pi)^{d/2} |\\boldsymbol{\\Sigma}|^{1/2}} \\exp\\!\\left( -\\frac{1}{2} (\\mathbf{x} - \\boldsymbol{\\mu})^T \\boldsymbol{\\Sigma}^{-1} (\\mathbf{x} - \\boldsymbol{\\mu}) \\right)$$
  <p>Written as $\\mathbf{x} \\sim \\mathcal{N}(\\boldsymbol{\\mu}, \\boldsymbol{\\Sigma})$. <span class="vi">Ký hiệu: $\\mathbf{x}$ tuân theo phân phối chuẩn với trung bình $\\boldsymbol{\\mu}$ và hiệp phương sai $\\boldsymbol{\\Sigma}$.</span></p>
</div>

<h3>Key Components <span class="vi">Các thành phần chính</span></h3>
<div class="concept-box definition">
  <div class="box-label">Parameters <span class="vi">Tham số</span></div>
  <ul>
    <li><strong>Mean vector</strong> <span class="vi">Vectơ trung bình</span> $\\boldsymbol{\\mu} \\in \\mathbb{R}^d$: the center of the distribution <span class="vi">tâm của phân phối</span></li>
    <li><strong>Covariance matrix</strong> <span class="vi">Ma trận hiệp phương sai</span> $\\boldsymbol{\\Sigma} \\in \\mathbb{R}^{d \\times d}$: must be symmetric positive semi-definite <span class="vi">đối xứng nửa xác định dương</span>. Encodes variance along each axis and correlations between dimensions.</li>
    <li><strong>$|\\boldsymbol{\\Sigma}|$</strong>: determinant <span class="vi">định thức</span> of $\\boldsymbol{\\Sigma}$ — controls the "volume" of the distribution <span class="vi">thể tích của phân phối</span></li>
    <li><strong>$\\boldsymbol{\\Sigma}^{-1}$</strong>: precision matrix <span class="vi">ma trận chính xác</span> — the inverse of the covariance matrix</li>
  </ul>
</div>

<h3>Geometric Interpretation <span class="vi">Giải thích hình học</span></h3>
<p>The contours <span class="vi">đường đồng mức</span> of a multivariate Gaussian are <strong>ellipsoids</strong> <span class="vi">ellipsoid</span>. The shape of these ellipsoids is determined by $\\boldsymbol{\\Sigma}$:</p>
<ul>
  <li>If $\\boldsymbol{\\Sigma} = \\sigma^2 \\mathbf{I}$ (diagonal, equal variances) → contours are <strong>circles/spheres</strong> <span class="vi">hình tròn/hình cầu</span></li>
  <li>If $\\boldsymbol{\\Sigma}$ is diagonal (unequal variances) → contours are <strong>axis-aligned ellipses</strong> <span class="vi">elip theo trục</span></li>
  <li>If $\\boldsymbol{\\Sigma}$ has off-diagonal entries → contours are <strong>rotated ellipses</strong> <span class="vi">elip xoay</span> (correlated features)</li>
</ul>
<p>The eigenvectors <span class="vi">vectơ riêng</span> of $\\boldsymbol{\\Sigma}$ give the directions of the ellipsoid axes, and the eigenvalues <span class="vi">trị riêng</span> give the squared lengths of those axes.</p>

<h3>Mahalanobis Distance <span class="vi">Khoảng cách Mahalanobis</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$D_M(\\mathbf{x}) = \\sqrt{(\\mathbf{x} - \\boldsymbol{\\mu})^T \\boldsymbol{\\Sigma}^{-1} (\\mathbf{x} - \\boldsymbol{\\mu})}$$
  <p>This is the term inside the exponent of the Gaussian PDF. It measures how many "standard deviations" <span class="vi">độ lệch chuẩn</span> a point is from the mean, accounting for correlations <span class="vi">có tính đến tương quan</span>.</p>
</div>

<div class="concept-box warning">
  <div class="box-label">Key Insight <span class="vi">Điểm mấu chốt</span></div>
  <p>Mahalanobis distance reduces to Euclidean distance <span class="vi">khoảng cách Euclid</span> when $\\boldsymbol{\\Sigma} = \\mathbf{I}$. It "stretches" space so that the ellipsoidal contours become spherical — normalizing for correlations and different scales <span class="vi">chuẩn hóa cho tương quan và tỉ lệ khác nhau</span>.</p>
</div>

<h3>Marginal & Conditional Distributions <span class="vi">Phân phối biên & Phân phối có điều kiện</span></h3>
<div class="concept-box definition">
  <div class="box-label">Properties <span class="vi">Tính chất</span></div>
  <p>If $\\begin{bmatrix} \\mathbf{x}_1 \\\\ \\mathbf{x}_2 \\end{bmatrix} \\sim \\mathcal{N}\\!\\left( \\begin{bmatrix} \\boldsymbol{\\mu}_1 \\\\ \\boldsymbol{\\mu}_2 \\end{bmatrix}, \\begin{bmatrix} \\boldsymbol{\\Sigma}_{11} & \\boldsymbol{\\Sigma}_{12} \\\\ \\boldsymbol{\\Sigma}_{21} & \\boldsymbol{\\Sigma}_{22} \\end{bmatrix} \\right)$, then:</p>
  <ul>
    <li><strong>Marginal</strong> <span class="vi">Biên</span>: $\\mathbf{x}_1 \\sim \\mathcal{N}(\\boldsymbol{\\mu}_1, \\boldsymbol{\\Sigma}_{11})$ — just drop the other variables <span class="vi">chỉ cần bỏ các biến còn lại</span></li>
    <li><strong>Conditional</strong> <span class="vi">Có điều kiện</span>: $\\mathbf{x}_1 | \\mathbf{x}_2 \\sim \\mathcal{N}(\\boldsymbol{\\mu}_{1|2}, \\boldsymbol{\\Sigma}_{1|2})$ where:
      $$\\boldsymbol{\\mu}_{1|2} = \\boldsymbol{\\mu}_1 + \\boldsymbol{\\Sigma}_{12}\\boldsymbol{\\Sigma}_{22}^{-1}(\\mathbf{x}_2 - \\boldsymbol{\\mu}_2)$$
      $$\\boldsymbol{\\Sigma}_{1|2} = \\boldsymbol{\\Sigma}_{11} - \\boldsymbol{\\Sigma}_{12}\\boldsymbol{\\Sigma}_{22}^{-1}\\boldsymbol{\\Sigma}_{21}$$
    </li>
  </ul>
  <p><span class="vi">Cả phân phối biên và phân phối có điều kiện đều là Gauss — đây là tính chất "đóng" quan trọng.</span></p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Gaussian Naive Bayes</strong> <span class="vi">Naive Bayes Gauss</span>: Assumes each feature follows a Gaussian given the class label. Uses diagonal $\\boldsymbol{\\Sigma}$ (independence assumption <span class="vi">giả định độc lập</span>).</li>
    <li><strong>Gaussian Mixture Models (GMMs)</strong> <span class="vi">Mô hình hỗn hợp Gauss</span>: Models data as a weighted sum of $K$ multivariate Gaussians: $p(\\mathbf{x}) = \\sum_{k=1}^K \\pi_k \\mathcal{N}(\\mathbf{x} | \\boldsymbol{\\mu}_k, \\boldsymbol{\\Sigma}_k)$. Used for clustering <span class="vi">phân cụm</span> and density estimation <span class="vi">ước lượng mật độ</span>.</li>
    <li><strong>VAE Latent Space</strong> <span class="vi">Không gian ẩn VAE</span>: Variational Autoencoders assume $\\mathbf{z} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})$ as the prior, and learn $q(\\mathbf{z}|\\mathbf{x}) = \\mathcal{N}(\\boldsymbol{\\mu}(\\mathbf{x}), \\text{diag}(\\boldsymbol{\\sigma}^2(\\mathbf{x})))$ as the encoder.</li>
    <li><strong>Gaussian Processes (GPs)</strong> <span class="vi">Quá trình Gauss</span>: Define distributions over functions using multivariate Gaussians. Predictions use the conditional distribution formula above.</li>
    <li><strong>LDA/QDA Classifiers</strong> <span class="vi">Bộ phân loại LDA/QDA</span>: Linear Discriminant Analysis <span class="vi">Phân tích biệt thức tuyến tính</span> assumes all classes share the same $\\boldsymbol{\\Sigma}$. Quadratic Discriminant Analysis <span class="vi">Phân tích biệt thức bậc hai</span> allows each class its own $\\boldsymbol{\\Sigma}_k$.</li>
  </ul>
</div>
`,
        quiz: [
          { q: 'The covariance matrix $\\boldsymbol{\\Sigma}$ in a multivariate Gaussian must be:', options: ['Diagonal', 'Symmetric positive semi-definite', 'Orthogonal', 'Upper triangular'], answer: 1 },
          { q: 'When $\\boldsymbol{\\Sigma} = \\sigma^2 \\mathbf{I}$, the contours of the Gaussian are:', options: ['Rotated ellipses', 'Axis-aligned ellipses', 'Circles/spheres', 'Rectangles'], answer: 2 },
          { q: 'Mahalanobis distance accounts for:', options: ['Only the mean', 'Correlations and different scales', 'Only the variance', 'The number of data points'], answer: 1 },
        ],
        bloom: [
          { type: 'choice', level: 0, prompt: 'In $\\mathbf{x} \\sim \\mathcal{N}(\\boldsymbol{\\mu}, \\boldsymbol{\\Sigma})$, $\\boldsymbol{\\mu}$ represents:', options: ['The covariance matrix', 'The precision matrix', 'The mean vector (center of the distribution)', 'The eigenvalues'], answer: 2 },
          { type: 'match', level: 1, prompt: 'Match each ML model to how it uses the multivariate Gaussian:', pairs: [['Gaussian Naive Bayes', 'Diagonal covariance (independent features)'], ['GMM', 'Mixture of K Gaussians for clustering'], ['VAE', 'Gaussian prior on latent space'], ['Gaussian Process', 'Conditional distribution for predictions']] },
          { type: 'numeric', level: 2, prompt: 'A 2D Gaussian has $\\boldsymbol{\\Sigma} = \\begin{bmatrix} 4 & 0 \\\\ 0 & 9 \\end{bmatrix}$. What is $|\\boldsymbol{\\Sigma}|$ (the determinant)?', correctValue: 36, tolerance: 0 },
          { type: 'order', level: 3, prompt: 'Order these steps for computing Mahalanobis distance from a point x to a distribution:', correctOrder: ['Compute the difference vector (x - \u03bc)', 'Compute the inverse covariance \u03a3\u207b\u00b9', 'Multiply: (x - \u03bc)\u1d40 \u03a3\u207b\u00b9 (x - \u03bc)', 'Take the square root of the result'] },
          { type: 'explain', level: 4, prompt: 'Explain why LDA (Linear Discriminant Analysis) produces linear decision boundaries while QDA (Quadratic Discriminant Analysis) produces quadratic ones. How does the shared vs. per-class covariance matrix assumption lead to this difference?' },
          { type: 'open', level: 5, prompt: 'Design a Gaussian Mixture Model system for anomaly detection. Describe how you would: (1) fit the GMM to normal data, (2) use the learned density to score new points, and (3) set a threshold for anomalies. Explain which parameters of the multivariate Gaussians matter most for this task.' },
        ],
        homework: [
          { id: 'hw-multivariate-gaussian-1', type: 'numeric', prompt: 'A 2D Gaussian has $\\boldsymbol{\\Sigma} = \\begin{bmatrix} 9 & 0 \\\\ 0 & 4 \\end{bmatrix}$. What is $|\\boldsymbol{\\Sigma}|$?', answer: 36, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-multivariate-gaussian-2', type: 'multiple-choice', prompt: 'When $\\Sigma = \\sigma^2 I$ (isotropic), the Gaussian contours are:', options: ['Ellipses', 'Circles/spheres', 'Rectangles', 'Lines'], answer: 'Circles/spheres', difficulty: 'easy' },
          { id: 'hw-multivariate-gaussian-3', type: 'free-response', prompt: 'The Mahalanobis distance is $D_M = \\sqrt{(\\mathbf{x}-\\boldsymbol{\\mu})^T \\boldsymbol{\\Sigma}^{-1} (\\mathbf{x}-\\boldsymbol{\\mu})}$. For $\\boldsymbol{\\Sigma} = I$ (identity), show that Mahalanobis distance reduces to Euclidean distance.', hint: 'When $\\Sigma = I$, $\\Sigma^{-1} = I$, and $\\mathbf{x}^T I \\mathbf{x} = \\|\\mathbf{x}\\|^2$.', difficulty: 'medium' },
          { id: 'hw-multivariate-gaussian-4', type: 'free-response', prompt: 'In a Gaussian Mixture Model with $K=3$ components in $d=10$ dimensions, compute the total number of parameters. Each component has: a mixing weight $\\pi_k$, a mean vector $\\mu_k$, and a full covariance matrix $\\Sigma_k$. Then explain why diagonal covariance matrices are sometimes preferred.', hint: 'Full covariance has $d(d+1)/2$ unique entries (symmetric). Also account for the constraint $\\sum \\pi_k = 1$.', difficulty: 'hard' },
          { id: 'hw-multivariate-gaussian-5', type: 'free-response', prompt: 'Gaussian Processes use the conditional distribution of multivariate Gaussians for prediction. Given training points $(X, y)$ and test point $x^*$, the predictive mean involves $\\Sigma_{*,X} \\Sigma_{X,X}^{-1} y$. Explain what each matrix represents and why inverting $\\Sigma_{X,X}$ becomes the computational bottleneck.', hint: '$\\Sigma_{X,X}$ is $n \\times n$ where $n$ = training points. Inversion is $O(n^3)$.', difficulty: 'hard' },
        ],
      }
    ]
  },

  // ===================== STATISTICS =====================
  {
    id: 'statistics',
    title: 'Statistics',
    icon: '📊',
    description: 'Hypothesis testing, estimation, and the bias-variance tradeoff.',
    lessons: [
      {
        id: 'descriptive-stats',
        title: 'Descriptive Statistics',
        content: `
<h2>Descriptive Statistics <span class="vi">Thống kê mô tả</span></h2>
<p>Before building any model, you need to understand your data. Descriptive statistics <span class="vi">thống kê mô tả</span> summarize the key characteristics.</p>

<h3>Measures of Central Tendency <span class="vi">Các độ đo xu hướng trung tâm</span></h3>
<table class="example-table">
  <tr><th>Measure <span class="vi">Độ đo</span></th><th>Formula <span class="vi">Công thức</span></th><th>When to Use <span class="vi">Khi nào dùng</span></th></tr>
  <tr><td><strong>Mean</strong> <span class="vi">Trung bình</span></td><td>$\\bar{x} = \\frac{1}{n}\\sum x_i$</td><td>Symmetric data <span class="vi">dữ liệu đối xứng</span>, no outliers <span class="vi">không có giá trị ngoại lai</span></td></tr>
  <tr><td><strong>Median</strong> <span class="vi">Trung vị</span></td><td>Middle value when sorted</td><td>Skewed data <span class="vi">dữ liệu lệch</span>, robust to outliers</td></tr>
  <tr><td><strong>Mode</strong> <span class="vi">Yếu vị</span></td><td>Most frequent value <span class="vi">giá trị xuất hiện nhiều nhất</span></td><td>Categorical data <span class="vi">dữ liệu phân loại</span></td></tr>
</table>

<h3>Measures of Spread <span class="vi">Các độ đo độ phân tán</span></h3>
<table class="example-table">
  <tr><th>Measure <span class="vi">Độ đo</span></th><th>Formula <span class="vi">Công thức</span></th></tr>
  <tr><td><strong>Variance</strong> <span class="vi">Phương sai</span></td><td>$s^2 = \\frac{1}{n-1}\\sum(x_i - \\bar{x})^2$</td></tr>
  <tr><td><strong>Standard Deviation</strong> <span class="vi">Độ lệch chuẩn</span></td><td>$s = \\sqrt{s^2}$</td></tr>
  <tr><td><strong>IQR</strong> <span class="vi">Khoảng tứ phân vị</span></td><td>$Q_3 - Q_1$ (robust to outliers <span class="vi">bền với ngoại lai</span>)</td></tr>
</table>

<p>Note: We divide by $n-1$ (Bessel's correction <span class="vi">hiệu chỉnh Bessel</span>) for sample variance <span class="vi">phương sai mẫu</span> to get an <strong>unbiased estimate</strong> <span class="vi">ước lượng không chệch</span>.</p>

<h3>Feature Scaling <span class="vi">Co giãn đặc trưng</span></h3>
<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p>Most ML algorithms require scaled features <span class="vi">đặc trưng đã được co giãn</span>:</p>
  <p><strong>Standardization (Z-score)</strong> <span class="vi">Chuẩn hóa</span>: $z = \\frac{x - \\mu}{\\sigma}$ → mean=0, std=1</p>
  <p><strong>Min-Max Scaling</strong> <span class="vi">Co giãn Min-Max</span>: $x' = \\frac{x - x_{min}}{x_{max} - x_{min}}$ → range [0, 1]</p>
  <p>Gradient descent <span class="vi">hạ gradient</span> converges much faster <span class="vi">hội tụ nhanh hơn</span> with scaled features. SVM, KNN, and PCA are very sensitive to feature scales.</p>
</div>
`,
        quiz: [
          { q: 'Income data is highly skewed. Which measure of center is most appropriate?', options: ['Mean', 'Median', 'Mode', 'Variance'], answer: 1 },
          { q: 'Sample variance divides by n-1 instead of n because:', options: ['It\'s simpler', 'It gives an unbiased estimate', 'It makes the result smaller', 'It\'s a convention'], answer: 1 },
          { q: 'Z-score standardization transforms data to have:', options: ['Range [0,1]', 'Mean=0, Std=1', 'Mean=1, Std=0', 'All positive values'], answer: 1 },
        ],
        homework: [
          { id: 'hw-descriptive-stats-1', type: 'multiple-choice', prompt: 'For highly skewed income data, which measure of center is most robust?', options: ['Mean', 'Median', 'Mode', 'Variance'], answer: 'Median', difficulty: 'easy' },
          { id: 'hw-descriptive-stats-2', type: 'numeric', prompt: 'Compute the sample variance of $\\{2, 4, 4, 4, 5, 5, 7, 9\\}$. The mean is 5. Use $n-1$ in the denominator.', answer: 4, tolerance: 0.1, difficulty: 'medium' },
          { id: 'hw-descriptive-stats-3', type: 'free-response', prompt: 'Explain why Z-score standardization ($z = (x - \\mu)/\\sigma$) is important before running K-Nearest Neighbors. What happens if one feature ranges from 0 to 1 and another from 0 to 1,000,000?', hint: 'KNN uses distance metrics. Features with larger scales dominate the distance calculation.', difficulty: 'medium' },
          { id: 'hw-descriptive-stats-4', type: 'free-response', prompt: 'You are given a dataset with features: age (20-80), salary (\\$30k-\\$500k), and years of experience (0-40). Describe a complete preprocessing pipeline including: handling outliers (using IQR), choosing between standardization vs. min-max scaling for different ML algorithms, and justifying your choices.', hint: 'Tree-based models are scale-invariant; SVMs and neural networks need scaling. IQR method flags points beyond $Q_1 - 1.5 \\cdot IQR$ or $Q_3 + 1.5 \\cdot IQR$.', difficulty: 'hard' },
        ],
      },
      {
        id: 'mle',
        title: 'Maximum Likelihood Estimation',
        content: `
<h2>Maximum Likelihood Estimation (MLE) <span class="vi">Ước lượng hợp lý cực đại</span></h2>
<p>MLE answers: "What parameters <span class="vi">tham số</span> make my observed data <span class="vi">dữ liệu quan sát</span> most probable <span class="vi">có khả năng nhất</span>?"</p>

<h3>The Idea <span class="vi">Ý tưởng</span></h3>
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>Given data $\\mathbf{x}_1, \\ldots, \\mathbf{x}_n$ and a model with parameters $\\theta$, MLE finds:</p>
  $$\\hat{\\theta}_{MLE} = \\arg\\max_\\theta \\; P(\\text{data} | \\theta) = \\arg\\max_\\theta \\prod_{i=1}^n P(\\mathbf{x}_i | \\theta)$$
</div>

<h3>Log-Likelihood <span class="vi">Log hợp lý</span></h3>
<p>Products are numerically unstable <span class="vi">không ổn định số học</span>, so we take the log (which preserves the argmax):</p>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\hat{\\theta}_{MLE} = \\arg\\max_\\theta \\sum_{i=1}^n \\log P(\\mathbf{x}_i | \\theta)$$
</div>

<h3>Example: Gaussian MLE <span class="vi">Ví dụ: MLE cho phân phối Gauss</span></h3>
<p>For data from $\\mathcal{N}(\\mu, \\sigma^2)$:</p>
<ul>
  <li>$\\hat{\\mu}_{MLE} = \\bar{x}$ — sample mean <span class="vi">trung bình mẫu</span></li>
  <li>$\\hat{\\sigma}^2_{MLE} = \\frac{1}{n}\\sum(x_i - \\bar{x})^2$ — sample variance <span class="vi">phương sai mẫu</span> with $n$, not $n-1$</li>
</ul>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Cross-entropy loss</strong> <span class="vi">hàm mất mát entropy chéo</span> = negative log-likelihood <span class="vi">âm log hợp lý</span> for classification</li>
    <li><strong>MSE loss</strong> <span class="vi">hàm mất mát MSE</span> = MLE under Gaussian noise assumption <span class="vi">giả định nhiễu Gauss</span></li>
    <li>Almost every loss function <span class="vi">hàm mất mát</span> in ML is derived from MLE!</li>
    <li><strong>MAP (Maximum A Posteriori)</strong> <span class="vi">Hậu nghiệm cực đại</span> = MLE + prior = MLE + regularization <span class="vi">chính quy hóa</span></li>
  </ul>
</div>

<div class="concept-box formula">
  <div class="box-label">MLE → Loss Function Connection <span class="vi">Liên hệ MLE → Hàm mất mát</span></div>
  $$\\text{Minimize } \\mathcal{L} = -\\frac{1}{n} \\sum_{i=1}^n \\log P(y_i | \\mathbf{x}_i; \\theta)$$
</div>
`,
        quiz: [
          { q: 'MLE finds parameters that:', options: ['Minimize the data', 'Maximize the probability of observed data', 'Maximize the prior', 'Minimize the posterior'], answer: 1 },
          { q: 'Cross-entropy loss is the negative:', options: ['Variance', 'Mean', 'Log-likelihood', 'Prior'], answer: 2 },
          { q: 'MAP estimation differs from MLE by adding:', options: ['More data', 'A prior (regularization)', 'More parameters', 'Cross-validation'], answer: 1 },
        ],
        bloom: [
          { type: 'choice', level: 0, prompt: 'MLE stands for:', options: ['Maximum Likelihood Estimation', 'Minimum Loss Expectation', 'Mean Linear Estimate', 'Maximum Log Error'], answer: 0 },
          { type: 'match', level: 1, prompt: 'Match each concept to its definition:', pairs: [['Likelihood', 'P(data | parameters)'], ['Prior', 'P(parameters) before seeing data'], ['Posterior', 'P(parameters | data)'], ['MLE', 'argmax P(data | params)']] },
          { type: 'explain', level: 3, prompt: 'Explain why maximizing log-likelihood is equivalent to minimizing cross-entropy loss in classification. What is the mathematical connection?' },
          { type: 'open', level: 5, prompt: 'Given a dataset of coin flips: H, H, T, H, H, T, H, H, H, T — derive the MLE estimate for the probability of heads. Then propose a Bayesian (MAP) approach with a Beta prior and explain how it differs.' },
        ],
        homework: [
          { id: 'hw-mle-1', type: 'multiple-choice', prompt: 'MLE finds parameters that:', options: ['Minimize the data', 'Maximize P(data | parameters)', 'Maximize the prior', 'Minimize the posterior'], answer: 'Maximize P(data | parameters)', difficulty: 'easy' },
          { id: 'hw-mle-2', type: 'numeric', prompt: 'You flip a coin 100 times and get 70 heads. The MLE estimate for $p$ (probability of heads) is:', answer: 0.7, tolerance: 0.001, difficulty: 'easy' },
          { id: 'hw-mle-3', type: 'free-response', prompt: 'For data from a Gaussian $\\mathcal{N}(\\mu, \\sigma^2)$, derive the MLE for $\\mu$. Start from the log-likelihood $\\ell(\\mu) = -\\frac{n}{2}\\ln(2\\pi\\sigma^2) - \\frac{1}{2\\sigma^2}\\sum(x_i - \\mu)^2$, take the derivative with respect to $\\mu$, and set it to zero.', hint: 'The derivative of $\\sum(x_i - \\mu)^2$ with respect to $\\mu$ is $-2\\sum(x_i - \\mu)$.', difficulty: 'medium' },
          { id: 'hw-mle-4', type: 'free-response', prompt: 'Show that minimizing the cross-entropy loss $-\\frac{1}{n}\\sum y_i \\log \\hat{y}_i + (1-y_i)\\log(1-\\hat{y}_i)$ is equivalent to maximizing the log-likelihood under a Bernoulli model. Explain why this connection means that most ML loss functions have a probabilistic interpretation.', hint: 'If $y_i \\sim \\text{Bernoulli}(\\hat{y}_i)$, then $P(y_i | \\hat{y}_i) = \\hat{y}_i^{y_i}(1-\\hat{y}_i)^{1-y_i}$.', difficulty: 'hard' },
        ],
      },
      {
        id: 'map-estimation',
        title: 'MAP Estimation',
        content: `
<h2>MAP Estimation <span class="vi">Ước lượng hậu nghiệm cực đại</span></h2>
<p>MAP (Maximum A Posteriori) estimation extends MLE by incorporating <strong>prior beliefs</strong> <span class="vi">niềm tin tiên nghiệm</span> about the parameters before seeing data.</p>

<h3>From MLE to MAP <span class="vi">Từ MLE đến MAP</span></h3>
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>While MLE maximizes the <strong>likelihood</strong> <span class="vi">hàm hợp lý</span> $P(D|\\theta)$, MAP maximizes the <strong>posterior</strong> <span class="vi">hậu nghiệm</span>:</p>
  $$\\hat{\\theta}_{MAP} = \\arg\\max_\\theta \\; P(\\theta | D) = \\arg\\max_\\theta \\; P(D|\\theta) \\, P(\\theta)$$
  <p style="text-align:left; margin-top:0.5rem;">By Bayes' theorem <span class="vi">định lý Bayes</span>: $P(\\theta|D) = \\frac{P(D|\\theta)\\,P(\\theta)}{P(D)}$. Since $P(D)$ is constant w.r.t. $\\theta$, we drop it.</p>
</div>

<h3>Log Form <span class="vi">Dạng logarit</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\hat{\\theta}_{MAP} = \\arg\\max_\\theta \\left[ \\sum_{i=1}^n \\log P(\\mathbf{x}_i | \\theta) + \\log P(\\theta) \\right]$$
  <p style="text-align:left; margin-top:0.5rem;"><span class="vi">MAP = Log-likelihood + Log-prior</span></p>
</div>

<div class="concept-box warning">
  <div class="box-label">Key Insight <span class="vi">Nhận thức quan trọng</span></div>
  <p>MLE is a special case of MAP where the prior $P(\\theta)$ is <strong>uniform</strong> <span class="vi">đều</span> (flat). A uniform prior says "all parameter values are equally likely before seeing data."</p>
</div>

<h3>Prior Distributions <span class="vi">Phân phối tiên nghiệm</span></h3>
<p>The choice of prior <span class="vi">tiên nghiệm</span> encodes our beliefs about the parameters:</p>
<table class="example-table">
  <tr><th>Prior <span class="vi">Tiên nghiệm</span></th><th>Formula <span class="vi">Công thức</span></th><th>Effect <span class="vi">Tác dụng</span></th></tr>
  <tr><td><strong>Gaussian</strong> <span class="vi">Gauss</span></td><td>$P(\\theta) \\propto e^{-\\frac{\\|\\theta\\|^2}{2\\sigma^2}}$</td><td>Prefers small weights <span class="vi">ưu tiên trọng số nhỏ</span> → L2 regularization</td></tr>
  <tr><td><strong>Laplace</strong></td><td>$P(\\theta) \\propto e^{-\\frac{|\\theta|}{b}}$</td><td>Prefers sparse weights <span class="vi">ưu tiên trọng số thưa</span> → L1 regularization</td></tr>
  <tr><td><strong>Uniform</strong> <span class="vi">Đều</span></td><td>$P(\\theta) = \\text{const}$</td><td>No preference → pure MLE</td></tr>
</table>

<h3>MAP = MLE + Regularization <span class="vi">MAP = MLE + Chính quy hóa</span></h3>
<div class="concept-box formula">
  <div class="box-label">Gaussian Prior → L2 (Ridge) <span class="vi">Tiên nghiệm Gauss → L2 (Ridge)</span></div>
  $$\\hat{\\theta}_{MAP} = \\arg\\min_\\theta \\left[ -\\sum_{i=1}^n \\log P(\\mathbf{x}_i|\\theta) + \\frac{\\lambda}{2} \\|\\theta\\|_2^2 \\right]$$
  <p style="text-align:left; margin-top:0.5rem;">The $\\frac{\\lambda}{2}\\|\\theta\\|_2^2$ term comes directly from $-\\log P(\\theta)$ with a Gaussian prior. $\\lambda$ is inversely proportional to the prior variance $\\sigma^2$.</p>
</div>

<div class="concept-box formula">
  <div class="box-label">Laplace Prior → L1 (Lasso) <span class="vi">Tiên nghiệm Laplace → L1 (Lasso)</span></div>
  $$\\hat{\\theta}_{MAP} = \\arg\\min_\\theta \\left[ -\\sum_{i=1}^n \\log P(\\mathbf{x}_i|\\theta) + \\lambda \\|\\theta\\|_1 \\right]$$
  <p style="text-align:left; margin-top:0.5rem;">The $\\lambda\\|\\theta\\|_1$ term comes from $-\\log P(\\theta)$ with a Laplace prior. This encourages sparsity <span class="vi">tính thưa</span> — some weights become exactly zero.</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Ridge regression</strong> <span class="vi">hồi quy Ridge</span> is Bayesian linear regression with a Gaussian prior — it's MAP estimation, not just a regularization trick!</li>
    <li><strong>Lasso regression</strong> <span class="vi">hồi quy Lasso</span> is MAP with a Laplace prior — explains why L1 produces sparse <span class="vi">thưa</span> solutions</li>
    <li><strong>Weight decay</strong> <span class="vi">suy giảm trọng số</span> in neural networks ($\\theta \\leftarrow \\theta - \\eta\\lambda\\theta$) is equivalent to MAP with a Gaussian prior</li>
    <li><strong>Prior selection</strong> <span class="vi">chọn tiên nghiệm</span>: Strong prior (small $\\sigma^2$) = heavy regularization. Weak prior (large $\\sigma^2$) ≈ MLE</li>
    <li>With infinite data <span class="vi">dữ liệu vô hạn</span>, MAP converges to MLE — the data overwhelms the prior <span class="vi">dữ liệu lấn át tiên nghiệm</span></li>
  </ul>
</div>
`,
        quiz: [
          { q: 'MAP estimation differs from MLE by incorporating:', options: ['More training data', 'A prior distribution on parameters', 'Cross-validation', 'A larger learning rate'], answer: 1 },
          { q: 'A Gaussian prior on weights corresponds to which regularization?', options: ['L1 (Lasso)', 'L2 (Ridge)', 'Dropout', 'Batch normalization'], answer: 1 },
          { q: 'When the prior is uniform, MAP reduces to:', options: ['Ridge regression', 'Lasso regression', 'MLE', 'Bayesian inference'], answer: 2 },
        ],
        bloom: [
          { type: 'choice', level: 0, prompt: 'MAP stands for:', options: ['Maximum A Posteriori', 'Minimum Average Probability', 'Maximum Absolute Prior', 'Mean Adjusted Parameters'], answer: 0 },
          { type: 'match', level: 1, prompt: 'Match each prior distribution to its regularization effect:', pairs: [['Gaussian prior', 'L2 / Ridge regularization'], ['Laplace prior', 'L1 / Lasso regularization'], ['Uniform prior', 'No regularization (MLE)'], ['Strong prior (small variance)', 'Heavy regularization']] },
          { type: 'numeric', level: 2, prompt: 'In MAP with Gaussian prior, $\\hat{\\theta}_{MAP} = \\arg\\min[-\\log P(D|\\theta) + \\frac{\\lambda}{2}\\|\\theta\\|_2^2]$. If $\\lambda = 0$, this becomes MLE. If the negative log-likelihood at $\\theta=3$ is 10, $\\lambda=2$, what is the total MAP objective at $\\theta=3$? (Hint: $\\frac{\\lambda}{2}\\|\\theta\\|_2^2 = \\frac{2}{2}\\cdot 9$)', correctValue: 19, tolerance: 0 },
          { type: 'order', level: 3, prompt: 'Order the steps in MAP estimation from start to finish:', correctOrder: ['Choose a prior distribution P(θ)', 'Write the likelihood P(D|θ)', 'Combine: posterior ∝ likelihood × prior', 'Take log: log-likelihood + log-prior', 'Optimize to find θ_MAP'] },
          { type: 'explain', level: 4, prompt: 'Explain why L1 regularization (Laplace prior) produces sparse solutions (weights exactly zero) while L2 regularization (Gaussian prior) only shrinks weights toward zero but rarely makes them exactly zero. Consider the shape of each prior.' },
          { type: 'open', level: 5, prompt: 'You are building a spam classifier with 10,000 features but only 500 training emails. Design a MAP estimation approach: choose a prior, justify your choice, explain what λ value you would start with, and describe how you would tune it. What happens if you use MLE instead?' },
        ],
        homework: [
          { id: 'hw-map-estimation-1', type: 'multiple-choice', prompt: 'MAP estimation adds what to MLE?', options: ['More data', 'A prior distribution on parameters', 'Cross-validation', 'A larger learning rate'], answer: 'A prior distribution on parameters', difficulty: 'easy' },
          { id: 'hw-map-estimation-2', type: 'multiple-choice', prompt: 'A Laplace prior on weights corresponds to:', options: ['L2 regularization', 'L1 regularization', 'Dropout', 'Batch normalization'], answer: 'L1 regularization', difficulty: 'easy' },
          { id: 'hw-map-estimation-3', type: 'free-response', prompt: 'With a Gaussian prior $P(\\theta) \\propto e^{-\\theta^2/(2\\sigma^2)}$ and $\\sigma^2 = 0.5$, compute $\\lambda$ in the L2 penalty $\\frac{\\lambda}{2}\\|\\theta\\|^2$ (since $\\lambda = 1/\\sigma^2$). Then explain what happens to the MAP estimate as $\\sigma^2 \\to \\infty$.', hint: 'As $\\sigma^2 \\to \\infty$, the prior becomes flat (uniform), and MAP reduces to MLE.', difficulty: 'medium' },
          { id: 'hw-map-estimation-4', type: 'free-response', prompt: 'You have a classification problem with 50,000 features but only 200 training samples. Compare MLE vs. MAP (with L1 prior) for logistic regression. Which approach would you choose and why? Analyze the expected behavior of each in terms of overfitting, feature selection, and generalization.', hint: 'With $p \\gg n$, MLE will overfit badly. L1 prior encourages sparsity, effectively performing feature selection.', difficulty: 'hard' },
        ],
      },
      {
        id: 'bias-variance',
        title: 'Bias-Variance Tradeoff',
        content: `
<h2>Bias-Variance Tradeoff <span class="vi">Đánh đổi Độ chệch - Phương sai</span></h2>
<p>This is the central concept in understanding model performance <span class="vi">hiệu năng mô hình</span> — why models underfit <span class="vi">thiếu khớp</span> or overfit <span class="vi">quá khớp</span>.</p>

<h3>Decomposition of Error <span class="vi">Phân tích sai số</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\mathbb{E}[(y - \\hat{f}(x))^2] = \\text{Bias}^2 + \\text{Variance} + \\text{Irreducible Noise}$$
  <p style="text-align:left; margin-top:0.5rem;"><span class="vi">Sai số = Độ chệch² + Phương sai + Nhiễu không thể giảm</span></p>
</div>

<table class="example-table">
  <tr><th>Term <span class="vi">Thành phần</span></th><th>What It Means <span class="vi">Ý nghĩa</span></th><th>Symptom <span class="vi">Triệu chứng</span></th></tr>
  <tr><td><strong>Bias</strong> <span class="vi">Độ chệch</span></td><td>Error from wrong assumptions (model too simple) <span class="vi">Sai số do giả định sai, mô hình quá đơn giản</span></td><td>Underfitting <span class="vi">thiếu khớp</span> — high training AND test error</td></tr>
  <tr><td><strong>Variance</strong> <span class="vi">Phương sai</span></td><td>Error from sensitivity to training data fluctuations <span class="vi">Sai số do nhạy cảm với biến động dữ liệu huấn luyện</span></td><td>Overfitting <span class="vi">quá khớp</span> — low training error, high test error</td></tr>
  <tr><td><strong>Noise</strong> <span class="vi">Nhiễu</span></td><td>Irreducible error in the data itself <span class="vi">Sai số không thể giảm trong dữ liệu</span></td><td>Can't be reduced by any model</td></tr>
</table>

<h3>The Tradeoff <span class="vi">Sự đánh đổi</span></h3>
<ul>
  <li>Simple models <span class="vi">mô hình đơn giản</span> (linear regression) → high bias, low variance</li>
  <li>Complex models <span class="vi">mô hình phức tạp</span> (deep neural nets) → low bias, high variance</li>
  <li>The sweet spot <span class="vi">điểm tối ưu</span> minimizes total error = bias$^2$ + variance</li>
</ul>

<div class="concept-box ml-context">
  <div class="box-label">ML Context — How to Control It <span class="vi">Cách kiểm soát</span></div>
  <table class="example-table">
    <tr><th>Problem <span class="vi">Vấn đề</span></th><th>Solutions <span class="vi">Giải pháp</span></th></tr>
    <tr><td>High Bias <span class="vi">Độ chệch cao</span> (underfitting <span class="vi">thiếu khớp</span>)</td><td>More complex model <span class="vi">mô hình phức tạp hơn</span>, more features <span class="vi">thêm đặc trưng</span>, less regularization <span class="vi">giảm chính quy hóa</span>, train longer <span class="vi">huấn luyện lâu hơn</span></td></tr>
    <tr><td>High Variance <span class="vi">Phương sai cao</span> (overfitting <span class="vi">quá khớp</span>)</td><td>More data <span class="vi">thêm dữ liệu</span>, regularization <span class="vi">chính quy hóa</span> (L1/L2, dropout), simpler model, early stopping <span class="vi">dừng sớm</span>, ensembles <span class="vi">kết hợp mô hình</span></td></tr>
  </table>
  <p style="margin-top: 1rem"><strong>Ensembles</strong> <span class="vi">kết hợp mô hình</span> (Random Forest <span class="vi">rừng ngẫu nhiên</span>, Boosting <span class="vi">tăng cường</span>) work by reducing variance through averaging multiple models.</p>
</div>
`,
        interactive: 'biasVariance',
        quiz: [
          { q: 'A model with high training accuracy but low test accuracy has:', options: ['High bias', 'High variance', 'High noise', 'Low variance'], answer: 1 },
          { q: 'Adding more training data primarily helps reduce:', options: ['Bias', 'Variance', 'Noise', 'All three equally'], answer: 1 },
          { q: 'Dropout regularization reduces:', options: ['Bias', 'Variance', 'Learning rate', 'Training speed'], answer: 1 },
        ],
        homework: [
          { id: 'hw-bias-variance-1', type: 'multiple-choice', prompt: 'A model with high training accuracy but low test accuracy suffers from:', options: ['High bias', 'High variance (overfitting)', 'High noise', 'Low variance'], answer: 'High variance (overfitting)', difficulty: 'easy' },
          { id: 'hw-bias-variance-2', type: 'multiple-choice', prompt: 'Adding more training data primarily reduces:', options: ['Bias', 'Variance', 'Irreducible noise', 'All three equally'], answer: 'Variance', difficulty: 'easy' },
          { id: 'hw-bias-variance-3', type: 'free-response', prompt: 'A linear model on a nonlinear dataset has 80% training accuracy and 78% test accuracy. A deep neural network on the same data has 99% training accuracy and 72% test accuracy. Diagnose each model\'s bias-variance profile and recommend specific remedies for each.', hint: 'The linear model has high bias (underfitting). The deep model has high variance (overfitting).', difficulty: 'medium' },
          { id: 'hw-bias-variance-4', type: 'free-response', prompt: 'Random Forests reduce variance by averaging many decision trees, each trained on a bootstrap sample. Explain: (1) why individual trees have low bias but high variance, (2) how bagging (averaging) reduces variance without increasing bias, and (3) why feature randomization further helps. Connect this to the bias-variance decomposition formula.', hint: 'If trees are correlated, averaging helps less. Feature randomization decorrelates the trees.', difficulty: 'hard' },
        ],
      }
    ]
  },

  // ===================== OPTIMIZATION =====================
  {
    id: 'optimization',
    title: 'Optimization',
    icon: '🎯',
    description: 'Gradient descent variants and how ML models learn.',
    lessons: [
      {
        id: 'gradient-descent',
        title: 'Gradient Descent',
        content: `
<h2>Gradient Descent <span class="vi">Hạ Gradient</span></h2>
<p>Gradient descent <span class="vi">hạ gradient</span> is how ML models learn — it's the algorithm that minimizes the loss function <span class="vi">cực tiểu hóa hàm mất mát</span> by iteratively updating parameters <span class="vi">cập nhật tham số lặp đi lặp lại</span>.</p>

<h3>The Algorithm <span class="vi">Thuật toán</span></h3>
<div class="concept-box formula">
  <div class="box-label">Update Rule <span class="vi">Quy tắc cập nhật</span></div>
  $$\\theta_{t+1} = \\theta_t - \\eta \\nabla_{\\theta} \\mathcal{L}(\\theta_t)$$
  <p style="text-align:left; margin-top:0.5rem;">$\\eta$ = learning rate <span class="vi">tốc độ học</span>, $\\nabla \\mathcal{L}$ = gradient of loss <span class="vi">gradient của hàm mất mát</span></p>
</div>

<h3>Variants <span class="vi">Các biến thể</span></h3>
<table class="example-table">
  <tr><th>Variant <span class="vi">Biến thể</span></th><th>Batch Size <span class="vi">Kích thước lô</span></th><th>Properties <span class="vi">Tính chất</span></th></tr>
  <tr><td><strong>Batch GD</strong> <span class="vi">GD theo lô</span></td><td>Entire dataset <span class="vi">toàn bộ dữ liệu</span></td><td>Stable but slow <span class="vi">ổn định nhưng chậm</span>, memory-intensive</td></tr>
  <tr><td><strong>Stochastic GD (SGD)</strong> <span class="vi">GD ngẫu nhiên</span></td><td>1 sample <span class="vi">1 mẫu</span></td><td>Noisy but fast <span class="vi">nhiễu nhưng nhanh</span>, can escape local minima <span class="vi">thoát cực tiểu địa phương</span></td></tr>
  <tr><td><strong>Mini-batch GD</strong> <span class="vi">GD theo lô nhỏ</span></td><td>32-512 samples</td><td>Best of both worlds, GPU-friendly</td></tr>
</table>

<h3>Learning Rate <span class="vi">Tốc độ học</span></h3>
<div class="concept-box warning">
  <div class="box-label">Critical Hyperparameter <span class="vi">Siêu tham số quan trọng</span></div>
  <ul>
    <li><strong>Too high</strong> <span class="vi">quá cao</span>: Overshoots minimum <span class="vi">vượt qua cực tiểu</span>, loss diverges <span class="vi">hàm mất mát phân kỳ</span></li>
    <li><strong>Too low</strong> <span class="vi">quá thấp</span>: Very slow convergence <span class="vi">hội tụ rất chậm</span>, stuck in poor local minima</li>
    <li><strong>Just right</strong> <span class="vi">vừa phải</span>: Smooth convergence <span class="vi">hội tụ mượt mà</span> to good minimum</li>
  </ul>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p>Modern practice: use <strong>learning rate schedules</strong> <span class="vi">lịch trình tốc độ học</span></p>
  <ul>
    <li><strong>Step decay</strong> <span class="vi">giảm theo bước</span>: Cut LR by 10x every N epochs <span class="vi">chu kỳ</span></li>
    <li><strong>Cosine annealing</strong> <span class="vi">ủ cô-sin</span>: Smoothly decrease LR following cosine curve</li>
    <li><strong>Warmup</strong> <span class="vi">khởi động</span>: Start with tiny LR, ramp up, then decay</li>
    <li><strong>1cycle</strong>: Increase then decrease (used in fast.ai)</li>
  </ul>
</div>
`,
        interactive: 'gradientDescent2D',
        quiz: [
          { q: 'Mini-batch gradient descent typically uses batch sizes of:', options: ['1', '32-512', 'Entire dataset', '1 million'], answer: 1 },
          { q: 'If the learning rate is too high:', options: ['Training is too slow', 'The loss diverges', 'The model underfits', 'Memory runs out'], answer: 1 },
          { q: 'SGD\'s noise helps by:', options: ['Making training faster', 'Potentially escaping local minima', 'Reducing memory usage', 'All of the above'], answer: 3 },
        ],
        bloom: [
          { type: 'match', level: 0, prompt: 'Match each gradient descent variant to its batch size:', pairs: [['Batch GD', 'Entire dataset'], ['SGD', 'Single sample'], ['Mini-batch GD', '32-512 samples']] },
          { type: 'choice', level: 1, prompt: 'Why does SGD use random samples instead of the full dataset?', options: ['It is more accurate', 'It is computationally cheaper per step and adds helpful noise', 'It guarantees finding the global minimum', 'It avoids overfitting completely'], answer: 1 },
          { type: 'numeric', level: 2, prompt: 'If $f(x) = x^2$ and current $x = 4$ with learning rate $\\eta = 0.1$, what is $x$ after one GD step? (gradient of $x^2$ is $2x$)', correctValue: 3.2, tolerance: 0.01 },
          { type: 'order', level: 3, prompt: 'Order the gradient descent process steps:', correctOrder: ['Initialize parameters randomly', 'Compute loss on batch', 'Compute gradients via backprop', 'Update parameters: w = w - lr * grad', 'Repeat until convergence'] },
          { type: 'explain', level: 4, prompt: 'A model\'s training loss is oscillating wildly and not decreasing. Diagnose the most likely cause and propose two fixes.' },
          { type: 'open', level: 5, prompt: 'Design a learning rate schedule for a 100-epoch training run. Describe when the LR should be high vs low and justify your choices.' },
        ],
        homework: [
          { id: 'hw-gradient-descent-1', type: 'numeric', prompt: 'If $f(x) = x^2$, current $x = 5$, and learning rate $\\eta = 0.1$, what is $x$ after one gradient descent step?', answer: 4, tolerance: 0.01, difficulty: 'easy' },
          { id: 'hw-gradient-descent-2', type: 'multiple-choice', prompt: 'Mini-batch gradient descent uses batch sizes of:', options: ['1 sample', '32-512 samples', 'Entire dataset', '1 million samples'], answer: '32-512 samples', difficulty: 'easy' },
          { id: 'hw-gradient-descent-3', type: 'free-response', prompt: 'Starting at $x = 10$ with $f(x) = x^2$ and $\\eta = 0.1$, compute 3 steps of gradient descent. Show $x$ and $f(x)$ at each step. Is the algorithm converging?', hint: 'Gradient of $x^2$ is $2x$. Update: $x_{new} = x - 0.1 \\cdot 2x = 0.8x$.', difficulty: 'medium' },
          { id: 'hw-gradient-descent-4', type: 'free-response', prompt: 'Your model\'s training loss oscillates wildly and sometimes increases. Diagnose the problem and propose three different solutions. Then design a learning rate schedule for a 100-epoch training run, explaining your choices for warmup, peak rate, and decay strategy.', hint: 'Likely the learning rate is too high. Consider: reducing LR, using LR warmup, or switching to an adaptive optimizer.', difficulty: 'hard' },
        ],
      },
      {
        id: 'advanced-optimizers',
        title: 'Adam & Advanced Optimizers',
        content: `
<h2>Advanced Optimizers <span class="vi">Bộ tối ưu nâng cao</span></h2>
<p>Vanilla SGD has issues: same learning rate for all parameters, and no memory <span class="vi">bộ nhớ</span> of past gradients. Modern optimizers fix this.</p>

<h3>Momentum <span class="vi">Động lượng</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$v_t = \\beta v_{t-1} + (1-\\beta) \\nabla \\mathcal{L}$$
  $$\\theta_t = \\theta_{t-1} - \\eta v_t$$
</div>
<p>Momentum adds a "velocity" <span class="vi">vận tốc</span> term — like a ball rolling downhill, it accelerates <span class="vi">tăng tốc</span> in consistent directions and dampens oscillations <span class="vi">giảm dao động</span>. Typical $\\beta = 0.9$.</p>

<h3>RMSProp</h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$s_t = \\beta s_{t-1} + (1-\\beta)(\\nabla \\mathcal{L})^2$$
  $$\\theta_t = \\theta_{t-1} - \\frac{\\eta}{\\sqrt{s_t + \\epsilon}} \\nabla \\mathcal{L}$$
</div>
<p>Adapts the learning rate per-parameter <span class="vi">tốc độ học riêng cho từng tham số</span> based on the magnitude of recent gradients.</p>

<h3>Adam (Adaptive Moment Estimation) <span class="vi">Ước lượng mô-men thích ứng</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$m_t = \\beta_1 m_{t-1} + (1-\\beta_1)\\nabla \\mathcal{L} \\quad \\text{(momentum / động lượng)}$$
  $$v_t = \\beta_2 v_{t-1} + (1-\\beta_2)(\\nabla \\mathcal{L})^2 \\quad \\text{(RMSProp)}$$
  $$\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t} \\quad \\text{(bias correction / hiệu chỉnh độ chệch)}$$
  $$\\theta_t = \\theta_{t-1} - \\frac{\\eta}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t$$
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <table class="example-table">
    <tr><th>Optimizer <span class="vi">Bộ tối ưu</span></th><th>When to Use <span class="vi">Khi nào dùng</span></th></tr>
    <tr><td><strong>SGD + Momentum</strong></td><td>Computer vision <span class="vi">thị giác máy tính</span> (often best final accuracy <span class="vi">độ chính xác</span>)</td></tr>
    <tr><td><strong>Adam</strong></td><td>Default choice, NLP <span class="vi">xử lý ngôn ngữ tự nhiên</span>, Transformers, GANs</td></tr>
    <tr><td><strong>AdamW</strong></td><td>Adam with decoupled weight decay <span class="vi">suy giảm trọng số tách rời</span> (better regularization)</td></tr>
    <tr><td><strong>LAMB/LARS</strong></td><td>Large-batch training <span class="vi">huấn luyện lô lớn</span></td></tr>
  </table>
  <p style="margin-top: 0.8rem">Default Adam hyperparams <span class="vi">siêu tham số</span>: $\\beta_1 = 0.9$, $\\beta_2 = 0.999$, $\\epsilon = 10^{-8}$, $\\eta = 0.001$</p>
</div>
`,
        quiz: [
          { q: 'Adam combines which two techniques?', options: ['Dropout and batch norm', 'Momentum and RMSProp', 'L1 and L2 regularization', 'SGD and Newton\'s method'], answer: 1 },
          { q: 'Per-parameter learning rates are a feature of:', options: ['Vanilla SGD', 'SGD with momentum', 'Adam/RMSProp', 'Batch gradient descent'], answer: 2 },
          { q: 'For training Transformers, the typical default optimizer is:', options: ['SGD', 'Adam/AdamW', 'L-BFGS', 'Adagrad'], answer: 1 },
        ],
        homework: [
          { id: 'hw-advanced-optimizers-1', type: 'multiple-choice', prompt: 'Adam combines which two ideas?', options: ['L1 and L2 regularization', 'Momentum and RMSProp', 'SGD and Newton\'s method', 'Dropout and batch norm'], answer: 'Momentum and RMSProp', difficulty: 'easy' },
          { id: 'hw-advanced-optimizers-2', type: 'multiple-choice', prompt: 'The default learning rate for Adam is:', options: ['0.1', '0.01', '0.001', '0.0001'], answer: '0.001', difficulty: 'easy' },
          { id: 'hw-advanced-optimizers-3', type: 'free-response', prompt: 'Momentum uses $v_t = \\beta v_{t-1} + (1-\\beta) \\nabla L$. If the gradient is constant at $g$ for many steps, what does $v_t$ converge to? What does this tell you about the effective learning rate with momentum?', hint: 'In steady state, $v = \\beta v + (1-\\beta)g$, so $v = g$. The effective step size is $\\eta \\cdot g$.', difficulty: 'medium' },
          { id: 'hw-advanced-optimizers-4', type: 'free-response', prompt: 'You are training a Transformer model. Compare using SGD+momentum vs. AdamW. Discuss: convergence speed, generalization performance, memory overhead, and hyperparameter sensitivity. Which would you choose for a 1B-parameter language model and why?', hint: 'AdamW stores two extra buffers per parameter (momentum and variance). For LLMs, AdamW with warmup is standard.', difficulty: 'hard' },
        ],
      },
      {
        id: 'regularization',
        title: 'Regularization',
        content: `
<h2>Regularization <span class="vi">Chính quy hóa</span></h2>
<p>Regularization <span class="vi">chính quy hóa</span> prevents overfitting <span class="vi">ngăn quá khớp</span> by adding constraints <span class="vi">ràng buộc</span> that discourage overly complex models.</p>

<h3>L1 & L2 Regularization <span class="vi">Chính quy hóa L1 & L2</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formulas <span class="vi">Công thức</span></div>
  $$\\mathcal{L}_{\\text{L2}} = \\mathcal{L} + \\lambda \\sum_i w_i^2 \\quad \\text{(Ridge / Weight Decay} \\; \\text{\\small{— suy giảm trọng số)}}$$
  $$\\mathcal{L}_{\\text{L1}} = \\mathcal{L} + \\lambda \\sum_i |w_i| \\quad \\text{(Lasso)}$$
</div>

<table class="example-table">
  <tr><th>Type <span class="vi">Loại</span></th><th>Effect on Weights <span class="vi">Ảnh hưởng lên trọng số</span></th><th>Result <span class="vi">Kết quả</span></th></tr>
  <tr><td><strong>L2 (Ridge)</strong></td><td>Shrinks weights toward zero <span class="vi">co trọng số về gần 0</span></td><td>Small, distributed weights <span class="vi">trọng số nhỏ, phân tán</span></td></tr>
  <tr><td><strong>L1 (Lasso)</strong></td><td>Pushes weights exactly to zero <span class="vi">đẩy trọng số về đúng 0</span></td><td>Sparse weights <span class="vi">trọng số thưa</span> (feature selection <span class="vi">chọn đặc trưng</span>)</td></tr>
  <tr><td><strong>Elastic Net</strong> <span class="vi">Mạng đàn hồi</span></td><td>Combination of L1 + L2 <span class="vi">kết hợp L1 + L2</span></td><td>Sparse + stable <span class="vi">thưa + ổn định</span></td></tr>
</table>

<h3>Dropout</h3>
<div class="concept-box definition">
  <div class="box-label">How It Works <span class="vi">Cách hoạt động</span></div>
  <p>During training <span class="vi">trong quá trình huấn luyện</span>, randomly set each neuron's output to 0 with probability $p$ (typically 0.1-0.5). At test time <span class="vi">khi kiểm tra</span>, scale outputs by $(1-p)$.</p>
  <p>Interpretation <span class="vi">cách hiểu</span>: training an ensemble <span class="vi">tập hợp</span> of $2^n$ sub-networks simultaneously.</p>
</div>

<h3>Other Regularization Techniques <span class="vi">Kỹ thuật chính quy hóa khác</span></h3>
<ul>
  <li><strong>Early stopping</strong> <span class="vi">dừng sớm</span>: Stop training when validation loss <span class="vi">mất mát trên tập kiểm định</span> starts increasing</li>
  <li><strong>Data augmentation</strong> <span class="vi">tăng cường dữ liệu</span>: Create more training data via transformations <span class="vi">phép biến đổi</span></li>
  <li><strong>Batch normalization</strong> <span class="vi">chuẩn hóa theo lô</span>: Has a regularizing effect due to mini-batch noise</li>
  <li><strong>Label smoothing</strong> <span class="vi">làm mượt nhãn</span>: Replace hard labels (0,1) with soft labels (0.1, 0.9)</li>
</ul>

<div class="concept-box ml-context">
  <div class="box-label">ML Context — Bayesian View <span class="vi">Góc nhìn Bayes</span></div>
  <p>L2 regularization = Gaussian prior <span class="vi">tiên nghiệm Gauss</span> on weights: $P(w) \\propto e^{-\\lambda w^2}$</p>
  <p>L1 regularization = Laplace prior <span class="vi">tiên nghiệm Laplace</span> on weights: $P(w) \\propto e^{-\\lambda |w|}$</p>
  <p>Regularization strength <span class="vi">cường độ chính quy hóa</span> $\\lambda$ = how strongly you believe weights should be small.</p>
</div>
`,
        quiz: [
          { q: 'L1 regularization produces:', options: ['Large weights', 'Sparse weights (zeros)', 'Negative weights', 'Equal weights'], answer: 1 },
          { q: 'Dropout with p=0.5 can be interpreted as:', options: ['Removing half the layers', 'Training an ensemble of sub-networks', 'Halving the learning rate', 'Doubling the batch size'], answer: 1 },
          { q: 'Early stopping prevents overfitting by:', options: ['Reducing model complexity', 'Stopping before the model memorizes training data', 'Adding noise to weights', 'Increasing the learning rate'], answer: 1 },
        ],
        homework: [
          { id: 'hw-regularization-1', type: 'multiple-choice', prompt: 'L1 regularization tends to produce:', options: ['Large weights', 'Sparse weights (many zeros)', 'Negative weights only', 'Equal weights'], answer: 'Sparse weights (many zeros)', difficulty: 'easy' },
          { id: 'hw-regularization-2', type: 'multiple-choice', prompt: 'Dropout during training randomly sets neurons to zero with probability $p$. At test time:', options: ['Dropout is still applied', 'All neurons are active, outputs scaled by $(1-p)$', 'Half the neurons are dropped', 'The learning rate is halved'], answer: 'All neurons are active, outputs scaled by $(1-p)$', difficulty: 'easy' },
          { id: 'hw-regularization-3', type: 'free-response', prompt: 'Your model achieves 99% training accuracy but only 75% test accuracy. List four different regularization techniques you would try, and for each, explain the specific mechanism by which it reduces overfitting.', hint: 'Consider L2, dropout, data augmentation, and early stopping.', difficulty: 'medium' },
          { id: 'hw-regularization-4', type: 'free-response', prompt: 'Elastic Net combines L1 and L2: $\\lambda_1 \\|w\\|_1 + \\lambda_2 \\|w\\|_2^2$. From a Bayesian perspective, what prior does this correspond to? When would you prefer Elastic Net over pure Lasso or pure Ridge? Provide a concrete example with correlated features.', hint: 'Lasso can arbitrarily select one of several correlated features and ignore others. Elastic Net keeps groups of correlated features together.', difficulty: 'hard' },
        ],
      },
      {
        id: 'constrained-optimization',
        title: 'Lagrange Multipliers & Constrained Optimization',
        content: `
<h2>Lagrange Multipliers & Constrained Optimization <span class="vi">Nhân tử Lagrange & Tối ưu có ràng buộc</span></h2>
<p>Most real-world optimization problems have <strong>constraints</strong> <span class="vi">ràng buộc</span>. We cannot simply set the gradient to zero — we must find the best solution <em>within</em> an allowed region.</p>

<h3>Constrained Optimization Problem <span class="vi">Bài toán tối ưu có ràng buộc</span></h3>
<div class="concept-box definition">
  <div class="box-label">Problem Formulation <span class="vi">Phát biểu bài toán</span></div>
  <p>Minimize $f(\\mathbf{x})$ subject to constraints <span class="vi">tối thiểu hóa $f(\\mathbf{x})$ thỏa mãn ràng buộc</span>:</p>
  $$\\min_{\\mathbf{x}} f(\\mathbf{x}) \\quad \\text{subject to} \\quad g_i(\\mathbf{x}) = 0 \;\\text{(equality)} \\quad h_j(\\mathbf{x}) \\leq 0 \;\\text{(inequality)}$$
</div>

<h3>The Lagrangian <span class="vi">Hàm Lagrange</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  <p>For equality constraints <span class="vi">ràng buộc đẳng thức</span>, construct the Lagrangian:</p>
  $$\\mathcal{L}(\\mathbf{x}, \\lambda) = f(\\mathbf{x}) - \\sum_i \\lambda_i g_i(\\mathbf{x})$$
  <p>where $\\lambda_i$ are <strong>Lagrange multipliers</strong> <span class="vi">nhân tử Lagrange</span>. At the optimum <span class="vi">tại điểm tối ưu</span>:</p>
  $$\\nabla_{\\mathbf{x}} \\mathcal{L} = 0 \\quad \\text{and} \\quad \\nabla_{\\lambda} \\mathcal{L} = 0$$
  <p><span class="vi">Gradient theo $\\mathbf{x}$ và theo $\\lambda$ đều bằng 0</span></p>
</div>

<div class="concept-box definition">
  <div class="box-label">Geometric Intuition <span class="vi">Trực giác hình học</span></div>
  <p>At the optimal point, the gradient of $f$ must be <strong>parallel</strong> <span class="vi">song song</span> to the gradient of the constraint $g$. If they were not parallel, you could still improve $f$ while staying on the constraint surface <span class="vi">bề mặt ràng buộc</span>:</p>
  $$\\nabla f = \\lambda \\nabla g$$
</div>

<h3>KKT Conditions <span class="vi">Điều kiện KKT (Karush-Kuhn-Tucker)</span></h3>
<div class="concept-box formula">
  <div class="box-label">Conditions <span class="vi">Các điều kiện</span></div>
  <p>For inequality constraints <span class="vi">ràng buộc bất đẳng thức</span> $h_j(\\mathbf{x}) \\leq 0$, the KKT conditions extend Lagrange multipliers:</p>
  <ol>
    <li><strong>Stationarity</strong> <span class="vi">Tính dừng</span>: $\\nabla f = \\sum_i \\lambda_i \\nabla g_i + \\sum_j \\mu_j \\nabla h_j$</li>
    <li><strong>Primal feasibility</strong> <span class="vi">Khả thi nguyên thủy</span>: $g_i(\\mathbf{x}) = 0$, $h_j(\\mathbf{x}) \\leq 0$</li>
    <li><strong>Dual feasibility</strong> <span class="vi">Khả thi đối ngẫu</span>: $\\mu_j \\geq 0$</li>
    <li><strong>Complementary slackness</strong> <span class="vi">Bù lỏng</span>: $\\mu_j h_j(\\mathbf{x}) = 0$ — either the constraint is active or its multiplier is zero <span class="vi">ràng buộc hoạt động hoặc nhân tử bằng 0</span></li>
  </ol>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>SVM margin maximization</strong> <span class="vi">cực đại hóa lề SVM</span>: SVMs solve $\\min \\frac{1}{2}\\|\\mathbf{w}\\|^2$ subject to $y_i(\\mathbf{w} \\cdot \\mathbf{x}_i + b) \\geq 1$. The Lagrangian dual leads to the kernel trick <span class="vi">thủ thuật kernel</span> and support vectors are points where $\\mu_i > 0$ (complementary slackness).</li>
    <li><strong>Regularization as constraint</strong> <span class="vi">chính quy hóa như ràng buộc</span>: L2 regularization $\\min \\mathcal{L}(w) + \\lambda\\|w\\|^2$ is equivalent to $\\min \\mathcal{L}(w)$ subject to $\\|w\\|^2 \\leq t$ for some $t$. The $\\lambda$ IS the Lagrange multiplier! <span class="vi">$\\lambda$ CHÍNH LÀ nhân tử Lagrange!</span></li>
    <li><strong>Constrained policy optimization (RL)</strong> <span class="vi">tối ưu chính sách có ràng buộc</span>: TRPO constrains policy updates via KL divergence: $\\max J(\\theta)$ subject to $D_{KL}(\\pi_{\\theta} \\| \\pi_{\\theta_{\\text{old}}}) \\leq \\delta$</li>
    <li><strong>Dual problem</strong> <span class="vi">bài toán đối ngẫu</span>: Sometimes solving the dual (over $\\lambda$) is easier than the primal (over $\\mathbf{x}$). The SVM dual depends only on dot products $\\mathbf{x}_i \\cdot \\mathbf{x}_j$, enabling kernels.</li>
  </ul>
</div>
`,
        quiz: [
          { q: 'The Lagrangian $\\mathcal{L}(x, \\lambda) = f(x) - \\lambda g(x)$ combines:', options: ['Two loss functions', 'The objective and its gradient', 'The objective function and the constraint', 'Two constraints together'], answer: 2 },
          { q: 'Complementary slackness ($\\mu_j h_j = 0$) means:', options: ['All constraints are active', 'Either the constraint is active or its multiplier is zero', 'The solution is always at the boundary', 'The dual problem has no solution'], answer: 1 },
          { q: 'L2 regularization $\\lambda\\|w\\|^2$ can be interpreted as:', options: ['A Lagrange multiplier on a weight norm constraint', 'A gradient penalty', 'A data augmentation technique', 'A learning rate schedule'], answer: 0 },
        ],
        bloom: [
          { type: 'choice', level: 0, prompt: 'In Lagrange multipliers, the constraint $g(x) = 0$ means:', options: ['$g$ must be minimized', '$g$ must be maximized', 'The solution must lie on the surface where $g$ equals zero', '$g$ is the objective function'], answer: 2 },
          { type: 'match', level: 1, prompt: 'Match each ML technique to its constrained optimization connection:', pairs: [['SVM', 'Maximize margin subject to classification constraints'], ['L2 Regularization', 'Equivalent to weight norm constraint via Lagrange multiplier'], ['TRPO (RL)', 'KL divergence constraint on policy updates'], ['Lasso (L1)', 'Equivalent to L1 ball constraint on weights']] },
          { type: 'numeric', level: 2, prompt: 'Minimize $f(x,y) = x + y$ subject to $x^2 + y^2 = 1$. Using Lagrange multipliers, the minimum value of $f$ is:', correctValue: -1.414, tolerance: 0.01 },
          { type: 'explain', level: 4, prompt: 'Explain the geometric intuition behind $\\nabla f = \\lambda \\nabla g$ at the optimal point. Why must these two gradients be parallel? What would happen if they were not parallel?' },
          { type: 'open', level: 5, prompt: 'Design a constrained optimization problem for a real ML scenario: a fairness-constrained classifier that must maintain accuracy above 90% while ensuring equal prediction rates across two demographic groups. Write the mathematical formulation with objective, equality, and inequality constraints.' },
        ],
        homework: [
          { id: 'hw-constrained-optimization-1', type: 'multiple-choice', prompt: 'The Lagrangian combines:', options: ['Two loss functions', 'The objective and its gradient', 'The objective function and the constraint', 'Two constraints'], answer: 'The objective function and the constraint', difficulty: 'easy' },
          { id: 'hw-constrained-optimization-2', type: 'numeric', prompt: 'Minimize $f(x, y) = x + y$ subject to $x^2 + y^2 = 2$. The minimum value is $-2$. What is the Lagrange multiplier $\\lambda$? (From $\\nabla f = \\lambda \\nabla g$: $1 = 2\\lambda x$, at the minimum $x = y = -1$)', answer: -0.5, tolerance: 0.01, difficulty: 'medium' },
          { id: 'hw-constrained-optimization-3', type: 'free-response', prompt: 'In SVM, we minimize $\\frac{1}{2}\\|w\\|^2$ subject to $y_i(w \\cdot x_i + b) \\geq 1$. Write the Lagrangian and explain what "support vectors" are in terms of the KKT complementary slackness condition.', hint: 'Support vectors are the data points where the constraint is active (equality holds), meaning their Lagrange multiplier $\\alpha_i > 0$.', difficulty: 'medium' },
          { id: 'hw-constrained-optimization-4', type: 'free-response', prompt: 'L2 regularization $\\min_w \\mathcal{L}(w) + \\lambda \\|w\\|^2$ is equivalent to $\\min_w \\mathcal{L}(w)$ subject to $\\|w\\|^2 \\leq t$ for some $t$. Explain this equivalence using Lagrange multipliers (the $\\lambda$ IS the multiplier). Then derive the relationship between $\\lambda$ and $t$.', hint: 'Strong duality holds for convex problems. As $\\lambda$ increases, the constraint radius $t$ decreases.', difficulty: 'hard' },
        ],
      },
      {
        id: 'numerical-stability',
        title: 'Numerical Stability',
        content: `
<h2>Numerical Stability <span class="vi">Ổn định số học</span></h2>
<p>Computers use finite precision <span class="vi">độ chính xác hữu hạn</span> to represent real numbers. This limitation causes subtle bugs that can silently destroy model training if you are not careful.</p>

<h3>Floating Point Representation <span class="vi">Biểu diễn số dấu phẩy động</span></h3>
<div class="concept-box definition">
  <div class="box-label">IEEE 754 <span class="vi">Chuẩn IEEE 754</span></div>
  <p>A floating-point number <span class="vi">số dấu phẩy động</span> is stored as: $(-1)^{\\text{sign}} \\times 1.\\text{mantissa} \\times 2^{\\text{exponent}}$</p>
  <table class="example-table">
    <tr><th>Format</th><th>Bits <span class="vi">Số bit</span></th><th>Range <span class="vi">Phạm vi</span></th><th>Precision <span class="vi">Độ chính xác</span></th></tr>
    <tr><td><strong>float16</strong> (half)</td><td>16</td><td>$\\pm 6.5 \\times 10^4$</td><td>~3 decimal digits</td></tr>
    <tr><td><strong>float32</strong> (single)</td><td>32</td><td>$\\pm 3.4 \\times 10^{38}$</td><td>~7 decimal digits</td></tr>
    <tr><td><strong>float64</strong> (double)</td><td>64</td><td>$\\pm 1.8 \\times 10^{308}$</td><td>~15 decimal digits</td></tr>
  </table>
</div>

<h3>Overflow & Underflow <span class="vi">Tràn trên & Tràn dưới</span></h3>
<div class="concept-box warning">
  <div class="box-label">Common Pitfalls <span class="vi">Lỗi thường gặp</span></div>
  <ul>
    <li><strong>Overflow</strong> <span class="vi">tràn trên</span>: Number too large to represent &rarr; becomes <code>Inf</code>. Example: $e^{1000}$ in float32.</li>
    <li><strong>Underflow</strong> <span class="vi">tràn dưới</span>: Number too close to zero &rarr; becomes <code>0</code>. Example: multiplying many probabilities $0.01^{100} = 10^{-200}$.</li>
    <li><strong>Catastrophic cancellation</strong> <span class="vi">triệt tiêu thảm họa</span>: Subtracting nearly equal numbers destroys precision. $(1 + 10^{-15}) - 1$ may give $0$ instead of $10^{-15}$.</li>
  </ul>
</div>

<h3>The Log-Sum-Exp Trick <span class="vi">Thủ thuật Log-Sum-Exp</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  <p>To compute $\\log \\sum_i e^{x_i}$ without overflow <span class="vi">không bị tràn</span>:</p>
  $$\\log \\sum_i e^{x_i} = c + \\log \\sum_i e^{x_i - c} \\quad \\text{where } c = \\max_i x_i$$
  <p><span class="vi">Trừ đi giá trị lớn nhất $c$ trước khi tính mũ, rồi cộng lại sau</span></p>
  <p>This ensures the largest exponent is $e^0 = 1$, preventing overflow. This is exactly how <code>torch.logsumexp</code> and stable softmax work.</p>
</div>

<h3>Condition Number <span class="vi">Số điều kiện</span></h3>
<div class="concept-box formula">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>The <strong>condition number</strong> <span class="vi">số điều kiện</span> of a matrix $\\mathbf{A}$ measures how sensitive $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ is to small perturbations <span class="vi">nhiễu loạn nhỏ</span>:</p>
  $$\\kappa(\\mathbf{A}) = \\|\\mathbf{A}\\| \\cdot \\|\\mathbf{A}^{-1}\\| = \\frac{\\sigma_{\\max}}{\\sigma_{\\min}}$$
  <p>where $\\sigma_{\\max}, \\sigma_{\\min}$ are the largest and smallest singular values <span class="vi">giá trị kỳ dị</span>.</p>
  <ul>
    <li>$\\kappa \\approx 1$: <strong>well-conditioned</strong> <span class="vi">điều kiện tốt</span> — small input changes cause small output changes</li>
    <li>$\\kappa \\gg 1$: <strong>ill-conditioned</strong> <span class="vi">điều kiện xấu</span> — small input changes may cause large output changes</li>
  </ul>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Softmax numerical stability</strong> <span class="vi">ổn định số học softmax</span>: Naive softmax $\\frac{e^{z_i}}{\\sum e^{z_j}}$ overflows for large $z$. The stable version subtracts $\\max(z)$: $\\frac{e^{z_i - \\max(z)}}{\\sum e^{z_j - \\max(z)}}$. This is the log-sum-exp trick in disguise.</li>
    <li><strong>Log probabilities</strong> <span class="vi">log xác suất</span>: Always work in log space when multiplying many probabilities. $\\log P(x_1, \\ldots, x_n) = \\sum_i \\log P(x_i)$ avoids underflow <span class="vi">tránh tràn dưới</span>.</li>
    <li><strong>Batch normalization</strong> <span class="vi">chuẩn hóa theo lô</span>: By normalizing activations to zero mean and unit variance, it keeps values in a numerically stable range and improves conditioning of the optimization landscape.</li>
    <li><strong>Gradient clipping</strong> <span class="vi">cắt gradient</span>: Caps gradient norms to prevent exploding gradients <span class="vi">gradient bùng nổ</span>: $\\mathbf{g} \\leftarrow \\mathbf{g} \\cdot \\min\\left(1, \\frac{\\tau}{\\|\\mathbf{g}\\|}\\right)$</li>
    <li><strong>Mixed precision training</strong> <span class="vi">huấn luyện độ chính xác hỗn hợp</span>: Use float16 for forward/backward pass (2x speed, half memory) but float32 for weight updates and loss scaling <span class="vi">co giãn mất mát</span> to maintain precision where it matters.</li>
  </ul>
</div>
`,
        quiz: [
          { q: 'The log-sum-exp trick prevents:', options: ['Underflow only', 'Overflow when computing $\\log \\sum e^{x_i}$', 'Both overflow and underflow equally', 'Rounding errors'], answer: 1 },
          { q: 'A matrix with condition number $\\kappa = 10^{10}$ is:', options: ['Well-conditioned', 'Perfectly invertible', 'Ill-conditioned', 'Singular'], answer: 2 },
          { q: 'Mixed precision training uses float16 for:', options: ['Weight storage only', 'Forward and backward passes for speed', 'Loss computation only', 'All computations including weight updates'], answer: 1 },
        ],
        bloom: [
          { type: 'choice', level: 0, prompt: 'What happens when you compute $e^{1000}$ in float32?', options: ['Returns a very large number', 'Returns 0 (underflow)', 'Returns Inf (overflow)', 'Raises an error'], answer: 2 },
          { type: 'match', level: 1, prompt: 'Match each numerical issue to its solution:', pairs: [['Softmax overflow', 'Subtract max before exponentiating'], ['Probability underflow', 'Work in log space'], ['Exploding gradients', 'Gradient clipping'], ['Slow float32 training', 'Mixed precision (float16 + float32)']] },
          { type: 'numeric', level: 2, prompt: 'Using the log-sum-exp trick with $x = [1000, 1001, 1002]$: first compute $c = \\max(x) = 1002$, then $\\log(e^{-2} + e^{-1} + e^0) + 1002$. What is the result? (Round to 2 decimals)', correctValue: 1002.41, tolerance: 0.01 },
          { type: 'order', level: 3, prompt: 'Order these floating point formats from least to most precision:', correctOrder: ['float16 (~3 decimal digits)', 'bfloat16 (~3 decimal digits, larger range)', 'float32 (~7 decimal digits)', 'float64 (~15 decimal digits)'] },
          { type: 'explain', level: 4, prompt: 'Explain why multiplying 100 probabilities of 0.01 each fails in float32 but works fine in log space. Show the math for both approaches and identify exactly where the naive approach breaks.' },
          { type: 'open', level: 5, prompt: 'Design a numerical stability audit checklist for a new deep learning model. Cover: activation ranges, loss computation, gradient norms, precision choices, and specific tests you would run. Explain what you would monitor during the first few training steps.' },
        ],
        homework: [
          { id: 'hw-numerical-stability-1', type: 'multiple-choice', prompt: 'float32 provides approximately how many decimal digits of precision?', options: ['3', '7', '15', '32'], answer: '7', difficulty: 'easy' },
          { id: 'hw-numerical-stability-2', type: 'multiple-choice', prompt: 'The log-sum-exp trick prevents overflow by:', options: ['Using float64', 'Subtracting the maximum value before exponentiating', 'Clipping large values', 'Using integer arithmetic'], answer: 'Subtracting the maximum value before exponentiating', difficulty: 'easy' },
          { id: 'hw-numerical-stability-3', type: 'numeric', prompt: 'Using the log-sum-exp trick: compute $\\log(e^{100} + e^{101} + e^{102})$. First subtract $c = 102$, then compute $\\log(e^{-2} + e^{-1} + e^0) + 102$. Round to 2 decimal places.', answer: 102.41, tolerance: 0.01, difficulty: 'medium' },
          { id: 'hw-numerical-stability-4', type: 'free-response', prompt: 'A matrix has a condition number $\\kappa = 10^{12}$. Explain what this means for solving $Ax = b$, how many digits of accuracy you can expect in float64, and propose two methods to improve the conditioning for a machine learning application.', hint: 'With float64 (15 digits) and $\\kappa = 10^{12}$, you lose about 12 digits, leaving only ~3 reliable digits. Consider preconditioning or regularization.', difficulty: 'hard' },
        ],
      }
    ]
  },

  // ===================== INFORMATION THEORY =====================
  {
    id: 'information-theory',
    title: 'Information Theory',
    icon: '🔮',
    description: 'Entropy, cross-entropy, and KL divergence — the theory behind loss functions.',
    lessons: [
      {
        id: 'entropy',
        title: 'Entropy',
        content: `
<h2>Entropy <span class="vi">Entropy / Độ hỗn loạn</span></h2>
<p>Entropy <span class="vi">entropy</span> measures the <strong>uncertainty</strong> <span class="vi">tính bất định</span> or <strong>information content</strong> <span class="vi">lượng thông tin</span> of a probability distribution. It tells you how "surprising" <span class="vi">bất ngờ</span> events from a distribution are on average.</p>

<h3>Shannon Entropy <span class="vi">Entropy Shannon</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$H(X) = -\\sum_{i=1}^{n} p(x_i) \\log_2 p(x_i)$$
</div>

<h3>Intuition <span class="vi">Trực giác</span></h3>
<ul>
  <li><strong>Fair coin</strong> <span class="vi">đồng xu công bằng</span>: $H = -0.5\\log_2(0.5) - 0.5\\log_2(0.5) = 1$ bit (maximum uncertainty <span class="vi">bất định cực đại</span>)</li>
  <li><strong>Biased coin</strong> <span class="vi">đồng xu lệch</span> (99% heads): $H \\approx 0.08$ bits (very predictable <span class="vi">rất dễ đoán</span>)</li>
  <li><strong>Certain outcome</strong> <span class="vi">kết quả chắc chắn</span>: $H = 0$ (no uncertainty at all)</li>
</ul>

<div class="concept-box definition">
  <div class="box-label">Key Insight <span class="vi">Hiểu biết then chốt</span></div>
  <p>Information of a single event <span class="vi">lượng tin của một sự kiện</span>: $I(x) = -\\log_2 P(x)$</p>
  <p>Rare events <span class="vi">sự kiện hiếm</span> carry more information. "Dog bites man" = low information. "Man bites dog" = high information.</p>
  <p>Entropy is the <strong>expected information</strong> <span class="vi">lượng tin kỳ vọng</span>: $H(X) = \\mathbb{E}[I(X)]$</p>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Decision trees</strong> <span class="vi">cây quyết định</span> split on the feature that maximizes <strong>information gain</strong> <span class="vi">độ lợi thông tin</span> (reduction in entropy)</li>
    <li><strong>Maximum entropy models</strong> <span class="vi">mô hình entropy cực đại</span> make the fewest assumptions beyond constraints</li>
    <li>Entropy measures how "confident" <span class="vi">tự tin / chắc chắn</span> a model's predictions are</li>
    <li>Used in <strong>active learning</strong> <span class="vi">học chủ động</span>: query the sample with highest prediction entropy</li>
  </ul>
</div>
`,
        quiz: [
          { q: 'A fair 8-sided die has entropy of:', options: ['2 bits', '3 bits', '8 bits', '1 bit'], answer: 1 },
          { q: 'Entropy is maximized when:', options: ['One outcome is certain', 'All outcomes are equally likely', 'There are few outcomes', 'Outcomes are dependent'], answer: 1 },
          { q: 'Decision trees use entropy to:', options: ['Calculate leaf values', 'Decide the best feature to split on', 'Set the tree depth', 'Prune branches'], answer: 1 },
        ],
        bloom: [
          { type: 'choice', level: 0, prompt: 'What is the entropy of a fair coin (in bits)?', options: ['0', '0.5', '1', '2'], answer: 2 },
          { type: 'numeric', level: 2, prompt: 'Calculate the entropy of a distribution where P(A)=0.75, P(B)=0.25 (in bits, use log base 2). Round to 2 decimals.', correctValue: 0.81, tolerance: 0.02 },
          { type: 'order', level: 3, prompt: 'Order these sources from lowest to highest entropy:', correctOrder: ['Biased coin (99% heads)', 'Biased coin (80% heads)', 'Fair coin', 'Fair 6-sided die', 'Fair 8-sided die'] },
          { type: 'explain', level: 4, prompt: 'A model predicts class A with 99% confidence but is wrong. Does this indicate low or high entropy in the prediction? Explain why overconfident wrong predictions are problematic.' },
          { type: 'open', level: 5, prompt: 'Design a simple experiment: pick 3 different probability distributions and calculate their entropy. Which real-world scenarios would each represent?' },
        ],
        homework: [
          { id: 'hw-entropy-1', type: 'numeric', prompt: 'Compute the entropy (in bits) of a fair 4-sided die. ($H = \\log_2 4$)', answer: 2, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-entropy-2', type: 'numeric', prompt: 'A biased coin has P(heads) = 0.9. Compute its entropy in bits. Round to 2 decimals.', answer: 0.47, tolerance: 0.02, difficulty: 'easy' },
          { id: 'hw-entropy-3', type: 'free-response', prompt: 'A decision tree node has 60 positive and 40 negative examples. Compute the entropy before splitting. If a split produces a left child (50 positive, 10 negative) and right child (10 positive, 30 negative), compute the weighted entropy after splitting and the information gain.', hint: 'Before: $H = -0.6\\log_2(0.6) - 0.4\\log_2(0.4)$. After: weighted average of children\'s entropies.', difficulty: 'medium' },
          { id: 'hw-entropy-4', type: 'free-response', prompt: 'In active learning, we query the sample with the highest prediction entropy. Explain why this strategy is effective: what does high entropy in a model\'s prediction tell us, and how does labeling high-entropy samples improve the model most efficiently? Connect this to information theory.', hint: 'High entropy = high uncertainty = the model is most confused about this sample. Labeling it provides the most information.', difficulty: 'hard' },
        ],
      },
      {
        id: 'cross-entropy-kl',
        title: 'Cross-Entropy & KL Divergence',
        content: `
<h2>Cross-Entropy & KL Divergence <span class="vi">Entropy chéo & Phân kỳ KL</span></h2>
<p>These are the core concepts behind classification loss functions <span class="vi">hàm mất mát phân loại</span>.</p>

<h3>Cross-Entropy <span class="vi">Entropy chéo</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$H(p, q) = -\\sum_{i} p(x_i) \\log q(x_i)$$
  <p style="text-align:left; margin-top:0.5rem;">$p$ = true distribution <span class="vi">phân phối thực</span>, $q$ = predicted distribution <span class="vi">phân phối dự đoán</span></p>
</div>

<p>Cross-entropy measures the average number of bits needed to encode data from $p$ using a code optimized for $q$. If $q$ matches $p$ perfectly, cross-entropy equals entropy.</p>

<h3>Binary Cross-Entropy <span class="vi">Entropy chéo nhị phân</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\mathcal{L} = -[y \\log(\\hat{y}) + (1-y)\\log(1-\\hat{y})]$$
</div>
<p>This is THE loss function for binary classification <span class="vi">phân loại nhị phân</span> (logistic regression <span class="vi">hồi quy logistic</span>, binary classifiers).</p>

<h3>KL Divergence <span class="vi">Phân kỳ KL (Kullback-Leibler)</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$D_{KL}(p \\| q) = \\sum_{i} p(x_i) \\log \\frac{p(x_i)}{q(x_i)} = H(p, q) - H(p)$$
</div>

<div class="concept-box definition">
  <div class="box-label">Key Properties <span class="vi">Tính chất quan trọng</span></div>
  <ul>
    <li>$D_{KL} \\geq 0$ always — non-negative <span class="vi">luôn không âm</span> (Gibbs' inequality <span class="vi">bất đẳng thức Gibbs</span>)</li>
    <li>$D_{KL} = 0$ iff $p = q$ <span class="vi">bằng 0 khi và chỉ khi p = q</span></li>
    <li>$D_{KL}(p\\|q) \\neq D_{KL}(q\\|p)$ — NOT symmetric <span class="vi">KHÔNG đối xứng</span> (not a true distance <span class="vi">không phải khoảng cách thực sự</span>)</li>
  </ul>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Cross-entropy loss</strong> <span class="vi">hàm mất mát entropy chéo</span> is the standard classification loss. Minimizing cross-entropy = minimizing KL divergence (since $H(p)$ is constant).</li>
    <li><strong>VAE loss</strong> <span class="vi">hàm mất mát VAE</span> includes $D_{KL}(q(z|x) \\| p(z))$ to keep the latent space <span class="vi">không gian ẩn</span> close to a Gaussian</li>
    <li><strong>Knowledge distillation</strong> <span class="vi">chưng cất kiến thức</span> minimizes KL divergence between teacher <span class="vi">mô hình giáo viên</span> and student <span class="vi">mô hình học sinh</span> predictions</li>
    <li><strong>Policy gradient (RL)</strong> <span class="vi">gradient chính sách (học tăng cường)</span>: PPO uses KL divergence to constrain policy updates <span class="vi">ràng buộc cập nhật chính sách</span></li>
  </ul>
</div>
`,
        quiz: [
          { q: 'Cross-entropy loss is used for:', options: ['Regression', 'Classification', 'Clustering', 'Dimensionality reduction'], answer: 1 },
          { q: 'KL divergence is:', options: ['Symmetric', 'Asymmetric', 'Always negative', 'A true distance metric'], answer: 1 },
          { q: 'Minimizing cross-entropy H(p,q) is equivalent to minimizing:', options: ['Entropy H(p)', 'KL divergence D_KL(p||q)', 'Variance', 'The prior'], answer: 1 },
        ],
        homework: [
          { id: 'hw-cross-entropy-kl-1', type: 'multiple-choice', prompt: 'KL divergence $D_{KL}(p \\| q)$ is:', options: ['Always negative', 'Always non-negative', 'Always symmetric', 'Always equal to 1'], answer: 'Always non-negative', difficulty: 'easy' },
          { id: 'hw-cross-entropy-kl-2', type: 'multiple-choice', prompt: 'Binary cross-entropy loss is used for:', options: ['Regression', 'Binary classification', 'Clustering', 'Dimensionality reduction'], answer: 'Binary classification', difficulty: 'easy' },
          { id: 'hw-cross-entropy-kl-3', type: 'free-response', prompt: 'True distribution $p = [0.7, 0.2, 0.1]$, predicted distribution $q = [0.5, 0.3, 0.2]$. Compute the cross-entropy $H(p, q) = -\\sum p_i \\log_2 q_i$. Then compute $H(p)$ and derive $D_{KL}(p \\| q) = H(p,q) - H(p)$.', hint: 'Compute each term: $-0.7\\log_2(0.5) - 0.2\\log_2(0.3) - 0.1\\log_2(0.2)$.', difficulty: 'medium' },
          { id: 'hw-cross-entropy-kl-4', type: 'free-response', prompt: 'In knowledge distillation, a student model is trained to minimize $D_{KL}(p_{teacher} \\| p_{student})$ using softened predictions (temperature $T > 1$). Explain: (1) why the KL divergence is asymmetric and what this means here, (2) why we soften predictions with temperature, and (3) how this differs from training the student on hard labels alone.', hint: 'Soft labels from the teacher contain "dark knowledge" — information about inter-class similarities that hard labels lack.', difficulty: 'hard' },
        ],
      },
      {
        id: 'mutual-information',
        title: 'Mutual Information',
        content: `
<h2>Mutual Information <span class="vi">Thông tin tương hỗ</span></h2>
<p>Mutual information measures how much knowing one variable <span class="vi">biến</span> tells you about another. It captures <strong>any</strong> dependency <span class="vi">phụ thuộc</span>, not just linear correlation <span class="vi">tương quan tuyến tính</span>.</p>

<h3>Prerequisite: Conditional & Joint Entropy <span class="vi">Entropy có điều kiện & Entropy đồng thời</span></h3>
<div class="concept-box definition">
  <div class="box-label">Definitions <span class="vi">Định nghĩa</span></div>
  <p><strong>Joint entropy</strong> <span class="vi">entropy đồng thời</span> — uncertainty of both variables together:</p>
  $$H(X, Y) = -\\sum_{x,y} P(x,y) \\log P(x,y)$$
  <p><strong>Conditional entropy</strong> <span class="vi">entropy có điều kiện</span> — remaining uncertainty in $X$ after observing $Y$:</p>
  $$H(X|Y) = -\\sum_{x,y} P(x,y) \\log P(x|y)$$
  <p>Chain rule <span class="vi">quy tắc chuỗi</span>: $H(X, Y) = H(X) + H(Y|X) = H(Y) + H(X|Y)$</p>
</div>

<h3>Definition of Mutual Information <span class="vi">Định nghĩa thông tin tương hỗ</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formulas <span class="vi">Công thức</span></div>
  $$I(X;Y) = H(X) - H(X|Y) = H(Y) - H(Y|X)$$
  <p style="text-align:left; margin-top:0.5rem;"><span class="vi">Thông tin tương hỗ = Entropy trước − Entropy còn lại sau khi biết biến kia</span></p>
  <p>Equivalently, MI is the KL divergence between the joint and the product of marginals:</p>
  $$I(X;Y) = D_{KL}\\big(P(X,Y) \\,\\|\\, P(X)P(Y)\\big) = \\sum_{x,y} P(x,y) \\log \\frac{P(x,y)}{P(x)P(y)}$$
</div>

<h3>Venn Diagram Relationships <span class="vi">Quan hệ biểu đồ Venn</span></h3>
<div class="concept-box definition">
  <div class="box-label">Entropy Venn Diagram <span class="vi">Biểu đồ Venn Entropy</span></div>
  <p>Think of $H(X)$ and $H(Y)$ as two overlapping circles:</p>
  <ul>
    <li>$H(X, Y)$ = total area of both circles (union) <span class="vi">toàn bộ diện tích</span></li>
    <li>$I(X; Y)$ = overlap (intersection) <span class="vi">phần chồng lấn</span></li>
    <li>$H(X|Y)$ = part of $H(X)$ circle NOT in the overlap <span class="vi">phần không chồng lấn</span></li>
    <li>$H(X, Y) = H(X) + H(Y) - I(X; Y)$ <span class="vi">giống công thức hợp của hai tập hợp</span></li>
  </ul>
</div>

<div class="concept-box formula">
  <div class="box-label">All Relationships <span class="vi">Tất cả quan hệ</span></div>
  $$I(X;Y) = H(X) + H(Y) - H(X,Y)$$
  $$H(X|Y) = H(X) - I(X;Y) = H(X,Y) - H(Y)$$
  $$H(Y|X) = H(Y) - I(X;Y) = H(X,Y) - H(X)$$
</div>

<h3>Key Properties <span class="vi">Tính chất quan trọng</span></h3>
<div class="concept-box definition">
  <div class="box-label">Properties <span class="vi">Tính chất</span></div>
  <ul>
    <li>$I(X;Y) \\geq 0$ always — non-negative <span class="vi">luôn không âm</span></li>
    <li>$I(X;Y) = 0$ iff $X$ and $Y$ are independent <span class="vi">bằng 0 khi và chỉ khi X, Y độc lập</span></li>
    <li>$I(X;Y) = I(Y;X)$ — symmetric <span class="vi">đối xứng</span> (unlike KL divergence!)</li>
    <li>$I(X;X) = H(X)$ — a variable shares all its information with itself</li>
    <li>$I(X;Y) \\leq \\min(H(X), H(Y))$ — MI cannot exceed the entropy of either variable</li>
  </ul>
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <ul>
    <li><strong>Feature selection</strong> <span class="vi">chọn đặc trưng</span>: Rank features by $I(X_j; Y)$ — features with high MI with the target are most informative. Unlike correlation, MI detects nonlinear dependencies <span class="vi">phụ thuộc phi tuyến</span>.</li>
    <li><strong>Decision trees</strong> <span class="vi">cây quyết định</span>: Information gain <span class="vi">lượng thông tin thu được</span> used in ID3/C4.5 is exactly $I(Y; X_{\\text{split}})$. Each split maximizes mutual information between the feature and the label.</li>
    <li><strong>InfoGAN</strong>: Maximizes $I(c; G(z, c))$ so that the latent code <span class="vi">mã ẩn</span> $c$ controls meaningful attributes in generated images.</li>
    <li><strong>Information Bottleneck</strong> <span class="vi">nút cổ chai thông tin</span>: A theory of deep learning that says optimal representations <span class="vi">biểu diễn tối ưu</span> compress $I(X; T)$ (discard noise) while preserving $I(T; Y)$ (keep useful information), where $T$ is the hidden layer.</li>
    <li><strong>Representation learning</strong> <span class="vi">học biểu diễn</span>: Contrastive methods (SimCLR, CLIP) implicitly maximize MI between different views of the same data. MI maximization encourages representations that capture shared information.</li>
  </ul>
</div>

<div class="concept-box warning">
  <div class="box-label">MI vs Correlation <span class="vi">MI so với Tương quan</span></div>
  <p>Pearson correlation $r$ only detects <strong>linear</strong> <span class="vi">tuyến tính</span> relationships. Mutual information detects <strong>any</strong> dependency. Example: if $Y = X^2$ and $X \\sim \\mathcal{N}(0,1)$, then $r = 0$ (no linear correlation) but $I(X;Y) > 0$ (clearly dependent).</p>
</div>
`,
        quiz: [
          { q: 'Mutual information $I(X;Y) = 0$ implies:', options: ['X and Y are perfectly correlated', 'X and Y are independent', 'X equals Y', 'X and Y have the same entropy'], answer: 1 },
          { q: 'Which formula relates MI to entropy?', options: ['$I(X;Y) = H(X) \\cdot H(Y)$', '$I(X;Y) = H(X) + H(Y) - H(X,Y)$', '$I(X;Y) = H(X) / H(Y)$', '$I(X;Y) = H(X,Y) + H(X) + H(Y)$'], answer: 1 },
          { q: 'Decision tree information gain is an application of:', options: ['Entropy alone', 'Mutual information', 'KL divergence', 'Cross-entropy'], answer: 1 },
        ],
        bloom: [
          { type: 'choice', level: 0, prompt: 'Mutual information $I(X;Y)$ is always:', options: ['Negative', 'Non-negative', 'Equal to 1', 'Greater than $H(X)$'], answer: 1 },
          { type: 'match', level: 1, prompt: 'Match each entropy quantity to its Venn diagram interpretation:', pairs: [['$H(X, Y)$', 'Total area of both circles (union)'], ['$I(X; Y)$', 'Overlap region (intersection)'], ['$H(X|Y)$', 'Part of H(X) not in overlap'], ['$H(X) + H(Y)$', 'Sum of both circles (double-counts overlap)']] },
          { type: 'numeric', level: 2, prompt: 'If $H(X) = 3$ bits, $H(Y) = 4$ bits, and $H(X,Y) = 5$ bits, what is $I(X;Y)$ in bits? (Use: $I(X;Y) = H(X) + H(Y) - H(X,Y)$)', correctValue: 2, tolerance: 0 },
          { type: 'order', level: 3, prompt: 'Order these quantities from smallest to largest for two dependent (non-independent) variables:', correctOrder: ['$I(X;Y)$ (the shared information)', '$H(X|Y)$ (uncertainty remaining after knowing Y)', '$H(X)$ (total uncertainty of X alone)', '$H(X,Y)$ (joint uncertainty of both)'] },
          { type: 'explain', level: 4, prompt: 'Explain why mutual information is a better feature selection criterion than Pearson correlation. Give a concrete example where correlation is 0 but mutual information is positive.' },
          { type: 'open', level: 5, prompt: 'Design a feature selection pipeline using mutual information for a classification task with 500 features and 10,000 samples. Address: (1) how to estimate MI from finite samples, (2) how to handle feature redundancy (two features both have high MI with the target but are copies of each other), and (3) how to decide the final number of features to keep.' },
        ],
        homework: [
          { id: 'hw-mutual-information-1', type: 'numeric', prompt: 'If $H(X) = 3$ bits, $H(Y) = 4$ bits, and $H(X,Y) = 5$ bits, what is $I(X;Y)$?', answer: 2, tolerance: 0, difficulty: 'easy' },
          { id: 'hw-mutual-information-2', type: 'multiple-choice', prompt: '$I(X; Y) = 0$ implies:', options: ['X and Y are perfectly correlated', 'X and Y are independent', 'X equals Y', 'X and Y have the same entropy'], answer: 'X and Y are independent', difficulty: 'easy' },
          { id: 'hw-mutual-information-3', type: 'free-response', prompt: 'Correlation between $X$ and $Y = X^2$ (where $X \\sim \\mathcal{N}(0,1)$) is zero. Explain why mutual information $I(X; Y) > 0$ despite zero correlation, and why this makes MI a better criterion for feature selection.', hint: 'Correlation only measures linear dependence. Knowing $X$ tells you exactly what $Y = X^2$ is, so they are clearly dependent.', difficulty: 'medium' },
          { id: 'hw-mutual-information-4', type: 'free-response', prompt: 'The Information Bottleneck principle says optimal representations $T$ should minimize $I(X; T)$ while maximizing $I(T; Y)$. Explain what each term means intuitively for a deep learning hidden layer: what does minimizing $I(X;T)$ achieve (compression/noise removal), and what does maximizing $I(T;Y)$ achieve (preserving task-relevant information)?', hint: 'Think of $T$ as the features learned by a hidden layer. $I(X;T)$ measures how much of the raw input is retained; $I(T;Y)$ measures how predictive the features are.', difficulty: 'medium' },
          { id: 'hw-mutual-information-5', type: 'free-response', prompt: 'Design a feature selection pipeline for a dataset with 1000 features and 10 classes using mutual information. Address: (1) how to estimate MI from finite samples (histogram vs. KDE vs. k-NN estimators), (2) how to handle redundancy between features (two features both informative but nearly identical), and (3) propose a greedy algorithm that accounts for both relevance and redundancy.', hint: 'Look into the MRMR (Minimum Redundancy Maximum Relevance) framework: select features that maximize $I(X_j; Y) - \\frac{1}{|S|}\\sum_{X_i \\in S} I(X_j; X_i)$.', difficulty: 'hard' },
        ],
      }
    ]
  }
];
