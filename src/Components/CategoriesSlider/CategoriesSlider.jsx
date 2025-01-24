import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HashLoader } from "react-spinners";

export default function CategoriesSlider() {

    async function getCategories()
    {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    const {data, isLoading} = useQuery({
        queryKey: ['Categories'],
        queryFn: getCategories,
    });

    const CategoryData = data?.data.data;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          
        }
      }
    ]
  };

  if( isLoading )
    {
      return <><div style={{height: '250px'}} className='d-flex justify-content-center align-items-center bg-success-subtle bg-opacity-25'>
      <HashLoader
        color="#3de870"
        loading
        size={50}
        speedMultiplier={1.2}
      />
  
    </div></>
    }
  
  return <>

    <h3 className="mb-3">Shop Popular Categories :</h3>
    <Slider {...settings}>
        
        {CategoryData.map( (category, idx) => 
            <div key={idx} className="px-2 rounded-5 overflow-hidden">
                <img style={{height: '200px'}} className="w-100" src={category.image} alt="CategoryImage" />
                <h6 className="mt-2">{category.name}</h6>
            </div>
        )}
      
    </Slider>
    </>
}