

const Header = () => {
  return (
    <nav className="bg-white bg-opacity-80 py-2 px-4 md:px-8 lg:px-16 lg:py-4 border border-white/80 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200">
      <div className="container mx-auto flex items-center justify-between text-gray-900">
        <a href="#" className="mr-4 block cursor-pointer">
          <img
            src="https://res.cloudinary.com/duuwbsmdu/image/upload/v1691736353/fitbuddy/fitbuddy-high-resolution-logo-color-on-transparent-background_ehho4o.svg"
            alt="Logo"
            className="w-16 h-auto md:w-20"
          />
        </a>
        <h1 className="text-xl font-semibold">Admin Panel</h1>
      </div>
    </nav>
  );
};


export default Header;
