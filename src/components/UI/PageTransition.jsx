import { useLocation, useOutlet } from "react-router-dom";

const CALM_PATTERNS = [
  /\/student\/courses\/\d+\/lessons\/\d+/,
  /\/quiz$/,
];

const PageTransition = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const isCalm = CALM_PATTERNS.some((pattern) => pattern.test(location.pathname));

  return (
    <div
      key={location.pathname}
      className={
        isCalm
          ? "animate-fade-in motion-reduce:animate-none"
          : "animate-fade-up-sm motion-reduce:animate-none"
      }
    >
      {outlet}
    </div>
  );
};

export default PageTransition;
