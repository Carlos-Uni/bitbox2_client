import ItemElement from "./ItemElement";
import React, { useState } from "react";

const items = [
    {
        "id":1,
        "nombre":"Teléfono",
        "precio":65,
        "fecha":"2020-3-23",
        "estado":"Activo"
    },
    {
        "id":2,
        "nombre":"Juego",
        "precio":20,
        "fecha":"2010-8-13",
        "estado":"Activo"
    },
    {
        "id":3,
        "nombre":"Tenedor",
        "precio":40,
        "fecha":"2015-9-05",
        "estado":"Inactivo"
    },
];

export default function ItemTable(){

    const [prueba, setPrueba] = useState(0);
    
    function sumHandle() {
        setPrueba(prueba + 1);
    }

    return(

        <div className="item-list">
            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                </tr>
                    {items.map((item) => <ItemElement item={item} />)}
            </table>
            <button onClick={sumHandle}>Sumar</button>
            <h1>{prueba}</h1>
        </div>
    );
}