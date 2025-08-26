import React, { useState } from 'react';
import { Button, Tooltip } from '@heroui/react';

interface CopyButtonProps {
  text: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'flat' | 'solid' | 'bordered' | 'light' | 'faded' | 'shadow' | 'ghost';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = 'Copy',
  size = 'md',
  variant = 'flat',
  color = 'primary',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Tooltip content={copied ? 'Copied!' : `Copy to clipboard`} placement="top">
      <Button
        size={size}
        variant={variant}
        color={copied ? 'success' : color}
        onPress={handleCopy}
      >
        {copied ? '✓ Copied' : label}
      </Button>
    </Tooltip>
  );
};