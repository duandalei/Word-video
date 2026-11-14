/* Word Video · Service Worker
   目的：把整个站点（页面、字体、图标、163 个音频，共约 2.9MB）预缓存到本地，
   首次在线打开后即可离线使用，之后打开不再依赖 GitHub Pages 的网络速度。

   策略：
   - 页面导航：stale-while-revalidate（先用缓存秒开，后台再取新版）
   - 音频 / 字体 / 图标 / manifest：cache-first（命中即用，未命中再下载并写入缓存）

   发布内容后：更新下面列表，并把 VERSION 加 1。
   旧版本缓存在新版本激活时自动删除。
*/

const VERSION = "v5";
const CACHE_NAME = "word-video-" + VERSION;

// 11 个页面
const PAGES = [
  "index.html",
  "L1 Let’s go to the supermarket.html",
  "l10-my-best-friend.html",
  "l2-i-have-a-pet-cat.html",
  "l3-rain-rain-go-away.html",
  "l5-go-away-mosquito.html",
  "l6-row-your-boat.html",
  "l7-five-little-ducks.html",
  "l8-im-a-little-farmer.html",
  "l9-you-make-me-smile.html",
  "zoo.html"
];

const FONTS = [
  "fonts/baloo2-latin-ext.woff2",
  "fonts/baloo2-latin.woff2",
  "fonts/nunito-latin-ext.woff2",
  "fonts/nunito-latin.woff2"
];

const ICONS = [
  "icons/apple-touch-icon.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png"
];

