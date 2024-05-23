import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import menuIcon from "../assets/header_menu/bars.svg";
import CloseIcon from "../assets/header_menu/xmark.svg";
import BillingImg from "../assets/home_billing_img/BillingPic.jpg";
// import css styles 
import "../styles/homeStyles.css";
import homeStylesModule from "../styles/home.module.css";
// import footer homePage
import Footer from './Footer';


const Ul = styled.ul`
  display: flex;
  @media screen and (max-width: 757px) {
    display: ${props => props.open ? "none" : "flex"};
  }
`;

const HomePage = () => {
    const [headerIcon, setHeaderIcon] = useState(true);
    const [stored, setStored] = useState([]);

    useEffect(() => {
        const lists = localStorage.getItem('lists') || [];
        if (lists !== "" && lists !== null) {
            try {
                const storedList = JSON.parse(lists) || [];
                setStored(storedList);
            } catch (error) {
                console.error("Error parsing stored list:", error);
            }
        }
    }, []);

    const changeIcon = () => {
        const menuIconClass = document.querySelector(".menuIcon");
        const closeIconClass = document.querySelector(".closeIcon");

        if (headerIcon) {
            menuIconClass.style.display = "none";
            closeIconClass.style.display = "flex";
        } else {
            menuIconClass.style.display = "flex";
            closeIconClass.style.display = "none";
        }

        setHeaderIcon(!headerIcon);
    };

    return (
        <section className="homeWrapper">
            <header className="header">
                <nav className="wrapper_list_item">
                    <Ul open={headerIcon} className={`${headerIcon ? homeStylesModule.deactiveMenu : homeStylesModule.activeMenu} `}>
                        <Link className='px-3' to="/Login"> ورود </Link>
                        <Link className='px-3' to="/aboutUs">درباره ما</Link>
                    </Ul>
                    <section className="wrapp "></section>
                    <section className="wrapperIcons relative">
                        <img style={{ cursor: "pointer" }} className='menuIcon' onClick={changeIcon} src={menuIcon} alt="headerImage" width={30} />
                        <img style={{ cursor: "pointer", display: 'none' }} className='closeIcon' onClick={changeIcon} src={CloseIcon} alt="headerImage" width={30} />
                    </section>
                </nav>
            </header>

         

            <section className="wrapperContent p-8">
                <section className='home_intro'>
                    <p className='intro_content'>
                    با قبضتو، مدیریت پرداخت قبوض ساختمان شما آسان‌تر از همیشه خواهد بود. تنها با یک کلیک، قبض‌های مربوط به هزینه‌های مختلف ساختمان را به مستاجرین خود نمایش دهید. این سامانه به شما امکان می‌دهد تا تمامی قبوض را به صورت آنلاین و بدون دردسر مدیریت کنید. با استفاده از قبضتو، پرداخت‌ها به موقع انجام می‌شود و شفافیت مالی بیشتری خواهید داشت. همچنین، قابلیت ارسال یادآوری‌های خودکار برای مستاجرین نیز فراهم شده است. از هر نقطه و در هر زمان، قبض‌های ساختمان خود را به راحتی کنترل کنید. با قبضتو، نگرانی‌های پرداخت قبوض را فراموش کنید و وقت خود را به امور مهم‌تر اختصاص دهید.
                    </p>
                    
                </section>
                <section className='home_picture w-full'>
                    <img src={BillingImg} alt="Billing" width={"100%"} />
                </section>
              
            </section>

            <Footer />
        </section>
    );
};

export default HomePage;
