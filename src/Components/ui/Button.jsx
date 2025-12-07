import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from "../../libs/utils";

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow hover:from-green-600 hover:to-emerald-600',
        destructive:
          'bg-red-500 text-white shadow-sm hover:bg-red-600',
        outline:
          'border border-green-200 bg-white shadow-sm hover:bg-green-50 hover:text-green-900',
        secondary:
          'bg-green-100 text-green-900 shadow-sm hover:bg-green-200',
        ghost: 'hover:bg-green-100 hover:text-green-900',
        link: 'text-green-600 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(function Button(
  { className, variant, size, ...props },
  ref
) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

export { Button, buttonVariants };
