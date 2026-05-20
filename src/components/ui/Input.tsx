'use client';

import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[11px] tracking-[0.15em] uppercase text-white/40">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4A574]/50 focus:bg-white/[0.05] transition-all duration-300 ${error ? 'border-red-500/50' : ''} ${className}`}
          {...props}
        />
        {error && (
          <span className="text-[11px] text-red-400/80">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[11px] tracking-[0.15em] uppercase text-white/40">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full min-h-[120px] bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4A574]/50 focus:bg-white/[0.05] transition-all duration-300 resize-y ${error ? 'border-red-500/50' : ''} ${className}`}
          {...props}
        />
        {error && (
          <span className="text-[11px] text-red-400/80">{error}</span>
        )}
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
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[11px] tracking-[0.15em] uppercase text-white/40">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A574]/50 focus:bg-white/[0.05] transition-all duration-300 appearance-none ${error ? 'border-red-500/50' : ''} ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0C0A08] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-[11px] text-red-400/80">{error}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
