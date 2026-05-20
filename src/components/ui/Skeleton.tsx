export function MenuCardSkeleton() {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] overflow-hidden">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 skeleton" />
        <div className="h-3 w-full skeleton" />
        <div className="h-3 w-1/2 skeleton" />
      </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] p-8 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full skeleton" />
        <div className="space-y-2">
          <div className="h-3 w-20 skeleton" />
          <div className="h-2 w-14 skeleton" />
        </div>
      </div>
      <div className="h-3 w-full skeleton" />
      <div className="h-3 w-5/6 skeleton" />
    </div>
  );
}
