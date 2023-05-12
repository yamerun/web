import React,{useState,useEffect,useRef} from "react";
import style from './Notflications.module.scss'


export const Notflications = () => {
    return(
        <div style={{color:'white'}}>
            <div>
            <div>
                <p>Выслать уведомление на E-MAIL</p> <input/>
            </div>
            <div>
                <p>Обмен курсом менее</p> <input/> 
            </div>
            <div>
                <p>И доступным резервом не меннее </p> <input/>
            </div>
            <div>
                <p>Заявка будет аннулирована через:</p> <div>
                    <input/>
                    <nav>
                       <ul>
                        <li>6 часов</li>
                        <li>12 часов</li>
                        <li>24 часа</li>
                        <li>Неделя</li>
                        <li>Месяц</li>
                        <li>3 месяца</li>
                       </ul>
                    </nav>
                </div>
            </div>
            </div>
        </div>
    )
}