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
<div class="concept-box formula">
  <div class="box-label">Rules <span class="vi">Quy tắc</span></div>
  $$a^m \\cdot a^n = a^{m+n} \\qquad \\frac{a^m}{a^n} = a^{m-n}$$
  $$(a^m)^n = a^{mn} \\qquad a^0 = 1 \\qquad a^{-n} = \\frac{1}{a^n}$$
  $$(ab)^n = a^n b^n \\qquad a^{1/n} = \\sqrt[n]{a}$$
</div>

<div class="concept-box ml-context">
  <div class="box-label">ML Context <span class="vi">Ngữ cảnh ML</span></div>
  <p>Exponents appear in softmax ($e^{z_k}$), Gaussian distributions ($e^{-x^2}$), learning rate decay ($\\eta \\cdot 0.1^{\\text{epoch}/30}$), and computational complexity ($O(n^2)$ vs $O(n^3)$).</p>
</div>

<h3>Logarithm Rules <span class="vi">Quy tắc logarit</span></h3>
<div class="concept-box formula">
  <div class="box-label">Rules <span class="vi">Quy tắc</span></div>
  $$\\log(ab) = \\log a + \\log b \\qquad \\log\\frac{a}{b} = \\log a - \\log b$$
  $$\\log(a^n) = n \\log a \\qquad \\log_a b = \\frac{\\ln b}{\\ln a}$$
  $$\\ln(e^x) = x \\qquad e^{\\ln x} = x$$
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
<p>Key inequalities in ML:</p>
<ul>
  <li><strong>AM-GM</strong> <span class="vi">Trung bình cộng - Trung bình nhân</span>: $\\frac{a+b}{2} \\geq \\sqrt{ab}$</li>
  <li><strong>Cauchy-Schwarz</strong>: $|\\mathbf{a} \\cdot \\mathbf{b}| \\leq \\|\\mathbf{a}\\| \\|\\mathbf{b}\\|$ — proves cosine similarity is in $[-1, 1]$</li>
  <li><strong>Jensen's inequality</strong> <span class="vi">Bất đẳng thức Jensen</span>: For convex $f$: $f(\\mathbb{E}[X]) \\leq \\mathbb{E}[f(X)]$ — foundational for variational inference <span class="vi">suy luận biến phân</span></li>
</ul>
`,
        quiz: [
          { q: '$\\log(ab)$ equals:', options: ['$\\log a \\cdot \\log b$', '$\\log a + \\log b$', '$(\\log a)^b$', '$\\log a - \\log b$'], answer: 1 },
          { q: '$e^{\\ln 5}$ equals:', options: ['$e^5$', '$\\ln 5$', '$5$', '$5e$'], answer: 2 },
          { q: 'Why do we use log-likelihood instead of likelihood in ML?', options: ['Logs are faster to compute', 'Products become sums, preventing numerical underflow', 'Logs make the result larger', 'It is just a convention'], answer: 1 },
        ]
      },
      {
        id: 'functions',
        title: 'Functions & Graphs',
        content: `
<h2>Functions & Graphs <span class="vi">Hàm số & Đồ thị</span></h2>
<p>A function <span class="vi">hàm số</span> maps each input to exactly one output. Understanding function shapes is crucial for choosing activation functions <span class="vi">hàm kích hoạt</span> and loss functions.</p>

<h3>Key Concepts <span class="vi">Khái niệm chính</span></h3>
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

