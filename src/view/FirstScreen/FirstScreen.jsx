import React, { useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Img1 from '../../assets/images/FirstScreen/firstApple.webp'
import Img2 from '../../assets/images/FirstScreen/firstBook.webp'
import Img3 from '../../assets/images/FirstScreen/firstWriters.webp'
import Img4 from '../../assets/images/FirstScreen/firstMagnifier.webp'
import 'swiper/css';
import 'swiper/css/pagination';

import classes from './FirstScreen.module.scss';
import './FirstScreen.scss';
const FirstScreen = () => {
    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);
    return (
        <div className="spa_slider">
            <div className="swiper3" id="swiper3">
                <Swiper
                    loop={true}
                    ref={sliderRef}
                    spaceBetween={20}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    pagination={{
                        clickable: true,
                        el: '.sp3',
                    }}
                    
                    modules={[Pagination]}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                        },
                        980: {
                            slidesPerGroup: 1,
                        },
                    }}
                >
                    <SwiperSlide className={classes.slide}>
                        <div className={classes.slideImg}>
                            <img src={Img1} alt="" />
                        </div>
                        <div className={classes.title}>Свежие <br /> Новости</div>
                    </SwiperSlide>
                    <SwiperSlide className={classes.slide}>
                        <div className={classes.slideImg22}>
                            <img src={Img2} alt="" />
                        </div>
                        <div className={classes.title}>Интересная <br /> Литература</div>
                    </SwiperSlide>
                    <SwiperSlide className={classes.slide}>
                        <div className={classes.slideImg33}>
                            <img src={Img3} alt="" />
                        </div>
                        <div className={classes.title}>Пополярные <br /> Авторы</div>
                    </SwiperSlide>
                    <SwiperSlide className={classes.slide}>
                        <div className={classes.slideImg44}>
                            <img src={Img4} alt="" />
                        </div>
                        <div className={classes.title}>Удобное <br /> Чтение</div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div  className="special_nav spa_nav flex align-items-center justify-content-between">
                <div className="prev3" onClick={handlePrev}></div>
                <div className="swiper-pagination sp3"></div>
                <div className="next3" onClick={handleNext}></div>
            </div>
        </div>
    );
};
<style>
    
</style>
export default FirstScreen;
