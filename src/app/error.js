'use client';
 
export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold text-brown-900 mb-4">
        Bir şeyler yanlış gitti!
      </h2>
      <button
        className="px-4 py-2 bg-brown-700 text-white rounded hover:bg-brown-900 transition-colors"
        onClick={() => reset()}
      >
        Tekrar Dene
      </button>
    </div>
  );
}