<h3>Function Composition <span class="vi">Hàm hợp</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$(f \\circ g)(x) = f(g(x))$$
</div>
<p>A neural network IS a composition of functions: $\\hat{y} = f_L \\circ f_{L-1} \\circ \\cdots \\circ f_1(\\mathbf{x})$</p>

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
        ]
      },
      {
        id: 'summation-notation',
        title: 'Summation & Product Notation',
        content: `
<h2>Summation & Product Notation <span class="vi">Ký hiệu tổng & tích</span></h2>
<p>ML papers use these constantly. You must read them fluently.</p>

<h3>Sigma Notation (Summation) <span class="vi">Ký hiệu Sigma (Phép tổng)</span></h3>
<div class="concept-box formula">
  <div class="box-label">Notation <span class="vi">Ký hiệu</span></div>
  $$\\sum_{i=1}^{n} a_i = a_1 + a_2 + \\cdots + a_n$$
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
<div class="concept-box definition">
  <div class="box-label">Rules <span class="vi">Quy tắc</span></div>
  $$\\sum_{i=1}^{n} (a_i + b_i) = \\sum a_i + \\sum b_i \\quad \\text{(linearity / tính tuyến tính)}$$
  $$\\sum_{i=1}^{n} c \\cdot a_i = c \\sum_{i=1}^{n} a_i \\quad \\text{(constant factor / hằng số)}$$
  $$\\sum_{i=1}^{n} c = n \\cdot c$$
</div>

<h3>Double Summation <span class="vi">Tổng kép</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\sum_{i=1}^{m} \\sum_{j=1}^{n} a_{ij} = \\text{sum over all elements of a matrix}$$
  <p style="text-align:left;"><span class="vi">Tổng tất cả phần tử của ma trận</span></p>
</div>

<h3>Pi Notation (Product) <span class="vi">Ký hiệu Pi (Phép tích)</span></h3>
<div class="concept-box formula">
  <div class="box-label">Notation <span class="vi">Ký hiệu</span></div>
  $$\\prod_{i=1}^{n} a_i = a_1 \\cdot a_2 \\cdots a_n$$
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
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  $$\\arg\\max_x f(x) = \\text{the value of } x \\text{ that maximizes } f(x)$$
  $$\\arg\\min_x f(x) = \\text{the value of } x \\text{ that minimizes } f(x)$$
  <p><span class="vi">argmax trả về giá trị $x$ làm $f(x)$ lớn nhất, argmin trả về giá trị $x$ làm $f(x)$ nhỏ nhất</span></p>
</div>
<p>Classification prediction: $\\hat{y} = \\arg\\max_k P(y = k | \\mathbf{x})$ — pick the class with highest probability <span class="vi">chọn lớp có xác suất cao nhất</span>.</p>
`,
        quiz: [
          { q: '$\\sum_{i=1}^{4} i^2$ equals:', options: ['10', '16', '30', '20'], answer: 2 },
          { q: 'Why do we convert $\\prod P(x_i)$ to $\\sum \\log P(x_i)$?', options: ['To make it differentiable', 'To avoid numerical underflow from multiplying tiny numbers', 'To increase accuracy', 'To speed up computation'], answer: 1 },
          { q: '$\\arg\\max$ returns:', options: ['The maximum value', 'The input that gives the maximum value', 'The index of the minimum', 'The derivative at the max'], answer: 1 },
        ]
      },
      {
        id: 'sets-logic',
        title: 'Sets, Logic & Proof',
        content: `
<h2>Sets, Logic & Proof <span class="vi">Tập hợp, Logic & Chứng minh</span></h2>
<p>These provide the language for precise mathematical statements in ML papers.</p>

<h3>Set Notation <span class="vi">Ký hiệu tập hợp</span></h3>
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
<table class="example-table">
  <tr><th>Symbol <span class="vi">Ký hiệu</span></th><th>Meaning <span class="vi">Ý nghĩa</span></th></tr>
  <tr><td>$\\forall$</td><td>for all <span class="vi">với mọi</span></td></tr>
  <tr><td>$\\exists$</td><td>there exists <span class="vi">tồn tại</span></td></tr>
  <tr><td>$\\implies$</td><td>implies <span class="vi">suy ra / kéo theo</span></td></tr>
  <tr><td>$\\iff$</td><td>if and only if <span class="vi">khi và chỉ khi</span></td></tr>
  <tr><td>s.t. / $|$</td><td>such that <span class="vi">sao cho</span></td></tr>
</table>

<h3>Common ML Notation <span class="vi">Ký hiệu ML thường gặp</span></h3>
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
`,
        quiz: [
          { q: '$x \\in \\mathbb{R}^3$ means $x$ is a:', options: ['3x3 matrix', 'Real number', 'Vector with 3 components', 'Set of 3 numbers'], answer: 2 },
          { q: 'The symbol $\\forall$ means:', options: ['There exists', 'For all', 'Implies', 'Belongs to'], answer: 1 },
          { q: 'In ML, $\\hat{y}$ typically denotes:', options: ['The true label', 'A prediction/estimate', 'A hyperparameter', 'The loss value'], answer: 1 },
        ]
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

<h3>Formal Definition <span class="vi">Định nghĩa hình thức</span></h3>
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>$f(n) = O(g(n))$ means there exist constants <span class="vi">hằng số</span> $c > 0$ and $n_0$ such that:</p>
  $$f(n) \\leq c \\cdot g(n) \\quad \\text{for all } n \\geq n_0$$
  <p><span class="vi">$f(n)$ tăng không nhanh hơn $g(n)$ khi $n$ đủ lớn.</span></p>
</div>

<h3>Common Complexities <span class="vi">Các độ phức tạp thường gặp</span></h3>
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

<h3>Simplification Rules <span class="vi">Quy tắc đơn giản hóa</span></h3>
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
        ]
      },
      {
        id: 'time-complexity-patterns',
        title: 'Time Complexity Patterns',
        content: `
<h2>Time Complexity Patterns <span class="vi">Các mẫu độ phức tạp thời gian</span></h2>
<p>Learn to instantly recognize the complexity of common code patterns <span class="vi">mẫu mã thường gặp</span>.</p>

<h3>O(1) — Constant <span class="vi">Hằng số</span></h3>
<div class="code-block">
<span class="comment">// Array access, hash lookup, math operation</span>
arr[i]                 <span class="comment">// O(1)</span>
hashMap.get(key)       <span class="comment">// O(1) average</span>
x = a + b * c          <span class="comment">// O(1)</span>
</div>

<h3>O(log n) — Logarithmic <span class="vi">Logarit</span></h3>
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

<h3>O(n) — Linear <span class="vi">Tuyến tính</span></h3>
<div class="code-block">
<span class="comment">// Single pass through data</span>
<span class="keyword">for</span> (i = <span class="number">0</span>; i < n; i++)    <span class="comment">// O(n)</span>
    total += arr[i]

<span class="comment">// Two pointers (still O(n))</span>
<span class="keyword">while</span> (left < right)       <span class="comment">// O(n) — each pointer moves at most n times</span>
</div>

<h3>O(n log n) — Log-linear</h3>
<div class="code-block">
<span class="comment">// Sorting, then one pass</span>
arr.sort()                 <span class="comment">// O(n log n)</span>
<span class="keyword">for</span> (x <span class="keyword">in</span> arr):           <span class="comment">// O(n)</span>
    binarySearch(x)        <span class="comment">// O(log n)</span>
<span class="comment">// Total: O(n log n)</span>
</div>

<h3>O(n²) — Quadratic <span class="vi">Bậc hai</span></h3>
<div class="code-block">
<span class="comment">// Nested loops over same data</span>
<span class="keyword">for</span> (i = <span class="number">0</span>; i < n; i++)        <span class="comment">// O(n)</span>
    <span class="keyword">for</span> (j = <span class="number">0</span>; j < n; j++)    <span class="comment">// × O(n) = O(n²)</span>
        <span class="keyword">if</span> (arr[i] + arr[j] == target) ...

<span class="comment">// Also O(n²): nested loop with j = i+1</span>
<span class="comment">// n*(n-1)/2 iterations ≈ O(n²)</span>
</div>

<h3>O(2ⁿ) — Exponential <span class="vi">Hàm mũ</span></h3>
<div class="code-block">
<span class="comment">// Recursive without memoization</span>
<span class="keyword">def</span> fib(n):
    <span class="keyword">if</span> n <= <span class="number">1</span>: <span class="keyword">return</span> n
    <span class="keyword">return</span> fib(n<span class="number">-1</span>) + fib(n<span class="number">-2</span>)  <span class="comment">// O(2ⁿ) — two branches per call</span>
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
        ]
      },
      {
        id: 'space-complexity',
        title: 'Space Complexity',
        content: `
<h2>Space Complexity <span class="vi">Độ phức tạp không gian</span></h2>
<p>Space complexity <span class="vi">độ phức tạp không gian</span> measures how much extra memory <span class="vi">bộ nhớ</span> your algorithm uses as input grows.</p>

<h3>What Counts <span class="vi">Những gì được tính</span></h3>
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

<h3>Space Optimization Tricks <span class="vi">Thủ thuật tối ưu không gian</span></h3>
<div class="concept-box definition">
  <div class="box-label">Techniques <span class="vi">Kỹ thuật</span></div>
  <ul>
    <li><strong>Rolling array</strong> <span class="vi">mảng cuộn</span>: If DP only needs previous row, use 2 rows instead of $n$ → $O(n) \\to O(1)$ rows</li>
    <li><strong>Bit manipulation</strong> <span class="vi">thao tác bit</span>: Store boolean sets in integers → $O(1)$ for up to 32/64 elements</li>
    <li><strong>In-place modification</strong> <span class="vi">sửa đổi tại chỗ</span>: Use input array as storage (mark visited with negative values)</li>
    <li><strong>Iterative > Recursive</strong> <span class="vi">lặp tốt hơn đệ quy</span>: Convert recursion to loop to avoid stack space</li>
  </ul>
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
        ]
      },
      {
        id: 'recurrences',
        title: 'Recurrences & Master Theorem',
        content: `
<h2>Recurrences & Master Theorem <span class="vi">Hệ thức truy hồi & Định lý thợ</span></h2>
<p>Many algorithms are recursive <span class="vi">đệ quy</span>. To find their time complexity, you solve a <strong>recurrence relation</strong> <span class="vi">hệ thức truy hồi</span>.</p>

<h3>Common Recurrences <span class="vi">Các hệ thức truy hồi thường gặp</span></h3>
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

<h3>Examples <span class="vi">Ví dụ</span></h3>
<div class="concept-box formula">
  <div class="box-label">Applying Master Theorem <span class="vi">Áp dụng định lý thợ</span></div>
  <p><strong>Merge sort</strong>: $T(n) = 2T(n/2) + O(n)$ → $a=2, b=2, d=1$ → $\\log_2 2 = 1 = d$ → Case 2: $O(n \\log n)$ ✓</p>
  <p><strong>Binary search</strong>: $T(n) = T(n/2) + O(1)$ → $a=1, b=2, d=0$ → $\\log_2 1 = 0 = d$ → Case 2: $O(\\log n)$ ✓</p>
  <p><strong>Strassen</strong>: $T(n) = 7T(n/2) + O(n^2)$ → $a=7, b=2, d=2$ → $\\log_2 7 \\approx 2.81 > 2$ → Case 1: $O(n^{2.81})$</p>
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
        ]
      },
      {
        id: 'amortized-complexity',
        title: 'Amortized & Special Cases',
        content: `
<h2>Amortized & Special Complexities <span class="vi">Độ phức tạp phân bổ & Trường hợp đặc biệt</span></h2>

<h3>Amortized Analysis <span class="vi">Phân tích phân bổ</span></h3>
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p><strong>Amortized</strong> <span class="vi">phân bổ</span> complexity: the average time per operation over a worst-case sequence <span class="vi">thời gian trung bình mỗi thao tác trong chuỗi xấu nhất</span>. NOT average case — it's a guarantee.</p>
</div>

<table class="example-table">
  <tr><th>Operation <span class="vi">Thao tác</span></th><th>Worst case</th><th>Amortized <span class="vi">Phân bổ</span></th><th>Why <span class="vi">Tại sao</span></th></tr>
  <tr><td>Dynamic array append <span class="vi">thêm vào mảng động</span></td><td>$O(n)$</td><td>$O(1)$</td><td>Resize doubles capacity <span class="vi">tăng gấp đôi dung lượng</span> → rare expensive ops</td></tr>
  <tr><td>Hash map insert</td><td>$O(n)$</td><td>$O(1)$</td><td>Rehashing is rare</td></tr>
  <tr><td>Union-Find (path + rank)</td><td>$O(\\log n)$</td><td>$O(\\alpha(n)) \\approx O(1)$</td><td>Inverse Ackermann <span class="vi">hàm Ackermann nghịch đảo</span></td></tr>
</table>

<h3>Best / Average / Worst Case <span class="vi">Trường hợp tốt nhất / trung bình / xấu nhất</span></h3>
<table class="example-table">
  <tr><th>Algorithm <span class="vi">Thuật toán</span></th><th>Best <span class="vi">Tốt nhất</span></th><th>Average <span class="vi">Trung bình</span></th><th>Worst <span class="vi">Xấu nhất</span></th></tr>
  <tr><td>Quick sort <span class="vi">sắp xếp nhanh</span></td><td>$O(n \\log n)$</td><td>$O(n \\log n)$</td><td>$O(n^2)$</td></tr>
  <tr><td>Hash table lookup</td><td>$O(1)$</td><td>$O(1)$</td><td>$O(n)$</td></tr>
  <tr><td>Binary search <span class="vi">tìm kiếm nhị phân</span></td><td>$O(1)$</td><td>$O(\\log n)$</td><td>$O(\\log n)$</td></tr>
  <tr><td>Insertion sort <span class="vi">sắp xếp chèn</span></td><td>$O(n)$</td><td>$O(n^2)$</td><td>$O(n^2)$</td></tr>
</table>

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
        ]
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
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  A <strong>scalar</strong> <span class="vi">vô hướng</span> is a single number. In ML, it could be a learning rate <span class="vi">tốc độ học</span>, a loss value <span class="vi">giá trị hàm mất mát</span>, or a single feature value <span class="vi">giá trị đặc trưng</span>.
  $$a \\in \\mathbb{R}$$
