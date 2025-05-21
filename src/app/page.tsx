export default function HomePage() {
  return (
    <div>
      <main className="max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our Blog</h1>
        <p className="text-lg text-gray-700">
          Home | About Us | Services | Blog | Contact Us
        </p>
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Popular Topics</h2>
          <ul className="mt-4 list-disc list-inside">
            <li>JavaScript</li>
            <li>ReactJS</li>
            <li>PHP</li>
            <li>MySQL</li>
            <li>Node.js</li>
            <li>Python</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
