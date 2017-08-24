import * as React from 'react';

import { PolyglotSettings, SettingsUIState } from '../types/index';

import SingleLineTextEntry from './singleLineTextEntry';
import MultiLineTextEntry from './multiLineTextEntry';

// TODO: Change to using local .scss files?

export interface ISettingsProps {
    polyglotSettings: PolyglotSettings;
    settingsUIState: SettingsUIState;
    handleTextFieldInputChange: (settingStateId: string, newValue: string | number) => void;
    handleListServicesClick: () => void;
    handlePathDoubleClick: (stateId: string, message: string, allowMultiSelect: boolean) => void;
    handlePathBlur: (id: string) => void;
}

export default function Settings({ polyglotSettings, settingsUIState,
    handleTextFieldInputChange, handlePathDoubleClick, handleListServicesClick,
    handlePathBlur }: ISettingsProps) {
    return (
        <div>
            <SingleLineTextEntry
                id='endpoint'
                label='gRPC Endpoint'
                value={polyglotSettings.endpoint}
                errorText='Format must be host:port'
                placeholder='<host>:<port>'
                handleChange={handleTextFieldInputChange}
                required={settingsUIState.endpointRequired}
                error={settingsUIState.endpointError}
            />
            <SingleLineTextEntry
                id='protoDiscoveryRoot'
                value={polyglotSettings.protoDiscoveryRoot}
                handleChange={handleTextFieldInputChange}
                label='Proto Root Path'
                placeholder='/path/to/protoRoot'
                errorText='Proto Root Path is invalid'
                error={settingsUIState.protoDiscoveryRootError}
                handleDoubleClick={() =>
                    handlePathDoubleClick('protoDiscoveryRoot',
                                          'Select Proto Discovery Root',
                                          false)}
                handleBlur={() => handlePathBlur('protoDiscoveryRoot')}
            />
            <SingleLineTextEntry
                id='configSetPath'
                value={polyglotSettings.configSetPath}
                handleChange={handleTextFieldInputChange}
                label='Config Path'
                placeholder='/path/to/config.pb.json'
                errorText='Config Path is invalid'
                handleBlur={() => handlePathBlur('configSetPath')}
                handleDoubleClick={() =>
                    handlePathDoubleClick('configSetPath',
                                          'Select Config Path',
                                          false)}
                error={settingsUIState.configSetPathError}
            />
            <SingleLineTextEntry
                id='configName'
                value={polyglotSettings.configName}
                handleChange={handleTextFieldInputChange}
                label='Config Name'
                placeholder='development'
            />
            <SingleLineTextEntry
                id='tlsCaCertPath'
                value={polyglotSettings.tlsCaCertPath}
                handleChange={handleTextFieldInputChange}
                label='TLS CA Certificate Path'
                placeholder='/path/to/tlsCaCertificate'
                errorText='TLS CA Certificate Path is invalid'
                error={settingsUIState.tlsCaCertPathError}
                handleBlur={() => handlePathBlur('tlsCaCertPath')}
                handleDoubleClick={() =>
                    handlePathDoubleClick('tlsCaCertPath',
                                          'Select TLS CA Certificate Path',
                                          false)}
            />
            <SingleLineTextEntry
                id='deadlineMs'
                value={polyglotSettings.deadlineMs <= 0 ? undefined : polyglotSettings.deadlineMs}
                handleChange={handleTextFieldInputChange}
                label='Deadline (milliseconds)'
                placeholder='5000'
            />
            <MultiLineTextEntry
                id='addProtocIncludes'
                value={polyglotSettings.addProtocIncludes.join(',')}
                handleChange={handleTextFieldInputChange}
                label='Add Protoc Includes'
                placeholder='<path1>, <path2>'
                // Searches the array of booleans, if any of the booleans are false then the overall
                // status of the field should be an error. If none are found the index=-1 < 0
                error={settingsUIState.addProtocIncludesErrors.indexOf(false) >= 0}
                // Display helpful error message by displaying which lines are invalid
                errorText={
                    `Path(s) ${settingsUIState.addProtocIncludesErrors.map((value, index) =>
                !value ? index + 1 : '').filter(Number).join()} are invalid`}
                handleDoubleClick={() =>
                    handlePathDoubleClick('addProtocIncludes',
                                          'Add Protoc Include Paths',
                                          true)}
                handleBlur={() => handlePathBlur('addProtocIncludes')}
            />
        </div>);
}
