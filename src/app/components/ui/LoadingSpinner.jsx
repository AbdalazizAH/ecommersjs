export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-4 border-gray-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-blue-600 border-t-transparent"></div>
      </div>
    </div>
  );
}
