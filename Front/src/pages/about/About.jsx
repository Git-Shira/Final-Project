import React, { useEffect } from "react";

import AOS from 'aos';

import caption1 from "./caption1.jpg";
import caption2 from "./caption2.jpg";
import caption3 from "./caption3.jpg";
import caption4 from "./caption4.jpg";

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

import "./About.css";


const About = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="about" style={{ minHeight: 610 }}>

            <div className="title-design">
                <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
                <h1 data-aos="flip-down" data-aos-duration="1000">קצת עלינו</h1>
                <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
            </div>

            <p>
                <h5>
                    <strong>
                        רשת טריאקי מציעה תפריט ייחודי על טהרת הסושי ומנות ספיישל מהמטבח האסיאתי העשיר, באווירה שלווה וחמימה של המזרח הרחוק, תוך שימוש בחומרי גלם איכותיים וטריים.
                        בנוסף לחוויה המיוחדת במסעדות הרשת, טריאקי מגיעה עד בית הלקוח עם מנות אסייתיות ומגוון מגשי אירוח מפנקים.
                        <br /><br />
                        טריאקי מביאה את הטעמים, הצבעים והריחות של המטבח האסיאתי לכלל לקוחותיה, ומספקת חוויה קולינרית אמיתית המפעילה את כל החושים.
                        <br /><br />
                        טריאקי מגיעה אליכם!
                        <br />
                        <span style={{ color: "white" }}> שירות המשלוחים שלנו </span>זמין עבורכם בשעות הפעילות בכל סניפי הרשת
                    </strong>
                </h5>
            </p>

            <div className="gallery">
                <img src={caption1} className="caption1" alt="..." data-aos="zoom-in" data-aos-duration="500" />
                <img src={caption2} className="caption2" alt="..." data-aos="zoom-in" data-aos-duration="1000" />
                <img src={caption3} className="caption3" alt="..." data-aos="zoom-in" data-aos-duration="1500" />
                <img src={caption4} className="caption4" alt="..." data-aos="zoom-in" data-aos-duration="2000" />
            </div>
        </div>
    );
}

export default About;