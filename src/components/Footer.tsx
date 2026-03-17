export default function Footer() {
    return (
        <footer className="fixed bottom-0 w-full bg-gray-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Delicious Recipes. All rights reserved.
            </p>
        </div>
        </footer>
    );
}