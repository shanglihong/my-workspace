declare module 'my-doc-editor' {
  import React from 'react';

  export interface DocEditorRef {
    getMarkdown: () => string;
    setMarkdown: (markdown: string) => void;
    focus: () => void;
  }

  export interface DocEditorProps {
    value?: string;
    onChange?: (docNode: any, markdown: string) => void;
    onTitleChange?: (title: string) => void;
    readOnly?: boolean;
    theme?: 'light' | 'dark' | 'auto';
    titlePlaceholder?: string;
    placeholder?: string;
    className?: string;
    drawioUrl?: string;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
  }

  export const DocEditor: React.ForwardRefExoticComponent<
    DocEditorProps & React.RefAttributes<DocEditorRef>
  >;
}
