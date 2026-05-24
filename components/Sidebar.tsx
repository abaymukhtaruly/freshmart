"use client";

import { useState } from "react";

export default function Sidebar() {
  const [activeCategory, setActiveCategory] = useState("chicken");

  return (
    <aside className="w-[240px] flex-shrink-0 space-y-8">
      <div>
        <h3 className="font-bold text-lg mb-4 text-text-primary">Каталог</h3>
        <ul className="space-y-3">
          <li className={`category-dropdown ${activeCategory === "chicken" ? "active" : ""}`}>
            <div
              className="flex items-center justify-between cursor-pointer group"
              onClick={() => setActiveCategory(activeCategory === "chicken" ? "" : "chicken")}
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold transition-colors ${activeCategory === "chicken" ? "text-primary" : "text-text-primary group-hover:text-primary"}`}>
                  Куриная продукция
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-lg transition-transform duration-200 chevron-icon ${activeCategory === "chicken" ? "text-primary" : "text-muted"}`}
                style={{ transform: activeCategory === "chicken" ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                expand_more
              </span>
            </div>
            {activeCategory === "chicken" && (
              <ul className="pl-4 space-y-2 border-l-2 border-primary/20 ml-2 mt-2">
                <li><a className="text-sm text-primary font-medium cursor-pointer">Целая птица</a></li>
                <li><a className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">Разделка</a></li>
                <li><a className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">Субпродукты</a></li>
                <li><a className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">Фарш и полуфабрикаты</a></li>
                <li><a className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">Суповые наборы</a></li>
              </ul>
            )}
          </li>

          <li className={`category-dropdown ${activeCategory === "meat" ? "active" : ""}`}>
            <div
              className="flex items-center justify-between cursor-pointer group"
              onClick={() => setActiveCategory(activeCategory === "meat" ? "" : "meat")}
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold transition-colors ${activeCategory === "meat" ? "text-primary" : "text-text-primary group-hover:text-primary"}`}>
                  Мясная продукция
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-lg transition-transform duration-200 chevron-icon ${activeCategory === "meat" ? "text-primary" : "text-muted"}`}
                style={{ transform: activeCategory === "meat" ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                expand_more
              </span>
            </div>
            {activeCategory === "meat" && (
              <ul className="pl-4 space-y-2 border-l-2 border-primary/20 ml-2 mt-2">
                <li><a className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">Индейка</a></li>
                <li><a className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">Утка</a></li>
                <li><a className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">Фарш</a></li>
                <li><a className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">Колбасные изделия</a></li>
              </ul>
            )}
          </li>

          <li className={`category-dropdown ${activeCategory === "fish" ? "active" : ""}`}>
            <div
              className="flex items-center justify-between cursor-pointer group"
              onClick={() => setActiveCategory(activeCategory === "fish" ? "" : "fish")}
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold transition-colors ${activeCategory === "fish" ? "text-primary" : "text-text-primary group-hover:text-primary"}`}>
                  Рыбная продукция
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-lg transition-transform duration-200 chevron-icon ${activeCategory === "fish" ? "text-primary" : "text-muted"}`}
                style={{ transform: activeCategory === "fish" ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                expand_more
              </span>
            </div>
            {activeCategory === "fish" && (
              <ul className="pl-4 space-y-2 border-l-2 border-primary/20 ml-2 mt-2">
                <li><a className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">Семга</a></li>
                <li><a className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">Другая рыба</a></li>
                <li><a className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">Морепродукты</a></li>
              </ul>
            )}
          </li>

          <li className={`category-dropdown ${activeCategory === "frozen" ? "active" : ""}`}>
            <div
              className="flex items-center justify-between cursor-pointer group"
              onClick={() => setActiveCategory(activeCategory === "frozen" ? "" : "frozen")}
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold transition-colors ${activeCategory === "frozen" ? "text-primary" : "text-text-primary group-hover:text-primary"}`}>
                  Замороженные продукты
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-lg transition-transform duration-200 chevron-icon ${activeCategory === "frozen" ? "text-primary" : "text-muted"}`}
                style={{ transform: activeCategory === "frozen" ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                expand_more
              </span>
            </div>
            {activeCategory === "frozen" && (
              <ul className="pl-4 space-y-2 border-l-2 border-primary/20 ml-2 mt-2">
                <li><a className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">Картофель</a></li>
                <li><a className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">Готовые полуфабрикаты</a></li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-4 text-text-primary">Производитель</h3>
        <ul className="space-y-3">
          {["УКПФ", "Алатау Кус", "Алель", "Кызылжар", "Мираторг"].map((manufacturer, i) => (
            <li key={i}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  defaultChecked={i === 0}
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4 accent-primary"
                  type="checkbox"
                />
                <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                  {manufacturer}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-4 text-text-primary">Цена за кг</h3>
        <div className="flex items-center gap-2">
          <input
            className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary text-text-primary"
            placeholder="От"
            type="number"
          />
          <span className="text-muted">-</span>
          <input
            className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary text-text-primary"
            placeholder="До"
            type="number"
          />
        </div>
      </div>
    </aside>
  );
}
