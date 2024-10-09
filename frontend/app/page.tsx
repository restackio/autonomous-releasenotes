export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold mb-4">Create Release</h1>  
        <form className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            placeholder="GitHub Repository URL"
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Release tag name"
            className="border rounded p-2"
            required
          />
           <textarea
            placeholder="Description"
            className="border rounded p-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white rounded p-2">Create Release</button>  
        </form>
      </main>
    </div>
  );
}