</div>

<h3>Vector <span class="vi">Vectơ</span></h3>
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

<h3>Matrix <span class="vi">Ma trận</span></h3>
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

<h3>Tensor <span class="vi">Ten-xơ</span></h3>
<p>A <strong>tensor</strong> <span class="vi">ten-xơ</span> generalizes to $n$ dimensions <span class="vi">chiều</span>. An image batch is a 4D tensor: (batch_size, height, width, channels).</p>
`,
        interactive: 'vectorPlot',
        quiz: [
          { q: 'A dataset with 1000 samples and 5 features is represented as a matrix of shape:', options: ['5 x 1000', '1000 x 5', '5000 x 1', '1 x 5000'], answer: 1 },
          { q: 'A single RGB image of size 28x28 is a tensor of shape:', options: ['28 x 28', '28 x 28 x 3', '3 x 28 x 28', 'Both B and C are valid'], answer: 3 },
          { q: 'The learning rate in gradient descent is a:', options: ['Vector', 'Matrix', 'Scalar', 'Tensor'], answer: 2 },
        ]
      },
      {
        id: 'matrix-operations',
        title: 'Matrix Operations',
        content: `
<h2>Matrix Operations <span class="vi">Các phép toán ma trận</span></h2>
<p>Understanding matrix operations is essential — they are the core computations <span class="vi">tính toán cốt lõi</span> in every ML model.</p>

