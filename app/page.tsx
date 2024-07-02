import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Mistake Tracking App</h1>
      <div className="flex space-x-4 mt-4">
        <Link href="/add-mistake" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Mistake
        </Link>
        <Link href="/view-mistakes" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          View Mistakes
        </Link>
        <Link href="/deneme-mistake" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Deneme Sonuçlarını gir
        </Link>
      </div>
    </div>
  );
}
