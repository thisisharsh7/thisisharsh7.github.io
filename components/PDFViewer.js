export default function PDFViewer() {
  return (
    <div className="w-full h-full bg-stone-100">
      <object
        data="/doc/HARSH_KUMAR_2026_resume.pdf"
        type="application/pdf"
        className="w-full h-full"
      >
        <p className="p-8 text-stone-600">
          Unable to display PDF. <a href="/doc/HARSH_KUMAR_2026_resume.pdf" className="text-orange-600 underline">Download it here</a>.
        </p>
      </object>
    </div>
  );
}
