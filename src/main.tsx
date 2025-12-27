import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Root from './routes/root';
import Home from './routes/home';
import Engineering from './routes/engineering';
import EngineeringPost from './routes/engineering.$postId';
import Language from './routes/language';
import LanguagePost from './routes/language.$postId';
import Personal from './routes/personal';
import PersonalPost from './routes/personal.$postId';
import About from './routes/about';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="engineering" element={<Engineering />} />
          <Route path="engineering/:postId" element={<EngineeringPost />} />
          <Route path="language" element={<Language />} />
          <Route path="language/:postId" element={<LanguagePost />} />
          <Route path="personal" element={<Personal />} />
          <Route path="personal/:postId" element={<PersonalPost />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
