import { Suspense } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function AsyncComponent({ children }) {
  return (
    <Suspense
      fallback={
        <div className="animate-fade-in">
          <LoadingSpinner />
        </div>
      }
    >
      <div className="animate-fade-in">{children}</div>
    </Suspense>
  );
}
