import React from 'react';
import "../styles/footer.css";
import GithubIcon from "../assets/footer_icons/github.svg";

const Footer = () => {
    return (
        <section className='footer'>
            <div className='flex flex-col items-center py-8'>
                <h3>راه های ارتباطی</h3>
                <div className='flex flex-col items-center'>
                    <a href='https://github.com/mahan-dev'>
                        <img src={GithubIcon} className='footerIcon' alt="GitHub" width={25} />
                    </a>
                    <p>شماره تلفن : 09399649635</p>
                    <p>ایمیل: mahansoodbakhsh@yahoo.com </p>
                </div>
            </div>
        </section>
    );
};

export default Footer;
