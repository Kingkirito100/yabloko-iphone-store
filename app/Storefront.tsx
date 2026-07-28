"use client";

import { FormEvent, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  memory: string;
  color: string;
  price: number;
  oldPrice: number;
  image: string;
  tag: string;
  tone: string;
  specs: string[];
};

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 17 Pro",
    memory: "256 ГБ",
    color: "Cosmic Orange",
    price: 94990,
    oldPrice: 119990,
    image: "/catalog-iphone-17-pro.png",
    tag: "Выбор экспертов",
    tone: "orange",
    specs: ["6,3″ OLED · 120 Гц", "A19 Pro", "Камера 48+48+48 Мп", "До 33 ч видео"],
  },
  {
    id: 2,
    name: "iPhone 17",
    memory: "256 ГБ",
    color: "Black",
    price: 69990,
    oldPrice: 84990,
    image: "/iphone-17.png",
    tag: "Хит продаж",
    tone: "blue",
    specs: ["6,3″ OLED · 120 Гц", "A19", "Двойная камера 48 Мп", "До 30 ч видео"],
  },
  {
    id: 3,
    name: "iPhone Air",
    memory: "256 ГБ",
    color: "Cloud White",
    price: 74990,
    oldPrice: 94990,
    image: "/catalog-iphone-air.png",
    tag: "Самый тонкий",
    tone: "silver",
    specs: ["6,5″ OLED · 120 Гц", "Корпус 5,6 мм", "Камера 48 Мп", "Вес 165 г"],
  },
  {
    id: 4,
    name: "iPhone 17 Pro Max",
    memory: "256 ГБ",
    color: "Deep Blue",
    price: 104990,
    oldPrice: 134990,
    image: "/catalog-iphone-17-pro-max.png",
    tag: "Максимум",
    tone: "navy",
    specs: ["6,9″ OLED · 120 Гц", "A19 Pro", "Зум оптического качества 8×", "До 39 ч видео"],
  },
];

const rubles = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value) + " ₽";

