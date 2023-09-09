import clsx from "clsx";
import { shake } from "radash";
import { clamp } from "@/shared/lib";

/**
 * Standardizes the sizes of elements
 */
export type SizeProp =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

/**
 * An array of valid SizeProp values
 */
export const sizePropValues: SizeProp[] = [
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
];

export type SizeClassScale = Record<SizeProp, string>;

/**
 * Options for adjusting a size prop
 */
export type ClampSizeOptions = {
  min?: SizeProp;
  max?: SizeProp;
  adjust?: number;
};

/**
 *  Adjusts a SizeProp value by incrementing or decrementing it by a number of steps,
 *  and clamps the value to a min and max value.
 *
 * @param size a SizeProp value
 * @param options options for adjusting the size
 * @returns a SizeProp value
 */
export const adjustSize = (size: SizeProp, options?: ClampSizeOptions) => {
  if (size === "none") 
    return "none";
    
  const min = sizePropValues.indexOf(options?.min ?? sizePropValues[1]);
  const max = sizePropValues.indexOf(
    options?.max ?? sizePropValues[sizePropValues.length - 1]
  );
  const sizeIndex = sizePropValues.indexOf(size) + (options?.adjust ?? 0);
  const valueIndex = clamp(sizeIndex, { min, max });

  return sizePropValues[valueIndex];
};


/**
 * Options for converting a size prop to a class
 */
export type SizeToClassOptions = ClampSizeOptions & {
  scale?: SizeClassScale;
};

/**
 * Convert a SizeProp to a class, using the given options.
 * 
 * @param size 
 * @param options 
 * @returns 
 */
export const sizeToClass = (size: SizeProp, options: SizeToClassOptions) => {
  const adjustedSize = adjustSize(size, options);
  return options.scale?.[adjustedSize] ?? "";
};

/**
 * Returns a width class for a given size
 * @param size
 * @param options
 * @returns
 */
export const widthClass = (size: SizeProp, options?: SizeToClassOptions) =>
  sizeToClass(size, {
    scale: {
      none: "",
      xs: "w-6",
      sm: "w-8",
      md: "w-10",
      lg: "w-12",
      xl: "w-14",
      "2xl": "w-16",
      "3xl": "w-20",
      "4xl": "w-24",
    },
    ...options,
  });

/**
 * Returns a height class for a given size
 * @param size
 * @param options
 * @returns
 */
export const heightClass = (
  size: SizeProp = "md",
  options?: SizeToClassOptions
) =>
  sizeToClass(size, {
    scale: {
      none: "",
      xs: "h-6",
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
      xl: "h-14",
      "2xl": "h-16",
      "3xl": "h-20",
      "4xl": "h-24",
    },
    ...options,
  });

/**
 * Options for `sizeClasses`
 */
export type SizeClassesOptions = ClampSizeOptions & {
  widthScale?: SizeClassScale;
  heightScale?: SizeClassScale;
};

/**
 * Returns both height and width classes for a given size
 *
 * @param size
 * @param options
 * @returns
 */
export const sizeClasses = (
  size: SizeProp = "md",
  options?: SizeClassesOptions
) => {
  const widthOptions = shake({ ...options, scale: options?.widthScale });
  const heightOptions = shake({ ...options, scale: options?.heightScale });

  return clsx(widthClass(size, widthOptions), heightClass(size, heightOptions));
};

/**
 * Returns a text size class for a given size
 *
 * @param size
 * @param options
 * @returns
 */
export const textSizeClass = (
  size: SizeProp = "md",
  options?: SizeToClassOptions
) =>
  sizeToClass(size, {
    scale: {
      none: "",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    },
    ...options,
  });

/**
 * Returns a padding-x class for a given size
 * @param size
 * @param options
 * @returns
 */
export const paddingXClass = (
  size: SizeProp = "md",
  options?: ClampSizeOptions
) => {
  const clampedSize = options ? adjustSize(size, options) : size;
  return (
    {
      none: "",
      xs: "px-1",
      sm: "px-2",
      md: "px-3",
      lg: "px-4",
      xl: "px-5",
      "2xl": "px-6",
      "3xl": "px-8",
      "4xl": "px-10",
    }[clampedSize] ?? ""
  );
};

/**
 * Returns a padding-y class for a given size
 * @param size
 * @param options
 * @returns
 */
export const paddingYClass = (
  size: SizeProp = "md",
  options?: ClampSizeOptions
) => {
  const clampedSize = options ? adjustSize(size, options) : size;
  return (
    {
      none: "",
      xs: "py-0.5",
      sm: "py-2",
      md: "py-3",
      lg: "py-4",
      xl: "py-5",
      "2xl": "py-6",
      "3xl": "py-8",
      "4xl": "py-10",
    }[clampedSize] ?? ""
  );
};

/**
 * Returns a padding class for a given size
 * @param size
 * @param options
 * @returns
 */
export const paddingClass = (
  size: SizeProp = "md",
  options?: SizeToClassOptions
) =>
  sizeToClass(size, {
    scale: {
      none: "",
      xs: "p-1",
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
      xl: "p-5",
      "2xl": "p-6",
      "3xl": "p-8",
      "4xl": "p-10",
    },
    ...options,
  });

/**
 * Returns both padding-x and padding-y classes for a given size
 * @param size
 * @param options
 * @returns
 */
export const paddingClasses = (
  size: SizeProp = "md",
  options?: ClampSizeOptions
) => {
  return clsx(paddingXClass(size, options), paddingYClass(size, options));
};


/**
 * Returns a radius class for a given size.
 * 
 * @param size 
 * @param options 
 * @returns 
 */
export const radiusClass = (
  size: SizeProp = "md",
  options?: SizeToClassOptions
) => {
  return sizeToClass(size, {
    scale: {
      none: "",
      xs: "rounded-xs",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      "4xl": "rounded-4xl",
    },
    ...options,
  });
}