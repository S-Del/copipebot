import { VoiceTextPostParameter } from './';

export interface IVoiceTextApiClient {
    readonly fetch: (params: VoiceTextPostParameter) => Promise<Buffer>;
}
