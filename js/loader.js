(function () {
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  const num = document.getElementById('loaderNum');
  if (!loader) return;

  const MIN_TIME = 1500;            // แสดงอย่างน้อยกี่ ms (ปรับได้)
  const start = performance.now();
  let pageLoaded = false;
  let shown = 0;

  window.addEventListener('load', () => { pageLoaded = true; });

  function tick(now) {
    const elapsed = now - start;

    // ค้างที่ 90% จนกว่าหน้าเว็บจะโหลดเสร็จและครบเวลาขั้นต่ำ
    const target = (pageLoaded && elapsed >= MIN_TIME)
      ? 100
      : Math.min(90, (elapsed / MIN_TIME) * 90);

    shown += (target - shown) * 0.1;   // ค่อย ๆ วิ่งเข้าหาเป้าหมายให้ดูนุ่ม
    const value = Math.min(100, Math.round(shown));

    num.textContent = value;
    bar.style.transform = 'scaleX(' + (value / 100) + ')';

    if (shown >= 99.5) {
      finish();
    } else {
      requestAnimationFrame(tick);
    }
  }

  function finish() {
    num.textContent = 100;
    bar.style.transform = 'scaleX(1)';
    loader.classList.add('is-done');

    setTimeout(() => {
      document.body.classList.remove('is-loading');
      loader.remove();
      document.dispatchEvent(new Event('loader:done')); // ใช้เริ่มอนิเมชันอื่นต่อได้
    }, 900);
  }

  requestAnimationFrame(tick);
})();