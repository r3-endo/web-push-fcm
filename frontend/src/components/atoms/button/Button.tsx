import "./Button.css";

export type ButtonProps = {
    primary: boolean;
    size: "small" | "medium" | "large";
    backgroundColor?: string;
    label: string;
    onClick?: () => void;
};

/**
 * Primary UI component for user interaction
 */
export const Button = ({
    primary = false,
    size = "medium",
    backgroundColor,
    label,
    ...props
}: ButtonProps) => {
    const mode = primary
        ? "storybook-button--primary"
        : "storybook-button--secondary";
    return (
        <button
            type="button"
            className={[
                "storybook-button",
                `storybook-button--${size}`,
                mode,
            ].join(" ")}
            style={{}}
            {...props}
        >
            {label}
        </button>
    );
};
