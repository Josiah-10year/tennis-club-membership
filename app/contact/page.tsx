export default function Contact() {
    return (
        <div className="max-w-5xl mx-auto py-20">
            <h1 className="text-left py-8">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Contact Details</h2>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Phone:</span> +1 (868) 218-5852</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> staugustineclub@gmail.com</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Opening Hours:</span> Always open</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Location</h2>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Address:</span> 2-4 Mc Carthy Street, St. Augustine, Trinidad and Tobago</p>
                    <div className="iframe-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.114217614417!2d-61.401296499999994!3d10.6482341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c3601bf1e9ca7d5%3A0x46fcc09edb655a87!2sSt.%20Augustine%20Tennis%20Club!5e0!3m2!1sen!2stt!4v1712948071902!5m2!1sen!2stt"
                            width="100%"
                            height="300"
                            className="rounded-lg shadow-lg"
                            style={{ border: 0 }}
                            aria-hidden="false"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
