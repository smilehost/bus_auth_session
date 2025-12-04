import KSUID from "ksuid";

export async function generateOneTimeKey(): Promise<string> {
    const ksuid = await KSUID.random();
    return ksuid.string;
}