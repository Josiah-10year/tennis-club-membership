// import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Carousel } from 'react-responsive-carousel'
export default async function Home() {
  return (
    <div className="max-w-5xl justify-center mx-auto py-20">
      <img src="https://raw.githubusercontent.com/Josiah-10year/tennis-club-membership/master/app/images/tennis-club.jpg"></img>
      
            {/* <div className="max-w-5xl mx-auto py-20">
            <Carousel autoPlay infiniteLoop showArrows={true} showThumbs={false}>
            
            </Carousel> 
          </div> */}
      <h1 className="text-left py-8">St. Augustine Recreational Club</h1>
      <a href="/login">
      <button className="text-center">Member Login</button>
      </a>
      <p className="text-center">This is a recreational club which naturally beckons with its excellent location and easy access to all. Be it an intense workout on one of the four tennis courts or a relaxing evening at the restaurant.</p>
    </div>
   );
}