'use client';

import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-[var(--foreground)] opacity-70">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-[var(--background)] border rounded-md px-3 py-2 text-sm font-[var(--font-body)]',
              'text-[var(--foreground)] placeholder:text-[#999]',
              'transition-all duration-200',
              'focus:outline-none',
              error
                ? 'border-[#FF0022] focus:border-[#FF0022] focus:shadow-[0_0_0_3px_rgba(255,0,34,0.1)]'
                : 'border-[#D0D0D0] focus:border-[#0000EE] focus:shadow-[0_0_0_3px_rgba(0,0,238,0.1)]',
              'disabled:bg-[#F5F5F5] disabled:border-[#E0E0E0] disabled:text-[#999] disabled:cursor-not-allowed',
              icon && 'pl-10',
              className
            )}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-[#FF0022]">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-[var(--foreground)] opacity-70">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-[var(--background)] border rounded-md px-3 py-3 text-sm min-h-[120px] resize-y',
            'text-[var(--foreground)] placeholder:text-[#999]',
            'transition-all duration-200',
            'focus:outline-none',
            error
              ? 'border-[#FF0022] focus:border-[#FF0022] focus:shadow-[0_0_0_3px_rgba(255,0,34,0.1)]'
              : 'border-[#D0D0D0] focus:border-[#0000EE] focus:shadow-[0_0_0_3px_rgba(0,0,238,0.1)]',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-[#FF0022]">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-[var(--foreground)] opacity-70">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-[var(--background)] border border-[#D0D0D0] rounded-md px-3 py-2 text-sm',
            'text-[var(--foreground)] appearance-none cursor-pointer',
            'transition-all duration-200',
            'focus:outline-none focus:border-[#0000EE] focus:shadow-[0_0_0_3px_rgba(0,0,238,0.1)]',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-[#FF0022]">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
