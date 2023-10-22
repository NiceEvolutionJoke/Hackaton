import React from 'react'
import classes from './HeaderBurger.module.scss';

function HeaderBurger() {
  return (
    <div>
        <div className={classes.HeaderBurgerPoint}>
            <ul>
                <li><span></span> Создать пост</li>
                <li><span></span> Выйти</li>
                <li><span></span> Главная</li>
                <li><span></span> Категории</li>
                <li><span></span> Статьи</li>
                <li><span></span> Контакты</li>
            </ul>
        </div>
    </div>
  )
}

export default HeaderBurger