<h3>Addition & Scalar Multiplication <span class="vi">Phép cộng & Nhân vô hướng</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$(\\mathbf{A} + \\mathbf{B})_{ij} = a_{ij} + b_{ij}$$
  $$(c\\mathbf{A})_{ij} = c \\cdot a_{ij}$$
</div>
<p>Matrices must have the same dimensions <span class="vi">cùng kích thước</span> to be added. Scalar multiplication scales every element.</p>

<h3>Matrix Multiplication <span class="vi">Phép nhân ma trận</span></h3>
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

<h3>Transpose <span class="vi">Chuyển vị</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$(\\mathbf{A}^T)_{ij} = a_{ji}$$
  $$(\\mathbf{AB})^T = \\mathbf{B}^T\\mathbf{A}^T$$
</div>
<p>Flips rows and columns. A matrix that equals its transpose ($\\mathbf{A} = \\mathbf{A}^T$) is called <strong>symmetric</strong> <span class="vi">ma trận đối xứng</span>.</p>

<h3>Dot Product <span class="vi">Tích vô hướng</span></h3>
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
`,
        interactive: 'matMul',
        quiz: [
          { q: 'If A is 3x4 and B is 4x2, what is the shape of AB?', options: ['3x2', '4x4', '3x4', 'Cannot multiply'], answer: 0 },
          { q: 'What does the dot product of two vectors measure?', options: ['Their sum', 'The angle and magnitude relationship', 'Their element-wise product', 'The cross product'], answer: 1 },
          { q: 'In a neural network layer y = Wx + b, if x has 256 features and y has 128 outputs, what is the shape of W?', options: ['256 x 128', '128 x 256', '128 x 128', '256 x 256'], answer: 1 },
        ]
      },
      {
        id: 'eigenvalues',
        title: 'Eigenvalues & Eigenvectors',
        content: `
