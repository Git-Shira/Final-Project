import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import AOS from 'aos';

import pic1 from "../../IMAGES/pic1.jpg";
import pic2 from "../../IMAGES/pic2.jpg";
import pic3 from "../../IMAGES/pic3.jpg";
import pic4 from "../../IMAGES/pic4.jpg";

import sushi1 from "../../IMAGES/s1.png";
import sushi2 from "../../IMAGES/s2.png";
import sushi3 from "../../IMAGES/s3.png";

import footer from "./home-footer.png";

import "./Home.css";

const Home = () => {
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        AOS.init();

        setInterval(() => {
            setImageIndex((imageIndex + 1) % images.length);
        }, 8000);
    }, [imageIndex]);

    const images = [
        pic1,
        pic2,
        pic3,
        pic4
    ];

    return (
        <div className="main">

            <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="true">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={pic1} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic2} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic3} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={pic4} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
                    {/* <span className="visually-hidden">Previous</span> */}
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    {/* <span className="carousel-control-next-icon" aria-hidden="true"></span> */}
                    {/* <span className="visually-hidden">Next</span> */}
                </button>
            </div>

            {/* <img src={images[imageIndex]}
                style={{ height: '650px', objectFit: 'cover', width: '100%' }}
            ></img> */}

            <div className="div-selector">
                <a href="#transition">
                    <div className="selector">
                        <i className="fa fa-angle-double-down" aria-hidden="true" style={{ color: "white" }}></i>
                    </div>
                </a>
            </div>

            <br /><br />

            <div className="container-fluid">


                <section className="my-container">


                    <p style={{ marginTop: 50 }}>
                        <div data-aos="fade-down"
                            data-aos-easing="linear"
                            data-aos-duration="500"
                        >
                            <h1 className="section-heading title" id="transition">אודות טריאקי</h1>
                        </div>

                        <div data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="1000">                        טריאקי מטבח אסייתי וסושי בר, רשת המציעה תפריט ייחודי על טהרת הסושי ומנות ספיישל מהמטבח האסייתי העשיר באווירה שלווה וחמימה של המזרח הרחוק, תוך שימוש בחומרי גלם איכותיים וטריים.
                        </div>
                        <br />
                        <div data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="1000">
                            בנוסף לחוויה המיוחדת במסעדות הרשת, טריאקי מגיעה עד בית הלקוח עם מנות אסייתיות ומגוון מגשי אירוח מפנקים .
                        </div>
                        <br />
                        <button className="button">
                            <Link to="/About" className="button-link">
                                קראו עוד
                            </Link>
                        </button>
                        <br /><br />
                    </p>


                </section>


                <section className="big-deal first-pic">

                </section>


                <section className="my-container">

                    <div data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="500"
                    >
                        <h1 className="section-heading title">תפריט</h1>
                    </div>
                    <p>
                        <div data-aos="flip-right"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="1000">
                            אנו מאמינים בשילוב אוכל טרי מחומרי גלם איכותיים ובחוויה קולינרית בלתי נשכחת. בתפריט שלנו תמצאו מגוון מנות מהמטבח האסיאתי וסושי טרי ומשובח.
                        </div>
                        <br />
                        <div data-aos="flip-right"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="1000">
                            בואו לגלות את הטעמים בסניפים או הזמינו משלוח ישירות עד הבית או העבודה.
                        </div>
                        <br />
                        <button className="button">
                            <Link to="/Menu" className="button-link">
                                תפריטים
                            </Link>
                        </button>
                        <br /><br />
                    </p>


                </section>


                <section className="big-deal sec-pic">

                </section>


                <section className="my-container">
                    <div data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="500"
                    >
                        <h1 className="section-heading title">סניפים</h1>
                    </div>
                    <p>
                        <div data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="1000">
                            בסניפי טריאקי תפגשו חוויה קולינרית בשילוב אווירה שלווה וחמימה של המזרח הרחוק. בכל אחד מסניפינו תהנו מתפריט אסיאתי וחומרי גלם איכותיים וטריים.
                        </div>
                        <br />
                        <div data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="1000">
                            מצאו את הסניף הקרוב אליכם ובואו להנות!
                        </div>
                        <br />
                        <button className="button">
                            <Link to="/Branches" className="button-link">
                                למציאת הסניף שלכם
                            </Link>
                        </button>
                        <br /><br />
                    </p>

                </section>

                <section className="my-container">
                    <img className="footer-pic" src={footer} alt="" />
                </section>


                <section className="my-container-img">
                    <img src={sushi1} alt="" className="s1" />
                    <img src={sushi2} alt="" className="s2" />
                    <img src={sushi3} alt="" className="s3" />
                </section>

                <h5 style={{ textAlign: "center", marginBottom: 50 }}>© כל הזכויות שמורות למסעדת טריאקי</h5>
            </div>
        </div>
    );

};

export default Home;