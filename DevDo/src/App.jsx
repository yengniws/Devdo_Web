import Header from './components/Header';

function App() {
   return (
      <div className="min-h-screen flex flex-col bg-ivory w-full px-[50px] py-[10px]">
         <Header className="h-[75px]" />
         <main className="w-full flex-1">{/* 메인 컨텐츠 */}</main>
      </div>
   );
}

export default App;
