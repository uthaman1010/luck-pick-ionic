import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css';
import './Intro.css';
import Img1 from '../assets/briefcase.svg'
import Img2 from '../assets/office-chair.svg'
import Img3 from '../assets/telephone.svg'
import { IonButton } from '@ionic/react';

interface ContainerProps {
    onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
    const swiper = useSwiper()
    return <IonButton onClick={() => swiper.slideNext()} >{children}</IonButton>
}



const Intro: React.FC<ContainerProps> = ({ onFinish }) => {

    return (
        <Swiper>
            <SwiperSlide>
                <img src={Img1} alt="briefcase" />
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>
            <SwiperSlide>
                <img src={Img2} alt="office-chair" />
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>
            <SwiperSlide>
                <img src={Img3} alt="telephone" />
                <IonButton onClick={() => onFinish()}>Finish</IonButton>
            </SwiperSlide>
        </Swiper>
    );
};

export default Intro;