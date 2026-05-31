export type Locale = "ru" | "kz";

export const defaultLocale: Locale = "ru";

const translations = {
  ru: {
    // Navbar
    "nav.delivery": "🚚 Бесплатная доставка по городу при заказе от 10 кг!",
    "nav.catalog": "Каталог",
    "nav.admin": "Админ",
    "nav.login": "Войти",
    "nav.account": "Аккаунт",
    "nav.cart": "Корзина",
    "nav.search_placeholder": "Поиск товаров (например, куриное филе)",

    // Home page
    "home.badge": "Опт и Розница",
    "home.title": "Свежезамороженные продукты высшего качества",
    "home.subtitle":
      "Строгий контроль температуры -18°C от склада до вашей двери. Гарантия свежести.",
    "home.cta": "Смотреть каталог",
    "home.popular": "Популярные товары",
    "home.all_catalog": "Весь каталог →",
    "home.empty": "Каталог пуст. Настройте данные в админ-панели.",

    // Catalog
    "catalog.all_products": "Все товары",
    "catalog.catalog": "Каталог",
    "catalog.manufacturer": "Производитель",
    "catalog.products_count": "товаров",
    "catalog.empty": "В каталоге пока нет товаров",
    "catalog.search": "Поиск:",

    // Sort
    "sort.popular": "По популярности",
    "sort.price_asc": "Сначала дешевые",
    "sort.price_desc": "Сначала дорогие",

    // Product card
    "product.price_per_kg": "Цена за кг",
    "product.min_order": "Минимальный заказ —",
    "product.halal": "Халяль",
    "product.add_to_cart": "Добавить в корзину",

    // Product detail
    "product.back_to_catalog": "Назад в каталог",
    "product.category_label": "Категория:",
    "product.packaging_label": "Фасовка:",
    "product.min_order_label": "Минимальный заказ:",
    "product.description_label": "Описание:",
    "product.add_note": "При нажатии добавится 1 шт.",

    // Cart
    "cart.title": "Корзина",
    "cart.empty": "Ваша корзина пуста",
    "cart.browse": "Перейти в каталог",
    "cart.product": "Товар",
    "cart.price": "Цена",
    "cart.quantity": "Кол-во",
    "cart.total": "Итого",
    "cart.remove": "Удалить",
    "cart.summary": "Итого по заказу",
    "cart.items_count": "Товаров:",
    "cart.total_price": "Общая сумма:",
    "cart.checkout": "Оформить заказ",
    "cart.inactive_warning": "Некоторые товары из вашей корзины больше недоступны",

    // Auth
    "auth.login_title": "Вход",
    "auth.register_title": "Регистрация",
    "auth.email_label": "Email",
    "auth.password_label": "Пароль",
    "auth.confirm_password_label": "Подтвердите пароль",
    "auth.login_button": "Войти",
    "auth.register_button": "Создать аккаунт",
    "auth.no_account": "Нет аккаунта?",
    "auth.have_account": "Уже есть аккаунт?",
    "auth.register_link": "Создайте его здесь",
    "auth.login_link": "Войдите здесь",

    // Account
    "account.title": "Мой аккаунт",
    "account.welcome": "Добро пожаловать",
    "account.email_label": "Email:",
    "account.role_label": "Роль:",
    "account.logout": "Выйти",

    // Admin
    "admin.title": "Администрирование",
    "admin.overview": "Обзор",
    "admin.dashboard_desc": "Управление каталогом замороженных продуктов",
    "admin.products": "Товары",
    "admin.products_count": "Товары",
    "admin.categories": "Категории",
    "admin.manufacturers": "Производители",
    "admin.active_products": "активных",
    "admin.add_product": "Добавить товар",
    "admin.add_category": "Добавить категорию",
    "admin.add_manufacturer": "Добавить производителя",
    "admin.edit": "Редактировать",
    "admin.delete": "Удалить",
    "admin.edit_product": "Редактировать товар",
    "admin.new_product": "Новый товар",

    // Forms
    "form.name": "Название",
    "form.email": "Email",
    "form.password": "Пароль",
    "form.confirm_password": "Подтвердите пароль",
    "form.title": "Название",
    "form.description": "Описание",
    "form.category": "Категория",
    "form.manufacturer": "Производитель",
    "form.price": "Цена (за кг)",
    "form.min_order": "Минимальный заказ",
    "form.packaging": "Фасовка",
    "form.image_url": "URL изображения",
    "form.is_halal": "Халяль",
    "form.is_active": "Активен",
    "form.submit": "Сохранить",
    "form.cancel": "Отмена",
    "form.loading": "Загрузка...",
    "form.error": "Ошибка",
    "form.success": "Успешно сохранено",
  },
  kz: {
    // Navbar
    "nav.delivery": "🚚 10 кг-нан тапсырыс берсеңіз қала бойынша тегін жеткізу!",
    "nav.catalog": "Каталог",
    "nav.admin": "Әкімші",
    "nav.login": "Кіру",
    "nav.account": "Аккаунт",
    "nav.cart": "Себет",
    "nav.search_placeholder": "Тауар іздеу (мысалы, тауық филесі)",

    // Home page
    "home.badge": "Көтерме және Бөлшек",
    "home.title": "Жоғары сапалы тез мұздатылған өнімдер",
    "home.subtitle":
      "Қоймадан есігіңізге дейін -18°C температураны қатаң бақылау. Сапа кепілдігі.",
    "home.cta": "Каталогты қарау",
    "home.popular": "Танымал тауарлар",
    "home.all_catalog": "Бүкіл каталог →",
    "home.empty": "Каталог бос. Әкімші панелінде деректерді теңшеңіз.",

    // Catalog
    "catalog.all_products": "Барлық тауарлар",
    "catalog.catalog": "Каталог",
    "catalog.manufacturer": "Өндіруші",
    "catalog.products_count": "тауар",
    "catalog.empty": "Каталогта әзірше тауар жоқ",
    "catalog.search": "Іздеу:",

    // Sort
    "sort.popular": "Танымалдылық бойынша",
    "sort.price_asc": "Алдымен арзандары",
    "sort.price_desc": "Алдымен қымбаттары",

    // Product card
    "product.price_per_kg": "1 кг бағасы",
    "product.min_order": "Ең аз тапсырыс —",
    "product.halal": "Халал",
    "product.add_to_cart": "Себетке қосу",

    // Product detail
    "product.back_to_catalog": "Каталогқа оралу",
    "product.category_label": "Санат:",
    "product.packaging_label": "Қаптама:",
    "product.min_order_label": "Ең аз тапсырыс:",
    "product.description_label": "Сипаттама:",
    "product.add_note": "Басқанда 1 дана қосылады.",

    // Cart
    "cart.title": "Себет",
    "cart.empty": "Себетіңіз бос",
    "cart.browse": "Каталогқа өту",
    "cart.product": "Тауар",
    "cart.price": "Баға",
    "cart.quantity": "Саны",
    "cart.total": "Жиыны",
    "cart.remove": "Жою",
    "cart.summary": "Тапсырыс бойынша жиыны",
    "cart.items_count": "Тауарлар:",
    "cart.total_price": "Жалпы сома:",
    "cart.checkout": "Тапсырыс беру",
    "cart.inactive_warning": "Себеттің кейбір тауарлары енді қол жетімді емес",

    // Auth
    "auth.login_title": "Кіру",
    "auth.register_title": "Тіркеу",
    "auth.email_label": "Email",
    "auth.password_label": "Құпия сөз",
    "auth.confirm_password_label": "Құпия сөзді растау",
    "auth.login_button": "Кіру",
    "auth.register_button": "Аккаунт құру",
    "auth.no_account": "Аккаунтыңыз жоқ па?",
    "auth.have_account": "Аккаунтыңыз бар ма?",
    "auth.register_link": "Мына жерде құрыңыз",
    "auth.login_link": "Мына жерде кіріңіз",

    // Account
    "account.title": "Менің аккаунтым",
    "account.welcome": "Қош келдіңіз",
    "account.email_label": "Email:",
    "account.role_label": "Рөлі:",
    "account.logout": "Шығу",

    // Admin
    "admin.title": "Әкімші",
    "admin.overview": "Шолу",
    "admin.dashboard_desc": "Мұздатылған өнімдердің каталогын басқарыңыз",
    "admin.products": "Тауарлар",
    "admin.products_count": "Тауарлар",
    "admin.categories": "Санаттар",
    "admin.manufacturers": "Өндірушілер",
    "admin.active_products": "белсенді",
    "admin.add_product": "Тауар қосу",
    "admin.add_category": "Санат қосу",
    "admin.add_manufacturer": "Өндіруші қосу",
    "admin.edit": "Өңдеу",
    "admin.delete": "Жою",
    "admin.edit_product": "Тауарды өңдеу",
    "admin.new_product": "Жаңа тауар",

    // Forms
    "form.name": "Аты",
    "form.email": "Email",
    "form.password": "Құпия сөз",
    "form.confirm_password": "Құпия сөзді растау",
    "form.title": "Аты",
    "form.description": "Сипаттама",
    "form.category": "Санат",
    "form.manufacturer": "Өндіруші",
    "form.price": "Баға (1 кг-на)",
    "form.min_order": "Ең аз тапсырыс",
    "form.packaging": "Қаптама",
    "form.image_url": "Суреттің URL-адресі",
    "form.is_halal": "Халал",
    "form.is_active": "Белсенді",
    "form.submit": "Сақтау",
    "form.cancel": "Бас тарту",
    "form.loading": "Жүктеу...",
    "form.error": "Қате",
    "form.success": "Сәтті сақталды",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["ru"];

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.ru;
}

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] || translations.ru[key] || key;
}
