const LoadingPage = () => {
   return (
      <div className="min-h-screen flex items-center justify-center bg-transparent pb-20">
         <div className="absolute inset-0 bg-gray opacity-40"></div>
         <span className="loading loading-dots loading-lg text-navy z-10"></span>
      </div>
   );
};

export default LoadingPage;
