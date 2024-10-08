'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import {useState, useEffect} from 'react';
import useData from '@/lib/requestdata';
import ErrorPage from '@/components/error';
import {fetchReviewsBySwimmingPoolId} from '@/data/firestore';
import {PublicSwimmingPool, ReviewData} from '@/lib/types';
import {Spinner, Button, Link} from '@nextui-org/react';
import {LocationDotIcon, ArrowIcon, PenIcon, PhoneIcon} from '@/ui/icon';

function SwimmingPoolDetail({item}: {item: PublicSwimmingPool}) {
  return (
    <div className="py-8 flex flex-wrap md:flex-nowrap">
      <div className="md:w-64 h-64 mr-5 md:mb-0 flex-shrink-0 flex flex-col">
        <img
          src={item.imgSource}
          alt="Swimming Pool Image"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="md:flex-grow ">
        <div className="mb-10">
          <h2 className="text-2xl font-medium text-gray-900 title-font">
            {item.facltName}
          </h2>
        </div>
        <br />
        <div className="flex items-center mt-10 mb-2">
          <div>
            <PhoneIcon className="mr-2" />
          </div>
          {item.CONTCT_NO !== null ? (
            <p>{item.CONTCT_NO}</p>
          ) : (
            <p className="text-sm">(전화번호를 준비 중이에요)</p>
          )}
        </div>
        <div className="flex items-center mb-8">
          <div className="mr-2">
            <LocationDotIcon />
          </div>
          <p className="leading-relaxed">{item.facltAddr}</p>
        </div>
        {(item.laneLength && item.laneCount) !== null ? (
          <>
            <Button radius="lg" color="primary" size="sm">
              {item.laneLength}m
            </Button>
            <Button
              radius="lg"
              color="primary"
              size="sm"
              variant="bordered"
              isIconOnly
            >
              {item.laneCount}
            </Button>
          </>
        ) : (
          <Button radius="lg" color="primary" size="sm" variant="bordered">
            레일 정보를 준비 중이에요
          </Button>
        )}
      </div>
    </div>
  );
}

function ReviewList({
  reviews,
  item,
}: {
  reviews: ReviewData[];
  item: PublicSwimmingPool;
}) {
  return (
    <div className="md:flex-grow mt-20">
      <div className="flex items-center justify-between mb-7">
        <p className="text-2xl font-medium text-gray-900 title-font">
          수영장 리뷰
        </p>
        <Link
          href={`/visit/${item.swimmingPoolId}`}
          className="flex items-center text-blue-500 text-sm hover:text-gray-300"
        >
          <p className="mr-2">방문한 수영장 인증</p>
          <ArrowIcon />
        </Link>
      </div>
      {reviews.length === 0 ? (
        <div className="flex w-full mx-auto justify-center mb-5 flex-wrap bg-gray-100 text-gray-400 rounded-lg overflow-hidden shadow-md p-4">
          <PenIcon className="mr-4" />
          <p>가장 처음으로 리뷰를 작성해주세요!</p>
        </div>
      ) : (
        <>
          {reviews.map((item, index) => (
            <div
              key={index}
              className="flex w-full mx-auto mb-5 flex-wrap bg-white rounded-lg overflow-hidden shadow-md p-4"
            >
              <p className="title-font text-gray-900 lg:w-3/4 lg:mb-0 mb-4">
                {item.review_content}
              </p>
              <div className="flex-grow"></div>
              <div className="flex justify-between">
                <p className="text-gray-900 text-sm mr-5">
                  {item.author_user_name}
                </p>
                <p className="text-gray-500 text-sm">{item.reg_date}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default function Layout({
  swimmingpool_id,
}: {
  readonly swimmingpool_id: string;
}) {
  const {data, loading, error} = useData();
  const [reviews, setReviews] = useState<ReviewData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviews = await fetchReviewsBySwimmingPoolId(swimmingpool_id);

        if (reviews) {
          setReviews(reviews);
        } else {
          console.error('Fetch reviews returned undefined');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (swimmingpool_id) {
      fetchData();
    } else {
      console.error('Invalid swimmingpool_id:', swimmingpool_id);
    }
  }, [swimmingpool_id]);

  if (loading) {
    return (
      <Spinner
        size="lg"
        className="flex flex-col items-center justify-center min-h-screen"
      />
    );
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="text-gray-600 body-font overflow-hidden min-h-max flex-1">
        {data.map((item, index) => (
          <div key={index}>
            {item.swimmingPoolId === swimmingpool_id && (
              <div className="container px-5 mx-auto max-w-screen-xl">
                <SwimmingPoolDetail item={item} />
                <ReviewList reviews={reviews} item={item} />
              </div>
            )}
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}
