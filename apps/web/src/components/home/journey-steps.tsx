const STEPS = [
  'Register',
  'Choose your goal',
  'Study topic notes',
  'Take the daily exam',
  'Review explanations',
  'Fix weak topics',
];

export function JourneySteps() {
  return (
    <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {STEPS.map((step, index) => (
        <li
          key={step}
          className="bg-card flex items-center gap-3 rounded-lg border p-3 text-sm lg:flex-col lg:text-center"
        >
          <span className="bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
            {index + 1}
          </span>
          <span className="font-medium">{step}</span>
        </li>
      ))}
    </ol>
  );
}
