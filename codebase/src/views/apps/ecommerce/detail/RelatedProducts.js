// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import classnames from "classnames";
import { Star } from "react-feather";
import { CardText } from "reactstrap";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
// ** Styles
import "@styles/react/libs/swiper/swiper.scss";

const RelatedProducts = ({ relatedProds }) => {
  SwiperCore.use([Navigation]);

  // ** Slider params
  const params = {
    className: "swiper-responsive-breakpoints swiper-container px-4 py-2",
    slidesPerView: 5,
    spaceBetween: 55,
    navigation: true,
    breakpoints: {
      1600: {
        slidesPerView: 4,
        spaceBetween: 55,
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 55,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 55,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 55,
      },
    },
  };

  return (
    <Fragment>
      <div className="mt-4 mb-2 text-center">
        <h4>Productos Relacionados</h4>
        <CardText>Quizá te interesen estos productos</CardText>
      </div>
      <Swiper {...params}>
        {relatedProds.length > 0 &&
          relatedProds.map((slide) => {
            return (
              <SwiperSlide key={slide.id}>
                <Link
                  to={`/product-detail/${slide.id}`}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <div className="item-heading mb-2">
                    <h5 className="text-truncate mb-0">{slide.name}</h5>
                  </div>
                  <div className="img-container  mx-auto py-75">
                    <img src={slide.img} alt="swiper 1" className="img-fluid" />
                  </div>
                  <div className="item-meta mt-2">
                    <ul className="unstyled-list list-inline mb-25">
                      {new Array(5).fill().map((listItem, index) => {
                        return (
                          <li key={index} className="ratings-list-item mr-25">
                            <Star className="filled-star" />
                          </li>
                        );
                      })}
                    </ul>
                    <CardText className="text-primary mb-0">
                      S/{slide.price}
                    </CardText>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Fragment>
  );
};

export default RelatedProducts;
