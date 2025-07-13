import Header from './components/Header';
import Dashboard from './pages/Dashboard';

function App() {
   return (
      <div className="min-h-screen flex flex-col bg-ivory w-full px-[50px] py-[10px]">
         <Header className="h-[75px]" />
         <div className="w-full flex-1">
            <Dashboard />
         </div>
      </div>
   );
}

export default App;
