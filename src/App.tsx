import { BrowserRouter, Routes, Route } from "react-router-dom";
import TiptapEditorExample from "./features/tiptap-editor-demo/editor-example";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
        <Routes>
          <Route path="/" element={<TiptapEditorExample />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
