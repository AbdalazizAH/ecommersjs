"use client";

export default function QuantityControl({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center space-x-4 space-x-reverse">
      <button
        onClick={onDecrease}
        className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="text-lg font-medium w-8 text-center">{quantity}</span>
      <button
        onClick={onIncrease}
        className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
      >
        +
      </button>
    </div>
  );
}
