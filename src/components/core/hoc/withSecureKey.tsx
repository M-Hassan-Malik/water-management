import { useCallback, useState } from "react";

export default function withSecureKey<T extends IField = IField>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    "ComponentSecureKey";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const FieldWithSecureFunction = (props: IField) => {
    // Fetch the props you want to inject. This could be done with context instead.
    const [secure, setSecure] = useState(props.secure);

    const toggleSecure = useCallback(() => {
      setSecure(!secure);
    }, [secure]);

    // props comes afterwards so the can override the default ones.
    return (
      <WrappedComponent
        {...(props as T)}
        toggleSecure={toggleSecure}
        supportSecure={props.secure}
        secure={secure}
      />
    );
  };

  FieldWithSecureFunction.displayName = `withSecureKey(${displayName})`;

  return FieldWithSecureFunction;
}
