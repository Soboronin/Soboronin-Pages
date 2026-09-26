// 右下の追従SDイラスト(全ページ共通: index / tools / portfolio / oc)
//
// ▼SDイラストの追加方法▼
// 下の配列にパスを追加してください(img/oc/キャラ名/ フォルダに画像を置く想定)
const sdImages = [
  'img/oc/soboronin/soboronin_sd_01.webp',
  // 'img/oc/soboronin/soboronin_sd_02.webp',
];

// ▼ページ側で候補を差し替えたい場合(oc.html のキャラ連動など)▼
// window.mascotGetPool = () => ['画像パス', ...]; を定義しておくと、上の配列の代わりに使われます。
// 世界観の切り替えなどで選び直したいときは window.updateMascot() を呼んでください。

function initMascot() {
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
      // .webp が無いとき(まだ置いていないとき)は、同じ名前の .png を探す
      img.addEventListener('error', function () {
        if (/\.webp$/.test(img.src)) img.src = img.src.replace(/\.webp$/, '.png');
      });
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
  // OCページなど、window.afterFirstPaint があるページでは、最初の描画のあとに画像を出す
  // (最初の描画より前に画像を読み込み始めると、最初の表示が遅れるため)
  if (typeof window.afterFirstPaint === 'function') window.afterFirstPaint(updateMascot);
  else updateMascot();

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
}

// defer / async で読み込まれても動くように、読み込み済みなら、すぐ始める
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMascot);
else initMascot();

// --- 埋め込みブラウザ(Xアプリ内のカードプレビューなど)向けの強制再レイアウト対策 ---
// これらは、リンクを開くと下から出てくる「シート」状のブラウザで、ユーザーがシートを
// 指でドラッグして広げると、表示エリアの幅や高さがあとから変わることがある。
// その際に、ページ側のレイアウト計算が更新されず、最初に描画したときのサイズのまま
// 表示され続けてしまい、結果として内容が左右にずれて・切れて見えることがある
// (よくある症状: ナビゲーションや見出しの左側が見切れる)。
// この対策では、画面サイズが変わるたびに body を一瞬だけ描画から外して戻すことで、
// ブラウザに強制的にレイアウトをやり直させる(見た目には一瞬も見えない程度の処理)。
(function () {
  var pending = false;
  function forceReflow() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () {
      var prevDisplay = document.body.style.display;
      document.body.style.display = 'none';
      // このプロパティを読むことで、ブラウザに再計算を強制する
      void document.body.offsetHeight;
      document.body.style.display = prevDisplay;
      pending = false;
    });
  }
  window.addEventListener('resize', forceReflow);
  window.addEventListener('orientationchange', forceReflow);
  window.addEventListener('pageshow', forceReflow);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', forceReflow);
  }
})();
