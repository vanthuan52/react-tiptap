import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./features/tiptap-editor-demo/components/header";
import EditPage from "./features/tiptap-editor-demo/pages/edit-page";
import PreviewPage from "./features/tiptap-editor-demo/pages/preview-page";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<EditPage />} />
            <Route path="/preview" element={<PreviewPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