<h2>Eigenvalues & Eigenvectors <span class="vi">Trị riêng & Vectơ riêng</span></h2>
<p>Eigenvalues and eigenvectors reveal the fundamental structure of linear transformations <span class="vi">phép biến đổi tuyến tính</span> — the directions that remain unchanged (only scaled) when a matrix is applied.</p>

<h3>Definition <span class="vi">Định nghĩa</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\mathbf{A}\\mathbf{v} = \\lambda \\mathbf{v}$$
  <p style="text-align:left; margin-top:0.5rem;">$\\mathbf{v}$ is an <strong>eigenvector</strong> <span class="vi">vectơ riêng</span> and $\\lambda$ is its corresponding <strong>eigenvalue</strong> <span class="vi">trị riêng</span>.</p>
</div>

<p>When matrix $\\mathbf{A}$ acts on eigenvector $\\mathbf{v}$, the result is simply $\\mathbf{v}$ scaled <span class="vi">co giãn</span> by $\\lambda$. The direction doesn't change — only the magnitude <span class="vi">độ lớn</span>.</p>

<h3>How to Find Them <span class="vi">Cách tìm trị riêng và vectơ riêng</span></h3>
<div class="concept-box definition">
  <div class="box-label">Method <span class="vi">Phương pháp</span></div>
  <p>Solve the <strong>characteristic equation</strong> <span class="vi">phương trình đặc trưng</span>:</p>
  $$\\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0$$
  <p>This gives you the eigenvalues $\\lambda_1, \\lambda_2, \\ldots$. Then substitute each $\\lambda_i$ back into $(\\mathbf{A} - \\lambda_i \\mathbf{I})\\mathbf{v} = 0$ to find eigenvectors.</p>
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
        ]
      },
      {
        id: 'norms',
        title: 'Norms & Distance Metrics',
        content: `
<h2>Norms & Distance Metrics <span class="vi">Chuẩn & Độ đo khoảng cách</span></h2>
<p>Norms <span class="vi">chuẩn</span> measure the "size" of a vector. Distance metrics <span class="vi">độ đo khoảng cách</span> measure how far apart two vectors are. Both are everywhere in ML.</p>

<h3>L1 Norm (Manhattan) <span class="vi">Chuẩn L1</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\|\\mathbf{x}\\|_1 = \\sum_{i=1}^{n} |x_i|$$
</div>

<h3>L2 Norm (Euclidean) <span class="vi">Chuẩn L2 (Ơ-clit)</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\|\\mathbf{x}\\|_2 = \\sqrt{\\sum_{i=1}^{n} x_i^2}$$
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
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$\\cos(\\theta) = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\|\\mathbf{a}\\|_2 \\; \\|\\mathbf{b}\\|_2}$$
</div>
<p>Ranges from -1 (opposite <span class="vi">ngược chiều</span>) to 1 (identical direction <span class="vi">cùng chiều</span>). It ignores magnitude and only considers direction — perfect for comparing documents or embeddings regardless of length.</p>
`,
        quiz: [
          { q: 'The L2 norm of vector [3, 4] is:', options: ['7', '5', '12', '25'], answer: 1 },
          { q: 'L1 regularization (Lasso) tends to produce:', options: ['Large weights', 'Sparse weights (many zeros)', 'Negative weights', 'Equal weights'], answer: 1 },
          { q: 'Cosine similarity measures:', options: ['Vector magnitude', 'Vector direction similarity', 'Vector sum', 'Vector product'], answer: 1 },
        ]
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

<h3>What is a Limit? <span class="vi">Giới hạn là gì?</span></h3>
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>$\\lim_{x \\to a} f(x) = L$ means as $x$ gets closer and closer to $a$, $f(x)$ gets closer and closer to $L$.</p>
  <p><span class="vi">Khi $x$ tiến tới $a$, $f(x)$ tiến tới $L$.</span></p>
</div>

<h3>Limit Rules <span class="vi">Quy tắc giới hạn</span></h3>
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

<h3>Continuity <span class="vi">Tính liên tục</span></h3>
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
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  <p>If $\\lim \\frac{f(x)}{g(x)}$ gives $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$, then:</p>
  $$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$$
  <p style="text-align:left;"><span class="vi">Thay thế bằng giới hạn của tỉ số đạo hàm.</span></p>
</div>
`,
        quiz: [
          { q: '$\\lim_{x \\to 0} \\frac{\\sin x}{x}$ equals:', options: ['0', '1', '$\\infty$', 'Undefined'], answer: 1 },
          { q: 'A function is continuous at $x = a$ if:', options: ['$f(a)$ exists', '$\\lim_{x \\to a} f(x) = f(a)$', '$f\'(a)$ exists', '$f(a) = 0$'], answer: 1 },
          { q: 'ReLU at $x = 0$ is:', options: ['Continuous and differentiable', 'Continuous but not differentiable', 'Differentiable but not continuous', 'Neither'], answer: 1 },
        ]
      },
      {
        id: 'derivatives',
        title: 'Derivatives & Partial Derivatives',
        content: `
<h2>Derivatives & Partial Derivatives <span class="vi">Đạo hàm & Đạo hàm riêng</span></h2>
<p>The derivative <span class="vi">đạo hàm</span> tells you the <strong>rate of change</strong> <span class="vi">tốc độ thay đổi</span> of a function — how the output changes as input changes. This is the foundation of all ML optimization <span class="vi">tối ưu hóa</span>.</p>

<h3>Derivative (Single Variable) <span class="vi">Đạo hàm một biến</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$f'(x) = \\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$
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
<div class="concept-box definition">
  <div class="box-label">Definition <span class="vi">Định nghĩa</span></div>
  <p>When $f$ depends on multiple variables <span class="vi">nhiều biến</span>, the <strong>partial derivative</strong> <span class="vi">đạo hàm riêng</span> $\\frac{\\partial f}{\\partial x_i}$ tells you how $f$ changes when only $x_i$ changes, with all other variables held constant <span class="vi">giữ các biến khác cố định</span>.</p>
  $$f(x, y) = x^2 + 3xy \\implies \\frac{\\partial f}{\\partial x} = 2x + 3y, \\quad \\frac{\\partial f}{\\partial y} = 3x$$
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
        ]
      },
      {
        id: 'chain-rule',
        title: 'Chain Rule & Backpropagation',
        content: `
<h2>Chain Rule & Backpropagation <span class="vi">Quy tắc dây chuyền & Lan truyền ngược</span></h2>
<p>The chain rule <span class="vi">quy tắc dây chuyền</span> is the single most important calculus concept for deep learning <span class="vi">học sâu</span> — it's how neural networks learn <span class="vi">mạng nơ-ron học</span>.</p>

<h3>Chain Rule <span class="vi">Quy tắc dây chuyền</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  <p>If $y = f(g(x))$ <span class="vi">hàm hợp</span>, then:</p>
  $$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx} \\quad \\text{where } u = g(x)$$
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

<div class="concept-box warning">
  <div class="box-label">Vanishing Gradient Problem <span class="vi">Vấn đề gradient biến mất</span></div>
  <p>The sigmoid derivative maxes out at 0.25. After chaining through many layers, gradients become vanishingly small: $0.25^{10} \\approx 0.000001$. This is why ReLU replaced sigmoid in deep networks <span class="vi">mạng sâu</span>.</p>
</div>
`,
        quiz: [
          { q: 'If $y = (3x+1)^5$, then $dy/dx$ equals:', options: ['$5(3x+1)^4$', '$15(3x+1)^4$', '$5 \\cdot 3x^4$', '$(3x+1)^4$'], answer: 1 },
          { q: 'Backpropagation is a direct application of:', options: ['Matrix decomposition', 'The chain rule', 'Bayes theorem', 'The central limit theorem'], answer: 1 },
          { q: 'The vanishing gradient problem occurs because:', options: ['Learning rates are too high', 'Repeated multiplication of small derivatives', 'Matrices are singular', 'Data is not normalized'], answer: 1 },
        ]
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
        ]
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
        ]
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
        ]
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