// 163 个单词音频
const AUDIO = [
  "a-hen-house.mp3",
  "a-lotus-flower.mp3",
  "a-lotus-leaf.mp3",
  "alive.mp3",
  "all-the-farm-animals.mp3",
  "always.mp3",
  "an-adventure.mp3",
  "apple-seeds.mp3",
  "arm.mp3",
  "avocado.mp3",
  "baby-duckling.mp3",
  "best.mp3",
  "between-our-legs.mp3",
  "bite.mp3",
  "blood.mp3",
  "blow-bubbles.mp3",
  "boat.mp3",
  "body.mp3",
  "bottom.mp3",
  "bravery.mp3",
  "breathe.mp3",
  "broccoli.mp3",
  "brush-your-teeth-all-by-yourself.mp3",
  "bump.mp3",
  "cabbage.mp3",
  "carrots.mp3",
  "celery.mp3",
  "cherry.mp3",
  "chin.mp3",
  "collect-the-eggs.mp3",
  "come-again-another-day.mp3",
  "come-back.mp3",
  "corn.mp3",
  "crocodile.mp3",
  "doctor.mp3",
  "dream.mp3",
  "ducklings.mp3",
  "eighteen.mp3",
  "elephant.mp3",
  "eleven.mp3",
  "experience-a-farm-s-day.mp3",
  "fall-off.mp3",
  "far-away.mp3",
  "fast-and-quick.mp3",
  "feed.mp3",
  "feet.mp3",
  "fifteen.mp3",
  "flip-the-leaves.mp3",
  "fluffy-kitty.mp3",
  "forget.mp3",
  "fourteen.mp3",
  "fresh-milk.mp3",
  "from.mp3",
  "gently.mp3",
  "get-up-by-yourself-after-falling.mp3",
  "go-fishing.mp3",
  "go-out-one-day.mp3",
  "go-square-dancing.mp3",
  "go-sunbathing.mp3",
  "go-swimming.mp3",
  "got.mp3",
  "grow.mp3",
  "hand.mp3",
  "happy-and-sweet.mp3",
  "hare.mp3",
  "harvest-the-crop.mp3",
  "have-a-picnic.mp3",
  "have.mp3",
  "head.mp3",
  "how-creative.mp3",
  "hungry-kitty.mp3",
  "in-the-pond.mp3",
  "joy.mp3",
  "jungle.mp3",
  "kangaroo.mp3",
  "kindness.mp3",
  "kiwi-fruit.mp3",
  "knee.mp3",
  "leave.mp3",
  "little-ball-of-fur.mp3",
  "look-outside.mp3",
  "lots-of-leaves.mp3",
  "mean.mp3",
  "merrily.mp3",
  "milk-the-cow.mp3",
  "miss-him.mp3",
  "monkey.mp3",
  "mosquito.mp3",
  "mouse.mp3",
  "my-best-friend.mp3",
  "naughty-kitty.mp3",
  "nineteen.mp3",
  "nose.mp3",
  "open-the-curtain.mp3",
  "over-the-hills.mp3",
  "owl.mp3",
  "parents.mp3",
  "penguin.mp3",
  "pet.mp3",
  "photo.mp3",
  "pick-the-vegetables.mp3",
  "pineapple.mp3",
  "play-all-day-together.mp3",
  "play-basketball.mp3",
  "play-with-a-water-gun.mp3",
  "play-with-sand.mp3",
  "pretty.mp3",
  "proud.mp3",
  "pumpkin.mp3",
  "puppy.mp3",
  "purr.mp3",
  "put-on-your-shoes.mp3",
  "quiet-kitty.mp3",
  "rain.mp3",
  "rainy.mp3",
  "red-pepper.mp3",
  "roar.mp3",
  "row.mp3",
  "sapling.mp3",
  "scream.mp3",
  "seventeen.mp3",
  "share-your-strawberry.mp3",
  "shining-moments.mp3",
  "shoulder.mp3",
  "sixteen.mp3",
  "smile.mp3",
  "snake.mp3",
  "so-lucky.mp3",
  "so-much.mp3",
  "soft-kitty.mp3",
  "soil.mp3",
  "sprout.mp3",
  "squeak.mp3",
  "squirrel.mp3",
  "start.mp3",
  "stomp.mp3",
  "stream.mp3",
  "strong-and-brave.mp3",
  "sunny.mp3",
  "sunshine.mp3",
  "swing.mp3",
  "take-good-care-of.mp3",
  "tall-and-strong.mp3",
  "tell-me.mp3",
  "thirsty-kitty.mp3",
  "thirteen.mp3",
  "thunder.mp3",
  "tiny-kitty.mp3",
  "tiny.mp3",
  "toe.mp3",
  "tomato.mp3",
  "trusted-adult.mp3",
  "twelve.mp3",
  "twenty.mp3",
  "unique.mp3",
  "waddle.mp3",
  "warm-kitty.mp3",
  "windy.mp3",
  "work-hard.mp3",
  "world.mp3",
  "yarn.mp3",
  "young-and-thin.mp3",
  "zoo.mp3"
].map(function (name) { return "audio/" + name; });

const PRECACHE = ["./", "manifest.json", "sw-register.js"].concat(PAGES, FONTS, ICONS, AUDIO);

// 这些后缀的请求走 cache-first
const CACHE_FIRST = /\.(?:mp3|woff2|png|jpe?g|svg|ico|json|js|css)$/i;

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // 单个文件失败不影响整体安装；没缓存到的会在首次使用时再写入
      return Promise.all(PRECACHE.map(function (url) {
        return cache.add(url).catch(function () {});
      }));
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key.indexOf("word-video-") === 0 && key !== CACHE_NAME;
      }).map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(staleWhileRevalidate(request));
  } else if (CACHE_FIRST.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
  }
});

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const network = fetch(request).then(function (response) {
    if (response && response.status === 200) cache.put(request, response.clone());
    return response;
  }).catch(function () {
    return null;
  });

  if (cached) return cached;

  const fresh = await network;
  if (fresh) return fresh;

  const home = await cache.match("index.html");
  if (home) return home;

  return new Response("离线状态，这个页面还没有缓存。", {
    status: 503,
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response && response.status === 200) cache.put(request, response.clone());
  return response;
}
