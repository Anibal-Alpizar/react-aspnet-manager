import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import img1 from "../../../assets/landing/Home Image.png";
import img2 from "../../../assets/landing/Helping Hands.png";
import img3 from "../../../assets/landing/Inclusion.png";
import img4 from "../../../assets/landing/Volunteering.png";
import img5 from "../../../assets/landing/People HighFive.webp";
import arrow from "../../../icons/landing/Arrow.svg";

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
    padding-top: 2rem;
  }

  .swiper-slide {
    width: 100%;
    height: 100%;
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
    }
  }

  .swiper-slide img {
    max-width: 100%;
    max-height: 100%;
  }

  .swiper-button-next {
    color: ${(props) => props.theme.text};
    right: 0;
    top: 60%;
    width: 4rem;
    background-image: url(${arrow});
    background-position: center;
    background-size: cover;

    &:after {
      display: none;
    }

    @media (max-width: 64em) {
      width: 3rem;
    }

    @media (max-width: 30em) {
      width: 2rem;
    }
  }
  .swiper-button-prev {
    color: ${(props) => props.theme.text};
    right: 0;
    top: 60%;
    width: 4rem;
    transform: rotate(180deg);
    background-image: url(${arrow});
    background-position: center;
    background-size: cover;

    &:after {
      display: none;
    }

    @media (max-width: 64em) {
      width: 3rem;
    }

    @media (max-width: 30em) {
      width: 2rem;
    }
  }
`;

function Carousel() {
  return (
    <Container>
      <Container>
        <Swiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{
            type: "fraction",
          }}
          scrollbar={{ draggable: true }}
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={img1} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img2} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img3} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img4} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img5} />
          </SwiperSlide>
        </Swiper>
      </Container>
    </Container>
  );
}

export default Carousel;
