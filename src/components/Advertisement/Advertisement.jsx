import React from "react";
import style from './Advertisement.module.scss'

export const Advertisement = () => {

    return(
        <div className={style.Advertisement}>
            <div>
                <h1 style={{marginLeft:'15px',color:'white'}}>Здесь могла бы быть ваша реклама</h1>
            </div>
        </div>
    )
}