export default function Storefront() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [favorite, setFavorite] = useState<number[]>([]);
  const [filter, setFilter] = useState("Все модели");
  const [orderDone, setOrderDone] = useState(false);

  const cartItems = products.filter((product) => cart[product.id]);
  const cartCount = Object.values(cart).reduce((sum, amount) => sum + amount, 0);
  const total = useMemo(
    () =>
      products.reduce(
        (sum, product) => sum + product.price * (cart[product.id] || 0),
        0,
      ),
    [cart],
  );

  const addToCart = (id: number) => {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setCartOpen(true);
  };

  const changeQuantity = (id: number, amount: number) => {
    setCart((current) => {
      const next = (current[id] || 0) + amount;
      const updated = { ...current };
      if (next <= 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });
  };

  const completeAuth = (event: FormEvent) => {
    event.preventDefault();
    setRegistered(true);
    setAuthOpen(false);
  };

  const completeOrder = (event: FormEvent) => {
    event.preventDefault();
    setOrderDone(true);
    setCart({});
  };

  return (
    <main>
      <div className="promo-strip">
        <span>Бесплатная доставка от 50 000 ₽</span>
        <span className="promo-center">Оригинальная техника · Гарантия 1 год</span>
        <span>Москва · 09:00–21:00</span>
      </div>

      <header className="header">
        <a className="brand" href="#top" aria-label="Яблоко, на главную">
          <span className="brand-mark">●</span>
          <span>яблоко</span>
        </a>
        <nav className="nav" aria-label="Основная навигация">
          <a href="#catalog">iPhone</a>
          <a href="#benefits">Доставка</a>
          <a href="#tradein">Trade‑in</a>
          <a href="#about">О магазине</a>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            onClick={() => setAuthOpen(true)}
            aria-label="Личный кабинет"
          >
            <span className="user-icon">⌾</span>
            <span className="action-label">{registered ? "Профиль" : "Войти"}</span>
          </button>
          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
            aria-label={`Корзина, товаров: ${cartCount}`}
          >
            <span>Корзина</span>
            <b>{cartCount}</b>
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Новая коллекция 2026</div>
          <h1>
            Твой новый
            <br />
            <em>iPhone.</em>
          </h1>
          <p>
            Только оригинальная техника Apple. Честные цены, быстрая доставка
            и забота после покупки.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#catalog">Выбрать iPhone <span>↘</span></a>
            <a className="text-link" href="#tradein">Узнать про Trade‑in <span>→</span></a>
          </div>
          <div className="hero-proof">
            <div className="avatars" aria-hidden="true"><i>А</i><i>М</i><i>К</i></div>
            <div><strong>4,9 из 5</strong><span>по 1 240 отзывам</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-halo" />
          <span className="float-pill pill-top">A19 Pro <small>Новый уровень мощности</small></span>
          <img src="/catalog-iphone-17-pro.png" alt="iPhone 17 Pro без фоновой подложки" />
          <span className="float-pill pill-bottom">от 94 990 ₽ <small>или 7 916 ₽ / мес.</small></span>
          <span className="vertical-note">СОЗДАН ДЛЯ БОЛЬШЕГО</span>
        </div>
      </section>

      <section className="ticker" aria-label="Преимущества магазина">
        <span>Оригинальная техника</span><b>✦</b>
        <span>Быстрая доставка</span><b>✦</b>
        <span>Гарантия 1 год</span><b>✦</b>
        <span>Оплата при получении</span>
      </section>

      <section className="catalog section" id="catalog">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Каталог</span>
            <h2>Выбери свой iPhone</h2>
          </div>
          <p>Все модели новые, неактивированные и проходят проверку перед отправкой.</p>
        </div>
        <div className="filters">
          {["Все модели", "iPhone 17", "Pro", "Air"].map((item) => (
            <button
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {products
            .filter((product) =>
              filter === "Все модели"
                ? true
                : filter === "Pro"
                  ? product.name.includes("Pro")
                  : product.name.includes(filter),
            )
            .map((product) => (
              <article className="product-card" key={product.id}>
                <div className={`product-image ${product.tone}`}>
                  <span className="product-tag">{product.tag}</span>
                  <button
                    className={`heart ${favorite.includes(product.id) ? "liked" : ""}`}
                    onClick={() =>
                      setFavorite((current) =>
                        current.includes(product.id)
                          ? current.filter((id) => id !== product.id)
                          : [...current, product.id],
                      )
                    }
                    aria-label="Добавить в избранное"
                  >
                    ♥
                  </button>
                  <img src={product.image} alt={`${product.name}, ${product.color}`} />
                </div>
                <div className="product-info">
                  <div className="product-title-row">
                    <div><h3>{product.name}</h3><span>{product.memory} · {product.color}</span></div>
                    <div className="color-dot" aria-label={`Цвет ${product.color}`} />
                  </div>
                  <ul>
                    {product.specs.map((spec) => <li key={spec}>{spec}</li>)}
                  </ul>
                  <div className="price-row">
                    <div><strong>{rubles(product.price)}</strong><del>{rubles(product.oldPrice)}</del></div>
                    <span>от {rubles(Math.ceil(product.price / 12))}/мес.</span>
                  </div>
                  <button className="buy-button" onClick={() => addToCart(product.id)}>
                    В корзину <span>＋</span>
                  </button>
                </div>
              </article>
            ))}
        </div>
        <p className="market-note">
          Цены ориентированы на предложения российского рынка на 28 июля 2026 года
          и могут меняться. Финальная стоимость фиксируется при оформлении.
        </p>
      </section>

      <section className="compare-band" id="tradein">
        <div>
          <span className="section-kicker light">Trade‑in</span>
          <h2>Обменяй старый.<br />Забери новый.</h2>
          <p>Оценим твой смартфон онлайн и вычтем его стоимость из покупки нового iPhone.</p>
          <button className="lime-button">Оценить устройство <span>→</span></button>
        </div>
        <div className="trade-card">
          <span>Ваша выгода</span>
          <strong>до 65 000 ₽</strong>
          <div className="trade-line"><span>iPhone 15 Pro 256 ГБ</span><b>− 58 000 ₽</b></div>
          <div className="trade-line"><span>iPhone 14 128 ГБ</span><b>− 31 000 ₽</b></div>
          <small>Предварительная оценка. Итог зависит от состояния.</small>
        </div>
      </section>

      <section className="benefits section" id="benefits">
        <div className="benefit"><b>01</b><span className="benefit-icon">↗</span><h3>Доставим быстро</h3><p>По Москве — день в день. По России — от 2 дней, курьером или в пункт выдачи.</p></div>
        <div className="benefit"><b>02</b><span className="benefit-icon">✓</span><h3>Проверим за тебя</h3><p>Проверяем серийный номер, комплектацию и состояние устройства до отправки.</p></div>
        <div className="benefit"><b>03</b><span className="benefit-icon">₽</span><h3>Оплата как удобно</h3><p>Картой онлайн, при получении или в рассрочку без переплаты на 12 месяцев.</p></div>
      </section>

      <footer id="about">
        <a className="brand footer-brand" href="#top"><span className="brand-mark">●</span><span>яблоко</span></a>
        <p>Магазин оригинальной техники Apple.<br />С любовью к деталям и людям.</p>
        <div><a href="#catalog">Каталог</a><a href="#benefits">Доставка и оплата</a><a href="#tradein">Trade‑in</a></div>
        <div><a href="tel:+74951234567">+7 495 123-45-67</a><a href="mailto:hello@yabloko.store">hello@yabloko.store</a></div>
        <small>© 2026 «Яблоко». Не является официальным сайтом Apple Inc.</small>
      </footer>

      {cartOpen && (
        <div className="overlay" onMouseDown={() => setCartOpen(false)}>
          <aside className="drawer" onMouseDown={(event) => event.stopPropagation()} aria-label="Корзина">
            <div className="modal-head"><div><span>Ваш заказ</span><h2>Корзина <b>{cartCount}</b></h2></div><button onClick={() => setCartOpen(false)}>×</button></div>
            {cartItems.length === 0 ? (
              <div className="empty-cart"><span>◎</span><h3>Пока пусто</h3><p>Добавьте iPhone из каталога — он появится здесь.</p><button onClick={() => setCartOpen(false)}>Перейти в каталог</button></div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((product) => (
                    <div className="cart-item" key={product.id}>
                      <img src={product.image} alt="" />
                      <div><h3>{product.name}</h3><span>{product.memory} · {product.color}</span><strong>{rubles(product.price)}</strong></div>
                      <div className="quantity"><button onClick={() => changeQuantity(product.id, -1)}>−</button><b>{cart[product.id]}</b><button onClick={() => changeQuantity(product.id, 1)}>+</button></div>
                    </div>
                  ))}
                </div>
                <div className="cart-delivery"><span>✓</span><div><strong>Доставка бесплатно</strong><small>Вы экономите 990 ₽</small></div></div>
                <div className="cart-total"><span>Итого</span><strong>{rubles(total)}</strong></div>
                <button className="checkout-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Оформить заказ <span>→</span></button>
                <small className="secure-note">Безопасная оплата · Данные защищены</small>
              </>
            )}
          </aside>
        </div>
      )}

      {authOpen && (
        <div className="overlay center" onMouseDown={() => setAuthOpen(false)}>
          <div className="modal auth-modal" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setAuthOpen(false)}>×</button>
            <span className="modal-logo">●</span>
            <h2>{registered ? "С возвращением" : "Создать аккаунт"}</h2>
            <p>Следите за заказами и получайте персональные предложения.</p>
            <form onSubmit={completeAuth}>
              <label>Ваше имя<input required placeholder="Алексей" /></label>
              <label>Телефон<input required type="tel" placeholder="+7 999 000-00-00" /></label>
              <label>E-mail<input required type="email" placeholder="name@example.ru" /></label>
              <button type="submit">Зарегистрироваться <span>→</span></button>
            </form>
            <small>Нажимая кнопку, вы принимаете условия обработки данных.</small>
          </div>
        </div>
      )}

      {checkoutOpen && (
        <div className="overlay center checkout-overlay" onMouseDown={() => setCheckoutOpen(false)}>
          <div className="modal checkout-modal" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setCheckoutOpen(false)}>×</button>
            {orderDone ? (
              <div className="order-success"><span>✓</span><h2>Заказ принят!</h2><p>Номер заказа <strong>ЯБ-260728</strong>. Мы отправили подтверждение и скоро свяжемся для уточнения доставки.</p><button onClick={() => { setOrderDone(false); setCheckoutOpen(false); }}>Вернуться в магазин</button></div>
            ) : (
              <>
                <div className="checkout-title"><span>Оформление</span><h2>Доставка и оплата</h2><p>{cartCount} товар · {rubles(total)}</p></div>
                <form className="checkout-form" onSubmit={completeOrder}>
                  <div className="form-section"><b>01</b><div><h3>Получатель</h3><div className="field-row"><label>Имя<input required placeholder="Ваше имя" /></label><label>Телефон<input required type="tel" placeholder="+7 999 000-00-00" /></label></div></div></div>
                  <div className="form-section"><b>02</b><div><h3>Способ получения</h3><div className="option-row"><label className="option"><input type="radio" name="delivery" defaultChecked /><span><strong>Курьером</strong><small>Завтра, бесплатно</small></span></label><label className="option"><input type="radio" name="delivery" /><span><strong>Самовывоз</strong><small>Сегодня после 17:00</small></span></label></div><label>Адрес доставки<input required placeholder="Город, улица, дом, квартира" /></label></div></div>
                  <div className="form-section"><b>03</b><div><h3>Оплата</h3><div className="option-row"><label className="option"><input type="radio" name="payment" defaultChecked /><span><strong>Картой онлайн</strong><small>МИР · Visa · Mastercard</small></span></label><label className="option"><input type="radio" name="payment" /><span><strong>При получении</strong><small>Картой или наличными</small></span></label></div></div></div>
                  <div className="checkout-summary"><span>К оплате</span><strong>{rubles(total)}</strong></div>
                  <button type="submit" className="checkout-button">Подтвердить заказ <span>→</span></button>
                  <small className="demo-note">Демонстрационный режим: банковская карта не списывается.</small>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
