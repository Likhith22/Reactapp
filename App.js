import React, { useState } from 'react';
import axios from 'axios';
import PDFViewer from './PDFViewer'; // Assuming you create a separate component for PDF display
import PageSelection from './PageSelection'; // Assuming you create a separate component for page selection

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfURL, setPDFURL] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const formData = new FormData();
        formData.append('pdf', file);

        axios.post('/upload', formData)
            .then(response => {
                setPDFURL(response.data.pdfURL); // Assuming your backend sends back the PDF URL
            })
            .catch(error => {
                console.error('Upload error:', error);
            });
    };

    const handleExtract = (selectedPages) => {
        axios.post('/extract', { selectedPages })
            .then(response => {
                console.log('New PDF created:', response.data);
                // Handle displaying the new PDF or providing a download link
            })
            .catch(error => {
                console.error('Extraction error:', error);
            });
    };

    return (
        <div>
            <input type="file" accept=".pdf" onChange={handleFileUpload} />
            {pdfURL && <PDFViewer pdfURL={pdfURL} />}
            {pdfURL && <PageSelection numPages={10} handleExtract={handleExtract} />} {/* Replace 10 with the actual number of pages */}
        </div>
    );
}

export default App;
