export default function FoodCardSkeleton() {
    return (
      <div className="bg-card flex flex-col border-b border-border">
        {/* Image skeleton */}
        <div className="w-full h-48 bg-muted relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
  
        {/* Body skeleton */}
        <div className="p-5 flex-1 space-y-3">
          <div className="h-5 bg-muted rounded-md w-3/4 overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="h-3 bg-muted rounded-md w-full overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="h-3 bg-muted rounded-md w-2/3 overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="h-6 bg-muted rounded-md w-24 mt-2 overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
  
        {/* Footer skeleton */}
        <div className="px-5 py-4 border-t border-border flex items-center justify-between">
          <div className="h-3 bg-muted rounded w-32 overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="h-8 bg-muted rounded-md w-20 overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </div>
    );
  }