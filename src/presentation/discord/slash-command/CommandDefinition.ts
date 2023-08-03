interface Definition {
    readonly NAME: string;
    readonly NAME_JP?: string;
    readonly DESCRIPTION: string;
    readonly DESCRIPTION_JP?: string;
}

interface OptionDefinition extends Definition {
    readonly REQUIRED: boolean;
}

export interface CommandDefinition extends Definition {
    readonly OPTIONS: {
        [K: string]: OptionDefinition;
    }
}
