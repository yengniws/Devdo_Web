import { createRoot } from 'react-dom/client';
import '../index.css'; // 테일윈드 임포트
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <App />
   </BrowserRouter>,
);