<h3>Basic Rules <span class="vi">Các quy tắc cơ bản</span></h3>
<div class="concept-box formula">
  <div class="box-label">Axioms <span class="vi">Tiên đề</span></div>
  $$0 \\leq P(A) \\leq 1$$
  $$P(\\Omega) = 1 \\quad \\text{(something must happen)} \\; \\text{\\small{— }} \\text{\\small{phải có điều gì đó xảy ra}}$$
  $$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$
</div>

<h3>Conditional Probability <span class="vi">Xác suất có điều kiện</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$
  <p style="text-align:left; margin-top:0.5rem;">The probability of A <em>given</em> <span class="vi">khi biết</span> that B has occurred.</p>
</div>

<h3>Independence <span class="vi">Tính độc lập</span></h3>
<p>Events <span class="vi">sự kiện</span> A and B are <strong>independent</strong> <span class="vi">độc lập</span> if $P(A \\cap B) = P(A) \\cdot P(B)$, meaning knowing B tells you nothing about A.</p>

<h3>Law of Total Probability <span class="vi">Công thức xác suất toàn phần</span></h3>
<div class="concept-box formula">
  <div class="box-label">Formula <span class="vi">Công thức</span></div>
  $$P(A) = \\sum_{i} P(A|B_i) P(B_i)$$
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
  }
];
