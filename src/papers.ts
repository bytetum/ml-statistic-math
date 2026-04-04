export interface Paper {
  title: string;
  authors: string;
  year: number;
  tier: 1 | 2 | 3;
  tierLabel: string;
  url: string;
  description: string;
  prerequisites: Array<{ topicId: string; lessonId: string; label: string }>;
}

export const PAPERS: Paper[] = [
  // Tier 1: Essentials
  {
    title: 'Learning representations by back-propagating errors',
    authors: 'Rumelhart, Hinton, Williams',
    year: 1986,
    tier: 1,
    tierLabel: 'Essential',
    url: 'https://www.cs.toronto.edu/~hinton/absps/naturebp.pdf',
    description: 'The paper that made neural networks trainable. Introduces backpropagation — computing gradients through a network via the chain rule.',
    prerequisites: [
      { topicId: 'calculus', lessonId: 'derivatives', label: 'Derivatives' },
      { topicId: 'calculus', lessonId: 'chain-rule', label: 'Chain Rule & Backprop' },
      { topicId: 'calculus', lessonId: 'gradients', label: 'Gradients & Jacobians' },
      { topicId: 'linear-algebra', lessonId: 'matrix-operations', label: 'Matrix Operations' },
    ],
  },
  {
    title: 'Support-Vector Networks',
    authors: 'Cortes, Vapnik',
    year: 1995,
    tier: 1,
    tierLabel: 'Essential',
    url: 'https://courses.cs.washington.edu/courses/cse546/19au/lectures/SVM_cortes_vapnik.pdf',
    description: 'Introduces SVMs — finding the maximum-margin hyperplane for classification using constrained optimization.',
    prerequisites: [
      { topicId: 'linear-algebra', lessonId: 'norms', label: 'Norms & Distance' },
      { topicId: 'linear-algebra', lessonId: 'orthogonality-projections', label: 'Projections & Least Squares' },
      { topicId: 'optimization', lessonId: 'constrained-optimization', label: 'Lagrange Multipliers' },
      { topicId: 'statistics', lessonId: 'bias-variance', label: 'Bias-Variance Tradeoff' },
    ],
  },
  {
    title: 'Random Forests',
    authors: 'Breiman',
    year: 2001,
    tier: 1,
    tierLabel: 'Essential',
    url: 'https://www.stat.berkeley.edu/~breiman/randomforest2001.pdf',
    description: 'Ensemble of decision trees using bagging and random feature selection. Surprisingly effective and interpretable.',
    prerequisites: [
      { topicId: 'probability', lessonId: 'probability-basics', label: 'Probability Fundamentals' },
      { topicId: 'information-theory', lessonId: 'entropy', label: 'Entropy' },
      { topicId: 'statistics', lessonId: 'bias-variance', label: 'Bias-Variance Tradeoff' },
    ],
  },
  // Tier 2: Deep Learning Revolution
  {
    title: 'Adam: A Method for Stochastic Optimization',
    authors: 'Kingma, Ba',
    year: 2015,
    tier: 2,
    tierLabel: 'Deep Learning',
    url: 'https://arxiv.org/abs/1412.6980',
    description: 'The most popular optimizer in deep learning. Combines momentum with adaptive learning rates using first and second moment estimates.',
    prerequisites: [
      { topicId: 'optimization', lessonId: 'gradient-descent', label: 'Gradient Descent' },
      { topicId: 'optimization', lessonId: 'advanced-optimizers', label: 'Adam & Advanced Optimizers' },
      { topicId: 'probability', lessonId: 'expectation-variance', label: 'Expectation & Variance' },
    ],
  },
  {
    title: 'Dropout: A Simple Way to Prevent Neural Networks from Overfitting',
    authors: 'Srivastava, Hinton, Krizhevsky, Sutskever, Salakhutdinov',
    year: 2014,
    tier: 2,
    tierLabel: 'Deep Learning',
    url: 'https://jmlr.org/papers/v15/srivastava14a.html',
    description: 'Randomly zeroing neurons during training as regularization. Connects to ensemble methods and Bayesian approximation.',
    prerequisites: [
      { topicId: 'probability', lessonId: 'probability-basics', label: 'Probability Fundamentals' },
      { topicId: 'probability', lessonId: 'expectation-variance', label: 'Expectation & Variance' },
      { topicId: 'optimization', lessonId: 'regularization', label: 'Regularization' },
      { topicId: 'statistics', lessonId: 'bias-variance', label: 'Bias-Variance Tradeoff' },
    ],
  },
  {
    title: 'Batch Normalization: Accelerating Deep Network Training',
    authors: 'Ioffe, Szegedy',
    year: 2015,
    tier: 2,
    tierLabel: 'Deep Learning',
    url: 'https://arxiv.org/abs/1502.03167',
    description: 'Normalizing layer inputs by batch statistics. Dramatically stabilizes and speeds up training.',
    prerequisites: [
      { topicId: 'statistics', lessonId: 'descriptive-stats', label: 'Mean & Variance' },
      { topicId: 'calculus', lessonId: 'chain-rule', label: 'Chain Rule & Backprop' },
      { topicId: 'probability', lessonId: 'multivariate-gaussian', label: 'Multivariate Gaussian' },
    ],
  },
  {
    title: 'Deep Residual Learning for Image Recognition',
    authors: 'He, Zhang, Ren, Sun',
    year: 2016,
    tier: 2,
    tierLabel: 'Deep Learning',
    url: 'https://arxiv.org/abs/1512.03385',
    description: 'Skip connections that enable training networks 100+ layers deep. Solves the vanishing gradient problem.',
    prerequisites: [
      { topicId: 'calculus', lessonId: 'chain-rule', label: 'Chain Rule & Backprop' },
      { topicId: 'calculus', lessonId: 'gradients', label: 'Gradients & Jacobians' },
      { topicId: 'calculus', lessonId: 'taylor-series', label: 'Taylor Series' },
    ],
  },
  {
    title: 'Generative Adversarial Nets',
    authors: 'Goodfellow, Pouget-Abadie, Mirza, Xu, Warde-Farley, Ozair, Courville, Bengio',
    year: 2014,
    tier: 2,
    tierLabel: 'Deep Learning',
    url: 'https://arxiv.org/abs/1406.2661',
    description: 'Two networks competing: a generator creates fake data, a discriminator tries to detect it. Revolutionized generative modeling.',
    prerequisites: [
      { topicId: 'information-theory', lessonId: 'cross-entropy-kl', label: 'Cross-Entropy & KL Divergence' },
      { topicId: 'statistics', lessonId: 'mle', label: 'Maximum Likelihood Estimation' },
      { topicId: 'optimization', lessonId: 'gradient-descent', label: 'Gradient Descent' },
    ],
  },
  // Tier 3: Transformers & Modern ML
  {
    title: 'Attention Is All You Need',
    authors: 'Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin',
    year: 2017,
    tier: 3,
    tierLabel: 'Modern ML',
    url: 'https://arxiv.org/abs/1706.03762',
    description: 'The Transformer architecture — self-attention replaces recurrence. Foundation of GPT, BERT, and all modern LLMs.',
    prerequisites: [
      { topicId: 'linear-algebra', lessonId: 'matrix-operations', label: 'Matrix Multiplication' },
      { topicId: 'linear-algebra', lessonId: 'norms', label: 'Norms & Cosine Similarity' },
      { topicId: 'foundations', lessonId: 'functions', label: 'Softmax Function' },
      { topicId: 'information-theory', lessonId: 'cross-entropy-kl', label: 'Cross-Entropy Loss' },
    ],
  },
  {
    title: 'Auto-Encoding Variational Bayes (VAE)',
    authors: 'Kingma, Welling',
    year: 2014,
    tier: 3,
    tierLabel: 'Modern ML',
    url: 'https://arxiv.org/abs/1312.6114',
    description: 'Learns a latent representation by encoding data into a Gaussian distribution and decoding it back. Foundation of modern generative models.',
    prerequisites: [
      { topicId: 'information-theory', lessonId: 'cross-entropy-kl', label: 'KL Divergence' },
      { topicId: 'probability', lessonId: 'bayes-theorem', label: 'Bayes\' Theorem' },
      { topicId: 'probability', lessonId: 'multivariate-gaussian', label: 'Multivariate Gaussian' },
      { topicId: 'statistics', lessonId: 'mle', label: 'MLE' },
      { topicId: 'statistics', lessonId: 'map-estimation', label: 'MAP Estimation' },
    ],
  },
  {
    title: 'LoRA: Low-Rank Adaptation of Large Language Models',
    authors: 'Hu, Shen, Wallis, Allen-Zhu, Li, Wang, Wang, Chen',
    year: 2022,
    tier: 3,
    tierLabel: 'Modern ML',
    url: 'https://arxiv.org/abs/2106.09685',
    description: 'Fine-tune billion-parameter models by learning low-rank weight updates. Makes LLM adaptation practical.',
    prerequisites: [
      { topicId: 'linear-algebra', lessonId: 'svd-decompositions', label: 'SVD & Low-Rank Approximation' },
      { topicId: 'linear-algebra', lessonId: 'matrix-operations', label: 'Matrix Operations' },
      { topicId: 'optimization', lessonId: 'gradient-descent', label: 'Gradient Descent' },
    ],
  },
  {
    title: 'Denoising Diffusion Probabilistic Models',
    authors: 'Ho, Jain, Abbeel',
    year: 2020,
    tier: 3,
    tierLabel: 'Modern ML',
    url: 'https://arxiv.org/abs/2006.11239',
    description: 'Learn to generate data by reversing a gradual noising process. Powers DALL-E, Stable Diffusion, and modern image generation.',
    prerequisites: [
      { topicId: 'probability', lessonId: 'multivariate-gaussian', label: 'Multivariate Gaussian' },
      { topicId: 'information-theory', lessonId: 'cross-entropy-kl', label: 'KL Divergence' },
      { topicId: 'probability', lessonId: 'bayes-theorem', label: 'Bayes\' Theorem' },
      { topicId: 'calculus', lessonId: 'integration', label: 'Integration' },
      { topicId: 'statistics', lessonId: 'mle', label: 'MLE' },
    ],
  },
];
