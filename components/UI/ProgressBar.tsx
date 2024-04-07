export default function ProgressBar({ percentage }: { percentage: number }) {
  if (percentage > 100) percentage = 100
  if (percentage < 0) percentage = 0

  return (
    <div className="mt-2 w-full">
      <span
        role="progressbar"
        aria-labelledby="progess-label"
        aria-valuenow={percentage}
        className="block rounded-full border border-primary bg-gray/20"
      >
        <span
          className="block h-3 rounded-full bg-primary transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </span>
    </div>
  )
}
