import React from 'react';
import "../../styles/AboutUs.css"; 

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <section className="about-us-header">
                <h1>درباره ما</h1>
                <p>ما اینجاییم تا بهترین خدمات را به شما ارائه دهیم.</p>
            </section>
            
            <section className="about-us-content">
                <h2>تماس با ما</h2>
                <p>شما میتوانید از طریق راه های ارتباطی زیر با ما در تماس باشید:</p>
                <ul>
                    <li>ایمیل: mahansoodbakhsh@yahoo.com</li>
                    <li>تلفن:  09399649635</li>
                    <li>نام : ماهان سودبخش</li>
                    <li>نام استاد : آقای جعفری</li>

                </ul>
            </section>
            
            <section className="about-us-team">
                <h2>تیم ما</h2>
                <p>ما یک تیم متشکل از متخصصان با تجربه هستیم که به ارائه خدمات با کیفیت بالا متعهد هستیم.</p>
            </section>
        </div>
    );
};

export default AboutUs;
