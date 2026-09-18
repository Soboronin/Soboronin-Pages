// 右下の追従SDイラスト(汎用版: index.html / tools.html / portfolio.html で使用)
// oc.html だけはキャラ連動の特別なロジックがあるので、そちらはページ内に直接書いてあります。
//
// ▼SDイラストの追加方法▼
// img/oc/sd/ フォルダに画像を置いて、下の配列にパスを追加してください
const sdImages = [
  'img/oc/soboronin/soboronin_sd_01.png',
  // 'img/oc/sd/tororo_sd02.png',
];

document.addEventListener('DOMContentLoaded', function () {
  const mascotEl = document.getElementById('mascot');
  const mascotInner = document.querySelector('#mascot .mascot-inner');
  if (!mascotEl || !mascotInner) return;

  function randomTilt() {
    // -8deg 〜 8deg のランダムな傾き(ステッカーを適当に貼った感じ)
    const deg = (Math.random() * 16 - 8).toFixed(1);
    mascotEl.style.setProperty('--mascot-tilt', deg + 'deg');
  }

  function updateMascot() {
    mascotInner.innerHTML = '';
    randomTilt();
    if (sdImages.length > 0) {
      const pick = sdImages[Math.floor(Math.random() * sdImages.length)];
      const img = document.createElement('img');
      img.src = pick;
      img.alt = 'OC SDイラスト';
      mascotInner.appendChild(img);
    } else {
      mascotInner.innerHTML = '<div class="mascot-placeholder"><span class="material-symbols-outlined">pets</span></div>';
    }
  }

  mascotEl.addEventListener('click', updateMascot);
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
