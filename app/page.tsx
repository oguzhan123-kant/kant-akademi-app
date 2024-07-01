import Head from 'next/head';
import MistakeForm from '../components/MistakeForm';

export default function Home() {
  return (
    <div>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center mb-8">
          <img src="https://framerusercontent.com/images/U22Vo7N6tJ2bcvmMTzMVoXTgPF0.svg?scale-down-to=2048" alt="Kant Akademi Logo" className="h-32 w-32"/>
        </div>
        <MistakeForm />
      </div>
    </div>
  );
}
