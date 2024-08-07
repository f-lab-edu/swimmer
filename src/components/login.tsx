'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {signIn} from '@/data/firestore';

export default function Layout({children}: {children: React.ReactNode}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn(email, password, router);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="text-gray-600 body-font overflow-hidden min-h-max md:mt-12 md:mb-12 flex-1">
        <div className="container px-5 mx-auto max-w-screen-xl">
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto w-full mt-10 md:mt-12">
            <form
              onSubmit={e => handleSubmit(e)}
              className="flex flex-col w-full"
            >
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                로그인
              </h2>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  Email
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </label>
              </div>
              <div className="relative mb-7">
                <label className="leading-7 text-sm text-gray-600">
                  Password
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-300 rounded text-lg mb-5"
              >
                로그인
              </button>
              <Link href="/signup">
                <p className="text-gray-400 hover:text-gray-600 flex justify-end">
                  회원가입
                </p>
              </Link>
            </form>
          </div>
        </div>
      </section>
      <br></br>
      <Footer />
    </div>
  );
}
