import React from "react";

import caption1 from "./caption1.jpg";
import caption2 from "./caption2.jpg";
import caption3 from "./caption3.jpg";
import caption4 from "./caption4.jpg";

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

import "./About.css";


const About = () => {


    return (
        <div className="about">

            <div className="title-design">
                <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
                <h1 data-aos="flip-down" data-aos-duration="1000">קצת עלינו</h1>
                <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
            </div>

            <p>
                רשת טריאקי מציעה תפריט ייחודי על טהרת הסושי ומנות ספיישל מהמטבח האסיאתי העשיר, באווירה שלווה וחמימה של המזרח הרחוק, תוך שימוש בחומרי גלם איכותיים וטריים.
                בנוסף לחוויה המיוחדת במסעדות הרשת, טריאקי מגיעה עד בית הלקוח עם מנות אסייתיות ומגוון מגשי אירוח מפנקים.
                <br /><br />
                טריאקי מביאה את הטעמים, הצבעים והריחות של המטבח האסיאתי לכלל לקוחותיה, ומספקת חוויה קולינרית אמיתית המפעילה את כל החושים.
                <br /><br />
                טריאקי מגיעה אליכם!
                <br />
                <span style={{ color: "#C1121F" }}> שירות המשלוחים שלנו </span>זמין עבורכם בשעות הפעילות בכל סניפי הרשת
            </p>

            <div className="gallery">
                <img src={caption1} class="caption1" alt="..." data-aos="zoom-in" data-aos-duration="500" />
                <img src={caption2} class="caption2" alt="..." data-aos="zoom-in" data-aos-duration="1000" />
                <img src={caption3} class="caption3" alt="..." data-aos="zoom-in" data-aos-duration="1500" />
                <img src={caption4} class="caption4" alt="..." data-aos="zoom-in" data-aos-duration="2000" />
            </div>
        </div>
    );
}

export default About;