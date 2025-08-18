import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export function CategoryCarousel() {
  const categories = [
    "All",
    "Music",
    "Gaming",
    "Live",
    "Mixes",
    "Podcasts",
    "News",
    "Movies",
    "Coding",
    "UX Design",
    "Trending",
    "Recently Uploaded",
    "Watched",
    "Tech",
    "Food",
    "Comedy",
    "Vlogs",
    "Fashion",
    "DIY",
    "Education",
    "Motivation",
    "Fitness",
    "Sports",
    "Anime",
    "K-Pop",
    "Trailers",
    "History",
    "Science",
    "Photography",
    "ASMR",
    "Art",
    "Documentary",
    "Shorts",
  ];

  return (
    <Carousel className="mx-16">
      <CarouselContent className="-ml-1">
        {categories.map((category, index) => (
          <CarouselItem 
            key={index}
            className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/8"
          >
            <div className="p-1">
              <Button className="w-full p-0 h-full bg-gray-200 hover:bg-gray-300 transition-colors">
                <span className="text-md font-semibold">{category}</span>
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}