import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; 

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import images
import img1 from "../assets/Feature 1.png";
import img2 from "../assets/Feature 2.png";
import img3 from "../assets/Feature 3.png";

// Import arrow image
import Arrow from "../assets/Arrow.svg";

// Styled component for the carousel container
const Container = styled.div`
  width: 25vw;
  height: 70vh;

  @media (max-width: 70em) {
    height: 60vh;
  }

  @media (max-width: 64em) {
    height: 50vh;
    width: 30vw;
  }

  @media (max-width: 48em) {
    height: 50vh;
    width: 40vw;
  }

  @media (max-width: 30em) {
    height: 45vh;
    width: 60vw;
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    background-color: ${(props) => props.theme.carouselColor};
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
      margin-left:-8px;
      margin-top:-10px;
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${(props) => props.theme.text};
    width: 4rem;
    top: 80%;
    background-image: url(${Arrow});
    background-position: center;
    background-size: cover;
    &:after {
      display: none;
    }
  }

  .swiper-button-next {
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    transform: rotate(180deg);
  }

  @media (max-width: 64em) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 3rem;
    }
  }

  @media (max-width: 30em) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 2rem;
    }
  }
`;

const Carousel = () => {
  return (
    <Container>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true, // Make pagination clickable
        }}
        navigation={true}
        effect={"cards"}
        grabCursor={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img1} alt="Feature 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="Feature 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="Feature 3" />
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};


export default Carousel;