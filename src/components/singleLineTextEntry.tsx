import * as React from 'react';
import * as ReactMD from 'react-md';

export interface SingleLineTextEntryProps {
    id: string;
    value?: string | number;
    label?: string;
    placeholder?: string;
    errorText?: string;
    required?: boolean;
    error?: boolean;
    handleChange: (id: string, newValue: string | number) => void;
    handleDoubleClick?: () => void;
}

export function SingleLineTextEntry({ id, label, value, placeholder = '', errorText = '',
    required = false, error = false, handleChange, handleDoubleClick }: SingleLineTextEntryProps) {
    return (
        <div style={{ 'display': 'flex', 'padding': '0px 10px 0px 10px' }}>
            <ReactMD.TextField
                id={id}
                label={label}
                value={value}
                placeholder={placeholder}
                required={required}
                error={error}
                errorText={errorText}
                onChange={(newValue) => handleChange(id, newValue)}
                onDoubleClick={handleDoubleClick}
                style={{ 'flex': '1', 'margin': '0px 8px 0px 8px' }}
                lineDirection="center"
                className="md-cell md-cell--bottom"
            />
        </div>
    );
}

export default SingleLineTextEntry;