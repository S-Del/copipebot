interface Definition {
    readonly NAME: string;
    readonly DESCRIPTION: string;
}

interface OptionDefinition extends Definition {
    readonly REQUIRED: boolean;
}

export interface CommandDefinition extends Definition {
    readonly OPTIONS: {
        [K: string]: OptionDefinition;
    }
}
