import Header from '@/components/header';
import Footer from '@/components/footer';
import {useState} from 'react';
import useData from '@/lib/requestdata';
import ErrorPage from '@/components/error';
import {addDataToFirestore} from '@/data/firestore';
import {useRouter} from 'next/navigation';
import {useAuthState} from '@/contexts/AuthContext';
import {Spinner} from '@nextui-org/react';

export default function Layout({
  swimmingPoolId,
}: {
  readonly swimmingPoolId: string;
}) {
  const {data, loading, error} = useData();
  const [textareaData, setTextareaData] = useState<string>('');
  const router = useRouter();
  const user = useAuthState();

  const handleAddData = async () => {
    const selectedItem = data.find(
      item => item.swimmingPoolId === swimmingPoolId,
    );
    if (!selectedItem) return;
    if (!textareaData) {
      alert('내용을 입력해주세요.');
      return;
    }

    const addData = {
      swimmingPoolId: selectedItem.swimmingPoolId,
      name: selectedItem.facltName,
      address: selectedItem.facltAddr,
      content: textareaData,
      user_data: user,
    };

    addDataToFirestore(addData)
      .then(() => {
        alert('리뷰가 등록되었습니다.');
        setTextareaData('');
        router.push('/');
      })
      .catch(error => {
        alert('다시 시도해주세요.');
      });
  };

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
            {item.swimmingPoolId === swimmingPoolId && (
              <div className="container px-5 py-20 mx-auto flex justify-center items-center">
                <div className="lg:w-2/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:relative z-10">
                  <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                    {item.facltName}
                  </h2>
                  <p className="leading-relaxed mb-5 text-gray-600">
                    {item.facltAddr}
                  </p>
                  <div className="relative mb-4">
                    <textarea
                      onChange={e => setTextareaData(e.target.value)}
                      value={textareaData}
                      id="message"
                      name="message"
                      placeholder="후기를 입력해주세요"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    onClick={handleAddData}
                    className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
                  >
                    등록
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}
