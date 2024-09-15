import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  "All", "Music", "Source code", "Computer programming", "Mixes", "Live gaming",
  "Hans zimmer", "Annison", "Pandora", "Fire power", "Another one",
  "The greatest estate developer", "Lloyd", "One punch man", "South movies", "Anime"
];

export default function CategoryCarousel() {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) {
      swiper.on('slideChange', () => {
        setShowLeftArrow(swiper.activeIndex > 0);
        setShowRightArrow(swiper.activeIndex < swiper.slides.length - swiper.params.slidesPerView);
      });
    }
  }, []);

  return (
    <div className="fixed top-16 left-0 right-0 bg-[#0c0c0d] py-3 z-10">
      <div className="relative w-[70rem] mx-auto px-4">
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView="auto"
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="mySwiper"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="!w-auto">
              <button className="bg-[#272727] hover:bg-[#3f3f3f] text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                {category}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        {showLeftArrow && (
          <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#0f0f0f] to-transparent pl-4 pr-2 py-4 z-10">
            <img src="chevronLeft.svg" alt="" />
          </button>
        )}
        {showRightArrow && (
          <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-[#0f0f0f] to-transparent pr-4 pl-2 py-4 z-10">
            <img src="chevronRight.svg" alt="" />
          </button>
        )}
      </div>
    </div>
  );
}