import { Children } from "react";

const Stagger = ({ children, className = "", baseDelay = 0, step = 50 }) => (
  <div className={className}>
    {Children.map(children, (child, index) =>
      child ? (
        <div
          key={index}
          className="animate-fade-up-sm motion-reduce:animate-none opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: `${baseDelay + index * step}ms` }}
        >
          {child}
        </div>
      ) : null
    )}
  </div>
);

export default Stagger;
