import axios, { AxiosRequestConfig } from 'axios';
import { inject, injectable } from 'inversify';
import { Symbols } from '../../../config/';
import {
    IVoiceTextApiClient, VoiceTextPostParameter
} from '../../../domain/model/api/voicetext/';

@injectable()
export class VoiceTextApiClient implements IVoiceTextApiClient {
    static readonly URL = 'https://api.voicetext.jp/v1/tts';

    constructor(
        @inject(Symbols.VoiceText.ApiKey) private readonly apiKey: string
    ) {}

    readonly fetch = async (
        params: VoiceTextPostParameter
    ): Promise<Buffer> => {
        const config: AxiosRequestConfig<VoiceTextPostParameter> = {
            url: VoiceTextApiClient.URL,
            method: 'POST',
            auth: { username: this.apiKey, password: '' },
            responseType: 'arraybuffer',
            params
        }
        const resp = await axios.request<Buffer>(config);
        return resp.data;
    }
}
