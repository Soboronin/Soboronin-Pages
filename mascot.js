// 右下の追従SDイラスト(全ページ共通: index / tools / portfolio / oc)
//
// ▼SDイラストの追加方法▼
// 下の配列にパスを追加してください(img/oc/キャラ名/ フォルダに画像を置く想定)
const sdImages = [
  'img/oc/soboronin/soboronin_sd_01.png',
  // 'img/oc/soboronin/soboronin_sd_02.png',
];

// ▼ページ側で候補を差し替えたい場合(oc.html のキャラ連動など)▼
// window.mascotGetPool = () => ['画像パス', ...]; を定義しておくと、上の配列の代わりに使われます。
// 世界観の切り替えなどで選び直したいときは window.updateMascot() を呼んでください。

document.addEventListener('DOMContentLoaded', function () {
  const mascotEl = document.getElementById('mascot');
  const mascotInner = document.querySelector('#mascot .mascot-inner');
  if (!mascotEl || !mascotInner) return;

  function randomTilt() {
    // -8deg 〜 8deg のランダムな傾き(ステッカーを適当に貼った感じ)
    const deg = (Math.random() * 16 - 8).toFixed(1);
    mascotEl.style.setProperty('--mascot-tilt', deg + 'deg');
  }

  function currentPool() {
    return typeof window.mascotGetPool === 'function' ? window.mascotGetPool() : sdImages;
  }

  // タップしたときの「ぽよん」。アニメーションを最初からやり直す
  function bounce() {
    mascotInner.classList.remove('mascot-tap');
    void mascotInner.offsetWidth; // 再トリガー用
    mascotInner.classList.add('mascot-tap');
  }
  mascotInner.addEventListener('animationend', function (e) {
    if (e.animationName === 'poyo-tap') mascotInner.classList.remove('mascot-tap');
  });

  function updateMascot() {
    const pool = currentPool();
    mascotInner.innerHTML = '';
    randomTilt();
    if (pool.length > 0) {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      const img = document.createElement('img');
      img.src = pick;
      img.alt = ''; // 装飾なので読み上げない
      img.width = 100; // 表示サイズはCSSで決まる。読み込み前に場所を確保するための指定
      img.height = 100;
      mascotInner.appendChild(img);
    } else {
      mascotInner.innerHTML = '<div class="mascot-placeholder"><span class="material-symbols-outlined" aria-hidden="true">pets</span></div>';
    }
  }
  window.updateMascot = updateMascot;

  mascotEl.addEventListener('click', function () {
    updateMascot();
    bounce();
  });
  updateMascot();

  // footerが画面内に入ってきたら、コンテンツに被らないようスッと下に隠れる
  const footerEl = document.querySelector('footer');
  if (footerEl && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        mascotEl.classList.toggle('mascot-hide', entry.isIntersecting);
      },
      { rootMargin: '0px 0px -12px 0px' }
    );
    observer.observe(footerEl);
  }
});
