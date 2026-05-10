import React from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";

const Menu: React.FC = () => {
  return (
    <div className="menu-container">
      <h1>Інтерактивні лабораторні з фізики МНАУ</h1>
      <h2>Каталог лабораторних робіт</h2>

      <div className="module-section">
        <p className="module-title">Модуль 1, 2 "Механіка"</p>
        <div className="links-grid">
          <Link to="/pendulum" className="linkStyles">Математичний маятник</Link>
          <Link to="/young1" className="linkStyles">Модуль Юнга при згині балки</Link>
          <Link to="/young2" className="linkStyles">Модуль Юнга при розтягуванні дроту</Link>
          <Link to="/pitomaVaga" className="linkStyles">Визначення питомої ваги та густини тіла</Link>
          <Link to="/oberbek" className="linkStyles">Визначення моменту інерції маятника Обербека</Link>
        </div>
      </div>

      <div className="module-section">
        <p className="module-title">Модуль 3 "Молекулярна фізика"</p>
        <div className="links-grid">
          <Link to="/stocks" className="linkStyles">Визначення коефіцієнта в`язкості рідини методом Стокса</Link>
          <Link to="/poverx" className="linkStyles">Визначення коефіцієнта поверхневого натягу методом відриву краплі</Link>
          <Link to="/volog" className="linkStyles">Визначення вологості атмосферного повітря</Link>
          <Link to="/adiab" className="linkStyles">Визначення відношення молярних теплоємностей повітря методом адіабатичного розширення</Link>
          <Link to="/rozmel" className="linkStyles">Визначення коефіцієнта лінійного розширення металу</Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;